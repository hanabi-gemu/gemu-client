import { Route } from "@/Constants/NavBar";
import { Link } from "react-router-dom";

function NavBarMobile({ routes }: { routes: Route[] }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="flex justify-around min-w-0 overflow-x-auto px-5">
        {routes.map((route, index) => (
          <Link to={route.route} className="text-center py-2" key={index}>
            <div className="flex flex-col items-center group">
              <div className="w-[22px] h-[24px]">{route.icon}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBarMobile;
