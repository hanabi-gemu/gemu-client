import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import useXP from "@/Hooks/useXP";
import avatarImage from "./bear.png";
import StatBox from "./StatBox";
import { Fonts } from "@/TwClassnames/Fonts";
import useReceipt from "@/Hooks/useReceipt";

// function percentageOfMinutesElapsed(milliseconds: number): number {
//   if (milliseconds === 0) {
//     return 100;
//   }
//   const totalMillisecondInAMinute = 60000;
//   const percentage = (milliseconds / totalMillisecondInAMinute) * 100;
//   return Math.min(100, parseFloat(percentage.toFixed(2))); // Round to 2 decimal places
// }

function Player() {
  const {
    player,
    isLoading: isLoadingPlayer,
    isRefetching: isRefetchingPlayer,
  } = usePlayer();
  const { isLoading: isLoadingXp } = useXP();
  useReceipt();

  if (isLoadingPlayer || isLoadingXp || isRefetchingPlayer) {
    return <Spinner />;
  }

  if (!player) return false;

  return (
    <>
      <div className="flex justify-between p-2 flex-col md:flex-row md:pt-10 md:mx-0">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col">
            <div className="flex flex-col">
              {Object.entries(player.stats).map(([key, value]) => (
                <StatBox stat={key} value={value} key={key} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-[379px] h-[438.5px]">
          <img
            src={avatarImage}
            width={379}
            height={438.5}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-1">
            <p className={Fonts.Headings.Title.Bold}>Energy:</p>
            <p className={Fonts.Headings.Title.Book}>{player.energy}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className={Fonts.Headings.Title.Bold}>Mana:</p>
            <p className={Fonts.Headings.Title.Book}>{player.mana}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className={Fonts.Headings.Title.Bold}>Rolls:</p>
            <p className={Fonts.Headings.Title.Book}>{player.rolls}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
