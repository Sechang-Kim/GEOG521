const SUPABASE_URL = "https://ovubnhmmonnrywhktjax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2JgXPdRqSLmQ1YYKFUp7iA_rndlY_Jr";
const MEDIA_BUCKET = "ppgis-media";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;

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
  resetRecordingState();
  popover.classList.remove("is-open");
  popover.innerHTML = "";
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

function openSubmissionForm(lat, lng) {
  recordedAudioFile = null;
  setStatus("Draft marker placed. Complete the form on the right.");
  openPopover(`
    <form class="ppgis-popup-form" data-lat="${lat}" data-lng="${lng}">
      <button class="ppgis-popover-close" type="button" aria-label="Close">&times;</button>
      <h3>Submit This Place</h3>
      <p class="popup-form-message">Selected location: ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
      <label>
        <span class="field-label-line">Name <span class="field-required">required</span></span>
        <input name="real_name" type="text" required placeholder="Stored in master database">
      </label>
      <label class="ppgis-popup-check">
        <input name="is_anonymous" type="checkbox" checked>
        Anonymous
      </label>
      <label>
        <span class="field-label-line">Title <span class="field-required">required</span></span>
        <input name="title" type="text" maxlength="120" required placeholder="Short title">
      </label>
      <label>
        <span class="field-label-line">Contents <span class="field-required">required</span></span>
        <textarea name="body_text" rows="4" required placeholder="Describe this place or experience"></textarea>
      </label>
      <label>
        <span class="field-label-line">Photo <span class="field-optional">optional</span></span>
      </label>
      <div class="media-choice-grid">
        <label>
          Upload Photo from Gallery
          <input id="photo-upload-file" name="photo_upload_file" type="file" accept="image/*">
        </label>
        <label>
          Take Photo
          <input id="photo-capture-file" name="photo_capture_file" type="file" accept="image/*" capture="environment">
        </label>
      </div>
      <p id="photo-status" class="media-status">No photo selected.</p>
      <label class="checkbox-label">
        <input type="checkbox" id="show-photo" name="show_photo" checked>
        Show my photo to other users
      </label>
      <label>
        <span class="field-label-line">Audio <span class="field-optional">optional</span></span>
      </label>
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
      <p id="audio-status" class="media-status">No audio selected or recorded.</p>
      <label class="checkbox-label">
        <input type="checkbox" id="show-audio" name="show_audio">
        Show my audio to other users
      </label>
      <button type="submit">Submit</button>
      <p class="popup-form-message"></p>
    </form>
  `);
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
    setMediaStatus("photo-status", file ? `Selected photo: ${file.name}` : "No photo selected.", file ? "success" : "");
  }

  if (event.target.matches("#audio-upload-file")) {
    const file = event.target.files?.[0];
    if (file) {
      recordedAudioFile = null;
    }
    setMediaStatus("audio-status", file ? `Selected audio: ${file.name}` : "No audio selected or recorded.", file ? "success" : "");
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
      stopActiveAudioStream();
      setMediaStatus("audio-status", `Recorded audio ready: ${recordedAudioFile.name}`, "success");
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
  const selectedPhoto = selectedFileFromInput("photo-capture-file") || selectedFileFromInput("photo-upload-file");
  const selectedAudio = recordedAudioFile || selectedFileFromInput("audio-upload-file");
  const showPhoto = document.getElementById("show-photo").checked;
  const showAudio = document.getElementById("show-audio").checked;
  const payload = {
    latitude: Number(form.dataset.lat),
    longitude: Number(form.dataset.lng),
    real_name: String(formData.get("real_name") || "").trim(),
    title: String(formData.get("title") || "").trim() || null,
    body_text: String(formData.get("body_text") || "").trim() || null,
    is_anonymous: formData.get("is_anonymous") === "on",
    photo_path: null,
    audio_path: null,
    show_photo: showPhoto,
    show_audio: showAudio
  };

  if (!payload.real_name) {
    message.textContent = "Name is required for the master database.";
    message.className = "popup-form-message error";
    return;
  }

  if (!payload.title || !payload.body_text) {
    message.textContent = "Name, title, and contents are required.";
    message.className = "popup-form-message error";
    return;
  }

  message.textContent = "Uploading media and submitting...";
  message.className = "popup-form-message";

  try {
    payload.photo_path = await uploadMediaFile(selectedPhoto, "photos", MAX_PHOTO_BYTES);
    payload.audio_path = await uploadMediaFile(selectedAudio, "audio", MAX_AUDIO_BYTES);
  } catch {
    message.textContent = "Submission stopped because media upload failed.";
    message.className = "popup-form-message error";
    return;
  }

  const { error } = await supabaseClient
    .from("submissions")
    .insert(payload);

  if (error) {
    message.textContent = `Submission failed: ${error.message}`;
    message.className = "popup-form-message error";
    return;
  }

  alert("Submission received. It is now visible on the map.");
  form.reset();
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
