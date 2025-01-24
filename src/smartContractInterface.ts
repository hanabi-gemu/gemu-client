const packageId = "0x6d3f210eb0081c4c93456f471ab122c113191b3083612b6ea0e4f49d57209562";
const gemuModule = "gemu"
const registerPlayer = "register_player"
const levelUpPlayer= "level_up"
const goHunting= "go_hunting"
const coinModule = "coin"
const suiPackageId = "0x2"
const coinType = "Coin"
const gemuType = "GEMU"
export const gemuCoinStruct = `${suiPackageId}::${coinModule}::${coinType}<${packageId}::${gemuModule}::${gemuType}>`
"0x2::coin::Coin<0x6d3f210eb0081c4c93456f471ab122c113191b3083612b6ea0e4f49d57209562::gemu::GEMU>"
export const registerPlayerAddress = `${packageId}::${gemuModule}::${registerPlayer}`
export const levelUpAddress = `${packageId}::${gemuModule}::${levelUpPlayer}`
export const goHuntingAddress = `${packageId}::${gemuModule}::${goHunting}`
export const gemuObjectAddress = "c218372fbdb2a41b7a501178c5582024ad8e6194aa3448d561655d91b916273c";
export const playerStruct = `${packageId}::${gemuModule}::Player`
