/**
 * Script dumps the tooltips for all items.
 *
 * Compile:
 *   - tsc.cmd ; npx tsc-alias
 *
 * Run:
 *   - clear;node.exe .\dist\scripts\extractTextHeroBuilds.js > test.json
 *
 */

//import { activeItemIterator } from "@gameData/out/dota2ItemUtils";
//import { IHeroesWithItem, getHeroesWithItem } from "access/heroUtils";
import { heroBuilds } from "content/heroBuilds";
import _ from "lodash";

function dumpTooltips() {
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

const phases = ["laning_phase", "mid_game", "late_game"];
const roles = ["all", "support", "core"];

function dumpItemInfo() {
  const result = _.cloneDeep(heroBuilds) as any;

  for (const [heroName, content] of Object.entries<any>(result)) {
    result[heroName] = {
      counter_items: content.counter_items || {},
    };
    for (const phase of phases) {
      result[heroName]["counter_items"][phase] =
        result[heroName]["counter_items"][phase] || {};
      //result[heroName]["counter_items"][phase] = {};
      for (const role of roles) {
        result[heroName]["counter_items"][phase][role] =
          result[heroName]["counter_items"][phase][role] || [];
        // Remove items w/o info
        result[heroName]["counter_items"][phase][role] = result[heroName][
          "counter_items"
        ][phase][role].filter((i: any) => !!i.info);
        result[heroName]["counter_items"][phase][role] = Object.fromEntries(
          result[heroName]["counter_items"][phase][role].map((i: any) => [
            i.item,
            i.info,
          ])
        );
      }
    }
  }
  console.log(JSON.stringify({ hero: result }, null, 2));
}

dumpItemInfo();
