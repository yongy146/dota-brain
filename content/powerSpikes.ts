/**
 * This file describes the Power Spikes of Dota 2 heroes.
 *
 * (C) Dota Coach, 2024. All rights reserved.
 */

/**
 * Each hero has a power spike value for the following phases:
 *   - Laning phase
 *   - Mid game
 *   - Late game
 *   - Very late game
 *
 * The power spike values are between 0 and 3 and
 * interpreted as follows:
 *  - Low:    0 - 1 (use 0.5 for average low)
 *  - Medium: 1 - 2 (use 1.5 for average medium; note that 1 is considered medium)
 *  - High:  2 - 3 (use 2.5 for average high; note that 2 is considered high)
 *
 * Further details on the game phases can be found here:
 *   - https://dotacoach.atlassian.net/wiki/spaces/D2/pages/8093725/Definitions
 *
 */
export const powerSpikes: Record<string, number[]> = {
  abaddon: [0.5, 1.5, 2.5, 2.5],
  alchemist: [0.5, 1.5, 2.5, 2.5],
  ancient_apparition: [0.5, 1.5, 2.5, 2.5],
  antimage: [0.5, 1.5, 2.5, 2.5],
  arc_warden: [0.5, 1.5, 2.5, 2.5],
  axe: [0.5, 1.5, 2.5, 2.5],
  bane: [0.5, 1.5, 2.5, 2.5],
  batrider: [0.5, 1.5, 2.5, 2.5],
  beastmaster: [0.5, 1.5, 2.5, 2.5],
  bloodseeker: [0.5, 1.5, 2.5, 2.5],
  bounty_hunter: [0.5, 1.5, 2.5, 2.5],
  brewmaster: [0.5, 1.5, 2.5, 2.5],
  bristleback: [0.5, 1.5, 2.5, 2.5],
  broodmother: [0.5, 1.5, 2.5, 2.5],
  centaur: [0.5, 1.5, 2.5, 2.5],
  chaos_knight: [0.5, 1.5, 2.5, 2.5],
  chen: [0.5, 1.5, 2.5, 2.5],
  clinkz: [0.5, 1.5, 2.5, 2.5],
  // Clockwerk
  rattletrap: [0.5, 1.5, 2.5, 2.5],
  crystal_maiden: [0.5, 1.5, 2.5, 2.5],
  dark_seer: [0.5, 1.5, 2.5, 2.5],
  dark_willow: [0.5, 1.5, 2.5, 2.5],
  dawnbreaker: [0.5, 1.5, 2.5, 2.5],
  dazzle: [0.5, 1.5, 2.5, 2.5],
  death_prophet: [0.5, 1.5, 2.5, 2.5],
  disruptor: [0.5, 1.5, 2.5, 2.5],
  doom_bringer: [0.5, 1.5, 2.5, 2.5],
  dragon_knight: [0.5, 1.5, 2.5, 2.5],
  drow_ranger: [0.5, 1.5, 2.5, 2.5],
  earth_spirit: [0.5, 1.5, 2.5, 2.5],
  earthshaker: [0.5, 1.5, 2.5, 2.5],
  elder_titan: [0.5, 1.5, 2.5, 2.5],
  ember_spirit: [0.5, 1.5, 2.5, 2.5],
  enchantress: [0.5, 1.5, 2.5, 2.5],
  enigma: [0.5, 1.5, 2.5, 2.5],
  faceless_void: [0.5, 1.5, 2.5, 2.5],
  grimstroke: [0.5, 1.5, 2.5, 2.5],
  gyrocopter: [0.5, 1.5, 2.5, 2.5],
  hoodwink: [0.5, 1.5, 2.5, 2.5],
  huskar: [0.5, 1.5, 2.5, 2.5],
  invoker: [0.5, 1.5, 2.5, 2.5],
  jakiro: [0.5, 1.5, 2.5, 2.5],
  //Io
  wisp: [0.5, 1.5, 2.5, 2.5],
  juggernaut: [0.5, 1.5, 2.5, 2.5],
  keeper_of_the_light: [0.5, 1.5, 2.5, 2.5],
  kunkka: [0.5, 1.5, 2.5, 2.5],
  legion_commander: [0.5, 1.5, 2.5, 2.5],
  leshrac: [0.5, 1.5, 2.5, 2.5],
  lich: [0.5, 1.5, 2.5, 2.5],
  life_stealer: [0.5, 1.5, 2.5, 2.5],
  lina: [0.5, 1.5, 2.5, 2.5],
  lion: [0.5, 1.5, 2.5, 2.5],
  lone_druid: [0.5, 1.5, 2.5, 2.5],
  luna: [0.5, 1.5, 2.5, 2.5],
  lycan: [0.5, 1.5, 2.5, 2.5],
  // Magnus
  magnataur: [0.5, 1.5, 2.5, 2.5],
  marci: [0.5, 1.5, 2.5, 2.5],
  mars: [0.5, 1.5, 2.5, 2.5],
  medusa: [0.5, 1.5, 2.5, 2.5],
  meepo: [0.5, 1.5, 2.5, 2.5],
  mirana: [0.5, 1.5, 2.5, 2.5],
  monkey_king: [0.5, 1.5, 2.5, 2.5],
  morphling: [0.5, 1.5, 2.5, 2.5],
  muerta: [0.5, 1.5, 2.5, 2.5],
  naga_siren: [0.5, 1.5, 2.5, 2.5],
  // "Nature's Prophet"
  furion: [0.5, 1.5, 2.5, 2.5],
  // The Level 20 talent on Natures Prophet gives him an Area Leash with Sprout.
  // Necrophos
  necrolyte: [0.5, 1.5, 2.5, 2.5],
  night_stalker: [0.5, 1.5, 2.5, 2.5],
  nyx_assassin: [0.5, 1.5, 2.5, 2.5],
  ogre_magi: [0.5, 1.5, 2.5, 2.5],
  omniknight: [0.5, 1.5, 2.5, 2.5],
  oracle: [0.5, 1.5, 2.5, 2.5],
  // Outworld Devourer
  // Outworld Destroyer
  obsidian_destroyer: [0.5, 1.5, 2.5, 2.5],
  pangolier: [0.5, 1.5, 2.5, 2.5],
  phantom_assassin: [0.5, 1.5, 2.5, 2.5],
  phantom_lancer: [0.5, 1.5, 2.5, 2.5],
  phoenix: [0.5, 1.5, 2.5, 2.5],
  primal_beast: [0.5, 1.5, 2.5, 2.5],
  puck: [0.5, 1.5, 2.5, 2.5],
  pudge: [0.5, 1.5, 2.5, 2.5],
  pugna: [0.5, 1.5, 2.5, 2.5],
  queenofpain: [0.5, 1.5, 2.5, 2.5],
  razor: [0.5, 1.5, 2.5, 2.5],
  riki: [0.5, 1.5, 2.5, 2.5],
  rubick: [0.5, 1.5, 2.5, 2.5],
  sand_king: [0.5, 1.5, 2.5, 2.5],
  shadow_demon: [0.5, 1.5, 2.5, 2.5],
  // Shadow Fiend
  nevermore: [0.5, 1.5, 2.5, 2.5],
  shadow_shaman: [0.5, 1.5, 2.5, 2.5],
  silencer: [0.5, 1.5, 2.5, 2.5],
  skywrath_mage: [0.5, 1.5, 2.5, 2.5],
  slardar: [0.5, 1.5, 2.5, 2.5],
  slark: [0.5, 1.5, 2.5, 2.5],
  snapfire: [0.5, 1.5, 2.5, 2.5],
  sniper: [0.5, 1.5, 2.5, 2.5],
  spectre: [0.5, 1.5, 2.5, 2.5],
  spirit_breaker: [0.5, 1.5, 2.5, 2.5],
  storm_spirit: [0.5, 1.5, 2.5, 2.5],
  sven: [0.5, 1.5, 2.5, 2.5],
  techies: [0.5, 1.5, 2.5, 2.5],
  templar_assassin: [0.5, 1.5, 2.5, 2.5],
  terrorblade: [0.5, 1.5, 2.5, 2.5],
  tidehunter: [0.5, 1.5, 2.5, 2.5],
  tinker: [0.5, 1.5, 2.5, 2.5],
  tiny: [0.5, 1.5, 2.5, 2.5],
  // Timbersaw
  shredder: [0.5, 1.5, 2.5, 2.5],
  // Treant Protector
  treant: [0.5, 1.5, 2.5, 2.5],
  troll_warlord: [0.5, 1.5, 2.5, 2.5],
  tusk: [0.5, 1.5, 2.5, 2.5],
  // Underlord
  abyssal_underlord: [0.5, 1.5, 2.5, 2.5],
  undying: [0.5, 1.5, 2.5, 2.5],
  ursa: [0.5, 1.5, 2.5, 2.5],
  vengefulspirit: [0.5, 1.5, 2.5, 2.5],
  venomancer: [0.5, 1.5, 2.5, 2.5],
  viper: [0.5, 1.5, 2.5, 2.5],
  visage: [0.5, 1.5, 2.5, 2.5],
  void_spirit: [0.5, 1.5, 2.5, 2.5],
  warlock: [0.5, 1.5, 2.5, 2.5],
  weaver: [0.5, 1.5, 2.5, 2.5],
  // Windranger
  windrunner: [0.5, 1.5, 2.5, 2.5],
  winter_wyvern: [0.5, 1.5, 2.5, 2.5],
  witch_doctor: [0.5, 1.5, 2.5, 2.5],
  // Wraith King
  skeleton_king: [0.5, 1.5, 2.5, 2.5],
  // Zeus
  zuus: [0.5, 1.5, 2.5, 2.5],
};
