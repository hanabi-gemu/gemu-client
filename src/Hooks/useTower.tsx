import { towerObjectId } from "@/smartContractInterface";
import { useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

type TowerObject = {
  dataType: "moveObject";
  type: string;
  fields: {
    start_time: string
    end_time: string
  };
  hasPublicTransfer: boolean;
};

export type Tower = {
  id: string;
  startTime: string;
  endTime: string;
};

function isMoveObject(
  data: SuiParsedData | null | undefined
): data is MoveObject {
  return data?.dataType === "moveObject";
}

function useTower() {
  const client = useSuiClient();

  const {
    data: tower,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["tower"],
    queryFn: async () => {
      const resp = await client.getObject({
        id: towerObjectId,
      });

      if (!resp.data || !isMoveObject(resp.data?.content)) {
        return null;
      }

      const moveStruct = resp.data as SuiObjectData;

      if (!isMoveObject(moveStruct?.content)) {
        console.error(
          "Content is not a move object",
          moveStruct?.content
        );
        return null;
      }

      const moveContent = moveStruct?.content as MoveObject;
      const towerObject = moveContent as TowerObject;

      const tower = {
        id: moveStruct.objectId,
        startTime: towerObject.fields.start_time,
        endTime: towerObject.fields.end_time,
      };
      return tower;
    },

    staleTime: 5 * 60 * 1000, // todo: check cache revalidation
    gcTime: 10 * 60 * 1000,
  });

  return { tower, isLoading, refetch, isRefetching };
}

export default useTower;
