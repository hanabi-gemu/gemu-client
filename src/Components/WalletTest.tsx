import { useSuiClientQuery } from "@mysten/dapp-kit";

function WalletTest({ address }: { address: string }) {
  const { data, isPending, error } = useSuiClientQuery("getOwnedObjects", {
    owner: address,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log(data, error);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default WalletTest;
