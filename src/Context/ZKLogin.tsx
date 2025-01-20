import { createContext, useState, useContext, useCallback } from 'react';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { generateRandomness } from '@mysten/sui/zklogin';

type ZKLoginState = {
  keyPair: Ed25519Keypair;
  randomValue: string;
  regenerateValues: () => Promise<{ keyPair: Ed25519Keypair; randomValue: string }>;
};

const ZKLoginContext = createContext<ZKLoginState | null>(null);

export function ZKLoginProvider({ children }: { children: React.ReactNode }) {
  const [keyPair, setKeyPair] = useState<Ed25519Keypair>(() => {
    const stored = sessionStorage.getItem('zkKeyPair');
    try {
      return stored ? Ed25519Keypair.fromSecretKey(JSON.parse(stored)) : new Ed25519Keypair();
    } catch {
      return new Ed25519Keypair();
    }
  });

  const [randomValue, setRandomValue] = useState(() =>
    sessionStorage.getItem('zkRandomness') || generateRandomness()
  );

  const regenerateValues = useCallback(async () => {
    const newKeyPair = new Ed25519Keypair();
    const newRandomness = generateRandomness();

    // Update state
    setKeyPair(newKeyPair);
    setRandomValue(newRandomness);

    // Store in session
    sessionStorage.setItem('zkKeyPair', JSON.stringify(newKeyPair.getSecretKey()));
    sessionStorage.setItem('zkRandomness', newRandomness);

    // Return the new values
    return { keyPair: newKeyPair, randomValue: newRandomness };
  }, []);

  const value = {
    keyPair,
    randomValue,
    regenerateValues
  };

  return (
    <ZKLoginContext.Provider value={value}>
      {children}
    </ZKLoginContext.Provider>
  );
}

export function useZKLogin() {
  const context = useContext(ZKLoginContext);
  if (!context) {
    throw new Error('useZKLogin must be used within ZKLoginProvider');
  }
  return context;
}
