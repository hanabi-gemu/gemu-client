import QuestSlot from "./QuestSlot";

function QuestSlots() {
  return (
    <div className="flex justify-between">
      <QuestSlot slot={1} />
      <QuestSlot slot={2} />
      <QuestSlot slot={3} />
    </div>
  );
}

export default QuestSlots;
