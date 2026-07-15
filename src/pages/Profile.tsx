import { useQuery } from '@tanstack/react-query';
import { Clock, Award, Headphones, ShieldCheck } from 'lucide-react';
import { MusicService } from '../services/api';

export default function Profile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: MusicService.getUserProfile,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[hsl(var(--surface))] border-t-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="pb-8 xl:max-w-5xl">
      <div className="mb-10 flex flex-col items-center gap-8 md:flex-row md:items-end">
        <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full shadow-2xl md:h-48 md:w-48">
          <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[hsl(var(--text-muted))]">
            Profile
          </span>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {user.name}
          </h1>
          <div className="flex items-center gap-3">
            {user.premium && (
              <span className="flex items-center gap-1 rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-sm font-medium text-[hsl(var(--primary))]">
                <ShieldCheck className="h-4 w-4" />
                Premium
              </span>
            )}
            <span className="text-sm text-[hsl(var(--text-muted))]">{user.email}</span>
          </div>
        </div>
      </div>

      <h2 className="mb-6 font-serif text-2xl font-bold text-[var(--text-main)] border-b border-[var(--border)] pb-2">
        Your Statistics
      </h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Card 1 */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-warm transition-transform hover:-translate-y-1">
          <Clock className="mb-4 h-8 w-8 text-[var(--accent-gold)]" />
          <span className="font-serif text-4xl font-bold text-[var(--text-main)]">{user.listeningTimeHours}</span>
          <span className="mt-2 text-sm font-light tracking-wide text-[var(--text-muted)] uppercase">Hours Listened</span>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-warm transition-transform hover:-translate-y-1">
          <Headphones className="mb-4 h-8 w-8 text-[var(--accent-gold)]" />
          <span className="font-serif text-4xl font-bold text-[var(--text-main)]">1,204</span>
          <span className="mt-2 text-sm font-light tracking-wide text-[var(--text-muted)] uppercase">Artists Discovered</span>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-warm transition-transform hover:-translate-y-1">
          <Award className="mb-4 h-8 w-8 text-[var(--accent-gold)]" />
          <span className="font-serif text-4xl font-bold text-[var(--text-main)]">Top 5%</span>
          <span className="mt-2 text-sm font-light tracking-wide text-[var(--text-muted)] uppercase">Synthwave Fan</span>
        </div>
      </div>
    </div>
  );
}