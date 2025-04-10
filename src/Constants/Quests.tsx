type QuestRequirements = {
  fields: {
    energy: string;
    level: string;
    mana: string;
    saltiness: string;
    sourness: string;
    sweetness: string;
    umami: string;
  };
};

type QuestRewards = {
  fields: {
    gold: string;
    rolls: string;
    xp: string;
  };
};

export type Quest = {
  duration: string;
  requirements: QuestRequirements;
  rewards: QuestRewards;
  quest_type: string;
  quest_id: string;
  name: string;
};

export const quests: Quest[] = [
  {
    name: "Explore the temple",
    quest_id: "1",
    duration: "15000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "0",
        mana: "0",
        saltiness: "0",
        sourness: "0",
        sweetness: "0",
        umami: "0",
      },
    },
    rewards: {
      fields: {
        gold: "1",
        rolls: "1",
        xp: "10000",
      },
    },
  },
  {
    name: "Go instant quest!",
    quest_id: "98",
    duration: "15000",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "0",
        level: "0",
        mana: "0",
        saltiness: "0",
        sourness: "0",
        sweetness: "0",
        umami: "0",
      },
    },
    rewards: {
      fields: {
        gold: "1",
        rolls: "1",
        xp: "100",
      },
    },
  },
];
