# Study Phase 1 + 2 rework

## What changed
- `/study` is now a daily learning centre instead of a subject-first hub.
- Added Continue Learning, review-due card, Today queue, and richer subject cards.
- Replaced prominent Year 8/Year 9 buttons with a compact year dropdown.
- Subject home now leads with current focus + continue state.
- Subject modes are Learn / Practise / Review / Progress; Play is no longer a primary Study mode.
- Learn navigation now shows a compact Current unit list and collapsible Other units.
- Lesson content is normalised into six learning sections:
  1. What you need to know
  2. Must remember
  3. Visual / diagram
  4. Worked example
  5. Common mistakes
  6. Quick Check

## Data behaviour
- Uses existing Zustand store data: reviews, lastSubject, lastTopic, seenCorrect, seenTotal and year.
- No store migration is required.
- Review counts are calculated per subject from existing review/question IDs.
- Existing `/study/$subject/play` route remains in the project, but is no longer promoted in the Study UI.

## Install
Copy this ZIP's `src/` folder over the repository's existing `src/` folder.
Only the four files included here are changed/added.

## Validation
The changed TSX files were syntax/type checked in isolation.
Because the uploaded ZIP contained only `src/`, project dependencies and the full tsconfig were unavailable here;
the only compiler diagnostics in isolation were expected missing-project-module diagnostics.
