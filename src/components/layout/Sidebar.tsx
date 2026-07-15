import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Heart, Plus, Disc3 } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Search', icon: Search, path: '/search' },
  { label: 'Your Library', icon: Library, path: '/library' },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col bg-[hsl(var(--background))] px-4 py-6 border-r border-[hsl(var(--border))]">
      {/* Brand Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))] text-white">
          <Disc3 className="h-5 w-5 animate-[spin_4s_linear_infinite]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">MusicDash</span>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--surface-hover))] text-white"
                  : "text-[hsl(var(--text-muted))] hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />

      {/* Secondary Navigation */}
      <nav className="space-y-2">
        <button className="flex w-full items-center gap-4 rounded-md px-3 py-2 text-sm font-medium text-[hsl(var(--text-muted))] transition-colors hover:text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[hsl(var(--surface))] text-[hsl(var(--text-muted))] transition-colors group-hover:bg-white group-hover:text-black">
            <Plus className="h-4 w-4" />
          </div>
          Create Playlist
        </button>
        
        <NavLink
          to="/library/favorites"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-4 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[hsl(var(--surface-hover))] text-white"
                : "text-[hsl(var(--text-muted))] hover:text-white"
            )
          }
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <Heart className="h-3 w-3 fill-white" />
          </div>
          Liked Songs
        </NavLink>
      </nav>
    </aside>
  );
}