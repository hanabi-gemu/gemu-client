import { useSuiClient } from "@mysten/dapp-kit";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";
import { useQuery } from "@tanstack/react-query";

function useSuiClock() {
  const client = useSuiClient();

  const { data, isLoading } = useQuery({
    queryKey: ["clock"],
    queryFn: async () => {
      const response = await client.getObject({
        id: SUI_CLOCK_OBJECT_ID,
        options: {
          showContent: true,
        },
      });

      if (response.data?.content?.dataType === "moveObject") {
        const fields = response.data?.content.fields as {
          id: { id: string };
          timestamp_ms: string;
        };

        return Number(fields.timestamp_ms);
      }
    },
    refetchInterval: 1000,
  });

  return { data, isLoading };
}

export default useSuiClock;
