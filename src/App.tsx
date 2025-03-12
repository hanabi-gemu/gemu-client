import React from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import MainLayout from "./Pages/Main/MainLayout";
import Login from "./Pages/Login";

const App: React.FC = () => {
  const account = useCurrentAccount();
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="flex-grow">{account ? <MainLayout /> : <Login />}</div>
    </div>
  );
};

export default App;
