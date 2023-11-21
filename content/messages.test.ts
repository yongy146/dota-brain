/**
 * npx jest messages.test.ts
 *
 */
import { dotaCoachMessages, getOwnHeroMessages } from "./messages";
import dota2Heroes from "../submodules/gameData/out/dota2Heroes.json";

test("messages-getOwnHeroMessages", () => {
  // Checks that all heroes has own messages
  for (const npcName of Object.keys(dota2Heroes)) {
    const msgs = getOwnHeroMessages(npcName.replace("npc_dota_hero_", ""));
    expect(msgs.length > 0 || npcName).toBe(true);
  }
});

test("messages-messages", () => {
  // Checks that all heroes in messages.ts exists
  for (const message of dotaCoachMessages) {
    if (message.npcHeroName) {
      expect(
        !!(dota2Heroes as any)["npc_dota_hero_" + message.npcHeroName] ||
          message.npcHeroName
      ).toBe(true);
    }
  }
});
