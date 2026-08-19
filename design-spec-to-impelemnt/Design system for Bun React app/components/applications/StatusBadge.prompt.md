The single way to show sollicitatiestatus anywhere in the ATS — the ten statuses are the ones the use cases define.

```jsx
<StatusBadge status="testVoltooid" />
<StatusBadge status="afgewezen" size="sm" />
```

Import `APPLICATION_STATUSES` from `statuses.js` when you need the label or colours outside the badge (filters, charts). Never invent a status outside that map.
