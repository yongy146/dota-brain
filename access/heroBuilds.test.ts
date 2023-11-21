/**
 * npx jest heroBuilds.test.ts
 *
 */
import { IntlShape, createIntl } from "react-intl";
import { getTooltip } from "./heroBuilds";
import { flattenStrings } from "@utilities/i18n/flattenStrings";
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

test("abilities-getTooltip", () => {
  const tooltip = getTooltip("sniper", 0, "power_treads", intl);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling."
  );
});

test("abilities-getTooltip", () => {
  const tooltip = getTooltip("dummy", 0, "infused_raindrop", intl);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe("Against magical burst.");
});
