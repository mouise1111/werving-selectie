function StatusPage({go}) {
  const {StatusBadge, StageTimeline} = NS;
  const [withdrawn, setWithdrawn] = React.useState(false);
  return (
    <main style={{maxWidth: 820, margin: '0 auto', padding: '40px var(--layout-gutter) 0'}}>
      <h1 style={{margin: 0, fontFamily: 'var(--font-family-heading)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.015em'}}>Mijn sollicitatie</h1>
      <div className="card" style={{padding: 28, marginTop: 24}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20}}>
          <div>
            <h2 style={{margin: 0, fontFamily: 'var(--font-family-heading)', fontSize: 20, fontWeight: 600}}>Senior UI Designer</h2>
            <span style={{fontSize: 13, color: 'var(--color-text-secondary)'}}>Design · ingediend op 12 maart</span>
          </div>
          <StatusBadge status={withdrawn ? 'ingetrokken' : 'behandeling'} />
        </div>
        <div style={{marginTop: 28}}>
          <StageTimeline stages={[
            {label: 'Ontvangen', state: 'done', meta: '12 mrt'},
            {label: 'CV-beoordeling', state: withdrawn ? 'todo' : 'current', meta: withdrawn ? '—' : 'In behandeling'},
            {label: 'Online test', state: 'todo'},
            {label: 'Interview', state: 'todo'},
            {label: 'Beslissing', state: 'todo'},
          ]} />
        </div>
        <div style={{marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 12, alignItems: 'center'}}>
          <button className="pill pill-ghost" disabled={withdrawn} onClick={() => setWithdrawn(true)}
            style={withdrawn ? {opacity: 0.5, cursor: 'not-allowed'} : null}>
            {withdrawn ? 'Sollicitatie ingetrokken' : 'Sollicitatie intrekken'}
          </button>
          <span style={{fontSize: 12, color: 'var(--color-text-secondary)'}}>
            Kan tot de eindbeslissing. Daarna verdwijnt je sollicitatie uit het selectieproces.
          </span>
        </div>
      </div>
      <button className="pill pill-dark" style={{marginTop: 20}} onClick={() => go('vacatures')}>Andere vacatures bekijken</button>
    </main>
  );
}
