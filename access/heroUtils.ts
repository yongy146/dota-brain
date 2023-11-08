/**
 * Utility function to access information on heroes.
 *
 */

import {
  CounterItem,
  CounterItems,
  IHeroBuild,
  IHeroContent,
  heroBuilds,
} from "../content/heroBuilds";
import { DOTA_COACH_GUIDE_ROLE } from "../utilities/playerRoles";

export interface IHeroesWithItem {
  localizedHeroName: string;
  builds: IBuildsWithItem[];
}

export interface IBuildsWithItem {
  roles: DOTA_COACH_GUIDE_ROLE[];
  tooltip?: string;
}

/**
 * Function returns all heroes that have the item in
 * their build. It also returns the role and possible tooltips.
 *
 * @item item name, e.g. quelling_blade
 */
export function getHeroesWithItem(item: string): IHeroesWithItem[] {
  console.log(`heroUtils.getHeroesWithItem(item: ${item}): Called`);

  const result: IHeroesWithItem[] = [];

  for (const [localizedHeroName, heroContent] of Object.entries(heroBuilds)) {
    const buildsWithItem: IBuildsWithItem[] = [];
    for (const build of heroContent.builds) {
      const containsItem = buildContainsItem(build, item);
      if (containsItem) {
        const heroWithItem: IBuildsWithItem = {
          roles: build.roles,
        };
        const tooltip = getTooltip(heroContent, build, item);
        if (tooltip) {
          heroWithItem.tooltip = tooltip;
        }
        buildsWithItem.push(heroWithItem);
      }
    }
    if (buildsWithItem.length) {
      result.push({
        localizedHeroName,
        builds: buildsWithItem,
      });
    }
  }

  return result;
}

export interface ICoreHero {
  localizedName: string;
  tooltips?: {
    tooltip: string;
    roles?: DOTA_COACH_GUIDE_ROLE[];
    type?: string; // For Invoker, QW & QE
  }[];
}

/**
 * Returns all heroes for which the given item is core.
 *
 * It also returns all the assocaited tooltips.
 *
 * @params itemKey, e.g. "margic_wand"
 */
export function getCoreHeroes(itemKey: string): ICoreHero[] {
  const result: ICoreHero[] = [];

  for (const [localizedName, heroContent] of Object.entries(heroBuilds)) {
    const oneResult: ICoreHero = {
      localizedName: "",
    };

    // Add global tooltips
    const tooltip = heroContent.item_tooltips?.[itemKey];
    if (tooltip) {
      oneResult.tooltips = [];
      oneResult.tooltips.push({
        tooltip,
      });
    }

    for (const build of heroContent.builds) {
      let hasItem = false;
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
      if (hasItem) {
        //console.log(`hasItem: `, itemKey);
        oneResult.localizedName = localizedName;

        // Add build-specific tooltips
        const tooltip = build.item_tooltips?.[itemKey];
        if (tooltip) {
          if (!oneResult.tooltips) oneResult.tooltips = [];
          oneResult.tooltips.push({
            tooltip,
            roles: build.roles,
            type: build.type,
          });
        }
        //console.log(`oneResult: `, JSON.stringify(oneResult));
      }
    }

    if (oneResult.localizedName) result.push(oneResult);
  }
  return result;
}

/**
 * Returns all heroes that are countered by the given item.
 *
 * It also returns all the assocaited tooltips.
 *
 * @params itemKey, e.g. "margic_wand"
 */
export function getHeroesCounteredBy(itemKey: string): ICoreHero[] {
  const result: ICoreHero[] = [];

  for (const [localizedName, heroContent] of Object.entries(heroBuilds)) {
    const oneResult: ICoreHero = {
      localizedName: "",
    };

    let hasItem: boolean | string = false;
    for (const [phase, counterItems] of Object.entries(
      heroContent.counter_items
    )) {
      for (const [role, counterItem] of Object.entries<CounterItem[]>(
        counterItems as any
      )) {
        const item = counterItem.find((item) => item.item === itemKey);
        if (item) {
          if (item.info) {
            hasItem = item.info;
          } else {
            hasItem = true;
          }
          break;
        }
        if (hasItem) break;
      }
    }

    if (hasItem) {
      //console.log(`hasItem: `, itemKey);
      oneResult.localizedName = localizedName;
      if (typeof hasItem === "string") {
        oneResult.tooltips = [
          {
            tooltip: hasItem,
          },
        ];
      }
    }

    if (oneResult.localizedName) result.push(oneResult);
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
 * Iterates through all items in the hero guides.
 *
 * Skips core for all heroes except Lone Druid (as the
 * items are repeated) and neutral items for all heroes.
 *
 */
export function* itemIterator(
  role?: DOTA_COACH_GUIDE_ROLE,
  phase?: string
): Generator<{
  item: string;
  localizedName: string;
  phase: string;
}> {
  const phaseItemBuild = phase ? phase2ItemBuild[phase] : undefined;

  //console.log(`phase: `, phase);
  //console.log(`phaseItemBuild: `, phaseItemBuild);

  for (const { localizedHeroName, heroBuild } of heroBuildIterator()) {
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
                localizedName: localizedHeroName,
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

/**

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
  localizedName: string;
  phase: string;
}> {
  const phaseItemBuild = phase ? phase2CounterItemBuild[phase] : undefined;

  for (const [localizedName, heroContent] of Object.entries(heroBuilds)) {
    for (const [phase, items] of Object.entries(heroContent.counter_items)) {
      if (!phaseItemBuild || phaseItemBuild === phase) {
        for (const [rolePlayer, counterItems] of Object.entries(
          items as CounterItems
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
                localizedName,
                item: (counterItem as CounterItem).item,
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
  localizedHeroName: string;
  heroBuild: IHeroBuild;
}> {
  for (const [localizedHeroName, heroContent] of Object.entries(heroBuilds)) {
    for (const heroBuild of heroContent.builds) {
      yield { localizedHeroName, heroBuild };
    }
  }
}

function buildContainsItem(build: IHeroBuild, item: string): boolean {
  for (const items of Object.values(build.items)) {
    if (items.includes(item)) return true;
  }
  return false;
}

function getTooltip(
  content: IHeroContent,
  build: IHeroBuild,
  item: string
): string | undefined {
  return build.item_tooltips?.[item] || content?.item_tooltips?.[item];
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
      guides: number;
    }
  > = {};
  for (const item of counterItemIterator(role, phase)) {
    if (!counter[item.item]) {
      counter[item.item] = {
        item: item.item,
        laning_phase: 0,
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
  situational: number;
  not: number;
  total: number;
}

/**
 * Function returns stats per role (% or heroes, % core item for heroes) for an item.
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
          situational: 0,
          not: 0,
          total: 0,
        };
      }

      if (isCore) {
        result[role].core++;
      } else if (hasItem) {
        result[role].situational++;
      } else {
        result[role].not++;
      }
      result[role].total++;
    }
  }

  return result;
}
