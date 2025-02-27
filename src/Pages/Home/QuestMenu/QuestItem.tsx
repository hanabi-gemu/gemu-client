import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";

function QuestItem({ onClick }: { onClick?: VoidFunction }) {
  return (
    <div className="flex flex-col gap-y-3">
      <div
        className={
          "bg-low-contrast w-[120px] h-[100px] rounded-2xl bg:" + Events.Hover
        }
        onClick={onClick}
      ></div>
      <p className={Fonts.Headings.Subtitle.Bold}>Quest Name</p>
      <p className={Fonts.Text.Paragraph.Medium}>Reward</p>
    </div>
  );
}

export default QuestItem;
