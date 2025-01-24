import { Transaction } from "@mysten/sui/transactions";
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { gemuObjectAddress, levelUpAddress } from "@/smartContractInterface.ts";
import useXP from "@/Hooks/useXP";
import usePlayer from "@/Hooks/usePlayer";

function LevelUpPlayer() {
  const client = useSuiClient();
  const {xp} = useXP();
  const {player} = usePlayer();
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

                const xpAddress = xp!.id;
                const playerAddress = player!.id;
                const gemuObject = tx.object(gemuObjectAddress);
                const xpObject = tx.object(xpAddress);
                const playerObject = tx.object(playerAddress);
                const required_xp_to_level_up = player!.required_xp_to_level_up;
                const [xpPayment] = tx.splitCoins(xpObject, [required_xp_to_level_up]);
                tx.moveCall({
                  target: levelUpAddress,
                  arguments: [gemuObject, playerObject, xpPayment],
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
