import { Route } from "@/Constants/NavBar";
import { Events } from "@/TwClassnames/Events";
import { Fonts } from "@/TwClassnames/Fonts";
import { Link } from "react-router-dom";

function NavBar({ routes }: { routes: Route[] }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="flex justify-between">
        {routes.map((route, index) => (
          <Link
            to={route.route}
            className="flex-1 text-center py-2"
            key={index}
          >
            <div className="flex flex-col items-center group">
              <div
                className={` rounded-full w-[45px] h-[45px] bg-shadow group-hover:bg-shadow2 ${Events.Hover} group`}
              ></div>
              <div
                className={`flex items-center justify-center gap-2 ${Fonts.Headings.Title.Bold} group-hover:text-blue-600 group`}
              >
                <div className="">{route.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
