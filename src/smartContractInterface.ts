const packageId = import.meta.env.VITE_PACKAGE_ID;
export const playerObjectAddress = import.meta.env.VITE_PLAYER_OBJECT_ADDRESS;
export const questManagerAddress = import.meta.env.VITE_QUEST_MANAGER_ADDRESS;
export const goldManagerAddress = import.meta.env.VITE_GOLD_MANAGER_ADDRESS;

const playerModule = "player";
const questModule = "quest";
const registerPlayer = "register_player";
const start_board_quest = "start_board_quest";
const claim_timed_quest_reward = "claim_timed_quest_reward";
const levelUpPlayer = "level_up";
const goHunting = "go_hunting";
const coinModule = "coin";
const goldModule = "gold";
const suiPackageId = "0x2";
const coinType = "Coin";
const gemuType = "GEMU";

export const gemuCoinStruct = `${suiPackageId}::${coinModule}::${coinType}<${packageId}::${playerModule}::${gemuType}>`;
export const registerPlayerAddress = `${packageId}::${playerModule}::${registerPlayer}`;
export const startBoardQuestAddress = `${packageId}::${questModule}::${start_board_quest}`;
export const levelUpAddress = `${packageId}::${playerModule}::${levelUpPlayer}`;
export const goHuntingAddress = `${packageId}::${playerModule}::${goHunting}`;
export const playerStruct = `${packageId}::${playerModule}::Player`;
export const receiptStruct = `${packageId}::${questModule}::Receipt`;
export const claimReceiptStruct = `${packageId}::${questModule}::${claim_timed_quest_reward}`;
export const goldStruct = `${suiPackageId}::${coinModule}::${coinType}<${packageId}::${goldModule}::GOLD>`;
