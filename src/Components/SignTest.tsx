import { Transaction } from "@mysten/sui/transactions";
import { useSignTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";

const gemu_address =
  "0x6d3f210eb0081c4c93456f471ab122c113191b3083612b6ea0e4f49d57209562";

const gemu =
  "0xc218372fbdb2a41b7a501178c5582024ad8e6194aa3448d561655d91b916273c";

function SignTest({ address }: { address: string }) {
  const { mutateAsync: signTransaction, error } = useSignTransaction();
  const [signature, setSignature] = useState("");
  const client = useSuiClient();

  return (
    <div style={{ padding: 20 }}>
      <>
        <div>
          <button
            className="border p-2 rounded"
            onClick={async () => {
              const tx = new Transaction();

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

              const executeResult = await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                  showRawEffects: true,
                },
              });

              // Always report transaction effects to the wallet after execution
              reportTransactionEffects(executeResult.rawEffects!);
              setSignature(signature);

              console.log(executeResult);
            }}
          >
            Sign empty transaction
          </button>
        </div>
        <div>Signature: {signature}</div>
        <div>ERROR: {error?.message}</div>
      </>
    </div>
  );
}

export default SignTest;
