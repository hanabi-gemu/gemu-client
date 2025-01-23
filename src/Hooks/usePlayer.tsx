import { playerStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import {
  MoveStruct,
  PaginatedObjectsResponse,
  SuiParsedData,
} from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

type PlayerObject = {
  level: string;
  id: {id: string};
  last_hunt_time: string;
  stats: string;
}

type PlayerState = {
  id: string;
  level: number;
  last_hunt_time: Date;
  stats: number;
};

const invalidPlayerState: PlayerState = {
  id: '',
  level: -1,
  last_hunt_time: new Date(),
  stats: -1
};

function isPlayerObject(obj: unknown): obj is PlayerObject {
  return typeof obj === "object" && obj !== null && "level" in obj;
}
function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

function createPlayerStateFromResponse(
  response: PaginatedObjectsResponse
): PlayerState {
  let playerState = invalidPlayerState;
  if (
    response.data.length !== 0 &&
    isMoveObject(response.data[0].data?.content)
  ) {
    playerState = createPlayerStateFromData(response.data[0].data.content.fields);
  }
  return playerState;
}

function createPlayerStateFromData(value: MoveStruct): PlayerState {
  if (isPlayerObject(value)) {
    return {
      level: parseInt(value.level),
      id: value.id.id as string,
      last_hunt_time: new Date(parseInt(value.last_hunt_time)),
      stats: parseInt(value.stats)
    };
  }
  if (!Array.isArray(value) && value.fields && isPlayerObject(value.fields)) {
    return {
      level: parseInt(value.fields.level),
      id: value.fields.id.id as string,
      last_hunt_time: new Date(parseInt(value.fields.last_hunt_time)),
      stats: parseInt(value.fields.stats)
    };
  }
  return invalidPlayerState;
}

function usePlayer() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const { data: player, isLoading } = useQuery({
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
      return createPlayerStateFromResponse(resp);
    },
    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { player, isLoading };
}

export default usePlayer;
