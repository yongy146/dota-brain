export interface IDotaItems {
  [key: string]: IDotaItem;
}

export enum ItemFilter {
  AllItems = "AllItems",
  Strength = "dota.Strength",
  Agility = "dota.Agility",
  Intelligence = "dota.Intelligence",
  DamageLeftClick = "DamageLeftClick",
  DamageAura = "DamageAura",
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
  //name: string; // Moved to localization
  id?: string; // Maybe change to number?
  is_active?: boolean; // Not availabe in dota2ItemsActive.json
  mana_cost?: number; // 0 if no mana is needed
  cost?: number; // 2250; //
  cooldown?: number; // 15;
  is_recipe?: boolean;

  // Item source
  is_purchasable?: boolean;
  is_neutral?: boolean;
  is_roshan?: boolean;

  // Neutral items
  neutral_level?: number;
  drop_time?: string;
  drop_rate?: number;

  // Movement speed
  movement_speed?: number; // Absolute additional speed
  movement_speed_active?: number; // Additional speed when activated
  movement_speed_broke?: number;
  movement_speed_aura?: number;
  movement_speed_percent?: number;
  movement_speed_percent_active?: number; // Additional speed when activated

  // Duration of item when activated
  duration?: number;

  // Invisiblitiy
  grants_invisibility?: boolean;
  grants_true_sight?: boolean;

  // Passive break
  breaks_passives?: boolean;

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
  crit_multiplier_?: number; // multiplicator, e.g. 230
  crit_multiplier_target?: number;
  crit_chance?: number; // change, e.g. 130

  // Attack speed
  attack_speed_?: number; // absolute value
  attack_speed_aura?: number; // absolute value
  attack_speed_active?: number; // absolute value
  attack_speed_target?: number; // absolute value

  // Attack slow
  attack_slow_?: number; // absolute value
  attack_slow_melee?: number; // absolute value
  attack_slow_ranged?: number; // absolute value
  attack_slow_aura?: number; // absolute value

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
  damage_?: number; // Absolute value per hit
  damage_melee?: number; // Absolute value per hit
  damage_ranged?: number; // Absolute value per hit
  damage_active?: number; // Absolute value per hit
  damage_base_percent?: number; // Damage w/o items and effects
  damage_bonus?: number; // Absolute value per hit
  damage_bonus_chance?: number;
  damage_aura?: number; // Absolute value per second
  damage_aura_percent?: number;

  // Attack range
  attack_range_?: number; // Atack range for ranged heroes only
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
  //name: string; // Moved to localization...
  id?: string;
  is_active?: boolean;
  mana_cost?: number;
  cost?: number;
  cooldown?: number;
  is_recipe?: boolean;

  // Item source
  is_purchasable?: boolean;
  is_neutral?: boolean;
  is_roshan?: boolean;

  // Neutral items
  neutral_level?: number;
  drop_time?: string;
  drop_rate?: number;

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
  crit_multiplier_?: number;
  crit_multiplier_target?: number;
  crit_chance?: number;

  // Attack speed
  attack_speed_?: number; // absolute values
  attack_speed_aura?: number; // absolute values
  attack_speed_active?: number; // absolute values
  attack_speed_target?: number; // absolute values

  // Attack slow
  attack_slow_?: number;
  attack_slow_melee?: number;
  attack_slow_ranged?: number;
  attack_slow_aura?: number;

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
  damage_?: number; // Absolute value per hit
  damage_melee?: number; // Absolute value per hit
  damage_ranged?: number; // Absolute value per hit
  damage_active?: number; // Absolute value per hit
  damage_base_percent?: number; // Damage w/o items and effects
  damage_bonus?: number; // Absolute value per hit
  damage_bonus_chance?: number;
  damage_aura?: number; // Absolute value per second
  damage_aura_percent?: number;

  // Attack range
  attack_range_?: number; // Atack range for ranged heroes only
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

  constructor(key: string) {
    this.key = key;
  }

  // Getter and setters of enhanced values
  get armor_total(): number | undefined {
    const value = (this.armor || 0) + (this.armor_aura || 0);
    return value === 0 ? undefined : value;
  }
  get hasCriticalStrike(): boolean {
    return (
      this.crit_multiplier_ !== undefined ||
      this.crit_multiplier_target !== undefined ||
      this.crit_chance !== undefined
    );
  }
  get crit_multiplier(): number | undefined {
    const value =
      (this.crit_multiplier_ || 0) + (this.crit_multiplier_target || 0);
    return value === 0 ? undefined : value;
  }
  get crit_effect(): number | undefined {
    const critEffect =
      ((this.crit_multiplier || 0) * (this.crit_chance || 0)) / 100;
    return critEffect === 0 ? undefined : critEffect;
  }
  get hasAttackSpeed(): boolean {
    return this.attack_speed !== undefined;
  }
  get attack_speed(): number | undefined {
    const value =
      (this.attack_speed_ || 0) +
      (this.attack_speed_aura || 0) +
      (this.attack_speed_active || 0) +
      (this.attack_speed_target || 0);
    return value === 0 ? undefined : value;
  }
  get hasAttackSlow(): boolean {
    return this.attack_slow !== undefined;
  }
  get attack_slow(): number | undefined {
    const value =
      (this.attack_slow_ || 0) +
      (this.attack_slow_melee || 0) +
      (this.attack_slow_ranged || 0) +
      (this.attack_slow_aura || 0);
    return value === 0 ? undefined : value;
  }
  get attack_slow_mixed(): number | undefined {
    const value =
      (this.attack_slow || 0) +
      (this.attack_slow_melee || 0) * 0.5 +
      (this.attack_slow_ranged || 0) * 0.5;
    return value === 0 ? undefined : value;
  }
  get damageLeftClick(): number | undefined {
    let value =
      (this.damage_ || 0) +
      (this.damage_melee || 0) +
      (this.damage_ranged || 0);

    if (this.damage_ranged !== undefined) {
      value /= 2;
    }

    value +=
      ((this.damage_bonus || 0) * (this.damage_bonus_chance || 100)) / 100;

    value += (this.damage_active || 0) + (this.damage_base_percent || 0); // assuming base damage of about 100

    return value === 0 ? undefined : value;
  }
  get damageAura(): number | undefined {
    const value = (this.damage_aura || 0) + (this.damage_aura_percent || 0);
    return value === 0 ? undefined : value;
  }

  get doesDamageLeftClick(): boolean {
    return (
      (this.damage_ || 0) +
        (this.damage_melee || 0) +
        (this.damage_ranged || 0) +
        (this.damage_active || 0) +
        (this.damage_base_percent || 0) +
        (this.damage_bonus || 0) >
      0
    );
  }
  get doesDamageAura(): boolean {
    return (this.damage_aura || 0) + (this.damage_aura_percent || 0) > 0;
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
      (this.strength_active_ || 0) +
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
      (this.intelligence_percent_ || 0) +
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

    if (
      (includePurchasable === true &&
        (this.is_purchasable === true || this.key === "item_tango_single")) ||
      (includeNeutral === true && this.is_neutral === true) ||
      (includeRoshan === true && this.is_roshan === true)
    ) {
      // Item shall be included
    } else {
      // Item shall not be included
      return false;
    }

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
      case ItemFilter.DamageLeftClick: {
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return this.doesDamageLeftClick;
      }
      case ItemFilter.DamageAura: {
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return this.doesDamageAura;
      }
      case ItemFilter.AttackSpeed: {
        return this.hasAttackSpeed;
      }
      case ItemFilter.CriticalStrike: {
        return this.hasCriticalStrike;
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
        return this.hasAttackSlow;
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
        chance?: number; // e.g. 30 if there is a 30% chance a value gets tiggered
        efficiency?: number;
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
          efficiency: this.getEfficiency(this.strength),
          isPercent: false,
        };
      }
      case ItemFilter.Agility: {
        if (this.agility === undefined) return undefined;
        return {
          value: this.agility,
          efficiency: this.getEfficiency(this.agility),
          isPercent: false,
        };
      }
      case ItemFilter.Intelligence: {
        if (this.intelligence === undefined) return undefined;
        return {
          value: this.intelligence,
          efficiency: this.getEfficiency(this.intelligence),
          isPercent: this.intelligence_percent_ !== undefined,
        };
      }
      case ItemFilter.DamageLeftClick: {
        if (this.doesDamageLeftClick === false) return undefined;
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return {
          value: this.damageLeftClick || 0,
          efficiency: this.getEfficiency(
            this.damageLeftClick || 0,
            this.damage_bonus_chance
          ),
          chance: this.damage_bonus_chance,
          isPercent: this.damage_base_percent !== undefined,
        };
      }
      case ItemFilter.DamageAura: {
        if (this.doesDamageAura === false) return undefined;
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return {
          value: this.damageAura || 0,
          efficiency: this.getEfficiency(this.damageAura || 0),
          isPercent: this.damage_aura_percent !== undefined,
        };
      }
      case ItemFilter.AttackSpeed: {
        if (this.hasAttackSpeed === false) return undefined;
        return {
          value: this.attack_speed || 0,
          efficiency: this.getEfficiency(this.attack_speed || 0),
          isPercent: false,
        };
      }
      case ItemFilter.CriticalStrike: {
        if (this.hasCriticalStrike === false) return undefined;
        return {
          value: this.crit_effect || 0,
          //chance: this.crit_chance,
          efficiency: this.getEfficiency(
            this.crit_multiplier || 0,
            this.crit_chance
          ),
          isPercent: true,
        };
      }
      case ItemFilter.AttackRange: {
        if (this.hasAttackRage === false) return undefined;
      }
      case ItemFilter.ArmorReduction: {
        return undefined;
      }
      case ItemFilter.AttackLifesteal: {
        return undefined;
      }
      case ItemFilter.AttackSlow: {
        if (this.hasAttackSlow === false) return undefined;
        return {
          value: this.attack_slow || 0,
          efficiency: this.getEfficiency(this.attack_slow || 0),
          isPercent: false,
        };
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

  private getEfficiency(value: number, chance?: number): number | undefined {
    return !this.cost || this.is_neutral === true || value === 0
      ? undefined
      : this.cost / ((Math.abs(value) * (chance || 100)) / 100);
  }
}
/*
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
