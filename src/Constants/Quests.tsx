type QuestRequirements = {
  fields: {
    energy: string;
    level: string;
    focus: string;
    saltiness: string;
    sourness: string;
    sweetness: string;
    spicy: string;
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
    name: "Bearly Escaped!",
    quest_id: "1",
    duration: "0",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "20",
        level: "1",
        focus: "0",
        saltiness: "1",
        sourness: "1",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "10",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Honey Pot",
    quest_id: "2",
    duration: "3600000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "1",
        focus: "20",
        saltiness: "1",
        sourness: "1",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "10",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Pip's Treasure Hunt",
    quest_id: "3",
    duration: "7200000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "2",
        focus: "20",
        saltiness: "2",
        sourness: "1",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "30",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Paws of Destiny",
    quest_id: "4",
    duration: "0",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "30",
        level: "2",
        focus: "0",
        saltiness: "1",
        sourness: "1",
        sweetness: "1",
        spicy: "2",
      },
    },
    rewards: {
      fields: {
        gold: "20",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Claws of Courage",
    quest_id: "5",
    duration: "21600000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "3",
        focus: "40",
        saltiness: "1",
        sourness: "2",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "50",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Honey Heist: Pip's Big Adventure",
    quest_id: "6",
    duration: "0",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "40",
        level: "4",
        focus: "0",
        saltiness: "1",
        sourness: "1",
        sweetness: "3",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "50",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Trixie's Curse",
    quest_id: "7",
    duration: "0",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "50",
        level: "5",
        focus: "0",
        saltiness: "1",
        sourness: "3",
        sweetness: "1",
        spicy: "4",
      },
    },
    rewards: {
      fields: {
        gold: "50",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Trixie's Hollow (A Dark Tale)",
    quest_id: "8",
    duration: "14400000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "5",
        focus: "60",
        saltiness: "4",
        sourness: "1",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "100",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Honey Dreams: A Bear's Tale",
    quest_id: "9",
    duration: "18000000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "6",
        focus: "60",
        saltiness: "1",
        sourness: "1",
        sweetness: "4",
        spicy: "3",
      },
    },
    rewards: {
      fields: {
        gold: "150",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Picnic Panic: Find Lola",
    quest_id: "10",
    duration: "28800000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "7",
        focus: "80",
        saltiness: "3",
        sourness: "1",
        sweetness: "4",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "200",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Trixie's Secret",
    quest_id: "11",
    duration: "0",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "60",
        level: "7",
        focus: "0",
        saltiness: "5",
        sourness: "1",
        sweetness: "1",
        spicy: "5",
      },
    },
    rewards: {
      fields: {
        gold: "175",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Guardian of the Bear Clan",
    quest_id: "12",
    duration: "14400000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "8",
        focus: "80",
        saltiness: "1",
        sourness: "1",
        sweetness: "5",
        spicy: "6",
      },
    },
    rewards: {
      fields: {
        gold: "300",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Bear Necessities",
    quest_id: "13",
    duration: "0",
    quest_type: "instant",
    requirements: {
      fields: {
        energy: "60",
        level: "8",
        focus: "0",
        saltiness: "5",
        sourness: "1",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "250",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Clawmark: Rise of the Alpha",
    quest_id: "14",
    duration: "43200000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "9",
        focus: "80",
        saltiness: "1",
        sourness: "5",
        sweetness: "1",
        spicy: "6",
      },
    },
    rewards: {
      fields: {
        gold: "800",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "Spirit Quest",
    quest_id: "15",
    duration: "86400000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "9",
        focus: "100",
        saltiness: "6",
        sourness: "1",
        sweetness: "6",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "1200",
        rolls: "1",
        xp: "100",
      },
    },
  },
  {
    name: "The Legend of Trixie",
    quest_id: "16",
    duration: "86400000",
    quest_type: "timed",
    requirements: {
      fields: {
        energy: "0",
        level: "10",
        focus: "100",
        saltiness: "8",
        sourness: "7",
        sweetness: "1",
        spicy: "1",
      },
    },
    rewards: {
      fields: {
        gold: "2000",
        rolls: "1",
        xp: "0",
      },
    },
  },
];
