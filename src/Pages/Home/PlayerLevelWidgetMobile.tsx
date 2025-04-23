import Modal from "@/Components/Modal";
import usePlayer from "@/Hooks/usePlayer";
import { Fonts } from "@/TwClassnames/Fonts";
import { useEffect, useState } from "react";
import { tw } from "@/Utils/tailwindIntel";
import LevelUpLayout from "./LevelUp/LevelUpLayoutMobile";
import useXp from "@/Hooks/useXp";

function PlayerLevelWidgetMobile() {
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
      <div className="bg-shadow p-2 flex rounded-2xl items-center gap-2 w-[111px] h-[49px] relative">
        {levels >= 1 && (
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
                style={{ width: `${percentage}%` }}
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
