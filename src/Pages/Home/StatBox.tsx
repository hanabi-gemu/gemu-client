import { Fonts } from "@/TwClassnames/Fonts";
import saltIcon from "./salt.png";
import sweetIcon from "./sweet.png";
import chillyIcon from "./chilly.png";
import lemonIcon from "./lemon.png";
import { tw } from "@/Utils/tailwindIntel";

function StatBox({ stat, value }: { stat: string; value: string }) {
  type statType = "saltiness" | "sourness" | "umami" | "sweetness";

  const icons = {
    saltiness: saltIcon,
    sourness: lemonIcon,
    umami: chillyIcon,
    sweetness: sweetIcon,
  };

  const colors = {
    saltiness: tw`bg-pip-blue-light`,
    sourness: tw`bg-pip-yellow-pastel`,
    umami: tw`bg-pip-red-tint`,
    sweetness: tw`bg-pip-rose-tint`,
  };

  return (
    <div
      className={`flex flex-col items-center rounded-lg w-[104px] h-[114px] justify-center 
				border-[2px] border-pip-gray-200 p-1 relative ${colors[stat as statType]}`}
    >
      <img src={icons[stat as statType]} height={65} className="z-[2]" />
      <p
        className={`${Fonts.pip.super_cartoon.h4} mt-2 z-[2]`}
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#FFF",
        }}
      >
        {value}
      </p>
      <div className="absolute z-[1] top-[-3px] left-[-2px]">
        <svg
          width="104"
          height="115"
          viewBox="0 0 104 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-xl"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="139.191"
              y="-30.3076"
              width="13"
              height="248"
              transform="rotate(45 139.191 -30.3076)"
              fill="white"
              fillOpacity="0.9"
            />
          </g>
        </svg>
      </div>
      <div className="absolute z-[1] top-0 ">
        <svg
          width="104"
          height="115"
          viewBox="0 0 104 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-lg"
        >
          <g style={{ mixBlendMode: "hard-light" }}>
            <rect
              x="130"
              y="-39.5"
              width="13"
              height="248"
              transform="rotate(45 130 -39.5)"
              fill="white"
              fillOpacity="0.4"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default StatBox;
