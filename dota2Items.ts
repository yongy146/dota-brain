export interface IItems {
  [key: string]: IItem;
}

export interface IItem {
  name: string; // Maybe change to code?! and move name to internationalizatio?`!
  id?: string; // Maybe change to number?
  is_active?: boolean; // Not availabe in dota2ItemsActive.json
  mana_cost?: number; // 0 if no mana is needed
  cost?: number; // 2250; //
  cooldown?: number; // 15;
  is_recipe?: boolean;
  is_purchasable?: boolean;
  is_neutral?: boolean;
  is_roshan?: boolean;
  speed?: {
    absolute?: number;
    percent?: number;
    auraAbsolute?: number;
    activeAbsolute?: number;
    activePercent?: number; // e.g. 40 for 40%
    duration?: number;
  };
}

/**
 * Calcualted the speed with actication
 *
 * It assumes a speed of 300 for percentage information
 * @param item
 */
export function getSpeed(item: IItem): number {
  let speed = 0;
  if (item.speed !== undefined) {
    if (item.speed.absolute) speed += item.speed.absolute;
    if (item.speed.percent) speed += (300 * item.speed.percent) / 100;
    if (item.speed.activeAbsolute) speed += item.speed.activeAbsolute;
    if (item.speed.activePercent)
      speed += (300 * item.speed.activePercent) / 100;
    // Add aura speed if no other added
    if (speed === 0 && item.speed.auraAbsolute)
      speed += (300 * item.speed.auraAbsolute) / 100;
  }
  return speed;
}

/**
 *
 * @param item e.g. item_blink
 * @returns
 */
export function getRoshanItemOrder(itemName: string): number {
  switch (itemName) {
    case "item_aegis": {
      return 100;
    }
    case "item_ultimate_scepter_roshan": {
      return 99;
    }
    case "item_refresher_shard": {
      return 98;
    }
    case "item_aghanims_shard_roshan": {
      return 97;
    }
    case "item_cheese": {
      return 96;
    }
  }
  return 0;
}
