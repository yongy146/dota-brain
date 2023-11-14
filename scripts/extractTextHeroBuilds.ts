/**
 * Script dumps the tooltips for all items.
 *
 * Compile:
 *   - tsc.cmd ; npx tsc-alias
 *
 * Run:
 *   - node.exe .\dist\scripts\extractTextHeroBuilds.js
 *
 */

import { activeItemIterator } from "@gameData/out/dota2ItemUtils";
import { IHeroesWithItem, getHeroesWithItem } from "access/heroUtils";
import { heroBuilds } from "content/heroBuilds";
import _ from "lodash";

function dumpText() {
  console.log("{");
  for (const [heroName, content] of Object.entries(heroBuilds)) {
    console.log(`"${heroName}": {`);

    if (content.builds.length) {
      console.log(`\t"build": [`);

      for (const build of content.builds) {
        if (build.ability_tooltips || build.item_tooltips) {
          console.log(`\t{`);
          if (build.ability_tooltips) {
            console.log(`\t"ability_tooltips":\r`);
            console.log(
              JSON.stringify(build.ability_tooltips, null, "\t\t" + ",")
            );
          }
          if (build.item_tooltips) {
            console.log(`\t"item_tooltips":\r`);
            console.log(
              JSON.stringify(build.item_tooltips, null, "\t\t" + ",")
            );
          }
          console.log(`\t},`);
        }
      }
      console.log(`],`);
    }

    if (content.ability_tooltips) {
      console.log(`\t"ability_tooltips":\r`);
      console.log(JSON.stringify(content.ability_tooltips, null, "\t\t") + ",");
    }
    if (content.item_tooltips) {
      console.log(`\t"item_tooltips":\r`);
      console.log(JSON.stringify(content.item_tooltips, null, "\t\t") + ",");
    }

    console.log(`},`);
  }
  console.log("}");
}

function dumpText2() {
  const result = _.cloneDeep(heroBuilds) as any;

  for (const [heroName, content] of Object.entries<any>(result)) {
    if (content.builds.length) {
      for (const build of content.builds) {
        delete build.roles;
        delete build.type;
        delete build.steam_guide_link;
        delete build.steam_guide_role;
        delete build.dota_fire_id;
        delete build.abilities;
        delete build.items;
        delete build.combo;
        build.item_tooltips = build.item_tooltips || {};
        build.ability_tooltips = build.ability_tooltips || {};
      }
    }

    delete content.creator;
    delete content.gameplay_version;
    delete content.damage_type;
    delete content.combo;
    delete content.counter_items;
    content.ability_tooltips = content.ability_tooltips || {};
    content.item_tooltips = content.item_tooltips || {};
  }
  console.log(JSON.stringify(result, null, 2));
}

dumpText2();
