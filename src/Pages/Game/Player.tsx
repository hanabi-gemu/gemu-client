import Register from "@/Pages/Game/Register";
import GoHunting from "@/Pages/Game/GoHunting";
import LevelUp from "@/Pages/Game/LevelUp";
import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import useXP from "@/Hooks/useXP";
import useSuiClock from "@/Hooks/useSuiClock";
import ProgressBar from "@/Components/ProgressBar";
import avatarImage from "./avatar-img.jpeg";
import { useState } from "react";
import { truncateAddress } from "@/Utils/format";

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

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (player)
      try {
        await navigator.clipboard.writeText(player?.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
  };

  const { data } = useSuiClock();

  if (isLoadingPlayer || isLoadingXp || isRefetchingPlayer) {
    return <Spinner />;
  }
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
          <div className="flex justify-between p-2 flex-col md:flex-row md:p-10">
            <div className="flex flex-col">
              <div className="h-[80px] flex-col">
                <p className="font-semibold cursor-pointer">Player id:</p>
                <p
                  className="cursor-pointer hover:text-blue-400 flex transition-all ease-in-out duration-200"
                  onClick={handleCopy}
                >
                  {truncateAddress(player.id)}
                </p>
                {copied && <span className="text-blue-400">Copied!</span>}
              </div>
              <div>
                <p className="font-semibold">Player stats:</p> {player.level}
              </div>
              <div>
                <p className="font-semibold">Player stats:</p> {player.stats}
              </div>
              <div>
                <p className="font-semibold">Player energy:</p>{" "}
                {percentageOfMinutesElapsed(Date.now() - player.last_hunt_time)}
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
