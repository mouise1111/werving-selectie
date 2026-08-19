# Werving & Selectie — design system

Design system for the recruitment application (`bun-react-template`, Bun + React 19), built to sit **on top of Astryx** (`@astryxdesign/core` 0.4.4 + `@astryxdesign/theme-neutral`), which the app already depends on.

## Sources I was given

| Source | What it gave me |
| --- | --- |
| Two reference screenshots (`uploads/pasted-1787153613576-0.png`, `uploads/pasted-1787153633423-0.png`) | The entire visual direction: deep-teal ink, single lime accent, tinted job cards, pill everything. A job-board concept design branded "AZIFA / Wazifa" — **not** your brand; nothing from its logo or wordmark was reproduced. |
| `Use Cases — Applicatie voor Werving en Selectie` (pasted, 7 use cases, Dutch) | Product domain, the actors (sollicitant, recruiter, manager, interviewer) and the full sollicitatiestatus vocabulary. |
| `package.json` (pasted) | Bun + React 19, Astryx core 0.4.4 and theme-neutral installed. |
| [astryx.atmeta.com](https://astryx.atmeta.com/docs/tokens) docs (tokens, theme) | Real Astryx token names and `defineTheme` surface, so this system aliases rather than fights them. |

**No codebase and no Figma file were attached**, and the Astryx CLI is not runnable from here — so component *primitives* are documented, not reimplemented (see "Relationship to Astryx").

## Product context

One product, two surfaces:

1. **Careers site (sollicitant).** Published vacancies, apply with cv + optional motivation letter, follow status, withdraw. Marketing-scale type, tinted cards, lime primary action.
2. **ATS (recruiter / manager / interviewer).** Vacancy requests, cv review, test invitations, shortlist, interview planning, final decision. Dense rows, 14px Astryx scale, colour used only for status.

The brand has **no name and no logo** in the supplied material. `BrandWordmark` renders the name in plain Poppins with a lime block; replace `name` with the real product name and drop in a real mark when one exists.

## Relationship to Astryx

- **Primitives stay Astryx.** Button, Input, Card, Table, Layout, Dialog… come from `@astryxdesign/core`. This system does not ship its own Button — Astryx defines 158 components and its CLI is the inventory.
- **Brand lives in the theme.** `theme/wervingTheme.ts` is a `defineTheme` file extending `neutralTheme`: lime accent seeded as a tuple, teal ink, pill radius on buttons/inputs, Poppins + Figtree. Install it with `<Theme theme={wervingTheme}>`; never override `--color-*` in `:root` in the app.
- **`styles.css` + `tokens/` are the design-time mirror** of that theme, so the cards, components and UI kits in this project render the same values in a plain browser. Load it in the app only if you are not using the theme file.
- **Components here are domain composites** Astryx has no equivalent for: vacancy card, job search bar, department tile, status badge, application row, stage timeline. They are prototype-fidelity (plain elements + tokens); in production, rebuild their internals from Astryx primitives and keep the props.

### Intentional additions
- `BrandWordmark` — stands in for the missing logo asset.
- `components/applications/statuses.js` — the status vocabulary as data, so filters and charts read the same labels the badge does.

## Content fundamentals

- **Language: Dutch (BE), formal-neutral.** "Je" to the candidate on the public site ("Vind de job die je verdient", "Laat je cv achter"); third-person process language in the ATS ("De recruiter opent het overzicht", "Manager keurt de shortlist goed").
- **Sentence case everywhere.** No title case, no ALL CAPS, no colons in headings. Buttons are verbs: "Solliciteer", "Sollicitatie indienen", "Sollicitatie intrekken", "Genereer samenvatting".
- **Status strings are fixed nouns** and never paraphrased: Ontvangen · In behandeling · Uitgenodigd voor test · Test voltooid · Shortlist — interview gepland · Aangenomen · Afgewezen · Ingetrokken · Aanbod geweigerd · In afwachting van toewijzing.
- **Errors state the rule, not the blame:** "Een motivatiebrief is verplicht voor deze vacature.", "Alleen pdf of docx, max. 10 MB."
- **Supporting copy carries the process promise** in one sentence: "Kan tot de eindbeslissing. Daarna verdwijnt je sollicitatie uit het selectieproces."
- **No emoji.** Numbers are plain ("173 open vacatures"); salaries as "€4.200" with "Maandelijks, bruto" underneath.

## Visual foundations

- **Colour.** Two brand colours: deep teal `#0B3B41` (all ink, all dark surfaces) and lime `#C7F04A` (one primary action per view, always with teal text on it — lime is never a text or icon colour). Neutrals are teal-tinted, not grey. Three card tints (lime-100, lilac-100, sky-100) rotate across a row of job cards; butter `#F7E6AE` is a badge/seal accent. Status colour is a separate family and the only place hue carries meaning in the app.
- **Type.** Poppins 600/700 for display and headings, Figtree 400/500/600 for UI and body. Marketing type is large and tight (56px / 1.08 / -0.02em); app type stays on the Astryx 14px × 1.2 scale. Poppins and Figtree are **Google Fonts substitutes** for the geometric grotesque in the screenshots — no font files were supplied.
- **Layout.** 1180px max width, 24px gutters, 72px between page bands, three-up card grids on the public site. Bands alternate white → `#E7F0F1` → white; at most one deep-teal band per page. The header is sticky and translucent (white at 95% with an 8px blur); nothing else is fixed.
- **Backgrounds.** Flat colour only. No gradients, no photography in the system (drop real imagery in later), no illustration set, no texture beyond the faint plus-grid visible in the reference hero — which is deliberately not reproduced as SVG.
- **Cards.** 12px radius, 1px `#DDE7E8` border, 20px padding, white or one of the three tints. Borders do the separating; shadows are a whisper (`--shadow-low` under floating pills, `--shadow-med` for popovers only).
- **Radii.** 8 / 12 / 16 / 32 and full. Every button, chip, tile and input is a **full pill** — that is the strongest signature in the brand. Dark bands use the 32px page radius.
- **Buttons.** Lime filled (primary, one per view) → dark teal filled (secondary in card rows) → outlined on `#C3D4D6` → quiet text link in `--color-text-secondary`. Minimum height 44px on the public site, Astryx element sizes in the app.
- **States.** Hover darkens (lime → `#B4E22F`; neutral surfaces gain `--color-overlay-hover`, a 5% teal wash). Press adds `--color-overlay-pressed`. Selected inverts to deep teal with a lime icon chip, or uses `--shadow-inset-selected`. Focus is a 2px teal outline at 3px offset. **No scale or lift transforms, ever.**
- **Motion.** 175ms for micro-interactions, 410ms for entrances, one curve: `cubic-bezier(0.24, 1, 0.4, 1)`. Colour and opacity only — no bounce, no spring, no parallax.
- **Transparency & blur.** Exactly one use: the sticky header. Everything else is opaque.
- **Imagery vibe (when real assets arrive).** Bright, cool-neutral, natural light, people at work, no heavy grade or grain; crop to 12px-radius rectangles.

## Iconography

- No icon assets were supplied. The reference screens use a thin, single-weight outline set (~1.5px, rounded joins, 16–20px).
- **Substitute: [Lucide](https://lucide.dev) via CDN** (`https://unpkg.com/lucide@latest`) — closest match for stroke weight and geometry. Used in the UI kits through a small `Icon` wrapper. **Flagged substitution:** swap for the real set when you have it.
- Icons are `--color-icon-secondary` at rest, `--color-icon-primary` when active; never lime. Company/brand logos inside job cards are consumer-supplied images, passed via the card's `logo` prop.
- No emoji, no unicode glyphs as icons in production code (a couple of geometric glyphs appear inside the composites as placeholders where an icon prop is not yet wired).

## Index

- `styles.css` — global entry point (`@import` list only).
- `tokens/` — `fonts`, `colors`, `typography`, `spacing`, `shape`, `elevation`, `motion`.
- `theme/wervingTheme.ts` — the Astryx `defineTheme` file to use in the Bun app.
- `guidelines/` — 16 foundation specimen cards (Colors, Type, Spacing, Shape, Brand).
- `components/brand/` — `BrandWordmark`, `SectionHeading`.
- `components/vacancies/` — `VacancyCard`, `JobSearchBar`, `CategoryTile`.
- `components/applications/` — `StatusBadge`, `ApplicationRow`, `StageTimeline`, `statuses.js`.
- `ui_kits/careers-site/` — public site: landing, vacancy list, vacancy detail, apply, my application.
- `ui_kits/ats/` — recruiter/manager surface. **Not built yet** (see caveats).
- `SKILL.md` — lets this folder be used as an Agent Skill in Claude Code.
