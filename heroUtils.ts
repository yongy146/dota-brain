/**
 * Utility function to access information on heroes.
 *
 */

import {
  CounterItem,
  CounterItems,
  HeroBuild,
  HeroContent,
  heroBuilds,
} from "./heroBuilds";
import { DOTA_COACH_GUIDE_ROLE } from "./playerRoles";

export interface IHeroesWithItem {
  localizedHeroName: string;
  builds: IBuildsWithItem[];
}

export interface IBuildsWithItem {
  roles: DOTA_COACH_GUIDE_ROLE[];
  tooltip?: string;
}

/**
 * Function returns all heroes that have the item in their build. It also returns the and also tooltips
 *
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

/**
 * Iterates through all the items an the hero guides.
 *
 */
function* itemIterator(role?: DOTA_COACH_GUIDE_ROLE): Generator<string, void> {
  for (const { heroBuild } of heroBuildIterator()) {
    if (!role || heroBuild.roles.includes(role)) {
      for (const [category, items] of Object.entries(heroBuild.items)) {
        // Remove duplicates (e.g. branches)
        // Remove "core", "core_bear" and "situational" (as it is a repetition)
        if (category.includes("core") || category.includes("situational")) {
          // These are duplicated items, remove
        } else {
          //console.log(`items: `, items);
          const releventItems = (items as string[]).filter(
            (item: string, i) => (items as string[]).indexOf(item) === i
          );
          for (const item of releventItems) {
            yield item;
          }
        }
      }
    }
  }
}

function* counterItemIterator(): Generator<{ item: string }, void> {
  for (const heroBuild of heroBuildIterator()) {
    for (const phase of Object.values(heroBuilds.counter_items)) {
      for (const counterItems of Object.values(phase as CounterItems)) {
        for (const counterItem of counterItems) {
          yield { item: (counterItem as CounterItem).item };
        }
      }
    }
  }
}

function* heroBuildIterator(): Generator<
  { localizedHeroName: string; heroBuild: HeroBuild },
  void
> {
  for (const [localizedHeroName, heroContent] of Object.entries(heroBuilds)) {
    for (const heroBuild of heroContent.builds) {
      yield { localizedHeroName, heroBuild };
    }
  }
}

function buildContainsItem(build: HeroBuild, item: string): boolean {
  for (const items of Object.values(build.items)) {
    if (items.includes(item)) return true;
  }
  return false;
}

function getTooltip(
  content: HeroContent,
  build: HeroBuild,
  item: string
): string | undefined {
  return build.item_tooltips?.[item] || content?.item_tooltips?.[item];
}

/**
 * Return the most recommended items for all heroes in the hero guides.
 *
 */
export function mostRecommendedItems(role?: DOTA_COACH_GUIDE_ROLE): {
  item: string;
  pct: number;
}[] {
  // Count the number of relevant guides
  let total = 0;
  for (const heroBuild of heroBuildIterator()) {
    if (role) {
      /*console.log(
        `role: ${role}; heroBuild.heroBuild.roles: ${JSON.stringify(
          heroBuild.heroBuild.roles
        )}`
      );*/
      if (heroBuild.heroBuild.roles.includes(role)) total++;
    } else {
      total++;
    }
  }
  console.log(`heroBuilds: `, total);

  // Count the number of items in the relevant guides
  const counter: Record<string, number> = {};
  for (const item of itemIterator(role)) {
    counter[item] = (counter[item] || 0) + 1;
  }

  // Prepare and sort the results
  const preResult = Object.entries(counter)
    .map(([key, value]) => ({
      item: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count);

  // Return results in the proper format
  return preResult.map((counter) => ({
    item: counter.item,
    pct: counter.count / total,
  }));
}
