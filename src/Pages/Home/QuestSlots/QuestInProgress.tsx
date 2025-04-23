import { useState, useEffect } from "react";
import { Fonts } from "@/TwClassnames/Fonts";
import ClaimQuestSlot from "./ClaimQuestSlot";
import chestIcon from "./chest.png";
import { Events } from "@/TwClassnames/Events";

const QuestInProgress = ({
  timestamp,
  duration,
  slot,
  receiptId,
}: {
  timestamp: number;
  duration: string;
  slot: number;
  receiptId: string;
}) => {
  // Convert duration to a number (milliseconds)
  const durationMs = Number(duration);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - timestamp;
      // Calculate percentage of time elapsed, clamping it to 100%
      const percentage = Math.min((elapsed / durationMs) * 100, 100);
      setProgress(percentage);

      // If the quest is completed, clear the interval
      if (percentage >= 100) {
        clearInterval(interval);
      }
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [timestamp, durationMs]);

  return (
    <>
      {progress >= 100 ? (
        <ClaimQuestSlot receiptId={receiptId} slot={slot} />
      ) : (
        <div
          className="w-[152px] h-[172px]
			border-[4px] border-pip-gray-200 bg-pip-white p-4
			backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center"
        >
          <img src={chestIcon} width={40} height={42} className="mb-2" />

          <div className={`${Events.Hover} mt-2 mx-3`}>
            {/* Progress Bar */}
            <div className="w-[136px] h-2 bg-pip-gray-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-[#175CD3] transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <p
            className={`${Fonts.pip.body.small} text-pip-yellow-dark text-center whitespace-nowrap mt-5`}
          >
            Quest in progress
          </p>
        </div>
      )}
    </>
  );
};

export default QuestInProgress;
