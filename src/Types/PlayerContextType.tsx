import { createContext } from 'react';
import { Player } from '@/Hooks/useFetchPlayer';

export type PlayerContextType = {
  player: Player;
  isLoading: boolean;
  refetch: () => void;
  isRefetching: boolean;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);
