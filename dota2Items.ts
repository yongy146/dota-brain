export interface IDotaItems {
  [key: string]: IDotaItem;
}

export enum ItemFilter {
  AllItems = "AllItems",
  Strength = "dota.Strength",
  Agility = "dota.Agility",
  Intelligence = "dota.Intelligence",
  Damage = "Damage",
  AttackSpeed = "AttackSpeed",
  CriticalStrike = "CriticalStrike",
  AttackRange = "AttackRange",
  ArmorReduction = "ArmorReduction",
  AttackLifesteal = "AttackLifesteal",
  AttackSlow = "AttackSlow",
  Armor = "Armor",
  Evasion = "Evasion",
  SpellAmplification = "SpellAmplification",
  SpellLifesteal = "SpellLifesteal",
  MagicResistance = "MagicResistance",
  StatusResistance = "StatusResistance",
  HealthRegenReduction = "HealthRegenReduction",
  MovementSpeed = "MovementSpeed",
}

export interface IDotaItem {
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

  // Movement speed
  movement_speed?: number; // Absolute additional speed
  movement_speed_active?: number; // Additional speed when activated
  movement_speed_broke?: number;
  movement_speed_aura?: number;
  movement_speed_percent?: number;
  movement_speed_percent_active?: number; // Additional speed when activated

  // Duration of item when activated
  duration?: number;

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

  // Health regen reduction
  heal_reduction?: number;
  heal_reduction_aura?: number;

  // Attributes
  strength?: number;
  strength_active?: number; // for armlet
  agility?: number;
  intelligence?: number;
  intelligence_percent?: number; // item_psychic_headband
  all_attributes?: number;
  selected_attribute?: number; // for Vambrace
}

export class DotaItem implements IDotaItem {
  // Variables as defined in the interface
  key: string; // e.g. item_blink
  name: string;
  id?: string;
  is_active?: boolean;
  mana_cost?: number;
  cost?: number;
  cooldown?: number;
  is_recipe?: boolean;
  is_purchasable?: boolean;
  is_neutral?: boolean;
  is_roshan?: boolean;

  // Movement speed
  movement_speed?: number; // Absolute additional speed
  movement_speed_active?: number; // Additional speed when activated
  movement_speed_broke?: number;
  movement_speed_aura?: number;
  movement_speed_percent?: number;
  movement_speed_percent_active?: number; // Additional speed when activated

  // Duration of item when activated
  duration?: number;

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

  // Health regen reduction
  heal_reduction?: number;
  heal_reduction_aura?: number;

  // Attributes
  strength_?: number;
  strength_active_?: number; // for armlet
  agility_?: number;
  intelligence_?: number;
  intelligence_percent_?: number; // item_psychic_headband
  all_attributes_?: number;
  selected_attribute?: number; // for Vambrace

  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
  }

  // Getter and setters of enhanced values
  get armor_total(): number | undefined {
    const value = (this.armor || 0) + (this.armor_aura || 0);
    return value === 0 ? undefined : value;
  }
  get crit_multi(): number | undefined {
    const value =
      (this.crit_multiplier || 0) + (this.crit_multiplier_target || 0);
    return value === 0 ? undefined : value;
  }
  get crit_effect(): number | undefined {
    const critMulti = (this.armor || 0) + (this.armor_aura || 0);
    const critEffect = (critMulti - 100) * (this.crit_chance || 0);
    return critEffect === 0 ? undefined : critEffect;
  }
  get attack_speed_total(): number | undefined {
    const value =
      (this.attack_speed || 0) +
      (this.attack_speed_aura || 0) +
      (this.attack_speed_active || 0) +
      (this.attack_speed_target || 0);
    return value === 0 ? undefined : value;
  }
  get attack_slow_mixed(): number | undefined {
    const value =
      (this.attack_slow || 0) +
      (this.attack_slow_melee || 0) * 0.5 +
      (this.attack_slow_ranged || 0) * 0.5;
    return value === 0 ? undefined : value;
  }
  get damage_index(): number | undefined {
    const value =
      (this.damage || 0) +
      (this.damage_melee || 0) +
      //(this.damage_ranged || 0)) *
      //(this.damage_ranged !== undefined ? 0.5 : 1.0) +
      (this.damage_base_percent || 0); // assuming base damage of about 100
    return value === 0 ? undefined : value;
  }
  get attack_range_sum(): number | undefined {
    const value = (this.attack_range || 0) + (this.attack_range_melee || 0);
    return value === 0 ? undefined : value;
  }
  get spell_lifesteal_index(): number | undefined {
    const value =
      (this.spell_lifesteal || 0) + (this.spell_lifesteal_amplifier || 0);
    return value === 0 ? undefined : value;
  }
  get strength(): number | undefined {
    const value =
      (this.strength_ || 0) +
      (this.all_attributes_ || 0) +
      (this.selected_attribute || 0);
    return value === 0 ? undefined : value;
  }
  get agility(): number | undefined {
    const value =
      (this.agility_ || 0) +
      (this.all_attributes_ || 0) +
      (this.selected_attribute || 0);
    return value === 0 ? undefined : value;
  }
  get intelligence(): number | undefined {
    const value =
      (this.intelligence_ || 0) +
      (this.all_attributes_ || 0) +
      (this.selected_attribute || 0);
    return value === 0 ? undefined : value;
  }

  public isVisible(
    filter: ItemFilter,
    includePurchasable: boolean,
    includeNeutral: boolean,
    includeRoshan: boolean
  ): boolean {
    if (this.is_recipe) return false;
    if (includePurchasable === false && this.is_purchasable === true)
      return false;
    if (includeNeutral === false && this.is_neutral === true) return false;
    if (includeRoshan === false && this.is_roshan === true) return false;

    switch (filter) {
      case ItemFilter.AllItems: {
        return true;
      }
      case ItemFilter.Strength: {
        return this.strength !== undefined;
      }
      case ItemFilter.Agility: {
        return this.agility !== undefined;
      }
      case ItemFilter.Intelligence: {
        return this.intelligence !== undefined;
      }
      case ItemFilter.Damage: {
        return true;
        break;
      }
      case ItemFilter.AttackSpeed: {
        return true;
        break;
      }
      case ItemFilter.CriticalStrike: {
        return true;
        break;
      }
      case ItemFilter.AttackRange: {
        return true;
        break;
      }
      case ItemFilter.ArmorReduction: {
        return true;
        break;
      }
      case ItemFilter.AttackLifesteal: {
        return true;
        break;
      }
      case ItemFilter.AttackSlow: {
        return true;
        break;
      }
      case ItemFilter.Armor: {
        return true;
        break;
      }
      case ItemFilter.Evasion: {
        return true;
        break;
      }
      case ItemFilter.SpellAmplification: {
        return true;
        break;
      }
      case ItemFilter.SpellLifesteal: {
        return true;
        break;
      }
      case ItemFilter.MagicResistance: {
        return true;
        break;
      }
      case ItemFilter.StatusResistance: {
        return true;
        break;
      }
      case ItemFilter.HealthRegenReduction: {
        return true;
        break;
      }
      case ItemFilter.MovementSpeed: {
        return true;
      }
      default: {
        // We should never get here through
        return false;
      }
    }
  }

  public getValue(filter: ItemFilter):
    | {
        value: number;
        efficiency: number | undefined;
        isPercent: boolean;
      }
    | undefined {
    switch (filter) {
      case ItemFilter.AllItems: {
        return undefined;
      }
      case ItemFilter.Strength: {
        if (this.strength === undefined) return undefined;
        return {
          value: this.strength,
          efficiency:
            this.cost === undefined ? undefined : this.cost / this.strength,
          isPercent: false,
        };
      }
      case ItemFilter.Agility: {
        return undefined;
      }
      case ItemFilter.Intelligence: {
        return undefined;
      }
      case ItemFilter.Damage: {
        return undefined;
      }
      case ItemFilter.AttackSpeed: {
        return undefined;
      }
      case ItemFilter.CriticalStrike: {
        return undefined;
      }
      case ItemFilter.AttackRange: {
        return undefined;
      }
      case ItemFilter.ArmorReduction: {
        return undefined;
      }
      case ItemFilter.AttackLifesteal: {
        return undefined;
      }
      case ItemFilter.AttackSlow: {
        return undefined;
      }
      case ItemFilter.Armor: {
        return undefined;
      }
      case ItemFilter.Evasion: {
        return undefined;
      }
      case ItemFilter.SpellAmplification: {
        return undefined;
      }
      case ItemFilter.SpellLifesteal: {
        return undefined;
      }
      case ItemFilter.MagicResistance: {
        return undefined;
      }
      case ItemFilter.StatusResistance: {
        return undefined;
      }
      case ItemFilter.HealthRegenReduction: {
        return undefined;
      }
      case ItemFilter.MovementSpeed: {
        return undefined;
      }
      default: {
        // We should never get here through
        return undefined;
      }
    }
  }
}
/*
      case "AllItems": {
        const selectedItems = itemArray.filter((item) => isItemVisible(item));
        selectedItems.sort((itemA, itemB) =>
          itemA.name > itemB.name ? 1 : -1
        );
        setItems(selectedItems);
        break;
      }
      case "dota.Strength": {
        const selectedItems = itemArray.filter(
          (item) => item.strength !== undefined && isItemVisible(item)
        );
        selectedItems.sort((itemA, itemB) => itemB.strength! - itemA.strength!);
        setItems(selectedItems);
        break;
      }
      case "dota.Agility": {
        const selectedItems = itemArray.filter(
          (item) => item.agility !== undefined && isItemVisible(item)
        );
        selectedItems.sort((itemA, itemB) => itemB.agility! - itemA.agility!);
        setItems(selectedItems);
        break;
      }
      case "dota.Intelligence": {
        const selectedItems = itemArray.filter(
          (item) =>
            (item.intelligence !== undefined ||
              item.intelligence_percent !== undefined) &&
            isItemVisible(item)
        );
        selectedItems.sort(
          (itemA, itemB) =>
            (itemB.intelligence || 0) +
            (itemB.intelligence_percent || 0) * 0.35 -
            (itemA.intelligence || 0) -
            (itemA.intelligence_percent || 0) * 0.35
        );
        setItems(selectedItems);
        break;
      }
      case "Damage": {
        const selectedItems = itemArray.filter(
          (item) => item.damage_index !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA, itemB) => itemB.damage_index! - itemA.damage_index!
        );
        setItems(selectedItems);
        break;
      }
      case "AttackRange": {
        const selectedItems = itemArray.filter(
          (item) => item.attack_range_sum !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA, itemB) => itemB.attack_range_sum! - itemA.attack_range_sum!
        );
        setItems(selectedItems);
        break;
      }

      case "Armor": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.armor_total !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemB.armor_total! - itemA.armor_total!
        );
        setItems(selectedItems);
        break;
      }
      case "ArmorReduction": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.armor_reduction !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemA.armor_reduction! - itemB.armor_reduction!
        );
        setItems(selectedItems);
        break;
      }
      case "StatusResistance": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.status_resistance !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemB.status_resistance! - itemA.status_resistance!
        );
        setItems(selectedItems);
        break;
      }
      case "Evasion": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.evasion !== undefined && isItemVisible(item)
        );
        selectedItems.sort((itemA: DotaItem, itemB: DotaItem) =>
          itemB.evasion! === itemA.evasion!
            ? (itemB.cost || 0) - (itemA.cost || 0)
            : itemB.evasion! - itemA.evasion!
        );
        setItems(selectedItems);
        break;
      }
      case "CriticalStrike": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.crit_chance !== undefined && isItemVisible(item)
        );
        selectedItems.sort((itemA: DotaItem, itemB: DotaItem) =>
          itemB.crit_effect === itemA.crit_effect!
            ? itemB.cost! - itemA.cost!
            : itemB.crit_effect! - itemA.crit_effect!
        );
        setItems(selectedItems);
        break;
      }
      case "AttackSpeed": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.attack_speed_total !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            Math.abs(itemB.attack_speed_total!) -
            Math.abs(itemA.attack_speed_total!)
        );
        setItems(selectedItems);
        break;
      }
      case "AttackSlow": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => item.attack_slow_mixed !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemA.attack_slow_mixed! - itemB.attack_slow_mixed!
        );
        setItems(selectedItems);
        break;
      }
      case "AttackLifesteal": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) =>
            ((item as any).attack_lifesteal !== undefined ||
              (item as any).attack_lifesteal_absolute !== undefined) &&
            isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            (itemB.attack_lifesteal || 0) - (itemA.attack_lifesteal || 0)
        );
        setItems(selectedItems);
        break;
      }
      case "SpellLifesteal": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) =>
            (item as any).spell_lifesteal_index !== undefined &&
            isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemB.spell_lifesteal_index! - itemA.spell_lifesteal_index!
        );
        setItems(selectedItems);
        break;
      }
      case "SpellAmplification": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => (item as any).spell_amp !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemB.spell_amp! - itemA.spell_amp!
        );
        setItems(selectedItems);
        break;
      }
      case "MagicResistance": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) =>
            ((item as any).magic_resist !== undefined ||
              (item as any).magic_resist_aura !== undefined) &&
            isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            itemB.magic_resist! - itemA.magic_resist!
        );
        setItems(selectedItems);
        break;
      }
      case "HealthRegenReduction": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) =>
            ((item as any).heal_reduction !== undefined ||
              (item as any).heal_reduction_aura !== undefined) &&
            isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            (itemB.heal_reduction || 0) +
            (itemB.heal_reduction_aura || 0) -
            (itemA.heal_reduction || 0) -
            (itemA.heal_reduction_aura || 0)
        );
        setItems(selectedItems);
        break;
      }
      case "MovementSpeed": {
        const selectedItems: DotaItem[] = itemArray.filter(
          (item) => (item as any).speed !== undefined && isItemVisible(item)
        );
        selectedItems.sort(
          (itemA: DotaItem, itemB: DotaItem) =>
            getSpeed(itemB) - getSpeed(itemA)
        );
        /*absolute?: number;
            percent?: number;
            brokenAbsolute?: number;
            activeAbsolute?: number;
            activeRelative
            auraAbsolute*/
/*
        setItems(selectedItems);
        break;
      }*/

/*export function getSortValue(item: IItem): number {
\
}*/

/**
 * Calcualted the speed with actication
 *
 * It assumes a speed of 300 for percentage information
 * @param item
 */
export function getSpeed(item: DotaItem): number {
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
