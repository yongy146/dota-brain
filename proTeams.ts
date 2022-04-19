// proTeams.ts

/**
 * Holds functions and constants for DPC team data
 */

/*----------------------------- Definitions -----------------------------------/ 

/**
 * @Type DpcTeams
 * key = shorthandle
 * example: EG
 */
export type DpcTeams = {
  [key: string]: DpcTeam;
};

/**
 * @Type DpcTeam
 * idTeam: Team id from Dotabuff url (Number before teamname)
 * nameTeam: Team Name from Dotabuff
 * region: DPC region
 */
export type DpcTeam = {
  idTeam: string;
  nameTeam: string;
  division: DpcDiv;
  region: DpcRegion;
};

/**
 * @enum DpcDiv
 * DPC Divisions
 */
export enum DpcDiv {
  one = "I",
  two = "II",
}

/**
 * @enum DpcRegion
 * DPC region strings
 * euw, eue, na, sa, zn, sea
 */
export enum DpcRegion {
  euw = "Europe-Western",
  eue = "Europe-Eastern",
  na = "North-America",
  sa = "South-America",
  zn = "China",
  sea = "Soth-East-Asia",
}

/*----------------------------- DATA ------------------------------------------/ 

/**
 * Holds pro team data
 */
export const proTeams: DpcTeams = {
  // -----------------
  // NA Div 1
  // -----------------
  eg: {
    idTeam: "39",
    nameTeam: "Evil Geniuses",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // tsm
  tsm: {
    idTeam: "8260983",
    nameTeam: "TSM FTX",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // qc
  qc: {
    idTeam: "7390454",
    nameTeam: "Quincy Crew",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // wc
  wildcard: {
    idTeam: "8376426",
    nameTeam: "Wildcard Gaming",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // zoomers
  zoomer: {
    idTeam: "7819028",
    nameTeam: "4 Zoomers",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // the cut
  tc: {
    idTeam: "8205424",
    nameTeam: "The Cut",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // dogchamp
  dog: {
    idTeam: "8604954",
    nameTeam: "DogChamp",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // twobases
  twob: {
    idTeam: "8272699",
    nameTeam: "Simply TOOBASED",
    region: DpcRegion.na,
    division: DpcDiv.one,
  },
  // -----------------
  // EU West Div 1
  // -----------------
  og: {
    idTeam: "2586976",
    nameTeam: "OG",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // gladiatos
  gg: {
    idTeam: "8599101",
    nameTeam: "Gaimin Gladiators",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  //liquid
  liquid: {
    idTeam: "2163",
    nameTeam: "Team Liquid",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // tundra
  tundra: {
    idTeam: "8291895",
    nameTeam: "Tundra Esports",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // secret
  ts: {
    idTeam: "14052",
    nameTeam: "Team Secret",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // entity
  entity: {
    idTeam: "8605863",
    nameTeam: "Entity",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // brame
  brame: {
    idTeam: "8112124",
    nameTeam: "Brame",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // nigma
  nigma: {
    idTeam: "7554697",
    nameTeam: "Nigma Galaxy",
    region: DpcRegion.euw,
    division: DpcDiv.one,
  },
  // -----------------
  // South America Div 1
  // -----------------
  thunder: {
    idTeam: "7391077",
    nameTeam: "Thunder Predator",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // beastcoast
  beast: {
    idTeam: "8254400",
    nameTeam: "beastcoast",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // Hokori
  hokori: {
    idTeam: "8131728",
    nameTeam: "Hokori",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // lava
  lava: {
    idTeam: "7119077",
    nameTeam: "Lava BestPc",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // infamous
  infamous: {
    idTeam: "2672298",
    nameTeam: "Infamous U.esports",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // Apu
  apu: {
    idTeam: "8375259",
    nameTeam: "APU King of Kings",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // balrogs
  balrogs: {
    idTeam: "2289950",
    nameTeam: "Balrogs e-Sports",
    region: DpcRegion.sa,
    division: DpcDiv.one,
  },
  // -----------------
  // China Div 1
  // -----------------
  lgd: {
    idTeam: "15",
    nameTeam: "PSG.LGD",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // royal
  royal: {
    idTeam: "6209804",
    nameTeam: "Royal Never Give Up",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // xtreme
  xtreme: {
    idTeam: "8261500",
    nameTeam: "Xtreme Gaming",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // aster
  aster: {
    idTeam: "6209166",
    nameTeam: "Team Aster",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // ehome
  ehome: {
    idTeam: "4",
    nameTeam: "EHOME",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // vici
  vici: {
    idTeam: "726228",
    nameTeam: "Vici Gaming",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // magma
  magma: {
    idTeam: "8126892",
    nameTeam: "Team Magma",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
  // lbzs
  lbzs: {
    idTeam: "8124688",
    nameTeam: "LBZS",
    region: DpcRegion.zn,
    division: DpcDiv.one,
  },
};
