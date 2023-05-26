/**
 * heroBuilds.ts contains the ability and items builds for all Dota 2 heroes. This infromation is used across Dota Caoch, i.e. in the app, on the website and in the in-game guides.
 *
 * Note that each hero can have several builds.
 *
 * Rules for abilities:
 *     - Each build needs to provide the fist 25 abilities to be skilled
 *     - The ability "special_bonus_attributes" should be used to skill attributes
 *
 * Consistency requirements:
 *     - Each ability needs to exist in the file 'dota2Abilits.json'
 *     - Each item needs to exist in the file 'dota2Items.json'
 *
 * Attention:
 *     - Steam guides can't have the character "'". Instead we need to use "`"
 * 	   - The order of the talent build needs to be 10, 15, 20 and then 25. Any other order will cause the guide to fail in Dota 2
 *
 * Storage of steam guide files on PC:
 *   - C:\Program Files (x86)\Steam\userdata\361606936\570\remote\guides
 *   - D:\Program Files (x86)\Steam\userdata\361606936\570\remote\guides
 *
 * Copyright (C) Dota Coach, 2023. All rights reserved.
 */
import {
  DOTA_COACH_GUIDE_ROLE,
  STEAM_GUIDE_ROLE,
  getRolesString,
} from "./playerRoles";

export enum ContentCreator {
  //TBD = "TBD",
  //ZoGraF = "ZoGraF",
  //AlexDota = "AlexDota",
  TNTCNz = "TNTCNz",
  YoonA = "YoonA",
  eidandota = "eidandota",
  //yongy146 = "yongy146",
}

// Links provided by content creators to promote their own brand and activites
export const ContentCreatorLinks: Record<ContentCreator, IContentCreatorLink> =
  {
    /*TBD: {
    image: "https://i.imgur.com/QZzNRhz.png",
    text: "This guide was written by 9k Professional Coach ZoGraF.",
    link_http: "https://www.gamersensei.com/senseis/zograf",
    link_text: "Click here to be coached by him.",
  },

  /*  AlexDota: {
    image: "https://i.imgur.com/QZzNRhz.png", // Create imgur file ...
    text: "This guide was written by 10k Professional Player AlexDota.",
    link_http: "https://www.gamersensei.com/senseis/alexxo",
    link_text: "Click here to be coached by him.",
  },*/
    eidandota: {
      image: "https://i.imgur.com/BLWOWSp.jpg",
      text: "This guide was written by 8k MMR player and coach eidandota.",
      link_http: "https://www.fiverr.com/share/ywVQ5V",
      link_text: "Click here to book a coaching session with eidandota.",
    },
    TNTCNz: {
      image: "https://i.imgur.com/MvM6s5B.jpeg",
      text: "This guide was written by 8k MMR player TNTCN.",
      link_http: "https://www.gamersensei.com/senseis/tntcn",
      link_text: "Click here to book a coaching session with him.",
    },
    YoonA: {
      image: "https://i.imgur.com/TZpRwOK.jpeg",
      text: "This guide was written by Hammad.",
      //link_http: "https://www.fiverr.com/share/k0bmRk",
      link_http: "https://skelly.gg/g/12747",
      link_text: "Click here to book a coaching session with him.",
    },
    /*ZoGraF: {
    image: "https://i.imgur.com/QZzNRhz.png",
    text: "This guide was written by 9k Professional Coach ZoGraF.",
    link_http: "https://www.gamersensei.com/senseis/zograf",
    link_text: "Click here to be coached by him.",
  },*/
  };

export interface IContentCreatorLink {
  image: string;
  text: string;
  link_http: string;
  link_text: string;
}

export enum DamageType {
  neutral = "neutral", // Combination of physcal, magical and pure
  physical = "physical",
  magical = "magical",
  pure = "pure",
}

/**
 * Data structure for the hero builds of a given hero
 *
 *
 *
 */
export interface HeroContent {
  creator: ContentCreator; // Owner of the guide (e.g. AlexDota)
  gameplay_version: string; // E.g. 7.30e or 7.31. This should only be updated once the guide is ready to be published
  damage_type: DamageType;
  builds: HeroBuild[]; // The first build is seen as the "standard build" by the app
  ability_tooltips?: Tooltips; // Ability tooltips valid for all builds of the hero
  item_tooltips?: Tooltips; // Item tooltips valid for all builds of the hero
  combo: string[]; // Main spell, item and "attack" combo for the hero ; this combo is shown in the app (infoboxes) and in the dota guides ; use the same keywords as for ability builds and item buids - on top of that you can also use the word "attack" for right-clicking
  counter_items: {
    laning_phase: CounterItems;
    mid_game: CounterItems;
    late_game: CounterItems;
  };
}

/**
 * Data structure for each hero build
 *
 */
export interface HeroBuild {
  roles: DOTA_COACH_GUIDE_ROLE[]; // These roles are used in the Dota Coach App and in title of Steam Guide
  type?: string; // Type currently only used for invoker mid (QW & QE)
  steam_guide_link: string; // Link to web buids
  steam_guide_role?: STEAM_GUIDE_ROLE; // Role used to classify steam guides (this role is displayed in yellow in Dota 2). Available values are: Core, Offlane, Support, Jungle, Initiator, Roamer. If there is no value proivded, then it there is no role shown in Dota 2
  abilities: string[];
  ability_tooltips?: Tooltips;
  items: ItemBuild;
  item_tooltips?: Tooltips; // Item tooltips specifc to this hero build
  combo?: string[]; // Combo specific to this hero build
}

/**
 *
 * @param heroBuild
 * @returns Returns name of role (e.g. "Mid QW" for Invoker)
 */
export function getRoleName(heroBuild: HeroBuild): string {
  return `${getRolesString(heroBuild)}${
    Object.prototype.hasOwnProperty.call(heroBuild, "type")
      ? " " + heroBuild.type
      : ""
  }`;
}

export interface ItemBuild {
  // Total costs for starting & starting_bear should be below 600. If the are below 550, then there needs to be a good reason why not all gold is used
  starting: string[];
  starting_bear?: string[];
  early_game?: string[]; // provided for all heroes, except for Lone Druid
  mid_game?: string[]; // provided for all heroes, except for Lone Druid
  late_game?: string[]; // provided for all heroes, except for Lone Druid
  situational: string[];
  situational_bear?: string[];
  core: string[]; // selected items from starting, early_game, mid_game, late_game and situational ; except for Lone Druid
  core_bear?: string[];
  neutral: string[];
  neutral_bear?: string[];
}

/**
 * Tooltip for abilities and items
 *
 */
export interface Tooltips {
  [key: string]: string;
}

/**
 *
 */
export interface CounterItems {
  all: CounterItem[]; // Items relevant for all players
  support: CounterItem[]; // Items only relevant for support players
  core: CounterItem[]; // Items only relevant for core players
}

export interface CounterItem {
  item: string; // Name of item, as in dota2Items.json, but without prefix `item_`. Special names added by Dota Coach are: "armor", "magicResistance" and "statusResistance"
  info?: string; // Optional info to be displayed on webpage and in the app
}

/**
 * Function returns the tooltip for an item (it checks the hero build as well as the hero)
 *
 * @param heroContent
 * @param heroBuild
 * @param item
 * @return Tooltip string or null, if there is no tooltip
 */
export function getItemTooltip(
  heroContent: HeroContent,
  heroBuild: HeroBuild,
  item: string
): string | null {
  if (
    heroBuild.item_tooltips != undefined &&
    heroBuild.item_tooltips.item != undefined
  ) {
    return heroBuild.item_tooltips[item];
  }
  if (
    heroContent.item_tooltips != undefined &&
    heroContent.item_tooltips.item != undefined
  ) {
    return heroContent.item_tooltips[item];
  }
  return null; // There is no tooltip for the item
}

/**
 * Function returns the tooltip for an ability (it checks the hero build as well as the hero)
 *
 * @param heroBuilds
 * @param heroBuild
 * @param item
 * @return Tooltip string or null, if there is no tooltip
 */
export function getAbilityTooltip(
  heroContent: HeroContent,
  heroBuild: HeroBuild,
  ability: string
): string | null {
  if (
    heroBuild.ability_tooltips != undefined &&
    heroBuild.ability_tooltips.ability != undefined
  ) {
    return heroBuild.ability_tooltips[ability];
  }
  if (
    heroContent.ability_tooltips != undefined &&
    heroContent.ability_tooltips.ability != undefined
  ) {
    return heroContent.ability_tooltips[ability];
  }
  return null; // There is no tooltip for the item
}

/**
 * Function returns if item is core for this build
 *
 * @param heroName
 * @param heroBuild
 * @param item
 */
export function isCoreItem(heroBuild: HeroBuild, item: string): boolean {
  for (const coreItem of heroBuild.items.core) {
    if (coreItem == item) return true;
  }
  return false;
  // HOW TO TREAT CASE OF BEAR  / LONE DRUID, TO BE IMPLEMENTED
}

export const heroBuilds: { [key: string]: HeroContent } = {
  // YoonA plays hero
  Abaddon: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698376898",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "abaddon_aphotic_shield",
          "abaddon_frostmourne" /* equals to `curse of avernus` */,
          `abaddon_aphotic_shield`,
          `abaddon_death_coil`,
          "abaddon_aphotic_shield",
          "abaddon_borrowed_time",
          "abaddon_aphotic_shield",
          "abaddon_death_coil",
          "abaddon_death_coil",
          `abaddon_death_coil`,
          `special_bonus_strength_8`,
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
            `blood_grenade`,
            "enchanted_mango",
            `orb_of_venom`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `boots_of_bearing`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            "ultimate_scepter",
            `lotus_orb`,
            `pipe`,
            `overwhelming_blink`,
          ],
          situational: [
            `ring_of_basilius`,
            `solar_crest`,
            `holy_locket`,
            `ghost`,
            `spirit_vessel`,
            `heavens_halberd`,
            `guardian_greaves`,
            `aether_lens`,
            `crimson_guard`,
            `blade_mail`,
            `wind_waker`,
            "aghanims_shard",
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `pavise`,
            `boots_of_bearing`,
            `force_staff`,
            "ultimate_scepter",
          ],
          neutral: [
            `faded_broach`,
            `unstable_wand`,
            `pupils_gift`,
            `dragon_scale`,
            `ogre_seal_totem`,
            `quickening_charm`,
            "spy_gadget",
            `martyrs_plate`,
            "force_field",
            `giants_ring`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2971195954",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "abaddon_aphotic_shield",
          "abaddon_frostmourne" /* equals to `curse of avernus` */,
          `abaddon_aphotic_shield`,
          `abaddon_frostmourne`,
          "abaddon_aphotic_shield",
          "abaddon_borrowed_time",
          "abaddon_aphotic_shield",
          `abaddon_frostmourne`,
          `abaddon_frostmourne`,
          `special_bonus_strength_8`,
          `abaddon_death_coil`,
          "abaddon_borrowed_time",
          `abaddon_death_coil`,
          `abaddon_death_coil`,
          `special_bonus_attack_damage_65`,
          `abaddon_death_coil`,
          "special_bonus_attributes",
          "abaddon_borrowed_time",
          "special_bonus_attributes",
          `special_bonus_unique_abaddon_immolation`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_abaddon_3`,
          //25 levels, no need for more than that as they are automatic afterwards
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`vanguard`, `echo_sabre`, `radiance`, `aghanims_shard`],
          late_game: [`blink`, `manta`, `harpoon`, `abyssal_blade`],
          situational: [
            `orb_of_venom`,
            `hand_of_midas`,
            `solar_crest`,
            `crimson_guard`,
            `pipe`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `vladmir`,
            `blade_mail`,
            `assault`,
            `monkey_king_bar`,
            `mjollnir`,
            `ultimate_scepter`,
            `lotus_orb`,
            `black_king_bar`,
            `overwhelming_blink`,
            `skadi`,
            `silver_edge`,
            `greater_crit`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `phase_boots`,
            `vanguard`,
            `echo_sabre`,
            `radiance`,
            `aghanims_shard`,
            `blink`,
            `manta`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `dragon_scale`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `mind_breaker`,
            `penta_edged_sword`,
            `apex`,
            `giants_ring`,
          ],
        },
      },
    ],
    ability_tooltips: {
      // Optional, used for Dota 2 Guides
      /* special_bonus_unique_abaddon:
        "If you have Aghanim`s Scepter or about to have it, take the other talent.", */
      // Question, should we have info for each build at each level, or the infos be generic to the skills / telents, and only showed with first build?
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      orb_of_venom: "Helps you chase enemy heroes to apply Curse of Avernus.",
      guardian_greaves: `An incredible aura item to buff your team and provide even more sustain. Buy Arcane Boots instead of Tranquil Boots if you plan to get Greaves.`,
      holy_locket: `A situational item to further increase your healing output. It provides a burst of healing and mana on cast as well.`,
      tranquil_boots: `A core boots upgrade to give you some much needed HP regen and movement speed.`,
      solar_crest: `A situational item to buff one of your right-clicking cores or to debuff the target your team is focusing.`,
      ultimate_scepter: `A situational item that can impact the fights greatly. Make sure to activate the ultimate when the most damage is being pumped into your allies.`,
      lotus_orb: "For reflect, dispel and armor.",
      // wraith_pact: `A core item that buffs the tankiness of your entire team.`,
      boots_of_bearing: `An incredible aura item that benefits you and your team for the attack and movement speed.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      vanguard: `A core item that makes you tanky and gives some much needed HP regen.`,
      echo_sabre: `A core item that boosts your right click damage while making you tanky. Builds into Harpoon later in the game.`,
      radiance: `A core item that boosts your right click damage and gives you evasion to fend off enemy right clickers.`,
      aghanims_shard: `A core item that boosts your damage output through Mist Coil.`,
      blink: `An incredible item on Abaddon that lets you close the gap on enemy heroes. You can also blink out while your ultimate is active since you take no damage during it.`,
      harpoon: `A core late game item for Abaddon that acts as another gap close on enemy heroes.`,
      abyssal_blade: `Gives you an added form of lockdown to hit enemy heroes freely.`,
      silver_edge: `A situational item when the break effect is useful against enemy heroes.`,
      manta: `An incredible item for Abaddon to boost attack speed, movement speed, and armor. Also gives him a form of dispel. Your Curse of Avernus also triggers from the illusions.`,
    },
    combo: [
      `abaddon_aphotic_shield`,
      //`solar_crest`,
      `attack`,
      `abaddon_death_coil`,
      `abaddon_aphotic_shield`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Abaddon protects himself and allies by casting Aphotic Shield and Mist Coil frequently",
          },
          { item: "blight_stone" },
          { item: "wind_lace", info: "Against a core Abaddon" },
          { item: "boots", info: "Against a core Abaddon" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
        // Comment for Alex: On the screen in the game only 5 items are shows, on the second screen there are 6. The items in the catrogy `all` are shonw first, then either `support` or `core`. Any additional items are discarded.
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          {
            item: "silver_edge",
            info: "Against a core Abaddon to disable Borrowed Time from activating passively",
          },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
          { item: "butterfly", info: "Against a core right-clicking Abaddon" },
        ],
      },
    },
  },

  // eidendota plays hero
  Alchemist: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377018",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_chemical_rage",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_5",
          "alchemist_chemical_rage",
          "alchemist_corrosive_weaponry",
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_7",
          "alchemist_corrosive_weaponry",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_8",
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
            "branches",
          ],
          early_game: [
            "ring_of_basilius",
            "bracer",
            "power_treads",
            "magic_wand",
            "radiance",
          ],
          mid_game: ["blink", "black_king_bar", "assault", "basher"],
          late_game: [
            "abyssal_blade",
            "overwhelming_blink",
            "satanic",
            "ultimate_scepter",
            "moon_shard",
            "bloodthorn",
          ],
          situational: [
            "silver_edge",
            "nullifier",
            "mjollnir",
            "monkey_king_bar",
            "aghanims_shard",
          ],
          core: [
            "power_treads",
            "radiance",
            "black_king_bar",
            "blink",
            "assault",
            "basher",
          ],
          neutral: [
            "broom_handle",
            //"misericorde",
            "duelist_gloves",
            //"dagger_of_ristul", Removed in 7.33
            "orb_of_destruction",
            "ring_of_aquila",
            "ogre_seal_totem",
            "titan_sliver",
            "penta_edged_sword",
            "ninja_gear",
            "pirate_hat",
            "desolator_2",
          ],
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling.",
          radiance:
            "A core item that you should try to finish before minute 12. If it is an early timing you can defend/fight for objectives with it.",
          blink:
            "A core item that allows you to channel Unstable Concoction, blink on the target and release the fully channeled stun.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730985550",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_chemical_rage",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_5",
          "alchemist_chemical_rage",
          "alchemist_corrosive_weaponry",
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_7",
          "alchemist_corrosive_weaponry",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_8",
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
            "branches",
            "branches",
            "faerie_fire",
            "ward_observer",
          ],
          early_game: ["bottle", "power_treads", "magic_wand", "radiance"],
          mid_game: ["blink", "black_king_bar", "assault", "basher"],
          late_game: [
            "abyssal_blade",
            "overwhelming_blink",
            "heart",
            "ultimate_scepter",
          ],
          situational: [
            "aghanims_shard",
            "mjollnir",
            "monkey_king_bar",
            "silver_edge",
            "nullifier",
          ],
          core: [
            "bottle",
            "power_treads",
            "radiance",
            "blink",
            "assault",
            "black_king_bar",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            "duelist_gloves",
            "orb_of_corrosion",
            "ring_of_aquila",
            "ogre_seal_totem",
            "titan_sliver",
            "penta_edged_sword",
            "ninja_gear",
            "pirate_hat",
            "desolator_2",
          ],
        },
        item_tooltips: {
          bottle: "A core item for sustain.",
          phase_boots:
            "A core boots upgrade that allows you to collect runes faster and fixes movement speed and armor issues that Alchemist has.",
        },
        ability_tooltips: {
          alchemist_acid_spray:
            "Consider skilling Acid Spray at level 1 against a tough match-up e.g. Queen Of Pain.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      radiance:
        "A core item that you should try to fight with when completed. In general, illusions are susceptible to magical damage more than to physical damage.",
      sange_and_yasha:
        "Situational. Get it if you need status resistance. eg. (Earthshaker)",
      blink:
        "A core item that allows you to channel Unstable Concoction, blink on the target and release the fully channeled stun.",
      black_king_bar:
        "A core item that allows you to deliver the damage while being in the middle of the fight.",
      aghanims_shard: "For extra dispel and buff.",
      ultimate_scepter:
        "To gift it to your teammates while at same time your receive a stacking buff for each Aghanim`s Scepter given away.",
      mjollnir: "Great against illusion-based heroes.",
      overwhelming_blink:
        "Against illusion-based heroes and to tank yourself up.",
      swift_blink:
        "For extra burst upon activation. Great when you are running out of slots to replace boots.",
      monkey_king_bar: "Against evasion and miss-chance.",
      silver_edge: "For burst, to reposition and break effect.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Alchemist`s Chemical Rage",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "ghost" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          {
            item: "desolator",
            info: "Alchemist has relatively low armor and armor gain, which makes him weak to Armor reducing items and abilities.",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [],
        core: [
          { item: "shivas_guard" },
          { item: "skadi" },
          { item: "assault" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  // YoonA plays hero
  "Ancient Apparition": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377158",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "ancient_apparition_chilling_touch",
          "ancient_apparition_cold_feet",
          `ancient_apparition_chilling_touch`,
          `ancient_apparition_cold_feet`,
          `ancient_apparition_ice_vortex`,
          "ancient_apparition_ice_blast",
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_ice_vortex`,
          "ancient_apparition_ice_vortex",
          `special_bonus_unique_ancient_apparition_7`,
          `ancient_apparition_chilling_touch`,
          "ancient_apparition_ice_blast",
          `ancient_apparition_chilling_touch`,
          `ancient_apparition_cold_feet`,
          "special_bonus_unique_ancient_apparition_3",
          `ancient_apparition_cold_feet`,
          "special_bonus_attributes",
          "ancient_apparition_ice_blast",
          "special_bonus_attributes",
          `special_bonus_unique_ancient_apparition_4`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_ancient_apparition_5",
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "wind_lace",
            `infused_raindrop`,
          ],
          mid_game: [`pavise`, `glimmer_cape`, `aghanims_shard`, `force_staff`],
          late_game: [
            `boots_of_bearing`,
            `ultimate_scepter`,
            `octarine_core`,
            `sheepstick`,
            `revenants_brooch`,
          ],
          situational: [
            `ring_of_basilius`,
            `urn_of_shadows`,
            `aether_lens`,
            `rod_of_atos`,
            `ethereal_blade`,
            `hurricane_pike`,
            `wind_waker`,
            `guardian_greaves`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `pavise`,
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          neutral: [
            `mysterious_hat`,
            `pogo_stick`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `quickening_charm`,
            `spy_gadget`,
            `timeless_relic`,
            "seer_stone",
            `pirate_hat`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_ancient_apparition_6: `You can take this talent over the recommended one if you are against mega creeps.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      urn_of_shadows: `Helps with mana regen and lets you snowball from the laning phase.`,
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade for mana sustain. Can build into Guardian Greaves or disassembled for Aether Lens.`,
      aghanims_shard: `A core item that gives you an added stun on Ice Blast.`,
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `An extremely late game item when you want to burst enemy heroes.`,
      revenants_brooch: `Goes well with the aghanims scepter in the very late game.`,
    },
    combo: [
      `ancient_apparition_ice_vortex`,
      `ancient_apparition_cold_feet`,
      `ancient_apparition_chilling_touch`,
      `ancient_apparition_ice_blast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "infused_raindrop",
            info: "Infused Raindrops allow you to offset magical damage coming from Ancient Apparition`s spells",
          },
          { item: "wind_lace", info: "To walk out of Cold Feet freeze range" },
          { item: "boots", info: "To walk out of Cold Feet freeze range" },
          {
            item: "cloak",
            info: "Ancient Apparition is heavy on magical damage and Cloak negates 15% of its",
          },
        ],
        support: [],
        core: [
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
        ],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  // eidendota plays hero
  "Anti-Mage": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377261",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "antimage_mana_break",
          "antimage_blink",
          "antimage_mana_break",
          "antimage_counterspell",
          "antimage_mana_break",
          "antimage_mana_void",
          "antimage_blink",
          "antimage_blink",
          "antimage_blink",
          "special_bonus_unique_antimage",
          "antimage_mana_break",
          "antimage_mana_void",
          "antimage_counterspell",
          "antimage_counterspell",
          "antimage_counterspell",
          "special_bonus_unique_antimage_7",
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
            "quelling_blade",
            "tango",
            "magic_stick",
            "circlet",
            "branches",
          ],
          early_game: ["cornucopia", "power_treads", "magic_wand"],
          mid_game: ["bfury", "manta", "basher"],
          late_game: [
            "skadi",
            "abyssal_blade",
            "satanic",
            "butterfly",
            "ultimate_scepter",
          ],
          situational: [
            "vanguard",
            "wraith_band",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "aghanims_shard",
            "assault",
          ],
          core: ["power_treads", "bfury", "manta", "abyssal_blade"],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            "ring_of_aquila",
            "pupils_gift",
            "vambrace",
            "titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            "penta_edged_sword",
            "mirror_shield",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      // For first level spell choice
      antimage_mana_break:
        "Try to hit the enemy as much as possible as early as possible in order to burn they're mana.",
      antimage_blink:
        "You can level this spell earlier if you need it to survive.",
      antimage_counterspell:
        "Skill Counterspell at level one if you expect to be harrassed by single-target magical-damage spells like Skywrath's Arcane Bolt.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit and chase down the opponents on the lane often.",
      ring_of_health: "To solve hp sustain issues.",
      power_treads:
        "Allows you to extract more value from Battle Fury due to attack speed.",
      orb_of_corrosion: "If you can pressure on the lane.",
      bfury:
        "A core items that solves sustain issues and allows you to farm insanely fast.",
      manta: "Allows you to burn the jumped target`s mana quickly.",
      skadi:
        "A core item that tanks you up and disallows opponents to run away. It reduces target`s healing significantly and especially good versus ranged heroes as it slows them by 50%.",
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
    combo: [
      `antimage_blink`,
      `abyssal_blade`,
      `manta`,
      `attack`,
      `antimage_mana_void`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "enchanted_mango",
            info: "Anti-Mage burns mana and Enchanted Mangoes will allow you to offset that",
          },
          {
            item: "arcane_boots",
            info: "Anti-Mage burns mana and Arcane Boots will allow you to offset that",
          },
        ],
        support: [],
        core: [{ item: "soul_ring" }],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          {
            item: "orchid",
            info: "If you can get it before his Manta Style timing",
          },
          { item: "desolator" },
          {
            item: "invis_sword",
            info: "To find him while he`s jungling or splitpushing",
          },
          { item: "diffusal_blade" },
          { item: "hurricane_pike" },
          { item: "travel_boots" },
          { item: "gungir" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "sphere" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "travel_boots" }],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "assault" },
        ],
      },
    },
  },

  "Arc Warden": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377376",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          `arc_warden_spark_wraith`,
          `arc_warden_flux`,
          `arc_warden_spark_wraith`,
          "arc_warden_tempest_double",
          `arc_warden_spark_wraith`,
          `arc_warden_flux`,
          `arc_warden_flux`,
          `special_bonus_unique_arc_warden_5`,
          `arc_warden_magnetic_field`,
          "arc_warden_tempest_double",
          "arc_warden_magnetic_field",
          "arc_warden_magnetic_field",
          `special_bonus_unique_arc_warden_3`,
          `arc_warden_magnetic_field`,
          "special_bonus_attributes",
          "arc_warden_tempest_double",
          "special_bonus_attributes",
          `special_bonus_unique_arc_warden_9`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_arc_warden_6`,
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            `circlet`,
            `branches`,
            `branches`,
            `faerie_fire`,
            "ward_observer",
          ],
          early_game: [`wraith_band`, `hand_of_midas`, `boots`, `magic_wand`],
          mid_game: ["maelstrom", "travel_boots", `gungir`, `manta`],
          late_game: [
            `hurricane_pike`,
            `silver_edge`,
            `aghanims_shard`,
            `black_king_bar`,
          ],
          situational: [
            `power_treads`,
            "monkey_king_bar",
            `skadi`,
            `greater_crit`,
            `mjollnir`,
            `nullifier`,
            `sheepstick`,
            `butterfly`,
            `bloodthorn`,
            `moon_shard`,
            `swift_blink`,
            `dagon`,
            `ethereal_blade`,
            `overwhelming_blink`,
            `ultimate_scepter`,
            `travel_boots_2`,
          ],
          core: [
            "hand_of_midas",
            "maelstrom",
            "travel_boots",
            `gungir`,
            `manta`,
            `hurricane_pike`,
            `silver_edge`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `duelist_gloves`,
            "grove_bow",
            `orb_of_destruction`,
            "enchanted_quiver",
            `paladin_sword`,
            `mind_breaker`,
            `ninja_gear`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
      },
    ],
    ability_tooltips: {
      //special_bonus_unique_arc_warden_7: `You can go for this talent over the suggested one if you go for the ethereal blade and dagon item build.`,
      special_bonus_unique_arc_warden: `You can go for this talent over the suggested one if you go for the ethereal blade and dagon item build.`,
      special_bonus_unique_arc_warden_4: `You can go for this talent over the suggested one if you go for the ethereal blade and dagon item build.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ward_observer:
        "If you are playing midlane but also to secure your safelane farm and jungling later on.",
      //infused_raindrop: "Against magical burst.",
      hand_of_midas: "A core item which active works on your clone too.",
      maelstrom:
        "A core item that further increases your farming speed. Both upgrades of this item are great to have. Mjollnir does significantly more dps though.",
      travel_boots: "Allows you to split-push the map effectively.",
      black_king_bar:
        "A core item that allows you to stand your ground and right-click.",
      manta: `A core item when going for the right click build. You can use it on your clone to farm and split push even more while making it harder for the enemy team to deal with you.`,
      skadi: `A situational item that tanks you up and reduces targets movement speed and healing.`,
      greater_crit: `A situational damaging late game item.`,
      gungir: `A core item for better crowd control.`,
      silver_edge: "For break and greater splitpush/pick off potential.",
      monkey_king_bar:
        "An alternative to Daedalus against evasion and miss chance. Whenever Mjollnir procs you can`t miss on that attack so you already have 30% accuracy.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
      swift_blink: `A situational item to reposition and for extra burst.`,
      dagon_5: `An alternate damage build to work around the attack damage reduction nerf.`,
      ethereal_blade: `Buffs your nuke damage with the Dagon, Flux, and Spark Wraith.`,
      octarine_core: `A core item that buffs all of the core abilities and items of Arc Warden.`,
      ultimate_scepter: `A necessary pick up when going for the spell damage build on Arc Warden. Significantly boosts your damage output.`,
      aghanims_shard: `An incredible item to push away enemy heroes on top of you as well as making you extremely tanky against magic damage lineups.`,
      overwhelming_blink: `A great mobility item to complement your magic damage build as well as making you more tanky.`,
    },
    combo: [
      `arc_warden_tempest_double`,
      `gungir`,
      `arc_warden_flux`,
      `arc_warden_spark_wraith`,
      `arc_warden_magnetic_field`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Arc Warden will cast Spark Wraith frequently to secure creep lasthits or to harass",
          },
          {
            item: "wind_lace",
            info: "To catch up to Arc Warden and offset the slow coming from Flux",
          },
          {
            item: "boots",
            info: "To catch up to Arc Warden and offset the slow coming from Flux",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "blink",
            info: "To close the gap to Arc Warden and get into the Magnetic Field",
          },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "invis_sword" },
          { item: "heavens_halberd" },
          { item: "gungir" },
          { item: "travel_boots" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "travel_boots" }],
        core: [
          { item: "abyssal_blade" },
          { item: "monkey_king_bar" },
          {
            item: "bloodthorn",
            info: "For true strike against Magnetic Field",
          },
          { item: "butterfly" },
          {
            item: "satanic",
            info: "To dispel Orchid or Bloodthorn that Arc Warden purchases often and to be able to manfight him and his clone",
          },
        ],
      },
    },
  },

  Axe: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
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
          "special_bonus_unique_axe_8",
          "axe_culling_blade",
          "axe_battle_hunger",
          "axe_battle_hunger",
          `special_bonus_unique_axe_4`,
          "axe_battle_hunger",
          "special_bonus_attributes",
          "axe_culling_blade",
          "special_bonus_attributes",
          `special_bonus_unique_axe_5`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_axe_2`,
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `ring_of_protection`,
            `ward_observer`,
          ],

          early_game: [
            `vanguard`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: ["blink", "blade_mail", `crimson_guard`, `travel_boots`],
          late_game: [
            `black_king_bar`,
            `aghanims_shard`,
            `overwhelming_blink`,
            `heart`,
          ],
          situational: [
            `phase_boots`,
            `pipe`,
            `kaya_and_sange`,
            `assault`,
            `shivas_guard`,
            `sphere`,
            `ultimate_scepter`,
            `octarine_core`,
            "lotus_orb",
            "invis_sword",
            `heavens_halberd`,
            `travel_boots_2`,
          ],
          core: [
            "vanguard",
            "boots",
            "blink",
            "blade_mail",
            `crimson_guard`,
            `travel_boots`,
            `black_king_bar`,
          ],
          neutral: [
            `faded_broach`,
            "occult_bracelet",
            "vambrace",
            "bullwhip",
            `cloak_of_flames`,
            "ogre_seal_totem",
            `havoc_hammer`,
            `martyrs_plate`,
            "giants_ring",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      axe_battle_hunger:
        "If the opponents have an easy way of removing or dispelling Battle Hunger, you can skip skilling this spell during laning stage. Try using it when all creeps are high HP",
      axe_berserkers_call: `Use this to prevent enemies from last hitting a creep or use it so they dont deny you one.`,
    },

    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      vanguard:
        "A core item that fixes your hp sustain issues and makes you exremely tanky. It can be disassembled.",
      boots:
        "A core item that you shouldn`t upgrade usually. Get Blink Dagger as fast as possible and upgrade boots to Boots of Travel down the road.",
      blink:
        "A core item that allows you to initiate the fights by jumping in and using Berserker`s Call.",
      blade_mail:
        "A core item that combines well with Berserker`s Call. It is especially strong against high dps right-clickers and uncontrolable high AoE damage, e.g. Eclipse.",
      black_king_bar:
        "A core item that allows you to stay alive after initiating.",
      aghanims_shard:
        "A core upgrade for Counter Helix especially good against illusion, summon or clone based heroes.",
      /* platemail:
        "A core item that fixes armor issues. You can upgrade it to either Assault Cuirass, Lotus Orb or Shiva`s Guard down the road.", */
      travel_boots:
        "A core boots upgrade that allows you to cover the map better.",
      lotus_orb: "For reflect, dispel and armor.",
      overwhelming_blink: "Against illusions, clones and summons.",
      invis_sword: "For pick-offs and to guarantee a good initiation.",
    },
    combo: [
      `blink`,
      `axe_berserkers_call`,
      `blade_mail`,
      `axe_battle_hunger`,
      `axe_culling_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from Axe",
          },
          { item: "wind_lace", info: "To keep the distance from the Axe" },
          { item: "boots", info: "To keep the distance from the Axe" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "spirit_vessel" }],
        core: [
          { item: "mage_slayer", info: "Reduces Counter Helix damage by 35%" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "silver_edge", info: "For breaking his passive ability" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          {
            item: "satanic",
            info: "For lifesteal against Berserker`s Call and Blade Mail combo",
          },
        ],
      },
    },
  },

  // YoonA plays hero
  Bane: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915293",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "bane_brain_sap", // 1
          "bane_nightmare", // 2
          "bane_brain_sap", // 3
          `bane_enfeeble`, // 4
          `bane_brain_sap`, // 5
          "bane_fiends_grip", // 6
          `bane_brain_sap`, // 7
          `bane_nightmare`, // 8
          `bane_nightmare`, // 9
          `special_bonus_unique_bane_11`, // 10
          `bane_nightmare`, // 11 | Enfeeble Cast Range Reduction
          "bane_fiends_grip", // 12
          `bane_enfeeble`, // 13
          `bane_enfeeble`, // 14
          `special_bonus_unique_bane_9`, // 15
          `bane_enfeeble`, // 16
          "special_bonus_attributes", // 17
          "bane_fiends_grip", // 18
          "special_bonus_attributes", // 19
          "special_bonus_movement_speed_30", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_bane_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `clarity`,
            `blood_grenade`,
            `enchanted_mango`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `infused_raindrop`,
            "wind_lace",
          ],
          mid_game: [
            "aether_lens",
            `tranquil_boots`,
            "glimmer_cape",
            `force_staff`,
          ],
          late_game: [
            "ultimate_scepter",
            `blink`,
            `aghanims_shard`,
            `black_king_bar`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `pavise`,
            `lotus_orb`,
            `ghost`,
            `aeon_disk`,
            `cyclone`,
            `wind_waker`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `blink`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `ninja_gear`,
            "seer_stone",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_bane_3:
        "You can skill the other talent if you are against mega creeps and have the Aghanims shard.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. It can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots.",
      wind_lace: "For extra mobility as Bane is great at setting up kills.",
      aether_lens:
        "A core item that allows you to get your spells off from further away.",
      glimmer_cape:
        "A core defensive item that can be used while channeling Fiend`s Grip.",
      lotus_orb: "For reflect, dispel and armor.",
      aghanims_shard: "Against summons, illusions and to depush.",
      black_king_bar: "To get a full duration Fiend`s Grip off.",
    },
    combo: [
      `bane_nightmare`,
      `bane_enfeeble`,
      `attack`,
      `bane_fiends_grip`,
      `glimmer_cape`,
      `bane_brain_sap`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Bane will cast Brain Sap frequently to win the trades",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Bane",
          },
          {
            item: "infused_raindrop",
            info: "Infused Raindrops allow you to offset magical damage coming from Brain Sap and make Bane get less HP from it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "wind_waker", info: "To save an ally in the Fiend`s Grip" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Batrider: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915391",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "batrider_sticky_napalm", // 1
          "batrider_firefly", // 2
          "batrider_sticky_napalm", // 3
          "batrider_flamebreak", // 4
          "batrider_sticky_napalm", // 5
          "batrider_flaming_lasso", // 6
          "batrider_sticky_napalm", // 7
          "batrider_firefly", // 8
          "batrider_firefly", // 9
          "batrider_firefly", // 10
          `batrider_flamebreak`, // 11
          "batrider_flaming_lasso", // 12
          "batrider_flamebreak", // 13
          "batrider_flamebreak", // 14
          `special_bonus_unique_batrider_7`, // 15  Michel: We have to use 'special_bonus_movement_speed_25", insted of 'special_bonus_movement_speed_25'
          `special_bonus_unique_batrider_6`, // 16
          "special_bonus_attributes", // 17
          "batrider_flaming_lasso", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_batrider_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_batrider_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            `faerie_fire`,
            "branches",
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`travel_boots`, `witch_blade`, `black_king_bar`, `blink`],
          late_game: [
            `octarine_core`,
            `aghanims_shard`,
            `force_staff`,
            `refresher`,
          ],
          situational: [
            `vanguard`,
            `arcane_boots`,
            `aether_lens`,
            `ultimate_scepter`,
            `sphere`,
            `ghost`,
            `wind_waker`,
            `overwhelming_blink`,
            "aeon_disk",
            `travel_boots_2`,
          ],
          core: [
            "bottle",
            "travel_boots",
            `witch_blade`,
            `black_king_bar`,
            `blink`,
            `octarine_core`,
            `aghanims_shard`,
          ],
          neutral: [
            `unstable_wand`,
            "pogo_stick",
            `pupils_gift`,
            `vambrace`,
            `quickening_charm`,
            `ceremonial_robe`,
            `spell_prism`,
            `timeless_relic`,
            "fallen_sky",
            "seer_stone",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that helps with sustain and allows you to gank with a stored active rune.",
          travel_boots:
            "A core item that provides very good mobility and map coverage while ganking and farming.",
          blink:
            "A core item that lets you gap close and instantly use your Flaming Lasso.",
          aether_lens: `A situational item that extends the cast range of all of your spells but Firefly, including items.`,
          octarine_core:
            "A core item that increases the frequency of your spells and item being used by reducing the cooldown.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719253341",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `batrider_flamebreak`, // 1
          "batrider_firefly", // 2
          `batrider_firefly`, // 3
          `batrider_sticky_napalm`, // 4
          `batrider_firefly`, // 5
          "batrider_flaming_lasso", // 6
          `batrider_firefly`, // 7
          `batrider_sticky_napalm`, // 8
          `batrider_sticky_napalm`, // 9
          `batrider_sticky_napalm`, // 10
          `batrider_flamebreak`, // 11
          "batrider_flaming_lasso", // 12
          "batrider_flamebreak", // 13
          "batrider_flamebreak", // 14
          `special_bonus_unique_batrider_7`, // 15  Michel: We have to use 'special_bonus_movement_speed_25", insted of 'special_bonus_movement_speed_25'
          `special_bonus_unique_batrider_6`, // 16
          "special_bonus_attributes", // 17
          "batrider_flaming_lasso", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_batrider_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_batrider_2`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `circlet`,
            `circlet`,
            "branches",
            "branches",
            `ward_observer`,
          ],
          early_game: [`vanguard`, `boots`, "magic_wand", "wind_lace"],
          mid_game: [
            `travel_boots`,
            `blink`,
            `black_king_bar`,
            `octarine_core`,
          ],
          late_game: [
            `ancient_janggo`,
            `force_staff`,
            `aghanims_shard`,
            `refresher`,
          ],
          situational: [
            `null_talisman`,
            `arcane_boots`,
            `aether_lens`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `sphere`,
            `ghost`,
            `crimson_guard`,
            `pipe`,
            `witch_blade`,
            `aeon_disk`,
            `wind_waker`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `vanguard`,
            "travel_boots",
            `blink`,
            `black_king_bar`,
            `octarine_core`,
            `force_staff`,
            `aghanims_shard`,
          ],
          neutral: [
            `unstable_wand`,
            `pogo_stick`,
            `pupils_gift`,
            `vambrace`,
            `quickening_charm`,
            `ceremonial_robe`,
            `spell_prism`,
            `timeless_relic`,
            `fallen_sky`,
            `seer_stone`,
          ],
        },
        item_tooltips: {
          blink:
            "A core item that allows you to initiate on desired target. Can be upgraded down the road.",
        },
      },
    ],
    ability_tooltips: {
      batrider_sticky_napalm:
        "Make sure you also use this spell on the creeps as it increases your right click damage which Batrider lacks.",
      batrider_firefly: `Your main farming spell. Try killing multiple waves or neutral camps with one usage.`,
      special_bonus_unique_batrider_7: `On level 15, take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
    },

    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      wind_lace:
        "A core item for extra mobility. Synergizes with the movement speed theme that Batrider is going for.",
      ward_observer:
        "If you are playing midlane but also offlane to have better vision around the lane.",
      infused_raindrop: "Against magical burst.",
      travel_boots:
        "A core item that provides very good mobility and map coverage while ganking and farming.",
      black_king_bar:
        "A core item that allows you to get Flaming Lasso off on a specific target.",
      aghanims_shard: `A core item that adds to your damage output through right clicks.`,
      sphere:
        "Against single target disables. e.g Sand King, Legion Commander.",
    },
    combo: [
      `batrider_firefly`,
      `black_king_bar`,
      `blink`,
      `batrider_flaming_lasso`,
      `batrider_sticky_napalm`,
      `batrider_flamebreak`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Batrider will grant you many stick charges by stacking Sticky Napalm repeatedly on you",
          },
          { item: "wind_lace", info: "To keep the distance from the Batrider" },
          { item: "boots", info: "To keep the distance from the Batrider" },
          {
            item: "cloak",
            info: "Batrider is heavy on magical damage and Cloak negates 15% of it.",
          },
        ],
        support: [],
        core: [
          {
            item: "phase_boots",
            info: "Improves turn rate against Sticky Napalm.",
          },
        ],
      },
      mid_game: {
        all: [
          {
            item: "lotus_orb",
            info: "A good item to either dispell the debuffs from Batrider or to make it hard for him to Lasso a desired target.",
          },
        ],
        support: [
          { item: "force_staff", info: " To disengage or to reposition." },
          {
            item: "glimmer_cape",
            info: " Batrider relies mostly on magic damage which Glimmer Cape helps with.",
          },
        ],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          {
            item: "sphere",
            info: "Removes the threat of being ultied by Batrider.",
          },
          { item: "sheepstick" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  Beastmaster: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915480",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "beastmaster_wild_axes",
          `beastmaster_inner_beast`,
          `beastmaster_wild_axes`,
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_wild_axes`,
          "beastmaster_primal_roar",
          `beastmaster_wild_axes`,
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_call_of_the_wild_boar`,
          `special_bonus_unique_beastmaster_9`,
          `beastmaster_primal_roar`,
          `beastmaster_inner_beast`,
          `beastmaster_inner_beast`,
          `special_bonus_unique_beastmaster_5`,
          `beastmaster_inner_beast`,
          "special_bonus_attributes",
          "beastmaster_primal_roar",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_6",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_7",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `sobi_mask`,
            `enchanted_mango`,
            "branches",
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ring_of_basilius`,
            `boots`,
            `magic_wand`,
            `helm_of_the_dominator`,
          ],
          mid_game: [
            "helm_of_the_overlord",
            `boots_of_bearing`,
            `ultimate_scepter`,
            `crimson_guard`,
          ],
          late_game: [
            `pipe`,
            `bloodstone`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
            `guardian_greaves`,
            `heavens_halberd`,
            `solar_crest`,
            `lotus_orb`,
            `force_staff`,
            `aghanims_shard`,
            `black_king_bar`,
            `kaya_and_sange`,
            `overwhelming_blink`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `ring_of_basilius`,
            "boots",
            `helm_of_the_overlord`,
            `boots_of_bearing`,
            `crimson_guard`,
            `pipe`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            "vambrace",
            `cloak_of_flames`,
            `quickening_charm`,
            "spell_prism",
            `timeless_relic`,
            "fallen_sky",
            "demonicon",
          ],
        },
      },
    ],
    ability_tooltips: {
      /* beastmaster_wild_axes:
        "If you are laning against Chen or Enchantress, you might want to skill Wild Axes over Call of the Wild.", */
      beastmaster_call_of_the_wild_boar: `Preferably to have 2 boars active, make sure the most recent one is not the one tanking damage or getting killed.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      /* helm_of_iron_will:
        "Solves your HP sustain issues and builds into Helm of the Dominator. Get it as early as possible.", */
      helm_of_the_dominator:
        "A core item that synergizes well with the Inner Beast and allows you to push and pick-off heroes. Look to upgrade it to Helm of the Overlord.",
      boots: `A core item that should be upgraded to Boots of Bearing later in the game.`,
      aghanims_shard: `A situational item that improves vision game and adds another disable.`,
      ultimate_scepter: `A core item that improves your damage and sustain in fights.`,
      octarine_core: `A late game pick up that improves the cooldown on your spells and gives mana regen to spam Wild Axes.`,
      crimson_guard: `An incredible aura item that improves the tankiness of your team against physical damage. Also helps in taking the tormentor.`,
      blink:
        "To cast Primal Roar on a desired target and supports that often stay in the back.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflecting, dispelling and armor.",
      pipe: "Against AOE damage. Protects your units and your teammates as they tend to move together with Beastmaster.",
    },
    combo: [
      `beastmaster_call_of_the_wild_hawk`,
      `beastmaster_call_of_the_wild_boar`,
      `beastmaster_primal_roar`,
      `beastmaster_wild_axes`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To offset the slow coming from the boars",
          },
          { item: "boots", info: "To offset the slow coming from the boars" },
        ],
        support: [{ item: "ward_sentry", info: "To kill Beastmaster`s hawk" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "vanguard" },
        ],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ward_sentry", info: "Sentry Wards for Hawks" },
          { item: "ghost" },
          { item: "force_staff" },
          { item: "glimmer_cape" },
        ],
        core: [
          {
            item: "crimson_guard",
            info: "Effective item versus the summons that Beastmaster has.",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "gungir" },
        ],
      },
      late_game: {
        all: [{ item: "sphere", info: "Protects you from Primal Roar" }],
        support: [{ item: "SentryGem", info: "for Hawks" }],
        core: [
          {
            item: "assault",
            info: "The armor that you get from Assault nullifies some of the physical damage Beastmaster and his units output.",
          },
        ],
      },
    },
  },

  // eidendota plays hero
  Bloodseeker: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
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
          "special_bonus_unique_bloodseeker_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_rupture_charges",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "branches",
          ],
          early_game: ["wraith_band", "phase_boots", "magic_wand", "maelstrom"],
          mid_game: ["manta", "black_king_bar", "aghanims_shard", "basher"],
          late_game: [
            "mjollnir",
            "abyssal_blade",
            "butterfly",
            "skadi",
            "refresher",
          ],
          situational: [
            "orb_of_corrosion",
            "vanguard",
            "sange_and_yasha",
            "gungir",
            "silver_edge",
            "satanic",
            "monkey_king_bar",
            "sphere",
          ],
          core: [
            "phase_boots",
            "maelstrom",
            "black_king_bar",
            "manta",
            "basher",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            "ring_of_aquila",
            "pupils_gift",
            "orb_of_destruction",
            "elven_tunic",
            "titan_sliver",
            "paladin_sword",
            "penta_edged_sword",
            "mind_breaker",
            "spell_prism",
            "ninja_gear",
            "mirror_shield",
            "pirate_hat",
            "apex",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2706431682",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_thirst",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "bloodseeker_rupture",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "bloodseeker_thirst",
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
          "special_bonus_unique_bloodseeker_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_rupture_charges",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "branches",
          ],
          early_game: ["wraith_band", "phase_boots", "magic_wand", "maelstrom"],
          mid_game: [
            "gungir",
            "black_king_bar",
            "manta",
            "aghanims_shard",
            "basher",
          ],
          late_game: ["abyssal_blade", "refresher"],
          situational: [
            "orb_of_corrosion",
            "blade_mail",
            "ultimate_scepter",
            "sphere",
          ],
          core: ["phase_boots", "gungir", "black_king_bar", "manta"],
          neutral: [
            "broom_handle",
            "unstable_wand",
            "ring_of_aquila",
            "pupils_gift",
            "ogre_seal_totem",
            "quickening_charm",
            "paladin_sword",
            "mind_breaker",
            "penta_edged_sword",
            "spell_prism",
            "mirror_shield",
            "pirate_hat",
            "fallen_sky",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      bloodseeker_blood_bath:
        "On the lane use this spell to secure the range creep lasthit.",
      bloodseeker_rupture:
        "Use Rupture on a highly mobile target to prevent them from being elusive.",
    },
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
      basher:
        "A core item that procs frequently under Bloodrage buff. Can be upgraded to Abyssal Blade down the road.",
      //   ---------------------
      aghanims_shard:
        "Great against high HP targets, improves your dps and sustain.",
      //   Offlane BS core items
      phase_boots: "A core item that allows you to be even faster.",
      rod_of_atos:
        "A core item that guarantees that Blood Rite will hit and acts as a tp cancel.",
      solar_crest: "Solar is a very effective item that amplifies your carry.",
      //   ---------------------
      dagon: "Benefits from Bloodrage spell amp and acts as Linken`s popper.",
      spirit_vessel: "Against heavy healing lineup and high HP targets.",
      cyclone: "For dispel, setup and teleport cancel.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflect, dispel and armor.",
      manta:
        "Alternative to Sange and Yasha if you need to dispel something like a root or a silence.",
      gungir:
        "Alternative to Mjollnir if you need AoE control. Goes well with Blood Rite.",
      monkey_king_bar:
        "Against evasion although Maelstrom/Mjollnir pierces evasion on proc already.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep escape the Blood Rite" },
          { item: "boots", info: "To keep escape the Blood Rite" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "cyclone" },
          {
            item: "lotus_orb",
            info: "If Bloodseeker ulties you under the effect of Lotus, its much harder for him to chase you down.",
          },
        ],

        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          {
            item: "blade_mail",
            info: "Could potentially be lethal as you run with the Rupture effect and kill him while Blade Mail is on.",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "sheepstick" }],
        support: [],
        core: [
          {
            item: "satanic",
            info: "To be able to fight back while ruptured and to dispel Blood Rite silence",
          },
          { item: "abyssal_blade" },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Bounty Hunter": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915719",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `bounty_hunter_wind_walk`,
          `bounty_hunter_jinada`,
          `bounty_hunter_jinada`,
          "bounty_hunter_shuriken_toss",
          `bounty_hunter_jinada`,
          "bounty_hunter_track",
          `bounty_hunter_jinada`,
          "bounty_hunter_wind_walk",
          `bounty_hunter_wind_walk`,
          `bounty_hunter_wind_walk`,
          `special_bonus_unique_bounty_hunter_4`,
          "bounty_hunter_track",
          `bounty_hunter_shuriken_toss`,
          `bounty_hunter_shuriken_toss`,
          `special_bonus_unique_bounty_hunter_6`,
          `bounty_hunter_shuriken_toss`,
          "special_bonus_attributes",
          "bounty_hunter_track",
          "special_bonus_attributes",
          `special_bonus_unique_bounty_hunter_8`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_bounty_hunter_3`,
        ],
        items: {
          starting: [
            `tango`,
            `orb_of_venom`,
            `blood_grenade`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            "magic_wand",
            `urn_of_shadows`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `phylactery`,
            `boots_of_bearing`,
            `solar_crest`,
            `ultimate_scepter`,
          ],
          late_game: [
            `aghanims_shard`,
            `force_staff`,
            "sheepstick",
            `octarine_core`,
          ],
          situational: [
            `orb_of_corrosion`,
            `pavise`,
            `guardian_greaves`,
            "spirit_vessel",
            `pipe`,
            `crimson_guard`,
            `black_king_bar`,
            `heavens_halberd`,
            `orchid`,
            `lotus_orb`,
            `ethereal_blade`,
            `wind_waker`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            `urn_of_shadows`,
            `phylactery`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `philosophers_stone`,
            "bullwhip",
            `quickening_charm`,
            `ceremonial_robe`,
            `spell_prism`,
            `spy_gadget`,
            `desolator_2`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      bounty_hunter_jinada:
        "Goes very well with Boots and can harass melee heroes on lane. Put a point on level 1 if thats the case.",
      bounty_hunter_wind_walk: `You should put a point on level 1 if you feel like you cant reach opponents or frequently attack them with Jinada. Also helps with the bounty rune fight.`,
    },
    item_tooltips: {
      orb_of_venom: `An early game pick up that lets you chase down heroes with the help of Shadow Walk.`,
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ward_sentry: "To block or unblock a pull camp.",
      tranquil_boots:
        "A core boots upgrade that provides hp sustain but most importantly great movement speed to roam around.",
      wind_lace:
        "A core item that allows you to roam around even faster. It can be used to assemble Eul`s or Solar Crest.",
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Against magical burst.",
      urn_of_shadows:
        "A core item that allows you to snowball off of first kill. It provides useful stats, good mana regeneration. You can unstealth yourself by using it when you get dusted to move faster.",
      spirit_vessel: "Against heavy-healing lineup.",
      boots_of_bearing: `An core upgrade to Tranquil Boots that significantly improves your teamfight impact with the attack and movement speed aura.`,
      wind_waker: `A situational item that allows you to dispel yourself (e.g. dust) as well as move to a safer spot through cyclone.`,
      aghanims_shard: `A late game pick up that improves your lock down and mobility with improvements to your Shadow Walk..`,
      ultimate_scepter:
        "A core item that allows you to deal more damage in the fights and get richer at the same time.",
      lotus_orb:
        "For reflecting, dispelling (e.g. Dust of Appearance) and armor.",
      octarine_core:
        "A core item that reduces cooldown of spells and items. It increases the frequency and range of Shuriken Tosses and extracts even more value from Aghanim`s Scepter.",
    },
    combo: [
      `bounty_hunter_wind_walk`,
      `bounty_hunter_track`,
      `bounty_hunter_jinada`,
      `bounty_hunter_shuriken_toss`,
      `urn_of_shadows`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To disallow Bounty Hunter get easy Jinada hits off",
          },
          {
            item: "boots",
            info: "To disallow Bounty Hunter get easy Jinada hits off",
          },
          {
            item: "armor",
            info: "Buy armor items against a core Bounty Hunter",
          },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "SentryDustGem" }, { item: "ghost" }],
        core: [{ item: "manta", info: "To dispel Track" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "black_king_bar",
            info: "Against a core right-clicking Bounty Hunter",
          },
        ],
        support: [{ item: "SentryDustGem" }],
        core: [
          {
            item: "assault",
            info: "If it is a core right-clicking Bounty Hunter",
          },
          { item: "abyssal_blade", info: "If it is a core Bounty Hunter" },
          { item: "butterfly", info: "If it is a core Bounty Hunter" },
        ],
      },
    },
  },

  Brewmaster: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915806",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "brewmaster_thunder_clap",
          "brewmaster_cinder_brew",
          `brewmaster_cinder_brew`,
          `brewmaster_drunken_brawler`,
          `brewmaster_cinder_brew`,
          "brewmaster_primal_split",
          `brewmaster_cinder_brew`,
          `brewmaster_thunder_clap`,
          `brewmaster_thunder_clap`,
          `brewmaster_thunder_clap`,
          `special_bonus_unique_brewmaster_7`,
          "brewmaster_primal_split",
          `brewmaster_drunken_brawler`,
          `brewmaster_drunken_brawler`,
          `special_bonus_unique_brewmaster_8`,
          `brewmaster_drunken_brawler`,
          "special_bonus_attributes",
          "brewmaster_primal_split",
          "special_bonus_attributes",
          "special_bonus_unique_brewmaster",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_brewmaster_4`,
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [`vanguard`, `boots`, `urn_of_shadows`, `magic_wand`],
          mid_game: [`arcane_boots`, `crimson_guard`, `pipe`, `aghanims_shard`],
          late_game: [`radiance`, `blink`, `ultimate_scepter`, `refresher`],
          situational: [
            `wraith_band`,
            `bracer`,
            `hand_of_midas`,
            `spirit_vessel`,
            `meteor_hammer`,
            `guardian_greaves`,
            `boots_of_bearing`,
            `vladmir`,
            `black_king_bar`,
            `force_staff`,
            `shivas_guard`,
            `assault`,
            `overwhelming_blink`,
            `sphere`,
            `lotus_orb`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            "boots",
            `urn_of_shadows`,
            `vanguard`,
            `arcane_boots`,
            `crimson_guard`,
            `pipe`,
            `aghanims_shard`,
            `blink`,
          ],
          neutral: [
            `occult_bracelet`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            "quickening_charm",
            `cloak_of_flames`,
            "spell_prism",
            `havoc_hammer`,
            `giants_ring`,
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      /* brewmaster_drunken_brawler: `You can put a point in this spell on level 1 to survive the first few creep waves against a tough lane match-up.`,
      special_bonus_hp_350: `It is important that you get ulti off and extra HP can help with that. The other level fifteen does not see much play as you spend most of the fight in Primal Split.`, */
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      urn_of_shadows: "A core item that activates the Cinder Brew on cast.",
      boots:
        "A core item that can be upgraded to Boots of Travels in mid to late-game.",
      hand_of_midas:
        "If you can get it early. Brewmaster is an experience-hungry hero.",
      spirit_vessel: "Against heavy healing lineup.",
      ultimate_scepter: `A late game item that gives you a brewling to fight as well as split push.`,
      blink:
        "An item that allows you to initiate the fight and pop Primal Split closer to opponents.",
      aghanims_shard: `A core item to improve your teamfighting with Primal Split.`,
      black_king_bar:
        "To be able to get Primal Split off and against a lot of disables, magical damage and as a dispel.",
      refresher: `A late game item that allows you to have 2 Primal Splits.`,
      aeon_disk: `To reliably get Primal Split off every time in fights.`,
      crimson_guard: `An incredible aura item to improve your impact in the game while Primal Split is on cooldown.`,
      pipe: `An incredible aura item to improve your impact in the game while Primal Split is on cooldown.`,
    },
    combo: [
      `brewmaster_cinder_brew`,
      `urn_of_shadows`,
      `blink`,
      `brewmaster_thunder_clap`,
      `brewmaster_primal_split`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "magic_stick",
            info: "Brewmaster`s spells are fairly cheap and on low cooldown",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Brewmaster and offset slow coming from Thunder Clap and Cinder Brew",
          },
          {
            item: "boots",
            info: "To keep the distance from the Brewmaster and offset slow coming from Thunder Clap and Cinder Brew",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "monkey_king_bar" },
          {
            item: "bloodthorn",
            info: "For true strike against Drunken Brawler and to burst this tanky hero",
          },
          { item: "butterfly" },
        ],
      },
    },
  },

  // YoonA plays hero (eidendota would play him as well, but YoonA had him already in the past)
  Bristleback: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
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
          `special_bonus_mp_regen_150`,
          "bristleback_bristleback",
          "bristleback_warpath",
          "bristleback_viscous_nasal_goo",
          "bristleback_viscous_nasal_goo",
          `special_bonus_unique_bristleback_5`,
          "bristleback_viscous_nasal_goo",
          "special_bonus_attributes",
          "bristleback_warpath",
          "special_bonus_attributes",
          `special_bonus_unique_bristleback_2`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_spell_lifesteal_12`,
        ],
        items: {
          starting: [
            "tango",
            `branches`,
            `branches`,
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [`vanguard`, `phase_boots`, `soul_ring`, `magic_wand`],
          mid_game: [
            `cloak`,
            "ultimate_scepter",
            `eternal_shroud`,
            `crimson_guard`,
          ],
          late_game: [
            `black_king_bar`,
            `aghanims_shard`,
            `heart`,
            `bloodstone`,
          ],
          situational: [
            `power_treads`,
            `pipe`,
            `blade_mail`,
            `abyssal_blade`,
            `guardian_greaves`,
            `heavens_halberd`,
            `greater_crit`,
            `overwhelming_blink`,
            `lotus_orb`,
            `sphere`,
            `shivas_guard`,
            `satanic`,
            `travel_boots`,
          ],
          core: [
            "vanguard",
            `soul_ring`,
            `phase_boots`,
            `cloak`,
            `ultimate_scepter`,
            `eternal_shroud`,
            `black_king_bar`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `vambrace`,
            `vampire_fangs`,
            `cloak_of_flames`,
            `ogre_seal_totem`,
            `havoc_hammer`,
            `trickster_cloak`,
            `giants_ring`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      bristleback_viscous_nasal_goo:
        "You can skill Viscious Nasal Goo on level one if you are fighting on the rune, or on level two if you see an opportunity to run down the opponent`s hero on the lane.",
      /* special_bonus_unique_bristleback_3:
        "You should generally be looking to transition to right-clicker in late game and this talent helps with that.", */
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      vanguard:
        "A core item that makes you significantly harder to kill. Allows you to dive, creepskip and clear stacks with ease. Can be disassembled.",
      soul_ring: "A core item that helps with mana sustain.",
      cloak: "A core item that tanks you up against magical damage.",
      ultimate_scepter:
        "A core item that allows you to build up Warpath stacks faster as it makes Viscious Nasal Goo have no cast point. Adds to AoE control.",
      aghanims_shard: "For more Quill stacks and AoE slow.",
      pipe: `Against heavy magical damage lineups as well as the tormentor.`,
      crimson_guard: "Against high attack speed heroes and multiple units.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      lotus_orb: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
      black_king_bar:
        "Against a lot of disables, magical damage, mana burn, breaks and as a dispel.",
    },
    combo: [
      `bristleback_hairball`,
      `bristleback_quill_spray`,
      `bristleback_viscous_nasal_goo`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Bristleback relies heavily on stacking Quill Spray and Viscious Nasal Goo on opponents",
          },
          { item: "armor", info: "Buy armor items" },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Bristleback",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Bristleback",
          },
          { item: "boots", info: "To keep the distance from the Bristleback" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against high HP pool and HP regeneration that Bristleback tends to have",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from Quill Spray and provides armor against right-clicks, Viscous Nasal Goo and Quill Spray",
          },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "diffusal_blade" },
          { item: "silver_edge" },
          { item: "hurricane_pike" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "skadi", info: "To reduce healing" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Broodmother: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915996",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "broodmother_spin_web", // 1
          "broodmother_insatiable_hunger", // 2
          `broodmother_silken_bola`, // 3
          `broodmother_spin_web`, // 4
          "broodmother_spin_web", // 5
          "broodmother_spawn_spiderlings", // 6
          `broodmother_spin_web`, // 7
          `broodmother_silken_bola`, // 8
          `broodmother_silken_bola`, // 9
          `special_bonus_unique_broodmother_6`, // 10
          "broodmother_silken_bola", // 11
          "broodmother_spawn_spiderlings", // 12
          "broodmother_insatiable_hunger", // 13
          "broodmother_insatiable_hunger", // 14
          `special_bonus_unique_broodmother_5`, // 15
          `broodmother_insatiable_hunger`, // 16
          "special_bonus_attributes", // 17
          "broodmother_spawn_spiderlings", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_broodmother_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_broodmother_4`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `wraith_band`,
            `wraith_band`,
            `soul_ring`,
            `arcane_boots`,
            `magic_wand`,
          ],
          mid_game: [`orchid`, `guardian_greaves`, `pipe`, `aghanims_shard`],
          late_game: [
            `black_king_bar`,
            `sheepstick`,
            `ultimate_scepter`,
            `bloodthorn`,
          ],
          situational: [
            `spirit_vessel`,
            `orb_of_corrosion`,
            `power_treads`,
            `disperser`,
            `harpoon`,
            `desolator`,
            `abyssal_blade`,
            `butterfly`,
            `monkey_king_bar`,
            `manta`,
            `swift_blink`,
            `nullifier`,
            `phylactery`,
            `solar_crest`,
            `lotus_orb`,
            `overwhelming_blink`,
          ],
          core: [
            `wraith_band`,
            `soul_ring`,
            `arcane_boots`,
            `orchid`,
            `guardian_greaves`,
            `pipe`,
            `sheepstick`,
            `ultimate_scepter`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            `ring_of_aquila`,
            "paladin_sword",
            `quickening_charm`,
            `spell_prism`,
            `mind_breaker`,
            "desolator_2",
            `demonicon`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* special_bonus_unique_broodmother_3:
        "On level 15, take the level 15 talent before this level 10 talent. On level 16 take this level 10 talent. The dota2 client disallows me to indicate that in the leveling table above.", */
      special_bonus_attack_speed_35: `Take this level 20 talent over the suggested one if you are going for right click items.`,
      special_bonus_unique_broodmother_1: `Take this level 20 talent over the suggested one if you are going for right click items.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ward_observer:
        "If you are playing midlane but also on offlane for extra vision aroud the lane.",
      infused_raindrop: "Against magical burst.",
      soul_ring: "A core item necessary for mana sustain.",
      orchid: "A core item that allows you to pick-off heroes.",
      arcane_boots: `A core item that allows you to spam Spawn Spiderlings to increase farming speed and damage in fights.`,
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard: `Improves your damage output and lifesteal during Insatiable Hunger.`,
      nullifier:
        "Allows you to breach through some of the defensive items and spells.",
      blink:
        "Allows you to instantly reposition on top of the hero you want to kill.",
      sheepstick: `For extra control in the late game.`,
      guardian_greaves: `A core item that provides auras and sustain for your spiders and allied heroes.`,
      pipe: `A core item that makes your spiders and allied heroes more tanky against magic damage.`,
      disperser: `An upgrade to diffusal blade that makes you an even more potent right clicker.`,
      harpoon: `An upgrade to echo sabre that lets you catch up to enemy heroes and not get kited.`,
      phylactery: `An early game pick up that gives you another instance of damage when you cast Silken Bola or Spawn Spiderlings.`,
    },
    combo: [
      `orchid`,
      `broodmother_spawn_spiderlings`,
      `broodmother_silken_bola`,
      `broodmother_insatiable_hunger`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from the Broodmother",
          },
          { item: "boots", info: "To keep the distance from the Broodmother" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Insatiable Hunger",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "ring_of_health" },
          {
            item: "vanguard",
            info: "To offset the damage coming from summons",
          },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [],
        core: [
          {
            item: "monkey_king_bar",
            info: "For true strike against Silken Bola",
          },
          { item: "abyssal_blade" },
          { item: "bloodthorn", info: "For true strike against Silken Bola" },
          { item: "skadi", info: "To reduce healing from Insatiable Hunger" },
          { item: "butterfly" },
          {
            item: "satanic",
            info: "To be able to fight back and to dispel Silken Bola",
          },
        ],
      },
    },
  },

  "Centaur Warrunner": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916073",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "centaur_hoof_stomp", // 1
          "centaur_return", // 2
          `centaur_double_edge`, // 3
          `centaur_return`, // 4
          `centaur_double_edge`, // 5
          "centaur_stampede", // 6
          "centaur_return", // 7
          `centaur_return`, // 8
          `centaur_hoof_stomp`, // 9
          `centaur_hoof_stomp`, // 10
          `centaur_hoof_stomp`, // 11
          "centaur_stampede", // 12
          `special_bonus_movement_speed_20`, // 13
          `centaur_double_edge`, // 14
          `special_bonus_strength_15`, // 15
          `centaur_double_edge`, // 16
          "special_bonus_attributes", // 17
          "centaur_stampede", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_centaur_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_centaur_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `branches`,
            `ring_of_protection`,
            `ring_of_protection`,
            `ward_observer`,
          ],
          early_game: ["vanguard", `phase_boots`, "magic_wand", `cloak`],
          mid_game: [`blink`, `crimson_guard`, `pipe`, `heart`],
          late_game: [
            `aghanims_shard`,
            `black_king_bar`,
            `overwhelming_blink`,
            `assault`,
          ],
          situational: [
            `bracer`,
            "heavens_halberd",
            `ultimate_scepter`,
            `guardian_greaves`,
            `solar_crest`,
            `force_staff`,
            `lotus_orb`,
            `shivas_guard`,
            `blade_mail`,
            `sphere`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `phase_boots`,
            `blink`,
            `crimson_guard`,
            `pipe`,
            `heart`,
            `aghanims_shard`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            `ogre_seal_totem`,
            `martyrs_plate`,
            `havoc_hammer`,
            "giants_ring",
            `apex`,
          ],
        },
      },
    ],
    ability_tooltips: {
      centaur_double_edge:
        "You can skill this spell on level one or two if you can pressure or against Naga Siren to kill her illusions. The more aggressive you can be on the lane, the less points in Retaliate you need.",
      //special_bonus_unique_centaur_5: `Stacks up well with the Aghanims Scepter on Centaur.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      vanguard:
        "A core item that allows you to be come extremely tanky, to creepskip and clear stacks.",
      blink:
        "A core item that allows you to initiate the fights by jumping in and Hoof Stomping.",
      /* hood_of_defiance:
        "A core item that allows tanks you up against magical damage. Reduces the self-damage taken from Double Edge.", */
      crimson_guard: "Against high attack speed heroes and multiple units.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      pipe: "To protect your team against magical damage.",
      aghanims_shard: "For extra damage and tankiness.",
      lotus_orb: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
      ultimate_scepter: `A late game pick up for an added save or initiation for one of your teammates.`,
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
    },
    combo: [
      `centaur_stampede`,
      `blink`,
      `centaur_hoof_stomp`,
      `centaur_double_edge`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Centaur Warrunner",
          },
          {
            item: "boots",
            info: "To keep the distance from the Centaur Warrunner",
          },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against high HP pool and HP regeneration that Centaur tends to have",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [{ item: "black_king_bar" }],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade", info: "Against Stampede" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Chaos Knight": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916165",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_reality_rift", // 2
          "chaos_knight_chaos_strike", // 3
          "chaos_knight_chaos_strike", // 4
          "chaos_knight_chaos_strike", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_strike", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "special_bonus_unique_chaos_knight_2", // 10
          "chaos_knight_reality_rift", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_bolt", // 13
          "chaos_knight_chaos_bolt", // 14
          "special_bonus_unique_chaos_knight_8", // 15
          "chaos_knight_chaos_bolt", // 16
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
          chaos_knight_chaos_strike:
            "If you need more regen earlier and have no kill potential on your lane, you can consider leveling this on 2 instead of reality rift.",
          chaos_knight_phantasm:
            "In the early game you should be using this ability off-cooldown in order to farm faster and push out waves. Only keep this ready if you think a fight will break out soon.",
        },
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "circlet",
            "branches",
            "branches",
          ],
          early_game: [
            "magic_wand",
            "power_treads",
            "bracer",
            "helm_of_iron_will",
          ],
          mid_game: [
            "armlet",
            "echo_sabre",
            "black_king_bar",
            "mage_slayer",
            "blink",
            "orchid",
            "aghanims_shard",
          ],
          late_game: [
            "bloodthorn",
            "heart",
            "assault",
            "satanic",
            "skadi",
            "abyssal_blade",
            "overwhelming_blink",
          ],
          situational: [
            "ultimate_scepter",
            "infused_raindrop",
            "hand_of_midas",
            "sange_and_yasha",
            "silver_edge",
            "manta",
            "soul_ring",
          ],
          core: ["power_treads", "armlet", "black_king_bar"],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "lance_of_pursuit",
            "vambrace",
            "pupils_gift",
            "ring_of_aquila",
            "elven_tunic",
            "paladin_sword",
            "titan_sliver",
            "mind_breaker",
            "spell_prism",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          magic_stick:
            "If you are laning against a hero that spams alot of spells in the lane (eg. Bristleback/Batrider) then you should start with a stick.",
          bracer: "Don`t get more than two bracers",
          soul_ring:
            "Get this instead of bracers or with 1 bracer if you need the mana.",
          echo_sabre:
            "You should disassemble this item and use the ogre axe to make bkb. Turn the oblivion staff into mage-slayer and later bloodthorn.",
          orchid:
            "Build this into a bloodthorn with your mage-slayer after blink.",
          hand_of_midas: "If you can get it early it can be good.",
          blink: "Generally after bkb.",
          bloodthorn:
            "This item is really great with your illusions and fits your build up perfectly. After you have blink, bkb, mageslayer you can turn your mageslayer into bloodthorn.",
          /*flicker:
            "Can be really good in the late game if your enemies are controlling you with slows,silences etc.",
            */
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2708440963",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_reality_rift", // 2
          "chaos_knight_chaos_strike", // 3
          "chaos_knight_chaos_strike", // 4
          "chaos_knight_chaos_strike", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_strike", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "chaos_knight_reality_rift", // 10
          "special_bonus_unique_chaos_knight_2", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_bolt", // 13
          "chaos_knight_chaos_bolt", // 14
          "special_bonus_unique_chaos_knight_8", // 15
          "chaos_knight_chaos_bolt", // 16
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
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "gauntlets",
            "branches",
            "branches",
          ],
          early_game: ["magic_wand", "power_treads", "bracer", "bracer"],
          mid_game: ["armlet", "blink", "ultimate_scepter", "aghanims_shard"],
          late_game: ["assault", "overwhelming_blink", "bloodthorn", "heart"],
          situational: [
            "heavens_halberd",
            "black_king_bar",
            "silver_edge",
            "manta",
            "sange_and_yasha",
          ],
          core: [
            "power_treads",
            "armlet",
            "blink",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            "unstable_wand",
            "lance_of_pursuit",
            "vambrace",
            "pupils_gift",
            "elven_tunic",
            "paladin_sword",
            "spell_prism",
            "mind_breaker",
            "ninja_gear",
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
      bracer: "You can rush two bracers in the lane to make you tankier.",
      power_treads:
        "A core item that allows you to farm faster due to attack speed increase. The movement speed, attributes and attack speed also affect the illusions.",
      armlet:
        "A core item that boosts your dps significantly as Armlet active bonus strength is passed to your illusions as well.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      silver_edge:
        "For pick-off potential, easier initiation and break effect.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from the Chaos Knight",
          },
          { item: "boots", info: "To keep the distance from the Chaos Knight" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          { item: "lotus_orb" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "bfury" },
          { item: "maelstrom" },
          { item: "gungir" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick", info: "Also instantly destroys illusions" },
          { item: "aeon_disk" },
        ],
        support: [],
        core: [
          { item: "mjollnir" },
          { item: "shivas_guard" },
          { item: "radiance" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Chen: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916263",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "chen_holy_persuasion", // 1
          `chen_penitence`, // 2
          "chen_holy_persuasion", // 3
          `chen_penitence`, // 4
          "chen_holy_persuasion", // 5
          "chen_hand_of_god", // 6
          "chen_holy_persuasion", // 7
          "chen_penitence", // 8
          "chen_penitence", // 9
          "special_bonus_unique_chen_11", // 10
          `chen_divine_favor`, // 11
          "chen_hand_of_god", // 12
          "chen_divine_favor", // 13
          "chen_divine_favor", // 14
          `special_bonus_unique_chen_8`, // 15
          `chen_divine_favor`, // 16
          "special_bonus_attributes", // 17
          "chen_hand_of_god", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chen_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_chen_12`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `ring_of_regen`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [`mekansm`, `boots`, `magic_wand`, `infused_raindrop`],
          mid_game: [
            `holy_locket`,
            `guardian_greaves`,
            `solar_crest`,
            `force_staff`,
          ],
          late_game: [
            `aghanims_shard`,
            `ultimate_scepter`,
            `vladmir`,
            `assault`,
            `boots_of_bearing`,
          ],
          situational: [
            `blight_stone`,
            `glimmer_cape`,
            `aeon_disk`,
            `pipe`,
            `phylactery`,
            `ghost`,
            `lotus_orb`,
            `helm_of_the_overlord`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `mekansm`,
            `holy_locket`,
            `guardian_greaves`,
            `solar_crest`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            `arcane_ring`,
            `seeds_of_serenity`,
            "philosophers_stone",
            `pupils_gift`,
            `quickening_charm`,
            `ceremonial_robe`,
            "spy_gadget",
            `spell_prism`,
            `force_field`,
            `demonicon`,
          ],
        },
      },
    ],
    ability_tooltips: {
      // special_bonus_unique_chen_2: `You can take the strong dispel level 25 talent over this suggested one if they have strong AoE disables like Magnus RP or Tidehunter Ravage.`,
      chen_divine_favor: `You can take a point in Divine Favour at level 2 or 4 if the lane is tough and the enemy heroes are pressuring your carry.`,
    },
    item_tooltips: {
      ward_sentry: `Buy two sentries with the bounty rune gold to keep the camps unblocked.`,
      //infused_raindrop: "Against magical burst.",
      mekansm:
        "A core item that allows you to group up early and pressure buildings.",
      solar_crest: `A situational item that buffs one of your right-clicking cores and allows you to take Roshan earlier.`,
      holy_locket: `Improves the healing ability of your ultimate.`,
      aghanims_shard: `Allows you to take ancient creeps with Holy Persuasion. The ancients are much more powerful than normal creeps.`,
      lotus_orb: `For reflect, dispel and armor.`,
      ultimate_scepter: `An incredible item that gives you another save on top of your ultimate.`,
    },
    combo: [], // There is no particular combo for Chen
    counter_items: {
      laning_phase: {
        all: [],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: { all: [{ item: "spirit_vessel" }], support: [], core: [] },
      late_game: { all: [], support: [], core: [] },
    },
  },

  Clinkz: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916348",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "clinkz_tar_bomb", // 1
          "clinkz_death_pact", // 2
          "clinkz_tar_bomb", // 3
          "clinkz_strafe", // 4
          "clinkz_tar_bomb", // 5
          "clinkz_wind_walk", // 6
          "clinkz_tar_bomb", // 7
          "clinkz_strafe", // 8
          "clinkz_strafe", // 9
          "special_bonus_unique_clinkz_1", // 10
          "clinkz_strafe", // 11
          "clinkz_wind_walk", // 12
          "clinkz_death_pact", // 13
          "clinkz_death_pact", // 14
          "special_bonus_attack_range_75", // 15
          "clinkz_death_pact", // 16
          "special_bonus_attributes", // 17
          "clinkz_wind_walk", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_clinkz_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_clinkz_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "slippers",
            "circlet",
            "quelling_blade",
          ],
          early_game: [
            "falcon_blade",
            "power_treads",
            "maelstrom",
            "magic_wand",
          ],
          mid_game: ["dragon_lance", "gungir", "aghanims_shard", "lesser_crit"],
          late_game: [
            "sheepstick",
            "greater_crit",
            "skadi",
            "hurricane_pike",
            "bloodthorn",
          ],
          situational: [
            "infused_raindrop",
            "nullifier",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "ultimate_scepter",
            "orchid",
            "desolator",
          ],
          core: ["gungir", "black_king_bar", "dragon_lance", "greater_crit"],
          neutral: [
            "lance_of_pursuit",
            "faded_broach",
            "grove_bow",
            "ring_of_aquila",
            "enchanted_quiver",
            "elven_tunic",
            "mind_breaker",
            "spell_prism",
            "desolator_2",
            "ex_machina",
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
      gungir: "A core mid-game item that helps with setting up kills.",
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
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
          {
            item: "ring_of_regen",
            info: "As a support extra consumables or as a core items that provide regen.",
          },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          {
            item: "blink",
            info: "On heroes that have disables, Blink is great at catching clinkz.",
          },
        ],
        support: [
          { item: "SentryDust" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff", info: "To move out of Burning Barrage path" },
        ],
        core: [{ item: "blade_mail" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "SentryDustGem" }],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Clockwerk: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
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
          `special_bonus_unique_clockwerk_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_clockwerk_6`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `wind_lace`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            "urn_of_shadows",
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [`pavise`, `force_staff`, `glimmer_cape`, `aghanims_shard`],
          late_game: [
            `ultimate_scepter`,
            `boots_of_bearing`,
            `shivas_guard`,
            `octarine_core`,
          ],
          situational: [
            `spirit_vessel`,
            `pipe`,
            `blade_mail`,
            `wind_waker`,
            `solar_crest`,
            `guardian_greaves`,
            `lotus_orb`,
            `aeon_disk`,
            `heavens_halberd`,
            `guardian_greaves`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `pavise`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            `pogo_stick`,
            `unstable_wand`,
            `pupils_gift`,
            `philosophers_stone`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            "ascetic_cap",
            `havoc_hammer`,
            `giants_ring`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /*special_bonus_unique_clockwerk_2: `The leash makes sure an enemy hero cannot get out of Power Cogs with their mobility spells, such as Mirana Leap or Phoenix Dive.`,*/
      /* special_bonus_unique_clockwerk_6:
        "You can take this talent over the other one if the opponents become short on damage once you become spell-immune.", */
    },
    item_tooltips: {
      magic_wand: `Start with magic_stick instead of boots if you expect high frequency of spells being used on the lane.`,
      ward_sentry: `Buy one with the bounty rune gold if your pull camp is blocked.`,
      tranquil_boots:
        "A core boots upgrade that allows you to sustain HP and move fast around the map. You can consider Phase Boots instead if you have a good start.",
      spirit_vessel: "Against heavy healing lineup.",
      force_staff:
        "A core item that allows you to catch up to opponents` heroes even in scenario when they get a Force Staff as well.",
      boots_of_bearing: `An excellent upgrade for tranquil boots in the late game.`,
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter: `A core item that upgrades all your spells and improves your impact in fights.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `rattletrap_overclocking`,
      `rattletrap_rocket_flare`,
      `rattletrap_hookshot`,
      `rattletrap_battery_assault`,
      `rattletrap_power_cogs`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Clockwerk",
          },
          { item: "boots", info: "To keep the distance from the Clockwerk" },
          {
            item: "cloak",
            info: "Clockwerk is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          {
            item: "ward_observer",
            info: "To keep an eye on Clockwerks position and disallow him to sneak up to you",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  // YoonA plays hero
  "Crystal Maiden": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916517",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "crystal_maiden_crystal_nova", // 1
          "crystal_maiden_frostbite", // 2
          "crystal_maiden_brilliance_aura", // 3
          "crystal_maiden_frostbite", // 4
          "crystal_maiden_frostbite", // 5
          "crystal_maiden_brilliance_aura", // 6
          "crystal_maiden_frostbite", // 7
          `crystal_maiden_freezing_field`, // 8
          `crystal_maiden_crystal_nova`, // 9
          `special_bonus_hp_250`, // 10
          `crystal_maiden_crystal_nova`, // 11
          "crystal_maiden_freezing_field", // 12
          "crystal_maiden_crystal_nova", // 13
          `crystal_maiden_brilliance_aura`, // 14
          `special_bonus_unique_crystal_maiden_frostbite_castrange`, // 15
          `crystal_maiden_brilliance_aura`, // 16
          "special_bonus_attributes", // 17
          "crystal_maiden_freezing_field", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_crystal_maiden_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_crystal_maiden_1", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `clarity`,
            `enchanted_mango`,
            `enchanted_mango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            `infused_raindrop`,
            "magic_wand",
            "wind_lace",
          ],
          mid_game: [
            "glimmer_cape",
            "force_staff",
            `aghanims_shard`,
            `boots_of_bearing`,
          ],
          late_game: [
            `black_king_bar`,
            `blink`,
            `ultimate_scepter`,
            `aeon_disk`,
          ],
          situational: [
            "ring_of_basilius",
            `lotus_orb`,
            "ethereal_blade",
            "octarine_core",
            `shivas_guard`,
            `pavise`,
            `sheepstick`,
            `wind_waker`,
            "travel_boots",
          ],
          core: [
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `black_king_bar`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      crystal_maiden_freezing_field: `You can skill your ultimate at level 6 if the enemy team does not have ways of cancellation.`,
      special_bonus_attack_speed_225: `You can skill this talent over recommended one if you want to destroy a phoenix egg or undying tombstone.`,
      special_bonus_unique_crystal_maiden_2:
        "You can skill this talent over recommended one if you are against mega creeps.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: `You can start with it if your laning partner also uses a lot of mana early. Send more HP consumables from base using the bounty rune gold.`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots: `A core boots upgrade which fixes her movement speed issues. Can be combined with Drums to get Boots of Bearing.`,
      glimmer_cape:
        "A core defensive item. It can be used during Freezing Field channeling.",
      black_king_bar: `Allows you to channel Freezing Field longer. Couples well with Blink Dagger to be able to position your ultimate nicely.`,
      blink: "Goes well with the build centered around your ultimate.",
      aghanims_shard:
        "Allows you to cast and move slowly while channeling the Freezing Field.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `An incredible late game pick up that goes will with Blink Dagger, Black King Bar and Aghanims Shard.`,
      pavise: `A situational item to gain some mana regen and buff yourself and your cores against physical damage.`,
    },
    combo: [
      `crystal_maiden_frostbite`,
      `crystal_maiden_crystal_nova`,
      `crystal_maiden_freezing_field`,
      `glimmer_cape`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Crystal Maiden`s Arcane Aura allows her and her allies to have faster mana regeneration which will result in more spells being used against you",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Crystal Maiden",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          {
            item: "infused_raindrop",
            info: "Infused Raindrops allow you to offset magical damage coming from Crystal Maiden`s spells",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Frostbite" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  "Dark Seer": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916602",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "dark_seer_ion_shell", // 1
          `dark_seer_vacuum`, // 2
          "dark_seer_ion_shell", // 3
          `dark_seer_surge`, // 4
          "dark_seer_ion_shell", // 5
          "dark_seer_wall_of_replica", // 6
          "dark_seer_ion_shell", // 7
          "dark_seer_surge", // 8
          "dark_seer_surge", // 9
          `dark_seer_surge`, // 10
          `special_bonus_unique_dark_seer_7`, // 11
          "dark_seer_wall_of_replica", // 12
          "dark_seer_vacuum", // 13
          `dark_seer_vacuum`, // 14
          `dark_seer_vacuum`, // 15
          `special_bonus_unique_dark_seer_2`, // 16
          "special_bonus_attributes", // 17
          "dark_seer_wall_of_replica", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dark_seer", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_dark_seer_3`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `sobi_mask`,
            `branches`,
            `branches`,
            `branches`,
            `clarity`,
            `ward_observer`,
          ],
          early_game: [`vanguard`, `soul_ring`, "arcane_boots", `magic_wand`],
          mid_game: [`guardian_greaves`, `pipe`, `blink`, `aghanims_shard`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `sheepstick`,
            `refresher`,
          ],
          situational: [
            `ring_of_basilius`,
            `null_talisman`,
            `crimson_guard`,
            `shivas_guard`,
            `helm_of_the_dominator`,
            `black_king_bar`,
            `aeon_disk`,
            `heavens_halberd`,
            `solar_crest`,
            `force_staff`,
            `lotus_orb`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `guardian_greaves`,
            `pipe`,
            `blink`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            "quickening_charm",
            `cloak_of_flames`,
            `spell_prism`,
            "trickster_cloak",
            `fallen_sky`,
            `ex_machina`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* special_bonus_unique_dark_seer_7:
        "On level fifteen, you should take the level fifteen talent before this level ten one. The dota client disallows me to set it up in such order in graphics above.", */
    },
    item_tooltips: {
      // null_talisman: `A couple of Null Talismans provide you with mana regen to spam Ion Shell.`,
      soul_ring: `You can get soul ring over two null talismans when the armor is useful, for example against Phantom Assassin`,
      infused_raindrop: `Against magical burst.`,
      arcane_boots:
        "A core boots upgrade for mana sustain. You can disassemble it down the road.",
      ultimate_scepter: `A core item that lets you initiate in fights with a stun.`,
      blink: `Allows you to get Vacuum into Wall of Replica combo on multiple opponents. Goes well with Aghanims Scepter.`,
      aghanims_shard: `A buff to Surge that makes it tougher for enemies to get away from or chase surged allies.`,
      guardian_greaves: `A core item to improve your teamfight potential with auras and sustain.`,
      pipe: "Against heavy magical-damage lineups.",
      black_king_bar: "To be able to get your combo off.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `dark_seer_ion_shell`,
      `dark_seer_surge`,
      `blink`,
      `dark_seer_normal_punch`,
      `dark_seer_vacuum`,
      `dark_seer_wall_of_replica`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Dark Seer will use one or two Ion Shells per wave",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the Ion Shells",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "nullifier", info: "To dispel Ion Shell and Surge" },
          { item: "abyssal_blade" },
          {
            item: "shivas_guard",
            info: "To deal with Wall of Replica illusions",
          },
        ],
      },
    },
  },

  // YoonA plays hero
  "Dark Willow": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916714",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dark_willow_bramble_maze", // 1
          "dark_willow_shadow_realm", // 2
          `dark_willow_bramble_maze`, // 3
          `dark_willow_cursed_crown`, // 4
          "dark_willow_bramble_maze", // 5
          "dark_willow_bedlam", // 6
          "dark_willow_bramble_maze", // 7
          `dark_willow_shadow_realm`, // 8
          `dark_willow_shadow_realm`, // 9
          `dark_willow_shadow_realm`, // 10
          `special_bonus_unique_dark_willow_5`, // 11
          "dark_willow_bedlam", // 12
          `dark_willow_cursed_crown`, // 13
          `dark_willow_cursed_crown`, // 14
          `special_bonus_unique_dark_willow_7`, // 15
          `dark_willow_cursed_crown`, // 16
          "special_bonus_attributes", // 17
          "dark_willow_bedlam", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dark_willow_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_speed_100", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`cyclone`, `aghanims_shard`, `blink`, `force_staff`],
          late_game: [
            `ultimate_scepter`,
            `sheepstick`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `ring_of_basilius`,
            `glimmer_cape`,
            `aether_lens`,
            `ghost`,
            "spirit_vessel",
            `lotus_orb`,
            `wind_waker`,
            `moon_shard`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            "cyclone",
            "aghanims_shard",
            `blink`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          neutral: [
            `pogo_stick`,
            `mysterious_hat`,
            "philosophers_stone",
            `pupils_gift`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `pirate_hat`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /*special_bonus_unique_dark_willow_2: `You can take the attack speed talent over this one if you have the Aghanims Scepter.`,*/
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that solves your hp sustain issues but also allows you to move around quickly.",
      cyclone:
        "A core item that combines well with Cursed Crown and Bramble Maze.",
      spirit_vessel: "Against heavy healing lineup.",
      aghanims_shard: "A core item for extra control.",
      moon_shard: `Works well in the late game with the aghanims scepter.`,
      revenants_brooch: `An incredible late game item to go with the aghanims scepter.`,
      ultimate_scepter:
        "If the game opens up for you, you can pick up this item and work on acquiring more attack speed with level twenty-five talent and items.",
    },
    combo: [
      `dark_willow_cursed_crown`,
      `cyclone`,
      `dark_willow_shadow_realm`,
      `dark_willow_bramble_maze`,
      `dark_willow_bedlam`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Dark Willow maintaines her laning presence by placing well Bramble Maze and doing burst of magic damage with Shadow Realm",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Dark Willow",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Dark Willow is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          {
            item: "manta",
            info: "To dispel Bramble Maze root and Cursed Crown",
          },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "butterfly",
            info: "To deal with Shadow Realm upgraded by Aghanim`s Scepter",
          },
          {
            item: "satanic",
            info: "To be able to dispel Cursed Crown or Bramble Maze root",
          },
        ],
      },
    },
  },

  Dawnbreaker: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917167",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `dawnbreaker_celestial_hammer`, // 1
          `dawnbreaker_fire_wreath`, // 2
          "dawnbreaker_celestial_hammer", // 3
          "dawnbreaker_fire_wreath", // 4   equals to `starbreaker`
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
          `special_bonus_unique_dawnbreaker_fire_wreath_cooldown`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `holy_locket`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `pipe`,
          ],
          late_game: [
            `force_staff`,
            `solar_crest`,
            `aghanims_shard`,
            `blink`,
            `assault`,
          ],
          situational: [
            `orb_of_venom`,
            `black_king_bar`,
            `glimmer_cape`,
            `wind_waker`,
            `crimson_guard`,
            `lotus_orb`,
            `spirit_vessel`,
            `heavens_halberd`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `holy_locket`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `pipe`,
          ],
          neutral: [
            `faded_broach`,
            `mysterious_hat`,
            `bullwhip`,
            `dragon_scale`,
            `defiant_shell`,
            `ogre_seal_totem`,
            `havoc_hammer`,
            `ascetic_cap`,
            `fallen_sky`,
            `giants_ring`,
          ],
        },
        item_tooltips: {
          orb_of_venom: `Lets you pressure the lane by staying on enemy heroes.`,
          holy_locket:
            "A core item that boosts the healing coming for Solar Guardian and other sources.",
          guardian_greaves: `A core item that provides sustain and auras for your team.`,
          ultimate_scepter:
            "A core item that provides even more healing but also evasion to allies under effect of Solar Guardian.",
          aghanims_shard: `A late game pick up to help you transition into a damage dealer.`,
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2715224221",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `dawnbreaker_celestial_hammer`, // 1
          `dawnbreaker_fire_wreath`, // 2
          `dawnbreaker_luminosity`, // 3
          `dawnbreaker_celestial_hammer`, // 4   equals to `starbreaker`
          `dawnbreaker_celestial_hammer`, // 5
          "dawnbreaker_solar_guardian", // 6
          `dawnbreaker_celestial_hammer`, // 7
          `dawnbreaker_luminosity`, // 8
          `dawnbreaker_fire_wreath`, // 9
          `dawnbreaker_fire_wreath`, // 10
          `dawnbreaker_fire_wreath`, // 11
          "dawnbreaker_solar_guardian", // 12
          `special_bonus_unique_dawnbreaker_fire_wreath_swipe`, // 13
          "dawnbreaker_luminosity", // 14
          "special_bonus_unique_dawnbreaker_luminosity_crit", // 15
          "dawnbreaker_luminosity", // 16
          "special_bonus_attributes", // 17
          "dawnbreaker_solar_guardian", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dawnbreaker_luminosity_attack_count", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dawnbreaker_fire_wreath_cooldown", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `branches`,
            `branches`,
            `gauntlets`,
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [`vanguard`, `phase_boots`, "soul_ring", `magic_wand`],
          mid_game: [
            `echo_sabre`,
            `desolator`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [`harpoon`, `assault`, `greater_crit`, `abyssal_blade`],
          situational: [
            `armlet`,
            `orb_of_corrosion`,
            `spirit_vessel`,
            `crimson_guard`,
            `ultimate_scepter`,
            `pipe`,
            `guardian_greaves`,
            `solar_crest`,
            `heavens_halberd`,
            `bloodthorn`,
            `silver_edge`,
            `satanic`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `phase_boots`,
            `soul_ring`,
            `echo_sabre`,
            `desolator`,
            `black_king_bar`,
            `aghanims_shard`,
            `harpoon`,
            `assault`,
          ],
          neutral: [
            `duelist_gloves`,
            `faded_broach`,
            `orb_of_destruction`,
            `dragon_scale`,
            "cloak_of_flames",
            `ogre_seal_totem`,
            `havoc_hammer`,
            `penta_edged_sword`,
            `fallen_sky`,
            `giants_ring`,
          ],
        },
        ability_tooltips: {
          dawnbreaker_celestial_hammer: `If you can play for a kill, you can put a second point in this spell on level 3 and get Luminosity on Level 4.`,
        },
        item_tooltips: {
          orb_of_corrosion: `Lets you apply more pressure in the lane.`,
          phase_boots: "A core item that allows you to gap-close faster.",
          soul_ring: "A core item that helps with mana sustain.",
          echo_sabre: `A core item that boosts your damage output and tankiness. Choose between this item and Desolator based on whether you need more tankiness or damage. Builds into Harpoon in the late game.`,
          desolator: `A core item that gives you massive burst potential with Starbreaker. Choose between this item and Echo Sabre based on whether you need more damage or some tankiness.`,
          bloodthorn: `Allows you to land solo kills while disabling enemies with a silence.`,
          vanguard: `A core item that gives you tankiness and sustain in the early game. You should rush this in the lane and play aggressively once you have it.`,
          heavens_halberd: "Especially good against ranged right-clikers.",
          aghanims_shard:
            "A core item that grants allows you to become spell-immune during Starbreaker.",
          blink:
            "For gap-closing. Can be upgraded down the road into Overwhelming Blink.",
          silver_edge: "For break effect and burst.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
    },
    combo: [
      `dawnbreaker_solar_guardian`,
      `dawnbreaker_celestial_hammer`,
      `dawnbreaker_fire_wreath`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Dawnbreaker`s Luminosity and Solar Guardian",
          },
          { item: "wind_lace", info: "To keep distance from Dawnbreaker" },
          { item: "boots", info: "To keep distance from Dawnbreaker" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from Dawnbreaker`s spells and provides armor against right-clicks and Starbreaker",
          },
          {
            item: "vladmir",
            info: "As the game goes, a core Dawnbreaker does more and more physical damage and armor will offset that",
          },
        ],
        support: [
          { item: "ghost" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [{ item: "silver_edge" }, { item: "hurricane_pike" }],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "shivas_guard",
            info: "To reduce healing and armor against Starbreaker",
          },
          { item: "skadi", info: "To reduce healing" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  // YoonA plays hero
  Dazzle: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917255",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dazzle_poison_touch", // 1
          "dazzle_shadow_wave", // 2
          "dazzle_poison_touch", // 3
          "dazzle_shallow_grave", // 4
          `dazzle_shadow_wave`, // 5
          "dazzle_bad_juju", // 6
          `dazzle_shadow_wave`, // 7
          `dazzle_shadow_wave`, // 8
          `dazzle_shallow_grave`, // 9
          `dazzle_shallow_grave`, // 10
          `dazzle_shallow_grave`, // 11
          "dazzle_bad_juju", // 12
          `special_bonus_mp_regen_175`, // 13
          `dazzle_poison_touch`, // 14
          `special_bonus_unique_dazzle_2`, // 15
          `dazzle_poison_touch`, // 16
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
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `circlet`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `arcane_boots`,
            `hand_of_midas`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `glimmer_cape`,
            `pavise`,
            `aghanims_shard`,
            `guardian_greaves`,
            "force_staff",
          ],
          late_game: [
            `aeon_disk`,
            `boots_of_bearing`,
            `sheepstick`,
            `ultimate_scepter`,
          ],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `ghost`,
            `solar_crest`,
            `holy_locket`,
            `guardian_greaves`,
            `pipe`,
            `lotus_orb`,
            `blink`,
            `aether_lens`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `hand_of_midas`,
            `glimmer_cape`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            `faded_broach`,
            "philosophers_stone",
            `bullwhip`,
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            `seer_stone`,
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      wind_lace: `It helps you chase people down and reapplying Poison Touch.`,
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace the wind lace for it.`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots: `A core boots upgrade which gives you mobility to cast spells in time. Can be combined with Drums to make Boots of Bearing.`,
      holy_locket: `A situational item that goes well with the healing theme of the hero.`,
      hand_of_midas: `A core item to improve your scaling in the game. Works well with the cooldown reduction from Bad Juju.`,
      glimmer_cape: "A core defensive item.",
      aghanims_shard: "A core item that provides extra control in fights.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [], // There is no particular combo for Dazzle
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Dazzle tends to use Shadow Wave and Poison Touch every creep wave to kill creeps and apply pressure on the opponents",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Dazzle",
          },
          {
            item: "wind_lace",
            info: "To move away when Poison Touch is applied",
          },
          { item: "boots", info: "To move away when Poison Touch is applied" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to negate healing and be able to kill off a hero after the Shallow Grave expires",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Dazzle" },
        ],
        support: [],
        core: [],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Death Prophet": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917391",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "death_prophet_carrion_swarm", // 1
          "death_prophet_spirit_siphon", // 2
          "death_prophet_spirit_siphon", // 3
          "death_prophet_carrion_swarm", // 4
          `death_prophet_spirit_siphon`, // 5
          "death_prophet_exorcism", // 6
          `death_prophet_spirit_siphon`, // 7
          "death_prophet_silence", // 8
          `death_prophet_carrion_swarm`, // 9
          `death_prophet_carrion_swarm`, // 10
          `special_bonus_magic_resistance_12`, // 11 Talent
          "death_prophet_exorcism", // 12
          "death_prophet_silence", // 13
          `death_prophet_silence`, // 14
          "special_bonus_hp_300", // 15 Talent
          `death_prophet_silence`, // 16
          "special_bonus_attributes", // 17
          "death_prophet_exorcism", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_death_prophet_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_death_prophet`, // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            `branches`,
            `branches`,
            "circlet",
            "slippers",
          ],
          early_game: [
            `wraith_band`,
            `arcane_boots`,
            `magic_wand`,
            `infused_raindrop`,
            "mekansm",
          ],
          mid_game: ["guardian_greaves", "kaya_and_sange", "aghanims_shard"],
          late_game: [
            `shivas_guard`,
            `octarine_core`,
            `refresher`,
            `aeon_disk`,
            `sheepstick`,
          ],
          situational: [
            `blink`,
            `ghost`,
            `heavens_halberd`,
            `assault`,
            `pipe`,
            `sphere`,
          ],
          core: ["guardian_greaves", "kaya_and_sange", `aghanims_shard`],
          neutral: [
            "arcane_ring",
            `faded_broach`,
            `bullwhip`,
            `dragon_scale`,
            "eye_of_the_vizier",
            "quickening_charm",
            `defiant_shell`,
            `spell_prism`,
            `mirror_shield`,
            `force_boots`,
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_magic_resistance_12: `You can take the damage talent over this suggested one on mid Death Prophet.`,
      /* special_bonus_unique_death_prophet_5:
        "You can take this talent at level 25 over the suggested one. Usually, having 5 Spirit Siphons per fight due to Aghanim`s Shard should be more than enough thus I prefer the Exorcism talent. Also, if you have Refresher Orb or Shard in late game, the Siphon talent is redundant.", */
    },
    item_tooltips: {
      ward_observer:
        "If you are playing mid Death Prophet but also on the offlane to have vision around your lane.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
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
    combo: [
      `death_prophet_exorcism`,
      `death_prophet_silence`,
      `death_prophet_spirit_siphon`,
      `death_prophet_carrion_swarm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Death Prophet`s Crypt Swarm allows her to secure creep lasthits and harass opponents frequently",
          },
          {
            item: "ring_of_regen",
            info: "Against a sidelane Death Prophet, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Death Prophet",
          },
          {
            item: "boots",
            info: "To keep the distance from the Death Prophet",
          },
          {
            item: "cloak",
            info: "Death Prophet is heavy on magical damage and Cloak negates 15% of it",
          },
          { item: "armor", info: "Buy armor items against Exorcism" },
        ],
        support: [],
        core: [
          {
            item: "ring_of_health",
            info: "Against a sidelane Death Prophet, for sustain on the lane",
          },
        ],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Silence" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
        ],
      },
    },
  },

  // YoonA plays hero
  Disruptor: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561304",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "disruptor_thunder_strike", // 1
          `disruptor_glimpse`, // 2
          `disruptor_glimpse`, // 3
          `disruptor_kinetic_field`, // 4
          "disruptor_glimpse", // 5
          "disruptor_static_storm", // 6
          "disruptor_glimpse", // 7
          `disruptor_kinetic_field`, // 8
          `disruptor_kinetic_field`, // 9
          `disruptor_kinetic_field`, // 10
          `special_bonus_unique_disruptor_2`, // 11
          "disruptor_static_storm", // 12
          `disruptor_thunder_strike`, // 13
          `disruptor_thunder_strike`, // 14
          "special_bonus_unique_disruptor_7", // 15
          `disruptor_thunder_strike`, // 16
          "special_bonus_attributes", // 17
          "disruptor_static_storm", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_disruptor_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_disruptor_8", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `boots_of_bearing`,
          ],
          late_game: [`force_staff`, `blink`, `refresher`, `octarine_core`],
          situational: [
            `ring_of_basilius`,
            `guardian_greaves`,
            `aether_lens`,
            `lotus_orb`,
            `aghanims_shard`,
            `ethereal_blade`,
            `wind_waker`,
            `octarine_core`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `pavise`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `boots_of_bearing`,
            `force_staff`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            "seer_stone",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      glimmer_cape: `A defensive item to give you the element of surprise with your Static Storm.`,
      aghanims_shard: `A luxury item that improves Thunder Strike and kills creep waves without having to be there.`,
      infused_raindrop: "Against magical burst.",
      boots_of_bearing: `An upgrade to tranquil boots that improves your impact in teamfights.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      blink:
        "Allows you to land a multi-hero Static Storm especially once you have Aghanim`s Scepter.",
    },
    combo: [
      `disruptor_thunder_strike`,
      `disruptor_glimpse`,
      `disruptor_kinetic_field`,
      `disruptor_static_storm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Disruptor`s Thuder Strike is high damaging spell that is likely to be used at least once per creep wave",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Disruptor",
          },
          {
            item: "cloak",
            info: `Disruptor is heavy on magical damage and Cloak negates 15% of it`,
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "wind_waker", info: "To save an ally in Static Storm" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Doom: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561417",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `doom_bringer_scorched_earth`, // 1
          `doom_bringer_devour`, // 2
          `doom_bringer_scorched_earth`, // 3
          `doom_bringer_devour`, // 4
          "doom_bringer_scorched_earth", // 5
          "doom_bringer_doom", // 6
          "doom_bringer_scorched_earth", // 7
          `doom_bringer_devour`, // 8
          "doom_bringer_devour", // 9
          "special_bonus_unique_doom_4", // 10
          `doom_bringer_infernal_blade`, // 11
          "doom_bringer_doom", // 12
          "doom_bringer_infernal_blade", // 13
          "doom_bringer_infernal_blade", // 14
          `special_bonus_unique_doom_6`, // 15
          "doom_bringer_infernal_blade", // 16
          "special_bonus_attributes", // 17
          "doom_bringer_doom", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_doom_10", // 20
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
            `circlet`,
            `slippers`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `boots`,
            `wraith_band`,
            `hand_of_midas`,
            `magic_wand`,
          ],
          mid_game: [`crimson_guard`, `pipe`, `blink`, `travel_boots`],
          late_game: [
            `black_king_bar`,
            `octarine_core`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          situational: [
            `phase_boots`,
            `guardian_greaves`,
            `force_staff`,
            `lotus_orb`,
            `shivas_guard`,
            "blade_mail",
            "heavens_halberd",
            `invis_sword`,
            `refresher`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `vanguard`,
            `boots`,
            `hand_of_midas`,
            `crimson_guard`,
            `pipe`,
            `blink`,
            `black_king_bar`,
            `ultimate_scepter`,
          ],
          neutral: [
            "broom_handle",
            `pogo_stick`,
            `vambrace`,
            `vampire_fangs`,
            `quickening_charm`,
            `cloak_of_flames`,
            "timeless_relic",
            `spell_prism`,
            "giants_ring",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      doom_bringer_devour: `Satyr Tormenter, Ogre Frostmage and Wildwing Ripper would be the best to devour early on. As the game progresses make sure to get a Centaur stomp to Blink stun heroes.`,
      doom_bringer_doom: `Be sure to use your ulty on a very mobile target or a target that needs to use a big ultimate. Always check if they have Linken Sphere.`,
      special_bonus_unique_doom_11: `Consider skilling this talent over the suggested one when the Break effect is useful against enemy heroes.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      phase_boots: `A situational boots upgrade that provides you an extra movement speed burst. Useful against high physical damage lineups.`,
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
      ultimate_scepter: `A core item that lets you use Doom on yourself and run in. Makes it hard for enemy heroes to stand and fight against you. Also helps in maintaining a full duration Doom and moving from one target to the next.`,
      shivas_guard:
        "Provides Doom with armor and mana pool which he lacks. Also helps with AOE slow that goes with Scorched Earth.",
      refresher: `A core item on Doom primarily for two ultimates. Make sure you pair it up with an item that gives you mana e.g Shiva, Lotus or you wont have mana to use everything.`,
    },
    combo: [
      `doom_bringer_scorched_earth`,
      `blink`,
      `doom_bringer_doom`,
      `doom_bringer_infernal_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep up or escape from Doom when Scorched Earth is active",
          },
          {
            item: "boots",
            info: "To keep up or escape from Doom when Scorched Earth is active",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }, { item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere", info: "Prevents Doom from ultying you easily." },
          { item: "wind_waker", info: "To save an ally that is Doomed" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Dragon Knight": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561505",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "dragon_knight_dragon_tail", // 1
          "dragon_knight_dragon_blood", // 2
          "dragon_knight_dragon_blood", // 3
          "dragon_knight_breathe_fire", // 4
          "dragon_knight_dragon_blood", // 5
          "dragon_knight_elder_dragon_form", // 6
          "dragon_knight_breathe_fire", // 7
          "dragon_knight_breathe_fire", // 8
          "dragon_knight_breathe_fire", // 9
          "special_bonus_attack_damage_15", // 10
          "dragon_knight_dragon_tail", // 11
          "dragon_knight_elder_dragon_form", // 12
          "dragon_knight_dragon_tail", // 13
          "dragon_knight_dragon_tail", // 14
          "special_bonus_hp_400", // 15
          "dragon_knight_dragon_blood", // 16
          "special_bonus_attributes", // 17
          "dragon_knight_elder_dragon_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dragon_knight_7", // 20
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
            "branches",
            "gauntlets",
            "gauntlets",
          ],
          early_game: ["bracer", "soul_ring", "power_treads", "magic_wand"],
          mid_game: [
            "hand_of_midas",
            "blink",
            "black_king_bar",
            "ultimate_scepter",
          ],
          late_game: [
            "ultimate_scepter",
            "assault",
            "bloodthorn",
            "overwhelming_blink",
            "satanic",
            "manta",
          ],
          situational: [
            "meteor_hammer",
            "aghanims_shard",
            "heavens_halberd",
            "silver_edge",
            "nullifier",
            "armlet",
            "radiance",
          ],
          core: [
            "power_treads",
            "soul_ring",
            "blink",
            "black_king_bar",
            "ultimate_scepter",
          ],
          neutral: [
            "duelist_gloves",
            "broom_handle",
            "vambrace",
            "gossamer_cape",
            "titan_sliver",
            "ogre_seal_totem",
            "ninja_gear",
            "spell_prism",
            "fallen_sky",
            "giants_ring",
          ],
        },
      },
    ],
    ability_tooltips: {
      dragon_knight_dragon_tail:
        "You should use this to stun and deny creeps in the laning stage. If you are against a ranged laner you can skip it and take breath fire.",
      dragon_knight_breathe_fire:
        "You can put extra points in this over dragon blood if you don't need the tankiness and want to farm abit faster. ",
      dragon_knight_elder_dragon_form:
        "You should try to pressure the tower as much as possible when you get this spell. Your level 1 ULT does DPS to towers so try to get value out of that. ",
    },
    item_tooltips: {
      ward_observer:
        "For mid it`s important for highground vision in the lane.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane. eg. batrider/brisle",
      power_treads:
        "A core boots upgrade that provides you with attack speed increase and some mana savings by toggling it.",
      hand_of_midas:
        "If you can get it early usually on mid Dragon Knight. If you think the game is going to be slow.",
      blink:
        "A core item that helps you initiate the fights. Can be coupled with Bloodthorn down the road to burst the stunned hero.",
      aghanims_shard:
        "A core item that helps with farming alot. Try to get asap.",
      radiance:
        " A good item versus illusions and summons. Goes well with Elder Dragons Splash attack.",
      black_king_bar:
        "Allows you to stay in the middle of the fight. Dragon Blood provides you with physical damage resistance and Black King Bar negates most of the magical damage and disables.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      silver_edge: "For break effect.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against high HP pool and HP regeneration from Dragon Blood",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "maelstrom" },
          {
            item: "silver_edge",
            info: "To break Dragon Knights passive that makes him more tanky.",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          {
            item: "sphere",
            info: " To prevent the instant blink stun combo from Dragon Knight.",
          },
        ],
        support: [],
        core: [
          {
            item: "mjollnir",
            info: "Magical damage from procs doesn`t get reduced by Dragon Blood",
          },
          {
            item: "skadi",
            info: "Reduces his regeneration,lifesteal and slows him by 50% when he is in Dragon form. ",
          },
          {
            item: "monkey_king_bar",
            info: "Magical damage from procs doesn`t get reduced by Dragon Blood",
          },
          { item: "butterfly" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Drow Ranger": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561590",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "drow_ranger_frost_arrows", // 1
          "drow_ranger_multishot", // 2
          "drow_ranger_frost_arrows", // 3
          "drow_ranger_wave_of_silence", // 4
          "drow_ranger_multishot", // 5
          "drow_ranger_marksmanship", // 6
          "drow_ranger_multishot", // 7
          "drow_ranger_multishot", // 8
          "drow_ranger_frost_arrows", // 9
          "drow_ranger_frost_arrows", // 10
          "drow_ranger_wave_of_silence", // 11
          "drow_ranger_marksmanship", // 12
          "drow_ranger_wave_of_silence", // 13
          "special_bonus_unique_drow_ranger_2", // 14
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
          "special_bonus_unique_drow_ranger_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "slippers",
            "branches",
            "branches",
            "circlet",
            "quelling_blade",
          ],
          early_game: [
            "power_treads",
            "wraith_band",
            "magic_wand",
            "ring_of_basilius",
            "dragon_lance",
          ],
          mid_game: [
            "yasha",
            "manta",
            "hurricane_pike",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            "silver_edge",
            "skadi",
            "butterfly",
            "satanic",
            "swift_blink",
          ],
          situational: [
            "greater_crit",
            "infused_raindrop",
            "ultimate_scepter",
            "sange_and_yasha",
            "blink",
            "sphere",
            "mjollnir",
          ],
          core: [
            "power_treads",
            "hurricane_pike",
            "manta",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "lance_of_pursuit",
            "unstable_wand",
            "grove_bow",
            "ring_of_aquila",
            "titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            "apex",
            "force_boots",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      drow_ranger_frost_arrows:
        "You can get a third point in this before level 6 if you feel it will lead to kills or an easier lane.",
      drow_ranger_wave_of_silence:
        "You can skill a point in this spell earlier than suggested if that allows you to survive the lane or land a kill.",
      drow_ranger_multishot:
        "This will be used off-cooldown for farming, So the earlier you max it the faster you will farm. If there is going to be an engagement soon make sure to keep this spell ready.",
    },
    item_tooltips: {
      magic_stick:
        "If you are playing against heroes that spam spells in the lane start with this (eg.brisleback, batrider).",
      infused_raindrop:
        "For mana regen and if you`re playing against annoying magical nukes.",
      power_treads:
        "Try to get this as early as possible in the laning stage in order to ramp up your farm speed and survivability.",
      dragon_lance:
        "A core item that allows you to shoot from further away. Can be upgrade to Pike against gap-closing heroes.",
      manta:
        "Good farming item for drow but better when you are playing aginast silences or annoying debuffs/roots.",
      sange_and_yasha:
        "A good alternative to manta if you are playing against alot of illusion clear and feel the extra hp will help you survive.",
      black_king_bar:
        "Try to get bkb as late as possible but keep in mind that many games you will need to get it quite early if you want to take engagements.",
      blink: "To reposition. Can be upgraded to Swift Blink down the road.",
      aghanims_shard: "To offset healing and for extra bit of damage.",
      silver_edge: "For break effect and to be able to reposition.",
      sphere:
        "Against powerful single target disables/debuffs and gap-closing spells and items (eg.Doom/Batrider).",
      mjollnir:
        "Against illusion-based heroes. It is better than Aghanim`s Scepter.",
      ultimate_scepter:
        "This paired with mjollnir can be really good against illusion-based heroes.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To catch up to Drow Ranger or offset the slow coming from Frost Arrows when escaping",
          },
          {
            item: "boots",
            info: "To catch up to Drow Ranger or offset the slow coming from Frost Arrows when escaping",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Drow Ranger",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "blink", info: "To close the gap to Drow Ranger" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "heavens_halberd" },
          { item: "invis_sword", info: "To close the gap to Drow Ranger" },
          { item: "manta", info: "To dispel Gust" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [],
        core: [{ item: "assault" }, { item: "abyssal_blade" }],
      },
    },
  },

  "Earth Spirit": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

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
          `earth_spirit_boulder_smash`, // 9
          "special_bonus_unique_earth_spirit_4", // 10
          `earth_spirit_boulder_smash`, // 11
          "earth_spirit_magnetize", // 12
          "earth_spirit_geomagnetic_grip", // 13
          `earth_spirit_geomagnetic_grip`, // 14
          "special_bonus_unique_earth_spirit", // 15
          `earth_spirit_geomagnetic_grip`, // 16
          "special_bonus_attributes", // 17
          "earth_spirit_magnetize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_earth_spirit_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_earth_spirit_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "orb_of_venom",
            `ward_observer`,
          ],
          early_game: [
            "urn_of_shadows",
            "tranquil_boots",
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: [
            `boots_of_bearing`,
            `black_king_bar`,
            `aghanims_shard`,
            `cyclone`,
          ],
          late_game: [
            "ultimate_scepter",
            `ethereal_blade`,
            "blink",
            `aeon_disk`,
            `octarine_core`,
          ],
          situational: [
            "spirit_vessel",
            `veil_of_discord`,
            `pavise`,
            `kaya_and_sange`,
            "lotus_orb",
            "heavens_halberd",
            `pipe`,
            `solar_crest`,
            `overwhelming_blink`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "urn_of_shadows",
            `magic_wand`,
            `boots_of_bearing`,
            `black_king_bar`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            `dragon_scale`,
            `bullwhip`,
            "quickening_charm",
            `ceremonial_robe`,
            `havoc_hammer`,
            "timeless_relic",
            `havoc_hammer`,
            `giants_ring`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      orb_of_venom: `Works well in staying on top of enemy heroes along with the Boulder Smash slow.`,
      urn_of_shadows:
        "A core item that provides you with needed stats and allows you to snowball off of a first kill.",
      tranquil_boots: `A core boots upgrade that solves hp sustain issues and allows you to roam around faster. Can combine them with Drums to get Boots of Bearing.`,
      spirit_vessel:
        "Against heavy healing lineup but could also be a good pick-up in most cases as it also tanks you up.",
      aghanims_shard: `A core upgrade that allows you to cast Grip on allies as a save.`,
      black_king_bar: "To be able to initiate and get long Magnetize off.",
      lotus_orb: "For reflect, dispel and armor.",
      heavens_halberd: "Especially good against ranged right-clicking cores.",
      blink: "Goes well with Aghanim`s Scepter.",
    },
    combo: [
      `earth_spirit_rolling_boulder`,
      `black_king_bar`,
      `earth_spirit_geomagnetic_grip`,
      `earth_spirit_magnetize`,
      `earth_spirit_boulder_smash`,
      `earth_spirit_rolling_boulder`,
      `cyclone`,
      `earth_spirit_rolling_boulder`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "cloak",
            info: "Earth Spirit is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          { item: "ward_observer", info: "To spot Earth Spirit rolling in" },
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Earth Spirit does his spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "mage_slayer" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Geomagnetic Grip" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  Earthshaker: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561769",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "earthshaker_fissure", // 1
          "earthshaker_enchant_totem", // 2
          `earthshaker_aftershock`, // 3
          `earthshaker_fissure`, // 4
          `earthshaker_fissure`, // 5
          "earthshaker_echo_slam", // 6
          `earthshaker_fissure`, // 7
          "earthshaker_aftershock", // 8
          `earthshaker_aftershock`, // 9
          `earthshaker_aftershock`, // 10
          "special_bonus_unique_earthshaker_4", // 11
          "earthshaker_echo_slam", // 12
          "earthshaker_enchant_totem", // 13
          "earthshaker_enchant_totem", // 14
          "special_bonus_unique_earthshaker_6", // 15
          "earthshaker_enchant_totem", // 16
          "special_bonus_attributes", // 17
          "earthshaker_echo_slam", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_earthshaker_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_earthshaker_5`, // 25
        ],
        items: {
          starting: ["boots", "clarity", "ward_observer", "ward_sentry"],
          early_game: [
            `arcane_boots`,
            "wind_lace",
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: ["blink", `force_staff`, `aghanims_shard`, `aether_lens`],
          late_game: [
            "ultimate_scepter",
            `octarine_core`,
            `refresher`,
            `overwhelming_blink`,
          ],
          situational: [
            `blood_grenade`,
            `boots_of_bearing`,
            `soul_ring`,
            `aeon_disk`,
            `black_king_bar`,
            `invis_sword`,
            `arcane_blink`,
            `wind_waker`,
            `ethereal_blade`,
            `lotus_orb`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
            `octarine_core`,
          ],
          neutral: [
            "pogo_stick",
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            `ceremonial_robe`,
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
      //smoke_of_deceit: `Lets your roam between lanes to ward and find kills across the map.`,
      soul_ring: `Solves the mana issues if you get Tranquil Boots instead of Arcane Boots.`,
      tranquil_boots: `You can get Tranquil Boots instead of Arcane Boots if you plan on getting Boots of Bearing. Also build Soul Ring to solve your mana problems.`,
      blink: "A core item that allows you to get a multi-hero Echo Slam.",
      aghanims_shard:
        "A core item that reduces cooldown of the fissure, allows you to walk on it and applies half of the stun duration of Aftershock along it.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `earthshaker_enchant_totem`,
      `earthshaker_fissure`,
      `blink`,
      `attack`,
      `earthshaker_echo_slam`,
      `earthshaker_enchant_totem`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "cloak",
            info: "Earthshaker is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Elder Titan": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561834",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "elder_titan_ancestral_spirit", // 1
          "elder_titan_natural_order", // 2
          `elder_titan_ancestral_spirit`, // 3
          "elder_titan_echo_stomp", // 4
          "elder_titan_echo_stomp", // 5
          "elder_titan_earth_splitter", // 6
          "elder_titan_echo_stomp", // 7
          `elder_titan_echo_stomp`, // 8
          "elder_titan_natural_order", // 9
          "elder_titan_natural_order", // 10
          `elder_titan_natural_order`, // 11
          "elder_titan_earth_splitter", // 12
          "elder_titan_ancestral_spirit", // 13
          "elder_titan_ancestral_spirit", // 14
          `special_bonus_attack_speed_25`, // 15
          "special_bonus_unique_elder_titan", // 16
          "special_bonus_attributes", // 17
          "elder_titan_earth_splitter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_100", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_elder_titan_4`, // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `boots_of_bearing`,
            `force_staff`,
            `solar_crest`,
            `glimmer_cape`,
          ],
          late_game: [
            `ultimate_scepter`,
            `aghanims_shard`,
            `harpoon`,
            `refresher`,
          ],
          situational: [
            `orb_of_venom`,
            `phase_boots`,
            `spirit_vessel`,
            `pavise`,
            `pipe`,
            `guardian_greaves`,
            `ghost`,
            `lotus_orb`,
            `shivas_guard`,
            `heavens_halberd`,
            `octarine_core`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `boots_of_bearing`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "bullwhip",
            `philosophers_stone`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `havoc_hammer`,
            `trickster_cloak`,
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_attack_speed_25: `At level 15, you should skill the level 15 talent first and then the level 10 talent. The dota client system disallows me to indicate that in the graphics above.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      phase_boots: `An alternate boots upgrade that lets you play a little more greedy with armor and damage.`,
      spirit_vessel: "Against heavy healing lineup.",
      ultimate_scepter:
        "A core item that allows you to deliver right-clicks as you become spell immune based on the number of heroes your spirit passed through.",
      aghanims_shard: `Lets you immediately get on top of people after you stomp them.`,
      lotus_orb: `For reflect, dispel and armor.`,
    },
    combo: [
      `elder_titan_ancestral_spirit`,
      `elder_titan_echo_stomp`,
      `elder_titan_earth_splitter`,
      `elder_titan_return_spirit`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from Elder Titan and dodge the Echo Stomp",
          },
          {
            item: "boots",
            info: "To keep the distance from Elder Titan and dodge the Echo Stomp",
          },
          {
            item: "armor",
            info: "If Elder Titan is within 350 radius of you and he has Natural Order skilled your base armor will be reduced",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault" },
          {
            item: "butterfly",
            info: "Against a core right-clicking Elder Titan",
          },
        ],
      },
    },
  },

  // eidendota plays hero
  "Ember Spirit": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561902",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "ember_spirit_flame_guard", // 1
          "ember_spirit_sleight_of_fist", // 2
          "ember_spirit_sleight_of_fist", // 3
          "ember_spirit_searing_chains", // 4
          "ember_spirit_sleight_of_fist", // 5
          "ember_spirit_fire_remnant", // 6
          "ember_spirit_sleight_of_fist", // 7
          "ember_spirit_searing_chains", // 8
          "ember_spirit_searing_chains", // 9
          "ember_spirit_searing_chains", // 10
          "ember_spirit_flame_guard", // 11
          "ember_spirit_flame_guard", // 12
          "ember_spirit_flame_guard", // 13
          "special_bonus_unique_ember_spirit_1", // 14
          "special_bonus_unique_ember_spirit_3", // 15
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
            "quelling_blade",
            "branches",
            "branches",
            "faerie_fire",
            "tango",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "orb_of_corrosion",
            "magic_wand",
            "phase_boots",
          ],
          mid_game: [
            "maelstrom",
            "black_king_bar",
            "kaya_and_sange",
            "aghanims_shard",
            "ultimate_scepter",
          ],
          late_game: ["gungir", "refresher", "shivas_guard", "octarine_core"],
          situational: [
            "infused_raindrop",
            "sphere",
            "desolator",
            "radiance",
            "travel_boots",
            "cyclone",
            "skadi",
          ],
          core: [
            "maelstrom",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "kaya_and_sange",
          ],
          neutral: [
            "arcane_ring",
            "unstable_wand",
            "ring_of_aquila",
            "orb_of_destruction",
            "quickening_charm",
            "cloak_of_flames",
            "mind_breaker",
            "spell_prism",
            "penta_edged_sword",
            "desolator_2",
            "mirror_shield",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      ember_spirit_searing_chains:
        "You can get more levels in this earlier than suggested if you feel your team lacks disable and want more kill threat. In that case you would want to max sleight and chains.",
      ember_spirit_sleight_of_fist:
        "You can max this over flameguard in matchup`s where you want to dodge projectiles or harrass low armour ranged heroes. Works really well with orb of corrosion and phase boots in the early game.",
      ember_spirit_flame_guard:
        "This spell is your most useful farming tool while also being good for kills and defensive purposes. Try to be as efficient and possible and make sure you don't use this to farm if a fight is going to happen soon.",
      ember_spirit_fire_remnant:
        "You should try to farm more dangerous lanes when your team can't by placing remnants far away and using them to escape. Also when you get 6 in the laning stage place a remnant on one side and go to the opposite in order to secure power runes.",
    },
    item_tooltips: {
      bottle:
        "You want to rush bottle every game. It's really good if you can get it before the 2mins rune spawn.",
      magic_stick:
        "If you are laning against spell spammers start with this (eg. Batirder/Zeus).",
      infused_raindrop: "Against magical burst.",
      orb_of_corrosion:
        "A core item that works well with Sleight of Fist. Rush this item and max sleight of fist in the lane.",
      phase_boots:
        "A core boots upgrade. Make sure to activate Phase Boots before using dropping a Fire Remnant as it will travel faster.",
      maelstrom:
        "A core item that serves as a farming and dps tool. It can proc with Sleight of Fist.",
      kaya_and_sange:
        "A great item for survivability and overall damage output.",
      ultimate_scepter:
        "A core item that adds to your burst and mobility. Goes well with Refresher later on.",
      black_king_bar:
        "Many games it will be neccesary to get this as your second item after maelstrom, as ember wants to be in all the engagements early on and throughout the game.",
      aghanims_shard:
        "Adds to damage output and allows you to snowball in the fights with extra Fire Remnants.",
    },
    combo: [
      "ember_spirit_flame_guard",
      "ember_spirit_sleight_of_fist",
      "ember_spirit_searing_chains",
      "ember_spirit_fire_remnant",
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from Ember Spirit and his Flame Guard",
          },
          {
            item: "boots",
            info: "To keep the distance from Ember Spirit and his Flame Guard",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Ember Spirit",
          },
          {
            item: "cloak",
            info: "Ember Spirit`s Flame Guard and Searing Chains do a lot of magical damage early on and Cloak negates 15% of it",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [
          { item: "cyclone", info: "Purges off flame guard" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks and Sleight of Fist",
          },
          { item: "rod_of_atos" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Searing Chains" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [
          {
            item: "black_king_bar",
            info: "Against a magical build Ember Spirit",
          },
        ],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Enchantress: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561968",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `enchantress_impetus`, // 1
          `enchantress_enchant`, // 2
          "enchantress_enchant", // 3
          `enchantress_natures_attendants`, // 4
          `enchantress_enchant`, // 5
          "enchantress_untouchable", // 6
          `enchantress_impetus`, // 7
          `enchantress_impetus`, // 8
          `enchantress_impetus`, // 9
          `special_bonus_magic_resistance_8`, // 10
          `enchantress_natures_attendants`, // 11
          "enchantress_untouchable", // 12
          `enchantress_natures_attendants`, // 13
          `enchantress_natures_attendants`, // 14
          `special_bonus_attack_damage_45`, // 15
          `enchantress_enchant`, // 16
          "special_bonus_attributes", // 17
          "enchantress_untouchable", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_enchantress_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_enchantress_4`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `infused_raindrop`,
            `fluffy_hat`,
          ],
          mid_game: [
            `boots_of_bearing`,
            `force_staff`,
            `aghanims_shard`,
            `solar_crest`,
          ],
          late_game: [
            `hurricane_pike`,
            `ultimate_scepter`,
            `sheepstick`,
            `black_king_bar`,
          ],
          situational: [
            `power_treads`,
            `spirit_vessel`,
            `glimmer_cape`,
            `pavise`,
            `holy_locket`,
            `wind_waker`,
            `ghost`,
            `pipe`,
            `lotus_orb`,
            `shivas_guard`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `force_staff`,
            `boots_of_bearing`,
            `aghanims_shard`,
            `solar_crest`,
            `hurricane_pike`,
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            `unstable_wand`,
            `grove_bow`,
            `orb_of_destruction`,
            `dandelion_amulet`,
            "enchanted_quiver",
            "spy_gadget",
            `trickster_cloak`,
            "force_field",
            `pirate_hat`,
          ],
        },
      },
    ],
    ability_tooltips: {
      enchantress_natures_attendants: `You can put a point in this at level 2 if the enemy lane has a ton of harass for you and your carry.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells on the lane.`,
      infused_raindrop: "Against magical burst.",
      power_treads: `You can upgrade your Brown Boots to Power Treads if you dont plan to make Boots of Bearing.`,
      tranquil_boots: `You can upgrade your Brown Boots to Tranquil Boots if you plan to make Boots of Bearing.`,
      boots_of_bearing: `A potent mid game item that boosts your tankiness and damage output.`,
      holy_locket: `A situational item to boost your healing output.`,
      aghanims_shard: `A core item that lets you set up a gank on an enemy hero. Especially good against summons heroes.`,
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `enchantress_natures_attendants`,
      `enchantress_enchant`,
      `enchantress_impetus`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Enchantress",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "To block camps against Enchant ability",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          {
            item: "black_king_bar",
            info: "Against a core Enchantress as Impetus doesn`t pierce spell immunity",
          },
          { item: "silver_edge" },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: "black_king_bar",
            info: "Against a core Enchantress as Impetus doesn`t pierce spell immunity",
          },
        ],
        core: [{ item: "butterfly", info: "Against a core Enchantress" }],
      },
    },
  },

  Enigma: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

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
          `enigma_malefice`, // 8
          `enigma_malefice`, // 9
          `special_bonus_unique_enigma_4`, // 10
          `enigma_midnight_pulse`, // 11
          `enigma_black_hole`, // 12
          `enigma_midnight_pulse`, // 13
          `enigma_midnight_pulse`, // 14
          `special_bonus_hp_250`, // 15
          `enigma_midnight_pulse`, // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enigma_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_enigma`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `sobi_mask`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `null_talisman`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `guardian_greaves`,
            `blink`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `refresher`,
            `ultimate_scepter`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `hand_of_midas`,
            `soul_ring`,
            `sphere`,
            `invis_sword`,
            `helm_of_the_overlord`,
            `shivas_guard`,
            `pipe`,
            `aether_lens`,
            `force_staff`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
            `black_king_bar`,
            `aghanims_shard`,
            `refresher`,
          ],
          neutral: [
            "pogo_stick",
            `arcane_ring`,
            "philosophers_stone",
            `bullwhip`,
            `psychic_headband`,
            `quickening_charm`,
            `ninja_gear`,
            `spell_prism`,
            `seer_stone`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          hand_of_midas: "If you can get it early and get away with it.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2712384931",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "enigma_demonic_conversion", // 1
          "enigma_malefice", // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          `enigma_malefice`, // 7
          `enigma_malefice`, // 8
          `enigma_midnight_pulse`, // 9
          `special_bonus_unique_enigma_6`, // 10
          `enigma_demonic_conversion`, // 11
          `enigma_black_hole`, // 12
          `enigma_midnight_pulse`, // 13
          `enigma_midnight_pulse`, // 14
          `special_bonus_hp_250`, // 15
          `enigma_midnight_pulse`, // 16
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
            `tango`,
            `tango`,
            `blood_grenade`,
            `clarity`,
            `branches`,
            `enchanted_mango`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `ring_of_basilius`,
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            `guardian_greaves`,
          ],
          late_game: [
            `refresher`,
            `ultimate_scepter`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `sphere`,
            `invis_sword`,
            `shivas_guard`,
            `pipe`,
            `force_staff`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
            `black_king_bar`,
            `aghanims_shard`,
            `refresher`,
            `aeon_disk`,
          ],
          neutral: [
            `pogo_stick`,
            `arcane_ring`,
            `philosophers_stone`,
            `bullwhip`,
            `psychic_headband`,
            `quickening_charm`,
            `ninja_gear`,
            `spell_prism`,
            `seer_stone`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          ward_sentry: "To block the pull camps.",
          magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
          ring_of_basilius:
            "If your laning partner also uses a lot of mana early.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      arcane_boots: "A core item for mana sustain.",
      blink: "A core item that allows you to land a multi-hero Black Hole.",
      black_king_bar: "A core item that allows you to channel Black Hole.",
      aghanims_shard: `Lets you have more eidolons when you cast Malefice to do more damage.`,
      sphere:
        "Against targetable spell-immunity piercing disables that prevent you from channeling Black Hole.",
      aeon_disk:
        "Gives you a second chance to survive and get your Black Hole off.",
    },
    combo: [
      `enigma_demonic_conversion`,
      `black_king_bar`,
      `blink`,
      `enigma_midnight_pulse`,
      `enigma_black_hole`,
      `enigma_malefice`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "blight_stone",
            info: "Blight Stone helps you to kill off eidolons which are main Enigma`s laning tool",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "To block camps in area where Enigma will look to jungle in",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
        ],
      },
      late_game: {
        all: [
          { item: "aeon_disk" },
          { item: "sheepstick" },
          { item: "wind_waker", info: "To save an ally in Black Hole" },
        ],
        support: [],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  // eidendota plays hero
  "Faceless Void": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562159",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "faceless_void_time_walk", // 1
          "faceless_void_time_lock", // 2
          "faceless_void_time_walk", // 3
          "faceless_void_time_dilation", // 4
          "faceless_void_time_walk", // 5
          "faceless_void_chronosphere", // 6
          "faceless_void_time_walk", // 7
          "faceless_void_time_lock", // 8
          "faceless_void_time_lock", // 9
          "faceless_void_time_lock", // 10
          "faceless_void_time_dilation", // 11
          "faceless_void_chronosphere", // 12
          "faceless_void_time_dilation", // 13
          "faceless_void_time_dilation", // 14
          "special_bonus_unique_faceless_void_7", // 15
          "special_bonus_unique_faceless_void_5", // 16
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
            "circlet",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "wraith_band"],
          mid_game: ["hand_of_midas", "maelstrom", "manta", "black_king_bar"],
          late_game: ["mjollnir", "skadi", "satanic", "butterfly", "refresher"],
          situational: [
            "sange_and_yasha",
            "infused_raindrop",
            "hand_of_midas",
            "black_king_bar",
            "aghanims_shard",
            "blink",
            "sphere",
            "monkey_king_bar",
          ],
          core: ["power_treads", "hand_of_midas", "mjollnir", "black_king_bar"],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "lance_of_pursuit",
            "broom_handle",
            //"misericorde",
            //"dagger_of_ristul", Removed in 7.33
            "ring_of_aquila",
            "vambrace",
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
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
      faceless_void_time_dilation:
        "Dont have to put more than 1 point in this spell as it scales very badly. You should level your stats and talents first.",
      special_bonus_unique_faceless_void_7:
        "Consider skipping the first talent until you skill your spells and stats.",
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
        "For extra mobility. Often times you`ll get it from Roshan.",
      blink:
        "To be able to seize the moment and get good Chronosphere out. Swift Blink is an option later on as well.",
      sphere: "Against powerful single-target disables and debuffs.",
      skadi:
        "Against ranged heroes. Also gives you good mana pool that lets you use Refresher.",
      monkey_king_bar: "Against evasion.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Faceless Void, be able chase him down after Time Walk and offset Time Dilation slow",
          },
          {
            item: "boots",
            info: "To keep the distance from Faceless Void, be able chase him down after Time Walk and offset Time Dilation slow",
          },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Time Walk",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "blink",
            info: "Faceless Void usually jumps and uses ulty. That gives you a fraction of a second to react and blink away.",
          },
          { item: "spirit_vessel" },
          { item: "cyclone" },
          { item: "rod_of_atos" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
          { item: "basher" },
          { item: "manta", info: "To dispel Time Dilation" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "ethereal_blade",
            info: "Make a target ethereal and prevent Faceless Void from right clicking them as he relies solely on physical attacks.",
          },
          { item: "aeon_disk", info: "Will buy you time during Chronosphere." },
          { item: "wind_waker", info: "To save an ally in Chronosphere" },
        ],
        support: [],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Grimstroke: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562245",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "grimstroke_dark_artistry", // 1   equals to `stroke of faith`
          "grimstroke_spirit_walk", // 2   equals to `ink swell`
          "grimstroke_spirit_walk", // 3
          "grimstroke_ink_creature", // 4   equals to `phantom`s embrace`
          "grimstroke_spirit_walk", // 5
          `grimstroke_soul_chain`, // 6
          "grimstroke_spirit_walk", // 7
          "grimstroke_dark_artistry", // 8
          `grimstroke_dark_artistry`, // 9
          `special_bonus_unique_grimstroke_7`, // 10
          `grimstroke_dark_artistry`, // 11
          "grimstroke_soul_chain", // 12
          `grimstroke_ink_creature`, // 13
          `grimstroke_ink_creature`, // 14
          `special_bonus_unique_grimstroke_6`, // 15
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
            `tango`,
            `blood_grenade`,
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            "aghanims_shard",
            `force_staff`,
          ],
          late_game: [
            "ultimate_scepter",
            "aeon_disk",
            "ethereal_blade",
            `sheepstick`,
            `octarine_core`,
          ],
          situational: [
            `guardian_greaves`,
            `glimmer_cape`,
            `wind_waker`,
            `dagon_5`,
            `phylactery`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            `tranquil_boots`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            `philosophers_stone`,
            `eye_of_the_vizier`,
            `quickening_charm`,
            `psychic_headband`,
            `timeless_relic`,
            `spy_gadget`,
            `force_field`,
            `seer_stone`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item that helps with mana sustain. You can disassemble it and use the Energy Booster for Aether Lens. You can upgrade boots into Tranquil Boots afterwards.",
      aether_lens:
        "A core item that allows you to get spells off from further away.",
      aghanims_shard: "A core item that upgrades Ink Swell.",
      ethereal_blade: `An incredible item to combo with Soul Bind and Phantoms Embrace.`,
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `grimstroke_soul_chain`,
      `ethereal_blade`,
      `grimstroke_ink_creature`,
      `grimstroke_spirit_walk`,
      `grimstroke_dark_artistry`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Grimstroke`s Stroke of Faith is a strong low cooldown spell with which you are likely to be hit by once or twice per creep wave",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Grimstroke",
          },
          {
            item: "wind_lace",
            info: "To move away from Ink Swell and offset the slow from Stroke of Faith",
          },
          {
            item: "boots",
            info: "To move away from Ink Swell and offset the slow from Stroke of Faith",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  // YoonA plays hero
  Gyrocopter: {
    gameplay_version: "7.33c",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562334",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "gyrocopter_homing_missile", // 1
          "gyrocopter_rocket_barrage", // 2
          "gyrocopter_rocket_barrage", // 3
          "gyrocopter_flak_cannon", // 4
          "gyrocopter_flak_cannon", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_flak_cannon", // 7
          "gyrocopter_flak_cannon", // 8
          "gyrocopter_rocket_barrage", // 9
          "special_bonus_hp_200", // 10
          "gyrocopter_rocket_barrage", // 11
          "gyrocopter_call_down", // 12
          "gyrocopter_homing_missile", // 13
          "gyrocopter_homing_missile", // 14
          "special_bonus_unique_gyrocopter_2", // 15
          "gyrocopter_homing_missile", // 16
          "special_bonus_attributes", // 17
          "gyrocopter_call_down", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_gyrocopter_flak_cannon_bonus_damage", // 20
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
            "branches",
            `circlet`,
            "circlet",
          ],
          early_game: [
            `wraith_band`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            "ring_of_basilius",
          ],
          mid_game: [
            "maelstrom",
            "ultimate_scepter",
            "black_king_bar",
            "lesser_crit",
          ],
          late_game: ["satanic", "greater_crit", "skadi", "butterfly"],
          situational: [
            `mask_of_madness`,
            `falcon_blade`,
            `phylactery`,
            `aghanims_shard`,
            `hurricane_pike`,
            `monkey_king_bar`,
            `silver_edge`,
            `mjollnir`,
            `sange_and_yasha`,
            `manta`,
            `disperser`,
            `sphere`,
            `swift_blink`,
            `rapier`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `maelstrom`,
            `ultimate_scepter`,
            `black_king_bar`,
            `satanic`,
            `greater_crit`,
          ],
          neutral: [
            `duelist_gloves`,
            "unstable_wand",
            "grove_bow",
            `specialists_array`,
            "paladin_sword",
            "elven_tunic",
            "mind_breaker",
            `ninja_gear`,
            `apex`,
            `pirate_hat`,
          ],
        },
        ability_tooltips: {
          /* gyrocopter_rocket_barrage:
            "You can also not level this spell and instead level stats. Upside is faster farming in the early game and more survivability, Downside is that you have less damage in the lane and early game fights. In this case you would get 1 your 1 lvl in rocket and then max flak and then stats until you can't anymore.", */
          gyrocopter_homing_missile:
            "You should use this spell to secure ranged creeps in the laning stage, by timing the missle as ranged creeps get low.",
          gyrocopter_flak_cannon:
            "This is your main tool for farming throught out the game so use it off cooldown, but rememeber that you need it for fights too.",
        },
        item_tooltips: {
          magic_wand: `Start with Magic Stick if you are laning against enemies that spam a lot of spells, such as batrider/bristleback.`,
          wraith_band: `Decent stats in the lane and early game and double the stats 25:00mins+`,
          falcon_blade:
            "You can get this item if you feel you`re having mana issues, Decent item overall",
          ring_of_basilius:
            "You should either get this or falcon blade if you are leveling rocket as you will have mana issues.",
          power_treads:
            "You want to get PT as fast as possibe to increase farming speed and strenght in the lane.",
          lesser_crit:
            "A core item that speeds up your farm. Goes well with Aghanim`s Scepter side-gunner.",
          ultimate_scepter:
            "A core item that significantly increases your dps. The side-gunner can also fire while you are disabled and all attack modifiers apply as well.",
          black_king_bar:
            "In most games you`ll need this in order to take engagements so usually you`ll get it 2nd/3rd item, but if you can get away with not buying it early it will pay off.",
          satanic:
            "A core item that provides you with sustain and dispel. Works well with Aghanim`s Scepter.",
          silver_edge: "For break effect and to reposition.",
          monkey_king_bar: "Against evasion.",
          mjollnir: "Great against illusion based heroes.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2712385902",
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
            `tango`,
            `ring_of_basilius`,
            `blood_grenade`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            `magic_wand`,
            `veil_of_discord`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aghanims_shard`,
            `force_staff`,
            `ethereal_blade`,
            `boots_of_bearing`,
          ],
          late_game: [`octarine_core`, `blink`, `refresher`, `wind_waker`],
          situational: [
            `arcane_boots`,
            `spirit_vessel`,
            `pavise`,
            `glimmer_cape`,
            `aether_lens`,
            `solar_crest`,
            `phylactery`,
            `lotus_orb`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `veil_of_discord`,
            `aghanims_shard`,
            `force_staff`,
            `ethereal_blade`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            `ceremonial_robe`,
            "timeless_relic",
            `spell_prism`,
            `force_field`,
            `book_of_shadows`,
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
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
    },
    combo: [
      `gyrocopter_call_down`,
      `gyrocopter_homing_missile`,
      `gyrocopter_rocket_barrage`,
      `gyrocopter_flak_cannon`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Gyrocopter tends to use Rocket Barrage and Flak Cannon frequently",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from Gyrocopter`s Rocket Barrage",
          },
          {
            item: "boots",
            info: "To keep the distance from Gyrocopter`s Rocket Barrage",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks and Flak Cannon",
          },
          { item: "lotus_orb" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
          { item: "cyclone" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "assault" }, { item: "butterfly" }],
      },
    },
  },

  Hoodwink: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

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
          `special_bonus_unique_hoodwink_bushwhack_damage`, // 15
          "hoodwink_scurry", // 16
          "special_bonus_attributes", // 17
          "hoodwink_sharpshooter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_hoodwink_sharpshooter_speed", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_hoodwink_bushwhack_radius`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            "branches",
            "branches",
            "circlet",
            `ward_observer`,
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            `blink`,
            `aghanims_shard`,
          ],
          late_game: [
            `force_staff`,
            `gungir`,
            `ethereal_blade`,
            `ultimate_scepter`,
          ],
          situational: [
            `veil_of_discord`,
            `spirit_vessel`,
            `glimmer_cape`,
            `solar_crest`,
            `pavise`,
            `guardian_greaves`,
            `rod_of_atos`,
            `lotus_orb`,
            `wind_waker`,
            `aeon_disk`,
            `octarine_core`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            "aether_lens",
            `tranquil_boots`,
            `blink`,
            `aghanims_shard`,
            `gungir`,
            `force_staff`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            `quickening_charm`,
            "psychic_headband",
            `timeless_relic`,
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item for mana sustain. Can be disassembled and the Energy Booster can be used for Aether Lens. Boots can upgraded to Tranquil boots afterwards.",
      spirit_vessel: "Against heavy-healing lineup.",
      aether_lens: "A core item that extends the cast range of your spells.",
      solar_crest:
        "Reducing opponents armor increases your Acorn Shot effectiveness. Also very useful to amplify your carry while you stay behind them.",
      lotus_orb: "For reflecting, dispelling and armor.",
      blink: "To close the gap and land your combo.",
    },
    combo: [
      `hoodwink_scurry`,
      `hoodwink_acorn_shot`,
      `hoodwink_bushwhack`,
      `hoodwink_sharpshooter`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Hoodwink often times casts and combines her two offensive spells",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Hoodwink",
          },
          {
            item: "quelling_blade",
            info: "Against a sidelane Hoodwink to make Bushwhack harder to hit and Scurry to be less effective. Use it quickly to also destroy the tree that he places under you.",
          },
          {
            item: "infused_raindrop",
            info: "Against burst of magical damage coming from Bushwhack and Sharshooter",
          },
          {
            item: "cloak",
            info: "Hoodwink does a lot of magical damage and Cloak offsets 15% of it",
          },
          {
            item: "blade_mail",
            info: "Could potentially be lethal to Hoodwink as you absorb his Sharpshooter.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "mekansm" },

          { item: "rod_of_atos", info: "To be able to catch her" },
          { item: "blink", info: "To be able to catch her" },
        ],
        support: [
          { item: "glimmer_cape" },
          {
            item: "SentryDustGem",
            info: "Hoodwink often goes for Scurry Camouflage talent on level 15",
          },
        ],
        core: [
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
          {
            item: "revenants_brooch",
            info: "An item that grants your next 5 attacks to have True Strike and go through Scurry`s evasion.",
          },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "abyssal_blade", info: "To be able to pin her" },
          { item: "skadi", info: "To be able to catch her" },
          { item: "assault", info: "To be able to catch her" },
          {
            item: "bloodthorn",
            info: "To pierce evasion from Scurry and to Silence her",
          },
          { item: "monkey_king_bar", info: "To pierce evasion from Scurry" },
          { item: "sheepstick", info: "To be able to catch her" },
        ],
      },
    },
  },

  Huskar: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [
          DOTA_COACH_GUIDE_ROLE.CARRY,
          DOTA_COACH_GUIDE_ROLE.MID,
          DOTA_COACH_GUIDE_ROLE.OFFLANE,
        ],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562484",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          `huskar_inner_fire`, // 1
          "huskar_berserkers_blood", // 2
          "huskar_burning_spear", // 3
          `huskar_burning_spear`, // 4
          `huskar_burning_spear`, // 5
          "huskar_life_break", // 6
          "huskar_berserkers_blood", // 7
          "huskar_berserkers_blood", // 8
          `huskar_berserkers_blood`, // 9
          "huskar_burning_spear", // 10
          "huskar_inner_fire", // 11
          `huskar_inner_fire`, // 12
          "huskar_inner_fire", // 13
          `special_bonus_unique_huskar_3`, // 14
          `special_bonus_unique_huskar_2`, // 15
          `huskar_life_break`, // 16
          "special_bonus_attributes", // 17
          "huskar_life_break", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_huskar_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_huskar_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "gauntlets",
            "gauntlets",
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [`boots`, `magic_wand`, `bracer`, `armlet`],
          mid_game: [
            "sange",
            `black_king_bar`,
            `heavens_halberd`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          late_game: [`blink`, `satanic`, `assault`, `aghanims_shard`],
          situational: [
            `power_treads`,
            `phase_boots`,
            `mage_slayer`,
            `octarine_core`,
            `sange_and_yasha`,
            `heart`,
            `monkey_king_bar`,
            `silver_edge`,
            `lotus_orb`,
            `sphere`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `boots`,
            `armlet`,
            `sange`,
            `black_king_bar`,
            `ultimate_scepter`,
            `travel_boots`,
            `satanic`,
          ],
          neutral: [
            `duelist_gloves`,
            `spark_of_courage`,
            "grove_bow",
            `vambrace`,
            "paladin_sword",
            "titan_sliver",
            "trickster_cloak",
            `mind_breaker`,
            "giants_ring",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      huskar_inner_fire: `You should skill this ability on level 1 as a midlane Huskar to secure a ranged creep last hit on the first wave.`,
    },
    item_tooltips: {
      ward_observer:
        "If you are playing mid Huskar but it is not bad to have vision around your sidelanes as well.",
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      armlet:
        "A core item that allows you to activate Berserker`s Blood while farming, doing Roshan or in fights. Helm of Iron Will should be the first component purchased you get most of the time as it solves your hp sustain and armor problems.",
      sange:
        "A core item that is standalone good but can be upgraded further. Amplifies the healing and tanks you up.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter:
        "A core item that provides you with extra reach and a 3s disable upon Life Break landing.",
      aghanims_shard: `A late game pick up to improve your survivability with Inner Fire.`,
      blink:
        "Allows you to instantly gap close and focus-fire an enemy hero. Can be upgraded to Overwhelming Blink down the road.",
      monkey_king_bar: "Against evasion and miss chance.",
      silver_edge: "For break and repositioning.",
    },
    combo: [`armlet`, `huskar_life_break`, `attack`, `huskar_inner_fire`],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "blight_stone",
            info: "Huskar is a low armor hero and if you can see yourself right-clicking him often then Blightstone is a good purchase",
          },

          { item: "wind_lace", info: "To keep the distance from Huskar" },
          { item: "boots", info: "To keep the distance from Huskar" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset Berserker`s Blood HP regeneration",
          },
          {
            item: "cloak",
            info: "Huskar does a lot of magical damage and Cloak offsets 15% of it",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          {
            item: "blade_mail",
            info: "Reflecting a big chunk of damage back to him as he jumps with Life Break.",
          },
          { item: "pipe" },
          { item: "eternal_shroud" },
          {
            item: "heavens_halberd",
            info: "This item is very effective versus ranged heroes like Huskar.",
          },
          {
            item: "hurricane_pike",
            info: "As he closes distance with Life Break, use this item to disengage and create distance.",
          },
          { item: "black_king_bar" },
          {
            item: "silver_edge",
            info: "Breaking Huskars passive will reduce a lot of his damage output.",
          },
          { item: "manta", info: "To dispel Inner Fire" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "skadi", info: "To reduce healing and slow him by 50%." },
          { item: "shivas_guard", info: "To reduce healing." },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "butterfly" },
          { item: "abyssal_blade" },
        ],
      },
    },
  },

  Invoker: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        // Midlane Quas Wex Invoker build | If an app user choses to play Invoker on non-mid role, this guide should be suggested over the other one
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QW",

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562552",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          `invoker_quas`, // 1
          `invoker_wex`, // 2
          `invoker_wex`, // 3
          `invoker_quas`, // 4
          "invoker_wex", // 5
          "invoker_quas", // 6
          "invoker_wex", // 7
          "invoker_quas", // 8
          "invoker_wex", // 9
          "invoker_exort", // 10
          `invoker_wex`, // 11
          "invoker_exort", // 12
          `invoker_wex`, // 13
          "invoker_exort", // 14
          "invoker_exort", // 15
          "invoker_exort", // 16
          `invoker_exort`, // 17
          `invoker_exort`, // 18
          `special_bonus_unique_invoker_3`, // 19
          `special_bonus_unique_invoker_9`, // 20
          `special_bonus_unique_invoker_additional_chaos_meteors`, // 21
          `invoker_quas`, // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_13", // 25
        ],
        items: {
          starting: [
            "tango",
            "mantle",
            "faerie_fire",
            "circlet",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            "null_talisman",
            "urn_of_shadows",
            "boots",
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `hand_of_midas`,
            `spirit_vessel`,
            `travel_boots`,
            `witch_blade`,
          ],
          late_game: [
            `octarine_core`,
            `blink`,
            `ultimate_scepter`,
            `sheepstick`,
          ],
          situational: [
            `falcon_blade`,
            `orchid`,
            `boots_of_bearing`,
            `aghanims_shard`,
            `wind_waker`,
            `revenants_brooch`,
            `hurricane_pike`,
            `ethereal_blade`,
            `shivas_guard`,
            `sphere`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            "urn_of_shadows",
            "hand_of_midas",
            "travel_boots",
            `witch_blade`,
            `octarine_core`,
            `ultimate_scepter`,
            `sheepstick`,
          ],
          neutral: [
            "mysterious_hat",
            `faded_broach`,
            "grove_bow",
            "specialists_array",
            `enchanted_quiver`,
            "quickening_charm",
            `timeless_relic`,
            "spell_prism",
            "ex_machina",
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          urn_of_shadows: "A core item to proc Cold Snap ticks.",
          witch_blade: `A core item to improve your damage output through right clicks and proc more Cold Snap ticks.`,
          spirit_vessel: "Against heavy healing lineup.",
          blink: "To close the gap and land your spell combo.",
        },
      },
      {
        // Midlane Quas Exort Invoker build
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QE",

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
          `invoker_quas`, // 8
          "invoker_exort", // 9
          `invoker_wex`, // 10
          "invoker_exort", // 11
          "invoker_wex", // 12
          "invoker_exort", // 13
          "invoker_wex", // 14
          "invoker_wex", // 15
          "invoker_wex", // 16
          "invoker_wex", // 17
          "invoker_wex", // 18
          `special_bonus_unique_invoker_3`, // 19
          `special_bonus_unique_invoker_9`, // 20
          `special_bonus_unique_invoker_additional_chaos_meteors`, // 21
          `invoker_quas`, // 22
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
            "branches",
            "ward_observer",
          ],
          early_game: [
            `boots`,
            `hand_of_midas`,
            `null_talisman`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `arcane_boots`,
            `octarine_core`,
            `travel_boots`,
            `black_king_bar`,
          ],
          late_game: [`blink`, `sheepstick`, `ultimate_scepter`, `refresher`],
          situational: [
            `wraith_band`,
            `power_treads`,
            `ancient_janggo`,
            `aghanims_shard`,
            `cyclone`,
            `revenants_brooch`,
            `hurricane_pike`,
            `bloodthorn`,
            `shivas_guard`,
            `sphere`,
            `aeon_disk`,
            `travel_boots_2`,
          ],
          core: [
            "hand_of_midas",
            `arcane_boots`,
            `octarine_core`,
            `travel_boots`,
            `black_king_bar`,
            `sheepstick`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            `mysterious_hat`,
            `arcane_ring`,
            `grove_bow`,
            `specialists_array`,
            `enchanted_quiver`,
            `quickening_charm`,
            `timeless_relic`,
            `spell_prism`,
            `ex_machina`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          blink:
            "A core item that allows you to close the gap and land your spell combo.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_invoker_3: `On level 19 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
      special_bonus_unique_invoker_9: `On level 20 take the suggested level 20 talent over this level 15 talent. Dota client disallows me to display the order properly in graphics above.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      hand_of_midas: "A core item that allows you to scale.",
      travel_boots: "A core item that allows you to cover the map with ease.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      ultimate_scepter:
        "A core item that provides spell-immunity piercring pure damage burst.",
      aghanims_shard: "For extra AoE damage.",
      sphere: "Against powerful single-target disables and debuffs.",
      aeon_disk: `Grants you a second chance to survive and get your spells and items off.`,
      arcane_boots: `A boots upgrade for Quas Exort Invoker that disassembles to get Octarine Core. You should follow up by upgrading Brown Boots to Boots of Travel.`,
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Against Quas Wex build Invoker to have burst of mana available after the EMP was used",
          },
          {
            item: "enchanted_mango",
            info: "Against Quas Wen build Invoker that casts EMP often",
          },
          {
            item: "wind_lace",
            info: "To easier dodge some of his skill shot spells",
          },
          {
            item: "boots",
            info: "To easier dodge some of his skill shot spells",
          },
          {
            item: "arcane_boots",
            info: "Against Quas Wex build Invoker that casts EMP often to burn mana and Arcane Boots will allow you to offset that",
          },
          {
            item: "cloak",
            info: "Invoker does a lot of magical damage and Cloak offsets 15% of it",
          },
        ],
        support: [{ item: "dust" }, { item: "ward_sentry" }],
        core: [
          {
            item: "soul_ring",
            info: "Against Quas Wex build Invoker that casts EMP often to burn mana and Soul Ring will allow you to offset that",
          },
          {
            item: "DamageItems",
            info: "Against Quas Exort Invoker, to compete with extra damage from levels in Exort",
          },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [
          { item: "SentryDust" },
          { item: "force_staff" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          {
            item: "pipe",
            info: "Invoker has a lot of AOE damage spells that this item could absorb.",
          },
          { item: "eternal_shroud" },
          {
            item: "blade_mail",
            info: "Invoker tends to throw several spell at once and Blademail could be a big threat.",
          },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Cold Snap." },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "aeon_disk" },
          {
            item: "wind_waker",
            info: "To save an ally from dying to Cataclysm",
          },
        ],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "satanic", info: "To dispel Cold Snap" },
        ],
      },
    },
  },

  // YoonA plays hero
  Io: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957619",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "wisp_tether", // 1
          "wisp_overcharge", // 2
          "wisp_overcharge", // 3
          "wisp_tether", // 4
          "wisp_overcharge", // 5
          "wisp_relocate", // 6
          "wisp_overcharge", // 7
          "wisp_tether", // 8
          "wisp_tether", // 9
          `special_bonus_unique_wisp_8`, // 10
          "wisp_spirits", // 11
          "wisp_relocate", // 12
          "wisp_spirits", // 13
          "wisp_spirits", // 14
          "special_bonus_unique_wisp_3", // 15
          "wisp_spirits", // 16
          "special_bonus_attributes", // 17
          "wisp_relocate", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_wisp_10`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_wisp_4", // 25
        ],
        items: {
          starting: [`tango`, `blood_grenade`, `headdress`, `ward_observer`],
          early_game: [
            `ward_sentry`,
            "magic_wand",
            `mekansm`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [`holy_locket`, `aghanims_shard`, `glimmer_cape`, `pavise`],
          late_game: [
            `guardian_greaves`,
            `solar_crest`,
            `force_staff`,
            `heart`,
          ],
          situational: [
            `bottle`,
            `spirit_vessel`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `vladmir`,
            `pipe`,
            "lotus_orb",
            `heavens_halberd`,
            `desolator`,
            `helm_of_the_overlord`,
            `boots_of_bearing`,
          ],
          core: [
            `mekansm`,
            `holy_locket`,
            "aghanims_shard",
            `glimmer_cape`,
            `pavise`,
            `heart`,
          ],
          neutral: [
            `arcane_ring`,
            `seeds_of_serenity`,
            "philosophers_stone",
            "bullwhip",
            `dandelion_amulet`,
            `ogre_seal_totem`,
            "ascetic_cap",
            `trickster_cloak`,
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick instead of Headdress if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      holy_locket:
        "A core item that provides healing boost upon activation and improves healing output overall.",
      mekansm: "A core item that provides an instant AoE heal. ",
      aghanims_shard: "For extra control and mobility.",
      lotus_orb: "For reflect, dispel and armor.",
      desolator: `Get this only after you take your level 25 talent.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      solar_crest: `Makes you more tanky and provides another buff for your tethered ally.`,
      heart: `A late game pick up that makes you more tanky and provides massive HP regen for yourself and the tethered ally.`,
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "To keep up with the sustain from Io",
          },
          {
            item: "wind_lace",
            info: "To catch up to Io or escape against Tether bonus movement speed",
          },
          {
            item: "boots",
            info: "To catch up to Io or escape against Tether bonus movement speed",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset healing from the Tether",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Io" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [],
      },
      late_game: {
        all: [{ item: "sheepstick", info: "For Io or his tethered partner" }],
        support: [],
        core: [
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
          { item: "abyssal_blade", info: "To pin Io or cancel Relocate" },
        ],
      },
    },
  },

  // YoonA plays hero
  Jakiro: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957843",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "jakiro_dual_breath", // 1
          "jakiro_liquid_fire", // 2
          "jakiro_dual_breath", // 3
          "jakiro_ice_path", // 4
          "jakiro_dual_breath", // 5
          "jakiro_macropyre", // 6
          "jakiro_dual_breath", // 7
          "jakiro_ice_path", // 8
          "jakiro_ice_path", // 9
          `special_bonus_attack_range_275`, // 10
          `jakiro_ice_path`, // 11
          "jakiro_macropyre", // 12
          "jakiro_liquid_fire", // 13
          "jakiro_liquid_fire", // 14
          "jakiro_liquid_fire", // 15
          "special_bonus_hp_325", // 16
          "special_bonus_attributes", // 17
          "jakiro_macropyre", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_jakiro_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_jakiro_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            "enchanted_mango",
            "enchanted_mango",
            `blood_grenade`,
            `clarity`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            "wind_lace",
            "infused_raindrop",
          ],
          mid_game: [`pavise`, `cyclone`, "aghanims_shard", `force_staff`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `aeon_disk`,
            `sheepstick`,
          ],
          situational: [
            `ring_of_basilius`,
            `glimmer_cape`,
            "pipe",
            `ethereal_blade`,
            `lotus_orb`,
            `blink`,
            `aether_lens`,
            `wind_waker`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `pavise`,
            `cyclone`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "ceremonial_robe",
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: `If your laning partner also uses a lot of mana early. Can be upgraded to Veil of Discord.`,
      infused_raindrop: "Against magical burst.",
      cyclone: `A core item that lets you set up on enemy heroes and follow up with Ice Path and Macropyre.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      aghanims_shard:
        "A core item that adds to control and damage output. Works on buildings as well. Goes well with level 10 talent.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      "cyclone",
      "jakiro_macropyre",
      "jakiro_ice_path",
      "jakiro_dual_breath",
      "jakiro_liquid_fire",
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          { item: "wind_lace", info: "To offset the slow from Dual Breath" },
          { item: "boots", info: "To offset the slow from Dual Breath" },
          {
            item: "cloak",
            info: "Jakiro does a lot of magical damage and Cloak offsets 15% of it",
          },
        ],
        support: [{ item: "headdress" }],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  // eidendota plays hero
  Juggernaut: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957943",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "juggernaut_blade_fury",
          "juggernaut_healing_ward",
          "juggernaut_blade_fury",
          "juggernaut_blade_dance",
          "juggernaut_blade_fury",
          "juggernaut_omni_slash",
          "juggernaut_blade_fury",
          `juggernaut_healing_ward`,
          `juggernaut_healing_ward`,
          `special_bonus_all_stats_5`,
          `juggernaut_healing_ward`,
          "juggernaut_omni_slash",
          `juggernaut_blade_dance`,
          `juggernaut_blade_dance`,
          `special_bonus_unique_juggernaut_4`,
          `juggernaut_blade_dance`,
          "special_bonus_attributes",
          "juggernaut_omni_slash",
          "special_bonus_attributes",
          "special_bonus_unique_juggernaut_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_juggernaut_omnislash_duration`,
        ],
        items: {
          starting: [
            "tango",
            `branches`,
            "quelling_blade",
            `magic_stick`,
            `circlet`,
          ],
          early_game: [`power_treads`, "wraith_band", "magic_wand"],
          mid_game: ["bfury", `manta`, `aghanims_shard`, `skadi`, `basher`],
          late_game: [
            `ultimate_scepter`,
            `satanic`,
            `abyssal_blade`,
            `mjollnir`,
            `swift_blink`,
          ],
          situational: [
            `diffusal_blade`,
            `sange_and_yasha`,
            `blink`,
            `black_king_bar`,
            `silver_edge`,
            `monkey_king_bar`,
            `nullifier`,
            `butterfly`,
            `travel_boots`,
          ],
          core: [`power_treads`, `bfury`, `manta`, `aghanims_shard`, `basher`],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "duelist_gloves",
            `orb_of_destruction`,
            `ring_of_aquila`,
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
            `penta_edged_sword`,
            //`flicker`,
            "pirate_hat",
            `apex`,
          ],
        },
      },
    ],
    ability_tooltips: {
      juggernaut_healing_ward:
        "You can skill Healing Ward at level two if you are being pressured.",
      juggernaut_blade_dance: `Some players prefer taking stats over leveling Blade Dance past level one. It slows your farm a bit but makes you tankier.`,
      special_bonus_unique_juggernaut_4: `You can take the other level 15 talent if the enemy team has long range nukers like Tinker who find it difficult to destroy your Healing Ward.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      power_treads: `You can get Power Treads instead of Phase Boots if you decide to get Battlefury over Maelstrom.`,
      maelstrom:
        "A prefered farming item. Great against illusion-based heroes. The Mjollnir upgrade is fantastic increase of Omnislash damage output.",
      bfury:
        "An alternative to Maelstrom, good against NP`s Sprout and summon based heroes.",
      manta:
        "A core item that allows you to farm even faster, provides a defensive dispel and moderate damage increase.",
      sange_and_yasha: `An alternative to Manta Style when there are no silences or roots to debuff.`,
      diffusal_blade:
        "Goes well with Manta Style against heroes like Medusa low mana pool heroes.",
      ultimate_scepter: "A core item for gap-closing and burst damage.",
      aghanims_shard:
        "A core upgrade that allows Blade Fury to scale with your damage. Especially good against lineups heavy on magic damage and disables. You will dish out a lot of damage during Blade Fury if you pick up talents for it as well.",
      mjollnir: `A late game item that increases the damage of your Omnislash and Swiftslash significantly.`,
      basher: "A core item to lock the target you are focusing.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier: "To dispel defensive spells and items that counter Omnislash.",
    },
    combo: [
      `juggernaut_omni_slash`,
      `juggernaut_blade_fury`,
      `juggernaut_healing_ward`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from the Juggernaut",
          },
          { item: "boots", info: "To keep the distance from the Juggernaut" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "bracer",
            info: "To survive the burst of damage coming from Blade Fury",
          },
          {
            item: "armor",
            info: "Buy armor items against Omnislash and right-clicks",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "crimson_guard" },
          { item: "basher" },
          { item: "invis_sword" },
          { item: "manta" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          { item: "wind_waker", info: "To save an ally being Omnislashed" },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "silver_edge" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  // YoonA plays hero
  "Keeper of the Light": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958059",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `keeper_of_the_light_blinding_light`, // 1  "keeper_of_the_light_radiant_bind" equals to `solar bind`
          `keeper_of_the_light_illuminate`, // 2
          `keeper_of_the_light_chakra_magic`, // 3
          "keeper_of_the_light_chakra_magic", // 4
          `keeper_of_the_light_illuminate`, // 5
          "keeper_of_the_light_spirit_form", // 6
          `keeper_of_the_light_chakra_magic`, // 7
          `keeper_of_the_light_chakra_magic`, // 8
          `keeper_of_the_light_illuminate`, // 9
          `keeper_of_the_light_illuminate`, // 10
          `special_bonus_unique_keeper_of_the_light_illuminate_cooldown`, // 11
          "keeper_of_the_light_spirit_form", // 12
          `keeper_of_the_light_blinding_light`, // 13
          `keeper_of_the_light_blinding_light`, // 14
          `special_bonus_unique_keeper_of_the_light_7`, // 15
          `keeper_of_the_light_blinding_light`, // 16
          "special_bonus_attributes", // 17
          "keeper_of_the_light_spirit_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_keeper_of_the_light_11", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_keeper_of_the_light`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `branches`,
            "circlet",
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            `urn_of_shadows`,
            "infused_raindrop",
          ],
          mid_game: [
            `force_staff`,
            `glimmer_cape`,
            `pavise`,
            `ultimate_scepter`,
          ],
          late_game: [`ethereal_blade`, `dagon_5`, "aeon_disk", `sheepstick`],
          situational: [
            `spirit_vessel`,
            `veil_of_discord`,
            `aghanims_shard`,
            `solar_crest`,
            `octarine_core`,
            "lotus_orb",
            "blink",
            `wind_waker`,
            `refresher`,
            "travel_boots",
          ],
          core: [
            `tranquil_boots`,
            `force_staff`,
            `glimmer_cape`,
            `pavise`,
            `ultimate_scepter`,
            `ethereal_blade`,
          ],
          neutral: [
            `mysterious_hat`,
            `pogo_stick`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            "timeless_relic",
            "seer_stone",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* special_bonus_unique_keeper_of_the_light_illuminate_cooldown:
        "Skill this level 10 talent on level 16 and the suggested level 15 talent on level 15. The dota client disallows me to present that order in graphics above.", */
    },
    item_tooltips: {
      ward_sentry: `To unblock the pull camp in case they block it.`,
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that provides hp sustain and high movement speed.",
      spirit_vessel: "Against heavy-healing lineup.",
      ultimate_scepter:
        "A core item that provides an AoE control in teamfights.",
      aghanims_shard: "For better teamfight and split push potential.",
      lotus_orb: "For reflect, dispel and armor.",
      blink: "Helps with splitpush and lining up your spells.",
    },
    combo: [
      `keeper_of_the_light_spirit_form`,
      `keeper_of_the_light_illuminate`,
      `keeper_of_the_light_radiant_bind`,
      `keeper_of_the_light_will_o_wisp`,
      `keeper_of_the_light_blinding_light`,
      `dagon`,
      `keeper_of_the_light_chakra_magic`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Keeper of the Light`s Chakra Magic allows him or his ally to cast spells frequently",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against Illuminate build on Keeper of the Light",
          },
          {
            item: "headdress",
            info: "For sustain on the lane against Illuminate build on Keeper of the Light",
          },
          {
            item: "infused_raindrop",
            info: "Against Illuminate build on Keeper of the Light",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset healing during from Spirit Form`s Illuminate during daytime",
          },
        ],
        support: [],
        core: [
          {
            item: "ring_of_health",
            info: "Against Illuminate build on Keeper of the Light",
          },
        ],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sphere", info: "Against midlane Keeper of the Light" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
          {
            item: "manta",
            info: "To dispel Solar Bind against midlane Keeper of the Light",
          },
        ],
      },
      late_game: {
        all: [
          { item: "aeon_disk", info: "Against a midlane Keeper of the Light" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "monkey_king_bar" }],
      },
    },
  },

  // eidendota plays hero
  Kunkka: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958147",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "kunkka_tidebringer", // 1
          "kunkka_torrent", // 2
          "kunkka_tidebringer", // 3
          "kunkka_x_marks_the_spot", // 4
          "kunkka_tidebringer", // 5
          "kunkka_ghostship", // 6
          "kunkka_tidebringer", // 7
          "kunkka_torrent", // 8
          "kunkka_torrent", // 9
          `special_bonus_unique_kunkka_6`, // 10
          "kunkka_torrent", // 11
          "kunkka_ghostship", // 12
          "kunkka_x_marks_the_spot", // 13
          "kunkka_x_marks_the_spot", // 14
          `special_bonus_attack_damage_45`, // 15
          "kunkka_x_marks_the_spot", // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_kunkka_3", // 25
        ],
        items: {
          starting: [
            `gauntlets`,
            `quelling_blade`,
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            "bracer",
            "bracer",
            "magic_wand",
            "phase_boots",
          ],
          mid_game: [`armlet`, `black_king_bar`, `lesser_crit`, "silver_edge"],
          late_game: [
            "assault",
            "satanic",
            `bloodthorn`,
            `overwhelming_blink`,
            `rapier`,
          ],
          situational: [
            "orchid",
            `heavens_halberd`,
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `greater_crit`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [`armlet`, `phase_boots`, "black_king_bar", `silver_edge`],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            "vambrace",
            "orb_of_destruction",
            //`dagger_of_ristul`,
            "titan_sliver",
            `paladin_sword`,
            //`heavy_blade`,
            "mind_breaker",
            `penta_edged_sword`,
            "desolator_2",
            `ex_machina`,
            "pirate_hat",
          ],
        },
        item_tooltips: {
          ward_observer:
            "If you are playing midlane Kunkka. You can bring it to sidelane as well.",
          bottle:
            "If you are playing midlane Kunkka. You can do X Marks the spot refills.",
          orchid: `Lets you snowball in the early game with your immense kill threat on the map.`,
          lesser_crit:
            "A core item that can proc on Tidebring hits. Can be upgraded to Silver Edge or Daedalus.",
          aghanims_shard: "For extra control and to reposition enemies.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2715010750",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "kunkka_tidebringer", // 1
          "kunkka_torrent", // 2
          "kunkka_tidebringer", // 3
          "kunkka_x_marks_the_spot", // 4
          "kunkka_tidebringer", // 5
          "kunkka_ghostship", // 6
          "kunkka_tidebringer", // 7
          "kunkka_x_marks_the_spot", // 8
          "kunkka_x_marks_the_spot", // 9
          "kunkka_x_marks_the_spot", // 10
          `special_bonus_unique_kunkka_6`, // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "kunkka_torrent", // 14
          `kunkka_torrent`, // 15
          `special_bonus_unique_kunkka_7`, // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_kunkka_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            "quelling_blade",
            `gauntlets`,
            `branches`,
            `branches`,
            "branches",
          ],
          early_game: ["vanguard", "phase_boots", `magic_wand`, "soul_ring"],
          mid_game: [
            "pipe",
            "crimson_guard",
            "black_king_bar",
            "ultimate_scepter",
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [
            `assault`,
            `refresher`,
            `overwhelming_blink`,
            `sheepstick`,
          ],
          situational: [
            "guardian_greaves",
            `armlet`,
            `heavens_halberd`,
            `solar_crest`,
            `silver_edge`,
            `bloodthorn`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `bracer`,
            `phase_boots`,
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `vambrace`,
            "orb_of_destruction",
            //`dagger_of_ristul`,
            `titan_sliver`,
            `defiant_shell`,
            //`heavy_blade`,
            `havoc_hammer`,
            "spell_prism",
            `giants_ring`,
            `ex_machina`,
          ],
        },
        item_tooltips: {
          pipe: "Good against heavy magical-damage lineup.",
          ultimate_scepter:
            "A core item that grants extra AoE control and damage.",
          aghanims_shard: "A core item to control and reposition opponents.",
          silver_edge:
            "It allows you to turn into a decent right-clicker and applies break.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      /* helm_of_iron_will:
        "A core item that solves your hp sustain issues. Upgrade it to Armlet.", */
      phase_boots:
        "A core boots upgrade that makes Tidebringer hit even harder. Fixes the low armor gain of the hero temporarily.",
      armlet: `A situational item that provides you with early stats and damage for your Tidebringer.`,
      heavens_halberd:
        "Especially good against ranged right-clickers. For utility build.",
      assault:
        "A core item that provides you with much needed attack speed and armor. Armor reduction goes well with the physical damage theme.",
      black_king_bar:
        "A core item that allows you to stay in the middle of the fight and deliver the damage.",
      blink: "Combines well with X Marking yourself to do Tidebringer hits.",
    },
    combo: [
      `kunkka_x_marks_the_spot`,
      `kunkka_ghostship`,
      `kunkka_return`,
      `kunkka_torrent`,
      `kunkka_tidebringer`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against Tidebringer",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "assault", info: "Against a right-clicking Kunkka" },
        ],
      },
    },
  },

  "Legion Commander": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2301488685",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "legion_commander_overwhelming_odds", // 1
          "legion_commander_moment_of_courage", // 2
          `legion_commander_overwhelming_odds`, // 3
          `legion_commander_press_the_attack`, // 4
          `legion_commander_overwhelming_odds`, // 5
          "legion_commander_duel", // 6
          `legion_commander_overwhelming_odds`, // 7
          `legion_commander_moment_of_courage`, // 8
          "legion_commander_moment_of_courage", // 9
          "special_bonus_unique_legion_commander", // 10
          "legion_commander_moment_of_courage", // 11
          "legion_commander_duel", // 12
          `legion_commander_press_the_attack`, // 13
          `legion_commander_press_the_attack`, // 14
          `special_bonus_unique_legion_commander_4`, // 15
          `legion_commander_press_the_attack`, // 16
          "special_bonus_attributes", // 17
          "legion_commander_duel", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_legion_commander_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_legion_commander_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `soul_ring`,
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `blink`,
            `blade_mail`,
            `black_king_bar`,
            `heavens_halberd`,
          ],
          late_game: [
            `aghanims_shard`,
            `assault`,
            "silver_edge",
            `greater_crit`,
          ],
          situational: [
            `wraith_band`,
            `bracer`,
            `orb_of_corrosion`,
            `armlet`,
            `desolator`,
            `monkey_king_bar`,
            `crimson_guard`,
            `pipe`,
            `solar_crest`,
            `heart`,
            `harpoon`,
            `abyssal_blade`,
            `moon_shard`,
            `satanic`,
            `swift_blink`,
            `octarine_core`,
            `ultimate_scepter`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `soul_ring`,
            `phase_boots`,
            "blink",
            `blade_mail`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          neutral: [
            "broom_handle",
            `duelist_gloves`,
            `vambrace`,
            `orb_of_destruction`,
            `titan_sliver`,
            "ogre_seal_totem",
            `ninja_gear`,
            `penta_edged_sword`,
            `giants_ring`,
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      legion_commander_press_the_attack: `You can skill this spell on level 1 or 2 if you are being harassed by a dispellable damage-over-time spell like Thunder Strike and Poison Touch.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      orb_of_corrosion: "If you can pressure on the lane.",
      /* helm_of_iron_will:
        "A core item that solves your hp sustain issues on the lane. It can be upgraded to Armlet but you can also get Blink Dagger before the upgrade.", */
      armlet: `A situational item that gives you all the needed stats to win duels. Usually better than Blade Mail.`,
      blink: "A core item that allows you to get Duel off.",
      blade_mail: "Good against high dps right-clickers(PA, Anti-Mage).",
      black_king_bar:
        "A core item that allows you not to be disabled or killed during Duel as often .",
      heavens_halberd:
        "Especially good against ranged right-clickers and to pop Linken`s Sphere.",
      aghanims_shard: `A core upgrade that makes you more tanky during Duel with Overwhelming Odds. Great against illusions and summons.`,
      monkey_king_bar: `A situational item when the enemy team has evasion.`,
      harpoon: `A situational item that acts as another gap close in games when you are getting kited heavily.`,
      octarine_core: `A situational item that improves the cooldown of Duel and lets you remain a kill threat on the map against solo enemy heroes.`,
      overwhelming_blink: "To tank up and for AoE damage.",
      swift_blink: "For single target burst.",
    },
    combo: [
      "legion_commander_press_the_attack",
      "black_king_bar",
      "blade_mail",
      "blink",
      `legion_commander_duel`,
      `legion_commander_overwhelming_odds`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },

          {
            item: "wind_lace",
            info: "To keep the distance from the Legion Commander",
          },
          {
            item: "boots",
            info: "To keep the distance from the Legion Commander",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "ghost" }],
        core: [
          { item: "heavens_halberd" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "aeon_disk" },
          { item: "ethereal_blade" },
          { item: "wind_waker", info: "To save an ally in Duel" },
        ],
        support: [],
        core: [
          { item: "satanic", info: "For lifesteal in Duel" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  // eidendota plays hero
  Leshrac: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958372",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "leshrac_split_earth", // 1
          "leshrac_lightning_storm", // 2
          "leshrac_lightning_storm", // 3
          "leshrac_split_earth", // 4
          "leshrac_lightning_storm", // 5
          "leshrac_pulse_nova", // 6
          "leshrac_lightning_storm", // 7
          "leshrac_diabolic_edict", // 8
          "leshrac_diabolic_edict", // 9
          "leshrac_diabolic_edict", // 10
          "leshrac_diabolic_edict", // 11
          "leshrac_pulse_nova", // 12
          "leshrac_split_earth", // 13
          "leshrac_split_earth", // 14
          "special_bonus_unique_leshrac_5", // 15
          "special_bonus_unique_leshrac_6", // 16
          "special_bonus_attributes", // 17
          "leshrac_pulse_nova", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_leshrac_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_leshrac_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: ["bottle", "arcane_boots", "magic_wand"],
          mid_game: [
            "bloodstone",
            "travel_boots",
            "black_king_bar",
            "kaya",
            "aghanims_shard",
          ],
          late_game: [
            "blink",
            "kaya_and_sange",
            "shivas_guard",
            "sheepstick",
            "ethereal_blade",
            "overwhelming_blink",
          ],
          situational: [
            "cyclone",
            "ultimate_scepter",
            "sphere",
            "ghost",
            "aeon_disk",
            "wind_waker",
          ],
          core: [
            "travel_boots",
            "bloodstone",
            "kaya_and_sange",
            "aghanims_shard",
            "black_king_bar",
            "blink",
          ],
          neutral: [
            "mysterious_hat",
            "occult_bracelet",
            "pogo_stick",
            "vambrace",
            "vampire_fangs",
            "gossamer_cape",
            //"black_powder_bag",
            "ceremonial_robe",
            "dandelion_amulet",
            "spell_prism",
            "timeless_relic",
            "stormcrafter",
            "force_field",
            "ex_machina",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      /*special_bonus_strength_20:
        "You can take this level 20 talent over the suggested one if you are burstable by opponents.",*/
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle: "A core item for mid Leshrac.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and components used for assembling Boots of Travel and Bloodstone.",
      eternal_shroud:
        "Gives you great survivability against a line up with a lot of magic damage as well as spell lifesteal for your skill set.",
      cyclone:
        "A core item that can be used to setup Split Earth. It can also be used defensive. Activated Diabolic Edict and Pulse Nova will deal damage while you are cycloned. The item can be upgraded later.",
      black_king_bar:
        "To be able to stay in the middle of the fight radiating the damage.",
      kaya: "A core item that improves your damage output. Can be upgraded to Bloodstone(preferably) or Sange and Kaya.",
      bloodstone:
        "A core item that has mix of defensive and offensive properties. The active ability can heal you for a significant amount very quickly.",
      travel_boots:
        "A core boots upgrade. Since your hero has and uses a lot of mana you`ll need to refill in the base quite often as well as covering the map and participating in kills.",
      aghanims_shard:
        "A core item that provides extra control but also makes it very hard for opponents to siege your buildings, to stop you from siegeing theirs or for them to take Roshan.",
      blink: "For gap close and to position yourself between the opponents.",
      sphere: "Against powerful single-target disables and debuffs.",
      aeon_disk:
        "Against bursty lineups and lineups with long lasting disables.",
      ultimate_scepter:
        "Against multiple physical damage heroes. e.g Ursa carry, Templar Assassin mid.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Leshrac will use low cooldown spells Split Earth and Lightning Storm to harass or kill creeps",
          },
          { item: "wind_lace", info: "To keep the distance from the Leshrac" },
          { item: "boots", info: "To keep the distance from the Leshrac" },
          {
            item: "cloak",
            info: "Leshrac is heavy on magical damage and Cloak will negate 15% of it",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          {
            item: "spirit_vessel",
            info: "As Leshrac tends to buy Spell Lifesteal items, Spirit Vessel will reduce 45% of it.",
          },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "blade_mail" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  // YoonA plays hero
  Lich: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958474",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "lich_frost_nova", // 1
          "lich_frost_shield", // 2
          "lich_frost_nova", // 3
          "lich_sinister_gaze", // 4
          `lich_frost_shield`, // 5
          "lich_chain_frost", // 6
          "lich_frost_shield", // 7
          "lich_frost_shield", // 8
          `lich_sinister_gaze`, // 9
          "special_bonus_unique_lich_8", // 10
          "lich_sinister_gaze", // 11
          "lich_chain_frost", // 12
          "lich_sinister_gaze", // 13
          `lich_frost_nova`, // 14
          "special_bonus_unique_lich_2", // 15
          "lich_frost_nova", // 16
          "special_bonus_attributes", // 17
          "lich_chain_frost", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lich_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lich_1", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `enchanted_mango`,
            `branches`,
            `branches`,
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `boots_of_bearing`,
          ],
          late_game: [
            "aeon_disk",
            `ultimate_scepter`,
            "octarine_core",
            `ethereal_blade`,
            `sheepstick`,
          ],
          situational: [
            `ring_of_basilius`,
            `ghost`,
            `phylactery`,
            `aether_lens`,
            "lotus_orb",
            `solar_crest`,
            `refresher`,
            "blink",
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `pavise`,
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `spell_prism`,
            "seer_stone",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      tranquil_boots: `A core boots upgrade that helps with mobility and HP sustain. Can be combined with Drums to make Boots of Bearing.`,
      aether_lens: `Lets you cast spells from a greater range and especially improving your Sinister Gaze.`,
      solar_crest: `An item to buff one of your right-clicking cores or to debuff an opponent or Roshan to kill it faster.`,
      aghanims_shard: `A core item fir extra control and potential to burst a secluded enemy hero with Chain Frost.`,
      lotus_orb: "For reflect, dispel and armor.",
      blink:
        "Goes well with Aghanim`s Shard to burst a single hero. Good for canceling channeling spells(Fiend`s Grip, Shackles).",
    },
    combo: [
      `lich_frost_shield`,
      `lich_frost_nova`,
      `lich_chain_frost`,
      `lich_sinister_gaze`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Lich will use Frost Blast and Frost Shield to harass or make kill attempts frequently",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To offset the slow from Frost Blast and Frost Shield",
          },
          {
            item: "boots",
            info: "To offset the slow from Frost Blast and Frost Shield",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Lich is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "nullifier", info: "To dispel Frost Shield" }],
      },
    },
  },

  // eidendota plays hero
  Lifestealer: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958609",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "life_stealer_feast", // 1
          "life_stealer_ghoul_frenzy", // 2
          "life_stealer_ghoul_frenzy", // 3
          "life_stealer_rage", // 4
          "life_stealer_feast", // 5
          "life_stealer_infest", // 6
          "life_stealer_ghoul_frenzy", // 7
          "life_stealer_ghoul_frenzy", // 8
          "life_stealer_feast", // 9
          "life_stealer_feast", // 10
          "life_stealer_rage", // 11
          "life_stealer_infest", // 12
          "life_stealer_rage", // 13
          "special_bonus_unique_lifestealer_2", // 14
          "special_bonus_attack_damage_25", // 15
          "life_stealer_rage", // 16
          "special_bonus_attributes", // 17
          "life_stealer_infest", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lifestealer_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lifestealer", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "circlet",
            "branches",
            "branches",
          ],
          early_game: ["bracer", "phase_boots", "magic_wand", "armlet"],
          mid_game: ["desolator", "basher", "sange"],
          late_game: ["skadi", "assault", "satanic", "abyssal_blade"],
          situational: [
            "radiance",
            "heavens_halberd",
            "sange_and_yasha",
            "aghanims_shard",
            "silver_edge",
            "monkey_king_bar",
            "nullifier",
            "black_king_bar",
            "bloodthorn",
            "mjollnir",
            "ultimate_scepter",
            "hand_of_midas",
            "greater_crit",
            "orb_of_corrosion",
            "blink",
          ],
          core: ["armlet", "desolator", "basher", "assault", "skadi"],
          neutral: [
            "lance_of_pursuit",
            "broom_handle",
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            "mind_breaker",
            "paladin_sword",
            "titan_sliver",
            "penta_edged_sword",
            "havoc_hammer",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      life_stealer_rage:
        "You can put a first point in this spell earlier than suggested if you need to dispel or disjoint the spell.",
      life_stealer_feast:
        "Really good for trading and sustaining hp during the laning stage, make sure to trade with opponent for harras and sustain.",
      life_stealer_ghoul_frenzy:
        "Helps with early game farming speed, Max as soon as possible.",
      life_stealer_infest:
        "Will save you alot in alot of games towards the end of the laning stage. Make sure to pick a mobile teammate to infest that can iniate for you. If you don't need the spell at level 6 rather level up ghoul frenzy for farming speed.",
    },
    item_tooltips: {
      orb_of_venom:
        "If you can pressure on the lane. Can upgrade to orb of corrosion if you choose to go this route.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane (eg. batrider/bristleback).",
      helm_of_iron_will:
        "On high harras lanes(mostly ranged heroes), you can rush this component of Armlet that solve your hp sustain issues.",
      phase_boots:
        "The earlier you get this in the lane the more effective it will be.",
      bracer: "Good stats early and double after 25:00min ;)",
      armlet: "A core item that provides you with useful stats and burst.",
      sange:
        "Can buy a value sange after armlet for great survivability, And then you have many options (eg. sange&yasha, eye of skadi, satanic, desolator etc.) ",
      skadi:
        "Really good stats and lockdown against enemy heroes, I highly recommend this 3rd/4th item.",
      heavens_halberd:
        "Must have against some physical damage heroes (eg. templar assassin/Ursa).",
      basher: "A core item that allows you to lock down the target.",
      aghanims_shard:
        "Not a particularly great upgrade. You will most of the time get it from Roshan.",
      monkey_king_bar: "Against evasion.",
      silver_edge: "For break effect and to reposition quickly.",
      nullifier: "To dispel defensive spells and items.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel. Use it after Rage.",
      blink:
        "To close the gap, also good against annoying lockdown spells to dodge (eg. Chrono/Blackhole)",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Lifestealer",
          },
          { item: "boots", info: "To keep the distance from the Lifestealer" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "orchid" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          {
            item: "monkey_king_bar",
            info: "The procs from this item deal damage through spell immunity and also counter evasion talent",
          },
          {
            item: "bloodthorn",
            info: "To burst this tanky hero and for true strike against evasion talent",
          },
          {
            item: "skadi",
            info: "To reduce healing from Feast and Open Wounds",
          },
          {
            item: "shivas_guard",
            info: "To reduce healing from Feast and Open Wounds",
          },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  // eidendota plays hero
  Lina: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958714",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "lina_dragon_slave", // 1
          "lina_fiery_soul", // 2
          "lina_dragon_slave", // 3
          "lina_light_strike_array", // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          "lina_light_strike_array", // 8
          "lina_light_strike_array", // 9
          "special_bonus_unique_lina_1", // 10
          "lina_light_strike_array", // 11
          "lina_laguna_blade", // 12
          "lina_fiery_soul", // 13
          "lina_fiery_soul", // 14
          "special_bonus_unique_lina_3", // 15
          "lina_fiery_soul", // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          "special_bonus_spell_amplify_11", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lina_7`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            `branches`,
            `branches`,
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `boots`,
            "magic_wand",
            "arcane_boots",
            "aether_lens",
          ],
          mid_game: [
            `travel_boots`,
            "aghanims_shard",
            "blink",
            "ultimate_scepter",
          ],
          late_game: [
            "black_king_bar",
            "sheepstick",
            `refresher`,
            "octarine_core",
          ],
          situational: [
            "sphere",
            `travel_boots_2`,
            "kaya_and_sange",
            "ethereal_blade",
            "aeon_disk",
            "wind_waker",
          ],
          core: [
            "travel_boots",
            "aether_lens",
            `aghanims_shard`,
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            `mysterious_hat`,
            "faded_broach",
            "grove_bow",
            `pupils_gift`,
            "psychic_headband",
            "quickening_charm",
            //`flicker`,
            `spell_prism`,
            "timeless_relic",
            "mirror_shield",
            "ex_machina",
            "seer_stone",
          ],
        },
        ability_tooltips: {
          lina_light_strike_array:
            "You can skill this spell on level 1 against melee match-up.",
        },
        item_tooltips: {
          bottle: `Rush the bottle before buying anything else at mid.`,
          travel_boots:
            "A core item that goes well with Fiery Soul movement speed amp. Allows you to conver the map better.",
          black_king_bar:
            "A core item that allows you to survive fights and deliver the damage.",
          sphere: "Against powerful single target disables or debuffs.",
          aether_lens:
            "Very strong early/mid game timing that will allow you to disable targets frequently from long range.",
          aghanims_shard:
            "Very strong mid game timing that will increase your spell damage.",
          ultimate_scepter:
            "Another one of linas strongest timings that will increase mobility and damage output by a ton. ",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2715221904",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "lina_light_strike_array", // 1
          "lina_fiery_soul", // 2
          "lina_dragon_slave", // 3
          "lina_dragon_slave", // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          "lina_light_strike_array", // 8
          "lina_light_strike_array", // 9
          "lina_light_strike_array", // 10
          "special_bonus_unique_lina_1", // 11
          "lina_laguna_blade", // 12
          "lina_fiery_soul", // 13
          "lina_fiery_soul", // 14
          "special_bonus_unique_lina_3", // 15
          "lina_fiery_soul", // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          "special_bonus_spell_amplify_11", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lina_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "magic_stick",
            "branches",
            "branches",
            `blood_grenade`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`aether_lens`, "cyclone", "aghanims_shard"],
          late_game: [
            "ultimate_scepter",
            `blink`,
            `ethereal_blade`,
            "aeon_disk",
            "sheepstick",
            "octarine_core",
            "refresher",
          ],
          situational: [
            `black_king_bar`,
            `lotus_orb`,
            `wind_waker`,
            `gungir`,
            `revenants_brooch`,
            `travel_boots`,
            "sphere",
            "force_staff",
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            "cyclone",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            `faded_broach`,
            `mysterious_hat`,
            "philosophers_stone",
            `bullwhip`,
            "psychic_headband",
            `quickening_charm`,
            "spell_prism",
            `timeless_relic`,
            "seer_stone",
            "mirror_shield",
            "force_boots",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock one of the camps",
          arcane_boots:
            "A core boots upgrade that helps with mana sustain. Can be disasembled and Energy Booster used for Aether Lens. Upgrading the remaining boots to Tranquil boots is advised.",
          aether_lens:
            "A core item that allows you to cast spells and items from further away.",
          cyclone: "A core item that allows you to setup Light Strike Array.",
          ultimate_scepter:
            "A core item that turns Laguna Blade damage type to pure and allows it pierce spell-immunity. Goes well with Aghanim`s Shard.",
          aghanims_shard:
            "A core item that allows Laguna Blade to hit multiple units in the line. It also makes Laguna Blade not be affected by Linken`s Sphere or Lotus Orb.",
          lotus_orb: "Against powerful single-target disables and debuffs.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      infused_raindrop: "Against magical burst.",
      blink: "To be able to reposition quickly.",
    },
    combo: [
      `cyclone`,
      `lina_light_strike_array`,
      `lina_dragon_slave`,
      `lina_laguna_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Lina is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "mage_slayer" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          {
            item: "silver_edge",
            info: "To close the gap to Lina and break her passive",
          },
          {
            item: "assault",
            info: "In the late game Lina does a lot of physical damage due to items and Fiery Soul",
          },
          {
            item: "butterfly",
            info: "In the late game Lina does a lot of physical damage due to items and Fiery Soul",
          },
        ],
      },
    },
  },

  Lion: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958831",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "lion_impale", // 1
          "lion_mana_drain", // 2
          "lion_impale", // 3
          "lion_voodoo", // 4
          `lion_impale`, // 5
          "lion_finger_of_death", // 6
          "lion_impale", // 7
          `lion_mana_drain`, // 8
          "lion_voodoo", // 9
          `special_bonus_unique_lion_3`, // 10
          `lion_voodoo`, // 11
          "lion_finger_of_death", // 12
          `lion_voodoo`, // 13
          "lion_mana_drain", // 14
          `special_bonus_unique_lion_11`, // 15
          "lion_mana_drain", // 16
          "special_bonus_attributes", // 17
          "lion_finger_of_death", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lion_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lion_4", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            "tranquil_boots",
            "magic_wand",
            "wind_lace",
            `infused_raindrop`,
          ],
          mid_game: ["blink", `force_staff`, `aether_lens`, `aghanims_shard`],
          late_game: [
            `ethereal_blade`,
            `ultimate_scepter`,
            `aeon_disk`,
            `octarine_core`,
          ],
          situational: [
            `phylactery`,
            `ghost`,
            `boots_of_bearing`,
            `lotus_orb`,
            `wind_waker`,
            `black_king_bar`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `blink`,
            `force_staff`,
            `aether_lens`,
            `aghanims_shard`,
          ],
          neutral: [
            "pogo_stick",
            `mysterious_hat`,
            "philosophers_stone",
            `grove_bow`,
            "psychic_headband",
            `ceremonial_robe`,
            "timeless_relic",
            "spy_gadget",
            "seer_stone",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      lion_voodoo: `You can skill this spell on level 2 or 3 already if you can score an early kill.`,
      special_bonus_unique_lion_10: `Take this Mana restore talent over the suggested one when playing with mana dependent cores such as Storm Spirit or Leshrac.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick instead of boots if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that provides you with hp sustain but more importantly with high movement speed that allows you to get your spells off easier.",
      blink:
        "A core item that allows you to instanly jump on and disable an opponent.",
      aghanims_shard:
        "A core item that has a mix of defensive and offensive utilities. It is especially good against illusion based heroes like Naga or Terrorblade as mana drain destroys them instantly.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `blink`,
      `lion_voodoo`,
      `attack`,
      `lion_impale`,
      `lion_finger_of_death`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "enchanted_mango",
            info: "Lion drains mana and Enchanted Mangoes will allow you to offset that",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          { item: "arcane_boots", info: "To sustain mana against Mana Drain" },
          {
            item: "cloak",
            info: "Lion is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [{ item: "soul_ring" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "aeon_disk" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Lone Druid": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958939",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "lone_druid_spirit_bear", // 1
          "lone_druid_spirit_link", // 2
          "lone_druid_spirit_bear", // 3
          "lone_druid_spirit_link", // 4
          "lone_druid_spirit_bear", // 5
          "lone_druid_true_form", // 6
          "lone_druid_spirit_bear", // 7
          "lone_druid_spirit_link", // 8
          "lone_druid_spirit_link", // 9
          "lone_druid_savage_roar", // 10
          "lone_druid_savage_roar", // 11
          "lone_druid_true_form", // 12
          "lone_druid_savage_roar", // 13
          "special_bonus_hp_200", // 14
          "special_bonus_unique_lone_druid_4", // 15
          "lone_druid_savage_roar", // 16
          "special_bonus_attributes", // 17
          "lone_druid_true_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lone_druid_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lone_druid_10", // 25
        ],
        items: {
          starting_bear: ["blight_stone", "branches", "branches", "branches"],
          starting: ["tango", "ward_observer"],
          core_bear: [
            "phase_boots",
            "mask_of_madness",
            "desolator",
            "basher",
            "assault",
          ],
          core: [
            "boots",
            "aghanims_shard",
            "wraith_band",
            "wraith_band",
            "wraith_band",
            "wraith_band",
            "wraith_band",
          ],
          situational_bear: [
            "hand_of_midas",
            "maelstrom",
            "monkey_king_bar",
            "mjollnir",
            "black_king_bar",
            "nullifier",
            "abyssal_blade",
            "moon_shard",
            "silver_edge",
            "butterfly",
          ],
          situational: ["cloak", "ghost", "ultimate_scepter", "refresher"],
          neutral_bear: [
            "broom_handle",
            "lance_of_pursuit",
            //"misericorde",
            "dragon_scale",
            "mind_breaker",
            "elven_tunic",
            "paladin_sword",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
          neutral: [
            "unstable_wand",
            "trusty_shovel",
            "ring_of_aquila",
            "philosophers_stone",
            "bullwhip",
            //"black_powder_bag",
            "trickster_cloak",
            "ascetic_cap",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      lone_druid_spirit_link:
        "If your hero is getting gone on make sure to attack with your bear as it will heal your hero alot.",
      lone_druid_savage_roar:
        "You can skill this spell earlier than suggested if you are being pressured or expect to be ganked. It comes at the cost of slowing your farming speed a bit.",
      lone_druid_true_form:
        "You can level this abit later if you feel like you are under no pressure and have a low chance of getting ganked.",
    },
    item_tooltips: {
      orb_of_venom:
        "Buy Orb of Venom over Blight Stone if you can hit opponents on the lane often with Bear. That`s usually the case against melee match-up or if you have a strong support.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "A core item that allows Bear to dish out more damage and be kitted less.",
      phase_boots: "A core boots upgrade that allows Bear to gap-close faster.",
      mask_of_madness:
        "A core item that allows you to farm quicker with Bear but also allows you to burst heroes and buildings.",
      desolator:
        "A core item that allows Bear to burst heroes, buildings and Roshan.",
      basher:
        "A core item for extra control. Can be upgraded to Abyssal Blade but it is not a priority.",
      maelstrom:
        "Alternative to Desolator if you are playing against illusion-based heroes. It should be upgraded to Mjollnir soon afterwards.",
      assault:
        "A core item that goes well with minus armor theme and breaking buildings.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel. Helps with ratting.",
      aghanims_shard: "A core item for hero to buff allies and dispel.",
      solar_crest: "A buff to Bear to increase its dps.",
      refresher: "For an extra Bear charge in the very late game.",
      ultimate_scepter:
        "Amazing for split-pushing and ratting. If you feel you cannot take fights or are slot-maxxed.",
      ghost: "Against high physical damage heroes (eg. ursa/templar assassin)",
      wraith_band:
        "After 25 minutes you should fill your heroes item slots with wraith bands as its very good value with double stats.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from the bear" },
          { item: "boots", info: "To keep the distance from the bear" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [{ item: "crimson_guard" }, { item: "hurricane_pike" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "travel_boots",
            info: "Lone Druids tends to rat with Bear especially when his Aghanim`s Scepter comes into play",
          },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "butterfly" },
        ],
      },
    },
  },

  // eidendota plays hero
  Luna: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959031",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "luna_lunar_blessing", // 1   "luna_moon_glaive" equals to `moon glaives`
          "luna_lucent_beam", // 2
          "luna_lunar_blessing", // 3
          "luna_moon_glaive", // 4
          "luna_lunar_blessing", // 5
          "luna_moon_glaive", // 6
          "luna_lunar_blessing", // 7
          "luna_moon_glaive", // 8
          "luna_moon_glaive", // 9
          "luna_lucent_beam", // 10
          "luna_lucent_beam", // 11
          "luna_eclipse", // 12
          "luna_lucent_beam", // 13
          "luna_eclipse", // 14
          "special_bonus_unique_luna_7", // 15
          "special_bonus_unique_luna_2", // 16
          "special_bonus_attributes", // 17
          "luna_eclipse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_luna_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_luna_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "wraith_band",
            "mask_of_madness",
            "magic_wand",
          ],
          mid_game: ["dragon_lance", "manta", "black_king_bar", "lesser_crit"],
          late_game: ["greater_crit", "skadi", "satanic", "butterfly"],
          situational: [
            "hurricane_pike",
            "silver_edge",
            "ultimate_scepter",
            "monkey_king_bar",
            "aghanims_shard",
            "sphere",
            "sange_and_yasha",
            "blood_grenade",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "manta",
            "dragon_lance",
            "black_king_bar",
            "aghanims_shard",
            "greater_crit",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "unstable_wand",
            "duelist_gloves",
            "grove_bow",
            "ring_of_aquila",
            //"dagger_of_ristul", Removed in 7.33
            "titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            "mirror_shield",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      luna_lucent_beam:
        "You can skill this spell on level 1 if you prefer to guarantee a range-creep lasthit in first two waves over having extra damage from Lunar Blessing continuously.",
      luna_moon_glaive:
        "Make a decision on level 5 to either take a first point in Moon Glaives and start pushing out creepwaves and farm nearby camps, or continue maxing Lucent Beam along with skilling ultimate on level6 with the idea to kill the opponents on the lane. The farming route is generally preferred nowadays.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core boots upgrade that increases farming speed by improving attack speed.",
      mask_of_madness:
        "A core item that improves your farming speed significantly. Can be disassembled later to get Satanic and Butterfly.",
      manta:
        "A core item that provides you with useful stats. Using Manta illusions to farm the creeps you otherwise would not go for, will increase you farming speed greatly.",
      dragon_lance:
        "A core item that allows you to get hits off easier and gives great stats. Can be disassembled. Ogre Axe can be used for Black King Bar and Dragon Lance reassembled afterwards. Can be upgraded to Hurricane Pike situationally.",
      black_king_bar:
        "A core item that prevents opponents from disabling you while you are dealing damage.",
      skadi:
        "Great against immobile tanky heroes as it reduces their movespeed,healing and lifesteal. Exceptionally good versus ranged heroes as it slows them by 50%.",
      aghanims_shard:
        "A core item that adds to your damage output. Provides vision in area you beamed.",
      greater_crit:
        "A core damaging item of choice. Works well with Aghanim`s Shard.",
      hurricane_pike: "To disengage from heroes like Slark, Ursa and Troll.",
      silver_edge: "For break, burst and to reposition quickly.",
      ultimate_scepter:
        "Great at bursting backliners. However this is not your core item and should be taken from Roshan if you ever have the chance.",
      monkey_king_bar:
        "Consider replacing Daedalus with it against a lot of  evasion and miss chance.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "infused_raindrop" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "cloak",
            info: "Luna is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          {
            item: "blade_mail",
            info: "As Luna uses her ulty, Blademail could be potentially lethal.",
          },
          { item: "black_king_bar" },
          { item: "heavens_halberd" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault" },
          { item: "abyssal_blade" },
          {
            item: "skadi",
            info: "To slow ranged right-click core and to reduce healing coming from her talent and lifesteal items",
          },
          { item: "butterfly" },
        ],
      },
    },
  },

  Lycan: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959154",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "lycan_summon_wolves", // 1
          "lycan_feral_impulse", // 2
          "lycan_summon_wolves", // 3
          "lycan_feral_impulse", // 4
          "lycan_summon_wolves", // 5
          "lycan_shapeshift", // 6
          "lycan_summon_wolves", // 7
          "lycan_feral_impulse", // 8
          "lycan_feral_impulse", // 9
          "lycan_howl", // 10
          "special_bonus_unique_lycan_3", // 11
          "lycan_shapeshift", // 12
          "lycan_howl", // 13
          "lycan_howl", // 14
          "lycan_howl", // 15
          "special_bonus_unique_lycan_8", // 16
          "special_bonus_attributes", // 17
          "lycan_shapeshift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lycan_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lycan_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "ring_of_protection",
            "sobi_mask",
          ],
          early_game: [
            "helm_of_iron_will",
            "helm_of_the_dominator",
            "ring_of_basilius",
            "boots",
          ],
          mid_game: [
            "echo_sabre",
            "helm_of_the_overlord",
            "ancient_janggo",
            "assault",
            "aghanims_shard",
          ],
          late_game: [
            "ultimate_scepter",
            "sheepstick",
            "black_king_bar",
            "bloodthorn",
            "abyssal_blade",
          ],
          situational: [
            "orchid",
            "black_king_bar",
            "heavens_halberd",
            "nullifier",
            "sheepstick",
          ],
          core: [
            "helm_of_the_overlord",
            "ancient_janggo",
            "boots_of_bearing",
            "assault",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            "occult_bracelet",
            //"misericorde",
            "dragon_scale",
            "ring_of_aquila",
            "quickening_charm",
            "titan_sliver",
            "spell_prism",
            "penta_edged_sword",
            "demonicon",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716646867",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "lycan_summon_wolves", // 1
          "lycan_feral_impulse", // 2
          "lycan_summon_wolves", // 3
          "lycan_feral_impulse", // 4
          "lycan_summon_wolves", // 5
          "lycan_shapeshift", // 6
          "lycan_summon_wolves", // 7
          "lycan_feral_impulse", // 8
          "lycan_feral_impulse", // 9
          "lycan_howl", // 10
          "special_bonus_unique_lycan_3", // 11
          "lycan_shapeshift", // 12
          "lycan_howl", // 13
          "lycan_howl", // 14
          "lycan_howl", // 15
          "special_bonus_unique_lycan_8", // 16
          "special_bonus_attributes", // 17
          "lycan_shapeshift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lycan_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lycan_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "circlet",
            "branches",
            "branches",
            "branches",
          ],
          early_game: ["wraith_band", "bracer", "power_treads", "echo_sabre"],
          mid_game: ["harpoon", "manta", "aghanims_shard"],
          late_game: [
            "ultimate_scepter",
            "satanic",
            "assault",
            "sheepstick",
            "abyssal_blade",
            "silver_edge",
          ],
          situational: [
            "orchid",
            "black_king_bar",
            "heavens_halberd",
            "nullifier",
          ],
          core: [
            "echo_sabre",
            "aghanims_shard",
            "harpoon",
            "manta",
            "assault",
            "black_king_bar",
            "abyssal_blade",
          ],
          neutral: [
            "broom_handle",
            "occult_bracelet",
            //"misericorde",
            "dragon_scale",
            "orb_of_destruction",
            "paladin_sword",
            "titan_sliver",
            "mind_breaker",
            "penta_edged_sword",
            "demonicon",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      lycan_summon_wolves:
        "You should use your wolves to help you secure last hits and denies in the laning stage. Once you have lvl 4 wolves they get cripple and become really strong at harrassing the enemy if you are still laning.",
      lycan_howl:
        "You can get a value point in this earlier in place of feral impulse if you are fighting alot.",
      lycan_feral_impulse:
        "Damage and HP regen for lycan and all of his units. Really strong.",
      lycan_shapeshift:
        "Try to use this for a kill or teamfights when it's off cooldown. When it's on cooldown you should be avoiding engagements and farming.",
    },
    item_tooltips: {
      helm_of_iron_will:
        "You can rush this in the laning stage as your first item to sustain through any harras.",
      helm_of_the_dominator:
        "A core item that you should rush from the start. Helm of the Overlord should also be acquired as soon as possible.",
      orchid:
        "Allows you to solo opponents if they don`t have ways to dispel it.",
      ancient_janggo:
        "A core item that provides you, your summons and teammates with the burst of attack and movement speed.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      assault:
        "A core item that improves the dps of you, your summons and teammates. Adds some armor in the mix as well.",
      ultimate_scepter:
        "A core item to buff up one of your other right-clicking cores.",
      sheepstick: "For extra control.",
      nullifier: "To dispel defensive spells and items.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "phase_boots", info: "To phase through the summons block" },
          { item: "vanguard" },
        ],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [{ item: "crimson_guard" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [{ item: "abyssal_blade" }, { item: "assault" }],
      },
    },
  },

  Magnus: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959287",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "magnataur_shockwave", // 1
          `magnataur_skewer`, // 2
          "magnataur_shockwave", // 3
          "magnataur_skewer", // 4
          `magnataur_shockwave`, // 5
          "magnataur_reverse_polarity", // 6
          `magnataur_shockwave`, // 7
          "magnataur_empower", // 8
          `magnataur_empower`, // 9
          `magnataur_empower`, // 10
          `magnataur_empower`, // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          "magnataur_skewer", // 14
          `special_bonus_unique_magnus_4`, // 15
          "special_bonus_unique_magnus_7", // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_magnus_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `circlet`,
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `vanguard`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            "blink",
            `guardian_greaves`,
            `black_king_bar`,
            `force_staff`,
          ],
          late_game: [
            `crimson_guard`,
            `refresher`,
            `aghanims_shard`,
            `ultimate_scepter`,
            "octarine_core",
          ],
          situational: [
            `power_treads`,
            `harpoon`,
            `pipe`,
            `aether_lens`,
            `solar_crest`,
            `silver_edge`,
            `heavens_halberd`,
            `wind_waker`,
            `aeon_disk`,
            `lotus_orb`,
            `bloodthorn`,
            `greater_crit`,
            `assault`,
            `sphere`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `arcane_boots`,
            "blink",
            `guardian_greaves`,
            `black_king_bar`,
            "force_staff",
            "refresher",
          ],
          neutral: [
            `unstable_wand`,
            "arcane_ring",
            `pupils_gift`,
            `vambrace`,
            "ogre_seal_totem",
            `quickening_charm`,
            "spell_prism",
            `ninja_gear`,
            `fallen_sky`,
            `apex`,
          ],
        },
        item_tooltips: {
          arcane_boots:
            "A core boots upgrade that helps with mana sustain. Can be disassembled for Aether Lens later on.",
          wind_waker: `Often used as a dispel, setup or disengaging item. Also lets you reposition yourself in dangerous positions.`,
          guardian_greaves: `A core item that improves your impact in the game with auras and sustain. Makes you less reliant on just Reverse Polarity.`,
          aether_lens: `A situational item that Blink Dagger, Horn Toss and Skewer can make a great use of.`,
          aghanims_shard: `A core item that improves your damage output and control with Shockwave. Also helps in farming creep waves extremely fast.`,
          force_staff:
            "Extends the range from where you can start your sequence resulting in Reverse Polarity.",
          black_king_bar:
            "Can be helpful against silences and debuffs that prevent you from blinking or using Reverse Polarity.",
          refresher: "A core item that makes you a huge threat in late game.",
          silver_edge: `A situational item when the break effect is useful against enemy heroes. Also allows you to find better angles to get into fights and make a big Reverse Polarity play.`,
          ultimate_scepter: `A core late game pick up that gives you another repositioning tool with Horn Toss. Has great synergy with Skewer.`,
          vanguard: `A core item to rush in the offlane to become tanky and apply pressure on the lane. Builds into Crimson Guard later in the game.`,
          pipe: `Another incredible aura item you can build to make your whole team more tanky against magic damage.`,
          harpoon: `A situational item for offlane Magnus that acts as another gap close on enemy heroes. Works well as your first major item if you are building as a right clicker with Echo Sabre rather than buying auras.`,
          lotus_orb: "For reflecting, dispelling and armor.",
        },
        ability_tooltips: {
          /* magnataur_skewer:
            "You can skill this spell on level 2 if you see yourself being able to pull off a Shockwave into Skewer combo.", */
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716646936",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "magnataur_shockwave", // 1
          `magnataur_skewer`, // 2
          "magnataur_empower", // 3
          `magnataur_empower`, // 4
          "magnataur_empower", // 5
          "magnataur_reverse_polarity", // 6
          "magnataur_empower", // 7
          "magnataur_shockwave", // 8
          "magnataur_shockwave", // 9
          `magnataur_skewer`, // 10
          `magnataur_skewer`, // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          `magnataur_shockwave`, // 14
          `special_bonus_unique_magnus_4`, // 15
          `special_bonus_unique_magnus_7`, // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_magnus_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            `branches`,
            `branches`,
            `circlet`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`harpoon`, `blink`, `black_king_bar`, `octarine_core`],
          late_game: [
            `aghanims_shard`,
            `refresher`,
            `ultimate_scepter`,
            `assault`,
          ],
          situational: [
            `bracer`,
            `force_staff`,
            `crimson_guard`,
            `guardian_greaves`,
            `pipe`,
            `solar_crest`,
            `silver_edge`,
            `heavens_halberd`,
            `wind_waker`,
            `sphere`,
            `lotus_orb`,
            `sange_and_yasha`,
            `bloodthorn`,
            `greater_crit`,
            `assault`,
            `sphere`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            "power_treads",
            `harpoon`,
            "blink",
            `black_king_bar`,
            `octarine_core`,
            `refresher`,
            `ultimate_scepter`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `pupils_gift`,
            `vambrace`,
            `ogre_seal_totem`,
            `quickening_charm`,
            `spell_prism`,
            `ninja_gear`,
            `fallen_sky`,
            `apex`,
          ],
        },
        ability_tooltips: {
          /* magnataur_skewer:
            "You can skill this spell on level 2 if you see yourself being able to pull off a Shockwave into Skewer combo.", */
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that improves your farming speed by increasing attack speed and saving you some mana through toggling.",
          harpoon: `A core item for mid Magnus that acts as another gap close on enemy heroes. Boosts your right click damage while also making you more tanky.`,
          black_king_bar:
            "A core item that allows you to deliver the damage while being in the middle of the fight.",
          ultimate_scepter: `A core late game pick up that gives you another repositioning tool with Horn Toss. Has great synergy with Skewer.`,
          bloodthorn: `A situational item that allows you to kill-off heroes without even needing to Reverse Polarity. The Mage Slayer also helps reduce the magic damage of enemy heroes who rely on it, such as Storm Spirit.`,
          /* bloodthorn:
            "A core item that allows you to burst heroes while they are stunned by Reverse Polarity. It silences, makes every attack crit and grants true strike on affected opponent.", */
          aghanims_shard: `A core item that improves your damage output and control with Shockwave. Also helps in farming creep waves extremely fast.`,
          sphere: "Against powerful single-target disables and debuffs.",
          silver_edge:
            "Allows you to get off your combo easier, adds to the burst and applies break.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716647043",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "magnataur_shockwave", // 1
          "magnataur_skewer", // 2
          "magnataur_empower", // 3
          "magnataur_empower", // 4
          "magnataur_empower", // 5
          "magnataur_reverse_polarity", // 6
          "magnataur_empower", // 7
          "magnataur_shockwave", // 8
          "magnataur_shockwave", // 9
          `magnataur_skewer`, // 10
          `magnataur_skewer`, // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          `magnataur_shockwave`, // 14
          `special_bonus_unique_magnus_4`, // 15
          `special_bonus_unique_magnus_7`, // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_magnus_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `wind_lace`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            "blink",
            `force_staff`,
            `guardian_greaves`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `glimmer_cape`,
            `ghost`,
            `pipe`,
            `aether_lens`,
            `wind_waker`,
            `solar_crest`,
            `lotus_orb`,
            `assault`,
            `invis_sword`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "blink",
            `force_staff`,
            `guardian_greaves`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
          ],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            `philosophers_stone`,
            "bullwhip",
            "psychic_headband",
            `quickening_charm`,
            `spell_prism`,
            `ninja_gear`,
            "fallen_sky",
            "seer_stone",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock the pull camp.",
          arcane_boots:
            "A core boots upgrade that helps with mana sustain. Can be disassembled for Aether Lens later on. You can get Tranquil Boots after disassembling.",
          ultimate_scepter: `A core late game pick up that gives you another repositioning tool with Horn Toss. Has great synergy with Skewer.`,
          aghanims_shard: `A core item that improves your damage output and control with Shockwave. Also helps in farming creep waves extremely fast.`,
          aether_lens: `A situational item that Blink Dagger, Horn Toss and Skewer can make a great use of.`,
          force_staff:
            "Extends the range from where you can start your sequence resulting in Reverse Polarity or save a teammate.",
          refresher: "A core item that makes you a huge threat in late game.",
          invis_sword: "Allows you to get off your combo easier.",
          lotus_orb: "For reflecting, dispelling and armor.",
          wind_waker: `Often used as a dispel, setup or disengaging item. Also lets you reposition yourself in dangerous positions.`,
          guardian_greaves: `A core item that improves your impact in the game with auras and sustain. Makes you less reliant on just Reverse Polarity.`,
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_magnus_4: `On level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      blink:
        "A core item that allows you to get Reverse Polarity off and to Skewer an enemy.",
    },
    combo: [
      `magnataur_empower`,
      `blink`,
      `magnataur_reverse_polarity`,
      `magnataur_horn_toss`,
      `magnataur_skewer`,
      `magnataur_shockwave`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Magnus often uses a lot of spells to contest the lane.",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [{ item: "ward_sentry", info: "To block camps." }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "aeon_disk",
            info: "As you get ultied by Magnus, you buy yourself time to throw your spells and use your items.",
          },
          { item: "ethereal_blade" },
          {
            item: "wind_waker",
            info: "To save an ally stunned by Reverse Polarity.",
          },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Marci: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959380",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `marci_companion_run`, // 1	equals to rebound
          `marci_grapple`, // 2	 equals to dispose
          "marci_companion_run", // 3
          `marci_guardian`, // 4  equals to sidekick
          `marci_companion_run`, // 5
          "marci_unleash", // 6
          `marci_companion_run`, // 7
          `marci_guardian`, // 8
          `marci_guardian`, // 9
          `special_bonus_unique_marci_lunge_range`, // 10
          `marci_guardian`, // 11
          "marci_unleash", // 12
          `marci_grapple`, // 13
          `marci_grapple`, // 14
          `special_bonus_unique_marci_lunge_cooldown`, // 15
          `marci_grapple`, // 16
          "special_bonus_attributes", // 17
          "marci_unleash", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_marci_unleash_speed`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_marci_guardian_magic_immune", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `circlet`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`force_staff`, `black_king_bar`, `basher`, `blink`],
          late_game: [
            `aghanims_shard`,
            `greater_crit`,
            `abyssal_blade`,
            `overwhelming_blink`,
          ],
          situational: [
            `soul_ring`,
            `orb_of_corrosion`,
            `spirit_vessel`,
            `pavise`,
            `force_staff`,
            `heavens_halberd`,
            `solar_crest`,
            `pipe`,
            `lotus_orb`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `force_staff`,
            `black_king_bar`,
            `basher`,
            `blink`,
            `aghanims_shard`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            `orb_of_destruction`,
            `bullwhip`,
            `cloak_of_flames`,
            `paladin_sword`,
            `mind_breaker`,
            `penta_edged_sword`,
            `havoc_hammer`,
            `fallen_sky`,
            `desolator_2`,
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock the pull camp.",
          soul_ring: `A situational item that is useful for the armor component.`,
          orb_of_corrosion: `Lets you stick on enemy heroes in combination with Rebound. Also boosts your damage output.`,
          phase_boots: `A core item that improves your ability to fight with damage, armor, and mobility.`,
          /* arcane_boots:
            "A core item that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. Get Tranquil Boots afterwards.", */
          spirit_vessel: "Against heavy-healing lineups.",
          /* aether_lens:
            "A core item that Dispose and Rebound benefit the most from.", */
          aghanims_shard: `Lets you use Rebound when no allies are around. Also boosts your mobility massively in fights.`,
          ultimate_scepter: `Greatly improves your impact in teamfights by doing even more damage and slow.`,
          black_king_bar: `Improves your initiation with Rebound and lets you hit enemy heroes with Unleash without interruption.`,
          basher: `Helps you transition into a late game right click hero by locking down enemy heroes and killing them with Unleash.`,
          solar_crest: `Goes well with Sidekick buff on one of your right-clicking cores.`,
          heavens_halberd: "Especially good against ranged right-clickers.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716647152",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "marci_grapple", // 1	equals to dispose
          "marci_companion_run", // 2	equals to rebound
          `marci_guardian`, // 3  equals to sidekick
          `marci_guardian`, // 4
          `marci_guardian`, // 5
          "marci_unleash", // 6
          `marci_guardian`, // 7
          `marci_companion_run`, // 8
          `marci_companion_run`, // 9
          `marci_companion_run`, // 10
          `special_bonus_unique_marci_lunge_range`, // 11
          "marci_unleash", // 12
          "marci_grapple", // 13
          "marci_grapple", // 14
          `special_bonus_unique_marci_guardian_lifesteal`, // 15
          `marci_grapple`, // 16
          "special_bonus_attributes", // 17
          "marci_unleash", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_marci_unleash_speed`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_marci_guardian_magic_immune`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `phase_boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [`black_king_bar`, `ultimate_scepter`, `basher`, `blink`],
          late_game: [
            "greater_crit",
            "abyssal_blade",
            `satanic`,
            `aghanims_shard`,
            `overwhelming_blink`,
          ],
          situational: [
            `vanguard`,
            `armlet`,
            `orb_of_corrosion`,
            `power_treads`,
            `diffusal_blade`,
            `silver_edge`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `harpoon`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `black_king_bar`,
            `basher`,
            `blink`,
            `greater_crit`,
            `abyssal_blade`,
          ],
          neutral: [
            `faded_broach`,
            `duelist_gloves`,
            `orb_of_destruction`,
            `dragon_scale`,
            `paladin_sword`,
            `cloak_of_flames`,
            `penta_edged_sword`,
            `mind_breaker`,
            `desolator_2`,
            `apex`,
          ],
        },
        item_tooltips: {
          phase_boots:
            "A core boots upgrade that allows you to stay on target and with damage increase combines well with Unleash.",
          // soul_ring: "A core item that helps witn mana sutain.",
          black_king_bar:
            "A core item that allows you to deliver the damage while being in the middle of the fight.",
          basher:
            "A core item that goes well with Unleash and makes you less kitable during it.",
          monkey_king_bar:
            "Against evasion and miss chance. Procs often during Unleash.",
          ultimate_scepter: `Greatly improves your impact in teamfights by doing even more damage and slow.`,
          aghanims_shard: `Lets you use Rebound when no allies are around. Also boosts your mobility massively in fights..`,
          nullifier: `To dispel defensive items and spells from opponents that prevent you from hitting them.`,
          diffusal_blade: `A situational item when mana break is useful against enemy heroes, such as Medusa.`,
          harpoon: `A situational item when there is a lot of kite on the enemy team and you need another form of gap close.`,
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Great against magical burst.",
      blink: "A core item for instant gap-close, followed up with Dispose.",
    },
    combo: [
      `marci_guardian`,
      `black_king_bar`,
      `marci_companion_run`,
      `marci_unleash`,
      `marci_grapple`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "infused_raindrop" },
          { item: "wind_lace", info: "To keep the distance from Marci" },
          { item: "boots", info: "To keep the distance from Marci" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Marci`s Sidekick",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "blight_stone" },
          {
            item: "cloak",
            info: "Marci is heavy on magical damage early on and Cloak will negate 15% of it",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "ring_of_health" },
          { item: "vanguard" },
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "cyclone", info: "To disengage and dispel Sidekick" },
          { item: "blink", info: "To disjoint Rebound" },
          { item: "rod_of_atos" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "heavens_halberd" },
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          {
            item: "invis_sword",
            info: "To disengage from Rebound and Unleash",
          },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "aeon_disk" },
          { item: "ethereal_blade" },
          {
            item: "wind_waker",
            info: "To save an ally being focused by Marci",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "nullifier", info: "To dispel Sidekick" },
          { item: "butterfly" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "skadi", info: "To reduce healing" },
          {
            item: "shivas_guard",
            info: "To reduce healing and for some armor",
          },
        ],
      },
    },
  },

  Mars: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959474",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "mars_gods_rebuke", // 1
          "mars_spear", // 2
          "mars_spear", // 3
          "mars_gods_rebuke", // 4
          "mars_spear", // 5
          "mars_arena_of_blood", // 6
          "mars_spear", // 7
          "mars_gods_rebuke", // 8
          "mars_gods_rebuke", // 9
          "special_bonus_unique_mars_rebuke_radius", // 10
          "mars_bulwark", // 11
          "mars_arena_of_blood", // 12
          "mars_bulwark", // 13
          "mars_bulwark", // 14
          "special_bonus_unique_mars_rebuke_cooldown", // 15
          "mars_bulwark", // 16
          "special_bonus_attributes", // 17
          "mars_arena_of_blood", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_mars_spear_stun_duration", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_mars_arena_of_blood_hp_regen`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `arcane_boots`,
            `bracer`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            `crimson_guard`,
          ],
          late_game: [`pipe`, `octarine_core`, `refresher`, `assault`],
          situational: [
            `soul_ring`,
            `phase_boots`,
            `guardian_greaves`,
            `heavens_halberd`,
            `solar_crest`,
            `lotus_orb`,
            `aether_lens`,
            `meteor_hammer`,
            `cyclone`,
            `ultimate_scepter`,
            `sheepstick`,
            `heart`,
            `aeon_disk`,
            `overwhelming_blink`,
            `desolator`,
            `satanic`,
            `greater_crit`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `arcane_boots`,
            `blink`,
            `black_king_bar`,
            `aghanims_shard`,
            `crimson_guard`,
            `octarine_core`,
            `refresher`,
          ],
          neutral: [
            "pogo_stick",
            `arcane_ring`,
            `bullwhip`,
            `vambrace`,
            `titan_sliver`,
            "cloak_of_flames",
            `havoc_hammer`,
            `spell_prism`,
            `desolator_2`,
            `giants_ring`,
          ],
        },
      },
    ],
    ability_tooltips: {
      mars_bulwark:
        "You can take a point in this spell early into the laning stage if you are being harassed a lot by right-clicks especially ranged heroes.",
      special_bonus_unique_mars_arena_of_blood_hp_regen: `You can choose the other talent over the suggested one if you have build into high damage items such as Desolator and Satanic.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      vanguard: `A core item in the laning stage to provide you HP and sustain. Rush this item and then play aggressively once you have it.`,
      /* helm_of_iron_will:
        "You can rush this item for sustain on the lane. Upgrading it to Armlet is fine but usually you should make your way to Blink Dagger first. You can opt not to upgrade it at all.", */
      phase_boots: `A situational boots upgrade when armor and movement speed have great value against the enemy team.`,
      soul_ring: `A situational item that helps with mana sustain. You should make it if you get Phase Boots instead of Arcane Boots.`,
      cyclone:
        "It can be a particularly good purchase against elusive heroes to setup the Arena of Blood into Spear of Mars combo.",
      black_king_bar:
        "A core item that allows you to stay alive and get spells off while in the middle of the fight. Bullwark reduces a lot of right-click damage and BKB covers most of the rest.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      aghanims_shard: `A core item to improve your DPS and stun two heroes using Spear of Mars.`,
      lotus_orb: "For reflecting, dispelling and provides good armor.",
      desolator:
        "Very good dmg item that synergizes well with God`s Rebuke. You can get damage output items instead of utility items when you are ahead in the game. e.g 5/0 ",
      satanic:
        "Provides very good stats and using it with God`s Rebuke will result into very high HP lifesteals",
      refresher:
        "One of the best items you can get on Mars for crowd control. After you have used your Black King Bar, Arena and Spear you can refresh to use them again",
    },
    combo: [`blink`, `mars_arena_of_blood`, `mars_gods_rebuke`, `mars_spear`],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "blight_stone",
            info: "Mars has relatively low armor early and you can exploit that as a weakness",
          },
          { item: "lifesteal", info: "For sustaining on the lane" },
          {
            item: "wind_lace",
            info: "Makes harder for Mars to hit you with Spear of Mars and to catch you in the Arena of Blood",
          },
          {
            item: "boots",
            info: "Makes harder for Mars to hit you with Spear of Mars and to catch you in the Arena of Blood",
          },
          {
            item: "infused_raindrop",
            info: " Mars uses Spear in order to secure creeps whilst damaging you ",
          },
          {
            item: "cloak",
            info: "Mars is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          {
            item: "black_king_bar",
            info: "Will get you out of Arena and Spear setup or let you fight inside it",
          },
          {
            item: "silver_edge",
            info: " Breaking Mars will let you bypass the Bulwark and let you kill Mars easier",
          },
          {
            item: "desolator",
            info: "Mars has relatively low armor and low armor gain which desolator will help you punish even more",
          },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: "black_king_bar",
            info: "Will get you out of Arena or use your abilities inside it",
          },
        ],
        core: [
          {
            item: "bloodthorn",
            info: "Provides silence, spell damage debuff and high burst against Mars",
          },
          {
            item: "wind_waker",
            info: "Will let you cyclone out of the Arena and disengage",
          },
          { item: "assault" },
        ],
      },
    },
  },

  // YoonA plays hero
  Medusa: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959648",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "medusa_mystic_snake", // 1
          `medusa_mana_shield`, // 2
          "medusa_mystic_snake", // 3
          "medusa_split_shot", // 4
          "medusa_mystic_snake", // 5
          "medusa_split_shot", // 6
          `medusa_split_shot`, // 7
          "medusa_split_shot", // 8
          `medusa_stone_gaze`, // 9
          `medusa_mystic_snake`, // 10
          `special_bonus_unique_medusa_7`, // 11
          "medusa_mana_shield", // 12
          "medusa_mana_shield", // 13
          "medusa_mana_shield", // 14
          `special_bonus_unique_medusa_2`, // 15
          "medusa_stone_gaze", // 16
          "special_bonus_attributes", // 17
          "medusa_stone_gaze", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_medusa`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_medusa_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            "power_treads",
            "magic_wand",
            `wraith_band`,
            `wind_lace`,
            `phylactery`,
          ],
          mid_game: [`dragon_lance`, `manta`, `skadi`, `hurricane_pike`],
          late_game: [`butterfly`, `sheepstick`, `greater_crit`, `swift_blink`],
          situational: [
            `falcon_blade`,
            `mask_of_madness`,
            `phylactery`,
            `sange_and_yasha`,
            `black_king_bar`,
            `blink`,
            `disperser`,
            `sphere`,
            "monkey_king_bar",
            `silver_edge`,
            `mjollnir`,
            `satanic`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `dragon_lance`,
            `manta`,
            `skadi`,
            `hurricane_pike`,
            `butterfly`,
            `sheepstick`,
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            "grove_bow",
            `vambrace`,
            "elven_tunic",
            `paladin_sword`,
            `ninja_gear`,
            `mind_breaker`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
    ],
    ability_tooltips: {
      medusa_stone_gaze:
        "You can skill this spell(or keep a spell point) at level 6 if you are still laning or suspect to be ganked.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      power_treads:
        "A core boots upgrade that provides attack speed increase and mana savings through toggling.",
      mask_of_madness: `A situational farming item that can be disassembled later on for Satanic and Butterfly.`,
      manta:
        "A core item that provides you with a bit of everything. Manta illusions are great for clearing out an extra creepwave that you otherwise wouldn`t be able to with your hero.",
      dragon_lance: `Improves your attack range. Can be disassembled for Black King Bar or Aghanims Scepter.`,
      skadi:
        "A core item that improves your effective hp significantly, deals with kiting and reduces healing from opponents.",
      aghanims_shard:
        "Goes well with Aghanim`s Scepter and Mysic Snake talents.",
      hurricane_pike: `Provides some much needed mobility to enter fights or get away from enemy heroes.`,
      phylactery: `An early game pick up that makes you more tanky with the HP and mana pool. Also gives you another instance of damage when you cast Mystic Snake.`,
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      ultimate_scepter:
        "For extra control and damage amplification. Goes well with Aghanim`s Shard.",
      swift_blink:
        "To jump in the middle of the fight with Split Shot and Stone Gaze on.",
      monkey_king_bar: "Against evasion.",
      silver_edge: "For break and extra mobility.",
    },
    combo: [
      `medusa_split_shot`,
      `blink`,
      `medusa_stone_gaze`,
      `medusa_mystic_snake`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "wind_lace", info: "To avoid Mysic Snake bounces" },
          { item: "boots", info: "To avoid Mysic Snake bounces" },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "diffusal_blade" },
          { item: "heavens_halberd" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  Meepo: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959764",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          `meepo_ransack`, // 1
          `meepo_poof`, // 2
          `meepo_earthbind`, // 3
          "meepo_divided_we_stand", // 4
          "meepo_poof", // 5
          `meepo_poof`, // 6
          "meepo_poof", // 7
          `meepo_ransack`, // 8
          `meepo_ransack`, // 9
          `special_bonus_unique_meepo_2`, // 10
          "meepo_divided_we_stand", // 11
          `meepo_ransack`, // 12
          "meepo_earthbind", // 13
          `meepo_earthbind`, // 14
          `special_bonus_unique_meepo_4`, // 15
          `meepo_earthbind`, // 16
          "special_bonus_attributes", // 17
          "meepo_divided_we_stand", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_meepo_6`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_meepo_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [`wraith_band`, `power_treads`, `dragon_lance`],
          mid_game: [`blink`, `ultimate_scepter`, `skadi`, `aghanims_shard`],
          late_game: [`sheepstick`, `swift_blink`, `heart`, `assault`],
          situational: [
            `disperser`,
            `silver_edge`,
            `manta`,
            `overwhelming_blink`,
            `ethereal_blade`,
            `bloodthorn`,
            `butterfly`,
            `hurricane_pike`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            "dragon_lance",
            `blink`,
            `ultimate_scepter`,
            `skadi`,
            `aghanims_shard`,
          ],
          neutral: [
            "unstable_wand",
            `broom_handle`,
            "vambrace",
            `pupils_gift`,
            `elven_tunic`,
            `ogre_seal_totem`,
            "ninja_gear",
            `havoc_hammer`,
            "apex",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      power_treads: "A core boots upgrade. Meepo loves attribute stats.",
      dragon_lance:
        "A core item that provides a lot of attributes that Meepo wants for fair price.",
      blink: `A core item for gap-close followed by the burst from Poofs.`,
      ward_observer: `Only when you are going mid lane. You dont need it on the safe lane.`,
      skadi: "A core item that provides Meepo with a lot of useful stats.",
      sheepstick: "A core item that allows you to solo most of the heroes.",
      silver_edge: `An situational item when the break effect is useful against enemy heroes. Also allows you to pick off heroes with the added mobility.`,
      aghanims_shard: `A core item that gives you a survivability tool on every Meepo clone when they are low on HP.`,
      ultimate_scepter: `A core item that makes you extremely tanky and potent in fights. Especially useful when the enemy team has a ton of AOE abilities against you.`,
    },
    combo: [`meepo_poof`, `blink`, `meepo_earthbind`, `attack`],
    counter_items: {
      laning_phase: {
        all: [],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "crimson_guard", info: "To burst one of the clones" },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "force_staff" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Earthbind" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "mjollnir" },
          { item: "abyssal_blade" },
          { item: "bloodthorn", info: "To burst one of his clones" },
          { item: "butterfly" },
          { item: "assault" },
        ],
      },
    },
  },

  Mirana: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959872",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "mirana_arrow", // 1
          "mirana_leap", // 2
          "mirana_starfall", // 3
          "mirana_starfall", // 4
          "mirana_starfall", // 5
          "mirana_invis", // 6
          "mirana_starfall", // 7
          "mirana_arrow", // 8
          "mirana_arrow", // 9
          "mirana_arrow", // 10
          "special_bonus_unique_mirana_3", // 11
          "mirana_invis", // 12
          "mirana_leap", // 13
          "mirana_leap", // 14
          "special_bonus_unique_mirana_5", // 15
          "mirana_leap", // 16
          "special_bonus_attributes", // 17
          "mirana_invis", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_mirana_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_mirana_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            "circlet",
            `blood_grenade`,
            `branches`,
            `branches`,
            `clarity`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "urn_of_shadows",
            `arcane_boots`,
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: [`guardian_greaves`, `rod_of_atos`, `cyclone`],
          late_game: [
            `force_staff`,
            `gungir`,
            "ultimate_scepter",
            `sheepstick`,
          ],
          situational: [
            `spirit_vessel`,
            `heavens_halberd`,
            `pipe`,
            `orchid`,
            `blink`,
            `ethereal_blade`,
            `aghanims_shard`,
            "lotus_orb",
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `urn_of_shadows`,
            `guardian_greaves`,
            `rod_of_atos`,
            `cyclone`,
          ],
          neutral: [
            `faded_broach`,
            `mysterious_hat`,
            "philosophers_stone",
            `pupils_gift`,
            "quickening_charm",
            `ceremonial_robe`,
            `timeless_relic`,
            `ninja_gear`,
            "force_field",
            `demonicon`,
          ],
        },
      },
    ],
    ability_tooltips: {
      mirana_starfall:
        "You can keep a spell point at level 2 and skill situationally Starfall if the kill opportunity presents itself.",
    },
    item_tooltips: {
      ward_sentry:
        "Get two sentries with the bounty rune gold to block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      urn_of_shadows:
        "A core item that provides you with good stats. Try to rush it to have a good lane and then snowball off some kills.",
      arcane_boots: `You can make early Arcane Boots which build into Guardian Greaves later in the game.`,
      spirit_vessel: "Against heavy-healing lineup.",
      cyclone:
        "A core item that allows you to setup Sacred Arrow. Goes well with Blink Dagger.",
      rod_of_atos: `A long range set up item for your arrow similar to Euls. Lets you land arrows without having to Leap in.`,
      blink: `A late game pick up that lets you get in and out of fights without committing too many Leap charges.`,
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `mirana_invis`,
      `mirana_leap`,
      `cyclone`,
      `mirana_arrow`,
      `mirana_leap`,
      `mirana_starfall`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "infused_raindrop",
            info: `Prevents mirana from bursting you with spells`,
          },
          {
            item: "cloak",
            info: "Mirana is heavy on magical damage early on and Cloak will negate 15% of it",
          },
        ],
        support: [
          { item: "ward_observer", info: "To spot arrows" },
          {
            item: "ward_sentry",
            info: "Mirana`s ultimate Moonlight Shadow makes her and her allies become invisible",
          },
          { item: "dust" },
        ],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "SentryDust" },
          { item: "force_staff" },
          { item: "glimmer_cape" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly", info: "Against a core right-clicking Mirana" },
          { item: "assault", info: "Against a core right-clicking Mirana" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Monkey King": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960030",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "monkey_king_boundless_strike", // 1
          "monkey_king_jingu_mastery", // 2
          "monkey_king_jingu_mastery", // 3
          "monkey_king_tree_dance", // 4
          "monkey_king_jingu_mastery", // 5
          "monkey_king_tree_dance", // 6
          "monkey_king_tree_dance", // 7
          "monkey_king_tree_dance", // 8
          "monkey_king_wukongs_command", // 9
          "monkey_king_boundless_strike", // 10
          "monkey_king_boundless_strike", // 11
          "monkey_king_wukongs_command", // 12
          "monkey_king_boundless_strike", // 13
          "special_bonus_unique_monkey_king_9", // 14
          "special_bonus_unique_monkey_king_2", // 15
          "monkey_king_jingu_mastery", // 16
          "special_bonus_attributes", // 17
          "monkey_king_wukongs_command", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_monkey_king_10", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_monkey_king_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "circlet",
            "slippers",
            "ward_observer",
          ],
          early_game: [
            "orb_of_corrosion",
            "power_treads",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: ["echo_sabre", "diffusal_blade", "black_king_bar"],
          late_game: [
            "skadi",
            "abyssal_blade",
            "greater_crit",
            "satanic",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          situational: [
            "infused_raindrop",
            "silver_edge",
            "monkey_king_bar",
            "nullifier",
            "mjollnir",
            "manta",
            "bfury",
            "butterfly",
            "radiance",
            "sange_and_yasha",
            "sphere",
          ],
          core: [
            "power_treads",
            "harpoon",
            "black_king_bar",
            "skadi",
            "basher",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "lance_of_pursuit",
            //"misericorde",
            "ring_of_aquila",
            "orb_of_destruction",
            "titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "penta_edged_sword",
            "desolator_2",
            "apex",
            "ex_machina",
          ],
        },
        ability_tooltips: {
          monkey_king_jingu_mastery:
            "You can skill this spell on level 1 if you have an easy time of getting stacks up. Depending on the match-up you invest more or less points in this spell. This spell doesn`t help you farm in any way though.",
          monkey_king_wukongs_command:
            "You can put a point in this spell earlier than suggested if you are grouping and fighting a lot early.",
          special_bonus_unique_monkey_king_7:
            "You can consider taking this talent over the suggested one if you feel like you are getting splitpushed or having trouble catching a hero.",
        },
        item_tooltips: {
          orb_of_venom:
            "Start with it if you can get Jingu stacks easily against double melee on the sidelane e.g Pudge and Underlord or e.g Against Kunkka mid.",
          echo_sabre:
            "A core item that helps with mana sustain and allows you to build up Jingu stacks quikly. Can be disassembled.",
          black_king_bar:
            "A core item that allows you to stand your ground and fight. Wukong`s command makes you resistant against physical damage and Black King Bar sorts out most of the other sources of damage.",
          skadi:
            "A core item which works well with Wukong`s command. Especially good against immobile tanky and ranged heroes.",
          desolator:
            "Boundless Strike and Wukongs Command synergize very well with this item. Especially good against low armor heroes.",
          basher:
            "A core item that allows you to lock down the opponent you are focusing.",
          blink: "Allows you to find a nice spot to unleash Wukong`s Command.",
          silver_edge: "For break effect and to reposition.",
          monkey_king_bar: "Against evasion and miss chance.",
          nullifier:
            "To dispel defensive spells and items from the opponents that prevent you from hitting them.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718158708",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "monkey_king_tree_dance", // 1
          "monkey_king_boundless_strike", // 2
          "monkey_king_tree_dance", // 3
          "monkey_king_boundless_strike", // 4
          "monkey_king_tree_dance", // 5
          "monkey_king_wukongs_command", // 6
          "monkey_king_tree_dance", // 7
          "monkey_king_boundless_strike", // 8
          "monkey_king_boundless_strike", // 9
          "special_bonus_unique_monkey_king_9", // 10
          "monkey_king_jingu_mastery", // 11
          "monkey_king_wukongs_command", // 12
          "monkey_king_jingu_mastery", // 13
          "monkey_king_jingu_mastery", // 14
          "special_bonus_unique_monkey_king_7", // 15
          "monkey_king_jingu_mastery", // 16
          "special_bonus_attributes", // 17
          "monkey_king_wukongs_command", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_monkey_king_10", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_monkey_king_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "orb_of_venom",
            "blood_grenade",
            "branches",
            "branches",
            "faerie_fire",
          ],
          early_game: ["orb_of_corrosion", "power_treads", "magic_wand"],
          mid_game: ["diffusal_blade", "echo_sabre", "black_king_bar"],
          late_game: ["harpoon", "skadi", "basher", "sheepstick"],
          situational: [
            "spirit_vessel",
            "ancient_janggo",
            "meteor_hammer",
            "black_king_bar",
            "mage_slayer",
          ],
          core: [
            "power_treads",
            "orb_of_corrosion",
            "echo_sabre",
            "diffusal_blade",
          ],
          neutral: [
            "broom_handle",
            "duelist_gloves",
            "orb_of_destruction",
            "ring_of_aquila",
            "elven_tunic",
            "titan_sliver",
            //"black_powder_bag",
            "mind_breaker",
            "penta_edged_sword",
            //"heavy_blade",
            "desolator_2",
            "pirate_hat",
            "mirror_shield",
          ],
        },
        ability_tooltips: {
          monkey_king_jingu_mastery:
            "You can skill this spell on level 1 if you have an easy time of getting stacks up. Don`t put too many points(more than 2) in it. This spell is the least useful for you as support later on.",
        },
        item_tooltips: {
          orb_of_venom: "Allows you to stay on top of the opponents.",
          boots:
            "You can skip the boots entirely as you mainly use the trees to gank and setup kills.",
          spirit_vessel: "Against heavy-healing lineups.",
          orchid:
            "A core item that adds another utility to your hero. Helps with mana issues. You can setup kills with it.",
          solar_crest:
            "A core item to buff one of your right-clicking cores or debuff the hero you are looking to burst as a team.",
          rod_of_atos:
            "A good item that provides a little bit of extra control. Synergizes well with all of Monkey Kings skill set.",
          mage_slayer:
            "Against heavy magical damage lineups. Your statues apply debuff as well.",
          lotus_orb: "For reflect, dispel and armor.",
          black_king_bar:
            "An item that allows you to stand your ground and fight. Wukong`s command makes you resistant against physical damage and Black King Bar sorts out most of the other sources of damage.",
        },
      },
    ],
    ability_tooltips: {
      monkey_king_wukongs_command:
        "You can put a point in this spell earlier than suggested if you are grouping and fighting a lot early.",
      monkey_king_mischief:
        "Use this spell as the game starts and transform into a courier which sets your movespeed to 380 and try killing some of the couriers that opponents send right outside of fountain. ",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "A core item that allows you to pressure early on and works well with Wukong`s Command later.",
      infused_raindrop: "On hero against magical burst.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from Monkey King" },
          { item: "boots", info: "To keep the distance from Monkey King" },
          { item: "quelling_blade", info: "To cut the trees he is on" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "Continously does damage to him which prevents him to jump on a tree. Also builds into Spirit Vessel which is useful against his Jingu Mastery lifesteal.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "cyclone" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks, Boundless Strike and Wukong`s Command",
          },
        ],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "crimson_guard" },
          {
            item: "hurricane_pike",
            info: "As he uses the ulty you can potentially use this item to get him out of the circle and cancel it.",
          },
          { item: "silver_edge" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [],
        core: [
          { item: "assault" },
          {
            item: "radiance",
            info: "Provides you evasion and blind which helps against his physical attacks as well as continously doing dmg to him which prevents him to jump on trees.",
          },
          { item: "skadi" },
          { item: "shivas_guard" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          {
            item: "bloodthorn",
            info: "To burst this tanky hero while in Wukong`s Command",
          },
          { item: "nullifier", info: "Dispels Jingu Mastery buff" },
        ],
      },
    },
  },

  // eidendota plays hero
  Morphling: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960135",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "morphling_morph_agi", // 1
          "morphling_waveform", // 2
          "morphling_adaptive_strike_agi", // 3
          "morphling_waveform", // 4
          "morphling_waveform", // 5
          "morphling_morph_agi", // 6
          "morphling_waveform", // 7
          "morphling_adaptive_strike_agi", // 8
          "morphling_adaptive_strike_agi", // 9
          "morphling_adaptive_strike_agi", // 10
          "special_bonus_unique_morphling_1", // 11
          "morphling_morph_agi", // 12
          "morphling_replicate", // 13
          "morphling_morph_agi", // 14
          "special_bonus_unique_morphling_8", // 15
          "morphling_replicate", // 16
          "special_bonus_attributes", // 17
          "morphling_replicate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_morphling_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_morphling_waveform_cooldown", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "falcon_blade", "yasha"],
          mid_game: ["manta", "skadi", "ultimate_scepter"],
          late_game: [
            "black_king_bar",
            "skadi",
            "satanic",
            "butterfly",
            "greater_crit",
          ],
          situational: [
            "bottle",
            "silver_edge",
            "sphere",
            "blink",
            "aghanims_shard",
            "hurricane_pike",
            "diffusal_blade",
            "sange_and_yasha",
          ],
          core: [
            "power_treads",
            "manta",
            "skadi",
            "ultimate_scepter",
            "black_king_bar",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "occult_bracelet",
            "unstable_wand",
            "specialists_array",
            //"dagger_of_ristul", Removed in 7.33
            "grove_bow",
            "ring_of_aquila",
            "titan_sliver",
            "paladin_sword",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            "mirror_shield",
            "apex",
            "force_boots",
          ],
        },
      },
    ],
    ability_tooltips: {
      morphling_adaptive_strike_agi:
        "You can put a point in this spell at level 2 if you have problems securing range creep lasthits.",
      morphling_replicate:
        "You can put a point in ultimate at level 6 if you can go for a kill. Otherwise skip it and max out Waveform.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle: "If you are playing midlane Morphling.",
      lifesteal: "A core item that provides you with hp sustain.",
      infused_raindrop:
        "Especially useful if they have magical burst since you can get caught off-guard on low HP.",
      power_treads:
        "A core boots upgrade that speeds up your farm due to attack speed increase and mana savings through toggling.",
      manta:
        "A core item that provides you with mix of stats. Manta applies dispel on cast so it is good against Spirit Vessel - a common Morph counter. Using Manta illusions frequently will boost your farming speed.",
      sphere: "Great agaist powerful single-target disables and debuffs.",
      black_king_bar:
        "A core item that allows you to deliver the damage in the fights.",
      ultimate_scepter:
        "A situational item that helps you gain Status Resistance, Movement speed or Spell Amplification when used on an enemy hero.",
      blink:
        "To gap-close quickly and can be upgraded to Swift Blink down the road.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "infused_raindrop" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Attribute Shift(Strength Gain)",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "orchid" },
          {
            item: "diffusal_blade",
            info: "Morphling is a very mana dependent hero.",
          },
          { item: "heavens_halberd" },
          { item: "black_king_bar" },
          { item: "mage_slayer" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "shivas_guard",
            info: "Reduces Morphlings healing through Attribute Shift.",
          },
          { item: "sphere" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "skadi",
            info: "One of the best items against Morphling as it reduces healing, lifesteal and slows him by 50%.",
          },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          {
            item: "bloodthorn",
            info: "To burst this high armor hero and while it is morphing into strength",
          },
        ],
      },
    },
  },

  Muerta: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2943493038",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "muerta_dead_shot", // 1
          "muerta_the_calling", // 2
          "muerta_dead_shot", // 3
          `muerta_gunslinger`, // 4
          "muerta_dead_shot", // 5
          "muerta_pierce_the_veil", // 6
          `muerta_dead_shot`, // 7
          `muerta_gunslinger`, // 8
          `muerta_gunslinger`, // 9
          `muerta_gunslinger`, // 10
          `special_bonus_strength_8`, // 11
          "muerta_pierce_the_veil", // 12
          `muerta_the_calling`, // 13
          `muerta_the_calling`, // 14
          "special_bonus_attack_damage_35", // 15
          `muerta_the_calling`, // 16
          "special_bonus_attributes", // 17
          "muerta_pierce_the_veil", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_muerta_gunslinger_double_shot_chance`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_magic_resistance_25`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `maelstrom`,
            `hurricane_pike`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `greater_crit`,
            `yasha_and_kaya`,
            `mjollnir`,
            `swift_blink`,
          ],
          situational: [
            `mask_of_madness`,
            `falcon_blade`,
            `witch_blade`,
            `manta`,
            `skadi`,
            `blink`,
            `ethereal_blade`,
            "monkey_king_bar",
            `sphere`,
            "satanic",
            `ultimate_scepter`,
            `gungir`,
            `silver_edge`,
            `mage_slayer`,
            `sheepstick`,
            `bloodthorn`,
            `moon_shard`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `maelstrom`,
            `hurricane_pike`,
            `black_king_bar`,
            `greater_crit`,
            `yasha_and_kaya`,
          ],
          neutral: [
            `duelist_gloves`,
            `mysterious_hat`,
            `grove_bow`,
            `vambrace`,
            `paladin_sword`,
            `enchanted_quiver`,
            `mind_breaker`,
            `timeless_relic`,
            `desolator_2`,
            `pirate_hat`,
          ],
        },
        ability_tooltips: {
          muerta_dead_shot: `A powerful nuke for farming and disabling enemy heroes. You can bounce it off trees for a better direction on the feat effect.`,
          muerta_the_calling: `An incredible ability to slow enemy heroes and let you stay on top of them. Works well in combination with Dead Shot.`,
          muerta_pierce_the_veil: `An ability similar to Revenant Brooch which also allows you to hit ethereal units. Be careful not to use it against BKB or spell immunity as you will do no damage.`,
        },
        item_tooltips: {
          magic_wand: `Start with magic stick if you expect high frequency of spells from enemy heroes in your lane.`,
          falcon_blade: `An effective damage and mana regen item for Muerta in the early game.`,
          power_treads: `Provides you with necessary stats and attack speed in the early game.`,
          maelstrom: `Lets you farm efficiently on the map and works extremely well with Gunslinger.`,
          hurricane_pike: `Provides you with some much needed tankiness and mobility in the mid game. The added attack range is another big boost to your kill threat.`,
          black_king_bar: `Lets you play fights freely and right click enemy heroes without interruption.`,
          gungir: `An alternative to Mjolnir that gives you lockdown on top of your other disables.`,
          greater_crit: `A core item that massively boosts your damage and kill threat on the map.`,
          ethereal_blade: `An incredible late game pick up that works well with your ultimate. It greatly increases your damage under the effect of Pierce the Veil.`,
          revenants_brooch: `A luxury late game item with similar usage as Pierce the Veil. Be careful not to use it when the enemy hero has active spell immunity.`,
          skadi: `Another item that helps you stick on top of enemy heroes, similar to Gleipnir. Also effective against lifesteal and high HP regenerating heroes.`,
          swift_blink: `A late game pick up that boosts your movement speed and right clicking ability. You can replace Power Treads with it once you have a full inventory.`,
          mask_of_madness: `An early game farming tool that gives you some much needed attack speed and sustain. Can be disassembled for Satanic in the late game.`,
          yasha_and_kaya: `Provides damage amplification with all the spells and Pierce the Veil right clicks. Also gives some much needed movement and attack speed.`,
          manta: `An alternative to Yasha and Kaya when you need a dispel against roots and silences.`,
          mjollnir: `A late game upgrade for Maelstrom in the late game to boost your attack speed.`,
          silver_edge: `A situational item for games when you need the break effect against an enemy hero. Also acts as a mobility tool.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2943887000",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "muerta_dead_shot", // 1
          "muerta_the_calling", // 2
          "muerta_dead_shot", // 3
          `muerta_the_calling`, // 4
          "muerta_dead_shot", // 5
          "muerta_pierce_the_veil", // 6
          `muerta_dead_shot`, // 7
          `muerta_the_calling`, // 8
          `muerta_the_calling`, // 9
          `special_bonus_unique_muerta_dead_shot_damage`, // 10
          `muerta_gunslinger`, // 11
          "muerta_pierce_the_veil", // 12
          `muerta_gunslinger`, // 13
          `muerta_gunslinger`, // 14
          `special_bonus_attack_damage_35`, // 15
          `muerta_gunslinger`, // 16
          "special_bonus_attributes", // 17
          "muerta_pierce_the_veil", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_muerta_dead_shot_charges", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_muerta_the_calling_num_revenants`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `arcane_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`guardian_greaves`, `force_staff`, `rod_of_atos`, `blink`],
          late_game: [`sheepstick`, `octarine_core`, `gungir`, `bloodthorn`],
          situational: [
            `null_talisman`,
            `veil_of_discord`,
            `spirit_vessel`,
            `glimmer_cape`,
            `pavise`,
            `lotus_orb`,
            `ethereal_blade`,
            `wind_waker`,
            `pipe`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `guardian_greaves`,
            `force_staff`,
            `blink`,
            `sheepstick`,
            `gungir`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `bullwhip`,
            `grove_bow`,
            `quickening_charm`,
            `ceremonial_robe`,
            `spy_gadget`,
            `timeless_relic`,
            `force_field`,
            `fallen_sky`,
          ],
        },
        ability_tooltips: {
          muerta_dead_shot: `A powerful nuke for farming and disabling enemy heroes. You can bounce it off trees for a better direction on the feat effect.`,
          muerta_the_calling: `An incredible ability to slow enemy heroes and let you stay on top of them. Works well in combination with Dead Shot.`,
          muerta_pierce_the_veil: `An ability similar to Revenant Brooch which also allows you to hit ethereal units. Be careful not to use it against BKB or spell immunity as you will do no damage.`,
        },
        item_tooltips: {
          magic_wand: `Start with magic stick if you expect high frequency of spells from enemy heroes in your lane.`,
          falcon_blade: `An effective damage and mana regen item for Muerta in the early game.`,
          power_treads: `Provides you with necessary stats and attack speed in the early game.`,
          maelstrom: `Lets you farm efficiently on the map and works extremely well with Gunslinger.`,
          hurricane_pike: `Provides you with some much needed tankiness and mobility in the mid game. The added attack range is another big boost to your kill threat.`,
          black_king_bar: `Lets you play fights freely and right click enemy heroes without interruption.`,
          gungir: `A core item that gives you lockdown on top of your other disables.`,
          greater_crit: `A core item that massively boosts your damage and kill threat on the map.`,
          ethereal_blade: `An incredible late game pick up that works well with your ultimate. It greatly increases your damage under the effect of Pierce the Veil.`,
          revenants_brooch: `A luxury late game item with similar usage as Pierce the Veil. Be careful not to use it when the enemy hero has active spell immunity.`,
          skadi: `Another item that helps you stick on top of enemy heroes, similar to Gleipnir. Also effective against lifesteal and high HP regenerating heroes.`,
          swift_blink: `A late game pick up that boosts your movement speed and right clicking ability. You can replace Power Treads with it once you have a full inventory.`,
          guardian_greaves: `A mid game aura and sustain item that helps your team group up and take objectives.`,
          force_staff: `An essential mobility item for Muerta to get into fights and help allies.`,
          blink: `An incredible mobility item that lets you initiate fights with Dead Shot.`,
          sheepstick: `A core item in the late game that works well with Blink Dagger to disable enemy heroes.`,
        },
      },
    ],
    combo: [`muerta_dead_shot`, `muerta_the_calling`, `muerta_pierce_the_veil`],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: `infused_raindrop`,
            info: `Protects against Dead Shot burst`,
          },
          { item: `boots`, info: `To get out of The Calling AOE` },
          { item: `wind_lace`, info: `To get out of The Calling AOE` },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: `magicResistance`,
            info: `Buy magic resistance to protect against Muerta magic right clicks`,
          },
        ],
        support: [{ item: `glimmer_cape` }, { item: `force_staff` }],
        core: [
          {
            item: `black_king_bar`,
            info: `Muerta does reduced damage with her ulti through spell immunity`,
          },
          /* { item: `hood_of_defiance` }, */
          { item: `pipe` },
          { item: `eternal_shroud` },
          { item: `heavens_halberd` },
          {
            item: `mage_slayer`,
            info: `Heavily reduce magic right click damage of Muerta`,
          },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: `aeon_disk`,
            info: `Defends against getting bursted in the late game`,
          },
          {
            item: `wind_waker`,
            info: `Dispel yourself and get away from Muerta`,
          },
        ],
        core: [
          { item: `sheepstick`, info: `Lockdown and burst Muerta` },
          { item: `abyssal_blade`, info: `Lockdown and burst Muerta` },
          {
            item: `satanic`,
            info: `Dispel yourself and fight back against Muerta`,
          },
          {
            item: `bloodthorn`,
            info: `Silence and burst down Muerta while reducing her spell damage`,
          },
        ],
      },
    },
  },

  // eidendota plays hero
  "Naga Siren": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960208",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "naga_siren_mirror_image", // 1
          "naga_siren_rip_tide", // 2
          "naga_siren_mirror_image", // 3
          "naga_siren_ensnare", // 4
          "naga_siren_mirror_image", // 5
          "naga_siren_rip_tide", // 6
          "naga_siren_mirror_image", // 7
          "naga_siren_rip_tide", // 8
          "naga_siren_rip_tide", // 9
          "special_bonus_unique_naga_siren_2", // 10
          "naga_siren_song_of_the_siren", // 11
          "naga_siren_ensnare", // 12
          "naga_siren_ensnare", // 13
          "naga_siren_ensnare", // 14
          "special_bonus_unique_naga_siren_4", // 15
          "naga_siren_song_of_the_siren", // 16
          "special_bonus_attributes", // 17
          "naga_siren_song_of_the_siren", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_naga_siren", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_naga_siren_6", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "tango",
            "branches",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: ["power_treads", "wraith_band", "yasha"],
          mid_game: ["manta", "orchid", "heart"],
          late_game: [
            "butterfly",
            "skadi",
            "bloodthorn",
            "sheepstick",
            "swift_blink",
          ],
          situational: [
            "infused_raindrop",
            "diffusal_blade",
            "black_king_bar",
            "silver_edge",
            "blink",
            "aghanims_shard",
            "nullifier",
            "ultimate_scepter",
            "abyssal_blade",
            "swift_blink",
            "monkey_king_bar",
            "sphere",
          ],
          core: ["manta", "orchid", "heart", "butterfly"],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "unstable_wand",
            "occult_bracelet",
            "ring_of_aquila",
            "pupils_gift",
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
            "ninja_gear",
            "penta_edged_sword",
            "apex",
            "fallen_sky",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      naga_siren_mirror_image:
        "You should be spamming this spell off-cooldown in laning stage to secure last hits and harras, And for farming and pushing in lanes throughtout the game.",
      naga_siren_ensnare:
        "You can skill this spell earlier than suggested if you are able to setup a kill.",
      naga_siren_rip_tide:
        "Provides naga with a ton of damage, Max this asap after mirror image.",
      naga_siren_song_of_the_siren:
        "You can skill this spell earlier than suggested or keep a skill point if you feel like you might be in danger.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade. Naga really loves the attribute stats. Toggling the item can save you some mana as well. Try get this item as soon as possible in the laning stage.",
      manta:
        "A core item that provides you with a mix of stats. Rip Tide works on Manta illusions as well.",
      diffusal_blade:
        "Really good against Medusa and WK but also other heroes with small mana pool. Mana burn works on illusions as well.",
      skadi: "A core item that provides you with bunch of attribute stats.",
      orchid:
        "Allows you to pick-off heroes. Illusion benefit from attack speed as well. It should be upgraded to Bloodthorn down the road.",
      ultimate_scepter:
        "A core item for more control including spell-immune heroes.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      silver_edge:
        "For break effect, burst and mobility. Illusions crit as well.",
      blink:
        "To gap-close quickly. Can be upgraded to swift-blink, great item on naga.",
      aghanims_shard:
        "Allows you not to just reset the fight with Song of the Siren but also heal allies for a decent amount. You will acquire this buff from Roshan most of the time.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponents.",
      monkey_king_bar:
        "If you can't reliably use bloodthorn on a target with evasion get this.",
      butterfly:
        "Great item on naga for damage and for tanking up against physical damage heroes.",
      heart: "For tanking up naga and her illusions.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [{ item: "armor", info: "Buy armor items" }],
        support: [
          {
            item: "ward_sentry",
            info: "To block the camps in the area she is farming once she leaves the lane",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "dagon", info: "Instantly kills illusions" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "maelstrom" },
          { item: "bfury" },
          {
            item: "black_king_bar",
            info: "To be able to fight during Song of the Siren",
          },
          { item: "gungir" },
          { item: "travel_boots" },
          { item: "manta", info: "To dispel Ensnare" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [
          {
            item: "black_king_bar",
            info: "To be able to fight during Song of the Siren",
          },
          { item: "travel_boots" },
        ],
        core: [
          { item: "mjollnir" },
          { item: "shivas_guard" },
          { item: "radiance" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky high armor hero" },
          {
            item: "overwhelming_blink",
            info: "For AoE damage against illusions",
          },
          {
            item: "satanic",
            info: "To dispel Ensnare and to lifesteal off of her or her illusions",
          },
        ],
      },
    },
  },

  // eidendota plays hero
  "Nature's Prophet": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960338",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "furion_force_of_nature", // 1
          "furion_teleportation", // 2
          "furion_force_of_nature", // 3
          "furion_sprout", // 4
          "furion_force_of_nature", // 5
          "furion_wrath_of_nature", // 6
          "furion_force_of_nature", // 7
          "furion_teleportation", // 8
          "furion_teleportation", // 9
          "special_bonus_unique_furion_5", // 10
          "furion_teleportation", // 11
          "furion_wrath_of_nature", // 12
          "furion_sprout", // 13
          "furion_sprout", // 14
          "special_bonus_unique_furion_teleportation_max_stacks", // 15
          "furion_sprout", // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion_3", // 25
        ],
        items: {
          starting: [
            "blight_stone",
            "branches",
            "branches",
            "branches",
            "branches",
            "tango",
          ],
          early_game: ["power_treads", "magic_wand"],
          mid_game: ["witch_blade", "ultimate_scepter", "black_king_bar"],
          late_game: [
            "assault",
            "gungir",
            "satanic",
            "bloodthorn",
            "sheepstick",
            "mjollnir",
          ],
          situational: [
            "infused_raindrop",
            "heavens_halberd",
            "monkey_king_bar",
            "hurricane_pike",
            "nullifier",
            "silver_edge",
            "hand_of_midas",
            "crimson_guard",
            "aghanims_shard",
          ],
          core: [
            "power_treads",
            "witch_blade",
            "ultimate_scepter",
            "black_king_bar",
            "assault",
          ],
          neutral: [
            "unstable_wand",
            "lance_of_pursuit",
            //"misericorde",
            "grove_bow",
            "specialists_array",
            "enchanted_quiver",
            "titan_sliver",
            "mind_breaker",
            "trickster_cloak",
            "desolator_2",
            "pirate_hat",
          ],
        },
        item_tooltips: {
          magic_stick:
            "You can start with magic stick if you are laning against heroes that spam spells (EG. bristleback/phantom assassin).",
          power_treads:
            "A core boots upgrade that provides you with good amount of attack speed.",
          orchid: "A core item that allows you to pick-off heroes.",
          maelstrom: "A farming item. Good against illusions.",
          ancient_janggo:
            "If you are fighting and grouping a lot early on. The buff works on summons.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          assault:
            "A core item that helps against physical damage. Also buffs your summons and allies.",
          silver_edge:
            "A core item that provides you with burst, break effect and ability to reposition.",
          ultimate_scepter: "For extra control and to have lanes pushed out.",
          monkey_king_bar: "Against evasion and miss chance.",
          hurricane_pike: "To disengage from gap-closing opponents.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718666197",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "furion_force_of_nature", // 1
          "furion_teleportation", // 2
          "furion_force_of_nature", // 3
          "furion_sprout", // 4
          "furion_force_of_nature", // 5
          "furion_wrath_of_nature", // 6
          "furion_force_of_nature", // 7
          "furion_teleportation", // 8
          "furion_teleportation", // 9
          "special_bonus_unique_furion_5", // 10
          "furion_teleportation", // 11
          "furion_wrath_of_nature", // 12
          "furion_sprout", // 13
          "furion_sprout", // 14
          "special_bonus_unique_furion_teleportation_max_stacks", // 15
          "furion_sprout", // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion_3", // 25
        ],
        items: {
          starting: [
            "blight_stone",
            "branches",
            "branches",
            "branches",
            "branches",
            "tango",
          ],
          early_game: ["power_treads", "magic_wand", "hand_of_midas"],
          mid_game: ["maelstrom", "black_king_bar", "assault"],
          late_game: [
            "satanic",
            "skadi",
            "ultimate_scepter",
            "gungir",
            "greater_crit",
          ],
          situational: [
            "infused_raindrop",
            "monkey_king_bar",
            "hurricane_pike",
            "nullifier",
            "mjollnir",
            "sheepstick",
            "bloodthorn",
            "desolator",
            "aghanims_shard",
            "witch_blade",
            "butterfly",
            "silver_edge",
          ],
          core: ["power_treads", "maelstrom", "black_king_bar", "assault"],
          neutral: [
            "unstable_wand",
            "lance_of_pursuit",
            //"possessed_mask", Removed in 7.33
            //"misericorde",
            "grove_bow",
            "specialists_array",
            "enchanted_quiver",
            "titan_sliver",
            "mind_breaker",
            "ninja_gear",
            "trickster_cloak",
            "desolator_2",
            "pirate_hat",
            "ex_machina",
          ],
        },
        item_tooltips: {
          magic_stick:
            "If you are laning vs heroes that spam spells(EG. Bristleback/Batrider).",
          power_treads:
            "A core boots upgrade that provides you with good amount of attack speed.",
          assault:
            "Core item for nature's prophet tanking him up versus physical damage aswell as buffing allies and summons.",
          orchid:
            "A situational item that allows you to pick-off heroes. Should upgrade to bloodthorn later.",
          witch_blade:
            "Covers a lot of hero`s weaknesses like low armor, attack speed and burst.",
          maelstrom: "A farming item. Good against illusions.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click.",
          silver_edge:
            "A core item that provides you with burst, break effect and ability to reposition.",
          ultimate_scepter: "For extra control and to have lanes pushed out.",
          monkey_king_bar: "Against evasion and miss chance.",
          hurricane_pike: "To disengage from gap-closing opponents.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718666233",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "furion_force_of_nature", // 1
          "furion_teleportation", // 2
          "furion_teleportation", // 3
          "furion_sprout", // 4
          "furion_teleportation", // 5
          "furion_wrath_of_nature", // 6
          "furion_teleportation", // 7
          "furion_force_of_nature", // 8
          "furion_force_of_nature", // 9
          "special_bonus_unique_furion_5", // 10
          "furion_force_of_nature", // 11
          "furion_wrath_of_nature", // 12
          "furion_sprout", // 13
          "furion_sprout", // 14
          "special_bonus_unique_furion_teleportation_max_stacks", // 15
          "furion_sprout", // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "blight_stone",
            "branches",
            // "branches", total costs were 610, removed one branches
            "faerie_fire",
            "blood_grenade",
          ],
          early_game: ["medallion_of_courage", "magic_wand", "boots"],
          mid_game: ["solar_crest", "pavise", "ultimate_scepter"],
          late_game: ["octarine_core", "sheepstick", "refresher", "bloodthorn"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "heavens_halberd",
            "blink",
            "lotus_orb",
            "force_staff",
            "orchid",
            "ghost",
            "hand_of_midas",
            "ancient_janggo",
          ],
          core: [
            "solar_crest",
            "aghanims_shard",
            "ultimate_scepter",
            "sheepstick",
          ],
          neutral: [
            "lance_of_pursuit",
            "trusty_shovel",
            "orb_of_destruction",
            "pupils_gift",
            "enchanted_quiver",
            "quickening_charm",
            "spy_gadget",
            "spell_prism",
            "demonicon",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          ward_observer: "Consider placing courier sniping Observer Ward.",
          boots: "You can skip the boots entirely",
          spirit_vessel: "Against a heavy-healing lineup.",
          ancient_janggo:
            "A core item that bufs your team early on. The buff works on summons. Can be upgraded to boots of the bearing later.",
          solar_crest:
            "A core item to buff a right-clicking core. Allows you to kill Roshan earlier.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          ultimate_scepter:
            "A core item for extra control and to have lanes pushed out.",
          blink: "For gap-closing and safer split-push.",
          lotus_orb: "For reflect, dispel and some armor.",
          mekansm: "Rush this item on support natures prophet.",
        },
      },
    ],
    ability_tooltips: {
      furion_teleportation:
        "You can use this to fully heal in the laning stage by tping home with your TPS and using your spell to TP back to lane. You should try to split push during the mid and late game.",
      furion_force_of_nature:
        "Try to harras opponents in lane with your treants especially ranged heroes that struggle to deal with summons.",
      furion_wrath_of_nature:
        "Try to keep this spell ready for teamfights especially in early game teamfights.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      aghanims_shard: "A decent shard for teamfighting and early fights.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "quelling_blade", info: "To cut a tree in Sprout" },
          { item: "armor", info: "Buy armor items" },
          { item: "infused_raindrop", info: "For Wrath of Nature" },
        ],
        support: [],
        core: [
          { item: "ring_of_health" },
          { item: "phase_boots", info: "To phase through the summons block" },
        ],
      },
      mid_game: {
        all: [{ item: "quelling_blade" }],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "bfury" },
          {
            item: "heavens_halberd",
            info: "Against a core right-click build Nature`s Prophet",
          },
          { item: "basher" },
          { item: "travel_boots" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "travel_boots" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Necrophos: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960447",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "necrolyte_death_pulse", // 1
          "necrolyte_heartstopper_aura", // 2
          "necrolyte_death_pulse", // 3
          "necrolyte_sadist", // 4   equals to `ghost shroud`
          "necrolyte_death_pulse", // 5
          "necrolyte_reapers_scythe", // 6
          "necrolyte_death_pulse", // 7
          "necrolyte_heartstopper_aura", // 8
          "necrolyte_heartstopper_aura", // 9
          "necrolyte_heartstopper_aura", // 10
          `special_bonus_unique_necrophos_6`, // 11
          "necrolyte_reapers_scythe", // 12
          "necrolyte_sadist", // 13
          "necrolyte_sadist", // 14
          `special_bonus_unique_necrophos_3`, // 15
          "necrolyte_sadist", // 16
          "special_bonus_attributes", // 17
          "necrolyte_reapers_scythe", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_necrophos_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_necrophos_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "circlet",
            `circlet`,
            `ward_observer`,
          ],
          early_game: [
            `null_talisman`,
            `wraith_band`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `guardian_greaves`,
            `pipe`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [`kaya_and_sange`, `shivas_guard`, `lotus_orb`, `dagon_5`],
          situational: [
            `spirit_vessel`,
            `crimson_guard`,
            "radiance",
            `heavens_halberd`,
            `cyclone`,
            "aeon_disk",
            `ethereal_blade`,
            `eternal_shroud`,
            `octarine_core`,
            `black_king_bar`,
            `sphere`,
            `blade_mail`,
            "ultimate_scepter",
            `lotus_orb`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `null_talisman`,
            `wraith_band`,
            `guardian_greaves`,
            `pipe`,
            `aghanims_shard`,
            `kaya_and_sange`,
            `shivas_guard`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `vambrace`,
            `gossamer_cape`,
            `cloak_of_flames`,
            `quickening_charm`,
            `timeless_relic`,
            `spell_prism`,
            `fallen_sky`,
            "force_field",
          ],
        },
        item_tooltips: {
          /* power_treads:
            "A core item that tanks you up forther. Improves your attack speed signifcantly.", */
          cyclone:
            "A core item that provides you with movement speed and dispel against a common counter of Spirit Vessel.",
          pipe: "Against heavy-healing lineups.",
          heavens_halberd:
            "A strong alternative to Kaya and Sange especially against ranged right-clickers.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718666066",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "necrolyte_death_pulse", // 1
          "necrolyte_heartstopper_aura", // 2
          "necrolyte_death_pulse", // 3
          `necrolyte_heartstopper_aura`, // 4   equals to `ghost shroud`
          "necrolyte_death_pulse", // 5
          "necrolyte_reapers_scythe", // 6
          "necrolyte_death_pulse", // 7
          "necrolyte_heartstopper_aura", // 8
          "necrolyte_heartstopper_aura", // 9
          `necrolyte_sadist`, // 10
          `special_bonus_unique_necrophos_6`, // 11
          "necrolyte_reapers_scythe", // 12
          "necrolyte_sadist", // 13
          "necrolyte_sadist", // 14
          `special_bonus_unique_necrophos_3`, // 15
          "necrolyte_sadist", // 16
          "special_bonus_attributes", // 17
          "necrolyte_reapers_scythe", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_necrophos_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_necrophos`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `boots`,
            `null_talisman`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `travel_boots`,
            `cloak`,
            "kaya_and_sange",
            "aghanims_shard",
            `radiance`,
          ],
          late_game: [`pipe`, `force_staff`, `shivas_guard`, `dagon_5`],
          situational: [
            `power_treads`,
            `guardian_greaves`,
            `crimson_guard`,
            `cyclone`,
            `ethereal_blade`,
            `octarine_core`,
            `eternal_shroud`,
            `black_king_bar`,
            `sphere`,
            "aeon_disk",
            "heavens_halberd",
            "ultimate_scepter",
            `lotus_orb`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `travel_boots`,
            `kaya_and_sange`,
            `aghanims_shard`,
            `radiance`,
            `pipe`,
            `shivas_guard`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `vambrace`,
            `gossamer_cape`,
            `cloak_of_flames`,
            `quickening_charm`,
            `timeless_relic`,
            `spell_prism`,
            `fallen_sky`,
            `force_field`,
          ],
        },
        item_tooltips: {
          travel_boots:
            "A core item that allows fixes your movement speed issues and allows you to cover the map.",
          radiance: "Good against illusion based heroes.",
        },
      },
    ],
    ability_tooltips: {
      necrolyte_sadist:
        "Skill this spell on a per-need basis. On a tough lane, likely on level 4. On easy lane post level 6.",
      necrolyte_death_seeker: `An incredible item to close the gap on an enemy or ally hero. Also boosts your farming speed significantly.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      /* hood_of_defiance:
        "A core item that makes you less susceptible to magical damage, especially under the effect of the Ghost Shroud.", */
      guardian_greaves:
        "A potentially good item if you are planning to group up with your team and need to dispel something. If you use this under Ghost Shroud the healing gets amplified.",
      /* holy_locket:
        "If you feel your team doesnt need more damage but rather needs sustain. Amplifies all healing. Goes very well with your Death Pulse and its talent.", */
      eternal_shroud: `A situational item that is an alternate to Pipe for magic resistance.`,
      kaya_and_sange:
        "A core item that provides you with mix of offensive and defensive stats. Self healing amplification from Sange goes well with Ghost Shroud.",
      aghanims_shard:
        "A core item to save an ally, heal and amplify the magical damage on target.",
      blink: "For extra mobility and to get Reaper`s Scythe off easier.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `A situational item against heavy physical damage lineups.`,
      crimson_guard: `A situational aura item against heavy physical damage lineups. You should rush Vanguard in lane when you plan on getting Crimson Guard.`,
    },
    combo: [
      `necrolyte_death_seeker`,
      `necrolyte_death_pulse`,
      `dagon_5`,
      `necrolyte_reapers_scythe`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Necrophos will use Death Pulse frequently to harass and secure creep lasthits",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain through the DOT(Damage over time) from Heartstopper Aura.",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Necrophos is heavy on magical damage early on and Cloak will negate 15% of it",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Hearthstopper Aura and Death Pulse",
          },
        ],
        support: [],
        core: [
          {
            item: "ring_of_health",
            info: "To sustain through the DOT(Damage Over Time) from Heartstopper Aura.",
          },
        ],
      },
      mid_game: {
        all: [
          {
            item: "spirit_vessel",
            info: "Reduces Necrophoses healing effectiveness as his whole skill set and item set relies onto it.",
          },
        ],
        support: [
          {
            item: "glimmer_cape",
            info: "Using Glimmer Cape onto a target that is about to get ultied by Necrophos could potentially save them from lethal damage.",
          },
        ],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "aeon_disk" },
          {
            item: "wind_waker",
            info: "To save an ally being ultied by Necrophos",
          },
          {
            item: "revenants_brooch",
            info: "Your next 5 attacks will be able to go through his Ghost Shroud or Death Seeker.",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "skadi",
            info: "Core item against Necrophos as it reduces his healing, spell lifesteal and his movespeed.",
          },
          { item: "shivas_guard" },
          {
            item: "nullifier",
            info: "One of the core dispel items against Necrophos as his survival relies on Ghost Shroud and Deathseeker as well as some items like Eul`s Scepter or Aeon Disk.",
          },
          {
            item: "bloodthorn",
            info: "Provides you magic resistance, spell damage debuff and silence. Use it to burst Necrophos.",
          },
        ],
      },
    },
  },

  // eidendota plays hero
  "Night Stalker": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960635",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "night_stalker_void", // 1
          "night_stalker_hunter_in_the_night", // 2
          "night_stalker_void", // 3
          "night_stalker_hunter_in_the_night", // 4
          "night_stalker_void", // 5
          "night_stalker_darkness", // 6
          "night_stalker_void", // 7
          "night_stalker_crippling_fear", // 8
          "night_stalker_hunter_in_the_night", // 9
          `night_stalker_hunter_in_the_night`, // 10
          `special_bonus_unique_night_stalker_7`, // 11
          "night_stalker_darkness", // 12
          "night_stalker_crippling_fear", // 13
          "night_stalker_crippling_fear", // 14
          "special_bonus_unique_night_stalker_3", // 15
          "night_stalker_crippling_fear", // 16
          "special_bonus_attributes", // 17
          "night_stalker_darkness", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_night_stalker`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: ["vanguard", "phase_boots", "magic_wand", "bracer"],
          mid_game: [
            "echo_sabre",
            "black_king_bar",
            "blink",
            `basher`,
            `aghanims_shard`,
          ],
          late_game: [
            "abyssal_blade",
            "nullifier",
            "greater_crit",
            "assault",
            "overwhelming_blink",
          ],
          situational: [
            `hand_of_midas`,
            `sange_and_yasha`,
            `heavens_halberd`,
            `silver_edge`,
            `sphere`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            "phase_boots",
            "echo_sabre",
            "black_king_bar",
            "blink",
            "basher",
          ],
          neutral: [
            "broom_handle",
            `lance_of_pursuit`,
            //`dagger_of_ristul`,
            `vambrace`,
            "orb_of_destruction",
            `titan_sliver`,
            "ogre_seal_totem",
            `mind_breaker`,
            "penta_edged_sword",
            "desolator_2",
            `giants_ring`,
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      night_stalker_crippling_fear:
        "You can put a point in this spell earlier than suggested if silence is necessary to get a kill.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      vanguard:
        "The early you get it the better. Will make you alot tankier in lane and allow you to lane vs most heroes",
      phase_boots:
        "A core boots upgrade that allows you to gap-close even quicker.",
      echo_sabre:
        "A core item that that provides you with useful stats and burst. Can be disassembled.",
      hand_of_midas:
        "If you can get it early and the game looks to be slow paced.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      black_king_bar:
        "A core item that allows you to be in the middle of the fight and right-click the opponents down.",
      blink:
        "A core item that allows you to jump the backlines with Crippling Fear on.",
      basher:
        "A core item that allows you to lock down the hero you are focusing.",
      nullifier:
        "To dispel defensive spells and items from opponents that prevent you from right-clicking.",
      aghanims_shard: `Lets you apply pressure on enemy buildings after fights. Especially great against summon-based heroes.`,
      silver_edge: `Gives you pretty good stats and the ability to find backliners and scout. The break is also effective at removing passives.`,
    },
    combo: [
      `night_stalker_darkness`,
      `night_stalker_crippling_fear`,
      `black_king_bar`,
      `blink`,
      `night_stalker_void`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Night Stalker during night time",
          },
          {
            item: "boots",
            info: "To keep the distance from Night Stalker during night time",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          {
            item: "force_staff",
            info: "Lets you disengage out of the Crippling Fear and reposition yourself.",
          },
          {
            item: "ghost",
            info: "Night Stalker mostly relies on right clicking opponents.",
          },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "silver_edge" },
          { item: "heavens_halberd" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [
          {
            item: "aeon_disk",
            info: "Prevents getting jumped in the backline and getting bursted.",
          },
        ],
        core: [
          { item: "abyssal_blade", info: "To pin this mobile hero" },
          {
            item: "assault",
            info: "The armor from Assault helps with Night Stalkers right-clicks.",
          },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          {
            item: "butterfly",
            info: "Night Stalker mostly relies on right clicking and Butterfly provides evasion.",
          },
        ],
      },
    },
  },

  "Nyx Assassin": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960726",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "nyx_assassin_impale", // 1
          "nyx_assassin_spiked_carapace", // 2
          "nyx_assassin_impale", // 3
          `nyx_assassin_jolt`, // 4
          "nyx_assassin_impale", // 5
          "nyx_assassin_vendetta", // 6
          "nyx_assassin_impale", // 7
          `nyx_assassin_spiked_carapace`, // 8
          `nyx_assassin_spiked_carapace`, // 9
          `special_bonus_spell_amplify_6`, // 10
          `nyx_assassin_spiked_carapace`, // 11
          "nyx_assassin_vendetta", // 12
          `nyx_assassin_jolt`, // 13
          `nyx_assassin_jolt`, // 14
          `special_bonus_unique_nyx_5`, // 15
          `nyx_assassin_jolt`, // 16
          "special_bonus_attributes", // 17
          "nyx_assassin_vendetta", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_nyx_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_nyx_3`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`dagon_5`, `aghanims_shard`, `blink`, `ethereal_blade`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            "aeon_disk",
            `wind_waker`,
          ],
          situational: [
            `spirit_vessel`,
            `aether_lens`,
            `meteor_hammer`,
            `force_staff`,
            `lotus_orb`,
            `guardian_greaves`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `dagon_5`,
            `aghanims_shard`,
            `ethereal_blade`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            `grove_bow`,
            `bullwhip`,
            `enchanted_quiver`,
            `ceremonial_robe`,
            `timeless_relic`,
            `spell_prism`,
            `seer_stone`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /*nyx_assassin_mana_burn: `You can skill this spell on level 4 if you are playing against a high intelligence enemy hero in lane. Use it off cd in that case.`,*/
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick instead of boots if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      spirit_vessel: "Against heavy-healing lineup.",
      arcane_boots:
        "A core item that solves your mana sustain issues. Can be disasembled and Energy Booster used for Aether Lens or Lotus Orb. Consider Tranquil Boots after disassembling.",
      cyclone: `You can get euls in combination with the Meteor Hammer for more crowd control.`,
      blink: `An item that allows you to gap-close instantly and set up a kill with cyclone and Impale.`,
      ultimate_scepter: `A core item that improves Impale and Mind Flare signifcantly.`,
      lotus_orb: "For reflect, dispel and armor.",
      ethereal_blade: `An incredible buff for all your spells and also a nuisance for enemy right-click cores.`,
      dagon_5: `A core item that gives you massive burst potential to take down any hero from full to zero in seconds.`,
    },
    combo: [
      `nyx_assassin_vendetta`,
      `nyx_assassin_impale`,
      `ethereal_blade`,
      `dagon_5`,
      `nyx_assassin_jolt`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "arcane_boots",
            info: "To upkeep the mana against Mana Burn",
          },
          { item: "infused_raindrop" },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [{ item: "soul_ring" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "SentryDust" }, { item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  // YoonA plays hero
  "Ogre Magi": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960831",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "ogre_magi_ignite", // 1
          "ogre_magi_fireblast", // 2
          "ogre_magi_ignite", // 3
          `ogre_magi_bloodlust`, // 4
          "ogre_magi_ignite", // 5
          "ogre_magi_multicast", // 6
          "ogre_magi_ignite", // 7
          "ogre_magi_fireblast", // 8
          "ogre_magi_fireblast", // 9
          "special_bonus_unique_ogre_magi_4", // 10
          `ogre_magi_fireblast`, // 11
          "ogre_magi_multicast", // 12
          "ogre_magi_bloodlust", // 13
          "ogre_magi_bloodlust", // 14
          `special_bonus_hp_250`, // 15
          `ogre_magi_bloodlust`, // 16
          "special_bonus_attributes", // 17
          "ogre_magi_multicast", // 18
          "special_bonus_attributes", // 19
          `special_bonus_strength_30`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_ogre_magi_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `branches`,
            `enchanted_mango`,
            `enchanted_mango`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `bracer`,
            `infused_raindrop`,
          ],
          mid_game: [
            "aghanims_shard",
            "aether_lens",
            `phylactery`,
            "glimmer_cape",
            `force_staff`,
            `boots_of_bearing`,
          ],
          late_game: [
            `heart`,
            `sheepstick`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          situational: [
            `orb_of_venom`,
            `veil_of_discord`,
            `spirit_vessel`,
            `pavise`,
            `wind_waker`,
            "hand_of_midas",
            "lotus_orb",
            `heavens_halberd`,
            "blink",
            `solar_crest`,
            `ethereal_blade`,
            `guardian_greaves`,
            `travel_boots`,
          ],
          core: [
            `aether_lens`,
            `boots_of_bearing`,
            `glimmer_cape`,
            "aghanims_shard",
            `force_staff`,
            `heart`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `havoc_hammer`,
            "force_field",
            "seer_stone",
            `giants_ring`,
          ],
        },
      },
    ],
    ability_tooltips: {
      ogre_magi_bloodlust: `You have a lot of aggressive potential once you get this at level 4. Keep mana for your spells with mangoes and clarities.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      orb_of_venom: `Helps you stick on top of enemy heroes in the lane to attack them more often.`,
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane`,
      infused_raindrop: "Against magical burst.",
      hand_of_midas:
        "If you can get it early. Not recommended in majority of the games as you could have Veil of Discord and almost a Medallion of Courage for the same price.",
      arcane_boots:
        "A core item that helps with mana sustain. Can be disassembled down the road.",
      veil_of_discord: `A situational item that amplifies your teams spell damage (all types). Extremely potent with the level 10 Ignite talent.`,
      solar_crest: `A situational buffing item. Applying a Bloodlust and Solar Crest on a right-clicking ally is a huge boost to dps for him. When using Solar Crest on opponents, it can multicast.`,
      aghanims_shard:
        "A core item that protects your allies from right-click burst.",
      lotus_orb: "For reflect, dispel and armor.",
      blink: `To initiate fights with Fireblast.`,
      heart: `A core item that provides more mana pool, makes you extremely tanky, and signicantly improves Multicast chance.`,
      boots_of_bearing: `A core item that goes extremely well with bloodlust to buff yourself and your allied heroes.`,
    },
    combo: [
      `ogre_magi_bloodlust`,
      `veil_of_discord`,
      `ogre_magi_ignite`,
      `ogre_magi_fireblast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Ogre Magi will frequently use his spells to harass or buff himself or his allies",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Ogre Magi does a lot of magical damage and Cloak will offset 15% of it",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  Omniknight: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699955472",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "omniknight_hammer_of_purity", // 1
          `omniknight_martyr`, // 2
          "omniknight_martyr", // 3
          `omniknight_purification`, // 4
          "omniknight_martyr", // 5
          "omniknight_guardian_angel", // 6
          "omniknight_martyr", // 7
          "omniknight_purification", // 8
          "omniknight_purification", // 9
          `special_bonus_unique_omniknight_5`, // 10
          `omniknight_purification`, // 11
          "omniknight_guardian_angel", // 12
          "omniknight_hammer_of_purity", // 13
          "omniknight_hammer_of_purity", // 14
          "special_bonus_unique_omniknight_7", // 15
          "omniknight_hammer_of_purity", // 16
          "special_bonus_attributes", // 17
          "omniknight_guardian_angel", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_omniknight_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_omniknight_1", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            "enchanted_mango",
            `branches`,
            `branches`,
            "branches",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `force_staff`,
            `glimmer_cape`,
            `guardian_greaves`,
          ],
          late_game: [
            `solar_crest`,
            `aether_lens`,
            `ultimate_scepter`,
            `refresher`,
          ],
          situational: [
            `orb_of_venom`,
            `ring_of_basilius`,
            `boots_of_bearing`,
            `holy_locket`,
            `ghost`,
            `vladmir`,
            `aeon_disk`,
            `pipe`,
            `blink`,
            `octarine_core`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `pavise`,
            `force_staff`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            "arcane_ring",
            `faded_broach`,
            `bullwhip`,
            "philosophers_stone",
            `quickening_charm`,
            "psychic_headband",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      omniknight_hammer_of_purity: `Consider putting a skill point in this spell if you are able to run down an opponent. Goes well with Orb of Venom.`,
      omniknight_guardian_angel: `You dont have to skill this spell on level 6. Sometimes it is better to max out the Heavenly Grace and Purification before taking a point in Guardian Angel.`,
      omniknight_purification: `You can skill this spell earlier at level 3 if you are against a tough lane and your core needs a lot of HP regen.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      /* soul_ring:
        "Lets you use your Purification more frequently. Also if Purification is used on yourself, covers the HP loss from the soulring.", */
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Holy Locket. Get Tranquil Boots afterwards.",
      holy_locket: `A situational item that provides you with the ability to burst heal and replenish mana on yourself or your allies.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      solar_crest:
        "A core item that goes well with the buffing and saving theme of the hero.",
      blink:
        "A core item that allows you to stay back and hidden but also be able to get your spells off in the best way.",
      vladmir: `A situational item that goes well with the buffing and saving theme of the hero. Percentage value benefits of this item shine in late game.`,
      /* wraith_pact: "Could be a useful item offensively or defensively placed.", */
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Omniknight tends to use his spells to contest the lane frequently.",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from a core Omniknight",
          },
          {
            item: "boots",
            info: "To keep the distance from a core Omniknight",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Purification and Heavenly Grace. However be careful, Omniknight can dispel your Spirit Vessel with his Heavenly Grace.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "cyclone", info: "To dispel Heavenly Grace." },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          {
            item: "orchid",
            info: "Silencing Omniknight in a fight is a good way of preventing him from using his defensive skill set.",
          },
          {
            item: "diffusal_blade",
            info: "Omniknight is a very mana dependent hero.",
          },
          { item: "maelstrom" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [],
        core: [
          {
            item: "skadi",
            info: "Reduces his healing effects and his movespeed.",
          },
          { item: "shivas_guard", info: " Reduces his healing effects." },
          {
            item: "nullifier",
            info: "Dispels Heavenly Grace and Guardian Angel",
          },
          {
            item: "bloodthorn",
            info: "To prevent him from using his defensive skill set and burst him.",
          },
          {
            item: "mjollnir",
            info: "To be able to do magical damage while Guarding Angel is active",
          },
          {
            item: "monkey_king_bar",
            info: "To be able to do magical damage while Guarding Angel is active",
          },
        ],
      },
    },
  },

  // YoonA plays hero
  Oracle: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960994",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "oracle_fortunes_end", // 1
          "oracle_purifying_flames", // 2
          "oracle_purifying_flames", // 3
          "oracle_fates_edict", // 4
          "oracle_purifying_flames", // 5
          "oracle_false_promise", // 6
          "oracle_purifying_flames", // 7
          "oracle_fates_edict", // 8
          `oracle_fortunes_end`, // 9
          `special_bonus_unique_oracle_9`, // 10
          `oracle_fortunes_end`, // 11
          "oracle_false_promise", // 12
          "oracle_fortunes_end", // 13
          `oracle_fates_edict`, // 14
          `special_bonus_unique_oracle_5`, // 15
          `oracle_fortunes_end`, // 16
          "special_bonus_attributes", // 17
          "oracle_false_promise", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_oracle_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_oracle", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `enchanted_mango`,
            `branches`,
            `branches`,
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `flask`,
            `arcane_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`pavise`, `glimmer_cape`, `aether_lens`, "force_staff"],
          late_game: [
            `blink`,
            `aghanims_shard`,
            `aeon_disk`,
            `ultimate_scepter`,
          ],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `holy_locket`,
            `ghost`,
            `wind_waker`,
            `boots_of_bearing`,
            `guardian_greaves`,
            `octarine_core`,
            `sheepstick`,
            "lotus_orb",
            `solar_crest`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `pavise`,
            `glimmer_cape`,
            `aether_lens`,
            `force_staff`,
            `aghanims_shard`,
            "aeon_disk",
          ],
          neutral: [
            `pogo_stick`,
            `faded_broach`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `trickster_cloak`,
            "seer_stone",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* special_bonus_unique_oracle_5:
        "On level 15, take the suggested level 15 talent first and then on level 16 this level 10 talent. The dota client disallows me to indicate the order in graphics above.", */
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      flask: `You can apply a Salve with False Promise as it doesnt get canceled.`,
      arcane_boots: `A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Holy Locket or Aether Lens. Get Tranquil Boots afterwards.`,
      boots_of_bearing: `You can upgrade Tranquil Boots to Boots of Bearing in the late game for more auras and movement speed.`,
      holy_locket: `A situational item that lets you burst heal and replenish mana on yourself or your allies. Works well with False Promise.`,
      blink: `A situational item that allows you to stay back and hidden but also be able to get spells off in the best way.`,
      aghanims_shard: `A core item that gives you another healing and damage tool in an area.`,
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `An incredible upgrade for False Promise to give yourself or your ally better chances of survival.`,
      aeon_disk:
        "A core item that allows you to surive the jump by opponents and possibly turn the fight around by using False Promise. You are generally the first priority target for opponents.",
    },
    combo: [
      `oracle_purifying_flames`,
      `oracle_fortunes_end`,
      `oracle_purifying_flames`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to negate the healing on the hero that False Promise was used on. Apply Vessel towards end of the False promise and be mindful that Fortune`s End dispels Vessel debuff",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Oracle" },
        ],
        support: [{ item: "force_staff" }],
        core: [{ item: "orchid" }, { item: "black_king_bar" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "skadi" },
          { item: "shivas_guard" },
          { item: "satanic", info: "To dispel Fate`s Edict and Fortune`s End" },
        ],
      },
    },
  },

  "Outworld Devourer": {
    // not `Outworld Destroyer`
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961071",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `obsidian_destroyer_astral_imprisonment`, // 1
          `obsidian_destroyer_arcane_orb`, // 2
          `obsidian_destroyer_equilibrium`, // 3
          "obsidian_destroyer_astral_imprisonment", // 4
          "obsidian_destroyer_astral_imprisonment", // 5
          "obsidian_destroyer_sanity_eclipse", // 6
          `obsidian_destroyer_astral_imprisonment`, // 7
          "obsidian_destroyer_arcane_orb", // 8
          "obsidian_destroyer_arcane_orb", // 9
          `obsidian_destroyer_arcane_orb`, // 10
          `special_bonus_hp_200`, // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          `special_bonus_unique_outworld_devourer_astral_castrange`, // 15
          "obsidian_destroyer_equilibrium", // 16
          "special_bonus_attributes", // 17
          "obsidian_destroyer_sanity_eclipse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_outworld_devourer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_outworld_devourer_5`, // 25
        ],
        items: {
          starting: [`tango`, `crown`, `branches`, `ward_observer`],
          early_game: [`meteor_hammer`, `boots`, `magic_wand`, `wind_lace`],
          mid_game: [
            `black_king_bar`,
            `blink`,
            `travel_boots`,
            `hurricane_pike`,
            `aghanims_shard`,
          ],
          late_game: [
            `sheepstick`,
            `refresher`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          situational: [
            `hand_of_midas`,
            `aether_lens`,
            `sphere`,
            `lotus_orb`,
            `aeon_disk`,
            `shivas_guard`,
            `revenants_brooch`,
            `moon_shard`,
            `travel_boots_2`,
          ],
          core: [
            "meteor_hammer",
            `boots`,
            `black_king_bar`,
            `blink`,
            `hurricane_pike`,
            `aghanims_shard`,
            `refresher`,
          ],
          neutral: [
            `mysterious_hat`,
            `pogo_stick`,
            "grove_bow",
            "vambrace",
            "psychic_headband",
            `enchanted_quiver`,
            "timeless_relic",
            `spell_prism`,
            `pirate_hat`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          black_king_bar: `A core item against a lot of disables, magical damage and as a dispel.`,
          ultimate_scepter: `A late game pick up that acts as another survivability tool.`,
          aghanims_shard:
            "A core item that allows your allies to reposition during Astral Imprisonment even in Chronosphere or Black Hole.",
          aeon_disk: `A situational item that protects you from being bursted. Also provides mana pool which increases the damage of Sanitys Eclipse.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719253915",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          `obsidian_destroyer_astral_imprisonment`, // 1
          `obsidian_destroyer_arcane_orb`, // 2
          `obsidian_destroyer_equilibrium`, // 3
          "obsidian_destroyer_astral_imprisonment", // 4
          "obsidian_destroyer_astral_imprisonment", // 5
          "obsidian_destroyer_sanity_eclipse", // 6
          "obsidian_destroyer_astral_imprisonment", // 7
          "obsidian_destroyer_arcane_orb", // 8
          "obsidian_destroyer_arcane_orb", // 9
          "obsidian_destroyer_arcane_orb", // 10
          "special_bonus_attack_speed_20", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          `special_bonus_movement_speed_30`, // 15
          "obsidian_destroyer_equilibrium", // 16
          "special_bonus_attributes", // 17
          "obsidian_destroyer_sanity_eclipse", // 18
          "special_bonus_attributes", // 19
          `special_bonus_strength_20`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_outworld_devourer", // 25
        ],
        items: {
          starting: [`tango`, `crown`, `branches`, `ward_observer`],
          early_game: [
            `meteor_hammer`,
            `power_treads`,
            `null_talisman`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `witch_blade`,
            `hurricane_pike`,
            `black_king_bar`,
            `blink`,
          ],
          late_game: [
            `ultimate_scepter`,
            `sheepstick`,
            `moon_shard`,
            `revenants_brooch`,
          ],
          situational: [
            "hand_of_midas",
            `aether_lens`,
            `aghanims_shard`,
            `octarine_core`,
            `refresher`,
            `kaya_and_sange`,
            `sphere`,
            `shivas_guard`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `meteor_hammer`,
            "power_treads",
            `witch_blade`,
            "black_king_bar",
            "blink",
            `sheepstick`,
          ],
          neutral: [
            `mysterious_hat`,
            `pogo_stick`,
            `grove_bow`,
            `vambrace`,
            `quickening_charm`,
            `enchanted_quiver`,
            `timeless_relic`,
            `spell_prism`,
            `pirate_hat`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          hand_of_midas: `A greedy pick up that lets you scale better into the late game.`,
          witch_blade: `A core right click item that boosts your early kill threat on the map.`,
          black_king_bar: "A core item that allows you to deliver the damage.",
          ultimate_scepter: `A late game pick up that acts as another survivability tool.`,
          aghanims_shard:
            "Allows you or your allies to move while under Astral Imprisonment even in Chronosphere or walk out of Puck`s Mystic Coil without snapping it.",
          sheepstick:
            "A core item that allows you to control and burst an opponent.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      crown: "For Meteor Hammer rush.",
      meteor_hammer:
        "A core item that allows you to solo kill heroes, waveclear and pressure towers. The Ring of Health component provides you with hp sustain during early laning stage.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides you with significant attack speed increase and enlarges mana pool.",
      blink: "A core item that allows you to initiate or save an ally quickly.",
      hurricane_pike:
        "Allows you to create a distance from an enemy hero that jumped you. Adds to your right-click potential.",
      sphere: "Against powerful single-target disables and debuffs.",
    },
    combo: [
      `obsidian_destroyer_astral_imprisonment`,
      `black_king_bar`,
      `meteor_hammer`,
      `obsidian_destroyer_sanity_eclipse`,
      `obsidian_destroyer_arcane_orb`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          /* {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to negate the healing on the hero that False Promise was used on. Apply Vessel towards end of the False promise and be mindful that Fortune`s End dispels Vessel debuff",
          }, */
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: `black_king_bar` },
          {
            item: "blink",
            info: `To close the gap and kill Outworld Devourer.`,
          },
        ],
        support: [{ item: "force_staff" }],
        core: [{ item: "orchid" }, { item: `heavens_halberd` }],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "skadi" },
          { item: `sheepstick` },
          {
            item: `abyssal_blade`,
            info: `To stun lock and kill the Outworld Devourer at the start of the fight.`,
          },
        ],
      },
    },
  },

  Pangolier: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961166",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          `pangolier_lucky_shot`, // 4
          "pangolier_shield_crash", // 5
          "pangolier_gyroshell", // 6
          "pangolier_shield_crash", // 7
          "pangolier_swashbuckle", // 8
          "pangolier_swashbuckle", // 9
          `pangolier_swashbuckle`, // 10
          "special_bonus_unique_pangolier", // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          `special_bonus_unique_pangolier_2`, // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pangolier_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pangolier_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            "circlet",
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `orb_of_destruction`,
            "arcane_boots",
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `diffusal_blade`,
            `guardian_greaves`,
            `blink`,
            `aghanims_shard`,
            `crimson_guard`,
          ],
          late_game: [
            `pipe`,
            `basher`,
            `ultimate_scepter`,
            `monkey_king_bar`,
            `abyssal_blade`,
          ],
          situational: [
            `wraith_band`,
            `power_treads`,
            `spirit_vessel`,
            `octarine_core`,
            `gungir`,
            `lotus_orb`,
            `aeon_disk`,
            `sphere`,
            `octarine_core`,
            `black_king_bar`,
            `arcane_blink`,
            `wind_waker`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `guardian_greaves`,
            "blink",
            `aghanims_shard`,
            `pipe`,
            `diffusal_blade`,
            `ultimate_scepter`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `mind_breaker`,
            `penta_edged_sword`,
            `desolator_2`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          spirit_vessel: "Against heavy-healing lineup.",
          gungir:
            "Great against illusion based heroes especially if paired with Aghanim`s Scepter later on.",
          wind_waker: `A situational item that allows you to stop during Rolling Thunder and chain stun an enemy. Can be used as a dispel, namely against silences and roots.`,
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719254096",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          `pangolier_swashbuckle`, // 4
          "pangolier_shield_crash", // 5
          "pangolier_gyroshell", // 6
          "pangolier_shield_crash", // 7
          "pangolier_swashbuckle", // 8
          "pangolier_swashbuckle", // 9
          `special_bonus_unique_pangolier`, // 10
          `pangolier_lucky_shot`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          "special_bonus_unique_pangolier_6", // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pangolier_shield_crash_herostacks`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pangolier_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_sentry`,
            `ward_observer`,
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `urn_of_shadows`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`guardian_greaves`, `pavise`, `blink`, `aghanims_shard`],
          late_game: [`pipe`, `force_staff`, `gungir`, `aeon_disk`],
          situational: [
            `orb_of_corrosion`,
            `spirit_vessel`,
            `crimson_guard`,
            `vladmir`,
            `heavens_halberd`,
            `solar_crest`,
            `wind_waker`,
            `lotus_orb`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `guardian_greaves`,
            "blink",
            "aghanims_shard",
            "cyclone",
            `pipe`,
            `force_staff`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            `pupils_gift`,
            `bullwhip`,
            `ogre_seal_totem`,
            `ceremonial_robe`,
            `havoc_hammer`,
            `timeless_relic`,
            `fallen_sky`,
            `force_field`,
          ],
        },
        item_tooltips: {
          spirit_vessel: "Against heavy-healing lineup.",
          wind_waker: `A situational item that allows you to stop during Rolling Thunder and chain stun an enemy. Can be used as a dispel, namely against silences and roots.`,
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719254316",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          `pangolier_swashbuckle`, // 3
          `pangolier_shield_crash`, // 4
          `pangolier_swashbuckle`, // 5
          "pangolier_gyroshell", // 6
          `pangolier_swashbuckle`, // 7
          `pangolier_lucky_shot`, // 8
          `pangolier_shield_crash`, // 9
          `special_bonus_unique_pangolier`, // 10
          `pangolier_shield_crash`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          "special_bonus_unique_pangolier_2", // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pangolier_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_pangolier_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `branches`,
            `branches`,
            `branches`,
            `faerie_fire`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            "orb_of_corrosion",
            `power_treads`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `diffusal_blade`,
            "aghanims_shard",
            `ultimate_scepter`,
            `basher`,
            `blink`,
          ],
          late_game: [
            `octarine_core`,
            `abyssal_blade`,
            `monkey_king_bar`,
            `overwhelming_blink`,
          ],
          situational: [
            `spirit_vessel`,
            `guardian_greaves`,
            `harpoon`,
            `gungir`,
            `bloodthorn`,
            `sphere`,
            `lotus_orb`,
            `black_king_bar`,
            `aeon_disk`,
            `wind_waker`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `diffusal_blade`,
            `aghanims_shard`,
            `ultimate_scepter`,
            "basher",
            `blink`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `titan_sliver`,
            `ogre_seal_totem`,
            `penta_edged_sword`,
            `mind_breaker`,
            `desolator_2`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
          gungir: `A situational item against illusion and summons lineups.`,
          diffusal_blade: `A core item that improves your damage and kill threat on the map with Swashbuckle.`,
          wind_waker:
            "Allows you to stop during Rolling Thunder and chain stun an enemy. Can be used as a dispel, namely against silences and roots.",
          black_king_bar:
            "Since this build is not all about Rolling Thunder you might need this item to be able to right-click or Swashbuckle the opponents in the middle of the fight.",
          ultimate_scepter:
            "A core item that allows Sield Crash to cast Swashbuckle during Rolling Thunder. Since you will have Maelstrom and Basher by this point, those will be procing as well.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      orb_of_corrosion: `A situational item that gets applied by Swashbuckle.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A situational boots upgrade that builds into Guardian Greaves.`,
      blink:
        "A core item that allows you to jump on the opponents while Rolling Thunder is active.",
      aghanims_shard:
        "A core upgrade that allows you to become spell-immune, stop in place and turn during Rolling Thunder.",
      basher:
        "A core item that can proc on Swashbuckle and during Rolling Thunder with upgraded Shield Crash with Aghanim`s Scepter.",
      sphere: `Against powerful single-target disables and debuffs (Rupture, Primal Roar, Fiends Grip).`,
    },
    combo: [
      `pangolier_swashbuckle`,
      `pangolier_gyroshell`,
      `blink`,
      `pangolier_shield_crash`,
      `pangolier_rollup`,
      `pangolier_swashbuckle`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "wind_lace",
            info: "To keep the distance from Pangolier and to dodge the Rolling Thunder",
          },
          {
            item: "boots",
            info: "To keep the distance from Pangolier and to dodge the Rolling Thunder",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "hurricane_pike" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "manta", info: "To dispel Lucky Shot" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          {
            item: "bloodthorn",
            info: "To burst this tanky hero even if Shield Crash is active",
          },
          {
            item: "nullifier",
            info: "To burst this tanky hero while Shield Crash is active",
          },
          { item: "satanic", info: "To dispel Lucky Shot" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Phantom Assassin": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961303",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "phantom_assassin_stifling_dagger", // 1
          "phantom_assassin_phantom_strike", // 2
          "phantom_assassin_stifling_dagger", // 3
          "phantom_assassin_blur", // 4
          "phantom_assassin_stifling_dagger", // 5
          "phantom_assassin_coup_de_grace", // 6
          "phantom_assassin_phantom_strike", // 7
          "phantom_assassin_phantom_strike", // 8
          "phantom_assassin_phantom_strike", // 9
          "special_bonus_unique_phantom_assassin_4", // 10
          "phantom_assassin_stifling_dagger", // 11
          "phantom_assassin_coup_de_grace", // 12
          "phantom_assassin_blur", // 13
          "phantom_assassin_blur", // 14
          "special_bonus_unique_phantom_assassin_6", // 15
          "phantom_assassin_blur", // 16
          "special_bonus_attributes", // 17
          "phantom_assassin_coup_de_grace", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phantom_assassin_strike_aspd", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_phantom_assassin", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: [
            "power_treads",
            "cornucopia",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: ["bfury", "desolator", "black_king_bar", "basher"],
          late_game: ["satanic", "abyssal_blade", "ultimate_scepter"],
          situational: [
            "manta",
            "ultimate_scepter",
            "sphere",
            "monkey_king_bar",
            "nullifier",
            "aghanims_shard",
          ],
          core: [
            "power_treads",
            "bfury",
            "desolator",
            "black_king_bar",
            "aghanims_shard",
            "basher",
            "satanic",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "lance_of_pursuit",
            //"misericorde",
            //"dagger_of_ristul", Removed in 7.33
            "ring_of_aquila",
            "orb_of_destruction",
            "paladin_sword",
            "titan_sliver",
            "penta_edged_sword",
            "mind_breaker",
            "desolator_2",
            "apex",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      phantom_assassin_blur:
        "You can skill this spell at level 2 already if you are being right clicked a lot.",
      special_bonus_unique_phantom_assassin_3:
        "You can take this level 20 talent over the suggested one if the opponents still don`t have item counters to evasion.",
    },
    item_tooltips: {
      blight_stone:
        "If you can pressure the opponents early into the laning stage.",
      orb_of_venom:
        "If you can pressure the opponents early into the laning stage.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "If you can pressure the opponents early into the laning stage.",
      ring_of_health:
        "Helps with the hp sustain on the lane and incorporates into Battle Fury.",
      power_treads:
        "A core boots upgrade that improves your farming speed through attack speed increase and mana savings.",
      bfury: "A core farming item.",
      desolator:
        "A core item that adds to your burst, allows you to take buildings down faster and kill Roshan. You can delay this item in favor of Black King Bar if you need to fight earlier.",
      black_king_bar:
        "A core item that allows you to deliver the damage under spell-immunity. You can buy this item immediately after Battle Fury if you need to fight earlier.",
      ultimate_scepter:
        "Provides your Blur to have a dispel and lowers its cooldown tremendously.",
      aghanims_shard:
        "A core item that provides break effect and adds to your burst potential.",
      basher:
        "A core item that provides control against elusive heroes and makes delivering damage a lot easier. Can be upgraded to Abyssal Blade.",
      satanic:
        "A core item that improves your sustain and applies dispel on cast. Stifling Daggers also lifesteal.",
      sphere: "Against powerful single-target disables and debuffs.",
      monkey_king_bar: "Against evasion.",
      nullifier: "To dispel defensive spells and items on opponents.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Great item as she uses Stifling Dagger to farm and harass",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ghost" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "monkey_king_bar" },
          { item: "silver_edge" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          {
            item: "revenants_brooch",
            info: "Your next 5 attacks have True strike that pierce through Blur.",
          },
        ],
        support: [],
        core: [
          { item: "bloodthorn", info: "For true strike against Blur" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Phantom Lancer": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961424",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "phantom_lancer_spirit_lance", // 1
          "phantom_lancer_phantom_edge", // 2
          "phantom_lancer_doppelwalk", // 3
          "phantom_lancer_phantom_edge", // 4
          "phantom_lancer_phantom_edge", // 5
          "phantom_lancer_juxtapose", // 6
          "phantom_lancer_phantom_edge", // 7
          "phantom_lancer_doppelwalk", // 8
          "phantom_lancer_doppelwalk", // 9
          "special_bonus_unique_phantom_lancer_2", // 10
          "phantom_lancer_doppelwalk", // 11
          "phantom_lancer_juxtapose", // 12
          "phantom_lancer_spirit_lance", // 13
          "phantom_lancer_spirit_lance", // 14
          "phantom_lancer_spirit_lance", // 15
          "special_bonus_strength_15", // 16
          "special_bonus_attributes", // 17
          "phantom_lancer_juxtapose", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phantom_lancer", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_phantom_lancer_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: ["power_treads", "magic_wand", "wraith_band"],
          mid_game: ["diffusal_blade", "manta", "heart", "aghanims_shard"],
          late_game: [
            "skadi",
            "butterfly",
            "abyssal_blade",
            "bloodthorn",
            "disperser",
          ],
          situational: [
            "monkey_king_bar",
            "sphere",
            "silver_edge",
            "swift_blink",
            "octarine_core",
            "sange_and_yasha",
            "ultimate_scepter",
            "mage_slayer",
          ],
          core: [
            "power_treads",
            "diffusal_blade",
            "manta",
            "heart",
            "aghanims_shard",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "lance_of_pursuit",
            "ring_of_aquila",
            //"dagger_of_ristul", Removed in 7.33
            "pupils_gift",
            "orb_of_destruction",
            "titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "mirror_shield",
            "apex",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      phantom_lancer_doppelwalk:
        "You can skill this spell on level 1 or 2 if there`s a need for dispel. On other hand, you can delay skilling this spell to level 4 if there`s no need for dispel.",
      special_bonus_strength_15:
        "Consider taking this talent if you need to survive a burst combo e.g. Tiny",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that allows you to farm faster due to attack speed increase. It also provides the stat attributes which all the illusion based heroes adore.",
      hood_of_defiance: "Against a lot of magical damage in early to midgame.",
      diffusal_blade:
        "A cheap core item that provides you a lot of useful stat attributes but also the mana burn works with your illusions.",
      manta:
        "A core item that provides you with useful stat attributes, dispel and goes well with Diffusal Blade.",
      heart:
        "A core item that makes you and your illusions very tanky. An alternative would be tanking up with Skadi against immobile tanky heroes or ranged heroes.",
      skadi:
        "A core item that is usually used against tanky immobile heroes with a lot of regen and against ranged heroes since it immensely slows their attack speed and movespeed. Is an alternative to Heart.",
      aghanims_shard:
        "A core item that is really good at poking the opponents from the distance and provides a lot of value in longer fights. Creates additional chaos in the fights. Works well with Octarine.",
      octarine_core:
        "A core item that reduces the cooldown of all of your active spell and items. Goes well with Aghanim`s Shard and your 15th Talent (Spirit Lance cooldown -2).",
      butterfly:
        "A core item after you`ve tanked up. Good against physical damage heroes. Provides you with very good stats and evasion. Your illusion benefit from it very well.",
      monkey_king_bar: "Against evasion and miss chance.",
      sphere: "Against powerful single-target disables and debuffs.",
      bloodthorn:
        "To burst tanky heroes and for true strike. You illusions also crit on Bloodthorned hero.",
      silver_edge:
        "For break effect, burst and to reposition. Illusions have crit chance as well.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
          {
            item: "magic_stick",
            info: "Phantom Lancer uses his Spirit Lance and Doppelganger to contest the lane.",
          },
        ],

        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "maelstrom" },
          { item: "bfury" },
          { item: "black_king_bar" },
          { item: "gungir" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "mjollnir" },
          { item: "shivas_guard" },
          { item: "radiance" },
          { item: "butterfly" },
          { item: "assault" },
          {
            item: "overwhelming_blink",
            info: "For some AoE damage against illusions",
          },
        ],
      },
    },
  },

  // YoonA plays hero
  Phoenix: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961589",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "phoenix_fire_spirits", // 1
          "phoenix_icarus_dive", // 2
          "phoenix_fire_spirits", // 3
          "phoenix_sun_ray", // 4
          "phoenix_fire_spirits", // 5
          "phoenix_supernova", // 6
          "phoenix_fire_spirits", // 7
          "phoenix_sun_ray", // 8
          "phoenix_sun_ray", // 9
          "phoenix_sun_ray", // 10
          "phoenix_icarus_dive", // 11
          "phoenix_supernova", // 12
          "phoenix_icarus_dive", // 13
          "phoenix_icarus_dive", // 14
          "special_bonus_spell_amplify_6", // 15
          "special_bonus_unique_phoenix_3", // 16
          "special_bonus_attributes", // 17
          "phoenix_supernova", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phoenix_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_phoenix_1`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `branches`,
            "circlet",
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `urn_of_shadows`,
            "infused_raindrop",
          ],
          mid_game: [
            `aghanims_shard`,
            `pavise`,
            `boots_of_bearing`,
            `shivas_guard`,
          ],
          late_game: [`refresher`, `aeon_disk`, `sheepstick`, `octarine_core`],
          situational: [
            `guardian_greaves`,
            "lotus_orb",
            `holy_locket`,
            `spirit_vessel`,
            `wind_waker`,
            `meteor_hammer`,
            `glimmer_cape`,
            `ethereal_blade`,
            "force_staff",
            "heavens_halberd",
            "pipe",
            `ultimate_scepter`,
            "radiance",
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            "aghanims_shard",
            `boots_of_bearing`,
            `shivas_guard`,
            `refresher`,
          ],
          neutral: [
            `unstable_wand`,
            `mysterious_hat`,
            "philosophers_stone",
            `pupils_gift`,
            "quickening_charm",
            `dandelion_amulet`,
            "spell_prism",
            "timeless_relic",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      phoenix_fire_spirits: `Multiple fire spirits do not stack on the same target. Try to chain them instead of throwing them all at once on the same enemy hero`,
      special_bonus_spell_amplify_6:
        "On level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "On hero against magical burst.",
      tranquil_boots:
        "A core boots upgrade. Solves hp sustain and movement speed issues for the hero.",
      spirit_vessel: `Upgrade the Urn to Spirit Vessel early on against heavy-healing lineup.`,
      refresher: `An incredible late game pick up that massively improves your teamfight potential.`,
      shivas_guard: `A core item that improves your tankiness and increases the chances of your Supernova surviving by decreasing attack speed around you.`,
      wind_waker: `Gives you a dispel and allows you to move to safety with invulnerability.`,
      meteor_hammer: `A combination item that goes with Euls to cyclone and hammer an enemy hero. Also provides tower push.`,
      holy_locket: `A situational item that signifcantly amplifies healing coming from Sunray. Provides you with a second source of burst healing when activating the item.`,
      aghanims_shard:
        "A core upgrade that allows you to use Sunray during Supernova. Ideally, use the Sunray before you activate Supernova so you have another Sunray once the egg explodes.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `A situational item that allows you to save an ally with Supernova.`,
    },
    combo: [
      `phoenix_sun_ray`,
      `phoenix_fire_spirits`,
      `phoenix_icarus_dive`,
      `phoenix_supernova`,
      `phoenix_sun_ray`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "cloak",
            info: "Phoenix is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Phoenix does his spell combo you can often times run away from Supernova quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "AttackSpeed", info: "to destroy the egg" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "AttackSpeed", info: "to destroy the egg" }],
      },
    },
  },

  "Primal Beast": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // To be updated

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2763260196",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `primal_beast_onslaught`, // 1
          "primal_beast_trample", // 2
          `primal_beast_uproar`, // 3
          `primal_beast_trample`, // 4
          `primal_beast_trample`, // 5
          "primal_beast_pulverize", // 6
          `primal_beast_trample`, // 7
          `primal_beast_onslaught`, // 8
          `primal_beast_onslaught`, // 9
          `primal_beast_onslaught`, // 10
          `special_bonus_unique_primal_beast_onslaught_damage`, // 11
          `primal_beast_pulverize`, // 12
          `primal_beast_uproar`, // 13
          `primal_beast_uproar`, // 14
          `special_bonus_unique_primal_beast_roar_dispells`, // 15
          `primal_beast_uproar`, // 16
          "special_bonus_attributes", // 17
          "primal_beast_pulverize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_primal_beast_trample_attack_damage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_primal_beast_pulverize_duration", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `wind_lace`,
            `branches`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `boots`,
            `soul_ring`,
            `bracer`,
            `magic_wand`,
          ],
          mid_game: [
            `phase_boots`,
            `ancient_janggo`,
            `black_king_bar`,
            `crimson_guard`,
          ],

          late_game: [
            `kaya_and_sange`,
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          situational: [
            `guardian_greaves`,
            `boots_of_bearing`,
            "lotus_orb",
            `ethereal_blade`,
            "blade_mail",
            `octarine_core`,
            `shivas_guard`,
            "pipe",
            "heavens_halberd",
            `radiance`,
            `wind_waker`,
            `heart`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `soul_ring`,
            "phase_boots",
            `ancient_janggo`,
            `black_king_bar`,
            `kaya_and_sange`,
            `blink`,
          ],
          neutral: [
            `faded_broach`,
            "arcane_ring",
            `bullwhip`,
            "vambrace",
            `cloak_of_flames`,
            `quickening_charm`,
            `havoc_hammer`,
            `timeless_relic`,
            "giants_ring",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          /* helm_of_iron_will:
            "Good laning sustain item that can go into Armlet down the road.", */
          /* armlet: "A good early game item that increases your damage output.", */
          phase_boots: "A core boots upgrade for gap-closing.",
          crimson_guard:
            "Very strong against summon and illusion-based lineups and fast attacking heroes.",
          pipe: "Against heavy-magical damage lineups.",
          radiance:
            "Potentially a good buy against illusions and summons after you`ve tanked up a bit and you have a good start.",
          kaya_and_sange:
            "Gives you status resistance and amplifies your spells.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT], // Update steam_guide_id and steam_guide_link for support guide

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2765463290",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `primal_beast_trample`, // 1
          `primal_beast_onslaught`, // 2
          "primal_beast_trample", // 3
          "primal_beast_onslaught", // 4
          "primal_beast_trample", // 5
          "primal_beast_pulverize", // 6
          "primal_beast_trample", // 7
          "primal_beast_onslaught", // 8
          "primal_beast_onslaught", // 9
          `special_bonus_unique_primal_beast_onslaught_damage`, // 10
          `primal_beast_uproar`, // 11
          "primal_beast_pulverize", // 12
          "primal_beast_uproar", // 13
          "primal_beast_uproar", // 14
          `special_bonus_unique_primal_beast_roar_dispells`, // 15
          "primal_beast_uproar", // 16
          "special_bonus_attributes", // 17
          "primal_beast_pulverize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_primal_beast_trample_attack_damage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_primal_beast_pulverize_duration", // 25
        ],
        items: {
          starting: ["tango", "boots", "ward_observer"],
          early_game: [
            "tranquil_boots",
            "soul_ring",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `boots_of_bearing`,
            "black_king_bar",
            `blink`,
            "aghanims_shard",
          ],
          late_game: [
            `ethereal_blade`,
            `ultimate_scepter`,
            `heavens_halberd`,
            `shivas_guard`,
          ],
          situational: [
            "veil_of_discord",
            `phase_boots`,
            `spirit_vessel`,
            `guardian_greaves`,
            `pipe`,
            `kaya_and_sange`,
            `octarine_core`,
            `lotus_orb`,
            `heart`,
            `aeon_disk`,
            `wind_waker`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `soul_ring`,
            `boots_of_bearing`,
            "black_king_bar",
            "blink",
            `aghanims_shard`,
            `ethereal_blade`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            `bullwhip`,
            `vambrace`,
            `cloak_of_flames`,
            `quickening_charm`,
            `havoc_hammer`,
            `timeless_relic`,
            `giants_ring`,
            `fallen_sky`,
          ],
        },
        item_tooltips: {
          tranquil_boots:
            "A core boots upgrade for health sustain. It should be upgraded to Boots of Bearing.",
          spirit_vessel: "Against heavy-healing heroes or lineups.",
        },
      },
    ],
    ability_tooltips: {
      primal_beast_uproar: `Consider putting a point in this spell early when you are getting harassed. It can increase your damage immensely.`,
      /* special_bonus_unique_primal_beast_roar_dispells:
        "You can take this talent over the suggested one if the dispel has great value in the game.", */
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      soul_ring:
        "A core item that helps with mana sustain and provides useful stats.",
      phase_boots: "A core boots upgrade for gap-closing.",
      infused_raindrop: "Against magical burst.",
      blink:
        "A core item that allows to instantly Pulverize an opponent among other benefits.",
      veil_of_discord:
        "Increases yours and your teammates spell damage output. Consider buying this with allied heroes like Zeus or Leshrac.",
      black_king_bar:
        "A core item that deals with most spells while Uproar deals with physical damage. Allows you to cast Pulverize in the middle of the fight.",
      aghanims_shard:
        "A core upgrade that adds another disable to Primal Beast`s arsenal.",
      heavens_halberd: "Particularly good against ranged right-clickers.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `black_king_bar`,
      `blink`,
      `primal_beast_pulverize`,
      `primal_beast_onslaught`,
      `primal_beast_trample`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Primal Beast tends to use a lot of spells early on to contest the lane.",
          },
          {
            item: "boots",
            info: "To outrun the Primal Beast while he is using Trample.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "blade_mail" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "hurricane_pike" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          {
            item: "bloodthorn",
            info: "To burst this tanky hero and reduce his spell damage output.",
          },
          { item: "sheepstick" },
          {
            item: "shivas_guard",
            info: "To reduce his regen and slows his movement speed as a main source of dealing damage.",
          },
        ],
      },
    },
  },

  Puck: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961683",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "puck_illusory_orb", // 1
          "puck_phase_shift", // 2
          "puck_illusory_orb", // 3
          "puck_waning_rift", // 4
          "puck_illusory_orb", // 5
          "puck_dream_coil", // 6
          "puck_illusory_orb", // 7
          "puck_waning_rift", // 8
          "puck_waning_rift", // 9
          "puck_waning_rift", // 10
          `special_bonus_unique_puck_orb_damage`, // 11
          `puck_dream_coil`, // 12
          "puck_phase_shift", // 13
          `puck_phase_shift`, // 14
          `puck_phase_shift`, // 15
          `special_bonus_unique_puck_6`, // 16
          "special_bonus_attributes", // 17
          "puck_dream_coil", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_puck_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_puck_5", // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `branches`,
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "null_talisman",
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],

          mid_game: [`witch_blade`, `blink`, `kaya_and_sange`, `octarine_core`],

          late_game: [
            `dagon_5`,
            `overwhelming_blink`,
            `ethereal_blade`,
            `revenants_brooch`,
          ],
          situational: [
            "cyclone",
            "sphere",
            "revenants_brooch",
            "black_king_bar",
            `ultimate_scepter`,
            "aeon_disk",
            "ethereal_blade",
            "refresher",
            "aghanims_shard",
            `gungir`,
            `mjollnir`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            `power_treads`,
            `witch_blade`,
            "blink",
            "kaya_and_sange",
            `octarine_core`,
            `overwhelming_blink`,
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            `vambrace`,
            "grove_bow",
            `quickening_charm`,
            `ceremonial_robe`,
            `spell_prism`,
            "timeless_relic",
            `mirror_shield`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      puck_phase_shift:
        "You don`t have to skill this spell on level 2 if you are not being right-clicked often or you don`t need to dodge a spell.",
      puck_waning_rift:
        "You can max this spell out before Illusiory Orb against elusive heroes like e.g Storm Spirit, Ember Spirit, Void Spirit.",
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      bottle:
        "A core item that provides you with sustain and allows you to gank with stored rune.",
      infused_raindrop: "Against magical burst.",
      witch_blade:
        "A core item that significantly increases the damage coming from your right-clicks.",
      travel_boots: `A core item that allows you to cover the map better. Especially useful to play aggressively in lanes when the enemy team has limited catch and stuns.`,
      blink:
        "A core item that allows you to seize an opportunity and land a multi-hero Mystic Coil. Works well with Phase Shift when it comes to escaping.",
      ethereal_blade:
        "A core item that increases your damage output or alternatively used to save you from physical damage.",
      kaya_and_sange:
        "A core item that provides you with a mix of defensive and offensive stats.",
      aghanims_shard: "A situational item if you go for a right click build.",
      ultimate_scepter: `A late game luxury item to add some more damage through Dream Coil.`,
      sphere: "Aghainst powerful single-target disables or debuffs.",
      aeon_disk: "Against lineups with a lot of catch, disables and burst.",
    },
    combo: [
      `blink`,
      `puck_dream_coil`,
      `puck_waning_rift`,
      `puck_illusory_orb`,
      `puck_phase_shift`,
      `puck_ethereal_jaunt`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Puck tends to use Illusory Orb and Waning Rift frequently to kill creeps or harass you",
          },

          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Puck is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "cloak",
            info: "Puck is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "manta", info: "To dispel Wanning Rift" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          {
            item: "satanic",
            info: "To be able stand your ground while coiled and dispel Waning Rift silence",
          },
          { item: "assault", info: "Against a right-click Puck" },
          { item: "butterfly", info: "Against a right-click Puck" },
        ],
      },
    },
  },

  // eidendota plays hero
  Pudge: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961775",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "pudge_meat_hook", // 1
          "pudge_rot", // 2
          "pudge_rot", // 3
          "pudge_flesh_heap", // 4
          "pudge_rot", // 5
          "pudge_dismember", // 6
          "pudge_rot", // 7
          "pudge_flesh_heap", // 8
          "pudge_flesh_heap", // 9
          "pudge_flesh_heap", // 10
          "special_bonus_armor_4", // 11
          "pudge_dismember", // 12
          "pudge_meat_hook", // 13
          "pudge_meat_hook", // 14
          "special_bonus_unique_pudge_7", // 15
          "pudge_meat_hook", // 16
          "special_bonus_attributes", // 17
          "pudge_dismember", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pudge_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pudge_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "blood_grenade",
            "wind_lace",
            "enchanted_mango",
            "branches",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            "urn_of_shadows",
            "smoke_of_deceit",
          ],
          mid_game: [
            "blink",
            "aether_lens",
            "glimmer_cape",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "octarine_core",
            "ethereal_blade",
            "ultimate_scepter",
            "overwhelming_blink",
          ],
          situational: [
            "hood_of_defiance",
            "spirit_vessel",
            "force_staff",
            "rod_of_atos",
            "ghost",
            "pipe",
            "cyclone",
            "lotus_orb",
            "pavise",
          ],
          core: [
            "tranquil_boots",
            "magic_wand",
            "blink",
            "aether_lens",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "seeds_of_serenity",
            "pogo_stick",
            "philosophers_stone",
            "eye_of_the_vizier",
            "bullwhip",
            "psychic_headband",
            "ogre_seal_totem",
            "spy_gadget",
            "trickster_cloak",
            "giants_ring",
            "force_field",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock the pull camp.",
          tranquil_boots:
            "A core boots upgrade that provides you with hp sustain and great movement speed.",
          spirit_vessel: "Against heavy healing lineup.",
          black_king_bar: "To channel Dismember without interruption.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2713377028",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "pudge_meat_hook", // 1
          "pudge_rot", // 2
          "pudge_rot", // 3
          "pudge_flesh_heap", // 4
          "pudge_rot", // 5
          "pudge_dismember", // 6
          "pudge_rot", // 7
          "pudge_flesh_heap", // 8
          "pudge_flesh_heap", // 9
          "pudge_flesh_heap", // 10
          "special_bonus_armor_4", // 11
          "pudge_dismember", // 12
          "pudge_meat_hook", // 13
          "pudge_meat_hook", // 14
          "special_bonus_spell_lifesteal_8", // 15
          "pudge_meat_hook", // 16
          "special_bonus_attributes", // 17
          "pudge_dismember", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pudge_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pudge_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "gauntlets",
            "ring_of_protection",
            "blood_grenade",
            "branches",
            "branches",
          ],
          early_game: ["vanguard", "phase_boots", "magic_wand", "soul_ring"],
          mid_game: [
            "blink",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          late_game: [
            "shivas_guard",
            "overwhelming_blink",
            "heart",
            "octarine_core",
          ],
          situational: [
            "pipe",
            "lotus_orb",
            "crimson_guard",
            "aghanims_shard",
            "cyclone",
            "force_staff",
            "blade_mail",
            "assault",
            "sheepstick",
            "aether_lens",
            "spirit_vessel",
          ],
          core: [
            "phase_boots",
            "vanguard",
            "ultimate_scepter",
            "black_king_bar",
            "blink",
            "aghanims_shard",
          ],
          neutral: [
            "arcane_ring",
            "seeds_of_serenity",
            "occult_bracelet",
            "dragon_scale",
            "eye_of_the_vizier",
            "cloak_of_flames",
            //"black_powder_bag",
            "trickster_cloak",
            "havoc_hammer",
            "ascetic_cap",
            "giants_ring",
            "force_field",
          ],
        },
        item_tooltips: {
          phase_boots:
            "A core boots upgrade that provides you with much needed armor and movement speed boost.",
          vanguard:
            "A core item that tanks you up and allows you to cut-waves, clear stacks and dive towers. You can also disassemble it.",
          hood_of_defiance:
            "A core item that tanks you up by reducing damage you take from magical sources including Rot.",
          eternal_shroud:
            "An upgrade to Hood of Defiance. Provides you with spell lifesteal that goes well with your skill set.",
          aether_lens:
            "Increases the range of your Hook and Dismember while providing you good stats. Goes into Octarine Core down the road.",
          aghanims_shard:
            "Allows you to use Dismember on an allied hero, potentially saving them from death and healing them in the process.",
          crimson_guard:
            "Against fast attacking right-clickers, illusions and summons.",
          black_king_bar:
            "A core item that allows you to channel Dismember fully.",
          ultimate_scepter:
            "A core item that improves Rot`s AoE and damage significantly. Reduces some healing on affected heroes too.",
        },
      },
    ],
    ability_tooltips: {
      pudge_meat_hook:
        "You can use this to secure range creeps, catapults and even big neutral creeps as it instantly kills them.",
      special_bonus_spell_lifesteal_8:
        " Consider taking this talent if you are close or already have Aghanims Scepter.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      blink:
        "A core item that allows you to land Hook easier or to save an ally. Goes well with Aghanim`s Shard.",
      aghanims_shard:
        "A core item that allows you to save an ally in trouble. Goes well with Blink and Aether Lens.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To avoid Meat hooks and being able to offset the Rot slow",
          },
          {
            item: "boots",
            info: "To avoid Meat hooks and being able to offset the Rot slow",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel as Pudge has high HP and Vessel removes percentage of it and offsets some of the healing from Dismember",
          },
        ],
        support: [
          {
            item: "ward_observer",
            info: "Place wards to see Pudge and avoid being hooked",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }, { item: "lotus_orb" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          { item: "desolator" },
          { item: "mage_slayer" },
          { item: "hurricane_pike" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "wind_waker", info: "To save an ally being Dismembered" },
        ],
        support: [],
        core: [{ item: "bloodthorn" }],
      },
    },
  },

  Pugna: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961859",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "pugna_nether_blast", // 1
          "pugna_decrepify", // 2
          "pugna_nether_blast", // 3
          "pugna_decrepify", // 4
          "pugna_nether_blast", // 5
          "pugna_life_drain", // 6
          "pugna_nether_blast", // 7
          "pugna_decrepify", // 8
          "pugna_decrepify", // 9
          "special_bonus_hp_200", // 10
          "pugna_nether_ward", // 11
          "pugna_life_drain", // 12
          "pugna_nether_ward", // 13
          "pugna_nether_ward", // 14
          `special_bonus_unique_pugna_4`, // 15
          `pugna_nether_ward`, // 16
          "special_bonus_attributes", // 17
          "pugna_life_drain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pugna_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pugna_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            "branches",
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `boots`,
            `null_talisman`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `travel_boots`,
            `kaya_and_sange`,
            `aether_lens`,
            `dagon_5`,
          ],
          late_game: [
            `blink`,
            `ultimate_scepter`,
            `octarine_core`,
            `sheepstick`,
          ],
          situational: [
            `ward_sentry`,
            `glimmer_cape`,
            `cyclone`,
            `force_staff`,
            `ethereal_blade`,
            `lotus_orb`,
            "black_king_bar",
            "sphere",
            `shivas_guard`,
            `overwhelming_blink`,
            `aghanims_shard`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            "travel_boots",
            `kaya_and_sange`,
            `dagon_5`,
            "blink",
            `ultimate_scepter`,
          ],
          neutral: [
            "mysterious_hat",
            `faded_broach`,
            `eye_of_the_vizier`,
            `vambrace`,
            "psychic_headband",
            `ceremonial_robe`,
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
          /* arcane_boots:
            "A core item that helps with mana sustain. It will be disassembled and Energy Booster used for Aether Lens. Boots should be used for Boots of Travel.", */
          travel_boots: "A core item that allows you to cover the map better.",
          black_king_bar:
            "Agaist a lot of disables, silences and magical damage.",
          dagon_5: `A core item that provides you with magical burst. Goes well with Decrepify. You dont have to upgrade it to level 5 right away. It instantly kills basic illusions and creeps.`,
          sphere: "Aghainst powerful single target disables or burst damage.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2721136673",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "pugna_nether_blast", // 1
          "pugna_decrepify", // 2
          "pugna_nether_blast", // 3
          "pugna_decrepify", // 4
          "pugna_nether_blast", // 5
          "pugna_life_drain", // 6
          "pugna_nether_blast", // 7
          `pugna_nether_ward`, // 8
          "pugna_decrepify", // 9
          `special_bonus_movement_speed_20`, // 10
          `pugna_decrepify`, // 11
          "pugna_life_drain", // 12
          "pugna_nether_ward", // 13
          "pugna_nether_ward", // 14
          "pugna_nether_ward", // 15
          "special_bonus_unique_pugna_6", // 16
          "special_bonus_attributes", // 17
          "pugna_life_drain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pugna_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_pugna_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `wind_lace`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `force_staff`,
            `pavise`,
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
          ],
          late_game: [
            `aghanims_shard`,
            `boots_of_bearing`,
            `aeon_disk`,
            `wind_waker`,
          ],
          situational: [
            `ring_of_basilius`,
            `ghost`,
            `lotus_orb`,
            `octarine_core`,
            `sphere`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            `force_staff`,
            `aether_lens`,
            `boots_of_bearing`,
            `glimmer_cape`,
            `aghanims_shard`,
          ],
          neutral: [
            `mysterious_hat`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `spell_prism`,
            "seer_stone",
            `force_field`,
          ],
        },
        item_tooltips: {
          arcane_boots:
            "A core item that helps with mana sustain. It will be disassembled and Energy Booster used for Aether Lens. Boots should be used for Tranquil Boots.",
          tranquil_boots: `A core item for hp sustain while healing an ally with Life Drain. You can combine them with Drums to get Boots of Bearing later in the game.`,
          // wraith_pact: `A core item that makes your team more tanky with the damage reduction.`,
          glimmer_cape: "Can be used while channeling Life Drain.",
          lotus_orb: "For reflect, dispel and armor",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      aether_lens:
        "A core item that allows you to cast spells and items from further away.",
      blink:
        "A core item that allows you to position well. Can be upgraded down the road to Overwhelming Blink.",
      octarine_core:
        "A core item that reduces cooldown of your spells and items.",
      aghanims_shard:
        "Good against illusion based heroes as Life Drain destroys basic illusions instantly.",
    },
    combo: [
      `pugna_nether_ward`,
      `pugna_nether_blast`,
      `pugna_decrepify`,
      `dagon`,
      `pugna_life_drain`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Pugna tends to use Nether Blast and Decrepify frequently to harass or kill the creeps",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "wind_lace",
            info: "To dodge Nether Blasts and run out of the Life Drain range",
          },
          {
            item: "boots",
            info: "To dodge Nether Blasts and run out of the Life Drain range",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Pugna is heavy on magical damage and Cloak will reduce 15% of it",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset healing coming from Life Drain",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Pugna does his spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "manta", info: "To dispel Decrepify and cancel Life Drain" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "nullifier", info: "To dispel Decrepify" },
          { item: "satanic", info: "To dispel Decrepify from yourself" },
        ],
      },
    },
  },

  // eidendota plays hero
  "Queen of Pain": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961952",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "queenofpain_scream_of_pain", // 1
          "queenofpain_shadow_strike", // 2
          "queenofpain_shadow_strike", // 3
          "queenofpain_blink", // 4
          "queenofpain_shadow_strike", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_scream_of_pain", // 9
          "special_bonus_strength_11", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_blink", // 13
          "queenofpain_blink", // 14
          "special_bonus_unique_queen_of_pain_4", // 15
          "queenofpain_shadow_strike", // 16
          "special_bonus_attributes", // 17
          "queenofpain_sonic_wave", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_queen_of_pain_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_queen_of_pain_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "null_talisman",
            "magic_stick",
            "power_treads",
            "kaya",
          ],
          mid_game: [
            "kaya_and_sange",
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "shivas_guard",
            "octarine_core",
            "sheepstick",
            "ethereal_blade",
          ],
          situational: [
            "infused_raindrop",
            "sphere",
            "witch_blade",
            "refresher",
            "bloodthorn",
          ],
          core: [
            "kaya_and_sange",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vampire_fangs",
            "psychic_headband",
            "dandelion_amulet",
            "quickening_charm",
            "spell_prism",
            "timeless_relic",
            "ex_machina",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune. Rush this as your first item.",
          witch_blade:
            "You can rush this item over kaya&sange if you prefer the slow and damage for the game.",
          aghanims_shard:
            "really strong aghanims shard that creates more kill oppurtuniy.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2721136803",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "queenofpain_shadow_strike", // 1
          "queenofpain_blink", // 2
          "queenofpain_shadow_strike", // 3
          "queenofpain_scream_of_pain", // 4
          "queenofpain_shadow_strike", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_scream_of_pain", // 9
          "special_bonus_strength_11", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_blink", // 13
          "queenofpain_blink", // 14
          "special_bonus_unique_queen_of_pain_4", // 15
          "queenofpain_shadow_strike", // 16
          "special_bonus_attributes", // 17
          "queenofpain_sonic_wave", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_queen_of_pain_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_queen_of_pain_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "blood_grenade",
            "branches",
            "faerie_fire",
            "mantle",
          ],
          early_game: ["null_talisman", "power_treads", "magic_wand", "kaya"],
          mid_game: [
            "kaya_and_sange",
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "octarine_core",
            "shivas_guard",
            "sheepstick",
            "ethereal_blade",
          ],
          situational: [
            "bloodthorn",
            "refresher",
            "sphere",
            "infused_raindrop",
            "spirit_vessel",
            "lotus_orb",
            "orchid",
          ],
          core: [
            "kaya_and_sange",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vampire_fangs",
            "quickening_charm",
            "psychic_headband",
            "spell_prism",
            "timeless_relic",
            "ex_machina",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          urn_of_shadows:
            "Can buy if nobody else is going to and you're having a decent early game, If you need spirit vessel in the game then you can also use that as a reason to buy this item.",
          spirit_vessel:
            "Against a heavy-healing lineup. eg.(alchemist, morphling)",
          lotus_orb:
            "For reflect, dispel and some armor, an alternative to Shiva`s Guard.",
        },
      },
    ],
    ability_tooltips: {
      /*special_bonus_spell_block_18:
        "You can take this level 25 talent over the suggested one if you are in need for Linken`s sphere effect.",*/
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Get it vs heroes that have high magical burst.",
      power_treads:
        "A core boots upgrade that adds to your right-click dps and by toggling it you can save some mana.",
      orchid:
        "If you have a great start, you can pick up this item. You can kill most of the heroes by yourself.",
      kaya_and_sange:
        "A core item that provides you with mix of defensive and offensive stats",
      black_king_bar:
        "A core item that allows you to play in the middle of the fight, get spells off and right-click.",
      aghanims_shard:
        "A core upgrade that adds silence to your utility arsenal and some extra damage.",
      sphere: "Aghainst powerful single target disables and debuffs.",
      shivas_guard:
        "A core item that adds armor and more AoE damage. It also reduces healing on opponents.",
      sheepstick:
        "A core item that allows you to instantly disable and burst an opponent.",
      refresher:
        "With an inventory of items that are mostly actives paired with Queen of pain's high damage spell kit refresher orb is really good.",
    },
    combo: [
      "queenofpain_blink",
      "orchid",
      "queenofpain_shadow_strike",
      "queenofpain_scream_of_pain",
      "queenofpain_sonic_wave",
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Queen of Pain will use Shadow Strike and Scream of Pain frequently to harras or kill the creeps",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "cloak",
            info: "Queen of Pain is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Queen does her spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }, { item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "hurricane_pike" },
          { item: "manta", info: "To dispel Orchid and Shadow Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  // eidendota plays hero
  Razor: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962040",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "razor_static_link", // 1
          "razor_plasma_field", // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          `razor_static_link`, // 8
          `razor_unstable_current`, // 9
          `special_bonus_agility_12`, // 10
          `razor_static_link`, // 11
          "razor_eye_of_the_storm", // 12
          "razor_unstable_current", // 13
          "razor_unstable_current", // 14
          `special_bonus_strength_14`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_razor_static_link_aspd`, // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            `branches`,
            `branches`,
            `circlet`,
            "circlet",
          ],
          early_game: [
            `falcon_blade`,
            `power_treads`,
            `magic_wand`,
            "wraith_band",
            `wind_lace`,
          ],
          mid_game: [
            `black_king_bar`,
            `platemail`,
            `refresher`,
            `aghanims_shard`,
          ],
          late_game: [`blink`, `assault`, `ultimate_scepter`, `satanic`],
          situational: [
            `phase_boots`,
            `hurricane_pike`,
            `cyclone`,
            `sange_and_yasha`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `butterfly`,
            `skadi`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `falcon_blade`,
            `power_treads`,
            `black_king_bar`,
            `refresher`,
            `assault`,
            `satanic`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `arcane_ring`,
            `orb_of_destruction`,
            `grove_bow`,
            `paladin_sword`,
            `titan_sliver`,
            `mind_breaker`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
        item_tooltips: {
          falcon_blade: `Rush this before anything else in the lane. It lets you scale in the early game.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2722413092",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `razor_static_link`, // 1
          `razor_plasma_field`, // 2
          `razor_static_link`, // 3
          "razor_plasma_field", // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          "razor_unstable_current", // 8
          `razor_unstable_current`, // 9
          `special_bonus_unique_razor_4`, // 10
          `razor_unstable_current`, // 11
          "razor_eye_of_the_storm", // 12
          "razor_unstable_current", // 13
          `razor_static_link`, // 14
          `special_bonus_strength_14`, // 15
          `razor_static_link`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_razor_plasmafield_second_ring`, // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `boots`,
            `wraith_band`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
            `voodoo_mask`,
          ],
          mid_game: [
            `bloodstone`,
            `aghanims_shard`,
            `eternal_shroud`,
            `kaya_and_sange`,
            `travel_boots`,
          ],
          late_game: [
            `black_king_bar`,
            `blink`,
            `refresher`,
            `ultimate_scepter`,
            `shivas_guard`,
          ],
          situational: [
            `phase_boots`,
            `boots_of_bearing`,
            `cyclone`,
            `lotus_orb`,
            `vanguard`,
            `pipe`,
            `heavens_halberd`,
            `sheepstick`,
            `hurricane_pike`,
            `blade_mail`,
            `sphere`,
            `travel_boots_2`,
          ],
          core: [
            `boots`,
            `bloodstone`,
            `aghanims_shard`,
            `eternal_shroud`,
            `kaya_and_sange`,
            `refresher`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `arcane_ring`,
            `vampire_fangs`,
            `grove_bow`,
            `paladin_sword`,
            `dandelion_amulet`,
            `trickster_cloak`,
            `ascetic_cap`,
            `ex_machina`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          /* falcon_blade: `Rush this before anything else in the lane. It lets you scale in the early game.`, */
          bloodstone: `Try to rush Bloodstone to get it as early as possible before the 15 minute mark. It massively enhances your survivability with its active in the early game.`,
          aghanims_shard: `Improves your damage output in fights and also improves your tankiness in combination with the Bloodstone active.`,
          eternal_shroud: `Makes you extremely tanky in the mid game along with Bloodstone and Aghs shard. Once you have the three items, you can play extremely aggressive in fights.`,
        },
        combo: [
          `razor_eye_of_the_storm`,
          `black_king_bar`,
          `bloodstone`,
          `razor_plasma_field`,
          `razor_static_link`,
        ],
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2722413152",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          `razor_plasma_field`, // 1
          `razor_static_link`, // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          `razor_static_link`, // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          `razor_plasma_field`, // 8
          `razor_unstable_current`, // 9
          `special_bonus_agility_12`, // 10
          "razor_static_link", // 11
          "razor_eye_of_the_storm", // 12
          "razor_unstable_current", // 13
          "razor_unstable_current", // 14
          `special_bonus_strength_14`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_razor_static_link_aspd`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            `branches`,
            `branches`,
            "circlet",
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `boots`,
            `magic_wand`,
            `wraith_band`,
            `wind_lace`,
          ],
          mid_game: [
            `black_king_bar`,
            `travel_boots`,
            `platemail`,
            `refresher`,
          ],
          late_game: [
            `blink`,
            `assault`,
            `ultimate_scepter`,
            `satanic`,
            `aghanims_shard`,
          ],
          situational: [
            `phase_boots`,
            `ring_of_basilius`,
            `hurricane_pike`,
            `cyclone`,
            `sange_and_yasha`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `butterfly`,
            `skadi`,
            `swift_blink`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `boots`,
            `black_king_bar`,
            `travel_boots`,
            `refresher`,
            `assault`,
            `satanic`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `faded_broach`,
            `orb_of_destruction`,
            `grove_bow`,
            `paladin_sword`,
            `titan_sliver`,
            `mind_breaker`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
        },
      },
    ],
    ability_tooltips: {
      razor_plasma_field: `Plasma Field does more damage as it spreads out. Try to use it in a way that you hit units at the furthest edge of the ring.`,
      razor_static_link: `Static Link is most potent when you can stay on top of your target. Use it in combo with your Plasma Field to slow enemy heroes.`,
      razor_eye_of_the_storm: `Eye of the Storm always targets the unit leashed with your Static Link, as long as you can stay in range. It massively improves your damage output with the armor reduction.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides you with attack speed increase that allows you to hit more often while having extra damage from Static Link. Toggling the item will save you mana as well.",
      phase_boots: `You can get Phase Boots instead of Power Treads if there are enemy heroes who reduce your armor like Weaver or Phantom Assassin.`,
      black_king_bar:
        "A core item that allows you to play in the middle of the fight and get a full static link off.",
      refresher:
        "A core item that allows you to have 2 Eye of the Storm, Static Link and Black King Bar in the fight among the other things it refreshes.",
      blink: `Allows you to gap-close and get Static Link off on desired hero. You can get it even before Black King Bar against ranged cores like Sniper.`,
      sphere: "Against powerful single-target disables and debuffs.",
      assault:
        "A core item that amplifies physical damage output of your hero while also granting you armor.",
      shivas_guard:
        "An alternative to Assault that is good against illusion-based heros and a lot of healing. Adds to your AoE damage output and slow.",
      satanic:
        "A core item that tanks you up and provides you with sustain through its active. The active applies basic dispel on cast. You will have two usages with Refresher.",
      monkey_king_bar: "Against evasion and miss chance.",
    },
    combo: [
      `razor_eye_of_the_storm`,
      `razor_plasma_field`,
      `blink`,
      `black_king_bar`,
      `razor_static_link`,
      `refresher`,
      `razor_eye_of_the_storm`,
      `black_king_bar`,
      `razor_static_link`,
      `razor_plasma_field`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "Razor is looking to close the gap and stick a Static Link onto a target and wind_lace will help you keep the distance or run away",
          },
          {
            item: "boots",
            info: "Razor is looking to close the gap and stick a Static Link onto a target and wind_lace will help you keep the distance or run away",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [{ item: "hurricane_pike" }],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "sheepstick" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Riki: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962133",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "riki_blink_strike", // 1
          "riki_tricks_of_the_trade", // 2
          "riki_blink_strike", // 3
          "riki_tricks_of_the_trade", // 4
          "riki_blink_strike", // 5
          "riki_backstab", // 6
          "riki_blink_strike", // 7
          "riki_smoke_screen", // 8
          "riki_tricks_of_the_trade", // 9
          `riki_tricks_of_the_trade`, // 10
          `riki_smoke_screen`, // 11
          "riki_backstab", // 12
          "riki_smoke_screen", // 13
          "riki_smoke_screen", // 14
          `special_bonus_unique_riki_7`, // 15
          `special_bonus_unique_riki_2`, // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_riki_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_riki_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            "wraith_band",
            `power_treads`,
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [
            `diffusal_blade`,
            `manta`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          late_game: [`basher`, `greater_crit`, `abyssal_blade`, `disperser`],
          situational: [
            `orb_of_corrosion`,
            `bfury`,
            "black_king_bar",
            `swift_blink`,
            `meteor_hammer`,
            `butterfly`,
            `nullifier`,
            `monkey_king_bar`,
            `solar_crest`,
            `skadi`,
            `desolator`,
            `sphere`,
            `travel_boots`,
          ],
          core: [
            "power_treads",
            "diffusal_blade",
            "manta",
            "aghanims_shard",
            `ultimate_scepter`,
            `greater_crit`,
            `abyssal_blade`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `orb_of_destruction`,
            "vambrace",
            `elven_tunic`,
            "titan_sliver",
            "mind_breaker",
            `penta_edged_sword`,
            "apex",
            "desolator_2",
          ],
        },
        item_tooltips: {
          orb_of_corrosion: `A situational item that allows you to stay on top of opponent and amplifies physical damage output through armor reduction.`,
          power_treads:
            "A core item that provides you with attack speed and agility. The more agility, the more damage you will do with backstabs.",
          diffusal_blade: `A core item that provides you with tons of agility and ability to keep opponents under Smoke Screen longer. Builds into Disperser later in the game.`,
          manta:
            "A core item that dispels Dust of Appearance from you. Manta illusions can also backstab.",
          basher:
            "A core item that allows you to lock the target you are focusing.",
          black_king_bar:
            "Against a lot of disables, magical damage and as a dispel.",
          swift_blink: `A late game pick up in place of boots to maintain mobility and add more damage to Tricks of the Trade.`,
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponents.",
          sphere: "Against powerful single-target disables and debuffs.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2722413235",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "riki_blink_strike", // 1
          "riki_tricks_of_the_trade", // 2
          "riki_blink_strike", // 3
          "riki_smoke_screen", // 4
          "riki_blink_strike", // 5
          "riki_backstab", // 6
          "riki_blink_strike", // 7
          "riki_smoke_screen", // 8
          "riki_smoke_screen", // 9
          "riki_smoke_screen", // 10
          "special_bonus_unique_riki_7", // 11
          "riki_backstab", // 12
          "riki_tricks_of_the_trade", // 13
          "riki_tricks_of_the_trade", // 14
          "special_bonus_unique_riki_3", // 15
          "riki_tricks_of_the_trade", // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_riki_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_riki_6`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `orb_of_venom`,
            `enchanted_mango`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [`meteor_hammer`, `boots`, `magic_wand`, `wind_lace`],
          mid_game: [
            `boots_of_bearing`,
            `aghanims_shard`,
            `diffusal_blade`,
            `blink`,
          ],
          late_game: [
            `greater_crit`,
            `ultimate_scepter`,
            `abyssal_blade`,
            `disperser`,
          ],
          situational: [
            `orb_of_corrosion`,
            `power_treads`,
            "lotus_orb",
            `blink`,
            `sheepstick`,
            `octarine_core`,
            `solar_crest`,
            `force_staff`,
            `aeon_disk`,
            `nullifier`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `meteor_hammer`,
            `boots_of_bearing`,
            `aghanims_shard`,
            `diffusal_blade`,
            `abyssal_blade`,
            `disperser`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `vambrace`,
            `orb_of_destruction`,
            `elven_tunic`,
            `quickening_charm`,
            `penta_edged_sword`,
            `mind_breaker`,
            `apex`,
            `desolator_2`,
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          meteor_hammer:
            "A core item that provides you with waveclear and tower damage. Combines well with the Aghanim`s Shard down the road. You can cast it out of invisibility.",
          boots_of_bearing: `A core boots upgrade that provides you with HP sustain as well as the movement speed and attack speed from Drums for your team.`,
          wind_waker: `A situational item that allows you to control opponents and reposition yourself out of dangerous positions when the enemy team uses Dust.`,
          blink:
            "A core item that allows you to gap-close and get close to specific target you want to disables. You can blink out of Tricks of Trade and save yourself.",
          lotus_orb: "For reflect, dispel and some armor.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_riki_3: `On core Riki, on level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      aghanims_shard: `A core item that prevents enemy heroes stuck in Smoke from getting help by their teammates with a Force Staff.`,
    },
    combo: [
      `riki_blink_strike`,
      `riki_smoke_screen`,
      `diffusal_blade`,
      `riki_tricks_of_the_trade`,
      `riki_blink_strike`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Riki and escape the Smoke Screen",
          },
          {
            item: "boots",
            info: "To keep the distance from Riki and escape the Smoke Screen",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [
          { item: "SentryDustGem" },
          { item: "force_staff" },
          { item: "ghost" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "silver_edge" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "SentryDustGem" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "monkey_king_bar" },
          { item: "bloodthorn" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Rubick: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962219",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "rubick_fade_bolt", // 1
          "rubick_telekinesis", // 2
          "rubick_fade_bolt", // 3
          "rubick_arcane_supremacy", // 4
          "rubick_fade_bolt", // 5
          "rubick_spell_steal", // 6
          "rubick_fade_bolt", // 7
          `rubick_arcane_supremacy`, // 8
          `rubick_arcane_supremacy`, // 9
          `rubick_arcane_supremacy`, // 10
          `special_bonus_unique_rubick_8`, // 11
          "rubick_spell_steal", // 12
          `rubick_telekinesis`, // 13
          `rubick_telekinesis`, // 14
          `rubick_telekinesis`, // 15
          `special_bonus_unique_rubick_6`, // 16
          "special_bonus_attributes", // 17
          "rubick_spell_steal", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_rubick`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_rubick_4`, // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: ["aether_lens", `tranquil_boots`, `force_staff`, `blink`],
          late_game: [
            `aghanims_shard`,
            `ultimate_scepter`,
            `sheepstick`,
            `octarine_core`,
          ],
          situational: [
            `spirit_vessel`,
            `veil_of_discord`,
            `phylactery`,
            "lotus_orb",
            `ethereal_blade`,
            `glimmer_cape`,
            `wind_waker`,
            `pavise`,
            `aeon_disk`,
            `boots_of_bearing`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            "aether_lens",
            `tranquil_boots`,
            `force_staff`,
            `blink`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            "pogo_stick",
            `faded_broach`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            `ceremonial_robe`,
            "psychic_headband",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      veil_of_discord: `On position 5, you can rush the Veil after brown boots for massive burst potential with your Fade Bolt and stolen spell. Makes you extremely potent very early.`,
      infused_raindrop: "On hero against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade to Tranquil Boots afterwards.",
      spirit_vessel: "Against heavy-healing lineup",
      aether_lens:
        "A core item that allows you to cast spells and items from further away.",
      blink:
        "A core item that allows you to instantly initiate or save an ally.",
      aghanims_shard: `To reposition yourself or an ally in trouble and to get Aghanims Shard upgrades on stolen spells.`,
      lotus_orb: "To reflect, dispel and armor.",
      force_staff: `An extremely effective repositioning item for rubick. Has a very high cast range due to his passive.`,
      phylactery: `An early game pick up that gives you another instance of damage when you cast Fade Bolt or Telekinesis.`,
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Rubick is going to use Fade Bolt every wave to harass and reduce your damage",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [{ item: "black_king_bar" }],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Sand King": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962310",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "sandking_burrowstrike", // 1
          "sandking_caustic_finale", // 2
          "sandking_sand_storm", // 3
          "sandking_sand_storm", // 4
          "sandking_sand_storm", // 5
          "sandking_epicenter", // 6
          "sandking_sand_storm", // 7
          "sandking_burrowstrike", // 8
          "sandking_burrowstrike", // 9
          "sandking_burrowstrike", // 10
          "special_bonus_unique_sand_king_2", // 11
          "sandking_epicenter", // 12
          "sandking_caustic_finale", // 13
          "sandking_caustic_finale", // 14
          "special_bonus_unique_sand_king_3", // 15
          "sandking_caustic_finale", // 16
          "special_bonus_attributes", // 17
          "sandking_epicenter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sand_king_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sand_king_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `arcane_boots`,
            `bracer`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`blink`, `crimson_guard`, `pipe`, `ultimate_scepter`],
          late_game: [
            `aghanims_shard`,
            `octarine_core`,
            `wind_waker`,
            `shivas_guard`,
          ],
          situational: [
            `soul_ring`,
            `hand_of_midas`,
            `veil_of_discord`,
            `meteor_hammer`,
            `guardian_greaves`,
            "heavens_halberd",
            "pipe",
            "lotus_orb",
            `black_king_bar`,
            `boots_of_bearing`,
            `ethereal_blade`,
            `kaya_and_sange`,
            `sphere`,
            `aeon_disk`,
            `heart`,
            `radiance`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `arcane_boots`,
            "blink",
            `crimson_guard`,
            `pipe`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `octarine_core`,
            `wind_waker`,
          ],
          neutral: [
            `pogo_stick`,
            "arcane_ring",
            `bullwhip`,
            "vambrace",
            `quickening_charm`,
            "ceremonial_robe",
            `spell_prism`,
            `timeless_relic`,
            "giants_ring",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      soul_ring: `A situational item that helps with mana sustain. You should get this when you go for Boots of Travel or Tranquil Boots.`,
      blink: "A core item that allows you to channel Epicenter and jump in.",
      wind_waker: `A core item that gives you very good stats, allows you to setup kills and dispel yourself while moving to a safer spot through invulnerability.`,
      travel_boots:
        "A core item that allows you to cover the map better. Sand King is really good at pushing sidelanes in quickly and without much of a risk.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard: "A core item that adds extra AoE damage and burst.",
      lotus_orb: "For reflecting, dispelling and armor.",
    },
    combo: [
      `sandking_epicenter`,
      `blink`,
      `sandking_burrowstrike`,
      `sandking_sand_storm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "magic_stick" },
          {
            item: "lifesteal",
            info: "For sustaining through Sand Kings damage output on the lane.",
          },
          {
            item: "ring_of_health",
            info: "For sustaining through Sand Kings damage output on the lane.",
          },
          {
            item: "infused_raindrop",
            info: "Nullifies some of the damage that Burrowstrike does.",
          },
          {
            item: "cloak",
            info: "Sand King is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          { item: "SentryDust" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          {
            item: "mage_slayer",
            info: "Provides you magic resistance,and spell damage debuff (-35%).",
          },
          /* {
            item: "hood_of_defiance",
            info: "Since Sandking has a lot of AOE magical damage spells, this item will nullify a lot of the damage output.",
          }, */
          {
            item: "pipe",
            info: "Since Sandking has a lot of AOE magical damage spells, this item will nullify a lot of the damage output.",
          },
          { item: "eternal_shroud" },
          {
            item: "blade_mail",
            info: "When Sandking initiates you can quickly react with Blade Mail and reflect a lot of damage back to him",
          },
          {
            item: "black_king_bar",
            info: "Sand kings damage relies on spells and Black King Bar prevents all of them.",
          },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "sphere",
            info: "Sandking relies on jumping in with Blink Dagger and using Burrowstrike and Linken Sphere prevents that.",
          },
        ],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  "Shadow Demon": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962404",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "shadow_demon_shadow_poison", // 1
          "shadow_demon_disruption", // 2
          "shadow_demon_shadow_poison", // 3
          `shadow_demon_disruption`, // 4
          "shadow_demon_shadow_poison", // 5
          "shadow_demon_demonic_purge", // 6
          "shadow_demon_shadow_poison", // 7
          "shadow_demon_disruption", // 8
          "shadow_demon_disruption", // 9
          `special_bonus_unique_shadow_demon_4`, // 10
          `shadow_demon_disseminate`, // 11
          "shadow_demon_demonic_purge", // 12
          `shadow_demon_disseminate`, // 13
          `shadow_demon_disseminate`, // 14
          `special_bonus_movement_speed_25`, // 15
          `shadow_demon_disseminate`, // 16
          "special_bonus_attributes", // 17
          "shadow_demon_demonic_purge", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_shadow_demon_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_shadow_demon_7`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            "aether_lens",
            `tranquil_boots`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [
            `blink`,
            `ultimate_scepter`,
            `refresher`,
            "octarine_core",
            `aeon_disk`,
          ],
          situational: [
            `ring_of_basilius`,
            `urn_of_shadows`,
            `sheepstick`,
            `glimmer_cape`,
            `boots_of_bearing`,
            `guardian_greaves`,
            "lotus_orb",
            `ghost`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            `tranquil_boots`,
            `force_staff`,
            `aghanims_shard`,
            "ultimate_scepter",
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and sentry for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. Upgrade boots to Tranquil Boots afterwards.",
      aether_lens: "A core item that provides you with extra cast range.",
      blink:
        "A core item that allows you to get Disruption off timely on desired hero.",
      ultimate_scepter: `A core item that grants 2 extra charges of Demonic Purge which also applies break.`,
      lotus_orb: "To reflect, dispel and armor.",
      aghanims_shard: `Provides you another saving ability for your cores. Upgrades to 3 charges with the Aghanims Scepter.`,
    },
    combo: [
      `shadow_demon_demonic_purge`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_disruption`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_disseminate`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison_release`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Shadow Demon`s Shadow Poison is cheap spammable spell that will grant you many stick charges",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "cloak",
            info: "Shadow Demon is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Shadow Demon does his spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          {
            item: "glimmer_cape",
            info: "It is useful against every other spell than Demonic Purge",
          },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  // eidendota plays hero
  "Shadow Fiend": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        // Shadow Fiend magical damage build on midlane.
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "Magical",

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962485",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "nevermore_shadowraze1", // 1
          "nevermore_necromastery", // 2
          "nevermore_shadowraze1", // 3
          "nevermore_necromastery", // 4
          "nevermore_shadowraze1", // 5
          "nevermore_necromastery", // 6
          "nevermore_shadowraze1", // 7
          "nevermore_necromastery", // 8
          "nevermore_requiem", // 9
          "special_bonus_unique_nevermore_7", // 10
          "nevermore_dark_lord", // 11
          "nevermore_requiem", // 12
          "nevermore_dark_lord", // 13
          "nevermore_dark_lord", // 14
          "special_bonus_unique_nevermore_2", // 15
          "nevermore_dark_lord", // 16
          "special_bonus_attributes", // 17
          "nevermore_requiem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_nevermore_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_nevermore_shadowraze_cooldown", // 25
        ],
        items: {
          starting: [
            "enchanted_mango",
            "enchanted_mango",
            "tango",
            "branches",
            "ward_observer",
          ],
          early_game: ["bottle", "boots", "cyclone", "magic_wand"],
          mid_game: ["blink", "travel_boots", "black_king_bar"],
          late_game: [
            "ethereal_blade",
            "sheepstick",
            "refresher",
            "ultimate_scepter",
          ],
          situational: ["sphere", "aeon_disk", "kaya_and_sange"],
          core: [
            "travel_boots",
            "bottle",
            "cyclone",
            "blink",
            "black_king_bar",
            "arcane_blink",
            "sheepstick",
            "refresher",
          ],
          neutral: [
            "pogo_stick",
            "occult_bracelet",
            "mysterious_hat",
            //"nether_shawl",
            "vambrace",
            "psychic_headband",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          magic_stick:
            "Start with it if you expect high frequency of spells being used on the lane.",
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
          infused_raindrop: "Against magical burst.",
          cyclone: "A core item that allows you to setup Requiem of Souls.",
          blink:
            "A core item that allows you to jump an opponent and do Cyclone into Requiem of Souls combo.",
          travel_boots: "A core item that allows you to cover the map better.",
          black_king_bar:
            "A core item that allows you to channel Requiem of Souls fully and get other spells and items off.",
          sphere: "Against powerful single target disables and debuffs.",
          arcane_blink:
            "A core item that, when used, reduces the cast point of Requiem of Souls thus you don`t need to use Eul`s to setup kills. It also allows you to use spells and items more often.",
          sheepstick:
            "A core item that allows you to instantly disable an opponent.",
          refresher:
            "A core item that allows you to do twice as much damage and control in the figts.",
        },
      },
      {
        // Shadow Fiend physical damage build on midlane.
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "Physical",

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2724416695",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "nevermore_shadowraze1", // 1
          "nevermore_necromastery", // 2
          "nevermore_shadowraze1", // 3
          "nevermore_necromastery", // 4
          "nevermore_shadowraze1", // 5
          "nevermore_necromastery", // 6
          "nevermore_shadowraze1", // 7
          "nevermore_necromastery", // 8
          "nevermore_requiem", // 9
          "special_bonus_attack_speed_25", // 10
          "nevermore_dark_lord", // 11
          "nevermore_requiem", // 12
          "nevermore_dark_lord", // 13
          "nevermore_dark_lord", // 14
          "special_bonus_unique_nevermore_3", // 15
          "nevermore_dark_lord", // 16
          "special_bonus_attributes", // 17
          "nevermore_requiem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_nevermore_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_nevermore_raze_procsattacks", // 25
        ],
        items: {
          starting: [
            "enchanted_mango",
            "enchanted_mango",
            "enchanted_mango",
            "tango",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [
            "bottle",
            "boots",
            "power_treads",
            "magic_wand",
            "mask_of_madness",
          ],
          mid_game: [
            "dragon_lance",
            "invis_sword",
            "black_king_bar",
            "silver_edge",
            "aghanims_shard",
          ],
          late_game: ["greater_crit", "satanic", "butterfly"],
          situational: [
            "manta",
            "blink",
            "skadi",
            "hurricane_pike",
            "monkey_king_bar",
            "sphere",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "dragon_lance",
            "black_king_bar",
            "silver_edge",
            "aghanims_shard",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "arcane_ring",
            "lance_of_pursuit",
            "grove_bow",
            "specialists_array",
            //"dagger_of_ristul", Removed in 7.33
            "ring_of_aquila",
            "titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
          ],
        },
        ability_tooltips: {},
        item_tooltips: {
          power_treads:
            "A core boots upgrade that allows you to farm faster due to attack speed increase.",
          dragon_lance:
            "A core item that provides you with useful stats and allows you to right-click from a bigger distance.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click as well as cast your Requiem of Souls without interruption.",
          hurricane_pike:
            "Situational item against heroes like Slark and Troll that you can`t fight back against effectively when they are on top of you under spell-immunity.",
          sphere: "Against powerful single target disables and debuffs.",
          silver_edge:
            "A core item that provides you with burst and ability to reposition. You can even surprise an opponent by channeling Requiem of Souls underneath them.",
          skadi:
            "A good item versus tanky immobile heroes. Especially good against ranged heroes since it slows them by 50%.",
          monkey_king_bar: "Against evasion and miss chance",
          satanic:
            "A core item that tanks you up and allows you to stand your ground and right-click.",
          butterfly:
            "A core item that provides you with mix of offensive and defensive stats.",
          blink: "For gap-close and to position yourself well.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
    },
    combo: [
      `blink`,
      `cyclone`,
      `nevermore_requiem`,
      `nevermore_shadowraze1`,
      `nevermore_shadowraze2`,
      `nevermore_shadowraze3`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Shadow Fiend will use Shadowraze frequently to harass or kill the creeps",
          },
          { item: "wind_lace", info: "To keep the distance from Shadow Fiend" },
          { item: "boots", info: "To keep the distance from Shadow Fiend" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Shadow Fiend is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "ring_of_health" },
          {
            item: "DamageItems",
            info: "To compete with extra damage Shadow Fiend gets from Necromastery",
          },
        ],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks and Presence of the Dark Lord",
          },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "heavens_halberd", info: "Against physical damage build" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Shadow Shaman": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962568",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "shadow_shaman_ether_shock", // 1
          "shadow_shaman_shackles", // 2
          `shadow_shaman_voodoo`, // 3
          `shadow_shaman_shackles`, // 4
          `shadow_shaman_voodoo`, // 5
          "shadow_shaman_mass_serpent_ward", // 6
          `shadow_shaman_voodoo`, // 7
          `shadow_shaman_voodoo`, // 8
          `shadow_shaman_shackles`, // 9
          `special_bonus_unique_shadow_shaman_5`, // 10
          `shadow_shaman_shackles`, // 11
          "shadow_shaman_mass_serpent_ward", // 12
          `shadow_shaman_ether_shock`, // 13
          `shadow_shaman_ether_shock`, // 14
          `special_bonus_unique_shadow_shaman_2`, // 15
          `shadow_shaman_ether_shock`, // 16
          "special_bonus_attributes", // 17
          "shadow_shaman_mass_serpent_ward", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_shadow_shaman_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_shadow_shaman_4`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `clarity`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            `aghanims_shard`,
            `blink`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `aeon_disk`,
            "octarine_core",
          ],
          situational: [
            "black_king_bar",
            `ghost`,
            `glimmer_cape`,
            "lotus_orb",
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            `tranquil_boots`,
            "blink",
            "aghanims_shard",
          ],
          neutral: [
            `faded_broach`,
            "pogo_stick",
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            "seer_stone",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_shadow_shaman_7: `On level 20, you can take this talent over the suggested one if the break effect is useful in the game.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick instead of boots if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens.`,
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Aether Lens.`,
      aether_lens: "A core item that improves cast range.",
      blink: "A core item that allows you to instantly disable desired hero.",
      aghanims_shard:
        "A core upgrade that allows you channel Shackles from further away and spawn 4 snakes to attack the disabled target or push out the wave.",
      black_king_bar: "To channel Shackles fully.",
      lotus_orb: "To reflect, dispel and armor.",
    },
    combo: [
      `shadow_shaman_voodoo`,
      `shadow_shaman_mass_serpent_ward`,
      `attack`,
      `shadow_shaman_shackles`,
      `shadow_shaman_ether_shock`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "infused_raindrop" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "assault",
            info: "Against Mass Serpent Ward to protect heroes and buildings",
          },
        ],
      },
    },
  },

  // YoonA plays hero
  Silencer: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962648",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "silencer_glaives_of_wisdom", // 1
          "silencer_curse_of_the_silent", // 2
          "silencer_curse_of_the_silent", // 3
          "silencer_last_word", // 4
          "silencer_curse_of_the_silent", // 5
          "silencer_global_silence", // 6
          "silencer_curse_of_the_silent", // 7
          "silencer_last_word", // 8
          "silencer_last_word", // 9
          `special_bonus_unique_silencer`, // 10
          `silencer_last_word`, // 11
          "silencer_global_silence", // 12
          "silencer_glaives_of_wisdom", // 13
          "silencer_glaives_of_wisdom", // 14
          `special_bonus_unique_silencer_7`, // 15
          "silencer_glaives_of_wisdom", // 16
          "special_bonus_attributes", // 17
          "silencer_global_silence", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_silencer_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_silencer_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `circlet`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `glimmer_cape`,
            `force_staff`,
            `boots_of_bearing`,
          ],
          late_game: [
            `hurricane_pike`,
            `aghanims_shard`,
            `refresher`,
            `sheepstick`,
            `aeon_disk`,
            `ultimate_scepter`,
          ],
          situational: [
            `ring_of_basilius`,
            `hand_of_midas`,
            `aether_lens`,
            `lotus_orb`,
            `solar_crest`,
            `guardian_greaves`,
            `ethereal_blade`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `pavise`,
            `force_staff`,
            `boots_of_bearing`,
            `refresher`,
            `aeon_disk`,
          ],
          neutral: [
            `faded_broach`,
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "quickening_charm",
            "spell_prism",
            `spy_gadget`,
            `pirate_hat`,
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: `Provides early mana regen and builds into Veil of Discord.`,
      tranquil_boots:
        "A core boots upgrade that helps with hp sustain and fixes hero`s movement speed issues.",
      veil_of_discord: `A situational item that amplifies your teams spell damage output.`,
      lotus_orb: "To reflect, dispel and armor.",
      ultimate_scepter: `A late game pick up that goes well with Last Word level 25 talent.`,
      refresher:
        "A core item that allows you to cast Global Silence and other spells and items twice in the fight.",
    },
    combo: [
      `silencer_last_word`,
      `silencer_curse_of_the_silent`,
      `silencer_global_silence`,
      `silencer_glaives_of_wisdom`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "heavens_halberd", info: "Against a core Silencer" },
          { item: "orchid", info: "Against a core Silencer" },
          {
            item: "manta",
            info: "To dispel Global Silence, Arcane Curse and Last Word",
          },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick", info: "Against a core right-clicker Silencer" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "butterfly", info: "Against a core right-clicker Silencer" },
        ],
      },
    },
  },

  // YoonA plays hero
  "Skywrath Mage": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962794",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "skywrath_mage_concussive_shot", // 1
          "skywrath_mage_arcane_bolt", // 2
          `skywrath_mage_concussive_shot`, // 3
          "skywrath_mage_ancient_seal", // 4
          `skywrath_mage_concussive_shot`, // 5
          "skywrath_mage_mystic_flare", // 6
          `skywrath_mage_concussive_shot`, // 7
          "skywrath_mage_ancient_seal", // 8
          "skywrath_mage_ancient_seal", // 9
          `skywrath_mage_ancient_seal`, // 10
          `skywrath_mage_arcane_bolt`, // 11
          `skywrath_mage_mystic_flare`, // 12
          `skywrath_mage_arcane_bolt`, // 13
          `skywrath_mage_arcane_bolt`, // 14
          `special_bonus_hp_200`, // 15
          `special_bonus_unique_skywrath`, // 16
          "special_bonus_attributes", // 17
          "skywrath_mage_mystic_flare", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_skywrath_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_skywrath_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `circlet`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            `null_talisman`,
            `arcane_boots`,
            `magic_wand`,
          ],
          mid_game: [
            `rod_of_atos`,
            `phylactery`,
            `force_staff`,
            `aether_lens`,
            `aghanims_shard`,
          ],
          late_game: [
            "ultimate_scepter",
            `ethereal_blade`,
            `wind_waker`,
            "sheepstick",
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `pavise`,
            `blink`,
            `cyclone`,
            `ghost`,
            `glimmer_cape`,
            `kaya_and_sange`,
            `travel_boots`,
          ],
          core: [
            `rod_of_atos`,
            `force_staff`,
            `aether_lens`,
            `aghanims_shard`,
            "ultimate_scepter",
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            `philosophers_stone`,
            `bullwhip`,
            `psychic_headband`,
            `ceremonial_robe`,
            `timeless_relic`,
            `spy_gadget`,
            `seer_stone`,
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      // special_bonus_unique_skywrath_6: `You can skill the other talent if there are no Black King Bar carriers on the enemy team.`,
      special_bonus_hp_200: `On level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
    },
    item_tooltips: {
      ring_of_basilius: "If your laning partner uses a lot of mana early.",
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      rod_of_atos: `Rush this item even before getting boots. With it, you can setup Mystic Flare and solo kill most of the heroes.`,
      arcane_boots: `A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens.`,
      aether_lens: "A core item that improves cast range.",
      blink: `A situational item that allows you to follow up quickly with your spells on any stun from allies.`,
      ultimate_scepter:
        "A core item that doubles the amount of spells you cast.",
      aghanims_shard: `A core item that helps scale your Arcane Bolt. Also makes you tanky against physical damage.`,
    },
    combo: [
      `rod_of_atos`,
      `skywrath_mage_ancient_seal`,
      `skywrath_mage_mystic_flare`,
      `skywrath_mage_arcane_bolt`,
      `skywrath_mage_concussive_shot`,
      `skywrath_mage_arcane_bolt`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Skywrath Mage is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Ancient Seal" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "sheepstick", info: "Against a core Skywrath Mage" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Slardar: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962869",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "slardar_slithereen_crush", // 1
          "slardar_bash", // 2
          `slardar_bash`, // 3
          `slardar_sprint`, // 4
          "slardar_bash", // 5
          "slardar_amplify_damage", // 6
          "slardar_bash", // 7
          "slardar_sprint", // 8
          "slardar_sprint", // 9
          "slardar_sprint", // 10
          "special_bonus_unique_slardar_7", // 11
          "slardar_amplify_damage", // 12
          "slardar_slithereen_crush", // 13
          "slardar_slithereen_crush", // 14
          "special_bonus_unique_slardar_2", // 15
          "slardar_slithereen_crush", // 16
          "special_bonus_attributes", // 17
          "slardar_amplify_damage", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_slardar_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_slardar_3", // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `slippers`,
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: ["blink", `echo_sabre`, `black_king_bar`, `aghanims_shard`],
          late_game: [`harpoon`, `ultimate_scepter`, `assault`, `moon_shard`],
          situational: [
            "mask_of_madness",
            `orb_of_corrosion`,
            `hand_of_midas`,
            "heavens_halberd",
            `crimson_guard`,
            `pipe`,
            `lotus_orb`,
            `octarine_core`,
            `monkey_king_bar`,
            `desolator`,
            `nullifier`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `power_treads`,
            `blink`,
            `echo_sabre`,
            `black_king_bar`,
            `aghanims_shard`,
            `harpoon`,
            `ultimate_scepter`,
          ],
          neutral: [
            "broom_handle",
            `duelist_gloves`,
            `orb_of_destruction`,
            `vambrace`,
            `cloak_of_flames`,
            `elven_tunic`,
            `mind_breaker`,
            `penta_edged_sword`,
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      slardar_bash: `On level 1, you can skill this spell over the suggested one but achieving range creep last hit or deny is more likely with Slithereen Crush.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides you with significant increase in attack speed and some mana savings through toggling.",
      hand_of_midas:
        "If you can get it early as replacement to Mask of Madness.",
      mask_of_madness: `A situational item that provides you with a burst of attack speed which increases the frequency of Bash of the Deep.`,
      blink: "A core item that allows you to initiate on desired target.",
      black_king_bar:
        "A core item that allows you to continuously right-click in the middle of the fight.",
      aghanims_shard:
        "A core upgrade which saves you time of applying Corrosive Haze on a target you jumped. Improves your waveclear speed as armor reduction is applied before Slithereen Crush physical damage.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      assault:
        "A core item that provides you with even more attack speed and armor reduction.",
    },
    combo: [
      `blink`,
      `slardar_slithereen_crush`,
      `slardar_amplify_damage`,
      `attack`,
      `slardar_bash`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from Slardar" },
          { item: "boots", info: "To keep the distance from Slardar" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "force_staff" }, { item: "ghost" }],
        core: [
          { item: "manta" },
          { item: "hurricane_pike" },
          { item: "manta", info: "To dispel Corrosive Haze" },
        ],
      },
      late_game: {
        all: [{ item: "ethereal_blade" }],
        support: [],
        core: [{ item: "assault" }, { item: "butterfly" }],
      },
    },
  },

  // eidendota plays hero
  Slark: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962959",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "slark_essence_shift", // 1
          "slark_pounce", // 2
          "slark_dark_pact", // 3
          "slark_dark_pact", // 4
          "slark_dark_pact", // 5
          "slark_shadow_dance", // 6
          "slark_dark_pact", // 7
          "slark_pounce", // 8
          "slark_pounce", // 9
          "slark_pounce", // 10
          "special_bonus_unique_slark_6", // 11
          "slark_shadow_dance", // 12
          "slark_essence_shift", // 13
          "slark_essence_shift", // 14
          "special_bonus_unique_slark_2", // 15
          "slark_essence_shift", // 16
          "special_bonus_attributes", // 17
          "slark_shadow_dance", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_slark_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_slark_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "magic_stick",
            "circlet",
          ],
          early_game: ["power_treads", "magic_wand", "echo_sabre"],
          mid_game: [
            "diffusal_blade",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            "silver_edge",
            "skadi",
            "abyssal_blade",
            "satanic",
            "harpoon",
            "butterfly",
          ],
          situational: [
            "orb_of_corrosion",
            "hand_of_midas",
            "sange_and_yasha",
            "sphere",
            "blink",
            "monkey_king_bar",
            "nullifier",
            "manta",
          ],
          core: [
            "power_treads",
            "echo_sabre",
            "diffusal_blade",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "lance_of_pursuit",
            "occult_bracelet",
            //"possessed_mask", Removed in 7.33
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            "ring_of_aquila",
            "orb_of_destruction",
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
            "penta_edged_sword",
            "pirate_hat",
            "apex",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      slark_dark_pact:
        "You can skill this spell on level 1 if you are being harassed by a dispellable spell(Poison Touch, Thunder Strike).",
      slark_essence_shift:
        "You can put 2 points in this spell during laning stage if you are laning against double melee.",
    },
    item_tooltips: {
      orb_of_venom: "If you can pressure on the lane",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "If you can pressure on the lane, usually against double melee.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides significant attack speed increase and some mana savings through toggling.",
      hand_of_midas:
        "If you can get it early as replacement to Echo Sabre. You need to get mana regen item if you don`t have it already.",
      echo_sabre:
        "A core item that helps with mana sustain and allows you to generate Essence Shift stacks faster. Can be disassembled.",
      diffusal_blade:
        "Can be a good item against heroes like Medusa and Wraith King but also generally heroes with small mana pool.",
      silver_edge:
        "A core item that provides you with burst, pick-off potential and break effect.",
      black_king_bar:
        "A core item that allows you to right-click in the middle of the fight. Try not to overlap it with Shadow Dance or Depth Shroud.",
      sphere: "Against powerful single-target disables and debuffs.",
      aghanims_shard:
        "A core upgrade that adds to yours and your teams survivability.",
      basher:
        "A core item that allows you to lock the target your are focusing.",
      skadi: "A core item that tanks you up and makes you less kitable.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Slark and to dodge the Pounce",
          },
          {
            item: "boots",
            info: "To keep the distance from Slark and to dodge the Pounce",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          {
            item: "ward_sentry",
            info: "Slark commonly buys Shadow Blade or SilverEdge",
          },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "heavens_halberd" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [
          {
            item: "SentryGem",
            info: "Slark commonly buys ShadowBlade or SilverEdge",
          },
        ],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly" },
          {
            item: "bloodthorn",
            info: "To burst him before he pops Shadow Dance",
          },
        ],
      },
    },
  },

  Snapfire: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963037",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "snapfire_scatterblast", // 1
          "snapfire_firesnap_cookie", // 2
          "snapfire_scatterblast", // 3
          "snapfire_firesnap_cookie", // 4
          "snapfire_scatterblast", // 5
          "snapfire_mortimer_kisses", // 6
          "snapfire_scatterblast", // 7
          "snapfire_firesnap_cookie", // 8
          "snapfire_firesnap_cookie", // 9
          `special_bonus_unique_snapfire_7`, // 10
          `snapfire_lil_shredder`, // 11
          "snapfire_mortimer_kisses", // 12
          "snapfire_lil_shredder", // 13
          "snapfire_lil_shredder", // 14
          `special_bonus_unique_snapfire_3`, // 15
          "snapfire_lil_shredder", // 16
          "special_bonus_attributes", // 17
          "snapfire_mortimer_kisses", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_snapfire_mortimer_kisses_impact_damage`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_snapfire_1", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `guardian_greaves`,
            `aghanims_shard`,
            `force_staff`,
            `pavise`,
          ],
          late_game: [
            "ultimate_scepter",
            `blink`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `ring_of_basilius`,
            `glimmer_cape`,
            `solar_crest`,
            `ethereal_blade`,
            `boots_of_bearing`,
            "lotus_orb",
            `heavens_halberd`,
            `pipe`,
            `wind_waker`,
            `gungir`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `guardian_greaves`,
            `aghanims_shard`,
            `force_staff`,
            "ultimate_scepter",
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            `ceremonial_robe`,
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            `mirror_shield`,
          ],
        },
      },
    ],
    ability_tooltips: {
      snapfire_lil_shredder:
        "You can put a point in this spell earlier at level 3 if you are in need of killing a unit based on hit count(Homing Missile, Tombstone, Supernova).",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade that helps with mana sustain. Can build into Guardian Greaves later in the game.`,
      blink: `A core item that goes well with Aghanims Scepter. Allows you to position yourself nicely.`,
      aghanims_shard: `A core upgrade that adds more burst to your Firesnap Cookie.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
      lotus_orb: "To reflect, dispel and armor.",
      ultimate_scepter:
        "A core item that allows you to save or to toss in an ally. Adds even more disable and damage.",
    },
    combo: [
      `snapfire_firesnap_cookie`,
      `snapfire_scatterblast`,
      `snapfire_mortimer_kisses`,
      `snapfire_lil_shredder`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Snapfire tends to use Scatter Blast and Firesnap Cookie frequently to harass you and your allies",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Snapfire is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Snapfire does her spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          {
            item: "sheepstick",
            info: "Against a core right-clicking Snapfire",
          },
          {
            item: "ethereal_blade",
            info: "Against a core right-clicking Snapfire",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault", info: "Against a core right-clicking Snapfire" },
          { item: "butterfly", info: "Against a core right-clicking Snapfire" },
        ],
      },
    },
  },

  Sniper: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963139",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "sniper_headshot", // 1
          `sniper_take_aim`, // 2
          `sniper_headshot`, // 3
          "sniper_take_aim", // 4
          `sniper_headshot`, // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          `sniper_shrapnel`, // 8
          `sniper_shrapnel`, // 9
          `sniper_shrapnel`, // 10
          `sniper_headshot`, // 11
          "sniper_assassinate", // 12
          `special_bonus_unique_sniper_headshot_damage`, // 13
          `sniper_take_aim`, // 14
          "special_bonus_attack_speed_30", // 15
          `sniper_take_aim`, // 16
          "special_bonus_attributes", // 17
          "sniper_assassinate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sniper_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_range_100", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "wraith_band",
            "wraith_band",
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `mask_of_madness`,
            `dragon_lance`,
            `maelstrom`,
            `hurricane_pike`,
            `black_king_bar`,
          ],
          late_game: [`aghanims_shard`, `greater_crit`, `satanic`, `mjollnir`],
          situational: [
            `hand_of_midas`,
            `desolator`,
            `disperser`,
            `silver_edge`,
            `manta`,
            `skadi`,
            `monkey_king_bar`,
            `moon_shard`,
            `butterfly`,
            `ultimate_scepter`,
            `sphere`,
            `bloodthorn`,
            `nullifier`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `wraith_band`,
            `power_treads`,
            "dragon_lance",
            "maelstrom",
            `hurricane_pike`,
            `black_king_bar`,
            `aghanims_shard`,
            `greater_crit`,
            `mjollnir`,
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            `orb_of_destruction`,
            "grove_bow",
            `enchanted_quiver`,
            "elven_tunic",
            `mind_breaker`,
            `ninja_gear`,
            "pirate_hat",
            `desolator_2`,
          ],
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling.",
          hand_of_midas:
            "If you can get it early as an alternative to Mask of Madness.",
          mask_of_madness:
            "A core farming item that provides burst of attack speed which allows Headshot to proc more often. Can be disassembled down the road and components used for Satanic and Butterfly.",
          dragon_lance:
            "A core item that further improves attack range. Can be disassembled.",
          maelstrom:
            "Great against illusion-based heroes. Should be upgraded to Mjollnir fairy quickly if that is the case.",
          manta: `A situational item that provides you with a dispel. Also improves your armor, attack speed, and mobility.`,
          hurricane_pike:
            "Allows you to create a gap against heroes like Slark, Anti Mage and Phantom Assasin.",
          silver_edge: `A situational item that provides burst, ability to reposition and break effect.`,
          black_king_bar:
            "A core item that allows you to stand your ground and right-click.",
          aghanims_shard: `A core item that provides you the ability to disengage and open a gap between yourself and enemy heroes.`,
          satanic:
            "A core item that allows you to stand your ground and right-click. It dispels on cast.",
          butterfly: `A situational item that provides you with mix of offensive and defensive stats. You can get this by disassembling your Mask of Madness.`,
          monkey_king_bar: "Against evasion and miss chance.",
          swift_blink: `A late game pick up to replace your boots and boost your damage output while keeping your mobility.`,
          ward_observer: `Get one if you are going mid lane. You wont need one at the start on the safe lane.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2725332187",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "sniper_headshot", // 1
          "sniper_shrapnel", // 2
          `sniper_shrapnel`, // 3
          `sniper_headshot`, // 4
          "sniper_shrapnel", // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          "sniper_take_aim", // 8
          "sniper_take_aim", // 9
          "sniper_take_aim", // 10
          "sniper_take_aim", // 11
          "sniper_assassinate", // 12
          `sniper_headshot`, // 13
          "sniper_headshot", // 14
          `special_bonus_unique_sniper_4`, // 15
          `special_bonus_unique_sniper_5`, // 16
          "special_bonus_attributes", // 17
          "sniper_assassinate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sniper_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sniper_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            "magic_wand",
            `wraith_band`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `ultimate_scepter`,
            `aghanims_shard`,
            `force_staff`,
            `octarine_core`,
          ],
          late_game: [
            `ethereal_blade`,
            `boots_of_bearing`,
            `blink`,
            `aeon_disk`,
          ],
          situational: [
            "spirit_vessel",
            "glimmer_cape",
            `veil_of_discord`,
            `pavise`,
            `phylactery`,
            `aether_lens`,
            `solar_crest`,
            `wind_waker`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            "ultimate_scepter",
            "aghanims_shard",
            `force_staff`,
            `octarine_core`,
            `ethereal_blade`,
            `boots_of_bearing`,
          ],
          neutral: [
            "mysterious_hat",
            `faded_broach`,
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            `ceremonial_robe`,
            `timeless_relic`,
            `spy_gadget`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          /* urn_of_shadows:
            "A core item that provides you with useful stats and allows you to snowball off of first kill.", */
          infused_raindrop: "Against magical burst",
          tranquil_boots:
            "A core boots upgrade that provides you with significant movement speed and hp sustain.",
          spirit_vessel: "Against heavy-healing lineup.",
          veil_of_discord: `A situational item that increases spell damage output of your team.`,
          ultimate_scepter:
            "A core item that upgrades Assassinate. Adds to control.",
          aghanims_shard:
            "A core upgrade that allows you to create gap between you and opponents. Concussive Grenade also disarms.",
          octarine_core: `A core item that improves the cooldown of all your spells and items.`,
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_sniper_4: `As the support Sniper, on level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      blink: "For extra mobility.",
    },
    combo: [
      `sniper_shrapnel`,
      `sniper_take_aim`,
      `attack`,
      `sniper_assassinate`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To catch up to Sniper and to move out of Shrapnel AoE",
          },
          {
            item: "boots",
            info: "To catch up to Sniper and to move out of Shrapnel AoE",
          },
          { item: "armor", info: "Buy armor items" },
          { item: "infused_raindrop" },
        ],
        support: [
          { item: "ward_sentry", info: "To block camps" },
          { item: "smoke_of_deceit", info: "To dodge Assassinate" },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "blink", info: "To close the gap to Sniper" }],
        support: [
          { item: "force_staff" },
          {
            item: "smoke_of_deceit",
            info: "Use smoke to counter Sniper`s ultimate",
          },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "heavens_halberd" },
          { item: "invis_sword", info: "To close the gap to Sniper" },
          { item: "blade_mail" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [
          {
            item: "smoke_of_deceit",
            info: "Use smoke to counter Sniper`s ultimate",
          },
        ],
        core: [
          { item: "silver_edge", info: "To close the gap to Sniper" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  // eidendota plays hero
  Spectre: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963243",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "spectre_spectral_dagger", // 1
          "spectre_dispersion", // 2
          "spectre_spectral_dagger", // 3
          "spectre_dispersion", // 4
          "spectre_spectral_dagger", // 5
          "spectre_haunt", // 6
          "spectre_spectral_dagger", // 7
          "spectre_dispersion", // 8
          "spectre_dispersion", // 9
          "special_bonus_all_stats_5", // 10
          "spectre_desolate", // 11
          "spectre_haunt", // 12
          "spectre_desolate", // 13
          "spectre_desolate", // 14
          "special_bonus_unique_spectre_6", // 15
          "spectre_desolate", // 16
          "special_bonus_attributes", // 17
          "spectre_haunt", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_350", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_spectre_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "blade_mail",
          ],
          mid_game: ["radiance", "manta", "ultimate_scepter", "aghanims_shard"],
          late_game: ["skadi", "abyssal_blade", "butterfly", "moon_shard"],
          situational: [
            "echo_sabre",
            "diffusal_blade",
            "hand_of_midas",
            "bloodthorn",
            "black_king_bar",
            "nullifier",
            "sheepstick",
            "heart",
            "refresher",
          ],
          core: [
            "power_treads",
            "blade_mail",
            "radiance",
            "manta",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "lance_of_pursuit",
            "broom_handle",
            "vambrace",
            //"dagger_of_ristul", Removed in 7.33
            "ring_of_aquila",
            "pupils_gift",
            "titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      spectre_desolate:
        "You can take a point in this spell during laning stage if you can be aggressive which is rarely the case.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "On hero against magical burst.",
      soul_ring:
        "An optional item that gives you decent stats and armor and it allows you to spam Spectral Dagger as your main source of farm acceleration.",
      falcon_blade:
        "An optional item that provides you with useful stats but most importantly with mana sustain.",
      power_treads:
        "A core boots upgrade that provides you with signifcant attack speed increase and mana savings through toggling.",
      orchid:
        "Can be considered against elusive heroes with escaping spells. Provides you good mana sustain.",
      diffusal_blade:
        "Great against heroes like Medusa and Wraith King but also other heroes with small mana pools. Goes well with Manta.",
      radiance: "Against illusion, clone and summon-based heroes.",
      ultimate_scepter:
        "A core item that allows you to play actively and be part of every pick-off and teamfight.",
      manta:
        "A core item that provides you with useful stats but mainly adds to your burst damage. Desolate works on illusions. Spectre becomes decent at taking Roshan with this item.",
      skadi:
        "A core item that tanks you up and makes you less kitable. Works very well against tanky immobile heroes and especially good against ranged heroes.",
      basher:
        "A core item that allows you to lock the target your are focusing.",
      black_king_bar:
        "Against breaks, disables, magical damage and as a dispel. If you get hit from Silver Edge while spell-immune, the break effect doesn`t apply. If you get hit from Silver Edge before popping Black King Bar, casting Black King Bar won`t dispel break debuff.",
      nullifier:
        "To dispel defensive spells and items that prevent your from right-clicking the opponent.",
    },
    combo: [`spectre_haunt`, `spectre_reality`, `manta`, `diffusal_blade`],
    counter_items: {
      laning_phase: { all: [], support: [], core: [] },
      mid_game: {
        all: [
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from her abilities and provides armor against right-clicks and Haunt",
          },
        ],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "hurricane_pike" },
          { item: "silver_edge" },
          { item: "crimson_guard" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  "Spirit Breaker": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963328",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "spirit_breaker_greater_bash", // 1
          "spirit_breaker_charge_of_darkness", // 2
          "spirit_breaker_greater_bash", // 3
          "spirit_breaker_bulldoze", // 4
          "spirit_breaker_greater_bash", // 5
          "spirit_breaker_nether_strike", // 6
          "spirit_breaker_greater_bash", // 7
          "spirit_breaker_charge_of_darkness", // 8
          "spirit_breaker_charge_of_darkness", // 9
          "spirit_breaker_charge_of_darkness", // 10
          "spirit_breaker_bulldoze", // 11
          "spirit_breaker_nether_strike", // 12
          "spirit_breaker_bulldoze", // 13
          "spirit_breaker_bulldoze", // 14
          "special_bonus_night_vision_500", // 15
          "special_bonus_unique_spirit_breaker_2", // 16
          "special_bonus_attributes", // 17
          "spirit_breaker_nether_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_spirit_breaker_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_spirit_breaker_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `urn_of_shadows`,
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `ancient_janggo`,
            `invis_sword`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `yasha_and_kaya`,
            `boots_of_bearing`,
            `wind_waker`,
            `octarine_core`,
          ],
          situational: [
            "orb_of_venom",
            `spirit_vessel`,
            `pavise`,
            `glimmer_cape`,
            `force_staff`,
            `solar_crest`,
            `heavens_halberd`,
            `lotus_orb`,
            `silver_edge`,
            `blade_mail`,
            `black_king_bar`,
            `assault`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `urn_of_shadows`,
            `phase_boots`,
            `wind_lace`,
            `ancient_janggo`,
            "invis_sword",
            `ultimate_scepter`,
            `yasha_and_kaya`,
            `boots_of_bearing`,
          ],
          neutral: [
            "broom_handle",
            `faded_broach`,
            "dragon_scale",
            `vambrace`,
            "cloak_of_flames",
            `quickening_charm`,
            `spell_prism`,
            "ninja_gear",
            "force_boots",
            "giants_ring",
          ],
        },
        item_tooltips: {
          orb_of_venom:
            "If you can pressure on the lane, usually against double melee.",
          ward_sentry: "To block or unblock a pull camp.",
          // orb_of_corrosion: "If you can pressure on the lane.",
          spirit_vessel: "Against heavy-healing lineup.",
          lotus_orb: "For reflect, dispel and armor.",
          // vladmir: "Amplifying your teams damage and grants them lifesteal.",
          invis_sword:
            "Can be used while Charging and catch the opponents off-guard.",
          /* aghanims_shard:
            `A late game luxury item to save your cores from single target burst, such as Lions Finger or Linas Laguna Blade.`, */
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2726400030",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "spirit_breaker_greater_bash", // 1
          "spirit_breaker_charge_of_darkness", // 2
          "spirit_breaker_greater_bash", // 3
          `spirit_breaker_charge_of_darkness`, // 4
          "spirit_breaker_greater_bash", // 5
          "spirit_breaker_nether_strike", // 6
          "spirit_breaker_greater_bash", // 7
          `spirit_breaker_bulldoze`, // 8
          "spirit_breaker_charge_of_darkness", // 9
          "spirit_breaker_charge_of_darkness", // 10
          `spirit_breaker_bulldoze`, // 11
          "spirit_breaker_nether_strike", // 12
          "spirit_breaker_bulldoze", // 13
          "spirit_breaker_bulldoze", // 14
          `special_bonus_night_vision_500`, // 15
          "special_bonus_unique_spirit_breaker_2", // 16
          "special_bonus_attributes", // 17
          "spirit_breaker_nether_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_spirit_breaker_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_spirit_breaker_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `phase_boots`,
            "magic_wand",
            `wraith_band`,
            `wind_lace`,
          ],
          mid_game: [
            "invis_sword",
            "ultimate_scepter",
            `yasha_and_kaya`,
            `black_king_bar`,
          ],
          late_game: [
            `harpoon`,
            `boots_of_bearing`,
            `wind_waker`,
            `octarine_core`,
          ],
          situational: [
            `hand_of_midas`,
            `phylactery`,
            `crimson_guard`,
            `pipe`,
            `heavens_halberd`,
            `solar_crest`,
            `lotus_orb`,
            `aghanims_shard`,
            `sphere`,
            `silver_edge`,
            `blade_mail`,
            `heart`,
            `assault`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `phase_boots`,
            "wind_lace",
            "invis_sword",
            "ultimate_scepter",
            `yasha_and_kaya`,
            `black_king_bar`,
            `harpoon`,
            `boots_of_bearing`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `dragon_scale`,
            `vambrace`,
            `cloak_of_flames`,
            `quickening_charm`,
            `timeless_relic`,
            `ninja_gear`,
            `force_boots`,
            `giants_ring`,
          ],
        },
        item_tooltips: {
          heavens_halberd: `Especially good against ranged right-clickers.`,
          harpoon: `A core item to signicantly improve your damage output and add another gap close to your toolkit.`,
        },
      },
    ],
    ability_tooltips: {
      spirit_breaker_bulldoze:
        "Consider maxing this spell out if you're going against a lot of disables.",
      /* special_bonus_armor_4:
        "Consider leveling this talent even earlier if you need to tank up against physical damage.", */
      special_bonus_night_vision_500: `On level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      phase_boots:
        "A core boots upgrade typically used just before the Charge of Darkness lands. Percentage of movement speed is converted to damage whenever Greater Bash procs.",
      wind_lace:
        "A core cheap item that goes well with movement speed theme of the hero.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      invis_sword:
        "A core item that can be used during Charge of Darkness without canceling it. Grants you even more burst damage on impact. Can be upgraded to Silver Edge in late game.",
      ultimate_scepter:
        "A core item that reduces cooldown of Charge of Darkness and allows it to pierce spell-immunity. You can use charge to push out sidelanes.",
      black_king_bar:
        "A core item that allows you to be in the middle of fight and right-click.",
      aghanims_shard: `A late game luxury item to save your cores from single target burst, such as Lions Finger or Linas Laguna Blade.`,
      yasha_and_kaya:
        "A core item that provides you with useful stats but mainly with extra movement speed and spell amplification. Greater Bash is of magical damage.",
    },
    combo: [
      `spirit_breaker_charge_of_darkness`,
      `spirit_breaker_bulldoze`,
      `invis_sword`,
      `spirit_breaker_nether_strike`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Spirit Breaker",
          },
          { item: "boots", info: "To keep the distance from Spirit Breaker" },
        ],
        support: [
          {
            item: "ward_observer",
            info: "To see him charging as early as you can so you can move away in time or alert an ally to do the same",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [
          { item: "glimmer_cape" },
          {
            item: "force_staff",
            info: "Using it on Spirit Breaker stops Charge of Darkness",
          },
          { item: "ghost" },
        ],
        core: [
          {
            item: "hurricane_pike",
            info: "Using it on Spirit Breaker while charging into you stops Charge of Darkness.",
          },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  "Storm Spirit": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963425",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "storm_spirit_static_remnant", // 1
          "storm_spirit_overload", // 2
          "storm_spirit_electric_vortex", // 3
          "storm_spirit_static_remnant", // 4
          "storm_spirit_static_remnant", // 5
          "storm_spirit_ball_lightning", // 6
          "storm_spirit_static_remnant", // 7
          "storm_spirit_overload", // 8
          "storm_spirit_overload", // 9
          `special_bonus_mp_regen_150`, // 10
          `storm_spirit_overload`, // 11
          "storm_spirit_ball_lightning", // 12
          "storm_spirit_electric_vortex", // 13
          "storm_spirit_electric_vortex", // 14
          "special_bonus_hp_250", // 15
          "storm_spirit_electric_vortex", // 16
          "special_bonus_attributes", // 17
          "storm_spirit_ball_lightning", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_storm_spirit`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_storm_spirit_7", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            `power_treads`,
            `magic_wand`,
            `falcon_blade`,
            `null_talisman`,
          ],
          mid_game: [
            `witch_blade`,
            `kaya_and_sange`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `sheepstick`,
            `ultimate_scepter`,
            `bloodthorn`,
            `revenants_brooch`,
          ],
          situational: [
            `sphere`,
            `shivas_guard`,
            `cyclone`,
            `orchid`,
            `bloodstone`,
            `refresher`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            `power_treads`,
            `falcon_blade`,
            `witch_blade`,
            `kaya_and_sange`,
            "aghanims_shard",
            `ultimate_scepter`,
            `sheepstick`,
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "vambrace",
            "grove_bow",
            "ceremonial_robe",
            "psychic_headband",
            "spell_prism",
            "timeless_relic",
            `apex`,
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      storm_spirit_electric_vortex:
        "You don`t have to put a point in this spell during laning stage if you have no way to pressure or land a kill on the opponents mid.",
      storm_spirit_ball_lightning: `You can use your ultimate in the circle of your hero to Overload yourself and add up additional damage. They dont have to be long zips.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      bottle:
        "A core item that provides you with sustain and allows you to gank with stored rune. Having arcane or regenaration rune stored can easily be a deciding factor in the teamfight.",
      infused_raindrop: "On lane against magical burst.",
      null_talisman:
        "A core item that gives you stats as well as max mana pool.",
      power_treads:
        "A core boots upgrade that provides you with some mana and attack speed.",
      orchid:
        "If you have a really good start you can rush this item. It allows you to pick-off most of the heroes on the map.",
      cyclone:
        "If you are dealing with sileces and roots this item can helps you dispel them.",
      kaya_and_sange:
        "A core item that provides you with mix of defensive and offensive stats.",
      black_king_bar:
        "A core item that deals with most of the disables, silences and roots.",
      sphere: "Against powerful single-target disables and debuffs.",
      ultimate_scepter:
        "A core item that allows you to have a big crowd control effect with only 16s cd.",
      aghanims_shard:
        "A core upgrade that increases your team`s damage output.",
      shivas_guard:
        "A core item that provides you with more intelligence and AoE damage. It also deals with healing lineup. The item can be used during Ball Lightning.",
    },
    combo: [
      `storm_spirit_ball_lightning`,
      `attack`,
      `storm_spirit_electric_vortex`,
      `attack`,
      `storm_spirit_static_remnant`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Storm Spirit is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Orchid" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  // eidendota plays hero
  Sven: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963505",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "sven_storm_bolt", // 1
          "sven_warcry", // 2
          "sven_storm_bolt", // 3
          "sven_great_cleave", // 4
          "sven_great_cleave", // 5
          "sven_gods_strength", // 6
          "sven_great_cleave", // 7
          "sven_great_cleave", // 8
          "sven_warcry", // 9
          "special_bonus_attack_speed_15", // 10
          "sven_warcry", // 11
          "sven_gods_strength", // 12
          "sven_warcry", // 13
          "sven_storm_bolt", // 14
          "special_bonus_unique_sven_3", // 15
          "sven_storm_bolt", // 16
          "special_bonus_attributes", // 17
          "sven_gods_strength", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sven_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sven_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "mask_of_madness"],
          mid_game: ["echo_sabre", "blink", "black_king_bar", "lesser_crit"],
          late_game: ["harpoon", "greater_crit", "assault", "satanic"],
          situational: [
            "overwhelming_blink",
            "swift_blink",
            "aghanims_shard",
            "silver_edge",
            "heavens_halberd",
            "satanic",
            "sphere",
            "monkey_king_bar",
            "ultimate_scepter",
            "bloodthorn",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "echo_sabre",
            "blink",
            "black_king_bar",
            "greater_crit",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            "orb_of_destruction",
            "vambrace",
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
            "penta_edged_sword",
            "pirate_hat",
            "mirror_shield",
            "giants_ring",
          ],
        },
      },
    ],
    ability_tooltips: {
      sven_warcry:
        "At level 3, you can take a point in this spell over the suggested second point in Storm Hammer if the lane is hard.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling.",
      mask_of_madness:
        "A core farming item that provides you with burst of attack speed and sustain through lifesteal. Can be disassembled down the road.",
      echo_sabre:
        "A core item that provides burst through double attack and helps with mana sustain. Can be disassembled for faster Black King Bar timing.",
      blink: "A core item to close the gap.",
      black_king_bar:
        "A core item that allows you to right-click in the middle of the fight.",
      silver_edge:
        "A core item that provides you with burst, ability to reposition and break effect.",
      aghanims_shard: "To dispel defensive items and spells with Storm Hammer.",
      bloodthorn:
        "An item of choice if you need to deal with evasion and miss chance. You can get Oblivion Staff from Echo Sabre. Apply it on stunned enemy so it doesn`t get dispelled easily.",
      satanic:
        "A core item that tanks you up and allows you to stand your ground and right-click. Dispels on cast.",
      swift_blink:
        "A core blink upgrade that provides you with attack speed burst. It allows you to move around faster especially if you decide to sell or backpack Power Treads. Overwhelming Blink can be considered instead if you are playing against illusion based heroes although Swift Blink might be still better.",
      monkey_king_bar:
        "Against evasion and miss chance. Bloodthorn is usually a better option as you already have Oblivion Staff in Echo Sabre that you can use.",
      ultimate_scepter: "For extra mobility.",
    },
    combo: [
      `sven_gods_strength`,
      `blink`,
      `black_king_bar`,
      `sven_storm_bolt`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [{ item: "armor", info: "Buy armor items" }],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          { item: "solar_crest" },
          {
            item: "blink",
          },

          { item: "lotus_orb" },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
          {
            item: "cyclone",
            info: "To dispel warcry and to ruin his momentum.",
          },
        ],
        core: [{ item: "hurricane_pike" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          {
            item: "shivas_guard",
            info: "To reduce Sven`s not so fast attack speed and acquire some armor",
          },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "butterfly" },
          { item: "nullifier", info: "To dispel Warcry" },
        ],
      },
    },
  },

  Techies: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699933135",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "techies_sticky_bomb", // 1
          "techies_suicide", // 2
          "techies_sticky_bomb", // 3
          "techies_suicide", // 4
          "techies_sticky_bomb", // 5
          "techies_land_mines", // 6
          "techies_sticky_bomb", // 7
          `techies_reactive_tazer`, // 8
          "techies_suicide", // 9
          `techies_suicide`, // 10
          `special_bonus_magic_resistance_20`, // 11
          "techies_land_mines", // 12
          "techies_reactive_tazer", // 13
          "techies_reactive_tazer", // 14
          "special_bonus_unique_techies", // 15
          "techies_reactive_tazer", // 16
          "special_bonus_attributes", // 17
          "techies_land_mines", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_techies_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_techies_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            `ethereal_blade`,
            `ultimate_scepter`,
          ],
          late_game: [
            `force_staff`,
            `boots_of_bearing`,
            `octarine_core`,
            `sheepstick`,
          ],
          situational: [
            `soul_ring`,
            `veil_of_discord`,
            `wind_waker`,
            "glimmer_cape",
            `guardian_greaves`,
            `pavise`,
            `veil_of_discord`,
            `aghanims_shard`,
            "blink",
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aether_lens`,
            `tranquil_boots`,
            `ethereal_blade`,
            `ultimate_scepter`,
            "octarine_core",
          ],
          neutral: [
            "arcane_ring",
            `mysterious_hat`,
            "philosophers_stone",
            `bullwhip`,
            "psychic_headband",
            "ceremonial_robe",
            `spy_gadget`,
            "timeless_relic",
            `fallen_sky`,
            `seer_stone`,
          ],
        },
      },
      {
        // INPUT MICHEL: GUIDE TO BE UPDATED BY BANE, NOW IT IS JUST A COPY OF THE OTHER GUIDE
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2776661467",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "techies_sticky_bomb", // 1
          "techies_suicide", // 2
          "techies_sticky_bomb", // 3
          "techies_suicide", // 4
          "techies_sticky_bomb", // 5
          "techies_land_mines", // 6
          "techies_sticky_bomb", // 7
          "techies_suicide", // 8
          "techies_suicide", // 9
          `special_bonus_magic_resistance_20`, // 10
          `techies_reactive_tazer`, // 11
          "techies_land_mines", // 12
          "techies_reactive_tazer", // 13
          "techies_reactive_tazer", // 14
          "special_bonus_unique_techies", // 15
          "techies_reactive_tazer", // 16
          "special_bonus_attributes", // 17
          "techies_land_mines", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_techies_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_techies_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `branches`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `ethereal_blade`,
            `aether_lens`,
            `travel_boots`,
            `ultimate_scepter`,
          ],
          late_game: [
            `bloodstone`,
            `octarine_core`,
            `sheepstick`,
            "overwhelming_blink",
          ],
          situational: [
            `null_talisman`,
            `ring_of_basilius`,
            "black_king_bar",
            "aeon_disk",
            "sphere",
            `shivas_guard`,
            `pipe`,
            `wind_waker`,
            `force_staff`,
            `dagon_5`,
            `aghanims_shard`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `arcane_boots`,
            `ethereal_blade`,
            `aether_lens`,
            `travel_boots`,
            `ultimate_scepter`,
            "octarine_core",
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            `bullwhip`,
            `philosophers_stone`,
            `psychic_headband`,
            `ceremonial_robe`,
            `spell_prism`,
            `timeless_relic`,
            `fallen_sky`,
            `seer_stone`,
          ],
        },
      },
    ],
    ability_tooltips: {
      techies_sticky_bomb:
        "Use this spell on the laning stage to secure range creeps and harass. In the later portions of the game use this to slow the enemy and guarantee a Blast Off while they are slowed.",
      techies_reactive_tazer:
        "Consider putting a skill point earlier if you feel like need to disarm. Use this spell before jumping with Blast Off and disarm your opponents. That will make them unable to kill the Proximity Mine that you place under them.",
      techies_suicide:
        "On the laning stage use this spell to secure a range creep as well as deal damage to the heroes. In the later portions of the game use this to silence/stun a target and following with Sticky Bomb and Proximity Mines.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      travel_boots: `A good item that enables you to split push or join fights with Techies.`,
      infused_raindrop:
        "Against magical burst. It doesn`t offset Blast Off! damage.",
      force_staff:
        "A saving tool for you and your teammates. Can be used to push an opponent into Proximity Mines.",
      veil_of_discord: `A situational item that provides you and your teammates with mana regen. Get ring of basilius in place of null talisman when you plan on purchasing this item.`,
      kaya: "A core item that provides you with spell amplification as well as mana regen amplification. Should be upgraded into an Ethereal Blade later on.",
      ethereal_blade: `A core item that increases the damage output of your hero. Can be used on a hero to disarm them so that they cant kill the Proximity Mine you place under them or defensively on yourself.`,
      aether_lens:
        "A core item that improves cast range and mana regeneration. Can be upgraded to Octarine Core in late game.",
      octarine_core:
        "A core item that increases your cast range as well as reducing the cooldown of your skills and items.",
      /* moon_shard:
        "Only purchase this item if you take your last 252 damage talent as your right clicks become way stronger and you can right click enemies.", */
      aghanims_shard: `A luxury late game item that provides extra damage and versatility with Reactive Tazer.`,
      bloodstone:
        "Increases your spell lifesteal by a big margin that synergizes well with your skill set. Can be activated when using spells to gain hp and mana back.",
      blink: "For extra mobility around the map.",
    },
    combo: [
      `techies_reactive_tazer`,
      `techies_suicide`,
      `ethereal_blade`,
      `techies_sticky_bomb`,
      `techies_land_mines`,
      `techies_land_mines`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "quelling_blade",
            info: `Quelling Blade the trees so you can see Techies mines easier or when he is doing Blast Off!`,
          },

          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Techies is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          /* {
            item: "ward_sentry",
            info: "Proximity Mines are invisible",
          }, */
          {
            item: "tranquil_boots",
            info: `Tranquil Boots stay active through damage from mines, unless Techies attacks you with right clicks.`,
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [
          /* { item: "SentryGem" } , */ { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "blade_mail" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel the Disarm from Reactive Tazer" },
        ],
      },
      late_game: {
        all: [{ item: "aeon_disk" }],
        support: [/* { item: "SentryGem" }, */ { item: "black_king_bar" }],
        core: [
          {
            item: "heart",
            info: "To tank up and recover against Proximity Mines",
          },
          {
            item: "satanic",
            info: "To dispel Reactive Tazer disarm and Blast Off! silence and be able to recover health after being damaged by his skill set.",
          },
        ],
      },
    },
  },

  // eidendota plays hero
  "Templar Assassin": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963659",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "templar_assassin_meld", // 1
          "templar_assassin_psi_blades", // 2
          "templar_assassin_refraction", // 3
          "templar_assassin_refraction", // 4
          "templar_assassin_refraction", // 5
          "templar_assassin_psionic_trap", // 6
          "templar_assassin_refraction", // 7
          "templar_assassin_psi_blades", // 8
          "templar_assassin_meld", // 9
          "templar_assassin_meld", // 10
          "templar_assassin_meld", // 11
          "templar_assassin_psionic_trap", // 12
          "templar_assassin_psi_blades", // 13
          "special_bonus_unique_templar_assassin_refraction_damage", // 14
          "special_bonus_unique_templar_assassin_8", // 15
          "templar_assassin_psi_blades", // 16
          "special_bonus_attributes", // 17
          "templar_assassin_psionic_trap", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_templar_assassin_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_templar_assassin", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "ring_of_basilius",
            "magic_stick",
            "dragon_lance",
          ],
          mid_game: ["desolator", "blink", "black_king_bar", "lesser_crit"],
          late_game: [
            "greater_crit",
            "swift_blink",
            "butterfly",
            "moon_shard",
            "travel_boots",
            "bloodthorn",
          ],
          situational: [
            "ultimate_scepter",
            "aghanims_shard",
            "monkey_king_bar",
            "nullifier",
            "sphere",
            "sheepstick",
            "assault",
            "hurricane_pike",
            "silver_edge",
            "infused_raindrop",
          ],
          core: [
            "power_treads",
            "dragon_lance",
            "desolator",
            "blink",
            "black_king_bar",
            "greater_crit",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "occult_bracelet",
            "ring_of_aquila",
            "grove_bow",
            //"dagger_of_ristul", Removed in 7.33
            "specialists_array",
            "elven_tunic",
            "enchanted_quiver",
            //"flicker", Removed in 7.33
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "desolator_2",
            "apex",
          ],
        },
        ability_tooltips: {
          templar_assassin_refraction:
            "Use this for extra psi-blade harras damage on enemy heroes in lane and to block damage instances.",
          templar_assassin_meld:
            "You can surprise the opponents on the first wave by melding yourself in their offlaner`s creep blocking path. You can get a double meld hit off. If you are laning against only range heroes rather level psi-blades on lvl1.",
          templar_assassin_psi_blades:
            "Try to connect as many psi-blades onto enemy heroes in the lane. Keep in mind that sometimes you don't want the lane to push so position your hero in a way that you don't spill psi-blades onto other creeps.",
          templar_assassin_psionic_trap:
            "Place these around important areas of the map where there are key objectives aswell as areas where enemy heroes are likely to cross in order to gank you.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2726399928",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "templar_assassin_psi_blades", // 1
          "templar_assassin_refraction", // 2
          "templar_assassin_refraction", // 3
          "templar_assassin_psi_blades", // 4
          "templar_assassin_refraction", // 5
          "templar_assassin_psionic_trap", // 6
          "templar_assassin_refraction", // 7
          "templar_assassin_meld", // 8
          "templar_assassin_meld", // 9
          "templar_assassin_meld", // 10
          "templar_assassin_meld", // 11
          "templar_assassin_psionic_trap", // 12
          "templar_assassin_psi_blades", // 13
          "special_bonus_unique_templar_assassin_refraction_damage", // 14
          "special_bonus_unique_templar_assassin_8", // 15
          "templar_assassin_psi_blades", // 16
          "special_bonus_attributes", // 17
          "templar_assassin_psionic_trap", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_templar_assassin_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_templar_assassin", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: ["bottle", "power_treads", "magic_wand", "dragon_lance"],
          mid_game: ["desolator", "blink", "black_king_bar", "lesser_crit"],
          late_game: ["greater_crit", "swift_blink", "butterfly", "moon_shard"],
          situational: [
            "aghanims_shard",
            "ultimate_scepter",
            "monkey_king_bar",
            "nullifier",
            "sphere",
            "assault",
            "sheepstick",
            "hurricane_pike",
            "travel_boots",
            "bloodthorn",
          ],
          core: [
            "dragon_lance",
            "desolator",
            "blink",
            "black_king_bar",
            "greater_crit",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "occult_bracelet",
            "grove_bow",
            "specialists_array",
            "elven_tunic",
            "enchanted_quiver",
            //"heavy_blade",
            "ninja_gear",
            "mind_breaker",
            "desolator_2",
            "pirate_hat",
            "mirror_shield",
          ],
        },
        ability_tooltips: {
          templar_assassin_refraction:
            "Use this to tank damage from enemy heroes and tower hits. Try to get psi-blade hits while you have extra damage from refraction active.",
          templar_assassin_meld:
            "You can level this on 1 if you are laning against a melee opponent.",
          templar_assassin_psi_blades:
            "Try to harras the enemy midlaner as much as possible with psi-blade spills. You can use psi-blades to push in the lane as a rune is about to spawn making it harder for the enemy midder to contest. ",
          templar_assassin_psionic_trap:
            "Use your traps to scout enemy movements in your lane and farming areas. Place traps where there are key objectives on the map(roshan) for vision",
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune. Try to get it before 2minutes (first rune spawn in mid).",
          ultimate_scepter:
            "If you absolutely cannot fight you can consider getting this 3rd or 4th item in order to maximize farm and split push.",
          dragon_lance:
            "You can skip this and go for desolator or blink dagger if you feel you need the faster timing.",
          desolator:
            "You can rosh really easily when you get your deso and melt supports.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core boots upgrade that provides significant attack speed increase and some mana savings through toggling.",
      dragon_lance:
        "A core item that makes it easier for you to get right-clicks and Meld off. Can be disassembled for earlier timing on Black King Bar.",
      desolator:
        "A core item that adds to your burst. Allows you to take Roshan and buildings faster.",
      blink:
        "A core item for gap-closing. You don`t take damage during Refraction so it possible to blink out even after few instances of damage on you.",
      black_king_bar:
        "A core item that allows you to right-click in the fights. Refraction protects you against right-clicks and Black King Bar against most of the spells.",
      hurricane_pike:
        "Good at creating gap between you and heroes like Slark or Troll. You can use Meld during one of the 5 long range attacks of Hurricane Pike active ability.",
      aghanims_shard:
        "A core upgrade for silence and extra vision. Often times you will get this upgrade from second Roshan as Templar Assassin is good at killing Roshan early.",
      greater_crit:
        "A core damaging item of choice. Adds to the burst and extracts maximum value from armor reduction.",
      ultimate_scepter:
        "To splitpush and against it. It is appealing item to get if you are far behind or far ahead.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive items and spells that prevent you from right-clicking the opponent.",
      sphere: "Against powerful single-target disables and debuffs.",
      swift_blink:
        "A core upgrade that provides burst of attack speed on cast. Allows you to move around the map faster especially if you are playing without the boots due to slot issues.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To dodge the Psi Blades and offset the slow from Psionic Traps",
          },
          {
            item: "boots",
            info: "To dodge the Psi Blades and offset the slow from Psionic Traps",
          },
          { item: "urn_of_shadows", info: "To remove Refraction charges" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "To block camps and for Psionic Traps and Meld",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block ancient camp" },
          { item: "SentryDust" },
          { item: "ghost" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "hurricane_pike" },
          {
            item: "witch_blade",
            info: "To remove Refraction charges and to obtain some armor",
          },
          { item: "heavens_halberd" },
          { item: "javelin", info: "To remove Refractions" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "SentryDustGem" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
          {
            item: "radiance",
            info: "To remove defensive Refraction charges and for miss chance",
          },
        ],
      },
    },
  },

  // eidendota plays hero
  Terrorblade: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963755",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "terrorblade_reflection", // 1
          "terrorblade_metamorphosis", // 2
          "terrorblade_metamorphosis", // 3
          "terrorblade_conjure_image", // 4
          "terrorblade_conjure_image", // 5
          "terrorblade_conjure_image", // 6
          "terrorblade_conjure_image", // 7
          "terrorblade_sunder", // 8
          "terrorblade_metamorphosis", // 9
          "special_bonus_unique_terrorblade_4", // 10
          "terrorblade_metamorphosis", // 11
          "terrorblade_sunder", // 12
          "terrorblade_reflection", // 13
          "terrorblade_reflection", // 14
          "special_bonus_hp_300", // 15
          "terrorblade_reflection", // 16
          "special_bonus_attributes", // 17
          "terrorblade_sunder", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_terrorblade_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_terrorblade_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "branches",
            "circlet",
          ],
          early_game: ["power_treads", "magic_wand", "wraith_band", "yasha"],
          mid_game: ["dragon_lance", "manta", "skadi", "black_king_bar"],
          late_game: [
            "satanic",
            "greater_crit",
            "butterfly",
            "hurricane_pike",
            "swift_blink",
          ],
          situational: [
            "infused_raindrop",
            "refresher",
            "blink",
            "monkey_king_bar",
            "sange_and_yasha",
            "sphere",
            "bloodthorn",
            "silver_edge",
            "diffusal_blade",
          ],
          core: ["manta", "skadi", "black_king_bar", "greater_crit"],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "unstable_wand",
            "broom_handle",
            "grove_bow",
            "pupils_gift",
            "ring_of_aquila",
            "titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "apex",
            "pirate_hat",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      terrorblade_reflection:
        "You can use this in the laning stage to harras and setup kills with your support.",
      terrorblade_conjure_image:
        "This will be your main farming tool throught the game. Use your illusion to help you farm the jungle in the early game and after that to push out lanes. Try to have your illusions with you when fights start.",
      terrorblade_metamorphosis:
        "Metamorphosis has a very long cooldown, In the early game you can use it to farm and as you get more items start using your meta soley for pushing and taking fights. You can also use it for taking multiple ancient camps at a time.",
      terrorblade_sunder:
        "You can skill this spell eariler than suggested or keep a skill point if you are still laning and you feel like you might be ganked. It decreases your farming speed though.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect a high frequency of spells being used on the lane.",
      infused_raindrop:
        "Against magical burst. Nice mana regen for illusion spam.",
      power_treads:
        "A core boots upgrade. Illusion-based heroes like agility and strength attributes.",
      manta:
        "A core item that provide a mix of useful stats. Proper Manta illusion usage can further accelerate your farm and in the fights significantly increase your damage output.",
      sange_and_yasha:
        "In games where the enemy lineup has stun lock and burst damage, Sange&Yasha will be better than manta as it will help you survive. eg.(earthshaker)",
      dragon_lance:
        "A core item that provides you with a lot of needed attributes and improves attack range during Metamorphosis. Can be disassembled.",
      skadi:
        "A core item that provides a lot of attributes and makes you less kitable.",
      hurricane_pike: "To disengage from heroes like Slark and Troll.",
      black_king_bar:
        "A core item that allows you to stand your ground and right-click. It helps with getting Sunder off.",
      satanic:
        "A core item that tanks you up and allows you to stand your ground. It dispels on cast.",
      greater_crit:
        "A core damaging item of choice. Illusions can crit as well.",
      blink: "To close the gap. Goes well with Aghanim`s Scepter.",
      ultimate_scepter: "For extra control and Metamorphosis uptime.",
      monkey_king_bar: "Against evasion and miss chance.",
      butterfly:
        "Alot of damage and especially good against high physical damage heroes on the enemy team.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [{ item: "armor", info: "Buy armor items" }],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "lotus_orb",
            info: "Dispels Reflection and nullifies health swap of Sunder",
          },
          {
            item: "sphere",
            info: "Blocks Sunder, Can be used on allies.",
          },
          { item: "dagon", info: "Instantly kills illusions" },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "maelstrom" },
          { item: "crimson_guard" },
          { item: "heavens_halberd" },
          { item: "orchid" },
          {
            item: "black_king_bar",
            info: "Sunder and Reflection can`t be used against spell immune heroes",
          },
          {
            item: "travel_boots",
            info: "To deal with splitpush by his illusions",
          },
          {
            item: "manta",
            info: "To dispel Reflection if the illusion of you that Terrorblade creates is strong",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [
          {
            item: "travel_boots",
            info: "To deal with splitpush by his illusions",
          },
        ],
        core: [
          {
            item: "mjollnir",
            info: "Magic damage from procs is good against this high armor hero and attacks with procs pierce evasion",
          },
          {
            item: "monkey_king_bar",
            info: "Magic damage from procs is good against this high armor hero that also buys evasion very often",
          },
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this high armor hero" },
          { item: "butterfly" },
          {
            item: "overwhelming_blink",
            info: "For some AoE damage against illusions",
          },
          {
            item: "satanic",
            info: "To dispel Reflection and be able to recover health after Sunder",
          },
        ],
      },
    },
  },

  Tidehunter: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963852",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `tidehunter_gush`, // 1
          `tidehunter_anchor_smash`, // 2
          "tidehunter_anchor_smash", // 3
          `tidehunter_kraken_shell`, // 4
          "tidehunter_anchor_smash", // 5
          "tidehunter_ravage", // 6
          "tidehunter_anchor_smash", // 7
          "tidehunter_kraken_shell", // 8
          "tidehunter_kraken_shell", // 9
          `special_bonus_unique_tidehunter_9`, // 10
          `tidehunter_kraken_shell`, // 11
          "tidehunter_ravage", // 12
          "tidehunter_gush", // 13
          "tidehunter_gush", // 14
          `special_bonus_unique_tidehunter_2`, // 15
          `tidehunter_gush`, // 16
          "special_bonus_attributes", // 17
          "tidehunter_ravage", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_tidehunter_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tidehunter_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `arcane_boots`,
            `soul_ring`,
            `magic_wand`,
            `bracer`,
            `wind_lace`,
          ],
          mid_game: [`guardian_greaves`, `blink`, `pipe`, `aghanims_shard`],
          late_game: [
            `force_staff`,
            `ultimate_scepter`,
            `refresher`,
            `shivas_guard`,
          ],
          situational: [
            `phase_boots`,
            `meteor_hammer`,
            `solar_crest`,
            "heavens_halberd",
            `lotus_orb`,
            `vladmir`,
            `black_king_bar`,
            `sphere`,
            `aeon_disk`,
            `assault`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "soul_ring",
            `guardian_greaves`,
            `blink`,
            `pipe`,
            `aghanims_shard`,
            "ultimate_scepter",
            "shivas_guard",
            "refresher",
          ],
          neutral: [
            `pogo_stick`,
            `arcane_ring`,
            `bullwhip`,
            "vambrace",
            "cloak_of_flames",
            `quickening_charm`,
            "timeless_relic",
            `spell_prism`,
            "fallen_sky",
            `giants_ring`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* tidehunter_gush:
        "You can skill this spell on level 1 if you are fighting at the 0min rune or you can pressure on the lane.", */
      tidehunter_kraken_shell:
        "On a tough lane you can put more points in this spell and earlier than suggested.",
      /* special_bonus_unique_tidehunter_6:
        "You can take this talent over the suggested one if opponents have a lot of stuns or debuffs that Kraken Shell can dispel off of you.", */
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      soul_ring:
        "A core item that helps with mana sustain and provides useful stats.",
      phase_boots: `A situational boots upgrade that fixes movement speed and armor issues that Tidehunter has.`,
      /*  hood_of_defiance:
        "A core defensive item that negates magical damage. Kraken Shell protects Tidehunter from right-clicks and Hood against magical damage.", */
      pipe: "Against heavy magical damage lineup.",
      blink: "A core item that allows you to land multi-hero Ravage.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      aghanims_shard: `An excellent pick up in the mid game to give you an added disable other than Ravage.`,
      ultimate_scepter:
        "A core item that allows you to hit multiple opponents with Gush.",
      lotus_orb: "For reflecting, dispelling and armor.",
      shivas_guard:
        "A core item that icreases mana pool, adds to AoE damage and reduces healing of opponents team.",
      refresher:
        "A core item for second round of your spells and items. Goes well with level 25 Ravage talent.",
    },
    combo: [
      `soul_ring`,
      `blink`,
      `tidehunter_ravage`,
      `tidehunter_gush`,
      `tidehunter_anchor_smash`,
      `refresher`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Tidehunter tends to use Anchor Smash frequently to harass and kill the creeps",
          },
          {
            item: "blight_stone",
            info: "Tide has very low armor early which you can exploit as a weakness",
          },
          {
            item: "lifesteal",
            info: "For sustaining on the lane since Tide doesn`t do big increments of damage",
          },
          { item: "armor", info: "Helps you with Gush and Anchor Smash combo" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against Gush",
          },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "black_king_bar" },
          {
            item: "silver_edge",
            info: "Breaking Tide`s passive will result into a very easier target to kill",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "wind_waker", info: "To save an ally being Ravaged" }],
        support: [{ item: "black_king_bar" }, { item: "aeon_disk" }],
        core: [{ item: "assault" }],
      },
    },
  },

  Timbersaw: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963963",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "shredder_whirling_death", // 1
          "shredder_reactive_armor", // 2
          "shredder_reactive_armor", // 3
          "shredder_timber_chain", // 4
          `shredder_timber_chain`, // 5
          "shredder_chakram", // 6
          "shredder_timber_chain", // 7
          "shredder_timber_chain", // 8
          `shredder_whirling_death`, // 9
          `shredder_whirling_death`, // 10
          `shredder_whirling_death`, // 11
          "shredder_chakram", // 12
          `special_bonus_mp_regen_150`, // 13
          `shredder_reactive_armor`, // 14
          "special_bonus_spell_amplify_8", // 15
          `shredder_reactive_armor`, // 16
          "special_bonus_attributes", // 17
          "shredder_chakram", // 18
          "special_bonus_attributes", // 19
          "special_bonus_magic_resistance_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_timbersaw", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `soul_ring`,
            `arcane_boots`,
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [
            `kaya_and_sange`,
            `crimson_guard`,
            `pipe`,
            `ultimate_scepter`,
          ],
          late_game: [
            `octarine_core`,
            `aghanims_shard`,
            `sheepstick`,
            `shivas_guard`,
          ],
          situational: [
            "orb_of_corrosion",
            `bracer`,
            `cyclone`,
            `bloodstone`,
            `eternal_shroud`,
            `guardian_greaves`,
            `heavens_halberd`,
            `lotus_orb`,
            `black_king_bar`,
            `sphere`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `soul_ring`,
            "arcane_boots",
            `kaya_and_sange`,
            `crimson_guard`,
            `pipe`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `octarine_core`,
          ],
          neutral: [
            "arcane_ring",
            `occult_bracelet`,
            `vambrace`,
            `pupils_gift`,
            "ceremonial_robe",
            "cloak_of_flames",
            `spell_prism`,
            `timeless_relic`,
            `apex`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      shredder_whirling_death:
        "Make sure you hit trees when damaging your enemies as it will make more damage the more trees you destroy.",
      shredder_timber_chain: `In certain match-ups (Ursa, Slark), Reactive Armor does not have much value. You can put a point in this spell on level 1 or 2 and secure last hits.`,
    },
    item_tooltips: {
      orb_of_corrosion: `Consider buying this on a lane where you can right click the opponent and be very annoying to them. Also helps sieging the tier 1 tower early in the game.`,
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      soul_ring: "A core item that provides useful stats and mana sustain.",
      arcane_boots:
        "A core boots upgrade that provides mana sustain. Can be disassembled into Lotus Orb down the road.",
      /* hood_of_defiance:
        "A core defensive item. Reactive armor protects against physical damage and Hood covers the magical damage.", */
      cyclone: `A situational item that provides dispel on cast which is especially useful against Spirit Vessel. It also serves as a kill setup. You can disengage by Timber Chaining and cycloning immediately.`,
      pipe: "Against heavy magical damage lineup.",
      kaya_and_sange:
        "A core item that provide a mix of defensive and offensive stats. Self heal amplification synergizes with Reactive Armor really well.",
      aghanims_shard:
        "A core upgrade that adds to AoE damage output. Allows Timbersaw to deal significant damage to buildings which he lacks otherwise.",
      lotus_orb: "For dispel, reflect and armor.",
      shivas_guard:
        "A core item that increases mana pool and adds to AoE damage. Reduces healing by a significant amount.",
      overwhelming_blink: `To close the gap quickly and gain some more tankiness. Also helps slowing enemy heroes to land your spells effectively.`,
      black_king_bar: "Against a lot of disables, silences and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter: `A core item to make you extremely tanky for a period of time and survive the getting bursted when outnumbered by the enemy team.`,
    },
    combo: [
      `shredder_chakram`,
      `shredder_timber_chain`,
      `shredder_whirling_death`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Timbersaw tends to use Whirling Death and Timber Chain frequently to harass",
          },
          {
            item: "ring_of_health",
            info: "Sustains through timbers damage output.",
          },
          { item: "wind_lace", info: "To keep the distance from Timbersaw" },
          { item: "boots", info: "To keep the distance from Timbersaw" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset some of the HP regeneration from Reactive Armor",
          },
          {
            item: "quelling_blade",
            info: "Before and during the laning phase, use it to destroy the trees around you so you can minimize Timbers damage output",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by spell damage so you can keep regenerating while being hit by Timber`s spells",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          {
            item: "black_king_bar",
            info: " Timber`s dmg relies on spells and Black King Bar prevents all of them",
          },
          {
            item: "silver_edge",
            info: " Breaking through Timbers passive will get you a much easier target to kill",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "skadi" },
          { item: "abyssal_blade" },
          {
            item: "bloodthorn",
            info: "Provides silence,spell damage debuff and high burst versus Timber",
          },
        ],
      },
    },
  },

  Tinker: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964058",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "tinker_laser", // 1
          "tinker_heat_seeking_missile", // 2
          "tinker_laser", // 3
          "tinker_heat_seeking_missile", // 4
          "tinker_laser", // 5
          "tinker_keen_teleport", // 6   Note Michel: Use 'tinker_keen_teleport' instead of 'tinker_rearm'
          "tinker_laser", // 7
          "tinker_heat_seeking_missile", // 8
          "tinker_heat_seeking_missile", // 9
          "special_bonus_mana_reduction_8", // 10
          "tinker_defense_matrix", // 11
          "tinker_keen_teleport", // 12
          "tinker_defense_matrix", // 13
          "tinker_defense_matrix", // 14
          `special_bonus_unique_tinker_7`, // 15
          "tinker_defense_matrix", // 16
          "special_bonus_attributes", // 17
          "tinker_keen_teleport", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_tinker_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tinker", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [`bottle`, `soul_ring`, `blink`],
          mid_game: [
            `shivas_guard`,
            `black_king_bar`,
            `overwhelming_blink`,
            `sheepstick`,
          ],
          late_game: [
            `phylactery`,
            `ethereal_blade`,
            `ultimate_scepter`,
            `bloodstone`,
            `wind_waker`,
          ],
          situational: [
            `magic_wand`,
            `aether_lens`,
            `force_staff`,
            `kaya_and_sange`,
            `dagon_5`,
            `aeon_disk`,
            `aghanims_shard`,
          ],
          core: [
            "bottle",
            "soul_ring",
            `blink`,
            `shivas_guard`,
            `black_king_bar`,
            `overwhelming_blink`,
            `sheepstick`,
          ],
          neutral: [
            "mysterious_hat",
            `pogo_stick`,
            "philosophers_stone",
            `vambrace`,
            "psychic_headband",
            "ceremonial_robe",
            "timeless_relic",
            `spy_gadget`,
            "seer_stone",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_tinker_3: `Take this level 25 talent over the suggested one if the enemy team has channeling spells you can interrupt, such as Black Hole.`,
    },
    item_tooltips: {
      bottle:
        "A core item that provides you with sustain and allows you to fight with stored rune.",
      soul_ring: "A core item that provides mana sustain.",
      magic_wand: `Comes in handy against a high frequency of spells in lane, such as against Skywrath Mage.`,
      blink: `A core item that allows you to position yourself safe enough in teamfights and while pushing waves.`,
      shivas_guard:
        "A core item for waveclear and AoE damage along with Overwhelming Blink.",
      overwhelming_blink:
        "A core item for waveclear and AoE damage along with Shiva`s Guard.",
      black_king_bar:
        "Against disables, silences, magical damage and as a dispel.",
      ultimate_scepter: `A core damaging item which damage output scales with the current HP of enemy heroes.`,
      aether_lens: `A situational item that goes well with the Aghs scepter build.`,
      sheepstick: "A core item that allows you to chain disable an opponent.",
      aeon_disk: "Provides you with second chance to escape or turn around.",
    },
    combo: [
      `tinker_defense_matrix`,
      `tinker_keen_teleport`,
      `tinker_laser`,
      `shivas_guard`,
      `blink`,
      `tinker_heat_seeking_missile`,
      `tinker_rearm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Tinker is heavy on magic damage and Cloak reduces 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by spell damage so you can keep regenerating while being hit by Tinker`s spells",
          },
          { item: "smoke_of_deceit", info: "To dodge Missiles" },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "blink", info: "To close the gap to Tinker" },
        ],
        support: [
          { item: "glimmer_cape" },
          {
            item: "smoke_of_deceit",
            info: "Smoke to avoid missiles & prevent Blink break on my initiator",
          },
          {
            item: "ward_observer",
            info: "Tinker spots are at the edges of the map",
          },
        ],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          {
            item: "invis_sword",
            info: "To close to gap to Tinker and dodge Missiles",
          },
          { item: "travel_boots" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "sphere" },
          { item: "aeon_disk" },
        ],
        support: [
          {
            item: "smoke_of_deceit",
            info: "Smoke to avoid missiles and prevent Blink break on my initiator",
          },
          {
            item: "ward_observer",
            info: "Tinker spots are at the edges of the map",
          },
          { item: "black_king_bar" },
          { item: "travel_boots" },
        ],
        core: [
          { item: "monkey_king_bar", info: "Against Laser miss rate" },
          { item: "abyssal_blade" },
          {
            item: "satanic",
            info: "For sustain against Tinker`s spell spam and to dispel Laser debuff",
          },
          {
            item: "heart",
            info: "To tank up and recover against Tinker`s spam",
          },
        ],
      },
    },
  },

  Tiny: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964139",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `tiny_tree_grab`, // 1
          "tiny_avalanche", // 2
          "tiny_toss", // 3
          "tiny_avalanche", // 4
          "tiny_avalanche", // 5
          `tiny_grow`, // 6
          "tiny_avalanche", // 7
          "tiny_toss", // 8
          `tiny_toss`, // 9
          `tiny_toss`, // 10
          `special_bonus_movement_speed_20`, // 11
          "tiny_grow", // 12
          "tiny_tree_grab", // 13
          "tiny_tree_grab", // 14
          "special_bonus_unique_tiny", // 15
          "tiny_tree_grab", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tiny_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [`blink`, `force_staff`, `solar_crest`, `octarine_core`],
          late_game: [
            `boots_of_bearing`,
            `ethereal_blade`,
            `sheepstick`,
            `wind_waker`,
          ],
          situational: [
            `tranquil_boots`,
            `spirit_vessel`,
            `invis_sword`,
            `lotus_orb`,
            `heavens_halberd`,
            `black_king_bar`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            "blink",
            "force_staff",
            `solar_crest`,
            `octarine_core`,
            `ethereal_blade`,
            `sheepstick`,
          ],
          neutral: [
            "pogo_stick",
            `faded_broach`,
            "philosophers_stone",
            `bullwhip`,
            `quickening_charm`,
            "ogre_seal_totem",
            `timeless_relic`,
            "spell_prism",
            `giants_ring`,
            `fallen_sky`,
          ],
        },
        ability_tooltips: {
          tiny_tree_grab: `You can skip taking a point in this spell at level 1 if you cannot effectively trade with the enemy support in lane. Level up Toss instead in such a case.`,
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          tranquil_boots: `A situational boots upgrade that helps with hp sustain and increases movement speed significantly.`,
          arcane_boots: `A core boots upgrade to keep your mana up and account for the lack of mana regen items available in shop.`,
          blink:
            "A core item that allows you to initiate and burst an opponent with your combo, or save an ally by tossing him away.",
          wind_waker: `A core item that allows you to setup kills and control an opponent. Also lets you disengage after initiating and move to a safer spot through invulnerability.`,
          force_staff:
            "A core item that adds to mobility and serves as another save for an ally in trouble.",
          lotus_orb: "For support Tiny to reflect, dispel and armor.",
          invis_sword: "Good for finding opponents when they are splitpushing.",
          black_king_bar:
            "Allows you to stay alive after initiating. The Grow ability provides you with a lot of physical resistance through armor and Black King Bar covers most of the spell damage and disables.",
          ethereal_blade:
            "A core item that adds to the burst but can also be used defensively.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729200744",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "tiny_tree_grab", // 1
          "tiny_avalanche", // 2
          "tiny_avalanche", // 3
          "tiny_toss", // 4
          "tiny_avalanche", // 5
          "tiny_grow", // 6
          "tiny_avalanche", // 7
          "tiny_toss", // 8
          "tiny_toss", // 9
          "tiny_toss", // 10
          "special_bonus_strength_10", // 11
          "tiny_grow", // 12
          "tiny_tree_grab", // 13
          "tiny_tree_grab", // 14
          "special_bonus_unique_tiny", // 15
          "tiny_tree_grab", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tiny_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `faerie_fire`,
            `branches`,
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`blink`, `echo_sabre`, `ultimate_scepter`, `lesser_crit`],
          late_game: [
            `black_king_bar`,
            `greater_crit`,
            `harpoon`,
            `octarine_core`,
          ],
          situational: [
            `hand_of_midas`,
            `silver_edge`,
            `aghanims_shard`,
            `assault`,
            `sange_and_yasha`,
            `manta`,
            `force_staff`,
            `sphere`,
            `aeon_disk`,
            `moon_shard`,
            `bloodthorn`,
            `swift_blink`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `blink`,
            `echo_sabre`,
            `ultimate_scepter`,
            `black_king_bar`,
            `greater_crit`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            `pupils_gift`,
            `vambrace`,
            `quickening_charm`,
            `paladin_sword`,
            `penta_edged_sword`,
            `timeless_relic`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
        ability_tooltips: {
          tiny_toss:
            "You can put a first point in this spell earlier than suggested if you see yourself being able to toss the opponents` midlaner under your tower.",
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune.",
          power_treads: `A core boots upgrade to give you some much needed attack speed and manage your mana pool through attribute shift.`,
          blink:
            "A core item that allows you to initiate and burst an opponent with your combo, or save an ally by tossing him away.",
          echo_sabre:
            "A core item that further increases the burst potential of your combo. Improves farming speed. Can be disassembled down the road.",
          hand_of_midas:
            "A situational item that provides attack speed and you mainly buy this if you feel the game has slowed down and will go the distance.",
          orchid:
            "An situational item that gives you good stats as well as mana sustain. Can be taken against elusive heroes to prevent them to run away. Adds up a lot of damage with the Soul Burn. ",
          silver_edge: `A situational item that adds to burst, mobility and applies break effect on hit.`,
          satanic: `A situational item that provides you with good offensive stats. Also serves as a dispel.`,
          assault: `A situational item that increases your attack speed and armor as Tiny lacks both.`,
          sphere: "Against powerful single-target disables and debuffs.",
          black_king_bar:
            "A core item that allows you to deliver the damage while in the middle of the fight. The Grow ability provides you with a lot of physical resistance through armor and Black King Bar covers most of the spell damage and disables.",
          aghanims_shard: `A late game pick up that allows you to have tree equiped non-stop.`,
          moon_shard: `A late game item that provides tons of attack speed.`,
          ultimate_scepter: `A core item in the mid game to signifcantly improve your damage output and burst down pretty much any hero in the game from range.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729201017",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "tiny_tree_grab", // 1
          "tiny_avalanche", // 2
          "tiny_tree_grab", // 3
          "tiny_toss", // 4
          "tiny_tree_grab", // 5
          "tiny_grow", // 6
          "tiny_tree_grab", // 7
          "tiny_avalanche", // 8
          "tiny_avalanche", // 9
          "special_bonus_strength_10", // 10
          "tiny_avalanche", // 11
          "tiny_grow", // 12
          "tiny_toss", // 13
          "tiny_toss", // 14
          "special_bonus_status_resistance_10", // 15
          "tiny_toss", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tiny_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`echo_sabre`, `aghanims_shard`, `blink`, `black_king_bar`],
          late_game: [`greater_crit`, `harpoon`, `satanic`, `moon_shard`],
          situational: [
            `hand_of_midas`,
            `silver_edge`,
            `ultimate_scepter`,
            `assault`,
            `sange_and_yasha`,
            `manta`,
            `skadi`,
            `sphere`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `butterfly`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            "power_treads",
            `echo_sabre`,
            "aghanims_shard",
            `blink`,
            `black_king_bar`,
            `greater_crit`,
            `harpoon`,
            `satanic`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `elven_tunic`,
            `paladin_sword`,
            `penta_edged_sword`,
            `mind_breaker`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
        ability_tooltips: {
          tiny_toss:
            "You can put a first point in this spell earlier than suggested if you see yourself being able to toss an opponents` hero under your tower.",
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune.",
          power_treads:
            "A core boots upgrade that fixes attack speed issues and allows you to save some mana through toggling.",
          echo_sabre:
            "A core item that further increases the burst potential of your combo. Improves farming speed. Can be disassembled down the road.",
          silver_edge: `A situational item that adds to burst, mobility and applies break effect on hit.`,
          aghanims_shard:
            "A core upgrade that allows you to have tree equiped non-stop.",
          sphere: "Against powerful single-target disables and debuffs.",
          black_king_bar:
            "A core item that allows you to deliver the damage while in the middle of the fight. The Grow ability provides you with a lot of physical resistance through armor and Black King Bar covers most of the spell damage and disables.",
          moon_shard: "A core item that provides tons of attack speed.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {},
    combo: [`blink`, `tiny_avalanche`, `tiny_toss`, `attack`],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "infused_raindrop" },
          {
            item: "armor",
            info: "Buy armor items against a core right-clicking Tiny",
          },
          {
            item: "cloak",
            info: "Avalance and Toss combination does a lot of magical damage of which 15% can be reduced by Cloak",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "If Tiny is core he tends to farm very quickly thus blocking the camps with Sentries can slow down his farm",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick", info: "Against core Tiny" },
          { item: "ethereal_blade", info: "Against core Tiny" },
          {
            item: "aeon_disk",
            info: "Prevents Tiny from doing a burst combo and killing you.",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault", info: "Against core Tiny" },
          { item: "shivas_guard", info: "Against core Tiny" },
          { item: "butterfly", info: "Against core Tiny" },
          {
            item: "bloodthorn",
            info: "Against core Tiny to be able to burst him",
          },
        ],
      },
    },
  },

  // YoonA plays hero
  "Treant Protector": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699934294",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `treant_leech_seed`, // 1
          `treant_natures_grasp`, // 2
          `treant_leech_seed`, // 3
          `treant_living_armor`, // 4
          "treant_living_armor", // 5
          "treant_overgrowth", // 6
          "treant_living_armor", // 7
          "treant_living_armor", // 8
          `treant_natures_grasp`, // 9
          `treant_natures_grasp`, // 10
          `treant_natures_grasp`, // 11
          "treant_overgrowth", // 12
          `special_bonus_unique_treant_12`, // 13
          `treant_leech_seed`, // 14
          `special_bonus_unique_treant_9`, // 15
          `treant_leech_seed`, // 16
          "special_bonus_attributes", // 17
          "treant_overgrowth", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_treant_13", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_treant_14`, // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            "orb_of_venom",
            `enchanted_mango`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`pavise`, `aghanims_shard`, `blink`, `force_staff`],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          situational: [
            `soul_ring`,
            `ring_of_basilius`,
            `holy_locket`,
            `guardian_greaves`,
            `meteor_hammer`,
            `solar_crest`,
            `wind_waker`,
            `ghost`,
            `pipe`,
            `lotus_orb`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `pavise`,
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            `quickening_charm`,
            "ceremonial_robe",
            "spy_gadget",
            `spell_prism`,
            "force_field",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic_stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      // arcane_boots: `A core boots upgrade that helps with mana sustain. It can be disassembled and Energy Booster used for Holy Locket. You can upgrade remaining boots to Tranquil Boots.`,
      holy_locket: `A situational healing item.`,
      tranquil_boots: `A core boots upgrade that builds into Boots of Bearing later in the game.`,
      solar_crest: `A situational item to buff one of your right-clicking cores or debuff the target you are focusing. It allows you to kill Roshan faster.`,
      blink:
        "A core item that allows you to get off multi-hero Overgrowth after the opponents have used most of their dispels.",
      aghanims_shard: "A core upgrade that adds to mobility and control.",
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An upgrade for Tranquil Boots that helps immensely in teamfights.`,
      // wraith_pact: `An aura item that makes it hard for the enemy team to fight into your team.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
    },
    combo: [
      `blink`,
      `treant_overgrowth`,
      `meteor_hammer`,
      `treant_natures_grasp`,
      `treant_leech_seed`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "quelling_blade",
            info: "To remove the trees on one side of the lane so Treant Protector has less impact",
          },
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from Treant Protector and offset the slows coming from Treant`s Grasp and Leech Seed",
          },
          {
            item: "boots",
            info: "To keep the distance from Treant Protector and offset the slows coming from Treant`s Grasp and Leech Seed",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }, { item: "cyclone" }],
        support: [
          {
            item: "SentryDustGem",
            info: "Treant players often purchase Aghanim`s Shard which grants him invisibility while near the trees",
          },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Overgrowth" },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: "SentryDustGem",
            info: "Treant players usually take `Natures Guise Invisibility` talent on level 10 and build Aghanim`s Scepter at some point",
          },
          { item: "black_king_bar" },
        ],
        core: [{ item: "satanic", info: "To dispel Overgrowth" }],
      },
    },
  },

  // eidendota plays hero
  "Troll Warlord": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964271",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "troll_warlord_whirling_axes_ranged", // 1
          "troll_warlord_berserkers_rage", // 2
          "troll_warlord_fervor", // 3
          "troll_warlord_whirling_axes_ranged", // 4
          "troll_warlord_whirling_axes_ranged", // 5
          "troll_warlord_battle_trance", // 6
          "troll_warlord_whirling_axes_ranged", // 7
          "troll_warlord_fervor", // 8
          "troll_warlord_berserkers_rage", // 9
          "troll_warlord_berserkers_rage", // 10
          "troll_warlord_berserkers_rage", // 11
          "troll_warlord_battle_trance", // 12
          "troll_warlord_fervor", // 13
          "special_bonus_unique_troll_warlord_2", // 14
          "special_bonus_unique_troll_warlord_5", // 15 Note Michel: Can't skill level 15 before level 10 in Dota 2 guides
          "troll_warlord_fervor", // 16
          "special_bonus_attributes", // 17
          "troll_warlord_battle_trance", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_troll_warlord", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_troll_warlord_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: [
            "power_treads",
            "cornucopia",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: ["bfury", "sange_and_yasha", "black_king_bar", "basher"],
          late_game: ["satanic", "abyssal_blade", "skadi", "butterfly"],
          situational: [
            "infused_raindrop",
            "blink",
            "swift_blink",
            "monkey_king_bar",
            "sphere",
            "silver_edge",
            "ultimate_scepter",
            "bloodthorn",
            "greater_crit",
            "aghanims_shard",
            "maelstrom",
            "manta",
          ],
          core: [
            "bfury",
            "sange_and_yasha",
            "black_king_bar",
            "abyssal_blade",
            "satanic",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "occult_bracelet",
            "ring_of_aquila",
            "orb_of_destruction",
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            "elven_tunic",
            "titan_sliver",
            "paladin_sword",
            "ninja_gear",
            "penta_edged_sword",
            "apex",
            "mirror_shield",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      troll_warlord_berserkers_rage:
        "You can switch between ranged and melee form in laning stage to secure last hits and favourable trading. When farming use ranged form to aggro neutral camps to you faster.",
      troll_warlord_whirling_axes_ranged:
        "Use this ability to secure ranged creeps in the laning stage. After laning stage it is really good for clearing waves and neutral camps.",
      troll_warlord_fervor:
        "Good spell to get a value point in and makes your manfighting and roshing alot better.",
      troll_warlord_battle_trance:
        "You can use this spell to either kill a target faster or survive on low hp for abit longer. Be careful not to use this spell near mobile heroes and get lured into bad spots. Best to use near locked down targets that you can burst down quickly.",
      special_bonus_unique_troll_warlord:
        "You can take this level 10 talent over the suggested one if you are dealing with armor-reducing lineup.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      phase_boots:
        "You want to rush this in the laning stage. If you get it before the enemy offlaner has his spike you can dominate the lane.",
      maelstrom:
        "An alternative to Battle Fury especially good against illusion-based heroes. You will likely need Falcon Blade before it for mana sustain.",
      bfury:
        "A core farming item. Ring of Health should be purchased first on a tough lane.",
      sange_and_yasha:
        "A core item that provides you with useful stats and makes you less kitable. Self heal amplification works well with Battle Trance and Satanic.",
      sphere: "Against powerful single-target disables and debuffs.",
      black_king_bar:
        "A core item that goes well with Battle Trance making you less kitable.",
      basher:
        "A core item that allows you to lock the target you are focusing.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion and miss chance.",
      silver_edge: "For burst, extra mobility and break effect.",
      ultimate_scepter:
        "If there is a need for a dispel for yourself or to dispel an opponent.",
      satanic:
        "A core item that tanks you up and its active can turn the fight around. It applies basic dispel on cast.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Troll Warlod tends to use Whirling Axes frequently to harass and kill creeps",
          },

          {
            item: "wind_lace",
            info: "To keep the distance from Troll and offset the slow coming from Whirling Axes(Ranged)",
          },
          {
            item: "boots",
            info: "To keep the distance from Troll and offset the slow coming from Whirling Axes(Ranged)",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [
          { item: "cyclone" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "force_staff" }, { item: "ghost" }],
        core: [
          { item: "heavens_halberd" },
          { item: "hurricane_pike" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "wind_waker", info: "To save an ally being Battle Tranced" },
        ],
        support: [],
        core: [
          { item: "assault" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "monkey_king_bar" },
        ],
      },
    },
  },

  Tusk: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964354",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "tusk_tag_team", // 1
          "tusk_ice_shards", // 2
          "tusk_snowball", // 3
          "tusk_tag_team", // 4
          "tusk_tag_team", // 5
          "tusk_walrus_punch", // 6
          "tusk_tag_team", // 7
          "tusk_snowball", // 8
          "tusk_snowball", // 9
          "special_bonus_unique_tusk_7", // 10
          "tusk_snowball", // 11
          "tusk_walrus_punch", // 12
          "tusk_ice_shards", // 13
          "tusk_ice_shards", // 14
          "tusk_ice_shards", // 15
          "special_bonus_unique_tusk_2", // 16
          "special_bonus_attributes", // 17
          "tusk_walrus_punch", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tusk_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tusk_6", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`blink`, `solar_crest`, `force_staff`, `aghanims_shard`],
          late_game: [
            `boots_of_bearing`,
            `ultimate_scepter`,
            `lotus_orb`,
            `assault`,
          ],
          situational: [
            `orb_of_corrosion`,
            `guardian_greaves`,
            `pavise`,
            `aether_lens`,
            `glimmer_cape`,
            `ghost`,
            `black_king_bar`,
            `heavens_halberd`,
            `aeon_disk`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            "blink",
            `solar_crest`,
            `force_staff`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `lotus_orb`,
          ],
          neutral: [
            "broom_handle",
            `arcane_ring`,
            "bullwhip",
            "dragon_scale",
            `ceremonial_robe`,
            "ogre_seal_totem",
            `spell_prism`,
            "trickster_cloak",
            `fallen_sky`,
            "force_field",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // NEW GUIDE

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2776954201",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "tusk_tag_team", // 1
          `tusk_snowball`, // 2
          `tusk_tag_team`, // 3
          `tusk_ice_shards`, // 4
          "tusk_tag_team", // 5
          "tusk_walrus_punch", // 6
          "tusk_tag_team", // 7
          "tusk_snowball", // 8
          "tusk_snowball", // 9
          `tusk_snowball`, // 10
          `special_bonus_unique_tusk_7`, // 11
          "tusk_walrus_punch", // 12
          "tusk_ice_shards", // 13
          "tusk_ice_shards", // 14
          `special_bonus_unique_tusk_2`, // 15
          `tusk_ice_shards`, // 16
          "special_bonus_attributes", // 17
          "tusk_walrus_punch", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tusk", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tusk_4", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            "gauntlets",
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `phase_boots`,
            `bracer`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`echo_sabre`, `blink`, `black_king_bar`, `desolator`],
          late_game: [`harpoon`, `ultimate_scepter`, `silver_edge`, `assault`],
          situational: [
            `orb_of_corrosion`,
            `falcon_blade`,
            `soul_ring`,
            `hand_of_midas`,
            `crimson_guard`,
            `pipe`,
            `force_staff`,
            `aghanims_shard`,
            `solar_crest`,
            `heavens_halberd`,
            `lotus_orb`,
            `sphere`,
            `aeon_disk`,
            `moon_shard`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `phase_boots`,
            `echo_sabre`,
            "blink",
            "black_king_bar",
            `desolator`,
            `harpoon`,
            `ultimate_scepter`,
          ],
          neutral: [
            `broom_handle`,
            `duelist_gloves`,
            `orb_of_destruction`,
            `dragon_scale`,
            `cloak_of_flames`,
            `titan_sliver`,
            `mind_breaker`,
            `penta_edged_sword`,
            `fallen_sky`,
            `desolator_2`,
          ],
        },
      },
    ],
    ability_tooltips: {
      tusk_snowball:
        "Consider staying back and saving your teammates rather than initiating all the time. Could be an exceptionally useful skill against some heroes and stop their combo.",
      tusk_walrus_punch:
        "Consider not using your ultimate after you have initiated so you can cancel a tp out while your teammates are closing in on the target.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      orb_of_corrosion:
        "If you can be aggressive on the lane. Armor reduction goes well with Tag Team and Walrush Punch!",
      infused_raindrop: "Against magical burst.",
      phase_boots: `A core item that gives you gap close and some armor for tankiness. The extra damage also goes well with Walrus Punch.`,
      desolator:
        "A core item if you are gonna go for a right click Tusk build. The minus armor and the damage go very well with Walrus Punch.",
      silver_edge:
        "A core item if you are dealing with heroes which passives are hard to deal with. Use Tag Team, then Silver edge and attack an opponent with Walrus Punch.",
      boots_of_bearing: `If you are grouping up a lot as a team in the mid game. Also helps chasing the enemy team as they cannot slow you during the active buff.`,
      blink:
        "A core item for instant initiation to either save an ally with Snowball or setup a kill with Walrus Punch!",
      solar_crest:
        "A core buffing item for one of your right-clicking cores. You can also debuff an opponent or Roshan to get more value out of Tag Team or Walrus Punch!",
      aghanims_shard:
        "A core upgrade of Ice Shards that can be used in various ways to either trap an enemy or save an ally.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `A core item to reposition and isolate an enemy hero at the start of the fight.`,
      moon_shard:
        "A very effective super late game item as it goes very well with your 25 level Walrus Punch talent.",
    },
    combo: [
      `tusk_tag_team`,
      `blink`,
      `tusk_walrus_punch`,
      `tusk_ice_shards`,
      `tusk_snowball`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from Tusk" },
          { item: "boots", info: "To keep the distance from Tusk" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [
          {
            item: "ward_observer",
            info: "To spot Tuskar`s movements on and out of the lane",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "force_staff", info: "To force allies out of shards." },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          {
            item: "blink",
            info: "To lure Tuskar deeper as he snowballs into you.",
          },
          {
            item: "hurricane_pike",
            info: "To use the active and get out of shards.",
          },
        ],
      },
      late_game: { all: [], support: [], core: [{ item: "assault" }] },
    },
  },

  Underlord: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964445",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `abyssal_underlord_firestorm`, // 1
          `abyssal_underlord_atrophy_aura`, // 2
          `abyssal_underlord_firestorm`, // 3
          `abyssal_underlord_atrophy_aura`, // 4
          "abyssal_underlord_firestorm", // 5
          "abyssal_underlord_dark_portal", // 6
          "abyssal_underlord_firestorm", // 7
          "abyssal_underlord_pit_of_malice", // 8
          "abyssal_underlord_pit_of_malice", // 9
          "abyssal_underlord_pit_of_malice", // 10
          "abyssal_underlord_pit_of_malice", // 11
          "abyssal_underlord_dark_portal", // 12
          "special_bonus_unique_underlord_8", // 13
          "abyssal_underlord_atrophy_aura", // 14
          "special_bonus_unique_underlord_5", // 15
          "abyssal_underlord_atrophy_aura", // 16
          "special_bonus_attributes", // 17
          "abyssal_underlord_dark_portal", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_underlord_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_underlord`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "vanguard",
            `soul_ring`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            "rod_of_atos",
            `guardian_greaves`,
            `crimson_guard`,
            `pipe`,
          ],
          late_game: [
            `aghanims_shard`,
            `shivas_guard`,
            `assault`,
            `black_king_bar`,
          ],
          situational: [
            `solar_crest`,
            `lotus_orb`,
            `ultimate_scepter`,
            `force_staff`,
            "blade_mail",
            `overwhelming_blink`,
            "radiance",
            `heavens_halberd`,
            `octarine_core`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `soul_ring`,
            `arcane_boots`,
            `rod_of_atos`,
            `guardian_greaves`,
            `crimson_guard`,
            `pipe`,
            `aghanims_shard`,
          ],
          neutral: [
            `occult_bracelet`,
            "broom_handle",
            `vambrace`,
            `bullwhip`,
            "cloak_of_flames",
            "ogre_seal_totem",
            `havoc_hammer`,
            `timeless_relic`,
            `giants_ring`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* abyssal_underlord_firestorm:
        "You can skill this spell on level 1 instead of the suggested Atrophy Aura if you have a tough match-up. Its very important that you use this before using Pit of Malice to get an extra wave hit.", */
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      soul_ring: "A core item that provides mana sustain and useful stats.",
      /* phase_boots:
        "A core item that fixes movement speed and armor issues of the hero.", */
      rod_of_atos:
        "A core item that synergizes well with Pit of Malice. The full combo would be: Pit of Malice - Firestorm - Rod of Atos - Pit of Malice procs again. You can right-click the opponent few times as well.",
      crimson_guard:
        "Against fast attacking right-clickers, illusions and summons.",
      pipe: "Against heavy magical damage lineup.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      black_king_bar:
        "Against disables, silences, magical damage and as a dispel.",
      guardian_greaves: `A core item that boosts your teamfight potential with auras and sustain.`,
      aghanims_shard: `A core upgrade of Firestorm that increases your overall damage significantly. You can use Firestorm on yourself and move around with it. Goes well with Firestorm talents.`,
      lotus_orb: "To reflect, dispel and armor.",
      assault: `A core late game item that improves your right-click potential while also providing a strong armor aura. It helps with taking buildings down after a won fight along with bonus damage coming from Atrophy Aura.`,
      shivas_guard: `A situational late game pick up that boosts your armor and provides a healing reduction aura against enemy heroes.`,
    },
    combo: [
      `abyssal_underlord_firestorm`,
      `abyssal_underlord_pit_of_malice`,
      `attack`,
      `rod_of_atos`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Underlod tends to use Firestorm every creep wave",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "wind_lace",
            info: "To move out of the Firestorm or run down the Underlord",
          },
          {
            item: "boots",
            info: "To move out of the Firestorm or run down the Underlord",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset some of the HP regeneration and damage this HP hero",
          },
        ],
        support: [],
        core: [
          {
            item: "orb_of_corrosion",
            info: "If you can apply pressure and run him down.",
          },
        ],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "spirit_vessel" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "skadi", info: "To reduce healing" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  // YoonA plays hero
  Undying: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964521",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "undying_decay", // 1
          `undying_tombstone`, // 2
          `undying_decay`, // 3
          `undying_tombstone`, // 4
          "undying_tombstone", // 5
          "undying_flesh_golem", // 6
          "undying_tombstone", // 7
          `undying_soul_rip`, // 8
          `undying_decay`, // 9
          `undying_decay`, // 10
          `special_bonus_unique_undying_8`, // 11
          "undying_flesh_golem", // 12
          `undying_soul_rip`, // 13
          `undying_soul_rip`, // 14
          `undying_soul_rip`, // 15
          `special_bonus_unique_undying_6`, // 16
          "special_bonus_attributes", // 17
          "undying_flesh_golem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_undying_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_undying_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `clarity`,
            `enchanted_mango`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
            `pavise`,
          ],
          late_game: [`force_staff`, `pipe`, `ultimate_scepter`, `refresher`],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `solar_crest`,
            `boots_of_bearing`,
            `vladmir`,
            `ghost`,
            `wind_waker`,
            `lotus_orb`,
            `blade_mail`,
            `crimson_guard`,
            `aeon_disk`,
            `octarine_core`,
            `holy_locket`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `guardian_greaves`,
            `aghanims_shard`,
            `pavise`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            `faded_broach`,
            `dragon_scale`,
            "bullwhip",
            `ogre_seal_totem`,
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            "force_field",
            `giants_ring`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2971195922",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "undying_decay", // 1
          `undying_tombstone`, // 2
          `undying_decay`, // 3
          `undying_tombstone`, // 4
          `undying_decay`, // 5
          "undying_flesh_golem", // 6
          `undying_decay`, // 7
          `undying_tombstone`, // 8
          `undying_tombstone`, // 9
          `special_bonus_unique_undying_8`, // 10
          `undying_soul_rip`, // 11
          "undying_flesh_golem", // 12
          `undying_soul_rip`, // 13
          `undying_soul_rip`, // 14
          `special_bonus_unique_undying`, // 15
          `undying_soul_rip`, // 16
          "special_bonus_attributes", // 17
          "undying_flesh_golem", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_undying_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_undying_4`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `gauntlets`,
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `soul_ring`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `cloak`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `crimson_guard`,
          ],
          late_game: [
            `pipe`,
            `aghanims_shard`,
            `black_king_bar`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `bracer`,
            `phase_boots`,
            `solar_crest`,
            `ancient_janggo`,
            `vladmir`,
            `heavens_halberd`,
            `force_staff`,
            `lotus_orb`,
            `blade_mail`,
            `harpoon`,
            `overwhelming_blink`,
            `aeon_disk`,
            `assault`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `soul_ring`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `crimson_guard`,
            `pipe`,
            `black_king_bar`,
            `octarine_core`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `vambrace`,
            "bullwhip",
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `havoc_hammer`,
            `trickster_cloak`,
            `fallen_sky`,
            `giants_ring`,
          ],
        },
      },
    ],
    ability_tooltips: {
      undying_soul_rip: `You can pick this up earlier at level 2 if you can burst an enemy hero.`,
    },
    item_tooltips: {
      // orb_of_venom: "If you can pressure on the lane.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade for mana sustain. Can build into Guardian Greaves later in the game.`,
      holy_locket: `A situational item that improves healing coming from Soul Rip but also provides you with burst of healing and mana on cast.`,
      // tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
      solar_crest: `A situational buffing item for one of your right-clicking cores. It allows you to take Roshan earlier and faster.`,
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An upgrade for Tranquil Boots that helps immensely in teamfights.`,
      // wraith_pact: `An aura item that makes it hard for the enemy team to fight into your team.`,
      vanguard: `A core item that gives you tankiness and sustain in the early game. On offlane, you should rush this in the lane and play aggressively once you have it.`,
      pipe: `A core item that makes you and allied heroes more tanky against magic damage.`,
      guardian_greaves: `A core item that lets your team play aggressively with auras and sustain.`,
      crimson_guard: `An incredible pick up for Undying that gives a strong physical damage barrier with his high strength.`,
      aghanims_shard: `A core item that gives you a save for yourself or an ally with Tombstone.`,
      ultimate_scepter: `An incredible pick up for Undying to become extremely tanky with Decay while making enemy heroes much weaker.`,
    },
    combo: [
      `undying_tombstone`,
      `undying_flesh_golem`,
      `undying_decay`,
      `undying_soul_rip`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "wind_lace", info: "To keep the distance from Undying" },
          { item: "boots", info: "To keep the distance from Undying" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Soul rip and this high HP hero while in Flesh Golem form",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [{ item: "AttackSpeed", info: "to destroy the Tombstone" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [{ item: "AttackSpeed", info: "to destroy the Tombstone" }],
      },
    },
  },

  // eidendota plays hero
  Ursa: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964646",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "ursa_fury_swipes", // 1
          "ursa_earthshock", // 2
          "ursa_fury_swipes", // 3
          "ursa_overpower", // 4
          "ursa_fury_swipes", // 5
          "ursa_enrage", // 6
          "ursa_fury_swipes", // 7
          "ursa_overpower", // 8
          "ursa_overpower", // 9
          "ursa_overpower", // 10
          "special_bonus_unique_ursa_4", // 11
          "ursa_enrage", // 12
          "ursa_earthshock", // 13
          "ursa_earthshock", // 14
          "special_bonus_unique_ursa_earthshock_furyswipes", // 15
          "ursa_earthshock", // 16
          "special_bonus_attributes", // 17
          "ursa_enrage", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_ursa", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_ursa_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "wraith_band",
            "magic_wand",
            "cornucopia",
          ],
          mid_game: [
            "bfury",
            "blink",
            "black_king_bar",
            "basher",
            "aghanims_shard",
          ],
          late_game: ["satanic", "abyssal_blade", "swift_blink"],
          situational: [
            "diffusal_blade",
            "monkey_king_bar",
            "nullifier",
            "sange_and_yasha",
            "ultimate_scepter",
            "silver_edge",
            "sphere",
            "travel_boots",
          ],
          core: [
            "phase_boots",
            "bfury",
            "blink",
            "black_king_bar",
            "basher",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            //"possessed_mask", Removed in 7.33
            "lance_of_pursuit",
            "ring_of_aquila",
            //"dagger_of_ristul", Removed in 7.33
            "vambrace",
            //"misericorde",
            "elven_tunic",
            "titan_sliver",
            "penta_edged_sword",
            "mind_breaker",
            "desolator_2",
            "force_boots",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      ursa_overpower:
        "Before approaching a target, use Overpower preemptively, so that it is off-cooldown once you jump the target and can be used again.",
    },
    item_tooltips: {
      orb_of_venom: "Start with it if you can pressure on the lane.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion: "If you can pressure on the lane.",
      phase_boots:
        "A core boots upgrade that allows you to gap-close faster and adds to burst.",
      power_treads:
        "A core item if you are going for the Battle Fury build. Can swap between stats and be more mana efficient.",
      lifesteal:
        "Provides your hero with lifesteal that goes very well with the damage stacking from Fury Swipes. Should be upgraded to Satanic down the road.",
      infused_raindrop: "Against magical burst.",
      diffusal_blade:
        "A core item which active allows you to stay on top of the target. With Overpower on you can burn the target`s mana quickly.",
      bfury:
        "Whilst getting Diffusal Blade as a first major item goes along with aggressive approach to the game, getting Battle Fury would be indicative of more steady and farming approach. Ursa should be played with aggressive approach in mind more often than not.",
      blink: "A core item that allows you to gap-close instantly.",
      black_king_bar:
        "A core item that allows you to right-click the opponents in the middle of the fight.",
      aghanims_shard:
        "A core upgrade that you usually get from second Roshan. If that`s not the case, definitely purchase it.",
      basher:
        "A core item that allows you to lock the target you are focusing.",
      satanic:
        "A core item that tanks you up and allows you to stand your ground. Its active applies basic dispel on cast.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive items and spells from opponents that prevent you from right-clicking.",
      ultimate_scepter: "Against long lasting disables.",
    },
    combo: [
      `ursa_overpower`,
      `blink`,
      `ursa_earthshock`,
      `attack`,
      `ursa_overpower`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Ursa and offset the slow coming from Earthshock",
          },
          {
            item: "boots",
            info: "To keep the distance from Ursa and offset the slow coming from Earthshock",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "cyclone",
            info: "Exceptionally useful against Ursa as it serves to Dispel the Overpower attacks or to be used while he is Enraged. The Enraged status resistance does not affect the Eul's active.",
          },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [{ item: "hurricane_pike" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          {
            item: "wind_waker",
            info: "To save an ally from being bursted by Ursa",
          },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Vengeful Spirit": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964761",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `vengefulspirit_magic_missile`, // 1
          `vengefulspirit_wave_of_terror`, // 2
          "vengefulspirit_magic_missile", // 3
          "vengefulspirit_wave_of_terror", // 4
          "vengefulspirit_magic_missile", // 5
          "vengefulspirit_nether_swap", // 6
          "vengefulspirit_magic_missile", // 7
          "vengefulspirit_command_aura", // 8
          "vengefulspirit_wave_of_terror", // 9
          `special_bonus_unique_vengeful_spirit_missile_castrange`, // 10
          `vengefulspirit_wave_of_terror`, // 11
          "vengefulspirit_nether_swap", // 12
          "vengefulspirit_command_aura", // 13
          "vengefulspirit_command_aura", // 14
          `special_bonus_unique_vengeful_spirit_5`, // 15
          `vengefulspirit_command_aura`, // 16
          "special_bonus_attributes", // 17
          "vengefulspirit_nether_swap", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_vengeful_spirit_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_vengeful_spirit_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aghanims_shard`,
            `aether_lens`,
            `boots_of_bearing`,
            `solar_crest`,
          ],
          late_game: [`hurricane_pike`, `ultimate_scepter`, `vladmir`],
          situational: [
            `ring_of_basilius`,
            `solar_crest`,
            `spirit_vessel`,
            `wind_waker`,
            `glimmer_cape`,
            `pipe`,
            `ghost`,
            `guardian_greaves`,
            `heavens_halberd`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aghanims_shard`,
            `aether_lens`,
            `boots_of_bearing`,
            `ultimate_scepter`,
          ],
          neutral: [
            `trusty_shovel`,
            `faded_broach`,
            "philosophers_stone",
            "bullwhip",
            `psychic_headband`,
            `ceremonial_robe`,
            `spy_gadget`,
            `ninja_gear`,
            `apex`,
            `desolator_2`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      boots_of_bearing: `A mid game aura item to boost yourself and your team. Make sure to use a charge before dying as you cannot use it with the aghs illusion.`,
      solar_crest: `A buffing item for one of your right-clicking cores. It can be used offensively to take down an opponent or Roshan faster.`,
      aghanims_shard:
        "A core upgrade to Wave of Terror that reduces the base damage and armor of affected opponents while at the same time buffing you for the same amount.",
      lotus_orb: "For reflect, dispel and armor.",
      vladmir: `An aura item for your team that also works with your aghs illusion. Can upgrade to Wraith Pact.`,
      ultimate_scepter:
        "A core item that allows you to cast spells and right-click even after the death.",
    },
    combo: [
      `vengefulspirit_wave_of_terror`,
      `vengefulspirit_nether_swap`,
      `vengefulspirit_magic_missile`,
      `solar_crest`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Vengeful Spirit`s Wave of Terror is a cheap and short cooldown spell that will be frequently along with Magic Missile",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost", info: "Against core Vengeful Spirit" },
        ],
        core: [
          { item: "heavens_halberd", info: "Against a core Vengeful Spirit" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "assault", info: "Against a core Vengeful Spirit" },
          { item: "butterfly", info: "Against a core Vengeful Spirit" },
        ],
      },
    },
  },

  // YoonA plays hero
  Venomancer: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964844",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `venomancer_venomous_gale`, // 1
          `venomancer_poison_sting`, // 2
          "venomancer_poison_sting", // 3
          `venomancer_venomous_gale`, // 4
          "venomancer_plague_ward", // 5
          `venomancer_noxious_plague`, // 6
          "venomancer_plague_ward", // 7
          `venomancer_plague_ward`, // 8
          `venomancer_plague_ward`, // 9
          `special_bonus_unique_venomancer_poisonsting_regen_reduction`, // 10
          "venomancer_poison_sting", // 11
          `venomancer_noxious_plague`, // 12
          `venomancer_poison_sting`, // 13
          "venomancer_venomous_gale", // 14
          "special_bonus_unique_venomancer_2", // 15
          "venomancer_venomous_gale", // 16
          "special_bonus_attributes", // 17
          `venomancer_noxious_plague`, // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_venomancer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_venomancer", // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            "circlet",
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `arcane_boots`,
            `magic_wand`,
            `wraith_band`,
            `wind_lace`,
          ],
          mid_game: [
            `guardian_greaves`,
            `crimson_guard`,
            `pipe`,
            `ultimate_scepter`,
          ],
          late_game: [
            `hurricane_pike`,
            `octarine_core`,
            `refresher`,
            `overwhelming_blink`,
          ],
          situational: [
            `hand_of_midas`,
            `veil_of_discord`,
            `boots_of_bearing`,
            `lotus_orb`,
            `heavens_halberd`,
            `kaya_and_sange`,
            `solar_crest`,
            `eternal_shroud`,
            `black_king_bar`,
            `ethereal_blade`,
            `cyclone`,
            `sheepstick`,
            `aeon_disk`,
            `sphere`,
            `gungir`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `guardian_greaves`,
            `crimson_guard`,
            `pipe`,
            "ultimate_scepter",
            `octarine_core`,
            `refresher`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            "grove_bow",
            `vampire_fangs`,
            "ceremonial_robe",
            `quickening_charm`,
            "timeless_relic",
            "spell_prism",
            `fallen_sky`,
            "seer_stone",
          ],
        },
        ability_tooltips: {
          /* venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune. You can also put a second point into this spell at level 4 if you are able to play aggressively on the lane.", */
          special_bonus_unique_venomancer_8:
            "Consider skilling this over the suggesting talent in case you want a better base defense and area control rather than a teamfight talent.",
        },
        item_tooltips: {
          travel_boots: `A situational item in games when you do not plan on getting Guardian Greaves. In this case, you can rush this item straight after Vanguard.`,
          spirit_vessel: `A situational item that is good against heavy-healing lineups.`,
          pipe: "Against heavy magical damage lineup.",
          cyclone:
            "A situational item mainly used for dispel or to stop someone from teleporting as you dont have a stun.",
          hurricane_pike: `A core item that can be used as a disengage as Veno is very slow and immobile, he is an easy target once they get close to him. e.g Slark , Ursa, Troll. `,
          heavens_halberd: "Especially good against ranged right-clickers.",
          black_king_bar:
            "Against disables, magical damage and as a dispel. Allows you to stay alive after blinking in the middle of the opponents.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729605047",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `venomancer_venomous_gale`, // 1
          `venomancer_poison_sting`, // 2
          `venomancer_venomous_gale`, // 3
          `venomancer_poison_sting`, // 4
          `venomancer_poison_sting`, // 5
          `venomancer_noxious_plague`, // 6
          `venomancer_poison_sting`, // 7
          "venomancer_plague_ward", // 8
          "venomancer_plague_ward", // 9
          `special_bonus_unique_venomancer_poisonsting_regen_reduction`, // 10
          `venomancer_plague_ward`, // 11
          `venomancer_noxious_plague`, // 12
          `venomancer_plague_ward`, // 13
          "venomancer_venomous_gale", // 14
          "special_bonus_unique_venomancer_2", // 15
          "venomancer_venomous_gale", // 16
          "special_bonus_attributes", // 17
          `venomancer_noxious_plague`, // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_venomancer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_venomancer", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            `urn_of_shadows`,
            `tranquil_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `force_staff`,
            `solar_crest`,
            `boots_of_bearing`,
          ],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `aghanims_shard`,
            `refresher`,
          ],
          situational: [
            "veil_of_discord",
            `spirit_vessel`,
            `glimmer_cape`,
            `lotus_orb`,
            `heavens_halberd`,
            `aether_lens`,
            `guardian_greaves`,
            `pipe`,
            `ethereal_blade`,
            `wind_waker`,
            `sheepstick`,
            `aeon_disk`,
            `blink`,
            `travel_boots`,
          ],
          core: [
            "urn_of_shadows",
            "tranquil_boots",
            `pavise`,
            `force_staff`,
            `solar_crest`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            `philosophers_stone`,
            `bullwhip`,
            `ceremonial_robe`,
            `quickening_charm`,
            `timeless_relic`,
            `spell_prism`,
            `force_field`,
            "seer_stone",
          ],
        },
        ability_tooltips: {
          /* venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune.", */
        },
        item_tooltips: {
          urn_of_shadows:
            "A core item that adds another ``damage over time`` effect to your arsenal. Allows you to snowball off of first kill. It also provides you with useful stats, especially mana regeneration.",
          solar_crest: `A core item to mainly buff a core and to take Roshan more easily.`,
          veil_of_discord:
            "A situational item that makes the enemies take more spell damage and Veno's skill set is mainly spell damage.",
          arcane_boots:
            "A core boots upgrade for mana sustain. It can be disassembled down the road.",
          spirit_vessel:
            "Another ``damage over time`` effect. Especially good against heavy-healing lineup.",
          force_staff:
            "A situational item that can be used as a disangage as Veno is very slow and immobile and also to save your teammates.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      veil_of_discord: `A situational item for spell damage amplification.`,
      blink: `A situational item that allows you to blink in the middle of the opponents team and release Poison Nova.`,
      aghanims_shard: `A situational item to stun enemy heroes with Lotus Orb or BKB.`,
      ultimate_scepter: `A core item to significantly improve your teamfight impact with Poison Nova. Once you have it, you dont mind dying in the middle of the enemy team if it helps get off a fight winning Nova.`,
    },
    combo: [
      `venomancer_venomous_gale`,
      `venomancer_noxious_plague`,
      `urn_of_shadows`,
      `venomancer_plague_ward`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Venomancer tends to plant many Plague Wards and each time it will give you a stick charge",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Venomancer and offset slows coming from Venomous Gale and Poison Sting",
          },
          {
            item: "boots",
            info: "To keep the distance from the Venomancer and offset slows coming from Venomous Gale and Poison Sting",
          },
          {
            item: "cloak",
            info: "Venomancer is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "As long as your Tranquil Boots are active you are going to be able to recover a lot of damage delt to you by Venomancer damage over time spells",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }, { item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Venomous Gale and Poison Sting" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "satanic",
            info: "To dispel Venomous Gale and to recover health during Poison Nova",
          },
        ],
      },
    },
  },

  Viper: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964923",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "viper_poison_attack", // 1
          "viper_corrosive_skin", // 2
          "viper_poison_attack", // 3
          `viper_corrosive_skin`, // 4
          "viper_poison_attack", // 5
          "viper_viper_strike", // 6
          `viper_poison_attack`, // 7
          `viper_nethertoxin`, // 8
          "viper_corrosive_skin", // 9
          `viper_corrosive_skin`, // 10
          `special_bonus_unique_viper_1`, // 11
          "viper_viper_strike", // 12
          `viper_nethertoxin`, // 13
          "viper_nethertoxin", // 14
          `special_bonus_unique_viper_6`, // 15
          "viper_nethertoxin", // 16
          "special_bonus_attributes", // 17
          "viper_viper_strike", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_viper_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_viper_5`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `circlet`,
            `circlet`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `boots`,
            "wind_lace",
            "magic_wand",
            `wraith_band`,
            `wraith_band`,
            `cloak`,
          ],
          mid_game: [`travel_boots`, `ultimate_scepter`, `bloodstone`, `pipe`],
          late_game: [
            `kaya_and_sange`,
            `black_king_bar`,
            `aghanims_shard`,
            `assault`,
          ],
          situational: [
            `ring_of_basilius`,
            "spirit_vessel",
            `eternal_shroud`,
            `manta`,
            `blink`,
            `hurricane_pike`,
            `skadi`,
            `gungir`,
            `lotus_orb`,
            `aeon_disk`,
            `heavens_halberd`,
            `sheepstick`,
            `travel_boots_2`,
          ],
          core: [
            `travel_boots`,
            `ultimate_scepter`,
            `bloodstone`,
            `pipe`,
            `kaya_and_sange`,
            `black_king_bar`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            "grove_bow",
            `vampire_fangs`,
            "enchanted_quiver",
            `paladin_sword`,
            `trickster_cloak`,
            `mind_breaker`,
            `fallen_sky`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          /* urn_of_shadows:
            "A core item that allows you to snowball off of first kill. Provides you with useful stats, namely mana regeneration.", */
          spirit_vessel: "Against heavy-healing lineup.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729605437",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "viper_poison_attack", // 1
          "viper_corrosive_skin", // 2
          "viper_poison_attack", // 3
          `viper_corrosive_skin`, // 4
          "viper_poison_attack", // 5
          "viper_viper_strike", // 6
          `viper_poison_attack`, // 7
          `viper_nethertoxin`, // 8
          "viper_corrosive_skin", // 9
          `viper_corrosive_skin`, // 10
          `special_bonus_unique_viper_1`, // 11
          "viper_viper_strike", // 12
          `viper_nethertoxin`, // 13
          "viper_nethertoxin", // 14
          `special_bonus_unique_viper_6`, // 15
          "viper_nethertoxin", // 16
          "special_bonus_attributes", // 17
          "viper_viper_strike", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_viper_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_viper_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            `boots`,
            "wind_lace",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            `travel_boots`,
            `ultimate_scepter`,
            `cloak`,
            `bloodstone`,
            `eternal_shroud`,
          ],
          late_game: [
            `kaya_and_sange`,
            `black_king_bar`,
            `aghanims_shard`,
            `assault`,
          ],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `blink`,
            `hurricane_pike`,
            `ethereal_blade`,
            `manta`,
            `skadi`,
            `silver_edge`,
            `aeon_disk`,
            `sphere`,
            `lotus_orb`,
            `sheepstick`,
            `gungir`,
            `travel_boots_2`,
          ],
          core: [
            "bottle",
            `travel_boots`,
            `ultimate_scepter`,
            `bloodstone`,
            `eternal_shroud`,
            `kaya_and_sange`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `grove_bow`,
            `vampire_fangs`,
            `enchanted_quiver`,
            `paladin_sword`,
            `trickster_cloak`,
            `mind_breaker`,
            `fallen_sky`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          bottle: `A core item that provides you with sustain and allows you to fight with stored rune.`,
          travel_boots: `A core item that improves your farming speed and mobility around the map.`,
          ultimate_scepter: `A core item that greatly increases your impact in teamfights.`,
          bloodstone: `A core item that sustains you through teamfights. Works incredibly well with Aghanims Scepter.`,
          eternal_shroud: `A core item that improves your tankiness by providing magic resistance.`,
          kaya_and_sange: `A core item that gives you tankiness, sustain and improves your spell damage.`,
        },
      },
    ],
    ability_tooltips: {
      viper_nethertoxin: `Consider putting a point in this spell at level 4 if the enemy laner has a passive you can break. You can also max out this spell in case you cannot fight the enemy heroes with right clicks.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      /* power_treads:
        "A core boots upgrade that provides significant attack speed increase and mana savings through toggling.", */
      wind_lace: `An early game movement speed boost for a slow hero like Viper.`,
      // dragon_lance: `A core item that improves attack range and tankiness.`,
      black_king_bar:
        "A core item against disables, debuffs and as a dispel. Allows you to stand your ground and right-click.",
      skadi:
        "A core item that tanks you up but also makes you less kitable. Reduces healing of the affected hero by a significant amount.",
      aghanims_shard:
        "A core upgrade of Poison Attack. Allows you to deal more damage to heroes and buildings.",
      blink: "For extra mobility.",
      // monkey_king_bar: "Against evasion and miss chance.",
      ethereal_blade: `A situational item that provides you with a boost to your damage with urn and Viper Strike. Also has defensive capabilities.`,
    },
    combo: [
      `bloodstone`,
      `viper_viper_strike`,
      `viper_nethertoxin`,
      `viper_poison_attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "wind_lace", info: "To keep the distance from the Viper" },
          { item: "boots", info: "To keep the distance from the Viper" },
          {
            item: "cloak",
            info: "Viper is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "heavens_halberd", info: "Against physical build on Viper" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "abyssal_blade",
            info: "Against a core right-clicking Viper",
          },
          { item: "butterfly", info: "Against a core right-clicking Viper" },
        ],
      },
    },
  },

  Visage: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965007",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "visage_soul_assumption", // 1
          "visage_grave_chill", // 2
          `visage_gravekeepers_cloak`, // 3
          `visage_grave_chill`, // 4
          "visage_grave_chill", // 5
          "visage_summon_familiars", // 6
          "visage_grave_chill", // 7
          `visage_gravekeepers_cloak`, // 8
          `visage_gravekeepers_cloak`, // 9
          `special_bonus_unique_visage_8`, // 10
          `visage_gravekeepers_cloak`, // 11
          "visage_summon_familiars", // 12
          `visage_soul_assumption`, // 13
          `visage_soul_assumption`, // 14
          `special_bonus_unique_visage_1`, // 15
          `visage_soul_assumption`, // 16
          "special_bonus_attributes", // 17
          "visage_summon_familiars", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_visage_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_visage_6", // 25
        ],
        items: {
          starting: [
            `tango`,
            `branches`,
            "branches",
            "circlet",
            `circlet`,
            `enchanted_mango`,
            `ward_observer`,
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `wind_lace`,
            `blight_stone`,
            `cloak`,
          ],
          mid_game: [
            `boots_of_bearing`,
            `pipe`,
            `aghanims_shard`,
            `solar_crest`,
          ],
          late_game: [`vladmir`, `assault`, `ultimate_scepter`, `sheepstick`],
          situational: [
            `ring_of_basilius`,
            `null_talisman`,
            `crimson_guard`,
            `rod_of_atos`,
            `guardian_greaves`,
            `bloodthorn`,
            `nullifier`,
            `aeon_disk`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `cloak`,
            `boots_of_bearing`,
            `pipe`,
            `aghanims_shard`,
            `vladmir`,
            `sheepstick`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `duelist_gloves`,
            "grove_bow",
            `orb_of_destruction`,
            `paladin_sword`,
            "enchanted_quiver",
            `mind_breaker`,
            `spy_gadget`,
            `desolator_2`,
            `ex_machina`,
          ],
        },
        ability_tooltips: {},
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729605654",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "visage_grave_chill", // 1
          "visage_gravekeepers_cloak", // 2
          "visage_grave_chill", // 3
          `visage_gravekeepers_cloak`, // 4
          "visage_grave_chill", // 5
          "visage_summon_familiars", // 6
          "visage_grave_chill", // 7
          `visage_gravekeepers_cloak`, // 8
          `visage_gravekeepers_cloak`, // 9
          `special_bonus_unique_visage_8`, // 10
          `visage_soul_assumption`, // 11
          "visage_summon_familiars", // 12
          `visage_soul_assumption`, // 13
          `visage_soul_assumption`, // 14
          `special_bonus_unique_visage_1`, // 15
          `visage_soul_assumption`, // 16
          "special_bonus_attributes", // 17
          "visage_summon_familiars", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_visage_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_visage_6", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `falcon_blade`,
            `wind_lace`,
          ],
          mid_game: [
            `ultimate_scepter`,
            `boots_of_bearing`,
            `aghanims_shard`,
            `solar_crest`,
          ],
          late_game: [`sheepstick`, `assault`, `bloodthorn`, `nullifier`],
          situational: [
            `blight_stone`,
            `null_talisman`,
            `vladmir`,
            `black_king_bar`,
            `pipe`,
            `crimson_guard`,
            `aeon_disk`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `falcon_blade`,
            `ultimate_scepter`,
            `boots_of_bearing`,
            `aghanims_shard`,
            `sheepstick`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `duelist_gloves`,
            `grove_bow`,
            `orb_of_destruction`,
            `paladin_sword`,
            `enchanted_quiver`,
            `mind_breaker`,
            `spy_gadget`,
            `desolator_2`,
            `ex_machina`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      // boots: `A core item that can be upgraded to Tranquil Boots if you need sustain on the lane but usually you want to rush other core items.`,
      infused_raindrop:
        "Against magical burst. It can save you a layer of Gravekeeper`s Cloak.",
      ultimate_scepter:
        "A core item that allows you to sneak up to an opponent and provides damage increase upon exiting invisibility.",
      aghanims_shard: `A defensive upgrade that makes you immune for 6s, heal for significant amount and also stun around you upon cast.`,
      black_king_bar: "Against disables, magical damage and as a dispel.",
      sheepstick:
        "A core item that allows you to instantly disable and then burst an opponent.",
      bloodthorn:
        "A core burst item. Goes well with Sycthe of Vyse as the affected opponent can`t dispel it for the duration of disable. Provides true strike.",
      boots_of_bearing: `A mid game upgrade for tranquil boots that benefit you and your Familiars.`,
      blink: `To reposition quickly.`,
    },
    combo: [
      `visage_silent_as_the_grave`,
      `visage_grave_chill`,
      `attack`,
      `visage_soul_assumption`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to remove layers of Gravekeeper`s Cloak",
          },
        ],
        support: [],
        core: [{ item: "vanguard" }],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "lotus_orb" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "crimson_guard" },
          { item: "black_king_bar" },
          { item: "javelin", info: "To remove Gravekeeper`s Cloak layers" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "satanic", info: "To dispel Grave Chill" },
        ],
      },
    },
  },

  "Void Spirit": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965099",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          `void_spirit_aether_remnant`, // 4
          `void_spirit_resonant_pulse`, // 5
          "void_spirit_astral_step", // 6
          `void_spirit_resonant_pulse`, // 7
          "void_spirit_dissimilate", // 8
          `void_spirit_aether_remnant`, // 9
          `void_spirit_aether_remnant`, // 10
          `special_bonus_unique_void_spirit_2`, // 11
          "void_spirit_astral_step", // 12
          `void_spirit_dissimilate`, // 13
          `void_spirit_dissimilate`, // 14
          `special_bonus_unique_void_spirit_dissimilate_outerring`, // 15 Comment Michel: Talent level 1 has to come before talent level 2
          `void_spirit_dissimilate`, // 16
          "special_bonus_attributes", // 17
          "void_spirit_astral_step", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_void_spirit_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_void_spirit_8`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "circlet",
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `magic_wand`,
            `bracer`,
            `wind_lace`,
          ],
          mid_game: [`echo_sabre`, `desolator`, `manta`, `harpoon`],
          late_game: [
            `black_king_bar`,
            `greater_crit`,
            `bloodthorn`,
            `satanic`,
          ],
          situational: [
            `yasha_and_kaya`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `sphere`,
            `dagon_5`,
            `revenants_brooch`,
            `octarine_core`,
            `sheepstick`,
            `mage_slayer`,
            `silver_edge`,
            `skadi`,
            `abyssal_blade`,
            `disperser`,
            `assault`,
            `rapier`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            `power_treads`,
            `echo_sabre`,
            `desolator`,
            `manta`,
            `harpoon`,
            `greater_crit`,
            `bloodthorn`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `paladin_sword`,
            `enchanted_quiver`,
            `penta_edged_sword`,
            `mind_breaker`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2778135054",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          "void_spirit_dissimilate", // 4
          `void_spirit_resonant_pulse`, // 5
          "void_spirit_astral_step", // 6
          `void_spirit_resonant_pulse`, // 7
          `void_spirit_aether_remnant`, // 8
          `void_spirit_aether_remnant`, // 9
          `void_spirit_aether_remnant`, // 10
          `special_bonus_unique_void_spirit_2`, // 11
          "void_spirit_astral_step", // 12
          `void_spirit_dissimilate`, // 13
          `void_spirit_dissimilate`, // 14
          `special_bonus_unique_void_spirit_dissimilate_outerring`, // 15 Comment Michel: Talent level 1 has to come before talent level 2
          `void_spirit_dissimilate`, // 16
          "special_bonus_attributes", // 17
          "void_spirit_astral_step", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_void_spirit_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_void_spirit_8`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `circlet`,
            "circlet",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`echo_sabre`, `desolator`, `manta`, `ultimate_scepter`],
          late_game: [
            `black_king_bar`,
            `harpoon`,
            `greater_crit`,
            `sheepstick`,
          ],
          situational: [
            `vanguard`,
            `arcane_boots`,
            `spirit_vessel`,
            `kaya_and_sange`,
            `aghanims_shard`,
            `sphere`,
            `dagon_5`,
            `revenants_brooch`,
            `octarine_core`,
            `aeon_disk`,
            `wind_waker`,
            `silver_edge`,
            `bloodthorn`,
            `blade_mail`,
            `assault`,
            `rapier`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `wraith_band`,
            "power_treads",
            `echo_sabre`,
            `desolator`,
            `manta`,
            `black_king_bar`,
            `greater_crit`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `paladin_sword`,
            `enchanted_quiver`,
            `penta_edged_sword`,
            `mind_breaker`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
      },
    ],
    ability_tooltips: {
      /* special_bonus_unique_void_spirit_2:
        "On level 15, take the suggested level 15 talent over this level 10 talent. Dota 2 client disallows me to indicate the order in graphics above. At level 16, take this level 10 talent.", */
      void_spirit_dissimilate: `In lanes where you dont have much kill threat, you can put more points in this spell in the early game to improve your farming efficiency along with Resonant Pulse.`,
    },
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      bottle:
        "A core item that helps with sustain and allows you to gank with a stored active rune.",
      power_treads: `A core boots upgrade that makes use of your high right click damage with attack speed. Also provides mana management with attribute shift.`,
      infused_raindrop: "Against magical burst.",
      wind_waker: `A situational item to setup Aether Remnant or to be used as a dispel and disengage in a defensive manner.`,
      travel_boots: `A situational item that allows you to play actively in lanes and join fights.`,
      ultimate_scepter:
        "A core item that icreases AoE damage and adds AoE silence to your arsenal.",
      sphere: "Against powerful single-target disables and debuffs.",
      black_king_bar:
        "Against disables, debuffs, magical damage and as another dispel.",
      kaya_and_sange: `A situational item that provides mix of defensve and offensive stats, namely spell amplification.`,
      aghanims_shard: `A situational upgrade to Aether Remnant for lane shove and more reliability with the disable.`,
      ethereal_blade: `A situational item for additonal burst. Can be used defensively to save yourself or an ally in trouble.`,
      echo_sabre: `A core item that signifcantly improves your damage output in the early game by making use of your high attack damage.`,
      desolator: `A core item that allows you to burst pretty much any hero on the map with your spell combo and right clicks.`,
      manta: `A core item that provides you with some tankiness as well as movement and attack speed. Allows gives you a dispel to get yourself out of trouble.`,
    },
    combo: [
      `void_spirit_astral_step`,
      `void_spirit_aether_remnant`,
      `void_spirit_dissimilate`,
      `void_spirit_resonant_pulse`,
      `void_spirit_astral_step`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "magic_stick",
            info: "Void will use his spells frequently to harass you or to kill the creeps",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "wind_lace",
            info: "To dodge Aether remnant and Dissimilate",
          },
          { item: "boots", info: "To dodge Aether remnant and Dissimilate" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Void Spirit is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
          {
            item: "manta",
            info: "To dispel silences coming from his Aghanim`s Scepter or Orchid",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "invis_sword", info: "To get on top of Void Spirit" },
          {
            item: "nullifier",
            info: "To dispel Resonant Pulse and commonly purchased Eul`s on him",
          },
          { item: "satanic", info: "To dispel silences" },
        ],
      },
    },
  },

  Warlock: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965199",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "warlock_shadow_word", // 1
          "warlock_fatal_bonds", // 2
          "warlock_shadow_word", // 3
          `warlock_upheaval`, // 4
          `warlock_upheaval`, // 5
          "warlock_rain_of_chaos", // 6
          `warlock_upheaval`, // 7
          `warlock_upheaval`, // 8
          "warlock_fatal_bonds", // 9
          `special_bonus_unique_warlock_upheaval_aoe`, // 10
          `warlock_fatal_bonds`, // 11
          "warlock_rain_of_chaos", // 12
          `warlock_fatal_bonds`, // 13
          `warlock_shadow_word`, // 14
          `special_bonus_unique_warlock_10`, // 15
          `warlock_shadow_word`, // 16
          "special_bonus_attributes", // 17
          "warlock_rain_of_chaos", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_warlock_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_warlock_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `clarity`,
            `circlet`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`glimmer_cape`, `pavise`, `aghanims_shard`, `force_staff`],
          late_game: [
            `aether_lens`,
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `hand_of_midas`,
            `holy_locket`,
            `guardian_greaves`,
            `boots_of_bearing`,
            `solar_crest`,
            `ghost`,
            `blink`,
            `aeon_disk`,
            `lotus_orb`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `glimmer_cape`,
            `pavise`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            "arcane_ring",
            `faded_broach`,
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            `psychic_headband`,
            "spy_gadget",
            "spell_prism",
            `force_field`,
            "seer_stone",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_warlock_1:
        "If the opponents are heavy on magical damage, take this level 25 talent instead of the suggested one. Usually the physical damage is prevalent in late game.",
    },
    item_tooltips: {
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Holy Locket. You can assemble Tranquil Boots afterwards or Arcane Boots again.",
      holy_locket: `A situational item that improves healing coming from Shadow Word and its active provides burst of healing and mana.`,
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
      solar_crest: `A situational item to buff one of your right-clicking cores or Golem. You can use it offensively to kill-off an opponent or Roshan faster.`,
      aghanims_shard: `A core upgrade to improve your teamfight impact as well as farming ability.`,
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An incredible late game item to buff your team and the golems in teamfights or when pushing.`,
      pavise: `A core item to gain some mana regen and buff yourself and your cores against physical damage.`,
    },
    combo: [
      `warlock_fatal_bonds`,
      `warlock_rain_of_chaos`,
      `warlock_shadow_word`,
      `warlock_upheaval`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Warlock will use Shadow Word frequently to heal himself or his ally",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "headdress",
            info: "Headdress is good at mitigating the AOE damage done to you and your ally with Fatal Bonds",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "lotus_orb", info: "To dispel Fatal Bonds and Shadow Word" },
          { item: "cyclone", info: "To dispel Fatal Bonds and Shadow Word" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Fatal Bonds and Shadow Word" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "satanic", info: "To dispel Fatal Bonds" }],
      },
    },
  },

  // eidendota plays hero
  Weaver: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965288",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_geminate_attack", // 2
          `weaver_shukuchi`, // 3
          `weaver_the_swarm`, // 4
          "weaver_shukuchi", // 5
          "weaver_time_lapse", // 6
          "weaver_shukuchi", // 7
          "weaver_the_swarm", // 8
          "weaver_the_swarm", // 9
          `special_bonus_strength_9`, // 10
          `weaver_the_swarm`, // 11
          "weaver_time_lapse", // 12
          "weaver_geminate_attack", // 13
          "weaver_geminate_attack", // 14
          "special_bonus_unique_weaver_4", // 15
          "weaver_geminate_attack", // 16
          "special_bonus_attributes", // 17
          "weaver_time_lapse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_weaver_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_weaver_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "blight_stone",
            "blood_grenade",
            "branches",
            `ward_sentry`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "urn_of_shadows",
            "magic_wand",
            `medallion_of_courage`,
          ],
          mid_game: [`solar_crest`, `ultimate_scepter`],
          late_game: [
            "aeon_disk",
            `black_king_bar`,
            `bloodthorn`,
            "sheepstick",
          ],
          situational: [
            `orchid`,
            `spirit_vessel`,
            `heavens_halberd`,
            `cyclone`,
            `ghost`,
            `force_staff`,
            "lotus_orb",
            `ethereal_blade`,
            `wind_waker`,
            `octarine_core`,
            `aghanims_shard`,
            `travel_boots`,
            "sphere",
          ],
          core: [
            "urn_of_shadows",
            `solar_crest`,
            "ultimate_scepter",
            `sheepstick`,
          ],
          neutral: [
            "arcane_ring",
            "trusty_shovel",
            "ring_of_aquila",
            `dragon_scale`,
            //`black_powder_bag`,
            "enchanted_quiver",
            `stormcrafter`,
            //`heavy_blade`,
            "seer_stone",
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          ward_sentry: `Purchase two sentries with the bounty rune gold. One for the lane and the other to block or unblock pull camps.`,
          urn_of_shadows:
            "A core item that allows you to snowball off of first kill on the lane. Provides you with useful stats, namely mana regeneration.",
          spirit_vessel: `A situational item that increases your damage output signifcantly against a heavy-healing lineup.`,
          rod_of_atos: `Provides you with a way to cancel Teleports and helps your team catch up to your initiation.`,
          cyclone:
            "Can be a very useful against debuffs (silences, dust) and if you lack setup. It is also good at dispeling or kiting opponents` heroes like Spirit Breaker, Ursa, Legion Commander and Axe.",
          ultimate_scepter:
            "A core saving item that allows you to use Time Lapse on an ally. Cast range is short so you will need to position yourself well until you get Blink Dagger.",
          blink:
            "A core item that allows you to get Time Lapse off on an ally instantly.",
          aghanims_shard: `A luxury item in the late game when you are out of slots.`,
          lotus_orb: "For reflect, dispel(removes dust) and some armor.",
        },
        ability_tooltips: {
          weaver_geminate_attack:
            "You can skill this spell on level 2 instead of The Swarm if you don`t see yourself being able to land a kill. Having a point in Geminate Attack helps you with harass and it kills-off a courier instantly.",
          special_bonus_unique_weaver_2:
            "You can take this talent on level 20 over the suggested one if you are doing well and can transition in semi-carry with a single-damaging item. You should pick up the Geminate talent on level 25 then as well.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730987049",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_geminate_attack", // 2
          "weaver_shukuchi", // 3
          "weaver_the_swarm", // 4
          "weaver_shukuchi", // 5
          "weaver_time_lapse", // 6
          "weaver_shukuchi", // 7
          "weaver_geminate_attack", // 8
          "weaver_geminate_attack", // 9
          "weaver_geminate_attack", // 10
          `special_bonus_strength_9`, // 11
          "weaver_time_lapse", // 12
          "weaver_the_swarm", // 13
          "weaver_the_swarm", // 14
          "special_bonus_mana_break_20", // 15
          "weaver_the_swarm", // 16
          "special_bonus_attributes", // 17
          "weaver_time_lapse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_weaver_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_weaver_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            `branches`,
            "slippers",
            "circlet",
            `faerie_fire`,
          ],
          early_game: [
            `wraith_band`,
            `magic_wand`,
            `maelstrom`,
            "power_treads",
          ],
          mid_game: ["mjollnir", `black_king_bar`, `skadi`],
          late_game: ["greater_crit", "satanic", `aghanims_shard`, "butterfly"],
          situational: [
            `monkey_king_bar`,
            `ring_of_basilius`,
            `gungir`,
            `mjollnir`,
            "sphere",
            "hurricane_pike",
            `diffusal_blade`,
            `sange_and_yasha`,
            `manta`,
            `bloodthorn`,
            "nullifier",
            `moon_shard`,
            `travel_boots`,
          ],
          core: [
            `maelstrom`,
            "power_treads",
            "dragon_lance",
            "skadi",
            "greater_crit",
            `satanic`,
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            `lance_of_pursuit`,
            "occult_bracelet",
            `ring_of_aquila`,
            "grove_bow",
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
            "ninja_gear",
            //`heavy_blade`,
            //`flicker`,
            "mirror_shield",
            "desolator_2",
            "pirate_hat",
          ],
        },
        item_tooltips: {
          falcon_blade: `Rush this item before anything else in the lane. It helps immensely with scaling in the early game.`,
          power_treads:
            "A core boots upgrade that increases your attack speed significantly and saves mana through toggling. Having Power Treads on strength is extra 200hp that might just be enough to get Time Lapse off.",
          maelstrom:
            "A core farming item that procs frequently due to Geminate Attack. It is particularly good against illusion-based heroes. Every time lightning procs, you can`t miss on that attack. It should be upgraded to Mjollnir in late game.",
          sphere:
            "An alternative to Black King Bar against powerful single-target disables and debuffs.",
          dragon_lance:
            "A core item that provides you with useful stats and improves attack range. Can be disassembled for faster Black King Bar timing and assembled again afterwards.",
          black_king_bar:
            "A core item that allows you to deliver the damage. Sometimes Linken`s Sphere might be a better choice(Spirit Breaker, Doom).",
          aghanims_shard: "Increases your dps and deals with invisible heroes.",
          hurricane_pike:
            "Worth considering against heroes like Slark and Troll to create gap.",
          skadi:
            "A core item that tanks you up and messes with opponents healing, attack and movement speed.",
          monkey_king_bar:
            "Against a lot of evasion and miss chance although Maelstrom and Mjollnir pierce have true strike on ever proc.",
          greater_crit: "A core damaging item of choice.",
          gungir: `You can get this if your team lacks stuns for you to hit them more frequently in fights.`,
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponents.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
    },
    combo: [
      `weaver_shukuchi`,
      `weaver_the_swarm`,
      `weaver_geminate_attack`,
      `weaver_shukuchi`,
      `attack`,
      `weaver_time_lapse`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Weaver will use Shukuchi frequently to harass you or escape",
          },
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [
          { item: "ward_sentry" },
          { item: "dust", info: "Dust can be dispeled by Time Lapse" },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "SentryDustGem" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [{ item: "orchid" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "SentryDustGem" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
          {
            item: "silver_edge",
            info: "To get on top of Weaver, to remove the bugs and break the passive",
          },
        ],
      },
    },
  },

  Windranger: {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965445",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "windrunner_windrun", // 1
          "windrunner_powershot", // 2
          "windrunner_powershot", // 3
          "windrunner_shackleshot", // 4
          "windrunner_powershot", // 5
          "windrunner_focusfire", // 6
          "windrunner_powershot", // 7
          "windrunner_windrun", // 8
          "windrunner_windrun", // 9
          "windrunner_windrun", // 10
          "special_bonus_unique_windranger_9", // 11
          "windrunner_focusfire", // 12
          "windrunner_shackleshot", // 13
          "windrunner_shackleshot", // 14
          "special_bonus_unique_windranger_4", // 15
          "windrunner_shackleshot", // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_windranger_windrun_undispellable", // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            "blood_grenade",
            "ward_sentry",
            "ward_observer",
            "branches",
            "branches",
            "circlet",
          ],
          early_game: ["bracer", "magic_stick", "boots"],
          mid_game: ["maelstrom", "blink", "aghanims_shard"],
          late_game: [
            "black_king_bar",
            "octarine_core",
            "sheepstick",
            "aeon_disk",
            "ultimate_scepter",
            "hurricane_pike",
          ],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "lotus_orb",
            "solar_crest",
            "aether_lens",
            "cyclone",
            "travel_boots",
            "meteor_hammer",
            "tranquil_boots",
            "arcane_boots",
            "pavise",
          ],

          core: [
            "boots",
            "magic_stick",
            "maelstrom",
            "blink",
            "aghanims_shard",
          ],
          neutral: [
            "arcane_ring",
            "lance_of_pursuit",
            "philosophers_stone",
            "grove_bow",
            "quickening_charm",
            "psychic_headband",
            "timeless_relic",
            "spy_gadget",
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          urn_of_shadows:
            "A core item that allows you to snowball off of first kill. Provides useful stats, namely mana regeneration.",
          arcane_boots:
            "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots usually.",
          force_staff:
            "Great all around item for saving yourself and your allies.",
          maelstrom:
            "It's not an item for everygame but if you are snowballing and can get it at a decent time it's really good.",
          spirit_vessel: "Against heavy-healing lineup.",
          aether_lens:
            "Good item for windranger increasing the range of her spells and items.",
          aghanims_shard:
            "A core upgrade that provides more control in the fights.",
          lotus_orb: "For reflect, dispel and armor.",
          octarine_core:
            "A core item that reduces cooldown of spells and items.",
          medallion_of_courage:
            "Great buildup as the orb of destruction is quite good in the lane and all around good item for the game.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730986384",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "windrunner_powershot", // 1
          "windrunner_windrun", // 2
          "windrunner_powershot", // 3
          "windrunner_shackleshot", // 4
          "windrunner_powershot", // 5
          "windrunner_focusfire", // 6
          "windrunner_powershot", // 7
          "windrunner_windrun", // 8
          "windrunner_windrun", // 9
          "windrunner_windrun", // 10
          "windrunner_shackleshot", // 11
          "windrunner_focusfire", // 12
          "windrunner_shackleshot", // 13
          "windrunner_shackleshot", // 14
          "special_bonus_unique_windranger_9", // 15
          "special_bonus_unique_windranger_4", // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_windranger_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "power_treads",
            "bracer",
            "magic_wand",
            "maelstrom",
          ],
          mid_game: ["gungir", "black_king_bar", "lesser_crit", "blink"],
          late_game: ["ultimate_scepter", "greater_crit"],
          situational: [
            "monkey_king_bar",
            "sheepstick",
            "sphere",
            "bloodthorn",
            "mjollnir",
            "infused_raindrop",
            "silver_edge",
            "aghanims_shard",
            "nullifier",
            "diffusal_blade",
            "hurricane_pike",
          ],
          core: [
            "maelstrom",
            "black_king_bar",
            "blink",
            "greater_crit",
            "ultimate_scepter",
          ],
          neutral: [
            "lance_of_pursuit",
            "unstable_wand",
            "grove_bow",
            //"misericorde",
            "specialists_array",
            "orb_of_destruction",
            "enchanted_quiver",
            "titan_sliver",
            "mind_breaker",
            "spell_prism",
            //"heavy_blade",
            "mirror_shield",
            "desolator_2",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that helps with sustain and allows you to gank with a stored active rune. Try get it before 2:00 minute mark.",
          power_treads:
            "A core item that helps with farming speed and efficiency in the early game.",
          maelstrom:
            "A core farming item but also kill item. Maelstrom procs very often during Focus Fire. Whenever it procs, that attack can`t miss.",
          black_king_bar:
            "A core item that allows you to burst an opponent during Focus Fire.",
          sphere: "Against powerful single-target disables and debuffs.",
          travel_boots: "A core item that allows you to cover the map better.",
          silver_edge: "For burst, reposition and break effect.",
          aghanims_shard: "If you need more control in the fights.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
          monkey_king_bar:
            "A core major damaging item of choice. It procs frequently during Focus Fire and procs pierce spell-immunity. It deals with evasion and miss chance as well.",
          ultimate_scepter: "A core item that makes you more elusive.",
          greater_crit: "Mass DPS.",
        },
        ability_tooltips: {
          windrunner_shackleshot:
            "You can just get a value point in this on level 4 in order to setup ganks or catch targets out of position at runes during the laning stage. Throughout the game it will be your main disable to kill enemies",
          windrunner_powershot:
            "Use this spell to secure ranged creeps and harras the enemy hero during the laning stage. After the laning stage use it for farming and pushing in unsafe waves.",
          windrunner_windrun:
            "Using this spell at the right time during the laning stage can be the difference in dying or getting a kill. Your main escape before any mobility items.",
          windrunner_focusfire:
            "Once you have javelin focus fire will do a ton of damage and kill most heroes without escape.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730986473",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "windrunner_powershot", // 1
          "windrunner_windrun", // 2
          "windrunner_powershot", // 3
          "windrunner_shackleshot", // 4
          "windrunner_powershot", // 5
          "windrunner_focusfire", // 6
          "windrunner_powershot", // 7
          "windrunner_windrun", // 8
          "windrunner_windrun", // 9
          "windrunner_windrun", // 10
          "windrunner_shackleshot", // 11
          "windrunner_focusfire", // 12
          "windrunner_shackleshot", // 13
          "windrunner_shackleshot", // 14
          "special_bonus_unique_windranger_9", // 15
          "special_bonus_unique_windranger_4", // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_windranger_windrun_undispellable", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "branches",
            "circlet",
            "circlet",
          ],
          early_game: ["wraith_band", "bracer", "power_treads", "magic_wand"],
          mid_game: ["maelstrom", "gungir", "black_king_bar", "blink"],
          late_game: [
            "greater_crit",
            "sheepstick",
            "travel_boots",
            "ultimate_scepter",
          ],
          situational: [
            "infused_raindrop",
            "monkey_king_bar",
            "sphere",
            "silver_edge",
            "nullifier",
            "bloodthorn",
            "refresher",
          ],
          core: [
            "gungir",
            "black_king_bar",
            "blink",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "arcane_ring",
            "unstable_wand",
            "grove_bow",
            "orb_of_destruction",
            "specialists_array",
            //"misericorde",
            "enchanted_quiver",
            "spell_prism",
            "mind_breaker",
            //"heavy_blade",
            "desolator_2",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          power_treads:
            "A core item that makes you stronger in the lane and midgame. Make sure to tread switch for efficiency.",
          maelstrom:
            "A core farming item but also kill item. Maelstrom procs very often during Focus Fire. Whenever it procs, that attack can`t miss.",
          black_king_bar:
            "A core item that allows you to burst an opponent during Focus Fire.",
          sphere: "Against powerful single-target disables and debuffs.",
          travel_boots: "A core item that allows you to cover the map better.",
          aghanims_shard: "A core item for more control in the fights.",
          silver_edge: "For burst, reposition and break effect.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
          monkey_king_bar:
            "A core major damaging item of choice. It procs frequently during Focus Fire and procs pierce spell-immunity. It deals with evasion and miss chance as well.",
          ultimate_scepter: "A core item that makes you more elusive.",
        },
        ability_tooltips: {
          windrunner_shackleshot:
            "You'll get a value point in this and max it later. Use it to setup kills on enemy heroes when allies gank.",
          windrunner_powershot:
            "You should use this to secure ranged creeps during the laning stage, Try to lasthit the ranged creep and hit the enemy heroes at the same time.",
          windrunner_windrun:
            "Save this for the right moments during the lane.",
          windrunner_focusfire:
            "As soon as focus fire comes online and you have javelin you have a very high kill potential.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      blink: "A core item that allows you to land Shackleshot reliably.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Windranger",
          },
          { item: "boots", info: "To keep the distance from the Windranger" },
          { item: "armor", info: "Buy armor items" },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "blade_mail" },
          { item: "orchid" },
          { item: "heavens_halberd" },
          { item: "hurricane_pike" },
          { item: "ghost" },
          { item: "black_king_bar" },
          { item: "monkey_king_bar" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [
          {
            item: "SentryDustGem",
            info: "She often times gets `Windrun grants invisibility` talent on level 25",
          },
          { item: "black_king_bar" },
        ],
        core: [
          { item: "monkey_king_bar" },
          { item: "abyssal_blade" },
          { item: "bloodthorn" },
          { item: "assault" },
          { item: "butterfly" },
          { item: "nullifier", info: "To dispel Windrun" },
        ],
      },
    },
  },

  // YoonA plays hero
  "Winter Wyvern": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965518",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "winter_wyvern_arctic_burn", // 1
          "winter_wyvern_splinter_blast", // 2
          "winter_wyvern_splinter_blast", // 3
          `winter_wyvern_arctic_burn`, // 4
          "winter_wyvern_splinter_blast", // 5
          "winter_wyvern_winters_curse", // 6
          "winter_wyvern_splinter_blast", // 7
          "winter_wyvern_cold_embrace", // 8
          "winter_wyvern_cold_embrace", // 9
          "winter_wyvern_cold_embrace", // 10
          `winter_wyvern_cold_embrace`, // 11
          "winter_wyvern_winters_curse", // 12
          `special_bonus_unique_winter_wyvern_5`, // 13
          "winter_wyvern_arctic_burn", // 14
          `special_bonus_unique_winter_wyvern_2`, // 15
          `winter_wyvern_arctic_burn`, // 16
          "special_bonus_attributes", // 17
          "winter_wyvern_winters_curse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_winter_wyvern_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_winter_wyvern_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            `blink`,
            `aghanims_shard`,
            "force_staff",
          ],
          late_game: [
            "aeon_disk",
            "octarine_core",
            "ultimate_scepter",
            "sheepstick",
          ],
          situational: [
            `ring_of_basilius`,
            `holy_locket`,
            `pavise`,
            `glimmer_cape`,
            `refresher`,
            `bloodthorn`,
            `revenants_brooch`,
            `wind_waker`,
            "lotus_orb",
            `ghost`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `tranquil_boots`,
            "blink",
            "aghanims_shard",
            `force_staff`,
          ],
          neutral: [
            `faded_broach`,
            `pogo_stick`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      winter_wyvern_cold_embrace: `Take this ability on level 3 or 4 when facing a tough lane and having to heal yourself or your carry a lot.`,
      // special_bonus_unique_winter_wyvern_5: `On level 15, take the suggested level 15 talent over this level 10 talent. Dota 2 client disallows me to indicate the order in graphics above. At level 16, take this level 10 talent.`,
    },
    item_tooltips: {
      ring_of_basilius:
        "Start with it if your laning partner also uses a lot of mana.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should assemble Tranquil Boots afterwards.`,
      holy_locket: `A situational item that improves healing coming from Cold Embrace. It also provides burst of healing and mana on cast.`,
      blink:
        "Allows you to seize a moment when opponent`s are stacked up and cast Winter`s Curse or to quickly reposition close to an ally that needs Cold Embrace save.",
      aghanims_shard:
        "A core upgrade for Cold Embrace. Adds to AoE damage in the fights but also improves waveclear.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `winter_wyvern_arctic_burn`,
      `winter_wyvern_winters_curse`,
      `winter_wyvern_splinter_blast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and for Pipe of Insight later on",
          },
          {
            item: "infused_raindrop",
            info: `It helps against the Winter Wyvern magical nukes`,
          },
          {
            item: "cloak",
            info: "Void Spirit is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          { item: "wind_waker", info: "To save an ally being Winter`s Cursed" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "invis_sword", info: "To get on top of Winter Wyvern" }],
      },
    },
  },

  "Witch Doctor": {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957031",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "witch_doctor_paralyzing_cask", // 1
          "witch_doctor_maledict", // 2
          "witch_doctor_maledict", // 3
          "witch_doctor_paralyzing_cask", // 4
          "witch_doctor_maledict", // 5
          "witch_doctor_death_ward", // 6
          "witch_doctor_maledict", // 7
          "witch_doctor_paralyzing_cask", // 8
          "witch_doctor_paralyzing_cask", // 9
          "special_bonus_unique_witch_doctor_6", // 10
          "witch_doctor_voodoo_restoration", // 11
          "witch_doctor_death_ward", // 12
          "witch_doctor_voodoo_restoration", // 13
          "witch_doctor_voodoo_restoration", // 14
          "special_bonus_unique_witch_doctor_3", // 15
          "witch_doctor_voodoo_restoration", // 16
          "special_bonus_attributes", // 17
          "witch_doctor_death_ward", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_witch_doctor_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_witch_doctor_5", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`aghanims_shard`, `glimmer_cape`, `force_staff`, `pavise`],
          late_game: [
            `ultimate_scepter`,
            `blink`,
            `aeon_disk`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `aether_lens`,
            `solar_crest`,
            `spirit_vessel`,
            `wind_waker`,
            `ghost`,
            "lotus_orb",
            "black_king_bar",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aghanims_shard`,
            `glimmer_cape`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            `pupils_gift`,
            `psychic_headband`,
            `ceremonial_robe`,
            `timeless_relic`,
            `spy_gadget`,
            "seer_stone",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      witch_doctor_voodoo_restoration:
        "You can take a point in this spell on level 2 already if you have a tough lane. Don`t take more than one.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots usually.",
      spirit_vessel:
        "Against heavy healing lineup and to increase the damage of Maledict.",
      glimmer_cape: "A core item that can be used while channeling Death Ward.",
      aether_lens: "A core item that improves cast range.",
      aghanims_shard:
        "A core upgrade that adds another layer of survivability while at the same time inflicting some damage.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter:
        "A core damaging item in late game. Allows Death Ward attacks to bounce and pierce evasion. Goes well with Death Ward talents.",
      black_king_bar:
        "To be able to channel Death Ward fully. Goes well with Aghanim`s Scepter.",
      blink: "For extra mobility to get your spells off.",
    },
    combo: [
      `witch_doctor_paralyzing_cask`,
      `witch_doctor_maledict`,
      `witch_doctor_death_ward`,
      `witch_doctor_voodoo_restoration`,
      `glimmer_cape`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Witch Doctor be able to split away from other units when being casked or run away from Death Ward",
          },
          {
            item: "boots",
            info: "To keep the distance from the Witch Doctor be able to split away from other units when being casked or run away from Death Ward",
          },
          { item: "armor", info: "Buy armor items" },
          {
            item: "infused_raindrop",
            info: "Maledict does more damage as you lose more HP. Raindrops will save you from some magical damage from Maledict ticks",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  // eidendota plays hero
  "Wraith King": {
    gameplay_version: "7.33c",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699919868",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "skeleton_king_hellfire_blast", // 1
          "skeleton_king_vampiric_aura", // 2
          "skeleton_king_mortal_strike", // 3
          "skeleton_king_vampiric_aura", // 4
          "skeleton_king_vampiric_aura", // 5
          "skeleton_king_reincarnation", // 6
          "skeleton_king_vampiric_aura", // 7
          "skeleton_king_mortal_strike", // 8
          "skeleton_king_mortal_strike", // 9
          "skeleton_king_mortal_strike", // 10
          "special_bonus_unique_wraith_king_vampiric_skeleton_duration", // 11
          "skeleton_king_reincarnation", // 12
          "skeleton_king_hellfire_blast", // 13
          "skeleton_king_hellfire_blast", // 14
          "skeleton_king_hellfire_blast", // 15
          "special_bonus_unique_wraith_king_11", // 16
          "special_bonus_attributes", // 17
          "skeleton_king_reincarnation", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_25", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_wraith_king_10", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "gauntlets",
            "circlet",
          ],
          early_game: [
            "phase_boots",
            "helm_of_iron_will",
            "armlet",
            "magic_wand",
            "bracer",
          ],
          mid_game: ["desolator", "blink", "black_king_bar", "assault"],
          late_game: ["overwhelming_blink", "abyssal_blade", "bloodthorn"],
          situational: [
            "silver_edge",
            "skadi",
            "aghanims_shard",
            "monkey_king_bar",
            "nullifier",
            "radiance",
            "bloodthorn",
            "swift_blink",
            "hand_of_midas",
            "manta",
            "ultimate_scepter",
          ],
          core: [
            "armlet",
            "desolator",
            "blink",
            "black_king_bar",
            "assault",
            "basher",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            "vambrace",
            "orb_of_destruction",
            "elven_tunic",
            "titan_sliver",
            "paladin_sword",
            "mind_breaker",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      skeleton_king_hellfire_blast:
        "You should use your stun to secure ranged creeps during the laning stage.",
      skeleton_king_vampiric_aura:
        "Use your skeleton charges to push out waves when you leave your lane and during the mid game.",
      skeleton_king_mortal_strike:
        "Try use the extra damage from the guaranteed crit to secure last hits and extra harras during the lane.",
      skeleton_king_reincarnation:
        "You should save a spell point at level 6 and invest it in Reincarnation if you are being ganked and if you can escape with second life. Otherwise, if you end up jungling, you can invest points in Mortal Strike or Vampiric Spirit.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      phase_boots:
        "A core boots upgrade that fixes movement speed and armor issues that Wraith King has.",
      armlet:
        "A core item that provides you with useful stats. The hp loss is offset by Vampiric Spirit. On a tough lane, get Helm of the Iron Will first even before boots.",
      desolator:
        "A core damaging item that provides burst, tower damage and Roshan killing potential.",
      silver_edge: "For burst, to reposition and break effect.",
      blink: "A core item for instant jump on desired target.",
      black_king_bar:
        "A core item that allows you to deliver the damage while in the middle of the fight.",
      assault:
        "A core item that provides much needed attack speed and armor. Armor reduction goes up to -11 combined with Desolator.",
      swift_blink:
        "For single-target burst. Great when you need to sell or backpack boots in late game.",
      overwhelming_blink: "For AoE damage and tankiness.",
      aghanims_shard: "If opponents have mana burn.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Wraith King",
          },
          { item: "boots", info: "To keep the distance from the Wraith King" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against this high HP hero and Vampiric Aura",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [{ item: "hurricane_pike" }, { item: "diffusal_blade" }],
      },
      late_game: {
        all: [{ item: "ethereal_blade" }, { item: "aeon_disk" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "skadi", info: "To reduce healing" },
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "silver_edge" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  Zeus: {
    gameplay_version: `7.33c`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699919737",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "zuus_arc_lightning", // 1
          "zuus_heavenly_jump", // 2
          "zuus_arc_lightning", // 3
          `zuus_lightning_bolt`, // 4
          "zuus_arc_lightning", // 5
          "zuus_thundergods_wrath", // 6
          "zuus_arc_lightning", // 7
          `zuus_lightning_bolt`, // 8
          `zuus_lightning_bolt`, // 9
          `zuus_lightning_bolt`, // 10
          `special_bonus_hp_250`, // 11
          "zuus_thundergods_wrath", // 12
          `zuus_heavenly_jump`, // 13
          `zuus_heavenly_jump`, // 14
          "special_bonus_unique_zeus_jump_postjump_movespeed", // 15
          "zuus_lightning_bolt", // 16
          "special_bonus_attributes", // 17
          "zuus_thundergods_wrath", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_zeus_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_zeus_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `arcane_boots`,
            `null_talisman`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`phylactery`, `kaya_and_sange`, `aghanims_shard`, `manta`],
          late_game: [
            `bloodstone`,
            `ultimate_scepter`,
            `octarine_core`,
            `travel_boots`,
          ],
          situational: [
            `power_treads`,
            `witch_blade`,
            `aether_lens`,
            `cyclone`,
            `blink`,
            `ethereal_blade`,
            `sphere`,
            `aeon_disk`,
            `black_king_bar`,
            `refresher`,
            `hurricane_pike`,
            `moon_shard`,
            `travel_boots_2`,
          ],
          core: [
            "bottle",
            "arcane_boots",
            `phylactery`,
            `kaya_and_sange`,
            `aghanims_shard`,
            `manta`,
            `bloodstone`,
            `ultimate_scepter`,
            "octarine_core",
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            `grove_bow`,
            `vambrace`,
            `ceremonial_robe`,
            "psychic_headband",
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            "force_boots",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with Magic Stick if you expect high frequency of spells being used on the lane.`,
      bottle:
        "A core item that helps with sustain and allows you to gank with a stored active rune.",
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade for mana sustain. It can be disassembled and Energy Booster used for Octarine Core, Bloodstone, or Aether Lens.`,
      aether_lens: `A situational item that improves cast range and provides mana regen.`,
      travel_boots:
        "A core boots upgrade that allows you to cover the map better and get in position to cast spells faster.",
      ethereal_blade: `A situational item upgrade that increases your damage output greatly and can potentially be used defensively.`,
      ultimate_scepter:
        "A core upgrade that adds another global spell to your arsenal. It is especially good for canceling teleports and channeling spells but also for scouting and waveclearing. Dont take it versus an illusion based line up.",
      aghanims_shard: `A core item to improve your damage output and farming speed with Arc Lightning on right clicks. Goes extremely well with Manta Style.`,
      manta: `A core item to pair with the Aghanim Shard upgrade on Zeus. Improves your damage output in fights and also allows you to push out lanes safely.`,
      power_treads: `A situational boots upgrade in the early game that goes well with the right click Zeus build.`,
      witch_blade: `A situational item to boost your right click damage in the early game and transition towards getting the Aghanim Shard.`,
      hurricane_pike: `A situational item that gives you attack range for the Aghanim Shard right clicks. Also serves as a great mobility tool.`,
      refresher:
        "A core item that allows you to cast two rounds of spells and items quickly.",
      octarine_core: `A core item that reduces cooldown of spells and items.`,
      blink: "For extra mobility.",
    },
    combo: [
      `zuus_heavenly_jump`,
      `zuus_lightning_bolt`,
      `zuus_arc_lightning`,
      `zuus_thundergods_wrath`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Zeus will use Arc Lightning frequently to secure creep lasthits and to harass you",
          },
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Zeus is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate from spells so you can keep regenerating while being hit by Zeus spells",
          },
          {
            item: "smoke_of_deceit",
            info: "To dodge damage from Thundergod`s Wrath",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "blink", info: "To close the gap to Zeus" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          /* { item: "hood_of_defiance" }, */
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "mage_slayer" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "silver_edge",
            info: "To get on top of Zeus, avoid being damaged by Thundergod`s Wrath while invisible and as bonus to break his passive",
          },
        ],
      },
    },
  },
};
