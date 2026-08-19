The one search affordance on the public site — hero band and vacancy overview only.

```jsx
<JobSearchBar keyword={q} location={loc} onKeywordChange={setQ} onLocationChange={setLoc} onSubmit={search} />
```

Never stack two of these on a page, and never shrink it below 44px tall — the lime submit is the page's primary action.
