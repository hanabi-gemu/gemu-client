import { Transaction } from "@mysten/sui/transactions";
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import {
  gemuObjectAddress,
  goHuntingAddress,
} from "@/smartContractInterface.ts";
import usePlayer from "@/Hooks/usePlayer";
import useXP from "@/Hooks/useXP";

function GoHunting() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;
  const { player, refetch: refetchPlayer } = usePlayer();
  const { xp: existingXP, refetch: refetchXP } = useXP();
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

                const gemuObject = tx.object(gemuObjectAddress);
                console.log(gemuObjectAddress);
                console.log("Gemu object:", gemuObject);
                const playerObject = tx.object(player!.id);
                console.log("Player object:", playerObject);
                const clock = tx.object.clock();
                const [xp] = tx.moveCall({
                  target: goHuntingAddress,
                  arguments: [gemuObject, playerObject, clock],
                });

                if (existingXP) {
                  const existingXPObject = tx.object(existingXP.id);
                  tx.mergeCoins(existingXPObject, [xp]);
                } else {
                  tx.transferObjects([xp], account.address);
                }

                console.log("Transaction prepared:", tx);

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
                await refetchXP();
                await refetchPlayer();
              } catch (err) {
                console.error("Error during transaction:", err);
              }
            }}
          >
            Go Hunting
          </button>
        </div>
        {error && <div>ERROR: {error?.message}</div>}
      </>
    </div>
  );
}

export default GoHunting;
