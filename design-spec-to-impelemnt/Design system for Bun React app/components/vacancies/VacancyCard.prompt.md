The public-site vacancy card — one per published vacancy (UC1 step 8).

```jsx
<VacancyCard
  title="Senior UI Designer"
  department="Design"
  verified
  summary="Neem een zeldzame kans om vanaf nul op te bouwen."
  location="Gent, BE"
  contract="Voltijds"
  salary="€4.200"
  tint={1}
  onApply={openApplyForm}
/>
```

Rotate `tint` 1→2→3 in a three-up row; use `tint="none"` in longer grids and set `emphasizeAction` on at most one card per row.
