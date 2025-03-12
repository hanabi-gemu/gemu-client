import { goldStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

function useGold() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const {
    data: gold,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["Gold", account.address],
    queryFn: async () => {
      const resp = await client.getOwnedObjects({
        owner: account.address,
        filter: {
          MatchAll: [{ StructType: goldStruct }],
        },
        options: {
          showContent: true,
        },
      });

      console.log(resp);

      return resp;
    },
  });

  return { gold, isLoading, refetch, isRefetching };
}

export default useGold;
