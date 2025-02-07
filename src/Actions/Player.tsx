type PlayerData = {
  player_id: string;
  level: number;
  xp: number;
};

export const fetchPlayers = async (): Promise<PlayerData[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_INDEX_API_ADDRESS}/players`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
