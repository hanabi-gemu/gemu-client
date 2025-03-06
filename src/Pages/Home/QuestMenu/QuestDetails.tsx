import useStartQuest from "@/Hooks/useStartQuest";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { truncateAddress } from "@/Utils/format";

function QuestDetails({
  onClose,
  quest,
}: {
  onClose: VoidFunction;
  quest: string;
}) {
  const { startBoardQuest } = useStartQuest(quest);

  console.log(quest);

  return (
    <div className="" onClick={onClose}>
      <h1 className={Fonts.Headings.Heading.Medium}>Quest Name</h1>
      {quest && (
        <h1 className={Fonts.Text.Paragraph.Medium}>
          {truncateAddress(quest)}
        </h1>
      )}
      <div className="w-full bg-shadow h-[180px] rounded-2xl mt-3"></div>
      <div className="my-3">
        <h2 className={Fonts.Headings.Subtitle.Bold}>Quest Type</h2>
        <div className="flex gap-2 mt-2"></div>
      </div>
      <div className="mt-3 w-full gap-y-1 flex flex-col">
        <h2 className={Fonts.Text.Paragraph.Medium}>Rewards</h2>
        <div className={`${Fonts.Text.Paragraph.Medium} flex flex-col gap-y-1`}>
          <p className="pl-2">• xp</p>
          <p className="pl-2">• materials</p>
          <p className="pl-2">• gold</p>
          <p className="pl-2">• rolls</p>
        </div>
      </div>
      <div className="mt-3 w-full gap-y-1 flex flex-col">
        <h2 className={Fonts.Text.Paragraph.Medium}>Requirements</h2>
        <div className={`${Fonts.Text.Paragraph.Medium} flex flex-col gap-y-1`}>
          <p className="pl-2">• stats</p>
          <p className="pl-2">• level</p>
          <p className="pl-2">• mana</p>
          <p className="pl-2">• energy</p>
        </div>
      </div>

      <div
        className={Events.Hover + "p-3 border rounded-lg"}
        onClick={startBoardQuest}
      >
        Start Quest
      </div>
    </div>
  );
}

export default QuestDetails;
