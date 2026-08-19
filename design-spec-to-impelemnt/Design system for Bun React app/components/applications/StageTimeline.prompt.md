Shows where a sollicitatie stands — the candidate's status page and the manager's decision screen use the same component.

```jsx
<StageTimeline stages={[
  {label: 'Ontvangen', state: 'done', meta: '12 mrt'},
  {label: 'CV-beoordeling', state: 'done', meta: 'Geschikt'},
  {label: 'Online test', state: 'current', meta: 'Uitgenodigd'},
  {label: 'Interview', state: 'todo'},
  {label: 'Beslissing', state: 'todo'},
]} />
```

Exactly one stage is `current`. Use `orientation="vertical"` in side panels. Skipped stages (no test — UC4 1a) are omitted from the array, not greyed out.
