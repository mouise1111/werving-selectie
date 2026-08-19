# UI kit — Careers site (sollicitant)

The public surface: published vacancies, the application form, and the candidate's own status page.

Screens (click-through from `index.html`):

| Screen | File | Use case |
| --- | --- | --- |
| Landing | `Landing.jsx` | UC1 step 8 — published vacancies on the public site |
| All vacancies | `VacancyList.jsx` | Search and browse |
| Vacancy detail | `VacancyDetail.jsx` | UC2 steps 1–2 |
| Apply | `ApplyForm.jsx` | UC2 steps 3–5, incl. 3a (form instead of upload) and 4a (missing motivation letter blocks submit) |
| My application | `StatusPage.jsx` | UC2 steps 6–7 and 7a (withdraw) |

Composed from the system's own components (`VacancyCard`, `JobSearchBar`, `CategoryTile`, `StatusBadge`, `StageTimeline`, `BrandWordmark`, `SectionHeading`) plus local layout. In the Bun app these local wrappers become Astryx layout components (`VStack`, `HStack`, `Layout`) — see the caveats in the root readme.
