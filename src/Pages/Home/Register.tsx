import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import {
  playerObjectAddress,
  registerPlayerAddress,
} from "@/smartContractInterface";
import usePlayer from "@/Hooks/usePlayer";

function RegisterPlayer() {
  const client = useSuiClient();
  const { refetch } = usePlayer();
  const { mutateAsync: signTransaction, error } = useSignTransaction();

  const mintPlayer = async () => {
    try {
      const tx = new Transaction();
      console.log("Initializing transaction...");

      console.log(registerPlayerAddress);

      tx.moveCall({
        target: registerPlayerAddress,
        arguments: [tx.object(playerObjectAddress)],
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
        options: {
          showRawEffects: true,
        },
      });

      console.log("Execution result:", executeResult);

      // Always report transaction effects to the wallet after execution
      reportTransactionEffects(executeResult.rawEffects!.toString());
      refetch();
    } catch (err) {
      console.error("Error during transaction:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <>
        <div>
          <button className="border p-2 rounded" onClick={() => mintPlayer()}>
            Mint Player
          </button>
        </div>
        {error && <div>ERROR: {error.message}</div>}
      </>
    </div>
  );
}

export default RegisterPlayer;
