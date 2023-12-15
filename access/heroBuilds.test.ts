/**
 * npx jest access/heroBuilds.test.ts
 *
 */
import { IntlShape } from "react-intl";
import { getItemBuild, getTooltip } from "./heroBuilds";
import { i18nLoader } from "@utilities/i18n/i18nLoader";

let intl: IntlShape | undefined;
beforeAll(async () => {
  intl = await i18nLoader();
});

test("heroBuilds-getTooltip(sniper, power_treads)", () => {
  const tooltip = getTooltip("sniper", 0, "power_treads", intl);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling."
  );
});

test("heroBuilds-getTooltip(dummy, infused_raindrop)", () => {
  const tooltip = getTooltip("dummy", 0, "infused_raindrop", intl);
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
