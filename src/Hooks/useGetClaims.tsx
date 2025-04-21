import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import usePlayer from "./usePlayer";
import { claimsId } from "@/smartContractInterface";

interface ClaimFields {
  streak: string;
  timestamp: string;
}

interface DynamicFieldContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  fields: {
    value: {
      fields: ClaimFields;
    };
  };
}

interface ClaimsObjectContent {
  dataType: "moveObject";
  fields: {
    registry: {
      fields: {
        id: {
          id: string;
        };
      };
    };
  };
}

interface GetObjectResponse {
  data?: {
    content?: ClaimsObjectContent;
  };
}

interface DynamicFieldObject {
  data: {
    content?: {
      dataType: "moveObject";
      fields: DynamicFieldContent;
    };
  };
}

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
      // Inside the queryFn:
      const resp = (await client.getObject({
        id: claimsId,
        options: { showContent: true },
      })) as unknown as GetObjectResponse; // Type assertion

      if (!player) return null;

      // Extract the registry ID from the response
      const registryId = resp.data?.content?.fields.registry.fields.id.id;

      if (!registryId || !player) return null;

      // Now use the dynamic registry ID to get the claim
      const claimData = (await client.getDynamicFieldObject({
        parentId: registryId, // Use the dynamically fetched ID here
        name: { type: "0x2::object::ID", value: player.id },
      })) as unknown as DynamicFieldObject;

      // Use optional chaining and type guards to safely access fields
      if (claimData.data?.content?.dataType === "moveObject") {
        return claimData.data.content.fields.value.fields;
      }

      return null;
    },
  });

  return { claims, isLoading, refetch, isRefetching };
}

export default useGetClaims;
