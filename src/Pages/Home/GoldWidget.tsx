import SpinnerSmall from "@/Components/SpinnerSmall";
import useGold from "@/Hooks/useGold";
import { Fonts } from "@/TwClassnames/Fonts";
import coinImage from "./coin.png";
import usePlayer from "@/Hooks/usePlayer";

function GoldWidget() {
  const { gold, isRefetching } = useGold();
  const { player } = usePlayer();

  if (!player) return null;

  return (
    <div className="p-2 pl-4 flex rounded-[100px] items-center border-[1px] border-pip-gray-200 bg-pip-white w-[172px] justify-center">
      <div className="flex items-center gap-2">
        {isRefetching ? (
          <div className="w-[10px] h-[10px] absolute top-[10px]">
            <SpinnerSmall />
          </div>
        ) : (
          <>
            <div className={Fonts.Text.Paragraph.Bold}>{gold}</div>
            <img src={coinImage} className="object-cover" />
          </>
        )}
      </div>
    </div>
  );
}

export default GoldWidget;
