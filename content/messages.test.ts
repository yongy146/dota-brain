/**
 * npx jest messages.test.ts
 *
 */
import { DOTA_COACH_GUIDE_ROLE } from "../utilities/playerRoles";
import {
  dotaCoachMessages,
  getOwnHeroMessages,
  getOwnHeroMessagesForRoles,
} from "./messages";
import dota2Heroes from "@gameData/out/dota2Heroes.json";

test("messages-getOwnHeroMessages", () => {
  // Checks that all heroes have own messages
  for (const npcName of Object.keys(dota2Heroes)) {
    const msgs = getOwnHeroMessages(npcName);
    expect(msgs.length > 0 || npcName).toBe(true);
  }
});

test("messages-getOwnHeroMessagesForRoles", () => {
  // Checks that all heroes have own messages
  const msgs = getOwnHeroMessagesForRoles("rubick", [
    DOTA_COACH_GUIDE_ROLE.SUPPORT,
  ]);
  //console.log(`msgs: `, msgs);
  expect(msgs.length > 0).toBe(true);
});

test("messages-getOwnHeroMessagesForRoles", () => {
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
