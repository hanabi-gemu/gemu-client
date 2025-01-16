import { useSuiClientQuery } from "@mysten/dapp-kit";

function WalletTest({ address }: { address: string }) {
  const { data, isPending, error } = useSuiClientQuery("getOwnedObjects", {
    owner: address,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log(data, error);

  return (
    <>
      <div className="flex flex-col">
        <div className="text-lg">{address}</div>
      </div>
    </>
  );
}

export default WalletTest;
