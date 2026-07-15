import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { Player } from '../components/player/Player';
import { CommandPalette } from '../components/shared/CommandPalette';

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full flex-col bg-[hsl(var(--background))] text-[hsl(var(--text-main))] overflow-hidden">
      
      <CommandPalette />
      
      {/* Top Section: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-[hsl(var(--surface))] to-[hsl(var(--background))]">
          <TopBar />
          
          {/* Scrollable Content Area */}
          {/* FIX: Changed pb-24 to pb-8 since the player no longer overlaps */}
          <div className="flex-1 overflow-y-auto px-6 pb-8 pt-6 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom Section: Music Player */}
      {/* FIX: Removed 'absolute bottom-0', added 'shrink-0' so it sits perfectly at the bottom of the flex column */}
      <div className="z-50 h-[90px] w-full shrink-0 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-lg flex items-center justify-center">
        <Player />
      </div>

    </div>
  );
}