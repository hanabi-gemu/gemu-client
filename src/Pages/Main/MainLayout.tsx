import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "@/Constants/NavBar";
import NavBar from "./NavBar";
import background from "./background.png";
// import PlayerLevelWidget from "../Home/PlayerLevelWidget";
// import GoldWidget from "../Home/GoldWidget";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex-grow rounded-lg p-6 w-max-[1980px]">
        <img
          src={background}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <Router>
          <div className="h-[80px]">
            <NavBar routes={routes} />
          </div>
          {/* <div className="flex justify-between mb-10">
            <PlayerLevelWidget />
            <GoldWidget />
          </div> */}
          <Routes>
            {routes.map(({ route, element }) => (
              <Route key={route} path={route} element={element} />
            ))}
          </Routes>
          {/* Bottom Navbar */}
        </Router>
      </div>
    </div>
  );
};

export default MainLayout;
