import usePlayer from "@/Hooks/usePlayer";

function PlayerLevelWidgetMobile() {
  const { player } = usePlayer();

  if (!player) return false;

  return (
    <div className="bg-shadow p-2 flex rounded-2xl items-center gap-2 w-[111px] h-[49px]">
      <div className="bg-low-contrast rounded-full w-[24px] h-[24px]"></div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[4px]">
          <div className="subtitle-book">Level {player.level}</div>
          {/* level progress bar */}
          <div className="h-[10px] flex items-center w-[63px] relative">
            <div className="rounded-md bg-low-contrast h-[10px] w-[56%]"></div>
            <div className="h-[10px] bg-light-box w-[44%] rounded-r-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerLevelWidgetMobile;
