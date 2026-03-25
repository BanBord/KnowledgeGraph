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
  const edgeKind = edgeData?.edgeKind ?? 'topic-topic';
  const w = edgeData?.weight ?? 1;

  // --- Person-zu-Person Kante: gestrichelt, gold ---
  if (edgeKind === 'person-person') {
    return (
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="#f9e44f"
        strokeWidth={1}
        strokeDasharray="5 4"
        opacity={0.45}
      />
    );
  }

  // --- Topic-zu-Kontakt Kante: dünn, dezent ---
  if (edgeKind === 'topic-contact') {
    return (
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="#444444"
        strokeWidth={0.8}
        opacity={0.5}
      />
    );
  }

  // --- Topic-zu-Topic Kante (default) ---
  // Dicke nach Gewicht (convHistory.length), Glow wenn aktiv
  const strokeWidth = isActive
    ? Math.min(1.5 + w * 0.8, 5)
    : Math.min(0.8 + w * 0.7, 3.5);

  const opacity = isActive ? 1 : Math.min(0.35 + w * 0.2, 0.75);

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
          ? { filter: `drop-shadow(0 0 ${3 + w}px rgba(124,106,247,0.6))` }
          : undefined
      }
    />
  );
}
