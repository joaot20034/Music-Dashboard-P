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
          <div className="flex-1 overflow-y-auto px-6 pb-24 pt-6 custom-scrollbar">
            {/* AnimatePresence handles the unmounting animation of the previous page */}
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
      <div className="absolute bottom-0 z-50 h-[90px] w-full border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-lg flex items-center justify-center">
        <Player />
      </div>

    </div>
  );
}