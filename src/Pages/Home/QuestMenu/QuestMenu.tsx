import { Fonts } from "@/TwClassnames/Fonts";
import QuestItem from "./QuestItem";
import { useState } from "react";
import QuestDetails from "./QuestDetails";

function QuestMenu() {
  const [openQuest, setOpenQuest] = useState(false);

  return (
    <>
      {openQuest ? (
        <QuestDetails onClose={() => setOpenQuest(false)} />
      ) : (
        <div className="">
          <h1 className={Fonts.Headings.Heading.Medium}>Quests</h1>
          <div className="my-3">
            <h2 className={Fonts.Headings.Title.Bold}>Available</h2>
            <div className="flex gap-2 mt-2">
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
