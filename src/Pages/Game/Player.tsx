import Register from "@/Pages/Game/Register";
import GoHunting from "@/Pages/Game/GoHunting";
import LevelUp from "@/Pages/Game/LevelUp";
import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import useXP from "@/Hooks/useXP";
import useSuiClock from "@/Hooks/useSuiClock";
import ProgressBar from "@/Components/ProgressBar";

function percentageOfMinutesElapsed(milliseconds: number): number {
  if (milliseconds === 0) {
    return 100;
  }
  const totalMillisecondInAMinute = 60000;
  const percentage = (milliseconds / totalMillisecondInAMinute) * 100;
  return Math.min(100, parseFloat(percentage.toFixed(2))); // Round to 2 decimal places
}

function Player() {
  const {
    player,
    isLoading: isLoadingPlayer,
    isRefetching: isRefetchingPlayer,
  } = usePlayer();
  const { isLoading: isLoadingXp } = useXP();

  const { data } = useSuiClock();

  console.log("CLOCk", data);

  // Fix percentageOfMinutesElapsed, algo raro pasa con los timestamps
  // habria que debuggear que onda las dos fechas
  if (isLoadingPlayer || isLoadingXp || isRefetchingPlayer) {
    return <Spinner />;
  }
  console.log("Last hunt time:", player?.last_hunt_time);
  console.log("Current time:", Date.now());
  console.log(
    "Time difference:",
    Date.now() - ((player && player.last_hunt_time) || 0)
  );
  return (
    <>
      {player ? (
        <>
          <div className="flex">
            <ProgressBar
              currentTimeStamp={Number(data)}
              lastActionTimeStamp={player.last_hunt_time}
              period={60000}
            />
          </div>
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
            <strong>Player energy:</strong>{" "}
            {percentageOfMinutesElapsed(Date.now() - player.last_hunt_time)}
          </div>
          <GoHunting />
          <LevelUp />
        </>
      ) : (
        <Register />
      )}
    </>
  );
}

export default Player;
