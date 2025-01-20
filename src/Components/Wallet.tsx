import { useWallet } from "../Context/Wallet";

const Wallet = () => {
  const { wallet } = useWallet();

  if (!wallet) {
    return <p>No wallet created. Please log in.</p>;
  }

  return (
    <div>
      <h2>Your Wallet</h2>
      <p><strong>Address:</strong> {wallet.address}</p>
      <p><strong>Provider:</strong> {wallet.provider}</p>
    </div>
  );
};

export default Wallet;
