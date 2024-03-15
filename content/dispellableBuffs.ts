/**
 * dispellableBuffs.ts contains all information about dispellable buffs from hero kills in the game.
 *
 * IMPORTANT: Use the following function to access dispellable buffs: Dota2.hero_abilities.getDispellableBuffs()
 *
 * Unfortunately file can't be replaced with static data from Dota 2 (24.2.2022)
 *
 * (C) Dota Coach, 2024. All rights reserved.
 */

export const dispellableBuffs: Record<string, string[]> = {
  abaddon: ["abaddon_aphotic_shield", "abaddon_frostmourne"],
  alchemist: ["alchemist_corrosive_weaponry", "alchemist_chemical_rage"],
  ancient_apparition: [],
  antimage: [],
  arc_warden: [],
  axe: ["axe_culling_blade"],
  bane: [],
  batrider: [],
  beastmaster: [],
  bloodseeker: ["bloodseeker_bloodrage"],
  bounty_hunter: [],
  brewmaster: ["brewmaster_cinder_brew"],
  bristleback: [],
  broodmother: [],
  centaur: ["centaur_double_edge"],
  chaos_knight: [],
  chen: ["chen_divine_favor"],
  clinkz: [],
  rattletrap: [`rattletrap_jetpack`], // Clockwerk
  crystal_maiden: [],
  dark_seer: ["dark_seer_ion_shell", "dark_seer_surge"],
  dark_willow: [],
  dawnbreaker: ["dawnbreaker_luminosity"],
  dazzle: [],
  death_prophet: [],
  disruptor: [],
  doom_bringer: [],
  dragon_knight: [],
  drow_ranger: [],
  earth_spirit: [],
  earthshaker: ["earthshaker_enchant_totem"],
  elder_titan: ["elder_titan_ancestral_spirit"],
  ember_spirit: ["ember_spirit_flame_guard"],
  enchantress: [],
  enigma: [],
  faceless_void: ["faceless_void_time_dilation"],
  grimstroke: ["grimstroke_spirit_walk"],
  gyrocopter: ["gyrocopter_rocket_barrage"],
  hoodwink: ["hoodwink_scurry"],
  huskar: [],
  invoker: ["invoker_alacrity"],
  jakiro: [],
  wisp: [], // IO
  juggernaut: [],
  keeper_of_the_light: ["keeper_of_the_light_chakra_magic"],
  kunkka: [],
  legion_commander: [
    "legion_commander_overwhelming_odds",
    "legion_commander_press_the_attack",
  ],
  leshrac: [],
  lich: ["lich_frost_shield"],
  life_stealer: [],
  lina: [],
  lion: [],
  lone_druid: [
    /* "lone_druid_true_form_battle_cry" no longer available */
    `lone_druid_savage_roar` /* Only the buff with Aghanim Shard on hero */,
  ],
  luna: [],
  lycan: ["lycan_howl"],
  magnataur: ["magnataur_empower"],
  marci: [
    `marci_companion_run` /* rebound */ /* "marci_guardian" */ /* Sidekick */,
  ],
  mars: [],
  medusa: [],
  meepo: [],
  mirana: ["mirana_leap"],
  monkey_king: ["monkey_king_jingu_mastery", "monkey_king_mischief"],
  morphling: [],
  muerta: [],
  naga_siren: [],
  furion: [`furion_teleportation`], // Nature's Prophet
  necrolyte: ["necrolyte_sadist"], // Necrophos
  night_stalker: [],
  nyx_assassin: [],
  ogre_magi: [`ogre_magi_bloodlust`, `ogre_magi_smash`],
  omniknight: [`omniknight_guardian_angel`],
  oracle: ["oracle_fates_edict", "oracle_purifying_flames"],
  obsidian_destroyer: [], // Outworld Destroyer
  primal_beast: ["primal_beast_onslaught", `primal_beast_uproar`],
  pangolier: ["pangolier_shield_crash"],
  phantom_assassin: ["phantom_assassin_phantom_strike"],
  phantom_lancer: ["phantom_lancer_phantom_edge"],
  phoenix: [],
  puck: [],
  pudge: [],
  pugna: ["pugna_decrepify"],
  queenofpain: [],
  razor: [],
  riki: [],
  rubick: [],
  sand_king: [],
  shadow_demon: [`shadow_demon_disseminate`],
  nevermore: [], // Shadow Fiend
  shadow_shaman: [],
  silencer: [],
  skywrath_mage: [],
  slardar: ["slardar_sprint"],
  slark: [],
  snapfire: [],
  sniper: ["sniper_take_aim"],
  spectre: [],
  spirit_breaker: ["spirit_breaker_bulldoze"],
  storm_spirit: ["storm_spirit_overload"],
  sven: ["sven_warcry"],
  techies: ["techies_reactive_tazer"],
  templar_assassin: [],
  terrorblade: [],
  tidehunter: [],
  // Timbersaw
  shredder: [
    "shredder_whirling_death",
    "shredder_reactive_armor" /* Only the active barrier from Aghanims Scepter */,
  ],
  tinker: [`tinker_defense_matrix`],
  tiny: [],
  treant: ["treant_living_armor"], // Treant Protector
  troll_warlord: [],
  tusk: [],
  abyssal_underlord: [], // Underlord
  undying: [],
  ursa: ["ursa_overpower"],
  vengefulspirit: ["vengefulspirit_nether_swap"],
  venomancer: [],
  viper: [],
  visage: ["visage_grave_chill"],
  void_spirit: ["void_spirit_resonant_pulse"],
  warlock: ["warlock_shadow_word"],
  weaver: [],
  windrunner: ["windrunner_windrun"], // Windranger
  winter_wyvern: [],
  witch_doctor: [],
  skeleton_king: [], // wraith King
  zuus: [], // Zeus
};
