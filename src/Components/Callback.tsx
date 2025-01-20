import { useContext, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateNonce, generateRandomness, jwtToAddress, parseZkLoginSignature } from '@mysten/sui/zklogin';
import { getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin';
import { useZKLogin } from "../Context/ZKLogin.tsx";
import { SuiClientContext } from "../Context/SuiClient.tsx";
import { useWallet } from "../Context/Wallet.tsx";
import { ZKLOGIN_CONFIG } from "../zkLoginConfig.ts";

type ZkLoginSignature = ReturnType<typeof parseZkLoginSignature>;
export type PartialZkLoginSignature = Omit<
    ZkLoginSignature['inputs'],
    'addressSeed'
>;

const getZkProof = async (jwt: string, salt: string, extendedEphemeralPublicKey: string, maxEpoch: number, randomness: string): Promise<ZkLoginSignature> => {
  const response = await fetch('https://prover-dev.mystenlabs.com/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jwt,
      salt,
      extendedEphemeralPublicKey,
      maxEpoch,
      jwtRandomness: randomness,
      keyClaimName: 'sub'
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to get ZK proof: ${data.message}`);
  }
  return data;
};

const Callback = () => {
  const { createWallet } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const { keyPair, randomValue } = useZKLogin();
  const { maxEpoch } = useContext(SuiClientContext)!;
  const processed = useRef(false);

  const processCallback = useCallback(async () => {
    if (processed.current) {
      return;
    }
    processed.current = true;

    try {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const idToken = hashParams.get('id_token');

      if (!idToken) {
        throw new Error('No ID token found in callback URL');
      }

      const providerKey = Object.keys(ZKLOGIN_CONFIG.providers)[0];
      let salt = localStorage.getItem('userSalt');

      if (!salt) {
        salt = generateRandomness();
        localStorage.setItem('userSalt', salt);
      }

      const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
        keyPair.getPublicKey()
      );

      console.log('callback nonce:', generateNonce(keyPair.getPublicKey(), maxEpoch!, randomValue));

      const zkProof = await getZkProof(
        idToken,
        salt,
        extendedEphemeralPublicKey,
        maxEpoch!,
        randomValue
      );

      const partialZkLoginSignature = zkProof.inputs as PartialZkLoginSignature;
      console.log('zkProof:', zkProof);
      console.log('partialZkLoginSignature:', partialZkLoginSignature);

      const address = jwtToAddress(idToken, salt);
      createWallet(providerKey, address);
      navigate('/wallet');
    } catch (error) {
      console.error("Error processing callback:", error);
      navigate('/');
    }
  }, [keyPair, randomValue, maxEpoch, location.hash, createWallet, navigate]);

  useEffect(() => {
    processCallback();
  }, [processCallback]);

  return <div>Processing login...</div>;
};

export default Callback;
