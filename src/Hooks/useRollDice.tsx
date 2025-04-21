import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  rollDicesId,
  SUI_RANDOM_OBJECT_ID,
  towerObjectId,
} from "@/smartContractInterface";
import usePlayer from "./usePlayer";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

function useRollDices() {
  const client = useSuiClient();
  const { player } = usePlayer();
  const { mutateAsync: signTransaction } = useSignTransaction();

  const rollDices = async (amount: number) => {
    try {
      const tx = new Transaction();
      console.log("Initializing rollDice transaction...");
      if (!player) return;
      console.log(player.id, "player.id");

      tx.moveCall({
        target: rollDicesId,
        arguments: [
          tx.object(towerObjectId), // manager: &Manager
          tx.object(player.id), // player: &mut Player
          tx.pure.u64(amount), // amount: u64
          tx.object(
            SUI_RANDOM_OBJECT_ID
          ), // random: &Random
          tx.object(SUI_CLOCK_OBJECT_ID), // clock: &Clock
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
      // Report transaction effects to the wallet and refresh any local state if needed.
      reportTransactionEffects(executeResult.rawEffects!.toString());
    } catch (err) {
      console.error("Error during startQuest transaction:", err);
    }
  };

  return { rollDices };
}

export default useRollDices;
