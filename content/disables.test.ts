/**
 * npx jest disables.test.ts
 *
 */
import { dota2HeroesIterator, getDota2Heroes } from '@gameData/out/dota2Heroes';
import { getDota2Abilities } from '@gameData/out/dota2Abilities';
import { IDisable, disables } from './disables';

test('disables-All heroes included', () => {
  for (const { npcName } of dota2HeroesIterator()) {
    if (!disables[npcName.replace('npc_dota_hero_', '')]) {
      expect(`Hero ${npcName} not found`).toBeUndefined();
    }
  }
});

test('disables-Correctness of heroes & abilities', () => {
  const heroes = getDota2Heroes();
  const abilities = getDota2Abilities();

  for (const [key, values] of Object.entries<IDisable[]>(disables)) {
    if (!heroes['npc_dota_hero_' + key]) {
      expect(`Hero ${key} not found`).toBeUndefined();
    }
    for (const value of values) {
      if (!abilities[value.skill]) {
        expect(`Ability ${value.skill} not found`).toBeUndefined();
      }
    }
  }
});
