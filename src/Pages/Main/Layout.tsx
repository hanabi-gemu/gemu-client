import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "@/Constants/NavBar";
import NavBar from "./NavBar";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow bg-white rounded-lg shadow-md p-6 overflow-auto w-max-[1980px] mx-auto md:min-w-[800px]">
        <Router>
          <Routes location={"/Home"}>
            {routes.map(({ route, element }) => (
              <Route key={route} path={route} element={element} />
            ))}
          </Routes>
          {/* Bottom Navbar */}
          <NavBar routes={routes} />
        </Router>
      </div>
    </div>
  );
};

export default Main;
