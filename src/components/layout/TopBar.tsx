import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Library, Settings as SettingsIcon, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export function TopBar() {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Library', path: '/library', icon: Library },
  ];

  return (
    <header className="recessed-wood flex h-14 items-center gap-2 rounded-full px-4 backdrop-blur-md">
      
      {/* Main Navigation Links */}
      <nav className="flex items-center gap-1 border-r border-[var(--border)] pr-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              isActive 
                ? "bg-[var(--primary)] text-white shadow-glow-green" 
                : "text-[var(--text-muted)] hover:bg-[var(--background)] hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden md:block">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Profile & Settings */}
      <div className="flex items-center gap-2 pl-2">
        <button 
          onClick={() => navigate('/settings')}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--background)] hover:text-white"
        >
          <SettingsIcon className="h-4 w-4" />
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--background)] transition-transform hover:scale-105 hover:shadow-lg"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}