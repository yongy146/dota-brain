/**
 *
 * Create 'steamGuideIds.json' file:
 *   - npx ts-node .\scripts\extractSteamGuideIds.ts
 *
 * Upload to aws:
 *   - aws s3 cp ./dist/steamGuideIds.json s3://download.dotacoach.gg/steamGuideIds.json
 *
 */

import { heroBuildIterator } from "../access/heroUtils";
import fs from "fs";

const ids = [];

for (const heroBuild of heroBuildIterator()) {
  ids.push(heroBuild.heroBuild.steam_guide_workshop_ids.en);
}

fs.writeFileSync("./dist/steamGuideIds.json", JSON.stringify(ids.sort()));
//console.log(JSON.stringify(ids.sort()));
