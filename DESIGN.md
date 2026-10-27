# Mounting Trial Picker — Design Guide

## Product Shape

Mounting Trial Picker is a compact decision tool used while a Mirror Dungeon run is in progress. The interface should feel quick, grounded, and game-adjacent without copying Limbus Company's screen design.

The primary loop is:

1. Find the Trials offered by the game.
2. Select the candidates.
3. Read the recommended picks and the reason behind them.
4. Remove or replace a candidate with one click.

Anything that slows this loop is secondary.

## Information Hierarchy

The page has three levels:

1. **Orientation:** Product title and the `3 Offense Level ≈ 1 Clash Power` rule.
2. **Work Area:** Trial library on top and comparison/recommendation panel below.
3. **Trust:** Game-data, formula, damage, and icon sources.

The work area owns the primary visual weight and provides an instant decision aid.

## Layout

### Desktop & Standard Screens

- Maximum content width: `1360px`.
- Single screen fit: The entire UI fits within `100dvh` with zero window scrolling.
- Topbar (`flex-none`): Compact 48px header with title, quick Clash rule pill, Sources modal button, and theme toggle.
- Main work area (`flex-1 min-h-0`): Two-column layout (`grid-template-columns: minmax(0, 1fr) minmax(0, 1.48fr)`):
  - **Left Column — Trial Library (~40%):** Search bar, 1-click horizontal Floor Tabs (`T1`–`T14`, `Tất Cả`), Custom Trial button, and an internally scrollable 2-column grid showing only the active floor's 6–9 Trials (or filtered results) to prevent visual clutter.
  - **Right Column — Selection & Recommendation (~60%):** Arranged into two parallel full-height sub-columns (`grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr)`):
    - Sub-column 1: Selected Trial list with individual score chips and click-to-remove affordance, occupying full vertical height and scrolling internally when many items are selected.
    - Sub-column 2: Recommendation summary card with Clash estimate, score comparison, highlighted chosen cards, and scannable compact rejected items, preventing text bloat.
- Gap between columns: `.75rem`.

### Tablet And Mobile

- Below `1024px` or viewport height `< 580px`, the layout stacks the library panel on top and the decision panel below with dedicated scroll heights.
- Below `768px`, the decision panel stacks selected candidates above recommendations.
- Below `640px`, the library grid shifts to 1 column.
- Preserve a minimum supported width of `320px`.

## Visual Direction

The style is warm, editorial, and utilitarian:

- Warm cream surfaces in Light Theme.
- Near-black neutral surfaces in Dark Theme.
- Muted red as the brand and selection color.
- Compact typography and restrained borders.
- Small, fast transitions rather than large decorative motion.
- Official Trial icons provide game identity; the surrounding UI stays quiet.

Avoid neon gamer styling, glass-heavy panels, oversized gradients, excessive pills, and dashboard-like metric clutter.

## Typography

- Font family: Be Vietnam Pro.
- Page title: heavy weight with tight tracking.
- Section titles: bold, compact, and sentence-like.
- Trial names: bold and visually stronger than metadata.
- Explanations: normal weight with generous enough line height for Vietnamese text.
- Labels and floor markers: small, bold, and used sparingly.

Visible UI labels use Pascal Case to match the existing product language. Paragraphs use normal Vietnamese capitalization.

## Color System

Use daisyUI semantic tokens exclusively for UI structure so both themes stay synchronized.

### Light Theme — `mounting-light`

- `base-100`: `#fffaf5`
- `base-200`: `#f8f0e8`
- `base-300`: `#eadfd4`
- `base-content`: `#282321`
- `primary`: `#d94f45`

Light is the default theme.

### Dark Theme — `mounting-dark`

- `base-100`: `#101114`
- `base-200`: `#17181d`
- `base-300`: `#24262d`
- `base-content`: `#f2efea`
- `primary`: `#e65c50`

### Semantic Usage

- `base-100`: rows and primary reading surfaces.
- `base-200`: cards and section panels.
- `base-300`: borders, subtle chips, and separators.
- `primary`: selected state, step numbers, and important links.
- `success`: low-risk guidance.
- `warning`: choices requiring calculation.
- `error`: dangerous Trial categories and removal affordance.

Do not introduce hard-coded text colors for ordinary content. Use opacity on `base-content` for hierarchy.

## Components

### Navigation

- Compact header with a translucent theme-aware background.
- Product mark and name on the left, plus quick Clash rule pill and Sisyphe tag.
- Sources modal trigger (`Nguồn ↗`) and theme switcher on the right.
- Accessible on all screens without pushing or hiding critical tools.

### Trial Library

Each Trial row is a clean, single-line button containing:

1. A `24px` (`1.5rem`) family icon.
2. Trial name (truncated with ellipsis if needed).
3. Floor badge (e.g. `T11` or `Custom`).
4. Add/check indicator (`+` or `✓`).

Hovering or keyboard-focusing any Trial row reveals a floating `#trialPopover` positioned beside the card, showing the Trial's icon, name, floor, score, and concise English stat chips with exact values.

Selected rows use a subtle primary tint and a primary inset edge. The whole row toggles selection in-place without triggering library re-renders.

### Custom Trials

Players can create custom Mounting Trials with user-defined names, floors, icons, and stat values. Custom Trials are saved to `localStorage`, integrated into the library with a `Custom` badge, and can be selected, scored, and compared seamlessly. Custom Trials can be removed with a delete affordance.

### Selected Trial Card

Each selected item is a full-width removal button containing:

1. A `32px` (`2rem`) family icon.
2. Floor, name, and effect chips.
3. Score aligned to the right.

Clicking anywhere removes it. Hover may introduce a subtle error tint to communicate removal. Do not show an `×` button.

### Search And Floor Filter

- Search remains the dominant control.
- Floor filter uses a compact dropdown with a grid of floor buttons.
- Search query and floor filter combine rather than replacing each other.
- Empty results must explain how to recover.

### Recommendation

- The primary recommendation uses a left primary border.
- Show chosen Trial names, total score, and approximate Clash increase.
- Follow with compact “Chọn” and “Bỏ” explanation cards.
- Explain the dominant reason in plain Vietnamese rather than exposing raw formulas alone.

## Icon System

Trial icons live in `public/trial-icons/` and are mapped by Trial-family prefix in `TRIAL_ICONS`.

- Use the official Mounting Trial icon where available.
- Reuse a family icon for later ranks when the source/game does not provide a distinct icon.
- Store icons locally rather than hotlinking production UI assets.
- Keep the source link to the Limbus Company Wiki icon category visible in the Sources section.
- Icons are decorative beside a visible Trial name, so use `alt=""`.
- Use `object-fit: contain`; never crop or stretch an icon.

Source: [MD Mounting Trial Icons](https://limbuscompany.wiki.gg/wiki/Category:MD_Mounting_Trial_Icons).

## Motion

- Intro rise: about `450ms`.
- Trial entrance: about `200ms` with a very short stagger.
- Selection and result transitions: `150–300ms`.
- Movement should clarify state, not decorate idle space.
- Under `prefers-reduced-motion: reduce`, collapse durations to effectively zero.

## Accessibility

- All interactive Trial rows must be real buttons.
- Library rows expose selection through `aria-pressed`.
- Selected cards have an explicit removal label.
- Keyboard focus uses a visible theme-aware outline.
- Text and important controls must meet readable contrast in both themes.
- Do not rely on color alone: selected rows also show a check mark and inset edge.
- Result updates remain in an `aria-live="polite"` region.

## Content Style

- Write concise, natural Vietnamese.
- Keep established game terms in English where translation would make recognition slower.
- State uncertainty explicitly with words such as “ước tính” and “khoảng”.
- Never present the app's weights as official game values.
- Explain consequences in player terms: harder Clash, more incoming Damage, or longer fights.

## Definition Of Done For UI Changes

A UI change is complete when:

- The primary selection loop still works without instructions.
- Light and Dark Theme both look intentional.
- Desktop and mobile layouts do not overflow.
- Search, floor filter, select, deselect, card removal, and result rendering still work.
- `npm run build` succeeds.
- New data or imagery has a visible, trustworthy source.
