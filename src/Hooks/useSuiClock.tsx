import { useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

function useSuiClock() {
  const client = useSuiClient();

  const { data, isLoading } = useQuery({
    queryKey: ["clock"],
    queryFn: async () => {
      const response = await client.getObject({
        id: "0x0000000000000000000000000000000000000000000000000000000000000006",
        options: {
          showContent: true,
        },
      });

      if (response.data?.content?.dataType === "moveObject") {
        const fields = response.data?.content.fields as {
          id: { id: string };
          timestamp_ms: string;
        };

        return fields.timestamp_ms;
      }
    },
    refetchInterval: 1000,
  });

  return { data, isLoading };
}

export default useSuiClock;
