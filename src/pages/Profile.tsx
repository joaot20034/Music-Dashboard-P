import { Clock, Headphones, Award } from 'lucide-react';

export default function Profile() {
  const user = {
    name: "Alex Developer",
    email: "alex@example.com",
    isPremium: true,
    listeningTimeHours: 1420,
  };

  return (
    <div className="pb-8 xl:max-w-4xl mx-auto">
      
      {/* Profile Header Block */}
      <div className="mb-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        
        {/* Profile Image in a Recessed Wood Well */}
        <div className="recessed-wood relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 rounded-full border-[8px] border-[var(--surface-oak)] shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] mix-blend-multiply opacity-50 pointer-events-none z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
            alt="Profile"
            className="h-36 w-36 rounded-full object-cover shadow-inner"
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-1 text-xs font-bold tracking-[0.2em] text-[var(--accent-gold)] uppercase drop-shadow-sm">
            Profile
          </span>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-[var(--text-main)] mb-3 drop-shadow-lg">
            {user.name}
          </h1>
          <div className="flex items-center gap-4 text-sm font-light text-[var(--text-muted)]">
            <span className="flex items-center gap-1 rounded-full border border-[#A88054]/50 bg-[#A88054]/10 px-3 py-1 text-[var(--accent-gold)] shadow-inner">
              {user.isPremium && "Premium"}
            </span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      {/* Vintage Dotted Divider */}
      <div className="mb-10 w-full border-t-[3px] border-dotted border-[var(--accent-gold)] opacity-30 shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>

      {/* Statistics Section */}
      <h2 className="mb-8 font-serif text-3xl font-bold text-[var(--text-main)] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
        Your Statistics
      </h2>

      <div className="grid gap-8 sm:grid-cols-3">
        {/* Stat Card 1 */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl panel-wood p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <Clock className="mb-4 h-8 w-8 text-[var(--accent-gold)] drop-shadow-md" strokeWidth={1.5} />
          <span className="font-serif text-4xl font-bold text-[var(--text-main)] drop-shadow-md">{user.listeningTimeHours}</span>
          <span className="mt-3 text-xs font-medium tracking-[0.1em] text-[var(--text-muted)] uppercase">Hours Listened</span>
        </div>

        {/* Stat Card 2 */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl panel-wood p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <Headphones className="mb-4 h-8 w-8 text-[var(--accent-gold)] drop-shadow-md" strokeWidth={1.5} />
          <span className="font-serif text-4xl font-bold text-[var(--text-main)] drop-shadow-md">1,204</span>
          <span className="mt-3 text-xs font-medium tracking-[0.1em] text-[var(--text-muted)] uppercase">Artists Discovered</span>
        </div>

        {/* Stat Card 3 */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl panel-wood p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <Award className="mb-4 h-8 w-8 text-[var(--accent-gold)] drop-shadow-md" strokeWidth={1.5} />
          <span className="font-serif text-4xl font-bold text-[var(--text-main)] drop-shadow-md">Top 5%</span>
          <span className="mt-3 text-xs font-medium tracking-[0.1em] text-[var(--text-muted)] uppercase">Synthwave Fan</span>
        </div>
      </div>
    </div>
  );
}