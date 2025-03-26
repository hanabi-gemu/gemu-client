import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { useState } from "react";

function LevelUpStatBox({
  stat,
  value,
  setStats,
  allocatedPoints,
  setAllocatedPoints,
  statState,
  pointsToAllocate,
}: {
  stat: "saltiness" | "sweetness" | "sourness" | "umami";
  value: string;
  pointsToAllocate: number;
  allocatedPoints: number;
  setAllocatedPoints: React.Dispatch<React.SetStateAction<number>>;
  statState: {
    bitterness: string;
    saltiness: string;
    sourness: string;
    sweetness: string;
    umami: string;
  };
  setStats: React.Dispatch<
    React.SetStateAction<{
      bitterness: string;
      saltiness: string;
      sourness: string;
      sweetness: string;
      umami: string;
    }>
  >;
}) {
  const initialValue = Number(value); // Ensure it's treated as a number
  const [points, setPoints] = useState(initialValue);

  const handleAddPoint = () => {
    if (allocatedPoints < pointsToAllocate) {
      const newPoints = points + 1;
      setPoints(newPoints);
      setStats((current) => ({ ...current, [stat]: String(newPoints) }));
      setAllocatedPoints((prev) => prev + 1);
    }
  };

  const handleSubtractPoint = () => {
    if (allocatedPoints > 0 && Number(statState[stat]) > initialValue) {
      const newPoints = points - 1;
      setPoints(newPoints);
      setStats((current) => ({ ...current, [stat]: String(newPoints) }));
      setAllocatedPoints((prev) => prev - 1);
    }
  };

  return (
    <div className="flex">
      <div
        className={`rounded-full bg-bg-button p-2 w-[39px] h-[38px] flex justify-center ${
          allocatedPoints === 0 || Number(statState[stat]) <= initialValue
            ? "opacity-50 cursor-not-allowed"
            : Events.Hover
        }`}
        onClick={handleSubtractPoint}
      >
        -
      </div>
      <div className="flex flex-col items-center w-[78px] h-[56px] border-[2px] border-low-contrast p-2">
        <p className={`${Fonts.Headings.Subtitle.Bold}`}>{points}</p>
        <p className={Fonts.Text.Medium}>{stat}</p>
      </div>
      <div
        className={`rounded-full bg-bg-button p-2 w-[39px] h-[38px] flex justify-center ${
          allocatedPoints === pointsToAllocate
            ? "opacity-50 cursor-not-allowed"
            : Events.Hover
        }`}
        onClick={handleAddPoint}
      >
        +
      </div>
    </div>
  );
}

export default LevelUpStatBox;
