import { Fonts } from "@/TwClassnames/Fonts";
import usePlayer from "@/Hooks/usePlayer";
import useXp from "@/Hooks/useXp";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import { Events } from "@/TwClassnames/Events";
import { tw } from "@/Utils/tailwindIntel";
import LevelUpLayout from "../Home/LevelUp/LevelUpLayout";

function ProfileWidget() {
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
      <div className="p-1 flex rounded-3xl items-center bg-pip-blue-base border-pip-blue-dark w-[163px] gap-2 h-[48px] border-[2px]">
        <div className="rounded-full bg-pip-white w-[36px] h-[36px]"></div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div
              className={`${Fonts.Text.Paragraph.Bold} text-pip-white h-[21px]`}
            >
              Chris
            </div>
            {levels >= 1 && (
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
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-white p-8 rounded-3xl w-[488px] h-fit`}
      >
        <LevelUpLayout
          player={player}
          onSuccess={() => setOpenModal(false)}
          levels={levels}
          percentage={percentage}
        />
      </Modal>
    </>
  );
}

export default ProfileWidget;
