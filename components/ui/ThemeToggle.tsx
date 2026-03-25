'use client';

import { useTheme } from '@/lib/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Zu Dunkelmodus wechseln' : 'Zu Hellmodus wechseln'}
      aria-pressed={isLight}
      className="
        flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
        border transition-colors duration-150
        text-textDim border-border hover:text-text hover:border-border/80
        dark:text-textDim dark:border-border dark:hover:text-text
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
        not-dark:text-[#8a8278] not-dark:border-[#c8c1b8] not-dark:hover:text-[#1a1814]
        select-none
      "
    >
      {isLight ? (
        /* Moon */
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        /* Sun */
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
      <span>{isLight ? 'Dunkel' : 'Hell'}</span>
    </button>
  );
}
