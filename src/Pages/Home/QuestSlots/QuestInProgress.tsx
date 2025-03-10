import { useState, useEffect } from "react";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";

const QuestInProgress = ({
  timestamp,
  duration,
}: {
  timestamp: number;
  duration: string;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const now = Math.floor(Date.now() / 1000); // Current time in Unix seconds
      const endTime = timestamp + parseInt(duration, 10);
      const percentage = Math.min(
        ((now - timestamp) / (endTime - timestamp)) * 100,
        100
      );
      setProgress(percentage);
    };

    updateProgress(); // Run immediately
    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [timestamp, duration]);

  return (
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
  );
};

export default QuestInProgress;
