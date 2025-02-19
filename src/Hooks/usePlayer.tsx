import { playerStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { MoveStruct, SuiParsedData } from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

function isPlayerObject(obj: unknown): obj is PlayerObject {
  return typeof obj === "object" && obj !== null && "level" in obj;
}
function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

function createPlayerStateFromData(value: MoveStruct): PlayerState | null {
  if (isPlayerObject(value)) {
    return {
      id: value.id.id as string,
      xp: parseInt(value.xp),
      level: parseInt(value.level),
      max_mana: parseInt(value.max_mana),
      mana: parseInt(value.mana),
      last_energy_update: parseInt(value.last_energy_update),
      energy: parseInt(value.energy),
      max_energy: parseInt(value.max_energy),
      rolls: parseInt(value.rolls),
      materials: new Map<1232, 1>(), // to do
      stats: {
        sweetness: parseInt(value.stats.fields.sweetness),
        sourness: parseInt(value.stats.fields.sourness),
        saltiness: parseInt(value.stats.fields.saltiness),
        bitterness: parseInt(value.stats.fields.bitterness),
        umami: parseInt(value.stats.fields.umami),
      },
    };
  }

  if (!Array.isArray(value) && value.fields && isPlayerObject(value.fields)) {
    return {
      id: value.fields.id.id as string,
      xp: parseInt(value.fields.xp),
      level: parseInt(value.fields.level),
      max_mana: parseInt(value.fields.max_mana),
      mana: parseInt(value.fields.mana),
      last_energy_update: parseInt(value.fields.last_energy_update),
      energy: parseInt(value.fields.energy),
      max_energy: parseInt(value.fields.max_energy),
      rolls: parseInt(value.fields.rolls),
      materials: new Map(
        value.fields.materials.fields.map(
          (entry: { key: string; value: string }) => [
            parseInt(entry.key),
            parseInt(entry.value),
          ]
        )
      ),
      stats: {
        sweetness: parseInt(value.fields.stats.fields.sweetness),
        sourness: parseInt(value.fields.stats.fields.sourness),
        saltiness: parseInt(value.fields.stats.fields.saltiness),
        bitterness: parseInt(value.fields.stats.fields.bitterness),
        umami: parseInt(value.fields.stats.fields.umami),
      },
    };
  }

  return null;
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
          MatchAll: [{ StructType: playerStruct }],
        },
        options: {
          showContent: true,
        },
      });

      // Ensure we have at least one object and that it's a MoveObject
      if (resp.data.length > 0 && isMoveObject(resp.data[0].data?.content)) {
        const moveStruct = resp.data[0].data.content.fields as MoveStruct;

        return createPlayerStateFromData(moveStruct);
      }

      return null;
    },
    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  console.log(player);

  return { player, isLoading, refetch, isRefetching };
}

export default usePlayer;
