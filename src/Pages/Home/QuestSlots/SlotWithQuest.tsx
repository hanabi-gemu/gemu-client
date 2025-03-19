import Modal from "@/Components/Modal";
import useStartQuest from "@/Hooks/useStartQuest";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { tw } from "@/Utils/tailwindIntel";
import { useState } from "react";
import QuestMenu from "../QuestMenu/QuestMenu";

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
  const { startBoardQuest } = useStartQuest(quest, slot);

  const startQuestHandler = async () => {
    await startBoardQuest();
    await refetch();
  };

  const handleSwapQuest = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="border border-low-contrast w-[260px] h-[120px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center gap-y-2">
        <div className="flex gap-2">
          <p className={Fonts.Headings.Title.Bold}>Quest Slot</p>
          <p className={Fonts.Headings.Title.Bold}>Quest {quest}</p>
        </div>
        <div
          onClick={startQuestHandler}
          className={`rounded-2xl p-3 px-6 flex justify-center items-center w-[180px] bg-shadow hover:bg-shadow2 ${Events.Hover}`}
        >
          <p className={Fonts.Headings.Subtitle.Book}>Start Quest!</p>
        </div>
        <div
          className={Events.Hover + "w-[24px] h-[24px]"}
          onClick={handleSwapQuest}
        >
          <SwapIcon />
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-white p-5 rounded-3xl mt-16 w-[414px] h-fit`}
      >
        <QuestMenu slot={slot} />
      </Modal>
    </>
  );
};

export default SlotWithQuest;

function SwapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M6.32578 16.5105L8.20078 18.3855C8.38411 18.5689 8.47578 18.798 8.47578 19.073C8.47578 19.348 8.38411 19.5855 8.20078 19.7855C8.00078 19.9855 7.76328 20.0855 7.48828 20.0855C7.21328 20.0855 6.97578 19.9855 6.77578 19.7855L3.20078 16.2105C3.10078 16.1105 3.02995 16.0022 2.98828 15.8855C2.94661 15.7689 2.92578 15.6439 2.92578 15.5105C2.92578 15.3772 2.94661 15.2522 2.98828 15.1355C3.02995 15.0189 3.10078 14.9105 3.20078 14.8105L6.80078 11.2105C7.00078 11.0105 7.23411 10.9147 7.50078 10.923C7.76745 10.9314 8.00078 11.0355 8.20078 11.2355C8.38411 11.4355 8.47995 11.6689 8.48828 11.9355C8.49661 12.2022 8.40078 12.4355 8.20078 12.6355L6.32578 14.5105H12.5008C12.7841 14.5105 13.0216 14.6064 13.2133 14.798C13.4049 14.9897 13.5008 15.2272 13.5008 15.5105C13.5008 15.7939 13.4049 16.0314 13.2133 16.223C13.0216 16.4147 12.7841 16.5105 12.5008 16.5105H6.32578ZM18.6758 10.5105H12.5008C12.2174 10.5105 11.9799 10.4147 11.7883 10.223C11.5966 10.0314 11.5008 9.79388 11.5008 9.51055C11.5008 9.22721 11.5966 8.98971 11.7883 8.79805C11.9799 8.60638 12.2174 8.51055 12.5008 8.51055H18.6758L16.8008 6.63555C16.6174 6.45221 16.5258 6.22305 16.5258 5.94805C16.5258 5.67305 16.6174 5.43555 16.8008 5.23555C17.0008 5.03555 17.2383 4.93555 17.5133 4.93555C17.7883 4.93555 18.0258 5.03555 18.2258 5.23555L21.8008 8.81055C21.9008 8.91055 21.9716 9.01888 22.0133 9.13555C22.0549 9.25221 22.0758 9.37721 22.0758 9.51055C22.0758 9.64388 22.0549 9.76888 22.0133 9.88555C21.9716 10.0022 21.9008 10.1105 21.8008 10.2105L18.2008 13.8105C18.0008 14.0105 17.7674 14.1064 17.5008 14.098C17.2341 14.0897 17.0008 13.9855 16.8008 13.7855C16.6174 13.5855 16.5216 13.3522 16.5133 13.0855C16.5049 12.8189 16.6008 12.5855 16.8008 12.3855L18.6758 10.5105Z"
        fill="#1D1D1D"
        className={
          Events.Hover + "fill-high-contrast hover:fill-high-contrast2"
        }
      />
    </svg>
  );
}
