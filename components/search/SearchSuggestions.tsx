'use client';

import { SEARCH_SUGGESTIONS } from '@/lib/mock-data';

interface SearchSuggestionsProps {
  onSelect: (query: string) => void;
}

export function SearchSuggestions({ onSelect }: SearchSuggestionsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <span className="text-xs text-textDim mr-1">Oder direkt öffnen:</span>
      {SEARCH_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 rounded-full text-xs font-medium
            bg-surface border border-border text-textMuted
            hover:border-accent/50 hover:text-accent hover:bg-tagDefault
            transition-all duration-150"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
