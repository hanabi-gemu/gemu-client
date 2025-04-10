import { quests } from "@/Constants/Quests";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";

function QuestItem({
  onClick,
  questId,
}: {
  onClick?: VoidFunction;
  questId?: string;
}) {
  const quest = quests.find((q) => q.quest_id === questId);
  return (
    <div className="flex flex-col gap-y-3 w-[213px] h-[223px] border-[2px] border-[#EFEFEF] rounded-xl items-center justify-center p-5">
      <p className={`${Fonts.pip.super_cartoon.h4} h-[63px]`}>{quest?.name}</p>
      <div
        onClick={onClick}
        className={`bg-pip-yellow-base mt-2 rounded-lg text-center hover:bg-[#E6E6E6] ${Events.Hover} transition-all duration-300 ease-in-out
					w-full h-[34px] border-pip-yellow-dark border-[2px] relative flex items-center justify-center`}
      >
        <p
          className={`${Fonts.Headings.Subtitle.Book} text-pip-yellow-dark py-2`}
        >
          Explore
        </p>
      </div>
      <div className="">
        {quest?.quest_type === "instant" && (
          <p className={`${Fonts.pip.caption.medium}`}>Instant earning</p>
        )}
        {quest?.quest_type === "timed" && (
          <p className={`${Fonts.pip.caption.medium}`}>Timed</p>
        )}
      </div>
    </div>
  );
}

export default QuestItem;
