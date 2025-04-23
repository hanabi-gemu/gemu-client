import { mintPlayer } from "@/Actions/MintPlayer";
import Spinner from "@/Components/Spinner";
import useFetchPlayer from "@/Hooks/useFetchPlayer";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useState } from "react";

function RegisterPlayer() {
  const { refetch } = useFetchPlayer();
  const account = useCurrentAccount();
  const [loading, setLoading] = useState(false);

  const handleMintPlayer = async () => {
    setLoading(true);
    try {
      if (!account) {
        throw new Error("No wallet connected");
      }
      await mintPlayer(account.address);

      await refetch(); // Refresh player data after minting
      setLoading(false);
    } catch (err) {
      console.error("Error during transaction:", err);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <button className="border p-2 rounded" onClick={handleMintPlayer}>
            Mint Player
          </button>
        )}
      </div>
    </div>
  );
}

export default RegisterPlayer;
