import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
    
interface ListeningRoomContextType {
  isListeningMode: boolean;
  toggleListeningMode: () => void;
}

const ListeningRoomContext = createContext<ListeningRoomContextType | undefined>(undefined);

export function ListeningRoomProvider({ children }: { children: ReactNode }) {
  const [isListeningMode, setIsListeningMode] = useState(false);

  const toggleListeningMode = () => setIsListeningMode((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes if the user is typing in a search input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsListeningMode((prev) => !prev);
      }
      if (e.key === 'Escape' && isListeningMode) {
        e.preventDefault();
        setIsListeningMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListeningMode]);

  return (
    <ListeningRoomContext.Provider value={{ isListeningMode, toggleListeningMode }}>
      {children}
    </ListeningRoomContext.Provider>
  );
}

export function useListeningRoom() {
  const context = useContext(ListeningRoomContext);
  if (context === undefined) {
    throw new Error('useListeningRoom must be used within a ListeningRoomProvider');
  }
  return context;
}