function VacancyListPage({go, openVacancy}) {
  const {VacancyCard, JobSearchBar, SectionHeading} = NS;
  const all = [
    ['Senior UI Designer', 'Design', 'Gent, BE', 'Voltijds', '€4.200'],
    ['Recruiter', 'HR', 'Antwerpen, BE', 'Voltijds', '€3.600'],
    ['Data Verification', 'Operations', 'Remote, BE', 'Deeltijds', '€3.100'],
    ['Frontend Engineer', 'Engineering', 'Gent, BE', 'Voltijds', '€4.500'],
    ['Payroll Officer', 'Finance', 'Brussel, BE', 'Voltijds', '€3.400'],
    ['Support Analyst', 'Support', 'Remote, BE', 'Voltijds', '€2.950'],
  ];
  return (
    <main style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '40px var(--layout-gutter) 0'}}>
      <SectionHeading title="Alle vacatures" actionLabel="6 van 173" />
      <div style={{marginTop: 20, maxWidth: 620}}><JobSearchBar /></div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--layout-card-gap)', marginTop: 28}}>
        {all.map(([title, department, location, contract, salary]) => (
          <VacancyCard key={title} title={title} department={department} verified location={location}
            contract={contract} salary={salary} tint="none"
            summary="Bekijk de volledige functieomschrijving en het selectieproces." onApply={() => openVacancy(title)} />
        ))}
      </div>
    </main>
  );
}
