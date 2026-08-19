import React from 'react';
import {StatusBadge} from './StatusBadge.jsx';

/** One sollicitatie in the recruiter's overview. Rows, not cards, for dense data. */
export function ApplicationRow({
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
