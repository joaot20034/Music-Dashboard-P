import { memo } from 'react';

// ========================================================
// 1. VINTAGE DESK LAMP
// Casts a physical hardware-accelerated warm glow on the UI
// ========================================================
export const StudioLamp = memo(function StudioLamp() {
  return (
    <div className="group relative h-32 w-24 will-change-transform transition-transform duration-700 hover:rotate-1">
      {/* The Glow (Pulsing over 40 seconds) */}
      <style>{`
        @keyframes lamp-breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
      <div 
        className="absolute -bottom-10 -left-20 h-40 w-64 rounded-full mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(245, 203, 167, 0.4) 0%, transparent 70%)',
          animation: 'lamp-breathe 40s ease-in-out infinite'
        }}
      />
      {/* Base & Neck */}
      <div className="absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 rounded-t-md bg-gradient-to-t from-[#1a110b] to-[#3a281c] shadow-lg" />
      <div className="absolute bottom-4 left-1/2 h-20 w-1.5 -translate-x-1/2 origin-bottom rotate-12 bg-gradient-to-r from-[#8b7355] to-[#5c4a35]" />
      {/* Lampshade */}
      <div className="absolute top-4 left-4 h-12 w-20 origin-center -rotate-12 rounded-t-full bg-gradient-to-b from-[#2a2a2a] to-[#111] shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-b-2 border-[#8b7355]" />
    </div>
  );
});

// ========================================================
// 2. HOT COFFEE MUG
// Features 3 decoupled SVG steam ribbons 
// ========================================================
export const CoffeeMug = memo(function CoffeeMug() {
  return (
    <div className="group relative h-20 w-24 will-change-transform transition-transform duration-700 hover:-translate-y-1">
      <style>{`
        @keyframes steam-rise {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { transform: translateY(-30px) scale(1.5) rotate(10deg); opacity: 0; }
        }
      `}</style>
      
      {/* Decoupled Steam */}
      <div className="absolute -top-12 left-1/2 flex -translate-x-1/2 gap-1 pointer-events-none">
        <div className="h-16 w-3 rounded-full bg-white blur-md" style={{ animation: 'steam-rise 45s ease-in-out infinite' }} />
        <div className="h-16 w-3 rounded-full bg-white blur-md" style={{ animation: 'steam-rise 57s ease-in-out infinite 15s' }} />
      </div>

      {/* Ceramic Mug Body */}
      <div className="absolute bottom-0 left-4 h-16 w-16 rounded-b-xl rounded-t-sm bg-gradient-to-br from-[#e8e4d9] to-[#b3ada0] shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.2),_4px_10px_15px_rgba(0,0,0,0.5)]" />
      {/* Mug Handle */}
      <div className="absolute bottom-3 left-1 h-10 w-8 rounded-l-full border-4 border-y-[#d1cbbd] border-l-[#e8e4d9] border-r-transparent shadow-[-2px_4px_5px_rgba(0,0,0,0.2)]" />
    </div>
  );
});

// ========================================================
// 3. MINIMALIST PLANT
// Extremely slow, sub-pixel CSS swaying
// ========================================================
export const StudioPlant = memo(function StudioPlant() {
  return (
    <div className="group relative h-32 w-24 will-change-transform transition-transform duration-1000 hover:rotate-2 hover:scale-105">
      <style>{`
        @keyframes plant-sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>
      {/* Terracotta Pot */}
      <div className="absolute bottom-0 left-1/2 h-12 w-14 -translate-x-1/2 rounded-b-lg bg-gradient-to-br from-[#8b5a42] to-[#4a2e21] shadow-[inset_0_4px_6px_rgba(0,0,0,0.4),_0_8px_15px_rgba(0,0,0,0.6)]" />
      {/* Leaves (Decoupled sway) */}
      <div className="absolute bottom-10 left-1/2 h-20 w-4 origin-bottom -translate-x-1/2 -rotate-12 rounded-t-full bg-gradient-to-t from-[#2c4021] to-[#4a6b36]" style={{ animation: 'plant-sway 63s ease-in-out infinite' }} />
      <div className="absolute bottom-10 left-1/2 h-16 w-4 origin-bottom -translate-x-1/2 rotate-12 rounded-t-full bg-gradient-to-t from-[#1d2b16] to-[#385229]" style={{ animation: 'plant-sway 79s ease-in-out infinite 5s' }} />
    </div>
  );
});