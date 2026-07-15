import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from '../components/layout/TopBar';
import { Player } from '../components/player/Player';
import { CommandPalette } from '../components/shared/CommandPalette';
import { Environment } from '../components/environment/Environment';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function InnerLayout() {
  const location = useLocation();
  const { season } = useTheme(); // Listen to the current theme!

  const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="flex h-screen w-full text-[var(--text-main)] overflow-hidden font-sans wood-bg relative">
      
      {/* Pass the dynamic season into the Environment */}
      <Environment season={season} />
      <CommandPalette />
      
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className="absolute top-8 left-1/2 z-50 -translate-x-1/2">
          <TopBar />
        </div>
        
        <main className="flex-1 overflow-y-auto px-10 pb-20 pt-32 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 30, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ duration: 0.7, ease: cinematicEase }}
              className="mx-auto h-full max-w-5xl will-change-transform"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <div className="relative z-50 flex w-8 flex-col items-center justify-between py-12 panel-wood border-l-2 border-r-2 border-[#1a110b] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="iron-rivet"></div>
        <div className="iron-rivet"></div>
        <div className="iron-rivet"></div>
      </div>

      <aside className="relative z-40 w-[420px] shrink-0 panel-wood border-l-0">
        <Player />
      </aside>
    </div>
  );
}

// Wrap the layout in the Provider
export function MainLayout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}