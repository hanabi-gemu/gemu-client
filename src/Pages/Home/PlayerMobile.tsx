import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import StatBox from "./StatBox";
import { Fonts } from "@/TwClassnames/Fonts";
import FlameSVG from "./FlameSVG";
import { Events } from "@/TwClassnames/Events";
import useClaimDailyReward from "@/Hooks/useClaimDailyReward";
import useGetClaims from "@/Hooks/useGetClaims";

function PlayerMobile() {
  const { player, isLoading: isLoadingPlayer } = usePlayer();
  const { claimDailyReward } = useClaimDailyReward();
  const { claims } = useGetClaims();

  console.log(claims);

  if (isLoadingPlayer) {
    return <Spinner />;
  }

  if (!player) return false;

  const handleClaimDailyReward = async () => {
    await claimDailyReward();
  };

  return (
    <>
      <div className="flex justify-between flex-col">
        <div className="flex mb-5">
          {Object.entries(player.stats).map(([key, value]) => (
            <StatBox stat={key} value={value} key={key} />
          ))}
        </div>
        <div className="flex mt-5 ml-5">
          <div className="w-[200px] h-[238.5px]">
            {/* <img
              src={avatarImage}
              width={200}
              height={238.5}
              className="object-cover"
            /> */}
          </div>
          <div className="p-5">
            <div
              className={`w-[73px] h-[73px] bg-shadow relative rounded-full hover:bg-shadow2 ${Events.Hover}`}
              onClick={handleClaimDailyReward}
            >
              <div className="absolute right-[-15%] top-[-20%]">
                <FlameSVG />
              </div>
            </div>
            <p className={`${Fonts.Text.Medium} pl-2`}>Claim</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 ml-2">
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
