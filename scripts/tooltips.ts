/**
 * Script dumps the tooltips for all items.
 *
 * Compile:
 *   - tsc.cmd ; npx tsc-alias
 *
 * Run:
 *   - node.exe .\dist\scripts\tooltips.js
 *
 */

//import { activeItemIterator } from "@gameData/out/dota2ItemUtils";
import { IHeroesWithItem /*getHeroesWithItem*/ } from "../access/heroUtils";

function dumpTooltips() {
  const result: Record<string, IHeroesWithItem[]> = {};
  /*for (const { key, item } of activeItemIterator()) {
    const k = key.replace("item_", "");
    const heroesWithItem = getHeroesWithItem(k);
    result[k] = heroesWithItem;
  }*/

  //
  // Dump result
  //
  console.log(`Result`);
  console.log(`------`);

  for (const [key, value] of Object.entries(result)) {
    //const builds = value.map((v) => v.)
    const tooltips: {
      name: string;
      tooltip: string;
    }[] = [];
    for (const heroesWithItem of value) {
      for (const build of heroesWithItem.builds) {
        /*if (build.tooltip)
          tooltips.push({
            name: heroesWithItem.localizedHeroName,
            tooltip: build.tooltip,
          });*/
      }
    }
    for (const tooltip of tooltips) {
      console.log(`\t${key}`);
      console.log(`\t\t${tooltip.name}: ${tooltip.tooltip}`);
    }
    //console.log(JSON.stringify(result, null, 4));
  }
}

dumpTooltips();
