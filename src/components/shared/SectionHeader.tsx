interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-6 mt-10 flex items-end justify-between first:mt-0">
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      <button className="text-sm font-bold text-[hsl(var(--text-muted))] transition-colors hover:text-white">
        Show all
      </button>
    </div>
  );
}