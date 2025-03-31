import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  goldManagerAddress,
  claimDailyRewardStruct,
  claimsAddress,
} from "@/smartContractInterface";
import usePlayer from "./usePlayer";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import useGold from "./useGold";

function useClaimDailyReward() {
  const client = useSuiClient();
  const { player, refetch } = usePlayer();
  const { refetch: refetchGold } = useGold();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const claimDailyReward = async () => {
    try {
      const tx = new Transaction();
      console.log("Initializing claimReceipt transaction...");
      if (!player) return;

      tx.moveCall({
        target: claimDailyRewardStruct,
        arguments: [
          tx.object(claimsAddress), // quest_id: u64
          tx.object(player.id), // player: &mut Player
          tx.object(goldManagerAddress), // gold_manager: &mut GOLDManager
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

      refetch();
      refetchGold();

      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
    } catch (err) {
      console.error("Error during claimReceipt transaction:", err);
    }
  };

  return { claimDailyReward };
}

export default useClaimDailyReward;
