import SpinnerSmall from "@/Components/SpinnerSmall";
import useGold from "@/Hooks/useGold";
import usePlayer from "@/Hooks/usePlayer";
import { Fonts } from "@/TwClassnames/Fonts";
import { truncateAddress } from "@/Utils/format";

function GoldWidgetMobile() {
  const { gold, isRefetching } = useGold();

  const { player } = usePlayer();

  if (!player) return false;

  return (
    <div className="bg-shadow p-2 flex rounded-3xl items-center gap-2 w-[146px] justify-between h-[49px]">
      <div className="bg-low-contrast rounded-full w-[24px] h-[24px]"></div>
      <div className="flex flex-col">
        <div className="flex items-center gap-[16px]">
          {isRefetching ? (
            <div className="w-[10px] h-[10px] absolute top-[10px]">
              <SpinnerSmall />
            </div>
          ) : (
            <div className="">
              <div className={Fonts.Text.Small}>$GOLD: {gold}</div>
              <div className={Fonts.Text.Small}>
                {truncateAddress(player.id)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GoldWidgetMobile;
