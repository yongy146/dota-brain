/* eslint-disable @typescript-eslint/no-namespace */
/**
 * This library is used to access all manual dota 2 data of Dota Coach (on items and abilities)
 *
 * The only separated information sources in this folder are openDotaAPI.ts and startzAPI.ts
 *
 * Copyright Dota Coach, 2022. All rights reserved
 */

import * as HeroBuilds from "./heroBuilds";
import { dispellableBuffs } from "./dispellableBuffs";
import dota2Abilities from "./dota2Abilities.json"; //assert { type: "json" };
import dota2Items from "./dota2Items.json"; //assert { type: "json" };
import dota2Heroes from "./dota2Heroes.json"; //assert { type: "json" };
import * as DotaLogger from "../../submodules/utilities/log";
// disables should be removed once the second screen is redesigned and moved to react. Currently only used by the second screen
import { channeling_interrupts, silence, root, disables } from "./disables";
import * as PlayerRoles from "./playerRoles";
import { IUIItem, IUIAbility } from "../../submodules/utilities/react/dota/Types";
import * as DotaCoachUI from "../../submodules/utilities/dotaCoachUI"; // This should be replaced as well, TO BE DONE
import i18nDota from "./i18n/en/dota.json";

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

export class Talent {
  talentLevel: number;
  skillLevel: number;
  cooldownReduction: number; /* -30 equals to -30% */

  constructor(talentLevel: number, cooldownReduction: number) {
    this.talentLevel = talentLevel;
    this.skillLevel = 5 + talentLevel * 5;
    this.cooldownReduction = cooldownReduction;
  }
}

export interface Ability {
  id: number;
  key?: string; // e.g. 'antimage_mana_overload'; added by dota2 library for convenience
  npcName?: string; // e.g. 'npc_dota_hero_sven'; added by dota2 library for convenience
  sequence: string; // e.g. Ability2
  is_talent: boolean;
  talent_level?: number; // 1, 2, 3 or 4
  cooldown: number[];
  mana_cost: number[];
  name: string;
  description: string;
  lore?: string; // talents do not have lores
  is_ultimate: boolean;
  is_passive: string; // "yes", "partial", "no"
  is_breakable?: boolean;
  affects?: string; // "unit", "unit_area", "area"
  is_dispellable?: string; // "no", "basic", "strong" (general information provided by valve)
  is_buff?: boolean;
  is_buff_dispellable?: string; // "no", "basic", "strong"
  is_debuff?: boolean;
  is_debuff_dispellable?: string; // "no", "basic", "strong"
  disable: string[]; // e.g. "stun", ""
}

export type AbilityAffects = "area" | "unit_area" | "unit";

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
    if (!Object.prototype.hasOwnProperty.call(dota2Heroes, heroName)) return undefined;

    return dota2Heroes[heroName as keyof typeof dota2Heroes];
  }

  /**
   * Returns HeroContent provided by content creators for the hero.
   *
   * @param heroName Localized hero name
   * @return null if there is no such hero
   */
  export function getHeroContent(heroName: string): HeroBuilds.HeroContent | null {
    //DotaLogger.log(`Dota2.getHeroContent(${heroName}): Called`);
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName)) return null;

    return HeroBuilds.heroBuilds[heroName];
  }

  /**
   * Returns an array with all http links to all guides for a given hero.
   *
   * @param heroName Localized hero name
   * @returns null in case of error
   */
  export function getHeroGuideLinks(heroName: string): string[] {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName)) return [];

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

export namespace hero_names {
  //
  // The following names exist:
  //    - NPC name:       npc_dota_hero_antimage
  //    - NPC sort name:  antimage (NPCName w/o 'npc_dota_hero'; used by Overwolf)
  //    - localized name: Anti-Mage or Legion Commander
  //

  /**
   *
   * @param name NPC short name, e.g., antimage (i.e. w/o 'npc_dota_hero_')
   * @returns localited name, e.g., Anti-Mage
   */
  export function NPCShortNameToLocalizedName(name: string): string {
    //npc_dota_hero_bane
    for (const hero of Object.values(dota2Heroes)) {
      //for (var index in jsonOpenDotaAPI) {
      /*console.log("****** ------: OpenDotaAPIHero = " + OpenDotaAPIHero)
              console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(OpenDotaAPIHero))
              console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(jsonOpenDotaAPI[OpenDotaAPIHero]))*/
      if (hero.name == "npc_dota_hero_" + name) {
        return hero.localized_name;
      }
    }
    return "#not found#";
  }

  /**
   *
   * @param name e.g. npc_dota_hero_antimage
   * @returns localized name, e.g. Anti-Mage
   */
  export function NPCNameToLocalizedName(heroNPCName: string): string {
    for (const hero of Object.values(dota2Heroes)) {
      if (hero.name == heroNPCName) {
        return hero.localized_name;
      }
    }
    return "#not found#";
  }

  export function idToLocalizedName(heroId: number): string {
    for (const hero of Object.values(dota2Heroes)) {
      //DotaLogger.log(`dota2.idToLocalizedName(heroId: ${heroId}): hero.id=${hero.id}`);
      if (hero.id === heroId) {
        return hero.localized_name;
      }
    }
    return "#not found#";
  }

  export function idToName(heroId: number): string {
    for (const hero of Object.values(dota2Heroes)) {
      //for (var index in jsonHeroes) {
      if (hero.id == heroId) {
        return hero.localized_name;
      }
    }
    return "#not found#";
  }

  export function idToNPCName(heroId: number): string {
    for (const hero of Object.values(dota2Heroes)) {
      //for (var index in jsonHeroes) {
      if (hero.id == heroId) {
        return hero.name;
      }
    }
    return "#not found#";
  }

  /**
   *
   * @param heroId
   * @returns e.g. antimage or dark_willow
   */
  export function idToNPCShortName(heroId: number): string {
    return idToNPCName(heroId).replace("npc_dota_hero_", "");
  }

  export function idToIntlName(heroId: number): string {
    return "dota.heroes." + idToNPCName(heroId);
  }

  /**
   *
   * @param localized_name
   * @returns undefined if hero is not found
   */
  export function localizedNameToId(localized_name: string): number | undefined {
    //DotaLogger.log("dota2.localizedNameToId(" + localized_name + "): Called")
    for (const hero of Object.values(dota2Heroes)) {
      if (hero.localized_name === localized_name) {
        //DotaLogger.log("dota2.localizedNameToId(): Returned id = '" + Heroes[i].id + "'")
        return hero.id;
      }
    }
    return undefined; // equals to not found
  }

  export function NPCNameToHeropediaName(heroNPCName: string): string {
    return localizedNameToHeropediaName(NPCNameToLocalizedName(heroNPCName));
  }

  export function idToHeropediaName(heroId: number): string {
    return localizedNameToHeropediaName(idToLocalizedName(heroId));
  }

  export function localizedNameToHeropediaName(localized_name: string): string {
    return localized_name.replace(/[ ']/g, "");
  }

  /**
   *
   * @param heropediaName It doesn't matter if letters are capitalized or not
   * @returns
   */
  export function heropediaNameToNPCName(heropediaName: string): string {
    for (const hero of Object.values(dota2Heroes)) {
      if (NPCNameToHeropediaName(hero.name).toLowerCase() === heropediaName.toLowerCase()) {
        return hero.name;
      }
    }
    return "";
  }

  /**
   *
   * @param heroName localized name, e.g. Anti-Mage
   * @returns NPC name, e.g. npc_dota_hero_antimage
   */
  export function localizedNameToNPCName(heroName: string): string | undefined {
    //DotaLogger.log("dota2.localizedNameToNPCName(" + heroName + "): Called")
    const id = localizedNameToId(heroName);
    return id === undefined ? undefined : idToNPCName(id);
  }

  export function localizedNameToNPCShortName(heroName: string): string | undefined {
    const npcShortName = localizedNameToNPCName(heroName);
    return npcShortName === undefined ? undefined : npcShortName.replace("npc_dota_hero_", "");
  }

  /* Returns -1 if hero not found
   */
  export function NPCSortNameToId(name: string): number {
    //npc_dota_hero_bane
    for (const hero of Object.values(dota2Heroes)) {
      //for (var index in jsonHeroes) {
      if (hero.name == "npc_dota_hero_" + name) {
        return hero.id;
      }
    }
    return -1;
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
    return Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName);
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
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName)) return null;

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
        DotaLogger.log(`dota2.getClosestHeroBuild(): ${playerRole} => ${role_}`);
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
  export function getDefaultHeroBuild(heroName: string): HeroBuilds.HeroBuild | null {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName)) return null;

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
  export function getHeroBuildArray(heroName: string): HeroBuilds.HeroBuild[] | null {
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName)) return null;

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
    if (!Object.prototype.hasOwnProperty.call(HeroBuilds.heroBuilds, heroName)) return null;

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
    for (const [heroName, heroContent] of Object.entries(HeroBuilds.heroBuilds)) {
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
        for (const roleValues of Object.values(phaseValues) as HeroBuilds.CounterItem[][]) {
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
    for (const [heroName, heroContent] of Object.entries(HeroBuilds.heroBuilds)) {
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
  export function getAttributeColor(heroName: string, isTransparent: boolean): string {
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
          return isTransparent ? colorIntelligenceTransparent : colorIntelligence;
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
      const tooltip = HeroBuilds.getItemTooltip(heroBuilds, heroBuilds.builds[0], s);
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
      starting: build.items.starting.map((x) => transformItem(x, build.items.core)),
      starting_bear:
        build.items.starting_bear != undefined
          ? build.items.starting_bear.map((x) =>
              transformItem(x, build.items.core_bear == undefined ? [] : build.items.core_bear)
            )
          : undefined,
      early_game:
        build.items.early_game != undefined
          ? build.items.early_game.map((x) => transformItem(x, build.items.core))
          : undefined,
      mid_game:
        build.items.mid_game != undefined
          ? build.items.mid_game.map((x) => transformItem(x, build.items.core))
          : undefined,
      late_game:
        build.items.late_game != undefined
          ? build.items.late_game.map((x) => transformItem(x, build.items.core))
          : undefined,
      situational: build.items.situational.map((x) => transformItem(x, build.items.core)),
      situational_bear:
        build.items.situational_bear != undefined
          ? build.items.situational_bear.map((x) =>
              transformItem(x, build.items.core_bear == undefined ? [] : build.items.core_bear)
            )
          : undefined,
      neutral: build.items.neutral.map((x) => transformItem(x, build.items.core)),
      neutral_bear:
        build.items.neutral_bear != undefined
          ? build.items.neutral_bear.map((x) =>
              transformItem(x, build.items.core_bear == undefined ? [] : build.items.core_bear)
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
  export function getCounterItemsLaning(heroName: string, isSupport: boolean): IUIItem[] {
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
      return DotaCoachUI.counterItemsToUIItems([...allItems].concat([...roleItems]));
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
  export function getCounterItemsMidGame(heroName: string, isSupport: boolean): IUIItem[] {
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
      return DotaCoachUI.counterItemsToUIItems([...allItems].concat([...roleItems]));
    } else {
      return [];
    }
  }

  export function getCounterItemsLateGame(heroName: string, isSupport: boolean): IUIItem[] {
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
      return DotaCoachUI.counterItemsToUIItems([...allItems].concat([...roleItems]));
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
      DotaLogger.error(`Dota2.getUIAbilityBuild(): No hero builds found for ${h} as ${playerRole}`);
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
        const info = HeroBuilds.getAbilityTooltip(heroBuilds, heroBuild, ability);
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
    const result = `${process.env.IMGPATH}/heroes/${localizedName.replace(/ /gi, "_")}.png`;
    return result;
  }
  export function NPCShortNameToImgName(NPCShortName: string): string {
    return idToImgName(hero_names.NPCSortNameToId(NPCShortName));
  }

  export function idToMinimapImgName(heroId: number): string {
    //DotaLogger.log(`dota2.idToMinimapImgName(${heroId}): Called`);
    return idToImgName(heroId).replace(".png", "_minimap_icon.png");
  }
  export function localizedNameToImgName(heroName: string): string {
    //DotaLogger.log(`dota2.localizedNameToImgName(${heroName}): Called`)
    switch (heroName) {
      case "Nature's Prophet": {
        DotaLogger.log(`dota2.localizedNameToImgName(): Found 'Nature's Prophet'`);
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
    return localizedNameToImgName(heroName).replace(".png", "_minimap_icon.png");

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

export namespace hero_abilities {
  /**
   *
   * @param ability Long ability name, e.g. centaur_hoof_stomp
   * @return Localized name of hero, "Unknown hero" in case of error
   */
  export function getHeroName(ability: string) {
    //DotaLogger.log(`dota2.hero.getHeroName(${ability}): Called`);

    // This ability is not shown in dota2 Heroes and therefore needs to be treated manually
    if (ability == "lone_druid_entangling_claws") return "Lone Druid";
    if (ability == "brewmaster_earth_hurl_boulder") return "Brewmaster";
    if (ability == "brewmaster_storm_cyclone") return "Brewmaster";

    for (const hero of Object.keys(dota2Heroes)) {
      //DotaLogger.log(`dota2.hero.getHeroName(): Hero=${hero}`);
      /*DotaLogger.log(
        `dota2.hero.getHeroName(): Hero=${JSON.stringify(
          dota2Heroes[hero].abilities
        )}`
      );*/
      if (dota2Heroes[hero as keyof typeof dota2Heroes].abilities.includes(ability)) {
        return dota2Heroes[hero as keyof typeof dota2Heroes].localized_name;
      }
    }
    const errorMessage = `dota2.hero_abilities.getHeroName(): Hero of ${ability} not found`;
    DotaLogger.error(errorMessage);
    errorHandler({
      source: "dota2.hero_abilities.getHeroName",
      message: errorMessage,
    });
    return "Unknown hero";
  }

  /**
   *
   * Attention: function is buggy for talents, as differnt heroes can have the same latent. Use getTalent instead.
   *
   * @param ability name, e.g. "bane_brain_sap" (Bane)
   * @returns Object describing the ability (e.g. id, sequence, is_talent, etc. For further details see 'dota2Abilities.json')
   */
  export function getAbility(ability: string): Ability | null {
    //DotaLogger.log(`dota2.getAbility(ability: ${ability}): Called`);

    for (const hero of Object.keys(dota2Abilities)) {
      for (const a of Object.keys(dota2Abilities[hero as keyof typeof dota2Abilities])) {
        if (a == ability) {
          const heroAbilities = dota2Abilities[hero as keyof typeof dota2Abilities];
          return heroAbilities[a as keyof typeof heroAbilities];
        }
      }
    }
    return null;
  }

  /**
   *
   * @param npcHeroName E.g. npc_dota_hero_dragon_knight
   * @param talent name, e.g. "bane_brain_sap" (Bane)
   * @returns Ability object, null it there is no such ability/talent
   */
  export function getTalent(npcHeroName: string, talent: string): Ability | null {
    //DotaLogger.log(`dota2.getTalent(npcHeroName: ${npcHeroName}, talent: ${talent}): Called`);

    if (Object.prototype.hasOwnProperty.call(dota2Abilities, npcHeroName)) {
      for (const a of Object.keys(dota2Abilities[npcHeroName as keyof typeof dota2Abilities])) {
        if (a == talent) {
          const heroAbilities = dota2Abilities[npcHeroName as keyof typeof dota2Abilities];
          return heroAbilities[a as keyof typeof heroAbilities];
        }
      }
    }
    return null;
  }

  export function getTalentDescription(npcHeroName: string, talent: string): string | null {
    /*DotaLogger.log(
      `dota2.getTalentName(npcHeroName: ${npcHeroName}, talent: ${talent})`
    );*/

    const ability = getTalent(npcHeroName, talent);
    /*DotaLogger.log(
      `dota2.getTalentName(): talent = ${JSON.stringify(ability)}`
    );*/
    if (ability == null) return null;
    return ability.description;
  }

  /**
   *
   * @param ability name, e.g. "brain_sap" (Bane)
   * @returns English name of ability or null if name is not found
   */
  export function getIntlName(ability: string): string {
    return "dota.abilities." + ability;
  }

  /**
   *
   * @param ability name, e.g. "brain_sap" (Bane)
   * @returns English name of ability or null if name is not found
   */
  export function getAbilityName(ability: string): string | undefined {
    //DotaLogger.log(`dota2.getAbilityName(ability: ${ability}): Called`);

    if (ability == "attack") {
      return "Attack";
    }

    if (ability == "special_bonus_attributes") {
      return "Attribute Bonus";
    }

    const a = getAbility(ability);

    //DotaLogger.log(`dota2.getAbility(): a=${JSON.stringify(a)}`);

    if (a != null) {
      if (Object.prototype.hasOwnProperty.call(a, "name")) {
        //DotaLogger.log(`dota2.getAbilityName(): ${a.name}`);
        return a.name;
      } else {
        //DotaLogger.log(`dota2.getAbilityName(): null`);
        return undefined;
      }
    }

    //DotaLogger.log(`dota2.getAbilityName(): null`);
    return undefined;
  }

  /**
   * Returns the affect type of an ability
   *
   * @param ability  Name of skill/ability, e.g. ancient_apparition_cold_feet
   * @returns null, if ability is not a disable
   */
  export function getAffects(ability: string): AbilityAffects | null {
    const abilityObj = getAbility(ability);
    if (abilityObj === null) return null;
    if (abilityObj.affects === undefined) return null;
    return abilityObj.affects as AbilityAffects;
  }

  export interface AnalyzedHeroAbilities {
    buffsBasicDispel: Ability[];
    debuffsDisablesBasicDispel: Ability[];
    debuffsDisablesStrongDispel: Ability[];
    spellsNonDispellable: Ability[];
    passivesBreakable: Ability[];
    passivesNonBreakable: Ability[];
  }

  export function analyzeHeroAbilities(heroIds: number[]): AnalyzedHeroAbilities {
    const result: AnalyzedHeroAbilities = {
      buffsBasicDispel: [],
      debuffsDisablesBasicDispel: [],
      debuffsDisablesStrongDispel: [],
      spellsNonDispellable: [],
      passivesBreakable: [],
      passivesNonBreakable: [],
    };
    for (const heroId of heroIds) {
      const npcName = hero_names.idToNPCName(heroId);
      const abilities = dota2Abilities[npcName as keyof typeof dota2Abilities];
      for (const [name, ability_] of Object.entries(abilities)) {
        const ability = ability_ as Ability;

        if (ability.is_talent === true) continue;

        ability.key = name;
        ability.npcName = npcName;
        // Buffs
        if (ability.is_buff === true) {
          switch (ability.is_buff_dispellable) {
            case "strong": {
              // This should not exist
              console.error(
                `Dota2.analyzeHeroAbilities(): Found buff with strong dispel  (${ability.name})`
              );
              break;
            }
            case "basic": {
              result.buffsBasicDispel.push(ability);
              break;
            }
            case "no": {
              result.spellsNonDispellable.push(ability);
              break;
            }
            default: {
              console.error(
                `Dota2.analyzeHeroAbilities(): Unknow is_buff_dispellable value (${ability.is_buff_dispellable})`
              );
            }
          }
        }
        // Debuffs
        if (ability.is_debuff === true) {
          switch (ability.is_debuff_dispellable) {
            case "strong": {
              result.debuffsDisablesStrongDispel.push(ability);
              break;
            }
            case "basic": {
              result.debuffsDisablesBasicDispel.push(ability);
              break;
            }
            case "no": {
              result.spellsNonDispellable.push(ability);
              break;
            }
            default: {
              console.error(
                `Dota2.analyzeHeroAbilities(): Unknow is_debuff_dispellable value (${ability.is_buff_dispellable})`
              );
            }
          }
        }
        // Disables
        if (Array.isArray(ability.disable)) {
          // Translate disables into dispellability
          if (
            ability.disable.includes("cyclone") ||
            ability.disable.includes("stop") ||
            ability.disable.includes("leash") ||
            ability.disable.includes("taunt")
          ) {
            result.spellsNonDispellable.push(ability);
          } else if (
            ability.disable.includes("stun") ||
            ability.disable.includes("hex") ||
            ability.disable.includes("mute")
          ) {
            result.debuffsDisablesStrongDispel.push(ability);
          } else if (
            ability.disable.includes("sleep") ||
            ability.disable.includes("silence") ||
            ability.disable.includes("fear") ||
            ability.disable.includes("root")
          ) {
            result.debuffsDisablesBasicDispel.push(ability);
          } else {
            // Error
            console.error(
              `Dota2.analyzeHeroAbilities(): Disable not processd: ${JSON.stringify(
                ability.disable
              )}`
            );
          }
        }
        // Remove duplicates
        result.debuffsDisablesBasicDispel = result.debuffsDisablesBasicDispel.filter(
          (item, pos) => {
            return result.debuffsDisablesBasicDispel.indexOf(item) === pos;
          }
        );
        result.debuffsDisablesStrongDispel = result.debuffsDisablesStrongDispel.filter(
          (item, pos) => {
            return result.debuffsDisablesStrongDispel.indexOf(item) === pos;
          }
        );
        result.spellsNonDispellable = result.spellsNonDispellable.filter((item, pos) => {
          return result.spellsNonDispellable.indexOf(item) === pos;
        });

        // Passives
        if (ability.is_passive !== "no") {
          if (ability.is_breakable === true) {
            result.passivesBreakable.push(ability);
          } else {
            result.passivesNonBreakable.push(ability);
          }
        }
      }
    }
    return result;
  }

  /**
   *
   * @param hero localized hero name
   * @returns arrray of breakable passives
   */
  export function getBreakablePassives(heroName: string): string[] {
    //DotaLogger.log(`dota.getBreakablePassives(heroName: ${heroName}): Called`)
    const abilities =
      dota2Abilities[hero_names.localizedNameToNPCName(heroName) as keyof typeof dota2Abilities];
    const result: any = [];
    for (const [key, value] of Object.entries(abilities)) {
      if (Object.prototype.hasOwnProperty.call(value, "is_passive")) {
        switch ((value as { is_passive: string }).is_passive) {
          case "yes":
          case "partial": {
            result.push(key);
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    //DotaLogger.log(`dota.getBreakablePassives(heroName: ${heroName}): Returned ${heroName}`)
    return result;

    /*if (breakablePassives[hero] == null) {
            /* Check is used for the case Dota 2 adds heroes and the app is not updated yet //
            return []
        }

        var result = breakablePassives[hero]

        /* return copy of array, otherwise recipient can change content of this.laningItemTips //
        return  [...result] */
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

  /**
   * Function searches for cooldown redution talents
   *
   * @param heroName Localized hero name (e.g. 'Anti-Mage' or 'Legion Commander')
   * @returns Talent object or null if there is not cooldown reduction talent
   */
  export function getCooldownReductionTalent(heroName: string): Talent | undefined {
    //DotaLogger.log("Dota2.hero.ability.getCooldownReductionTalent(heroName='" + heroName + "'): Called" )
    const heroNameNPC = hero_names.localizedNameToNPCName(heroName);
    const abilities = dota2Abilities[heroNameNPC as keyof typeof dota2Abilities];

    let result: Talent | undefined = undefined;

    for (const ability of Object.keys(abilities)) {
      if (ability.startsWith("special_bonus_cooldown_reduction_")) {
        const cooldownReduction = parseInt(
          ability.replace("special_bonus_cooldown_reduction_", "")
        );
        const a = abilities[ability as keyof typeof abilities];
        if (Object.prototype.hasOwnProperty.call(a, "talent_level")) {
          const talentLevel = (a as { talent_level: number }).talent_level;
          result = new Talent(talentLevel, cooldownReduction);
        }
        break;
      }
    }
    //DotaLogger.log(`Dota2.hero.ability.getCooldownReductionTalent(): Returns '${JSON.stringify(result)}'`)
    return result;
  }

  /**
   * Function returns the abilities of a hero
   *
   * @param heroName Localized name
   * @returns array with ability names, e.g. ["antimage_mana_break", ... ] first 6 skills
   */
  export function getAbilities(heroName: string): string[] {
    /*DotaLogger.log(
      "Dota2.hero.ability.getAbilities(heroName='" + heroName + "'): Called"
    );*/
    const heroNameNPC = hero_names.localizedNameToNPCName(heroName);

    if (dota2Heroes[heroNameNPC as keyof typeof dota2Heroes])
      return dota2Heroes[heroNameNPC as keyof typeof dota2Heroes].abilities;

    return [];
  }

  /**
   *
   * @param heroName
   * @returns Hero ultimate as a string
   */
  export function getUltimate(heroName: string): string | undefined {
    //DotaLogger.log("Dota2.hero.ability.getUltimate(heroName='" + heroName + "'): Called" )
    if (heroName) {
      if (heroName === "Outworld Devourer") heroName = "Outworld Destroyer";
      const abilities = getAbilities(heroName);
      if (Array.isArray(abilities) && abilities.length > 5) return abilities[5];
    }
    return undefined;
  }

  /**
   *
   * @param heroName Localized hero name
   * @return Array of cooldown values, first number is cooldown of first level of ultimate
   */
  export function getUltimateCooldown(heroName: string): number[] {
    const ultimate = getUltimate(heroName);
    if (ultimate) return getCooldown(ultimate);

    // Maybe report an error to Google Analytics?
    return [];
  }

  /**
   *
   * @param heroName Localized hero name
   * @returns true if hero has ultimate. If hero is not found, it returns false
   */
  export function hasUltimateTimer(heroName: string): boolean {
    const cd = getUltimateCooldown(heroName);

    if (!cd) return false;

    const result = !(
      cd.length == 0 ||
      (cd.length == 1 && cd[0] == 0) ||
      (cd.length == 4 && cd[0] == 0 && cd[1] == 0 && cd[2] == 0 && cd[3] == 0) ||
      heroName == "Broodmother" ||
      heroName == "Timbersaw" ||
      heroName == "Leshrac" ||
      heroName == "Pugna" ||
      heroName == "Slardar" ||
      heroName == "Techies" ||
      heroName == "Axe" ||
      heroName == "Bounty Hunter" ||
      heroName == "Ember Spirit" ||
      heroName == "Phantom Lancer" ||
      heroName == "Templar Assassin" ||
      heroName == "Void Spirit" ||
      heroName == "Invoker" ||
      heroName == "Tinker"
    );
    DotaLogger.log(
      `dota2.hasUltimateTimer(heroName: ${heroName}): Completed (result: ${result}, cd: ${JSON.stringify(
        cd
      )})`,
      DotaLogger.LogLevel.prod
    );
    return result;
  }

  /**
   *
   */
  export function getManaConsumption(heroAbility: string): string | null {
    /*DotaLogger.log(
      "Dota2.hero_abilities.getManaConsumption(heroAbility='" +
        heroAbility +
        "'): Called"
    );*/

    const a = hero_abilities.getAbility(heroAbility);

    if (a == null || !Object.prototype.hasOwnProperty.call(a, "mana_cost")) return null;

    const manaCost = a.mana_cost;
    //DotaLogger.log("Dota2.hero.ability.getManaConsumption: mc='" + JSON.stringify(mc) + "'")
    // Format of data: "mc":["80","90","100","110"]

    return manaCost.join(" / ");
  }

  /**
   *
   * @param heroAbility
   * @returns returns empty array if ability has no cooldown
   */
  export function getCooldown(heroAbility: string): number[] {
    //DotaLogger.log("Dota2.hero.ability.getCooldown(heroAbility='" + heroAbility + "'): Called")

    const a = hero_abilities.getAbility(heroAbility);
    if (a != null && Object.prototype.hasOwnProperty.call(a, "cooldown")) {
      // if there is no 'cd' property, the function returns an empty array
      return a.cooldown;
    }

    //DotaLogger.log(`Dota2.hero.ability.getCooldown(): Result = '${JSON.stringify(result)}'`)
    return [];
  }

  /**
   *
   * @param heroAbility
   * @returns null if there is no cooldown on ability
   */
  export function getCooldownAsString(heroAbility: string): string | null {
    //DotaLogger.log("Dota2.hero.ability.getCooldown(heroAbility='" + heroAbility + "'): Called")

    const a = hero_abilities.getAbility(heroAbility);
    if (a == null || !Object.prototype.hasOwnProperty.call(a, "cooldown")) return null;

    const cd = a.cooldown;

    // cooldown can not exist as a field, can be a number or an array

    //DotaLogger.log("Dota2.hero.ability.getCooldown(): cd='" + cd + "')")

    return Array.isArray(cd) ? cd.join(" / ") : cd;
  } /*

  // Returns the ability type
  // Possible value: 'Unit target', '...
  /*function getSkillAbilityType(heroAbility: string): string {
        if (!Abilities[heroAbility].hasOwnProperty("behavior")) {
            return null
        }

        const values = ['Unit Target', 'Point Target', 'Unit or Point Target', 'No Target', 'Aura', 'Passive', 'Channeled', 'Toggle', 'Auto-Cast']
        
        const behavior = Abilities[heroAbility].behavior

        for (var i=0; i<values.length; i++) {
            if (behavior.includes(values[i])) {
                return values[i]
            }
        }

        return null
    }*/

  /**
   *
   * @param hero
   * @param disables
   * @returns All abilities of a given hero for given disables. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
   */
  export function getAbilitiesWithDisables(hero: string, disablesToScreen: string[]): any[] {
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

  /**
   * Returns all abilities and talents from all heroes
   */
  export function getAbilityNames(): string[] {
    const result: any = {};
    for (const abilities of Object.values(dota2Abilities)) {
      for (const ability of Object.keys(abilities)) {
        result[ability] = true;
      }
    }
    return Object.keys(result).sort();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace items {
  /**
   *
   * @param item
   * @returns true if it is an item, false otherwise
   */
  export function isItem(item: string): boolean {
    return (
      Object.prototype.hasOwnProperty.call(dota2Items, `item_${item}`) ||
      Object.prototype.hasOwnProperty.call(dota2Items, item) // To cover customized items such as armor, DamageItems, SentryDustGem, etc.
    );
  }

  /**
   *
   * @param item name of item e.g. 'blink' or overwhelming_blink'
   * @returns Cooldown of item if it is an real Dota 2 item (otherwise 0, e.g. in case of armor or other selfmade items)
   */
  export function getItemCooldown(item: string): number {
    //DotaLogger.log(`Dota2.items.getItemCooldown(${item}): Called`);

    if (Object.prototype.hasOwnProperty.call(dota2Items, `item_${item}`)) {
      // It is a standard Dota 2 item
      const item_ = dota2Items[`item_${item}` as keyof typeof dota2Items];
      if (Object.prototype.hasOwnProperty.call(item_, "cooldown")) {
        const result = (item_ as { cooldown: number }).cooldown;
        //DotaLogger.log(`Dota2.items.getItemCooldown(${item}): Result=${result}`);
        return result; //dota2Items[`item_${item} `].cooldown;
      }
    }
    return 0;
  }

  /**
   *
   * @param item Item number
   * @returns Item name, e.g. 'blink' for blink., or null if item is not found
   */
  export function getItemName(itemId: number): string | null {
    for (const [key, value] of Object.entries(dota2Items)) {
      if (Object.prototype.hasOwnProperty.call(value, "id")) {
        if ((value as any).id == itemId) {
          return key.replace("item_", "");
        }
      }
    }
    return null;
  }

  /**
   *
   * @param itemCode e.g. item_blink
   * @returns
   */
  export function getIntlName(itemCode: string): string | undefined {
    return "dota.items." + (itemCode.startsWith("item_") ? itemCode : "item_" + itemCode);
  }

  /**
   *
   * @param item e.g. item_blink or armor (Dota Coach item)
   * @returns Item name, e.g. 'blink' for blink., or null if item is not found
   */
  export function getItemNameFromItemCode(itemCode: string): string | undefined {
    //DotaLogger.log(`dota2.getItemNameFromItemCode(itemCode: ${itemCode}): Called`)

    switch (itemCode) {
      case "armor":
      case "DamageItems":
      case "SentryDustGem":
      case "SentryGem":
      case "SentryDust":
      case "AttackSpeed": {
        // Don't change
        break;
      }
      default: {
        itemCode = `item_${itemCode}`;
      }
    }
    if (Object.prototype.hasOwnProperty.call(dota2Items, itemCode)) {
      if (Object.prototype.hasOwnProperty.call((dota2Items as any)[itemCode], "name")) {
        //DotaLogger.log(`dota2.getItemNameFromItemCode(itemCode: ${itemCode}): ${dota2Items[itemCode].name} `)
        return (dota2Items as any)[itemCode].name;
      }
    }
    //DotaLogger.log(`dota2.getItemNameFromItemCode(itemCode: ${itemCode}): null`)
    return undefined;
  }

  /**
   * Get the file name of an item.
   *
   * @param item Item number
   * @returns String with path and file name. Null if item is not found
   */
  export function getItemImage(itemId: number): string | null {
    const name = getItemName(itemId);
    if (name) return getItemImageFromName(name);
    return null;
    /*if (name) return `${process.env.IMGPATH}/items/${name}.png`;
    return null;*/
  }

  export function getItemImageFromName(name: string): string | null {
    return `${process.env.IMGPATH}/items/${name}.png`;
  }

  /**
   * Function returns items tracked by the performance tracker
   *
   * The list of items has been reviewed with ZoGraF in Q4 2021
   *
   * @returns { tracked: { item_code : all_data }, notTracked: { item_code : all_data }}
   */
  export function getTrackedItems() {
    const result: any = {
      tracked: {},
      notTracked: {},
    };

    for (const [key, value] of Object.entries(dota2Items)) {
      let isTracked = false;
      //if (!value.is_neutral) {
      switch (key) {
        case "item_soul_booster":
        case "item_ultimate_orb":
        case "item_demon_edge":
        case "item_eagle":
        case "item_reaver":
        case "item_relic":
        case "item_mystic_staff":
        case "item_grandmasters_glaive":
        case "item_ultimate_scepter_2":
        case "item_ultimate_scepter_roshan":
        case "item_fallen_sky": {
          isTracked = false;
          break;
        }
        case "item_mekansm":
        case "item_hood_of_defiance":
        case "item_lesser_crit":
        case "item_dragon_lance":
        case "item_mask_of_madness":
        case "item_ancient_janggo":
        case "item_veil_of_discord":
        case "item_glimmer_cape":
        case "item_vanguard":
        case "item_ghost":
        case "item_aghanims_shard": {
          isTracked = true;
          break;
        }
        default: {
          // Neutrals don't have a cost, so they are not being tracked by default
          isTracked = (value as any).cost > 2000;
          break;
        }
      }

      if (isTracked) {
        result.tracked[key] = value;
      } else {
        result.notTracked[key] = value;
      }
    }

    return result;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export namespace other {
  /**
   * Returns readable name of ability or item
   *
   * @param abilityOrItem e.g. legion_commander_moment_of_courage for Legion Commander's Moment of Courage or revenants_brooch fro Revenants Brooch
   * @returns error if the ability or item does not exist
   */
  export function getAbilityOrItemName(abilityOrItem: string): string {
    if (abilityOrItem === "attack") {
      return "Attack"; // Create imgur file for attack
      //    } else if (Object.prototype.hasOwnProperty.call(dota2Items, itemName)) {
    } else if (Object.prototype.hasOwnProperty.call(dota2Items, `item_${abilityOrItem}`)) {
      // It is an item
      /*return (
        dota2Items[`item_${abilityOrItem}` as keyof typeof dota2Items] as any
      ).name;*/
      return (i18nDota as Record<string, string>)[`dota.items.item_${abilityOrItem}`];
    } else {
      // It must be an ability
      const a = hero_abilities.getAbility(abilityOrItem);
      return a ? a.name : "error (dota2.getAbilityOrItemName)";
    }
  }
}
