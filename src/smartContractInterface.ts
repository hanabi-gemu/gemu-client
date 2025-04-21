const packageId = import.meta.env.VITE_PACKAGE_ID;
export const playerObjectId = import.meta.env.VITE_PLAYER_OBJECT_ADDRESS;
export const questManagerId = import.meta.env.VITE_QUEST_MANAGER_ADDRESS;
export const goldManagerId = import.meta.env.VITE_GOLD_MANAGER_ADDRESS;
export const claimsId = import.meta.env.VITE_CLAIMS_ADDRESS;

// This should come from our backend
export const towerObjectId = import.meta.env.VITE_TOWER_OBJECT_ADDRESS;

const playerModule = "player";
const claimModule = "claim";
const questModule = "quest";
const registerPlayer = "register_player";
const start_quest = "start_quest";
const claim_timed_quest_reward = "claim_timed_quest_reward";
const levelUpPlayer = "level_up";
const coinModule = "coin";
const goldModule = "gold";
const suiPackageId = "0x2";
const coinType = "Coin";
const towerModule = "tower";

export const registerPlayerId = `${packageId}::${playerModule}::${registerPlayer}`;
export const startQuestId = `${packageId}::${questModule}::${start_quest}`;
export const levelUpId = `${packageId}::${playerModule}::${levelUpPlayer}`;
export const rollDicesId = `${packageId}::${towerModule}::roll_dices`;
export const playerStructType = `${packageId}::${playerModule}::Player`;
export const claimDailyRewardStruct = `${packageId}::${claimModule}::claim_daily_reward`;
export const receiptStruct = `${packageId}::${questModule}::Receipt`;
export const claimReceiptStruct = `${packageId}::${questModule}::${claim_timed_quest_reward}`;
export const goldStruct = `${suiPackageId}::${coinModule}::${coinType}<${packageId}::${goldModule}::GOLD>`;

export const SUI_RANDOM_OBJECT_ID= "0x0000000000000000000000000000000000000000000000000000000000000008"
