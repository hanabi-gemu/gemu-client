/* eslint-disable @typescript-eslint/no-explicit-any */
import { receiptStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

function useReceipt() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const {
    data: receipts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["receipt", account.address],
    queryFn: async () => {
      const resp = await client.getOwnedObjects({
        owner: account.address,
        filter: {
          MatchAll: [{ StructType: receiptStruct }],
        },
        options: {
          showContent: true,
        },
      });

      return resp.data.map((item) => {
        if (
          item &&
          item.data &&
          item.data.content &&
          "fields" in item.data.content
        ) {
          const data = item.data.content.fields as {
            duration: any;
            id: any;
            player_id: any;
            requirements: any;
            rewards: any;
            timestamp: any;
          };

          const { duration, id, player_id, requirements, rewards, timestamp } =
            data;
          return { duration, id, player_id, requirements, rewards, timestamp };
        }
      });
    },
    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { receipts, isLoading, refetch, isRefetching };
}

export default useReceipt;
