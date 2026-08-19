/* Generated preview bundle — concatenation of the sources in components/, with
   import/export statements stripped so Babel standalone can run them in a browser.
   Load as <script type="text/babel" src="_ds_bundle.jsx">. Regenerate, don't edit. */

/* ---- components/applications/statuses.js ---- */
/**
 * The sollicitatiestatus vocabulary from the use cases (UC2–UC7).
 * Keys are stable; labels are the Dutch strings shown in the UI.
 */
const APPLICATION_STATUSES = {
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

/* ---- components/brand/BrandWordmark.jsx ---- */
const SIZES = {sm: 16, md: 20, lg: 26};

/**
 * Type-only wordmark. No logo file was supplied with the reference material,
 * so the brand name is set in Poppins with a lime block as the only mark.
 */
function BrandWordmark({
  name = 'Werving & Selectie',
  size = 'md',
  tone = 'ink',
  showMark = true,
}) {
  const fontSize = SIZES[size] || SIZES.md;
  const ink = tone === 'onDark' ? 'var(--color-on-dark)' : 'var(--color-text-primary)';
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)'}}>
      {showMark ? (
        <span
          aria-hidden="true"
          style={{
            width: fontSize,
            height: fontSize,
            borderRadius: 'var(--radius-inner)',
            background: 'var(--brand-lime-500)',
            flex: '0 0 auto',
          }}
        />
      ) : null}
      <span
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontWeight: 700,
          fontSize,
          letterSpacing: '-0.01em',
          color: ink,
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    </span>
  );
}

/* ---- components/brand/SectionHeading.jsx ---- */
/** Section title with an optional quiet text action on the right. */
function SectionHeading({title, actionLabel, onAction, size = 'section'}) {
  const isHero = size === 'hero';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        width: '100%',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-heading)',
          fontWeight: 700,
          letterSpacing: isHero ? 'var(--text-hero-tracking)' : 'var(--text-section-tracking)',
          fontSize: isHero ? 'var(--text-hero-size)' : 'var(--text-section-size)',
          lineHeight: isHero ? 'var(--text-hero-leading)' : 'var(--text-section-leading)',
          color: 'var(--color-text-primary)',
          textWrap: 'pretty',
        }}
      >
        {title}
      </h2>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          style={{
            border: 0,
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text-secondary)',
            whiteSpace: 'nowrap',
            transition: 'var(--transition-interactive)',
          }}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

/* ---- components/vacancies/VacancyCard.jsx ---- */
const TINTS = {
  1: 'var(--surface-tint-1)',
  2: 'var(--surface-tint-2)',
  3: 'var(--surface-tint-3)',
  none: 'var(--color-background-card)',
};

function Meta({icon, children}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-1-5)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-secondary)',
      }}
    >
      {icon}
      {children}
    </span>
  );
}

/** Public-site vacancy card: title, department, teaser, meta row, salary, apply pill. */
function VacancyCard({
  title,
  department,
  verified = false,
  summary,
  location,
  contract,
  salary,
  salaryPeriod = 'Maandelijks',
  tint = 'none',
  logo,
  actionLabel = 'Solliciteer',
  onApply,
  emphasizeAction = false,
}) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-4)',
        padding: 'var(--layout-card-padding)',
        background: TINTS[tint] || TINTS.none,
        border: 'var(--border-width) solid var(--color-border)',
        borderRadius: 'var(--radius-element)',
        transition: 'var(--transition-interactive)',
      }}
    >
      <header style={{display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'space-between'}}>
        <div style={{display: 'grid', gap: 'var(--spacing-1)'}}>
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </h3>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {department}
            {verified ? <span aria-label="Geverifieerd" style={{color: 'var(--color-status-ontvangen-fg)'}}>&#10003;</span> : null}
          </span>
        </div>
        {logo ? <div style={{flex: '0 0 auto'}}>{logo}</div> : null}
      </header>

      {summary ? (
        <p
          style={{
            margin: 0,
            fontSize: 'var(--font-size-base)',
            lineHeight: 'var(--text-body-leading)',
            color: 'var(--color-text-secondary)',
            textWrap: 'pretty',
          }}
        >
          {summary}
        </p>
      ) : null}

      <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)'}}>
        {location ? <Meta>&#9678; {location}</Meta> : null}
        {contract ? <Meta>&#9707; {contract}</Meta> : null}
      </div>

      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-4)',
          paddingTop: 'var(--spacing-2)',
        }}
      >
        <div style={{display: 'grid'}}>
          <span
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {salary}
          </span>
          <span style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)'}}>
            {salaryPeriod}
          </span>
        </div>
        <button
          type="button"
          onClick={onApply}
          style={{
            height: 'var(--size-element-xl)',
            padding: '0 var(--spacing-6)',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-medium)',
            transition: 'var(--transition-interactive)',
            border: emphasizeAction ? 0 : 'var(--border-width) solid var(--color-border-emphasized)',
            background: emphasizeAction ? 'var(--color-background-inverted)' : 'transparent',
            color: emphasizeAction ? 'var(--color-on-dark)' : 'var(--color-text-primary)',
          }}
        >
          {actionLabel}
        </button>
      </footer>
    </article>
  );
}

/* ---- components/vacancies/JobSearchBar.jsx ---- */
/** Pill search field: keyword + location, divided, with a lime submit. */
function JobSearchBar({
  keyword = '',
  location = '',
  keywordPlaceholder = 'Functietitel of trefwoord',
  locationPlaceholder = 'Locatie',
  onKeywordChange,
  onLocationChange,
  onSubmit,
  submitLabel = 'Zoeken',
}) {
  const field = {
    border: 0,
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-family-body)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-primary)',
    minWidth: 0,
    flex: 1,
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit({keyword, location});
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        height: 'var(--size-search-bar)',
        padding: '0 var(--spacing-2) 0 var(--spacing-5)',
        background: 'var(--color-background-surface)',
        border: 'var(--border-width) solid var(--color-border)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-low)',
        width: '100%',
      }}
    >
      <input
        aria-label={keywordPlaceholder}
        value={keyword}
        placeholder={keywordPlaceholder}
        onChange={(e) => onKeywordChange && onKeywordChange(e.target.value)}
        style={field}
      />
      <span aria-hidden="true" style={{width: 1, height: 24, background: 'var(--color-border)'}} />
      <input
        aria-label={locationPlaceholder}
        value={location}
        placeholder={locationPlaceholder}
        onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
        style={field}
      />
      <button
        type="submit"
        style={{
          height: 'var(--size-element-xl)',
          padding: '0 var(--spacing-6)',
          border: 0,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-accent)',
          color: 'var(--color-on-accent)',
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--font-size-base)',
          fontWeight: 'var(--font-weight-semibold)',
          cursor: 'pointer',
          transition: 'var(--transition-interactive)',
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}

/* ---- components/vacancies/CategoryTile.jsx ---- */
/** Department / vakgebied tile with a job count and chevron. */
function CategoryTile({label, count, icon, selected = false, onClick}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-3)',
        width: '100%',
        padding: 'var(--spacing-3) var(--spacing-4)',
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: 'var(--radius-full)',
        transition: 'var(--transition-interactive)',
        border: selected ? 0 : 'var(--border-width) solid var(--color-border)',
        background: selected ? 'var(--color-background-inverted)' : 'var(--color-background-surface)',
        color: selected ? 'var(--color-on-dark)' : 'var(--color-text-primary)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 28,
          height: 28,
          flex: '0 0 auto',
          borderRadius: 'var(--radius-full)',
          background: selected ? 'var(--color-accent)' : 'var(--color-background-muted)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        {icon}
      </span>
      <span style={{display: 'grid', gap: 2, flex: 1, minWidth: 0}}>
        <span style={{fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)'}}>{label}</span>
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            color: selected ? 'var(--brand-teal-200)' : 'var(--color-text-secondary)',
          }}
        >
          {count} vacatures
        </span>
      </span>
      <span aria-hidden="true" style={{opacity: 0.6}}>&#8250;</span>
    </button>
  );
}

/* ---- components/applications/StatusBadge.jsx ---- */
/** Pill badge for one sollicitatiestatus. Status is state — never a count. */
function StatusBadge({status, label, size = 'md'}) {
  const token = APPLICATION_STATUSES[status] || APPLICATION_STATUSES.ontvangen;
  const small = size === 'sm';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-1-5)',
        height: small ? 22 : 26,
        padding: small ? '0 var(--spacing-2)' : '0 var(--spacing-3)',
        borderRadius: 'var(--radius-full)',
        background: token.bg,
        color: token.fg,
        fontFamily: 'var(--font-family-body)',
        fontSize: small ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        aria-hidden="true"
        style={{width: 6, height: 6, borderRadius: 'var(--radius-full)', background: 'currentColor'}}
      />
      {label || token.label}
    </span>
  );
}

/* ---- components/applications/ApplicationRow.jsx ---- */
/** One sollicitatie in the recruiter's overview. Rows, not cards, for dense data. */
function ApplicationRow({
  candidate,
  role,
  status,
  appliedOn,
  testScore,
  hasMotivation = false,
  selected = false,
  onOpen,
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen && onOpen()}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,2fr) minmax(0,1.6fr) auto 96px 92px',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-3) var(--spacing-4)',
        cursor: 'pointer',
        background: selected ? 'var(--color-background-muted)' : 'var(--color-background-surface)',
        borderBottom: 'var(--border-width) solid var(--color-border)',
        transition: 'var(--transition-interactive)',
      }}
    >
      <div style={{display: 'grid', gap: 2, minWidth: 0}}>
        <span
          style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {candidate}
        </span>
        <span style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)'}}>
          {hasMotivation ? 'CV + motivatiebrief' : 'CV'}
        </span>
      </div>
      <span
        style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-secondary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {role}
      </span>
      <StatusBadge status={status} size="sm" />
      <span style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)'}}>{appliedOn}</span>
      <span
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontSize: 'var(--font-size-base)',
          fontWeight: 600,
          textAlign: 'right',
          color: testScore == null ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
        }}
      >
        {testScore == null ? '—' : testScore + '%'}
      </span>
    </div>
  );
}

/* ---- components/applications/StageTimeline.jsx ---- */
const STATE_STYLE = {
  done: {dot: 'var(--brand-teal-800)', ring: 'var(--brand-teal-800)', text: 'var(--color-text-primary)'},
  current: {dot: 'var(--color-accent)', ring: 'var(--brand-teal-800)', text: 'var(--color-text-primary)'},
  todo: {dot: 'transparent', ring: 'var(--color-border-emphasized)', text: 'var(--color-text-secondary)'},
};

/** Horizontal progress through the selection process (UC2 → UC7). */
function StageTimeline({stages = [], orientation = 'horizontal'}) {
  const horizontal = orientation === 'horizontal';
  return (
    <ol
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        gap: horizontal ? 'var(--spacing-2)' : 'var(--spacing-4)',
        alignItems: horizontal ? 'flex-start' : 'stretch',
      }}
    >
      {stages.map((stage, i) => {
        const s = STATE_STYLE[stage.state] || STATE_STYLE.todo;
        return (
          <li
            key={stage.label}
            style={{
              display: 'flex',
              flexDirection: horizontal ? 'column' : 'row',
              alignItems: horizontal ? 'flex-start' : 'center',
              gap: 'var(--spacing-2)',
              flex: horizontal ? 1 : 'none',
              minWidth: 0,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', width: '100%'}}>
              <span
                aria-hidden="true"
                style={{
                  width: 14,
                  height: 14,
                  flex: '0 0 auto',
                  borderRadius: 'var(--radius-full)',
                  background: s.dot,
                  boxShadow: 'inset 0 0 0 2px ' + s.ring,
                }}
              />
              {horizontal && i < stages.length - 1 ? (
                <span style={{height: 2, flex: 1, background: 'var(--color-border)'}} />
              ) : null}
            </div>
            <div style={{display: 'grid', gap: 2, minWidth: 0}}>
              <span
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: stage.state === 'current' ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  color: s.text,
                }}
              >
                {stage.label}
              </span>
              {stage.meta ? (
                <span style={{fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)'}}>{stage.meta}</span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

window.DS = {APPLICATION_STATUSES, BrandWordmark, SectionHeading, VacancyCard, JobSearchBar, CategoryTile, StatusBadge, ApplicationRow, StageTimeline};
