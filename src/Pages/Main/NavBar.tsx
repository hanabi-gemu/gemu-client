import { Route } from "@/Constants/NavBar";
import useWindowWidth from "@/Hooks/useWindowWidth";
import { Fonts } from "@/TwClassnames/Fonts";
import { Link } from "react-router-dom";

function NavBar({ routes }: { routes: Route[] }) {
  const isMobile = useWindowWidth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="flex justify-between min-w-0 overflow-x-auto px-5">
        {routes.map((route, index) => (
          <Link to={route.route} className="text-center py-2" key={index}>
            <div className="flex flex-col items-center group">
              {/* <div
                className={` rounded-full w-[45px] h-[45px] bg-shadow group-hover:bg-shadow2 ${Events.Hover} group`}
              ></div> */}
              <div className="w-[48px[] h-[48px]">{route.icon}</div>
              {!isMobile && (
                <div
                  className={`flex items-center justify-center gap-1 ${Fonts.Headings.Title.Bold} group-hover:text-blue-600 group`}
                >
                  <div className="whitespace-nowrap mt-6">{route.label}</div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
