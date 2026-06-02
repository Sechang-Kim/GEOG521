import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MEDIA_BUCKET = "ppgis-media";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type DeleteRequest = {
  id?: string | number;
  delete_password?: string;
};

type SubmissionSecret = {
  id: string | number;
  photo_path: string | null;
  audio_path: string | null;
  delete_password_salt: string | null;
  delete_password_hash: string | null;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function cleanString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function isValidDeletePassword(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}$/.test(value);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function constantTimeEqual(left: string, right: string) {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const maxLength = Math.max(leftBytes.length, rightBytes.length);
  let result = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < maxLength; index += 1) {
    result |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
  }

  return result === 0;
}

async function hashDeletePassword(password: string, saltBase64: string) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltBase64),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  return bytesToBase64(new Uint8Array(derivedBits));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  let body: DeleteRequest;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON." }, 400);
  }

  const submissionId = cleanString(String(body.id || ""));
  const deletePassword = body.delete_password;

  if (!submissionId) {
    return jsonResponse({ error: "Submission id is required." }, 400);
  }

  if (!isValidDeletePassword(deletePassword)) {
    return jsonResponse({ error: "Delete password must be exactly 4 numeric digits." }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Supabase server environment is not configured." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });

  const { data, error: selectError } = await supabase
    .from("submissions")
    .select("id, photo_path, audio_path, delete_password_salt, delete_password_hash")
    .eq("id", submissionId)
    .single();
  const submission = data as SubmissionSecret | null;

  if (selectError || !submission) {
    return jsonResponse({ error: "Submission was not found." }, 404);
  }

  if (!submission.delete_password_salt || !submission.delete_password_hash) {
    return jsonResponse({ error: "This submission cannot be deleted with a password." }, 403);
  }

  const candidateHash = await hashDeletePassword(deletePassword, submission.delete_password_salt);
  if (!constantTimeEqual(candidateHash, submission.delete_password_hash)) {
    return jsonResponse({ error: "Delete password is incorrect." }, 403);
  }

  const mediaPaths = [submission.photo_path, submission.audio_path].filter((path): path is string => Boolean(path));
  if (mediaPaths.length) {
    const { error: storageError } = await supabase
      .storage
      .from(MEDIA_BUCKET)
      .remove(mediaPaths);

    if (storageError) {
      console.error("Media delete error:", storageError);
      return jsonResponse({ error: "Could not delete attached media." }, 500);
    }
  }

  const { error: deleteError } = await supabase
    .from("submissions")
    .delete()
    .eq("id", submissionId);

  if (deleteError) {
    console.error("Submission delete error:", deleteError);
    return jsonResponse({ error: "Could not delete submission." }, 500);
  }

  return jsonResponse({ success: true, id: submission.id });
});
