/**
 * npx jest heroUtils.test.ts
 *
 */

import { DOTA_COACH_GUIDE_ROLE } from "../utilities/playerRoles";
import {
  counterItemIterator,
  getCoreHeroes,
  getHeroesWithItem,
  heroBuildIterator,
  itemIterator,
  mostCounteringItems,
  mostRecommendedItems,
} from "./heroUtils";
import dota2ItemsActive from "../submodules/gameData/out/dota2ItemsActive.json";

test("heroBuildIterator", () => {
  const it = heroBuildIterator();
  const heroes = new Set<string>();
  let builds = 0;

  for (const i of it) {
    if (builds === 0) {
      expect(i.localizedHeroName).toBe("Abaddon");
      expect(i.heroBuild.dota_fire_id).toBe(40437);
    }
    if (builds === 1) {
      expect(i.localizedHeroName).toBe("Abaddon");
      expect(i.heroBuild.dota_fire_id).toBe(40436);
    }
    if (builds === 2) {
      expect(i.localizedHeroName).toBe("Alchemist");
      expect(i.heroBuild.dota_fire_id).toBe(40438);
    }

    heroes.add(i.localizedHeroName);
    builds++;
  }

  expect(heroes.size).toEqual(124);
  expect(builds).toEqual(170);
});

test("itemIterator-all", () => {
  const it = itemIterator();
  const heroes = new Set<string>();
  const phases = new Set<string>();
  let index = 0;

  for (const i of it) {
    if (index === 2) {
      expect(i).toEqual({
        item: "enchanted_mango",
        localizedName: "Abaddon",
        phase: "starting",
      });
    }

    heroes.add(i.localizedName);
    phases.add(i.phase);
    index++;
  }

  expect(heroes.size).toEqual(124);
  expect(phases.size).toEqual(9);
});

test("itemIterator-mid", () => {
  const it = itemIterator(DOTA_COACH_GUIDE_ROLE.MID);
  const heroes = new Set<string>();
  const phases = new Set<string>();
  let index = 0;

  for (const i of it) {
    if (index === 0) {
      expect(i).toEqual({
        item: "tango",
        localizedName: "Alchemist",
        phase: "starting",
      });
    }

    heroes.add(i.localizedName);
    phases.add(i.phase);
    index++;
  }

  //console.log(`phases: `, phases);

  expect(heroes.size).toEqual(35); // Note: Invoker has two mid guides
  expect(phases.size).toEqual(9);
});

test("itemIterator-mid-early_game", () => {
  const it = itemIterator(
    DOTA_COACH_GUIDE_ROLE.MID,
    "DOTA_Item_Build_Mid_Items"
  );
  const heroes = new Set<string>();
  const phases = new Set<string>();
  let index = 0;

  for (const i of it) {
    if (index === 3) {
      expect(i).toEqual({
        item: "basher",
        localizedName: "Alchemist",
        phase: "mid_game",
      });
    }

    heroes.add(i.localizedName);
    phases.add(i.phase);
    index++;
  }

  //console.log(`phases: `, phases);

  expect(heroes.size).toEqual(34); // Note: Invoker has two mid guides, Lone Druid drops out, as he has no mid game items
  expect(phases.size).toEqual(1);
});

test("counterItemIterator-mid-mid_game", () => {
  const it = counterItemIterator(
    DOTA_COACH_GUIDE_ROLE.MID,
    "DOTA_Item_Build_Mid_Items"
  );
  const heroes = new Set<string>();
  const phases = new Set<string>();
  let index = 0;

  for (const i of it) {
    //if (index < 5) console.log(`index ${index}: `, i);
    if (index === 3) {
      expect(i).toEqual({
        localizedName: "Ancient Apparition",
        item: "pipe",
        phase: "mid_game",
      });
    }

    heroes.add(i.localizedName);
    phases.add(i.phase);
    index++;
  }

  //console.log(`phases: `, phases);

  expect(heroes.size).toEqual(124); // All heroes can be countered by mid players (or 'core' players)
  expect(phases.size).toEqual(1);
});

test("getHeroesWithItem-desolator", () => {
  const heroesWithItem = getHeroesWithItem("desolator");
  const heroes = heroesWithItem.map((i) => i.localizedHeroName);

  //console.log(`heroes: `, heroes);

  expect(heroes).toEqual([
    "Broodmother",
    "Clinkz",
    "Dawnbreaker",
    "Ember Spirit",
    "Io",
    "Legion Commander",
    "Lifestealer",
    "Lone Druid",
    "Mars",
    "Phantom Assassin",
    "Riki",
    "Slardar",
    "Sniper",
    "Templar Assassin",
    "Tusk",
    "Void Spirit",
    "Wraith King",
  ]);
});

test("getCoreHeroes-desolator", () => {
  const heroesWithItem = getCoreHeroes("desolator");
  const heroes = heroesWithItem.map((i) => i.localizedName);
  //console.log(`heroes: `, heroes);

  expect(heroes).toEqual([
    "Dawnbreaker",
    "Lifestealer",
    "Phantom Assassin",
    "Templar Assassin",
    "Tusk",
    "Wraith King",
  ]);
});

// Note yet tested: getHeroesCounteredBy

test("mostRecommendedItems-carry_late_game", () => {
  const heroesWithItem = mostRecommendedItems(
    undefined, //DOTA_COACH_GUIDE_ROLE.CARRY,
    undefined //"DOTA_Item_Build_Late_Items"
  );
  //const heroes = heroesWithItem.map((i) => i.localizedName);
  //console.log(`heroesWithItem: `, JSON.stringify(heroesWithItem));

  expect(1).toBe(1);
});

test("mostRecommendedItems-carry_late_game", () => {
  const counteringItems = mostCounteringItems(
    undefined, //DOTA_COACH_GUIDE_ROLE.CARRY,
    undefined //"DOTA_Item_Build_Late_Items"
  );
  //const heroes = heroesWithItem.map((i) => i.localizedName);
  //console.log(`counteringItems: `, JSON.stringify(counteringItems));

  for (const item of counteringItems) {
    expect(item.total).toBeLessThanOrEqual(item.guides);
    expect(
      item.laning_phase + item.mid_game + item.late_game
    ).toBeGreaterThanOrEqual(item.total);
  }
});

//
// Validate that all core items have a tooltip
//
test("Core items have tooltips", () => {
  const missing: Record<string /* localized name */, string[] /* items */> = {};

  for (const item of Object.keys(dota2ItemsActive)) {
    const heroes = getCoreHeroes(item.replace("item_", ""));
    for (const hero of heroes) {
      if (!hero.tooltips) {
        if (!missing[hero.localizedName]) missing[hero.localizedName] = [];
        missing[hero.localizedName].push(item);
      }
    }
  }

  console.log(`missing: `, missing);

  expect(missing).toEqual({});
});
