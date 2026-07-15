import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';

export function MainLayout() {
  return (
    <div className="flex h-screen w-full flex-col bg-[hsl(var(--background))] text-[hsl(var(--text-main))] overflow-hidden">
      
      {/* Top Section: Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-[hsl(var(--surface))] to-[hsl(var(--background))]">
          <TopBar />
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-24 pt-6 custom-scrollbar">
            <Outlet /> {/* Child routes render here */}
          </div>
        </main>
      </div>

      {/* Bottom Section: Music Player Placeholder */}
      <div className="absolute bottom-0 z-50 h-[90px] w-full border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-lg flex items-center justify-center text-[hsl(var(--text-muted))]">
        <p className="text-sm font-medium">Player UI will go here</p>
      </div>

    </div>
  );
}