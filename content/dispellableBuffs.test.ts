/**
 * npx jest dispellableBuffs.test.ts
 *
 */

import { dota2HeroesIterator, getDota2Heroes } from "@gameData/out/dota2Heroes";
import { dispellableBuffs } from "./dispellableBuffs";
import { getDota2Abilities } from "@gameData/out/dota2Abilities";
//import dota2Heroes from "../submodules/gameData/out/dota2Heroes.json";

test("dispellableBuffs-All heroes included", () => {
  for (const { npcName } of dota2HeroesIterator()) {
    if (!dispellableBuffs[npcName.replace("npc_dota_hero_", "")]) {
      expect(`Hero ${npcName} not found`).toBeUndefined();
    }
  }
});

test("dispellableBuffs-Correctness of heroes & abilities", () => {
  const heroes = getDota2Heroes();
  const abilities = getDota2Abilities();

  for (const [key, value] of Object.entries(dispellableBuffs)) {
    if (!heroes["npc_dota_hero_" + key]) {
      expect(`Hero ${key} not found`).toBeUndefined();
    }
    for (const ability of value) {
      if (!abilities[ability]) {
        expect(`Ability ${ability} not found`).toBeUndefined();
      }
    }
  }
});
