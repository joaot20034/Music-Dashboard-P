import { useState } from 'react';
import toast from 'react-hot-toast';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import type { Season } from '../components/environment/types';

export default function Settings() {
  const [highQuality, setHighQuality] = useState(true);
  const [normalizeVolume, setNormalizeVolume] = useState(true);
  const [explicitContent, setExplicitContent] = useState(false);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  
  // Pull our global season state
  const { season, setSeason } = useTheme();

  const handleSave = () => {
    toast.success("Studio preferences saved", {
      style: { background: 'var(--surface)', color: 'var(--accent-gold)' }
    });
  };

  return (
    <div className="pb-8 xl:max-w-4xl mx-auto">
      <h1 className="mb-10 font-serif text-4xl font-bold tracking-tight text-[var(--text-main)] drop-shadow-md">
        Studio Preferences
      </h1>

      <div className="space-y-8">

        {/* ATMOSPHERE SECTION */}
        <section className="relative rounded-xl panel-wood p-8 transition-transform duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <h2 className="mb-6 border-b border-[var(--border)]/30 pb-4 font-serif text-2xl font-semibold text-[var(--text-main)] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
            Studio Atmosphere
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col mb-2">
                <span className="text-base font-medium text-[var(--text-main)] drop-shadow-md">Seasonal Environment</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Adjust the lighting, particles, and mood of your studio space.</span>
              </div>
              
              {/* Skeuomorphic Segmented Control for Seasons */}
              <div className="recessed-wood flex p-2 rounded-xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] gap-2">
                 {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`capitalize flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        season === s 
                        ? 'bg-[var(--accent-gold)] text-[#1a110b] shadow-[0_2px_10px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.3)]' 
                        : 'text-[var(--text-muted)] hover:text-[var(--accent-gold)] hover:bg-[#1a110b]/40'
                      }`}
                    >
                      {s}
                    </button>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* Audio Quality Section */}
        <section className="relative rounded-xl panel-wood p-8 transition-transform duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <h2 className="mb-6 border-b border-[var(--border)]/30 pb-4 font-serif text-2xl font-semibold text-[var(--text-main)] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
            Audio Quality
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col pr-4">
                <span className="text-base font-medium text-[var(--text-main)] drop-shadow-md">High-Fidelity Streaming</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Stream lossless audio directly to your device.</span>
              </div>
              <Switch checked={highQuality} onChange={setHighQuality} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col pr-4">
                <span className="text-base font-medium text-[var(--text-main)] drop-shadow-md">Analog Volume Normalization</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Maintain a consistent warm volume across all tracks.</span>
              </div>
              <Switch checked={normalizeVolume} onChange={setNormalizeVolume} />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative rounded-xl panel-wood p-8 transition-transform duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <h2 className="mb-6 border-b border-[var(--border)]/30 pb-4 font-serif text-2xl font-semibold text-[var(--text-main)] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
            Content & Playback
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col pr-4">
                <span className="text-base font-medium text-[var(--text-main)] drop-shadow-md">Allow Explicit Content</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Play tracks marked with explicit lyrics.</span>
              </div>
              <Switch checked={explicitContent} onChange={setExplicitContent} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col pr-4">
                <span className="text-base font-medium text-[var(--text-main)] drop-shadow-md">Hardware Acceleration</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Use GPU for smoother vinyl animations.</span>
              </div>
              <Switch checked={hardwareAcceleration} onChange={setHardwareAcceleration} />
            </div>
          </div>
        </section>

        <div className="pt-6 flex justify-end">
          <Button 
            onClick={handleSave} 
            className="w-full sm:w-auto bg-[var(--accent-gold)] text-[#1a110b] hover:bg-[#cda472] rounded-full px-10 py-3 font-medium tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.5)] border border-[#A88054] transition-all duration-300 active:scale-95"
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}