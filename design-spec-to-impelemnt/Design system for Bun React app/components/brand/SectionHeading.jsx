import React from 'react';

/** Section title with an optional quiet text action on the right. */
export function SectionHeading({title, actionLabel, onAction, size = 'section'}) {
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
