import { User } from "oidc-client";
import { createContext, useState, useContext, ReactNode } from "react";

type Wallet = {
  address: string;
  provider: string;
};

type WalletContextType = {
  wallet: Wallet | null; // Wallet can be null initially
  createWallet: (provider: string, address: string) => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null); // Explicitly allow null

  const createWallet = (provider: string, address: string): void => {
    const newWallet: Wallet = {
      address,
      provider,
    };
    setWallet(newWallet);
  };

  return (
    <WalletContext.Provider value={{ wallet, createWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
;
