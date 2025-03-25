import { Fonts } from "@/TwClassnames/Fonts";
import QuestItem from "./QuestItem";
import { useState } from "react";
import QuestDetails from "./QuestDetails";
import { quests } from "@/Constants/Quests";

function QuestMenu({ slot }: { slot: number }) {
  const [openQuest, setOpenQuest] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState("");

  return (
    <>
      {openQuest ? (
        <QuestDetails
          onClose={() => {
            setOpenQuest(false);
            setSelectedQuest("");
          }}
          quest={selectedQuest}
          slot={slot}
        />
      ) : (
        <div className="">
          <h1 className={Fonts.Headings.Heading.Medium}>Quests</h1>
          <div className="my-3 overflow-x-scroll">
            <h2 className={Fonts.Headings.Title.Bold}>Available</h2>
            <div className="flex gap-2 mt-2">
              {quests?.map((quest) => (
                <QuestItem
                  questId={quest.details.fields.quest_id}
                  key={quest.details.fields.quest_id}
                  onClick={() => {
                    setOpenQuest(true);
                    if (quest) {
                      setSelectedQuest(quest.details.fields.quest_id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h2 className={Fonts.Headings.Title.Bold}>Unavailable</h2>
            <div className="flex gap-2 mt-2">
              <QuestItem />
              <QuestItem />
              <QuestItem />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestMenu;
