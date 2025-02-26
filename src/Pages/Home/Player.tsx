import Register from "@/Pages/Home/Register";
import GoHunting from "@/Pages/Home/GoHunting";
import LevelUp from "@/Pages/Home/LevelUp";
import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import useXP from "@/Hooks/useXP";
import avatarImage from "./avatar-img.jpeg";
import StatBox from "./StatBox";

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

  if (isLoadingPlayer || isLoadingXp || isRefetchingPlayer) {
    return <Spinner />;
  }
  return (
    <>
      {player ? (
        <>
          <div className="flex justify-between p-2 flex-col md:flex-row md:p-10">
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {Object.entries(player.stats).map(([key, value]) => (
                    <StatBox stat={key} value={value} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold">Player energy:</p>{" "}
                {Number.isNaN(player.last_energy_update)
                  ? 0
                  : percentageOfMinutesElapsed(
                      Date.now() - player.last_energy_update
                    )}
              </div>
              <div className="flex">
                <GoHunting />
                <LevelUp />
              </div>
            </div>
            <img src={avatarImage} />
          </div>
        </>
      ) : (
        <Register />
      )}
    </>
  );
}

export default Player;
