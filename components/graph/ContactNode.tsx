'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { User, Building2, FlaskConical, Newspaper, GraduationCap, Landmark } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ContactNodeData, ContactType } from '@/types';

const TYPE_BORDER_COLORS: Record<ContactType, string> = {
  expert:      '#7c6af7',
  institution: '#4f9cf9',
  company:     '#4fc97f',
  person:      '#f9a84f',
  journalist:  '#f94f4f',
  student:     '#f9e44f',
};

const TYPE_ICONS: Record<ContactType, React.ElementType> = {
  expert:      FlaskConical,
  institution: Landmark,
  company:     Building2,
  person:      User,
  journalist:  Newspaper,
  student:     GraduationCap,
};

// Hintergrundfarbe nach Bekanntheit
const FAMILIARITY_BG: Record<number, string> = {
  0: '#1e1e1e',
  1: '#1a2a28',
  2: '#1e1f33',
};

export const ContactNode = memo(function ContactNode({ data, selected }: NodeProps) {
  const { contact, isActive, familiarityLevel } = data as unknown as ContactNodeData;
  const typeColor = TYPE_BORDER_COLORS[contact.type];
  const TypeIcon = TYPE_ICONS[contact.type] ?? User;

  const bgColor = familiarityLevel >= 3 ? '#241a38' : (FAMILIARITY_BG[familiarityLevel] ?? '#1e1e1e');

  // Rolle kürzen: bei " – " oder " - " aufteilen, nur erstes Segment
  const shortRole = contact.role.split(/\s[–-]\s/)[0];

  return (
    <>
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />

      <div
        style={{
          backgroundColor: bgColor,
          borderColor: isActive || selected ? '#7c6af7' : typeColor,
        }}
        className={cn(
          'min-w-[120px] max-w-[160px] rounded-lg border flex items-center gap-2 px-2.5 py-2',
          'transition-all duration-200 cursor-grab active:cursor-grabbing select-none',
          isActive || selected
            ? 'border-2 shadow-[0_0_16px_rgba(124,106,247,0.5),0_0_30px_rgba(124,106,247,0.15)]'
            : 'border hover:brightness-110',
        )}
      >
        {/* Typ-Indikator: farbiger Punkt links */}
        <div
          className="flex-shrink-0 w-2 h-2 rounded-full"
          style={{ backgroundColor: typeColor }}
        />

        {/* Name + Rolle */}
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium text-text leading-tight truncate">
            {contact.name}
          </div>
          <div className="text-[9px] text-textMuted leading-tight mt-0.5 truncate">
            {shortRole}
          </div>
        </div>

        {/* Typ-Icon rechts */}
        <div
          className="flex-shrink-0 p-1 rounded"
          style={{ color: typeColor, backgroundColor: `${typeColor}18` }}
        >
          <TypeIcon size={10} />
        </div>
      </div>

      <Handle type="source" position={Position.Top} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Left} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
    </>
  );
});
