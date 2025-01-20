import { ZKLOGIN_CONFIG } from "../zkLoginConfig.ts";
import { useZKLogin } from "../Context/ZKLogin.tsx";
import { useSuiClient } from "../Context/SuiClient.tsx";
import { generateNonce } from "@mysten/sui/zklogin";

const Login = () => {
  const { regenerateValues } = useZKLogin();
  const { maxEpoch } = useSuiClient();

  const loginWithProvider = async (providerKey: string) => {
    const { keyPair, randomValue } = await regenerateValues();
    const provider = ZKLOGIN_CONFIG.providers[providerKey];
    if (!provider) {
      alert("Provider not supported");
      return;
    }
    const CLIENT_ID = ZKLOGIN_CONFIG.providers.google.clientId
    const REDIRECT_URI = ZKLOGIN_CONFIG.redirectUri
    const nonce = generateNonce(keyPair.getPublicKey(), maxEpoch, randomValue);
    try {
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "id_token",
        scope: "openid",
        nonce: nonce,
      });
      const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
      window.location.replace(loginURL);;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Login with zkLogin</h1>
      {Object.keys(ZKLOGIN_CONFIG.providers).map((key) => (
        <button key={key} onClick={() => { loginWithProvider(key) }}>
          Login with {key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Login;
