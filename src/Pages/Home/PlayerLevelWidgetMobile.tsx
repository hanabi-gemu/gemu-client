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

function PlayerLevelWidgetMobile() {
  const { player } = usePlayer();

  if (!player) return false;

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
    <div className="bg-shadow p-2 flex rounded-2xl items-center gap-2 w-[111px] h-[49px]">
      <div className="bg-low-contrast rounded-full w-[24px] h-[24px]"></div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[4px]">
          <div className="subtitle-book">Level {player.level}</div>
          {/* level progress bar */}
          <div className="h-[10px] flex items-center w-[63px] relative">
            <div
              className="rounded-md bg-low-contrast h-[10px] w-[56%]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <div className="h-[10px] bg-light-box w-[44%] rounded-r-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerLevelWidgetMobile;
