import React from 'react';

const STATE_STYLE = {
  done: {dot: 'var(--brand-teal-800)', ring: 'var(--brand-teal-800)', text: 'var(--color-text-primary)'},
  current: {dot: 'var(--color-accent)', ring: 'var(--brand-teal-800)', text: 'var(--color-text-primary)'},
  todo: {dot: 'transparent', ring: 'var(--color-border-emphasized)', text: 'var(--color-text-secondary)'},
};

/** Horizontal progress through the selection process (UC2 → UC7). */
export function StageTimeline({stages = [], orientation = 'horizontal'}) {
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
