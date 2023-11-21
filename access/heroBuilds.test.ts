/**
 * npx jest access/heroBuilds.test.ts
 *
 */
import { IntlShape, createIntl } from "react-intl";
import { getItemBuild, getTooltip } from "./heroBuilds";
import { flattenStrings } from "@utilities/i18n/flattenStrings";
import { heroBuilds } from "../content/heroBuilds";
import axios from "axios";

let intl: IntlShape;

beforeAll(async () => {
  const response = await axios.get(
    "https://i18n.dotacoach.gg/storybook/en.json"
  );

  const locale = "en";
  const messages = flattenStrings(response.data as Record<string, string>);

  //console.log(`messages:`, messages);
  /*console.log(
    `messages:`,
    Object.keys(messages).filter((k) => k.startsWith("hero.sniper"))
  );*/

  if (response.data) {
    intl = createIntl({ locale, messages });
  }

  //console.log(`intl:`, intl);
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
