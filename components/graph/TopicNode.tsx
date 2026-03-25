'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@/lib/cn';
import { TopicNodeData } from '@/types';

export const TopicNode = memo(function TopicNode({ data, selected }: NodeProps) {
  const { label, contactCount, isActive, isHub } = data as unknown as TopicNodeData;

  return (
    <>
      {/* Unsichtbare Handles — React Flow braucht sie für Edges */}
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />

      <div
        className={cn(
          'rounded-2xl border transition-all duration-300 cursor-grab active:cursor-grabbing',
          'select-none text-center relative overflow-hidden',
          // Größe: Hub deutlich größer
          isHub
            ? 'px-6 py-4 min-w-[160px]'
            : 'px-4 py-3 min-w-[120px]',
          // Aktiver Zustand — stärkerer Glow, heller Hintergrund
          isActive || selected
            ? [
                'border-accent bg-[#1a1630]',
                'shadow-[0_0_20px_rgba(124,106,247,0.45),0_0_40px_rgba(124,106,247,0.15)]',
              ]
            : isHub
              ? 'border-border/70 bg-gradient-to-b from-[#1e1e1e] to-[#191919] hover:border-accent/40 hover:shadow-[0_0_12px_rgba(124,106,247,0.12)]'
              : 'border-border/50 bg-[#1a1a1a] hover:border-border hover:bg-[#1e1e1e]',
        )}
      >
        {/* Hub-Node: subtiler Gradient-Overlay */}
        {isHub && (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none rounded-2xl" />
        )}

        {/* Label */}
        <div
          className={cn(
            'font-medium leading-tight tracking-tight relative z-10',
            isHub ? 'text-[15px]' : 'text-[12px]',
            isActive || selected
              ? 'text-text'
              : isHub
                ? 'text-text/90'
                : 'text-textMuted'
          )}
        >
          {label}
        </div>

        {/* Kontakt-Count als kleine Dots oder Zahl */}
        {contactCount > 0 && (
          <div className="mt-1.5 flex items-center justify-center gap-1 relative z-10">
            {contactCount <= 6 ? (
              // Kleine Dots für wenige Kontakte
              <div className="flex gap-0.5 items-center">
                {Array.from({ length: Math.min(contactCount, 6) }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'w-1 h-1 rounded-full',
                      isActive || selected ? 'bg-accent' : 'bg-textDim'
                    )}
                  />
                ))}
              </div>
            ) : (
              // Bei vielen Kontakten: Zahl
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-medium tabular-nums',
                  isActive || selected
                    ? 'bg-accent/20 text-accent'
                    : 'bg-surface2 text-textDim'
                )}
              >
                {contactCount}
              </span>
            )}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Top} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Left} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
    </>
  );
});
