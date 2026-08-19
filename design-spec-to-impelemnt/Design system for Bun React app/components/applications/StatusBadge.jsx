import React from 'react';
import {APPLICATION_STATUSES} from './statuses.js';

/** Pill badge for one sollicitatiestatus. Status is state — never a count. */
export function StatusBadge({status, label, size = 'md'}) {
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
