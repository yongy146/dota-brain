/**
 * heroBuilds.ts contains the ability and items builds for all Dota 2 heroes. Each hero can have several builds.
 *
 * Rules for abilities:
 *     - The ability "special_bonus_attributes" should be used to skill attributes
 *     - Each build should have the first 25 abilities to be skilled (the rest is then automatic)
 *
 * Consistency requirements for abilities:
 *     - Each ability needs to exist in dota2Abilits.json
 *     - For each ability there needs to be an image named '/img/ability/<ability>_hp1.jpg' (the script dataQuality.ts verifies that)
 *
 * Attention:
 *     - Steam guides can't have the character "'"". Instead we need to use "`"
 * 	   - The order of the talent build needs to be 1, 2, 3 and then 4. Any other order will cause the guide to fail in Dota 2
 *
 * Relevant folder on local PC: D:\Program Files (x86)\Steam\userdata\361606936\570\remote\guides
 */
import {
  DOTA_COACH_GUIDE_ROLE,
  DOTA_COACH_ROLE,
  STEAM_GUIDE_ROLE,
} from "./playerRoles";

/**
 * Data structure for the hero builds of a given hero
 *
 */
export interface HeroBuilds {
  builds: HeroBuild[]; // Note that the first build is seen as the standard build
  ability_tooltips?: Tooltips;
  item_tooltips?: Tooltips;
}

/**
 * Data structure for each hero build
 *
 */
export interface HeroBuild {
  roles: DOTA_COACH_GUIDE_ROLE[]; // These roles are used in the Dota Coach App and in title of Steam Guide
  type?: string; // Type currently only used for invoker mid (QW & QE)
  steam_guide_id: number; // ID of the steam guide; this ID is provided by Dota 2
  steam_guide_link: string; // Link to web buids
  steam_guide_role?: STEAM_GUIDE_ROLE; // Role used to classify steam guides (this role is displayed in yellow in Dota 2). Available values are: Core, Offlane, Support, Jungle, Initiator, Roamer. If there is no value proivded, then it there is no role shown in Dota 2
  abilities: string[];
  ability_tooltips?: Tooltips;
  items: ItemBuild;
  item_tooltips?: Tooltips;
}

export interface ItemBuild {
  starting: string[];
  early_game: string[];
  mid_game: string[];
  late_game: string[];
  situational: string[];
  core: string[]; // selected items from starting, early_game, mid_game, late_game and situational
  neutral: string[];
}

/**
 * Tooltip for abilities and items
 *
 */
export interface Tooltips {
  [key: string]: string;
}

export const heroBuilds: { [key: string]: HeroBuilds } = {
  Abaddon: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640698444,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698376898",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "abaddon_aphotic_shield",
          "abaddon_frostmourne" /* equals to 'curse of avernus' */,
          "abaddon_aphotic_shield",
          "abaddon_death_coil",
          "abaddon_aphotic_shield",
          "abaddon_borrowed_time",
          "abaddon_aphotic_shield",
          "abaddon_death_coil",
          "abaddon_death_coil",
          "abaddon_death_coil",
          "special_bonus_movement_speed_15",
          "abaddon_borrowed_time",
          "abaddon_frostmourne",
          "abaddon_frostmourne",
          "special_bonus_unique_abaddon_2",
          "abaddon_frostmourne",
          "special_bonus_attributes",
          "abaddon_borrowed_time",
          "special_bonus_attributes",
          "special_bonus_unique_abaddon",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_abaddon_4",
          //25 levels, no need for more than that as they are automatic afterwards
        ],
        items: {
          starting: [
            "tango",
            "flask" /* salve */,
            "enchanted_mango",
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
            "orb_of_venom",
            "wind_lace",
          ],
          early_game: [
            "boots",
            "magic_wand",
            "headdress",
            "arcane_boots",
            "tranquil_boots",
            "ring_of_basilius",
          ],
          mid_game: [
            "holy_locket",
            "solar_crest",
            "force_staff",
            "aether_lens",
            "mekansm",
          ],
          late_game: ["ultimate_scepter", "vladmir"],
          situational: ["lotus_orb", "aghanims_shard"],
          core: ["holy_locket", "ultimate_scepter"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "stormcrafter",
            "force_field",
            "seer_stone",
          ],
        },
      },
    ],
    ability_tooltips: {
      // Optional, used for Dota 2 Guides
      special_bonus_unique_abaddon:
        "If you have Aghanim`s Scepter or about to have it, take the other talent.",
      // Question, should we have info for each build at each level, or the infos be generic to the skills / telents, and only showed with first build?
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      wind_lace:
        "For extra mobility and if you are planning to go for Tranquil Boots.",
      arcane_boots:
        "Prefered boots upgrade as you can disassemble it for Energy Booster that is needed for Holy Locket. You can assemble Tranquil Boots afterwards for movement speed.",
      holy_locket:
        "A core item that allows you to further increase your healing output. On use, you replenish mana to your allies as well so watch out for the ones in need for a little bit of mana.",
      ultimate_scepter:
        "A core item that can impact the fights greatly. Make sure to activate the ultimate when the most damage is being pumped into your allies.",
      lotus_orb: "For reflect, dispel and armor.",
      aghanims_shard: "To silence against spell heavy lineups.",
    },
  },
  Alchemist: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640719685,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377018",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_goblins_greed",
          "alchemist_chemical_rage",
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "special_bonus_attack_speed_15",
          "alchemist_unstable_concoction",
          "alchemist_chemical_rage",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "special_bonus_hp_350",
          "alchemist_unstable_concoction",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_cleave_25",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_6",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "gauntlets",
            "branches",
            "magic_stick",
            "ward_observer",
          ],
          early_game: [
            "bracer",
            "ring_of_health",
            "magic_wand",
            "power_treads",
            "phase_boots",
            "soul_ring",
          ],
          mid_game: ["bfury", "sange_and_yasha", "assault", "blink", "basher"],
          late_game: [
            "abyssal_blade",
            "swift_blink",
            "heart",
            "ultimate_scepter",
          ],
          situational: [
            "bottle",
            "radiance",
            "black_king_bar",
            "aghanims_shard",
            "mjollnir",
            "overwhelming_blink",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: ["bfury", "sange_and_yasha", "assault"],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "paladin_sword",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "force_boots",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      // For first level spell choice
      alchemist_acid_spray:
        "Consider skilling Acid Spray at level one if you are playing mid Alchemist against a tough match-up.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ward_observer:
        "If you are playing midlane but also to secure your safelane farm and jungling later on.",
      bottle: "If you are playing mid Alchemist.",
      ring_of_health: "To solve hp sustain issues.",
      power_treads:
        "Prefered boots upgrades that allows you to extract more value from the Battle Fury due to attack speed.",
      bfury:
        "A core farming item that provides you with sustain and great physical damage that synergizes well with Acid Spray.",
      radiance:
        "An alternative to Battle Fury against illusion-based heroes. In general, illusions are susceptible to magical damage more than to physical damage.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard: "For extra dispel and buff.",
      ultimate_scepter: "To gift it to your teammates",
      mjollnir: "Against illusion based heroes.",
      overwhelming_blink: "Against illusion based heroes.",
      monkey_king_bar: "Against evasion.",
      silver_edge: "To break passives.",
    },
  },
  "Ancient Apparition": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640719709,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377158",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "ancient_apparition_chilling_touch",
          "ancient_apparition_cold_feet",
          "ancient_apparition_chilling_touch",
          "ancient_apparition_cold_feet",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_blast",
          "ancient_apparition_cold_feet",
          "ancient_apparition_cold_feet",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_blast",
          "special_bonus_spell_amplify_8",
          "ancient_apparition_chilling_touch",
          "special_bonus_unique_ancient_apparition_3",
          "ancient_apparition_chilling_touch",
          "special_bonus_attributes",
          "ancient_apparition_ice_blast",
          "special_bonus_attributes",
          "special_bonus_unique_ancient_apparition_4",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_ancient_apparition_5",
        ],
        items: {
          starting: [
            "tango",
            "flask" /* salve */,
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
            "blight_stone",
          ],
          early_game: [
            "boots",
            "magic_wand",
            "arcane_boots",
            "tranquil_boots",
            "wind_lace",
          ],
          mid_game: [
            "glimmer_cape",
            "aghanims_shard",
            "force_staff",
            "ghost",
            "cyclone",
          ],
          late_game: ["solar_crest", "vladmir", "aeon_disk"],
          situational: ["infused_raindrop", "lotus_orb"],
          core: ["aghanims_shard"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "spy_gadget",
            "timeless_relic",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      blight_stone: "If you expect double melee to lane against you.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "Prefered boots upgrade as you will run out of mana in the fights. When disasembled, Energy Booster can be used later on to craft Lotus Orb or Aeon Disk.",
      aghanims_shard:
        "A core item that allows you to waveclear, do decent amounts of damage in the fights and cancel Blink Daggers.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },
  "Anti-Mage": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640719725,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377261",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "antimage_mana_break",
          "antimage_blink",
          "antimage_mana_break",
          "antimage_counterspell",
          "antimage_blink",
          "antimage_mana_void",
          "antimage_blink",
          "antimage_blink",
          "antimage_mana_break",
          "special_bonus_unique_antimage",
          "antimage_mana_break",
          "antimage_mana_void",
          "antimage_counterspell",
          "antimage_counterspell",
          "antimage_counterspell",
          "special_bonus_unique_antimage_8",
          "special_bonus_attributes",
          "antimage_mana_void",
          "special_bonus_attributes",
          "special_bonus_unique_antimage_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_antimage_2",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "orb_of_venom",
          ],
          early_game: [
            "ring_of_health",
            "wraith_band",
            "magic_wand",
            "power_treads",
            "orb_of_corrosion",
          ],
          mid_game: ["bfury", "manta", "basher", "skadi"],
          late_game: [
            "abyssal_blade",
            "satanic",
            "butterfly",
            "ultimate_scepter",
          ],
          situational: [
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "aghanims_shard",
            "assault",
          ],
          core: ["power_treads", "bfury", "manta", "basher"],
          neutral: [
            "possessed_mask",
            "chipped_vest",
            "ring_of_aquila",
            "vambrace",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      // For first level spell choice
      antimage_counterspell:
        "Skill Counterspell at level one if you exptect to be harrassed by single-target magical-damage spells like Arcane Bolt.",
      special_bonus_unique_antimage_2:
        "If there`s a lot of magical damage against you or you have mana issues, skill the other talent.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      ring_of_health: "To solve hp sustain issues.",
      power_treads:
        "Allows you to extract more value from Battle Fury due to attack speed.",
      orb_of_corrosion: "If you can pressure on the lane.",
      bfury:
        "A core items that solves sustain issues and allows you to farm insanely fast.",
      manta: "Allows you to burn the jumped target`s mana quickly.",
      basher:
        "It procs frequently due to attack speed of Anti-Mage allowing you to burn even more mana before Mana Voiding.",
      monkey_king_bar: "Against evasion.",
      black_king_bar: "Against a lot of disables and as a dispel.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
      aghanims_shard: "Against heavy magical damage lineups.",
      assault: "Against heavy armor reduction lineups.",
      ultimate_scepter: "Great for causing chaos in the fights.",
    },
  },
  "Arc Warden": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640719743,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377376",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          "arc_warden_spark_wraith",
          "arc_warden_tempest_double",
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          "arc_warden_flux",
          "arc_warden_magnetic_field",
          "special_bonus_unique_arc_warden_5",
          "arc_warden_tempest_double",
          "arc_warden_magnetic_field",
          "arc_warden_magnetic_field",
          "arc_warden_magnetic_field",
          "special_bonus_unique_arc_warden_3",
          "special_bonus_attributes",
          "arc_warden_tempest_double",
          "special_bonus_attributes",
          "special_bonus_unique_arc_warden",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_arc_warden_6",
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "ward_observer",
          ],
          early_game: ["wraith_band", "hand_of_midas", "boots"],
          mid_game: [
            "maelstrom",
            "travel_boots",
            "mjollnir",
            "dragon_lance",
            "hurricane_pike",
          ],
          late_game: [
            "skadi",
            "greater_crit",
            "satanic",
            "bloodthorn",
            "travel_boots_2",
          ],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "monkey_king_bar",
            "silver_edge",
            "gungir",
            "nullifier",
          ],
          core: ["hand_of_midas", "maelstrom", "travel_boots"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "enchanted_quiver",
            "mind_breaker",
            "the_leveller",
            "spell_prism",
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_arc_warden:
        "Both level twenty talents are mediocre. I'd give slight edge to Spark Wraith one as in some rare cases you might purchase or obtain Aghanim`s Scepter from the Roshan.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ward_observer:
        "If you are playing midlane but also to secure your safelane farm and jungling later on.",
      infused_raindrop: "Against magical burst.",
      hand_of_midas: "A core item which active works on your clone too.",
      maelstrom:
        "A core item that further increases your farming speed. Both upgrades of this item are great to have on this hero.",
      travel_boots: "Allows you to split-push the map effectively.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      monkey_king_bar: "Against evasion.",
      silver_edge: "For break and greater splitpush/pick off potential.",
      gungir: "An alternative for Mjollnir for crowd control.",
      nullifier: "To dispel defensive spells and items.",
    },
  },
  Axe: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640802946,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915204",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "axe_battle_hunger",
          "axe_counter_helix",
          "axe_counter_helix",
          "axe_berserkers_call",
          "axe_counter_helix",
          "axe_culling_blade",
          "axe_counter_helix",
          "axe_berserkers_call",
          "axe_berserkers_call",
          "axe_berserkers_call",
          "special_bonus_magic_resistance_12",
          "axe_culling_blade",
          "axe_battle_hunger",
          "axe_battle_hunger",
          "special_bonus_unique_axe_4",
          "axe_battle_hunger",
          "special_bonus_attributes",
          "axe_culling_blade",
          "special_bonus_attributes",
          "special_bonus_unique_axe_5",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_axe_2",
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "quelling_blade",
            "ring_of_protection",
            "branches",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "vanguard",
            "boots",
            "phase_boots",
            "magic_wand",
            "cloak",
          ],
          mid_game: ["blink", "hood_of_defiance", "blade_mail"],
          late_game: [
            "heart",
            "assault",
            "abyssal_blade",
            "overwhelming_blink",
          ],
          situational: [
            "black_king_bar",
            "pipe",
            "crimson_guard",
            "lotus_orb",
            "invis_sword",
            "manta",
          ],
          core: ["vanguard", "blink"],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "vambrace",
            "dragon_scale",
            "cloak_of_flames",
            "spider_legs",
            "ascetic_cap",
            "trickster_cloak",
            "giants_ring",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      axe_battle_hunger:
        "If the opponent`s have an easy way of removing or dispelling Battle Hunger, you can skip skilling this spell during laning stage.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      vanguard:
        "A core item that fixes your hp sustain issues and makes you exremely tanky. It can be disassembled.",
      blink:
        "Allows you to initiate the fights by jumping in and using Berserker`s Call.",
      overwhelming_blink: "Against illusion, clones and summons.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflect, dispel and armor.",
      invis_sword: "For pick-offs and to guarantee a good initiation.",
      manta:
        "As a farm accelerator as Counter Helix procs on illusions. It is greedy to go for this item.",
    },
  },
  Bane: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803052,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915293",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "bane_brain_sap",
          "bane_nightmare",
          "bane_brain_sap",
          "bane_nightmare",
          "bane_nightmare",
          "bane_fiends_grip",
          "bane_nightmare",
          "bane_enfeeble",
          "bane_enfeeble",
          "bane_enfeeble",
          "bane_enfeeble",
          "bane_fiends_grip",
          "bane_brain_sap",
          "bane_brain_sap",
          "special_bonus_armor_5",
          "special_bonus_unique_bane_8",
          "special_bonus_attributes",
          "bane_fiends_grip",
          "special_bonus_attributes",
          "special_bonus_unique_bane_5",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bane_2",
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "magic_wand",
            "tranquil_boots",
            "arcane_boots",
            "wind_lace",
          ],
          mid_game: ["glimmer_cape", "aether_lens", "force_staff", "ghost"],
          late_game: ["aeon_disk", "ultimate_scepter", "blink"],
          situational: [
            "infused_raindrop",
            "lotus_orb",
            "black_king_bar",
            "aghanims_shard",
          ],
          core: ["glimmer_cape", "aether_lens"],
          neutral: [
            "trusty_shovel",
            "keen_optic",
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "timeless_relic",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_armor_5:
        "This talent should be better than the other level ten talent in most cases as you often times have some magical resistance coming from Glimmer Cape.",
      special_bonus_unique_bane_2:
        "This talent goes well with Aghanim`s Shard and is particularly good against illusion and summon-based heroes and mega creeps. You can skill the other talent though if you have an easy time channeling your ulty or you have Aghanim`s Scepter, and you are in need of control.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      wind_lace: "For extra mobility as Bane is great at setting up kills.",
      glimmer_cape:
        "A core defensive item that you can also use while casting Fiend`s Grip.",
      aether_lens:
        "A core item that allows you to get your spells off from further away.",
      lotus_orb: "For reflect, dispel and armor.",
      black_king_bar: "To get a full duration Fiend's Grip off.",
      aghanims_shard: "Against summons, illusions and to depush.",
    },
  },
  Batrider: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803569,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915391",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "batrider_sticky_napalm",
          "batrider_firefly",
          "batrider_sticky_napalm",
          "batrider_flamebreak",
          "batrider_sticky_napalm",
          "batrider_flaming_lasso",
          "batrider_sticky_napalm",
          "batrider_firefly",
          "batrider_firefly",
          "batrider_firefly",
          "special_bonus_spell_amplify_5",
          "batrider_flaming_lasso",
          "batrider_flamebreak",
          "batrider_flamebreak",
          "special_bonus_unique_batrider_4",
          "batrider_flamebreak",
          "special_bonus_attributes",
          "batrider_flaming_lasso",
          "special_bonus_attributes",
          "special_bonus_movement_speed_30",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_batrider_6",
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "circlet",
            "mantle",
            "magic_stick",
          ],
          early_game: ["boots", "magic_wand", "wind_lace"],
          mid_game: [
            "travel_boots",
            "black_king_bar",
            "aether_lens",
            "aghanims_shard",
            "blink",
            "force_staff",
            "ghost",
            "cyclone",
            "kaya_and_sange",
          ],
          late_game: [
            "octarine_core",
            "shivas_guard",
            "refresher",
            "wind_waker",
          ],
          situational: [
            "ward_observer",
            "bottle",
            "infused_raindrop",
            "aeon_disk",
            "sphere",
          ],
          core: ["travel_boots", "black_king_bar", "aghanims_shard"],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "bullwhip",
            "quicksilver_amulet",
            "spider_legs",
            "psychic_headband",
            "timeless_relic",
            "flicker",
            "force_boots",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      wind_lace: "For extra mobility to be able to close the gap.",
      ward_observer:
        "If you are playing midlane but also offlane to have better vision around the lane.",
      bottle: "Mainly for mid Batrider but can be consider on offlane too.",
      infused_raindrop: "Against magical burst.",
      travel_boots:
        "A core item that allows you to cover the map better when it comes to ganking and farming.",
      black_king_bar:
        "A core item that allows you to get Flaming Lasso off on a specific target.",
      aghanims_shard:
        "A core item that adds to your damage output and control.",
      sphere: "Against single target disables.",
    },
  },
  Beastmaster: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803579,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915480",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_inner_beast",
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_inner_beast",
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_primal_roar",
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_inner_beast",
          "beastmaster_inner_beast",
          "special_bonus_attack_damage_30",
          "beastmaster_wild_axes",
          "beastmaster_primal_roar",
          "beastmaster_wild_axes",
          "beastmaster_wild_axes",
          "beastmaster_wild_axes",
          "special_bonus_unique_beastmaster_9",
          "special_bonus_attributes",
          "beastmaster_primal_roar",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_6",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_4",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "ring_of_protection",
            "branches",
            "magic_stick",
          ],
          early_game: [
            "helm_of_iron_will",
            "helm_of_the_dominator",
            "boots",
            "ring_of_basilius",
            "magic_wand",
          ],
          mid_game: [
            "vladmir",
            "helm_of_the_overlord",
            "aghanims_shard",
            "solar_crest",
            "ancient_janggo",
          ],
          late_game: [
            "assault",
            "ultimate_scepter",
            "refresher",
            "octarine_core",
          ],
          situational: ["blink", "black_king_bar", "lotus_orb"],
          core: [
            "helm_of_the_dominator",
            "helm_of_the_overlord",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "vambrace",
            "dragon_scale",
            "spider_legs",
            "quickening_charm",
            "spell_prism",
            "trickster_cloak",
            "fallen_sky",
            "demonicon",
          ],
        },
      },
    ],
    ability_tooltips: {
      beastmaster_wild_axes:
        "If you are laning against Chen or Enchantress, you might want to skill Wild Axes over Call of the Wild.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      helm_of_iron_will:
        "Solves your HP sustain issues and builds into Helm of the Dominator. Get it as early as possible.",
      helm_of_the_dominator:
        "A core item that synergizes well with the Inner Beast and allows you to push and pick-off heroes. Look to upgrade it to Helm of the Overlord.",
      aghanims_shard:
        "A core item that improves vision game and adds another disable.",
      ultimate_scepter: "Particularly good against illusion based heroes.",
      octarine_core: "Goes well with Aghanim's Scepter build.",
      blink: "To cast Primal Roar easier.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },
  Bloodseeker: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803590,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915618",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_thirst",
          "bloodseeker_bloodrage",
          "bloodseeker_thirst",
          "bloodseeker_rupture",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "special_bonus_unique_bloodseeker_5",
          "bloodseeker_thirst",
          "bloodseeker_rupture",
          "bloodseeker_blood_bath",
          "bloodseeker_blood_bath",
          "special_bonus_unique_bloodseeker_7",
          "bloodseeker_blood_bath",
          "special_bonus_attributes",
          "bloodseeker_rupture",
          "special_bonus_attributes",
          "special_bonus_hp_400",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_4",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "orb_of_venom",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: [
            "maelstrom",
            "sange_and_yasha",
            "aghanims_shard",
            "basher",
            "skadi",
          ],
          late_game: ["mjollnir", "satanic", "abyssal_blade", "butterfly"],
          situational: [
            "black_king_bar",
            "manta",
            "gungir",
            "monkey_king_bar",
            "sphere",
          ],
          core: ["power_treads", "maelstrom", "sange_and_yasha"],
          neutral: [
            "possessed_mask",
            "chipped_vest",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "apex",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641224485,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2706431682",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_thirst",
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_rupture",
          "bloodseeker_thirst",
          "bloodseeker_blood_bath",
          "bloodseeker_blood_bath",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "bloodseeker_rupture",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "special_bonus_unique_bloodseeker_6",
          "special_bonus_unique_bloodseeker_7",
          "special_bonus_attributes",
          "bloodseeker_rupture",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "orb_of_venom",
          ],
          early_game: [
            "wraith_band",
            "phase_boots",
            "magic_wand",
            "urn_of_shadows",
            "orb_of_corrosion",
          ],
          mid_game: [
            "rod_of_atos",
            "ultimate_scepter",
            "gungir",
            "veil_of_discord",
            "dagon",
          ],
          late_game: ["sheepstick", "octarine_core", "vladmir"],
          situational: [
            "spirit_vessel",
            "cyclone",
            "black_king_bar",
            "lotus_orb",
            "aghanims_shard",
          ],
          core: ["phase_boots", "rod_of_atos", "ultimate_scepter"],
          neutral: [
            "broom_handle",
            "unstable_wand",
            "ring_of_aquila",
            "nether_shawl",
            "quickening_charm",
            "cloak_of_flames",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      orb_of_corrosion: "If you can pressure on the lane.",
      //   Carry BS core items
      power_treads:
        "A core item that helps you farm faster due to attack speed increase and mana savings from the item toggling.",
      maelstrom:
        "A core farming item that benefits from Bloodrage`s spell amplification.",
      sange_and_yasha:
        "A core item that has mix of defensive and offensive stats but also further speeds you up.",
      //   ---------------------
      aghanims_shard:
        "Great against high HP targets, improves your dps and sustain.",
      //   Offlane BS core items
      phase_boots: "A core item that allows you to be even faster.",
      rod_of_atos:
        "A core item that guarantees that Blood Rite will hit and acts as a tp cancel.",
      ultimate_scepter:
        "A core item that allows you to control two opponent`s heroes.",
      //   ---------------------
      dagon: "Benefits from Bloodrage spell amp and acts as Linken's popper.",
      spirit_vessel: "Against heavy healing lineup.",
      cyclone: "For dispel, setup and teleport cancel.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflect, dispel and armor.",
      manta:
        "Alternative to Sange and Yasha if you need to dispel something big.",
      gungir: "Alternative to Mjollnir if you need AoE control.",
      monkey_king_bar:
        "Against evasion although Maelstrom/Mjollnir pierces evasion on proc already.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
    },
  },
  "Bounty Hunter": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803622,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915719",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "bounty_hunter_jinada",
          "bounty_hunter_wind_walk",
          "bounty_hunter_jinada",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_jinada",
          "bounty_hunter_track",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_jinada",
          "special_bonus_unique_bounty_hunter_4",
          "bounty_hunter_track",
          "bounty_hunter_wind_walk",
          "bounty_hunter_wind_walk",
          "special_bonus_unique_bounty_hunter_6",
          "bounty_hunter_wind_walk",
          "special_bonus_attributes",
          "bounty_hunter_track",
          "special_bonus_attributes",
          "special_bonus_unique_bounty_hunter_8",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bounty_hunter_7",
        ],
        items: {
          starting: [
            "tango",
            "boots",
            "orb_of_venom",
            "ward_observer",
            "ward_sentry",
            "flask",
            "faerie_fire",
          ],
          early_game: [
            "tranquil_boots",
            "wind_lace",
            "magic_wand",
            "urn_of_shadows",
            "arcane_boots",
            "orb_of_corrosion",
          ],
          mid_game: [
            "medallion_of_courage",
            "solar_crest",
            "ultimate_scepter",
            "aghanims_shard",
            "force_staff",
            "cyclone",
            "ghost",
          ],
          late_game: ["sheepstick", "octarine_core", "vladmir"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "ancient_janggo",
            "pipe",
            "lotus_orb",
          ],
          core: ["ultimate_scepter", "aghanims_shard"],
          neutral: [
            "unstable_wand",
            "pogo_stick",
            "bullwhip",
            "ring_of_aquila",
            "spider_legs",
            "quickening_charm",
            "flicker",
            "ascetic_cap",
            "fallen_sky",
            "seer_stone",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_bounty_hunter_8:
        "If you are not going for Aghanim`s Scepter or you are still farm from assembling it, take this talent. Otherwise, take the other one.",
      special_bonus_unique_bounty_hunter_7:
        "If you have Aghanim`s Scepter and you see yourself being able to do a lot of damage with Shuriken Tosses in the fight(short BKBs, no Linken Spheres), take this talent. Otherwise, take the other one.",
    },
    item_tooltips: {
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      ward_sentry: "To block or unblock the pull camp.",
      wind_lace: "For extra movement speed to roam around.",
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Against magical burst.",
      spirit_vessel: "Against heavy healing lineup.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      aghanims_shard: "A core item that adds more control and survivability.",
      ultimate_scepter:
        "A core item that allows you to deal more damage in the fights and get richer at the same time.",
      lotus_orb: "For reflect, dispel(e.g. Dust of Appearance) and armor.",
    },
  },
  Brewmaster: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803632,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915806",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "brewmaster_thunder_clap",
          "brewmaster_cinder_brew",
          "brewmaster_cinder_brew",
          "brewmaster_drunken_brawler",
          "brewmaster_cinder_brew",
          "brewmaster_primal_split",
          "brewmaster_cinder_brew",
          "brewmaster_thunder_clap",
          "brewmaster_thunder_clap",
          "brewmaster_thunder_clap",
          "special_bonus_unique_brewmaster_7",
          "brewmaster_primal_split",
          "brewmaster_drunken_brawler",
          "brewmaster_drunken_brawler",
          "special_bonus_hp_350",
          "brewmaster_drunken_brawler",
          "special_bonus_attributes",
          "brewmaster_primal_split",
          "special_bonus_attributes",
          "special_bonus_unique_brewmaster",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_brewmaster_6",
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "quelling_blade",
            "ring_of_protection",
            "branches",
            "faerie_fire",
            "gauntlets",
            "circlet",
            "enchanted_mango",
            "bracer",
            "magic_stick",
          ],
          early_game: ["boots", "urn_of_shadows", "magic_wand", "soul_ring"],
          mid_game: ["ultimate_scepter", "blink", "aghanims_shard"],
          late_game: ["refresher", "assault", "vladmir"],
          situational: [
            "hand_of_midas",
            "spirit_vessel",
            "black_king_bar",
            "aeon_disk",
          ],
          core: ["urn_of_shadows", "ultimate_scepter", "blink"],
          neutral: [
            "arcane_ring",
            "pogo_stick",
            "ring_of_aquila",
            "paintball",
            "quickening_charm",
            "cloak_of_flames",
            "spell_prism",
            "ascetic_cap",
            "force_field",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_hp_350:
        "It is important that you get ulty off and extra HP can help with that. The other level fifteen does not see much play as you spend most of the fight in Primal Split.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      urn_of_shadows: "A core item that activates the Cinder Brew on cast.",
      hand_of_midas:
        "If you can get it early. Brewmaster is an experience-hungry hero.",
      spirit_vessel: "Against heavy healing lineup.",
      ultimate_scepter:
        "A core item that adds another charge to the Primal Split.",
      blink:
        "A core item that allows you to initiate the fight and pop Primal Split closer to opponents.",
      aghanims_shard: "For an extra brewling.",
      black_king_bar:
        "To be able to get Primal Split off and against a lot of disables, magical damage and as a dispel.",
      aeon_disk: "To be able to get Primal Split off.",
    },
  },
  Bristleback: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803643,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915905",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "bristleback_quill_spray",
          "bristleback_bristleback",
          "bristleback_quill_spray",
          "bristleback_viscous_nasal_goo",
          "bristleback_quill_spray",
          "bristleback_warpath",
          "bristleback_quill_spray",
          "bristleback_bristleback",
          "bristleback_bristleback",
          "special_bonus_mp_regen_2",
          "bristleback_bristleback",
          "bristleback_warpath",
          "bristleback_viscous_nasal_goo",
          "bristleback_viscous_nasal_goo",
          "special_bonus_hp_200",
          "bristleback_viscous_nasal_goo",
          "special_bonus_attributes",
          "bristleback_warpath",
          "special_bonus_attributes",
          "special_bonus_hp_regen_20",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bristleback_3",
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "quelling_blade",
            "enchanted_mango",
            "gauntlets",
            "branches",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: [
            "vanguard",
            "boots",
            "soul_ring",
            "magic_wand",
            "phase_boots",
            "arcane_boots",
          ],
          mid_game: [
            "hood_of_defiance",
            "ultimate_scepter",
            "sange",
            "eternal_shroud",
            "aghanims_shard",
            "sange_and_yasha",
          ],
          late_game: ["assault", "abyssal_blade", "shivas_guard"],
          situational: [
            "pipe",
            "crimson_guard",
            "heavens_halberd",
            "lotus_orb",
            "black_king_bar",
          ],
          core: [
            "vanguard",
            "soul_ring",
            "hood_of_defiance",
            "ultimate_scepter",
          ],
          neutral: [
            "chipped_vest",
            "arcane_ring",
            "essence_ring",
            "vambrace",
            "quickening_charm",
            "cloak_of_flames",
            "spell_prism",
            "trickster_cloak",
            "giants_ring",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      bristleback_viscous_nasal_goo:
        "You can skill Viscious Nasal Goo on level one if you are fighting on the rune, or on level two if you see an opportunity to run down the opponent`s hero on the lane.",
      special_bonus_unique_bristleback_3:
        "You should generally be looking to transition to right-clicker in late game and this talent helps with that.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      vanguard:
        "A core item that makes you significantly harder to kill. Allows you to dive, creepskip and clear stacks with ease. Can be disassembled.",
      soul_ring: "A core item that helps with mana sustain.",
      hood_of_defiance: "A core item that tanks you up against magical damage.",
      ultimate_scepter:
        "A core item that allows you to build up Warpath stacks faster as it makes Viscious Nasal Goo have no cast point. Adds to AoE control.",
      sange: "Can be used for Halberd or combined with Yasha",
      aghanims_shard: "For more Quill stacks and AoE slow.",
      pipe: "Against heavy magical damage lineups.",
      crimson_guard: "Against high attack speed heroes and multiple units.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      lotus_orb: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
      black_king_bar:
        "Against a lot of disables, magical damage, mana burn, breaks and as a dispel.",
    },
  },

  Broodmother: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803657,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915996",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "broodmother_spin_web", // 1
          "broodmother_insatiable_hunger", // 2
          "broodmother_insatiable_hunger", // 3
          "broodmother_silken_bola", // 4
          "broodmother_spin_web", // 5
          "broodmother_spawn_spiderlings", // 6
          "broodmother_spin_web", // 7
          "broodmother_spin_web", // 8
          "broodmother_silken_bola", // 9
          "broodmother_silken_bola", // 10
          "broodmother_silken_bola", // 11
          "broodmother_spawn_spiderlings", // 12
          "broodmother_insatiable_hunger", // 13
          "broodmother_insatiable_hunger", // 14
          "special_bonus_agility_10", // 15
          "special_bonus_attack_speed_30", // 16
          "special_bonus_attributes", // 17
          "broodmother_spawn_spiderlings", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_400", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_broodmother_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "ring_of_protection",
            "branches",
            "magic_stick",
            "ward_observer",
          ],
          early_game: [
            "soul_ring",
            "boots",
            "orb_of_corrosion",
            "power_treads",
            "magic_wand",
          ],
          mid_game: ["orchid", "assault", "basher"],
          late_game: ["bloodthorn", "butterfly", "abyssal_blade"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "aghanims_shard",
            "nullifier",
            "blink",
            "sheepstick",
          ],
          core: ["soul_ring", "orchid", "power_treads"],
          neutral: [
            "arcane_ring",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "paladin_sword",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_agility_10:
        "On level fifteen, take the level fifteen talent before this level ten talent. On level sixteen take this level ten talent. The dota2 client disallows me to indicate that in the leveling table above.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ward_observer:
        "If you are playing midlane but also on offlane for extra vision aroud the lane.",
      infused_raindrop: "Against magical burst.",
      soul_ring: "A core item necessary for mana sustain.",
      orchid: "A core item that allows you to pick-off heroes.",
      power_treads:
        "A core item that allows you to farm faster due to attack speed increase and mana savings by toggling the item.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard: "Against illusion based heroes, summons and clones.",
      nullifier:
        "Allows you to breach through some of the defensive items and spells.",
      blink:
        "Allows you to instantly reposition on top of the hero you want to kill.",
      sheepstick: "For extra control in the late game.",
    },
  },

  "Centaur Warrunner": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803669,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916073",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "centaur_hoof_stomp", // 1
          "centaur_return", // 2
          "centaur_return", // 3
          "centaur_double_edge", // 4
          "centaur_return", // 5
          "centaur_stampede", // 6
          "centaur_return", // 7
          "centaur_hoof_stomp", // 8
          "centaur_hoof_stomp", // 9
          "centaur_hoof_stomp", // 10
          "special_bonus_hp_regen_5", // 11
          "centaur_stampede", // 12
          "centaur_double_edge", // 13
          "centaur_double_edge", // 14
          "centaur_double_edge", // 15
          "special_bonus_unique_centaur_4", // 16
          "special_bonus_attributes", // 17
          "centaur_stampede", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_centaur_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_centaur_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "ring_of_protection",
            "branches",
            "gauntlets",
            "bracer",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: ["vanguard", "boots", "magic_wand", "phase_boots"],
          mid_game: ["blink", "hood_of_defiance"],
          late_game: ["heart", "overwhelming_blink"],
          situational: [
            "crimson_guard",
            "heavens_halberd",
            "pipe",
            "aghanims_shard",
            "lotus_orb",
            "ultimate_scepter",
            "black_king_bar",
          ],
          core: ["vanguard", "blink", "hood_of_defiance"],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            "spider_legs",
            "trickster_cloak",
            "ascetic_cap",
            "giants_ring",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      centaur_double_edge:
        "You can skill this spell on level one or two if you can pressure or against Naga Siren to kill her illusions. The more aggressive you can be on the lane, the less points in Retaliate you need.",
      special_bonus_unique_centaur_5:
        "You can this talent instead if you are close to or already having Aghanim`s Scepter.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      vanguard:
        "A core item that allows you to be come extremely tanky, to creepskip and clear stacks.",
      blink:
        "A core item that allows you to initiate the fights by jumping in and Hoof Stomping.",
      hood_of_defiance:
        "A core item that allows tanks you up against magical damage. Reduces the self-damage taken from Double Edge.",
      crimson_guard: "Against high attack speed heroes and multiple units.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      pipe: "To protect your team against magical damage.",
      aghanims_shard: "For extra damage and tankiness.",
      lotus_orb: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
      ultimate_scepter: "Against bursty lineups.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
    },
  },

  "Chaos Knight": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803680,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916165",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_chaos_strike", // 2
          "chaos_knight_reality_rift", // 3
          "chaos_knight_chaos_strike", // 4
          "chaos_knight_chaos_strike", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_strike", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "chaos_knight_reality_rift", // 10
          "chaos_knight_chaos_bolt", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_bolt", // 13
          "chaos_knight_chaos_bolt", // 14
          "special_bonus_unique_chaos_knight_6", // 15
          "special_bonus_strength_12", // 16
          "special_bonus_attributes", // 17
          "chaos_knight_phantasm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chaos_knight", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chaos_knight_5", // 25
        ],
        ability_tooltips: {
          special_bonus_unique_chaos_knight_6:
            "On level fifteen, take the level fifteen talent before this level ten talent. On level sixteen take this level ten talent. The dota2 client disallows me to indicate that in the leveling table above.",
        },
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "enchanted_mango",
            "circlet",
            "magic_stick",
          ],
          early_game: ["magic_wand", "power_treads", "bracer", "soul_ring"],
          mid_game: ["armlet", "sange_and_yasha", "aghanims_shard", "skadi"],
          late_game: ["heart", "assault", "satanic", "skadi"],
          situational: [
            "hand_of_midas",
            "blink",
            "black_king_bar",
            "silver_edge",
          ],
          core: ["power_treads", "armlet"],
          neutral: [
            "unstable_wand",
            "possessed_mask",
            "vambrace",
            "pupils_gift",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "spell_prism",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          hand_of_midas:
            "If you can get it early. Your illusions benefit from the attack speed as well.",
          blink:
            "Allows you to use Phantasm, blink in and pull the illusions onto the opponent with Reality Rift.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641361683,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2708440963",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_reality_rift", // 2
          "chaos_knight_chaos_strike", // 3
          "chaos_knight_chaos_bolt", // 4
          "chaos_knight_chaos_bolt", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_bolt", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "chaos_knight_reality_rift", // 10
          "special_bonus_unique_chaos_knight_2", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_strike", // 13
          "chaos_knight_chaos_strike", // 14
          "special_bonus_unique_chaos_knight_8", // 15
          "chaos_knight_chaos_strike", // 16
          "special_bonus_attributes", // 17
          "chaos_knight_phantasm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chaos_knight_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chaos_knight_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: ["magic_wand", "power_treads", "soul_ring", "bracer"],
          mid_game: ["armlet", "blink", "ultimate_scepter", "aghanims_shard"],
          late_game: ["assault", "octarine_core"],
          situational: ["heavens_halberd", "black_king_bar", "silver_edge"],
          core: [
            "power_treads",
            "armlet",
            "blink",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            "unstable_wand",
            "possessed_mask",
            "vambrace",
            "pupils_gift",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "spell_prism",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          // Offlane CK tips
          blink:
            "A core item that allows you to use Phantasm, blink in and pull the illusions onto the opponent with Reality Rift.",
          ultimate_scepter:
            "A core item that makes Phantasm create an extra illusion of Chaos Knight and of each ally. Applies a basic dispel on cast.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          aghanims_shard:
            "A core item that improves cast range of Chaos Bolt and creates an Chaos Knight illusion to attack the target by default.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_chaos_knight:
        "If there are no spell-immune heroes or Black King Bars, take the other talent.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core item that allows you to farm faster due to attack speed increase. The movement speed, attributes and attack speed also affect the illusions.",
      armlet:
        "A core item that boosts your dps significantly as Armlet active bonus strength is passed to your illusions as well.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      silver_edge:
        "For pick-off potential, easier initiation and break effect.",
    },
  },

  Chen: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803695,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916263",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "chen_holy_persuasion", // 1
          "chen_divine_favor", // 2
          "chen_holy_persuasion", // 3
          "chen_penitence", // 4
          "chen_holy_persuasion", // 5
          "chen_hand_of_god", // 6
          "chen_holy_persuasion", // 7
          "chen_penitence", // 8
          "chen_penitence", // 9
          "special_bonus_unique_chen_11", // 10
          "chen_penitence", // 11
          "chen_hand_of_god", // 12
          "chen_divine_favor", // 13
          "chen_divine_favor", // 14
          "chen_divine_favor", // 15
          "special_bonus_unique_chen_5", // 16
          "special_bonus_attributes", // 17
          "chen_hand_of_god", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chen_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chen_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "blight_stone",
            "headdress",
            "ward_observer",
            "ward_sentry",
            "faerie_fire",
            "branches",
            "buckler",
          ],
          early_game: [
            "boots",
            "magic_wand",
            "medallion_of_courage",
            "ring_of_basilius",
          ],
          mid_game: [
            "mekansm",
            "solar_crest",
            "aghanims_shard",
            "holy_locket",
            "ancient_janggo",
            "guardian_greaves",
            "glimmer_cape",
            "force_staff",
          ],
          late_game: ["ultimate_scepter", "aeon_disk", "vladmir"],
          situational: ["infused_raindrop", "lotus_orb"],
          core: ["mekansm", "solar_crest"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "spider_legs",
            "spy_gadget",
            "spell_prism",
            "force_field",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      infused_raindrop: "Against magical burst.",
      mekansm:
        "A core item that allows you to group up early and pressure buildings.",
      solar_crest:
        "A core item that buffs one of your right-clicking cores and allows you to take Roshan earlier.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  Clinkz: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803707,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916348",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "clinkz_searing_arrows", // 1
          "clinkz_strafe", // 2
          "clinkz_searing_arrows", // 3
          "clinkz_strafe", // 4
          "clinkz_strafe", // 5
          "clinkz_death_pact", // 6
          "clinkz_strafe", // 7
          "clinkz_wind_walk", // 8
          "clinkz_searing_arrows", // 9
          "special_bonus_mp_regen_175", // 10
          "clinkz_searing_arrows", // 11
          "clinkz_death_pact", // 12
          "clinkz_wind_walk", // 13
          "clinkz_wind_walk", // 14
          "special_bonus_unique_clinkz_1", // 15
          "clinkz_wind_walk", // 16
          "special_bonus_attributes", // 17
          "clinkz_death_pact", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_range_125", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_clinkz_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "slippers",
            "quelling_blade",
            "magic_stick",
          ],
          early_game: ["maelstrom", "boots", "power_treads", "magic_wand"],
          mid_game: [
            "falcon_blade",
            "dragon_lance",
            "aghanims_shard",
            "skadi",
            "gungir",
          ],
          late_game: ["greater_crit", "satanic"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "ultimate_scepter",
          ],
          core: ["maelstrom", "power_treads", "dragon_lance", "skadi"],
          neutral: [
            "arcane_ring",
            "possessed_mask",
            "grove_bow",
            "ring_of_aquila",
            "enchanted_quiver",
            "paladin_sword",
            "spell_prism",
            "the_leveller",
            "desolator_2",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      maelstrom: "A core farming item that can proc with Burning Barrage.",
      power_treads:
        "A core item that allows you to farm faster due to attack speed increase and mana savings by toggling it.",
      dragon_lance:
        "A core item that allows you to shoot from far away and it also increases the reach of Burning Barrage.",
      skadi:
        "A core item that tanks you up and keeps the opponents in Burning Barrage for longer.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      monkey_king_bar: "Against evasion.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
      ultimate_scepter:
        "For more AoE damage and chaos in late game teamfights.",
    },
  },

  Clockwerk: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803718,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916434",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "rattletrap_battery_assault", // 1
          "rattletrap_power_cogs", // 2
          "rattletrap_battery_assault", // 3
          "rattletrap_rocket_flare", // 4
          "rattletrap_battery_assault", // 5
          "rattletrap_hookshot", // 6
          "rattletrap_battery_assault", // 7
          "rattletrap_rocket_flare", // 8
          "rattletrap_rocket_flare", // 9
          "rattletrap_rocket_flare", // 10
          "special_bonus_unique_clockwerk_7", // 11
          "rattletrap_hookshot", // 12
          "rattletrap_power_cogs", // 13
          "rattletrap_power_cogs", // 14
          "special_bonus_unique_clockwerk_3", // 15
          "rattletrap_power_cogs", // 16
          "special_bonus_attributes", // 17
          "rattletrap_hookshot", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_clockwerk_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_clockwerk", // 25
        ],
        items: {
          starting: [
            "tango",
            "boots",
            "flask",
            "wind_lace",
            "enchanted_mango",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "tranquil_boots",
            "urn_of_shadows",
            "magic_wand",
            "wind_lace",
          ],
          mid_game: ["force_staff", "glimmer_cape", "ghost", "blade_mail"],
          late_game: ["ultimate_scepter", "sheepstick"],
          situational: [
            "spirit_vessel",
            "ancient_janggo",
            "lotus_orb",
            "heavens_halberd",
          ],
          core: ["tranquil_boots", "force_staff", "ultimate_scepter"],
          neutral: [
            "pogo_stick",
            "unstable_wand",
            "essence_ring",
            "dragon_scale",
            "cloak_of_flames",
            "black_powder_bag",
            "ascetic_cap",
            "trickster_cloak",
            "force_field",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_clockwerk_4:
        "Even though the opponents might not have invisibility in some shape or form, it is still useful talent to deward.",
      special_bonus_unique_clockwerk_6:
        "You can take this talent over the other one if the opponents become short on damage once you become spell-immune.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ward_sentry: "To block or unblock the pull camp.",
      tranquil_boots:
        "A core boots upgrade that allows you to sustain HP and move fast around the map. You can consider Phase Boots instead if you have a good start.",
      spirit_vessel: "Against heavy healing lineup.",
      force_staff:
        "A core item that allows you to catch up to opponents` heroes even in scenario when they get a Force Staff as well.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter:
        "A core item. Having two of each spells is always better than having only one.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  "Crystal Maiden": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803727,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916517",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "crystal_maiden_crystal_nova", // 1
          "crystal_maiden_brilliance_aura", // 2
          "crystal_maiden_frostbite", // 3
          "crystal_maiden_brilliance_aura", // 4
          "crystal_maiden_crystal_nova", // 5
          "crystal_maiden_crystal_nova", // 6
          "crystal_maiden_crystal_nova", // 7
          "crystal_maiden_frostbite", // 8
          "crystal_maiden_frostbite", // 9
          "crystal_maiden_frostbite", // 10
          "special_bonus_unique_crystal_maiden_6", // 11
          "crystal_maiden_freezing_field", // 12
          "crystal_maiden_freezing_field", // 13
          "crystal_maiden_brilliance_aura", // 14
          "special_bonus_unique_crystal_maiden_5", // 15
          "crystal_maiden_brilliance_aura", // 16
          "special_bonus_attributes", // 17
          "crystal_maiden_freezing_field", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_speed_200", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_crystal_maiden_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
            "ring_of_basilius",
          ],
          early_game: ["tranquil_boots", "magic_wand", "wind_lace"],
          mid_game: ["glimmer_cape", "force_staff", "ghost", "aether_lens"],
          late_game: ["aeon_disk", "sheepstick"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "blink",
            "aghanims_shard",
            "lotus_orb",
            "ultimate_scepter",
          ],
          core: ["tranquil_boots", "glimmer_cape"],
          neutral: [
            "trusty_shovel",
            "keen_optic",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "spy_gadget",
            "timeless_relic",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      crystal_maiden_frostbite:
        "You can skill this spell at level two if you see yourself being able to kill an enemy. You need to have mana for both active spell though.",
      crystal_maiden_freezing_field:
        "It is hard to get off a long impactful Freezing Field in early to mid-game, until you get Blink Dagger and Black King Bar which is a greedy build. You can skill it earlier than recommended by guide if you have a good setup from your teammates or to clear some stacks.",
      special_bonus_unique_crystal_maiden_4:
        "You can skill this talent over recommended one if you are facing heavy magical-damage lineup.",
      special_bonus_unique_crystal_maiden_3:
        "You can skill this talent over recommended one if you are doing well and can afford to buy Blink Dagger and Black King Bar.",
      special_bonus_unique_crystal_maiden_1:
        "You can skill this talent over recommended one if you have Aghanim`s Scepter.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_basilius:
        "Start with it if your laning partner also uses a lot of mana early. Send more HP consumables from base though.",
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade which fixes her movement speed issues.",
      glimmer_cape:
        "A core defensive item. It can be used during Freezing Field channeling.",
      black_king_bar:
        "If the game opens up for you. Allows you to channel Freezing Field longer. Couples well with Blink Dagger to be able to position your ultimate nicely.",
      blink: "Goes well with the build centered around your ultimate.",
      aghanims_shard:
        "Allows you to cast and move slowly while channeling the Freezing Field.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter:
        "If the game opens up for you and you proceed with item and talent build centered around Freezing Field. Goes will with Blink Dagger, Black King Bar and Aghanim`s Shard.",
    },
  },

  "Dark Seer": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803737,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916602",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "dark_seer_ion_shell", // 1
          "dark_seer_vacuum", // 2
          "dark_seer_ion_shell", // 3
          "dark_seer_surge", // 4
          "dark_seer_ion_shell", // 5
          "dark_seer_wall_of_replica", // 6
          "dark_seer_ion_shell", // 7
          "dark_seer_surge", // 8
          "dark_seer_surge", // 9
          "dark_seer_surge", // 10
          "dark_seer_vacuum", // 11
          "dark_seer_wall_of_replica", // 12
          "dark_seer_vacuum", // 13
          "dark_seer_vacuum", // 14
          "special_bonus_unique_dark_seer_7", // 15
          "special_bonus_unique_dark_seer_5", // 16
          "special_bonus_attributes", // 17
          "dark_seer_wall_of_replica", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dark_seer", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dark_seer_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "enchanted_mango",
            "clarity",
            "flask",
            "mantle",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "null_talisman",
            "soul_ring",
            "arcane_boots",
            "magic_wand",
          ],
          mid_game: [
            "ultimate_scepter",
            "blink",
            "aghanims_shard",
            "mekansm",
            "hood_of_defiance",
          ],
          late_game: [
            "sheepstick",
            "refresher",
            "shivas_guard",
            "octarine_core",
          ],
          situational: [
            "bottle",
            "infused_raindrop",
            "guardian_greaves",
            "pipe",
            "black_king_bar",
            "lotus_orb",
          ],
          core: ["arcane_boots", "ultimate_scepter", "blink", "aghanims_shard"],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "philosophers_stone",
            "essence_ring",
            "quickening_charm",
            "cloak_of_flames",
            "spell_prism",
            "trickster_cloak",
            "force_field",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_dark_seer_7:
        "On level fifteen, you should take the level fifteen talent before this level ten one. The dota client disallows me to set it up in such order in graphics above.",
    },
    item_tooltips: {
      bottle: "Alternative way to solve your sustain issues.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. You can disassemble it down the road.",
      ultimate_scepter:
        "A core item that buffs your allies and allows you to push out lanes faster.",
      blink:
        "Allows you to get Vacuum into Wall of Replica combo on multiple opponents. Goes well with Aghanim`s Shard.",
      aghanims_shard:
        "For extra disable and damage. Goes well with Blink Dagger.",
      guardian_greaves: "If you are looking to group up early and for dispel.",
      pipe: "Against heavy magical-damage lineups.",
      black_king_bar: "To be able to get your combo off.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  "Dark Willow": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803745,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916714",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dark_willow_bramble_maze", // 1
          "dark_willow_shadow_realm", // 2
          "dark_willow_shadow_realm", // 3
          "dark_willow_cursed_crown", // 4
          "dark_willow_bramble_maze", // 5
          "dark_willow_bedlam", // 6
          "dark_willow_bramble_maze", // 7
          "dark_willow_bramble_maze", // 8
          "dark_willow_cursed_crown", // 9
          "dark_willow_cursed_crown", // 10
          "dark_willow_cursed_crown", // 11
          "dark_willow_bedlam", // 12
          "special_bonus_unique_dark_willow_6", // 13
          "dark_willow_shadow_realm", // 14
          "special_bonus_unique_dark_willow_7", // 15
          "dark_willow_shadow_realm", // 16
          "special_bonus_attributes", // 17
          "dark_willow_bedlam", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dark_willow_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dark_willow_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "faerie_fire",
            "circlet",
            "branches",
            "enchanted_mango",
            "mantle",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
            "ring_of_basilius",
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            "null_talisman",
            "urn_of_shadows",
          ],
          mid_game: [
            "cyclone",
            "blink",
            "aghanims_shard",
            "aether_lens",
            "ghost",
            "force_staff",
          ],
          late_game: ["octarine_core", "aeon_disk"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "ultimate_scepter",
          ],
          core: ["tranquil_boots", "cyclone", "aghanims_shard"],
          neutral: [
            "pogo_stick",
            "keen_optic",
            "philosophers_stone",
            "grove_bow",
            "spider_legs",
            "psychic_headband",
            "spy_gadget",
            "timeless_relic",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_basilius:
        "Start with it if your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that solves your hp sustain issues but also allows you to move around quickly.",
      cyclone:
        "A core item that combines well with Cursed Crown and Bramble Maze.",
      spirit_vessel: "Against heavy healing lineup.",
      aghanims_shard: "A core item for extra control.",
      ultimate_scepter:
        "If the game opens up for you, you can pick up this item and work on acquiring more attack speed with level twenty-five talent and items.",
    },
  },

  Dawnbreaker: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803756,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917167",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dawnbreaker_fire_wreath", // 1
          "dawnbreaker_celestial_hammer", // 2   equals to 'starbreaker'
          "dawnbreaker_celestial_hammer", // 3
          "dawnbreaker_fire_wreath", // 4   equals to 'starbreaker'
          "dawnbreaker_celestial_hammer", // 5
          "dawnbreaker_solar_guardian", // 6
          "dawnbreaker_celestial_hammer", // 7
          "dawnbreaker_fire_wreath", // 8
          "dawnbreaker_fire_wreath", // 9
          "special_bonus_unique_dawnbreaker_celestial_hammer_slow", // 10
          "dawnbreaker_luminosity", // 11
          "dawnbreaker_solar_guardian", // 12
          "dawnbreaker_luminosity", // 13
          "dawnbreaker_luminosity", // 14
          "special_bonus_unique_dawnbreaker_solar_guardian_cooldown", // 15
          "dawnbreaker_luminosity", // 16
          "special_bonus_attributes", // 17
          "dawnbreaker_solar_guardian", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dawnbreaker_solar_guardian_radius", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dawnbreaker_celestial_hammer_cast_range", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "orb_of_venom",
            "branches",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: ["magic_wand", "arcane_boots"],
          mid_game: [
            "holy_locket",
            "solar_crest",
            "ultimate_scepter",
            "mekansm",
          ],
          late_game: ["refresher", "vladmir"],
          situational: ["guardian_greaves", "aghanims_shard", "lotus_orb"],
          core: ["holy_locket", "ultimate_scepter"],
          neutral: [
            "trusty_shovel",
            "pogo_stick",
            "philosophers_stone",
            "essence_ring",
            "quickening_charm",
            "spider_legs",
            "spell_prism",
            "trickster_cloak",
            "force_field",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom: "If you can pressure on the lane.",
      holy_locket:
        "A core item that boosts the healing coming for Solar Guardian and other sources.",
      guardian_greaves:
        "If you need dispel. Fits well with the healing theme of this hero.",
      ultimate_scepter:
        "A core item that provides even more healing but also evasion to allies under effect of Solar Guardian.",
      aghanims_shard: "Can help you survive when you Solar Guardian in.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  Dazzle: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803766,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917255",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dazzle_poison_touch", // 1
          "dazzle_shadow_wave", // 2
          "dazzle_poison_touch", // 3
          "dazzle_shallow_grave", // 4
          "dazzle_poison_touch", // 5
          "dazzle_bad_juju", // 6
          "dazzle_shadow_wave", // 7
          "dazzle_shadow_wave", // 8
          "dazzle_shadow_wave", // 9
          "special_bonus_mp_regen_175", // 10
          "dazzle_shallow_grave", // 11
          "dazzle_bad_juju", // 12
          "dazzle_shallow_grave", // 13
          "dazzle_shallow_grave", // 14
          "special_bonus_strength_20", // 15
          "dazzle_poison_touch", // 16
          "special_bonus_attributes", // 17
          "dazzle_bad_juju", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dazzle_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dazzle_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "ward_observer",
            "ward_sentry",
            "blight_stone",
            "magic_stick",
          ],
          early_game: ["arcane_boots", "magic_wand", "medallion_of_courage"],
          mid_game: [
            "holy_locket",
            "glimmer_cape",
            "aghanims_shard",
            "force_staff",
            "solar_crest",
            "aether_lens",
          ],
          late_game: ["aeon_disk", "ultimate_scepter", "vladmir"],
          situational: ["infused_raindrop", "lotus_orb"],
          core: [
            "arcane_boots",
            "holy_locket",
            "glimmer_cape",
            "aghanims_shard",
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "ascetic_cap",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      blight_stone:
        "If you expect double melee against you. Synergizes well with pyscial damage of Poison Touch and Shadow Wave.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade which benefits from cooldown reduction from Bad Juju. Can be disassembled later on.",
      holy_locket:
        "A core item that goes well with the healing theme of the hero.",
      glimmer_cape: "A core defensive item.",
      aghanims_shard: "A core item that provides extra control in fights.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  "Death Prophet": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803776,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917391",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "death_prophet_carrion_swarm", // 1
          "death_prophet_spirit_siphon", // 2
          "death_prophet_carrion_swarm", // 3
          "death_prophet_spirit_siphon", // 4
          "death_prophet_spirit_siphon", // 5
          "death_prophet_exorcism", // 6
          "death_prophet_spirit_siphon", // 7
          "death_prophet_silence", // 8
          "death_prophet_silence", // 9
          "special_bonus_attack_damage_30", // 10
          "death_prophet_silence", // 11
          "death_prophet_exorcism", // 12
          "death_prophet_silence", // 13
          "death_prophet_carrion_swarm", // 14
          "special_bonus_unique_death_prophet_3", // 15
          "death_prophet_carrion_swarm", // 16
          "special_bonus_attributes", // 17
          "death_prophet_exorcism", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_400", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_death_prophet", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "null_talisman", "boots", "magic_wand"],
          mid_game: [
            "cyclone",
            "travel_boots",
            "black_king_bar",
            "kaya_and_sange",
            "aghanims_shard",
          ],
          late_game: [
            "assault",
            "refresher",
            "octarine_core",
            "ultimate_scepter",
          ],
          situational: [
            "infused_raindrop",
            "heavens_halberd",
            "shivas_guard",
            "blink",
          ],
          core: [
            "cyclone",
            "travel_boots",
            "black_king_bar",
            "kaya_and_sange",
            "aghanims_shard",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "essence_ring",
            "dragon_scale",
            "quickening_charm",
            "black_powder_bag",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_death_prophet_5:
        "You can take this talent at level 25 over the suggested one. Usually, having 5 Spirit Siphons per fight due to Aghanim`s Shard should be more than enough thus I prefer the Exorcism talent. Also, if you have Refresher Orb or Shard in late game, the Siphon talent is redundant.",
    },
    item_tooltips: {
      ward_observer:
        "If you are playing mid Death Prophet but also on the offlane to have vision around your lane.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle:
        "If you are playing mid Death Prophet but also worth considering on offlane too if your mid isn`t buying bottle. Make sure your supports refill it for you here and there.",
      infused_raindrop: "Against magical burst.",
      cyclone:
        "A core item that helps with mana sustain and provides extra movement speed and dispel. You can heal from Spirit Siphons while cycloned. Keeps you alive while Exorcism still does damage around you.",
      travel_boots:
        "A core item that allows you to cover the map better and deals with kiting along with BKB.",
      black_king_bar:
        "A core item that allows you not to be kited during Exorcism.",
      kaya_and_sange:
        "A core items that presents a mix of defensive and offensive stats.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      aghanims_shard: "A core item for more control and sustain.",
      shivas_guard:
        "Great at reducing healing, bumping up your armor and preventing kiting.",
      blink: "Great for gap closing.",
    },
  },

  Disruptor: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803786,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561304",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "disruptor_thunder_strike", // 1
          "disruptor_kinetic_field", // 2
          "disruptor_thunder_strike", // 3
          "disruptor_glimpse", // 4
          "disruptor_glimpse", // 5
          "disruptor_static_storm", // 6
          "disruptor_glimpse", // 7
          "disruptor_glimpse", // 8
          "disruptor_thunder_strike", // 9
          "disruptor_thunder_strike", // 10
          "special_bonus_unique_disruptor_3", // 11
          "disruptor_static_storm", // 12
          "disruptor_kinetic_field", // 13
          "disruptor_kinetic_field", // 14
          "special_bonus_unique_disruptor_7", // 15
          "disruptor_kinetic_field", // 16
          "special_bonus_attributes", // 17
          "disruptor_static_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_disruptor", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_disruptor_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "ring_of_basilius",
            "magic_stick",
          ],
          early_game: ["arcane_boots", "magic_wand", "tranquil_boots"],
          mid_game: [
            "glimmer_cape",
            "solar_crest",
            "aghanims_shard",
            "ghost",
            "force_staff",
            "veil_of_discord",
          ],
          late_game: ["ultimate_scepter", "aeon_disk"],
          situational: ["infused_raindrop", "blink"],
          core: ["glimmer_cape", "solar_crest", "aghanims_shard"],
          neutral: [
            "trusty_shovel",
            "pogo_stick",
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "ascetic_cap",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_basilius:
        "Start with it if your laning partner also uses a lot of mana early. Bring additional hp consumables with courier right away.",
      glimmer_cape: "A core defensive item.",
      solar_crest:
        "A core item that goes well with Aghanim`s Shard to buff a right-clicking core.",
      aghanims_shard:
        "Goes well with Solar Crest to buff a right-clicking core.",
      infused_raindrop: "Against magical burst.",
      blink:
        "Allows you to land a multi-hero Static Storm especially once you have Aghanim`s Scepter.",
    },
  },

  Doom: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803798,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561417",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "doom_bringer_devour", // 1
          "doom_bringer_scorched_earth", // 2
          "doom_bringer_devour", // 3
          "doom_bringer_scorched_earth", // 4
          "doom_bringer_devour", // 5
          "doom_bringer_doom", // 6
          "doom_bringer_devour", // 7
          "doom_bringer_scorched_earth", // 8
          "doom_bringer_scorched_earth", // 9
          "special_bonus_unique_doom_4", // 10
          "doom_bringer_infernal_blade", // 11
          "doom_bringer_doom", // 12
          "doom_bringer_infernal_blade", // 13
          "doom_bringer_infernal_blade", // 14
          "special_bonus_unique_doom_9", // 15
          "doom_bringer_infernal_blade", // 16
          "special_bonus_attributes", // 17
          "doom_bringer_doom", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_doom_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_doom_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: ["phase_boots", "soul_ring", "hand_of_midas"],
          mid_game: ["blink", "black_king_bar", "shivas_guard"],
          late_game: ["refresher", "arcane_blink"],
          situational: [
            "aghanims_shard",
            "force_staff",
            "heavens_halberd",
            "invis_sword",
            "ultimate_scepter",
            "aeon_disk",
          ],
          core: ["phase_boots", "hand_of_midas", "black_king_bar", "blink"],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "dragon_scale",
            "essence_ring",
            "quickening_charm",
            "spider_legs",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      phase_boots:
        "A core boots upgrade that provides you with armor and allows you to get Doom off easier.",
      hand_of_midas:
        "A core item that allows you to level up faster and acquire a bit of extra gold.",
      black_king_bar:
        "A core item that allows you to get Doom off and stay in the middle of the fight.",
      blink:
        "A core item that allows you to get Doom off on specific target. Goes well with devoured Centaur stomp ability.",
      aghanims_shard: "For extra damage and control.",
      force_staff: "To pop Linken`s if necessary.",
      heavens_halberd:
        "Especially good against ranged right-clicking heroes and to pop Linken`s if necessary.",
      invis_sword: "Helps with getting Doom off on specific hero.",
      ultimate_scepter: "For break effect.",
      aeon_disk:
        "Gives you a second chance to survive and get spells and items off.",
    },
  },

  "Dragon Knight": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803808,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561505",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "dragon_knight_breathe_fire", // 1
          "dragon_knight_dragon_blood", // 2
          "dragon_knight_dragon_blood", // 3
          "dragon_knight_breathe_fire", // 4
          "dragon_knight_dragon_tail", // 5
          "dragon_knight_elder_dragon_form", // 6
          "dragon_knight_breathe_fire", // 7
          "dragon_knight_breathe_fire", // 8
          "dragon_knight_dragon_tail", // 9
          "special_bonus_attack_damage_15", // 10
          "dragon_knight_dragon_tail", // 11
          "dragon_knight_elder_dragon_form", // 12
          "dragon_knight_dragon_tail", // 13
          "dragon_knight_dragon_blood", // 14
          "special_bonus_unique_dragon_knight_2", // 15
          "dragon_knight_dragon_blood", // 16
          "special_bonus_attributes", // 17
          "dragon_knight_elder_dragon_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dragon_knight_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "gauntlets",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: ["soul_ring", "power_treads", "magic_wand"],
          mid_game: ["blink", "black_king_bar", "orchid", "armlet"],
          late_game: ["ultimate_scepter", "assault", "bloodthorn"],
          situational: [
            "ward_observer",
            "bottle",
            "hand_of_midas",
            "heavens_halberd",
            "silver_edge",
          ],
          core: ["power_treads", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "chipped_vest",
            "vambrace",
            "nether_shawl",
            "quickening_charm",
            "spider_legs",
            "trickster_cloak",
            "spell_prism",
            "fallen_sky",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      dragon_knight_dragon_tail:
        "You can skill a point in this spell earlier than suggested if you can setup a kill or apply pressure.",
    },
    item_tooltips: {
      ward_observer:
        "For mid Dragon Knight but bring it to offlane too if it is available.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      bottle:
        "If you are playing mid Dragon Knight. In that case you can skip Soul Ring.",
      power_treads:
        "A core boots upgrade that provides you with attack speed increase and some mana savings by toggling it.",
      hand_of_midas: "If you can get it early usually on mid Dragon Knight.",
      blink:
        "A core item that helps you initiate the fights. Can be coupled with Bloodthorn down the road to burst the stunned hero.",
      black_king_bar:
        "Allows you to stay in the middle of the fight. Dragon Blood provides you with physical damage resistance and Black King Bar negates most of the magical damage and disables.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      silver_edge: "For break effect.",
    },
  },

  "Drow Ranger": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803817,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561590",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "drow_ranger_frost_arrows", // 1
          "drow_ranger_multishot", // 2
          "drow_ranger_frost_arrows", // 3
          "drow_ranger_multishot", // 4
          "drow_ranger_multishot", // 5
          "drow_ranger_marksmanship", // 6
          "drow_ranger_multishot", // 7
          "drow_ranger_wave_of_silence", // 8
          "drow_ranger_frost_arrows", // 9
          "special_bonus_unique_drow_ranger_2", // 10
          "drow_ranger_frost_arrows", // 11
          "drow_ranger_marksmanship", // 12
          "drow_ranger_wave_of_silence", // 13
          "drow_ranger_wave_of_silence", // 14
          "special_bonus_unique_drow_ranger_6", // 15
          "drow_ranger_wave_of_silence", // 16
          "special_bonus_attributes", // 17
          "drow_ranger_marksmanship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_drow_ranger_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_drow_ranger_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "slippers",
            "branches",
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "falcon_blade"],
          mid_game: ["dragon_lance", "manta", "hurricane_pike", "lesser_crit"],
          late_game: ["greater_crit", "skadi", "butterfly", "satanic"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "blink",
            "aghanims_shard",
            "silver_edge",
            "sphere",
            "mjollnir",
          ],
          core: ["power_treads", "dragon_lance", "manta"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "vambrace",
            "titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "the_leveller",
            "apex",
            "force_boots",
          ],
        },
      },
    ],
    ability_tooltips: {
      drow_ranger_wave_of_silence:
        "You can skill a point in this spell earlier than suggested if that allows you to survive the lane or land a kill.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that speeds up your farm by increasing attack speed and saves a bit of mana through toggling.",
      dragon_lance:
        "A core item that allows you to shoot from further away. Can be upgrade to Pike against gap-closing heroes.",
      manta:
        "A core item that improves your farming speed, damage output and survivabilty.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      blink: "To reposition. Can be upgraded to Swift Blink down the road.",
      aghanims_shard: "To offset healing and for extra bit of damage.",
      silver_edge: "For break effect and to be able to reposition.",
      sphere:
        "Against powerful single target disables/debuffs and gap-closing spells and items.",
      mjollnir:
        "Against illusion-based heroes. It is better than Aghanim`s Scepter.",
    },
  },
  "Earth Spirit": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803831,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561679",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "earth_spirit_rolling_boulder", // 1
          "earth_spirit_boulder_smash", // 2
          "earth_spirit_boulder_smash", // 3
          "earth_spirit_geomagnetic_grip", // 4
          "earth_spirit_rolling_boulder", // 5
          "earth_spirit_magnetize", // 6
          "earth_spirit_rolling_boulder", // 7
          "earth_spirit_rolling_boulder", // 8
          "earth_spirit_geomagnetic_grip", // 9
          "special_bonus_unique_earth_spirit_4", // 10
          "earth_spirit_geomagnetic_grip", // 11
          "earth_spirit_magnetize", // 12
          "earth_spirit_geomagnetic_grip", // 13
          "earth_spirit_boulder_smash", // 14
          "special_bonus_unique_earth_spirit", // 15
          "earth_spirit_boulder_smash", // 16
          "special_bonus_attributes", // 17
          "earth_spirit_magnetize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_earth_spirit_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_earth_spirit_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "circlet",
            "ring_of_protection",
            "enchanted_mango",
            "faerie_fire",
            "boots",
            "orb_of_venom",
            "branches",
            "sobi_mask",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: ["urn_of_shadows", "tranquil_boots", "magic_wand"],
          mid_game: ["cyclone", "ghost", "aghanims_shard", "veil_of_discord"],
          late_game: [
            "aeon_disk",
            "ultimate_scepter",
            "blink",
            "ethereal_blade",
          ],
          situational: [
            "spirit_vessel",
            "black_king_bar",
            "lotus_orb",
            "heavens_halberd",
          ],
          core: ["urn_of_shadows", "tranquil_boots", "aghanims_shard"],
          neutral: [
            "keen_optic",
            "arcane_ring",
            "essence_ring",
            "vambrace",
            "quickening_charm",
            "cloak_of_flames",
            "spell_prism",
            "timeless_relic",
            "giants_ring",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      boots:
        "Start with boots if you are looking to hijack the second wave, roam early and stack camps.",
      urn_of_shadows:
        "A core item that provides you with needed stats and allows you to snowball off of a first kill.",
      tranquil_boots:
        "A core boots upgrade that solves hp sustain issues and allows you to roam around faster.",
      spirit_vessel:
        "Against heavy healing lineup but could also be a good pick-up in most cases as it also tanks you up.",
      aghanims_shard:
        "A core upgrade that allows you to have more stones to use but also to provide vision.",
      black_king_bar: "To be able to initiate and get long Magnetize off.",
      lotus_orb: "For reflect, dispel and armor.",
      heavens_halberd: "Especially good against ranged right-clicking cores.",
      blink: "Goes well with Aghanim`s Scepter.",
    },
  },
  Earthshaker: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803845,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561769",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "earthshaker_fissure", // 1
          "earthshaker_enchant_totem", // 2
          "earthshaker_fissure", // 3
          "earthshaker_aftershock", // 4
          "earthshaker_fissure", // 5
          "earthshaker_echo_slam", // 6
          "earthshaker_aftershock", // 7
          "earthshaker_aftershock", // 8
          "earthshaker_aftershock", // 9
          "earthshaker_fissure", // 10
          "special_bonus_unique_earthshaker_4", // 11
          "earthshaker_echo_slam", // 12
          "earthshaker_enchant_totem", // 13
          "earthshaker_enchant_totem", // 14
          "special_bonus_unique_earthshaker_6", // 15
          "earthshaker_enchant_totem", // 16
          "special_bonus_attributes", // 17
          "earthshaker_echo_slam", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_earthshaker_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_earthshaker", // 25
        ],
        items: {
          starting: ["boots", "clarity", "ward_observer", "ward_sentry"],
          early_game: [
            "tranquil_boots",
            "soul_ring",
            "wind_lace",
            "arcane_boots",
            "magic_wand",
          ],
          mid_game: [
            "blink",
            "cyclone",
            "aghanims_shard",
            "force_staff",
            "invis_sword",
            "ghost",
            "aether_lens",
          ],
          late_game: ["ultimate_scepter", "octarine_core", "aeon_disk"],
          situational: ["lotus_orb"],
          core: ["blink", "aghanims_shard"],
          neutral: [
            "pogo_stick",
            "trusty_shovel",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "quickening_charm",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "giants_ring",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      blink: "A core item that allows you to get a multi-hero Echo Slam.",
      aghanims_shard:
        "A core item that reduces cooldown of the fissure, allows you to walk on it and applies half of the stun duration of Aftershock along it.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },
  "Elder Titan": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803855,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561834",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "elder_titan_ancestral_spirit", // 1
          "elder_titan_natural_order", // 2
          "elder_titan_ancestral_spirit", // 3
          "elder_titan_echo_stomp", // 4
          "elder_titan_echo_stomp", // 5
          "elder_titan_earth_splitter", // 6
          "elder_titan_echo_stomp", // 7
          "elder_titan_echo_stomp", // 8
          "elder_titan_natural_order", // 9
          "elder_titan_natural_order", // 10
          "elder_titan_natural_order", // 11
          "elder_titan_earth_splitter", // 12
          "elder_titan_ancestral_spirit", // 13
          "elder_titan_ancestral_spirit", // 14
          "special_bonus_attack_speed_20", // 15
          "special_bonus_unique_elder_titan", // 16
          "special_bonus_attributes", // 17
          "elder_titan_earth_splitter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_100", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_elder_titan_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "wind_lace",
            "enchanted_mango",
            "boots",
            "faerie_fire",
            "ward_observer",
            "ward_sentry",
            "orb_of_venom",
            "magic_stick",
          ],
          early_game: ["phase_boots", "magic_wand", "medallion_of_courage"],
          mid_game: [
            "solar_crest",
            "ultimate_scepter",
            "aghanims_shard",
            "ghost",
            "glimmer_cape",
            "force_staff",
            "veil_of_discord",
            "cyclone",
          ],
          late_game: ["assault", "aeon_disk", "greater_crit"],
          situational: ["spirit_vessel", "lotus_orb"],
          core: ["phase_boots", "ultimate_scepter"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "bullwhip",
            "essence_ring",
            "spider_legs",
            "elven_tunic",
            "the_leveller",
            "flicker",
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_movement_speed_15:
        "At level 15, you should skill the level 15 talent first and then the level 10 talent. The dota client system disallows me to indicate that in the graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it iff you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      phase_boots:
        "A core boots upgrade. Prefered over tranquils as it scales better. Activate Phase Boots before tossing the Astral Spirit out so the spirit moves faster.",
      spirit_vessel: "Against heavy healing lineup.",
      ultimate_scepter:
        "A core item that allows you to deliver right-clicks as you become spell immune based on the number of heroes your spirit passed through.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },
  "Ember Spirit": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640803867,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561902",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "ember_spirit_flame_guard", // 1
          "ember_spirit_sleight_of_fist", // 2
          "ember_spirit_flame_guard", // 3
          "ember_spirit_sleight_of_fist", // 4
          "ember_spirit_sleight_of_fist", // 5
          "ember_spirit_fire_remnant", // 6
          "ember_spirit_sleight_of_fist", // 7
          "ember_spirit_searing_chains", // 8
          "ember_spirit_flame_guard", // 9
          "ember_spirit_flame_guard", // 10
          "special_bonus_attack_damage_15", // 11
          "ember_spirit_searing_chains", // 12
          "ember_spirit_searing_chains", // 13
          "ember_spirit_searing_chains", // 14
          "special_bonus_unique_ember_spirit_2", // 15
          "ember_spirit_fire_remnant", // 16
          "special_bonus_attributes", // 17
          "ember_spirit_fire_remnant", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_ember_spirit_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_ember_spirit_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "boots",
            "orb_of_corrosion",
            "phase_boots",
            "magic_wand",
          ],
          mid_game: [
            "maelstrom",
            "ultimate_scepter",
            "gungir",
            "kaya_and_sange",
            "cyclone",
            "desolator",
          ],
          late_game: ["refresher", "shivas_guard", "greater_crit"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "aghanims_shard",
            "sphere",
          ],
          core: [
            "orb_of_corrosion",
            "phase_boots",
            "maelstrom",
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            "pogo_stick",
            "ring_of_aquila",
            "dragon_scale",
            "quickening_charm",
            "mind_breaker",
            "spell_prism",
            "penta_edged_sword",
            "desolator_2",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      ember_spirit_flame_guard:
        "You can put more points in this spell over Slight of Fist if the lane is not going particularly well. You'll catch-up faster with more points in Flame Guard.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      orb_of_corrosion: "A core item that works well with Sleight of Fist.",
      phase_boots:
        "A core boots upgrade. Make sure to activate Phase Boots before using dropping a Fire Remnant as it will travel faster.",
      maelstrom:
        "A core item that servers as a farming and dps tool. It can proc with Sleight of Fist.",
      ultimate_scepter:
        "A core item that adds to your burst and mobility. Goes well with Refresher later on.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard:
        "Adds to damage output and allows you to snowball in the fights with extra Fire Remnants.",
    },
  },
  Enchantress: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803881,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561968",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "enchantress_impetus", // 2
          "enchantress_enchant", // 1
          "enchantress_enchant", // 3
          "enchantress_natures_attendants", // 4
          "enchantress_enchant", // 5
          "enchantress_untouchable", // 6
          "enchantress_enchant", // 7
          "enchantress_natures_attendants", // 8
          "enchantress_natures_attendants", // 9
          "enchantress_natures_attendants", // 10
          "enchantress_impetus", // 11
          "enchantress_untouchable", // 12
          "enchantress_impetus", // 13
          "enchantress_impetus", // 14
          "special_bonus_magic_resistance_10", // 15
          "special_bonus_unique_enchantress_2", // 16
          "special_bonus_attributes", // 17
          "enchantress_untouchable", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enchantress_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_enchantress_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "blight_stone",
            "branches",
            "faerie_fire",
            "enchanted_mango",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: ["boots", "magic_wand", "power_treads"],
          mid_game: [
            "holy_locket",
            "solar_crest",
            "aghanims_shard",
            "force_staff",
            "glimmer_cape",
          ],
          late_game: ["hurricane_pike", "ultimate_scepter", "vladmir"],
          situational: ["infused_raindrop", "lotus_orb"],
          core: ["holy_locket", "aghanims_shard"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "grove_bow",
            "essence_ring",
            "spider_legs",
            "enchanted_quiver",
            "spy_gadget",
            "flicker",
            "force_field",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_magic_resistance_10:
        "On level 15, instead of taking this level 10 talent, take the level 15 talent instead. The dota client disallows me to display the talents in this order.",
      special_bonus_unique_enchantress_1:
        "You can take this talent over suggested one in case you are playing against an opponent with Helm of the Overlord.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      holy_locket: "A core item that adds to your healing output.",
      aghanims_shard:
        "A core item for additional healing. Fits well with Holy Locket.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  Enigma: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803897,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562081",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "enigma_demonic_conversion", // 1
          "enigma_malefice", // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          "enigma_demonic_conversion", // 7
          "enigma_midnight_pulse", // 8
          "enigma_midnight_pulse", // 9
          "special_bonus_unique_enigma_4", // 10
          "enigma_midnight_pulse", // 11
          "enigma_midnight_pulse", // 12
          "enigma_black_hole", // 13
          "enigma_malefice", // 14
          "special_bonus_unique_enigma_9", // 15
          "enigma_malefice", // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enigma_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_enigma", // 25
        ],
        items: {
          starting: [
            "tango",
            "null_talisman",
            "enchanted_mango",
            "mantle",
            "circlet",
            "clarity",
            "sobi_mask",
          ],
          early_game: ["arcane_boots", "magic_wand", "soul_ring"],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "aether_lens",
          ],
          late_game: [
            "refresher",
            "invis_sword",
            "arcane_blink",
            "ultimate_scepter",
          ],
          situational: ["hand_of_midas", "sphere", "aeon_disk"],
          core: ["arcane_boots", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "ninja_gear",
            "trickster_cloak",
            "force_boots",
            "seer_stone",
          ],
        },
        item_tooltips: {
          hand_of_midas: "If you can get it early and get away with it.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803897,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562081",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "enigma_demonic_conversion", // 1
          "enigma_malefice", // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          "enigma_demonic_conversion", // 7
          "enigma_midnight_pulse", // 8
          "enigma_midnight_pulse", // 9
          "special_bonus_unique_enigma_4", // 10
          "enigma_midnight_pulse", // 11
          "enigma_midnight_pulse", // 12
          "enigma_black_hole", // 13
          "enigma_malefice", // 14
          "special_bonus_unique_enigma_9", // 15
          "enigma_malefice", // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enigma_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_enigma", // 25
        ],
        items: {
          starting: [
            "tango",
            "null_talisman",
            "enchanted_mango",
            "mantle",
            "circlet",
            "clarity",
            "sobi_mask",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "ring_of_basilius",
            "arcane_boots",
            "magic_wand",
            "soul_ring",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "aether_lens",
          ],
          late_game: [
            "refresher",
            "invis_sword",
            "arcane_blink",
            "ultimate_scepter",
          ],
          situational: ["infused_raindrop", "sphere", "aeon_disk"],
          core: ["arcane_boots", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "ninja_gear",
            "trickster_cloak",
            "force_boots",
            "seer_stone",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block the pull camps.",
          magic_stick:
            "Start with it if you expect high frequency of spells being used on the lane.",
          ring_of_basilius:
            "If your laning partner also uses a lot of mana early.",
          infused_raindrop: "Against magical burst.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      arcane_boots: "A core item for mana sustain.",
      blink: "A core item that allows you to land a multi-hero Black Hole.",
      black_king_bar: "A core item that allows you to channel Black Hole.",
      aghanims_shard:
        "A core item that provides extra control during Black Hole.",
      sphere:
        "Against targetable spell-immunity piercing disables that prevent you from channeling Black Hole.",
      aeon_disk:
        "Gives you a second chance to survive and get your Black Hole off.",
    },
  },

  "Faceless Void": {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803904,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562159",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "faceless_void_time_walk", // 1
          "faceless_void_time_lock", // 2
          "faceless_void_time_lock", // 3
          "faceless_void_time_dilation", // 4
          "faceless_void_time_lock", // 5
          "faceless_void_chronosphere", // 6
          "faceless_void_time_lock", // 7
          "faceless_void_time_walk", // 8
          "faceless_void_time_walk", // 9
          "faceless_void_time_walk", // 10
          "special_bonus_unique_faceless_void_7", // 11
          "faceless_void_chronosphere", // 12
          "faceless_void_time_dilation", // 13
          "faceless_void_time_dilation", // 14
          "special_bonus_unique_faceless_void_5", // 15
          "faceless_void_time_dilation", // 16
          "special_bonus_attributes", // 17
          "faceless_void_chronosphere", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_faceless_void", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_faceless_void_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "wraith_band"],
          mid_game: [
            "mask_of_madness",
            "maelstrom",
            "sange_and_yasha",
            "manta",
          ],
          late_game: ["mjollnir", "skadi", "satanic", "refresher"],
          situational: [
            "infused_raindrop",
            "hand_of_midas",
            "black_king_bar",
            "aghanims_shard",
            "blink",
            "sphere",
            "monkey_king_bar",
          ],
          core: ["power_treads", "mask_of_madness", "maelstrom"],
          neutral: [
            "possessed_mask",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "mind_breaker",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      faceless_void_time_walk:
        "The tougher the lane the more point you can put into this spell.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core item that provides attack speed boost and some mana savings through toggling. Keep it on strength if you feel like you might be in trouble.",
      hand_of_midas: "If you can get it early and get away with it.",
      mask_of_madness:
        "A core item that accelerates your farm but also allows you to burst a hero inside Chronosphere.",
      maelstrom:
        "A core item that boosts your farming speed but also does some AoE damage in the fights. Can be upgraded to Mjollnir later on. Void likes attack speed for frequent bash procs.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard:
        "For extra mobility. Often times you'll get it from Roshan.",
      blink:
        "To be able to seize the moment and get good Chronosphere out. Swift Blink is an option later on as well.",
      sphere: "Against powerful single-target disables and debuffs.",
      monkey_king_bar: "Against evasion.",
    },
  },

  Grimstroke: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803941,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562245",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "grimstroke_dark_artistry", // 1   equals to 'stroke of faith'
          "grimstroke_spirit_walk", // 2   equals to 'ink swell'
          "grimstroke_spirit_walk", // 3
          "grimstroke_ink_creature", // 4   equals to 'phantom's embrace'
          "grimstroke_spirit_walk", // 5
          "grimstroke_dark_artistry", // 6
          "grimstroke_spirit_walk", // 7
          "grimstroke_dark_artistry", // 8
          "grimstroke_soul_chain", // 9
          "special_bonus_unique_grimstroke_7", // 10
          "grimstroke_dark_artistry", // 11
          "grimstroke_soul_chain", // 12
          "grimstroke_ink_creature", // 13
          "grimstroke_ink_creature", // 14
          "special_bonus_spell_amplify_15", // 15
          "grimstroke_ink_creature", // 16
          "special_bonus_attributes", // 17
          "grimstroke_soul_chain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_grimstroke_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_grimstroke_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "circlet",
            "sobi_mask",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "ring_of_basilius",
            "null_talisman",
          ],
          mid_game: [
            "aether_lens",
            "aghanims_shard",
            "blink",
            "glimmer_cape",
            "ghost",
            "force_staff",
          ],
          late_game: [
            "ultimate_scepter",
            "aeon_disk",
            "ethereal_blade",
            "octarine_core",
            "sheepstick",
          ],
          situational: ["infused_raindrop", "lotus_orb"],
          core: ["arcane_boots", "aether_lens", "aghanims_shard"],
          neutral: [],
        },
      },
    ],
    ability_tooltips: {
      grimstroke_soul_chain:
        "You can skill this spell earlier than suggested if you have a really good combo(Chain Frost, Doom). Otherwise, it is hard to make a great use of this ability.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item that helps with mana sustain. You can disassemble it and use the Energy Booster for Aether Lens. You can upgrade boots into Tranquil Boots afterwards.",
      aether_lens:
        "A core item that allows you to get spells off from further away.",
      aghanims_shard: "A core item that upgrades Ink Swell.",
      lotus_orb: "For reflect, dispel and armor.",
    },
  },

  Gyrocopter: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803950,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562334",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "gyrocopter_homing_missile", // 1
          "gyrocopter_flak_cannon", // 2
          "gyrocopter_flak_cannon", // 3
          "gyrocopter_rocket_barrage", // 4
          "gyrocopter_flak_cannon", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_flak_cannon", // 7
          "gyrocopter_rocket_barrage", // 8
          "gyrocopter_rocket_barrage", // 9
          "special_bonus_unique_gyrocopter_4", // 10
          "gyrocopter_rocket_barrage", // 11
          "gyrocopter_call_down", // 12
          "gyrocopter_homing_missile", // 13
          "gyrocopter_homing_missile", // 14
          "special_bonus_unique_gyrocopter_2", // 15
          "gyrocopter_homing_missile", // 16
          "special_bonus_attributes", // 17
          "gyrocopter_call_down", // 18
          "special_bonus_attributes", // 19
          "special_bonus_movement_speed_30", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_gyrocopter_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "magic_wand",
            "wraith_band",
            "falcon_blade",
          ],
          mid_game: [
            "lesser_crit",
            "ultimate_scepter",
            "dragon_lance",
            "sange_and_yasha",
          ],
          late_game: ["satanic", "greater_crit", "skadi", "butterfly"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "monkey_king_bar",
            "silver_edge",
            "mjollnir",
          ],
          core: ["power_treads", "lesser_crit", "ultimate_scepter", "satanic"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "paladin_sword",
            "mind_breaker",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "ex_machina",
          ],
        },
        ability_tooltips: {
          gyrocopter_rocket_barrage:
            "You can optionally skill +2 attributes over this spell.",
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with attack speed and mana savings through toggling.",
          dragon_lance:
            "Can be disasembled for Ogre Axe that can be used for next item.",
          lesser_crit:
            "A core item that speeds up your farm. Goes well Aghanim`s Scepter side-gunner.",
          ultimate_scepter:
            "A core item that significantly increases your dps. The side-gunner can also fire while you are disabled and all attack modifiers apply as well.",
          black_king_bar:
            "Against a lot of disables, magical damage and as a dispel.",
          satanic:
            "A core item that provides you with sustain and dispel. Works well with Aghanim`s Scepter.",
          silver_edge: "For break effect and to reposition.",
          monkey_king_bar: "Against evasion.",
          mjollnir: "Great against illusion based heroes.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803950,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562334",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "gyrocopter_homing_missile", // 1
          "gyrocopter_rocket_barrage", // 2
          "gyrocopter_rocket_barrage", // 3
          "gyrocopter_homing_missile", // 4
          "gyrocopter_rocket_barrage", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_rocket_barrage", // 7
          "gyrocopter_homing_missile", // 8
          "gyrocopter_homing_missile", // 9
          "special_bonus_hp_200", // 10
          "gyrocopter_flak_cannon", // 11
          "gyrocopter_call_down", // 12
          "gyrocopter_flak_cannon", // 13
          "gyrocopter_flak_cannon", // 14
          "special_bonus_unique_gyrocopter_6", // 15
          "gyrocopter_flak_cannon", // 16
          "special_bonus_attributes", // 17
          "gyrocopter_call_down", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_gyrocopter_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_gyrocopter_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "branches",
            "enchanted_mango",
            "faerie_fire",
            "sobi_mask",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "ring_of_basilius",
            "tranquil_boots",
            "arcane_boots",
            "medallion_of_courage",
            "urn_of_shadows",
          ],
          mid_game: [
            "veil_of_discord",
            "aghanims_shard",
            "solar_crest",
            "force_staff",
            "glimmer_cape",
            "ghost",
            "cyclone",
          ],
          late_game: ["ethereal_blade", "sheepstick", "refresher"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "ancient_janggo",
            "lotus_orb",
          ],
          core: ["veil_of_discord", "aghanims_shard"],
          neutral: [
            "pogo_stick",
            "mysterious_hat",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "spider_legs",
            "spy_gadget",
            "timeless_relic",
            "force_field",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          spirit_vessel: "Against heavy-healing lineups.",
          veil_of_discord:
            "A core item that amplifies your and your team`s spell damage output.",
          ancient_janggo:
            "If you are grouping a lot early on and if you have summon-based heroes.",
          aghanims_shard: "A core item that adds to your damage output.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
    },
  },

  Hoodwink: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803963,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562407",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "hoodwink_bushwhack", // 1
          "hoodwink_acorn_shot", // 2
          "hoodwink_bushwhack", // 3
          "hoodwink_scurry", // 4
          "hoodwink_bushwhack", // 5
          "hoodwink_sharpshooter", // 6
          "hoodwink_bushwhack", // 7
          "hoodwink_acorn_shot", // 8
          "hoodwink_acorn_shot", // 9
          "special_bonus_unique_hoodwink_bushwhack_cooldown", // 10
          "hoodwink_acorn_shot", // 11
          "hoodwink_sharpshooter", // 12
          "hoodwink_scurry", // 13
          "hoodwink_scurry", // 14
          "special_bonus_unique_hoodwink_acorn_shot_bounces", // 15
          "hoodwink_scurry", // 16
          "special_bonus_attributes", // 17
          "hoodwink_sharpshooter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_hoodwink_sharpshooter_speed", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_hoodwink_sharpshooter_pure_damage", // 25
        ],
        items: {
          starting: [
            "tango",
            "blight_stone",
            "flask",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "circlet",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "medallion_of_courage",
            "urn_of_shadows",
          ],
          mid_game: [
            "aether_lens",
            "solar_crest",
            "cyclone",
            "force_staff",
            "glimmer_cape",
            "veil_of_discord",
            "ghost",
          ],
          late_game: [
            "ultimate_scepter",
            "octarine_core",
            "sheepstick",
            "aeon_disk",
          ],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "aghanims_shard",
            "blink",
            "lotus_orb",
          ],
          core: ["arcane_boots", "aether_lens"],
          neutral: [
            "keen_optic",
            "trusty_shovel",
            "philosophers_stone",
            "grove_bow",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_hoodwink_acorn_shot_charges:
        "You can take this talent on level 25 over the suggested one if you are transitioning into a right-clicker, or the opponents don`t have spell-immune items or heroes(rarely).",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Starr with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item for mana sustain. Can be disassembled and the Energy Booster can be used for Aether Lens. Boots can upgraded to Tranquil boots afterwards.",
      spirit_vessel: "Against heavy-healing lineup.",
      aether_lens: "A core item that extends the cast range of your spells.",
      lotus_orb: "For reflect, dispel and armor.",
      blink: "To close the gap and land your combo.",
    },
  },

  Huskar: {
    builds: [
      {
        roles: [
          DOTA_COACH_GUIDE_ROLE.CARRY,
          DOTA_COACH_GUIDE_ROLE.MID,
          DOTA_COACH_GUIDE_ROLE.OFFLANE,
        ],
        steam_guide_id: 1640803974,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562484",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "huskar_burning_spear", // 1
          "huskar_berserkers_blood", // 2
          "huskar_burning_spear", // 3
          "huskar_inner_fire", // 4
          "huskar_berserkers_blood", // 5
          "huskar_life_break", // 6
          "huskar_berserkers_blood", // 7
          "huskar_berserkers_blood", // 8
          "huskar_burning_spear", // 9
          "huskar_burning_spear", // 10
          "huskar_inner_fire", // 11
          "huskar_life_break", // 12
          "huskar_inner_fire", // 13
          "huskar_inner_fire", // 14
          "special_bonus_unique_huskar_3", // 15
          "special_bonus_unique_huskar_2", // 16
          "special_bonus_attributes", // 17
          "huskar_life_break", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_huskar_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_huskar_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "faerie_fire",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["armlet", "boots", "bracer", "magic_wand"],
          mid_game: ["sange", "ultimate_scepter", "dragon_lance"],
          late_game: ["assault", "satanic", "heart"],
          situational: [
            "black_king_bar",
            "heavens_halberd",
            "aghanims_shard",
            "blink",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: ["armlet", "sange", "ultimate_scepter"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "misericorde",
            "paladin_sword",
            "titan_sliver",
            "the_leveller",
            "trickster_cloak",
            "giants_ring",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      huskar_inner_fire:
        "You can skill this ability on level 1 if you are playing midlane Huskar to secure a creep lasthit on the first wave.",
      special_bonus_unique_huskar_3:
        "On level 15, you should take level 15 talent first and then this level 10 talent. The dota client disallows me to indicate this order in the graphics above.",
    },
    item_tooltips: {
      ward_observer:
        "If you are playing mid Huskar but it is not bad to have vision around your sidelanes as well :) ",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      armlet:
        "A core item that allows you to activate Berserker`s Blood while farming, doing Roshan or in fights. Helm of Iron Will should be the first component purchased you get most of the time as it solves your hp sustain problems.",
      sange:
        "A core item that is standalone good but can be upgraded further. Amplifies the healing and tanks you up.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter:
        "A core item that provides you with extra reach and a 3s disable upon Life Break landing.",
      aghanims_shard:
        "You will usually get this upgrade from second Roshan. It adds an additional layer of survivability and damage mitigation to your hero.",
      blink:
        "Allows you to instantly gap close and focus-fire an enemy hero. Can be upgraded to Overwhelming Blink down the road.",
      monkey_king_bar: "Against evasion and miss chance.",
      silver_edge: "For break and repositioning.",
    },
  },

  Invoker: {
    builds: [
      {
        // Midlane Quas Wex Invoker build | If an app user choses to play Invoker on non-mid role, this guide should be suggested over the other one
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QW",
        steam_guide_id: 1640803984,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562552",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "invoker_wex", // 1
          "invoker_quas", // 2
          "invoker_quas", // 3
          "invoker_wex", // 4
          "invoker_wex", // 5
          "invoker_quas", // 6
          "invoker_wex", // 7
          "invoker_quas", // 8
          "invoker_wex", // 9
          "invoker_exort", // 10
          "invoker_exort", // 11
          "invoker_exort", // 12
          "invoker_exort", // 13
          "invoker_exort", // 14
          "invoker_exort", // 15
          "invoker_exort", // 16
          "invoker_wex", // 17
          "invoker_wex", // 18
          "invoker_quas", // 19
          "special_bonus_unique_invoker_6", // 20
          "special_bonus_unique_invoker_9", // 21
          "special_bonus_unique_invoker_5", // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "mantle",
            "faerie_fire",
            "circlet",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "null_talisman",
            "urn_of_shadows",
            "boots",
            "hand_of_midas",
            "magic_wand",
          ],
          mid_game: [
            "travel_boots",
            "ultimate_scepter",
            "witch_blade",
            "orchid",
            "force_staff",
          ],
          late_game: ["sheepstick", "refresher", "octarine_core"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "black_king_bar",
            "blink",
            "aghanims_shard",
            "sphere",
            "aeon_disk",
          ],
          core: [
            "urn_of_shadows",
            "hand_of_midas",
            "travel_boots",
            "ultimate_scepter",
          ],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "grove_bow",
            "quicksilver_amulet",
            "quickening_charm",
            "mind_breaker",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "desolator_2",
          ],
        },
        item_tooltips: {
          urn_of_shadows: "A core item to proc Cold Snap ticks.",
          witch_blade: "An alternative way to proc Cold Snap ticks.",
          spirit_vessel: "Against heavy healing lineup.",
          blink: "To close the gap and land your spell combo.",
        },
      },
      {
        // Midlane Quas Exort Invoker build
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QE",
        steam_guide_id: 1641614689,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2711948373",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "invoker_exort", // 1
          "invoker_quas", // 2
          "invoker_exort", // 3
          "invoker_quas", // 4
          "invoker_exort", // 5
          "invoker_quas", // 6
          "invoker_exort", // 7
          "invoker_wex", // 8
          "invoker_exort", // 9
          "invoker_quas", // 10
          "invoker_exort", // 11
          "invoker_wex", // 12
          "invoker_exort", // 13
          "invoker_wex", // 14
          "invoker_wex", // 15
          "invoker_wex", // 16
          "invoker_wex", // 17
          "invoker_wex", // 18
          "invoker_quas", // 19
          "special_bonus_unique_invoker_6", // 20
          "special_bonus_unique_invoker_9", // 21
          "special_bonus_unique_invoker_5", // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "mantle",
            "faerie_fire",
            "circlet",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["hand_of_midas", "boots", "null_talisman", "magic_wand"],
          mid_game: ["travel_boots", "ultimate_scepter", "blink"],
          late_game: ["sheepstick", "refresher", "octarine_core"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "aghanims_shard",
            "sphere",
            "aeon_disk",
          ],
          core: ["hand_of_midas", "travel_boots", "ultimate_scepter", "blink"],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "grove_bow",
            "quicksilver_amulet",
            "quickening_charm",
            "mind_breaker",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "desolator_2",
          ],
        },
        item_tooltips: {
          blink:
            "A core item that allows you to close the gap and land your spell combo.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_invoker_10:
        "On level 20, take the level 20 talent over this one. The dota 2 client disallows me to indicate that in graphics above. The other Tornado talent can be better than Alacrity one, if you need more control or dispel.",
      special_bonus_unique_invoker_9:
        "You can take the Forged Spirit talent if you need to splitpush and extend the game.",
      special_bonus_unique_invoker_6:
        "This talent should be taken at level 22.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      hand_of_midas: "A core item that allows you to scale.",
      travel_boots: "A core item that allows you to cover the map with ease.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      ultimate_scepter:
        "A core item that provides spell-immunity piercring pure damage burst.",
      aghanims_shard: "For extra AoE damage.",
      sphere: "Against powerful single-target disables and debuffs.",
      aeon_disk:
        "Grants you a second chance to survive and get your spells and items off.",
    },
  },
  /*
	"Io": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640803993,
				abilities: [
					"wisp_tether",	// 1
					"wisp_overcharge",	// 2
					"wisp_overcharge",	// 3
					"wisp_tether",	// 4
					"wisp_overcharge",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","faerie_fire","headdress","branches","ring_of_regen","bracer","ward_observer","ward_sentry","magic_stick"],
					early_game:	["magic_wand","soul_ring","bottle","urn_of_shadows","ring_of_basilius"],
					mid_game:	["mekansm","holy_locket","glimmer_cape","ghost","hood_of_defiance","solar_crest"],
					late_game:	["aeon_disk","heart"],
					situational:	["infused_raindrop","pipe","lotus_orb","aghanims_shard"],
					core:	["mekansm"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner also uses a lot of mana early.",
			"infused_raindrop":	"Against magical burst.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"aghanims_shard":	"For extra control."
		}
	},
	"Jakiro": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804005,
				abilities: [
					"jakiro_dual_breath",	// 1
					"jakiro_liquid_fire",	// 2
					"jakiro_dual_breath",	// 3
					"jakiro_ice_path",	// 4
					"jakiro_dual_breath",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","enchanted_mango","flask","faerie_fire","clarity","sobi_mask","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","magic_wand","ring_of_basilius","arcane_boots","wind_lace"],
					mid_game:	["cyclone","force_staff","ghost","aghanims_shard","veil_of_discord","glimmer_cape","aether_lens","mekansm"],
					late_game:	["aeon_disk","blink","ultimate_scepter","octarine_core"],
					situational:	["infused_raindrop","lotus_orb"],
					core:	["aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner also uses a lot of mana early.",
			"infused_raindrop":	"Against magical burst.",
			"lotus_orb":	"For reflect, dispel and armor."
		}
	},*/
  Juggernaut: {
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804017,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957943",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "juggernaut_blade_fury",
          "juggernaut_blade_dance",
          "juggernaut_blade_fury",
          "juggernaut_healing_ward",
          "juggernaut_blade_fury",
          "juggernaut_omni_slash",
          "juggernaut_blade_fury",
          "juggernaut_blade_dance",
          "juggernaut_blade_dance",
          "juggernaut_blade_dance",
          "special_bonus_unique_juggernaut",
          "juggernaut_omni_slash",
          "juggernaut_healing_ward",
          "juggernaut_healing_ward",
          "special_bonus_attack_speed_20",
          "juggernaut_healing_ward",
          "special_bonus_attributes",
          "juggernaut_omni_slash",
          "special_bonus_attributes",
          "special_bonus_unique_juggernaut_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_juggernaut_2",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "slippers",
            "branches",
            "circlet",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "power_treads",
            "wraith_band",
            "magic_wand",
          ],
          mid_game: [
            "maelstrom",
            "manta",
            "aghanims_shard",
            "basher",
            "bfury",
            "sange_and_yasha",
          ],
          late_game: [
            "skadi",
            "mjollnir",
            "butterfly",
            "satanic",
            "abyssal_blade",
          ],
          situational: [
            "infused_raindrop",
            "diffusal_blade",
            "ultimate_scepter",
            "blink",
            "monkey_king_bar",
            "nullifier",
          ],
          core: [],
          neutral: [
            "possessed_mask",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      juggernaut_healing_ward:
        "You can skill Healing Ward at level two if you are being pressured.",
      juggernaut_blade_dance:
        "Some players prefer taking stats over leveling Blade Dance past level one. It slows your farm a bit but makes you tankier.",
      special_bonus_unique_juggernaut:
        "This talent, along with level twenty Blade Fury talent and Aghanim`s Shard, allows you to dish out tons of damage while Blade Furying.",
      special_bonus_attack_speed_20:
        "This is definitely a talent to increase the DPS output. If you are playing against Tinker, Zeus and such heroes that damage you heavily from afar but can't destroy your Healing Ward as easily, taking healing ward cooldown talent might be better.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "If you are planning on going for Battle Fury as farming items, Power Treads are good fit for it.",
      maelstrom:
        "A prefered farming item. Great against illusion based heroes. The Mjollnir upgrade is fantastic increase of Omnislash damage output.",
      bfury:
        "An alternative to Maelstrom, good against NP`s Sprout and summon based heroes.",
      manta:
        "A core item that allows you to farm even faster, provides a defensive dispel and moderate damage increase.",
      sange_and_yasha:
        "An alternative to Manta Style when you are facing bunch of long lasting disables or debuffs.",
      diffusal_blade:
        "Goes well with Manta Style against heroes like Medusa low mana pool heroes.",
      aghanims_shard:
        "Against lineups heavy on magic damage and disables. You will dish out a lot of damage during Blade Fury if you pick up talents for it as well.",
      ultimate_scepter:
        "For gap closing and if you can`t manfight the opponents and thus you need to play more around you Omnislash, Aghanim`s Scepter and upgraded Blade Fury by Aghanim`s Shard.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion.",
      nullifier: "To dispel defensive spells and items that counter Omnislash.",
    },
  },
  /*	"Keeper of the Light": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804026,
				abilities: [
					"keeper_of_the_light_illuminate",	// 1  "keeper_of_the_light_radiant_bind" equals to 'solar bind'
					"keeper_of_the_light_chakra_magic",	// 2
					"keeper_of_the_light_illuminate",	// 3
					"keeper_of_the_light_chakra_magic",	// 4
					"keeper_of_the_light_illuminate",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","wind_lace","faerie_fire","boots","branches","clarity","enchanted_mango","ward_observer","ward_sentry","magic_stick"],
					early_game:	["tranquil_boots","magic_wand","ring_of_basilius","urn_of_shadows"],
					mid_game:	["glimmer_cape","force_staff","ghost","solar_crest","holy_locket","mekansm","veil_of_discord"],
					late_game:	["ultimate_scepter","aeon_disk","sheepstick"],
					situational:	["infused_raindrop","spirit_vessel","lotus_orb","aghanims_shard","blink"],
					core:	["tranquil_boots","ultimate_scepter"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner also uses a lot of mana early.",
			"holy_locket":	"Goes well with Mekansm.",
			"mekansm":	"Goes well with Holy Locket.",
			"infused_raindrop":	"Against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"aghanims_shard":	"For extra mobility of your heroes.",
			"blink":	"Helps with splitpush and lining up your spells."
		}
	},

	/*
	"Kunkka": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804039,
				abilities: [
					"kunkka_tidebringer",	// 1
					"kunkka_torrent",	// 2
					"kunkka_tidebringer",	// 3
					"kunkka_x_marks_the_spot",	// 4
					"kunkka_tidebringer",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","gauntlets","branches","circlet","faerie_fire","bracer","ring_of_protection","ward_observer","magic_stick"],
					early_game:	["bottle","phase_boots","bracer","magic_wand","urn_of_shadows"],
					mid_game:	["armlet","hood_of_defiance","solar_crest","sange","sange_and_yasha","lesser_crit","ultimate_scepter","echo_sabre","orchid"],
					late_game:	["assault","greater_crit","sheepstick"],
					situational:	["spirit_vessel","heavens_halberd","pipe","black_king_bar","blink","aghanims_shard"],
					core:	["phase_boots"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"If you are playing midlane Kunkka.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"If you are playing midlane Kunkka.",
			"urn_of_shadows":	"If you are planning for Spirit Vessel.",
			"armlet":	"For right-click build.",
			"hood_of_defiance":	"For utility build.",
			"solar_crest":	"For utility build.",
			"sange_and_yasha":	"For right-click build.",
			"lesser_crit":	"For right-click build.",
			"ultimate_scepter":	"For utility build.",
			"echo_sabre":	"Can be disassembled. For right-click build.",
			"orchid":	"For right-click build.",
			"assault":	"For right-click build.",
			"greater_crit":	"For right-click build.",
			"sheepstick":	"For utility build.",
			"spirit_vessel":	"Against heavy healing lineup. For utility build.",
			"heavens_halberd":	"Especially good against ranged right-clickers. For utility build.",
			"pipe":	"For utility build.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"blink":	"Combines well with X Marking yourself to do Tidebringer hits. For right-click build.",
			"aghanims_shard":	"To reposition enemies. For utility build."
		}
	},
	"Legion Commander": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1606573292,
				abilities: [
					"legion_commander_overwhelming_odds",	// 1
					"legion_commander_moment_of_courage",	// 2
					"legion_commander_overwhelming_odds",	// 3
					"legion_commander_press_the_attack",	// 4
					"legion_commander_overwhelming_odds",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","quelling_blade","gauntlets","branches","ring_of_protection","faerie_fire","enchanted_mango","circlet","bracer","magic_stick"],
					early_game:	["phase_boots","magic_wand","bracer","soul_ring","orb_of_corrosion"],
					mid_game:	["blink","armlet","blade_mail","hood_of_defiance","sange","solar_crest"],
					late_game:	["assault","invis_sword","overwhelming_blink","swift_blink","ultimate_scepter","moon_shard"],
					situational:	["pipe","black_king_bar","heavens_halberd","aghanims_shard","monkey_king_bar"],
					core:	["phase_boots","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"armlet":	"Usually better than Blade Mail.",
			"blade_mail":	"Good against high dps right-clickers.",
			"overwhelming_blink":	"To tank up and for AoE damage.",
			"swift_blink":	"For single target burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"heavens_halberd":	"Especially good against ranged right-clickers and to pop Linken's Sphere.",
			"aghanims_shard":	"For hard dispel.",
			"monkey_king_bar":	"Against evasion."
		}
	},
	"Leshrac": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804061,
				abilities: [
					"leshrac_split_earth",	// 1
					"leshrac_lightning_storm",	// 2
					"leshrac_split_earth",	// 3
					"leshrac_lightning_storm",	// 4
					"leshrac_diabolic_edict",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","branches","mantle","flask","boots","ward_observer","ward_sentry","magic_stick"],
					early_game:	["bottle","null_talisman","boots","magic_wand","travel_boots","arcane_boots","bracer","urn_of_shadows"],
					mid_game:	["cyclone","kaya","kaya_and_sange","bloodstone","black_king_bar","ghost","hood_of_defiance","eternal_shroud","mekansm","guardian_greaves","aether_lens","glimmer_cape","force_staff"],
					late_game:	["shivas_guard","aeon_disk","sheepstick","wind_waker"],
					situational:	["infused_raindrop","aghanims_shard","lotus_orb","blink"],
					core:	["travel_boots","arcane_boots","cyclone","kaya"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"boots":	"If you are playing support Leshrac.",
			"ward_sentry":	"To block or unblock the pull camp if you are playing support Leshrac.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"If you are playing midlane Leshrac.",
			"travel_boots":	"If you are playing mid Leshrac.",
			"arcane_boots":	"For offlane or support. Can be disassembled.",
			"black_king_bar":	"To be able to stay in the middle of the fight.",
			"mekansm":	"If you are playing offlane or support Leshrac.",
			"guardian_greaves":	"If you are playing offlane or support Leshrac.",
			"aether_lens":	"If you are playing support Leshrac.",
			"glimmer_cape":	"If you are playing support Leshrac.",
			"force_staff":	"If you are playing support Leshrac.",
			"infused_raindrop":	"Against magical burst.",
			"aghanims_shard":	"For extra control.",
			"lotus_orb":	"For reflect, dispel and armor. If you are playing offlane or support Leshrac.",
			"blink":	"To jump in the middle of the fight."
		}
	},
	"Lich": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804073,
				abilities: [
					"lich_frost_nova",	// 1
					"lich_frost_shield",	// 2
					"lich_frost_nova",	// 3
					"lich_sinister_gaze",	// 4
					"lich_frost_shield",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","enchanted_mango","clarity","branches","faerie_fire","sobi_mask","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","magic_wand","ring_of_basilius","arcane_boots","urn_of_shadows"],
					mid_game:	["glimmer_cape","force_staff","ghost","aether_lens","solar_crest"],
					late_game:	["aeon_disk","octarine_core"],
					situational:	["infused_raindrop","lotus_orb","aghanims_shard","blink"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner also uses a lot of mana early.",
			"infused_raindrop":	"Against magical burst.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"aghanims_shard":	"For extra control and potential to burst a secluded enemy hero with Chain Frost.",
			"blink":	"Goes well with Aghanim's Shard to burst a single hero. Good at canceling channeling spells."
		}
	},
	"Lifestealer": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804081,
				abilities: [
					"life_stealer_feast",	// 1
					"life_stealer_ghoul_frenzy",	// 2
					"life_stealer_feast",	// 3
					"life_stealer_rage",	// 4
					"life_stealer_feast",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","circlet","gauntlets","branches","faerie_fire","orb_of_venom","magic_stick"],
					early_game:	["phase_boots","armlet","magic_wand","bracer","orb_of_corrosion"],
					mid_game:	["sange","sange_and_yasha","basher","maelstrom","desolator"],
					late_game:	["assault","satanic","abyssal_blade","greater_crit","mjollnir"],
					situational:	["heavens_halberd","monkey_king_bar","nullifier","black_king_bar","blink"],
					core:	["phase_boots","armlet"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive spells and items.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"blink":	"To close the gap."
		}
	},
	"Lina": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804097,
				abilities: [
					"lina_light_strike_array",	// 1
					"lina_fiery_soul",	// 2
					"lina_dragon_slave",	// 3
					"lina_dragon_slave",	// 4
					"lina_dragon_slave",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","mantle","branches","enchanted_mango","flask","ward_observer","ward_sentry","magic_stick","blight_stone"],
					early_game:	["bottle","null_talisman","boots","travel_boots","arcane_boots","magic_wand","ring_of_basilius"],
					mid_game:	["cyclone","aether_lens","lesser_crit","force_staff","hurricane_pike","invis_sword"],
					late_game:	["ultimate_scepter","greater_crit","satanic","sheepstick","skadi","aeon_disk","assault","octarine_core"],
					situational:	["infused_raindrop","black_king_bar","monkey_king_bar","blink","sphere","aghanims_shard"],
					core:	["travel_boots","arcane_boots","cyclone","aether_lens"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"If you are playing support Lina to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"blight_stone":	"If you are playing support Lina.",
			"bottle":	"If you are playing midlane Lina.",
			"travel_boots":	"If you are playing midlane Lina.",
			"arcane_boots":	"If you are playing support Lina.",
			"ring_of_basilius":	"If you are playing support Lina and your laning partner uses a lot of mana early.",
			"aether_lens":	"If you are playing support Lina.",
			"lesser_crit":	"If you are playing midlane Lina.",
			"hurricane_pike":	"If you are playing midlane Lina.",
			"invis_sword":	"If you are playing midlane Lina.",
			"ultimate_scepter":	"If you are playing support Lina.",
			"greater_crit":	"If you are playing midlane Lina.",
			"satanic":	"If you are playing midlane Lina.",
			"skadi":	"If you are playing midlane Lina.",
			"assault":	"If you are playing midlane Lina.",
			"octarine_core":	"If you are playing support Lina.",
			"infused_raindrop":	"Against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"monkey_king_bar":	"If you are playing midlane Lina against evasion.",
			"blink":	"To be able to reposition quickly.",
			"sphere":	"If you are playing midlane Lina against powerful single target disables or nukes.",
			"aghanims_shard":	"If you are playing support Lina for extra AoE damage. Goes well with Aghanim's Scepter."
		}
	},
	"Lion": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804104,
				abilities: [
					"lion_impale",	// 1
					"lion_mana_drain",	// 2
					"lion_impale",	// 3
					"lion_voodoo",	// 4
					"lion_impale",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","boots","faerie_fire","branches","wind_lace","enchanted_mango","ward_observer","ward_sentry","magic_stick"],
					early_game:	["tranquil_boots","magic_wand","wind_lace"],
					mid_game:	["blink","aether_lens","force_staff","ghost","glimmer_cape"],
					late_game:	["aeon_disk","ultimate_scepter","octarine_core"],
					situational:	["infused_raindrop","aghanims_shard","lotus_orb"],
					core:	["tranquil_boots","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"Against magical burst.",
			"aghanims_shard":	"Especially good against low mana pool heroes and illusions.",
			"lotus_orb":	"For reflect, dispel and armor."
		}
	},
	"Lone Druid": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804115,
				abilities: [
					"lone_druid_spirit_bear",	// 1
					"lone_druid_spirit_link",	// 2
					"lone_druid_spirit_link",	// 3
					"lone_druid_spirit_bear",	// 4
					"lone_druid_spirit_link",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","branches","ward_observer","quelling_blade","orb_of_venom","magic_stick"],
					early_game:	["boots","phase_boots","orb_of_corrosion","tranquil_boots"],
					mid_game:	["mask_of_madness","maelstrom","desolator","basher","solar_crest"],
					late_game:	["mjollnir","assault","moon_shard","abyssal_blade","aeon_disk","refresher","vladmir"],
					situational:	["infused_raindrop","ultimate_scepter","black_king_bar","aghanims_shard"],
					core:	["phase_boots","mask_of_madness","basher"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"quelling_blade":	"On pet.",
			"orb_of_venom":	"On pet.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"phase_boots":	"On pet.",
			"orb_of_corrosion":	"On pet.",
			"tranquil_boots":	"On hero.",
			"mask_of_madness":	"On pet.",
			"maelstrom":	"On pet.",
			"desolator":	"On pet.",
			"basher":	"On pet.",
			"solar_crest":	"On hero to buff pet.",
			"mjollnir":	"On pet.",
			"assault":	"On pet.",
			"moon_shard":	"On pet.",
			"abyssal_blade":	"On pet.",
			"aeon_disk":	"On hero.",
			"refresher":	"On hero.",
			"vladmir":	"On hero to buff pet.",
			"infused_raindrop":	"On hero against magical burst.",
			"ultimate_scepter":	"Amazing for splitpushing and ratting.",
			"black_king_bar":	"On bear against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard":	"To buff allies and dispel."
		}
	},
	"Luna": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804126,
				abilities: [
					"luna_lunar_blessing",	// 1   "luna_moon_glaive" equals to 'moon glaives'
					"luna_lucent_beam",	// 2
					"luna_lunar_blessing",	// 3
					"luna_lucent_beam",	// 4
					"luna_lunar_blessing",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","slippers","faerie_fire","circlet","magic_stick"],
					early_game:	["power_treads","magic_wand","wraith_band","mask_of_madness"],
					mid_game:	["dragon_lance","yasha","manta","sange_and_yasha","aghanims_shard","lesser_crit"],
					late_game:	["satanic","butterfly","skadi","greater_crit"],
					situational:	["infused_raindrop","black_king_bar","hurricane_pike","monkey_king_bar","ultimate_scepter"],
					core:	["power_treads","mask_of_madness","dragon_lance","yasha","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"dragon_lance":	"Can be disassembled.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"hurricane_pike":	"To disengage from heroes like Slark and Troll.",
			"monkey_king_bar":	"Against evasion.",
			"ultimate_scepter":	"Great at bursting backliners."
		}
	},
	"Lycan": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804136,
				abilities: [
					"lycan_summon_wolves",	// 1
					"lycan_feral_impulse",	// 2
					"lycan_summon_wolves",	// 3
					"lycan_feral_impulse",	// 4
					"lycan_summon_wolves",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","ring_of_protection","flask","crown","sobi_mask","enchanted_mango","magic_stick"],
					early_game:	["armlet","boots","power_treads","helm_of_the_dominator","ring_of_basilius","soul_ring","bracer"],
					mid_game:	["echo_sabre","desolator","basher","ultimate_scepter","vladmir"],
					late_game:	["satanic","assault","abyssal_blade","moon_shard","sheepstick"],
					situational:	["hand_of_midas","heavens_halberd","black_king_bar","abyssal_blade","monkey_king_bar","nullifier","blink"],
					core:	["armlet","power_treads","helm_of_the_dominator","echo_sabre"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"crown":	"For offlane Lycan to rush Helm of Dominator.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"armlet":	"If you are playing carry Lycan.",
			"boots":	"If you are playing offlane Lycan you can stay on brown boots.",
			"helm_of_the_dominator":	"If you are playing offlane Lycan.",
			"ring_of_basilius":	"If you are playing offlane Lycan.",
			"soul_ring":	"If you are playing offlane Lycan.",
			"echo_sabre":	"If you are playing carry Lycan. Can be disassembled.",
			"desolator":	"If you are playing carry Lycan.",
			"basher":	"If you are playing carry Lycan.",
			"ultimate_scepter":	"If you are playing offlane Lycan.",
			"vladmir":	"If you are playing offlane Lycan.",
			"satanic":	"If you are playing carry Lycan.",
			"abyssal_blade":	"If you are playing carry Lycan.",
			"moon_shard":	"If you are playing carry Lycan.",
			"sheepstick":	"If you are playing offlane Lycan.",
			"hand_of_midas":	"If you are playing carry Lycan and you can get it early.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"monkey_king_bar":	"If you are playing carry Lycan against evasion.",
			"nullifier":	"If you are playing carry Lycan to dispel defensive spells and items.",
			"blink":	"If you are playing carry Lycan to gap close."
		}
	},
	"Magnus": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804148,
				abilities: [
					"magnataur_shockwave",	// 1
					"magnataur_skewer",	// 2
					"magnataur_empower",	// 3
					"magnataur_empower",	// 4
					"magnataur_empower",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","gauntlets","flask","faerie_fire","enchanted_mango","ring_of_protection","circlet","bracer","ward_observer","magic_stick"],
					early_game:	["boots","power_treads","arcane_boots","bottle","magic_wand","bracer","soul_ring","mask_of_madness"],
					mid_game:	["blink","echo_sabre","lesser_crit","orchid","basher","force_staff","aether_lens","ghost","mekansm","guardian_greaves"],
					late_game:	["assault","satanic","refresher","greater_crit","bloodthorn","abyssal_blade","swift_blink","overwhelming_blink","octarine_core"],
					situational:	["blink","black_king_bar","aghanims_shard","invis_sword","lotus_orb","monkey_king_bar"],
					core:	["power_treads","arcane_boots","blink","echo_sabre"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"If you are playing midlane Magnus.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"power_treads":	"If you are playing right-clicking Magnus.",
			"arcane_boots":	"If you are playing utility Magnus.",
			"bottle":	"If you are playing midlane Magnus.",
			"mask_of_madness":	"If you are playing right-clicking Magnus.",
			"echo_sabre":	"If you are playing right-clicking Magnus.",
			"lesser_crit":	"If you are playing right-clicking Magnus.",
			"orchid":	"If you are playing right-clicking Magnus.",
			"basher":	"If you are playing right-clicking Magnus.",
			"force_staff":	"If you are playing utility Magnus.",
			"aether_lens":	"If you are playing utility Magnus.",
			"ghost":	"If you are playing utility Magnus.",
			"mekansm":	"If you are playing utility Magnus.",
			"guardian_greaves":	"If you are playing utility Magnus.",
			"assault":	"If you are playing right-clicking Magnus.",
			"satanic":	"If you are playing right-clicking Magnus.",
			"refresher":	"If you are playing utility Magnus.",
			"greater_crit":	"If you are playing right-clicking Magnus.",
			"bloodthorn":	"If you are playing right-clicking Magnus.",
			"abyssal_blade":	"If you are playing right-clicking Magnus.",
			"swift_blink":	"If you are playing right-clicking Magnus for single target burst.",
			"overwhelming_blink":	"If you are playing right-clicking Magnus for extra AoE damage and to tank up.",
			"octarine_core":	"If you are playing utility Magnus.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard":	"If you are playing utility Magnus for extra control and to set up Skewer.",
			"invis_sword":	"If you are playing utility Magnus to get Reverse Polarity off easier.",
			"lotus_orb":	"If you are playing utility Magnus for reflect, dispel and armor.",
			"monkey_king_bar":	"If you are playing right-clicking Magnus against evasion."
		}
	},
	"Marci": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804165,
				abilities: [
					"marci_companion_run",	// 1	equals to rebound
					"marci_grapple",		// 2	equals to dispose
					"marci_companion_run",	// 3
					"marci_grapple",		// 4
					"marci_companion_run",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","gauntlets","faerie_fire","flask","ward_observer","ward_sentry","magic_stick","orb_of_venom"],
					early_game:	["boots","phase_boots","arcane_boots","bottle","magic_wand","soul_ring","orb_of_corrosion","medallion_of_courage","power_treads","bracer"],
					mid_game:	["armlet","basher","blink","lesser_crit","solar_crest","bfury","sange_and_yasha"],
					late_game:	["greater_crit","satanic","skadi","overwhelming_blink"],
					situational:	["black_king_bar","monkey_king_bar","heavens_halberd","nullifier","silver_edge"],
					core:	["phase_boots","armlet","basher","blink","solar_crest"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"quelling_blade":	"For core Marci.",
			"ward_sentry":	"If you are playing support Marci to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_venom":	"If you can pressure on the lane.",
			"arcane_boots":	"If you are playing support utility Marci.",
			"bottle":	"If you are playing midlane Marci.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"medallion_of_courage":	"For support utility Marci.",
			"power_treads":	"For carry Marci usually paired with Battle Fury.",
			"armlet":	"For core Marci.",
			"basher":	"For core Marci.",
			"blink":	"For instant gap close to deliver damage with Unleash or disable with Dispose.",
			"lesser_crit":	"For core Marci.",
			"solar_crest":	"For support utility Marci.",
			"bfury":	"For carry Marci.",
			"sange_and_yasha":	"For carry Marci.",
			"greater_crit":	"For core Marci.",
			"satanic":	"For core Marci.",
			"overwhelming_blink":	"For core Marci.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"monkey_king_bar":	"Against evasion for core Marci.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"nullifier":	"To dispel defensive spells and items for core Marci.",
			"silver_edge":	"For core Marci for break effect and to close the gap."
		}
	},
	"Mars": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804174,
				abilities: [
					"mars_gods_rebuke",	// 1
					"mars_spear",	// 2
					"mars_spear",	// 3
					"mars_gods_rebuke",	// 4
					"mars_spear",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","gauntlets","faerie_fire","ring_of_protection","flask","enchanted_mango","circlet","bracer","magic_stick"],
					early_game:	["soul_ring","phase_boots","magic_wand","bracer","bottle","orb_of_corrosion"],
					mid_game:	["blink","desolator","cyclone","hood_of_defiance","solar_crest","vladmir"],
					late_game:	["assault","satanic","overwhelming_blink","shivas_guard"],
					situational:	["heavens_halberd","black_king_bar","aghanims_shard","lotus_orb"],
					core:	["phase_boots","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"To sustain yourself if your midlaner isn't buying it.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard":	"Against illusion or clone based heroes.",
			"lotus_orb":	"If you are playing utility Magnus for reflect, dispel and armor."
		}
	},
	"Medusa": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804184,
				abilities: [
					"medusa_mystic_snake",	// 1
					"medusa_mana_shield",	// 2
					"medusa_mystic_snake",	// 3
					"medusa_split_shot",	// 4
					"medusa_mystic_snake",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","slippers","branches","faerie_fire","circlet","magic_stick"],
					early_game:	["power_treads","magic_wand","wraith_band","mask_of_madness"],
					mid_game:	["yasha","dragon_lance","manta","sange_and_yasha","ultimate_scepter","lesser_crit"],
					late_game:	["skadi","greater_crit","butterfly","satanic"],
					situational:	["infused_raindrop","black_king_bar","aghanims_shard","hurricane_pike","monkey_king_bar","swift_blink"],
					core:	["power_treads","yasha","dragon_lance","skadi"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"dragon_lance":	"Can be disassembled.",
			"ultimate_scepter":	"Goes well with Aghanim's Shard.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard":	"Goes well with Aghanim's Scepter and Mysic Snake talents.",
			"hurricane_pike":	"To disengage from heroes like Slark and Troll.",
			"monkey_king_bar":	"Against evasion.",
			"swift_blink":	"To jump in the middle of the fight with Split Shot and Stone Gaze on."
		}
	},
	"Meepo": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804195,
				abilities: [
					"meepo_poof",	// 1
					"meepo_ransack",	// 2
					"meepo_poof",	// 3
					"meepo_divided_we_stand",	// 4
					"meepo_poof",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","ward_observer","circlet","branches","faerie_fire"],
					early_game:	["boots","power_treads","dragon_lance","travel_boots","wraith_band"],
					mid_game:	["dragon_lance","blink","sheepstick","ethereal_blade","manta"],
					late_game:	["ethereal_blade","skadi","heart"],
					situational:	["aghanims_shard","ultimate_scepter"],
					core:	["dragon_lance","dragon_lance","blink","sheepstick","ethereal_blade","ethereal_blade"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"aghanims_shard":	"For extra mobility.",
			"ultimate_scepter":	"As a save and dispel."
		}
	},
	"Mirana": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804207,
				abilities: [
					"mirana_arrow",	// 1
					"mirana_leap",	// 2
					"mirana_starfall",	// 3
					"mirana_starfall",	// 4
					"mirana_starfall",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","faerie_fire","branches","flask","ring_of_protection","sobi_mask","clarity","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","magic_wand","arcane_boots","urn_of_shadows","tranquil_boots","wraith_band"],
					mid_game:	["cyclone","mekansm","guardian_greaves","force_staff","ghost","solar_crest","rod_of_atos"],
					late_game:	["aeon_disk","ultimate_scepter","ethereal_blade","sheepstick"],
					situational:	["infused_raindrop","spirit_vessel","lotus_orb","blink"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ring_of_protection":	"For Urn of Shadows.",
			"sobi_mask":	"For Urn of Shadows.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"blink":	"For extra mobility and to get double Starstorm off."
		}
	},
	"Monkey King": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804218,
				abilities: [
					"monkey_king_boundless_strike",	// 1
					"monkey_king_jingu_mastery",	// 2
					"monkey_king_jingu_mastery",	// 3
					"monkey_king_boundless_strike",	// 4
					"monkey_king_jingu_mastery",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","orb_of_venom","faerie_fire","circlet","slippers","ward_observer","magic_stick"],
					early_game:	["boots","power_treads","phase_boots","orb_of_corrosion","magic_wand","wraith_band","ring_of_basilius"],
					mid_game:	["maelstrom","echo_sabre","sange_and_yasha","desolator","diffusal_blade","basher","lesser_crit"],
					late_game:	["skadi","mjollnir","satanic","abyssal_blade","ultimate_scepter","greater_crit"],
					situational:	["infused_raindrop","black_king_bar","silver_edge","monkey_king_bar","nullifier"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"ward_observer":	"If you are playing midlane Monkey King.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"silver_edge":	"For break effect and to close the gap.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive spells and items."
		}
	},
	"Morphling": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804228,
				abilities: [
					"morphling_morph_agi",	// 1
					"morphling_waveform",	// 2
					"morphling_morph_agi",	// 3
					"morphling_waveform",	// 4
					"morphling_morph_agi",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","branches","slippers","faerie_fire","quelling_blade","ward_observer","magic_stick"],
					early_game:	["bottle","magic_wand","power_treads","wraith_band","ring_of_basilius"],
					mid_game:	["yasha","manta","ethereal_blade","sange_and_yasha","dragon_lance","lesser_crit"],
					late_game:	["skadi","satanic","butterfly","greater_crit"],
					situational:	["infused_raindrop","black_king_bar","sphere","ultimate_scepter","blink"],
					core:	["power_treads","yasha","ethereal_blade","skadi"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"If you are playing midlane Morphling.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"If you are playing midlane Morphling.",
			"dragon_lance":	"Can be disassembled.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"sphere":	"Against powerful single target disables and damaging spells.",
			"ultimate_scepter":	"If you have heroes like Dark Willow, Earthshaker, Gyrocopter with or against you.",
			"blink":	"To close the gap quickly."
		}
	},
	"Naga Siren": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804237,
				abilities: [
					"naga_siren_mirror_image",	// 1
					"naga_siren_rip_tide",	// 2
					"naga_siren_mirror_image",	// 3
					"naga_siren_rip_tide",	// 4
					"naga_siren_mirror_image",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","slippers","circlet","faerie_fire","magic_stick"],
					early_game:	["power_treads","wraith_band","magic_wand"],
					mid_game:	["yasha","manta","diffusal_blade","sange_and_yasha"],
					late_game:	["skadi","heart","butterfly","satanic","sheepstick","orchid","bloodthorn"],
					situational:	["infused_raindrop","black_king_bar","blink","aghanims_shard","ultimate_scepter","nullifier"],
					core:	["power_treads","yasha"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"blink":	"To close the gap quickly.",
			"aghanims_shard":	"To reduce armor and slow.",
			"ultimate_scepter":	"To control spell immune heroes.",
			"nullifier":	"To dispel defensive spells and items."
		}
	},
	"Nature's Prophet": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804255,
				abilities: [
					"furion_force_of_nature",	// 1
					"furion_teleportation",	// 2
					"furion_force_of_nature",	// 3
					"furion_sprout",	// 4
					"furion_force_of_nature",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","blight_stone","branches","faerie_fire","ward_observer","ward_sentry","magic_stick"],
					early_game:	["power_treads","magic_wand","urn_of_shadows"],
					mid_game:	["orchid","maelstrom","witch_blade","solar_crest","lesser_crit","mekansm","desolator","ancient_janggo"],
					late_game:	["assault","satanic","greater_crit","skadi","sheepstick","aeon_disk","bloodthorn"],
					situational:	["infused_raindrop","spirit_vessel","black_king_bar","heavens_halberd","aghanims_shard","lotus_orb","monkey_king_bar","ultimate_scepter","hurricane_pike","nullifier"],
					core:	["power_treads","orchid"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"If you are playing support Nature's Prophet.",
			"ward_sentry":	"If you are playing support Nature's Prophet to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"urn_of_shadows":	"If you are playing support Nature's Prophet.",
			"orchid":	"For right-clicking build.",
			"maelstrom":	"For right-clicking build.",
			"witch_blade":	"For right-clicking build.",
			"solar_crest":	"For utility build.",
			"lesser_crit":	"For right-clicking build.",
			"mekansm":	"For utility build.",
			"desolator":	"For right-clicking build.",
			"ancient_janggo":	"For utility build.",
			"assault":	"For right-clicking build.",
			"satanic":	"For right-clicking build.",
			"greater_crit":	"For right-clicking build.",
			"skadi":	"For right-clicking build.",
			"bloodthorn":	"For right-clicking build.",
			"infused_raindrop":	"On hero against magical burst.",
			"spirit_vessel":	"For utility build against heavy healing lineup.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"heavens_halberd":	"For utility build. Especially good against ranged right-clickers.",
			"aghanims_shard":	"Great at pushing waves and towers.",
			"lotus_orb":	"For utility build to reflect, dispel and for armor.",
			"monkey_king_bar":	"For right-clicking build against evasion.",
			"ultimate_scepter":	"For extra control and to have lanes pushed out.",
			"hurricane_pike":	"For right-clicking build to disengage from heroes like Slark and Troll.",
			"nullifier":	"For right-clicking build to dispel defensive spells and items."
		}
	},
	"Necrophos": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804267,
				abilities: [
					"necrolyte_death_pulse",		// 1
					"necrolyte_heartstopper_aura",	// 2
					"necrolyte_death_pulse",		// 3
					"necrolyte_sadist",				// 4   equals to 'ghost shroud'
					"necrolyte_death_pulse",		// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","branches","circlet","flask","mantle","enchanted_mango","ward_observer","magic_stick"],
					early_game:	["boots","magic_wand","null_talisman","power_treads","arcane_boots","travel_boots"],
					mid_game:	["hood_of_defiance","force_staff","sange","kaya_and_sange","cyclone","eternal_shroud","mekansm","guardian_greaves","holy_locket","witch_blade"],
					late_game:	["shivas_guard","aeon_disk","sheepstick","octarine_core"],
					situational:	["infused_raindrop","pipe","heavens_halberd","radiance","aghanims_shard","lotus_orb","blink","ultimate_scepter"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"If you are playing midlane Necrophos.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"travel_boots":	"For midlane Necrophos.",
			"mekansm":	"Goes well with Holy Locket and Aghanim's Shard.",
			"holy_locket":	"Goes well with Mekansm and Aghanim's Shard.",
			"infused_raindrop":	"On hero against magical burst.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"radiance":	"Against illusions based heroes and summons.",
			"aghanims_shard":	"To save an ally, heal and amplify the magical damage on target.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"blink":	"For extra mobility and to get Reaper's Scythe off easier.",
			"ultimate_scepter":	"Against heavy physical damage lineups."
		}
	},
	"Night Stalker": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804283,
				abilities: [
					"night_stalker_void",	// 1
					"night_stalker_hunter_in_the_night",	// 2
					"night_stalker_void",	// 3
					"night_stalker_hunter_in_the_night",	// 4
					"night_stalker_void",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","gauntlets","branches","flask","faerie_fire","enchanted_mango","bracer","ring_of_protection","circlet","magic_stick"],
					early_game:	["phase_boots","magic_wand","bracer","urn_of_shadows","medallion_of_courage"],
					mid_game:	["echo_sabre","basher","ultimate_scepter","solar_crest"],
					late_game:	["assault","abyssal_blade","overwhelming_blink","satanic"],
					situational:	["hand_of_midas","spirit_vessel","black_king_bar","heavens_halberd","blink","nullifier","aghanims_shard"],
					core:	["phase_boots"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"hand_of_midas":	"If you can get it early.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"blink":	"To jump the backlines.",
			"nullifier":	"To dispel defensive spells and items.",
			"aghanims_shard":	"Against summon-based heroes."
		}
	},
	"Nyx Assassin": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804295,
				abilities: [
					"nyx_assassin_impale",	// 1
					"nyx_assassin_spiked_carapace",	// 2
					"nyx_assassin_impale",	// 3
					"nyx_assassin_spiked_carapace",	// 4
					"nyx_assassin_impale",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","boots","flask","enchanted_mango","wind_lace","branches","faerie_fire","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","magic_wand","arcane_boots","urn_of_shadows","ring_of_basilius"],
					mid_game:	["ultimate_scepter","aether_lens","cyclone","force_staff","ghost","meteor_hammer","solar_crest"],
					late_game:	["octarine_core","aeon_disk","ethereal_blade","sheepstick"],
					situational:	["infused_raindrop","blink","lotus_orb"],
					core:	["ultimate_scepter"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"On hero against magical burst.",
			"blink":	"To close the gap and land Impale easier.",
			"lotus_orb":	"For reflect, dispel and armor."
		}
	},
	"Ogre Magi": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804305,
				abilities: [
					"ogre_magi_ignite",	// 1
					"ogre_magi_fireblast",	// 2
					"ogre_magi_ignite",	// 3
					"ogre_magi_fireblast",	// 4
					"ogre_magi_ignite",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","enchanted_mango","branches","faerie_fire","ward_observer","ward_sentry","orb_of_venom","ring_of_basilius","magic_stick"],
					early_game:	["boots","magic_wand","tranquil_boots","soul_ring"],
					mid_game:	["aether_lens","glimmer_cape","ghost","cyclone","force_staff","solar_crest","veil_of_discord"],
					late_game:	["ultimate_scepter","aeon_disk","octarine_core","sheepstick","kaya"],
					situational:	["infused_raindrop","hand_of_midas","aghanims_shard","lotus_orb","blink"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"orb_of_venom":	"If you see yourself being able to hit the opponents on the lane often.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"hand_of_midas":	"If you can get it early. Not recommended for majority of the games.",
			"aghanims_shard":	"Against right-clickers with high damage per hit.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"blink":	"To close the gap."
		}
	},
	"Omniknight": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804315,
				abilities: [
					"omniknight_purification",	// 1
					"omniknight_repel",	// 2
					"omniknight_purification",	// 3
					"omniknight_repel",	// 4
					"omniknight_purification",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","faerie_fire","enchanted_mango","quelling_blade","gauntlets","branches","ward_observer","ward_sentry","orb_of_venom","magic_stick"],
					early_game:	["boots","arcane_boots","magic_wand","phase_boots","tranquil_boots","soul_ring","ring_of_basilius"],
					mid_game:	["holy_locket","aether_lens","hood_of_defiance","glimmer_cape","solar_crest","force_staff","mekansm","ghost","echo_sabre"],
					late_game:	["aeon_disk","ultimate_scepter","octarine_core"],
					situational:	["hand_of_midas","ancient_janggo","pipe","lotus_orb","blink","heavens_halberd","aghanims_shard"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"quelling_blade":	"For offlane Omniknight.",
			"ward_observer":	"For support Omniknight.",
			"ward_sentry":	"For support Omniknight to block or unblock the pull camp.",
			"orb_of_venom":	"If you see yourself being able to hit the opponents on the lane often.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"phase_boots":	"For offlane Omniknight.",
			"tranquil_boots":	"For support Omniknight.",
			"ring_of_basilius":	"For support Omniknight if your laning partner uses a lot of mana early.",
			"glimmer_cape":	"For support Omniknight.",
			"ghost":	"For support Omniknight.",
			"echo_sabre":	"For offlane right-clicking Omniknight. Goes well with the Aghanim's Shard.",
			"hand_of_midas":	"For offlane Omniknight if you can get it early.",
			"ancient_janggo":	"If you are grouping up a lot as a team in midgame and if you have summons.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"blink":	"To be able get your spells off easier.",
			"heavens_halberd":	"For offlane Omniknight. Especially good against ranged right-clickers.",
			"aghanims_shard":	"For offlane right-clicking Omniknight."
		}
	},
	"Oracle": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804325,
				abilities: [
					"oracle_fortunes_end",	// 1
					"oracle_purifying_flames",	// 2
					"oracle_purifying_flames",	// 3
					"oracle_fates_edict",	// 4
					"oracle_purifying_flames",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","enchanted_mango","faerie_fire","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","arcane_boots","tranquil_boots","magic_wand","ring_of_basilius","urn_of_shadows"],
					mid_game:	["aether_lens","glimmer_cape","ghost","force_staff","holy_locket","mekansm"],
					late_game:	["aeon_disk","ultimate_scepter","octarine_core"],
					situational:	["infused_raindrop","blink","lotus_orb","aghanims_shard"],
					core:	["aether_lens"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"On hero against magical burst.",
			"blink":	"To get your spells off or blink out while under False Promise.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"aghanims_shard":	"If you don't have more than one invisibility spell or item in the team."
		}
	},
	"Outworld Destroyer": { // not 'Outworld Devourer'
		builds: [
			{
				roles: [],
				steam_guide_id: 0,
				abilities: [
					"obsidian_destroyer_arcane_orb",	// 1
					"obsidian_destroyer_equilibrium",	// 2
					"obsidian_destroyer_astral_imprisonment",	// 3
					"obsidian_destroyer_astral_imprisonment",	// 4
					"obsidian_destroyer_astral_imprisonment",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","mantle","crown","branches","faerie_fire","ward_observer","magic_stick"],
					early_game:	["meteor_hammer","power_treads","arcane_boots","magic_wand","null_talisman"],
					mid_game:	["blink","hurricane_pike","ultimate_scepter","aether_lens","witch_blade"],
					late_game:	["sheepstick","skadi","aeon_disk","refresher","octarine_core","kaya"],
					situational:	["infused_raindrop","hand_of_midas","black_king_bar"],
					core:	["meteor_hammer","power_treads","blink","hurricane_pike","sheepstick"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"crown":	"For Meteor Hammer rush.",
			"ward_observer":	"If you are playing midlane Outworld Destroyer.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"arcane_boots":	"Disassemble it for Aether Lens and get Power Treads.",
			"infused_raindrop":	"On hero against magical burst.",
			"hand_of_midas":	"For midlane Outworld Destroyer if you can get it early.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel."
		}
	},
	"Pangolier": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804346,
				abilities: [
					"pangolier_shield_crash",	// 1
					"pangolier_swashbuckle",	// 2
					"pangolier_shield_crash",	// 3
					"pangolier_lucky_shot",	// 4
					"pangolier_shield_crash",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","faerie_fire","flask","circlet","enchanted_mango","ward_observer","orb_of_venom","magic_stick"],
					early_game:	["bottle","magic_wand","boots","orb_of_corrosion","arcane_boots","power_treads"],
					mid_game:	["blink","aghanims_shard","basher","travel_boots","guardian_greaves","ghost","cyclone","maelstrom","hood_of_defiance","echo_sabre","diffusal_blade","sange_and_yasha"],
					late_game:	["aeon_disk","ultimate_scepter","abyssal_blade"],
					situational:	["infused_raindrop","lotus_orb","black_king_bar"],
					core:	["blink","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"If you are playing midlane Pangolier.",
			"orb_of_venom":	"If you see yourself being able to hit the opponents on the lane often.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"For midlane Pangolier but can be considered for offlane too.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"arcane_boots":	"To be considered for offlane Pangolier.",
			"travel_boots":	"For midlane Pangolier.",
			"guardian_greaves":	"For offlane Pangolier.",
			"echo_sabre":	"Can be disassembled.",
			"sange_and_yasha":	"For midlane Pangolier for right-clicking build.",
			"infused_raindrop":	"On hero against magical burst.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel."
		}
	},
	"Phantom Assassin": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804354,
				abilities: [
					"phantom_assassin_stifling_dagger",	// 1
					"phantom_assassin_phantom_strike",	// 2
					"phantom_assassin_stifling_dagger",	// 3
					"phantom_assassin_blur",	// 4
					"phantom_assassin_stifling_dagger",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","faerie_fire","slippers","circlet","magic_stick"],
					early_game:	["power_treads","magic_wand","orb_of_corrosion","wraith_band"],
					mid_game:	["bfury","desolator","basher","sange_and_yasha","echo_sabre"],
					late_game:	["satanic","abyssal_blade","ultimate_scepter"],
					situational:	["infused_raindrop","black_king_bar","aghanims_shard","monkey_king_bar","nullifier"],
					core:	["power_treads","bfury","desolator","basher","satanic"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard":	"For break effect and against tanky heroes.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive spells and items."
		}
	},
	"Phantom Lancer": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804368,
				abilities: [
					"phantom_lancer_spirit_lance",	// 1
					"phantom_lancer_phantom_edge",	// 2
					"phantom_lancer_doppelwalk",	// 3
					"phantom_lancer_phantom_edge",	// 4
					"phantom_lancer_phantom_edge",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","slippers","faerie_fire","circlet","magic_stick"],
					early_game:	["power_treads","magic_wand","wraith_band"],
					mid_game:	["diffusal_blade","yasha","manta","sange_and_yasha","aghanims_shard","aether_lens","basher"],
					late_game:	["octarine_core","skadi","heart","butterfly","satanic","abyssal_blade"],
					situational:	["infused_raindrop","hood_of_defiance","monkey_king_bar"],
					core:	["power_treads","diffusal_blade","yasha","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"aether_lens":	"Goes well with Aghanim's_shard",
			"octarine_core":	"Goes well with Aghanim's_shard",
			"infused_raindrop":	"On hero against magical burst.",
			"hood_of_defiance":	"Against a lot magical damage in early to midgame.",
			"monkey_king_bar":	"Against evasion."
		}
	},
	"Phoenix": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804378,
				abilities: [
					"phoenix_fire_spirits",	// 1
					"phoenix_icarus_dive",	// 2
					"phoenix_fire_spirits",	// 3
					"phoenix_sun_ray",	// 4
					"phoenix_fire_spirits",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","faerie_fire","branches","enchanted_mango","ring_of_regen","ring_of_protection","ward_observer","ward_sentry","magic_stick"],
					early_game:	["tranquil_boots","magic_wand","urn_of_shadows","ring_of_basilius","arcane_boots"],
					mid_game:	["holy_locket","aghanims_shard","ghost","glimmer_cape","force_staff","cyclone","veil_of_discord"],
					late_game:	["aeon_disk","refresher","shivas_guard","ethereal_blade","ultimate_scepter"],
					situational:	["infused_raindrop","spirit_vessel","lotus_orb","heavens_halberd"],
					core:	["tranquil_boots","holy_locket","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"arcane_boots":	"Disassemble for Holy_Locket and get Tranquil Boots.",
			"infused_raindrop":	"On hero against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"heavens_halberd":	"Especially good against ranged right-clickers."
		}
	},
	"Puck": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804386,
				abilities: [
					"puck_illusory_orb",	// 1
					"puck_phase_shift",	// 2
					"puck_illusory_orb",	// 3
					"puck_waning_rift",	// 4
					"puck_illusory_orb",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","branches","mantle","ward_observer","magic_stick"],
					early_game:	["bottle","null_talisman","boots","witch_blade","power_treads","magic_wand"],
					mid_game:	["blink","travel_boots","cyclone","kaya_and_sange","dagon"],
					late_game:	["aeon_disk","octarine_core","sheepstick"],
					situational:	["infused_raindrop","black_king_bar","ultimate_scepter","aghanims_shard","sphere"],
					core:	["witch_blade","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"ultimate_scepter":	"If opponents have spell immunity spells or items.",
			"aghanims_shard":	"Against invisible heroes and to break Dream Coil.",
			"sphere":	"Aghainst powerful single target disables or burst damage."
		}
	},
	"Pudge": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804395,
				abilities: [
					"pudge_meat_hook",	// 1
					"pudge_rot",	// 2
					"pudge_meat_hook",	// 3
					"pudge_rot",	// 4
					"pudge_meat_hook",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","boots","flask","clarity","enchanted_mango","ring_of_protection","faerie_fire","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["tranquil_boots","magic_wand","wind_lace","soul_ring","urn_of_shadows","bottle"],
					mid_game:	["blink","aether_lens","aghanims_shard","ghost","glimmer_cape","force_staff","hood_of_defiance","eternal_shroud"],
					late_game:	["octarine_core","ultimate_scepter","overwhelming_blink"],
					situational:	["spirit_vessel","lotus_orb","black_king_bar","heavens_halberd"],
					core:	["tranquil_boots","blink","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"lotus_orb":	"For reflect, dispel and armor.",
			"black_king_bar":	"To channel Dismember fully.",
			"heavens_halberd":	"Especially good against ranged right-clickers."
		}
	},
	"Pugna": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804407,
				abilities: [
					"pugna_nether_blast",	// 1
					"pugna_decrepify",	// 2
					"pugna_nether_blast",	// 3
					"pugna_decrepify",	// 4
					"pugna_nether_blast",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","branches","mantle","enchanted_mango","flask","ward_observer","magic_stick"],
					early_game:	["bottle","null_talisman","boots","arcane_boots"],
					mid_game:	["aether_lens","travel_boots","dagon","glimmer_cape","cyclone","kaya_and_sange","force_staff"],
					late_game:	["octarine_core","aeon_disk","sheepstick"],
					situational:	["infused_raindrop","blink","sphere","lotus_orb","aghanims_shard"],
					core:	["aether_lens"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"For midlane Pugna.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"For midlane Pugna but can be considered for offlane too.",
			"infused_raindrop":	"On hero against magical burst.",
			"blink":	"To close the gap.",
			"sphere":	"Aghainst powerful single target disables or burst damage.",
			"lotus_orb":	"For offlane Pugna to reflect, dispel and armor.",
			"aghanims_shard":	"For an additional Life Drain if the fights are long."
		}
	},
	"Queen of Pain": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804415,
				abilities: [
					"queenofpain_scream_of_pain",	// 1
					"queenofpain_shadow_strike",	// 2
					"queenofpain_shadow_strike",	// 3
					"queenofpain_blink",	// 4
					"queenofpain_scream_of_pain",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","faerie_fire","branches","mantle","ward_observer","magic_stick"],
					early_game:	["bottle","null_talisman","boots","power_treads"],
					mid_game:	["orchid","witch_blade","aghanims_shard","kaya_and_sange","aether_lens","cyclone","travel_boots"],
					late_game:	["shivas_guard","ultimate_scepter","octarine_core","aeon_disk","sheepstick","bloodthorn"],
					situational:	["infused_raindrop","black_king_bar","sphere"],
					core:	["orchid","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"sphere":	"Aghainst powerful single target disables or burst damage."
		}
	},
	"Razor": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804423,
				abilities: [
					"razor_static_link",	// 1
					"razor_plasma_field",	// 2
					"razor_static_link",	// 3
					"razor_plasma_field",	// 4
					"razor_static_link",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","branches","slippers","quelling_blade","ward_observer","magic_stick"],
					early_game:	["bottle","boots","power_treads","magic_wand","wraith_band","phase_boots","wind_lace"],
					mid_game:	["cyclone","sange_and_yasha","hood_of_defiance","travel_boots"],
					late_game:	["refresher","ultimate_scepter","assault","shivas_guard","satanic","butterfly","sheepstick"],
					situational:	["infused_raindrop","black_king_bar","blink","heavens_halberd","lotus_orb","monkey_king_bar","aeon_disk"],
					core:	["refresher"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"quelling_blade":	"For carry Razor",
			"ward_observer":	"For midlane Razor.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"For midlane Razor.",
			"sange_and_yasha":	"For midlane and carry Razor.",
			"hood_of_defiance":	"For offlane Razor.",
			"travel_boots":	"For midlane Razor.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"To get a good Static Link off.",
			"blink":	"To jump to a hero you want to Static Link.",
			"heavens_halberd":	"For offlane Razor. Especially good against ranged right-clickers.",
			"lotus_orb":	"For offlane Razor to reflect, dispel and armor.",
			"monkey_king_bar":	"Against evasion.",
			"aeon_disk":	"To survive long lasting disables and burst."
		}
	},
	"Riki": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804432,
				abilities: [
					"riki_blink_strike",	// 1
					"riki_tricks_of_the_trade",	// 2
					"riki_blink_strike",	// 3
					"riki_tricks_of_the_trade",	// 4
					"riki_blink_strike",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","circlet","slippers","faerie_fire","magic_stick"],
					early_game:	["power_treads","magic_wand","orb_of_corrosion","wraith_band"],
					mid_game:	["diffusal_blade","yasha","manta","basher","sange_and_yasha","lesser_crit"],
					late_game:	["abyssal_blade","skadi","butterfly","greater_crit"],
					situational:	["infused_raindrop","black_king_bar","blink","aghanims_shard","nullifier"],
					core:	["power_treads","diffusal_blade","yasha","basher"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"manta":	"Upon activation dispels Dust of Appearance from you.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"blink":	"To close the gap and jump out from Tricks of Trade.",
			"aghanims_shard":	"For extra control.",
			"nullifier":	"To dispel defensive spells and items."
		}
	},
	"Rubick": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804443,
				abilities: [
					"rubick_fade_bolt",	// 1
					"rubick_telekinesis",	// 2
					"rubick_fade_bolt",	// 3
					"rubick_arcane_supremacy",	// 4
					"rubick_fade_bolt",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","boots","faerie_fire","flask","branches","circlet","enchanted_mango","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","arcane_boots","tranquil_boots","magic_wand","null_talisman","ring_of_basilius","urn_of_shadows"],
					mid_game:	["aether_lens","blink","ghost","force_staff","glimmer_cape","cyclone"],
					late_game:	["aeon_disk","octarine_core","ultimate_scepter"],
					situational:	["infused_raindrop","lotus_orb","aghanims_shard"],
					core:	["aether_lens","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"On hero against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"aghanims_shard":	"To reposition an ally in a bad position and to get Aghanim's Shard upgrades on stolen spells."
		}
	},
	"Sand King": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804451,
				abilities: [
					"sandking_caustic_finale",	// 1
					"sandking_burrowstrike",	// 2
					"sandking_sand_storm",	// 3
					"sandking_sand_storm",	// 4
					"sandking_sand_storm",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","flask","branches","gauntlets","ring_of_protection","faerie_fire","enchanted_mango","magic_stick"],
					early_game:	["boots","magic_wand","soul_ring","bracer","tranquil_boots","vanguard","arcane_boots"],
					mid_game:	["blink","cyclone","travel_boots","force_staff","ghost","hood_of_defiance","veil_of_discord"],
					late_game:	["ultimate_scepter","ethereal_blade","sheepstick"],
					situational:	["lotus_orb","black_king_bar","heavens_halberd","aghanims_shard","aeon_disk"],
					core:	["blink","cyclone"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"aghanims_shard":	"For extra AoE damage against illusions and waveclear."
		}
	},
	"Shadow Demon": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804460,
				abilities: [
					"shadow_demon_disruption",	// 1
					"shadow_demon_shadow_poison",	// 2
					"shadow_demon_shadow_poison",	// 3
					"shadow_demon_soul_catcher",	// 4
					"shadow_demon_shadow_poison",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","enchanted_mango","clarity","faerie_fire","branches","sobi_mask","ring_of_basilius","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","arcane_boots","tranquil_boots","magic_wand"],
					mid_game:	["aether_lens","force_staff","blink","glimmer_cape","ghost","solar_crest","ancient_janggo"],
					late_game:	["ultimate_scepter","aeon_disk","sheepstick","octarine_core"],
					situational:	["infused_raindrop","lotus_orb","aghanims_shard"],
					core:	["aether_lens"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ultimate_scepter":	"Applies break effect.",
			"infused_raindrop":	"On hero against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"aghanims_shard":	"If there are a lot of dispellable debuffs cast on your teammates."
		}
	},
	"Shadow Fiend": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804468,
				abilities: [
					"nevermore_shadowraze1",	// 1
					"nevermore_necromastery",	// 2
					"nevermore_shadowraze1",	// 3
					"nevermore_necromastery",	// 4
					"nevermore_shadowraze1",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["enchanted_mango","tango","branches","faerie_fire","circlet","ward_observer","magic_stick"],
					early_game:	["bottle","boots","magic_wand","travel_boots","power_treads"],
					mid_game:	["cyclone","ghost","yasha","dragon_lance","lesser_crit","sange_and_yasha","invis_sword"],
					late_game:	["arcane_blink","ethereal_blade","sheepstick","refresher","satanic","greater_crit"],
					situational:	["infused_raindrop","black_king_bar","sphere","aghanims_shard","monkey_king_bar"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"travel_boots":	"For magical build.",
			"power_treads":	"For right-click build.",
			"cyclone":	"For magical build.",
			"ghost":	"For magical build.",
			"yasha":	"For right-click build.",
			"dragon_lance":	"For right-click build.",
			"lesser_crit":	"For right-click build.",
			"sange_and_yasha":	"For right-click build.",
			"invis_sword":	"For right-click build.",
			"arcane_blink":	"For magical build.",
			"ethereal_blade":	"For magical build.",
			"sheepstick":	"For magical build.",
			"refresher":	"For magical build.",
			"satanic":	"For right-click build.",
			"greater_crit":	"For right-click build.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"To channel Requiem of Souls fully or to be able to right-click freely.",
			"sphere":	"Against powerful single target disabels and burst damage.",
			"aghanims_shard":	"For magical build to deal extra magical damage.",
			"monkey_king_bar":	"For right-click build against evasion."
		}
	},
	"Shadow Shaman": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804478,
				abilities: [
					"shadow_shaman_ether_shock",	// 1
					"shadow_shaman_shackles",	// 2
					"shadow_shaman_ether_shock",	// 3
					"shadow_shaman_voodoo",	// 4
					"shadow_shaman_ether_shock",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","boots","flask","faerie_fire","enchanted_mango","branches","wind_lace","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","arcane_boots","tranquil_boots","magic_wand","ring_of_basilius"],
					mid_game:	["aether_lens","blink","aghanims_shard","ghost","force_staff","glimmer_cape","ancient_janggo"],
					late_game:	["aeon_disk","refresher","octarine_core","ultimate_scepter"],
					situational:	["infused_raindrop","black_king_bar","lotus_orb"],
					core:	["aether_lens","blink","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"To channel Shackles fully.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Silencer": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804488,
				abilities: [
					"silencer_glaives_of_wisdom",	// 1
					"silencer_curse_of_the_silent",	// 2
					"silencer_curse_of_the_silent",	// 3
					"silencer_last_word",	// 4
					"silencer_curse_of_the_silent",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","faerie_fire","branches","enchanted_mango","mantle","circlet","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","magic_wand","power_treads","ring_of_basilius","null_talisman","urn_of_shadows"],
					mid_game:	["glimmer_cape","force_staff","ghost","ancient_janggo","dragon_lance","hurricane_pike","witch_blade","falcon_blade"],
					late_game:	["aeon_disk","sheepstick","moon_shard"],
					situational:	["infused_raindrop","lotus_orb","aghanims_shard"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"On hero against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"aghanims_shard":	"In late game when you are dealing signifcant amounts of damage."
		}
	},
	"Skywrath Mage": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804496,
				abilities: [
					"skywrath_mage_concussive_shot",	// 1
					"skywrath_mage_arcane_bolt",	// 2
					"skywrath_mage_concussive_shot",	// 3
					"skywrath_mage_ancient_seal",	// 4
					"skywrath_mage_concussive_shot",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","mantle","enchanted_mango","flask","branches","clarity","faerie_fire","null_talisman","sobi_mask","ring_of_basilius","ward_observer","ward_sentry","magic_stick"],
					early_game:	["null_talisman","boots","arcane_boots","tranquil_boots","magic_wand"],
					mid_game:	["aether_lens","rod_of_atos","force_staff","ghost","travel_boots","veil_of_discord","glimmer_cape"],
					late_game:	["ultimate_scepter","aeon_disk","octarine_core","sheepstick"],
					situational:	["infused_raindrop","blink","invis_sword","aghanims_shard"],
					core:	["aether_lens","rod_of_atos"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"blink":	"To close the gap.",
			"invis_sword":	"To hunt for kills.",
			"aghanims_shard":	"If you expect long fights and against physical damage lineups."
		}
	},
	"Slardar": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804505,
				abilities: [
					"slardar_slithereen_crush",	// 1
					"slardar_bash",	// 2
					"slardar_bash",	// 3
					"slardar_sprint",	// 4
					"slardar_bash",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","gauntlets","branches","circlet","faerie_fire","flask","bracer","ring_of_protection","magic_stick"],
					early_game:	["power_treads","magic_wand","bracer","orb_of_corrosion"],
					mid_game:	["blink","echo_sabre","ultimate_scepter","hood_of_defiance"],
					late_game:	["assault","moon_shard","satanic"],
					situational:	["hand_of_midas","black_king_bar","heavens_halberd"],
					core:	["power_treads","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"hand_of_midas":	"If you can get it early.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"heavens_halberd":	"Especially good against ranged right-clickers."
		}
	},
	"Slark": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804517,
				abilities: [
					"slark_essence_shift",	// 1
					"slark_pounce",	// 2
					"slark_dark_pact",	// 3
					"slark_dark_pact",	// 4
					"slark_dark_pact",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","circlet","faerie_fire","slippers","orb_of_venom","magic_stick"],
					early_game:	["power_treads","magic_wand","wraith_band","orb_of_corrosion"],
					mid_game:	["echo_sabre","sange_and_yasha","basher","diffusal_blade"],
					late_game:	["ultimate_scepter","skadi","abyssal_blade","satanic"],
					situational:	["infused_raindrop","hand_of_midas","black_king_bar","blink","silver_edge","monkey_king_bar","nullifier"],
					core:	["power_treads","echo_sabre","sange_and_yasha"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"infused_raindrop":	"On hero against magical burst.",
			"hand_of_midas":	"If you can get it early.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"blink":	"To close the gap.",
			"silver_edge":	"For break effect and to close the gap.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive spells and items."
		}
	},
	"Snapfire": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804525,
				abilities: [
					"snapfire_scatterblast",	// 1
					"snapfire_firesnap_cookie",	// 2
					"snapfire_scatterblast",	// 3
					"snapfire_firesnap_cookie",	// 4
					"snapfire_scatterblast",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","blight_stone","faerie_fire","enchanted_mango","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","magic_wand","tranquil_boots","arcane_boots","ring_of_basilius"],
					mid_game:	["solar_crest","aghanims_shard","blink","force_staff","glimmer_cape","ghost","mekansm","guardian_greaves","aether_lens","veil_of_discord"],
					late_game:	["aeon_disk","ultimate_scepter","ethereal_blade","octarine_core","sheepstick"],
					situational:	["infused_raindrop","lotus_orb"],
					core:	["solar_crest","aghanims_shard","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"blink":	"Goes well with Aghanim's Shard and Aghanim's Scepter.",
			"infused_raindrop":	"On hero against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Sniper": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804535,
				abilities: [
					"sniper_shrapnel",	// 1
					"sniper_headshot",	// 2
					"sniper_shrapnel",	// 3
					"sniper_take_aim",	// 4
					"sniper_shrapnel",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","branches","slippers","flask","boots","wind_lace","ward_observer","ward_sentry","magic_stick"],
					early_game:	["wraith_band","boots","power_treads","magic_wand","tranquil_boots","ring_of_basilius","urn_of_shadows"],
					mid_game:	["dragon_lance","maelstrom","hurricane_pike","ultimate_scepter","aghanims_shard","aether_lens","lesser_crit","yasha","sange_and_yasha","ghost","falcon_blade","glimmer_cape","force_staff"],
					late_game:	["greater_crit","mjollnir","skadi","octarine_core","satanic"],
					situational:	["infused_raindrop","hand_of_midas","black_king_bar","blink","monkey_king_bar"],
					core:	["power_treads","tranquil_boots","dragon_lance","maelstrom","ultimate_scepter","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"boots":	"For support Sniper.",
			"wind_lace":	"For support Sniper.",
			"ward_sentry":	"For support Sniper to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"wraith_band":	"For midlane Sniper.",
			"power_treads":	"For midlane Sniper.",
			"tranquil_boots":	"For support Sniper",
			"ring_of_basilius":	"For support Sniper if your laning partner uses a lot of mana early.",
			"urn_of_shadows":	"For support Sniper.",
			"dragon_lance":	"For midlane Sniper. Can be disassembled.",
			"maelstrom":	"For midlane Sniper",
			"hurricane_pike":	"For midlane Sniper.",
			"ultimate_scepter":	"For support Sniper.",
			"aghanims_shard":	"For support Sniper.",
			"aether_lens":	"For support Sniper.",
			"lesser_crit":	"For midlane Sniper.",
			"yasha":	"For midlane Sniper.",
			"sange_and_yasha":	"For midlane Sniper.",
			"ghost":	"For support Sniper.",
			"falcon_blade":	"For support Sniper.",
			"glimmer_cape":	"For support Sniper.",
			"greater_crit":	"For midlane Sniper.",
			"mjollnir":	"For midlane Sniper.",
			"skadi":	"For midlane Sniper.",
			"octarine_core":	"For support Sniper.",
			"satanic":	"For midlane Sniper.",
			"infused_raindrop":	"On hero against magical burst.",
			"hand_of_midas":	"For midlane Sniper if you can get it early.",
			"black_king_bar":	"For midlane Sniper against a lot of disables, magical damage and as a dispel.",
			"blink":	"For extra mobility.",
			"monkey_king_bar":	"For midlane Sniper against evasion."
		}
	},
	"Spectre": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804547,
				abilities: [
					"spectre_spectral_dagger",	// 1
					"spectre_dispersion",	// 2
					"spectre_spectral_dagger",	// 3
					"spectre_dispersion",	// 4
					"spectre_spectral_dagger",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","faerie_fire","slippers","circlet","magic_stick"],
					early_game:	["magic_wand","power_treads","wraith_band"],
					mid_game:	["echo_sabre","blade_mail","manta","basher","diffusal_blade","radiance"],
					late_game:	["skadi","abyssal_blade","butterfly","ultimate_scepter","moon_shard"],
					situational:	["infused_raindrop","hand_of_midas","black_king_bar","nullifier","orchid","aghanims_shard"],
					core:	["power_treads","manta"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"diffusal_blade":	"Goes well with Manta.",
			"radiance":	"Against illusion, clone and summon based heroes.",
			"infused_raindrop":	"On hero against magical burst.",
			"hand_of_midas":	"If you can get it early.",
			"black_king_bar":	"Against breaks, disables, magical damage and as a dispel.",
			"nullifier":	"To dispel defensive spells and items.",
			"orchid":	"Against heroes with escaping spells.",
			"aghanims_shard":	"To close the gap once you get damage by backline hero."
		}
	},
	"Spirit Breaker": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804560,
				abilities: [
					"spirit_breaker_charge_of_darkness",	// 1
					"spirit_breaker_greater_bash",	// 2
					"spirit_breaker_bulldoze",	// 3
					"spirit_breaker_greater_bash",	// 4
					"spirit_breaker_greater_bash",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","boots","orb_of_venom","flask","faerie_fire","enchanted_mango","branches","circlet","ring_of_protection","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","phase_boots","magic_wand","urn_of_shadows","tranquil_boots","orb_of_corrosion","power_treads","bracer"],
					mid_game:	["ultimate_scepter","blade_mail","hood_of_defiance","ancient_janggo","glimmer_cape","ghost"],
					late_game:	["assault","vladmir","moon_shard"],
					situational:	["spirit_vessel","pipe","black_king_bar","heavens_halberd","lotus_orb","aghanims_shard"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"ancient_janggo":	"If you are grouping up a lot as a team in midgame and if you have summons.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"aghanims_shard":	"For break effect."
		}
	},
	"Storm Spirit": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804570,
				abilities: [
					"storm_spirit_static_remnant",	// 1
					"storm_spirit_overload",	// 2
					"storm_spirit_electric_vortex",	// 3
					"storm_spirit_static_remnant",	// 4
					"storm_spirit_static_remnant",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","branches","mantle","ward_observer","magic_stick"],
					early_game:	["bottle","null_talisman","power_treads","magic_stick"],
					mid_game:	["orchid","kaya","kaya_and_sange","bloodstone","cyclone"],
					late_game:	["ultimate_scepter","shivas_guard","bloodthorn","sheepstick","aeon_disk"],
					situational:	["infused_raindrop","black_king_bar","sphere","aghanims_shard"],
					core:	["power_treads","orchid","kaya"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"sphere":	"Against powerful single target disables and burst of damage.",
			"aghanims_shard":	"If you are lacking damage as team."
		}
	},
	"Sven": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804579,
				abilities: [
					"sven_storm_bolt",	// 1
					"sven_warcry",	// 2
					"sven_great_cleave",	// 3
					"sven_great_cleave",	// 4
					"sven_great_cleave",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","enchanted_mango","gauntlets","faerie_fire","circlet","magic_stick"],
					early_game:	["power_treads","magic_wand","bracer","mask_of_madness"],
					mid_game:	["echo_sabre","blink","lesser_crit","sange_and_yasha"],
					late_game:	["greater_crit","swift_blink","assault","satanic","bloodthorn"],
					situational:	["black_king_bar","aghanims_shard","monkey_king_bar","ultimate_scepter"],
					core:	["power_treads","mask_of_madness","echo_sabre","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"blink":	"To close the gap.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"aghanims_shard":	"To dispel defensive items and spells with Storm Hammer.",
			"monkey_king_bar":	"Against evasion.",
			"ultimate_scepter":	"For extra mobility."
		}
	},
	"Techies": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804587,
				abilities: [
					"techies_suicide",	// 1
					"techies_land_mines",	// 2
					"techies_land_mines",	// 3
					"techies_stasis_trap",	// 4
					"techies_land_mines",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","boots","faerie_fire","ring_of_regen","gauntlets","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","soul_ring","arcane_boots","null_talisman","magic_wand"],
					mid_game:	["ultimate_scepter","force_staff","aether_lens","kaya","glimmer_cape","ghost"],
					late_game:	["octarine_core","aeon_disk","travel_boots","sheepstick","bloodstone"],
					situational:	["infused_raindrop","aghanims_shard","blink"],
					core:	["soul_ring","ultimate_scepter"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"travel_boots":	"For extra mobility around the map.",
			"infused_raindrop":	"On hero against magical burst.",
			"aghanims_shard":	"For extra control.",
			"blink":	"For extra mobility around the map."
		}
	},
	"Templar Assassin": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804595,
				abilities: [
					"templar_assassin_psi_blades",	// 1
					"templar_assassin_refraction",	// 2
					"templar_assassin_refraction",	// 3
					"templar_assassin_psi_blades",	// 4
					"templar_assassin_refraction",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","quelling_blade","branches","circlet","slippers","ward_observer","magic_stick"],
					early_game:	["bottle","power_treads","dragon_lance","magic_wand","wraith_band"],
					mid_game:	["desolator","blink","lesser_crit","hurricane_pike","orchid"],
					late_game:	["greater_crit","swift_blink","butterfly","moon_shard"],
					situational:	["infused_raindrop","black_king_bar","aghanims_shard","ultimate_scepter","monkey_king_bar","nullifier","sphere"],
					core:	["power_treads","dragon_lance","desolator","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"For midlane Templar Assasin.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"aghanims_shard":	"For silence and extra vision.",
			"ultimate_scepter":	"To splitpush and against it.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive items and spells.",
			"sphere":	"Against powerful single target disables and burst damage."
		}
	},
	"Terrorblade": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804604,
				abilities: [
					"terrorblade_reflection",	// 1
					"terrorblade_metamorphosis",	// 2
					"terrorblade_metamorphosis",	// 3
					"terrorblade_conjure_image",	// 4
					"terrorblade_conjure_image",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","slippers","faerie_fire","circlet","magic_stick"],
					early_game:	["power_treads","magic_wand","wraith_band","ring_of_basilius"],
					mid_game:	["dragon_lance","yasha","manta","sange_and_yasha","lesser_crit"],
					late_game:	["skadi","greater_crit","satanic","butterfly"],
					situational:	["infused_raindrop","black_king_bar","blink","hurricane_pike","monkey_king_bar","ultimate_scepter"],
					core:	["power_treads","dragon_lance","yasha","skadi"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"dragon_lance":	"Can be disassembled.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"blink":	"To close the gap.",
			"hurricane_pike":	"To disengage from heroes like Slark and Troll.",
			"monkey_king_bar":	"Against evasion.",
			"ultimate_scepter":	"For extra control."
		}
	},
	"Tidehunter": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804619,
				abilities: [
					"tidehunter_anchor_smash",	// 1
					"tidehunter_gush",	// 2
					"tidehunter_anchor_smash",	// 3
					"tidehunter_kraken_shell",	// 4
					"tidehunter_anchor_smash",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","ring_of_protection","enchanted_mango","flask","gauntlets","faerie_fire","magic_stick"],
					early_game:	["soul_ring","boots","phase_boots","magic_wand","arcane_boots"],
					mid_game:	["hood_of_defiance","blink","ultimate_scepter","ghost","solar_crest","helm_of_the_dominator"],
					late_game:	["refresher","arcane_blink","shivas_guard","vladmir"],
					situational:	["pipe","heavens_halberd","lotus_orb","aghanims_shard"],
					core:	["blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"aghanims_shard":	"For right-click build and to take buildings faster."
		}
	},
	"Timbersaw": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804634,
				abilities: [
					"shredder_whirling_death",	// 1
					"shredder_reactive_armor",	// 2
					"shredder_reactive_armor",	// 3
					"shredder_timber_chain",	// 4
					"shredder_reactive_armor",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","ring_of_protection","flask","enchanted_mango","branches","gauntlets","faerie_fire","magic_stick"],
					early_game:	["soul_ring","arcane_boots","magic_wand","bracer","vanguard"],
					mid_game:	["hood_of_defiance","cyclone","sange","kaya_and_sange","aghanims_shard","kaya","eternal_shroud"],
					late_game:	["bloodstone","sheepstick","shivas_guard"],
					situational:	["pipe","heavens_halberd","lotus_orb","black_king_bar","blink"],
					core:	["soul_ring","arcane_boots","hood_of_defiance","cyclone","sange","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"blink":	"To close the gap quickly."
		}
	},
	"Tinker": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804644,
				abilities: [
					"tinker_heat_seeking_missile",	// 1
					"tinker_laser",	// 2
					"tinker_heat_seeking_missile",	// 3
					"tinker_laser",	// 4
					"tinker_heat_seeking_missile",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","branches","circlet","ward_observer"],
					early_game:	["bottle","soul_ring","null_talisman","blink"],
					mid_game:	["ultimate_scepter","shivas_guard","overwhelming_blink","aether_lens","kaya","bloodstone","ghost","dagon"],
					late_game:	["sheepstick","aeon_disk","ethereal_blade"],
					situational:	["infused_raindrop","black_king_bar","aghanims_shard"],
					core:	["soul_ring","blink","ultimate_scepter"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"overwhelming_blink":	"Along with Shiva's Guard for waveclear and AoE damage.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"aghanims_shard":	"For extra AoE damage although Shiva's Guard and Overwhelming Blink are usually better."
		}
	},
	"Tiny": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804671,
				abilities: [
					"tiny_tree_grab",	// 1
					"tiny_avalanche",	// 2
					"tiny_avalanche",	// 3
					"tiny_avalanche",	// 4
					"tiny_toss",	// 5
					"tiny_avalanche",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","faerie_fire","branches","boots","ward_observer","ward_sentry","magic_stick"],
					early_game:	["bottle","boots","phase_boots","magic_wand","power_treads","tranquil_boots","soul_ring"],
					mid_game:	["blink","echo_sabre","lesser_crit","aghanims_shard","ghost","cyclone","veil_of_discord","invis_sword","force_staff"],
					late_game:	["greater_crit","assault","ethereal_blade","overwhelming_blink","moon_shard","aeon_disk"],
					situational:	["hand_of_midas","black_king_bar","lotus_orb","ultimate_scepter"],
					core:	["blink","echo_sabre","lesser_crit","cyclone"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"boots":	"For support Tiny.",
			"ward_sentry":	"For support Tiny to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"For midlane Tiny.",
			"phase_boots":	"For midlane Tiny.",
			"power_treads":	"For midlane Tiny.",
			"tranquil_boots":	"For support Tiny.",
			"echo_sabre":	"For midlane Tiny. Can be disassembled.",
			"lesser_crit":	"For midlane Tiny.",
			"aghanims_shard":	"For midlane Tiny.",
			"cyclone":	"For support Tiny.",
			"veil_of_discord":	"For support Tiny.",
			"invis_sword":	"For midlane Tiny.",
			"assault":	"For midlane Tiny.",
			"overwhelming_blink":	"For support Tiny.",
			"moon_shard":	"For midlane Tiny.",
			"aeon_disk":	"For support Tiny.",
			"hand_of_midas":	"For midlane Tiny if you can get it early.",
			"black_king_bar":	"For midlane Tiny against disables, magical damage and as a dispel.",
			"lotus_orb":	"For support Tiny to reflect, dispel and armor.",
			"ultimate_scepter":	"For midlane Tiny for additional AoE damage."
		}
	},
	"Treant Protector": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804657,
				abilities: [
					"treant_natures_grasp",	// 1
					"treant_leech_seed",	// 2
					"treant_natures_grasp",	// 3
					"treant_living_armor",	// 4
					"treant_natures_grasp",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","orb_of_venom","faerie_fire","boots","enchanted_mango","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","arcane_boots","magic_wand","ring_of_basilius"],
					mid_game:	["holy_locket","blink","aghanims_shard","force_staff","solar_crest","meteor_hammer","glimmer_cape","veil_of_discord","mekansm"],
					late_game:	["ultimate_scepter","aeon_disk","refresher","sheepstick"],
					situational:	["infused_raindrop","lotus_orb"],
					core:	["holy_locket","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"On hero against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Troll Warlord": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804682,
				abilities: [
					"troll_warlord_whirling_axes_ranged",	// 1
					"troll_warlord_berserkers_rage",	// 2
					"troll_warlord_fervor",	// 3
					"troll_warlord_whirling_axes_ranged",	// 4
					"troll_warlord_whirling_axes_ranged",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","slippers","circlet","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","phase_boots","magic_wand","power_treads","wraith_band"],
					mid_game:	["bfury","maelstrom","sange_and_yasha","basher","diffusal_blade"],
					late_game:	["satanic","skadi","abyssal_blade","butterfly","moon_shard"],
					situational:	["infused_raindrop","black_king_bar","blink","ultimate_scepter","monkey_king_bar","sphere"],
					core:	["sange_and_yasha","basher"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"On hero against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"blink":	"To close the gap.",
			"ultimate_scepter":	"If there is a need for a dispel.",
			"monkey_king_bar":	"Against evasion.",
			"sphere":	"Against powerful single target disables and damage burst."
		}
	},
	"Tusk": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804698,
				abilities: [
					"tusk_tag_team",	// 1
					"tusk_ice_shards",	// 2
					"tusk_tag_team",	// 3
					"tusk_snowball",	// 4
					"tusk_tag_team",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","boots","flask","faerie_fire","enchanted_mango","orb_of_venom","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["tranquil_boots","magic_wand","power_treads","urn_of_shadows","orb_of_corrosion","phase_boots"],
					mid_game:	["blink","force_staff","solar_crest","ghost","hood_of_defiance","falcon_blade","cyclone"],
					late_game:	["aeon_disk","ultimate_scepter"],
					situational:	["infused_raindrop","spirit_vessel","ancient_janggo","lotus_orb","pipe","aghanims_shard"],
					core:	["blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"infused_raindrop":	"Against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"ancient_janggo":	"If you are grouping up a lot as a team in midgame and if you have summons.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"aghanims_shard":	"For extra control and vision."
		}
	},
	"Underlord": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804708,
				abilities: [
					"abyssal_underlord_firestorm",	// 1
					"abyssal_underlord_atrophy_aura",	// 2
					"abyssal_underlord_firestorm",	// 3
					"abyssal_underlord_pit_of_malice",	// 4
					"abyssal_underlord_firestorm",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","gauntlets","branches","flask","enchanted_mango","ring_of_protection","faerie_fire","magic_stick"],
					early_game:	["soul_ring","boots","magic_wand","phase_boots","arcane_boots","vanguard"],
					mid_game:	["rod_of_atos","hood_of_defiance","force_staff","mekansm","guardian_greaves","aghanims_shard"],
					late_game:	["shivas_guard","assault","octarine_core"],
					situational:	["pipe","heavens_halberd","crimson_guard","lotus_orb","black_king_bar"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"crimson_guard":	"Against fast attacking right-clickers, illusions and summons.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"black_king_bar":	"Against disables, magical damage and as a dispel."
		}
	},
	"Undying": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804718,
				abilities: [
					"undying_decay",	// 1
					"undying_soul_rip",	// 2
					"undying_soul_rip",	// 3
					"undying_tombstone",	// 4
					"undying_soul_rip",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","enchanted_mango","flask","boots","orb_of_venom","wind_lace","branches","faerie_fire","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","magic_wand","tranquil_boots","arcane_boots","ring_of_basilius"],
					mid_game:	["holy_locket","glimmer_cape","mekansm","force_staff","solar_crest","aghanims_shard","ghost"],
					late_game:	["aeon_disk","ultimate_scepter","vladmir"],
					situational:	["infused_raindrop","lotus_orb"],
					core:	["holy_locket"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"ultimate_scepter":	"Works well with Aghanim's Shard.",
			"infused_raindrop":	"Against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Ursa": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804726,
				abilities: [
					"ursa_fury_swipes",	// 1
					"ursa_earthshock",	// 2
					"ursa_fury_swipes",	// 3
					"ursa_overpower",	// 4
					"ursa_fury_swipes",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","faerie_fire","slippers","orb_of_venom","magic_stick"],
					early_game:	["boots","phase_boots","magic_wand","power_treads","orb_of_corrosion","wraith_band"],
					mid_game:	["diffusal_blade","blink","basher","sange_and_yasha","aghanims_shard","bfury"],
					late_game:	["abyssal_blade","swift_blink","satanic"],
					situational:	["infused_raindrop","black_king_bar","monkey_king_bar","nullifier","ultimate_scepter"],
					core:	["blink","basher","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"orb_of_venom":	"If you can pressure on the lane.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"infused_raindrop":	"Against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive items and spells.",
			"ultimate_scepter":	"Against long lasting disables."
		}
	},
	"Vengeful Spirit": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804736,
				abilities: [
					"vengefulspirit_magic_missile",	// 1
					"vengefulspirit_wave_of_terror",	// 2
					"vengefulspirit_magic_missile",	// 3
					"vengefulspirit_wave_of_terror",	// 4
					"vengefulspirit_magic_missile",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","faerie_fire","enchanted_mango","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","magic_wand","ring_of_basilius","urn_of_shadows","power_treads","arcane_boots"],
					mid_game:	["solar_crest","force_staff","ghost","glimmer_cape","vladmir","aether_lens"],
					late_game:	["aeon_disk","ultimate_scepter"],
					situational:	["infused_raindrop","blink","lotus_orb"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"aeon_disk":	"Doesn't go well with Aghanim's Scepter.",
			"infused_raindrop":	"Against magical burst.",
			"blink":	"To get in position to save an ally or swap in an enemy.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Venomancer": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804752,
				abilities: [
					"venomancer_poison_sting",	// 1
					"venomancer_venomous_gale",	// 2
					"venomancer_poison_sting",	// 3
					"venomancer_venomous_gale",	// 4
					"venomancer_plague_ward",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","faerie_fire","branches","flask","quelling_blade","enchanted_mango","boots","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","magic_wand","tranquil_boots","urn_of_shadows","arcane_boots","ring_of_basilius"],
					mid_game:	["hood_of_defiance","aghanims_shard","ultimate_scepter","blink","aether_lens","force_staff","mekansm","solar_crest","guardian_greaves","glimmer_cape","ghost"],
					late_game:	["aeon_disk","octarine_core","sheepstick"],
					situational:	["infused_raindrop","spirit_vessel","pipe","heavens_halberd","black_king_bar"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"boots":	"For support Venomancer.",
			"ward_observer":	"For support Venomancer.",
			"ward_sentry":	"For support Venomancer to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"tranquil_boots":	"Mainly for support Venomancer.",
			"ring_of_basilius":	"For support Venomancer if your laning partner uses a lot of mana early.",
			"glimmer_cape":	"For support Venomancer.",
			"octarine_core":	"For offlane Venomancer.",
			"infused_raindrop":	"Against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"heavens_halberd":	"For offlane Venomancer especially good against ranged right-clickers.",
			"black_king_bar":	"For offlane Venomancer against disables, magical damage and as a dispel."
		}
	},
	"Viper": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804761,
				abilities: [
					"viper_nethertoxin",	// 1
					"viper_poison_attack",	// 2
					"viper_poison_attack",	// 3
					"viper_corrosive_skin",	// 4
					"viper_poison_attack",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","enchanted_mango","branches","faerie_fire","flask","ring_of_protection","slippers","ward_observer","magic_stick"],
					early_game:	["bottle","boots","magic_wand","travel_boots","urn_of_shadows","power_treads","wraith_band"],
					mid_game:	["rod_of_atos","dragon_lance","hurricane_pike","hood_of_defiance","force_staff","ultimate_scepter","ghost"],
					late_game:	["assault","skadi","aeon_disk","butterfly","ethereal_blade"],
					situational:	["infused_raindrop","spirit_vessel","black_king_bar","blink","heavens_halberd","monkey_king_bar"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_observer":	"For midlane Viper.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"For midlane Viper.",
			"urn_of_shadows":	"For offlane Viper.",
			"infused_raindrop":	"Against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"blink":	"For extra mobility.",
			"heavens_halberd":	"For offlane Viper especially good against ranged right-clickers.",
			"monkey_king_bar":	"Against evasion."
		}
	},
	"Visage": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804769,
				abilities: [
					"visage_grave_chill",	// 1
					"visage_gravekeepers_cloak",	// 2
					"visage_grave_chill",	// 3
					"visage_soul_assumption",	// 4
					"visage_grave_chill",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","blight_stone","mantle","circlet","faerie_fire","enchanted_mango","flask","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","tranquil_boots","arcane_boots","magic_wand","null_talisman","medallion_of_courage","phase_boots","bracer","bottle","ring_of_basilius"],
					mid_game:	["orchid","ultimate_scepter","aether_lens","solar_crest","vladmir","glimmer_cape","hood_of_defiance","travel_boots"],
					late_game:	["sheepstick","assault","octarine_core","heart","shivas_guard"],
					situational:	["infused_raindrop","hand_of_midas","aghanims_shard","black_king_bar","pipe"],
					core:	["orchid","ultimate_scepter","solar_crest"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"enchanted_mango":	"For support Visage.",
			"flask":	"For support Visage.",
			"ward_sentry":	"For support Visage to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"bottle":	"For midlane Visage.",
			"ring_of_basilius":	"For support Visage if your laning partner uses a lot of mana early.",
			"orchid":	"For midlane Visage.",
			"ultimate_scepter":	"For midlane Visage.",
			"aether_lens":	"For midlane Visage.",
			"solar_crest":	"For support Visage it is core.",
			"vladmir":	"For support Visage.",
			"glimmer_cape":	"For support Visage.",
			"octarine_core":	"For midlane Visage.",
			"heart":	"For midlane Visage.",
			"shivas_guard":	"For midlane Visage.",
			"infused_raindrop":	"Against magical burst.",
			"hand_of_midas":	"For midlane Visage if you can get it early.",
			"aghanims_shard":	"For extra survivability.",
			"black_king_bar":	"For midlane Visage against disables, magical damage and as a dispel.",
			"pipe":	"For support Visage."
		}
	},
	"Void Spirit": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804780,
				abilities: [
					"void_spirit_resonant_pulse",	// 1
					"void_spirit_aether_remnant",	// 2
					"void_spirit_resonant_pulse",	// 3
					"void_spirit_dissimilate",	// 4
					"void_spirit_resonant_pulse",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","faerie_fire","branches","circlet","ward_observer","magic_stick"],
					early_game:	["bottle","null_talisman","boots","phase_boots","magic_wand","power_treads"],
					mid_game:	["cyclone","ultimate_scepter","kaya_and_sange","aether_lens","travel_boots","desolator","echo_sabre","witch_blade","orchid"],
					late_game:	["aeon_disk","shivas_guard","sheepstick"],
					situational:	["infused_raindrop","aghanims_shard","ultimate_scepter","black_king_bar","sphere"],
					core:	["cyclone","ultimate_scepter"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"echo_sabre":	"Can be disassembled.",
			"infused_raindrop":	"Against magical burst.",
			"aghanims_shard":	"For extra mobility.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"sphere":	"Against powerful single target disables and damage burst."
		}
	},
	"Warlock": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804789,
				abilities: [
					"warlock_shadow_word",	// 1
					"warlock_fatal_bonds",	// 2
					"warlock_shadow_word",	// 3
					"warlock_fatal_bonds",	// 4
					"warlock_fatal_bonds",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","enchanted_mango","sobi_mask","flask","clarity","faerie_fire","ring_of_basilius","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","arcane_boots","magic_wand","tranquil_boots","urn_of_shadows"],
					mid_game:	["holy_locket","aghanims_shard","force_staff","glimmer_cape","ghost","veil_of_discord","solar_crest"],
					late_game:	["aeon_disk","ultimate_scepter","refresher"],
					situational:	["infused_raindrop","lotus_orb"],
					core:	["holy_locket","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"Against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Weaver": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804801,
				abilities: [
					"weaver_shukuchi",	// 1
					"weaver_geminate_attack",	// 2
					"weaver_shukuchi",	// 3
					"weaver_the_swarm",	// 4
					"weaver_shukuchi",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","slippers","circlet","branches","faerie_fire","magic_stick"],
					early_game:	["magic_wand","power_treads","wraith_band","falcon_blade"],
					mid_game:	["maelstrom","sange_and_yasha","lesser_crit","dragon_lance","diffusal_blade","rod_of_atos"],
					late_game:	["greater_crit","satanic","skadi","butterfly"],
					situational:	["infused_raindrop","black_king_bar","aghanims_shard","monkey_king_bar","nullifier","sphere"],
					core:	["power_treads","maelstrom"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"dragon_lance":	"Can be disassembled.",
			"infused_raindrop":	"Against magical burst.",
			"black_king_bar":	"Against disables, magical damage and as a dispel.",
			"aghanims_shard":	"Against invisible heroes.",
			"monkey_king_bar":	"Against evasion.",
			"nullifier":	"To dispel defensive items and spells.",
			"sphere":	"Against powerful single target disables and damage burst."
		}
	},
	"Windranger": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804812,
				abilities: [
					"windrunner_windrun",	// 1
					"windrunner_shackleshot",	// 2
					"windrunner_powershot",	// 3
					"windrunner_powershot",	// 4
					"windrunner_powershot",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","faerie_fire","circlet","flask","branches","blight_stone","mantle","enchanted_mango","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","boots","magic_wand","tranquil_boots","null_talisman","urn_of_shadows","ring_of_basilius","arcane_boots","power_treads"],
					mid_game:	["maelstrom","blink","aghanims_shard","travel_boots","monkey_king_bar","lesser_crit","force_staff","aether_lens","cyclone","meteor_hammer","orchid"],
					late_game:	["greater_crit","aeon_disk","ultimate_scepter","octarine_core","arcane_blink","satanic"],
					situational:	["infused_raindrop","black_king_bar","lotus_orb","nullifier","sphere"],
					core:	["maelstrom","blink"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"For support Windranger to block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"boots":	"For midlane Windranger.",
			"tranquil_boots":	"For support Windranger.",
			"ring_of_basilius":	"For support Windranger if your laning partner uses a lot of mana early.",
			"power_treads":	"For midlane Windranger.",
			"aghanims_shard":	"For support Windranger.",
			"travel_boots":	"For midlane Windranger.",
			"lesser_crit":	"For midlane Windranger.",
			"force_staff":	"For support Windranger.",
			"aether_lens":	"For support Windranger.",
			"cyclone":	"For support Windranger.",
			"meteor_hammer":	"For support Windranger.",
			"orchid":	"For midlane Windranger.",
			"greater_crit":	"For midlane Windranger.",
			"ultimate_scepter":	"For midlane Windranger.",
			"satanic":	"For midlane Windranger.",
			"infused_raindrop":	"Against magical burst.",
			"black_king_bar":	"To be able to channel Focus Fire fully.",
			"lotus_orb":	"For support Windranger to reflect, dispel and armor.",
			"nullifier":	"For midlane Windranger to dispel defensive items and spells.",
			"sphere":	"For midlane Windranger against powerful single target disables and damage burst."
		}
	},
	"Winter Wyvern": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804822,
				abilities: [
					"winter_wyvern_arctic_burn",	// 1
					"winter_wyvern_splinter_blast",	// 2
					"winter_wyvern_splinter_blast",	// 3
					"winter_wyvern_cold_embrace",	// 4
					"winter_wyvern_splinter_blast",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","enchanted_mango","faerie_fire","clarity","branches","sobi_mask","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","arcane_boots","tranquil_boots","magic_wand","ring_of_basilius","null_talisman"],
					mid_game:	["holy_locket","blink","aghanims_shard","glimmer_cape","aether_lens","force_staff","orchid","witch_blade","ghost"],
					late_game:	["aeon_disk","octarine_core","ultimate_scepter"],
					situational:	["infused_raindrop","lotus_orb"],
					core:	["holy_locket","blink","aghanims_shard"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"orchid":	"Goes well with Witch Blade and Aghanim's Scepter.",
			"witch_blade":	"Goes well with Orchid Malevolence and Aghanim's Scepter.",
			"ultimate_scepter":	"Goes well with Witch Blade and Orchid Malevolence.",
			"infused_raindrop":	"Against magical burst.",
			"lotus_orb":	"To reflect, dispel and armor."
		}
	},
	"Witch Doctor": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804830,
				abilities: [
					"witch_doctor_paralyzing_cask",	// 1
					"witch_doctor_maledict",	// 2
					"witch_doctor_maledict",	// 3
					"witch_doctor_paralyzing_cask",	// 4
					"witch_doctor_maledict",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","flask","enchanted_mango","faerie_fire","branches","ward_observer","ward_sentry","magic_stick"],
					early_game:	["boots","magic_wand","arcane_boots","tranquil_boots","ring_of_basilius","null_talisman"],
					mid_game:	["holy_locket","glimmer_cape","aghanims_shard","solar_crest","force_staff","ghost","aether_lens"],
					late_game:	["aeon_disk","ultimate_scepter","octarine_core"],
					situational:	["infused_raindrop","spirit_vessel","blink","lotus_orb","black_king_bar"],
					core:	[],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"ward_sentry":	"To block or unblock the pull camp.",
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"ring_of_basilius":	"If your laning partner uses a lot of mana early.",
			"infused_raindrop":	"Against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup and to increase the damage of Maledict.",
			"blink":	"For extra mobility to get your spells off.",
			"lotus_orb":	"To reflect, dispel and armor.",
			"black_king_bar":	"To be able to channel Death Ward fully. Goes well with Aghanim's Scepter."
		}
	},
	"Wraith King": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804840,
				abilities: [
					"skeleton_king_hellfire_blast",	// 1
					"skeleton_king_mortal_strike",	// 2
					"skeleton_king_vampiric_aura",	// 3
					"skeleton_king_vampiric_aura",	// 4
					"skeleton_king_vampiric_aura",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","quelling_blade","branches","faerie_fire","gauntlets","circlet","ring_of_protection","magic_stick"],
					early_game:	["phase_boots","magic_wand","bracer"],
					mid_game:	["armlet","radiance","sange","sange_and_yasha","blink","desolator","basher"],
					late_game:	["assault","swift_blink","overwhelming_blink","abyssal_blade","moon_shard"],
					situational:	["hand_of_midas","heavens_halberd","aghanims_shard","monkey_king_bar"],
					core:	["phase_boots","armlet","sange","blink","assault"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"swift_blink":	"For single target burst.",
			"overwhelming_blink":	"For AoE damage and tankiness.",
			"hand_of_midas":	"If you can get it early.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"aghanims_shard":	"If opponents have mana burn.",
			"monkey_king_bar":	"Against evasion."
		}
	},
	"Zeus": {
		builds: [
			{
				roles: [],
				steam_guide_id: 1640804850,
				abilities: [
					"zuus_arc_lightning",	// 1
					"zuus_static_field",	// 2
					"zuus_arc_lightning",	// 3
					"zuus_lightning_bolt",	// 4
					"zuus_arc_lightning",	// 5
					"",	// 6
					"",	// 7
					"",	// 8
					"",	// 9
					"",	// 10
					"",	// 11
					"",	// 12
					"",	// 13
					"",	// 14
					"",	// 15
					"",	// 16
					"",	// 17
					"",	// 18
					"",	// 19
					"",	// 20
					"",	// 21
					"",	// 22
					"",	// 23
					"",	// 24
					""	// 25
				],
				items: {
					starting:	["tango","circlet","branches","faerie_fire","mantle","ward_observer","magic_stick"],
					early_game:	["bottle","null_talisman","boots","arcane_boots","magic_wand"],
					mid_game:	["aether_lens","ultimate_scepter","kaya","travel_boots","ghost","cyclone"],
					late_game:	["octarine_core","refresher","bloodstone","aeon_disk"],
					situational:	["infused_raindrop","blink","aghanims_shard"],
					core:	["arcane_boots","aether_lens","ultimate_scepter","kaya"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"infused_raindrop":	"Against magical burst.",
			"blink":	"For extra mobility.",
			"aghanims_shard":	"For extra mobility."
		}
	}*/
};
