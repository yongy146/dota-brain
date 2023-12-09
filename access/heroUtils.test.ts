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
import { getTooltip } from "./heroBuilds";
import { IntlShape } from "react-intl";
import { i18nLoader } from "@utilities/i18n/i18nLoader";

let intl: IntlShape | undefined;
beforeAll(async () => {
  intl = await i18nLoader();
});

test("heroBuildIterator", () => {
  const it = heroBuildIterator();
  const heroes = new Set<string>();
  let builds = 0;

  for (const i of it) {
    if (builds === 0) {
      expect(i.npcShortName).toBe("abaddon");
      expect(i.heroBuild.dota_fire_id).toBe(40437);
    }
    if (builds === 1) {
      expect(i.npcShortName).toBe("abaddon");
      expect(i.heroBuild.dota_fire_id).toBe(40436);
    }
    if (builds === 2) {
      expect(i.npcShortName).toBe("alchemist");
      expect(i.heroBuild.dota_fire_id).toBe(40438);
    }

    heroes.add(i.npcShortName);
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
        npcShortName: "abaddon",
        phase: "starting",
      });
    }

    heroes.add(i.npcShortName);
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
        npcShortName: "alchemist",
        phase: "starting",
      });
    }

    heroes.add(i.npcShortName);
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
        npcShortName: "alchemist",
        phase: "mid_game",
      });
    }

    heroes.add(i.npcShortName);
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
        npcShortName: "ancient_apparition",
        item: "pipe",
        phase: "mid_game",
      });
    }

    heroes.add(i.npcShortName);
    phases.add(i.phase);
    index++;
  }

  //console.log(`phases: `, phases);

  expect(heroes.size).toEqual(124); // All heroes can be countered by mid players (or 'core' players)
  expect(phases.size).toEqual(1);
});

test("getHeroesWithItem-desolator", () => {
  const heroesWithItem = getHeroesWithItem("desolator");
  const heroes = heroesWithItem.map((i) => i.shortNPCName);

  //console.log(`heroes: `, heroes);

  expect(heroes).toEqual([
    "broodmother",
    "clinkz",
    "dawnbreaker",
    "ember_spirit",
    "wisp",
    "legion_commander",
    "life_stealer",
    "lone_druid",
    "mars",
    "phantom_assassin",
    "riki",
    "slardar",
    "sniper",
    "templar_assassin",
    "tusk",
    "void_spirit",
    "skeleton_king",
  ]);
});

test("getCoreHeroes-desolator", () => {
  const heroes = getCoreHeroes("desolator");
  //console.log(`heroes: `, JSON.stringify(heroes));

  expect(heroes).toEqual([
    { npcShortName: "dawnbreaker", buildIndex: 1, roles: ["offlane"] },
    { npcShortName: "life_stealer", buildIndex: 0, roles: ["carry"] },
    { npcShortName: "phantom_assassin", buildIndex: 0, roles: ["carry"] },
    { npcShortName: "templar_assassin", buildIndex: 0, roles: ["carry"] },
    { npcShortName: "templar_assassin", buildIndex: 1, roles: ["mid"] },
    { npcShortName: "tusk", buildIndex: 1, roles: ["offlane"] },
    { npcShortName: "skeleton_king", buildIndex: 0, roles: ["carry"] },
  ]);

  const withTooltips = heroes.map((hero) => {
    const tooltip = getTooltip(
      hero.npcShortName,
      hero.buildIndex,
      "desolator",
      intl!
    );
    return { npcShortName: hero.npcShortName, tooltip };
  });

  console.log(`withTooltips: `, JSON.stringify(withTooltips, null, 2));
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
