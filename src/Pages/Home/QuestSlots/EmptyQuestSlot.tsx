import Modal from "@/Components/Modal";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { tw } from "@/Utils/tailwindIntel";
import { useState } from "react";
import QuestMenu from "../QuestMenu/QuestMenu";
import useWindowWidth from "@/Hooks/useWindowWidth";
import PlusIcon from "./Union.png";

const EmptyQuestSlot = ({ slot }: { slot: number }) => {
  const [openModal, setOpenModal] = useState(false);
  const isMobile = useWindowWidth();

  return (
    <>
      {isMobile ? (
        <MobileSlot
          slot={slot}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      ) : (
        <DesktopSlot
          slot={slot}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default EmptyQuestSlot;

function DesktopSlot({
  slot,
  setOpenModal,
  openModal,
}: {
  slot: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className="w-[152px] h-[172px]
			border-[4px] border-pip-white bg-pip-dark-400 p-4
			backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center gap-y-2"
      >
        <div
          onClick={() => setOpenModal(true)}
          className={`rounded-2xl p-3 px-6 flex flex-col gap-y-[10px] items-center w-[170px] ${Events.Hover}`}
        >
          <img src={PlusIcon} className="w-[40px] h-[40px]" />
          <p className={`${Fonts.Headings.Subtitle.Book} text-pip-white`}>
            Add Quest
          </p>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-pip-white rounded-3xl mt-16 w-[720px] h-[768px]`}
      >
        <QuestMenu slot={slot} />
      </Modal>
    </>
  );
}

function MobileSlot({
  slot,
  setOpenModal,
  openModal,
}: {
  slot: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        className={`bg-shadow hover:bg-shadow2 ${Events.Hover} min-w-[110px] h-[99px] backdrop-blur-lg rounded-2xl flex flex-col 
			justify-center items-center gap-y-2 p-4`}
      >
        <p className={Fonts.Text.Medium}>Quest Slot</p>
        <div
          onClick={() => setOpenModal(true)}
          className={`rounded-2xl flex justify-center bg-high items-center w-[27px] h-[27px]`}
        >
          {/* <PlusIcon /> */}
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
}
