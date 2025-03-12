import { useState, useEffect } from "react";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import ClaimQuestSlot from "./ClaimQuestSlot";

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
        <div className="border border-low-contrast w-[240px] h-[120px] backdrop-blur-lg rounded-2xl flex flex-col justify-center items-center gap-y-2">
          <p className={Fonts.Headings.Title.Bold}>Quest Slot</p>
          <div
            className={`rounded-2xl p-3 px-6 flex justify-center items-center w-[180px] bg-shadow hover:bg-shadow2 ${Events.Hover}`}
          >
            <p className={Fonts.Headings.Subtitle.Book}>Quest in Progress</p>
          </div>

          {/* Progress Bar */}
          <div className="w-[180px] h-2 bg-gray-300 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-green-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestInProgress;
