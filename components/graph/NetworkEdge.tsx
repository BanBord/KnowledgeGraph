'use client';

import { EdgeProps, getBezierPath } from '@xyflow/react';

interface NetworkEdgeData {
  active?: boolean;
}

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
  const isActive = (data as NetworkEdgeData | undefined)?.active;

  return (
    <path
      id={id}
      d={edgePath}
      fill="none"
      stroke={isActive ? '#7c6af7' : '#444444'}
      strokeWidth={isActive ? 1.5 : 1}
      style={
        isActive
          ? { filter: 'drop-shadow(0 0 4px rgba(124,106,247,0.5))' }
          : undefined
      }
    />
  );
}
