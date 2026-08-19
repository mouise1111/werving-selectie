import React from 'react';

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
export function VacancyCard({
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
