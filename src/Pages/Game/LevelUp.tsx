import { Transaction } from "@mysten/sui/transactions";
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { gemuObjectAddress, levelUpAddress } from "@/smartContractInterface.ts";

function LevelUpPlayer() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;
  const { mutateAsync: signTransaction, error } = useSignTransaction();

  return (
    <div style={{ padding: 20 }}>
      <>
        <div>
          <button
            className="border p-2 rounded"
            onClick={async () => {
              try {
                const tx = new Transaction();
                console.log("Initializing transaction...");

                const xpAddress = "";
                const playerAddress = "";
                const gemuObject = tx.object(gemuObjectAddress);
                const xp = tx.object(xpAddress);
                const player = tx.object(playerAddress);
                tx.moveCall({
                  target: levelUpAddress,
                  arguments: [tx.object(gemuObjectAddress), player, xp],
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
                  options: {
                    showRawEffects: true,
                  },
                });

                console.log("Execution result:", executeResult);

                // Always report transaction effects to the wallet after execution
                reportTransactionEffects(executeResult.rawEffects!.toString());
              } catch (err) {
                console.error("Error during transaction:", err);
              }
            }}
          >
            Level up
          </button>
        </div>
        {error && <div>ERROR: {error?.message}</div>}
      </>
    </div>
  );
}

export default LevelUpPlayer;
