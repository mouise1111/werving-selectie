function ApplyForm({title, go}) {
  const [mode, setMode] = React.useState('upload');
  const [motivation, setMotivation] = React.useState('');
  const [error, setError] = React.useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!motivation.trim()) { setError('Een motivatiebrief is verplicht voor deze vacature.'); return; }
    setError('');
    go('status');
  };
  const label = {fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6};
  return (
    <main style={{maxWidth: 720, margin: '0 auto', padding: '40px var(--layout-gutter) 0'}}>
      <span style={{fontSize: 13, color: 'var(--color-text-secondary)'}}>Solliciteren</span>
      <h1 style={{margin: '6px 0 0', fontFamily: 'var(--font-family-heading)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.015em'}}>{title}</h1>
      <form className="card" onSubmit={submit} style={{padding: 28, marginTop: 24, display: 'grid', gap: 20}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
          <div><label style={label}>Naam</label><input className="field" defaultValue="Ibrahim Hamza" /></div>
          <div><label style={label}>E-mail</label><input className="field" defaultValue="ibrahim@email.be" /></div>
        </div>
        <div>
          <span style={label}>Cv</span>
          <div style={{display: 'flex', gap: 8}}>
            {[['upload', 'Bestand opladen'], ['form', 'Formulier invullen']].map(([id, l]) => (
              <button key={id} type="button" onClick={() => setMode(id)}
                className={'pill ' + (mode === id ? 'pill-dark' : 'pill-ghost')} style={{height: 36, padding: '0 18px', fontSize: 13}}>{l}</button>
            ))}
          </div>
          {mode === 'upload' ? (
            <div style={{marginTop: 12, padding: 24, border: '1px dashed var(--color-border-emphasized)', borderRadius: 'var(--radius-element)', background: 'var(--brand-teal-50)', display: 'flex', alignItems: 'center', gap: 12}}>
              <Icon name="file-up" size={20} />
              <div>
                <div style={{fontSize: 14, fontWeight: 500}}>cv-ibrahim-hamza.pdf</div>
                <div style={{fontSize: 12, color: 'var(--color-text-secondary)'}}>Alleen pdf of docx, max. 10 MB</div>
              </div>
            </div>
          ) : (
            <div style={{marginTop: 12, display: 'grid', gap: 12}}>
              <input className="field" placeholder="Huidige functie" />
              <input className="field" placeholder="Jaren ervaring" />
              <input className="field" placeholder="Opleiding" />
            </div>
          )}
        </div>
        <div>
          <label style={label}>Motivatiebrief <span style={{color: 'var(--color-error)'}}>verplicht</span></label>
          <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} rows={5}
            placeholder="Waarom past deze functie bij jou?"
            style={{width: '100%', padding: 14, borderRadius: 'var(--radius-element)', border: '1px solid ' + (error ? 'var(--color-error)' : 'var(--color-border)'), fontFamily: 'inherit', fontSize: 14, resize: 'vertical'}} />
          {error ? (
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '8px 12px', borderRadius: 'var(--radius-inner)', background: 'var(--color-error-muted)', color: 'var(--color-error)', fontSize: 13}}>
              <Icon name="alert-circle" size={14} />{error}
            </div>
          ) : null}
        </div>
        <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
          <button className="pill pill-accent" type="submit">Sollicitatie indienen</button>
          <button className="pill pill-ghost" type="button" onClick={() => go('vacature')}>Annuleren</button>
        </div>
      </form>
    </main>
  );
}
