/**
 * clear ; npx jest content/heroBuilds.test.ts --silent
 *
 */
import { heroBuildIterator } from "../access/heroUtils";
import dota2Heroes from "@gameData/out/dota2Heroes.json";
import dota2Abilities from "@gameData/out/dota2Abilities.json";
import dota2ItemsActive from "@gameData/out/dota2ItemsActive.json";
import { heroBuilds } from "./heroBuilds";

const Dota2: any = {};
const currentPatch = "7.35b";

/**
 * Check that all heroes have a build.
 */
/*test("heroBuilds-Hero names", () => {
  for (const hero of Object.keys(heroBuilds)) {
    const npcName = "npc_dota_hero_" + hero;
    const item = (dota2Heroes as any)[npcName];
    //console.log(`npcName: `, npcName);
    expect(!!item).toBe(true);
  }

  for (const hero of Object.keys(dota2Heroes)) {
    const npcShortName = hero.replace("npc_dota_hero_", "");
    const item = heroBuilds[npcShortName];
    //console.log(`npcName: `, npcName);
    expect(!!item).toBe(true);
  }
});*/

/**
 * Check that all heroes have at least two own and enemy hero messages
 */
/*test("heroBuilds-Hero names", () => {
  for (const hero of Object.keys(dota2Heroes)) {
    const npcShortName = hero.replace("npc_dota_hero_", "");

    const ownMessages = getOwnHeroMessages(npcShortName);
    //console.log(`npcName: `, npcName);
    expect(ownMessages.length).toBeGreaterThan(1);

    const enemyMessages = getEnemyHeroMessages(npcShortName);
    expect(enemyMessages.length).toBeGreaterThan(1);
  }
});*/

/**
 * Function validates hero guides developed by content creators.
 *
 * Tested data:
 *    - Items used in hero builds are currently active items
 *    - Abilities/talents used in hero builds exist
 *    - Talent leveling is appropriate (right choosing of talents at different levels, correct sequenceing)
 *    - No use of character "'"
 *    - Uniqueness of steam guide IDs and steam guide links
 *    - Calculates gold used for starting items (reports error if remaining gold >= 50 or used gold > 600)
 *
 */
for (const { npcShortName, heroBuild } of heroBuildIterator()) {
  // Test items exists
  for (const items of Object.values(heroBuild.items)) {
    for (const item of items) {
      test(`heroBuilds-Item exist (${npcShortName}, ${item})`, () => {
        expect(
          item === "armor" ||
            item === "magicResistance" ||
            item === "statusResistance" ||
            item === "SentryGem" ||
            item === "SentryDust" ||
            item === "SentryDustGem" ||
            item === "AttackSpeed" ||
            item === "DamageItems" ||
            Object.prototype.hasOwnProperty.call(
              dota2ItemsActive,
              `item_${item}`
            )
        ).toBe(true);
      });
    }
  }

  // Validate costs of starting items
  let costs = 0;
  for (const item of [
    ...heroBuild.items.starting,
    ...(heroBuild.items.starting_bear || []),
  ]) {
    costs += (dota2ItemsActive as any)[`item_${item}`]?.cost || 0;
  }
  test(`heroBuilds-Costs starting items (${npcShortName})`, () => {
    expect(costs).toBeLessThanOrEqual(600);
    /*if (costs < 550)
      console.warn(
        `Costs are below 550 gold (${npcShortName}, ${heroBuild.roles.join(
          ", "
        )})`
      );
      */
    //expect(costs).toBeGreaterThanOrEqual(550);
  });

  // Test abilities/talents exist
  // hero: npc hero name
  for (const ability of heroBuild.abilities) {
    test(`heroBuilds-Ability exist (${npcShortName}, ${ability})`, () => {
      expect(
        ability === "special_bonus_attributes" ||
          ability === "attack" ||
          (dota2Abilities as any)[ability as keyof typeof dota2Abilities] !==
            undefined
      ).toBe(true);
    });
  }

  // Validate skill frequency (a skill can only be updated every second time.)
  const skillCounter: Record<string, number> = {};
  for (let i = 0; i < heroBuild.abilities.length; i++) {
    const ability = heroBuild.abilities[i];
    if (skillCounter[ability] === undefined) {
      skillCounter[ability] = 0;
    }

    const counter = skillCounter[ability]++;
    test(`heroBuilds-Skilled too rapidly / frequently (${npcShortName}, ${ability})`, () => {
      expect(counter <= Math.ceil((i + 1) / 2)).toBe(true);
    });
  }

  // Validate talent order and position
  let talent_level = 1;
  const talents =
    dota2Heroes[("npc_dota_hero_" + npcShortName) as keyof typeof dota2Heroes]
      ?.talents;
  for (let i = 0; i < heroBuild.abilities.length; i++) {
    const ability = heroBuild.abilities[i];
    //console.log(`+++ heroBuilds-ability: ${ability}`);
    const abilityObj = (dota2Abilities as any)[
      ability as keyof typeof dota2Abilities
    ];
    const talentLevel = Math.ceil((talents.indexOf(ability) + 1) / 2);
    if (talentLevel) {
      /*console.log(
        `+++ heroBuilds-Talent position (${npcShortName}, ${ability})`
      );*/
      test(`heroBuilds-Talent position (${npcShortName}, ${ability}, ${talentLevel})`, () => {
        expect(i + 1).toBeGreaterThanOrEqual(5 + talentLevel * 5);
      });

      const tl = talent_level;
      test(`heroBuilds-Talent order (${npcShortName}, ${ability}, ${talentLevel})`, () => {
        expect(talentLevel).toBe(tl);
      });

      /*            if (ability.talent_level! > talent_level) {
        console.log(
          `${hero}: Talent ${abilities[i]} is level ${ability.talent_level} and coming before talent at level ${talent_level}`
        );
        errors++;
      }*/
      talent_level++;
    }
  }
}

// Validate items and abilities in guide combos
for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
  //console.log(`${npcShortName}: `, heroContent.combo);
  for (const itemOrAbility of heroContent.combo) {
    const ability =
      dota2Abilities[itemOrAbility as keyof typeof dota2Abilities];
    const item =
      dota2ItemsActive[
        ("item_" + itemOrAbility) as keyof typeof dota2ItemsActive
      ];
    test(`${npcShortName}-combo-${itemOrAbility}`, () => {
      expect(!!ability || !!item).toBe(true);
    });
  }
}

// Check that each steam guid link is unique
const steamGuideLinks: Record<string, number> = {}; // Counter of all steam guide IDs
for (const { npcShortName, heroBuild } of heroBuildIterator()) {
  steamGuideLinks[heroBuild.steam_guide_workshop_ids.en] =
    (steamGuideLinks[heroBuild.steam_guide_workshop_ids.en] || 0) + 1;
}
for (const [guideLink, counter] of Object.entries(steamGuideLinks)) {
  test(`heroBuilds-Unique steam guide links (${guideLink})`, () => {
    expect(counter === 1).toBe(true);
  });
}

for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
  // Test counter items exist
  for (const phase of Object.values(heroContent.counter_items)) {
    for (const counterItems of Object.values(phase)) {
      for (const counterItem of counterItems) {
        //validateItems(hero, [counterItem.item]);
        test(`heroBuilds-Counter item exist (${npcShortName}, ${counterItem})`, () => {
          expect(
            counterItem === "armor" ||
              counterItem === "magicResistance" ||
              counterItem === "statusResistance" ||
              counterItem === "SentryGem" ||
              counterItem === "SentryDust" ||
              counterItem === "SentryDustGem" ||
              counterItem === "AttackSpeed" ||
              counterItem === "DamageItems" ||
              counterItem === "ward_dispenser" ||
              Object.prototype.hasOwnProperty.call(
                dota2ItemsActive,
                `item_${counterItem}`
              )
          ).toBe(true);
        });
      }
    }
  }
}

function a() {
  // Validate that all items have correct names, i.e. exists in dota2ItemsActive
  let tests = 0;
  let errors = 0;
  const allItems: Record<string, boolean> = {}; // all items; used for file validation later on
  const allAbilities: Record<string, boolean> = {}; // all abilites; used for file validation later on
  const steamGuideLinks: Record<string, number> = {}; // Counter of all steam guide IDs

  // Iterate through all heroes and validate the data
  for (const hero of Object.keys(heroBuilds)) {
    if (heroBuilds[hero].gameplay_version !== currentPatch) {
      //console.log(
      //          `Hero ${hero} skipped (patch version = ${heroBuilds[hero].gameplay_version})`
      //      );
      //continue;
    }
    const npcHeroName = Dota2.hero_names.localizedNameToNPCName(hero);
    const heroContent = heroBuilds[hero];

    // Validate invalid use of '
    //if (JSON.stringify(heroBuilds[hero]).includes("'")) {
    //console.log(`${hero}: Guide contains invalid character "'"`);
    //} // Now solved when creating guides...

    // Validate hero builds
    for (const build of heroContent.builds) {
      // Validate items on build
      const items = build.items;
      for (const categoryItems of Object.values(items)) {
        //validateItems(hero, categoryItems);
      }
      //if (build.item_tooltips !== undefined) {
      //validateItems(hero, Object.keys(build.item_tooltips));
      //}
    }
  }

  // Validate that each ability has an image
  /*const allAbilities_ = allAbilities;
    const infoAbilities =
      await new Promise<string>((resolve) => {
        let errors = 0;
        const targetNumberOfFiles = Object.keys(allAbilities_).length;
        let numberOfFiles = 0;

        for (const ability of Object.keys(allAbilities_)) {
          if (ability.startsWith("special_bonus")) {
            // Skip talents
            numberOfFiles++;
            if (numberOfFiles == targetNumberOfFiles) {
              resolve(`${errors} ability files were not found.`);
            }
          } else {
            const f = `D:/DotaCoach/dotaCoachApp/dist/img/abilities/${ability}_hp1.jpg`;

            fs.access(f, fs.constants.F_OK, (err) => {
              if (err) {
                DotaLogger.log(
                  `Abilities: File '${f}' not found (${JSON.stringify(err)})`
                );
                errors++;
              }
              numberOfFiles++;
              if (numberOfFiles == targetNumberOfFiles) {
                resolve(`${errors} ability files were not found.`);
              }
            });
          }
        }
      });*/

  //DotaLogger.log(infoItems);
  //DotaLogger.log(infoAbilities);
  //DotaLogger.log("");

  //DotaLogger.log(`${errors} Errors: in ${tests} datasets`);
  //DotaLogger.log(``);
}
