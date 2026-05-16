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
        <input id="photo-file" name="photo_file" type="file" accept="image/*" capture="environment">
        <span class="field-help">On mobile, this can open the camera. On desktop, choose an image file.</span>
      </label>
      <label class="checkbox-label">
        <input type="checkbox" id="show-photo" name="show_photo" checked>
        Show my photo to other users
      </label>
      <label>
        <span class="field-label-line">Audio <span class="field-optional">optional</span></span>
        <input id="audio-file" name="audio_file" type="file" accept="audio/*" capture>
        <span class="field-help">On mobile, this can open recording options. On desktop, choose an audio file.</span>
      </label>
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
  }
});

popover.addEventListener("submit", async (submitEvent) => {
  const form = submitEvent.target.closest(".ppgis-popup-form");
  if (!form) return;

  submitEvent.preventDefault();

  const message = form.querySelector(".popup-form-message:last-child");
  const formData = new FormData(form);
  const photoFile = formData.get("photo_file");
  const audioFile = formData.get("audio_file");
  const selectedPhoto = photoFile instanceof File && photoFile.size > 0 ? photoFile : null;
  const selectedAudio = audioFile instanceof File && audioFile.size > 0 ? audioFile : null;
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
