/* eslint-disable @typescript-eslint/no-explicit-any */
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

      function sumBalances(dataArray: any) {
        return dataArray.reduce((total: any, item: any) => {
          // Convert the balance to a number and add it to the running total
          return total + Number(item.data.content.fields.balance);
        }, 0);
      }

      const totalGold = sumBalances(resp.data);

      return totalGold;
    },
  });

  return { gold, isLoading, refetch, isRefetching };
}

export default useGold;
