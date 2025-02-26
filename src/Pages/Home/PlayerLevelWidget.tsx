import usePlayer from "@/Hooks/usePlayer";
import { truncateAddress } from "@/Utils/format";

function PlayerLevelWidget() {
  const { player } = usePlayer();

  if (!player) return false;

  return (
    <div className="bg-shadow p-6 flex rounded-3xl items-center gap-[16px] w-[350px]">
      <div className="bg-[rgba(111,_111,_111,_1)] rounded-full w-[45px] h-[45px]"></div>
      <div className="flex flex-col">
        <div className="title-bold">{truncateAddress(player.id)}</div>
        <div className="flex items-center gap-[16px]">
          <div className="subtitle-book">Level {player.level}</div>
          <div className="h-[10px] flex items-center w-[150px] relative">
            <div className="rounded-md bg-low-contrast h-[10px] w-[56%]"></div>
            <div className="h-[10px] bg-light-box w-[44%] rounded-r-md"></div>
            <p className="absolute top-[10px] text-sm">EXP: {player.xp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerLevelWidget;
