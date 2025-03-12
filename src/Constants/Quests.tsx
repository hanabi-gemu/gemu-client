type QuestDetails = {
  type: string;
  fields: {
    quest_id: string;
    quest_type: string;
  };
};

type QuestRequirements = {
  type: string;
  fields: {
    bitterness: string;
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
  type: string;
  fields: {
    gold: string;
    material_amounts: string[];
    material_ids: string[];
    rolls: string;
    xp: string;
  };
};

export type Quest = {
  details: QuestDetails;
  duration: string;
  requirements: QuestRequirements;
  rewards: QuestRewards;
};

export const quests: Quest[] = [
  {
    details: {
      type: "0x64605be182e329ca4a55f84d33ffe3d82d66bc91552a11fe965a5c74b6bd6748::quest::Details",
      fields: {
        quest_id: "1",
        quest_type: "0",
      },
    },
    duration: "0",
    requirements: {
      type: "0x64605be182e329ca4a55f84d33ffe3d82d66bc91552a11fe965a5c74b6bd6748::quest::Requirements",
      fields: {
        bitterness: "0",
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
      type: "0x64605be182e329ca4a55f84d33ffe3d82d66bc91552a11fe965a5c74b6bd6748::quest::Rewards",
      fields: {
        gold: "1",
        material_amounts: [],
        material_ids: [],
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    details: {
      type: "0x64605be182e329ca4a55f84d33ffe3d82d66bc91552a11fe965a5c74b6bd6748::quest::Details",
      fields: {
        quest_id: "2",
        quest_type: "0",
      },
    },
    duration: "60000",
    requirements: {
      type: "0x64605be182e329ca4a55f84d33ffe3d82d66bc91552a11fe965a5c74b6bd6748::quest::Requirements",
      fields: {
        bitterness: "0",
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
      type: "0x64605be182e329ca4a55f84d33ffe3d82d66bc91552a11fe965a5c74b6bd6748::quest::Rewards",
      fields: {
        gold: "1",
        material_amounts: [],
        material_ids: [],
        rolls: "1",
        xp: "100",
      },
    },
  },
];
