import { cn } from '@/lib/cn';
import { Redakteur } from '@/types';

interface AvatarProps {
  redakteur: Redakteur;
  size?: 'sm' | 'md';
  showTooltip?: boolean;
  className?: string;
}

// Initialen aus Name extrahieren
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Deterministisch eine Hintergrundfarbe basierend auf ID zuweisen
const AVATAR_COLORS = [
  'bg-[#3d2b8e]',
  'bg-[#1a4d7c]',
  'bg-[#1a5c3a]',
  'bg-[#6b2d2d]',
];

function getAvatarColor(id: string): string {
  const index = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function Avatar({ redakteur, size = 'md', showTooltip = true, className }: AvatarProps) {
  const sizeClasses = size === 'sm' ? 'w-6 h-6 text-[9px]' : 'w-7 h-7 text-[11px]';

  return (
    <div
      title={showTooltip ? `${redakteur.name} — ${redakteur.ressort}` : undefined}
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-text flex-shrink-0',
        'border border-border/60 cursor-default select-none',
        sizeClasses,
        getAvatarColor(redakteur.id),
        className
      )}
    >
      {getInitials(redakteur.name)}
    </div>
  );
}
