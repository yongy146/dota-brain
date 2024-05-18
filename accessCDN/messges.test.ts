import {
  getEnemyHeroMessages,
  getOwnHeroMessages,
  loadDotaBrainMessages,
} from "./messages";

/**
 * clear ; npx jest messges.test.ts
 *
 */
beforeAll(async () => {
  await loadDotaBrainMessages();
});

test("getOwnHeroMessages", async () => {
  const messages = await getOwnHeroMessages("antimage");
  console.log(`ownHeroMessages:`, messages);
  return;
});

test("getEnemyHeroMessages", async () => {
  const messages = await getEnemyHeroMessages("antimage");
  console.log(`enemyHeroMessages:`, messages);
  return;
});
