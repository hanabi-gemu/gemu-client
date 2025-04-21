import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  goldManagerId,
  claimDailyRewardStruct,
  claimsId,
} from "@/smartContractInterface";
import usePlayer from "./usePlayer";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import useGold from "./useGold";
import useGetClaims from "./useGetClaims";

function useClaimDailyReward() {
  const client = useSuiClient();
  const { player, refetch } = usePlayer();
  const { refetch: refetchGold } = useGold();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const { refetch: refetchClaims } = useGetClaims();

  const claimDailyReward = async () => {
    try {
      const tx = new Transaction();
      console.log("Initializing claimReceipt transaction...");
      if (!player) return;

      tx.moveCall({
        target: claimDailyRewardStruct,
        arguments: [
          tx.object(claimsId), // quest_id: u64
          tx.object(player.id), // player: &mut Player
          tx.object(goldManagerId), // gold_manager: &mut GOLDManager
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
      refetchClaims();

      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
    } catch (err) {
      console.error("Error during claimReceipt transaction:", err);
    }
  };

  return { claimDailyReward };
}

export default useClaimDailyReward;
