/**
 * Reports the status of updates on item comments.
 *
 * Run:
 *  - clear ; ts-node-cwd.cmd .\scripts\extractItemsWithDescription.ts
 *
 */
import { IntlShape } from "react-intl";
import { i18nLoader } from "../submodules/utilities/i18n/i18nLoader";
import activeItems from "../submodules/gameData/out/dota2ItemsActive.json";

async function extraction() {
  // Load i18n data
  let intl: IntlShape | undefined;
  console.log(`extraction(): loading intl`);
  intl = await i18nLoader();
  console.log(
    `coreItemTooltips(): intl: ${
      Object.keys(intl?.messages || {}).length
    } object loaded`
  );

  //console.log(`activeItems: `, activeItems);
  const result: {
    done: string[];
    open: string[];
    skipped: string[];
  } = {
    done: [],
    open: [],
    skipped: [],
  };
  for (const item of Object.keys(activeItems)) {
    if (item.includes("recipe") || item.includes("dagon_")) {
      result.skipped.push(item);
    } else if (intl?.messages[`${item}_description`]) {
      result.done.push(item);
    } else {
      result.open.push(item);
    }
  }

  console.log(`result: ${JSON.stringify(result, null, 2)}`);
  console.log(`done: ${result.done.length}`);
  console.log(`open: ${result.open.length}`);
  console.log(`skipped: ${result.skipped.length}`);
}

extraction();
