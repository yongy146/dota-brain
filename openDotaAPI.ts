/*
 * openDotaAPI.ts provides access to the OpenDota API.
 *
 * Source: https://api.opendota.com/
 *
 * Copyright (C) Dota Coach, 2022
 */
import * as DotaLogger from "../utilities/log";
import * as WebAccess from "../utilities/webAccess";
//import * as WebAccess from '../../src/utility/webAccessNode'
import * as Dota2 from "../../submodules/dota-brain/dota2";
import {
  PlayerProfile,
  PlayerMatch,
} from "../../src/app/background/dataManager";

export class Player {
  "account_id": number; // steam ID (32 bit)
  "personaname": string; // user name
  "avatarfull": string; // avatar
}

export class Friend extends Player {
  "last_played": number; // Last time played together / Unix epoch time
  "with_win": number; // wins together
  "with_games": number; // losses together
}

/**
 * Function retrieves the player's profile (steam account).
 *
 * Sample API calls:
 *   - https://api.opendota.com/api/players/361606936 (public profile - Michel)
 *   - https://api.opendota.com/api/players/107050251 (public profile - Zograf)
 *   - https://api.opendota.com/api/players/4294967295 (private profile)
 *
 * @param steamId32
 * @return Player's profile
 */
export function getPlayerProfile(steamId32: string): Promise<PlayerProfile> {
  DotaLogger.log(`openDotaAPI.getPlayer(steamId32: ${steamId32}): Called`);

  const url = `https://api.opendota.com/api/players/${steamId32}`;

  return new Promise((resolve, reject) => {
    WebAccess.getRequestJSON(url, 3)
      .then((player) => {
        resolve(player);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Function returns an array with the last matches of a player with a given hero
 * 
 * {
    "match_id": 6283427150,
    "player_slot": 2,
    "radiant_win": true,
    "is_victory": true,   <== Added by OpenDotaAPI
    "hero_id": 104,
    "duration": 2827,
    "game_mode": 22,
    "lobby_type": 0,
    "start_time": 1637401591,
    "version": 21,
    "kills": 17,
    "deaths": 14,
    "assists": 12,
    "skill": 1,
    "leaver_status": 0,
    "party_size": 2
  },
 *
 * Sample API call: https://api.opendota.com/api/players/361606936/matches?limit=4&hero_id=104
 * parameters: https://docs.opendota.com/#tag/players%2Fpaths%2F~1players~1%7Baccount_id%7D~1matches%2Fget
 * 
 * 
 * 
 * @param steamId32
 * @param options (if null, provides matches with any hero)
 * @returns Array of matches
 */
export async function getMatches(
  steamId32: string,
  options?: getMatchesOptions
  /*numberOfMatches: number,
  heroId?: number*/
): Promise<PlayerMatch[]> {
  //DotaLogger.log(`openDotaAPI.getMatches(steamId32: ${steamId32}, heroId: ${heroId}, numberOfMatches: ${numberOfMatches}): Called`)

  if (options == undefined) options = {};
  const params = Object.entries(options)
    .map((val) => val.join("="))
    .join("&");

  //const heroIdParam = heroId == undefined ? "" : `&hero_id=${heroId}`;
  const url = `https://api.opendota.com/api/players/${steamId32}/matches${
    params == "" ? "" : "?" + params
  }`;

  return new Promise((resolve, reject) => {
    WebAccess.getRequestJSON(url, 3)
      .then((matches) => {
        resolve(matches);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export interface getMatchesOptions {
  limit?: number; // number of matches
  date?: number; // number of days
  hero_id?: number; // hero id, e.g. 104 for legion commander
}

/**
 * Function returns 100 last matches played with a hero.
 *
 * Sample API call: https://api.opendota.com/api/heroes/104/matches
 *
 * @param heroId Array of matches
 * @returns
 */
export async function getMatchesOfHero(heroId: number): Promise<any> {
  DotaLogger.log(`openDotaAPI.getMatchesOfHero(heroId: ${heroId}): Called`);

  const url = `https://api.opendota.com/api/heroes/${heroId}/matches`;

  return new Promise((resolve, reject) => {
    DotaLogger.log(`openDotaAPI.getMatchesOfHero(): Fetching url ${url}`);
    WebAccess.getRequestJSON(url, 3)

      .then((matches) => {
        const result = [];
        for (const match of matches) {
          result.push(match.match_id);
        }
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 *
 * Sample unparsed match: https://api.opendota.com/api/matches/6281922307
 * Sample parsed match: https://api.opendota.com/api/matches/6284478751
 * @param matchId
 * @returns
 */
export async function getMatch(matchId: number): Promise<any> {
  //DotaLogger.log(`openDotaAPI.getMatch(matchId: ${matchId}): Called`)

  const url = `https://api.opendota.com/api/matches/${matchId}`;

  return WebAccess.getRequestJSON(url, 3);
}

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
    getMatches(steamId32, { limit: numberOfMatches, hero_id: heroId }).then(
      (matches) => {
        const items = [];
        let counter = matches.length;
        if (counter == 0) resolve(items); // If there are not matches, return immediatly

        const errors = [];

        //DotaLogger.log(`openDotaAPI.getRecentItems(): Number of matches ${counter}`)
        for (let i = 0; i < numberOfMatches && i < matches.length; i++) {
          const matchId = matches[i].match_id;
          getMatch(matchId)
            .then((matchFull) => {
              const players = matchFull.players as any[];
              const index = players.findIndex((value) => {
                return value.hero_id == heroId;
              });
              if (index != -1) {
                //DotaLogger.log(`getRecentItems: matches[i]=${JSON.stringify(matchFull)}`)
                // Add data available in unparsed matches
                const matchData = {
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
                  Object.prototype.hasOwnProperty.call(
                    players[index],
                    "purchase_log"
                  ) &&
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
              DotaLogger.warn(
                `openDotaAPI.getRecentItems(): Match ${matchId} could not be loaded`
              );
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
                    items.sort((a, b) => {
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
      DotaLogger.log(
        `openDotaAPI.getAbilityUpgrades(): Attemp #${6 - attempts}`
      );
      await getMatchesOfHero(heroId)
        .then(async (matches) => {
          //DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Matches = ${JSON.stringify(matches)}`)
          DotaLogger.log(
            `openDotaAPI.getAbilityUpgrades(): Loading ${
              matches.length
            } matches for hero ${Dota2.hero_names.idToLocalizedName(heroId)}`
          );
          successful = true;
          let abilityUpgradesMax = 0;
          let abilityUpgrades = [];
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

            getMatch(m)
              .then((match) => {
                //DotaLogger.log(`match ${matchGets_} received`)
                const players = match.players;
                // Find player with hero id
                let player = null;
                for (const p of players) {
                  if (p.hero_id == heroId) {
                    player = p;
                    continue;
                  }
                }
                //DotaLogger.log(`Match = ${JSON.stringify(match)}`)
                // Register matches with highest ability upgrades
                if (
                  Object.prototype.hasOwnProperty.call(
                    player,
                    "ability_upgrades_arr"
                  ) &&
                  player.ability_upgrades_arr != null
                ) {
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
          DotaLogger.error(
            `openDotaAPI.getAbilityUpgrades(): ${JSON.stringify(error)}`
          );
          attempts--;
          if (attempts == 0) {
            reject(error);
          }
        });
    }
  });
}

export interface HeroStats {
  id: number; // e.g. 1
  name: string; // "npc_dota_hero_antimage"
  localized_name: string; // "Anti-Mage"
  primary_attr: string; // "agi"
  attack_type: string; //"Melee"
  roles: string[]; // e.g. ["Carry","Escape","Nuker"]
  img: string; // e.g. "/apps/dota2/images/dota_react/heroes/antimage.png?"
  icon: string; // e.g. "/apps/dota2/images/dota_react/heroes/icons/antimage.png?"
  base_health: number; // e.g. 200
  base_health_regen: number; // e.g. 0.25
  base_mana: number; // e.g. 75
  base_mana_regen: number; // 0
  base_armor: number; // 0
  base_mr: number; // 25
  base_attack_min: number; // 29
  base_attack_max: number; // 33
  base_str: number; // 23
  base_agi: number; // 24
  base_int: number; // 12
  str_gain: number; // 1.6
  agi_gain: number; // 2.8
  int_gain: number; // 1.8
  attack_range: number; // 150
  projectile_speed: number; // 0
  attack_rate: number; // 1.4
  move_speed: number; // 310
  turn_rate: number; // 0.9, can also be null
  cm_enabled: boolean; // true
  legs: number; // 2
  hero_id: number; // 1
  turbo_picks: number; // 432997
  turbo_wins: number; // 222647
  pro_ban: number; // 299
  pro_win: number; // 42
  pro_pick: number; // 85
  "1_pick": number; // 28916 // Public
  "1_win": number; // 14675
  "2_pick": number; // 47375
  "2_win": number; // 24311
  "3_pick": number; // 54512
  "3_win": number; // 28250
  "4_pick": number; // 44432
  "4_win": number; // 23053
  "5_pick": number; // 26363
  "5_win": number; // 13781
  "6_pick": number; // 11961
  "6_win": number; // 6074
  "7_pick": number; // 5816
  "7_win": number; // 2946
  "8_pick": number; // 1942
  "8_win": number; // 969
  null_pick: number; //1973708
  null_win: number; // 0
}

export interface SimplifiedHeroStats {
  hero_id: number; // 1
  name: string; // "npc_dota_hero_antimage"
  localized_name: string; // "Anti-Mage"
  /*"turbo_pick_rate": number, // e.g.  55.5
  "turbo_win_rate": number, // e.g. 45.9
  "pro_pick_rate": number,
  "pro_win_rate": number,*/
  "1_win_rate": number; // Herald
  "1_pick_rate": number;
  "2_win_rate": number; // Guardian
  "2_pick_rate": number;
  "3_win_rate": number; // Crusader
  "3_pick_rate": number;
  "4_win_rate": number; // Archon
  "4_pick_rate": number;
  "5_win_rate": number; // Legend
  "5_pick_rate": number;
  "6_win_rate": number; // Acient
  "6_pick_rate": number;
  "7_win_rate": number; // Divine
  "7_pick_rate": number;
  "8_win_rate": number; // Immortal
  "8_pick_rate": number;
  overall_win_rate: number; // Sum across all medals
  overall_pick_rate: number;
}

/**
 *
 * @returns Simplified hero stats sorted by overall win rate
 */
export async function getSimplifiedHeroStats(): Promise<SimplifiedHeroStats[]> {
  DotaLogger.log(`openDotaAPI.getSimplifiedHeroStats(): Called`);

  return new Promise((resolve, reject) => {
    getHeroStats()
      .then((stats) => {
        //DotaLogger.log(`Stats = ${JSON.stringify(stats)}`)

        const publicGames = {
          "1_pick": 0,
          "2_pick": 0,
          "3_pick": 0,
          "4_pick": 0,
          "5_pick": 0,
          "6_pick": 0,
          "7_pick": 0,
          "8_pick": 0,
          overall_pick: 0,
        };
        for (const heroStats of stats) {
          publicGames["1_pick"] += heroStats["1_pick"];
          publicGames["2_pick"] += heroStats["2_pick"];
          publicGames["3_pick"] += heroStats["3_pick"];
          publicGames["4_pick"] += heroStats["4_pick"];
          publicGames["5_pick"] += heroStats["5_pick"];
          publicGames["6_pick"] += heroStats["6_pick"];
          publicGames["7_pick"] += heroStats["7_pick"];
          publicGames["8_pick"] += heroStats["8_pick"];
          publicGames["overall_pick"] +=
            heroStats["1_pick"] +
            heroStats["2_pick"] +
            heroStats["3_pick"] +
            heroStats["4_pick"] +
            heroStats["5_pick"] +
            heroStats["6_pick"] +
            heroStats["7_pick"] +
            heroStats["8_pick"];
        }

        const result = [];
        for (const heroStats of stats) {
          const total_win =
            heroStats["1_win"] +
            heroStats["2_win"] +
            heroStats["3_win"] +
            heroStats["4_win"] +
            heroStats["5_win"] +
            heroStats["6_win"] +
            heroStats["7_win"] +
            heroStats["8_win"];
          const total_pick =
            heroStats["1_pick"] +
            heroStats["2_pick"] +
            heroStats["3_pick"] +
            heroStats["4_pick"] +
            heroStats["5_pick"] +
            heroStats["6_pick"] +
            heroStats["7_pick"] +
            heroStats["8_pick"];
          const data: SimplifiedHeroStats = {
            hero_id: heroStats.hero_id,
            name: heroStats.name,
            localized_name: heroStats.localized_name,
            "1_win_rate": heroStats["1_win"] / heroStats["1_pick"], // Herald
            "1_pick_rate": heroStats["1_pick"] / publicGames["1_pick"],
            "2_win_rate": heroStats["2_win"] / heroStats["2_pick"], // Guardian
            "2_pick_rate": heroStats["2_pick"] / publicGames["2_pick"],
            "3_win_rate": heroStats["3_win"] / heroStats["3_pick"], // Crusader
            "3_pick_rate": heroStats["3_pick"] / publicGames["3_pick"],
            "4_win_rate": heroStats["4_win"] / heroStats["4_pick"], // Archon
            "4_pick_rate": heroStats["4_pick"] / publicGames["4_pick"],
            "5_win_rate": heroStats["5_win"] / heroStats["5_pick"], // Legend
            "5_pick_rate": heroStats["5_pick"] / publicGames["5_pick"],
            "6_win_rate": heroStats["6_win"] / heroStats["6_pick"], // Legend
            "6_pick_rate": heroStats["6_pick"] / publicGames["6_pick"],
            "7_win_rate": heroStats["7_win"] / heroStats["7_pick"], // Acient
            "7_pick_rate": heroStats["7_pick"] / publicGames["7_pick"],
            "8_win_rate": heroStats["8_win"] / heroStats["8_pick"], // Immortal
            "8_pick_rate": heroStats["8_pick"] / publicGames["8_pick"],
            overall_win_rate: total_win / total_pick, // Immortal
            overall_pick_rate: total_pick / publicGames["overall_pick"],
          };
          result.push(data);
        }
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Function returns hero stats
 *
 * API call: https://api.opendota.com/api/heroStats
 *
 * @returns
 */
export async function getHeroStats(): Promise<HeroStats[]> {
  DotaLogger.log(`openDotaAPI.getHeroStats(): Called`);

  const url = `https://api.opendota.com/api/heroStats`;

  return new Promise((resolve, reject) => {
    WebAccess.getRequestJSON(url, 3)
      .then((matches) => {
        resolve(matches);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 *
 * Sample API call: https://api.opendota.com/api/players/361606936/peers
 *
 * @param steamId32
 * @returns
 */
export function fetchPeers(steamId32: string): Promise<Friend[]> {
  DotaLogger.log(`openDotaAPI.fetchPeers(${steamId32}): Called`);
  /*
      Format:
        [
          {
            "account_id": 259483753,
            "last_played": 1602614523,
            "win": 482,
            "games": 958,
            "with_win": 482,
            "with_games": 958,
            "against_win": 0,
            "against_games": 0,
            "with_gpm_sum": 510818,
            "with_xpm_sum": 601808,
            "personaname": "Dr Luminous",
            "name": null,
            "is_contributor": false,
            "last_login": "2019-12-27T21:06:12.559Z",
            "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f5/f55ae1241f7b09b216dd2b4b267eb0f2bde816a0.jpg",
            "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f5/f55ae1241f7b09b216dd2b4b267eb0f2bde816a0_full.jpg"
          },
          { ... }
        ]
     */
  return new Promise((resolve, reject) => {
    const url = `https://api.opendota.com/api/players/${steamId32}/peers`;
    DotaLogger.log("openDotaAPI.fetchPeers(): URL='" + url + "'");
    WebAccess.getRequestJSON(url, 3)
      .then((peers) => {
        const result: Friend[] = [];

        for (let i = 0; i < peers.length; i++) {
          const date = new Date(peers[i].last_played * 1000); // Need the x 1000 to get miliseconds
          date.setMonth(date.getMonth() + 1); // Increase by one months
          //if (date > now) {
          // Last common game is less than a month ago
          const f = new Friend();
          f.account_id = peers[i].account_id;
          f.last_played = peers[i].last_played;
          f.with_win = peers[i].with_win;
          f.with_games = peers[i].with_games;
          f.personaname = peers[i].personaname;
          f.avatarfull = peers[i].avatarfull;
          result.push(f);
          //}
        }

        DotaLogger.log(
          "openDotaAPI.fetchPeers(): peers: " + JSON.stringify(result)
        );
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
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
