/**
 * This node.js tool validates the data quality of all Dota 2 files (e.g. the ones provided by Alex)
 *
 * Arugments:
 *    --dump [passives]    <= Dumps passive abilities
 *
 * Compile:
 *    - tsc.cmd .\src\dataQuality.ts --outDir .\dist\dataQuality --resolveJsonModule --esModuleInterop --watch
 *
 * Run:
 *    - node .\dist\dataQuality\src\dataQuality.js
 *    - node .\dist\dataQualiMantay\src\dataQuality.js --dump passives
 *
 * For automated fetching im images from Dota 2 use:
 *    - wget https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/light_robes.png -OutFile light_robes.png
 *
 */

// Imports for data quality checks
import dota2Abilities from "../submodules/dota-brain/dota2Abilities.json";
import { disables } from "../submodules/dota-brain/disables";
import { dispellableBuffs } from "../submodules/dota-brain/dispellableBuffs";
import { dotaCoachMessages } from "../submodules/dota-brain/messages";
import { heroBuilds } from "../submodules/dota-brain/heroBuilds";
import dota2Items from "../submodules/dota-brain/dota2ItemsActive.json";
import { stdout } from "process";
import axios from "axios";
import { DOTA_COACH_GUIDE_ROLE } from "../submodules/dota-brain/playerRoles";
import * as Dota2 from "../submodules/dota-brain/dota2";
import * as fs from "fs";
import * as DotaLogger from "../submodules/utilities/log";

const currentPatch = "7.33b";

class DataQuality {
  public constructor() {
    DotaLogger.log("");
    DotaLogger.log("Data quality validation launched");
    DotaLogger.log("");

    // Read command line instructions
    const args = process.argv.slice(2);
    console.log("myArgs: ", args);
    if (args.length == 2 && args[0] == "--dump") {
      switch (args[1]) {
        case "passives": {
          this.dumpPassives();
          break;
        }
        default: {
          DotaLogger.log(`Unkown argument '--dump ${args[1]}'`);
        }
      }
    } else {
      this.performAllTests();
    }
  }

  private async performAllTests() {
    //this.validateDisables();
    //this.validateDispellableBuffs();
    //this.validateBreakablePassives()

    await this.validateHeroGuides();

    // await this.validateItemImages(); // Done for patch 7.32
    //await this.validateAbilityImages()// Done for patch 7.32

    //await this.validateAbilities();

    //await this.validateAbilityBuilds()

    //this.showHeroesWithUltimate();

    //this.showTrackedItems()

    //this.validaDotaCoachMessages()
  }

  /**
   * Function dumps all item names as used by Dota 2
   */
  protected dumpItemNames() {
    // Dump all item names for reuse
    const items = Object.keys(dota2Items);
    let names = "";
    for (let i = 0; i < items.length; i++) {
      names += items[i];
      if (i < items.length - 1) {
        names += "\t";
      }
    }
    DotaLogger.log("background.dumpItemNames(): Item names '" + names + "'");
  }

  /**
   * Function validates the length of chat messges, i.e. that it is shorter than max_length.
   *
   */
  private validaDotaCoachMessages() {
    DotaLogger.log(`=== validate dotaCoachMessages ===`);
    let issues = 0;

    const max_length = 109;
    for (const dotaCoachMessage of dotaCoachMessages) {
      const chatMessage =
        dotaCoachMessage.chatMessage || dotaCoachMessage.textMessage;
      if (chatMessage.length > max_length) {
        DotaLogger.error(
          "Message.constructor: Message too long with " +
            chatMessage.length +
            " characters"
        );
        DotaLogger.error(
          chatMessage.slice(0, max_length) +
            "<-- x -->" +
            chatMessage.slice(max_length)
        );
        issues++;
      }
    }

    DotaLogger.log(`${issues} issues identified`);
    DotaLogger.log(``);
  }

  /**
   * Function dumps all heroes and whether they have an ultimate timer or not
   */
  private showHeroesWithUltimate() {
    DotaLogger.log(`=== heroes with ultimate timer ===`);

    for (const hero of Dota2.hero.getAllHeroNames()) {
      // Key = long hero name
      //const cd = Dota2.hero_abilities.getUltimateCooldown(hero);
      const hasTimer = Dota2.hero_abilities.hasUltimateTimer(hero);
      //      DotaLogger.log(`${key} ${hasTimer ? 'has utlimate timer' : 'has no ultimate timer'} (cooldown: ${JSON.stringify(cd)})`)
      DotaLogger.log(
        `${hero} ${hasTimer ? "has utlimate timer" : "has no ultimate timer"}`
      );
    }

    DotaLogger.log(``);
  }

  private showTrackedItems() {
    DotaLogger.log(`=== items tracked by PerformanceTracker ===`);

    const items = Dota2.items.getTrackedItems();

    //DotaLogger.log(`-- Tracked: ${JSON.stringify(items.tracked)}`)
    DotaLogger.log(`-- Tracked`);
    for (const [key, value] of Object.entries(items.tracked)) {
      console.log(`${key.replace("item_", "")}`);
    }
    //DotaLogger.log(`-- Not tracked: ${JSON.stringify(items.notTracked)}`)
    DotaLogger.log(`-- Not tracked`);
    for (const [key, value] of Object.entries(items.notTracked)) {
      console.log(`${key.replace("item_", "")}`);
    }
  }

  private validateDisables() {
    DotaLogger.log(`=== disables.ts ===`);
    let tests = 0;
    let errors = 0;

    // Match all 'disables' with Dota 2
    for (const hero of Object.keys(disables)) {
      for (const skill of disables[hero]) {
        tests++;
        if (
          Dota2.hero_abilities.getHeroName(skill.skill) == "Unknown hero"
          //          AbilityAffects.prototype.hasOwnProperty.call(dota2Abilities, skill.skill)
        ) {
          DotaLogger.error(
            `background.validateDataQuality(): ${skill.skill} from disables.ts does not exist in Abilities of Dota 2`
          );
          errors++;
        }
      }
    }
    DotaLogger.log(`${errors} Errors: in ${tests} datasets`);
    DotaLogger.log(``);
  }

  private validateDispellableBuffs() {
    DotaLogger.log(`=== dispellableBuffs.ts ===`);
    let tests = 0;
    let errors = 0;

    // Match all 'disables' with Dota 2
    for (const skills of Object.values(dispellableBuffs)) {
      for (const skill of skills) {
        tests++;
        if (Dota2.hero_abilities.getHeroName(skill) === "Unknown hero") {
          DotaLogger.error(
            `background.validateDispellableBuffs(): ${skill} from dispellableBuffs.ts does not exist in Abilities of Dota 2`
          );
          errors++;
        }
      }
    }
    DotaLogger.log(`${errors} Errors: in ${tests} datasets`);
    DotaLogger.log(``);
  }

  private dumpPassives() {
    DotaLogger.log(`=== dump passives ===`);

    const heroes = Dota2.hero.getAllHeroNames();

    for (const hero of heroes) {
      const breakablePassives = Dota2.hero_abilities.getBreakablePassives(hero);
      stdout.write(`${hero}: ${breakablePassives}\n`);
    }
  }

  private async validateAbilityImages() {
    DotaLogger.log(`=== validate ability images ===`);
    const abilityURL = "https://dota-coach.github.io/app/images/abilities";

    //let counter = 0;
    for (const [, abilities] of Object.entries(dota2Abilities)) {
      for (const [ability, description] of Object.entries(abilities)) {
        if (
          description.is_talent === true ||
          ability == "rubick_hidden1" ||
          ability == "rubick_hidden2" ||
          ability == "rubick_hidden3" ||
          ability == "batrider_sticky_napalm_application_damage"
        ) {
          // Skip these items
        } else {
          // Remove item_ from item keys
          //const item = key.startsWith("item_") ? key.replace("item_", "") : key;

          await axios
            .get(`${abilityURL}/${ability}_hp1.jpg`)
            .then((response) => {
              //console.log(`Success (${item})`);
            })
            .catch((err) => {
              console.log(`Error (${ability}; err=${err})`);
            });
          /*counter++;
          if (counter == 20) return;*/
        }
      }
    }
  }

  // Validate that each item has an image
  // https:// dota-coach.github.io/app/images/items/abyssal_blade.png

  private async validateItemImages() {
    DotaLogger.log(`=== validate item images ===`);
    const itemURL = "https://dota-coach.github.io/app/images/items";

    //let counter = 0;
    for (const key of Object.keys(dota2Items)) {
      if (
        key == "courier" ||
        key == "flying_courier" ||
        key.startsWith("recipe_")
      ) {
        // Skip these items
      } else {
        // Remove item_ from item keys
        const item = key.startsWith("item_") ? key.replace("item_", "") : key;

        await axios
          .get(`${itemURL}/${item}.png`)
          .then((response) => {
            //console.log(`Success (${item})`);
          })
          .catch((err) => {
            console.log(`Error (${item}; err=${err})`);
          });
        /*counter++;
        if (counter == 20) return;*/
      }
    }
  }
  /*const allItems_ = allItems;
    const infoItems = await new Promise<string>(
      (resolve) => {
        let errors = 0;
        const targetNumberOfFiles = Object.keys(allItems_).length;
        let numberOfFiles = 0;

        for (const item of Object.keys(allItems_)) {
          const f = `D:/DotaCoach/dotaCoachApp/dist/img/items/${item.replace(
            "item_",
            ""
          )}.png`;

          fs.access(f, fs.constants.F_OK, (err) => {
            if (err) {
              console.log(`File '${f}' not found`);
              //DotaLogger.log(`File '${f}' not found (${JSON.stringify(err)})`);
              errors++;
            }
            numberOfFiles++;
            if (numberOfFiles == targetNumberOfFiles) {
              resolve(`${errors} item files were not found.`);
            }
          });
        }
      }    
      );*/

  /**
   * Function checks that all ability image files exist that are being provided by standardAbilityBuilds.ts
   */
  private async validateAbilityBuilds() {
    DotaLogger.log(`=== validateAbilityBuilds.ts ===`);

    // This code section test if all abilities and items in standard builds exist (it only works on Michel's development PC)
    const validateAbilityFiles = new Promise((resolve) => {
      const abilities: Record<string, boolean> = {};
      // Calculate number of abilities / files to be searched for
      for (const hero of Object.keys(heroBuilds)) {
        for (const build of heroBuilds[hero].builds) {
          for (const ability of build.abilities) {
            if (ability.startsWith("special_bonus")) {
              // Talents are not checked
            } else {
              abilities[ability] = true;
            }
          }
        }
      }

      let errors = 0;
      const targetNumberOfFiles = Object.keys(abilities).length;
      let numberOfFiles = 0;

      for (const ability of Object.keys(abilities)) {
        const f = `D:/DotaCoach/dotaCoachApp/dist/img/abilities/${ability}_hp1.jpg`;

        fs.access(f, fs.constants.F_OK, (err) => {
          if (err) {
            DotaLogger.log(`File '${f}' not found (${JSON.stringify(err)})`);
            errors++;
          }
          numberOfFiles++;
          if (numberOfFiles == targetNumberOfFiles) {
            resolve(`${errors} ability files were not found.`);
          }
        });
      }
    });
    const info = await validateAbilityFiles;
    //then((info) => {
    DotaLogger.log(info! as string);
    DotaLogger.log("");
    //})
  }

  /**
   * Function checks if there is an image for each hero ability. For that purpose it checks the file dota2/dota2Abilities.json
   */
  private async validateAbilities() {
    DotaLogger.log(`=== validate abilities ===`);

    // This code section test if all abilities and items in standard builds exist (it only works on Michel's development PC)
    const validateAbilityFiles = new Promise<string>((resolve) => {
      // Create array with all abilities
      const heroes = Object.keys(dota2Abilities);
      const abilities: string[] = [];
      for (const hero of heroes) {
        for (const ability of Object.keys((dota2Abilities as any)[hero])) {
          if ((dota2Abilities as any)[hero][ability].is_talent === false) {
            abilities.push(ability);
          }
        }
        //abilities = abilities.concat();
      }

      let errors = 0;
      const targetNumberOfFiles = abilities.length;
      let numberOfFiles = 0;

      for (const ability of abilities) {
        const f = `D:/DotaCoach/dotaCoachApp/dist/img/abilities/${ability}_hp1.jpg`;

        fs.access(f, fs.constants.F_OK, (err) => {
          if (err) {
            DotaLogger.log(`File '${f}' not found (${JSON.stringify(err)})`);
            DotaLogger.log(
              `https://cdn.cloudflare.steamstatic.com/apps/dota-brain/images/dota_react/abilities/${ability}.png`
            );
            errors++;
          }
          numberOfFiles++;
          if (numberOfFiles == targetNumberOfFiles) {
            resolve(`${errors} ability files were not found.`);
          }
        });
      }
    });

    const info = await validateAbilityFiles;
    DotaLogger.log(info);
    DotaLogger.log("");
  }
}

new DataQuality();
