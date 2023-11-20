import { getHeroContent } from "./heroContent";

/**
 * Returns an array of counter items for a given hero.
 *
 * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * @param isSupport The role of the player
 * @returns Array of items
 */
export function getCounterItems(
  heroName: string,
  phase: "laning_phase" | "mid_game" | "late_game",
  isSupport: boolean
): string[] {
  //if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
  if (heroName == "Outworld Destroyer") heroName = "Outworld Devourer";

  const heroBuilds = getHeroContent(heroName);

  if (heroBuilds) {
    const allItems = heroBuilds.counter_items[phase].all;
    let roleItems;
    if (isSupport) {
      roleItems = heroBuilds.counter_items[phase].support;
    } else {
      roleItems = heroBuilds.counter_items[phase].core;
    }

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return [...allItems, ...roleItems];
  } else {
    return [];
  }
}
