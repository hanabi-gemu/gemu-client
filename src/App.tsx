import React from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import MainLayout from "./Pages/Main/MainLayout";
import Login from "./Pages/Login";
import useWindowWidth from "./Hooks/useWindowWidth";
import MainLayoutMobile from "./Pages/Main/MainLayoutMobile";

const App: React.FC = () => {
  const account = useCurrentAccount();
  const isMobile = useWindowWidth();
  return (
    <div className="">
      {isMobile ? (
        <div className="flex-grow">
          {account ? <MainLayoutMobile /> : <Login />}
        </div>
      ) : (
        <div className="flex-grow">{account ? <MainLayout /> : <Login />}</div>
      )}
    </div>
  );
};

export default App;
