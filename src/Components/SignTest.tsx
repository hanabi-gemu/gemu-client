import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction } from "@mysten/dapp-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

const gemu_address =
  "0x6d3f210eb0081c4c93456f471ab122c113191b3083612b6ea0e4f49d57209562";

const gemu = "c218372fbdb2a41b7a501178c5582024ad8e6194aa3448d561655d91b916273c";
const rpcUrl = getFullnodeUrl("testnet");

const client = new SuiClient({ url: rpcUrl });

function SignTest({ address }: { address: string }) {
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

                const [player] = tx.moveCall({
                  target: `${gemu_address}::gemu::register_player`,
                  arguments: [tx.object(gemu)],
                });

                tx.transferObjects([player], address);

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
            Mint Player
          </button>
        </div>
        <div>ERROR: {error?.message}</div>
      </>
    </div>
  );
}

export default SignTest;
