import { getHeroContent } from "./heroContent";

/**
 * Returns the damage type of a hero as a string.
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @returns The damage type, e.g. 'MagicalDamage' (ID for react-intl)
 */
export function getDamageType(npcShortName: string): string {
  //DotaLogger.log("Dota2.hero_damage_types.getDamageType: localized_name='"+ localized_name + "', damageType[localized_name]='" + damageType[localized_name] + "'")

  const heroContent = getHeroContent(npcShortName);
  if (heroContent != null) {
    switch (heroContent.damage_type) {
      case "magical": {
        return "MagicalDamage";
      }
      case "physical": {
        return "PhysicalDamage";
      }
      case "pure": {
        return "PureDamage";
      }
      case "neutral": {
        return "NeutralDamage";
      }
    }
  }
  return "UnknownDamage";
}

/**
 * Returns the image path for attribute
 *
 * @param heroName Localized hero name
 * @returns
 */
export function getDamageTypeImg(heroName: string): string {
  const heroContent = getHeroContent(heroName);
  if (heroContent != null) {
    switch (heroContent.damage_type) {
      case "magical": {
        return "/dist/img/damage/magical.png";
      }
      case "physical": {
        return "/dist/img/damage/physical.png";
      }
      case "pure": {
        return "/dist/img/damage/pure.png";
      }
      case "neutral": {
        return "/dist/img/damage/neutral.png";
      }
    }
  }
  return "Unknown damage type";
}

/**
 *
 * @param npcShortName npc short name, e.g. 'legion_commander'
 * @returns HTML color code, e.g. #578cc7
 */
export function getDamageTypeColor(npcShortName: string): string {
  //DotaLogger.log(`Dota2.hero_damage_types.getDamageColor(): heroName='${heroName}', damageType[localized_name]='${damageType[heroName]}'`)
  const heroContent = getHeroContent(npcShortName);
  if (heroContent != null) {
    switch (heroContent.damage_type) {
      case "magical": {
        return "#578cc7";
      }
      case "physical": {
        return "#af3029";
      }
      case "pure": {
        return "#d8af54";
      }
      case "neutral": {
        return "#7f8284";
      }
    }
  }
  return "#7f8284";
}
