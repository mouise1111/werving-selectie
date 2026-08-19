Dense list row for sollicitaties — use rows for lists, never one card per applicant.

```jsx
<ApplicationRow candidate="Ibrahim Hamza" role="Senior UI Designer" status="behandeling" appliedOn="12 mrt" testScore={78} hasMotivation onOpen={openReview} />
```

Wrap a stack of rows in a bordered container with a header row of the same grid. `testScore={null}` renders an em dash for candidates who skipped the test.
