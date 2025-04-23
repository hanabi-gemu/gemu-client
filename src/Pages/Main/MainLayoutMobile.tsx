import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "@/Constants/NavBar";
import PlayerLevelWidgetMobile from "../Home/PlayerLevelWidgetMobile";
import GoldWidgetMobile from "../Home/GoldWidgetMobile";
import NavBarMobile from "./NavBarMobile";
import useFetchPlayer from "@/Hooks/useFetchPlayer";
import { PlayerProvider } from "@/Contexts/PlayerContext";

const MainLayoutMobile: React.FC = () => {
  const { player } = useFetchPlayer();
  return (
    <>
      {player && (
        <PlayerProvider>
          <Router>
            <div className="relative overflow-hidden">
              <div className="flex flex-col p-4">
                <div className="flex-grow rounded-lg p-2 mx-auto">

                  <div className="flex gap-2 mb-10">
                    <PlayerLevelWidgetMobile />
                    <GoldWidgetMobile />
                  </div>
                  <Routes>
                    {routes.map(({ route, element }) => (
                      <Route key={route} path={route} element={element} />
                    ))}
                  </Routes>
                  {/* Bottom Navbar */}
                  <div className="h-24 w-full"></div>
                </div>
              </div>
              <NavBarMobile routes={routes} />
            </div>
          </Router>
        </PlayerProvider>
      )}
      {!player && <RegisterPlayer />}
    </>
  );
};

export default MainLayoutMobile;
