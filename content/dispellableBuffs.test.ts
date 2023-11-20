/**
 * npx jest heroBuilds.test.ts
 *
 */

import { heroBuilds } from "./heroBuilds";
//import dota2Heroes from "../submodules/gameData/out/dota2Heroes.json";

test("dispellableBuffs-Dispellable buffs", () => {
  getHeroes;
  for (const hero of Object.keys(heroBuilds)) {
    const npcName = "npc_dota_hero_" + hero;
    const item = (dota2Heroes as any)[npcName];
    //console.log(`npcName: `, npcName);
    expect(!!item).toBe(true);
  }
});
