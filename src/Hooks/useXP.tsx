import { xpStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import {
  MoveStruct,
  PaginatedObjectsResponse,
  SuiParsedData,
} from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

type XPState = {
  level: number;
};

const invalidXPState: XPState = {
  level: -1,
};

function isXPState(obj: unknown): obj is XPState {
  return typeof obj === "object" && obj !== null && "level" in obj;
}
function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

function createXPStateFromResponse(
  response: PaginatedObjectsResponse
): XPState {
  let xpState = invalidXPState;
  if (
    response.data.length !== 0 &&
    isMoveObject(response.data[0].data?.content)
  ) {
    xpState = createXPStateFromData(response.data[0].data.content.fields);
  }
  return xpState;
}

function createXPStateFromData(value: MoveStruct): XPState {
  if (isXPState(value)) {
    return { level: value.level as number };
  }
  if (!Array.isArray(value) && value.fields && isXPState(value.fields)) {
    return { level: value.fields.level as number };
  }
  return invalidXPState;
}

function useXP() {
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
      console.log(resp);
      //return createXPStateFromResponse(resp);
    },
    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { xp, isLoading };
}

export default useXP;
