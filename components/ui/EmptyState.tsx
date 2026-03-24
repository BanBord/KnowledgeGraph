import { Search } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-textDim select-none">
      <div className="w-16 h-16 rounded-full bg-surface2 flex items-center justify-center">
        <Search size={28} className="text-textDim" />
      </div>
      <div className="text-center">
        <p className="text-textMuted text-sm">Kein Thema ausgewählt</p>
        <p className="text-textDim text-xs mt-1">Suche oben, um den Graphen zu laden</p>
      </div>
    </div>
  );
}
