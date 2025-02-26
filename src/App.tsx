import React from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import Main from "./Pages/Main/Layout";
import Login from "./Pages/Login";

const App: React.FC = () => {
  const account = useCurrentAccount();
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="flex-grow">{account ? <Main /> : <Login />}</div>
    </div>
  );
};

export default App;
