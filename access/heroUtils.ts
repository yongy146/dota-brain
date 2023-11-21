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

/**
 * Returns all heroes for which the given item is core.
 *
 * @params itemKey, e.g. "magic_wand"
 */
export function getCoreHeroes(itemKey: string): string[] {
  const result: string[] = [];

  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    let hasItem = false;

    // Check if item is core in one of the builds
    for (const build of heroContent.builds) {
      for (const [phase, itemBuild] of Object.entries(build.items)) {
        if (phase.includes("core")) {
          for (const item of itemBuild) {
            if (item === itemKey) {
              hasItem = true;
              break;
            }
          }
          if (hasItem) break;
        }
      }
      if (hasItem) break;
    }

    if (hasItem) {
      //console.log(`hasItem: `, itemKey);
      result.push(npcShortName);
    }
  }

  return result;
}

/**
 * Returns all heroes that are countered by a given item.
 *
 * @params itemKey, e.g. "magic_wand"
 * @returns npc short names of heroes, e.g. ["antimage", "legion_commander", etc.]
 */
export function getHeroesCounteredBy(itemKey: string): string[] {
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
 * Iterator that goes through all items in the hero guides.
 *
 * Skips core for all heroes (as the items are repeated)
 * except Lone Druid and neutral items for all heroes.
 *
 */
export function* itemIterator(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): Generator<{
  item: string;
  npcShortName: string;
  phase: string;
}> {
  const phaseItemBuild = phase ? phase2ItemBuild[phase] : undefined;

  //console.log(`phase: `, phase);
  //console.log(`phaseItemBuild: `, phaseItemBuild);

  for (const { npcShortName, heroBuild } of heroBuildIterator()) {
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
  early_game: "DOTA_Item_Build_Early_Game",
  laning: "LaningPhaseCap",
  mid_game: "DOTA_Item_Build_Mid_Items",
  late_game: "DOTA_Item_Build_Late_Items",
  situational: "Situational",
  neutral: "Neutral",
};

/**
 * Counter items mentioned for two roles, are only reported once.
 *
 * Supported roles: undefined (all), support, mid/carry/offlane (all seen as core)
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
 */
export function* heroBuildIterator(): Generator<{
  npcShortName: string;
  heroBuild: IHeroBuild;
}> {
  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    for (const heroBuild of heroContent.builds) {
      yield { npcShortName, heroBuild };
    }
  }
}

function buildContainsItem(build: IHeroBuild, item: string): boolean {
  for (const items of Object.values(build.items)) {
    if (items.includes(item)) return true;
  }
  return false;
}

/**
 * Return the most recommended items for all heroes in the hero guides.
 *
 */
export function mostRecommendedItems(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): {
  item: string;
  // Guides per phase
  starting: number;
  early_game: number;
  mid_game: number;
  late_game: number;
  // Number of relevant guides
  guides: number;
}[] {
  // Count the number of relevant guides
  let total = 0;
  for (const heroBuild of heroBuildIterator()) {
    const roleSatisfied = role
      ? heroBuild.heroBuild.roles.includes(role)
      : true;
    if (roleSatisfied) total++;
    /*const phaseSatisfied = role ? heroBuild.heroBuild.items.includes(role) : true;
    if (role) {
      /*console.log(
        `role: ${role}; heroBuild.heroBuild.roles: ${JSON.stringify(
          heroBuild.heroBuild.roles
        )}`
      );*/
    /*if (heroBuild.heroBuild.roles.includes(role)) total++;
    } else {
      total++;
    }*/
  }
  //console.log(`heroBuilds: `, total);

  // Count the number of items in the relevant guides
  const counter: Record<
    string,
    {
      starting: number;
      early_game: number;
      mid_game: number;
      late_game: number;
      guides: number;
    }
  > = {};
  for (const item of itemIterator(role, phase)) {
    if (!counter[item.item]) {
      counter[item.item] = {
        starting: 0,
        early_game: 0,
        mid_game: 0,
        late_game: 0,
        guides: total,
      };
    }
    // Incement counter for applicable phase
    (counter as any)[item.item][item.phase]++;
  }

  // Prepare and sort the results
  const preResult = Object.entries(counter)
    .map(([key, value]) => ({
      item: key,
      ...value,
    }))
    .sort(
      (a, b) =>
        b.starting +
        b.early_game +
        b.mid_game +
        b.late_game -
        a.starting -
        a.early_game -
        a.mid_game -
        a.late_game
    );

  // Return results in the proper format
  return (
    preResult
      /*.map((counter) => ({
      item: counter.item,
      starting: counter.starting,
      early_game: counter.early_game,
      mid_game: counter.mid_game,
      late_game: counter.late_game,
      guides: counter.guides,
    }))*/
      .filter((c) => c.starting + c.early_game + c.mid_game + c.late_game > 0)
  );
}

/**
 * Return items countering most heroes.
 *
 *
 *
 */
export function mostCounteringItems(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): {
  item: string;
  // Guides per phase
  laning_phase: number;
  mid_game: number;
  late_game: number;
  total: number; // Can be different, as one item can be in two phases
  // Number of relevant guides
  guides: number;
}[] {
  // Count the number of relevant heroes
  let total = Object.entries(heroBuilds).length;

  // Count the number of items in the relevant guides
  const counter: Record<
    string,
    {
      item: string;
      laning_phase: number;
      mid_game: number;
      late_game: number;
      total: number;
      guides: number;
    }
  > = {};
  let hero = undefined;
  const counterItems = new Set<string>();
  for (const item of counterItemIterator(role, phase)) {
    // A hero can have the sam ecounter item twice,
    // e.g. a BKB for cores in mid game and BKB for supports in late game
    // This needs to be corrected

    // Clear control set, if hero changed
    if (hero !== item.npcShortName) {
      hero = item.npcShortName;
      counterItems.clear();
    }

    if (!counter[item.item]) {
      counter[item.item] = {
        item: item.item,
        laning_phase: 0,
        mid_game: 0,
        late_game: 0,
        total: 0,
        guides: total,
      };
    }
    // Increment counter for applicable phase
    (counter as any)[item.item][item.phase]++;

    // Add item, if it was not yet added
    if (!counterItems.has(item.item)) {
      counterItems.add(item.item);
      (counter as any)[item.item].total++;
    }
  }

  // Prepare and sort the results
  const preResult = Object.entries(counter)
    .map(([key, value]) => ({
      //item: key,
      ...value,
    }))
    .sort(
      (a, b) =>
        b.laning_phase +
        b.mid_game +
        b.late_game -
        a.laning_phase -
        a.mid_game -
        a.late_game
    );

  // Return results in the proper format
  return preResult.filter((c) => c.laning_phase + c.mid_game + c.late_game > 0);
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
