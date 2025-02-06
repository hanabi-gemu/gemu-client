import Spinner from "@/Components/Spinner";
import { truncateAddress } from "@/Utils/format";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Wallet: React.FC = () => {
  const account = useCurrentAccount();
  const client = useSuiClient();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (account?.address)
      try {
        await navigator.clipboard.writeText(account?.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
  };

  const { data: balance, isLoading } = useQuery({
    queryKey: ["wallet-balance", account?.address] as const,
    queryFn: async () => {
      if (!account) return null;
      const balance = await client.getBalance({
        owner: account.address,
      });
      return balance.totalBalance;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    enabled: !!account, // Only run query if we have an account
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Wallet</h1>
      <div className="mt-4">
        <div className="h-[70px]">
          <p className="font-bold">Address:</p>{" "}
          <p
            onClick={handleCopy}
            className="cursor-pointer hover:text-blue-400 flex transition-all ease-in-out duration-200"
          >
            {account?.address && truncateAddress(account?.address)}
          </p>
          {copied && <span className="text-blue-400">Copied!</span>}
        </div>
        <div>
          <span className="font-bold">Balance:</span> {balance}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
