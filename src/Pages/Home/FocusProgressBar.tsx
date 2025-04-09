import usePlayer from "@/Hooks/usePlayer";
import { Fonts } from "@/TwClassnames/Fonts";
import focusIcon from "./focus-icon.png";

const MAX_MANA = 100; // Replace with dynamic max if needed

function FocusProgressBar() {
  const { player } = usePlayer();

  if (!player) return null;

  const mana = Number(player.mana);
  const safeMana = isNaN(mana) ? 0 : mana;

  const manaPercentage = Math.min((safeMana / MAX_MANA) * 100, 100);

  return (
    <div className="w-[200px] h-[20px] border-[2px] border-pip-white relative rounded-[100px]">
      {/* Current Focus */}
      <div
        className="absolute left-0 top-0 h-full bg-[#C156E9] transition-all duration-300 ease-in-out rounded-[100px]"
        style={{ width: `${manaPercentage}%` }}
      />
      {/* Empty background */}
      <div className="w-full h-full bg-[#F8E4FF] rounded-[100px]" />
      <div className="absolute top-0 left-[35px]">
        <svg
          width="71"
          height="18"
          viewBox="0 0 71 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.6">
            <rect
              width="18"
              height="100"
              transform="translate(57.4062 -43.1719) rotate(45)"
              fill="white"
            />
          </g>
        </svg>
      </div>
      <div className="absolute top-0 left-[10px]">
        <svg
          width="71"
          height="18"
          viewBox="0 0 71 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.4">
            <rect
              width="18"
              height="100"
              transform="translate(57.4062 -43.1719) rotate(45)"
              fill="white"
            />
          </g>
        </svg>
        <div className="flex items-center absolute top-0 w-[70px] left-[90%]">
          <div className={`${Fonts.pip.caption.medium} text-[#470062]`}>
            {manaPercentage} /
          </div>
          <div className={`${Fonts.pip.caption.medium} text-[#470062]`}>
            100
          </div>
        </div>
        <img src={focusIcon} className="absolute top-[-10px] left-[-25px]" />
      </div>
    </div>
  );
}

export default FocusProgressBar;
