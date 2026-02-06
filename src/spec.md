# Specification

## Summary
**Goal:** Fix chat scrolling issues (jumping/locking) by using a stable fixed-height scroll container and bottom-aware auto-scroll behavior in the chat page.

**Planned changes:**
- Update `frontend/src/pages/Chat/ChatPage.tsx` to render the message list inside a fixed-height container that uses `overflow-y: auto`, replacing the current `ScrollArea` usage if it interferes with correct scrolling.
- Ensure the chat input stays visible at the bottom of the chat card while the message list scrolls independently (mobile and desktop).
- Implement bottom-aware auto-scroll: only scroll to the latest message when the user is already at/near the bottom; disable auto-scroll when the user scrolls up and re-enable when they return to bottom.
- Preserve scroll position across renders by removing/replacing any unconditional scrolling logic on message updates, preventing scrollTop resets and avoiding page reflow/scroll locking on new messages.
- When auto-scroll is allowed, use native smooth scrolling on the message scroll container (not page-level scrolling).

**User-visible outcome:** The chat remains smoothly scrollable on mobile and desktop: the message list no longer jumps or locks when new messages arrive, users can read older messages without being pulled to the bottom, and new messages auto-scroll smoothly only when the user is already at the bottom.
