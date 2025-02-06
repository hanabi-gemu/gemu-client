import { Route } from "@/Constants/NavBar";
import { Link } from "react-router-dom";

function NavBar({ routes }: { routes: Route[] }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200">
      <div className="flex justify-between">
        {routes.map((route, index) => (
          <Link
            to={route.route}
            className="flex-1 text-center py-2 text-gray-500 hover:text-blue-600"
            key={index}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="">{route.icon}</div>
              <div className="">{route.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
