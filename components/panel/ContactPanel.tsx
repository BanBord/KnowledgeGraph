'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ContactList } from './ContactList';
import { ContactDetail } from './ContactDetail';
import { Contact, TopicNode } from '@/types';
import { getContactById, getContactsForTopic } from '@/lib/mock-data';

interface ContactPanelProps {
  activeTopic: TopicNode | null;
  activeContactId: string | null;
  onContactClick: (contactId: string) => void;
  onClose: () => void;
  onBack: () => void;
}

export function ContactPanel({
  activeTopic,
  activeContactId,
  onContactClick,
  onClose,
  onBack,
}: ContactPanelProps) {
  const isOpen = activeTopic !== null;
  const activeContact = activeContactId ? getContactById(activeContactId) : null;
  const contactsForTopic = activeTopic ? getContactsForTopic(activeTopic.id) : [];

  return (
    <div
      className={cn(
        'absolute top-0 right-0 h-full w-80 flex flex-col',
        'bg-surface/90 backdrop-blur-sm border-l border-border',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Panel-Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="min-w-0">
          {activeContact ? (
            <>
              <p className="text-xs text-textDim">Kontakt</p>
              <p className="text-sm font-semibold text-text truncate">{activeContact.name}</p>
            </>
          ) : activeTopic ? (
            <>
              <p className="text-xs text-textDim">Thema</p>
              <p className="text-sm font-semibold text-text truncate">{activeTopic.label}</p>
            </>
          ) : null}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1.5 rounded-md text-textDim hover:text-text hover:bg-surface2 transition-colors"
          aria-label="Panel schließen"
        >
          <X size={14} />
        </button>
      </div>

      {/* Panel-Inhalt */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeContact ? (
          <ContactDetail contact={activeContact} onBack={onBack} />
        ) : activeTopic ? (
          <ContactList
            contacts={contactsForTopic}
            activeContactId={activeContactId}
            topicLabel={activeTopic.label}
            onContactClick={onContactClick}
          />
        ) : null}
      </div>
    </div>
  );
}
