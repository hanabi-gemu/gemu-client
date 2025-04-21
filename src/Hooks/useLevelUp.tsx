import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import { levelUpId } from "@/smartContractInterface";
import usePlayer from "./usePlayer";

function useLevelUp() {
  const client = useSuiClient();
  const { player, refetch } = usePlayer();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const levelUp = async (
    stats: {
      saltiness: string;
      sourness: string;
      sweetness: string;
      spicy: string;
    },
    levelCount: number
  ) => {
    try {
      const tx = new Transaction();
      console.log("Initializing levelUp transaction...");
      console.log(player?.id);
      if (!player) return;

      console.log(levelCount, "levelCount");

      tx.moveCall({
        target: levelUpId,
        arguments: [
          tx.object(player.id),
          tx.pure.u64(levelCount),
          tx.pure.u64(stats.saltiness),
          tx.pure.u64(stats.sourness),
          tx.pure.u64(stats.sweetness),
          tx.pure.u64(stats.spicy),
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
        options: { showRawEffects: true },
      });

      console.log("Execution result:", executeResult);

      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
      await refetch();
    } catch (err) {
      console.error("Error during level up transaction:", err);
    }
  };

  return { levelUp };
}

export default useLevelUp;
