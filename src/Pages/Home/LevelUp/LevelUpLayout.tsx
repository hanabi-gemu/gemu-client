import { Player } from "@/Hooks/usePlayer";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { useState } from "react";
import LevelUpStatBox from "./LevelUpStatBox";
import useLevelUp from "@/Hooks/useLevelUp";

function LevelUpLayout({
  player,
  levels,
  onSuccess,
}: {
  levels: number;
  player: Player;
  onSuccess: VoidFunction;
}) {
  const [openAllocateStats, setOpenAllocateStats] = useState(false);
  const [allocatedPoints, setAllocatedPoints] = useState(0);
  const pointsToAllocate = levels * 5;

  const { levelUp } = useLevelUp();

  const initialStats = player.stats;

  const [stats, setStats] = useState({
    saltiness: player.stats.saltiness,
    sourness: player.stats.sourness,
    sweetness: player.stats.sweetness,
    spicy: player.stats.spicy,
  });

  const handleConfirm = () => {
    const pointsAdded = {
      saltiness: Math.abs(
        Number(stats.saltiness) - Number(initialStats.saltiness)
      ),
      sourness: Math.abs(
        Number(stats.sourness) - Number(initialStats.sourness)
      ),
      sweetness: Math.abs(
        Number(stats.sweetness) - Number(initialStats.sweetness)
      ),
      spicy: Math.abs(Number(stats.spicy) - Number(initialStats.spicy)),
    };

    levelUp(
      {
        saltiness: pointsAdded.saltiness.toString(),
        sourness: pointsAdded.sourness.toString(),
        sweetness: pointsAdded.sweetness.toString(),
        spicy: pointsAdded.spicy.toString(),
      },
      levels
    );
    onSuccess();
  };

  if (openAllocateStats)
    return (
      <div className="flex flex-col items-center gap-y-8">
        <div className={`${Fonts.Headings.Heading.Bold}`}>
          Allocate your points
        </div>
        <div className={`${Fonts.Headings.Title.Book} text-med-contrast`}>
          {allocatedPoints} /{pointsToAllocate} allocated
        </div>
        <div className="flex gap-8">
          {Object.entries(player.stats).map(([key, value]) => (
            <LevelUpStatBox
              setAllocatedPoints={setAllocatedPoints}
              stat={key as "saltiness" | "sweetness" | "sourness" | "spicy"}
              statState={stats}
              value={value}
              key={key}
              setStats={setStats}
              allocatedPoints={allocatedPoints}
              pointsToAllocate={pointsToAllocate}
            />
          ))}
        </div>
        <button
          className={`${
            Fonts.Text.Medium
          } text-bg-med p-3  rounded-[48px] bg-contrast  ${
            allocatedPoints === pointsToAllocate
              ? `${Events.Hover} `
              : `${Events.NotAllowed}`
          }`}
          onClick={() =>
            allocatedPoints === pointsToAllocate && handleConfirm()
          }
        >
          Confirm
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div
        className={`${Fonts.pip.super_cartoon.h1} text-center`}
        style={{
          WebkitTextStrokeWidth: "3px",
          WebkitTextStrokeColor: "#FFF",
        }}
      >
        Level up!
      </div>
      <div className={`${Fonts.Text.Paragraph.Medium}`}>
        You can now level up to Level {Number(player.level) + levels}
      </div>
      <div className="flex gap-4 items-center">
        <InfoSVG />
        <div className={`${Fonts.Text.Book} text-med-contrast`}>
          When you level up, you get 5 points per level to allocate to your
          stats!
        </div>
      </div>
      <div
        className={`${Fonts.Text.Medium} p-3 bg-contrast rounded-[48px] ${Events.Hover}`}
      >
        <button
          className={`${Fonts.Text.Medium} text-bg-med`}
          onClick={() => setOpenAllocateStats(true)}
        >
          Level Up & Allocate Stats
        </button>
      </div>
    </div>
  );
}

export default LevelUpLayout;

function InfoSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="#3E3E3E"
      />
    </svg>
  );
}
