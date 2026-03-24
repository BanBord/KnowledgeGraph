'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SEARCH_SUGGESTIONS } from '@/lib/mock-data';

interface SearchCommandProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
  compact?: boolean; // Kompakte Variante für den Canvas-Header
}

export function SearchCommand({ onSearch, initialValue = '', autoFocus, compact }: SearchCommandProps) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      onSearch(value.trim());
    }
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setValue(suggestion);
    onSearch(suggestion);
  }

  const showSuggestions = focused && value.length === 0 && !compact;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl border transition-all duration-200',
          'bg-surface border-border',
          focused
            ? 'border-accent/60 ring-2 ring-accent/15 shadow-[0_0_20px_rgba(124,106,247,0.1)]'
            : 'border-border hover:border-border/80',
          compact ? 'px-3 py-2' : 'px-5 py-4'
        )}
      >
        <Search
          size={compact ? 15 : 18}
          className={cn('flex-shrink-0 transition-colors', focused ? 'text-accent' : 'text-textDim')}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={compact ? 'Thema suchen…' : 'Thema eingeben, z.B. Vitamin Mangel…'}
          className={cn(
            'flex-1 bg-transparent outline-none text-text placeholder:text-textDim',
            compact ? 'text-sm' : 'text-xl'
          )}
        />
        {value.trim() && (
          <button
            onMouseDown={() => onSearch(value.trim())}
            className="flex-shrink-0 p-1 rounded-md bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
            aria-label="Suchen"
          >
            <ArrowRight size={compact ? 13 : 15} />
          </button>
        )}
      </div>

      {/* Vorschläge — nur auf Startseite, wenn leer */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl overflow-hidden shadow-xl z-50">
          <div className="px-4 py-2 border-b border-border">
            <span className="text-[11px] text-textDim uppercase tracking-widest font-medium">
              Vorschläge
            </span>
          </div>
          {SEARCH_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onMouseDown={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface2 transition-colors group"
            >
              <Search size={13} className="text-textDim group-hover:text-accent transition-colors" />
              <span className="text-sm text-text">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
