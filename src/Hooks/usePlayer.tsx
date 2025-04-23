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
      fields: {
        sweetness: string;
        sourness: string;
        saltiness: string;
        spicy: string;
      };
    };
    resources: {
      fields: {
        energy: string;
        last_energy_update: string;
        focus: string;
        max_energy: string;
        max_focus: string;
        rolls: string;
        quest_slots: string;
      };
    };
    xp: string;
    level: string;
  };
  hasPublicTransfer: boolean;
};

export type Stats = {
  sweetness: number;
  sourness: number;
  saltiness: number;
  spicy: number;
};

export type Resources = {
  energy: number;
  last_energy_update: string;
  focus: number;
  max_energy: number;
  max_focus: number;
  rolls: number;
  quest_slots: number;
};

export type Player = {
  id: string;
  stats: Stats;
  resources: Resources;
  xp: number;
  level: number;
};

function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

function useFetchPlayer() {
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
        stats: {
          sweetness: Number(playerObject.fields.stats.fields.sweetness),
          sourness: Number(playerObject.fields.stats.fields.sourness),
          saltiness: Number(playerObject.fields.stats.fields.saltiness),
          spicy: Number(playerObject.fields.stats.fields.spicy),
        } as Stats,
        resources: {
          energy: Number(playerObject.fields.resources.fields.energy),
          last_energy_update: playerObject.fields.resources.fields.last_energy_update,
          focus: Number(playerObject.fields.resources.fields.focus),
          max_energy: Number(playerObject.fields.resources.fields.max_energy),
          max_focus: Number(playerObject.fields.resources.fields.max_focus),
          rolls: Number(playerObject.fields.resources.fields.rolls),
          quest_slots: Number(playerObject.fields.resources.fields.quest_slots),
        } as Resources,
        xp: Number(playerObject.fields.xp),
        level: Number(playerObject.fields.level),
      } as Player;
      player.id = moveStruct.objectId;

      return player as Player;
    },

    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { player, isLoading, refetch, isRefetching };
}

export default useFetchPlayer;
