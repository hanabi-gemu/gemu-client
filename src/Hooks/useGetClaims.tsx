import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import usePlayer from "./usePlayer";

function useGetClaims() {
  const client = useSuiClient();
  const { player } = usePlayer();
  const account = useCurrentAccount()!;

  const {
    data: claims,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["claim", account.address],
    queryFn: async () => {
      const resp = await client.getObject({
        id: "0x1ff4188dc7ebf46bee99ab197a572a5fb2bca9e6ff6669141f06024611aaf6f2",
        options: {
          showContent: true,
        },
      });

      if (!player) return null;

      const claimData = await client.getDynamicFieldObject({
        parentId:
          "0x1b7ded573080ad6d7df9b16104c75989730d534209e6d6dadd10b9c07f608359",
        name: { type: "0x2::object::ID", value: player.id },
      });

      return claimData;
    },
  });

  return { claims, isLoading, refetch, isRefetching };
}

export default useGetClaims;
