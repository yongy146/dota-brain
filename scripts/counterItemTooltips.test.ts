/**
 * Component reports all counter items w/o i18n string.
 *
 * Run:
 *   - clear ; npx jest counterItemTooltips.test.ts
 *
 */
import { IntlShape } from "react-intl";
import { i18nLoader } from "@utilities/i18n/i18nLoader";
import { heroBuilds } from "../content/heroBuilds";
import { getCounterItemTooltip, getItemTooltip } from "../access/heroBuilds";

let intl: IntlShape | undefined;
beforeAll(async () => {
  console.log(`counterItemTooltips(): loading intl`);
  intl = await i18nLoader();
  console.log(
    `counterItemTooltips(): intl: ${
      Object.keys(intl?.messages || {}).length
    } object loaded`
  );
  //console.log(`intl: `, intl?.messages);
});

test("counterItemTooltips", () => {
  if (!intl) {
    console.error(`Could not load intl.`);
    expect(true).toBe(false);
    return;
  }

  const foundTooltips = [];
  const missingTooltips = [];
  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    const counterItems = [
      ...heroContent.counter_items.laning_phase.all,
      ...heroContent.counter_items.laning_phase.support,
      ...heroContent.counter_items.laning_phase.core,
      ...heroContent.counter_items.mid_game.all,
      ...heroContent.counter_items.mid_game.support,
      ...heroContent.counter_items.mid_game.core,
      ...heroContent.counter_items.late_game.all,
      ...heroContent.counter_items.late_game.support,
      ...heroContent.counter_items.late_game.core,
    ];
    for (const counterItem of counterItems) {
      const tooltip = getCounterItemTooltip(npcShortName, counterItem, intl);

      if (!tooltip) {
        missingTooltips.push(`${npcShortName}, ${counterItem}`);
      } else {
        foundTooltips.push(`${npcShortName}, ${counterItem}`);
      }
    }
  }

  //console.log(`Found tooltips:\n`, JSON.stringify(foundTooltips, null, 2));
  const result = [...new Set(missingTooltips)];
  console.log(`Missing tooltips:\n`, JSON.stringify(result, null, 2));

  expect(result.length).toBe(0);
});
