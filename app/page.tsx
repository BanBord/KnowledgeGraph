'use client';

import { useRouter } from 'next/navigation';
import { SearchCommand } from '@/components/search/SearchCommand';

export default function HomePage() {
  const router = useRouter();

  function handleSearch(query: string) {
    router.push(`/canvas?q=${encodeURIComponent(query)}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-canvas px-6">
      {/* Dot-Grid-Hintergrund — dekorativ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #333333 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }}
      />

      {/* Inhalt */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8">
        {/* Logo / Wordmark */}
        <div className="flex flex-col items-center gap-2 select-none">
          <div className="flex items-center gap-2.5">
            {/* Einfaches Netzwerk-Icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <circle cx="14" cy="8" r="3" fill="#7c6af7" />
              <circle cx="6" cy="21" r="3" fill="#4f9cf9" />
              <circle cx="22" cy="21" r="3" fill="#4f9cf9" />
              <line x1="14" y1="11" x2="6" y2="18" stroke="#555555" strokeWidth="1.2" />
              <line x1="14" y1="11" x2="22" y2="18" stroke="#555555" strokeWidth="1.2" />
              <line x1="6" y1="21" x2="22" y2="21" stroke="#555555" strokeWidth="1.2" />
            </svg>
            <span className="text-xl font-semibold text-text tracking-tight">
              Redaktions<span className="text-accent">Netz</span>
            </span>
          </div>
        </div>

        {/* Suchfeld */}
        <div className="w-full">
          <SearchCommand onSearch={handleSearch} autoFocus />
        </div>

      </div>
    </main>
  );
}
