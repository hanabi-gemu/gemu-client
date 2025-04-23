import React from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import MainLayout from "./Pages/Main/MainLayout";
import Login from "./Pages/Login";
import useWindowWidth from "./Hooks/useWindowWidth";
import MainLayoutMobile from "./Pages/Main/MainLayoutMobile";

const App: React.FC = () => {
  const account = useCurrentAccount();
  const isMobile = useWindowWidth();

  if (!account) {
    return <div className="flex-grow"><Login /></div>;
  }

  return (
    <div className="">
      {isMobile ? (
        <div className="flex-grow">
          <MainLayoutMobile />
        </div>
      ) : (
        <div className="flex-grow">
          <MainLayout />
        </div>
      )}
    </div>
  );
};

export default App;
