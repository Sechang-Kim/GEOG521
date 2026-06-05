const SUPABASE_URL = "https://ovubnhmmonnrywhktjax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2JgXPdRqSLmQ1YYKFUp7iA_rndlY_Jr";
const MEDIA_BUCKET = "ppgis-media";
const MAX_PHOTO_BYTES = 50 * 1024 * 1024;
const MAX_COMPRESSED_PHOTO_BYTES = 10 * 1024 * 1024;
const PHOTO_MAX_EDGE_PX = 1600;
const PHOTO_JPEG_QUALITY = 0.82;
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
const TURNSTILE_SITE_KEY = "0x4AAAAAADdPqMVnjCWpuPM3";
const PROFILE_CONSENT_KEY = "ppgisResearchConsentAccepted";
const WELCOME_DISMISSED_KEY = "ppgisWelcomeDismissedUntil";
const LANGUAGE_KEY = "ppgisLanguage";
const DEFAULT_MARKER_COLOR = "#ff7f00";
const MEDIA_UPLOAD_TIMEOUT_MS = 45000;
const FUNCTION_TIMEOUT_MS = 30000;
const MARKER_COLOR_OPTIONS = [
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
];

const I18N = {
  en: {
    "common.close": "Close",
    "common.cancel": "Cancel",
    "common.agree": "I have read and agree",
    "common.decline": "I read but do not agree",
    "common.participant": "Participant",
    "common.anonymous": "Anonymous",
    "nav.primary": "Primary navigation",
    "language.selector": "Language",
    "auth.signFull": "Sign in / Sign up",
    "auth.signShort": "Sign in",
    "auth.signAria": "Sign in or sign up",
    "auth.account": "Account menu",
    "auth.logout": "Log out",
    "auth.signedOut": "Signed out. Public submissions remain view-only.",
    "auth.signInRequired": "Sign In Required",
    "auth.signInRequiredCopy": "Public submissions are open for viewing. To add your own log, sign in with Google after reviewing the research agreement.",
    "auth.signIn": "Sign In",
    "auth.needSignInSubmit": "Sign in before submitting a log.",
    "auth.agreementRequired": "Agreement is required before adding logs. Public submissions remain view-only.",
    "map.aria": "Participatory GIS map",
    "welcome.aria": "Participatory GIS instructions",
    "welcome.eyebrow": "Participatory GIS",
    "welcome.title": "Share a Place-Based Story",
    "welcome.copy": "Click the map to place a marker. Signed-in users can submit a title, story, and anonymity choice. Visitors who are not signed in can view approved public submissions.",
    "welcome.hide24": "Do not show for 24 hours",
    "location.use": "Use my location",
    "location.unsupported": "This browser does not support location services.",
    "location.confirm": "Allow this site to use your current location?",
    "location.requesting": "Requesting your location...",
    "location.popup": "Your current location",
    "location.found": "Location found and shown on the map.",
    "location.denied": "Location permission was denied.",
    "location.failed": "Could not find your current location.",
    "basemap.openStreetMap": "OpenStreetMap",
    "basemap.cartoLight": "CARTO Light",
    "basemap.satellite": "Satellite Imagery",
    "view.showOnMap": "Show on Map",
    "view.menuAria": "Account and map visibility",
    "view.public": "Public Logs",
    "view.mine": "My Logs",
    "view.shared": "Shared",
    "view.secret": "Secret",
    "view.secretHelp": "Not shown on the public map.",
    "consent.researchTitle": "Consent to Submit Your Data",
    "consent.researchCopy1": "This form collects your name, email, photo, story, voice/audio, text, and volunteered geographic information for this PPGIS research project.",
    "consent.researchCopy2": "You may choose whether your post is visible to other visitors. Even if it is hidden from public display, the submitted data will be stored in the master database owned and administered by Sechang Kim. Contact: vs5345@uw.edu.",
    "consent.researchCopy3": "Please do not submit anything you do not want the researcher to store. You can continue viewing the public map without signing in.",
    "consent.interviewTitle": "Additional Interview Contact",
    "consent.interviewCopy": "A researcher may contact you by email in the future to request an additional interview. You may decline if you do not wish to participate, and not responding will be treated as declining. Even if you accept an interview request, you may cancel or stop the interview at any time.",
    "popup.secretBadge": "Secret",
    "popup.sharedBadge": "Shared",
    "popup.notPublic": "Not shown on the public map.",
    "popup.hiddenText": "This participant chose not to show the text publicly.",
    "popup.noStory": "No story provided.",
    "popup.untitled": "Untitled place",
    "popup.submittedBy": "Submitted by:",
    "popup.submittedPhoto": "Submitted photo",
    "popup.editLog": "Edit this log",
    "popup.deleteLog": "Delete this log",
    "popup.markerColor": "Marker color",
    "popup.showText": "Show my text to other users",
    "popup.story": "Story",
    "popup.saveChanges": "Save Changes",
    "popup.deletePassword": "Delete password",
    "popup.deletePasswordHelp": "Enter the 6-digit password you set when submitting this log.",
    "popup.deletePermanently": "Delete Permanently",
    "popup.youAnonymous": "You (anonymous publicly)",
    "form.draftPlaced": "Draft marker placed. Complete the form on the right.",
    "form.selectionCleared": "Selection cleared.",
    "form.title": "Submit This Place",
    "form.selectedLocation": "Selected location: {lat}, {lng}",
    "form.step1": "Place",
    "form.step2": "Log",
    "form.step3": "Content",
    "form.step4": "Sharing",
    "form.step5": "Submit",
    "form.stepLabel1": "Step 1 of 5",
    "form.stepLabel2": "Step 2 of 5",
    "form.stepLabel3": "Step 3 of 5",
    "form.stepLabel4": "Step 4 of 5",
    "form.stepLabel5": "Step 5 of 5",
    "form.submissionProgress": "Submission progress",
    "form.placeTitle": "Name This Place",
    "form.placeHelp": "Use a short title that helps others understand the place you marked.",
    "form.submittingAs": "Submitting as {name} ({email}). Your login name and email are stored in the master database.",
    "form.noEmail": "no email",
    "form.anonymousPublic": "Anonymous on the public map",
    "form.titleField": "Title",
    "form.shortTitle": "Short title for this place",
    "form.chooseLog": "Choose What to Log",
    "form.chooseLogHelp": "Choose one log type, save it, then return here. Saved logs turn green. You can add more than one type.",
    "form.chooseLogAria": "Choose log type",
    "form.text": "Text",
    "form.photo": "Photo",
    "form.audio": "Audio",
    "form.notSaved": "Not saved",
    "form.saved": "Saved",
    "form.choiceNone": "Save at least one text, photo, or audio log before continuing.",
    "form.choiceSaved": "{count} saved. You can add another log type or continue to sharing.",
    "form.contentTitle": "Add and Save Content",
    "form.contentTitleForType": "Add and Save {label}",
    "form.contentHelp": "Save this log type before returning to the log choices.",
    "form.textLog": "Text Log",
    "form.photoLog": "Photo Log",
    "form.audioLog": "Audio Log",
    "form.contentSavedHelp": "{label} is saved. Tap Done to return to log choices.",
    "form.contentUnsavedHelp": "Save this {label} before returning to log choices.",
    "form.textPlaceholder": "Describe this place or experience",
    "form.saveText": "Save Text",
    "form.noText": "No text saved.",
    "form.gallery": "Go to Gallery",
    "form.camera": "Go to Camera",
    "form.savePhoto": "Save Photo",
    "form.noPhoto": "No photo selected.",
    "form.uploadAudio": "Upload Audio File",
    "form.recordAudio": "Record Audio",
    "form.startRecording": "Start Recording",
    "form.stopRecording": "Stop Recording",
    "form.saveAudio": "Save Audio",
    "form.noAudio": "No audio selected or recorded.",
    "form.sharingTitle": "Sharing",
    "form.sharingHelp": "Choose what appears on the public map. Private items are stored for project administration but are not shown publicly.",
    "form.sharePublic": "Share this log publicly",
    "form.showText": "Show my text to other users",
    "form.showPhoto": "Show my photo to other users",
    "form.showAudio": "Show my audio to other users",
    "form.privateHelp": "If the log, location, text, photo, or audio is not shared publicly, only the administrator can view that saved data.",
    "form.submitTitle": "Submit",
    "form.editPassword": "Edit/Delete password",
    "form.required": "required",
    "form.optional": "optional",
    "form.passwordHelp": "Use this 6-digit numeric password if you want to edit or delete this log later.",
    "form.passwordPlaceholder": "6 digits",
    "form.submitButton": "Submit Saved Log",
    "form.back": "Back",
    "form.next": "Next",
    "form.nextLog": "Next: Log Type",
    "form.nextSharing": "Next: Sharing",
    "form.nextSubmit": "Next: Submit",
    "form.doneChoices": "Done: Back to Log Choices",
    "form.done": "Done",
    "form.saveFirst": "Save First",
    "status.addTextBeforeSave": "Add text before saving.",
    "status.textSaved": "Text saved.",
    "status.choosePhoto": "Choose or take a photo before saving.",
    "status.photoPreparing": "Resizing and compressing photo from {size}...",
    "status.photoSaved": "Photo saved: {size} JPEG, longest edge {edge}px.",
    "status.photoSelected": "Selected photo: {name}. Save Photo to include it.",
    "status.photoNone": "No photo selected.",
    "status.audioSelected": "Selected audio: {name}. Save Audio to include it.",
    "status.audioNone": "No audio selected or recorded.",
    "status.audioSaved": "Audio saved: {name}",
    "status.audioRecorded": "Recorded audio ready: {name}. Save Audio to include it.",
    "status.recording": "Recording audio...",
    "status.textChanged": "Draft changed. Save Text to include it.",
    "status.chooseAudio": "Upload or record audio before saving.",
    "status.preparing": "Preparing submission...",
    "status.uploadPhoto": "Uploading photo...",
    "status.uploadAudio": "Uploading audio...",
    "status.submitting": "Submitting saved log...",
    "status.receivedReloading": "Submission received. Reloading map...",
    "status.mediaUploadFailed": "Submission stopped because media upload failed: {message}",
    "status.submissionFailed": "Submission failed: {message}",
    "status.loadPublicFailed": "Could not load public logs: {message}",
    "status.loadMineFailed": "Could not load your logs: {message}",
    "status.deleteFailed": "Delete failed: {message}",
    "status.deleteWorking": "Deleting and updating map...",
    "status.deleteComplete": "Deleting Complete",
    "status.editFailed": "Edit failed: {message}",
    "status.editWorking": "Editing and updating map...",
    "status.editComplete": "Editing Complete",
    "validation.titleRequired": "Title is required.",
    "validation.titleBeforeNext": "Add a short title before continuing.",
    "validation.passwordSix": "Edit/delete password must be exactly 6 numeric digits.",
    "validation.deletePassword": "Enter the 6-digit delete password.",
    "validation.editPassword": "Enter the 6-digit edit password.",
    "validation.chooseOne": "Choose at least one log type before submitting.",
    "validation.saveLogFirst": "Save a log first.",
    "validation.saveCurrentType": "Save this log type before returning to the log choices.",
    "validation.saveText": "Save your text before submitting.",
    "validation.savePhoto": "Save your photo before submitting.",
    "validation.saveAudio": "Save your audio before submitting.",
    "validation.saveOne": "Save at least one log component before submitting.",
    "validation.turnstileAlert": "Please complete the verification before submitting.",
    "validation.turnstile": "Complete the verification before submitting.",
    "validation.interviewDeclined": "You can continue viewing the map, but this submission was not saved because the interview contact notice was declined.",
    "validation.photoTooLarge": "Photo file must be smaller than {size} before compression.",
    "validation.notImage": "Choose an image file before saving.",
    "validation.photoReadFailed": "This photo format could not be read by the browser. Use a JPEG or PNG photo, or export the image before uploading.",
    "validation.photoDimensions": "Could not read the photo dimensions.",
    "validation.photoPrepare": "Could not prepare the photo for upload.",
    "validation.photoCompress": "Could not compress the photo.",
    "validation.compressedTooLarge": "Compressed photo must be {size} or smaller.",
    "validation.fileSize": "{type} file must be {size} or smaller.",
    "validation.fileTooLarge": "File size exceeds limit",
    "validation.uploadFailed": "Could not upload {type}: {message}",
    "validation.audioUnsupported": "In-browser audio recording is not supported by this browser. Please upload an audio file instead.",
    "validation.audioStartFailed": "Could not start audio recording. Please check microphone permission or upload an audio file.",
    "validation.signAgain": "Sign in again before submitting.",
    "validation.submitTimeout": "Submission request timed out after 30 seconds. Check the submit-ppgis-log Edge Function logs.",
    "confirm.delete": "Delete this log permanently?",
    "alert.publicReceived": "Submission received. It is visible to you now and will appear on the public map after approval.",
    "alert.secretReceived": "Submission received. It is saved as a secret log and is visible to you now.",
    "error.unknownFunction": "Unknown Edge Function error.",
    "error.submitFunction": "Could not reach the submission function.",
    "error.deleteFunction": "Could not reach the delete function.",
    "error.editFunction": "Could not reach the edit function."
  },
  ko: {
    "common.close": "닫기",
    "common.cancel": "취소",
    "common.agree": "읽었고 동의합니다",
    "common.decline": "읽었지만 동의하지 않습니다",
    "common.participant": "참여자",
    "common.anonymous": "익명",
    "nav.primary": "주요 메뉴",
    "language.selector": "언어 선택",
    "auth.signFull": "로그인 / 가입",
    "auth.signShort": "로그인",
    "auth.signAria": "로그인 또는 가입",
    "auth.account": "계정 메뉴",
    "auth.logout": "로그아웃",
    "auth.signedOut": "로그아웃되었습니다. 공개된 기록은 계속 볼 수 있습니다.",
    "auth.signInRequired": "로그인이 필요합니다",
    "auth.signInRequiredCopy": "공개된 기록은 누구나 볼 수 있습니다. 직접 기록을 남기려면 연구 동의 내용을 확인한 뒤 Google 계정으로 로그인해 주세요.",
    "auth.signIn": "로그인",
    "auth.needSignInSubmit": "기록을 제출하려면 먼저 로그인해 주세요.",
    "auth.agreementRequired": "기록을 추가하려면 먼저 동의가 필요합니다. 공개된 기록은 계속 볼 수 있습니다.",
    "map.aria": "참여형 GIS 지도",
    "welcome.aria": "참여형 GIS 안내",
    "welcome.eyebrow": "참여형 GIS",
    "welcome.title": "장소에 얽힌 이야기를 나눠 주세요",
    "welcome.copy": "지도에서 원하는 장소를 눌러 마커를 놓아 주세요. 로그인한 사용자는 제목, 이야기, 익명 여부를 선택해 기록을 제출할 수 있습니다. 로그인하지 않은 방문자는 승인된 공개 기록을 볼 수 있습니다.",
    "welcome.hide24": "24시간 동안 보지 않기",
    "location.use": "내 위치 사용",
    "location.unsupported": "이 브라우저에서는 위치 서비스를 사용할 수 없습니다.",
    "location.confirm": "현재 위치를 사용해도 괜찮을까요?",
    "location.requesting": "현재 위치를 확인하는 중입니다...",
    "location.popup": "현재 내 위치",
    "location.found": "현재 위치를 지도에 표시했습니다.",
    "location.denied": "위치 권한이 거부되었습니다.",
    "location.failed": "현재 위치를 찾지 못했습니다.",
    "basemap.openStreetMap": "OpenStreetMap",
    "basemap.cartoLight": "밝은 지도",
    "basemap.satellite": "위성 지도",
    "view.showOnMap": "지도에 표시",
    "view.menuAria": "계정 및 지도 표시 설정",
    "view.public": "공개 기록",
    "view.mine": "내 기록",
    "view.shared": "공유한 기록",
    "view.secret": "비공개 기록",
    "view.secretHelp": "공개 지도에는 보이지 않습니다.",
    "consent.researchTitle": "데이터 제출 동의",
    "consent.researchCopy1": "이 양식은 PPGIS 연구를 위해 이름, 이메일, 사진, 이야기, 음성/오디오, 텍스트, 그리고 자발적으로 제공한 위치 정보를 수집합니다.",
    "consent.researchCopy2": "내 게시물이 다른 방문자에게 보일지 선택할 수 있습니다. 공개 표시를 하지 않더라도 제출된 데이터는 Sechang Kim이 소유하고 관리하는 연구용 데이터베이스에 저장됩니다. 문의: vs5345@uw.edu.",
    "consent.researchCopy3": "연구자가 저장하길 원하지 않는 내용은 제출하지 마세요. 로그인하지 않아도 공개 지도는 계속 볼 수 있습니다.",
    "consent.interviewTitle": "추가 인터뷰 연락 안내",
    "consent.interviewCopy": "향후 연구자가 이메일로 추가 인터뷰를 요청할 수 있습니다. 원하지 않으면 거절해도 되고, 응답하지 않으면 거절한 것으로 간주합니다. 인터뷰를 수락했더라도 언제든지 취소하거나 중단할 수 있습니다.",
    "popup.secretBadge": "비공개",
    "popup.sharedBadge": "공유됨",
    "popup.notPublic": "공개 지도에는 보이지 않습니다.",
    "popup.hiddenText": "작성자가 텍스트를 공개하지 않기로 선택했습니다.",
    "popup.noStory": "작성된 이야기가 없습니다.",
    "popup.untitled": "제목 없는 장소",
    "popup.submittedBy": "작성자:",
    "popup.submittedPhoto": "제출된 사진",
    "popup.editLog": "이 기록 수정",
    "popup.deleteLog": "이 기록 삭제",
    "popup.markerColor": "마커 색상",
    "popup.showText": "내 텍스트를 다른 사용자에게 보여주기",
    "popup.story": "이야기",
    "popup.saveChanges": "변경사항 저장",
    "popup.deletePassword": "삭제 비밀번호",
    "popup.deletePasswordHelp": "이 기록을 제출할 때 설정한 6자리 비밀번호를 입력해 주세요.",
    "popup.deletePermanently": "영구 삭제",
    "popup.youAnonymous": "나 (공개 지도에서는 익명)",
    "form.draftPlaced": "임시 마커를 놓았습니다. 오른쪽 양식을 작성해 주세요.",
    "form.selectionCleared": "선택이 해제되었습니다.",
    "form.title": "이 장소 기록하기",
    "form.selectedLocation": "선택한 위치: {lat}, {lng}",
    "form.step1": "장소",
    "form.step2": "기록",
    "form.step3": "내용",
    "form.step4": "공유",
    "form.step5": "제출",
    "form.stepLabel1": "1단계 / 5단계",
    "form.stepLabel2": "2단계 / 5단계",
    "form.stepLabel3": "3단계 / 5단계",
    "form.stepLabel4": "4단계 / 5단계",
    "form.stepLabel5": "5단계 / 5단계",
    "form.submissionProgress": "제출 진행 단계",
    "form.placeTitle": "장소 이름 정하기",
    "form.placeHelp": "표시한 장소를 다른 사람이 이해할 수 있도록 짧은 제목을 적어 주세요.",
    "form.submittingAs": "{name} ({email}) 계정으로 제출합니다. 로그인 이름과 이메일은 연구용 데이터베이스에 저장됩니다.",
    "form.noEmail": "이메일 없음",
    "form.anonymousPublic": "공개 지도에서는 익명으로 표시",
    "form.titleField": "제목",
    "form.shortTitle": "이 장소의 짧은 제목",
    "form.chooseLog": "무엇을 기록할까요?",
    "form.chooseLogHelp": "기록 유형을 하나 골라 저장한 뒤 다시 이 화면으로 돌아오세요. 저장된 항목은 초록색으로 표시됩니다. 여러 유형을 함께 추가할 수 있습니다.",
    "form.chooseLogAria": "기록 유형 선택",
    "form.text": "텍스트",
    "form.photo": "사진",
    "form.audio": "오디오",
    "form.notSaved": "저장 안 됨",
    "form.saved": "저장됨",
    "form.choiceNone": "계속하려면 텍스트, 사진, 오디오 중 하나 이상을 저장해 주세요.",
    "form.choiceSaved": "{count}개가 저장되었습니다. 다른 기록을 더 추가하거나 공유 단계로 넘어갈 수 있습니다.",
    "form.contentTitle": "내용 추가 및 저장",
    "form.contentTitleForType": "{label} 추가 및 저장",
    "form.contentHelp": "이 기록 유형을 저장한 뒤 기록 선택 화면으로 돌아가 주세요.",
    "form.textLog": "텍스트 기록",
    "form.photoLog": "사진 기록",
    "form.audioLog": "오디오 기록",
    "form.contentSavedHelp": "{label}이 저장되었습니다. 완료를 눌러 기록 선택으로 돌아가세요.",
    "form.contentUnsavedHelp": "기록 선택으로 돌아가기 전에 이 {label}을 저장해 주세요.",
    "form.textPlaceholder": "이 장소나 경험에 대해 적어 주세요",
    "form.saveText": "텍스트 저장",
    "form.noText": "저장된 텍스트가 없습니다.",
    "form.gallery": "갤러리에서 선택",
    "form.camera": "카메라로 촬영",
    "form.savePhoto": "사진 저장",
    "form.noPhoto": "선택한 사진이 없습니다.",
    "form.uploadAudio": "오디오 파일 업로드",
    "form.recordAudio": "오디오 녹음",
    "form.startRecording": "녹음 시작",
    "form.stopRecording": "녹음 중지",
    "form.saveAudio": "오디오 저장",
    "form.noAudio": "선택하거나 녹음한 오디오가 없습니다.",
    "form.sharingTitle": "공유 설정",
    "form.sharingHelp": "공개 지도에 무엇을 보여줄지 선택해 주세요. 비공개 항목은 연구 관리 목적으로 저장되지만 공개되지는 않습니다.",
    "form.sharePublic": "이 기록을 공개적으로 공유",
    "form.showText": "내 텍스트를 다른 사용자에게 보여주기",
    "form.showPhoto": "내 사진을 다른 사용자에게 보여주기",
    "form.showAudio": "내 오디오를 다른 사용자에게 보여주기",
    "form.privateHelp": "기록, 위치, 텍스트, 사진, 오디오를 공개하지 않으면 관리자만 해당 저장 데이터를 볼 수 있습니다.",
    "form.submitTitle": "제출",
    "form.editPassword": "수정/삭제 비밀번호",
    "form.required": "필수",
    "form.optional": "선택",
    "form.passwordHelp": "나중에 이 기록을 수정하거나 삭제하려면 사용할 6자리 숫자 비밀번호를 입력해 주세요.",
    "form.passwordPlaceholder": "숫자 6자리",
    "form.submitButton": "저장한 기록 제출",
    "form.back": "뒤로",
    "form.next": "다음",
    "form.nextLog": "다음: 기록 유형",
    "form.nextSharing": "다음: 공유 설정",
    "form.nextSubmit": "다음: 제출",
    "form.doneChoices": "완료: 기록 선택으로 돌아가기",
    "form.done": "완료",
    "form.saveFirst": "먼저 저장",
    "status.addTextBeforeSave": "저장하기 전에 텍스트를 입력해 주세요.",
    "status.textSaved": "텍스트가 저장되었습니다.",
    "status.choosePhoto": "저장하기 전에 사진을 선택하거나 촬영해 주세요.",
    "status.photoPreparing": "{size} 사진을 리사이즈하고 압축하는 중입니다...",
    "status.photoSaved": "사진이 저장되었습니다: {size} JPEG, 긴 변 {edge}px.",
    "status.photoSelected": "선택한 사진: {name}. 포함하려면 사진 저장을 눌러 주세요.",
    "status.photoNone": "선택한 사진이 없습니다.",
    "status.audioSelected": "선택한 오디오: {name}. 포함하려면 오디오 저장을 눌러 주세요.",
    "status.audioNone": "선택하거나 녹음한 오디오가 없습니다.",
    "status.audioSaved": "오디오가 저장되었습니다: {name}",
    "status.audioRecorded": "녹음한 오디오가 준비되었습니다: {name}. 포함하려면 오디오 저장을 눌러 주세요.",
    "status.recording": "오디오를 녹음하는 중입니다...",
    "status.textChanged": "초안이 변경되었습니다. 포함하려면 텍스트 저장을 눌러 주세요.",
    "status.chooseAudio": "저장하기 전에 오디오를 업로드하거나 녹음해 주세요.",
    "status.preparing": "제출을 준비하는 중입니다...",
    "status.uploadPhoto": "사진을 업로드하는 중입니다...",
    "status.uploadAudio": "오디오를 업로드하는 중입니다...",
    "status.submitting": "저장한 기록을 제출하는 중입니다...",
    "status.receivedReloading": "제출되었습니다. 지도를 다시 불러오는 중입니다...",
    "status.mediaUploadFailed": "미디어 업로드에 실패해 제출을 중단했습니다: {message}",
    "status.submissionFailed": "제출 실패: {message}",
    "status.loadPublicFailed": "공개 기록을 불러오지 못했습니다: {message}",
    "status.loadMineFailed": "내 기록을 불러오지 못했습니다: {message}",
    "status.deleteFailed": "삭제 실패: {message}",
    "status.deleteWorking": "삭제하고 지도를 업데이트하는 중입니다...",
    "status.deleteComplete": "삭제가 완료되었습니다",
    "status.editFailed": "수정 실패: {message}",
    "status.editWorking": "수정하고 지도를 업데이트하는 중입니다...",
    "status.editComplete": "수정이 완료되었습니다",
    "validation.titleRequired": "제목은 필수입니다.",
    "validation.titleBeforeNext": "계속하려면 짧은 제목을 입력해 주세요.",
    "validation.passwordSix": "수정/삭제 비밀번호는 정확히 6자리 숫자여야 합니다.",
    "validation.deletePassword": "6자리 삭제 비밀번호를 입력해 주세요.",
    "validation.editPassword": "6자리 수정 비밀번호를 입력해 주세요.",
    "validation.chooseOne": "제출하기 전에 기록 유형을 하나 이상 선택해 주세요.",
    "validation.saveLogFirst": "먼저 기록을 저장해 주세요.",
    "validation.saveCurrentType": "기록 선택으로 돌아가기 전에 이 기록 유형을 저장해 주세요.",
    "validation.saveText": "제출하기 전에 텍스트를 저장해 주세요.",
    "validation.savePhoto": "제출하기 전에 사진을 저장해 주세요.",
    "validation.saveAudio": "제출하기 전에 오디오를 저장해 주세요.",
    "validation.saveOne": "제출하기 전에 기록 내용 하나 이상을 저장해 주세요.",
    "validation.turnstileAlert": "제출하기 전에 확인 절차를 완료해 주세요.",
    "validation.turnstile": "제출하기 전에 확인 절차를 완료해 주세요.",
    "validation.interviewDeclined": "지도는 계속 볼 수 있지만, 추가 인터뷰 연락 안내에 동의하지 않아 이번 제출은 저장되지 않았습니다.",
    "validation.photoTooLarge": "압축 전 사진 파일은 {size}보다 작아야 합니다.",
    "validation.notImage": "저장하기 전에 이미지 파일을 선택해 주세요.",
    "validation.photoReadFailed": "브라우저에서 이 사진 형식을 읽을 수 없습니다. JPEG 또는 PNG 사진을 사용하거나 이미지를 내보낸 뒤 업로드해 주세요.",
    "validation.photoDimensions": "사진 크기를 읽지 못했습니다.",
    "validation.photoPrepare": "업로드할 사진을 준비하지 못했습니다.",
    "validation.photoCompress": "사진을 압축하지 못했습니다.",
    "validation.compressedTooLarge": "압축된 사진은 {size} 이하여야 합니다.",
    "validation.fileSize": "{type} 파일은 {size} 이하여야 합니다.",
    "validation.fileTooLarge": "파일 용량이 제한을 초과했습니다.",
    "validation.uploadFailed": "{type} 업로드에 실패했습니다: {message}",
    "validation.audioUnsupported": "이 브라우저에서는 웹 녹음을 지원하지 않습니다. 오디오 파일을 업로드해 주세요.",
    "validation.audioStartFailed": "오디오 녹음을 시작하지 못했습니다. 마이크 권한을 확인하거나 오디오 파일을 업로드해 주세요.",
    "validation.signAgain": "제출하기 전에 다시 로그인해 주세요.",
    "validation.submitTimeout": "제출 요청이 30초를 넘겨 중단되었습니다. submit-ppgis-log Edge Function 로그를 확인해 주세요.",
    "confirm.delete": "이 기록을 영구 삭제할까요?",
    "alert.publicReceived": "제출되었습니다. 지금 내 지도에서 볼 수 있으며, 승인 후 공개 지도에도 표시됩니다.",
    "alert.secretReceived": "제출되었습니다. 비공개 기록으로 저장되었고 지금 내 지도에서 볼 수 있습니다.",
    "error.unknownFunction": "알 수 없는 Edge Function 오류입니다.",
    "error.submitFunction": "제출 함수에 연결하지 못했습니다.",
    "error.deleteFunction": "삭제 함수에 연결하지 못했습니다.",
    "error.editFunction": "수정 함수에 연결하지 못했습니다."
  }
};

let currentLanguage = localStorage.getItem(LANGUAGE_KEY) === "ko" ? "ko" : "en";

function t(key, vars = {}) {
  const template = I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_match, name) => vars[name] ?? "");
}

function applyLanguageTo(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  root.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.setAttribute("title", t(element.dataset.i18nTitle));
  });

  root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "ko" ? "ko" : "en";
  document.body.classList.toggle("lang-ko", currentLanguage === "ko");
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const active = button.dataset.langOption === currentLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  applyLanguageTo(document);
  setAuthStatus();
  syncMapViewControls();
  refreshBaseLayerControl();
}

function handleLanguageToggle(event) {
  const button = event.target.closest("[data-lang-option]");
  if (!button) return;

  const nextLanguage = button.dataset.langOption === "ko" ? "ko" : "en";
  if (nextLanguage === currentLanguage) return;

  currentLanguage = nextLanguage;
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyLanguage();
}

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const statusEl = document.getElementById("ppgisStatus");
const locateButton = document.getElementById("ppgisLocate");
const locationStatusEl = document.getElementById("ppgisLocationStatus");
const navAuth = document.getElementById("navAuth");
const popover = document.getElementById("ppgisPopover");
const welcomeModal = document.getElementById("ppgisWelcomeModal");
const welcomeCloseButton = document.getElementById("ppgisWelcomeClose");
const welcomeOkButton = document.getElementById("ppgisWelcomeOk");
const welcomeDontShowButton = document.getElementById("ppgisWelcomeDontShow");
const languageToggle = document.getElementById("languageToggle");

locateButton.addEventListener("click", locateUser);
navAuth.addEventListener("click", handleAuthNavClick);
navAuth.addEventListener("change", handleMapViewToggleChange);
document.addEventListener("click", closeAccountMenuOnOutsideClick);
welcomeCloseButton.addEventListener("click", closeWelcomeModal);
welcomeOkButton.addEventListener("click", closeWelcomeModal);
welcomeDontShowButton.addEventListener("click", dismissWelcomeFor24Hours);
languageToggle.addEventListener("click", handleLanguageToggle);

const map = L.map("ppgisPopupMap", {
  center: [47.61, -122.33],
  zoom: 12,
  scrollWheelZoom: true
});
let mapSizeRefreshTimers = [];

const baseLayerTiles = {
  openStreetMap: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }),
  cartoLight: L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  }),
  satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri"
  })
};
let baseLayerControl = null;

function translatedBaseLayers() {
  return {
    [t("basemap.openStreetMap")]: baseLayerTiles.openStreetMap,
    [t("basemap.cartoLight")]: baseLayerTiles.cartoLight,
    [t("basemap.satellite")]: baseLayerTiles.satellite
  };
}

function refreshBaseLayerControl() {
  if (baseLayerControl) {
    map.removeControl(baseLayerControl);
  }

  baseLayerControl = L.control.layers(translatedBaseLayers(), null, {
    position: "topright",
    collapsed: true
  }).addTo(map);
}

baseLayerTiles.openStreetMap.addTo(map);
refreshBaseLayerControl();

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
let userLocationMarker = null;
let userLocationAccuracy = null;
let currentUser = null;
let currentProfile = null;
let activeContentType = null;
let mapRenderRequestId = 0;
let authRefreshRequestId = 0;
const mapViewState = {
  publicLogs: true,
  myLogs: false,
  myShared: false,
  mySecret: false
};

function setStatus(message, type = "") {
  if (!statusEl) {
    if (type === "error") console.error(message);
    return;
  }

  statusEl.textContent = message;
  statusEl.className = `ppgis-status ${type}`.trim();
}

function setLocationStatus(message, type = "") {
  locationStatusEl.textContent = message;
  locationStatusEl.className = `ppgis-location-status ${type}`.trim();
}

function shouldShowWelcomeModal() {
  const dismissedUntil = Number(localStorage.getItem(WELCOME_DISMISSED_KEY) || 0);
  return !dismissedUntil || dismissedUntil < Date.now();
}

function showWelcomeModal() {
  if (!welcomeModal || !shouldShowWelcomeModal()) return;
  welcomeModal.hidden = false;
  welcomeCloseButton.focus();
}

function closeWelcomeModal() {
  if (!welcomeModal) return;
  welcomeModal.hidden = true;
}

function dismissWelcomeFor24Hours() {
  localStorage.setItem(WELCOME_DISMISSED_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
  closeWelcomeModal();
}

function userDisplayName(user = currentUser, profile = currentProfile) {
  return profile?.full_name
    || user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split("@")[0]
    || t("common.participant");
}

function userInitial(user = currentUser) {
  return userDisplayName(user).trim().charAt(0).toUpperCase() || "P";
}

function userAvatarUrl(user = currentUser) {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";
}

function resetMapViewStateForAuth(showOwnLogs = false) {
  mapViewState.publicLogs = true;
  mapViewState.myLogs = showOwnLogs;
  mapViewState.myShared = showOwnLogs;
  mapViewState.mySecret = showOwnLogs;
}

function applyCurrentUser(user, options = {}) {
  const previousUserId = currentUser?.id || null;
  const nextUserId = user?.id || null;
  currentUser = user || null;

  if (!currentUser) {
    currentProfile = null;
  }

  if (options.resetView || previousUserId !== nextUserId) {
    resetMapViewStateForAuth(Boolean(currentUser));
  }

  setAuthStatus();
}

function showOwnSubmissionLayer(sharePublic) {
  if (!currentUser) return;

  mapViewState.myLogs = true;
  if (sharePublic) {
    mapViewState.myShared = true;
  } else {
    mapViewState.mySecret = true;
  }
  syncMapViewControls();
}

function mapViewToggleHtml(toggle, label, checked, options = {}) {
  const disabled = Boolean(options.disabled);
  const helper = options.helper
    ? `<small class="nav-map-toggle-helper">${escapeHtml(options.helper)}</small>`
    : "";

  return `
    <label class="nav-map-toggle ${disabled ? "is-disabled" : ""}">
      <span class="nav-map-toggle-copy">
        <span>${escapeHtml(label)}</span>
        ${helper}
      </span>
      <input type="checkbox" data-map-view-toggle="${toggle}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}>
      <span class="nav-map-switch" aria-hidden="true"></span>
    </label>
  `;
}

function mapViewMenuHtml() {
  const childDisabled = !mapViewState.myLogs;

  return `
    <div class="nav-profile-menu nav-map-view-menu" role="menu" aria-label="${escapeHtml(t("view.menuAria"))}">
      <div class="nav-map-view" aria-label="${escapeHtml(t("view.showOnMap"))}">
        <p class="nav-map-view-title">${escapeHtml(t("view.showOnMap"))}</p>
        ${mapViewToggleHtml("public", t("view.public"), mapViewState.publicLogs)}
        ${mapViewToggleHtml("my", t("view.mine"), mapViewState.myLogs)}
        <div class="nav-map-toggle-children ${childDisabled ? "is-disabled" : ""}">
          ${mapViewToggleHtml("shared", t("view.shared"), mapViewState.myShared, { disabled: childDisabled })}
          ${mapViewToggleHtml("secret", t("view.secret"), mapViewState.mySecret, {
            disabled: childDisabled,
            helper: t("view.secretHelp")
          })}
        </div>
      </div>
      <button class="nav-profile-logout" type="button" data-auth-action="log-out" role="menuitem">${escapeHtml(t("auth.logout"))}</button>
    </div>
  `;
}

function syncMapViewControls() {
  if (!navAuth) return;

  const controls = {
    public: navAuth.querySelector('[data-map-view-toggle="public"]'),
    my: navAuth.querySelector('[data-map-view-toggle="my"]'),
    shared: navAuth.querySelector('[data-map-view-toggle="shared"]'),
    secret: navAuth.querySelector('[data-map-view-toggle="secret"]')
  };

  if (controls.public) controls.public.checked = mapViewState.publicLogs;
  if (controls.my) controls.my.checked = mapViewState.myLogs;
  if (controls.shared) {
    controls.shared.checked = mapViewState.myShared;
    controls.shared.disabled = !mapViewState.myLogs;
  }
  if (controls.secret) {
    controls.secret.checked = mapViewState.mySecret;
    controls.secret.disabled = !mapViewState.myLogs;
  }

  navAuth.querySelectorAll(".nav-map-toggle").forEach((label) => {
    const input = label.querySelector("[data-map-view-toggle]");
    label.classList.toggle("is-disabled", Boolean(input?.disabled));
  });

  const childGroup = navAuth.querySelector(".nav-map-toggle-children");
  if (childGroup) {
    childGroup.classList.toggle("is-disabled", !mapViewState.myLogs);
  }
}

function closeAccountMenu() {
  navAuth.querySelectorAll(".nav-profile.is-open").forEach((profile) => {
    profile.classList.remove("is-open");
    profile.querySelector(".nav-profile-button")?.setAttribute("aria-expanded", "false");
  });
}

function toggleAccountMenu(button) {
  const profile = button.closest(".nav-profile");
  if (!profile) return;
  const shouldOpen = !profile.classList.contains("is-open");
  closeAccountMenu();
  profile.classList.toggle("is-open", shouldOpen);
  button.setAttribute("aria-expanded", String(shouldOpen));
}

function closeAccountMenuOnOutsideClick(event) {
  if (!navAuth.contains(event.target)) {
    closeAccountMenu();
  }
}

function setAuthStatus() {
  if (!navAuth) return;

  if (currentUser) {
    const name = escapeHtml(userDisplayName());
    const avatarUrl = userAvatarUrl();
    const avatar = avatarUrl
      ? `<img class="nav-avatar-img" src="${escapeHtml(avatarUrl)}" alt="">`
      : `<span class="nav-avatar-initial">${escapeHtml(userInitial())}</span>`;

    navAuth.innerHTML = `
      <div class="nav-profile">
        <button class="nav-profile-button" type="button" aria-haspopup="true" aria-expanded="false" aria-label="${escapeHtml(t("auth.account"))}">
          <span class="nav-avatar">${avatar}</span>
          <span class="nav-profile-name">${name}</span>
        </button>
        ${mapViewMenuHtml()}
      </div>
    `;
  } else {
    navAuth.innerHTML = `
      <button class="nav-auth-button" type="button" data-auth-action="sign-in" aria-label="${escapeHtml(t("auth.signAria"))}">
        <span class="nav-auth-full">${escapeHtml(t("auth.signFull"))}</span>
        <span class="nav-auth-short">${escapeHtml(t("auth.signShort"))}</span>
        <span class="nav-auth-icon" aria-hidden="true">S</span>
      </button>
    `;
  }
}

async function syncCurrentProfile(user) {
  if (!user) {
    currentProfile = null;
    return;
  }

  const consentAt = localStorage.getItem(PROFILE_CONSENT_KEY);
  const profilePayload = {
    id: user.id,
    email: user.email || null,
    full_name: userDisplayName(user, null),
    updated_at: new Date().toISOString()
  };

  if (consentAt) {
    profilePayload.research_consent_agreed = true;
    profilePayload.research_consent_agreed_at = consentAt;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .upsert(profilePayload, { onConflict: "id" })
    .select("id, email, full_name, research_consent_agreed")
    .single();

  if (error) {
    console.warn("Could not sync profile:", error);
    currentProfile = null;
    return;
  }

  currentProfile = data;
}

async function refreshAuthState() {
  const requestId = ++authRefreshRequestId;
  const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
  if (requestId !== authRefreshRequestId) return;

  if (sessionError) {
    console.warn("Could not read sign-in session:", sessionError);
  }

  const sessionUser = sessionData?.session?.user || null;
  applyCurrentUser(sessionUser, { resetView: true });
  await loadApprovedSubmissions();

  syncCurrentProfile(currentUser)
    .then(setAuthStatus)
    .catch((error) => console.warn("Could not sync profile:", error));

  if (!sessionUser) return;

  const { data: userData, error: userError } = await supabaseClient.auth.getUser();
  if (requestId !== authRefreshRequestId) return;

  if (userError) {
    console.warn("Could not verify signed-in user:", userError);
    return;
  }

  if (userData?.user) {
    applyCurrentUser(userData.user);
  }
}

async function handleAuthNavClick(event) {
  const action = event.target.closest("[data-auth-action]")?.dataset.authAction;
  if (action === "sign-in") {
    event.preventDefault();
    event.stopPropagation();
    await startGoogleLogin();
    return;
  }

  if (action === "log-out") {
    event.preventDefault();
    event.stopPropagation();
    closeAccountMenu();

    if (currentUser) {
      await supabaseClient.auth.signOut();
      localStorage.removeItem(PROFILE_CONSENT_KEY);
      applyCurrentUser(null, { resetView: true });
      await loadApprovedSubmissions();
      setStatus(t("auth.signedOut"));
      closePopover();
      clearDraftMarker();
    }
    return;
  }

  const profileButton = event.target.closest(".nav-profile-button");
  if (profileButton) {
    event.preventDefault();
    toggleAccountMenu(profileButton);
    return;
  }
}

async function handleMapViewToggleChange(event) {
  const toggle = event.target.closest("[data-map-view-toggle]");
  if (!toggle) return;

  const view = toggle.dataset.mapViewToggle;

  if (view === "public") {
    mapViewState.publicLogs = toggle.checked;
  }

  if (view === "my") {
    mapViewState.myLogs = toggle.checked;
    mapViewState.myShared = toggle.checked;
    mapViewState.mySecret = toggle.checked;
  }

  if (view === "shared" && mapViewState.myLogs) {
    mapViewState.myShared = toggle.checked;
  }

  if (view === "secret" && mapViewState.myLogs) {
    mapViewState.mySecret = toggle.checked;
  }

  if (!currentUser) {
    mapViewState.myLogs = false;
    mapViewState.myShared = false;
    mapViewState.mySecret = false;
  }

  syncMapViewControls();
  await loadApprovedSubmissions();
}

function showResearchConsentDialog() {
  return new Promise((resolve) => {
    const existing = document.querySelector(".ppgis-consent-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "ppgis-consent-overlay";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `
      <section class="ppgis-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="ppgisResearchConsentTitle">
        <button class="ppgis-consent-close" type="button" aria-label="${escapeHtml(t("common.close"))}">&times;</button>
        <h3 id="ppgisResearchConsentTitle">${escapeHtml(t("consent.researchTitle"))}</h3>
        <div class="ppgis-consent-copy">
          <p>${escapeHtml(t("consent.researchCopy1"))}</p>
          <p>${escapeHtml(t("consent.researchCopy2"))}</p>
          <p>${escapeHtml(t("consent.researchCopy3"))}</p>
        </div>
        <div class="ppgis-consent-actions">
          <button class="ppgis-consent-agree" type="button">${escapeHtml(t("common.agree"))}</button>
          <button class="ppgis-consent-decline" type="button">${escapeHtml(t("common.decline"))}</button>
        </div>
      </section>
    `;

    document.body.append(overlay);
    const agreeButton = overlay.querySelector(".ppgis-consent-agree");

    function close(agreed) {
      overlay.remove();
      resolve(agreed);
    }

    overlay.querySelector(".ppgis-consent-close").addEventListener("click", () => close(false));
    agreeButton.addEventListener("click", () => close(true));
    overlay.querySelector(".ppgis-consent-decline").addEventListener("click", () => close(false));
    agreeButton.focus();
  });
}

async function startGoogleLogin() {
  const agreed = await showResearchConsentDialog();
  if (!agreed) {
    setStatus(t("auth.agreementRequired"), "error");
    return;
  }

  localStorage.setItem(PROFILE_CONSENT_KEY, new Date().toISOString());

  await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: new URL("ppgis.html", window.location.href).href,
      queryParams: {
        prompt: "select_account"
      }
    }
  });
}

function locateUser() {
  if (!navigator.geolocation) {
    setLocationStatus(t("location.unsupported"), "error");
    return;
  }

  const confirmed = window.confirm(t("location.confirm"));
  if (!confirmed) return;

  locateButton.disabled = true;
  setLocationStatus(t("location.requesting"));

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const latLng = [latitude, longitude];

      if (!userLocationMarker) {
        userLocationMarker = L.circleMarker(latLng, {
          radius: 8,
          color: "#1f78b4",
          fillColor: "#1f78b4",
          fillOpacity: 0.9,
          weight: 3,
          bubblingMouseEvents: false
        }).addTo(map);
      } else {
        userLocationMarker.setLatLng(latLng);
      }

      if (!userLocationAccuracy) {
        userLocationAccuracy = L.circle(latLng, {
          radius: accuracy,
          color: "#1f78b4",
          fillColor: "#a6cee3",
          fillOpacity: 0.16,
          weight: 1,
          interactive: false
        }).addTo(map);
      } else {
        userLocationAccuracy.setLatLng(latLng);
        userLocationAccuracy.setRadius(accuracy);
      }

      userLocationMarker.bindPopup(escapeHtml(t("location.popup"))).openPopup();
      map.setView(latLng, Math.max(map.getZoom(), 15));
      setLocationStatus(t("location.found"), "success");
      locateButton.disabled = false;
    },
    (error) => {
      const message = error.code === error.PERMISSION_DENIED
        ? t("location.denied")
        : t("location.failed");
      setLocationStatus(message, "error");
      locateButton.disabled = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    }
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function markerColorButton(color, selectedColor = DEFAULT_MARKER_COLOR) {
  const isSelected = color.toLowerCase() === String(selectedColor || "").toLowerCase();
  return `
    <label class="ppgis-color-choice" style="--marker-color: ${color};">
      <input type="radio" name="marker_color" value="${color}" ${isSelected ? "checked" : ""}>
      <span aria-hidden="true"></span>
    </label>
  `;
}

function markerColorPalette(selectedColor = DEFAULT_MARKER_COLOR) {
  return `
    <div class="ppgis-color-grid" role="radiogroup" aria-label="${escapeHtml(t("popup.markerColor"))}">
      ${MARKER_COLOR_OPTIONS.map((color) => markerColorButton(color, selectedColor)).join("")}
    </div>
  `;
}

function validMarkerColor(value) {
  const normalized = String(value || "").toLowerCase();
  return MARKER_COLOR_OPTIONS.find((color) => color.toLowerCase() === normalized) || DEFAULT_MARKER_COLOR;
}

function openPopover(html) {
  popover.innerHTML = html;
  popover.classList.add("is-open");
  applyLanguageTo(popover);
  refreshMapSizeSoon();
}

function refreshMapSizeSoon() {
  mapSizeRefreshTimers.forEach((timerId) => window.clearTimeout(timerId));

  const refresh = () => {
    map.invalidateSize({ pan: false });
  };

  window.requestAnimationFrame(refresh);
  mapSizeRefreshTimers = [
    window.setTimeout(refresh, 120),
    window.setTimeout(refresh, 360)
  ];
}

function resetMobileViewportPosition() {
  if (!window.matchMedia("(max-width: 720px)").matches) return;

  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement && typeof activeElement.blur === "function") {
    activeElement.blur();
  }

  window.requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function closePopover() {
  resetMobileViewportPosition();
  resetTurnstileWidget();
  resetRecordingState();
  resetSavedLogState();
  popover.classList.remove("is-open");
  popover.innerHTML = "";
  refreshMapSizeSoon();
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
    ? `<img class="ppgis-popup-media" src="${row.photo_url}" alt="${escapeHtml(t("popup.submittedPhoto"))}">`
    : "";
  const audioHtml = row.audio_url
    ? `<audio class="ppgis-popup-audio" controls src="${row.audio_url}"></audio>`
    : "";
  const visibilityBadgeHtml = row.is_secret
    ? `<span class="ppgis-visibility-badge secret">${escapeHtml(t("popup.secretBadge"))}</span>`
    : row.is_owner
      ? `<span class="ppgis-visibility-badge shared">${escapeHtml(t("popup.sharedBadge"))}</span>`
      : "";
  const secretNoteHtml = row.is_secret
    ? `<p class="ppgis-secret-note">${escapeHtml(t("popup.notPublic"))}</p>`
    : "";
  const storyText = row.show_text === false && !row.is_owner
    ? t("popup.hiddenText")
    : row.body_text || t("popup.noStory");
  const logToolsHtml = currentUser && row.is_owner
    ? `
      <div class="ppgis-delete-log">
        <div class="ppgis-log-actions">
          <button class="ppgis-edit-toggle" type="button" data-submission-id="${escapeHtml(row.id)}">${escapeHtml(t("popup.editLog"))}</button>
          <button class="ppgis-delete-toggle" type="button" data-submission-id="${escapeHtml(row.id)}">${escapeHtml(t("popup.deleteLog"))}</button>
        </div>
        <form class="ppgis-edit-form" data-submission-id="${escapeHtml(row.id)}" hidden>
          <label>
            <span class="field-label-line">${escapeHtml(t("form.editPassword"))} <span class="field-required">${escapeHtml(t("form.required"))}</span></span>
            <input name="delete_password" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" required placeholder="${escapeHtml(t("form.passwordPlaceholder"))}">
          </label>
          <label>
            <span class="field-label-line">${escapeHtml(t("form.titleField"))} <span class="field-required">${escapeHtml(t("form.required"))}</span></span>
            <input name="title" type="text" maxlength="120" required value="${escapeHtml(row.title || "")}">
          </label>
          <label>
            ${escapeHtml(t("popup.markerColor"))}
            ${markerColorPalette(row.marker_color || DEFAULT_MARKER_COLOR)}
          </label>
          <label class="checkbox-label">
            <input type="checkbox" name="show_text" ${row.show_text === false ? "" : "checked"}>
            ${escapeHtml(t("popup.showText"))}
          </label>
          <label>
            ${escapeHtml(t("popup.story"))}
            <textarea name="body_text" rows="4">${escapeHtml(row.body_text || "")}</textarea>
          </label>
          <button type="submit">${escapeHtml(t("popup.saveChanges"))}</button>
          <p class="ppgis-edit-message"></p>
        </form>
        <form class="ppgis-delete-form" data-submission-id="${escapeHtml(row.id)}" hidden>
          <label>
            <span class="field-label-line">${escapeHtml(t("popup.deletePassword"))} <span class="field-required">${escapeHtml(t("form.required"))}</span></span>
            <input name="delete_password" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" required placeholder="${escapeHtml(t("form.passwordPlaceholder"))}">
            <span class="field-help">${escapeHtml(t("popup.deletePasswordHelp"))}</span>
          </label>
          <button type="submit">${escapeHtml(t("popup.deletePermanently"))}</button>
          <p class="ppgis-delete-message"></p>
        </form>
      </div>
    `
    : "";

  openPopover(`
    <article class="ppgis-public-popup">
      <button class="ppgis-popover-close" type="button" aria-label="${escapeHtml(t("common.close"))}">&times;</button>
      <div class="ppgis-popup-heading">
        <h3>${escapeHtml(row.title || t("popup.untitled"))}</h3>
        ${visibilityBadgeHtml}
      </div>
      <p>${escapeHtml(storyText)}</p>
      <p><strong>${escapeHtml(t("popup.submittedBy"))}</strong> ${escapeHtml(row.display_name || t("common.anonymous"))}</p>
      ${secretNoteHtml}
      ${photoHtml}
      ${audioHtml}
      ${logToolsHtml}
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
    size: "flexible"
  });
}

function getTurnstileToken() {
  if (!window.turnstile || turnstileWidgetId === null) return "";
  return window.turnstile.getResponse(turnstileWidgetId);
}

function resetTurnstileWidget() {
  if (!window.turnstile || turnstileWidgetId === null) return;
  try {
    window.turnstile.reset(turnstileWidgetId);
  } catch {
    turnstileWidgetId = null;
  }
}

async function edgeFunctionErrorMessage(error) {
  if (!error) return t("error.unknownFunction");

  try {
    const errorBody = await error.context?.json?.();
    if (errorBody?.error) {
      return [errorBody.error, errorBody.details, errorBody.hint]
        .filter(Boolean)
        .join(" ");
    }
  } catch {
    // Fall back to the Supabase client error message below.
  }

  return error.message || t("error.unknownFunction");
}

function isValidDeletePassword(value) {
  return /^\d{6}$/.test(String(value || ""));
}

function showInterviewConsentDialog() {
  return new Promise((resolve) => {
    const existing = document.querySelector(".ppgis-consent-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "ppgis-consent-overlay";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `
      <section class="ppgis-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="ppgisConsentTitle">
        <button class="ppgis-consent-close" type="button" aria-label="${escapeHtml(t("common.close"))}">&times;</button>
        <h3 id="ppgisConsentTitle">${escapeHtml(t("consent.interviewTitle"))}</h3>
        <div class="ppgis-consent-copy">
          <p>${escapeHtml(t("consent.interviewCopy"))}</p>
        </div>
        <div class="ppgis-consent-actions">
          <button class="ppgis-consent-agree" type="button">${escapeHtml(t("common.agree"))}</button>
          <button class="ppgis-consent-decline" type="button">${escapeHtml(t("common.decline"))}</button>
        </div>
      </section>
    `;

    document.body.append(overlay);
    const closeButton = overlay.querySelector(".ppgis-consent-close");
    const agreeButton = overlay.querySelector(".ppgis-consent-agree");
    const declineButton = overlay.querySelector(".ppgis-consent-decline");

    function close(agreed) {
      overlay.remove();
      resolve(agreed);
    }

    closeButton.addEventListener("click", () => close(false));
    agreeButton.addEventListener("click", () => close(true));
    declineButton.addEventListener("click", () => close(false));
    agreeButton.focus();
  });
}

function openSubmissionForm(lat, lng) {
  if (!currentUser) {
    setStatus(t("auth.signInRequiredCopy"));
    openPopover(`
      <article class="ppgis-public-popup">
        <button class="ppgis-popover-close" type="button" aria-label="${escapeHtml(t("common.close"))}">&times;</button>
        <h3>${escapeHtml(t("auth.signInRequired"))}</h3>
        <p>${escapeHtml(t("auth.signInRequiredCopy"))}</p>
        <button class="ppgis-auth-link" type="button">${escapeHtml(t("auth.signIn"))}</button>
      </article>
    `);
    return;
  }

  resetSavedLogState();
  setStatus(t("form.draftPlaced"));
  openPopover(`
    <form class="ppgis-popup-form" data-lat="${lat}" data-lng="${lng}">
      <button class="ppgis-popover-close" type="button" aria-label="${escapeHtml(t("common.close"))}">&times;</button>
      <h3>${escapeHtml(t("form.title"))}</h3>
      <p class="popup-form-message">${escapeHtml(t("form.selectedLocation", { lat: lat.toFixed(6), lng: lng.toFixed(6) }))}</p>
      <div class="ppgis-step-progress" aria-label="${escapeHtml(t("form.submissionProgress"))}">
        <span data-progress-step="1">${escapeHtml(t("form.step1"))}</span>
        <span data-progress-step="2">${escapeHtml(t("form.step2"))}</span>
        <span data-progress-step="3">${escapeHtml(t("form.step3"))}</span>
        <span data-progress-step="4">${escapeHtml(t("form.step4"))}</span>
        <span data-progress-step="5">${escapeHtml(t("form.step5"))}</span>
      </div>

      <section class="form-step" data-form-step="1">
        <p class="step-label">${escapeHtml(t("form.stepLabel1"))}</p>
        <h4>${escapeHtml(t("form.placeTitle"))}</h4>
        <p class="field-help">${escapeHtml(t("form.submittingAs", { name: userDisplayName(), email: currentUser.email || t("form.noEmail") }))}</p>
        <label class="ppgis-popup-check">
          <input name="is_anonymous" type="checkbox" checked>
          ${escapeHtml(t("form.anonymousPublic"))}
        </label>
        <label>
          <span class="field-label-line">${escapeHtml(t("form.titleField"))} <span class="field-required">${escapeHtml(t("form.required"))}</span></span>
          <input name="title" type="text" maxlength="120" required placeholder="${escapeHtml(t("form.shortTitle"))}">
        </label>
      </section>

      <section class="form-step" data-form-step="2" hidden>
        <p class="step-label">${escapeHtml(t("form.stepLabel2"))}</p>
        <h4>${escapeHtml(t("form.chooseLog"))}</h4>
        <p class="field-help">${escapeHtml(t("form.chooseLogHelp"))}</p>
        <div class="log-type-grid" aria-label="${escapeHtml(t("form.chooseLogAria"))}">
          <button class="log-type-card" type="button" data-log-type="text" aria-pressed="false">
            <span class="log-type-icon log-type-text-icon" aria-hidden="true">Aa</span>
            <span>${escapeHtml(t("form.text"))}</span>
            <small class="log-type-status" data-log-status="text">${escapeHtml(t("form.notSaved"))}</small>
          </button>
          <button class="log-type-card" type="button" data-log-type="photo" aria-pressed="false">
            <span class="log-type-icon" aria-hidden="true">
              <img src="img/camera.png" alt="">
            </span>
            <span>${escapeHtml(t("form.photo"))}</span>
            <small class="log-type-status" data-log-status="photo">${escapeHtml(t("form.notSaved"))}</small>
          </button>
          <button class="log-type-card" type="button" data-log-type="audio" aria-pressed="false">
            <span class="log-type-icon log-type-audio-icon" aria-hidden="true">REC</span>
            <span>${escapeHtml(t("form.audio"))}</span>
            <small class="log-type-status" data-log-status="audio">${escapeHtml(t("form.notSaved"))}</small>
          </button>
        </div>
        <p class="media-status" id="log-choice-status">${escapeHtml(t("form.choiceNone"))}</p>
      </section>

      <section class="form-step" data-form-step="3" hidden>
        <p class="step-label">${escapeHtml(t("form.stepLabel3"))}</p>
        <h4 id="content-step-title">${escapeHtml(t("form.contentTitle"))}</h4>
        <p class="field-help" id="content-step-help">${escapeHtml(t("form.contentHelp"))}</p>
        <div id="text-log-panel" class="log-panel" hidden>
          <label>
            <span class="field-label-line">${escapeHtml(t("form.text"))} <span class="field-optional">${escapeHtml(t("form.optional"))}</span></span>
            <textarea id="text-log-draft" rows="4" placeholder="${escapeHtml(t("form.textPlaceholder"))}"></textarea>
          </label>
          <button id="save-text-log" class="save-log-button" type="button">${escapeHtml(t("form.saveText"))}</button>
          <p id="text-status" class="media-status">${escapeHtml(t("form.noText"))}</p>
        </div>

        <div id="photo-log-panel" class="log-panel" hidden>
          <span class="field-label-line">${escapeHtml(t("form.photo"))} <span class="field-optional">${escapeHtml(t("form.optional"))}</span></span>
          <div class="media-choice-grid">
            <label class="media-action">
              <input id="photo-upload-file" name="photo_upload_file" type="file" accept="image/*">
              <span class="media-action-ui" aria-hidden="true">
                <img class="media-action-icon" src="img/gallery.png" alt="">
                <span>${escapeHtml(t("form.gallery"))}</span>
              </span>
            </label>
            <label class="media-action">
              <input id="photo-capture-file" name="photo_capture_file" type="file" accept="image/*" capture="environment">
              <span class="media-action-ui" aria-hidden="true">
                <img class="media-action-icon" src="img/camera.png" alt="">
                <span>${escapeHtml(t("form.camera"))}</span>
              </span>
            </label>
          </div>
          <button id="save-photo-log" class="save-log-button" type="button">${escapeHtml(t("form.savePhoto"))}</button>
          <p id="photo-status" class="media-status">${escapeHtml(t("form.noPhoto"))}</p>
        </div>

        <div id="audio-log-panel" class="log-panel" hidden>
          <span class="field-label-line">${escapeHtml(t("form.audio"))} <span class="field-optional">${escapeHtml(t("form.optional"))}</span></span>
          <div class="media-choice-grid">
            <label>
              ${escapeHtml(t("form.uploadAudio"))}
              <input id="audio-upload-file" name="audio_upload_file" type="file" accept="audio/*">
            </label>
            <div class="recording-controls">
              <span>${escapeHtml(t("form.recordAudio"))}</span>
              <div class="recording-buttons">
                <button id="start-recording" type="button">${escapeHtml(t("form.startRecording"))}</button>
                <button id="stop-recording" type="button" disabled>${escapeHtml(t("form.stopRecording"))}</button>
              </div>
            </div>
          </div>
          <button id="save-audio-log" class="save-log-button" type="button">${escapeHtml(t("form.saveAudio"))}</button>
          <p id="audio-status" class="media-status">${escapeHtml(t("form.noAudio"))}</p>
        </div>
      </section>

      <section class="form-step" data-form-step="4" hidden>
        <p class="step-label">${escapeHtml(t("form.stepLabel4"))}</p>
        <h4>${escapeHtml(t("form.sharingTitle"))}</h4>
        <p class="field-help">${escapeHtml(t("form.sharingHelp"))}</p>
        <label>
          ${escapeHtml(t("popup.markerColor"))}
          ${markerColorPalette(DEFAULT_MARKER_COLOR)}
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="share-public" name="share_public" checked>
          ${escapeHtml(t("form.sharePublic"))}
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-text" name="show_text" checked>
          ${escapeHtml(t("form.showText"))}
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-photo" name="show_photo" checked>
          ${escapeHtml(t("form.showPhoto"))}
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-audio" name="show_audio">
          ${escapeHtml(t("form.showAudio"))}
        </label>
        <p class="field-help">${escapeHtml(t("form.privateHelp"))}</p>
      </section>

      <section class="form-step" data-form-step="5" hidden>
        <p class="step-label">${escapeHtml(t("form.stepLabel5"))}</p>
        <h4>${escapeHtml(t("form.submitTitle"))}</h4>
        <label>
          <span class="field-label-line">${escapeHtml(t("form.editPassword"))} <span class="field-required">${escapeHtml(t("form.required"))}</span></span>
          <input name="delete_password" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" required autocomplete="new-password" placeholder="${escapeHtml(t("form.passwordPlaceholder"))}">
          <span class="field-help">${escapeHtml(t("form.passwordHelp"))}</span>
        </label>
        <div class="ppgis-turnstile-wrap">
          <div id="ppgisTurnstile" class="cf-turnstile"></div>
        </div>
        <button type="submit">${escapeHtml(t("form.submitButton"))}</button>
      </section>
      <div class="form-step-actions">
        <button type="button" class="step-secondary" data-step-prev>${escapeHtml(t("form.back"))}</button>
        <button type="button" class="step-primary" data-step-next>${escapeHtml(t("form.next"))}</button>
      </div>
      <p class="popup-form-message"></p>
    </form>
  `);
  setFormStep(1);
}

function setLogPanel(type, active) {
  const button = popover.querySelector(`[data-log-type="${type}"]`);
  const panel = document.getElementById(`${type}-log-panel`);
  if (button) {
    button.classList.toggle("is-active", active && activeContentType === type);
    button.setAttribute("aria-pressed", String(active));
  }
  if (panel) {
    panel.hidden = !active;
    panel.classList.toggle("is-open", active);
  }
}

function savedLogState(type) {
  if (type === "text") return Boolean(savedTextLog);
  if (type === "photo") return Boolean(savedPhotoFile);
  if (type === "audio") return Boolean(savedAudioFile);
  return false;
}

function hasSavedLog() {
  return Boolean(savedTextLog || savedPhotoFile || savedAudioFile);
}

function logTypeLabel(type) {
  return {
    text: t("form.textLog"),
    photo: t("form.photoLog"),
    audio: t("form.audioLog")
  }[type] || t("form.contentTitle");
}

function setFormMessage(form, message, type = "") {
  const messageEl = form?.querySelector(".popup-form-message:last-child");
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.className = `popup-form-message ${type}`.trim();
}

function updateLogChoiceState() {
  const form = popover.querySelector(".ppgis-popup-form");
  if (!form) return;

  ["text", "photo", "audio"].forEach((type) => {
    const button = form.querySelector(`[data-log-type="${type}"]`);
    const status = form.querySelector(`[data-log-status="${type}"]`);
    const saved = savedLogState(type);
    if (button) {
      button.classList.toggle("is-saved", saved);
      button.setAttribute("aria-pressed", String(saved));
    }
    if (status) {
      status.textContent = saved ? t("form.saved") : t("form.notSaved");
    }
  });

  const choiceStatus = document.getElementById("log-choice-status");
  if (choiceStatus) {
    const savedCount = ["text", "photo", "audio"].filter(savedLogState).length;
    choiceStatus.textContent = savedCount
      ? t("form.choiceSaved", { count: savedCount })
      : t("form.choiceNone");
    choiceStatus.className = `media-status ${savedCount ? "success" : ""}`.trim();
  }

  if (activeContentType) {
    const label = logTypeLabel(activeContentType);
    const help = document.getElementById("content-step-help");
    if (help) {
      help.textContent = savedLogState(activeContentType)
        ? t("form.contentSavedHelp", { label })
        : t("form.contentUnsavedHelp", { label });
    }
  }

  updateStepButtons(form);
}

function setActiveContentType(type) {
  activeContentType = type;
  ["text", "photo", "audio"].forEach((candidate) => {
    setLogPanel(candidate, candidate === type);
  });

  const label = logTypeLabel(type);
  const title = document.getElementById("content-step-title");
  const help = document.getElementById("content-step-help");
  if (title) title.textContent = t("form.contentTitleForType", { label });
  if (help) {
    help.textContent = savedLogState(type)
      ? t("form.contentSavedHelp", { label })
      : t("form.contentUnsavedHelp", { label });
  }
}

function openLogType(type) {
  setActiveContentType(type);
  setFormStep(3);
}

function visibleFormStep(form) {
  return Number(form?.dataset.currentStep || 1);
}

function validateStepBeforeNext(form, step) {
  if (step === 1) {
    const title = String(new FormData(form).get("title") || "").trim();
    if (!title) {
      setFormMessage(form, t("validation.titleBeforeNext"), "error");
      return false;
    }
  }

  if (step === 2 && !hasSavedLog()) {
    setFormMessage(form, t("form.choiceNone"), "error");
    return false;
  }

  if (step === 3 && !savedLogState(activeContentType)) {
    setFormMessage(form, t("validation.saveCurrentType"), "error");
    return false;
  }

  setFormMessage(form, "");
  return true;
}

function nextFormStep(form) {
  const step = visibleFormStep(form);
  if (!validateStepBeforeNext(form, step)) return;

  if (step === 1) setFormStep(2);
  if (step === 2) setFormStep(4);
  if (step === 3) setFormStep(2);
  if (step === 4) setFormStep(5);
}

function previousFormStep(form) {
  const step = visibleFormStep(form);
  if (step === 2) setFormStep(1);
  if (step === 3) setFormStep(2);
  if (step === 4) setFormStep(2);
  if (step === 5) setFormStep(4);
}

function updateStepButtons(form) {
  if (!form) return;
  const step = visibleFormStep(form);
  const prevButton = form.querySelector("[data-step-prev]");
  const nextButton = form.querySelector("[data-step-next]");

  if (prevButton) {
    prevButton.hidden = step === 1;
  }

  if (!nextButton) return;
  nextButton.hidden = step === 5;
  nextButton.disabled = (step === 2 && !hasSavedLog()) || (step === 3 && !savedLogState(activeContentType));

  if (step === 1) nextButton.textContent = t("form.nextLog");
  if (step === 2) nextButton.textContent = hasSavedLog() ? t("form.nextSharing") : t("validation.saveLogFirst");
  if (step === 3) nextButton.textContent = savedLogState(activeContentType) ? t("form.done") : t("form.saveFirst");
  if (step === 4) nextButton.textContent = t("form.nextSubmit");
}

function updateSharingControls() {
  const visibilityControls = [
    ["show-text", savedLogState("text")],
    ["show-photo", savedLogState("photo")],
    ["show-audio", savedLogState("audio")]
  ];

  visibilityControls.forEach(([id, visible]) => {
    const input = document.getElementById(id);
    const label = input?.closest("label");
    if (label) label.hidden = !visible;
  });
}

function setFormStep(step) {
  const form = popover.querySelector(".ppgis-popup-form");
  if (!form) return;

  form.dataset.currentStep = String(step);
  form.querySelectorAll("[data-form-step]").forEach((section) => {
    const active = Number(section.dataset.formStep) === step;
    section.hidden = !active;
    section.classList.toggle("is-active", active);
  });

  form.querySelectorAll("[data-progress-step]").forEach((item) => {
    const progressStep = Number(item.dataset.progressStep);
    item.classList.toggle("is-active", progressStep === step);
    item.classList.toggle("is-complete", progressStep < step);
  });

  if (step === 2) {
    ["text", "photo", "audio"].forEach((type) => setLogPanel(type, false));
    activeContentType = null;
    updateLogChoiceState();
  }

  if (step === 4) {
    updateSharingControls();
  }

  if (step === 5) {
    renderTurnstileWidget();
  }

  updateStepButtons(form);
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

function fileBaseName(file) {
  return (file.name || "photo").replace(/\.[^.]+$/, "") || "photo";
}

function isLikelyImageFile(file) {
  return file.type.startsWith("image/")
    || /\.(jpe?g|png|gif|webp|heic|heif)$/i.test(file.name || "");
}

function formatFileSize(bytes) {
  const megabytes = bytes / 1024 / 1024;
  return `${megabytes.toFixed(megabytes >= 10 ? 0 : 1)} MB`;
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(t("validation.photoReadFailed")));
    };

    image.src = objectUrl;
  });
}

function resizedPhotoDimensions(width, height) {
  const longestEdge = Math.max(width, height);
  if (longestEdge <= PHOTO_MAX_EDGE_PX) {
    return { width, height };
  }

  const scale = PHOTO_MAX_EDGE_PX / longestEdge;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale))
  };
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error(t("validation.photoCompress")));
    }, type, quality);
  });
}

async function preparePhotoForUpload(file) {
  if (file.size >= MAX_PHOTO_BYTES) {
    throw new Error(t("validation.photoTooLarge", { size: formatFileSize(MAX_PHOTO_BYTES) }));
  }

  if (!isLikelyImageFile(file)) {
    throw new Error(t("validation.notImage"));
  }

  const image = await loadImageFromFile(file);
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error(t("validation.photoDimensions"));
  }

  const dimensions = resizedPhotoDimensions(sourceWidth, sourceHeight);
  const canvas = document.createElement("canvas");
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error(t("validation.photoPrepare"));
  }

  context.drawImage(image, 0, 0, dimensions.width, dimensions.height);
  const blob = await canvasToBlob(canvas, "image/jpeg", PHOTO_JPEG_QUALITY);

  if (blob.size > MAX_COMPRESSED_PHOTO_BYTES) {
    throw new Error(t("validation.compressedTooLarge", { size: formatFileSize(MAX_COMPRESSED_PHOTO_BYTES) }));
  }

  return new File([blob], `${fileBaseName(file)}-1600.jpg`, {
    type: "image/jpeg",
    lastModified: Date.now()
  });
}

function withTimeout(promise, timeoutMs, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(`${label} timed out.`)), timeoutMs);
    })
  ]);
}

async function invokeSubmitFunction(body) {
  const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
  const accessToken = sessionData?.session?.access_token;

  if (sessionError || !accessToken) {
    throw new Error(t("validation.signAgain"));
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), FUNCTION_TIMEOUT_MS);

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-ppgis-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_PUBLISHABLE_KEY,
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    const responseText = await response.text();
    let responseBody = null;

    if (responseText) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        responseBody = { error: responseText };
      }
    }

    if (!response.ok || responseBody?.error) {
      return {
        data: responseBody,
        error: [
          responseBody?.error || `HTTP ${response.status}`,
          responseBody?.details,
          responseBody?.hint
        ].filter(Boolean).join(" ")
      };
    }

    return { data: responseBody, error: null };
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(t("validation.submitTimeout"));
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function uploadMediaFile(file, folder, maxBytes) {
  if (!file) return null;

  if (file.size > maxBytes) {
    const fileType = folder === "photos" ? t("form.photo") : t("form.audio");
    const message = t("validation.fileSize", { type: fileType, size: formatFileSize(maxBytes) });
    alert(message);
    throw new Error(t("validation.fileTooLarge"));
  }

  const path = `${folder}/${crypto.randomUUID()}${fileExtension(file)}`;
  const { error } = await withTimeout(
    supabaseClient
      .storage
      .from(MEDIA_BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined
      }),
    MEDIA_UPLOAD_TIMEOUT_MS,
    `${folder === "photos" ? t("form.photo") : t("form.audio")} upload`
  );

  if (error) {
    const fileType = folder === "photos" ? t("form.photo") : t("form.audio");
    alert(t("validation.uploadFailed", { type: fileType, message: error.message }));
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

function isValidSubmissionLocation(row) {
  return Number.isFinite(Number(row.latitude)) && Number.isFinite(Number(row.longitude));
}

function normalizePublicSubmission(row) {
  return {
    ...row,
    marker_color: validMarkerColor(row.marker_color),
    share_public: true,
    is_secret: false,
    is_owner: false,
    source: "public"
  };
}

function normalizeMySubmission(row) {
  const sharePublic = row.share_public !== false;
  return {
    ...row,
    marker_color: validMarkerColor(row.marker_color),
    share_public: sharePublic,
    is_secret: !sharePublic,
    is_owner: true,
    source: "mine",
    display_name: row.is_anonymous ? t("popup.youAnonymous") : userDisplayName()
  };
}

async function attachMediaUrls(row) {
  const [photoUrl, audioUrl] = await Promise.all([
    getSignedUrl(row.photo_path),
    getSignedUrl(row.audio_path)
  ]);

  return {
    ...row,
    photo_url: photoUrl,
    audio_url: audioUrl
  };
}

async function loadPublicLogRows() {
  if (!mapViewState.publicLogs) return [];

  const { data, error } = await supabaseClient
    .from("public_submissions")
    .select("id, latitude, longitude, title, body_text, display_name, photo_path, audio_path, marker_color, show_text, created_at");

  if (error) {
    setStatus(t("status.loadPublicFailed", { message: error.message }), "error");
    return [];
  }

  return Promise.all(
    (data || [])
      .filter(isValidSubmissionLocation)
      .map((row) => attachMediaUrls(normalizePublicSubmission(row)))
  );
}

async function loadMyLogRows(options = {}) {
  const requireMyLogs = options.requireMyLogs !== false;
  const includeShared = options.includeShared ?? mapViewState.myShared;
  const includeSecret = options.includeSecret ?? mapViewState.mySecret;

  if (!currentUser || (requireMyLogs && !mapViewState.myLogs) || (!includeShared && !includeSecret)) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("submissions")
    .select("id, user_id, latitude, longitude, title, body_text, photo_path, audio_path, marker_color, show_text, share_public, is_anonymous, status, created_at")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    setStatus(t("status.loadMineFailed", { message: error.message }), "error");
    return [];
  }

  const filteredRows = (data || []).filter((row) => {
    const sharePublic = row.share_public !== false;
    return sharePublic ? includeShared : includeSecret;
  });

  return Promise.all(
    filteredRows
      .filter(isValidSubmissionLocation)
      .map((row) => attachMediaUrls(normalizeMySubmission(row)))
  );
}

function markerOptionsForSubmission(row) {
  if (row.is_secret) {
    return {
      radius: 8,
      color: "#102331",
      fillColor: "#7a8791",
      fillOpacity: 0.62,
      weight: 2,
      dashArray: "4 3",
      bubblingMouseEvents: false
    };
  }

  const markerColor = validMarkerColor(row.marker_color);
  return {
    radius: row.is_owner ? 8 : 7,
    color: row.is_owner ? "#102331" : markerColor,
    fillColor: markerColor,
    fillOpacity: row.is_owner ? 0.92 : 0.86,
    weight: row.is_owner ? 3 : 2,
    bubblingMouseEvents: false
  };
}

function renderSubmissionMarker(row) {
  L.circleMarker([Number(row.latitude), Number(row.longitude)], markerOptionsForSubmission(row))
    .on("click", () => publicPanel(row))
    .addTo(approvedLayer);
}

async function loadApprovedSubmissions() {
  const requestId = ++mapRenderRequestId;
  approvedLayer.clearLayers();

  const [publicRows, ownSharedRows, myRows] = await Promise.all([
    loadPublicLogRows(),
    mapViewState.publicLogs
      ? loadMyLogRows({ requireMyLogs: false, includeShared: true, includeSecret: false })
      : Promise.resolve([]),
    loadMyLogRows()
  ]);

  if (requestId !== mapRenderRequestId) {
    return;
  }

  const rowsById = new Map();
  publicRows.forEach((row) => rowsById.set(row.id, row));
  ownSharedRows.forEach((row) => rowsById.set(row.id, row));
  myRows.forEach((row) => rowsById.set(row.id, row));
  rowsById.forEach(renderSubmissionMarker);
  refreshMapSizeSoon();
}

map.on("click", (event) => {
  if (popover.classList.contains("is-open")) {
    if (popover.querySelector(".ppgis-popup-form")) {
      clearDraftMarker();
      setStatus(t("form.selectionCleared"));
    }
    closePopover();
    return;
  }

  const { lat, lng } = event.latlng;

  if (!currentUser) {
    openSubmissionForm(lat, lng);
    return;
  }

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

popover.addEventListener("click", async (event) => {
  if (event.target.closest(".ppgis-popover-close")) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.closest(".ppgis-popup-form")) {
      clearDraftMarker();
      setStatus(t("form.selectionCleared"));
    }
    closePopover();
    return;
  }

  const logTypeButton = event.target.closest(".log-type-card");
  if (logTypeButton) {
    openLogType(logTypeButton.dataset.logType);
    return;
  }

  const nextStepButton = event.target.closest("[data-step-next]");
  if (nextStepButton) {
    nextFormStep(nextStepButton.closest(".ppgis-popup-form"));
    return;
  }

  const prevStepButton = event.target.closest("[data-step-prev]");
  if (prevStepButton) {
    previousFormStep(prevStepButton.closest(".ppgis-popup-form"));
    return;
  }

  if (event.target.closest(".ppgis-auth-link")) {
    startGoogleLogin();
    return;
  }

  if (event.target.closest(".ppgis-delete-toggle")) {
    const logTools = event.target.closest(".ppgis-delete-log");
    const deleteForm = logTools?.querySelector(".ppgis-delete-form");
    const editForm = logTools?.querySelector(".ppgis-edit-form");
    if (editForm) editForm.hidden = true;
    if (deleteForm) deleteForm.hidden = !deleteForm.hidden;
    return;
  }

  if (event.target.closest(".ppgis-edit-toggle")) {
    const logTools = event.target.closest(".ppgis-delete-log");
    const editForm = logTools?.querySelector(".ppgis-edit-form");
    const deleteForm = logTools?.querySelector(".ppgis-delete-form");
    if (deleteForm) deleteForm.hidden = true;
    if (editForm) editForm.hidden = !editForm.hidden;
    return;
  }

  if (event.target.closest("#save-text-log")) {
    const textDraft = document.getElementById("text-log-draft");
    const value = String(textDraft?.value || "").trim();
    if (!value) {
      setMediaStatus("text-status", t("status.addTextBeforeSave"), "recording");
      return;
    }
    savedTextLog = value;
    selectedLogTypes.add("text");
    setMediaStatus("text-status", t("status.textSaved"), "success");
    updateLogChoiceState();
    return;
  }

  const savePhotoButton = event.target.closest("#save-photo-log");
  if (savePhotoButton) {
    const file = selectedFileFromInput("photo-capture-file") || selectedFileFromInput("photo-upload-file");
    if (!file) {
      setMediaStatus("photo-status", t("status.choosePhoto"), "recording");
      return;
    }

    savePhotoButton.disabled = true;
    savedPhotoFile = null;
    selectedLogTypes.delete("photo");
    updateLogChoiceState();
    setMediaStatus("photo-status", t("status.photoPreparing", { size: formatFileSize(file.size) }));

    try {
      const compressedPhoto = await preparePhotoForUpload(file);
      savedPhotoFile = compressedPhoto;
      selectedLogTypes.add("photo");
      setMediaStatus(
        "photo-status",
        t("status.photoSaved", { size: formatFileSize(compressedPhoto.size), edge: PHOTO_MAX_EDGE_PX }),
        "success"
      );
      updateLogChoiceState();
    } catch (error) {
      console.error("Photo compression failed:", error);
      setMediaStatus("photo-status", error.message || t("validation.photoPrepare"), "recording");
    } finally {
      savePhotoButton.disabled = false;
    }
    return;
  }

  if (event.target.closest("#save-audio-log")) {
    const file = recordedAudioFile || selectedFileFromInput("audio-upload-file");
    if (!file) {
      setMediaStatus("audio-status", t("status.chooseAudio"), "recording");
      return;
    }
    savedAudioFile = file;
    selectedLogTypes.add("audio");
    setMediaStatus("audio-status", t("status.audioSaved", { name: file.name }), "success");
    updateLogChoiceState();
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
    selectedLogTypes.delete("photo");
    updateLogChoiceState();
    setMediaStatus("photo-status", file ? t("status.photoSelected", { name: file.name }) : t("status.photoNone"), file ? "" : "");
  }

  if (event.target.matches("#audio-upload-file")) {
    const file = event.target.files?.[0];
    if (file) {
      recordedAudioFile = null;
      savedAudioFile = null;
      selectedLogTypes.delete("audio");
      updateLogChoiceState();
    }
    setMediaStatus("audio-status", file ? t("status.audioSelected", { name: file.name }) : t("status.audioNone"), file ? "" : "");
  }
});

popover.addEventListener("input", (event) => {
  if (event.target.matches("#text-log-draft")) {
    savedTextLog = null;
    selectedLogTypes.delete("text");
    updateLogChoiceState();
    setMediaStatus("text-status", t("status.textChanged"));
  }
});

async function startAudioRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    alert(t("validation.audioUnsupported"));
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
      selectedLogTypes.delete("audio");
      stopActiveAudioStream();
      setMediaStatus("audio-status", t("status.audioRecorded", { name: recordedAudioFile.name }), "success");
      updateLogChoiceState();
      document.getElementById("start-recording").disabled = false;
      document.getElementById("stop-recording").disabled = true;
    });

    mediaRecorder.start();
    document.getElementById("start-recording").disabled = true;
    document.getElementById("stop-recording").disabled = false;
    setMediaStatus("audio-status", t("status.recording"), "recording");
  } catch (error) {
    console.error("Audio recording failed:", error);
    alert(t("validation.audioStartFailed"));
    resetRecordingState();
  }
}

function stopAudioRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

popover.addEventListener("submit", async (submitEvent) => {
  const editForm = submitEvent.target.closest(".ppgis-edit-form");
  if (editForm) {
    submitEvent.preventDefault();
    await handleEditSubmission(editForm);
    return;
  }

  const deleteForm = submitEvent.target.closest(".ppgis-delete-form");
  if (deleteForm) {
    submitEvent.preventDefault();
    await handleDeleteSubmission(deleteForm);
    return;
  }

  const form = submitEvent.target.closest(".ppgis-popup-form");
  if (!form) return;

  submitEvent.preventDefault();

  const message = form.querySelector(".popup-form-message:last-child");
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  const showPhoto = document.getElementById("show-photo").checked;
  const showAudio = document.getElementById("show-audio").checked;
  const showText = document.getElementById("show-text").checked;
  const sharePublic = document.getElementById("share-public").checked;
  const deletePassword = String(formData.get("delete_password") || "");
  const markerColor = validMarkerColor(formData.get("marker_color"));
  const activeSavedText = selectedLogTypes.has("text") ? savedTextLog : null;
  const activeSavedPhoto = selectedLogTypes.has("photo") ? savedPhotoFile : null;
  const activeSavedAudio = selectedLogTypes.has("audio") ? savedAudioFile : null;
  const payload = {
    latitude: Number(form.dataset.lat),
    longitude: Number(form.dataset.lng),
    title: String(formData.get("title") || "").trim() || null,
    body_text: activeSavedText,
    is_anonymous: formData.get("is_anonymous") === "on",
    photo_path: null,
    audio_path: null,
    show_text: showText,
    show_photo: showPhoto,
    show_audio: showAudio,
    marker_color: markerColor
  };
  if (!currentUser) {
    message.textContent = t("auth.needSignInSubmit");
    message.className = "popup-form-message error";
    return;
  }

  if (!payload.title) {
    message.textContent = t("validation.titleRequired");
    message.className = "popup-form-message error";
    return;
  }

  if (!isValidDeletePassword(deletePassword)) {
    message.textContent = t("validation.passwordSix");
    message.className = "popup-form-message error";
    return;
  }

  if (!selectedLogTypes.size) {
    message.textContent = t("validation.chooseOne");
    message.className = "popup-form-message error";
    return;
  }

  if (selectedLogTypes.has("text") && !activeSavedText) {
    message.textContent = t("validation.saveText");
    message.className = "popup-form-message error";
    return;
  }

  if (selectedLogTypes.has("photo") && !activeSavedPhoto) {
    message.textContent = t("validation.savePhoto");
    message.className = "popup-form-message error";
    return;
  }

  if (selectedLogTypes.has("audio") && !activeSavedAudio) {
    message.textContent = t("validation.saveAudio");
    message.className = "popup-form-message error";
    return;
  }

  if (!activeSavedText && !activeSavedPhoto && !activeSavedAudio) {
    message.textContent = t("validation.saveOne");
    message.className = "popup-form-message error";
    return;
  }

  const turnstileToken = getTurnstileToken();
  if (!turnstileToken) {
    alert(t("validation.turnstileAlert"));
    message.textContent = t("validation.turnstile");
    message.className = "popup-form-message error";
    return;
  }

  const consentGranted = await showInterviewConsentDialog();
  if (!consentGranted) {
    message.textContent = t("validation.interviewDeclined");
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    return;
  }

  message.textContent = t("status.preparing");
  message.className = "popup-form-message";
  if (submitButton) submitButton.disabled = true;

  try {
    if (activeSavedPhoto) {
      message.textContent = t("status.uploadPhoto");
    }
    payload.photo_path = await uploadMediaFile(activeSavedPhoto, "photos", MAX_COMPRESSED_PHOTO_BYTES);

    if (activeSavedAudio) {
      message.textContent = t("status.uploadAudio");
    }
    payload.audio_path = await uploadMediaFile(activeSavedAudio, "audio", MAX_AUDIO_BYTES);
  } catch (uploadError) {
    console.error("Media upload failed:", uploadError);
    message.textContent = t("status.mediaUploadFailed", { message: uploadError.message || t("error.unknownFunction") });
    message.className = "popup-form-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  const functionPayload = {
    turnstileToken,
    delete_password: deletePassword,
    ...payload,
    interview_contact_agreed: true,
    share_public: sharePublic
  };

  message.textContent = t("status.submitting");

  let data;
  let error;

  try {
    const result = await invokeSubmitFunction(functionPayload);
    data = result.data;
    error = result.error;
  } catch (invokeError) {
    console.error("Submission function request failed:", invokeError);
    message.textContent = t("status.submissionFailed", { message: invokeError.message || t("error.submitFunction") });
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    if (submitButton) submitButton.disabled = false;
    return;
  }

  if (error) {
    const errorMessage = typeof error === "string" ? error : await edgeFunctionErrorMessage(error);
    message.textContent = t("status.submissionFailed", { message: errorMessage });
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    if (submitButton) submitButton.disabled = false;
    return;
  }

  if (data?.error) {
    const errorMessage = [data.error, data.details, data.hint]
      .filter(Boolean)
      .join(" ");
    message.textContent = t("status.submissionFailed", { message: errorMessage });
    message.className = "popup-form-message error";
    resetTurnstileWidget();
    if (submitButton) submitButton.disabled = false;
    return;
  }

  showOwnSubmissionLayer(sharePublic);
  alert(sharePublic
    ? t("alert.publicReceived")
    : t("alert.secretReceived")
  );
  form.reset();
  resetTurnstileWidget();
  message.textContent = t("status.receivedReloading");
  message.className = "popup-form-message success";
  clearDraftMarker();
  closePopover();
  await loadApprovedSubmissions();
});

async function handleDeleteSubmission(form) {
  const message = form.querySelector(".ppgis-delete-message");
  const formData = new FormData(form);
  const deletePassword = String(formData.get("delete_password") || "");
  const submissionId = form.dataset.submissionId;

  if (!isValidDeletePassword(deletePassword)) {
    message.textContent = t("validation.deletePassword");
    message.className = "ppgis-delete-message error";
    return;
  }

  const confirmed = window.confirm(t("confirm.delete"));
  if (!confirmed) return;

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  message.textContent = t("status.deleteWorking");
  message.className = "ppgis-delete-message";

  let data;
  let error;

  try {
    const result = await supabaseClient.functions.invoke("delete-ppgis-log", {
      body: {
        id: submissionId,
        delete_password: deletePassword
      }
    });
    data = result.data;
    error = result.error;
  } catch (invokeError) {
    message.textContent = t("status.deleteFailed", { message: invokeError.message || t("error.deleteFunction") });
    message.className = "ppgis-delete-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  if (error) {
    const errorMessage = await edgeFunctionErrorMessage(error);
    message.textContent = t("status.deleteFailed", { message: errorMessage });
    message.className = "ppgis-delete-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  if (data?.error) {
    message.textContent = t("status.deleteFailed", { message: data.error });
    message.className = "ppgis-delete-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  message.textContent = t("status.deleteWorking");
  message.className = "ppgis-delete-message success";
  await loadApprovedSubmissions();
  message.textContent = t("status.deleteComplete");
  if (submitButton) submitButton.disabled = false;
}

async function handleEditSubmission(form) {
  const message = form.querySelector(".ppgis-edit-message");
  const formData = new FormData(form);
  const deletePassword = String(formData.get("delete_password") || "");
  const title = String(formData.get("title") || "").trim();
  const bodyText = String(formData.get("body_text") || "").trim();
  const markerColor = validMarkerColor(formData.get("marker_color"));
  const showText = formData.get("show_text") === "on";
  const submissionId = form.dataset.submissionId;

  if (!isValidDeletePassword(deletePassword)) {
    message.textContent = t("validation.editPassword");
    message.className = "ppgis-edit-message error";
    return;
  }

  if (!title) {
    message.textContent = t("validation.titleRequired");
    message.className = "ppgis-edit-message error";
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  message.textContent = t("status.editWorking");
  message.className = "ppgis-edit-message";

  let data;
  let error;

  try {
    const result = await supabaseClient.functions.invoke("edit-ppgis-log", {
      body: {
        id: submissionId,
      delete_password: deletePassword,
      title,
      body_text: bodyText || null,
      marker_color: markerColor,
      show_text: showText
    }
  });
    data = result.data;
    error = result.error;
  } catch (invokeError) {
    message.textContent = t("status.editFailed", { message: invokeError.message || t("error.editFunction") });
    message.className = "ppgis-edit-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  if (error) {
    const errorMessage = await edgeFunctionErrorMessage(error);
    message.textContent = t("status.editFailed", { message: errorMessage });
    message.className = "ppgis-edit-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  if (data?.error) {
    message.textContent = t("status.editFailed", { message: data.error });
    message.className = "ppgis-edit-message error";
    if (submitButton) submitButton.disabled = false;
    return;
  }

  message.textContent = t("status.editWorking");
  message.className = "ppgis-edit-message success";
  await loadApprovedSubmissions();
  message.textContent = t("status.editComplete");
  if (submitButton) submitButton.disabled = false;
}

supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (event === "INITIAL_SESSION") return;

  const shouldResetView = event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_DELETED";
  applyCurrentUser(session?.user || null, { resetView: shouldResetView });
  await loadApprovedSubmissions();
  syncCurrentProfile(currentUser)
    .then(setAuthStatus)
    .catch((error) => console.warn("Could not sync profile:", error));
});

window.addEventListener("resize", refreshMapSizeSoon);
window.addEventListener("orientationchange", refreshMapSizeSoon);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", refreshMapSizeSoon);
  window.visualViewport.addEventListener("scroll", refreshMapSizeSoon);
}

applyLanguage();
refreshAuthState();
showWelcomeModal();
refreshMapSizeSoon();
