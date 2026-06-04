# Mobile Web Application Design Principles for the Listen-First PPGIS Platform

> Purpose: This document translates general UI/mobile design principles from Apple, Android, Figma, and related design guidance into practical rules for the PPGIS web platform. The platform is not a generic website; it is a mobile-first spatial logging tool where students select a place, record text/photo/audio, make sharing decisions, and submit data under privacy-sensitive conditions.

---

## 1. Design Premise

The platform should be treated as a **mobile-first web application**, not simply a desktop webpage scaled down to fit a phone.

Students may use it:

- while walking, commuting, or standing in a place;
- on a small screen;
- with one hand;
- under limited attention;
- with unstable network conditions;
- while deciding whether to share sensitive text, photos, audio, and location information.

Therefore, the interface should prioritize:

1. fast place selection,
2. low-friction media capture,
3. clear step-by-step guidance,
4. visible feedback after every action,
5. strong privacy clarity,
6. accessibility and touch-friendly controls.

---

## 2. Source Principles Synthesized

The following principles are drawn from the requested references and adapted to this PPGIS context.

### 2.1 Apple Design Guidance

Apple’s UI design tips emphasize that interfaces should fit the device screen without horizontal scrolling, use touch-friendly controls, provide sufficiently large hit targets, maintain readable text size, ensure contrast, avoid overlapping text, preserve image aspect ratios, and place controls close to the content they modify.

Relevant source ideas:

- Layout should fit the device screen; primary content should not require zooming or horizontal scrolling.
- Touch controls should feel natural.
- Hit targets should be at least **44 pt × 44 pt**.
- Text should remain legible without zooming.
- Text and background should have sufficient contrast.
- Controls should be placed near the content they affect.

Source: Apple Developer, *UI Design Dos and Don’ts*, https://developer.apple.com/design/tips/

### 2.2 Android / Material Design Guidance

The Android Wear app principles are designed for small-screen interaction, but several ideas generalize well to mobile PPGIS design: focus on important tasks, keep navigation shallow and linear, use vertical layouts, use clear labels, avoid relying on icons alone, and make primary actions easy to find.

Relevant source ideas:

- Focus on important tasks so users can complete actions quickly.
- Avoid deep navigation structures when possible.
- Prefer clear vertical layouts.
- Use both icons and labels rather than icons alone.
- Bring primary actions forward.
- Use labels to help users remain oriented in longer flows.

Source: Android Developers, *App design principles*, https://developer.android.com/design/ui/wear/guides/m2-5/surfaces/apps-principles?hl=ko

### 2.3 Figma UI Design Principles

Figma summarizes core UI principles including hierarchy, progressive disclosure, consistency, contrast, accessibility, proximity, and alignment. These are highly applicable to the PPGIS form because users must complete a multi-step task involving map selection, identity, media choice, privacy settings, and submission.

Relevant source ideas:

- **Hierarchy:** make important information and actions visually prominent.
- **Progressive disclosure:** show only the information needed at each step.
- **Consistency:** keep button styles and interaction patterns stable.
- **Contrast:** draw attention to primary and risky actions.
- **Accessibility:** support contrast, keyboard navigation, padding, and assistive technologies.
- **Proximity:** place related controls together.
- **Alignment:** maintain predictable layout and readability.

Source: Figma, *핵심 UI 디자인 원칙 7가지*, https://www.figma.com/ko-kr/resource-library/ui-design-principles/

### 2.4 Apple-Style Product Design Principles

The Medium article summarizes Apple-like design principles around usability, communication, and functionality. Although this is not an official Apple source, the ideas are useful as a secondary design lens: an interface should be understandable, purposeful, and focused on helping users complete their intended task quickly.

Relevant source ideas:

- Design is not only appearance; it is how the product works.
- Interfaces should reduce confusion and frustration.
- Users should know what to do next.
- Functionality should be prioritized over decorative complexity.

Source: Purity Udeh, *Design Principles Used by Apple: For Better User Experience*, https://medium.com/design-bootcamp/design-principles-used-by-apple-for-better-user-experience-592574194bfb

---

## 3. Design Principles for the PPGIS Platform

## Principle 1. Start from the Place, Not the Form

### Rationale

This is a PPGIS platform. The user’s first conceptual task is not “fill out a form”; it is “mark a place that matters.” The form should support spatial expression rather than dominate the screen.

### Design rules

- The map should remain the primary spatial context.
- After the user taps the map, show a temporary marker and a clear submission panel.
- The marker should be removable if the user cancels the form.
- Provide a clear current-location button.
- Consider adding “Use this location” confirmation on mobile to reduce accidental taps.

### Implementation implications

- Desktop: map + side panel can coexist.
- Mobile: use a **bottom sheet** or step-based modal rather than a right-side panel.
- Avoid covering the whole map too early.
- Allow the marker to be dragged or reselected before submission.

---

## Principle 2. Use a Step-Based Flow

### Rationale

The current task is cognitively complex: choose location, enter identity, select media, save media, choose sharing options, complete Turnstile, and submit. Showing everything at once increases cognitive load.

### Recommended flow

1. **Place**: Select or confirm the location.
2. **Identity**: Enter name and anonymity preference.
3. **Log Type**: Choose text, photo, audio, or multiple options.
4. **Content**: Add and save selected content.
5. **Sharing**: Decide what becomes public.
6. **Review and Submit**: Confirm and submit.

### Design rules

- One primary task per screen or panel section.
- Use progress indicators if the flow is divided into steps.
- Keep the user oriented: “Step 2 of 5: Identity.”
- Do not show photo/audio/text fields until the corresponding log type is selected.

### Why it fits this platform

This directly supports the “listen-first” research logic. Students should not be overwhelmed by a survey-like interface; they should be guided through a reflective spatial logging process.

---

## Principle 3. Use Progressive Disclosure for Media Inputs

### Rationale

Text, photo, and audio are not always needed. Showing all input fields at once makes the form look long and intimidating.

### Design rules

- Initially show only three clear media-choice cards:
  - Text
  - Photo
  - Audio
- Allow multiple selections.
- Reveal only the selected media sections.
- Each selected medium should have a visible “Save” state.

### Example UI states

- Text not selected → no text box shown.
- Text selected → text box + Save Text button.
- Text saved → “Text saved” status message.
- Photo selected → Gallery / Camera options.
- Photo saved → filename or thumbnail preview.
- Audio selected → Upload Audio / Record Audio options.
- Audio saved → duration or filename preview.

### Implementation implication

The final Submit button should submit only saved content. If the user selects a medium but does not save it, the interface should warn them before final submission.

---

## Principle 4. Use Icons With Labels, Never Icons Alone

### Rationale

Icons are fast, but ambiguous. Android guidance explicitly warns against relying on icons alone for actions. This is especially important for students and for media actions such as gallery, camera, audio upload, and recording.

### Design rules

- Use icons + labels for all major actions.
- Avoid icon-only media buttons.
- Use consistent icons across the platform.
- Avoid visually clipped or cropped icons.

### Recommended labels

- “Write Text”
- “Upload Photo from Gallery”
- “Take Photo”
- “Upload Audio File”
- “Record Audio”
- “Save Text”
- “Save Photo”
- “Save Audio”

### Implementation implications

- Icon containers should not crop the icon.
- Use flexbox centering.
- Avoid overly tight border-radius or overflow clipping.
- Ensure all icon buttons have accessible text labels.

---

## Principle 5. Make Touch Targets Large and Comfortable

### Rationale

Mobile users tap with fingers, not cursors. Apple recommends controls of at least 44 pt × 44 pt. This is especially important for checkboxes, close buttons, media cards, save buttons, and map action buttons.

### Design rules

- Minimum tappable area: approximately 44 × 44 px/pt.
- Make the entire label row tappable for checkboxes.
- Avoid small standalone checkboxes.
- Increase spacing between destructive or irreversible actions.
- Make the close button visually centered and easy to tap.

### PPGIS-specific targets

- Close panel button
- Text / Photo / Audio selection cards
- Gallery and Camera buttons
- Start / Stop Recording buttons
- Share checkboxes
- Submit button
- Current location button

---

## Principle 6. Maintain Strong Visual Hierarchy

### Rationale

The user must understand what matters now. Figma emphasizes hierarchy through typography, contrast, and spacing.

### Recommended hierarchy

1. Current task title: “Submit This Place”
2. Selected location status
3. Required identity fields
4. Log type selection
5. Selected media inputs
6. Sharing controls
7. Turnstile verification
8. Final Submit

### Design rules

- Use stronger typography for step titles.
- Use subdued text for explanatory notes.
- Make primary actions visually dominant.
- Make optional settings visible but not visually overwhelming.
- Separate sections with spacing or subtle cards.

### Avoid

- All inputs competing equally.
- Required and optional labels looking the same.
- Long forms with no visual grouping.

---

## Principle 7. Keep Controls Close to the Content They Modify

### Rationale

Apple recommends placing controls near the content they affect. Figma’s proximity principle also states that related elements should be placed together.

### Design rules

- Anonymous checkbox should be directly below the name field.
- “Show my photo to other users” should be directly below the saved photo section.
- “Show my audio to other users” should be directly below the saved audio section.
- “Save Photo” should be close to the photo file/camera controls.
- “Save Audio” should be close to upload/record controls.

### Why it matters

If privacy controls are separated from the media they affect, users may misunderstand what they are sharing.

---

## Principle 8. Make Privacy Visible and Actionable

### Rationale

This platform collects location, name, text, photo, and audio. These are privacy-sensitive data. Privacy cannot be hidden in a footnote.

### Design rules

- Explain what is stored in the master database.
- Explain what is visible to other users.
- Separate identity visibility from media visibility.
- Make sharing choices explicit before final submission.
- Avoid vague language such as “anonymous” without clarification.

### Recommended microcopy

- “Your name is stored for project administration.”
- “If checked, other users will see Anonymous instead of your name.”
- “Photos and audio may contain identifiable information.”
- “Choose which media, if any, should be visible to other users.”
- “Private items are stored but not shown on the public map.”

### Future login version

When login is added, use a clearer visibility model:

- Public: visible to everyone.
- Private: visible only to me and the project administrator/researcher.
- Anonymous Public: visible to everyone without my name.

---

## Principle 9. Give Immediate and Specific Feedback

### Rationale

Users need to know whether an action succeeded. This is especially important for file selection, audio recording, saving, uploading, Turnstile verification, and final submission.

### Required feedback states

- Location selected.
- Text saved.
- Photo selected.
- Photo saved.
- Audio recording started.
- Audio recording stopped.
- Audio saved.
- Uploading.
- Turnstile verification required.
- Submission successful.
- Submission failed with reason.

### Avoid vague messages

Avoid: “Error.”

Prefer:

- “Photo upload failed. Please try a smaller image.”
- “Please complete Turnstile verification before submitting.”
- “Please save at least one text, photo, or audio log before submitting.”

---

## Principle 10. Design for In-Situ Use

### Rationale

The platform is meant for students’ everyday spatial experiences. They may use it in real places, not only at a desk.

### Design rules

- Minimize typing burden.
- Support camera capture and in-browser audio recording.
- Provide current-location assistance.
- Keep actions short and resumable.
- Prevent accidental data loss when a submission fails.
- Make upload limits visible.

### Recommended safeguards

- Disable Submit while uploading.
- Keep draft content if upload fails.
- Show file size limits before upload.
- Compress images if possible.
- Warn before closing a panel with unsaved content.

---

## Principle 11. Use a Mobile-Appropriate Map/Form Layout

### Rationale

A desktop side panel does not translate well to mobile. On a phone, the map and form compete for limited vertical space.

### Recommended layout

#### Desktop

- Full map background.
- Left introduction panel.
- Right submission panel.
- Marker popup on map.

#### Mobile

- Full-width map.
- Floating current-location button.
- Bottom sheet for submission.
- Bottom sheet can expand/collapse.
- Step-based form inside the bottom sheet.
- Submit button fixed near the bottom of the sheet.

### Bottom sheet behavior

- Collapsed: show selected location and “Add Log.”
- Half-expanded: show current step.
- Full-expanded: show long content fields.
- Closing without submission removes temporary marker after confirmation if content exists.

---

## Principle 12. Prioritize Accessibility

### Rationale

Accessibility is not optional, especially for a student-facing platform. Figma emphasizes contrast, keyboard navigation, padding, assistive technology compatibility, and WCAG-informed design.

### Design rules

- Maintain sufficient color contrast.
- Do not rely on color alone to indicate state.
- Provide text labels for icons.
- Provide alt text for visual content where appropriate.
- Ensure keyboard navigation works for form controls.
- Use semantic HTML labels.
- Ensure focus states are visible.
- Keep text large enough on mobile.

### PPGIS-specific concerns

- Markers should have accessible descriptions where possible.
- Media controls should have labels.
- Audio recording buttons should be clearly distinguishable.
- Required and optional fields should be announced through text, not color alone.

---

## Principle 13. Keep the Interface Consistent

### Rationale

Figma emphasizes consistency because inconsistent UI increases cognitive load. In this platform, consistency is especially important because users already have to think about location, media, and privacy.

### Design rules

- Use one style for primary buttons.
- Use one style for secondary buttons.
- Use one style for selected cards.
- Use one style for saved-state messages.
- Use consistent wording: “Save,” “Share,” “Submit,” “Private.”
- Do not use different terms for the same concept.

### Terminology to standardize

Use consistently:

- “Text Log”
- “Photo Log”
- “Audio Log”
- “Save”
- “Share publicly”
- “Anonymous”
- “Private”

Avoid mixing:

- “content,” “log,” “story,” “record” without clear distinctions.

---

## Principle 14. Preserve Image and Media Quality Without Breaking Layout

### Rationale

Apple recommends high-resolution assets and preserving image aspect ratio. In the PPGIS platform, media previews and popup content must remain readable without distorting images or overflowing panels.

### Design rules

- Preserve image aspect ratio.
- Use max-width constraints in popups.
- Avoid stretched or cropped thumbnails unless intentional.
- Provide clear audio controls.
- Do not autoplay audio.
- Use loading placeholders for signed URLs.

### Popup rules

- Keep media previews compact.
- Avoid extremely tall popups on mobile.
- Consider “View photo” or expandable media for mobile.
- Keep title, display name, and text readable before media.

---

## 4. Recommended Mobile Flow for the Current Platform

## Step 1. Select Place

Screen elements:

- Map
- Current location button
- Temporary marker
- “Use this location” button
- “Cancel” button

Microcopy:

> Tap the map to select a place. You can adjust the marker before submitting.

## Step 2. Identity

Fields:

- Name: required
- Anonymous checkbox

Microcopy:

> Your name is stored for project administration. If Anonymous is checked, other users will not see your name.

## Step 3. Choose Log Type

Cards:

- Text
- Photo
- Audio

Rules:

- Multiple selection allowed.
- Use icons + labels.
- Active state must be visible.

## Step 4. Add and Save Content

Text:

- Text box
- Save Text
- “Text saved” state

Photo:

- Upload from Gallery
- Take Photo
- Save Photo
- Preview or filename

Audio:

- Upload Audio File
- Record Audio
- Start / Stop Recording
- Save Audio
- Duration or filename

## Step 5. Sharing

Controls:

- Share this log publicly
- Show photo to other users
- Show audio to other users

Microcopy:

> You can record something without making it public. Public content may be visible to anyone with the platform link.

## Step 6. Verify and Submit

Elements:

- Turnstile widget
- Submit button
- Upload/progress indicator
- Success/error message

Rules:

- Disable Submit during upload.
- Reset Turnstile after failed submission.
- Keep draft content if submission fails.

---

## 5. Design Checklist

Use this checklist before deploying a new version.

### Layout

- [ ] No horizontal scrolling on mobile.
- [ ] Map and form do not compete for the same space.
- [ ] Mobile uses bottom sheet or step-based layout.
- [ ] Important content appears without zooming.

### Touch

- [ ] Buttons are at least 44 × 44 px/pt.
- [ ] Checkboxes have tappable labels.
- [ ] Close button is centered and easy to tap.
- [ ] Media cards are finger-friendly.

### Flow

- [ ] User can tell what step they are on.
- [ ] Only relevant fields are shown.
- [ ] User receives feedback after every action.
- [ ] Cancelling removes temporary marker.

### Media

- [ ] Gallery and Camera are clearly separate.
- [ ] Audio upload and audio recording are clearly separate.
- [ ] Saved media state is visible.
- [ ] Media previews do not overflow.

### Privacy

- [ ] Name storage is clearly explained.
- [ ] Anonymous display is clearly explained.
- [ ] Photo/audio visibility is explicit.
- [ ] Public vs private sharing is clear.
- [ ] Sensitive media warning is visible.

### Accessibility

- [ ] Icons have labels.
- [ ] Contrast is sufficient.
- [ ] Required fields are indicated with text, not color only.
- [ ] Focus states are visible.
- [ ] Text is legible without zooming.

### Error Handling

- [ ] Upload failure does not erase content.
- [ ] File size errors are specific.
- [ ] Turnstile error is understandable.
- [ ] Submit is disabled while processing.

---

## 6. Priority Improvements for the Current PPGIS Site

### Highest Priority

1. Convert the mobile submission panel into a bottom sheet or step-based modal.
2. Ensure all buttons and checkboxes are touch-friendly.
3. Make privacy/sharing choices clearer and closer to the content they affect.
4. Add current-location support.
5. Add stronger saved/unsaved/uploading feedback.

### Medium Priority

6. Add draft preservation after failed upload.
7. Improve media previews and popup media layout.
8. Add explicit progress indicators for multi-step submission.
9. Improve accessibility labels and keyboard navigation.

### Future Priority

10. Login-based “My Logs” view.
11. Edit/delete own submissions.
12. Private/public visibility model.
13. Server-side signed URL handling for private media.
14. Offline or local-draft support.

---

## 7. Summary: Design Philosophy for This Platform

The PPGIS platform should not feel like a long survey form. It should feel like a guided spatial logging tool.

The core design philosophy is:

> Start from the place. Guide the user step by step. Let them choose how to express the experience. Make privacy choices explicit. Provide feedback after every action. Design for thumbs, small screens, uncertain networks, and sensitive data.

In practical terms:

- The map provides spatial grounding.
- The form should unfold progressively.
- Media choices should be clear and flexible.
- Privacy should be built into the interface.
- The user should always know what has been selected, saved, shared, and submitted.

---

## References

Apple Developer. (n.d.). *Human Interface Guidelines*. https://developer.apple.com/design/human-interface-guidelines

Apple Developer. (n.d.). *UI Design Dos and Don’ts*. https://developer.apple.com/design/tips/

Android Developers. (n.d.). *앱 디자인 원칙*. https://developer.android.com/design/ui/wear/guides/m2-5/surfaces/apps-principles?hl=ko

Figma. (n.d.). *핵심 UI 디자인 원칙 7가지 + 그 사용 방법*. https://www.figma.com/ko-kr/resource-library/ui-design-principles/

Udeh, P. (2024). *Design Principles Used by Apple: For Better User Experience*. Medium. https://medium.com/design-bootcamp/design-principles-used-by-apple-for-better-user-experience-592574194bfb
