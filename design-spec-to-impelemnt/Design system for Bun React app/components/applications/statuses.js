/**
 * The sollicitatiestatus vocabulary from the use cases (UC2–UC7).
 * Keys are stable; labels are the Dutch strings shown in the UI.
 */
export const APPLICATION_STATUSES = {
  ontvangen: {label: 'Ontvangen', bg: 'var(--color-status-ontvangen-bg)', fg: 'var(--color-status-ontvangen-fg)'},
  behandeling: {label: 'In behandeling', bg: 'var(--color-status-behandeling-bg)', fg: 'var(--color-status-behandeling-fg)'},
  testUitgenodigd: {label: 'Uitgenodigd voor test', bg: 'var(--color-status-test-uitgenodigd-bg)', fg: 'var(--color-status-test-uitgenodigd-fg)'},
  testVoltooid: {label: 'Test voltooid', bg: 'var(--color-status-test-voltooid-bg)', fg: 'var(--color-status-test-voltooid-fg)'},
  shortlist: {label: 'Shortlist — interview gepland', bg: 'var(--color-status-shortlist-bg)', fg: 'var(--color-status-shortlist-fg)'},
  aangenomen: {label: 'Aangenomen', bg: 'var(--color-status-aangenomen-bg)', fg: 'var(--color-status-aangenomen-fg)'},
  afgewezen: {label: 'Afgewezen', bg: 'var(--color-status-afgewezen-bg)', fg: 'var(--color-status-afgewezen-fg)'},
  ingetrokken: {label: 'Ingetrokken', bg: 'var(--color-status-ingetrokken-bg)', fg: 'var(--color-status-ingetrokken-fg)'},
  geweigerd: {label: 'Aanbod geweigerd', bg: 'var(--color-status-geweigerd-bg)', fg: 'var(--color-status-geweigerd-fg)'},
  wachtstand: {label: 'In afwachting van toewijzing', bg: 'var(--color-status-wachtstand-bg)', fg: 'var(--color-status-wachtstand-fg)'},
};
