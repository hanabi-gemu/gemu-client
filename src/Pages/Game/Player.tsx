import Register from "@/Pages/Game/Register";
import GoHunting from "@/Pages/Game/GoHunting";
//import LevelUp from "@/Pages/Game/LevelUp";
import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import useXP from "@/Hooks/useXP";

function percentageOfDayElapsed(seconds: number): number {
  if (seconds === 0) {
    return 100;
  }
  const totalSecondsInDay = 24 * 60 * 60; // 24 hours in seconds
  const percentage = (seconds / totalSecondsInDay) * 100;
  return Math.min(100, parseFloat(percentage.toFixed(2))); // Round to 2 decimal places
}

function Player() {
  const { player, isLoading: isLoadingPlayer } = usePlayer();
  const { xp, isLoading: isLoadingXp } = useXP();

  if (isLoadingPlayer || isLoadingXp) {
    return <Spinner />;
  }
  return (
    <>
      {player ? (
        <>
          <div>
            <strong>Player id:</strong> {player.id}
          </div>
          <div>
            <strong>Player stats:</strong> {player.level}
          </div>
          <div>
            <strong>Player stats:</strong> {player.stats}
          </div>
          <div>
            <strong>Player energy:</strong> {percentageOfDayElapsed(player.last_hunt_time.getSeconds())}
          </div>
          <div>
            <strong>XP:</strong> {xp && xp.balance || 0}
          </div>
          <GoHunting />
        </>
      ) : (
        <Register />
      )}
    </>
  );
}

export default Player;
