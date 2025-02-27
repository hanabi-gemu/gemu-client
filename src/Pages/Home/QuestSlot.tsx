import Modal from "@/Components/Modal";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { tw } from "@/Utils/tailwindIntel";
import { useState } from "react";
import QuestMenu from "./QuestMenu/QuestMenu";

function QuestSlot() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="border border-low-contrast w-[240px] h-[100px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center gap-y-2">
        <p className={Fonts.Headings.Title.Bold}>Quest Slot</p>
        <div
          onClick={() => setOpenModal(true)}
          className={`rounded-2xl p-3 px-6 flex justify-between items-center w-[170px] bg-shadow hover:bg-shadow2 ${Events.Hover}`}
        >
          <PlusIcon />
          <p className={Fonts.Headings.Subtitle.Book}>Add Quest</p>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        wrapperStyle={tw`bg-white p-5 rounded-3xl mt-16 w-[414px] h-fit`}
      >
        <QuestMenu />
      </Modal>
    </>
  );
}

export default QuestSlot;

const PlusIcon = ({ onClick }: { onClick?: VoidFunction }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M11 13.5701H5V11.5701H11V5.57007H13V11.5701H19V13.5701H13V19.5701H11V13.5701Z"
      fill="#3E3E3E"
    />
  </svg>
);
