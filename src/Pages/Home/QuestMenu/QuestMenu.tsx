import { Fonts } from "@/TwClassnames/Fonts";
import QuestItem from "./QuestItem";
import { useState } from "react";
import QuestDetails from "./QuestDetails";
import useQuest from "@/Hooks/useQuest";

function QuestMenu() {
  const [openQuest, setOpenQuest] = useState(false);
  const { data } = useQuest();
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
        />
      ) : (
        <div className="">
          <h1 className={Fonts.Headings.Heading.Medium}>Quests</h1>
          <div className="my-3 overflow-x-scroll">
            <h2 className={Fonts.Headings.Title.Bold}>Available</h2>
            <div className="flex gap-2 mt-2">
              {data?.map((quest) => (
                <QuestItem
                  questId={quest}
                  key={quest}
                  onClick={() => {
                    setOpenQuest(true);
                    if (quest) {
                      setSelectedQuest(quest);
                    }
                  }}
                />
              ))}
              <QuestItem onClick={() => setOpenQuest(true)} />
              <QuestItem onClick={() => setOpenQuest(true)} />
              <QuestItem onClick={() => setOpenQuest(true)} />
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
