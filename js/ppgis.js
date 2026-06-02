const SUPABASE_URL = "https://ovubnhmmonnrywhktjax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2JgXPdRqSLmQ1YYKFUp7iA_rndlY_Jr";
const MEDIA_BUCKET = "ppgis-media";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
const TURNSTILE_SITE_KEY = "0x4AAAAAADdPqMVnjCWpuPM3";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const statusEl = document.getElementById("ppgisStatus");
const basemapSelect = document.getElementById("ppgisBasemap");
const refreshButton = document.getElementById("ppgisRefresh");
const popover = document.getElementById("ppgisPopover");
const ppgisShell = document.querySelector(".ppgis-popup-shell");
const panelToggle = document.querySelector(".ppgis-panel-toggle");
const panelTab = document.querySelector(".ppgis-panel-tab");

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu.classList.toggle("is-open");
});

function setInfoPanel(open) {
  ppgisShell.classList.toggle("info-collapsed", !open);
  panelToggle.setAttribute("aria-expanded", String(open));
  panelTab.setAttribute("aria-expanded", String(open));
  window.setTimeout(() => map.invalidateSize(), 240);
}

panelToggle.addEventListener("click", () => setInfoPanel(false));
panelTab.addEventListener("click", () => setInfoPanel(true));

const map = L.map("ppgisPopupMap", {
  center: [47.61, -122.33],
  zoom: 12,
  scrollWheelZoom: true
});

const baseLayers = {
  osm: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }),
  carto: L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  }),
  satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri"
  })
};

baseLayers.osm.addTo(map);

const approvedLayer = L.featureGroup().addTo(map);
let draftMarker = null;
let recordedAudioFile = null;
let mediaRecorder = null;
let recordedAudioChunks = [];
let activeAudioStream = null;
let selectedLogTypes = new Set();
let savedTextLog = null;
let savedPhotoFile = null;
let savedAudioFile = null;
let turnstileWidgetId = null;

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `ppgis-status ${type}`.trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openPopover(html) {
  popover.innerHTML = html;
  popover.classList.add("is-open");
}

function closePopover() {
  resetTurnstileWidget();
  resetRecordingState();
  resetSavedLogState();
  popover.classList.remove("is-open");
  popover.innerHTML = "";
}

function resetSavedLogState() {
  selectedLogTypes = new Set();
  savedTextLog = null;
  savedPhotoFile = null;
  savedAudioFile = null;
  recordedAudioFile = null;
}

function publicPanel(row) {
  const photoHtml = row.photo_url
    ? `<img class="ppgis-popup-media" src="${row.photo_url}" alt="Submitted photo">`
    : "";
  const audioHtml = row.audio_url
    ? `<audio class="ppgis-popup-audio" controls src="${row.audio_url}"></audio>`
    : "";

  openPopover(`
    <article class="ppgis-public-popup">
      <button class="ppgis-popover-close" type="button" aria-label="Close">&times;</button>
      <h3>${escapeHtml(row.title || "Untitled place")}</h3>
      <p>${escapeHtml(row.body_text || "No story provided.")}</p>
      <p><strong>Submitted by:</strong> ${escapeHtml(row.display_name || "Anonymous")}</p>
      ${photoHtml}
      ${audioHtml}
    </article>
  `);
}

function renderTurnstileWidget() {
  const container = document.getElementById("ppgisTurnstile");
  if (!container) return;

  if (!window.turnstile) {
    window.setTimeout(renderTurnstileWidget, 250);
    return;
  }

  if (turnstileWidgetId !== null) {
    window.turnstile.remove(turnstileWidgetId);
    turnstileWidgetId = null;
  }

  turnstileWidgetId = window.turnstile.render(container, {
    sitekey: TURNSTILE_SITE_KEY,
    theme: "light",
    size: "normal"
  });
}

function getTurnstileToken() {
  if (!window.turnstile || turnstileWidgetId === null) return "";
  return window.turnstile.getResponse(turnstileWidgetId);
}

function resetTurnstileWidget() {
  if (!window.turnstile || turnstileWidgetId === null) return;
  window.turnstile.reset(turnstileWidgetId);
}

async function edgeFunctionErrorMessage(error) {
  if (!error) return "Unknown Edge Function error.";

  try {
    const errorBody = await error.context?.json?.();
    if (errorBody?.error) return errorBody.error;
  } catch {
    // Fall back to the Supabase client error message below.
  }

  return error.message || "Unknown Edge Function error.";
}

function showConsentDialog() {
  return new Promise((resolve) => {
    const existing = document.querySelector(".ppgis-consent-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "ppgis-consent-overlay";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `
      <section class="ppgis-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="ppgisConsentTitle">
        <h3 id="ppgisConsentTitle">Consent to Submit Your Data</h3>
        <div class="ppgis-consent-copy">
          <p>
            This form collects your name, photo, story, voice/audio, text, and volunteered geographic information for this PPGIS research project.
          </p>
          <p>
            You may choose whether your post is visible to other visitors. Even if it is hidden from public display, the submitted data will be stored in the master database owned and administered by Sechang Kim. Contact: vs5345@uw.edu.
          </p>
          <p>
            Data is protected by Supabase security settings and will not be used for commercial or unrelated purposes. Your consent is voluntary, specific to this submission, informed by these terms, and shown by selecting the agreement button below.
          </p>
        </div>
        <div class="ppgis-consent-actions">
          <button class="ppgis-consent-agree" type="button">I have read and agree to submit my data</button>
          <button class="ppgis-consent-decline" type="button">I read but do not agree with the terms</button>
        </div>
      </section>
    `;

    document.body.append(overlay);
    const agreeButton = overlay.querySelector(".ppgis-consent-agree");
    const declineButton = overlay.querySelector(".ppgis-consent-decline");

    function close(agreed) {
      overlay.remove();
      resolve(agreed);
    }

    agreeButton.addEventListener("click", () => close(true));
    declineButton.addEventListener("click", () => close(false));
    agreeButton.focus();
  });
}

function openSubmissionForm(lat, lng) {
  resetSavedLogState();
  setStatus("Draft marker placed. Complete the form on the right.");
  openPopover(`
    <form class="ppgis-popup-form" data-lat="${lat}" data-lng="${lng}">
      <button class="ppgis-popover-close" type="button" aria-label="Close">&times;</button>
      <h3>Submit This Place</h3>
      <p class="popup-form-message">Selected location: ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>

      <section class="form-step">
        <p class="step-label">Step 1</p>
        <h4>Name and Anonymity</h4>
        <label>
          <span class="field-label-line">Name <span class="field-required">required</span></span>
          <input name="real_name" type="text" required placeholder="Stored in master database">
        </label>
        <label class="ppgis-popup-check">
          <input name="is_anonymous" type="checkbox" checked>
          Anonymous on the public map
        </label>
        <label>
          <span class="field-label-line">Title <span class="field-required">required</span></span>
          <input name="title" type="text" maxlength="120" required placeholder="Short title for this place">
        </label>
      </section>

      <section class="form-step">
        <p class="step-label">Step 2</p>
        <h4>Choose What to Log</h4>
        <div class="log-type-grid" aria-label="Choose log type">
          <button class="log-type-card" type="button" data-log-type="text" aria-pressed="false">
            <span class="log-type-icon log-type-text-icon" aria-hidden="true">Aa</span>
            <span>Text</span>
          </button>
          <button class="log-type-card" type="button" data-log-type="photo" aria-pressed="false">
            <span class="log-type-icon" aria-hidden="true">
              <img src="img/camera.png" alt="">
            </span>
            <span>Photo</span>
          </button>
          <button class="log-type-card" type="button" data-log-type="audio" aria-pressed="false">
            <span class="log-type-icon log-type-audio-icon" aria-hidden="true">REC</span>
            <span>Audio</span>
          </button>
        </div>
      </section>

      <section class="form-step">
        <p class="step-label">Step 3</p>
        <h4>Add and Save Content</h4>
        <div id="text-log-panel" class="log-panel" hidden>
          <label>
            <span class="field-label-line">Text <span class="field-optional">optional</span></span>
            <textarea id="text-log-draft" rows="4" placeholder="Describe this place or experience"></textarea>
          </label>
          <button id="save-text-log" class="save-log-button" type="button">Save Text</button>
          <p id="text-status" class="media-status">No text saved.</p>
        </div>

        <div id="photo-log-panel" class="log-panel" hidden>
          <span class="field-label-line">Photo <span class="field-optional">optional</span></span>
          <div class="media-choice-grid">
            <label class="media-action">
              <input id="photo-upload-file" name="photo_upload_file" type="file" accept="image/*">
              <span class="media-action-ui" aria-hidden="true">
                <img class="media-action-icon" src="img/gallery.png" alt="">
                <span>Go to Gallery</span>
              </span>
            </label>
            <label class="media-action">
              <input id="photo-capture-file" name="photo_capture_file" type="file" accept="image/*" capture="environment">
              <span class="media-action-ui" aria-hidden="true">
                <img class="media-action-icon" src="img/camera.png" alt="">
                <span>Go to Camera</span>
              </span>
            </label>
          </div>
          <button id="save-photo-log" class="save-log-button" type="button">Save Photo</button>
          <p id="photo-status" class="media-status">No photo selected.</p>
        </div>

        <div id="audio-log-panel" class="log-panel" hidden>
          <span class="field-label-line">Audio <span class="field-optional">optional</span></span>
          <div class="media-choice-grid">
            <label>
              Upload Audio File
              <input id="audio-upload-file" name="audio_upload_file" type="file" accept="audio/*">
            </label>
            <div class="recording-controls">
              <span>Record Audio</span>
              <div class="recording-buttons">
                <button id="start-recording" type="button">Start Recording</button>
                <button id="stop-recording" type="button" disabled>Stop Recording</button>
              </div>
            </div>
          </div>
          <button id="save-audio-log" class="save-log-button" type="button">Save Audio</button>
          <p id="audio-status" class="media-status">No audio selected or recorded.</p>
        </div>
      </section>

      <section class="form-step">
        <p class="step-label">Step 4</p>
        <h4>Sharing</h4>
        <label class="checkbox-label">
          <input type="checkbox" id="share-public" name="share_public" checked>
          Share this log publicly
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-photo" name="show_photo" checked>
          Show my photo to other users
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-audio" name="show_audio">
          Show my audio to other users
        </label>
      </section>

      <section class="form-step">
        <p class="step-label">Step 5</p>
        <h4>Submit</h4>
        <div class="ppgis-turnstile-wrap">
          <div id="ppgisTurnstile" class="cf-turnstile"></div>
        </div>
        <button type="submit">Submit Saved Log</button>
      </section>
      <p class="popup-form-message"></p>
    </form>
  `);
  renderTurnstileWidget();
}

function setLogPanel(type, active) {
  const button = popover.querySelector(`[data-log-type="${type}"]`);
  const panel = document.getElementById(`${type}-log-panel`);
  if (button) {
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
  if (panel) {
    panel.hidden = !active;
    panel.classList.toggle("is-open", active);
  }
}

function toggleLogType(type) {
  const active = selectedLogTypes.has(type);

  if (active) {
    selectedLogTypes.delete(type);
    if (type === "text") savedTextLog = null;
    if (type === "photo") savedPhotoFile = null;
    if (type === "audio") savedAudioFile = null;
    setLogPanel(type, false);
    return;
  }

  selectedLogTypes.add(type);
  setLogPanel(type, true);
}

function clearDraftMarker() {
  if (draftMarker) {
    draftMarker.remove();
    draftMarker = null;
  }
}

function selectedFileFromInput(id) {
  const input = document.getElementById(id);
  return input?.files?.[0] || null;
}

function setMediaStatus(id, message, type = "") {
  const status = document.getElementById(id);
  if (!status) return;
  status.textContent = message;
  status.className = `media-status ${type}`.trim();
}

function stopActiveAudioStream() {
  if (activeAudioStream) {
    activeAudioStream.getTracks().forEach((track) => track.stop());
    activeAudioStream = null;
  }
}

function resetRecordingState() {
  recordedAudioChunks = [];
  mediaRecorder = null;
  stopActiveAudioStream();
}

function fileExtension(file) {
  const nameParts = file.name.split(".");
  const extension = nameParts.length > 1 ? nameParts.pop().toLowerCase() : "";
  return extension ? `.${extension}` : "";
}

async function uploadMediaFile(file, folder, maxBytes) {
  if (!file) return null;

  if (file.size > maxBytes) {
    const limitMb = Math.round(maxBytes / 1024 / 1024);
    alert(`${folder === "photos" ? "Photo" : "Audio"} file must be ${limitMb} MB or smaller.`);
    throw new Error("File size exceeds limit");
  }

  const path = `${folder}/${crypto.randomUUID()}${fileExtension(file)}`;
  const { error } = await supabaseClient
    .storage
    .from(MEDIA_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined
    });

  if (error) {
    alert(`Could not upload ${folder === "photos" ? "photo" : "audio"}: ${error.message}`);
    throw error;
  }

  return path;
}

async function getSignedUrl(filePath) {
  if (!filePath) return null;

  const { data, error } = await supabaseClient
    .storage
    .from(MEDIA_BUCKET)
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    console.error("Could not create signed URL:", error);
    return null;
  }

  return data?.signedUrl || null;
}

async function loadApprovedSubmissions() {
  approvedLayer.clearLayers();
  setStatus("Loading approved submissions...");

  const { data, error } = await supabaseClient
    .from("public_submissions")
    .select("id, latitude, longitude, title, body_text, display_name, photo_path, audio_path");

  if (error) {
    setStatus(`Could not load approved submissions: ${error.message}`, "error");
    return;
  }

  for (const row of data) {
    const photoUrl = await getSignedUrl(row.photo_path);
    const audioUrl = await getSignedUrl(row.audio_path);
    const publicRow = {
      ...row,
      photo_url: photoUrl,
      audio_url: audioUrl
    };

    L.circleMarker([row.latitude, row.longitude], {
      radius: 7,
      color: "#DA895A",
      fillColor: "#DA895A",
      fillOpacity: 0.86,
      weight: 2,
      bubblingMouseEvents: false
    }).on("click", () => publicPanel(publicRow)).addTo(approvedLayer);
  }

  setStatus(`Showing ${data.length} approved submission${data.length === 1 ? "" : "s"}.`);
}

map.on("click", (event) => {
  if (popover.classList.contains("is-open")) {
    if (popover.querySelector(".ppgis-popup-form")) {
      clearDraftMarker();
      setStatus("Selection cleared.");
    }
    closePopover();
    return;
  }

  const { lat, lng } = event.latlng;

  if (draftMarker) {
    draftMarker.setLatLng([lat, lng]);
  } else {
    draftMarker = L.marker([lat, lng], { draggable: true }).addTo(map);
    draftMarker.on("dragend", () => {
      const position = draftMarker.getLatLng();
      openSubmissionForm(position.lat, position.lng);
    });
  }

  openSubmissionForm(lat, lng);
});

popover.addEventListener("click", (event) => {
  if (event.target.closest(".ppgis-popover-close")) {
    if (event.target.closest(".ppgis-popup-form")) {
      clearDraftMarker();
      setStatus("Selection cleared.");
    }
    closePopover();
    return;
  }

  const logTypeButton = event.target.closest(".log-type-card");
  if (logTypeButton) {
    toggleLogType(logTypeButton.dataset.logType);
    return;
  }

  if (event.target.closest("#save-text-log")) {
    const textDraft = document.getElementById("text-log-draft");
    const value = String(textDraft?.value || "").trim();
    if (!value) {
      setMediaStatus("text-status", "Add text before saving.", "recording");
      return;
    }
    savedTextLog = value;
    setMediaStatus("text-status", "Text saved.", "success");
    return;
  }

  if (event.target.closest("#save-photo-log")) {
    const file = selectedFileFromInput("photo-capture-file") || selectedFileFromInput("photo-upload-file");
    if (!file) {
      setMediaStatus("photo-status", "Choose or take a photo before saving.", "recording");
      return;
    }
    savedPhotoFile = file;
    setMediaStatus("photo-status", `Photo saved: ${file.name}`, "success");
    return;
  }

  if (event.target.closest("#save-audio-log")) {
    const file = recordedAudioFile || selectedFileFromInput("audio-upload-file");
    if (!file) {
      setMediaStatus("audio-status", "Upload or record audio before saving.", "recording");
      return;
    }
    savedAudioFile = file;
    setMediaStatus("audio-status", `Audio saved: ${file.name}`, "success");
    return;
  }

  if (event.target.closest("#start-recording")) {
    startAudioRecording();
    return;
  }

  if (event.target.closest("#stop-recording")) {
    stopAudioRecording();
  }
});

popover.addEventListener("change", (event) => {
  if (event.target.matches("#photo-upload-file, #photo-capture-file")) {
    const file = event.target.files?.[0];
    savedPhotoFile = null;
    setMediaStatus("photo-status", file ? `Selected photo: ${file.name}. Save Photo to include it.` : "No photo selected.", file ? "" : "");
  }

  if (event.target.matches("#audio-upload-file")) {
    const file = event.target.files?.[0];
    if (file) {
      recordedAudioFile = null;
      savedAudioFile = null;
    }
    setMediaStatus("audio-status", file ? `Selected audio: ${file.name}. Save Audio to include it.` : "No audio selected or recorded.", file ? "" : "");
  }
});

popover.addEventListener("input", (event) => {
  if (event.target.matches("#text-log-draft")) {
    savedTextLog = null;
    setMediaStatus("text-status", "Draft changed. Save Text to include it.");
  }
});

async function startAudioRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    alert("In-browser audio recording is not supported by this browser. Please upload an audio file instead.");
    return;
  }

  try {
    recordedAudioChunks = [];
    activeAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(activeAudioStream);

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedAudioChunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener("stop", () => {
      const mimeType = mediaRecorder.mimeType || "audio/webm";
      const blob = new Blob(recordedAudioChunks, { type: mimeType });
      const extension = mimeType.includes("mp4") ? "m4a" : "webm";
      recordedAudioFile = new File([blob], `recorded-audio-${crypto.randomUUID()}.${extension}`, { type: mimeType });
      savedAudioFile = null;
      stopActiveAudioStream();
      setMediaStatus("audio-status", `Recorded audio ready: ${recordedAudioFile.name}. Save Audio to include it.`, "success");
      document.getElementById("start-recording").disabled = false;
      document.getElementById("stop-recording").disabled = true;
    });

    mediaRecorder.start();
    document.getElementById("start-recording").disabled = true;
    document.getElementById("stop-recording").disabled = false;
    setMediaStatus("audio-status", "Recording audio...", "recording");
  } catch (error) {
    console.error("Audio recording failed:", error);
    alert("Could not start audio recording. Please check microphone permission or upload an audio file.");
    resetRecordingState();
  }
}

function stopAudioRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

popover.addEventListener("submit", async (submitEvent) => {
  const form = submitEvent.target.closest(".ppgis-popup-form");
  if (!form) return;

  submitEvent.preventDefault();

  const message = form.querySelector(".popup-form-message:last-child");
  const formData = new FormData(form);
  const showPhoto = document.getElementById("show-photo").checked;
  const showAudio = document.getElementById("show-audio").checked;
  const sharePublic = document.getElementById("share-public").checked;
  const activeSavedText = selectedLogTypes.has("text") ? savedTextLog : null;
  const activeSavedPhoto = selectedLogTypes.has("photo") ? savedPhotoFile : null;
  const activeSavedAudio = selectedLogTypes.has("audio") ? savedAudioFile : null;
  const payload = {
    latitude: Number(form.dataset.lat),
    longitude: Number(form.dataset.lng),
    real_name: String(formData.get("real_name") || "").trim(),
    title: String(formData.get("title") || "").trim() || null,
    body_text: activeSavedText,
    is_anonymous: formData.get("is_anonymous") === "on",
    photo_path: null,
    audio_path: null,
    show_photo: showPhoto,
    show_audio: showAudio
  };
  // `share_public` is sent to the Edge Function for future schema support, but
  // the function keeps it out of the insert until the table has that column.

  if (!payload.real_name) {
    message.textContent = "Name is required for the master database.";
    message.className = "popup-form-message error";
    return;
  }

  if (!payload.title) {
    message.textContent = "Title is required.";
    message.className = "popup-form-message error";
    return;
  }

  if (!selectedLogTypes.size) {
    message.textContent = "Choose at least one log type before submitting.";
    message.className = "popup-form-message error";
    return;
  }

  if (selectedLogTypes.has("text") && !activeSavedText) {
    message.textContent = "Save your text before submitting.";
    message.className = "popup-form-message error";
    return;
  }

  if (selectedLogTypes.has("photo") && !activeSavedPhoto) {
    message.textContent = "Save your photo before submitting.";
    message.className = "popup-form-message error";
    return;
  }

  if (selectedLogTypes.has("audio") && !activeSavedAudio) {
    message.textContent = "Save your audio before submitting.";
    message.className = "popup-form-message error";
    return;
  }

  if (!activeSavedText && !activeSavedPhoto && !activeSavedAudio) {
    message.textContent = "Save at least one log component before submitting.";
    message.className = "popup-form-message error";
    return;
  }

  const turnstileToken = getTurnstileToken();
  if (!turnstileToken) {
    alert("Please complete the verification before submitting.");
    message.textContent = "Complete the verification before submitting.";
    message.className = "popup-form-message error";
    return;
  }

  const consentGranted = await showConsentDialog();
  if (!consentGranted) {
    message.textContent = "You can continue viewing the map, but you cannot submit data unless you agree to the consent terms.";
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    return;
  }

  message.textContent = "Uploading media and submitting...";
  message.className = "popup-form-message";

  try {
    payload.photo_path = await uploadMediaFile(activeSavedPhoto, "photos", MAX_PHOTO_BYTES);
    payload.audio_path = await uploadMediaFile(activeSavedAudio, "audio", MAX_AUDIO_BYTES);
  } catch {
    message.textContent = "Submission stopped because media upload failed.";
    message.className = "popup-form-message error";
    return;
  }

  const functionPayload = {
    turnstileToken,
    ...payload,
    share_public: sharePublic
  };

  const { data, error } = await supabaseClient.functions.invoke("submit-ppgis-log", {
    body: functionPayload
  });

  if (error) {
    const errorMessage = await edgeFunctionErrorMessage(error);
    message.textContent = `Submission failed: ${errorMessage}`;
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    return;
  }

  if (data?.error) {
    message.textContent = `Submission failed: ${data.error}`;
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    return;
  }

  alert("Submission received. It is now visible on the map.");
  form.reset();
  resetTurnstileWidget();
  message.textContent = "Submission received. Reloading map...";
  message.className = "popup-form-message success";
  clearDraftMarker();
  closePopover();
  await loadApprovedSubmissions();
});

basemapSelect.addEventListener("change", (event) => {
  Object.values(baseLayers).forEach((layer) => map.removeLayer(layer));
  baseLayers[event.target.value].addTo(map);
});

refreshButton.addEventListener("click", loadApprovedSubmissions);
loadApprovedSubmissions();
