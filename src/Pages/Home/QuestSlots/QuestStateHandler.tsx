import useReceipt from "@/Hooks/useReceipt";
import ClaimQuestSlot from "./ClaimQuestSlot";
import QuestInProgress from "./QuestInProgress";
import SlotWithQuest from "./SlotWithQuest";
import EmptyQuestSlot from "./EmptyQuestSlot";

function QuestStateHandler({
  isQuestCompleted,
  slot,
  receiptId,
  questId,
}: {
  isQuestCompleted: boolean;
  slot: number;
  receiptId?: string;
  questId?: string;
}) {
  console.log(isQuestCompleted, slot, receiptId, questId, "aaaaaaaaaaaaa");

  const { receipts } = useReceipt();

  console.log(receipts);

  const questReceipt = receipts?.find(
    (receipt) => receipt?.id.id === receiptId
  );

  return (
    <>
      {questId ? (
        receiptId ? (
          isQuestCompleted ? (
            <ClaimQuestSlot slot={slot} receiptId={receiptId} />
          ) : (
            questReceipt && (
              <QuestInProgress
                timestamp={questReceipt.timestamp}
                duration={questReceipt.duration}
              />
            )
          )
        ) : (
          questId && <SlotWithQuest slot={slot} quest={questId} />
        )
      ) : (
        <EmptyQuestSlot slot={slot} />
      )}
    </>
  );
}

export default QuestStateHandler;
