/**
 * 
 */
export type HeroGuide = {
  i18nLabelKey: string;
  url: string;
};

export type NpcHeroName = `npc_dota_hero_${string}`;

export const heroGuides: Record<NpcHeroName, HeroGuide[]> = {};
