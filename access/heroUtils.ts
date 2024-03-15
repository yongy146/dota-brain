/**
 * Utility function to access information on heroes.
 *
 */
import { IHeroBuild, heroBuilds } from "../content/heroBuilds";
import { DOTA_COACH_GUIDE_ROLE } from "../utilities/playerRoles";

export interface IHeroesWithItem {
  shortNPCName: string;
  builds: IBuildsWithItem[];
}

export interface IBuildsWithItem {
  roles: DOTA_COACH_GUIDE_ROLE[];
}

/**
 * Function returns all heroes that have the item in
 * their build. It also returns the role.
 *
 * @item item name, e.g. quelling_blade
 */
export function getHeroesWithItem(item: string): IHeroesWithItem[] {
  //console.log(`heroUtils.getHeroesWithItem(item: ${item}): Called`);

  const result: IHeroesWithItem[] = [];

  for (const [shortNPCName, heroContent] of Object.entries(heroBuilds)) {
    const buildsWithItem: IBuildsWithItem[] = [];
    for (const build of heroContent.builds) {
      const containsItem = buildContainsItem(build, item);
      if (containsItem) {
        const heroWithItem: IBuildsWithItem = {
          roles: build.roles,
        };
        buildsWithItem.push(heroWithItem);
      }
    }
    if (buildsWithItem.length) {
      result.push({
        shortNPCName,
        builds: buildsWithItem,
      });
    }
  }

  return result;
}

export type TCoreHeroes = {
  npcShortName: string;
  buildIndex: number;
  roles: DOTA_COACH_GUIDE_ROLE[];
};

/**
 * Returns all heroes for which the given item is core.
 *
 * @params itemKey, e.g. "magic_wand" or "item_magic_wand"
 */
export function getCoreHeroes(itemKey: string): TCoreHeroes[] {
  itemKey = itemKey.replace("item_", "");

  const result: TCoreHeroes[] = [];

  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    // Check if item is core in one of the builds
    for (
      let buildIndex = 0;
      buildIndex < heroContent.builds.length;
      buildIndex++
    ) {
      const heroBuild = heroContent.builds[buildIndex];
      const coreItems = [
        ...heroBuild.items.core,
        ...(heroBuild.items.core_bear || []),
      ];

      for (const coreItem of coreItems) {
        if (coreItem === itemKey) {
          result.push({
            npcShortName,
            buildIndex,
            roles: heroBuild.roles,
          });
          break;
        }
      }
    }
  }

  return result;
}

/**
 * Returns all heroes that are countered by a given item.
 *
 * @params itemKey, e.g. "magic_wand" or "item_magic_wand"
 * @returns npc short names of heroes, e.g. ["antimage", "legion_commander", etc.]
 */
export function getHeroesCounteredBy(itemKey: string): string[] {
  itemKey = itemKey.replace("item_", "");

  const result: string[] = [];

  for (const [name, heroContent] of Object.entries(heroBuilds)) {
    let hasItem: boolean | string = false;
    for (const [phase, counterItems] of Object.entries(
      heroContent.counter_items
    )) {
      for (const [role, counterItem] of Object.entries<string[]>(
        counterItems as any
      )) {
        const item = counterItem.find((item) => item === itemKey);
        if (item) {
          hasItem = true;
          break;
        }
      }
      if (hasItem) break;
    }

    if (hasItem) {
      result.push(name);
    }
  }

  return result;
}

/**
 * Phase "All" is not represented here, as it is codified as "undefined" when there is a mapping
 */
export const phase2ItemBuild: Record<string, string> = {
  DOTA_Start: "starting",
  DOTA_Item_Build_Early_Game: "early",
  DOTA_Item_Build_Mid_Items: "mid",
  DOTA_Item_Build_Late_Items: "late",
};

/**
 * Iterator through all items in all hero guides.
 *
 * Skips core items for all heroes (as the items are repeated)
 * except for Lone Druid and skips neutral items for all heroes.
 *
 */
export function* itemIterator(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): Generator<{
  item: string;
  npcShortName: string;
  heroBuildIndex: number;
  phase: string;
}> {
  const phaseItemBuild = phase ? phase2ItemBuild[phase] : undefined;

  //console.log(`phase: `, phase);
  //console.log(`phaseItemBuild: `, phaseItemBuild);

  for (const {
    npcShortName,
    heroBuild,
    heroBuildIndex,
  } of heroBuildIterator()) {
    if (!role || heroBuild.roles.includes(role)) {
      for (const [category, items] of Object.entries(heroBuild.items)) {
        // Remove "core" (if not lone druid; as it is a repetition) and "neutral"
        if (
          (category.includes("core") && !heroBuild.items.core_bear) ||
          category.includes("neutral")
        ) {
          // These are duplicated items, remove
        } else {
          // Filter for relevant phase (but only if 'phase' was provided)
          if (!phaseItemBuild || category.includes(phaseItemBuild)) {
            //console.log(`items: `, items);
            // Remove duplicates (e.g. branches)
            const releventItems = (items as string[]).filter(
              (item: string, i) => (items as string[]).indexOf(item) === i
            );
            for (const item of releventItems) {
              yield {
                item,
                npcShortName,
                heroBuildIndex,
                phase: category,
              };
            }
          }
        }
      }
    }
  }
}

/**
 * Phase "All" is not represented here, as it is codified as "undefined" when there is a mapping
 */
export const phase2CounterItemBuild: Record<string, string> = {
  DOTA_Item_Build_Early_Game: "laning_phase",
  DOTA_Item_Build_Mid_Items: "mid_game",
  DOTA_Item_Build_Late_Items: "late_game",
};

export const phase2i18n: Record<string, string> = {
  starting: "Starting",
  starting_bear: "StartingBaer", // Only for Lone Duid's Baer
  core: "Core", // Only for Lone Duid
  core_bear: "CoreBaer", // Only for Lone Duid's Baer
  early_game: "DOTA_Item_Build_Early_Game",
  laning: "LaningPhaseCap",
  mid_game: "DOTA_Item_Build_Mid_Items",
  late_game: "DOTA_Item_Build_Late_Items",
  situational: "Situational",
  situational_bear: "SituationalBaer", // Only for Lone Duid's Baer
  neutral: "Neutral",
  neutral_bear: "NeutralBaer", // Only for Lone Duid's Baer
};

/**
 * Counter items mentioned for two roles, are only reported once.
 *
 * Supported roles: undefined (all), support, core (i.e., mid/carry/offlane)
 *
 */
export function* counterItemIterator(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): Generator<{
  item: string;
  npcShortName: string;
  phase: string;
}> {
  const phaseItemBuild = phase ? phase2CounterItemBuild[phase] : undefined;

  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    for (const [phase, items] of Object.entries(heroContent.counter_items)) {
      if (!phaseItemBuild || phaseItemBuild === phase) {
        for (const [rolePlayer, counterItems] of Object.entries<string[]>(
          items as any as Record<string, string[]>
        )) {
          if (
            rolePlayer === "all" ||
            !role ||
            (rolePlayer === "support" &&
              role === DOTA_COACH_GUIDE_ROLE.SUPPORT) ||
            (rolePlayer === "core" && role !== DOTA_COACH_GUIDE_ROLE.SUPPORT)
          ) {
            //console.log(`rolePlayer: `, rolePlayer);
            //console.log(`counterItems: `, counterItems);
            //console.log(`typeof counterItems: `, typeof counterItems);
            for (const counterItem of counterItems) {
              //counterItems_.push(counterItem);
              yield {
                npcShortName,
                item: counterItem,
                phase: phase,
              };
            }
          }
        }
      }
    }
    // Remove duplicates
    /*counterItems_ = counterItems_.filter(
      (item, i) => counterItems_.findIndex((i) => i.item === item.item) === i
    );*/

    /*for (const counterItem of counterItems_) {
      yield {
        item: (counterItem as CounterItem).item,
        phase: "hi"
      }
    }*/
  }
}

/**
 * Function provides iterator through all hero builds.
 *
 */
export function* heroBuildIterator(): Generator<{
  npcShortName: string;
  heroBuild: IHeroBuild;
  heroBuildIndex: number;
}> {
  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    for (let i = 0; i < heroContent.builds.length; i++) {
      yield {
        npcShortName,
        heroBuild: heroContent.builds[i],
        heroBuildIndex: i,
      };
    }
  }
}

function buildContainsItem(build: IHeroBuild, item: string): boolean {
  for (const items of Object.values(build.items)) {
    if (items.includes(item)) return true;
  }
  return false;
}

export interface IRecommendedItems {
  /**
   * Key of the item, e.g. 'blink'
   *
   */
  item: string;
  /**
   * Guides with the item in the given phase
   *
   * Format: <npc_short_name>_<heroBuildsIndex>, e.g. 'techies_1'
   *
   */
  starting: Set<string>;
  early_game: Set<string>;
  mid_game: Set<string>;
  late_game: Set<string>;
  core: Set<string>;
  situational: Set<string>;
  all: Set<string>;
  /**
   * Number of guides for the given role.
   *
   */
  guides: number;
}

/**
 * For each item in guides, the function counts the number
 * of guides with the item for each phase of the game.
 *
 */
export function mostRecommendedItems(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): IRecommendedItems[] {
  // Count the number of relevant guides for the role
  let numberOfGuides = 0;
  for (const { heroBuild } of heroBuildIterator()) {
    const roleSatisfied = role ? heroBuild.roles.includes(role) : true;
    if (roleSatisfied) numberOfGuides++;
  }
  //console.log(`heroBuilds: `, total);

  // Count the number of items in the relevant guides
  const counter: Record<string, IRecommendedItems> = {};
  for (const {
    item,
    phase: phase_,
    npcShortName,
    heroBuildIndex,
  } of itemIterator(role, phase)) {
    // Create 'empty' item counter if needed
    if (!counter[item]) {
      counter[item] = {
        item,
        starting: new Set(),
        early_game: new Set(),
        mid_game: new Set(),
        late_game: new Set(),
        core: new Set(),
        situational: new Set(),
        all: new Set(),
        guides: numberOfGuides,
      };
    }
    // Increment counter for applicable phase
    ((counter[item] as any)[phase_.replace("_bear", "")] as Set<string>).add(
      `${npcShortName}_${heroBuildIndex}`
    );
    counter[item].all.add(`${npcShortName}_${heroBuildIndex}`);
  }

  //console.log(`+++ counter: `, JSON.stringify(counter));

  // Prepare and sort the results
  const preResult = Object.values(counter).sort(
    (a, b) => b.all.size - a.all.size
    /*b.starting +
      b.early_game +
      b.mid_game +
      b.late_game -
      a.starting -
      a.early_game -
      a.mid_game -
      a.late_game*/
  );

  //console.log(`+++ preResult: `, JSON.stringify(preResult));

  // Return results in the proper format
  /*return (
    preResult
      /*.map((counter) => ({
      item: counter.item,
      starting: counter.starting,
      early_game: counter.early_game,
      mid_game: counter.mid_game,
      late_game: counter.late_game,
      guides: counter.guides,
    }))*/ /*
      .filter((c) => c.starting + c.early_game + c.mid_game + c.late_game > 0)
  );*/
  return preResult;
}

export interface ICounteringItems {
  item: string;
  // Guides per phase
  laning_phase: Set<string>;
  mid_game: Set<string>;
  late_game: Set<string>;
  all: Set<string>; // Can be different, as one item can be in two phases
  // Number of relevant guides
  guides: number;
}

/**
 * Return items that counter heroes.
 *
 *
 *
 *
 */
export function mostCounteringItems(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): ICounteringItems[] {
  // Count the number of relevant heroes
  let total = Object.entries(heroBuilds).length;

  // Count the number of items in the relevant guides
  const counter: Record<string, ICounteringItems> = {};
  let hero = undefined;
  const counterItems = new Set<string>();
  for (const { item, phase: phase_, npcShortName } of counterItemIterator(
    role,
    phase
  )) {
    // A hero can have the same counter item twice,
    // e.g. a BKB for cores in mid game and BKB for supports in late game
    // this needs to be corrected

    // Clear control set, if hero changed
    if (hero !== npcShortName) {
      hero = npcShortName;
      counterItems.clear();
    }

    if (!counter[item]) {
      counter[item] = {
        item: item,
        laning_phase: new Set(),
        mid_game: new Set(),
        late_game: new Set(),
        all: new Set(),
        guides: total,
      };
    }
    // Add hero to applicable phase
    (counter as any)[item][phase_].add(npcShortName);
    counter[item].all.add(npcShortName);

    // Add item, if it was not yet added
    /*if (!counterItems.has(item)) {
      counterItems.add(item);
      (counter as any)[item].total++;
    }*/
  }

  // Prepare and sort the results
  const preResult = Object.values(counter)
    /*.map(([key, value]) => ({
      //item: key,
      ...value,
    }))*/
    .sort((a, b) => b.all.size - a.all.size);

  //console.log(`preResult: `, preResult);

  // Return results in the proper format
  return preResult.filter((c) => c.all.size > 0);
}

export interface IItemCoreRecommendedStats {
  core: number;
  nonCore: number;
  without: number;
  total: number;
}

/**
 * Function returns stats per role for an item.
 *
 * The number of items is spit into:
 *    - # of heroes with item core
 *    - # or heroes with item non-core
 *    - # of heroes without item
 *
 */
export function getItemHeroRoleStats(
  itemKey: string
): Record<DOTA_COACH_GUIDE_ROLE, IItemCoreRecommendedStats> {
  const result = {} as Record<DOTA_COACH_GUIDE_ROLE, IItemCoreRecommendedStats>;

  for (const { heroBuild } of heroBuildIterator()) {
    const itemBuild = heroBuild.items;
    let hasItem = false;
    let isCore = false;

    // Iterate through all items
    // Can return as soon as core is found
    for (const [phase, items] of Object.entries(itemBuild)) {
      if (phase.includes("core")) {
        if (items.includes(itemKey)) {
          hasItem = true;
          isCore = true;
          break;
        }
      } else {
        if (items.includes(itemKey)) {
          hasItem = true;
        }
      }
    }

    for (const role of heroBuild.roles) {
      if (!result[role]) {
        result[role] = {
          core: 0,
          nonCore: 0,
          without: 0,
          total: 0,
        };
      }

      if (isCore) {
        result[role].core++;
      } else if (hasItem) {
        result[role].nonCore++;
      } else {
        result[role].without++;
      }
      result[role].total++;
    }
  }

  return result;
}
