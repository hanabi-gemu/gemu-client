import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "@/Constants/NavBar";
import NavBar from "./NavBar";
import PlayerLevelWidget from "../Home/PlayerLevelWidget";
import GoldWidget from "../Home/GoldWidget";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex-grow rounded-lg p-6 w-max-[1980px] mx-auto md:min-w-[800px]">
        <div className="flex justify-between mb-10">
          <PlayerLevelWidget />
          <GoldWidget />
        </div>
        <Router>
          <Routes>
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

export default MainLayout;
