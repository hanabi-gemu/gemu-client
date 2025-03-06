import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  startBoardQuestAddress,
  goldManagerAddress,
  questManagerAddress,
} from "@/smartContractInterface";
import usePlayer from "./usePlayer";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

function useStartQuest(questId: string) {
  const client = useSuiClient();
  const { player } = usePlayer();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const startBoardQuest = async () => {
    try {
      const tx = new Transaction();
      console.log("Initializing startBoardQuest transaction...");
      if (!player) return;

      console.log(questManagerAddress, player.id, questId);

      tx.moveCall({
        target: startBoardQuestAddress,
        arguments: [
          tx.object(questManagerAddress), // manager: &Manager
          tx.object(player.id), // player: &mut Player
          tx.pure.u64(questId), // quest_id: u64
          tx.object(goldManagerAddress), // gold_manager: &mut GOLDManager
          tx.object(tx.object.random()), // random: &Random
          tx.object(SUI_CLOCK_OBJECT_ID), // clock: &Clock
          // The TxContext (ctx) is automatically handled by the Move runtime.
        ],
      });

      const { bytes, signature, reportTransactionEffects } =
        await signTransaction({
          transaction: tx,
          chain: "sui:devnet",
        });

      console.log("Transaction signed:", { bytes, signature });

      const executeResult = await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: { showRawEffects: true },
      });

      console.log("Execution result:", executeResult);

      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
    } catch (err) {
      console.error("Error during startBoardQuest transaction:", err);
    }
  };

  return { startBoardQuest };
}

export default useStartQuest;
