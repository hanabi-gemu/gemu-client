import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "@/Pages/Main/NavBar";
import Wallet from "@/Pages/Wallet";
import GameLayout from "@/Pages/Game/Layout.tsx";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow bg-white rounded-lg shadow-md p-6 overflow-auto">
        <Router>
          {/* Main Content Area */}
          <Routes>
            <Route path="/" element={<Navigate to="/game" replace={true} />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/game" element={<GameLayout />} />
          </Routes>
          {/* Bottom Navbar */}
          <NavBar />
        </Router>
      </div>
    </div>
  );
};

export default Main;
