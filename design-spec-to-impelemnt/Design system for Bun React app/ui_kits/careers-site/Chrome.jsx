const {useEffect} = React;

function Icon({name, size = 16, color = 'currentColor'}) {
  const ref = React.useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({attrs: {width: size, height: size, stroke: color}, nameAttr: 'data-lucide'});
    }
  }, [name, size, color]);
  return <span ref={ref} style={{display: 'inline-flex', width: size, height: size, flex: '0 0 auto'}} />;
}

function SiteHeader({route, go}) {
  const {BrandWordmark} = NS;
  const links = [['home', 'Home'], ['vacatures', 'Vacatures'], ['status', 'Mijn sollicitatie']];
  return (
    <header style={{position: 'sticky', top: 0, zIndex: 5, background: '#FFFFFFF2', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--color-border)'}}>
      <div style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '16px var(--layout-gutter)', display: 'flex', alignItems: 'center', gap: 32}}>
        <a href="#" onClick={(e) => {e.preventDefault(); go('home');}}><BrandWordmark size="md" /></a>
        <nav style={{display: 'flex', gap: 24, marginLeft: 16, flex: 1}}>
          {links.map(([id, label]) => (
            <a key={id} href="#" onClick={(e) => {e.preventDefault(); go(id);}}
              style={{fontSize: 14, whiteSpace: 'nowrap', fontWeight: route === id ? 600 : 400, color: route === id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'}}>
              {label}
            </a>
          ))}
        </nav>
        <button className="pill pill-accent" onClick={() => go('vacatures')}>Bekijk vacatures</button>
      </div>
    </header>
  );
}

function SiteFooter() {
  const {BrandWordmark} = NS;
  const cols = [
    ['Vacatures', ['Alle vacatures', 'Per departement', 'Spontane sollicitatie']],
    ['Sollicitanten', ['Mijn sollicitatie', 'Veelgestelde vragen', 'Privacy']],
    ['Organisatie', ['Over ons', 'Recruitmentteam', 'Contact']],
  ];
  return (
    <footer style={{marginTop: 72, borderTop: '1px solid var(--color-border)'}}>
      <div style={{maxWidth: 'var(--layout-page-max)', margin: '0 auto', padding: '40px var(--layout-gutter)', display: 'flex', gap: 64, flexWrap: 'wrap'}}>
        <div style={{minWidth: 220}}>
          <BrandWordmark size="md" />
          <p style={{marginTop: 12, fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 240, lineHeight: 1.6}}>
            Interne vacatures en sollicitaties, van aanvraag tot beslissing.
          </p>
        </div>
        {cols.map(([title, items]) => (
          <div key={title} style={{display: 'grid', gap: 10, alignContent: 'start'}}>
            <span style={{fontSize: 13, fontWeight: 600}}>{title}</span>
            {items.map(i => <a key={i} href="#" style={{fontSize: 13, color: 'var(--color-text-secondary)'}}>{i}</a>)}
          </div>
        ))}
      </div>
    </footer>
  );
}
