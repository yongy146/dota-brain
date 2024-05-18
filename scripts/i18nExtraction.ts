/**
 * Format of messages:
 *   - dotaBrain
 *      - hero (optional)
 *          - audiofile (replace "/" with ".")
 *              - textMessage
 *              - chatMessages
 *
 * Run:
 *   - clear ; npx ts-node .\scripts\i18nExtraction.ts
 *
 *
 */

import { dotaCoachMessages } from "../content/messages";
import * as fs from "fs";

async function i18nExtraction() {
  const i18n: any = {
    dotaBrain: {},
  };

  for (const message of dotaCoachMessages) {
    let index: any = i18n.dotaBrain;

    // Add hero name
    const npcHeroName = message.npcHeroName;
    if (npcHeroName) {
      if (index[npcHeroName] === undefined) {
        index[npcHeroName] = {};
      }
      index = index[npcHeroName];
    }

    // Add audio file
    const audioFile = message.audioFile.split("/");
    for (const segment of audioFile) {
      if (index[segment] === undefined) {
        index[segment] = {};
      }
      index = index[segment];
    }

    // Add message
    index.textMessage = message.textMessage;
    if (message.chatMessage) index.chatMessage = message.chatMessage;
  }

  fs.writeFileSync("./cdn/messages.json", JSON.stringify(i18n));
  //console.log(`i18n:`, JSON.stringify(i18n));
}

i18nExtraction();
