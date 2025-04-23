import { useState, useEffect } from "react";
import Spinner from "@/Components/Spinner";
import { Fonts } from "@/TwClassnames/Fonts";
import { Quest } from "@/Constants/Quests";
import chestIcon from "./big_chest.png";
import usePlayer from "@/Hooks/usePlayer";
import goldIcon from "../../Home/big-coin.png";
import xpIcon from "../QuestMenu/flame.png";
import diceIcon from "../QuestMenu/dice.png";
import lightningIcon from "./lightning.png";
import blue_background from "./blue-background.png";
import { tw } from "@/Utils/tailwindIntel";
import ReactConfetti from "react-confetti";
import useXp, {xpToLevelUp} from "@/Hooks/useXp";

const rewardsStyles = {
  gold: { bg: tw`bg-pip-yellow-tint`, icon: goldIcon },
  rolls: { bg: tw`bg-pip-white`, icon: diceIcon },
  xp: { bg: tw`bg-pip-rose-tint`, icon: xpIcon },
};

function AnimationModal({ questItem }: { questItem?: Quest }) {
  const [showSpinner, setShowSpinner] = useState(true);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { player, refetch } = usePlayer();
  const {percentage} = useXp(player.level, player.xp);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setShowSpinner(false);
      await refetch(); // Wait for player data to update

        // Reset to 0 then animate to target
        setProgressPercentage(0);
        setTimeout(() => {
          setProgressPercentage(percentage);
        }, 50); // Small delay to ensure DOM update
    }, 5000);

    return () => clearTimeout(timer);
  }, [refetch, percentage]);

  return (
    <>
      <div className="flex flex-col p-12 gap-y-4 items-center relative">
        {showSpinner ? (
          <>
            <div className={`${Fonts.Headings.Subtitle.Bold}`}>
              Opening chest...
            </div>
            <Spinner />
          </>
        ) : (
          <>
            <ReactConfetti width={450} height={480} />
            <div className="">
              <img src={chestIcon} />
            </div>
            <div
              className={`${Fonts.pip.super_cartoon.h2}`}
              style={{
                textShadow: "0px 1px 0px #000",
                WebkitTextStrokeWidth: "2px",
                WebkitTextStrokeColor: "#FFF",
              }}
            >
              Quest complete!
            </div>
            <div className={`${Fonts.pip.body.regular}`}>
              Enjoy these rewards you earned below
            </div>
            <div className="flex items-center mx-4">
              {/* Level progress bar */}
              <div className="p-2 border-[2px] border-pip-gray-200 rounded-[100px] flex items-center bg-pip-white">
                <img src={lightningIcon} />
                <div className="h-[23px] w-[410px] bg-pip-yellow-tint rounded-[100px]">
                  {/* Filled portion based on progressPercentage */}{" "}
                  <div
                    className={`${Fonts.pip.body.emphasized} absolute flex items-center justify-center left-[42%]`}
                  >
                    {player.xp}/{xpToLevelUp(player.level, 1)}{" "}
                    XP
                  </div>
                  <div
                    className="h-[23px] bg-pip-yellow-base rounded-[100px] transition-all duration-500 ease-in-out delay-400"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={`${Fonts.pip.h3.bold}`}>Rewards</div>
            <div className="flex gap-4">
              {questItem &&
                Object.entries(questItem?.rewards.fields).map(
                  ([key, value], index) => (
                    <div
                      className="rounded-xl border-[2px] border-gray-200 bg-pip-white w-[136px] h-[175px] px-2"
                      key={index}
                    >
                      <div
                        className={`h-[120px] flex justify-center items-center rounded-lg bg-pip-rose-tint mb-2 ${
                          rewardsStyles[key as keyof typeof rewardsStyles]?.bg
                        }`}
                      >
                        <img
                          src={
                            rewardsStyles[key as keyof typeof rewardsStyles]
                              ?.icon
                          }
                          alt="reward icon"
                        />
                      </div>
                      <div
                        style={{
                          WebkitTextStrokeWidth: "2px",
                          WebkitTextStrokeColor: "#FFF",
                        }}
                        className={`${Fonts.pip.super_cartoon.h4} [text-shadow:0px_3px_0px_#F06D0D] text-center flex items-center`}
                      >
                        + {value}
                        {key}
                      </div>
                    </div>
                  )
                )}
            </div>
            <img
              src={blue_background}
              className="absolute top-0 left-0 z-[-1] rounded-t-3xl"
            />
          </>
        )}
      </div>
    </>
  );
}

export default AnimationModal;
