const packageId = import.meta.env.VITE_PACKAGE_ID;
export const playerObjectAddress = import.meta.env.VITE_PLAYER_OBJECT_ADDRESS;

const playerModule = "player";
const registerPlayer = "register_player";
const levelUpPlayer = "level_up";
const goHunting = "go_hunting";
const coinModule = "coin";
const suiPackageId = "0x2";
const coinType = "Coin";
const gemuType = "GEMU";

export const gemuCoinStruct = `${suiPackageId}::${coinModule}::${coinType}<${packageId}::${playerModule}::${gemuType}>`;
export const registerPlayerAddress = `${packageId}::${playerModule}::${registerPlayer}`;
export const levelUpAddress = `${packageId}::${playerModule}::${levelUpPlayer}`;
export const goHuntingAddress = `${packageId}::${playerModule}::${goHunting}`;
export const playerStruct = `${packageId}::${playerModule}::Player`;
