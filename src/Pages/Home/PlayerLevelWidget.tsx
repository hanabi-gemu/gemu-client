import Modal from "@/Components/Modal";
import usePlayer from "@/Hooks/usePlayer";
import { tw } from "@/Utils/tailwindIntel";
import { useEffect, useState } from "react";
import LevelUpLayout from "./LevelUp/LevelUpLayout";
import { Fonts } from "@/TwClassnames/Fonts";
import { Events } from "@/TwClassnames/Events";

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
  const [openModal, setOpenModal] = useState(false);

  console.log(player?.xp);

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
  const { levels } = calculateLevelUps(Number(player.xp), Number(player.level));

  return (
    <>
      <div className="bg-shadow p-6 py-0 flex rounded-3xl items-center gap-[16px] w-fit h-[74px]">
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
            </div>
          </div>
        </div>
        {Number(player.xp) >= xpToLevelUp(Number(player.level), 1) && (
          <div
            className={`${Fonts.Text.Medium} text-bg-med bg-contrast rounded-[48px] p-2 ${Events.Hover} hover:bg-contrast2`}
            onClick={() => setOpenModal(true)}
          >
            Level Up
          </div>
        )}
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

export default PlayerLevelWidget;
