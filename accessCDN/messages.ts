/**
 * Module to access Dota Brain messages through S3.
 *
 */
import axios from "axios";

const url = "https://download.dotacoach.gg/dotaBrain/messages.json";

let data: any;

export async function loadDotaBrainMessages() {
  if (data) return;

  const response = await axios.get(url);

  data = response.data;
  //console.log(`json: `, data);
}

export async function getOwnHeroMessages(
  npcShortName: string
): Promise<string[]> {
  await loadDotaBrainMessages();

  const messages = Object.values(
    data?.dotaBrain?.[npcShortName]?.ownHero || {}
  ).map((entry: any) => entry.textMessage as string);

  return messages;
}

export async function getEnemyHeroMessages(
  npcShortName: string
): Promise<string[]> {
  await loadDotaBrainMessages();

  const messages = Object.values(
    data?.dotaBrain?.[npcShortName]?.enemyHero || {}
  ).map((entry: any) => entry.textMessage as string);

  return messages;
}
