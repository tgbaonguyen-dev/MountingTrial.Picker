# Mounting Trial Picker — Agent Instructions

## Product Goal

Build a fast, readable companion for choosing the least dangerous Mounting Trials in Limbus Company's Mirror of Sisyphe. A player should be able to find the options shown in game, select them, and understand the recommendation without learning the scoring model first.

The app is a decision aid, not an official simulator. Keep that distinction visible whenever scoring or game mechanics are explained.

## Technical Baseline

- Use Vite with native ESM and vanilla JavaScript.
- Use Tailwind CSS 4 and daisyUI 5 for interface work.
- Use the local `daisyui` Codex skill before changing HTML, CSS, components, colors, or themes.
- Keep the app static and deployable to Vercel. Do not introduce a backend unless the product genuinely requires one.
- Use Be Vietnam Pro for the interface.
- Keep Light Theme as the default. Preserve both `mounting-light` and `mounting-dark` themes.
- Store non-sensitive UI preferences, such as the selected theme, in `localStorage`.

## Repository Map

- `index.html`: page structure and static copy.
- `src/main.js`: Mounting Trial data, scoring, state, rendering, and interactions.
- `src/styles.css`: Tailwind/daisyUI setup, theme tokens, and the small amount of custom layout CSS.
- `public/trial-icons/`: local copies of Mounting Trial icons sourced from Limbus Company Wiki.
- `DESIGN.md`: product behavior and visual design system.

Do not add a framework, router, state library, component abstraction, or data layer unless the current structure can no longer solve the requested change simply.

## Data Rules

- Treat `TRIALS` as curated game data. Do not change a value from memory.
- Verify new or changed Trial names, floors, effects, and icons against a cited source.
- Prefer Limbus Company Wiki pages and their MediaWiki API. Record any important ambiguity in the visible source note.
- Floor 15 currently has no selectable Trial pool because it ends the run. Do not invent Floor 15 entries.
- Preserve stable Trial IDs in the form `${floor}:${trial.name}` unless a migration is intentionally implemented.
- Every Trial name must resolve to an icon through `iconForTrial`. Missing mappings must throw a clear error rather than silently displaying an unrelated icon.
- Higher ranks in the same Trial family may share the family icon when the game/wiki does so.

## Scoring Rules

- Keep scoring weights in `META`; do not duplicate them in calculation code.
- `score` is a weighted comparison heuristic. It is not an official in-game stat.
- `clash` is an estimate used for explanation. Keep the displayed wording approximate.
- Lower score means an easier Trial under the active mode.
- Preserve the two scoring modes:
  - `safe`: prioritizes run stability and penalizes offensive enemy buffs heavily.
  - `fast`: penalizes HP and Defense more because they extend fights.
- When changing a weight, update the visible scoring table and example in `index.html` in the same change.
- A recommendation must explain both why an option was chosen and why a worse option was skipped.
- Avoid false precision. One decimal place is enough for displayed scores.

## Interaction Contract

- Clicking a Trial in the library selects it; clicking it again deselects it.
- Clicking any selected Trial card removes it. Do not add a small separate remove button unless explicitly requested.
- Keep selected state visually obvious and expose it with `aria-pressed`.
- Search filters by Trial name and must work together with the floor filter.
- The floor menu covers Floors 1–14 plus “Tất Cả”.
- The fixed-height Trial library must scroll internally so the comparison panel remains usable.
- On desktop, the comparison panel may remain sticky. On smaller screens it must return to normal document flow.
- Theme changes must update immediately and persist across reloads.
- Respect `prefers-reduced-motion`.

## UI Rules

- Follow `DESIGN.md` before making visual changes.
- Prefer daisyUI components and semantic colors over custom components and fixed palette utilities.
- Use `base-*` colors for structure. Reserve `primary` for selection and the most important action or state.
- Keep cards compact. This is an in-run utility, not a marketing dashboard.
- Show effects as separate chips. Never return to a long delimiter-separated metadata line.
- Keep Trial icons decorative with empty alt text because the adjacent Trial name carries the meaning.
- Ensure Light and Dark Theme both remain readable after every UI change.
- Use Pascal Case for visible section labels and controls, matching the existing interface.
- Write user-facing copy in natural Vietnamese. Keep game terms such as Trial, Clash, Power, Offense, Defense, and Damage recognizable.

## Code Rules

- Prefer pure functions and immutable transformations.
- Do not mutate Trial definitions or effect objects.
- Keep functions single-purpose and avoid boolean flags that switch behavior.
- Reuse existing helpers such as `effectText`, `iconForTrial`, and `createEffectChips` before adding similar logic.
- Throw explicit errors for invalid or unmapped data. Do not hide data problems with generic fallbacks.
- Use English for code comments. Prefer clear names over explanatory comments.
- Keep dependencies minimal and add them through `package.json`.
- Do not commit generated `dist/` output unless the hosting workflow explicitly requires it.

## Verification

For every behavior or UI change:

1. Run `npm run build`.
2. Preview the app locally when browser tools are available.
3. Verify search, floor filtering, select, deselect, selected-card removal, scoring output, and theme switching when the changed area can affect them.
4. Check one narrow viewport and one desktop viewport for layout regressions.
5. Confirm that all referenced files in `public/trial-icons/` load successfully.

Do not create commits or deploy unless the user asks.
