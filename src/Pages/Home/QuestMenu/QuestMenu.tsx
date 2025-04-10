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
          <h1 className={`${Fonts.pip.super_cartoon.h2} text-center p-5`}>
            Quests
          </h1>
          <div className="my-3 overflow-x-scroll">
            <div className="bg-pip-gray-100 py-2 px-6">
              <h2 className={`${Fonts.pip.h3.bold}`}>Available</h2>
            </div>
            <div className="flex gap-2 mt-2 p-5">
              {quests?.map((quest) => (
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
          <div className="mt-5 p-5">
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
