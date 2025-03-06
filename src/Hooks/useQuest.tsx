import { questManagerAddress } from "@/smartContractInterface";
import { useSuiClient } from "@mysten/dapp-kit";
import { SuiParsedData } from "@mysten/sui/client";
import { useQuery } from "@tanstack/react-query";

type MoveObject = Extract<SuiParsedData, { dataType: "moveObject" }>;

function useQuest() {
  const client = useSuiClient();

  const { data } = useQuery({
    queryKey: ["quest"],
    queryFn: async () => {
      const resp = await client.getObject({
        id: questManagerAddress,
        options: {
          showContent: true,
        },
      });
      // Check if the response is of the type that has object data
      if (resp && resp.data && resp.data?.content) {
        const content = resp.data.content as MoveObject;

        const contentFields = content.fields as {
          board_quests?: { fields?: { id?: { id?: string } } };
        };

        const boardQuestId = contentFields.board_quests?.fields?.id?.id;

        if (!boardQuestId) return null;

        const dynamicField = await client.getDynamicFields({
          parentId: boardQuestId,
        });

        console.log(dynamicField, "dynamicFielddynamicField");

        const quests = await Promise.all(
          dynamicField.data.map(async (field) => {
            const fieldObject = await client.getDynamicFieldObject({
              parentId: boardQuestId,
              name: field.name,
            });
            if (fieldObject && fieldObject.data && fieldObject.data.content) {
              const fielDataContent = fieldObject.data.content as MoveObject;
              const questFields = fielDataContent.fields as {
                id?: { id?: string };
              };

              return questFields?.id?.id;
            }
          })
        );

        return quests;
      } else {
        console.error("Object content not available", resp);
      }
    },
  });
  return { data };
}

export default useQuest;
