import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  startQuestId,
  goldManagerId,
  questManagerId,
  SUI_RANDOM_OBJECT_ID,
} from "@/smartContractInterface";
import usePlayer from "./usePlayer";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import useReceipt from "./useReceipt";

function useStartQuest(questId: string, slot: number) {
  const client = useSuiClient();
  const { player } = usePlayer();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const { refetch } = useReceipt();

  const startQuest = async (
    openAnimation?: VoidFunction,
    isInstant?: boolean
  ) => {
    try {
      const tx = new Transaction();
      console.log("Initializing startQuest transaction...");
      if (!player) return;
      console.log(player.id, "player.id");

      tx.moveCall({
        target: startQuestId,
        arguments: [
          tx.object(questManagerId), // manager: &Manager
          tx.object(player.id), // player: &mut Player
          tx.pure.u64(questId), // quest_id: u64
          tx.object(goldManagerId), // gold_manager: &mut GOLDManager
          tx.object(
            SUI_RANDOM_OBJECT_ID
          ), // random: &Random
          tx.object(SUI_CLOCK_OBJECT_ID), // clock: &Clock
          // The TxContext (ctx) is automatically handled by the Move runtime.
        ],
      });

      const { bytes, signature, reportTransactionEffects } =
        await signTransaction({
          transaction: tx,
          chain: "sui:testnet",
        });

      console.log("Transaction signed:", { bytes, signature });

      const executeResult = await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: { showRawEffects: true, showEffects: true },
      });

      console.log("Execution result:", executeResult);
      if (executeResult && executeResult.effects?.created && !isInstant) {
        const receiptId = executeResult.effects?.created[0].reference.objectId;
        if (typeof window !== "undefined") {
          sessionStorage.setItem(`quest_slot_${slot}_receipt_id`, receiptId);
          await refetch();
        }
      }

      if (isInstant && openAnimation) {
        openAnimation();
        await refetch();
      }

      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
    } catch (err) {
      console.error("Error during startQuest transaction:", err);
    }
  };

  return { startQuest };
}

export default useStartQuest;
