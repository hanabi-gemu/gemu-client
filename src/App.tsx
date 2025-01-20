import React from 'react';
import Login from '&/Screens/Login';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Game from '&/Screens/Game';

const App: React.FC = () => {
  const account = useCurrentAccount();
  return (
      <div className="relative min-h-screen bg-gray-100">
        <div className="pt-5 pb-4 px-4">
          <h1 className="text-3xl font-bold text-center">GEMU</h1>
          <p className="text-center text-gray-600 mt-4"></p>
        </div>
        <div className="flex-grow">
          {account? <Game/> : <Login/>}
        </div>
      </div>
  );
};

export default App;

