import { playerStructType } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

type PlayerObject = {
  dataType: "moveObject";
  type: string;
  fields: {
    stats: {
      fields: Stats;
    };
    resources: {
      fields: Resources;
    };
    xp: string;
    level: string;
  };
  hasPublicTransfer: boolean;
};

export type Stats = {
  sweetness: string;
  sourness: string;
  saltiness: string;
  spicy: string;
};

export type Resources = {
  energy: string;
  last_energy_update: string;
  focus: string;
  max_energy: string;
  max_focus: string;
  rolls: string;
  quest_slots: string;
};

export type Player = {
  id: string;
  stats: Stats;
  resources: Resources;
  xp: string;
  level: string;
};

function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

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
          MatchAll: [{ StructType: playerStructType }],
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

      if (!isMoveObject(moveStruct?.content)) {
        console.error(
          "Content is not a move object",
          moveStruct?.content
        );
        return null;
      }

      const moveContent = moveStruct?.content as MoveObject;
      const playerObject = moveContent as PlayerObject;

      const player = {
        id: moveStruct.objectId,
        stats: playerObject.fields.stats.fields,
        resources: playerObject.fields.resources.fields,
        xp: playerObject.fields.xp,
        level: playerObject.fields.level,
      } as Player;
      player.id = moveStruct.objectId;

      return player as Player;
    },

    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { player, isLoading, refetch, isRefetching };
}

export default usePlayer;
