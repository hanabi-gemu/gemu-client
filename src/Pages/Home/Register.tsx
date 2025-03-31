import { mintPlayer } from "@/Actions/MintPlayer";
import usePlayer from "@/Hooks/usePlayer";
import { useCurrentAccount } from "@mysten/dapp-kit";

function RegisterPlayer() {
  const { refetch } = usePlayer();
  const account = useCurrentAccount();

  const handleMintPlayer = async () => {
    try {
      if (!account) {
        throw new Error("No wallet connected");
      }
      const player = await mintPlayer(account.address);

      console.log(player);

      refetch(); // Refresh player data after minting
    } catch (err) {
      console.error("Error during transaction:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <button className="border p-2 rounded" onClick={handleMintPlayer}>
          Mint Player
        </button>
      </div>
    </div>
  );
}

export default RegisterPlayer;
