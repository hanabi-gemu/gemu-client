import { gemuCoinStruct } from "@/smartContractInterface";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import {
  MoveStruct,
  PaginatedObjectsResponse,
  SuiParsedData,
} from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

type XPState = {
  balance: number;
};

type XPObject = {
  balance: string;
};

function isXPState(obj: unknown): obj is XPObject {
  return typeof obj === "object" && obj !== null && "balance" in obj;
}
function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

function createXPStateFromResponse(
  response: PaginatedObjectsResponse
): XPState | null {
  let xpState = null;
  if (
    response.data.length !== 0 &&
    isMoveObject(response.data[0].data?.content)
  ) {
    xpState = createXPStateFromData(response.data[0].data.content.fields);
  }
  return xpState;
}

// TODO: Check if we need to use big ints for balance
function createXPStateFromData(value: MoveStruct): XPState | null {
  if (isXPState(value)) {
    return { balance: parseInt(value.balance)};
  }
  if (!Array.isArray(value) && value.fields && isXPState(value.fields)) {
    return { balance: parseInt(value.fields.balance)};
  }
  return null;
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
          MatchAll: [{ StructType: gemuCoinStruct }],
        },
        options: {
          showContent: true,
        },
      });
      return createXPStateFromResponse(resp);
    },
    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { xp, isLoading };
}

export default useXP;
