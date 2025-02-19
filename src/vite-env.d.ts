/// <reference types="vite/client" />

type PlayerObject = {
  id: { id: string };
  xp: string;
  level: string;
  stats: {
    fields: {
      sweetness: string;
      sourness: string;
      saltiness: string;
      bitterness: string;
      umami: string;
    };
  };
  max_mana: string;
  mana: string;
  last_energy_update: string;
  energy: string;
  max_energy: string;
  rolls: string;
  materials: { fields: { key: string; value: string }[] };
};

type PlayerState = {
  id: string;
  xp: number;
  level: number;
  stats: {
    sweetness: number;
    sourness: number;
    saltiness: number;
    bitterness: number;
    umami: number;
  };
  max_mana: number;
  mana: number;
  last_energy_update: number;
  energy: number;
  max_energy: number;
  rolls: number;
  materials: Map<number, number>;
};
