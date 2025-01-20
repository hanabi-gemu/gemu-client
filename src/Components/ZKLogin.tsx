//import { generateNonce, generateRandomness } from '@mysten/sui/zklogin';
//import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
//import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
//
//const rpcUrl = getFullnodeUrl("testnet");
//const suiClient = new SuiClient({ url: rpcUrl });
//const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();
//
//const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
//const ephemeralKeyPair = new Ed25519Keypair();
//const randomness = generateRandomness();
//const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
