import { getFullnodeUrl, MoveValue, SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client';
import { useEffect, useState } from 'react';

function isMoveObject(data: SuiParsedData | null | undefined): data is Extract<SuiParsedData, { dataType: 'moveObject' }> {
  return data?.dataType === 'moveObject';
}

// Set the RPC URL to connect to the Sui mainnet
const rpcUrl = getFullnodeUrl("testnet");

const client = new SuiClient({ url: rpcUrl });
function WalletTest({ address }: { address: string }) {
  const [object, setObject] = useState<SuiObjectData | null | undefined>();

  const getPlayer = async (address: string) => {
    let resp = await client.getOwnedObjects({
      owner: address,
      filter: {
        MatchAll: [{ StructType: "0x6d3f210eb0081c4c93456f471ab122c113191b3083612b6ea0e4f49d57209562::gemu::Player" }]
      },
      options: {
        showContent: true
      }
    });
    return setObject(resp.data[0].data);
  }

  function isKeyedMoveValueObject(obj: unknown): obj is { [key: string]: MoveValue } {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  }

  const getFields = (object: SuiParsedData | null | undefined) => {
    let fields: { key: string; value: MoveValue }[] = []; // Collect key-value pairs

    if (isMoveObject(object) && isKeyedMoveValueObject(object.fields)) {
      // Iterate over the keys and push them with values
      Object.entries(object.fields).forEach(([key, value]) => {
        fields.push({ key, value });
      });
    }

    return fields; // Return the collected fields
  };

  useEffect(
    () => {
      if (!object) {
        getPlayer(address)
      }
    }, []);

  const fields = object ? getFields(object.content) : [];

  return (
    <>
      {fields.length > 0 ? (
        fields.map(({ key, value }) => (
          <div key={key}>
            <strong>{key}</strong>: {JSON.stringify(value)}
          </div>
        ))
      ) : (
        <p>No fields available</p>
      )}
    </>
  );
}

export default WalletTest
