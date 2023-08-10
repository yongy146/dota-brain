import { attributeFactors } from "./attributes";

export interface IDotaItems {
  [key: string]: IDotaItem;
}

export enum ItemFilter {
  AllItems = "AllItems",
  Health = "dota.Health",
  HealthRegen = "HealthRegen", // Implemented later on
  Mana = "dota.Mana", // Implemented later on
  ManaRegen = "ManaRegen", // Implemented later on
  //Dispel = "", // Implemented later on
  //Silence = "", // Implemented later on
  //Stun = "", // Implemented later on
  // Pierce evasion
  // Attributes: Some skills take attributes into calculation (Centaur's Double Edge, Pudge's Dismember, Silencer's Last Word, etc) and it would be cool to know which item gives the best attribute
  Strength = "dota.Strength",
  Agility = "dota.Agility",
  Intelligence = "dota.Intelligence",
  DamageRightClick = "DamageRightClick",
  DamageAbility = "DamageAbility",
  DamageAoE = "DamageAoE",
  DamageMagical = "DamageMagical",
  AttackSpeed = "AttackSpeed",
  CriticalStrike = "CriticalStrike",
  AttackRange = "AttackRange",
  ArmorReduction = "ArmorReduction",
  AttackLifesteal = "AttackLifesteal",
  AttackSlow = "AttackSlow",
  Armor = "dota.Armor",
  Evasion = "dota.Evasion",
  SpellAmplification = "SpellAmplification",
  SpellLifesteal = "SpellLifesteal",
  MagicResistance = "MagicResistance",
  StatusResistance = "StatusResistance",
  HealthRegenReduction = "HealthRegenReduction",
  MovementSpeed = "MovementSpeed",
  SlowResistance = "SlowResistance",
  Invisibility = "dota.Invisibility",
  TrueSight = "TrueSight",
  PassiveBreak = "PassiveBreak",
}

export interface IDotaItem {
  //name: string; // Moved to localization
  id?: string; // Maybe change to number?
  is_active?: boolean; // Not availabe in dota2ItemsActive.json
  mana_cost?: number; // 0 if no mana is needed
  cost?: number; // 2250; //
  cooldown?: number; // 15;
  is_recipe?: boolean;

  // Item level (currently only used for Dagon
  level?: number;

  // Item source
  is_purchasable?: boolean;
  is_neutral?: boolean;
  is_roshan?: boolean;

  // Neutral items
  neutral_level?: number;
  drop_time?: string;
  drop_rate?: number;

  // Health
  health_?: number;
  health_regen_?: number;
  health_regen_percent?: number; // Heart of Tarrasque
  health_regen_aura?: number; // Additive, in points
  health_regen_amp?: number; // Currently not used
  health_regen_bonus?: number; // Guardian greaves, when health falls below 25%

  // Mana
  mana_?: number;
  mana_regen_?: number;
  mana_regen_amp?: number;
  mana_regen_aura?: number;

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
  armor_?: number;
  armor_aura?: number;
  armor_activated?: number;
  armor_reduction?: number;

  // Status resistance
  status_resistance?: number;
  status_resistance_reduction_aura?: number; // item_ceremonial_robe

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
  attack_lifesteal_?: number; // X
  attack_lifesteal_active?: number; // Satanic, needs to be added with attack_lifesteal_ to get total value
  attack_lifesteal_absolute?: number; // x

  // Spell lifesteal
  spell_lifesteal?: number; // lifesteal in percent
  spell_lifesteal_multiplier?: number; // only for item Bloodstone
  spell_lifesteal_amplifier?: number; // lifesteal aplifier in percent

  // Spell amp
  spell_amp?: number;

  // Magic resistance
  magic_resist?: number;
  magic_resist_aura?: number; // Auro is not cummulative (only availalbe on Pipe of Insight)
  magic_resist_reduction_aura?: number; // item_ceremonial_robe

  // Physical damage
  damage_?: number; // Absolute value per hit
  damage_melee?: number; // Absolute value per hit
  damage_ranged?: number; // Absolute value per hit
  damage_active?: number; // Absolute value per hit
  damage_base_percent?: number; // Damage w/o items and effects
  damage_bonus?: number; // Absolute value per hit
  damage_bonus_chance?: number;
  damage_aoe?: number; // Absolute value per second
  damage_aoe_percent?: number;
  damage_magical_?: number;
  damage_magical_chance?: number;
  //damage_magical?: boolean; // True if item does magical damage
  damage_ability_?: number; // ability's physical damage
  damage_ability_magical?: number; // ability's magical damage
  damage_ability_magical_aoe?: number; // shiva's guard
  //damage_ability_magical_chance?: number; // if there is a probabilty of generating the given damage
  damage_ability_magical_percent?: number; // ability's magical damage in percent
  damage_ability_magical_conversion?: boolean; // item_revenants_brooch converts 100% of attack damage to magical damage

  // Attack range
  attack_range_ranged?: number; // Atack range for ranged heroes only
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

  requirements?: string[]; // items needed to build this one, e.g. for balde mail: "item_broadsword", "item_chainmail", "item_recipe_blade_mail"
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

  // Item level (currently only used for Dagon
  level?: number;

  // Item source
  is_purchasable?: boolean;
  is_neutral?: boolean;
  is_roshan?: boolean;

  // Neutral items
  neutral_level?: number;
  drop_time?: string;
  drop_rate?: number;

  // Health
  health_?: number;
  health_regen_?: number;
  health_regen_percent?: number;
  health_regen_aura?: number;
  health_regen_amp?: number;
  health_regen_bonus?: number; // Guardian greaves, when health falls below 25%

  // Mana
  mana_?: number;
  mana_regen_?: number;
  mana_regen_amp?: number;
  mana_regen_aura?: number;

  // Movement speed
  movement_speed?: number; // Absolute additional speed
  movement_speed_active?: number; // Additional speed when activated
  movement_speed_broke?: number;
  movement_speed_aura?: number;
  movement_speed_percent?: number;
  movement_speed_percent_active?: number; // Additional speed when activated

  // Slow resistance
  slow_resist?: number;
  slow_resist_active?: number;

  // Duration of item when activated
  duration?: number;

  // Invisiblitiy
  grants_invisibility?: boolean;
  grants_true_sight?: boolean;

  // Passive break
  breaks_passives?: boolean;

  // Armor information
  armor_?: number;
  armor_aura?: number;
  armor_activated?: number;
  armor_reduction?: number;

  // Status resistance
  status_resistance?: number;
  status_resistance_reduction_aura?: number; // item_ceremonial_robe

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
  attack_lifesteal_?: number; // X
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
  magic_resist_aura?: number; // Aura is not commulative (only availalbe on Pipe of Insight)
  magic_resist_reduction_aura?: number; // item_ceremonial_robe

  // Physical damage
  damage_?: number; // Absolute value per hit
  damage_melee?: number; // Absolute value per hit
  damage_ranged?: number; // Absolute value per hit
  damage_active?: number; // Absolute value per hit
  damage_base_percent?: number; // Damage w/o items and effects
  damage_bonus?: number; // Absolute value per hit
  damage_bonus_chance?: number;
  damage_aoe?: number; // Absolute value per second
  damage_aoe_percent?: number;
  damage_magical_?: number;
  damage_magical_chance?: number;
  //damage_magical?: boolean; // True if item does magical damage
  damage_ability_?: number; // ability's physical damage
  damage_ability_magical?: number; // ability's magical damage
  damage_ability_magical_aoe?: number; // shiva's guard
  //damage_ability_magical_chance?: number; // if there is a probabilty of generating the given damage
  damage_ability_magical_percent?: number; // ability's magical damage in percent
  damage_ability_magical_conversion?: boolean; // item_revenants_brooch converts 100% of attack damage to magical damage

  // Attack range
  attack_range_ranged?: number; // Atack range for ranged heroes only
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

  requirements?: string[];

  constructor(key: string) {
    this.key = key;
  }

  // Getter and setters of enhanced values
  get hasArmor(): boolean {
    return this.armor !== undefined || this.agility !== undefined;
  }
  get hasArmorReduction(): boolean {
    return this.armor_reduction !== undefined;
  }
  get armor(): number | undefined {
    const value =
      (this.armor_ || 0) +
      (this.armor_aura || 0) +
      (this.agility || 0) * attributeFactors.agi.armor;
    return value === 0 ? undefined : value;
  }

  // Evasion
  get hasEvasion(): boolean {
    return this.evasion !== undefined;
  }

  // Spell amplification
  get hasSpellAmplification(): boolean {
    return this.spell_amp !== undefined;
  }

  // Magic resistance
  get hasMagicResistance(): boolean {
    return (
      !!this.magic_resist || !!this.magic_resist_aura || !!this.intelligence
    );
  }

  get magicResistance(): number | undefined {
    return (
      (this.magic_resist || 0) +
      (this.magic_resist_aura || 0) +
      (this.intelligence || 0) * attributeFactors.int.magic_resistance
    );
  }

  // Visibility
  get grantsInvisibility(): boolean {
    return this.grants_invisibility === true;
  }
  get grantsTrueSight(): boolean {
    return this.grants_true_sight === true;
  }

  // Passives
  get breaksPassives(): boolean {
    return this.breaks_passives === true;
  }

  // Health
  get health(): number | undefined {
    const value =
      (this.health_ || 0) + (this.strength || 0) * attributeFactors.str.health;
    return value === 0 ? undefined : value;
  }
  get health_regen(): number | undefined {
    const value =
      (this.health_regen_ || 0) +
      ((this.health_regen_percent || 0) * 2845) / 100 + // Health is +2'500 when Heart is bougth; value chosen here is to get 50 healing per second
      (this.health_regen_aura || 0) +
      (this.strength || 0) * attributeFactors.str.health_regen;
    return value === 0 ? undefined : value;
  }

  // Mana
  get mana(): number | undefined {
    const value =
      (this.mana_ || 0) + (this.intelligence || 0) * attributeFactors.int.mana;
    return value === 0 ? undefined : value;
  }
  get mana_regen(): number | undefined {
    const value =
      (this.mana_regen_ || 0) +
      (this.mana_regen_aura || 0) +
      (this.intelligence || 0) * attributeFactors.int.mana_regen;
    return value === 0 ? undefined : value;
  }

  // Health regen reduction
  get hasHealReduction(): boolean {
    return (
      this.heal_reduction !== undefined ||
      this.heal_reduction_aura !== undefined
    );
  }

  // Magic resistance
  get hasStatusResistance(): boolean {
    return this.status_resistance !== undefined;
  }

  // Critical strike
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
    return this.attack_speed !== undefined || this.agility !== undefined;
  }
  get attack_speed(): number | undefined {
    const value =
      (this.attack_speed_ || 0) +
      (this.attack_speed_aura || 0) +
      (this.attack_speed_active || 0) +
      (this.attack_speed_target || 0) +
      (this.agility || 0) * attributeFactors.agi.attack_speed;
    return value === 0 ? undefined : value;
  }
  get hasAttackSlow(): boolean {
    return this.attack_slow !== undefined;
  }
  get attack_slow(): number | undefined {
    let value =
      (this.attack_slow_ || 0) +
      (this.attack_slow_melee || 0) +
      (this.attack_slow_ranged || 0);

    if (this.attack_slow_ranged !== undefined) {
      value /= 2;
    }

    value += this.attack_slow_aura || 0;

    return value === 0 ? undefined : value;
  }
  get attack_slow_mixed(): number | undefined {
    const value =
      (this.attack_slow || 0) +
      (this.attack_slow_melee || 0) * 0.5 +
      (this.attack_slow_ranged || 0) * 0.5;
    return value === 0 ? undefined : value;
  }
  get DamageRightClick(): number | undefined {
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

    // Add magical damage
    value +=
      ((this.damage_magical_ || 0) * (this.damage_magical_chance || 100)) / 100;

    return value === 0 ? undefined : value;
  }
  get DamageAoE(): number | undefined {
    const value = (this.damage_aoe || 0) + (this.damage_aoe_percent || 0);
    return value === 0 ? undefined : value;
  }

  get doesDamageRightClick(): boolean {
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
  get damage_ability(): number | undefined {
    const damage =
      (this.damage_ability_ || 0) +
      (this.damage_ability_magical || 0) +
      (this.damage_ability_magical_percent || 0);

    return damage ? damage : undefined;
  }
  get doesDamageAoE(): boolean {
    return (this.damage_aoe || 0) + (this.damage_aoe_percent || 0) > 0;
  }
  get doesDamageMagical(): boolean {
    return (
      this.damage_magical_ !== undefined ||
      this.damage_ability_magical !== undefined ||
      this.damage_ability_magical_aoe !== undefined ||
      this.damage_ability_magical_percent !== undefined ||
      this.damage_ability_magical_conversion !== undefined
    );
  }
  get damage_magical(): number | undefined {
    const damage =
      ((this.damage_magical_ || 0) * (this.damage_magical_chance || 100)) /
        100 +
      (this.damage_ability_magical || 0) +
      (this.damage_ability_magical_aoe || 0) +
      (this.damage_ability_magical_percent || 0) +
      (this.damage_ability_magical_conversion === true ? 100 : 0);
    return damage ? damage : undefined;
  }

  get hasAttackRange(): boolean {
    return this.attack_range !== undefined;
  }
  get attack_range(): number | undefined {
    const value =
      (this.attack_range_ranged || 0) + (this.attack_range_melee || 0);
    return value === 0 ? undefined : value;
  }

  // Lifesteal
  get hasAttackLifesteal(): boolean {
    return (
      this.attack_lifesteal_ !== undefined ||
      this.attack_lifesteal_active !== undefined ||
      this.attack_lifesteal_absolute !== undefined
    );
  }
  get hasSpellLifesteal(): boolean {
    return (
      this.spell_lifesteal !== undefined //||
      //this.spell_lifesteal_multiplier !== undefined ||
      //this.spell_lifesteal_amplifier !== undefined
    );
  }
  get attack_lifesteal(): number | undefined {
    return (
      (this.attack_lifesteal_ || 0) +
      (this.attack_lifesteal_active || 0) +
      (this.attack_lifesteal_absolute || 0)
    );
  }

  // Movement speed
  get hasMovementSpeed(): boolean {
    return (
      this.movement_speed !== undefined ||
      this.movement_speed_active !== undefined ||
      this.movement_speed_aura !== undefined ||
      this.movement_speed_percent !== undefined ||
      this.movement_speed_percent_active !== undefined
    );
  }
  get estimatedTotalSpeed(): number | undefined {
    const ts =
      (this.movement_speed || 0) +
      (this.movement_speed_active || 0) +
      (this.movement_speed_aura || 0) +
      (this.movement_speed_percent || 0) * 3 +
      (this.movement_speed_percent_active || 0) * 3;
    return ts ? ts : undefined;
  }
  public getMovementSpeed(): number | undefined {
    const ts =
      (this.movement_speed || 0) +
      //(this.movement_speed_active || 0) +
      (this.movement_speed_aura || 0);
    return ts ? ts : undefined;
  }
  public getMovementSpeedPercent(): number | undefined {
    const ts = this.movement_speed_percent || 0; //+
    //(this.movement_speed_percent_active || 0);
    return ts ? ts : undefined;
  }

  // Movement resistance
  get hasSlowResistance(): boolean {
    return (
      this.slow_resist !== undefined || this.slow_resist_active !== undefined
    );
  }

  /**
   * Calcualted the speed with actication
   *
   * It assumes a speed of 300 for percentage information
   * @param item
   */
  /*export function getSpeed(item: DotaItem): number {
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
}*/

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
    selections: (ItemFilter | ItemFilter[] | undefined)[],
    includePurchasable: boolean,
    includeNeutral: boolean,
    includeRoshan: boolean
  ): boolean {
    if (selections.length === 0) return false;

    for (const selection of selections) {
      if (
        selection !== undefined &&
        !this.isVisible_(
          Array.isArray(selection) ? selection[0] : selection,
          includePurchasable,
          includeNeutral,
          includeRoshan
        )
      ) {
        return false;
      }
    }
    // Item passed all selections, return true
    return true;
  }

  private isVisible_(
    selection: ItemFilter,
    includePurchasable: boolean,
    includeNeutral: boolean,
    includeRoshan: boolean
  ) {
    //console.log(`isVisible_(this.id: ${this.id}, selection: ${selection})`);

    if (this.is_recipe) return false;
    if (this.key === "item_ward_dispenser") return false;

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
    //console.log(`this.agility = ${this.agility}`);

    switch (selection) {
      case ItemFilter.AllItems: {
        return true;
      }
      case ItemFilter.Health: {
        return this.health !== undefined;
      }
      case ItemFilter.HealthRegen: {
        return this.health_regen !== undefined;
      }
      case ItemFilter.Mana: {
        return this.mana !== undefined;
      }
      case ItemFilter.ManaRegen: {
        return this.mana_regen !== undefined;
      }
      case ItemFilter.Strength: {
        return this.strength !== undefined;
      }
      case ItemFilter.Agility: {
        //console.log(`this.agility = ${this.agility}`);
        return this.agility !== undefined;
      }
      case ItemFilter.Intelligence: {
        return this.intelligence !== undefined;
      }
      case ItemFilter.DamageRightClick: {
        return this.doesDamageRightClick;
      }
      case ItemFilter.DamageAbility: {
        return this.damage_ability !== undefined;
      }
      case ItemFilter.DamageAoE: {
        return this.doesDamageAoE;
      }
      case ItemFilter.DamageMagical: {
        return this.doesDamageMagical;
      }
      case ItemFilter.AttackSpeed: {
        return this.hasAttackSpeed;
      }
      case ItemFilter.CriticalStrike: {
        return this.hasCriticalStrike;
      }
      case ItemFilter.AttackRange: {
        return this.hasAttackRange;
      }
      case ItemFilter.ArmorReduction: {
        return this.hasArmorReduction;
      }
      case ItemFilter.AttackLifesteal: {
        return this.hasAttackLifesteal;
      }
      case ItemFilter.AttackSlow: {
        return this.hasAttackSlow;
      }
      case ItemFilter.Armor: {
        return this.hasArmor;
      }
      case ItemFilter.Evasion: {
        return this.hasEvasion;
      }
      case ItemFilter.SpellAmplification: {
        return this.hasSpellAmplification;
      }
      case ItemFilter.SpellLifesteal: {
        return this.hasSpellLifesteal;
      }
      case ItemFilter.MagicResistance: {
        return this.hasMagicResistance;
      }
      case ItemFilter.StatusResistance: {
        return this.hasStatusResistance;
      }
      case ItemFilter.HealthRegenReduction: {
        return this.hasHealReduction;
      }
      case ItemFilter.MovementSpeed: {
        return this.hasMovementSpeed;
      }
      case ItemFilter.SlowResistance: {
        return this.hasSlowResistance;
      }
      case ItemFilter.Invisibility: {
        return this.grantsInvisibility;
      }
      case ItemFilter.TrueSight: {
        return this.grantsTrueSight;
      }
      case ItemFilter.PassiveBreak: {
        return this.breaksPassives;
      }
      default: {
        // We should never get here through
        return false;
      }
    }
  }

  public getValues(filters: (ItemFilter | undefined)[]): (
    | {
        value: number;
        chance?: number; // e.g. 30 if there is a 30% chance a value gets tiggered
        efficiency?: number;
        isPercent: boolean;
      }
    | undefined
  )[] {
    const result = new Array(3).fill(undefined);

    for (let i = 0; i < filters.length; i++) {
      if (filters[i]) {
        result[i] = this.getValue(filters[i]!);
      }
    }
    return result;
  }

  public getValue(
    filter: ItemFilter
    //includeAttributeEffect: boolean
  ):
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
      case ItemFilter.Health: {
        if (this.health === undefined) return undefined;
        return {
          value: this.health,
          efficiency: this.getEfficiency(this.health),
          isPercent: false,
        };
      }
      case ItemFilter.HealthRegen: {
        if (this.health_regen === undefined) return undefined;
        return {
          value: this.health_regen,
          efficiency: this.getEfficiency(this.health_regen),
          isPercent: false,
        };
      }

      case ItemFilter.Mana: {
        if (this.mana === undefined) return undefined;
        return {
          value: this.mana,
          efficiency: this.getEfficiency(this.mana),
          isPercent: false,
        };
      }
      case ItemFilter.ManaRegen: {
        if (this.mana_regen === undefined) return undefined;
        return {
          value: this.mana_regen,
          efficiency: this.getEfficiency(this.mana_regen),
          isPercent: false,
        };
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
      case ItemFilter.DamageRightClick: {
        if (this.doesDamageRightClick === false) return undefined;
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return {
          value: this.DamageRightClick || 0,
          efficiency: this.getEfficiency(
            this.DamageRightClick || 0,
            this.damage_bonus_chance
          ),
          chance: this.damage_bonus_chance,
          isPercent: this.damage_base_percent !== undefined,
        };
      }
      case ItemFilter.DamageAbility: {
        if (this.damage_ability === undefined) return undefined;
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return {
          value: this.damage_ability || 0,
          efficiency: this.getEfficiency(this.damage_ability || 0),
          isPercent: this.damage_ability_magical_percent !== undefined,
        };
      }

      case ItemFilter.DamageAoE: {
        if (this.doesDamageAoE === false) return undefined;
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        return {
          value: this.DamageAoE || 0,
          efficiency: this.getEfficiency(this.DamageAoE || 0),
          isPercent: this.damage_aoe_percent !== undefined,
        };
      }
      case ItemFilter.DamageMagical: {
        if (this.damage_magical === undefined) return undefined;
        //console.log(`this.key doesDamage=${this.doesDamage}`);
        // Retruns same value as right-click damage
        return {
          value: this.damage_magical,
          efficiency: this.getEfficiency(
            this.damage_magical,
            this.damage_magical_chance
          ),
          chance: this.damage_magical_chance,
          isPercent:
            this.damage_ability_magical_percent !== undefined ||
            this.damage_ability_magical_conversion !== undefined,
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
        if (this.hasAttackRange === false) return undefined;
        return {
          value: this.attack_range || 0,
          efficiency: this.getEfficiency(this.attack_range || 0),
          isPercent: false,
        };
      }
      case ItemFilter.ArmorReduction: {
        if (this.hasArmorReduction === false) return undefined;
        return {
          value: this.armor_reduction || 0,
          efficiency: this.getEfficiency(this.armor_reduction || 0),
          isPercent: false,
        };
      }
      case ItemFilter.AttackLifesteal: {
        if (this.hasAttackLifesteal === false) return undefined;

        return {
          value: this.attack_lifesteal || 0,
          efficiency: this.getEfficiency(this.attack_lifesteal || 0),
          isPercent: this.attack_lifesteal_absolute === undefined,
        };
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
        if (this.hasArmor === false) return undefined;
        return {
          value: this.armor || 0,
          efficiency: this.getEfficiency(this.armor || 0),
          isPercent: false,
        };
      }
      case ItemFilter.Evasion: {
        if (this.hasEvasion === false) return undefined;
        return {
          value: this.evasion || 0,
          efficiency: this.getEfficiency(this.evasion || 0),
          isPercent: true,
        };
      }
      case ItemFilter.SpellAmplification: {
        if (this.hasSpellAmplification === false) return undefined;
        return {
          value: this.spell_amp || 0,
          efficiency: this.getEfficiency(this.spell_amp || 0),
          isPercent: true,
        };
      }
      case ItemFilter.SpellLifesteal: {
        if (this.hasSpellLifesteal === false) return undefined;
        return {
          value: this.spell_lifesteal || 0,
          efficiency: this.getEfficiency(this.spell_lifesteal || 0),
          isPercent: true,
        };
      }
      case ItemFilter.MagicResistance: {
        if (this.hasMagicResistance === false) return undefined;
        return {
          value: this.magicResistance || 0,
          efficiency: this.getEfficiency(this.magicResistance || 0),
          isPercent: true,
        };
      }
      case ItemFilter.StatusResistance: {
        if (this.hasStatusResistance === false) return undefined;
        return {
          value: this.status_resistance || 0,
          efficiency: this.getEfficiency(this.status_resistance || 0),
          isPercent: true,
        };
      }
      case ItemFilter.HealthRegenReduction: {
        if (this.hasHealReduction === false) return undefined;
        const hr = (this.heal_reduction || 0) + (this.heal_reduction_aura || 0);
        return {
          value: hr,
          efficiency: this.getEfficiency(hr || 0),
          isPercent: true,
        };
      }
      case ItemFilter.MovementSpeed: {
        if (this.hasMovementSpeed === false) return undefined;
        return {
          value: this.estimatedTotalSpeed || 0,
          efficiency: this.getEfficiency(this.estimatedTotalSpeed || 0),
          isPercent: false,
          /*this.movement_speed_percent !== undefined ||
            this.movement_speed_percent_active !== undefined,*/
        };
      }
      case ItemFilter.Invisibility:
      case ItemFilter.TrueSight:
      case ItemFilter.PassiveBreak: {
        /*if (this.cost) {
          return {
            value: this.cost,
            isPercent: false,
          };
        } else {*/
        return undefined;
        //}
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

export function sortItems(
  items: DotaItem[],
  selections: (ItemFilter | ItemFilter[] | undefined)[],
  sortByEfficiency: boolean
) {
  // Convert arrays of ItemFilters to ItemFilter
  selections = selections.map((selection) =>
    Array.isArray(selection) ? selection[0] : selection
  );

  // Remove all irrelevant selections
  let selections_: ItemFilter[] = selections.filter(
    (selection) => selection !== undefined && selection !== ItemFilter.AllItems
  ) as ItemFilter[];

  // Remove all duplicates (as the douplicated would be weighted double)
  selections_ = selections_.filter(
    (selection, i) => selections.indexOf(selection) === i
  );

  // Make sure there is at least one selection
  if (selections_.length === 0) {
    selections.push(ItemFilter.AllItems);
  }

  // Create list for each selection
  sortItems_(items, selections_[0]!, sortByEfficiency);
  if (selections.length === 1) {
    return items;
  }
  const itemsLists: (DotaItem[] | undefined)[] = [
    [...items],
    selections[1] === undefined
      ? undefined
      : sortItems_([...items], selections_[1], sortByEfficiency),
    selections[2] === undefined
      ? undefined
      : sortItems_([...items], selections_[2], sortByEfficiency),
  ];

  // Merge lists
  items.sort((itemA: DotaItem, itemB: DotaItem) => {
    let sumOfRanksA = 0;
    let sumOfRanksB = 0;
    for (let i = 0; i < selections.length; i++) {
      sumOfRanksA +=
        itemsLists[i] === undefined
          ? 0
          : itemsLists[i]!.findIndex((item) => item.id === itemA.id);
      sumOfRanksB +=
        itemsLists[i] === undefined
          ? 0
          : itemsLists[i]!.findIndex((item) => item.id === itemB.id);
    }
    return sumOfRanksA - sumOfRanksB;
  });

  // Return list
}

export function sortItems_(
  items: DotaItem[],
  selection: ItemFilter,
  sortByEfficiency: boolean
): DotaItem[] {
  return items.sort((itemA, itemB) => {
    const valueA = itemA.getValue(selection); //, checkboxAttributes);
    const valueB = itemB.getValue(selection); //, checkboxAttributes);

    // Treat cases where both values are undefined (case: ItemFilter.AllItems)
    if (valueB === undefined && valueB === undefined) {
      // Maybe better sort logic? Name doesn't work, as it diffes per language... buy maybe we can take loclized name... let's check
      return (itemB.cost || 0) - (itemA.cost || 0);
    }

    // Filter chase where one of the values is undefined (should never happen though)
    if (valueA === undefined) {
      return -1;
    }
    if (valueB === undefined) {
      return 1;
    }

    // Assuming average intelligence value of 35 and movement speed of 300
    const percentFactorA =
      valueA.isPercent === false
        ? 1
        : selection === ItemFilter.Intelligence
        ? 0.35
        : selection === ItemFilter.MovementSpeed
        ? 3
        : 1;
    valueA.value *= percentFactorA;
    const percentFactorB =
      valueB.isPercent === false
        ? 1
        : selection === ItemFilter.Intelligence
        ? 0.35
        : selection === ItemFilter.MovementSpeed
        ? 3
        : 1;
    valueB.value *= percentFactorB;

    // Treat case where user is focused on item efficiency
    if (sortByEfficiency === true) {
      // Case: At least one item has an efficiency value
      if (valueA.efficiency !== undefined || valueB.efficiency !== undefined) {
        /*if (valueA?.efficiency === undefined) {
            return 1;
          }
          if (valueB?.efficiency === undefined) {
            return -1;
          }*/
        return (valueA.efficiency || 100000) - (valueB.efficiency || 100000);
      }
    }

    // All remaining cases
    if (valueA.value === valueB.value) {
      return (itemB.cost || 0) - (itemA.cost || 0);
    }
    if (
      selection === ItemFilter.AttackSlow ||
      selection === ItemFilter.ArmorReduction
    ) {
      // Inverted sort for negative values
      return (valueA.value || 0) - (valueB.value || 0);
    } else {
      return (valueB.value || 0) - (valueA.value || 0);
    }
  });
}
