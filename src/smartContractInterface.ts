const packageId = import.meta.env.PACKAGE_ID;
export const gemuObjectAddress = import.meta.env.GEMU_OBJECT_ADDRESS;

const gemuModule = "gemu"
const registerPlayer = "register_player"
const levelUpPlayer= "level_up"
const goHunting= "go_hunting"
const coinModule = "coin"
const suiPackageId = "0x2"
const coinType = "Coin"
const gemuType = "GEMU"
export const gemuCoinStruct = `${suiPackageId}::${coinModule}::${coinType}<${packageId}::${gemuModule}::${gemuType}>`
export const registerPlayerAddress = `${packageId}::${gemuModule}::${registerPlayer}`
export const levelUpAddress = `${packageId}::${gemuModule}::${levelUpPlayer}`
export const goHuntingAddress = `${packageId}::${gemuModule}::${goHunting}`
export const playerStruct = `${packageId}::${gemuModule}::Player`
