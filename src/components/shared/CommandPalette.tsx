import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Library, User, Settings} from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu when ⌘K or CTRL+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[20vh] backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={() => setOpen(false)} />

      <Command
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-2xl"
        // Prevent default filtering if you want to implement async search later
        shouldFilter={true}
      >
        <div className="flex items-center border-b border-[hsl(var(--border))] px-4">
          <Search className="mr-2 h-5 w-5 text-[hsl(var(--text-muted))]" />
          <Command.Input
            autoFocus
            placeholder="Type a command or search..."
            className="flex h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-[hsl(var(--text-muted))]"
          />
          <kbd className="hidden rounded bg-[hsl(var(--surface-hover))] px-2 py-1 text-xs text-[hsl(var(--text-muted))] sm:block">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
          <Command.Empty className="py-6 text-center text-sm text-[hsl(var(--text-muted))]">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="px-2 py-1 text-xs font-medium text-[hsl(var(--text-muted))] [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2">
            <Command.Item
              onSelect={() => runCommand(() => navigate('/'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-white aria-selected:bg-[hsl(var(--primary))] aria-selected:text-white"
            >
              <Home className="h-4 w-4" /> Go to Home
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/search'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-white aria-selected:bg-[hsl(var(--primary))] aria-selected:text-white"
            >
              <Search className="h-4 w-4" /> Search Music
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/library'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-white aria-selected:bg-[hsl(var(--primary))] aria-selected:text-white"
            >
              <Library className="h-4 w-4" /> Your Library
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Quick Actions" className="mt-2 px-2 py-1 text-xs font-medium text-[hsl(var(--text-muted))] [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-2">
            <Command.Item
              onSelect={() => runCommand(() => navigate('/profile'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-white aria-selected:bg-[hsl(var(--primary))] aria-selected:text-white"
            >
              <User className="h-4 w-4" /> View Profile
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => navigate('/settings'))}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-white aria-selected:bg-[hsl(var(--primary))] aria-selected:text-white"
            >
              <Settings className="h-4 w-4" /> Preferences
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}