// Actions/MintPlayer.ts
export const mintPlayer = async (
  playerWalletAddress: string
): Promise<{
  playerWalletAddress: string;
  digest: string;
}> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REGISTER_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerWalletAddress }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to mint player";
    throw new Error(message);
  }
};
