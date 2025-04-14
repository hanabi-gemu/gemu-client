import { Fonts } from "@/TwClassnames/Fonts";
import usePlayer from "@/Hooks/usePlayer";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import { Events } from "@/TwClassnames/Events";
import { tw } from "@/Utils/tailwindIntel";
import LevelUpLayout from "../Home/LevelUp/LevelUpLayout";

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

function ProfileWidget() {
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
      <div className="p-1 flex rounded-3xl items-center bg-pip-blue-base border-pip-blue-dark w-[163px] gap-2 h-[48px] border-[2px]">
        <div className="rounded-full bg-pip-white w-[36px] h-[36px]"></div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div
              className={`${Fonts.Text.Paragraph.Bold} text-pip-white h-[21px]`}
            >
              Chris
            </div>
            {Number(player.xp) >= xpToLevelUp(Number(player.level), 1) && (
              <div
                className={`${Fonts.Text.Medium} text-bg-med bg-red-600 w-[12px] h-[12px] rounded-full 
								p-2 ${Events.Hover} hover:bg-red-400 flex items-center justify-center`}
                onClick={() => setOpenModal(true)}
              >
                !
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className={`${Fonts.Text.Book} text-pip-white opacity-80`}>
              {player.level}
            </div>
            <div className="flex items-center">
              {/* Level progress bar */}
              <div className="h-[10px] w-[56px] bg-pip-yellow-tint rounded-md">
                {/* Filled portion based on progressPercentage */}
                <div
                  className="h-[10px] bg-pip-yellow-base rounded-md"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-white p-8 rounded-3xl w-[480px] h-fit`}
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

export default ProfileWidget;
