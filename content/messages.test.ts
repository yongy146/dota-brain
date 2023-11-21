/**
 * npx jest messages.test.ts
 *
 */

import { heroBuilds } from "./heroBuilds";
import dota2Heroes from "../submodules/gameData/out/dota2Heroes.json";
import { getOwnHeroMessages } from "./messages";

test("messages-getOwnHeroMessages", () => {
  const npcName = "npc_dota_hero_nevermore";
  const msgs = getOwnHeroMessages(npcName);

  console.log(`msgs: `, msgs);
  expect(!!msgs).toBe(true);
});

// Test all heroes have messages...
