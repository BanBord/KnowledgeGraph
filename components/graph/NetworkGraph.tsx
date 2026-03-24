'use client';

import { useCallback, useMemo, useEffect } from 'react';
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
import { topicNodes, contacts, getContactById } from '@/lib/mock-data';
import { TopicNode, Contact, TopicNodeData, ContactNodeData } from '@/types';

// Zoom-Schwellwert: unter diesem Wert sind Kontakt-Nodes unsichtbar
const CONTACT_VISIBLE_ZOOM = 1.1;

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

// Hilfsfunktion: Topic-Nodes → React Flow Nodes bauen
function buildTopicFlowNode(
  topic: TopicNode,
  activeTopicId: string | null,
): Node {
  return {
    id: `topic-${topic.id}`,
    type: 'topic',
    position: topic.position,
    data: {
      label: topic.label,
      topicId: topic.id,
      contactCount: topic.contactIds.length,
      isActive: topic.id === activeTopicId,
    } satisfies TopicNodeData,
  };
}

// Hilfsfunktion: Kontakt-Nodes → React Flow Nodes bauen (unter aktivem Topic)
function buildContactFlowNodes(
  topic: TopicNode,
  activeContactId: string | null,
  visible: boolean,
): Node[] {
  return topic.contactIds
    .map((cid, index) => {
      const contact = getContactById(cid);
      if (!contact) return null;

      // Kontakte radial um den Topic-Node verteilen
      const angle = (index / topic.contactIds.length) * 2 * Math.PI - Math.PI / 2;
      const radius = 130;
      const x = topic.position.x + Math.cos(angle) * radius;
      const y = topic.position.y + Math.sin(angle) * radius + 60;

      return {
        id: `contact-${cid}`,
        type: 'contact',
        position: { x, y },
        hidden: !visible,
        data: {
          contact,
          isActive: cid === activeContactId,
        } satisfies ContactNodeData,
      } satisfies Node;
    })
    .filter((n): n is NonNullable<typeof n> => n !== null) as Node[];
}

// Hilfsfunktion: Edges zwischen Topics bauen
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
        id: `edge-${key}`,
        source: `topic-${id}`,
        target: `topic-${relId}`,
        type: 'network',
        data: { active: isActive },
      });
    });
  });

  return edges;
}

// Hilfsfunktion: Edges von aktivem Topic zu Kontakten
function buildContactEdges(topic: TopicNode, visible: boolean): Edge[] {
  if (!visible) return [];
  return topic.contactIds.map((cid) => ({
    id: `edge-topic-contact-${cid}`,
    source: `topic-${topic.id}`,
    target: `contact-${cid}`,
    type: 'network',
    data: { active: false },
  }));
}

// Inner-Komponente, die useViewport nutzt (muss innerhalb von ReactFlow sein)
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
    [topicIds]
  );

  const activeTopic = useMemo(
    () => relevantTopics.find((t) => t.id === activeTopicId) ?? null,
    [relevantTopics, activeTopicId]
  );

  // Alle Nodes zusammenbauen
  const initialNodes = useMemo((): Node[] => {
    const topicFlowNodes = relevantTopics.map((t) =>
      buildTopicFlowNode(t, activeTopicId)
    );

    const contactFlowNodes = activeTopic
      ? buildContactFlowNodes(activeTopic, activeContactId, contactsVisible)
      : [];

    return [...topicFlowNodes, ...contactFlowNodes];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relevantTopics, activeTopicId, activeContactId]);

  const initialEdges = useMemo((): Edge[] => {
    const topicEdges = buildTopicEdges(topicIds, activeTopicId);
    const contactEdges = activeTopic
      ? buildContactEdges(activeTopic, contactsVisible)
      : [];
    return [...topicEdges, ...contactEdges];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicIds, activeTopicId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Nodes/Edges aktualisieren wenn sich Szenario oder Zoom ändert
  useEffect(() => {
    const topicFlowNodes = relevantTopics.map((t) =>
      buildTopicFlowNode(t, activeTopicId)
    );
    const contactFlowNodes = activeTopic
      ? buildContactFlowNodes(activeTopic, activeContactId, contactsVisible)
      : [];
    setNodes([...topicFlowNodes, ...contactFlowNodes]);

    const topicEdges = buildTopicEdges(topicIds, activeTopicId);
    const contactEdges = activeTopic
      ? buildContactEdges(activeTopic, contactsVisible)
      : [];
    setEdges([...topicEdges, ...contactEdges]);
  }, [relevantTopics, activeTopic, activeTopicId, activeContactId, topicIds, contactsVisible, setNodes, setEdges]);

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.id.startsWith('topic-')) {
        const topicId = node.id.replace('topic-', '');
        onTopicClick(topicId);
      } else if (node.id.startsWith('contact-')) {
        const contactId = node.id.replace('contact-', '');
        onContactClick(contactId);
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
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      minZoom={0.2}
      maxZoom={2.5}
      fitView
      fitViewOptions={{ padding: 0.3 }}
      nodesDraggable={false}
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

// Wrapper-Komponente — exportiert nach außen
export function NetworkGraph(props: NetworkGraphProps) {
  return (
    <div className="w-full h-full bg-canvas">
      <GraphInner {...props} />
    </div>
  );
}
