import { xpStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import {
  MoveStruct,
  PaginatedObjectsResponse,
  SuiParsedData,
} from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

type PlayerState = {
  level: number;
};

const invalidPlayerState: PlayerState = {
  level: -1,
};

function isPlayerState(obj: unknown): obj is PlayerState {
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
  let xpState = invalidPlayerState;
  if (
    response.data.length !== 0 &&
    isMoveObject(response.data[0].data?.content)
  ) {
    xpState = createPlayerStateFromData(response.data[0].data.content.fields);
  }
  return xpState;
}

function createPlayerStateFromData(value: MoveStruct): PlayerState {
  if (isPlayerState(value)) {
    return { level: value.level as number };
  }
  if (!Array.isArray(value) && value.fields && isPlayerState(value.fields)) {
    return { level: value.fields.level as number };
  }
  return invalidPlayerState;
}

function usePlayer() {
  const client = useSuiClient();
  const account = useCurrentAccount()!;

  const { data: xp, isLoading } = useQuery({
    queryKey: ["xp", account.address],
    queryFn: async () => {
      const resp = await client.getOwnedObjects({
        owner: account.address,
        filter: {
          MatchAll: [{ StructType: xpStruct }],
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

  return { xp, isLoading };
}

export default usePlayer;
