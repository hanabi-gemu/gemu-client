import Modal from "@/Components/Modal";
import usePlayer from "@/Hooks/usePlayer";
import { tw } from "@/Utils/tailwindIntel";
import { useEffect, useState } from "react";
import LevelUpLayout from "./LevelUp/LevelUpLayout";
import { Fonts } from "@/TwClassnames/Fonts";
import { Events } from "@/TwClassnames/Events";
import useXp from "@/Hooks/useXp";

function PlayerLevelWidget() {
  const { player } = usePlayer();
  const [openModal, setOpenModal] = useState(false);

  const {percentage, levels} = useXp(player.level, player.xp);

  useEffect(() => {
    if (levels >= 1) {
      setOpenModal(true);
    }
  }, [player, levels]);

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
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        {levels >= 1 && (
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
