import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingExperience = memo(function LoadingExperience() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial boot time (fetching data, rendering textures)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // 2.8s cinematic boot sequence
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="cinematic-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0806] overflow-hidden pointer-events-none"
          // The grand fade out of the loading screen
          exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* 1. Dust appears immediately (already floating) */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] animate-pulse" style={{ animationDuration: '4s' }} />

          {/* 2. Warm light slowly enters from the top left */}
          <motion.div
            className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%] opacity-0 mix-blend-overlay"
            style={{ background: 'radial-gradient(circle at 40% 40%, rgba(212, 184, 158, 0.15) 0%, transparent 60%)' }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />

          {/* 3. A massive, abstracted vinyl silhouette fades in and begins rotating */}
          <motion.div
            className="relative flex h-[400px] w-[400px] items-center justify-center rounded-full border border-white/5 bg-[#120e0b] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            transition={{ opacity: { duration: 1.5, delay: 1 }, scale: { duration: 2, delay: 1, ease: "easeOut" }, rotate: { duration: 10, ease: "linear", repeat: Infinity } }}
          >
            {/* Record Grooves */}
            <div className="absolute inset-2 rounded-full border border-white/5" />
            <div className="absolute inset-6 rounded-full border border-white/5" />
            <div className="absolute inset-10 rounded-full border border-white/5" />
            
            {/* Center Label fades in last */}
            <motion.div 
              className="h-32 w-32 rounded-full bg-[var(--surface-oak)] shadow-inner flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <div className="h-4 w-4 rounded-full bg-[#0a0806]" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});