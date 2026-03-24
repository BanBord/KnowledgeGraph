import { cn } from '@/lib/cn';

interface TagProps {
  label: string;
  active?: boolean;
  className?: string;
}

export function Tag({ label, active, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium leading-none',
        'bg-tagDefault text-accent border border-accent/20',
        active && 'bg-accent/20 border-accent/50 text-accent',
        className
      )}
    >
      {label}
    </span>
  );
}
