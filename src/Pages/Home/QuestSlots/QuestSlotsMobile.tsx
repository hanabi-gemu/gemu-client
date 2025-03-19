import QuestSlot from "./QuestSlot";

function QuestSlotsMobile() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-2 overflow-scroll w-[375px] pb-15 h-fit">
      <QuestSlot slot={1} />
      <QuestSlot slot={2} />
      <QuestSlot slot={3} />
    </div>
  );
}

export default QuestSlotsMobile;
