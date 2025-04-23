import { ReactNode } from 'react';
import useFetchPlayer from '@/Hooks/useFetchPlayer';
import { PlayerContext } from '@/Types/PlayerContextType';

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { player, isLoading, refetch, isRefetching } = useFetchPlayer();

  if (!player) {
    return null;
  }

  return (
    <PlayerContext.Provider value={{ player, isLoading, refetch, isRefetching }}>
      {children}
    </PlayerContext.Provider>
  );
}
