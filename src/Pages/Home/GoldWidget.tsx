import SpinnerSmall from "@/Components/SpinnerSmall";
import useGold from "@/Hooks/useGold";
import { Fonts } from "@/TwClassnames/Fonts";
import coinsImage from "./coins.png";

function GoldWidget() {
  const { gold, isRefetching } = useGold();

  console.log(gold);

  return (
    <div className="bg-shadow p-6 flex rounded-3xl items-center gap-[16px] w-[260px] justify-between h-[100px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[16px]">
          {isRefetching ? (
            <div className="w-[10px] h-[10px] absolute top-[10px]">
              <SpinnerSmall />
            </div>
          ) : (
            <div className={Fonts.Headings.Title.Bold}>$GOLD: {123}</div>
          )}
        </div>
      </div>
      <img src={coinsImage} width={90} height={90} className="object-cover" />
    </div>
  );
}

export default GoldWidget;
