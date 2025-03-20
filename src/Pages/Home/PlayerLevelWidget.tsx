import usePlayer from "@/Hooks/usePlayer";

// Helper function: calculates the sum of squares.
function sumSquares(n: number) {
  return (n * (n + 1) * (2 * n + 1)) / 6;
}

// Constants for XP calculation.
const BASE_REQUIRED_XP_TO_LVL_UP = 10000;
const XP_MULTIPLIER = 500;

// Calculates the XP needed to level up given a starting level and desired levels to gain.
function xpToLevelUp(startLevel: number, levelsToGain: number) {
  const sumStart = sumSquares(startLevel - 1);
  const sumTarget = sumSquares(startLevel + levelsToGain - 1);
  return (
    levelsToGain * BASE_REQUIRED_XP_TO_LVL_UP +
    XP_MULTIPLIER * (sumTarget - sumStart)
  );
}

function PlayerLevelWidget() {
  const { player } = usePlayer();

  if (!player) return null;

  // Calculate the XP required to go from the current level to the next.
  const xpForNextLevel = xpToLevelUp(Number(player.level), 1);
  // Calculate progress percentage: current XP relative to xpForNextLevel.
  const progressPercentage = Math.min(
    (Number(player.xp) / xpForNextLevel) * 100,
    100
  );
  // Optionally, calculate the remaining XP needed.
  // const remainingXp = xpForNextLevel - Number(player.xp);

  return (
    <div className="bg-shadow p-6 py-0 flex rounded-3xl items-center gap-[16px] w-[391px] h-[74px]">
      <div className="bg-[rgba(111,_111,_111,_1)] rounded-full w-[45px] h-[45px]"></div>
      <div className="flex flex-col">
        {/* <div className="title-bold">{truncateAddress(player.id)}</div> */}
        <div className="flex items-center gap-[16px]">
          <div className="subtitle-book">Level {player.level}</div>
          {/* Level progress bar */}
          <div className="h-[10px] w-[150px] relative bg-light-box rounded-md">
            {/* Filled portion based on progressPercentage */}
            <div
              className="h-[10px] bg-low-contrast rounded-md"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            {/* {isRefetching ? (
              <div className="w-[10px] h-[10px] absolute top-[10px]">
                <SpinnerSmall />
              </div>
            ) : (
              <p className="absolute top-[10px] text-sm">EXP: {player.xp}</p>
            )} */}
          </div>
        </div>
        {/* <div className="mt-2">
          <p className="text-sm">XP to Level Up: {xpForNextLevel}</p>
          <p className="text-sm">Remaining XP: {remainingXp}</p>
        </div> */}
      </div>
    </div>
  );
}

export default PlayerLevelWidget;
