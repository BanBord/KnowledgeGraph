'use client';

import { FlaskConical, Building2, User, Newspaper, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Tag, Avatar } from '@/components/ui';
import { Contact, ContactType, Redakteur } from '@/types';
import { redakteure } from '@/lib/mock-data';

const TYPE_ICONS: Record<ContactType, React.ElementType> = {
  expert:      FlaskConical,
  institution: Building2,
  company:     Building2,
  person:      User,
  journalist:  Newspaper,
};

const TYPE_LABELS: Record<ContactType, string> = {
  expert:      'Experte',
  institution: 'Institution',
  company:     'Unternehmen',
  person:      'Person',
  journalist:  'Journalist',
};

const TYPE_COLORS: Record<ContactType, string> = {
  expert:      'text-[#7c6af7]',
  institution: 'text-[#4f9cf9]',
  company:     'text-[#4fc97f]',
  person:      'text-[#f9a84f]',
  journalist:  'text-[#f94f4f]',
};

interface ContactCardProps {
  contact: Contact;
  isActive?: boolean;
  onClick: () => void;
}

export function ContactCard({ contact, isActive, onClick }: ContactCardProps) {
  const Icon = TYPE_ICONS[contact.type] ?? User;
  const iconColor = TYPE_COLORS[contact.type];
  const typeLabel = TYPE_LABELS[contact.type];

  const knownByRedakteure = contact.knownBy
    .map((id) => redakteure.find((r) => r.id === id))
    .filter((r): r is Redakteur => !!r);

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 group',
        'bg-surface border-border/60',
        isActive
          ? 'border-accent/60 bg-tagDefault shadow-[0_0_10px_rgba(124,106,247,0.15)]'
          : 'hover:border-border hover:bg-surface2',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className={cn('flex-shrink-0 mt-0.5', iconColor)}>
            <Icon size={13} />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-text truncate">{contact.name}</div>
            <div className="text-xs text-textMuted mt-0.5 line-clamp-1">{contact.role}</div>
          </div>
        </div>
        <ChevronRight
          size={13}
          className={cn(
            'flex-shrink-0 mt-1 transition-colors',
            isActive ? 'text-accent' : 'text-textDim group-hover:text-textMuted'
          )}
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        {/* Erste 2 Expertise-Tags */}
        <div className="flex gap-1 flex-wrap">
          {contact.expertise.slice(0, 2).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
          {contact.expertise.length > 2 && (
            <span className="text-[10px] text-textDim self-center">
              +{contact.expertise.length - 2}
            </span>
          )}
        </div>

        {/* Bekannte Redakteure als Avatare */}
        {knownByRedakteure.length > 0 && (
          <div className="flex -space-x-1.5 flex-shrink-0">
            {knownByRedakteure.slice(0, 3).map((r) => (
              <Avatar key={r.id} redakteur={r} size="sm" />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
