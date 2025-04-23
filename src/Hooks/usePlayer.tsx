import { useContext } from 'react';
import { PlayerContext, PlayerContextType } from '@/Types/PlayerContextType';

export default function usePlayer(): PlayerContextType {
  const context = useContext(PlayerContext);
  if (context === null) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
