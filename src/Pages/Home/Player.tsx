import { useEffect, useState } from "react";
import Spinner from "@/Components/Spinner";
import usePlayer from "@/Hooks/usePlayer";
import avatarImage from "./bear.png";
import StatBox from "./StatBox";
import { Fonts } from "@/TwClassnames/Fonts";
import { Events } from "@/TwClassnames/Events";
import useGetClaims from "@/Hooks/useGetClaims";
import useClaimDailyReward from "@/Hooks/useClaimDailyReward";

function Player() {
  const { player, isLoading: isLoadingPlayer } = usePlayer();
  const { claimDailyReward } = useClaimDailyReward();
  const { claims } = useGetClaims();
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!claims?.timestamp) return;

    // Ensure claims.timestamp is treated as a number and create endTime as 24 hours later.
    const startTime = Number(claims.timestamp);
    const endTime = startTime + 24 * 60 * 60 * 1000;

    // Update the timer immediately and every second.
    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeRemaining("");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    };

    // Set the interval to update every second.
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    // Clear interval on cleanup.
    return () => clearInterval(intervalId);
  }, [claims]);

  if (isLoadingPlayer) {
    return <Spinner />;
  }

  if (!player) return false;

  const handleClaimDailyReward = async () => {
    setLoadingClaim(true);
    try {
      await claimDailyReward();
      setLoadingClaim(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoadingClaim(false);
    }
  };

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

          <div
            className={`p-6 bg-[#D9D9D9] flex-col items-center w-[246px] h-[230px] 
							${timeRemaining ? "" : `group ${Events.Hover}`}
							rounded-2xl relative`}
          >
            <div className="absolute right-[-20%] top-[-20%] w-[81px] h-[81px]">
              <StreakSVG />
              {claims ? (
                <p className={`text-right ${Fonts.Headings.Title.Book}`}>
                  x {claims.streak}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="bg-low-contrast w-full h-[94px] rounded-2xl"></div>
            <div
              className="bg-high rounded-[48px] p-4 mt-6 group-hover:bg-[#E6E6E6]"
              onClick={handleClaimDailyReward}
            >
              {loadingClaim ? (
                <Spinner />
              ) : timeRemaining ? (
                <p className={`${Fonts.Headings.Title.Book} text-center`}>
                  Next claim in {timeRemaining}
                </p>
              ) : (
                <p className={`${Fonts.Text.Paragraph.Bold}`}>Claim Tokens</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;

function StreakSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="82"
      height="83"
      viewBox="0 0 82 83"
      fill="none"
    >
      <path
        d="M6.4375 47.7171C6.4375 52.2234 7.45677 56.4614 9.49531 60.4312C11.5339 64.401 14.3771 67.7091 18.025 70.3557C17.7389 69.4973 17.5243 68.6211 17.3812 67.727C17.2382 66.8329 17.1667 65.9567 17.1667 65.0984C17.1667 62.8095 17.5958 60.6636 18.4542 58.6609C19.3125 56.6581 20.5642 54.8341 22.2094 53.189L34.3333 41.2796L46.4573 53.189C48.1024 54.8341 49.3542 56.6581 50.2125 58.6609C51.0708 60.6636 51.5 62.8095 51.5 65.0984C51.5 65.9567 51.4285 66.8329 51.2854 67.727C51.1424 68.6211 50.9278 69.4973 50.6417 70.3557C54.2896 67.7091 57.1328 64.401 59.1714 60.4312C61.2099 56.4614 62.2292 52.2234 62.2292 47.7171C62.2292 43.8546 61.4066 40.0815 59.7615 36.3979C58.1163 32.7142 55.7559 29.3345 52.6802 26.2588C51.1781 27.3317 49.6045 28.1722 47.9594 28.7801C46.3142 29.3881 44.6691 29.6921 43.024 29.6921C38.6608 29.6921 35.0486 28.2079 32.1875 25.2395C29.3264 22.2711 27.8958 18.5338 27.8958 14.0275V11.8817C24.6056 14.2421 21.6372 16.8529 18.9906 19.714C16.3441 22.5751 14.091 25.5614 12.2312 28.6728C10.3715 31.7843 8.94097 34.9673 7.93958 38.2218C6.93819 41.4763 6.4375 44.6414 6.4375 47.7171ZM34.3333 50.2921L26.7156 57.8025C25.7142 58.8039 24.9453 59.9126 24.4089 61.1286C23.8724 62.3446 23.6042 63.6678 23.6042 65.0984C23.6042 68.031 24.6413 70.5166 26.7156 72.5551C28.7899 74.5937 31.3292 75.613 34.3333 75.613C37.3375 75.613 39.8767 74.5937 41.951 72.5551C44.0253 70.5166 45.0625 68.031 45.0625 65.0984C45.0625 63.6678 44.7943 62.3446 44.2578 61.1286C43.7214 59.9126 42.9524 58.8039 41.951 57.8025L34.3333 50.2921ZM34.3333 0.508789V14.6713C34.3333 17.1032 35.1738 19.1418 36.8547 20.7869C38.5356 22.4321 40.592 23.2546 43.024 23.2546C44.3115 23.2546 45.5095 22.9864 46.6182 22.4499C47.7269 21.9135 48.7104 21.1088 49.5687 20.0359L51.5 17.6755C56.7931 20.6796 60.9774 24.864 64.0531 30.2286C67.1288 35.5932 68.6667 41.4227 68.6667 47.7171C68.6667 57.3018 65.3406 65.4202 58.6885 72.0723C52.0365 78.7244 43.9181 82.0505 34.3333 82.0505C24.7486 82.0505 16.6302 78.7244 9.97812 72.0723C3.32604 65.4202 0 57.3018 0 47.7171C0 38.5616 3.07569 29.7458 9.22708 21.2697C15.3785 12.7937 23.7472 5.87337 34.3333 0.508789ZM78.3229 33.7692C77.4646 33.7692 76.7135 33.4473 76.0698 32.8036C75.426 32.1598 75.1042 31.4088 75.1042 30.5505C75.1042 29.6206 75.426 28.8517 76.0698 28.2437C76.7135 27.6357 77.4646 27.3317 78.3229 27.3317C79.2528 27.3317 80.0217 27.6357 80.6297 28.2437C81.2377 28.8517 81.5417 29.6206 81.5417 30.5505C81.5417 31.4088 81.2377 32.1598 80.6297 32.8036C80.0217 33.4473 79.2528 33.7692 78.3229 33.7692ZM75.1042 20.8942V0.508789H81.5417V20.8942H75.1042Z"
        fill="#3E3E3E"
      />
    </svg>
  );
}
