import { quests } from "@/Constants/Quests";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import GoBackButton from "./GoBackButton";
import goldIcon from "../../Home/big-coin.png";
import xpIcon from "./flame.png";
import diceIcon from "./dice.png";
import { tw } from "@/Utils/tailwindIntel";

const rewardsStyles = {
  gold: { bg: tw`bg-pip-yellow-tint`, icon: goldIcon },
  rolls: { bg: tw`bg-pip-white`, icon: diceIcon },
  xp: { bg: "bg-pip-rose-tint", icon: xpIcon },
};

function QuestDetails({
  onClose,
  questId,
  slot,
}: {
  onClose: VoidFunction;
  questId: string;
  slot: number;
}) {
  // const { startQuest } = useStartQuest(quest, slot);

  // Function to add the quest to session storage
  const addQuestToSessionStorage = (id: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`quest_slot_${slot}`, id);
    }
  };

  const quest = quests.find((q) => q.quest_id === questId);

  // Handler that saves the quest then starts the quest
  const addToSlot = () => {
    addQuestToSessionStorage(questId);
    onClose();
  };

  return (
    <div className="pt-4 px-4">
      <div className="flex justify-between w-[560px]">
        <div className="" onClick={onClose}>
          <GoBackButton />
        </div>
        {quest && (
          <div className="justify-center w-full flex">
            <h1 className={`${Fonts.pip.super_cartoon.h2} text-center`}>
              {quest.name}
            </h1>
          </div>
        )}
      </div>
      <div className="w-full bg-shadow h-[180px] rounded-2xl mt-3"></div>
      <div className="mt-3 w-full gap-y-1 flex flex-col items-center">
        <h2 className={Fonts.pip.h3.bold}>Rewards</h2>
        <div className="flex flex-wrap gap-3 mt-1">
          {quest &&
            Object.entries(quest.rewards.fields).map(([key, value], index) => (
              <div
                className="rounded-xl border-[2px] border-gray-200 bg-pip-white w-[138px] h-[175px] p-2"
                key={index}
              >
                <div
                  className={`h-[120px] flex justify-center items-center rounded-lg bg-pip-rose-tint mb-2 ${
                    rewardsStyles[key as keyof typeof rewardsStyles]?.bg
                  }`}
                >
                  <img
                    src={rewardsStyles[key as keyof typeof rewardsStyles]?.icon}
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
            ))}
        </div>
      </div>

      <div className="mt-3 w-full gap-y-1 flex flex-col items-center">
        <h2 className={Fonts.pip.h3.bold}>Requirements</h2>
        <div className="flex flex-wrap gap-3 mt-1">
          {quest &&
            Object.entries(quest.requirements.fields).map(
              ([key, value], index) => (
                <>
                  {Number(value) > 1 && (
                    <div
                      className="rounded-xl border-[2px] border-gray-200 bg-pip-white w-[148px] h-[175px] p-2"
                      key={index}
                    >
                      <div className="h-[120px] rounded-lg bg-pip-rose-tint mb-2"></div>
                      <div
                        style={{
                          WebkitTextStrokeWidth: "2px",
                          WebkitTextStrokeColor: "#FFF",
                        }}
                        className={`${Fonts.pip.super_cartoon.h4} text-lg justify-center
												 [text-shadow:0px_3px_0px_#F06D0D] text-center flex items-center`}
                      >
                        + {value}
                        {key}
                      </div>
                    </div>
                  )}
                </>
              )
            )}
        </div>
      </div>

      <div className="relative  self-end">
        <div
          className={`${Events.Hover} p-3 rounded-lg my-3 border-[2px] border-pip-yellow-dark
					 hover:bg-pip-yellow-tint bg-pip-yellow-base`}
          onClick={addToSlot}
        >
          <p
            className={`${Fonts.pip.h3.bold} text-pip-yellow-dark text-center`}
          >
            Add to quest slot
          </p>
        </div>

        <svg
          width="136"
          height="50"
          viewBox="0 0 136 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-[20%]"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="124"
              y="-63.3501"
              width="13"
              height="248"
              transform="rotate(30 124 -63.3501)"
              fill="white"
              fill-opacity="0.6"
            />
          </g>
        </svg>

        <svg
          width="136"
          height="50"
          viewBox="0 0 136 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-[17%]"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="124.742"
              y="-69.8501"
              width="13"
              height="248"
              transform="rotate(30 124.742 -69.8501)"
              fill="white"
              fill-opacity="0.4"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default QuestDetails;
