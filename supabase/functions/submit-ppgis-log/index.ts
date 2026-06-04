import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

type SubmissionRequest = {
  turnstileToken?: string;
  latitude?: number;
  longitude?: number;
  is_anonymous?: boolean;
  title?: string | null;
  body_text?: string | null;
  photo_path?: string | null;
  audio_path?: string | null;
  show_text?: boolean;
  show_photo?: boolean;
  show_audio?: boolean;
  share_public?: boolean;
  interview_contact_agreed?: boolean;
  delete_password?: string;
  marker_color?: string | null;
};

const defaultMarkerColor = "#ff7f00";
const allowedMarkerColors = new Set([
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a"
]);

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
  return typeof value === "string" && /^\d{6}$/.test(value);
}

function validMarkerColor(value: unknown) {
  if (typeof value !== "string") return defaultMarkerColor;
  const normalized = value.trim().toLowerCase();
  return allowedMarkerColors.has(normalized) ? normalized : defaultMarkerColor;
}

function bearerToken(req: Request) {
  const authorization = req.headers.get("Authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

function userDisplayName(user: { email?: string; user_metadata?: Record<string, unknown> }) {
  return cleanString(user.user_metadata?.full_name)
    || cleanString(user.user_metadata?.name)
    || cleanString(user.email?.split("@")[0])
    || "Participant";
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function hashDeletePassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
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
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  return {
    salt: bytesToBase64(salt),
    hash: bytesToBase64(new Uint8Array(derivedBits))
  };
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured.");
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (remoteIp) formData.append("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Turnstile verification request failed.");
  }

  return await response.json() as { success?: boolean; "error-codes"?: string[] };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  let body: SubmissionRequest;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON." }, 400);
  }

  const turnstileToken = cleanString(body.turnstileToken);
  if (!turnstileToken) {
    return jsonResponse({ error: "Turnstile verification token is required." }, 400);
  }

  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  const title = cleanString(body.title);
  const deletePassword = body.delete_password;

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    return jsonResponse({ error: "A valid latitude is required." }, 400);
  }

  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return jsonResponse({ error: "A valid longitude is required." }, 400);
  }

  if (!title) {
    return jsonResponse({ error: "Title is required." }, 400);
  }

  if (!isValidDeletePassword(deletePassword)) {
    return jsonResponse({ error: "Edit/delete password must be exactly 6 numeric digits." }, 400);
  }

  if (body.interview_contact_agreed !== true) {
    return jsonResponse({ error: "Interview contact agreement is required before submitting." }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !anonKey || !serviceRoleKey) {
    return jsonResponse({ error: "Supabase server environment is not configured." }, 500);
  }

  const token = bearerToken(req);
  if (!token) {
    return jsonResponse({ error: "Sign-in is required before submitting." }, 401);
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    auth: {
      persistSession: false
    }
  });

  const { data: userData, error: userError } = await authClient.auth.getUser();
  const user = userData.user;
  if (userError || !user) {
    return jsonResponse({ error: "Could not verify signed-in user." }, 401);
  }

  try {
    const remoteIp = req.headers.get("CF-Connecting-IP")
      || req.headers.get("X-Forwarded-For")?.split(",")[0]?.trim()
      || null;
    const turnstileResult = await verifyTurnstile(turnstileToken, remoteIp);

    if (!turnstileResult.success) {
      return jsonResponse({
        error: "Human verification failed.",
        details: turnstileResult["error-codes"] || []
      }, 403);
    }
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return jsonResponse({ error: "Could not verify Turnstile token." }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });

  const deletePasswordSecret = await hashDeletePassword(deletePassword);
  const profileName = userDisplayName(user);
  const profileEmail = cleanString(user.email);
  const now = new Date().toISOString();

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email: profileEmail,
      full_name: profileName,
      updated_at: now
    }, { onConflict: "id" });

  if (profileError) {
    console.error("Profile upsert error:", profileError);
    return jsonResponse({ error: "Could not update user profile." }, 500);
  }

  const insertPayload = {
    user_id: user.id,
    latitude,
    longitude,
    real_name: profileName,
    title,
    body_text: cleanString(body.body_text),
    is_anonymous: Boolean(body.is_anonymous),
    photo_path: cleanString(body.photo_path),
    audio_path: cleanString(body.audio_path),
    show_text: Boolean(body.show_text),
    show_photo: Boolean(body.show_photo),
    show_audio: Boolean(body.show_audio),
    marker_color: validMarkerColor(body.marker_color),
    interview_contact_agreed: true,
    interview_contact_agreed_at: now,
    delete_password_salt: deletePasswordSecret.salt,
    delete_password_hash: deletePasswordSecret.hash
  };

  const { data, error } = await supabase
    .from("submissions")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    console.error("Submission insert error:", error);
    return jsonResponse({
      error: error.message || "Could not save submission.",
      code: error.code,
      details: error.details,
      hint: error.hint
    }, 500);
  }

  return jsonResponse({ success: true, id: data.id });
});
