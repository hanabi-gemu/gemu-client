import { Fonts } from "@/TwClassnames/Fonts";

function StatBox({ stat, value }: { stat: string; value: string }) {
  return (
    <div className="flex flex-col items-center w-[78px] h-[56px] border-[2px] border-low-contrast  p-2">
      <p className={`${Fonts.Headings.Subtitle.Bold}`}>{value}</p>
      <p className={Fonts.Text.Medium}>{stat}</p>
    </div>
  );
}

export default StatBox;
