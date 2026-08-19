import React from 'react';

/** Pill search field: keyword + location, divided, with a lime submit. */
export function JobSearchBar({
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
