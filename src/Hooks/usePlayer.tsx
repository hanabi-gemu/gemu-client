import { playerStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

type Materials = {
  type: string;
  fields: {
    id: {
      id: string;
    };
    size: string;
  };
};

type Stats = {
  bitterness: string;
  saltiness: string;
  sourness: string;
  sweetness: string;
  umami: string;
};

type Player = {
  id: string;
  energy: string;
  last_energy_update: string;
  mana: string;
  materials: Materials;
  max_energy: string;
  max_mana: string;
  rolls: string;
  stats: Stats;
};

function usePlayer() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const {
    data: player,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["player", account.address],
    queryFn: async () => {
      const resp = await client.getOwnedObjects({
        owner: account.address,
        filter: {
          MatchAll: [{ StructType: playerStruct }],
        },
        options: {
          showContent: true,
        },
      });

      // Ensure we have at least one object and that it's a MoveObject
      if (resp.data.length < 0 || !isMoveObject(resp.data[0].data?.content)) {
        return null;
      }

      const moveStruct = resp.data[0].data as SuiObjectData;

      const playerDyanmicDataId = moveStruct.objectId;

      const playerDData = await client.getDynamicFields({
        parentId: playerDyanmicDataId,
      });

      const playerData = await client.getDynamicFieldObject({
        parentId: playerDyanmicDataId,
        name: playerDData.data[0].name,
      });

      if (!isMoveObject(playerData?.data?.content)) {
        console.error(
          "Content is not a move object",
          playerData?.data?.content
        );
        return null;
      }

      const moveContent = playerData?.data?.content as MoveObject;
      const fields = moveContent.fields as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value?: { fields?: { resources?: { fields?: any } } };
      };
      const stats = moveContent.fields as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value?: { fields?: { stats?: { fields?: any } } };
      };

      const resourcesFields = fields.value?.fields?.resources?.fields;
      const statsFields = stats.value?.fields?.stats?.fields;

      if (!resourcesFields) {
        console.error("Resources fields not found", playerData);
      }

      const playerMap = {
        id: resp.data[0].data.objectId,
        ...resourcesFields,
        stats: statsFields,
      };

      return playerMap as Player;
    },
    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { player, isLoading, refetch, isRefetching };
}

export default usePlayer;
