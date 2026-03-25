'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

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
          onBlur={() => setFocused(false)}
          placeholder={compact ? 'Thema suchen…' : 'Thema eingeben…'}
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
    </div>
  );
}
