import useReceipt from "@/Hooks/useReceipt";
import ClaimQuestSlot from "./ClaimQuestSlot";
import QuestInProgress from "./QuestInProgress";
import SlotWithQuest from "./SlotWithQuest";
import EmptyQuestSlot from "./EmptyQuestSlot";
import Spinner from "@/Components/Spinner";

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
  const { receipts, isLoading, refetch } = useReceipt();

  const questReceipt = receipts?.find(
    (receipt) => receipt?.id.id === receiptId
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {questId ? (
        receiptId ? (
          isQuestCompleted ? (
            <ClaimQuestSlot slot={slot} receiptId={receiptId} />
          ) : (
            questReceipt && (
              <>
                <QuestInProgress
                  timestamp={questReceipt.timestamp}
                  duration={questReceipt.duration}
                  slot={slot}
                  receiptId={receiptId}
                />
              </>
            )
          )
        ) : (
          questId && (
            <SlotWithQuest slot={slot} quest={questId} refetch={refetch} />
          )
        )
      ) : (
        <EmptyQuestSlot slot={slot} />
      )}
    </>
  );
}

export default QuestStateHandler;
