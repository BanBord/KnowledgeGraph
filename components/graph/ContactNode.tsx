'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { User, Building2, FlaskConical, Newspaper } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ContactNodeData, ContactType } from '@/types';

// Icon je ContactType
const TYPE_ICONS: Record<ContactType, React.ElementType> = {
  expert:      FlaskConical,
  institution: Building2,
  company:     Building2,
  person:      User,
  journalist:  Newspaper,
};

// Icon-Farbe je ContactType
const TYPE_ICON_COLORS: Record<ContactType, string> = {
  expert:      'text-[#7c6af7]',
  institution: 'text-[#4f9cf9]',
  company:     'text-[#4fc97f]',
  person:      'text-[#f9a84f]',
  journalist:  'text-[#f94f4f]',
};

// Rand-Farbe je ContactType (für Kreis-Border)
const TYPE_BORDER_COLORS: Record<ContactType, string> = {
  expert:      '#7c6af7',
  institution: '#4f9cf9',
  company:     '#4fc97f',
  person:      '#f9a84f',
  journalist:  '#f94f4f',
};

// Hintergrundfarbe nach Bekanntheit (knownBy.length)
const FAMILIARITY_BG: Record<number, string> = {
  0: '#1e1e1e',
  1: '#1a2a28',
  2: '#1e1f33',
};

export const ContactNode = memo(function ContactNode({ data, selected }: NodeProps) {
  const { contact, isActive, familiarityLevel } = data as unknown as ContactNodeData;
  const Icon = TYPE_ICONS[contact.type] ?? User;
  const iconColor = TYPE_ICON_COLORS[contact.type];
  const borderColor = TYPE_BORDER_COLORS[contact.type];

  // Hintergrund: kalt → warm je nach Bekanntheit im Netzwerk
  const bgColor = familiarityLevel >= 3 ? '#241a38' : (FAMILIARITY_BG[familiarityLevel] ?? '#1e1e1e');

  // Nur Nachname für kompakte Darstellung im Kreis
  const lastName = contact.name.split(' ').slice(-1)[0];

  return (
    <>
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0" />

      <div
        style={{
          backgroundColor: bgColor,
          borderColor: isActive || selected ? '#7c6af7' : borderColor,
        }}
        className={cn(
          'w-[72px] h-[72px] rounded-full border-2 flex flex-col items-center justify-center',
          'transition-all duration-150 cursor-pointer select-none',
          isActive || selected
            ? 'shadow-[0_0_14px_rgba(124,106,247,0.45)]'
            : 'hover:brightness-125',
        )}
      >
        <div className={cn('flex-shrink-0', iconColor)}>
          <Icon size={14} />
        </div>
        <span className="text-[9px] font-medium text-text leading-tight text-center mt-1 px-1 line-clamp-2 max-w-[60px]">
          {lastName}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0" />
    </>
  );
});
