import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from '../components/layout/TopBar';
import { Player } from '../components/player/Player';
import { CommandPalette } from '../components/shared/CommandPalette';

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full text-[var(--text-main)] overflow-hidden font-sans wood-bg">
      <CommandPalette />
      
      {/* Left/Center Area: Main Content */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        
        {/* Floating Navigation Pill */}
        <div className="absolute top-8 left-1/2 z-50 -translate-x-1/2">
          <TopBar />
        </div>
        
        <main className="flex-1 overflow-y-auto px-10 pb-20 pt-32 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mx-auto h-full max-w-5xl"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* The Vertical Structural Beam separating the layout */}
      <div className="relative z-50 flex w-8 flex-col items-center justify-between py-12 panel-wood border-l-2 border-r-2 border-[#1a110b]">
        {/* Iron Rivets */}
        <div className="iron-rivet"></div>
        <div className="iron-rivet"></div>
        <div className="iron-rivet"></div>
      </div>

      {/* Right Area: The Vertical "Studio Console" Player */}
      <aside className="relative z-40 w-[400px] shrink-0">
        {/* Ensure the player also has the wood background if it needs to match */}
        <Player />
      </aside>
    </div>
  );
}