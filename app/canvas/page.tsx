'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactFlowProvider } from '@xyflow/react';

import { SearchCommand } from '@/components/search/SearchCommand';
import { NetworkGraph } from '@/components/graph/NetworkGraph';
import { ContactPanel } from '@/components/panel/ContactPanel';
import { EmptyState } from '@/components/ui/EmptyState';
import { findScenarioByQuery, getTopicById } from '@/lib/mock-data';
import { TopicNode } from '@/types';

// Trennung nötig, da useSearchParams einen Suspense-Boundary braucht
function CanvasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  // Szenario aus Query ableiten
  const scenario = findScenarioByQuery(query);
  const topicIds = scenario?.topicIds ?? [];

  // Beim Laden: highlightedTopic als Standard-Aktiv setzen
  useEffect(() => {
    if (scenario?.highlightedTopicId) {
      setActiveTopicId(scenario.highlightedTopicId);
    }
    setActiveContactId(null);
  }, [query, scenario?.highlightedTopicId]);

  const activeTopic: TopicNode | null = activeTopicId ? (getTopicById(activeTopicId) ?? null) : null;

  const handleTopicClick = useCallback((topicId: string) => {
    setActiveTopicId((prev) => (prev === topicId ? null : topicId));
    setActiveContactId(null);
  }, []);

  const handleContactClick = useCallback((contactId: string) => {
    setActiveContactId((prev) => (prev === contactId ? null : contactId));
  }, []);

  const handlePanelClose = useCallback(() => {
    setActiveTopicId(null);
    setActiveContactId(null);
  }, []);

  const handlePanelBack = useCallback(() => {
    setActiveContactId(null);
  }, []);

  const handleSearch = useCallback(
    (newQuery: string) => {
      router.push(`/canvas?q=${encodeURIComponent(newQuery)}`);
    },
    [router]
  );

  const isPanelOpen = activeTopic !== null;

  return (
    <div className="flex flex-col h-screen bg-canvas overflow-hidden">
      {/* Header-Leiste */}
      <header className="flex items-center gap-4 px-4 py-2.5 border-b border-border bg-surface/80 backdrop-blur-sm flex-shrink-0 z-10">
        {/* Logo — zurück zur Startseite */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 flex-shrink-0 group"
          aria-label="Zur Startseite"
        >
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden>
            <circle cx="14" cy="8" r="3" fill="#7c6af7" />
            <circle cx="6" cy="21" r="3" fill="#4f9cf9" />
            <circle cx="22" cy="21" r="3" fill="#4f9cf9" />
            <line x1="14" y1="11" x2="6" y2="18" stroke="#555555" strokeWidth="1.2" />
            <line x1="14" y1="11" x2="22" y2="18" stroke="#555555" strokeWidth="1.2" />
            <line x1="6" y1="21" x2="22" y2="21" stroke="#555555" strokeWidth="1.2" />
          </svg>
          <span className="text-sm font-semibold text-textMuted group-hover:text-text transition-colors hidden sm:block">
            Redaktions<span className="text-accent">Netz</span>
          </span>
        </button>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        {/* Kompaktes Suchfeld */}
        <div className="flex-1 max-w-sm">
          <SearchCommand
            onSearch={handleSearch}
            initialValue={query}
            compact
          />
        </div>

        {/* Breadcrumb / aktives Thema */}
        {activeTopic && (
          <div className="flex items-center gap-1.5 text-xs text-textMuted flex-shrink-0">
            <span className="text-textDim">›</span>
            <span className="text-accent font-medium">{activeTopic.label}</span>
          </div>
        )}
      </header>

      {/* Haupt-Canvas-Bereich */}
      <div className="relative flex-1 overflow-hidden">
        {topicIds.length === 0 ? (
          <EmptyState />
        ) : (
          <ReactFlowProvider>
            <NetworkGraph
              topicIds={topicIds}
              activeTopicId={activeTopicId}
              activeContactId={activeContactId}
              onTopicClick={handleTopicClick}
              onContactClick={handleContactClick}
            />
          </ReactFlowProvider>
        )}

        {/* Slide-in Contact Panel */}
        <ContactPanel
          activeTopic={activeTopic}
          activeContactId={activeContactId}
          onContactClick={handleContactClick}
          onClose={handlePanelClose}
          onBack={handlePanelBack}
        />

        {/* Kein Szenario gefunden — Hinweis */}
        {query && topicIds.length === 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface border border-border rounded-xl px-5 py-3 text-sm text-textMuted shadow-xl">
            Kein Szenario für <span className="text-text font-medium">„{query}"</span> gefunden.
            Versuche: Vitamin Mangel, Lokalpolitik
          </div>
        )}
      </div>
    </div>
  );
}

export default function CanvasPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-canvas text-textDim text-sm">
          Lade Graph…
        </div>
      }
    >
      <CanvasContent />
    </Suspense>
  );
}
