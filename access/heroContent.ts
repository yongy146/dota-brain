import { IHeroContent, heroBuilds } from "../content/heroBuilds";

/**
 * Returns HeroContent provided by content creators for the hero.
 *
 * @param npcShortName e.g. 'legion_commander'
 * @return null if there is no such hero
 */
export function getHeroContent(npcShortName: string): IHeroContent | undefined {
  //DotaLogger.log(`Dota2.getHeroContent(${heroName}): Called`);
  /*if (!Object.prototype.hasOwnProperty.call(heroBuilds, npcShortName))
    return null;*/

  return heroBuilds[npcShortName];
}
