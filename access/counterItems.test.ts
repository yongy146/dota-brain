/**
 * npx jest access/counterItems.test.ts
 *
 */
import { IntlShape, createIntl } from "react-intl";
import { getItemBuild } from "./heroBuilds";
import { flattenStrings } from "@utilities/i18n/flattenStrings";
import { heroBuilds } from "../content/heroBuilds";
import axios from "axios";
import { getCounterItems } from "./counterItems";

let intl: IntlShape;

beforeAll(async () => {
  const response = await axios.get("https://i18n.dotacoach.gg/storybook/en.json");

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

test("counterItems-getCounterItems", () => {
  const counterItems = getCounterItems("sniper", "laning_phase", false, intl);
  //console.log(`counterItems:\n`, counterItems);

  expect(counterItems.length > 0).toBe(true);
});
