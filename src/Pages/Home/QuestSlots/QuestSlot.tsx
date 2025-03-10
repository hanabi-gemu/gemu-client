import { useState, useEffect } from "react";
import useReceipt from "@/Hooks/useReceipt";
import QuestStateHandler from "./QuestStateHandler";

function QuestSlot({ slot }: { slot: number }) {
  const { receipts } = useReceipt();

  const questSlotKey = `quest_slot_${slot}`;
  const questSlotReceiptKey = `quest_slot_${slot}_receipt_id`;

  const [storedQuest, setStoredQuest] = useState(() =>
    sessionStorage.getItem(questSlotKey)
  );
  const [storedReceiptId, setStoredReceiptId] = useState(() =>
    sessionStorage.getItem(questSlotReceiptKey)
  );

  useEffect(() => {
    const checkStorage = () => {
      const newStoredQuest = sessionStorage.getItem(questSlotKey);
      const newStoredReceiptId = sessionStorage.getItem(questSlotReceiptKey);

      setStoredQuest((prev) => {
        if (prev !== newStoredQuest) {
          console.log(`Quest changed: ${prev} → ${newStoredQuest}`);
        }
        return newStoredQuest;
      });

      setStoredReceiptId((prev) => {
        if (prev !== newStoredReceiptId) {
          console.log(`Receipt changed: ${prev} → ${newStoredReceiptId}`);
        }
        return newStoredReceiptId;
      });
    };

    checkStorage(); // Run immediately
    const interval = setInterval(checkStorage, 1000); // Check every second

    return () => clearInterval(interval);
  }, [questSlotKey, questSlotReceiptKey]); // Removed storedQuest and storedReceiptId to avoid stale state issues

  // const savedQuest = quests.find(
  //   (quest) => quest.details.fields.quest_id === storedQuest
  // );

  const questReceipt = receipts?.find(
    (receipt) => receipt?.id.id === storedReceiptId
  );

  const currentTime = Date.now();
  const isQuestCompleted =
    questReceipt &&
    questReceipt.timestamp + questReceipt.duration > currentTime;

  return (
    <>
      <QuestStateHandler
        isQuestCompleted={isQuestCompleted ? isQuestCompleted : false}
        slot={slot}
        questId={storedQuest || undefined}
        receiptId={storedReceiptId || undefined}
      />
    </>
  );
}

export default QuestSlot;
