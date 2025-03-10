import useStartQuest from "@/Hooks/useStartQuest";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";

const SlotWithQuest = ({ slot, quest }: { slot: number; quest: string }) => {
  const { startBoardQuest } = useStartQuest(quest, slot);

  const startQuestHandler = () => {
    startBoardQuest();
  };

  return (
    <>
      <div className="border border-low-contrast w-[240px] h-[100px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center gap-y-2">
        <p className={Fonts.Headings.Title.Bold}>Quest Slot</p>
        <div
          onClick={startQuestHandler}
          className={`rounded-2xl p-3 px-6 flex justify-center items-center w-[180px] bg-shadow hover:bg-shadow2 ${Events.Hover}`}
        >
          <p className={Fonts.Headings.Subtitle.Book}>Start Quest!</p>
        </div>
      </div>
    </>
  );
};

export default SlotWithQuest;
