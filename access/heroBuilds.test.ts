/**
 * npx jest access/heroBuilds.test.ts
 *
 */
import { IntlShape } from "react-intl";
import { getTooltip, hasDefaultHeroBuild } from "./heroBuilds";
import { i18nLoader } from "@utilities/i18n/i18nLoader";

let intl: IntlShape | undefined;
beforeAll(async () => {
  intl = await i18nLoader();
});

test("heroBuilds-hasDefaultHeroBuild()", () => {
  let hasDefaultBuild = hasDefaultHeroBuild("sniper");
  expect(hasDefaultBuild).toBe(true);
  hasDefaultBuild = hasDefaultHeroBuild("sniper_");
  expect(hasDefaultBuild).toBe(false);
});

test("heroBuilds-getTooltip(sniper, power_treads)", () => {
  const tooltip = getTooltip("sniper", 0, "power_treads", intl!);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "A core Boots upgrade to improve your mobility and damage output with attack speed and stats. Helps in both farming and lane control. The attack speed gain lets you get off more Headshots during Take Aim."
  );
});

test("heroBuilds-getTooltip(dummy, infused_raindrop)", () => {
  const tooltip = getTooltip("dummy", 0, "infused_raindrop", intl!);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "An early to mid game item to defend against bursts of magical damage. Also provides some useful mana regeneration."
  );
});

// Test to review itemBuild object
/*test("heroBuilds-getItemBuild", () => {
  const itemBuild = getItemBuild("abaddon", 0, intl);

  console.log(`itemBuilds: `, JSON.stringify(itemBuild, null, 2));

  expect(true).toBe(true);
});*/
