import { ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton } from '../ui/IconButton';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only show the search bar in the top nav if we are actually on the search page
  const isSearchPage = location.pathname === '/search';

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-[hsl(var(--background))]/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <IconButton 
            size="sm" 
            className="bg-[hsl(var(--surface))] hover:bg-[hsl(var(--surface-hover))]"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </IconButton>
          <IconButton 
            size="sm" 
            className="bg-[hsl(var(--surface))] hover:bg-[hsl(var(--surface-hover))]"
            onClick={() => navigate(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </IconButton>
        </div>

        {isSearchPage && (
          <div className="w-80 max-w-md transition-all duration-300">
            <Input 
              icon={<Search className="h-5 w-5" />} 
              placeholder="What do you want to listen to?" 
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <IconButton size="sm" className="text-[hsl(var(--text-muted))]">
          <Bell className="h-5 w-5" />
        </IconButton>
        
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--surface-hover))] transition-transform hover:scale-105">
          <User className="h-5 w-5 text-[hsl(var(--text-muted))]" />
        </button>
      </div>
    </header>
  );
}