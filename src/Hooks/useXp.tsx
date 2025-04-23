const xpForLevels = [100,500,1000,2000,3000,4000,5500,7000,10000];

// Calculates the XP needed to level up given a starting level and desired levels to gain.
export function xpToLevelUp(startLevel: number, levelsToGain: number) {
  let totalXp = 0;
  let currentLevel = startLevel;
  const targetLevel = startLevel + levelsToGain;
  while (currentLevel < targetLevel) {
    totalXp = totalXp + xpForLevels[currentLevel-1];
    currentLevel += 1;
  }
  return totalXp;
}

function calculateLevelUps(
  xp: number,
  currentLevel: number
): { levels: number; remainingXP: number } {
  let levelsGained = 0;
  let xpRemaining = xp;

  // Loop until the player doesn't have enough XP for the next level.
  while (xpRemaining >= xpToLevelUp(currentLevel + levelsGained, 1)) {
    const xpNeeded = xpToLevelUp(currentLevel + levelsGained, 1);
    xpRemaining -= xpNeeded;
    levelsGained++;
  }


  return { levels: levelsGained, remainingXP: xpRemaining };
}

export default function useXp(level: number, xp: number) {
  const xpForNextLevel = xpToLevelUp(level, 1);

  const percentage = Math.min(
    (xp / xpForNextLevel) * 100,
    100
  );

  const { levels } = calculateLevelUps(xp, level);

  return { percentage, levels}
}
