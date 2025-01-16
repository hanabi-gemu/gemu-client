import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import LoadingScreen from "./Screens/Loading/LoadingScreen";
import "@mysten/dapp-kit/dist/index.css";
import WalletTest from "./Components/WalletTest";
import SignTest from "./Components/SignTest";

function App() {
  const account = useCurrentAccount();

  return (
    <>
      <LoadingScreen />
      <div className="bg-slate-300 w-screen h-screen flex flex-col items-center p-10">
        <h1 className="text-3xl text-red-600">Chickens</h1>
        <div className="flex mt-44 flex-col items-center">
          <div className="flex-col">
            <h1 className="w-full text-zinc-700">Lvl 4</h1>

            <div className="flex">
              <div className="w-[220px] h-[200px] border p-5 justify-self-center">
                <img
                  src="/avatar/avatar.webp"
                  alt="avatar"
                  className="w-250 h-auto"
                />
              </div>

              <div className="flex flex-col ml-2 gap-y-1">
                <div className="w-6 h-6 rounded-md border"></div>
                <div className="w-6 h-6 rounded-md border"></div>
                <div className="w-6 h-6 rounded-md border"></div>
              </div>
            </div>
            <div className="my-4">
              <ConnectButton className="bg-blue-500! hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
            </div>
          </div>
          <div className="my-10">
            {account?.address && <WalletTest address={account.address} />}
          </div>
          <div className="">
            {account?.address && <SignTest address={account.address} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
