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
    toast.success("Preferences saved successfully");
  };

  return (
    <div className="pb-8 xl:max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-white">Settings</h1>

      <div className="space-y-10">
        {/* Audio Quality Section */}
        <section>
          <h2 className="mb-4 border-b border-[hsl(var(--border))] pb-2 text-xl font-semibold text-white">
            Audio Quality
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-white">High Quality Streaming</span>
                <span className="text-sm text-[hsl(var(--text-muted))]">Stream music in 320kbps. Consumes more data.</span>
              </div>
              <Switch checked={highQuality} onChange={setHighQuality} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-white">Normalize Volume</span>
                <span className="text-sm text-[hsl(var(--text-muted))]">Set the same volume level for all tracks.</span>
              </div>
              <Switch checked={normalizeVolume} onChange={setNormalizeVolume} />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section>
          <h2 className="mb-4 border-b border-[hsl(var(--border))] pb-2 text-xl font-semibold text-white">
            Content & Playback
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-white">Allow Explicit Content</span>
                <span className="text-sm text-[hsl(var(--text-muted))]">Play tracks marked with explicit lyrics.</span>
              </div>
              <Switch checked={explicitContent} onChange={setExplicitContent} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-medium text-white">Hardware Acceleration</span>
                <span className="text-sm text-[hsl(var(--text-muted))]">Use GPU for smoother UI animations.</span>
              </div>
              <Switch checked={hardwareAcceleration} onChange={setHardwareAcceleration} />
            </div>
          </div>
        </section>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}