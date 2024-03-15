import { IHeroContent, heroBuilds } from "../content/heroBuilds";

/**
 * Returns the HeroContent provided by content creators for a given hero.
 *
 * @param npcShortName e.g. 'legion_commander'
 * @return undefined if there is no such hero
 */
export function getHeroContent(
  npcShortName?: string
): IHeroContent | undefined {
  if (npcShortName === undefined) return undefined;

  //DotaLogger.log(`heroContent.getHeroContent(npcShortName: ${npcShortName}): Called`);
  return heroBuilds[npcShortName];
}
