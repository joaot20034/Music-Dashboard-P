import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion} from 'framer-motion';
import { TopBar } from '../components/layout/TopBar';
import { Player } from '../components/player/Player';
import { CommandPalette } from '../components/shared/CommandPalette';
import { Environment } from '../components/environment/Environment';
import { useTheme, ThemeProvider } from '../context/ThemeContext';
import { ListeningRoomProvider, useListeningRoom } from '../context/ListeningRoomContext';
import { LoadingExperience } from '../components/shared/LoadingExperience';
import { ListeningRoomScene } from '../components/listening-room/ListeningRoomScene';

function InnerLayout() {
  const location = useLocation();
  const { season } = useTheme();
  const { isListeningMode } = useListeningRoom();

  const cinematicEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="flex h-screen w-full text-[var(--text-main)] overflow-hidden font-sans wood-bg relative bg-[#0a0806]">
      
      <LoadingExperience />
      
      {/* 
        =========================================
        SCENE 1: THE STANDARD DESKTOP APPLICATION
        =========================================
        This entire wrapper scales up and fades out when transitioning 
        to the listening room, creating a "camera push" effect.
      */}
      <motion.div
        className="absolute inset-0 flex w-full h-full"
        animate={{ 
          scale: isListeningMode ? 1.05 : 1, 
          opacity: isListeningMode ? 0 : 1,
          pointerEvents: isListeningMode ? 'none' : 'auto'
        }}
        transition={{ duration: 1.2, ease: cinematicEase }}
      >
        <Environment season={season} />
        <CommandPalette />
        
        {/* Center UI */}
        <div className="relative z-20 flex flex-col overflow-hidden flex-1">
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

        {/* The Structural Beam */}
        <div className="relative z-30 flex flex-col items-center justify-between py-12 panel-wood border-l-2 border-r-2 border-[#1a110b] shadow-[0_0_30px_rgba(0,0,0,0.8)] w-[32px]">
          <div className="iron-rivet"></div><div className="iron-rivet"></div><div className="iron-rivet"></div>
        </div>

        {/* The Standard Player */}
        <aside className="relative z-40 shrink-0 panel-wood border-l-0 w-[420px]">
          <Player />
        </aside>
      </motion.div>

      {/* 
        =========================================
        SCENE 2: THE IMMERSIVE LISTENING ROOM
        =========================================
        Fades in and scales down simultaneously to receive the camera push.
      */}
      <AnimatePresence>
        {isListeningMode && (
          <motion.div
            key="listening-room"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: cinematicEase }}
            className="absolute inset-0 z-[100]"
          >
            <ListeningRoomScene />
            
            {/* Elegant exit hint */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-10 left-1/2 -translate-x-1/2 z-[110] text-[#8a7b66] text-xs uppercase tracking-[0.3em] font-medium opacity-50"
            >
              Press ESC to exit
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export function MainLayout() {
  return (
    <ThemeProvider>
      <ListeningRoomProvider>
        <InnerLayout />
      </ListeningRoomProvider>
    </ThemeProvider>
  );
}