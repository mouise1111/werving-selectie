function VacancyDetail({title, go}) {
  const {StageTimeline} = NS;
  const meta = [['map-pin', 'Gent, BE'], ['clock', 'Voltijds'], ['building-2', 'Design'], ['calendar', 'Open tot 30 apr']];
  return (
    <main style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '40px var(--layout-gutter) 0'}}>
      <button className="pill pill-ghost" style={{height: 36, padding: '0 16px', fontSize: 13}} onClick={() => go('vacatures')}>Terug naar vacatures</button>
      <div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 32, marginTop: 24, alignItems: 'start'}}>
        <article>
          <h1 style={{margin: 0, fontFamily: 'var(--font-family-heading)', fontSize: 35, fontWeight: 700, letterSpacing: '-0.015em'}}>{title}</h1>
          <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 16}}>
            {meta.map(([icon, label]) => (
              <span key={label} style={{display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)'}}>
                <Icon name={icon} size={14} />{label}
              </span>
            ))}
          </div>
          {[['Functieomschrijving', 'Je werkt samen met het recruitmentteam aan de schermen waarmee managers vacatures aanvragen en recruiters sollicitaties beoordelen. Je bent verantwoordelijk voor het ontwerpsysteem en de consistentie over de publieke site en de interne tool.'],
            ['Vereisten', 'Minstens vier jaar ervaring met productontwerp. Ervaring met ontwerpsystemen en met het uitwerken van complexe statusflows. Nederlands en Engels, professioneel niveau.'],
            ['Selectieproces', 'Cv-beoordeling door de recruiter, eventueel een online test, een eerste interview met de recruiter en daarna één of meerdere gesprekken met de aangeduide interviewers. De manager neemt de eindbeslissing.']].map(([h, p]) => (
            <section key={h} style={{marginTop: 32}}>
              <h2 style={{margin: 0, fontFamily: 'var(--font-family-heading)', fontSize: 20, fontWeight: 600}}>{h}</h2>
              <p style={{margin: '10px 0 0', fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', maxWidth: 620, textWrap: 'pretty'}}>{p}</p>
            </section>
          ))}
        </article>
        <aside className="card" style={{padding: 24, position: 'sticky', top: 96}}>
          <span style={{fontFamily: 'var(--font-family-heading)', fontSize: 24, fontWeight: 700}}>€4.200</span>
          <span style={{display: 'block', fontSize: 12, color: 'var(--color-text-secondary)'}}>Maandelijks, bruto</span>
          <button className="pill pill-accent" style={{width: '100%', marginTop: 20}} onClick={() => go('solliciteren')}>Solliciteer</button>
          <p style={{fontSize: 12, color: 'var(--color-text-secondary)', margin: '12px 0 0', lineHeight: 1.6}}>
            Voor deze vacature is een motivatiebrief verplicht.
          </p>
          <div style={{marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-border)'}}>
            <span style={{fontSize: 13, fontWeight: 600}}>Wat volgt na je sollicitatie</span>
            <div style={{marginTop: 14}}>
              <StageTimeline orientation="vertical" stages={[
                {label: 'Ontvangen', state: 'todo', meta: 'Bevestiging per mail'},
                {label: 'CV-beoordeling', state: 'todo', meta: 'Binnen 5 werkdagen'},
                {label: 'Online test', state: 'todo', meta: 'Indien nodig'},
                {label: 'Interview', state: 'todo'},
                {label: 'Beslissing', state: 'todo'},
              ]} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
