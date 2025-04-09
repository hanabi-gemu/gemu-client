import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import avatarImage from "./bear.png";
import StatBox from "./StatBox";
import FocusProgressBar from "./FocusProgressBar";
import EnergyProgressBar from "./EnergyProgressBar";
import rollIcon from "./roll-icon.png";
import GoldWidget from "./GoldWidget";
import ClaimDailyRewardContainer from "./ClaimDailyRewardContainer";

function Player() {
  const { player, isLoading: isLoadingPlayer } = usePlayer();

  if (isLoadingPlayer) {
    return <Spinner />;
  }

  if (!player) return false;

  return (
    <>
      <div className="flex items-center gap-16 justify-self-center">
        <FocusProgressBar />
        <div className="flex flex-col items-center relative">
          <img src={rollIcon} />
          <p
            className={`absolute text-[#111113] text-center text-[20px] font-normal leading-none tracking-[-0.48px] bottom-[-5px]`}
            style={{
              textShadow: "0px 1px 0px #000",
              WebkitTextStrokeWidth: "3px",
              WebkitTextStrokeColor: "#FFF",
            }}
          >
            X {player.rolls}
          </p>
        </div>

        <EnergyProgressBar />
        <div className="justify-self-end">
          <GoldWidget />
        </div>
      </div>
      <div className="flex justify-between p-2 flex-col md:flex-row md:pt-10 md:mx-0">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col">
            <div className="flex flex-col gap-y-4">
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
          <ClaimDailyRewardContainer />
        </div>
      </div>
    </>
  );
}

export default Player;
