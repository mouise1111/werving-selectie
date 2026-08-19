import React from 'react';

const SIZES = {sm: 16, md: 20, lg: 26};

/**
 * Type-only wordmark. No logo file was supplied with the reference material,
 * so the brand name is set in Poppins with a lime block as the only mark.
 */
export function BrandWordmark({
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
