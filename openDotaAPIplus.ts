/*
 * openDotaAPI.ts provides access to the OpenDota API.
 *
 * Source: https://api.opendota.com/
 *
 * MOVE PURE API CALLS OUT TO utility/dota/api... etc.
 *
 * Copyright (C) Dota Coach, 2022
 */
import * as DotaLogger from "../utilities/log";
import * as WebAccess from "../utilities/webAccess"; // MIGRATE TO axios!
//import * as WebAccess from '../utilities/webAccessNode'
import * as Dota2 from "../dota-brain/dota2";
import * as OpentDotaAPI from "../../submodules/utilities/openDota/openDotaAPI";

/**
 *
 * @param steamId32
 * @param heroId
 * @param numberOfMatches Number of matches to be downloaded (has direct impact on the number of server requests)
 * @returns Array of matches or null (if there was an error). Each match includes purchase_log
 * Sample result: [{"match_id":6284402681,"start_time":1637436825,"account_id":361606936,"item_0":50,"item_1":208,"item_2":145,"item_3":600,"item_4":127,"item_5":135,"purchase_log":[{"time":-71,"key":"quelling_blade"},{"time":-70,"key":"magic_stick"}]},{"match_id":6284091347,"start_time":1637425123,"account_id":361606936,"item_0":48,"item_1":208,"item_2":249,"item_3":604,"item_4":127,"item_5":235,"purchase_log":[{"time":-84,"key":"orb_of_venom"},{"time":-83,"key":"tango"}]}]
 */
export async function getRecentItems(
  steamId32: string,
  heroId: number,
  numberOfMatches: number
): Promise<any> {
  DotaLogger.log(
    `openDotaAPI.getRecentItems(steamId32: ${steamId32}, heroId: ${heroId}, numberOfMatches: ${numberOfMatches}): Called`
  );
  return new Promise((resolve, reject) => {
    OpentDotaAPI.getMatches(steamId32, { limit: numberOfMatches, hero_id: heroId }).then(
      (matches) => {
        const items: any = [];
        let counter = matches.length;
        if (counter == 0) resolve(items); // If there are not matches, return immediatly

        const errors: any = [];

        //DotaLogger.log(`openDotaAPI.getRecentItems(): Number of matches ${counter}`)
        for (let i = 0; i < numberOfMatches && i < matches.length; i++) {
          const matchId = matches[i].match_id;
          OpentDotaAPI.getMatch(matchId)
            .then((matchFull) => {
              const players = matchFull.players as any[];
              const index = players.findIndex((value) => {
                return value.hero_id == heroId;
              });
              if (index != -1) {
                //DotaLogger.log(`getRecentItems: matches[i]=${JSON.stringify(matchFull)}`)
                // Add data available in unparsed matches
                const matchData: any = {
                  match_id: matchFull.match_id,
                  start_time: matchFull.start_time,
                  account_id: players[index].account_id,
                  item_0: players[index].item_0,
                  item_1: players[index].item_1,
                  item_2: players[index].item_2,
                  item_3: players[index].item_3,
                  item_4: players[index].item_4,
                  item_5: players[index].item_5,
                };
                // Add data available in parsed matches
                if (
                  Object.prototype.hasOwnProperty.call(players[index], "purchase_log") &&
                  players[index].purchase_log != null
                ) {
                  matchData["purchase_log"] = players[index].purchase_log;
                  //for (const itemPurchase of matches[i].purchase_log) {
                  // format itemPurchse: {"time": -89, "key": "tango", "charges": 6}

                  //}
                } else {
                  matchData["purchase_log"] = [];
                }
                items.push(matchData);
              }
            })
            .catch((error) => {
              DotaLogger.warn(`openDotaAPI.getRecentItems(): Match ${matchId} could not be loaded`);
              errors.push(error);
            })
            .finally(() => {
              counter--;
              //DotaLogger.log(`openDotaAPI.getRecentItems(): Completed, number of matches remaining ${counter}`)
              if (counter == 0) {
                if (errors.length > 0) {
                  reject(errors[0]);
                } else {
                  resolve(
                    items.sort((a: any, b: any) => {
                      return b.start_time - a.start_time;
                    })
                  );
                }
              }
            });
        }
      }
    );
  });
}

/**
 * Function is currently no longer used (was used to build hero guides previously)
 *
 *
 * @param heroId
 * @returns
 */
export async function getAbilityUpgrades(heroId: number): Promise<any> {
  DotaLogger.log(`openDotaAPI.getAbilityUpgrades(heroId: ${heroId}): Called`);
  return new Promise(async (resolve, reject) => {
    let attempts = 5;
    let successful = false;

    while (!successful && attempts > 0) {
      DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Attemp #${6 - attempts}`);
      await OpentDotaAPI.getMatchesOfHero(heroId)
        .then(async (matches) => {
          //DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Matches = ${JSON.stringify(matches)}`)
          DotaLogger.log(
            `openDotaAPI.getAbilityUpgrades(): Loading ${
              matches.length
            } matches for hero ${Dota2.hero_names.idToLocalizedName(heroId)}`
          );
          successful = true;
          let abilityUpgradesMax = 0;
          let abilityUpgrades: any = [];
          let matchCounts = matches.length;
          let matchCounter = 1;
          let matchSuccess = 0;
          let matchError = 0;

          process.stdout.write(`*** Downloading ${matches.length} matches: `);

          for (const m of matches) {
            //DotaLogger.log(`getting match ${++matchGets}`)
            const matchCounter_ = ++matchCounter;
            process.stdout.write(`D${matchCounter_} `);

            await new Promise((resolve) => setTimeout(resolve, 200)); // Wait 100 ms to ensure only 10 reqquests are made per second

            OpentDotaAPI.getMatch(m)
              .then((match: OpentDotaAPI.Match) => {
                //DotaLogger.log(`match ${matchGets_} received`)
                const players = match.players;
                // Find player with hero id
                let player: OpentDotaAPI.MatchPlayer | undefined;
                for (const p of players) {
                  if (p.hero_id == heroId) {
                    player = p;
                    continue;
                  }
                }
                //DotaLogger.log(`Match = ${JSON.stringify(match)}`)
                // Register matches with highest ability upgrades
                if (player !== undefined && Array.isArray(player.ability_upgrades_arr)) {
                  // Only analyze ability upgrades if they are available and not null

                  const abilities_upgrades = player.ability_upgrades_arr;
                  //DotaLogger.log(`xxxx: abilities_upgrades=${JSON.stringify(abilities_upgrades)}`)
                  if (abilities_upgrades.length < abilityUpgradesMax) {
                    // Do nothing, as we already have bigger ones
                  } else if (abilities_upgrades.length == abilityUpgradesMax) {
                    // Add ability upgrade to list
                    abilityUpgrades.push(abilities_upgrades);
                  } else {
                    abilityUpgradesMax = abilities_upgrades.length;
                    abilityUpgrades = [abilities_upgrades];
                  }
                  //DotaLogger.log(`Match '${m}' has ${abilities_upgrades.length} ability upgrades`)

                  //DotaLogger.log(`Player = ${JSON.stringify(player.ability_upgrades_arr)}
                  /*DotaLogger.log(`abilityIds = ${JSON.stringify(t.abilityIds)}`)
              for (const ability of abilities_upgrades) {
                console.log(`ability upgrade: ${t.abilityIds[ability]} (ability: ${ability})`)
              }*/
                }
              })
              .then(() => {
                matchSuccess++;
                process.stdout.write(`S${matchCounter_} `);
              })
              .catch((error) => {
                matchError++;
                //process.stdout.write(`1) x${error}x\n`);
                //process.stdout.write(`2) x${JSON.stringify(error)}x\n`);
                process.stdout.write(
                  `E${matchCounter_}[${error.status}][${error.statusText}][${error.url}] `
                );
                //process.stdout.write(`E${matchCounter_}[${error}] `);
                //process.stdout.write(`E${matchCounter_}[${JSON.stringify(error)}] `);
                //DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Error from getMatch (${JSON.stringify(error)})`)
              })
              .finally(() => {
                //process.stdout.write(`${matchSuccess + matchError} `);
                //          DotaLogger.log(`matchCounts: ${matchCounts} => ${matchCounts-1}`)
                matchCounts--;
                if (matchCounts == 0) {
                  process.stdout.write(`\n`);
                  DotaLogger.log(
                    `openDotaAPI.getAbilityUpgrades(): Match loading for ${Dota2.hero_names.idToLocalizedName(
                      heroId
                    )} completed (successes: ${matchSuccess}/${
                      matches.length
                    }, errors: ${matchError}/${matches.length})`
                  );
                  resolve(abilityUpgrades);
                }
              });
          }
        })
        .catch((error) => {
          DotaLogger.error(`openDotaAPI.getAbilityUpgrades(): ${JSON.stringify(error)}`);
          attempts--;
          if (attempts == 0) {
            reject(error);
          }
        });
    }
  });
}

/*function reportNetworkError(prefix: string, errorCode: number) {
  let errorMessage = errorCode.toString();
  switch (errorCode) {
    case 430: {
      errorMessage = "430 Forbidden";
      break;
    }
    case 429: {
      errorMessage = "429 Too Many Requests";
      break;
    }
  }
  DotaLogger.log(prefix + "Network error (" + errorMessage + ")");
}
*/
