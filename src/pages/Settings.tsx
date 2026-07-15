import { useState } from 'react';
import toast from 'react-hot-toast';
import { Switch } from '../components/ui/Switch';
import { Button } from '../components/ui/Button';

export default function Settings() {
  const [highQuality, setHighQuality] = useState(true);
  const [normalizeVolume, setNormalizeVolume] = useState(true);
  const [explicitContent, setExplicitContent] = useState(false);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);

  const handleSave = () => {
    toast.success("Studio preferences saved", {
      style: { background: 'var(--surface)', color: 'var(--accent-gold)' }
    });
  };

  return (
    <div className="pb-8 xl:max-w-4xl mx-auto">
      <h1 className="mb-10 font-serif text-4xl font-bold tracking-tight text-[var(--text-main)]">
        Studio Preferences
      </h1>

      <div className="space-y-8">
        {/* Audio Quality Section */}
        <section className="relative rounded-xl panel-wood p-8">
          {/* Brass Screws in the 4 corners */}
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <h2 className="mb-6 border-b border-[var(--border)]/30 pb-4 font-serif text-2xl font-semibold text-[var(--text-main)] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
            Audio Quality
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-[var(--text-main)]">High-Fidelity Streaming</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Stream lossless audio directly to your device.</span>
              </div>
              <Switch checked={highQuality} onChange={setHighQuality} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-[var(--text-main)]">Analog Volume Normalization</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Maintain a consistent warm volume across all tracks.</span>
              </div>
              <Switch checked={normalizeVolume} onChange={setNormalizeVolume} />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative rounded-xl panel-wood p-8">
          {/* Brass Screws in the 4 corners */}
          <div className="brass-screw top-3 left-3" />
          <div className="brass-screw top-3 right-3" />
          <div className="brass-screw bottom-3 left-3" />
          <div className="brass-screw bottom-3 right-3" />

          <h2 className="mb-6 border-b border-[var(--border)]/30 pb-4 font-serif text-2xl font-semibold text-[var(--text-main)] shadow-[0_1px_0_rgba(255,255,255,0.05)]">
            Content & Playback
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-[var(--text-main)]">Allow Explicit Content</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Play tracks marked with explicit lyrics.</span>
              </div>
              <Switch checked={explicitContent} onChange={setExplicitContent} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-[var(--text-main)]">Hardware Acceleration</span>
                <span className="text-sm font-light text-[var(--text-muted)]">Use GPU for smoother vinyl animations.</span>
              </div>
              <Switch checked={hardwareAcceleration} onChange={setHardwareAcceleration} />
            </div>
          </div>
        </section>

        <div className="pt-6 flex justify-end">
          <Button 
            onClick={handleSave} 
            className="w-full sm:w-auto bg-[var(--accent-gold)] text-[var(--background)] hover:bg-[var(--text-main)] rounded-full px-8 py-3 font-medium tracking-wide shadow-lg border border-[#A88054]"
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}