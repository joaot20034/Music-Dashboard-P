export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-end justify-between border-b border-[var(--border)] pb-3">
      <h2 className="font-serif text-2xl font-bold tracking-wide text-[var(--text-main)]">
        {title}
      </h2>
      <button className="rounded-full bg-[var(--surface-oak)] px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--accent-gold)] shadow-sm transition-all hover:bg-[var(--surface)] hover:text-white">
        Show all
      </button>
    </div>
  );
}