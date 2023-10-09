/* eslint-disable @typescript-eslint/no-namespace */
/**
 * This library is used to access static Dota 2 data on Heroes, Items and Abilities.
 *
 * Dynamic data such as data from Open Dota are not covered by this module.
 *
 * (C) Dota Coach, 2023
 */
import * as HeroBuilds from "./heroBuilds";
import { dispellableBuffs } from "./dispellableBuffs";
import dota2Abilities from "./dota2Abilities.json"; //assert { type: "json" };
import dota2Items from "./dota2Items.json"; //assert { type: "json" };
import dota2Heroes from "./dota2Heroes.json"; //assert { type: "json" };
// disables should be removed once the second screen is redesigned and moved to react. Currently only used by the second screen
import { channeling_interrupts, silence, root, disables } from "./disables";
import * as PlayerRoles from "./playerRoles";
import {
  IUIItem,
  IUIAbility,
} from "../../submodules/utilities/react/dota/Types";
import * as DotaCoachUI from "../../submodules/utilities/dotaCoachUI"; // This should be replaced as well, TO BE DONE
import i18nDota from "./i18n/en/dota.json";
import * as DotaLogger from "../../submodules/utilities/log";

// Version node.js
/*import * as HeroBuilds from "./heroBuilds.js";
import { dispellableBuffs } from "./dispellableBuffs.js";
import dota2Abilities from "./dota2Abilities.json" assert { type: "json" };
import dota2Items from "./dota2Items.json" assert { type: "json" };
import dota2Heroes from "./dota2Heroes.json" assert { type: "json" };
import * as DotaLogger from "../../submodules/utilities/log.js";
import { channeling_interrupts, silence, root, disables } from "./disables.js";
import * as PlayerRoles from "./playerRoles.js";
import { UIItem, UIAbility } from "../../submodules/utilities/dotaCoachUI.js";
import * as DotaCoachUI from "../../submodules/utilities/dotaCoachUI.js";
*/

/**
 *
 * @param hero
 * @param disables
 * @returns All abilities of a given hero for given disables. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getAbilitiesWithDisables(
  hero: string,
  disablesToScreen: string[]
): any[] {
  //DotaLogger.log("Dota2.hero.ability.getAbilitiesWithDisables(hero: '" + hero + "', disables: '" + JSON.stringify(disablesToScreen) + "'): Called")

  const heroDisables = disables[hero];
  if (heroDisables == null) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return [];
  }

  const result: any[] = [];

  // Iterate through all skills
  for (let i = 0; i < heroDisables.length; i++) {
    // Check if skill is a teleport interrupt
    let isDisabling = false;

    const skillDisables = heroDisables[i].disables;
    //DotaLogger.log("Dota2.hero.ability.getAbilitiesWithDisables(): skillDisables = '" + JSON.stringify(skillDisables) + "'")

    // Iterate through all disables of a given skil to see if it is a disable that interrupts TPs
    for (let j = 0; j < skillDisables.length; j++) {
      //DotaLogger.log("Dota2.hero.ability.getAbilitiesWithDisables(): disables = '" + JSON.stringify(disablesToScreen) + "', skillDisables[j] = '" + skillDisables[j] + "'")

      if (disablesToScreen.includes(skillDisables[j])) {
        isDisabling = true;
        break;
      }
    }

    if (isDisabling) {
      result.push(heroDisables[i]);
    }
  }

  //DotaLogger.log("getAbilitiesWithDisables(): Result = '" + JSON.stringify(result) + "'")

  return result;
}

export function getDispellableBuffs(hero: string): string[] {
  if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
  if (dispellableBuffs[hero as keyof typeof dispellableBuffs] == null) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return [];
  }

  const result = dispellableBuffs[hero as keyof typeof dispellableBuffs];

  /* return copy of array, otherwise recipient can change content of dispellableBuffs */
  return [...result];
}
/**
 *
 * @param hero
 * @returns All abilities that interrupt channeling. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 * TASK MICHEL: CHECK IF WE CAN CHANGE FUNCTION TO ONLY RETURN ARRAY OF STRINGS WITH ABILITIES
 */
export function getChannelingInterrupts(hero: string): any[] {
  return getAbilitiesWithDisables(hero, channeling_interrupts);
}
/**
 *
 * @param hero
 * @returns All abilities that slience. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getSilences(hero: string): any[] {
  return getAbilitiesWithDisables(hero, silence);
}

/**
 *
 * @param hero
 * @returns All abilities that root.  Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getRoots(hero: string): any[] {
  return getAbilitiesWithDisables(hero, root);
}

// Colors for radiant & dire
export const colorRadiant = "#67dd98"; //'#47661f'
export const colorDire = "#ea3009"; //'#58251c'

// Colors for strength, intelligence and agility
export const colorStrength = "#900000";
export const colorStrengthTransparent = "rgba(255, 0, 0, 0.35)";
export const colorIntelligence = "#000090";
export const colorIntelligenceTransparent = "rgba(0, 0, 255, 0.35)";
export const colorAgility = "#009000";
export const colorAgilityTransparent = "rgba(0, 255, 0, 0.35)";

type ErrorHandler = (error?: { source?: string; message?: string }) => void;
let errorHandler: ErrorHandler = () => undefined;

/**
 * Function can be used to register an expefic error handler, should the library report an error
 */
export function setErrorHandler(handler: ErrorHandler) {
  errorHandler = handler;
}

/**
 * Hero type based on information extracted by Dota Coach form Dota 2
 */
export interface Hero {
  name: string; // NPC name, e.g. 'npc_dota_hero_antimage'
  id: number; // e.g., 1
  localized_name: string; // e.g., 'Anti-Mage'
  aliases: string[]; // alternative names, e.g., 'am'
  similar_heroes: number[]; // Hero ids of similar heroes
  projectile_speed: number; // e.g. 0 for melee heroes like anti-mage
  roles: string[]; // e.g. ["Carry", "Escape", "Nuker"]
  complexity: number; // e.g., 1
  attack_range: number; // e.g., 150
  attack_type: string; // e.g., "Melee"
  primary_attr: string; // e.g., "Agility"
  movement_speed: number; // e.g., 310
  armor: number; // e.g., 0
  attack_speed: number; // e.g., 100
  attack_rate: number; // e.g., 1
  attack_damage_min: number; // e.g., 29
  attack_damage_max: number; // e.g., 33
  attack_animation_point: number; // e.g., 0
  attack_acquisition_range: number; // e.g., 600
  strength_base: number; // e.g., 23
  strength_gain: number; // e.g., 1
  intelligence_base: number; // e.g.,  12
  intelligence_gain: number; // e.g., 1
  agility_base: number; // e.g., 24
  agility_gain: number; // e.g., 2
  health_status_regen: number; // e.g., 0
  img: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.png",
  img_face: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
  img_body: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/antimage.png",
  video: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.webm",
  steam_guide: string[]; // e.g., ["https://steamcommunity.com/sharedfiles/filedetails/?id=2698377261"]
  abilities: string[]; // e.g., ["terrorblade_reflection", ...]
  talents: string[]; // e.g., ["special_bonus_unique_terrorblade_2", etc.]
}

export interface UIHeroItemBuild {
  starting?: IUIItem[]; // CHANGE FROM NULL TO UNDEIFNED FOR ALL ITEMS... CHECK IF IT STILL WORKS IN THE APP!!!
  starting_bear?: IUIItem[];
  laning?: IUIItem[]; // Only used for counter items (starting & early_game is used for own hero)
  early_game?: IUIItem[];
  mid_game?: IUIItem[];
  late_game?: IUIItem[];
  situational?: IUIItem[];
  situational_bear?: IUIItem[];
  neutral?: IUIItem[] | null;
  neutral_bear?: IUIItem[];
  roles?: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace lobby {
  export function lobbyTypeToString(s: string): string {
    let result = s.replace("DOTA_lobby_type_name_", "");
    if (result.length > 0) {
      // Convert first character to capital letter
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    return result;
    /*switch (s) {
            case 'DOTA_lobby_type_name_ranked':
                return 'Ranked'

        }*/
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace time {
  /**
   * Converts time in seconds to string in dota time
   * @param t time in seconds
   * @returns
   */
  export function convertToDotaTime(t: number): string {
    const min = Math.floor(Math.abs(t) / 60);
    const sec = Math.abs(t) % 60;
    return (t < 0 ? "-" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  }

  /**
   * Convert time in seconds to string in dota time, rounded to 10 seconds
   * @param t time in seconds
   * @returns
   */
  export function convertToCeiledDotaTime(t: number): string {
    let min = Math.floor(Math.abs(t) / 60);
    let sec = Math.abs(t) % 60;
    sec = 10 * Math.ceil(sec / 10);
    if (sec == 60) {
      sec = 0;
      min++;
    }
    return (t < 0 ? "-" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  }

  /**
   * Convert time in seconds to string in dota time, rounded to 10 seconds
   * @param t time in seconds
   * @returns
   */
  export function convertToFlooredDotaTime(t: number): string {
    const min = Math.floor(Math.abs(t) / 60);
    let sec = Math.abs(t) % 60;
    sec = 10 * Math.floor(sec / 10);
    return (t < 0 ? "-" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero {
  /**
   *
   * @param heroName NPC hero name
   * @returns Hero based on Dota static data; null if there is no such hero
   */
  export function getHero(heroName: string): Hero | undefined {
    if (!Object.prototype.hasOwnProperty.call(dota2Heroes, heroName))
      return undefined;

    return dota2Heroes[heroName as keyof typeof dota2Heroes];
  }

  /**
   * Returns HeroContent provided by content creators for the hero.
   *
   * @param heroName Localized hero name
   * @return null if there is no such hero
   */
  export function getHeroContent(
    heroName: string
  ): HeroBuilds.HeroContent | null {
    //DotaLogger.log(`Dota2.getHeroContent(${heroName}): Called`);
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName))
      return null;

    return HeroBuilds.heroBuilds[heroName];
  }

  /**
   * Returns an array with all http links to all guides for a given hero.
   *
   * @param heroName Localized hero name
   * @returns null in case of error
   */
  export function getHeroGuideLinks(heroName: string): string[] {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName))
      return [];

    const result: string[] = [];
    for (const build of HeroBuilds.heroBuilds[heroName].builds) {
      result.push(build.steam_guide_link);
    }

    return result;
  }

  /**
   *
   * @returns Array of localized hero names, e.g. Anti-Mage
   */
  export function getAllHeroNames(): string[] {
    const result: string[] = [];
    for (const key of Object.keys(dota2Heroes)) {
      result.push(dota2Heroes[key as keyof typeof dota2Heroes].localized_name);
    }
    return result;
  }

  /**
   *
   * @returns Array of localized hero names, e.g. Anti-Mage
   */
  export function getHeroNPCNames(): string[] {
    return Object.keys(dota2Heroes);
  }

  /**
   * @heroName: Localized name
   */
  export function isHeroMelee(heroName: string): boolean {
    //console.log("isHeroMelee(" + hero + ") called")

    for (const hero of Object.values(dota2Heroes)) {
      //        for (var index in jsonOpenDotaAPI) {
      if (hero.localized_name == heroName) {
        return hero.attack_type == "Melee";
      }
    }

    /*for (var OpenDotaAPIHero of jsonOpenDotaAPI) {
          if (OpenDotaAPIHero.localized_name == hero) {
              return OpenDotaAPIHero.attack_type == "Melee"
          }
      }*/
    console.log("Internal error: isHeroMelee(hero: " + hero + ")");
    return false; // should never get here though
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_roles {
  //    export function convertDotaCoachGuideRoleToDotaCoachRole(playerRole: PlayerRoles.DOTA_COACH_ROLE): PlayerRoles.DOTA_COACH_GUIDE_ROLE {
  export function convertDotaCoachRoleToDotaCoachGuidRole(
    playerRole: PlayerRoles.DOTA_COACH_ROLE
  ): PlayerRoles.DOTA_COACH_GUIDE_ROLE {
    switch (playerRole) {
      case PlayerRoles.DOTA_COACH_ROLE.CARRY: {
        return PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY;
      }
      case PlayerRoles.DOTA_COACH_ROLE.MID: {
        return PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID;
      }
      case PlayerRoles.DOTA_COACH_ROLE.OFFLANE: {
        return PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE;
      }
      case PlayerRoles.DOTA_COACH_ROLE.SOFT_SUPPORT:
      case PlayerRoles.DOTA_COACH_ROLE.HARD_SUPPORT: {
        return PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT;
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_builds {
  /**
   * Function validates if a default hero build exists
   * @param heroName Localized name
   * @returns
   */
  export function hasDefaultHeroBuild(heroName: string): boolean {
    return Object.prototype.hasOwnProperty.call(
      HeroBuilds.heroBuilds,
      heroName
    );
  }

  /**
   * @param heroName Localized hero name
   * @returns Hero build, or null if none is found
   */
  export function getClosestHeroBuild(
    heroName: string,
    playerRole: PlayerRoles.DOTA_COACH_ROLE
  ): HeroBuilds.HeroBuild | null {
    //DotaLogger.log(`Dota2.getClosestHeroBuild(${heroName}, ${playerRole}): Called`);
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName))
      return null;

    const r: PlayerRoles.DOTA_COACH_GUIDE_ROLE =
      hero_roles.convertDotaCoachRoleToDotaCoachGuidRole(playerRole);

    //DotaLogger.log(`Dota2.getClosestHeroBuild(): ${playerRole} => ${r}`);

    // Get all roles of guides
    const guides: any = {};
    for (const heroBuild of HeroBuilds.heroBuilds[heroName].builds) {
      for (const role of heroBuild.roles) {
        guides[role] = heroBuild;
      }
    }

    /*DotaLogger.log(
      `Dota2.getClosestHeroBuild(): guides=${JSON.stringify(guides)}`
    );*/

    const guide_rules: any = {};
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY] = [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
    ];
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID] = [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
    ];
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE] = [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
    ];
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT] = [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
    ];

    for (const role_ of guide_rules[r]) {
      //DotaLogger.log(`dota2.getClosestHeroBuild(): roleOfRules = ${role_}`);
      if (Object.prototype.hasOwnProperty.call(guides, role_)) {
        DotaLogger.log(
          `dota2.getClosestHeroBuild(): ${playerRole} => ${role_}`
        );
        return guides[role_];
      }
    }

    //DotaLogger.log(`Dota2.getClosestHeroBuild(): nothing found`);
    return null;
  }

  /**
   * Returns the default hero build, which is the first build in heroBuild.ts
   * @param heroName Localized hero name
   * @param playerRole
   * @return null if there is no such build
   */
  export function getDefaultHeroBuild(
    heroName: string
  ): HeroBuilds.HeroBuild | null {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName))
      return null;

    // Find hero build with right role
    return HeroBuilds.heroBuilds[heroName].builds[0];
  }

  /**
   *
   * @param hero localized hero name
   * @returns Array of abilites
   */
  export function getStandardAbilityBuild(h: string): string[] {
    //const h_ = hero.name.localizedNameToNPCName(h)
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, h)) {
      /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
      return [];
    }

    const abilityBuild = HeroBuilds.heroBuilds[h].builds[0].abilities;

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return [...abilityBuild];
  }

  /**
   *  Returns array with hero builds for a given hero
   *
   * @param heroName Localized hero name
   * @return null if there is no such build
   */
  export function getHeroBuildArray(
    heroName: string
  ): HeroBuilds.HeroBuild[] | null {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName))
      return null;

    return HeroBuilds.heroBuilds[heroName].builds;
  }

  /**
   *
   * @param heroName Localized hero name
   * @param playerRole
   * @return null if there is no such build
   */
  export function getHeroBuild(
    heroName: string,
    playerRole: PlayerRoles.DOTA_COACH_ROLE
  ): HeroBuilds.HeroBuild | null {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName))
      return null;

    const r: PlayerRoles.DOTA_COACH_GUIDE_ROLE =
      hero_roles.convertDotaCoachRoleToDotaCoachGuidRole(playerRole);

    // Find hero build with right role
    for (const heroBuild of HeroBuilds.heroBuilds[heroName].builds) {
      if (heroBuild.roles.indexOf(r) != -1) {
        return heroBuild;
      }
    }

    // No relevant guide found
    return null;
  }

  /**
   * Returns all items used in hero builds, e.g.
   */
  export function getItemNames(): string[] {
    const result: any = {};
    for (const [heroName, heroContent] of Object.entries(
      HeroBuilds.heroBuilds
    )) {
      for (const build of heroContent.builds) {
        for (const itemBuild of Object.values(build.items)) {
          for (const item of itemBuild) {
            if (result[item] === undefined) {
              result[item] = true;
            }
          }
        }
      }
      for (const phaseValues of Object.values(heroContent.counter_items)) {
        for (const roleValues of Object.values(
          phaseValues
        ) as HeroBuilds.CounterItem[][]) {
          for (const item of roleValues) {
            result[item.item] = true;
          }
        }
      }
    }
    return Object.keys(result).sort();
  }
  /**
   * Returns all abilities and talents used in the hero guides.
   */
  export function getAbilityNames(): string[] {
    const result: any = {};
    for (const [heroName, heroContent] of Object.entries(
      HeroBuilds.heroBuilds
    )) {
      for (const build of heroContent.builds) {
        for (const ability of build.abilities) {
          if (result[ability] === undefined) {
            result[ability] = true;
          }
        }
      }
    }
    return Object.keys(result).sort();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_damage_types {
  /**
   * Returns the damage type of a hero as a string.
   *
   * @param heroName Localized hero name
   * @returns The damage type, e.g. 'MagicalDamage' (ID for react-intl)
   */
  export function getDamageType(heroName: string): string {
    //DotaLogger.log("Dota2.hero_damage_types.getDamageType: localized_name='"+ localized_name + "', damageType[localized_name]='" + damageType[localized_name] + "'")

    const heroContent = hero.getHeroContent(heroName);
    if (heroContent != null) {
      switch (heroContent.damage_type) {
        case "magical": {
          return "MagicalDamage";
        }
        case "physical": {
          return "PhysicalDamage";
        }
        case "pure": {
          return "PureDamage";
        }
        case "neutral": {
          return "NeutralDamage";
        }
      }
    }
    return "UnknownDamage";
  }

  /**
   * Returns the image path for attribute
   *
   * @param heroName Localized hero name
   * @returns
   */
  export function getDamageTypeImg(heroName: string): string {
    const heroContent = hero.getHeroContent(heroName);
    if (heroContent != null) {
      switch (heroContent.damage_type) {
        case "magical": {
          return "/dist/img/damage/magical.png";
        }
        case "physical": {
          return "/dist/img/damage/physical.png";
        }
        case "pure": {
          return "/dist/img/damage/pure.png";
        }
        case "neutral": {
          return "/dist/img/damage/neutral.png";
        }
      }
    }
    return "Unknown damage type";
  }

  /**
   *
   * @param heroName Localized hero name
   * @returns HTML color code, e.g. #578cc7
   */
  export function getDamageTypeColor(heroName: string): string {
    //DotaLogger.log(`Dota2.hero_damage_types.getDamageColor(): heroName='${heroName}', damageType[localized_name]='${damageType[heroName]}'`)
    const heroContent = hero.getHeroContent(heroName);
    if (heroContent != null) {
      switch (heroContent.damage_type) {
        case "magical": {
          return "#578cc7";
        }
        case "physical": {
          return "#af3029";
        }
        case "pure": {
          return "#d8af54";
        }
        case "neutral": {
          return "#7f8284";
        }
      }
    }
    return "#7f8284";
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_attributes {
  // Takes localized hero name
  export function getAttributeColor(
    heroName: string,
    isTransparent: boolean
  ): string {
    const h = hero.getHero(heroName);
    if (h == null) {
      console.error(
        "Dota2.hero_attributes.getAttributeColor(heroName: " +
          heroName +
          ", isTransparent: " +
          isTransparent +
          "): Hero not found."
      );
    } else {
      switch (h.primary_attr) {
        case "agi": {
          return isTransparent ? colorAgilityTransparent : colorAgility;
        }
        case "int": {
          return isTransparent
            ? colorIntelligenceTransparent
            : colorIntelligence;
        }
        case "str": {
          return isTransparent ? colorStrengthTransparent : colorStrength;
        }
        default: {
          console.error(
            "Dota2.hero_attributes.getAttributeColor(heroName: " +
              heroName +
              ", isTransparent: " +
              isTransparent +
              "): Unknown primary attribute (" +
              h.primary_attr +
              ")"
          );
          break;
        }
      }
    }
    return "#505050"; // problem occured, so we return white
  }

  /**
   * Returns attribute of a given hero
   *
   * @param heroName Localized hero name
   * @returns Strength, Intelligence or Agility if hero is known. If hero is not known it returns null
   */
  export function getAttribute(heroName: string): string | undefined {
    const npcName = hero_names.localizedNameToNPCName(heroName);
    if (npcName === undefined) return undefined;
    const h = hero.getHero(npcName);
    if (h === undefined) {
      DotaLogger.log(
        `dota2.getAttribute(heroName: ${heroName}): could not find hero's primary attribute.`
      );
      return undefined;
    }

    return h.primary_attr;
  }

  // Takes localized hero name
  export function getAttributeImg(heroName: string): string {
    //DotaLogger.log(`Dota2.getAttributeImg(heroName: ${heroName}): Called`);
    return `${process.env.IMGPATH}/attributes/${getAttribute(heroName)}.png`;
  }

  // Takes localized hero name
  /*export function getAttributeName(heroName: string): string {
          switch (getAttribute(heroName)) {
              case 'agi' : {
                  return 'Agility'
              }
              case 'int': {
                  return 'Intelligence'
              }
              case 'str': {
                  return 'Strength'
              }
          }
          return "Error"
      }*/
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_item_builds {
  /**
   * Function returns the standard item build for a given hero. The standard item build is the first build in the heroGuides.ts file.
   *
   * @param hero Localized hero name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
   * OLD_returns String of items
   * @returns Array of { item: string (e.g. sheepstick), isCore?: true, info?: ... }}
   */
  export function getStandardItemBuild(h: string): IUIItem[] {
    //DotaLogger.log(`dota2.getStandardItemBuild(${h}): Called`);
    if (!hero_builds.hasDefaultHeroBuild(h)) {
      /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
      return [];
    }

    const heroBuilds = HeroBuilds.heroBuilds[h];

    //const mid_game = heroBuilds.builds[0].items.mid_game;
    //const late_game = heroBuilds.builds[0].items.late_game;
    //const late_game = heroBuilds.builds[0].items.core;

    /*DotaLogger.log(
      `dota2.getStandardItemBuild(${h}): contact ${JSON.stringify(
        mid_game
      )} ${JSON.stringify(late_game)}`
    );*/
    //const standard = mid_game.concat(late_game);
    const standard = heroBuilds.builds[0].items.core;

    const result: any = [];
    for (const s of standard) {
      const r: { name: string; info?: string; isCore?: boolean } = { name: s };
      const tooltip = HeroBuilds.getItemTooltip(
        heroBuilds,
        heroBuilds.builds[0],
        s
      );
      if (tooltip) {
        r["info"] = tooltip;
      }
      const isCore = HeroBuilds.isCoreItem(heroBuilds.builds[0], s);
      if (isCore) {
        r["isCore"] = true;
      }
      result.push(r);
    }

    // return mid_game.concat(late_game)
    return result;
  }

  /**
   *
   * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
   * @param playerRole if null, then the fucntion takes the fist build
   * @returns object with the following attributes: starting, early_game, mid_game, later_game, situational, roles: string. Each has an array of the following element: { item, info?, isCore?, purchaseTime? }
   */
  //export function getItemBuild(h: string): any {
  export function getItemBuildForRole(
    h: string,
    playerRole: PlayerRoles.DOTA_COACH_ROLE
  ): UIHeroItemBuild | null {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, h)) {
      /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
      return null;
    }

    let heroBuild: HeroBuilds.HeroBuild | null = null;

    if (playerRole === undefined || playerRole === null) {
      heroBuild = hero_builds.getDefaultHeroBuild(h);
    } else {
      heroBuild = hero_builds.getHeroBuild(h, playerRole);
      if (heroBuild == null) heroBuild = hero_builds.getDefaultHeroBuild(h);
    }

    const heroContent = hero.getHeroContent(h);
    if (heroContent !== null && heroBuild !== null) {
      return getItemBuild(heroContent, heroBuild);
    } else {
      return null;
    }
  }

  /**
   * Returns item build in format to be use to display using DotaCoachUI
   *
   * @param heroBuild
   * @returns Object with UIItems and the associated roles.
   */
  export function getItemBuild(
    heroContent: HeroBuilds.HeroContent,
    heroBuild: HeroBuilds.HeroBuild
  ): UIHeroItemBuild {
    let tooltips_hero: any = {};
    let tooltips_build: any = {};

    if (Object.prototype.hasOwnProperty.call(heroContent, "item_tooltips")) {
      tooltips_hero = heroContent.item_tooltips;
    }
    if (Object.prototype.hasOwnProperty.call(heroBuild, "item_tooltips")) {
      tooltips_build = heroBuild.item_tooltips;
    }
    const item_tooltips = {
      ...tooltips_hero,
      ...tooltips_build,
    };

    const build = heroBuild;
    /*var core_items_hero = build.items.core
          var core_items_bear = {}
          if (build.items.hasOwnProperty('core_baer')) {
              core_items_bear = build.items.core_bear
          }
          const core_items = {
              ...core_items_hero,
              ...core_items_bear
          }*/

    function transformItem(item: string, core_items: string[]): IUIItem {
      const result: {
        name: string;
        info?: string;
        isCore?: boolean;
      } = { name: item };
      if (Object.prototype.hasOwnProperty.call(item_tooltips, item))
        result["info"] = item_tooltips[item];
      if (core_items.indexOf(item) != -1) result["isCore"] = true;
      return result;
    }

    return {
      starting: build.items.starting.map((x) =>
        transformItem(x, build.items.core)
      ),
      starting_bear:
        build.items.starting_bear != undefined
          ? build.items.starting_bear.map((x) =>
              transformItem(
                x,
                build.items.core_bear == undefined ? [] : build.items.core_bear
              )
            )
          : undefined,
      early_game:
        build.items.early_game != undefined
          ? build.items.early_game.map((x) =>
              transformItem(x, build.items.core)
            )
          : undefined,
      mid_game:
        build.items.mid_game != undefined
          ? build.items.mid_game.map((x) => transformItem(x, build.items.core))
          : undefined,
      late_game:
        build.items.late_game != undefined
          ? build.items.late_game.map((x) => transformItem(x, build.items.core))
          : undefined,
      situational: build.items.situational.map((x) =>
        transformItem(x, build.items.core)
      ),
      situational_bear:
        build.items.situational_bear != undefined
          ? build.items.situational_bear.map((x) =>
              transformItem(
                x,
                build.items.core_bear == undefined ? [] : build.items.core_bear
              )
            )
          : undefined,
      neutral: build.items.neutral.map((x) =>
        transformItem(x, build.items.core)
      ),
      neutral_bear:
        build.items.neutral_bear != undefined
          ? build.items.neutral_bear.map((x) =>
              transformItem(
                x,
                build.items.core_bear == undefined ? [] : build.items.core_bear
              )
            )
          : undefined,

      roles: PlayerRoles.rolesToString(heroBuild.roles),
    };
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_counter_items {
  /**
   * Returns an array of counter items for a given hero.
   *
   * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
   * @param isSupport The role of the player
   * @returns Array of item objects, i.e. { item: "...", info: "..."}
   */
  export function getCounterItemsLaning(
    heroName: string,
    isSupport: boolean
  ): IUIItem[] {
    //if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
    if (heroName == "Outworld Destroyer") heroName = "Outworld Devourer";

    const heroBuilds = hero.getHeroContent(heroName);

    if (heroBuilds) {
      const allItems = heroBuilds.counter_items.laning_phase.all;
      let roleItems;
      if (isSupport) {
        roleItems = heroBuilds.counter_items.laning_phase.support;
      } else {
        roleItems = heroBuilds.counter_items.laning_phase.core;
      }

      /* return copy of array, otherwise recipient can change content of this.laningItemTips */
      return DotaCoachUI.counterItemsToUIItems(
        [...allItems].concat([...roleItems])
      );
    } else {
      return [];
    }
  }

  /**
   *
   * @param h Localized hero name
   * @param isSupport
   * @returns
   */
  export function getCounterItemsMidGame(
    heroName: string,
    isSupport: boolean
  ): IUIItem[] {
    //if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
    if (heroName == "Outworld Destroyer") heroName = "Outworld Devourer";

    const heroBuilds = hero.getHeroContent(heroName);

    if (heroBuilds) {
      const allItems = heroBuilds.counter_items.mid_game.all;
      let roleItems;
      if (isSupport) {
        roleItems = heroBuilds.counter_items.mid_game.support;
      } else {
        roleItems = heroBuilds.counter_items.mid_game.core;
      }

      /* return copy of array, otherwise recipient can change content of this.laningItemTips */
      return DotaCoachUI.counterItemsToUIItems(
        [...allItems].concat([...roleItems])
      );
    } else {
      return [];
    }
  }

  export function getCounterItemsLateGame(
    heroName: string,
    isSupport: boolean
  ): IUIItem[] {
    //if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
    if (heroName == "Outworld Destroyer") heroName = "Outworld Devourer";

    const heroBuilds = hero.getHeroContent(heroName);

    if (heroBuilds) {
      const allItems = heroBuilds.counter_items.late_game.all;
      let roleItems;
      if (isSupport) {
        roleItems = heroBuilds.counter_items.late_game.support;
      } else {
        roleItems = heroBuilds.counter_items.late_game.core;
      }

      /* return copy of array, otherwise recipient can change content of this.laningItemTips */
      return DotaCoachUI.counterItemsToUIItems(
        [...allItems].concat([...roleItems])
      );
    } else {
      return [];
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_ability_builds {
  /**
   *
   * @param heroBuild
   * @returns
   */
  export function getAbilityBuild(heroBuild: HeroBuilds.HeroBuild): string[] {
    //const h_ = hero.name.localizedNameToNPCName(h)

    const abilityBuild = heroBuild.abilities;

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return [...abilityBuild];
  }

  /**
   *
   * @param hero localized hero name
   * @param role optional, if not profivded, the function thakes that standard bility build (i.e. the first one)
   * @returns Array of abilites
   */
  export function getUIAbilityBuild(
    h: string,
    playerRole?: PlayerRoles.DOTA_COACH_ROLE
  ): IUIAbility[] {
    const heroBuilds = hero.getHeroContent(h);
    let heroBuild: HeroBuilds.HeroBuild | null;

    if (playerRole == undefined) {
      heroBuild = hero_builds.getDefaultHeroBuild(h);
    } else {
      heroBuild = hero_builds.getClosestHeroBuild(h, playerRole);
    }

    if (heroBuild == null) {
      DotaLogger.error(
        `Dota2.getUIAbilityBuild(): No hero builds found for ${h} as ${playerRole}`
      );
      return [];
    }

    return heroBuild.abilities.map((ability) => {
      const result: {
        name: string;
        info?: string;
      } = {
        name: ability,
      };
      if (heroBuilds && heroBuild) {
        const info = HeroBuilds.getAbilityTooltip(
          heroBuilds,
          heroBuild,
          ability
        );
        if (info) {
          result["info"] = info;
        }
      }
      return result;
    });
  }
}

/**
 *
 * @param hero localized hero name
 * @returns Array of abilites
 */
/*export function getStandardUIAbilityBuild(h: string): UIAbility[] {
    const heroBuilds = hero.build.getHeroContent(h);
    const heroBuild = hero.build.getDefaultHeroBuild(h);

    return getStandardAbilityBuild(h).map((ability) => {
      const result = {
        ability: ability,
      };
      const info = HeroBuilds.getAbilityTooltip(
        heroBuilds,
        heroBuild,
        ability
      );
      if (info) {
        result["info"] = info;
      }
      return result;
    });
  }*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace hero_images {
  export function idToImgName(heroId: number): string {
    //DotaLogger.log(`dota2.idToImgName(${heroId}): Called`);

    let localizedName = hero_names.idToLocalizedName(heroId);
    //DotaLogger.log(`dota2.idToImgName(): Localized name: ${localizedName}`);

    if (localizedName == "#not found#") {
      return localizedName;
    }
    switch (localizedName) {
      case "Nature's Prophet": {
        localizedName = "Furion";
        break;
      }
    }
    const result = `${process.env.IMGPATH}/heroes/${localizedName.replace(
      / /gi,
      "_"
    )}.png`;
    return result;
  }
  export function NPCShortNameToImgName(NPCShortName: string): string {
    return idToImgName(hero_names.NPCSortNameToId(NPCShortName));
  }

  export function idToMinimapImgName(heroId: number): string {
    //DotaLogger.log(`dota2.idToMinimapImgName(${heroId}): Called`);
    return idToImgName(heroId).replace(".png", "_minimap_icon.png");
  }
  export function NPCShortNameToMinimapImgName(NPCShortName: string): string {
    //DotaLogger.log(`dota2.idToMinimapImgName(${heroId}): Called`);
    return NPCShortNameToImgName(NPCShortName).replace(
      ".png",
      "_minimap_icon.png"
    );
  }
  export function localizedNameToImgName(heroName: string): string {
    //DotaLogger.log(`dota2.localizedNameToImgName(${heroName}): Called`)
    switch (heroName) {
      case "Nature's Prophet": {
        DotaLogger.log(
          `dota2.localizedNameToImgName(): Found 'Nature's Prophet'`
        );
        heroName = "Furion";
        break;
      }
    }
    //return "../img/heroes/" + heroName.replace(/ /gi, "_") + ".png";
    return `${process.env.IMGPATH}/heroes/${heroName.replace(/ /gi, "_")}.png`;
    //SHOULD BE CHANGED TO LATER ON: https://dotacoach.gg/img/dota/heroes/...png
  }

  export function localizedNameToMinimapImgName(heroName: string): string {
    //DotaLogger.log(`dota2.localizedNameToMinimapImgName(${heroName}): Called`)
    return localizedNameToImgName(heroName).replace(
      ".png",
      "_minimap_icon.png"
    );

    /*        switch (heroName) {
              case "Nature's Prophet": {
                  DotaLogger.log(`dota2.localizedNameToMinimapImgName(): Found 'Nature's Prophet'`)
                  heroName = "Furion"
                  break
              }
          }
          //return '../img/heroes/' + heroName.replace(/ /gi, "_") + '.png'
          return '../img/heroes/' + heroName.replace(/ /gi, "_") + '_minimap_icon.png';*/
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
