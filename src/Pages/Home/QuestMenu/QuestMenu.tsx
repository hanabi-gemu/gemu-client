import { Fonts } from "@/TwClassnames/Fonts";
import QuestItem from "./QuestItem";
import { useState } from "react";
import QuestDetails from "./QuestDetails";
import { quests } from "@/Constants/Quests";
import usePlayer from "@/Hooks/usePlayer";

function QuestMenu({ slot }: { slot: number }) {
  const { player } = usePlayer();
  const [openQuest, setOpenQuest] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState("");

  // Function to check if a quest is available based on player stats
  const isQuestAvailable = (quest: (typeof quests)[0]) => {
    if (!player) return false;

    const requirements = quest.requirements.fields;

    // Check level requirement
    if (Number(player.level) < Number(requirements.level)) {
      return false;
    }

    // Check energy requirement
    if (Number(player.resources.energy) < Number(requirements.energy)) {
      return false;
    }

    // Check focus requirement
    if (Number(player.resources.focus) < Number(requirements.focus)) {
      return false;
    }

    // Check stats requirements
    if (Number(player.stats.saltiness) < Number(requirements.saltiness)) {
      return false;
    }
    if (Number(player.stats.sourness) < Number(requirements.sourness)) {
      return false;
    }
    if (Number(player.stats.sweetness) < Number(requirements.sweetness)) {
      return false;
    }
    if (Number(player.stats.spicy) < Number(requirements.spicy)) {
      return false;
    }

    return true;
  };

  // Separate quests into available and unavailable
  const availableQuests = quests.filter(isQuestAvailable);
  const unavailableQuests = quests.filter((quest) => !isQuestAvailable(quest));

  return (
    <>
      {openQuest ? (
        <QuestDetails
          onClose={() => {
            setOpenQuest(false);
            setSelectedQuest("");
          }}
          questId={selectedQuest}
          slot={slot}
        />
      ) : (
        <div className="">
          <h1 className={`${Fonts.pip.super_cartoon.h2} text-center p-5`}>
            Quests
          </h1>
          <div className="my-3 overflow-x-scroll">
            <div className="bg-pip-gray-100 py-2 px-6">
              <h2 className={`${Fonts.pip.h3.bold}`}>Available</h2>
            </div>
            <div className="flex gap-2 mt-2 p-5">
              {availableQuests.map((quest) => (
                <QuestItem
                  questId={quest.quest_id}
                  key={quest.quest_id}
                  onClick={() => {
                    setOpenQuest(true);
                    if (quest) {
                      setSelectedQuest(quest.quest_id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-5 p-5 overflow-y-scroll h-[300px]">
            <h2 className={Fonts.Headings.Title.Bold}>Unavailable</h2>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {unavailableQuests.map((quest) => (
                <QuestItem
                  disabled={true}
                  questId={quest.quest_id}
                  key={quest.quest_id}
                  onClick={() => {
                    setOpenQuest(true);
                    if (quest) {
                      setSelectedQuest(quest.quest_id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestMenu;
