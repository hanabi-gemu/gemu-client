import { Route } from "@/Constants/NavBar";
import { Fonts } from "@/TwClassnames/Fonts";
import { Link } from "react-router-dom";
import logo from "./pip-logo.png";
import ProfileWidget from "./ProfileWidget";

function NavBar({ routes }: { routes: Route[] }) {
  return (
    <div className="fixed top-0 left-0 bg-white w-full h-[80px] flex items-center px-10">
      {/* Left: Logo and profile */}
      <div className="flex gap-6 items-center">
        <div className="mb-[-40px]">
          <img
            src={logo}
            width={80}
            height={80}
            className="object-scale-down w-[94px] h-[101px]"
          />
        </div>
        <ProfileWidget />
      </div>

      {/* Center: Routes nav - absolutely centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center px-5 gap-8">
        {routes.map((route, index) => (
          <Link to={route.route} className="text-center" key={index}>
            {route.label === "Weekly Challenge" ? (
              <WeeklyChallengeButton />
            ) : (
              <div className="flex flex-col items-center group">
                <div
                  className={`flex items-center justify-center gap-1 ${Fonts.Headings.Title.Bold} group-hover:text-blue-600 group`}
                >
                  <div
                    className={`whitespace-nowrap mt-6 ${Fonts.pip.super_cartoon.h4}`}
                  >
                    {route.label}
                  </div>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default NavBar;

function WeeklyChallengeButton() {
  return (
    <div
      className="p-3 w-[290px] h-[48px] bg-pip-yellow-base hover:bg-pip-yellow-tint
		transition-all duration-300 ease-in-out
		 border-pip-yellow-dark border-[2px] rounded-xl relative"
    >
      <div className={`${Fonts.pip.super_cartoon.h4}`}>Weekly Challenge</div>
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
