import Register from "@/Pages/Game/Register";
import LevelUp from "@/Pages/Game/LevelUp";
import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";

type PlayerState = {
  level: number;
};

function isValidPlayerState(player: PlayerState): boolean {
  return player.level !== -1;
}

function Player() {
  const { player, isLoading } = usePlayer();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {player && isValidPlayerState(player) ? (
        <div>
          <strong>Player level:</strong> {player.level}
        </div>
      ) : (
        <Register />
      )}
    </>
  );
}

export default Player;
