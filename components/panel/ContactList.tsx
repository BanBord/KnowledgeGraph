'use client';

import { Users } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { Contact } from '@/types';

interface ContactListProps {
  contacts: Contact[];
  activeContactId: string | null;
  topicLabel: string;
  onContactClick: (contactId: string) => void;
}

export function ContactList({
  contacts,
  activeContactId,
  topicLabel,
  onContactClick,
}: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-textDim">
        <Users size={24} />
        <p className="text-xs text-textMuted text-center">
          Keine Kontakte für<br />
          <span className="text-text">{topicLabel}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="px-1 pb-1">
        <span className="text-[11px] text-textDim uppercase tracking-widest font-medium">
          {contacts.length} Kontakt{contacts.length !== 1 ? 'e' : ''} in diesem Thema
        </span>
      </div>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          isActive={contact.id === activeContactId}
          onClick={() => onContactClick(contact.id)}
        />
      ))}
    </div>
  );
}
