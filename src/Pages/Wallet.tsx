import Spinner from "@/Components/Spinner";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

const Wallet: React.FC = () => {
  const account = useCurrentAccount();
  const client = useSuiClient();

  const { data: balance, isLoading } = useQuery({
    queryKey: ['wallet-balance', account?.address] as const,
    queryFn: async () => {
      if (!account) return null;
      const balance = await client.getBalance({
        owner: account.address
      });
      return balance.totalBalance;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Keep in cache for 10 minutes
    enabled: !!account,        // Only run query if we have an account
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Wallet</h1>
      <div className="mt-4">
        <div>
          <span className="font-bold">Address:</span> {account?.address}
        </div>
        <div>
          <span className="font-bold">Balance:</span> {balance}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
