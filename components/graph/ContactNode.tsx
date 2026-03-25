'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { User, Building2, FlaskConical, Newspaper, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ContactNodeData, ContactType } from '@/types';

const TYPE_ICONS: Record<ContactType, React.ElementType> = {
  expert:      FlaskConical,
  institution: Building2,
  company:     Building2,
  person:      User,
  journalist:  Newspaper,
  student:     GraduationCap,
};

const TYPE_ICON_COLORS: Record<ContactType, string> = {
  expert:      'text-[#7c6af7]',
  institution: 'text-[#4f9cf9]',
  company:     'text-[#4fc97f]',
  person:      'text-[#f9a84f]',
  journalist:  'text-[#f94f4f]',
  student:     'text-[#f9e44f]',
};

const TYPE_BORDER_COLORS: Record<ContactType, string> = {
  expert:      '#7c6af7',
  institution: '#4f9cf9',
  company:     '#4fc97f',
  person:      '#f9a84f',
  journalist:  '#f94f4f',
  student:     '#f9e44f',
};

// Hintergrundfarbe nach Bekanntheit
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

  const bgColor = familiarityLevel >= 3 ? '#241a38' : (FAMILIARITY_BG[familiarityLevel] ?? '#1e1e1e');

  // Vorname-Initial + Nachname für kompakte aber lesbare Darstellung
  const nameParts = contact.name.replace(/^(Dr\.|Prof\.|Prof\. Dr\.)/, '').trim().split(' ');
  const lastName = nameParts[nameParts.length - 1];
  const firstInitial = nameParts[0]?.[0];
  const shortName = firstInitial && nameParts.length > 1 ? `${firstInitial}. ${lastName}` : lastName;

  // Familiarity glow: bekannte Kontakte leuchten subtil weiß
  const familiarityGlow = familiarityLevel >= 2
    ? 'shadow-[0_0_8px_rgba(255,255,255,0.08)]'
    : '';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />

      {/* Tooltip: erscheint beim Hover über dem Node (CSS-only) */}
      <div className="group relative">
        <div
          style={{
            backgroundColor: bgColor,
            borderColor: isActive || selected ? '#7c6af7' : borderColor,
          }}
          className={cn(
            'w-[68px] h-[68px] rounded-full border-2 flex flex-col items-center justify-center',
            'transition-all duration-200 cursor-grab active:cursor-grabbing select-none',
            isActive || selected
              ? 'shadow-[0_0_16px_rgba(124,106,247,0.5),0_0_30px_rgba(124,106,247,0.15)]'
              : cn('hover:brightness-125', familiarityGlow),
          )}
        >
          <div className={cn('flex-shrink-0', iconColor)}>
            <Icon size={14} />
          </div>
          <span className="text-[9px] font-medium text-text leading-tight text-center mt-1 px-1 line-clamp-2 max-w-[58px]">
            {shortName}
          </span>
        </div>

        {/* CSS-only Tooltip — zeigt Rolle beim Hover */}
        <div className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50',
          'px-2 py-1 rounded bg-surface2 border border-border/80',
          'text-[10px] text-textMuted whitespace-nowrap pointer-events-none',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
          'max-w-[140px] truncate text-center'
        )}>
          {contact.role}
        </div>
      </div>

      <Handle type="source" position={Position.Top} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Left} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !min-w-0 !min-h-0" />
    </>
  );
});
