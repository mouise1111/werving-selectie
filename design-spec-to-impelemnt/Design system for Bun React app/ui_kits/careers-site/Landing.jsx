function Landing({go, openVacancy}) {
  const {SectionHeading, JobSearchBar, VacancyCard, CategoryTile} = NS;
  const [dept, setDept] = React.useState('Engineering');
  const jobs = [
    {title: 'Senior UI Designer', department: 'Design', summary: 'Bouw mee aan het ontwerpsysteem voor onze interne werving- en selectietool.', location: 'Gent, BE', contract: 'Voltijds', salary: '€4.200', tint: 1},
    {title: 'Recruiter', department: 'HR', summary: 'Beoordeel cv\'s, plan interviews en stel shortlists samen met de manager.', location: 'Antwerpen, BE', contract: 'Voltijds', salary: '€3.600', tint: 2},
    {title: 'Data Verification', department: 'Operations', summary: 'Controleer sollicitatiedata en testresultaten voor het recruitmentteam.', location: 'Remote, BE', contract: 'Deeltijds', salary: '€3.100', tint: 3},
  ];
  const cats = [
    ['Engineering', 48, 'code'], ['Design', 12, 'pen-tool'], ['HR', 21, 'users'], ['Operations', 34, 'settings'],
    ['Finance', 9, 'wallet'], ['Marketing', 17, 'megaphone'], ['Support', 26, 'headphones'], ['Management', 6, 'briefcase'],
  ];
  return (
    <main>
      <section style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '64px var(--layout-gutter) 0', textAlign: 'center'}}>
        <h1 style={{margin: '0 auto', maxWidth: 760, fontFamily: 'var(--font-family-heading)', fontSize: 'var(--text-hero-size)', lineHeight: 'var(--text-hero-leading)', letterSpacing: 'var(--text-hero-tracking)', fontWeight: 700, textWrap: 'pretty'}}>
          Vind de job die je verdient
        </h1>
        <p style={{margin: '20px auto 0', maxWidth: 520, fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.6}}>
          173 open vacatures over alle departementen. Solliciteer met je cv, volg je status van ontvangst tot beslissing.
        </p>
        <div style={{maxWidth: 620, margin: '32px auto 0'}}>
          <JobSearchBar onSubmit={() => go('vacatures')} />
        </div>
      </section>

      <section style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '72px var(--layout-gutter) 0'}}>
        <SectionHeading title="Recent gepubliceerd" actionLabel="Bekijk alle vacatures" onAction={() => go('vacatures')} />
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--layout-card-gap)', marginTop: 24}}>
          {jobs.map((j, i) => (
            <VacancyCard key={j.title} {...j} verified emphasizeAction={i === 0} onApply={() => openVacancy(j.title)} actionLabel="Solliciteer" />
          ))}
        </div>
      </section>

      <section style={{marginTop: 72, background: 'var(--color-background-muted)'}}>
        <div style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '72px var(--layout-gutter)'}}>
          <SectionHeading title="Eén platform, alle departementen" actionLabel="Alle departementen" />
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 24}}>
            {cats.map(([label, count, icon]) => (
              <CategoryTile key={label} label={label} count={count} selected={dept === label}
                icon={<Icon name={icon} size={14} />} onClick={() => setDept(label)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '72px var(--layout-gutter) 0'}}>
        <div style={{background: 'var(--brand-teal-800)', borderRadius: 'var(--radius-page)', padding: '56px 48px', textAlign: 'center'}}>
          <h2 style={{margin: 0, fontFamily: 'var(--font-family-heading)', fontSize: 32, fontWeight: 700, color: 'var(--color-on-dark)', letterSpacing: '-0.015em'}}>
            Geen passende vacature gevonden?
          </h2>
          <p style={{margin: '14px auto 0', maxWidth: 460, fontSize: 14, lineHeight: 1.6, color: 'var(--brand-teal-200)'}}>
            Laat je cv achter. Zodra een manager een vacature aanvraagt in jouw vakgebied, neemt een recruiter contact op.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{display: 'flex', gap: 8, maxWidth: 440, margin: '28px auto 0', background: 'var(--brand-white)', borderRadius: 'var(--radius-full)', padding: 6}}>
            <input className="field" placeholder="je@email.be" style={{border: 0, background: 'transparent', flex: 1}} />
            <button className="pill pill-accent" type="submit">Cv achterlaten</button>
          </form>
        </div>
      </section>
    </main>
  );
}
