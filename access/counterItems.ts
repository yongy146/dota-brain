import { IntlShape } from "react-intl";
import { IPhaseItemBuild } from "./heroBuilds";
import { getHeroContent } from "./heroContent";

/**
 * Returns an array of counter items for a given hero.
 *
 * @param npcShortName The name of the hero, e.g. 'abaddon' or 'antimage'
 * @param isSupport The role of the player
 * @returns Array of items
 */
export function getCounterItems(
  npcShortName: string,
  phase: "laning_phase" | "mid_game" | "late_game",
  isSupport: boolean,
  messages?: Record<string, any>
): IPhaseItemBuild[] {
  const heroBuilds = getHeroContent(npcShortName);

  const transformItems = (items: string[], phase: string, role: string): IPhaseItemBuild[] => {
    return items.map((item) => {
      const result: IPhaseItemBuild = {
        name: item,
      };
      if (messages) {
        const id = `hero.${npcShortName}.counter_items.${phase}.${role}.${item}`;
        //console.log(`id: `, id);
        if (messages[id]) result.info = messages[id];
      }
      return result;
    });
  };

  if (heroBuilds) {
    const allItems = transformItems(heroBuilds.counter_items[phase].all, phase, "all");
    let roleItems;
    if (isSupport) {
      roleItems = transformItems(heroBuilds.counter_items[phase].support, phase, "support");
    } else {
      roleItems = transformItems(heroBuilds.counter_items[phase].core, phase, "core");
    }

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return [...allItems, ...roleItems];
  } else {
    return [];
  }
}
