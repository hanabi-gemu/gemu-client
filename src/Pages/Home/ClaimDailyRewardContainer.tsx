import Spinner from "@/Components/Spinner";
import useClaimDailyReward from "@/Hooks/useClaimDailyReward";
import useGetClaims from "@/Hooks/useGetClaims";
import usePlayer from "@/Hooks/usePlayer";
import bigCoinIcon from "./big-coin.png";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { useState, useEffect } from "react";

function ClaimDailyRewardContainer() {
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
    <div
      className={`p-4 bg-gradient-to-b from-[#FFE326] to-[#FFFFFF] flex-col items-center w-[152px] h-[200px] border-[2px] border-pip-gray-200
			${timeRemaining ? "" : `group ${Events.Hover}`}
			rounded-2xl relative`}
    >
      <div className="absolute top-0 left-0">
        <svg
          width="70"
          height="119"
          viewBox="0 0 70 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-tl-lg"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="60.5547"
              y="-65.8076"
              width="13"
              height="248"
              transform="rotate(45 60.5547 -65.8076)"
              fill="white"
              fillOpacity="0.9"
            />
          </g>
        </svg>
      </div>
      <div className="absolute right-[10px] top-[10px	] w-[81px] h-[81px]">
        {claims ? (
          <p className={`text-right ${Fonts.Headings.Title.Book}`}>
            x {claims.streak}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center mt-5">
        <img src={bigCoinIcon} />
      </div>
      <div
        className="bg-pip-yellow-base rounded-lg mt-6 text-center group-hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out
				h-fit border-pip-yellow-dark border-[2px] relative flex items-center justify-center"
        onClick={handleClaimDailyReward}
      >
        {loadingClaim ? (
          <Spinner />
        ) : timeRemaining ? (
          <p
            className={`${Fonts.Headings.Title.Book} text-center text-pip-yellow-dark`}
          >
            Next claim in {timeRemaining}
          </p>
        ) : (
          <p className={`text-[14px] font-bold text-pip-yellow-dark`}>
            Claim reward
          </p>
        )}
        <div className="absolute top-0 left-0">
          <svg
            width="52"
            height="30"
            viewBox="0 0 52 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ mixBlendMode: "hard-light" }}>
              <rect
                x="40"
                y="-65.3828"
                width="13"
                height="248"
                transform="rotate(30 40 -65.3828)"
                fill="white"
                fillOpacity="0.6"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ClaimDailyRewardContainer;
