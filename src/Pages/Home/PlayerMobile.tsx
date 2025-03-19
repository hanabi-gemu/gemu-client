import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import avatarImage from "./bear.png";
import StatBox from "./StatBox";
import { Fonts } from "@/TwClassnames/Fonts";
import useReceipt from "@/Hooks/useReceipt";

function PlayerMobile() {
  const { player, isLoading: isLoadingPlayer } = usePlayer();
  useReceipt();

  if (isLoadingPlayer) {
    return <Spinner />;
  }

  if (!player) return false;

  return (
    <>
      <div className="flex justify-between p-2 flex-col md:flex-row md:pt-10 md:mx-0">
        <div className="flex mb-5">
          {Object.entries(player.stats).map(([key, value]) => (
            <StatBox stat={key} value={value} key={key} />
          ))}
        </div>
        <div className="w-[200px] h-[238.5px]">
          <img
            src={avatarImage}
            width={200}
            height={238.5}
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

export default PlayerMobile;
