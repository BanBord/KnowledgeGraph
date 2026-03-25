import { useEffect, useRef, useCallback } from 'react';
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCollide,
  forceCenter,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';
import { Node, Edge } from '@xyflow/react';

interface D3Node extends SimulationNodeDatum {
  id: string;
  x: number;
  y: number;
  fx?: number | null;
  fy?: number | null;
  collideRadius: number;
}

interface D3Link extends SimulationLinkDatum<D3Node> {
  source: string | D3Node;
  target: string | D3Node;
}

function getCollideRadius(node: Node): number {
  if (node.type === 'topic') {
    const isHub = (node.data as { isHub?: boolean }).isHub;
    return isHub ? 100 : 72;
  }
  if (node.type === 'contact') return 48;
  return 60;
}

interface UseForceLayoutOptions {
  chargeStrength?: number;
  linkDistance?: number;
  alphaDecay?: number;
  // Callback: D3 hat neue Positionen berechnet → Aufrufer aktualisiert seine Nodes
  onTick: (positions: Map<string, { x: number; y: number }>) => void;
}

/**
 * useForceLayout — reines Side-Effect-Modul.
 * Verwaltet D3-Simulation und ruft onTick mit neuen Positionen auf.
 * Der Aufrufer entscheidet, wie er Nodes aktualisiert (keine State-Konflikte).
 */
export function useForceLayout(
  nodeKey: string,        // stabiler String — Simulation neu starten wenn sich dieser ändert
  edgeKey: string,
  initialNodes: Node[],  // wird nur beim Start der Simulation gelesen
  inputEdges: Edge[],
  options: UseForceLayoutOptions
) {
  const {
    chargeStrength = -450,
    linkDistance = 200,
    alphaDecay = 0.015,
    onTick,
  } = options;

  const simulationRef = useRef<ReturnType<typeof forceSimulation<D3Node>> | null>(null);
  const d3NodesRef = useRef<Map<string, D3Node>>(new Map());
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  // Simulation neu starten nur wenn sich die Node/Edge-IDs ändern
  useEffect(() => {
    if (initialNodes.length === 0) return;

    // Bestehende Positionen wiederverwenden wenn Node schon bekannt
    const d3Nodes: D3Node[] = initialNodes.map((n) => {
      const existing = d3NodesRef.current.get(n.id);
      return {
        id: n.id,
        x: existing?.x ?? n.position.x,
        y: existing?.y ?? n.position.y,
        fx: existing?.fx ?? null,
        fy: existing?.fy ?? null,
        collideRadius: getCollideRadius(n),
      };
    });

    // Nur topic-topic Edges in die Physik (topic-contact und person-person nur visuell)
    const d3Links: D3Link[] = inputEdges
      .filter((e) => {
        const kind = (e.data as { edgeKind?: string } | undefined)?.edgeKind;
        return kind === 'topic-topic';
      })
      .map((e) => ({ source: e.source, target: e.target }));

    d3NodesRef.current = new Map(d3Nodes.map((n) => [n.id, n]));

    simulationRef.current?.stop();

    const sim = forceSimulation<D3Node>(d3Nodes)
      .force('charge', forceManyBody<D3Node>().strength(chargeStrength))
      .force(
        'link',
        forceLink<D3Node, D3Link>(d3Links)
          .id((d) => d.id)
          .distance(linkDistance)
          .strength(0.6)
      )
      .force('collide', forceCollide<D3Node>().radius((d) => d.collideRadius).strength(0.85).iterations(3))
      .force('center', forceCenter(0, 0).strength(0.08))
      .force('x', forceX(0).strength(0.04))
      .force('y', forceY(0).strength(0.04))
      .alphaDecay(alphaDecay);

    sim.on('tick', () => {
      const positions = new Map<string, { x: number; y: number }>();
      d3NodesRef.current.forEach((n, id) => {
        positions.set(id, { x: n.x, y: n.y });
      });
      onTickRef.current(positions);
    });

    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeKey, edgeKey, chargeStrength, linkDistance, alphaDecay]);

  const onNodeDragStart = useCallback((_: React.MouseEvent, node: Node) => {
    const d3Node = d3NodesRef.current.get(node.id);
    if (d3Node) {
      d3Node.fx = node.position.x;
      d3Node.fy = node.position.y;
    }
    simulationRef.current?.alphaTarget(0.3).restart();
  }, []);

  const onNodeDrag = useCallback((_: React.MouseEvent, node: Node) => {
    const d3Node = d3NodesRef.current.get(node.id);
    if (d3Node) {
      d3Node.fx = node.position.x;
      d3Node.fy = node.position.y;
    }
  }, []);

  const onNodeDragStop = useCallback((_: React.MouseEvent, node: Node) => {
    const d3Node = d3NodesRef.current.get(node.id);
    if (d3Node) {
      d3Node.fx = null;
      d3Node.fy = null;
    }
    simulationRef.current?.alphaTarget(0);
  }, []);

  return { onNodeDragStart, onNodeDrag, onNodeDragStop };
}
