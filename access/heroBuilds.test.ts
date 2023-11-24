/**
 * npx jest access/heroBuilds.test.ts
 *
 */
import { IntlShape } from "react-intl";
import { getItemBuild, getTooltip } from "./heroBuilds";
import { i18nLoader } from "@utilities/i18n/i18nLoader";

let intl: IntlShape;
beforeAll(async () => {
  await i18nLoader();
});

test("heroBuilds-getTooltip", () => {
  const tooltip = getTooltip("sniper", 0, "power_treads", intl);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling."
  );
});

test("heroBuilds-getTooltip", () => {
  const tooltip = getTooltip("dummy", 0, "infused_raindrop", intl);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe("Against magical burst.");
});

// Test to review itemBuild object
test("heroBuilds-getItemBuild", () => {
  //const heroContent = heroBuilds["abaddon"];
  //const heroBuild = heroContent.builds[0];

  const itemBuild = getItemBuild("abaddon", 0, intl);

  console.log(`itemBuilds: `, JSON.stringify(itemBuild, null, 2));

  //console.log(`roots: `, buffs);
  expect(true).toBe(true);
});
