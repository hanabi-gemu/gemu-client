/* eslint-disable @typescript-eslint/no-explicit-any */
import { receiptStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

export type Receipt = {
  duration: any;
  id: any;
  player_id: any;
  requirements: any;
  rewards: any;
  timestamp: any;
  quest_id: any;
};

function useReceipt() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const {
    data: receipts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["receipt"],
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
            quest_id: any;
          };

          const receipt: Receipt = {
            duration: data.duration,
            id: data.id,
            player_id: data.player_id,
            requirements: data.requirements,
            rewards: data.rewards,
            timestamp: data.timestamp,
            quest_id: data.quest_id,
          };
          return receipt;
        }
      });
    },
  });

  return { receipts, isLoading, refetch, isRefetching };
}

export default useReceipt;
