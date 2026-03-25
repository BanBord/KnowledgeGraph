'use client';

import { useCallback, useMemo, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  useViewport,
  Node,
  Edge,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TopicNode as TopicNodeComponent } from './TopicNode';
import { ContactNode as ContactNodeComponent } from './ContactNode';
import { NetworkEdge } from './NetworkEdge';
import { topicNodes, getContactById, persons } from '@/lib/mock-data';
import { TopicNode, TopicNodeData, ContactNodeData, NetworkEdgeData } from '@/types';
import { useForceLayout } from '@/lib/force-layout';

const CONTACT_VISIBLE_ZOOM = 1.1;

// nodeTypes/edgeTypes müssen außerhalb der Komponente definiert sein (React Flow Anforderung)
const nodeTypes = {
  topic: TopicNodeComponent,
  contact: ContactNodeComponent,
};

const edgeTypes = {
  network: NetworkEdge,
};

interface NetworkGraphProps {
  topicIds: string[];
  activeTopicId: string | null;
  activeContactId: string | null;
  onTopicClick: (topicId: string) => void;
  onContactClick: (contactId: string) => void;
}

// Stabile Startpositionen pro Topic-ID (einmalig berechnet, kein Math.random in Render)
const JITTER_CACHE = new Map<string, { x: number; y: number }>();
function getStableStartPos(id: string): { x: number; y: number } {
  if (!JITTER_CACHE.has(id)) {
    JITTER_CACHE.set(id, {
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 40,
    });
  }
  return JITTER_CACHE.get(id)!;
}

function buildTopicNodes(topics: TopicNode[], activeTopicId: string | null): Node[] {
  return topics.map((topic) => ({
    id: `topic-${topic.id}`,
    type: 'topic',
    position: getStableStartPos(`topic-${topic.id}`),
    data: {
      label: topic.label,
      topicId: topic.id,
      contactCount: topic.contactIds.length,
      isActive: topic.id === activeTopicId,
      isHub: !topic.parentId,
    } satisfies TopicNodeData,
  }));
}

function buildContactNodes(
  topic: TopicNode,
  activeContactId: string | null,
  visible: boolean,
): Node[] {
  const radius = 160 + topic.contactIds.length * 14;
  return topic.contactIds
    .map((cid, index): Node | null => {
      const contact = getContactById(cid);
      if (!contact) return null;
      const angle = (index / topic.contactIds.length) * 2 * Math.PI - Math.PI / 2;
      return {
        id: `contact-${cid}`,
        type: 'contact',
        position: getStableStartPos(`contact-${cid}`) ?? {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        },
        hidden: !visible,
        data: {
          contact,
          isActive: cid === activeContactId,
          familiarityLevel: contact.knownBy.length,
        } satisfies ContactNodeData,
      };
    })
    .filter((n): n is Node => n !== null);
}

function buildTopicEdges(topicIds: string[], activeTopicId: string | null): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();
  topicIds.forEach((id) => {
    const topic = topicNodes.find((t) => t.id === id);
    if (!topic) return;
    topic.relatedTopics.forEach((relId) => {
      if (!topicIds.includes(relId)) return;
      const key = [id, relId].sort().join('-');
      if (seen.has(key)) return;
      seen.add(key);
      const isActive = id === activeTopicId || relId === activeTopicId;
      edges.push({
        id: `edge-tt-${key}`,
        source: `topic-${id}`,
        target: `topic-${relId}`,
        type: 'network',
        data: { active: isActive, weight: 1, edgeKind: 'topic-topic' } satisfies NetworkEdgeData,
      });
    });
  });
  return edges;
}

function buildContactEdges(topic: TopicNode): Edge[] {
  return topic.contactIds
    .filter((cid) => !!getContactById(cid))
    .map((cid) => {
      const contact = getContactById(cid)!;
      return {
        id: `edge-tc-${topic.id}-${cid}`,
        source: `topic-${topic.id}`,
        target: `contact-${cid}`,
        type: 'network',
        data: {
          active: false,
          weight: contact.convHistory.length,
          edgeKind: 'topic-contact',
        } satisfies NetworkEdgeData,
      };
    });
}

function buildPersonEdges(personIds: string[]): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();
  persons.forEach((person) => {
    if (!personIds.includes(person.id)) return;
    person.relatedPersonIds.forEach((relId) => {
      if (!personIds.includes(relId)) return;
      const key = [person.id, relId].sort().join('-');
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({
        id: `edge-pp-${key}`,
        source: `contact-${person.id}`,
        target: `contact-${relId}`,
        type: 'network',
        data: { active: false, weight: 1, edgeKind: 'person-person' } satisfies NetworkEdgeData,
      });
    });
  });
  return edges;
}

function GraphInner({
  topicIds,
  activeTopicId,
  activeContactId,
  onTopicClick,
  onContactClick,
}: NetworkGraphProps) {
  const { zoom } = useViewport();
  const contactsVisible = zoom >= CONTACT_VISIBLE_ZOOM;

  const relevantTopics = useMemo(
    () => topicNodes.filter((t) => topicIds.includes(t.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topicIds.join(',')]
  );

  const activeTopic = useMemo(
    () => relevantTopics.find((t) => t.id === activeTopicId) ?? null,
    [relevantTopics, activeTopicId]
  );

  // Stabile Keys für die Simulation — Neustart nur bei echter Kompositionsänderung
  const topicNodeKey = useMemo(
    () => relevantTopics.map((t) => t.id).join(','),
    [relevantTopics]
  );
  const contactNodeKey = useMemo(
    () => activeTopic ? activeTopic.contactIds.join(',') : '',
    [activeTopic]
  );
  const nodeKey = `${topicNodeKey}|${contactNodeKey}`;

  // Alle Nodes initial aufbauen
  const initialNodes = useMemo((): Node[] => {
    const topicN = buildTopicNodes(relevantTopics, activeTopicId);
    const contactN = activeTopic
      ? buildContactNodes(activeTopic, activeContactId, contactsVisible)
      : [];
    return [...topicN, ...contactN];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeKey]); // Nur wenn Komposition sich ändert (nicht bei isActive-Wechsel)

  // Alle Edges aufbauen
  const allEdges = useMemo((): Edge[] => {
    const topicEdges = buildTopicEdges(topicIds, activeTopicId);
    if (!activeTopic || !contactsVisible) return topicEdges;
    const contactEdges = buildContactEdges(activeTopic);
    const personIds = activeTopic.contactIds.filter((id) => id.startsWith('p'));
    const personEdges = buildPersonEdges(personIds);
    return [...topicEdges, ...contactEdges, ...personEdges];
  }, [topicIds, activeTopicId, activeTopic, contactsVisible]);

  const edgeKey = useMemo(() => allEdges.map((e) => e.id).join(','), [allEdges]);

  // React Flow's eigener Node/Edge State
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(allEdges);

  // Nodes neu initialisieren wenn sich Komposition (nodeKey) ändert
  useEffect(() => {
    setNodes(initialNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeKey]);

  // Edges synchronisieren wenn sie sich ändern
  useEffect(() => {
    setEdges(allEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeKey]);

  // isActive-Zustand aktualisieren ohne Simulation neu zu starten
  const prevActiveTopicRef = useRef(activeTopicId);
  const prevActiveContactRef = useRef(activeContactId);
  useEffect(() => {
    if (prevActiveTopicRef.current === activeTopicId && prevActiveContactRef.current === activeContactId) return;
    prevActiveTopicRef.current = activeTopicId;
    prevActiveContactRef.current = activeContactId;
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id.startsWith('topic-')) {
          const tid = n.id.replace('topic-', '');
          return { ...n, data: { ...n.data, isActive: tid === activeTopicId } };
        }
        if (n.id.startsWith('contact-')) {
          const cid = n.id.replace('contact-', '');
          return { ...n, data: { ...n.data, isActive: cid === activeContactId } };
        }
        return n;
      })
    );
  }, [activeTopicId, activeContactId, setNodes]);

  // hidden-Flag für Kontakt-Nodes bei Zoom-Wechsel aktualisieren
  const prevContactsVisibleRef = useRef(contactsVisible);
  useEffect(() => {
    if (prevContactsVisibleRef.current === contactsVisible) return;
    prevContactsVisibleRef.current = contactsVisible;
    setNodes((prev) =>
      prev.map((n) =>
        n.id.startsWith('contact-') ? { ...n, hidden: !contactsVisible } : n
      )
    );
  }, [contactsVisible, setNodes]);

  // D3-Force: onTick schreibt Positionen direkt in React Flow State
  const onTick = useCallback(
    (positions: Map<string, { x: number; y: number }>) => {
      setNodes((prev) =>
        prev.map((n) => {
          const pos = positions.get(n.id);
          if (!pos) return n;
          return { ...n, position: pos };
        })
      );
    },
    [setNodes]
  );

  const { onNodeDragStart, onNodeDrag, onNodeDragStop } = useForceLayout(
    nodeKey,
    edgeKey,
    initialNodes,
    allEdges,
    { chargeStrength: -450, linkDistance: 200, alphaDecay: 0.015, onTick }
  );

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.id.startsWith('topic-')) {
        onTopicClick(node.id.replace('topic-', ''));
      } else if (node.id.startsWith('contact-')) {
        onContactClick(node.id.replace('contact-', ''));
      }
    },
    [onTopicClick, onContactClick]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      minZoom={0.15}
      maxZoom={2.5}
      fitView
      fitViewOptions={{ padding: 0.35 }}
      nodesDraggable={true}
      nodesConnectable={false}
      elementsSelectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        color="#333333"
        gap={24}
        size={1}
      />
      <Controls
        className="!bg-surface !border-border [&_button]:!bg-surface [&_button]:!border-border [&_button]:!text-textMuted"
        showInteractive={false}
      />
    </ReactFlow>
  );
}

export function NetworkGraph(props: NetworkGraphProps) {
  return (
    <div className="w-full h-full bg-canvas">
      <GraphInner {...props} />
    </div>
  );
}
