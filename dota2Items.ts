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

  // Armor information
  armor?: number;
  armor_aura?: number;
  armor_activated?: number;
  armor_reduction?: number;

  // Status resistance
  status_resistance?: number;

  // Evasion
  evasion?: number;

  // Critical strike
  crit_multiplier?: number;
  crit_multiplier_target?: number;
  crit_chance?: number;

  // Attack speed
  attack_speed?: number; // absolute values
  attack_speed_aura?: number; // absolute values
  attack_speed_active?: number; // absolute values
  //attack_speed_percent?: number;
  attack_speed_target?: number; // absolute values

  // Attack slow
  attack_slow?: number;
  attack_slow_melee?: number;
  attack_slow_ranged?: number;

  // Attack lifesteam (all are in %, except for absolue)
  attack_lifesteal?: number; // X
  attack_lifesteal_active?: number; // Satanic
  attack_lifesteal_absolute?: number; // x

  // Spell lifesteal
  spell_lifesteal?: number; // X
  spell_lifesteal_multiplier?: number; // only for item Bloodstone X
  spell_lifesteal_amplifier?: number;

  // Spell amp
  spell_amp?: number;

  // Magic resistance
  magic_resist?: number;
  magic_resist_aura?: number; // Auro is not commulative (only availalbe on Pipe of Insight)

  // Physical damage
  damage?: number; // Absolute value per hit
  damage_melee?: number; // Absolute value per hit
  damage_ranged?: number; // Absolute value per hit
  damage_active?: number; // Absolute value per hit
  damage_base_percent?: number; // Damage w/o items and effects
  damage_bonus?: number; // Absolute value per hit
  damage_bonus_chance?: number;
  damage_aura?: number; // Absolute value per second
  damage_aura_percent?: number;

  // Attack range
  attack_range?: number; // Atack range for ranged heroes only
  attack_range_melee?: number; // Attack range for melee heroes only

  // Attributes
  strength?: number;
  strength_active?: number; // for armlet
  agility?: number;
  intelligence?: number;
  intelligence_percent?: number; // item_psychic_headband
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
