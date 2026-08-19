const NS = Object.values(window).find(v => v && typeof v === 'object' && v.VacancyCard && v.StatusBadge) || window;

function CareersApp() {
  const [route, setRoute] = React.useState('home');
  const [vacancy, setVacancy] = React.useState('Senior UI Designer');
  const openVacancy = (title) => { setVacancy(title); setRoute('vacature'); };
  const go = (r) => setRoute(r);
  return (
    <React.Fragment>
      <SiteHeader route={route} go={go} />
      {route === 'home' ? <Landing go={go} openVacancy={openVacancy} /> : null}
      {route === 'vacatures' ? <VacancyListPage go={go} openVacancy={openVacancy} /> : null}
      {route === 'vacature' ? <VacancyDetail title={vacancy} go={go} /> : null}
      {route === 'solliciteren' ? <ApplyForm title={vacancy} go={go} /> : null}
      {route === 'status' ? <StatusPage go={go} /> : null}
      <SiteFooter />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CareersApp />);
