import * as PlayerRoles from "../utilities/playerRoles";
import {
  IHeroBuild,
  IHeroContent,
  //getAbilityTooltip,
  //getItemTooltip,
  heroBuilds,
  isCoreItem,
} from "../content/heroBuilds";
import { getHeroContent } from "./heroContent";
import { IntlShape } from "react-intl";
import * as DotaLogger from "@utilities/log/log";

export interface IItemBuild {
  roles?: string;
  starting?: IPhaseItemBuild[];
  starting_bear?: IPhaseItemBuild[];
  laning?: IPhaseItemBuild[]; // Only used for counter items (starting & early_game is used for own hero)
  early_game?: IPhaseItemBuild[];
  mid_game?: IPhaseItemBuild[];
  late_game?: IPhaseItemBuild[];
  situational?: IPhaseItemBuild[];
  situational_bear?: IPhaseItemBuild[];
  neutral?: IPhaseItemBuild[];
  neutral_bear?: IPhaseItemBuild[];
}

export interface IPhaseItemBuild {
  name: string;
  info?: string;
  isCore?: boolean;
}

export interface IAbilityElement {
  name: string;
  info?: string;
}

/**
 * Function validates if a default hero build exists
 * @param heroName Localized name
 * @returns
 */
export function hasDefaultHeroBuild(heroName: string): boolean {
  return Object.prototype.hasOwnProperty.call(heroBuilds, heroName);
}

/**
 * @param heroName Localized hero name
 * @returns Hero build, or null if none is found
 */
export function getClosestHeroBuild(
  heroName: string,
  playerRole: PlayerRoles.DOTA_COACH_ROLE
): IHeroBuild | undefined {
  //DotaLogger.log(`Dota2.getClosestHeroBuild(${heroName}, ${playerRole}): Called`);
  if (!Object.prototype.hasOwnProperty.call(heroBuilds, heroName))
    return undefined;

  const r: PlayerRoles.DOTA_COACH_GUIDE_ROLE =
    PlayerRoles.convertDotaCoachRoleToDotaCoachGuidRole(playerRole);

  //DotaLogger.log(`Dota2.getClosestHeroBuild(): ${playerRole} => ${r}`);

  // Get all roles of guides
  const guides: any = {};
  for (const heroBuild of heroBuilds[heroName].builds) {
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
  return undefined;
}

/**
 * Returns the default hero build, which is the first build in heroBuild.ts
 * @param npcShortName Localized hero name
 * @param playerRole
 * @return null if there is no such build
 */
export function getDefaultHeroBuild(
  npcShortName: string
): { buildIndex: number; heroBuild: IHeroBuild } | undefined {
  if (!heroBuilds[npcShortName]) return undefined;

  const buildIndex = 0;
  const heroBuild = heroBuilds[npcShortName].builds[0];

  // Find hero build with right role
  return { buildIndex, heroBuild };
}

/**
 *
 * @param npcShortName e.g. "legion_commander" or "lone_druid"
 * @returns Array of abilites
 */
export function getStandardAbilityBuild(npcShortName: string): string[] {
  //const h_ = hero.name.localizedNameToNPCName(h)
  if (!heroBuilds[npcShortName]) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return [];
  }

  const abilityBuild = heroBuilds[npcShortName].builds[0].abilities;

  /* return copy of array, otherwise recipient can change content of this.laningItemTips */
  return [...abilityBuild];
}

/**
 *  Returns array with hero builds for a given hero
 *
 * @param heroName Localized hero name
 * @return null if there is no such build
 */
export function getHeroBuildArray(heroName: string): IHeroBuild[] | null {
  if (!Object.prototype.hasOwnProperty.call(heroBuilds, heroName)) return null;

  return heroBuilds[heroName].builds;
}

/**
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @param playerRole
 * @return null if there is no such build
 */
export function getHeroBuild(
  npcShortName: string,
  playerRole: PlayerRoles.DOTA_COACH_ROLE
): { buildIndex: number; heroBuild: IHeroBuild } | undefined {
  if (!heroBuilds[npcShortName]) return undefined;

  const r: PlayerRoles.DOTA_COACH_GUIDE_ROLE =
    PlayerRoles.convertDotaCoachRoleToDotaCoachGuidRole(playerRole);

  // Find hero build with right role
  for (const heroBuild of heroBuilds[npcShortName].builds) {
    const buildIndex = heroBuild.roles.indexOf(r);
    if (buildIndex !== -1) {
      return { heroBuild, buildIndex };
    }
  }

  // No relevant guide found
  return undefined;
}

/**
 * Returns all items used in hero builds, e.g.
 */
export function getItemNames(): string[] {
  const result: any = {};
  for (const [heroName, heroContent] of Object.entries(heroBuilds)) {
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
      for (const roleValues of Object.values(phaseValues) as string[][]) {
        for (const item of roleValues) {
          result[item] = true;
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
  for (const [heroName, heroContent] of Object.entries(heroBuilds)) {
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

/**
 * Function returns the standard item build for a given hero. The standard item build is the first build in the heroGuides.ts file.
 *
 * @param hero Localized hero name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * OLD_returns String of items
 * @returns Array of { item: string (e.g. sheepstick), isCore?: true, info?: ... }}
 */
export function getStandardItemBuild(h: string): IPhaseItemBuild[] {
  //DotaLogger.log(`dota2.getStandardItemBuild(${h}): Called`);
  if (!hasDefaultHeroBuild(h)) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return [];
  }

  const heroContent = heroBuilds[h];
  const heroBuild = heroContent.builds[0];

  //const mid_game = heroBuilds.builds[0].items.mid_game;
  //const late_game = heroBuilds.builds[0].items.late_game;
  //const late_game = heroBuilds.builds[0].items.core;

  /*DotaLogger.log(
      `dota2.getStandardItemBuild(${h}): contact ${JSON.stringify(
        mid_game
      )} ${JSON.stringify(late_game)}`
    );*/
  //const standard = mid_game.concat(late_game);
  const standard = heroBuild.items.core;

  const result: IPhaseItemBuild[] = [];
  for (const s of standard) {
    const r: { name: string; info?: string; isCore?: boolean } = { name: s };
    /*const tooltip = getItemTooltip(heroContent, heroBuild, s);
    if (tooltip) {
      r["info"] = tooltip;
    }*/
    const isCore = isCoreItem(heroBuild, s);
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
 *
 * @param npcShortName The name of the hero, e.g. 'abaddon' or 'legion_commander'
 * @param playerRole if null, then the fucntion takes the fist build
 * @returns object with the following attributes: starting, early_game, mid_game, later_game, situational, roles: string. Each has an array of the following element: { item, info?, isCore?, purchaseTime? }
 */
//export function getItemBuild(h: string): any {
export function getItemBuildForRole(
  npcShortName: string,
  playerRole: PlayerRoles.DOTA_COACH_ROLE | null | undefined,
  intl?: IntlShape
): IItemBuild | undefined {
  if (!heroBuilds[npcShortName]) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return undefined;
  }

  let heroBuild: IHeroBuild | undefined = undefined;
  let buildIndex: number | undefined = undefined;

  if (playerRole === undefined || playerRole === null) {
    ({ heroBuild, buildIndex } = getDefaultHeroBuild(npcShortName) || {});
  } else {
    ({ heroBuild, buildIndex } = getHeroBuild(npcShortName, playerRole) || {});
    if (heroBuild === undefined)
      heroBuild = getDefaultHeroBuild(npcShortName)?.heroBuild;
  }

  const heroContent = getHeroContent(npcShortName);
  if (heroContent !== undefined && buildIndex !== undefined) {
    return getItemBuild(npcShortName, buildIndex, intl);
  } else {
    return undefined;
  }
}

/**
 * Returns item build.
 *
 * Build includes tooltips if react-intl element is passed.
 *
 * @param heroBuild
 * @returns Object with UIItems and the associated roles.
 */
export function getItemBuild(
  npcShortName: string,
  buildIndex: number,
  //heroContent: IHeroContent,
  //heroBuild: IHeroBuild,
  intl?: IntlShape
): IItemBuild {
  /*const item_tooltips = {
    //...(heroContent.item_tooltips || {}),
    //...(heroBuild.item_tooltips || {}),
  };*/
  const heroContent = heroBuilds[npcShortName];
  const heroBuild = heroContent.builds[buildIndex];

  const build = heroBuild;

  function transformItem(item: string, core_items: string[]): IPhaseItemBuild {
    const result: IPhaseItemBuild = { name: item };
    //if (item_tooltips[item]) result["info"] = item_tooltips[item];
    if (core_items.indexOf(item) !== -1) result["isCore"] = true;
    const tooltip = intl && getTooltip(npcShortName, buildIndex, item, intl);
    if (tooltip) result["info"] = tooltip;
    return result;
  }

  return {
    roles: PlayerRoles.rolesToString(heroBuild.roles),
    starting: build.items.starting.map((x) =>
      transformItem(x, build.items.core)
    ),
    starting_bear:
      build.items.starting_bear !== undefined
        ? build.items.starting_bear.map((x) =>
            transformItem(
              x,
              build.items.core_bear === undefined ? [] : build.items.core_bear
            )
          )
        : undefined,
    early_game:
      build.items.early_game !== undefined
        ? build.items.early_game.map((x) => transformItem(x, build.items.core))
        : undefined,
    mid_game:
      build.items.mid_game !== undefined
        ? build.items.mid_game.map((x) => transformItem(x, build.items.core))
        : undefined,
    late_game:
      build.items.late_game !== undefined
        ? build.items.late_game.map((x) => transformItem(x, build.items.core))
        : undefined,
    situational: build.items.situational.map((x) =>
      transformItem(x, build.items.core)
    ),
    situational_bear:
      build.items.situational_bear !== undefined
        ? build.items.situational_bear.map((x) =>
            transformItem(
              x,
              build.items.core_bear == undefined ? [] : build.items.core_bear
            )
          )
        : undefined,
    neutral: build.items.neutral.map((x) => transformItem(x, build.items.core)),
    neutral_bear:
      build.items.neutral_bear !== undefined
        ? build.items.neutral_bear.map((x) =>
            transformItem(
              x,
              build.items.core_bear == undefined ? [] : build.items.core_bear
            )
          )
        : undefined,
  };
}

/**
 * Returns the react-intl tooltip for a given hero, hero build and item.
 *
 * @param npcHeroName Short npc name, e.g. "antimage"
 * @param buildIndex index of hero build
 * @param item Item short name, e.g. "blink"
 */
export function getTooltip(
  npcHeroName: string,
  buildIndex: number,
  item: string,
  intl: IntlShape
): string | undefined {
  // Check build tooltip
  let id = `hero.${npcHeroName}.builds.${buildIndex}.item_tooltips.${item}`;
  if (intl.messages[id]) return intl.formatMessage({ id });

  // Check hero tooltip
  id = `hero.${npcHeroName}.item_tooltips.${item}`;
  if (intl.messages[id]) return intl.formatMessage({ id });

  // Check item tooltip
  id = `hero.base.item_tooltips.${item}`;
  if (intl.messages[id]) return intl.formatMessage({ id });

  return undefined;
}

//
// Ability builds
//

//export namespace hero_ability_builds {
/**
 *
 * @param heroBuild
 * @returns
 */
export function getAbilityBuild(heroBuild: IHeroBuild): string[] {
  //const h_ = hero.name.localizedNameToNPCName(h)

  const abilityBuild = heroBuild.abilities;

  /* return copy of array, otherwise recipient can change content of this.laningItemTips */
  return [...abilityBuild];
}

/**
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @param role optional, if not profivded, the function thakes that standard bility build (i.e. the first one)
 * @returns Array of abilites
 */
export function getUIAbilityBuild(
  npcShortName: string,
  playerRole?: PlayerRoles.DOTA_COACH_ROLE
): IAbilityElement[] {
  const heroBuilds = getHeroContent(npcShortName);
  let heroBuild: IHeroBuild | undefined;

  if (playerRole === undefined) {
    heroBuild = getDefaultHeroBuild(npcShortName)?.heroBuild;
  } else {
    heroBuild = getClosestHeroBuild(npcShortName, playerRole);
  }

  if (heroBuild === undefined) {
    DotaLogger.error(
      `Dota2.getUIAbilityBuild(): No hero builds found for ${npcShortName} as ${playerRole}`
    );
    return [];
  }

  return heroBuild.abilities.map((ability) => {
    const result: IAbilityElement = {
      name: ability,
    };
    if (heroBuilds && heroBuild) {
      /*const info = getAbilityTooltip(heroBuilds, heroBuild, ability);
      if (info) {
        result["info"] = info;
      }*/
    }
    return result;
  });
}
//}

/**
 * Returns an array with all http links to all guides for a given hero.
 *
 * @param heroName Localized hero name
 * @returns null in case of error
 */
export function getHeroGuideLinks(heroName: string): string[] {
  if (!Object.prototype.hasOwnProperty.call(heroBuilds, heroName)) return [];

  const result: string[] = [];
  for (const build of heroBuilds[heroName].builds) {
    result.push(build.steam_guide_link);
  }

  return result;
}
