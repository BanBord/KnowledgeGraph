'use client';

import { EdgeProps, getBezierPath } from '@xyflow/react';
import { NetworkEdgeData } from '@/types';

export function NetworkEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const edgeData = data as NetworkEdgeData | undefined;
  const isActive = edgeData?.active ?? false;

  // Kantendicke nach Gewicht (convHistory.length):
  // 0 Gespräche → 1px, 1 → 1.5px, 2 → 2.5px, 3+ → 4px
  const w = edgeData?.weight ?? 1;
  const strokeWidth = isActive
    ? Math.min(1.5 + w * 0.8, 5)
    : Math.min(0.8 + w * 0.7, 4);

  // Transparenz: weniger Kontakt → blasser
  const opacity = isActive ? 1 : Math.min(0.35 + w * 0.2, 0.85);

  return (
    <path
      id={id}
      d={edgePath}
      fill="none"
      stroke={isActive ? '#7c6af7' : '#555555'}
      strokeWidth={strokeWidth}
      opacity={opacity}
      style={
        isActive
          ? { filter: `drop-shadow(0 0 ${3 + w}px rgba(124,106,247,0.55))` }
          : undefined
      }
    />
  );
}
