import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./Context/Wallet";
import Login from "./Components/Login";
import Wallet from "./Components/Wallet";
import Callback from "./Components/Callback";
import { ZKLoginProvider } from "./Context/ZKLogin";
import { SuiClientProvider } from "./Context/SuiClient";

const App = () => (
  <Router>
    <SuiClientProvider>
      <ZKLoginProvider>
        <WalletProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </WalletProvider>
      </ZKLoginProvider>
    </SuiClientProvider>
  </Router>
);

export default App;
