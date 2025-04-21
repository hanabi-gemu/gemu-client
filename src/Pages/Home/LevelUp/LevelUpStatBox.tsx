import { Events } from "@/TwClassnames/Events";
import { useState } from "react";
import StatBox from "../StatBox";

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
    saltiness: string;
    sourness: string;
    sweetness: string;
    umami: string;
  };
  setStats: React.Dispatch<
    React.SetStateAction<{
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
    <div className="flex items-center gap-x-2">
      <div
        className={`rounded-full bg-[#FFF2F3]
					 text-[#DF0F1B] p-2 w-[45px] h-[45px] flex justify-center
					 text-2xl ${
             allocatedPoints === 0 || Number(statState[stat]) <= initialValue
               ? "opacity-50 cursor-not-allowed text-[#F3A5A9]"
               : `${Events.Hover} hover:bg-[#FFE0E2]`
           }
           }`}
        onClick={handleSubtractPoint}
      >
        -
      </div>
      <StatBox stat={stat} value={points.toString()} />
      <div
        className={`rounded-full bg-[#ECFFEE] p-2 w-[45px] h-[45px]
					 flex justify-center text-2xl
					text-[#00AD11] items-center ${
            allocatedPoints === pointsToAllocate
              ? "opacity-50 cursor-not-allowed text-[#75A87B]"
              : `${Events.Hover} hover:bg-[#D1F5D7]`
          }`}
        onClick={handleAddPoint}
      >
        +
      </div>
    </div>
  );
}

export default LevelUpStatBox;
