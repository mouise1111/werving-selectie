import React from 'react';

/** Department / vakgebied tile with a job count and chevron. */
export function CategoryTile({label, count, icon, selected = false, onClick}) {
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
