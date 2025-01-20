import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { createContext, useState, useEffect, useMemo, useContext } from 'react';

type SuiClientContextType = {
  suiClient: SuiClient;
  maxEpoch: number;
  isLoading: boolean;
};

export const SuiClientContext = createContext<SuiClientContextType | null>(null);

export const SuiClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [maxEpoch, setMaxEpoch] = useState<number>(() => {
    // Check sessionStorage for stored maxEpoch
    const storedMaxEpoch = sessionStorage.getItem('maxEpoch');
    return storedMaxEpoch ? Number(storedMaxEpoch) : 0;
  });

  const suiClient = useMemo(() => new SuiClient({
    url: getFullnodeUrl("devnet")
  }), []);

  useEffect(() => {
    const fetchMaxEpoch = async () => {
      try {
        const { epoch } = await suiClient.getLatestSuiSystemState();
        const newMaxEpoch = Number(epoch) + 2;
        setMaxEpoch(newMaxEpoch);
        // Store maxEpoch in sessionStorage
        sessionStorage.setItem('maxEpoch', String(newMaxEpoch));
      } catch (error) {
        console.error('Failed to fetch maxEpoch:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaxEpoch();
  }, [suiClient]);

  const contextValue = useMemo(() => ({
    suiClient,
    maxEpoch,
    isLoading
  }), [suiClient, maxEpoch, isLoading]);

  return (
    <SuiClientContext.Provider value={contextValue}>
      {children}
    </SuiClientContext.Provider>
  );
};

export const useSuiClient = () => {
  const context = useContext(SuiClientContext);

  if (!context) {
    throw new Error('useSuiClient must be used within a SuiClientProvider');
  }

  return context;
};
