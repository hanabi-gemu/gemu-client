import { Player } from "@/Hooks/usePlayer";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { useEffect, useState } from "react";
import LevelUpStatBox from "./LevelUpStatBox";
import bgSource from "./radial-yellow.png";
import diamondSrc from "./diamond.png";
import lightningIcon from "./lightning.png";
import useLevelUp from "@/Hooks/useLevelUp";
import {xpToLevelUp} from "@/Hooks/useXp";
function LevelUpLayout({
  player,
  levels,
  percentage,
  onSuccess,
}: {
  levels: number;
  player: Player;
  percentage: number;
  onSuccess: VoidFunction;
}) {
  const [openAllocateStats, setOpenAllocateStats] = useState(false);
  const [allocatedPoints, setAllocatedPoints] = useState(0);
  const pointsToAllocate = levels * 4;

  const { levelUp } = useLevelUp();

  const initialStats = player.stats;

  const [stats, setStats] = useState({
    saltiness: player.stats.saltiness,
    sourness: player.stats.sourness,
    sweetness: player.stats.sweetness,
    spicy: player.stats.spicy,
  });

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(async () => {
        // Reset to 0 then animate to target
        setProgressPercentage(0);
        setTimeout(() => {
          setProgressPercentage(percentage);
        }, 50); // Small delay to ensure DOM update
    }, 5000);

    return () => clearTimeout(timer);
  }, [percentage]);

  const handleConfirm = () => {
    const pointsAdded = {
      saltiness: Math.abs(
        stats.saltiness - initialStats.saltiness
      ),
      sourness: Math.abs(
        stats.sourness - initialStats.sourness
      ),
      sweetness: Math.abs(
        stats.sweetness - initialStats.sweetness
      ),
      spicy: Math.abs(stats.spicy - initialStats.spicy),
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
      <div className="flex flex-col items-center gap-y-8 mt-6">
        <div
          className={`${Fonts.pip.super_cartoon.h2} text-center z-10`}
          style={{
            WebkitTextStrokeWidth: "2px",
            WebkitTextStrokeColor: "#FFF",
          }}
        >
          Allocate your points
        </div>
        <div className={`${Fonts.Headings.Title.Book} text-med-contrast`}>
          {allocatedPoints} /{pointsToAllocate} allocated
        </div>
        <div className="flex gap-8 flex-col">
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
        <Button
          disabled={allocatedPoints !== pointsToAllocate}
          label="Allocate"
          onClick={() =>
            allocatedPoints === pointsToAllocate && handleConfirm()
          }
        />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-y-8 justify-center mt-10">
      <img
        src={bgSource}
        alt="bg"
        className="absolute top-[70px] left-0 w-full z-0"
      />
      <div className="relative">
        <img
          src={diamondSrc}
          alt="diamond"
          width={145}
          height={140}
          className="w-[145px] h-[145px] relative z-10"
        />
        <div className="absolute top-[40%] left-0 w-full flex flex-col h-[30px]">
          <p
            className={`font-super-comic text-center z-10 text-lg`}
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#FFF",
            }}
          >
            Level
          </p>
          <p
            className={`font-super-comic text-center z-10 text-xl`}
            style={{
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#FFF",
            }}
          >
            {Number(player.level) + levels}
          </p>
        </div>
      </div>
      <div
        className={`${Fonts.pip.super_cartoon.h1} text-center z-10`}
        style={{
          WebkitTextStrokeWidth: "3px",
          WebkitTextStrokeColor: "#FFF",
        }}
      >
        Level up!
      </div>
      <div className={`${Fonts.Text.Paragraph.Medium}  z-10`}>
        You can now level up to Level {player.level + levels}
      </div>

      {/* Level progress bar */}
      <div className="p-2 border-[2px] border-pip-gray-200 rounded-[100px] flex items-center bg-pip-white z-10">
        <img src={lightningIcon} />
        <div className="h-[23px] w-[410px] bg-pip-yellow-tint rounded-[100px]">
          {/* Filled portion based on progressPercentage */}
          <div
            className="h-[23px] bg-pip-yellow-base rounded-[100px] transition-all duration-500 ease-in-out delay-400"
            style={{ width: `${progressPercentage}%` }}
          >
            <div
              className={`${Fonts.pip.body.emphasized} flex items-center justify-center`}
            >
              {player.xp}/{xpToLevelUp(player.level, 1)} XP
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center px-10 z-10">
        <div
          className={`${Fonts.pip.caption.medium} text-center text-[#00AD11]`}
        >
          When you level up, you get 5 points per level to allocate to your
          stats!
        </div>
      </div>
      <Button
        onClick={() => setOpenAllocateStats(true)}
        label="Allocate Stats"
      />
    </div>
  );
}

export default LevelUpLayout;

function Button({
  onClick,
  label,
  disabled = false,
}: {
  onClick: VoidFunction;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`p-3 w-[290px] h-[48px] bg-pip-yellow-base
		transition-all duration-300 ease-in-out rounded-xl relative  justify-center
		items-center flex ${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : `${Events.Hover} hover:bg-pip-yellow-tint`
    }`}
      onClick={() => !disabled && onClick()}
    >
      <div className={`${Fonts.pip.h3.bold} text-pip-yellow-dark`}>{label}</div>
      <div className="absolute top-[-1px] left-[-18%]">
        <svg
          width="106"
          height="45"
          viewBox="0 0 106 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="94.5"
              y="-64.3828"
              width="13"
              height="248"
              transform="rotate(30 94.5 -64.3828)"
              fill="white"
              fillOpacity="0.6"
            />
          </g>
        </svg>
      </div>
      <div className="absolute top-[1px] left-[-19%]">
        <svg
          width="95"
          height="45"
          viewBox="0 0 95 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="83.2422"
              y="-70.8828"
              width="13"
              height="248"
              transform="rotate(30 83.2422 -70.8828)"
              fill="white"
              fillOpacity="0.4"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
