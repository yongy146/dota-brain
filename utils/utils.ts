import { heroBuilds } from "../content/heroBuilds";

export function getAllItemsInHeroBuilds(
  includeCounterItems: boolean
): Set<string> {
  const itemSet = new Set<string>();
  for (const heroContent of Object.values(heroBuilds)) {
    for (const build of heroContent.builds) {
      for (const items of Object.values(build.items)) {
        for (const item of items) {
          itemSet.add(item);
        }
      }
    }

    if (includeCounterItems) {
      for (const counterItems of Object.values(heroContent.counter_items)) {
        for (const items of Object.values(counterItems)) {
          for (const item of items) {
            itemSet.add(item.item);
          }
        }
      }
    }
  }
  return itemSet;
}
