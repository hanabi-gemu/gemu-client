import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from '&/Components/NavBar';
import Wallet from '&/Screens/Wallet';
import Player from '&/Screens/Player';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow bg-white rounded-lg shadow-md p-6 overflow-auto">
        <Router>
          {/* Main Content Area */}
          < Routes >
            <Route path="/" element={<Navigate to="/player" replace={true} />}/>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/player" element={<Player />} />
          </Routes >
          {/* Bottom Navbar */}
          < NavBar />
        </Router>
      </div>
    </div>
  );
};

export default App;
