'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { cn } from '@/lib/cn';
import { TopicNodeData } from '@/types';

export const TopicNode = memo(function TopicNode({ data, selected }: NodeProps) {
  const { label, contactCount, isActive, isHub } = data as unknown as TopicNodeData;

  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0 !h-0" />

      <div
        className={cn(
          'rounded-xl border transition-all duration-200 cursor-pointer select-none text-center',
          'bg-nodeDefault',
          // Hub-Nodes: größer, stärker
          isHub ? 'px-5 py-3.5 min-w-[140px]' : 'px-4 py-3 min-w-[110px]',
          // Aktiver Zustand: Lila Glow
          isActive || selected
            ? 'border-accent shadow-[0_0_16px_rgba(124,106,247,0.35)] bg-surface'
            : isHub
              ? 'border-border/80 hover:border-accent/30 hover:bg-surface'
              : 'border-border hover:border-border/80 hover:bg-surface',
        )}
      >
        <div
          className={cn(
            'font-medium leading-tight',
            isHub ? 'text-sm' : 'text-[12px]',
            isActive || selected ? 'text-text' : isHub ? 'text-text/80' : 'text-textMuted'
          )}
        >
          {label}
        </div>
        {contactCount > 0 && (
          <div className="mt-1.5 flex items-center justify-center gap-1">
            <span
              className={cn(
                'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                isActive || selected
                  ? 'bg-accent/20 text-accent'
                  : 'bg-surface2 text-textDim'
              )}
            >
              {contactCount} Kontakt{contactCount !== 1 ? 'e' : ''}
            </span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0 !h-0" />
    </>
  );
});
