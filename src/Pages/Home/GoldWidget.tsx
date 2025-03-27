import SpinnerSmall from "@/Components/SpinnerSmall";
import useGold from "@/Hooks/useGold";
import { Fonts } from "@/TwClassnames/Fonts";
import coinsImage from "./coins.png";
import { truncateAddress } from "@/Utils/format";
import usePlayer from "@/Hooks/usePlayer";

function GoldWidget() {
  const { gold, isRefetching } = useGold();
  const { player } = usePlayer();

  if (!player) return null;

  console.log(gold);

  return (
    <div className="bg-shadow p-6 flex rounded-3xl items-center gap-[16px] w-[260px] justify-between h-[74px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-[16px]">
          {isRefetching ? (
            <div className="w-[10px] h-[10px] absolute top-[10px]">
              <SpinnerSmall />
            </div>
          ) : (
            <div className="">
              <div className={Fonts.Text.Paragraph.Bold}>$GOLD: {gold}</div>
              <div className={`${Fonts.Text.Book} text-low-contrast`}>
                {truncateAddress(player.id)}
              </div>
            </div>
          )}
        </div>
      </div>
      <img src={coinsImage} width={90} height={90} className="object-cover" />
    </div>
  );
}

export default GoldWidget;
