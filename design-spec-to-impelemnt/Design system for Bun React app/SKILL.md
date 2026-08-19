---
name: werving-selectie-design
description: Use this skill to generate well-branded interfaces and assets for the Werving & Selectie recruitment application (Bun + React + Astryx), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Note: production code here targets Astryx (`@astryxdesign/core`). Use Astryx primitives and the theme in `theme/wervingTheme.ts`; the components in `components/` are domain composites, not replacements for Astryx primitives.
