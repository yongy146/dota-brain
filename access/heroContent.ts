import { IHeroContent, heroBuilds } from "../content/heroBuilds";

/**
 * Returns HeroContent provided by content creators for the hero.
 *
 * @param heroName Localized hero name
 * @return null if there is no such hero
 */
export function getHeroContent(heroName: string): IHeroContent | null {
  //DotaLogger.log(`Dota2.getHeroContent(${heroName}): Called`);
  if (!Object.prototype.hasOwnProperty.call(heroBuilds, heroName)) return null;

  return heroBuilds[heroName];
}
