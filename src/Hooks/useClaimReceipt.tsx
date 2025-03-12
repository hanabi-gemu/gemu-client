import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  goldManagerAddress,
  claimReceiptStruct,
} from "@/smartContractInterface";
import usePlayer from "./usePlayer";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

function useClaimReceipt(receiptId: string, slot: number) {
  const client = useSuiClient();
  const { player, refetch } = usePlayer();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const claimReceipt = async () => {
    try {
      const tx = new Transaction();
      console.log("Initializing claimReceipt transaction...");
      if (!player) return;

      tx.moveCall({
        target: claimReceiptStruct,
        arguments: [
          tx.object(receiptId), // quest_id: u64
          tx.object(player.id), // player: &mut Player
          tx.object(goldManagerAddress), // gold_manager: &mut GOLDManager
          tx.object(
            "0x0000000000000000000000000000000000000000000000000000000000000008"
          ), // random: &Random
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
        options: { showRawEffects: true, showEffects: true },
      });

      console.log("Execution result:", executeResult);
      if (executeResult && executeResult.effects?.deleted) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(`quest_slot_${slot}_receipt_id`);
          refetch();
        }
      }

      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
    } catch (err) {
      console.error("Error during claimReceipt transaction:", err);
    }
  };

  return { claimReceipt };
}

export default useClaimReceipt;
