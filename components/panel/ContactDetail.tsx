'use client';

import {
  Mail, Phone, FlaskConical, Building2, User, Newspaper, Calendar, FileText, ChevronLeft,
} from 'lucide-react';
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
  expert:      'text-[#7c6af7] bg-[#7c6af7]/10 border-[#7c6af7]/30',
  institution: 'text-[#4f9cf9] bg-[#4f9cf9]/10 border-[#4f9cf9]/30',
  company:     'text-[#4fc97f] bg-[#4fc97f]/10 border-[#4fc97f]/30',
  person:      'text-[#f9a84f] bg-[#f9a84f]/10 border-[#f9a84f]/30',
  journalist:  'text-[#f94f4f] bg-[#f94f4f]/10 border-[#f94f4f]/30',
};

interface ContactDetailProps {
  contact: Contact;
  onBack: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function ContactDetail({ contact, onBack }: ContactDetailProps) {
  const Icon = TYPE_ICONS[contact.type] ?? User;
  const typeLabel = TYPE_LABELS[contact.type];
  const typeColorClass = TYPE_COLORS[contact.type];

  const knownByRedakteure = contact.knownBy
    .map((id) => redakteure.find((r) => r.id === id))
    .filter((r): r is Redakteur => !!r);

  // Gesprächshistorie: neueste zuerst
  const sortedHistory = [...contact.convHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col h-full">
      {/* Zurück-Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-textMuted hover:text-text transition-colors mb-4 -ml-1 group"
      >
        <ChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
        Zurück zur Liste
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 pb-4 border-b border-border">
        {/* Initialen-Avatar groß */}
        <div className="w-10 h-10 rounded-xl bg-surface2 border border-border flex items-center justify-center flex-shrink-0">
          <Icon size={18} className={typeColorClass.split(' ')[0]} />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-text leading-tight">{contact.name}</h2>
          <p className="text-xs text-textMuted mt-0.5 leading-snug">{contact.role}</p>
          <span
            className={cn(
              'inline-flex items-center mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium border',
              typeColorClass
            )}
          >
            {typeLabel}
          </span>
        </div>
      </div>

      {/* Scrollbarer Inhalt */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-5 pr-0.5">

        {/* Expertise */}
        {contact.expertise.length > 0 && (
          <div>
            <p className="text-[11px] text-textDim uppercase tracking-widest font-medium mb-2">
              Expertise
            </p>
            <div className="flex flex-wrap gap-1.5">
              {contact.expertise.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        )}

        {/* Bekannt bei */}
        {knownByRedakteure.length > 0 && (
          <div>
            <p className="text-[11px] text-textDim uppercase tracking-widest font-medium mb-2">
              Bekannt bei
            </p>
            <div className="flex flex-col gap-2">
              {knownByRedakteure.map((r) => (
                <div key={r.id} className="flex items-center gap-2.5">
                  <Avatar redakteur={r} size="md" />
                  <div>
                    <div className="text-sm text-text font-medium">{r.name}</div>
                    <div className="text-[11px] text-textMuted">{r.ressort}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kontaktdaten */}
        {(contact.email || contact.phone) && (
          <div>
            <p className="text-[11px] text-textDim uppercase tracking-widest font-medium mb-2">
              Kontakt
            </p>
            <div className="flex flex-col gap-2">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-md bg-surface2 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                    <Mail size={12} className="text-textMuted group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-xs text-textMuted group-hover:text-accent transition-colors truncate">
                    {contact.email}
                  </span>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-md bg-surface2 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent2/50 transition-colors">
                    <Phone size={12} className="text-textMuted group-hover:text-accent2 transition-colors" />
                  </div>
                  <span className="text-xs text-textMuted group-hover:text-accent2 transition-colors">
                    {contact.phone}
                  </span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Herkunft */}
        {contact.sourceNote && (
          <div>
            <p className="text-[11px] text-textDim uppercase tracking-widest font-medium mb-1.5">
              Herkunft
            </p>
            <p className="text-xs text-textMuted leading-relaxed">{contact.sourceNote}</p>
          </div>
        )}

        {/* Gesprächshistorie */}
        {sortedHistory.length > 0 && (
          <div>
            <p className="text-[11px] text-textDim uppercase tracking-widest font-medium mb-3">
              Gesprächshistorie
            </p>
            <div className="flex flex-col gap-3">
              {sortedHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg bg-surface2 border border-border/60 p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-textDim" />
                      <span className="text-[11px] text-textMuted">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <span className="text-[11px] text-accent font-medium">
                      {entry.redakteurName.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-text leading-relaxed">{entry.summary}</p>
                  {entry.articles && entry.articles.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {entry.articles.map((article) => (
                        <div key={article} className="flex items-start gap-1.5">
                          <FileText size={10} className="text-textDim mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-accent2 leading-tight">{article}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {sortedHistory.length === 0 && (
          <div className="rounded-lg bg-surface2 border border-border/40 p-4 text-center">
            <p className="text-xs text-textDim">Noch keine Gespräche dokumentiert</p>
          </div>
        )}
      </div>
    </div>
  );
}
