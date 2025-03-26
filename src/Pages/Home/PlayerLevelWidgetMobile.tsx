import Modal from "@/Components/Modal";
import usePlayer from "@/Hooks/usePlayer";
import { Fonts } from "@/TwClassnames/Fonts";
import { useEffect, useState } from "react";
import { tw } from "@/Utils/tailwindIntel";
import LevelUpLayout from "./LevelUp/LevelUpLayoutMobile";

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

  const [openModal, setOpenModal] = useState(false);

  function calculateLevelUps(
    playerXP: number,
    currentLevel: number
  ): { levels: number; remainingXP: number } {
    let levelsGained = 0;
    let xpRemaining = playerXP;

    // Loop until the player doesn't have enough XP for the next level.
    while (xpRemaining >= xpToLevelUp(currentLevel + levelsGained, 1)) {
      const xpNeeded = xpToLevelUp(currentLevel + levelsGained, 1);
      xpRemaining -= xpNeeded;
      levelsGained++;
    }

    return { levels: levelsGained, remainingXP: xpRemaining };
  }

  useEffect(() => {
    if (!player) return;
    if (Number(player.xp) >= xpToLevelUp(Number(player.level), 1)) {
      setOpenModal(true);
    }
  }, [player]);
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

  const { levels } = calculateLevelUps(Number(player.xp), Number(player.level));

  return (
    <>
      <div className="bg-shadow p-2 flex rounded-2xl items-center gap-2 w-[111px] h-[49px] relative">
        {Number(player.xp) >= xpToLevelUp(Number(player.level), 1) && (
          <div
            className={`absolute bg-med-contrast rounded-full ${Fonts.Text.Small} text-bg-med w-[25px] h-[25px] 
				flex justify-center items-center right-[-10%] top-0`}
            onClick={() => setOpenModal(true)}
          >
            !
          </div>
        )}
        <div className="bg-low-contrast rounded-full w-[24px] h-[24px]"></div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-[4px]">
            <div className="subtitle-book">Level {player.level}</div>
            {/* level progress bar */}
            <div className="h-[10px] flex items-center w-[63px] relative">
              <div
                className="rounded-md bg-low-contrast h-[10px]"
                style={{ width: `${progressPercentage}%` }}
              ></div>
              <div className="h-[10px] bg-light-box rounded-r-md"></div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-white p-8 rounded-3xl mt-16 w-fit h-fit`}
      >
        <LevelUpLayout
          player={player}
          onSuccess={() => setOpenModal(false)}
          levels={levels}
        />
      </Modal>
    </>
  );
}

export default PlayerLevelWidgetMobile;
