import Modal from "@/Components/Modal";
import useStartQuest from "@/Hooks/useStartQuest";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { tw } from "@/Utils/tailwindIntel";
import { useState } from "react";
import QuestMenu from "../QuestMenu/QuestMenu";
import { quests } from "@/Constants/Quests";
import AnimationModal from "./AnimationModal";
import chestIcon from "./chest.png";

const SlotWithQuest = ({
  slot,
  quest,
  refetch,
}: {
  slot: number;
  quest: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openAnimationModal, setOpenAnimationModal] = useState(false);
  const { startBoardQuest } = useStartQuest(quest, slot);

  const questItem = quests.find((q) => q.quest_id === quest);

  const startQuestHandler = async () => {
    if (questItem?.quest_type === "instant") {
      await startBoardQuest(() => setOpenAnimationModal(true), true);
    } else {
      await startBoardQuest();
    }
    await refetch();
  };

  const handleSwapQuest = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div
        className="w-[152px] h-[172px]
			border-[4px] border-pip-gray-200 bg-pip-white p-4
			backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
      >
        <img src={chestIcon} width={40} height={42} className="mb-2" />
        <p className={`${Fonts.pip.super_cartoon.h4} text-center text-sm`}>
          {questItem && questItem.name}
        </p>

        <div
          onClick={startQuestHandler}
          className={`bg-pip-yellow-base mt-2 rounded-lg py-[5px] text-center hover:bg-[#E6E6E6] ${Events.Hover} transition-all duration-300 ease-in-out
					w-[104px]	h-[30px] border-pip-yellow-dark border-[2px] relative flex items-center justify-center`}
        >
          <p className={`${Fonts.pip.body.small} text-pip-yellow-dark`}>
            Start Quest
          </p>
        </div>
        <div className={`${Events.Hover} mt-2`} onClick={handleSwapQuest}>
          <p className={`${Fonts.pip.body.small}`}>Swap</p>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-pip-white rounded-3xl mt-16 w-[720px] h-[768px]`}
      >
        <QuestMenu slot={slot} />
      </Modal>
      <Modal
        isOpen={openAnimationModal}
        closeModal={() => setOpenAnimationModal(false)}
        wrapperStyle={tw`bg-white rounded-3xl w-[480px] h-fit`}
      >
        {openAnimationModal && <AnimationModal questItem={questItem} />}
      </Modal>
    </>
  );
};

export default SlotWithQuest;
