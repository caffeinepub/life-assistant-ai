# Specification

## Summary
**Goal:** Let authenticated users submit in-app feedback/change requests and review their previous submissions.

**Planned changes:**
- Add backend authenticated methods to create a feedback/change request (id, message text, createdAt, status) and list the caller’s requests (most recent first).
- Add a new Feedback page/screen with a textarea + submit button, basic validation, and success/error toasts.
- Add a clearly labeled “Feedback / Request a change” entry on the Settings page that navigates to the Feedback page.
- Display the user’s submitted requests on the Feedback page with created date and status (English UI text).

**User-visible outcome:** Signed-in users can open “Feedback / Request a change” from Settings, submit a short request, and see a history of their submitted requests with timestamps and statuses.
