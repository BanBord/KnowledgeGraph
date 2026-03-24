'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { User, Building2, FlaskConical, Newspaper, Users } from 'lucide-react';
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

// Farbe je ContactType
const TYPE_COLORS: Record<ContactType, string> = {
  expert:      'text-[#7c6af7]',
  institution: 'text-[#4f9cf9]',
  company:     'text-[#4fc97f]',
  person:      'text-[#f9a84f]',
  journalist:  'text-[#f94f4f]',
};

export const ContactNode = memo(function ContactNode({ data, selected }: NodeProps) {
  const { contact, isActive } = data as unknown as ContactNodeData;
  const Icon = TYPE_ICONS[contact.type] ?? User;
  const iconColor = TYPE_COLORS[contact.type];

  return (
    <>
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0" />

      <div
        className={cn(
          'px-3 py-2 rounded-lg border transition-all duration-150 cursor-pointer select-none',
          'bg-surface border-border/60 max-w-[140px]',
          isActive || selected
            ? 'border-accent/70 shadow-[0_0_10px_rgba(124,106,247,0.25)]'
            : 'hover:border-border',
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn('flex-shrink-0', iconColor)}>
            <Icon size={12} />
          </div>
          <span className="text-[11px] font-medium text-text leading-tight truncate">
            {contact.name}
          </span>
        </div>
        <div className="mt-1 text-[10px] text-textDim leading-tight line-clamp-1">
          {contact.role.split('–')[0].trim()}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0" />
    </>
  );
});
