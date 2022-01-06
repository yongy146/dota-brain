/*
 * This library accesses and contains data from OpenDota.
 *
 * Source: https://api.opendota.com/
 *
 * OpenDota APIs used in this library:
 *    - fetchPlayer: https://api.opendota.com/api/players/361606936
 *    - fetchPeers:  https://api.opendota.com/api/players/361606936/peers
 * 
 */
import * as DotaLogger from '../../src/utility/log'
import * as WebAccess from '../../src/utility/webAccess'
//import * as WebAccess from '../../src/utility/webAccessNode'
import * as Dota2 from '../../submodules/dota2/dota2'

export class Player {
  "account_id":  number // steam ID (32 bit)
  "personaname": string // user name
  "avatarfull":  string // avatar
}

export class Friend extends Player {
  //"account_id":  number // steam ID (32 bit)
  "last_played": number // Last time played together / Unix epoch time
  "with_win":    number // wins together
  "with_games":  number // losses together
  //"personaname": string // user name
  //"avatarfull":  string // avatar
}


const key = 'api_key=06632c9a-57d8-469b-a90a-1ecd64c72918'

/**
 * 
 * Sample player: https://api.opendota.com/api/players/361606936
 * 
 * @param steamId32 
 * @returns 
 */
export async function getPlayer(steamId32: string): Promise<any> {
  DotaLogger.log(`openDotaAPI.getPlayer(steamId32: ${steamId32}): Called`)

  //let url = `https://api.opendota.com/api/players/${steamId32}?${key}`
  let url = `https://api.opendota.com/api/players/${steamId32}`

  return new Promise((resolve, reject) => {
    WebAccess.getRequestJSON(url, 3).then((player) => {

      player['rank_medal'] = "unknown rank (" + player.rank_tier + ")"
      /* Rank example 11 - Herald with one star or Immortal would be 80 */
      switch (Math.floor(player.rank_tier/10)) {
          case 1: {
              player.rank_medal = 'Herald'
              break
          }
          case 2: {
              player.rank_medal = 'Guardian'
              break
          }
          case 3: {
              player.rank_medal = 'Crusader'
              break
          }
          case 4: {
              player.rank_medal = 'Archon'
              break
          }
          case 5: {
              player.rank_medal = 'Legend'
              break
          }
          case 6: {
              player.rank_medal = 'Ancient'
              break
          }
          case 7: {
              player.rank_medal = 'Divine'
              break
          }
          case 8: {
              player.rank_medal = 'Immortal'
              break
          }
      }

      resolve(player)
    })
  })
}

/**
 * Function returns player stats of a user based of last 100 matches, max 30 days old
 * 
 * This information is used for ban recommendations and non-ban recommendations
 * 
 * @param steamId32
 * @returns { steamId32: <sring>, heroes: [{hero_id: 103, match_count, wins: xx, win_rate: xx%, pick_rate: xx%, kills: .., deaths: ... assists: ...[average] }]matches: <array of matches>]}
 */
export function getPlayerStats(steamId32): Promise<any> {
  DotaLogger.log(`openDotaAPI.getPlayerStats(${steamId32}): Called`)
  return new Promise((resolve, reject) => {
    getMatches(steamId32, null, 100).then((matches) => {
      //DotaLogger.log(`openDotaAPI.getPlayerStats(): ${matches.length} matches received`)

      var result = {
        steamId32: steamId32,
        match_count: 0,
        heroes: [],
        matches: matches
      }

      const cutoff = Math.round((new Date()).getTime() / 1000) - (30 * 24 * 60 * 60)

      // Add matches that are less than 30 days old
      for (const match of matches) {
        if (match.start_time > cutoff) {
          var index = result.heroes.findIndex((hero) => { return hero.hero_id==match.hero_id } )
          if (index==-1) {
            index = result.heroes.length
            result.heroes.push({
              hero_id: match.hero_id,
              match_count: 0,
              wins: 0,
              kills: 0,
              deaths: 0,
              assists: 0
            })
          }
          result.match_count++
          result.heroes[index].match_count++
          result.heroes[index].wins += match.is_victory ? 1 : 0
          result.heroes[index].kills += match.kills
          result.heroes[index].deaths += match.deaths
          result.heroes[index].assists += match.assists
        }
      }

      // Manage calculated fields
      for (const hero of result.heroes) {
        hero.win_rate = Math.round(hero.wins / hero.match_count * 100) / 100
        hero.pick_rate = Math.round(hero.match_count / result.match_count * 100 ) / 100
        hero.kills = Math.round(hero.kills/hero.match_count)
        hero.deaths = Math.round(hero.deaths/hero.match_count)
        hero.assists = Math.round(hero.assists/hero.match_count)
      }

      // Sort array
      result.heroes.sort((a, b) => { return b.match_count - a.match_count })
      //DotaLogger.log(`Results = ${JSON.stringify(result)}`)
      resolve(result)
    }).catch((error) => {
      DotaLogger.error(`openDotaAPI.getPlayerStats(${steamId32}): Error = ${error}`)
      DotaLogger.error(`openDotaAPI.getPlayerStats(${steamId32}): Stack = ${error.stack}`)
    })
  })
}

/**
 * Function returns an array with the last 4 matches of a player with a given hero
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
 * 
 * @param steamId32
 * @param heroId (if null, provides matches with any hero)
 * @returns 
 */
export async function getMatches(steamId32: string, heroId: number, numberOfMatches: number): Promise<any> {
  //DotaLogger.log(`openDotaAPI.getMatches(steamId32: ${steamId32}, heroId: ${heroId}, numberOfMatches: ${numberOfMatches}): Called`)

  let heroIdParam = heroId==null ? '' : `&hero_id=${heroId}`
//  let url = `https://api.opendota.com/api/players/${steamId32}/matches?limit=${numberOfMatches}${heroIdParam}&${key}`
  let url = `https://api.opendota.com/api/players/${steamId32}/matches?limit=${numberOfMatches}${heroIdParam}`

  return new Promise((resolve, reject) => {
    WebAccess.getRequestJSON(url, 3).then((matches) => {
      for (const match of matches) {
        match['is_victory'] = match.radiant_win ? match.player_slot<128 : match.player_slot>=128
      }
      resolve(matches)
    })
  })
/*  return new Promise((resolve, reject) => {

      WebAccess.getRequestJSON(url).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
  })*/
}

/**
 * Function returns an array with 100 last matches played with a give hero
 *
 * Sample API call: https://api.opendota.com/api/heroes/104/matches
 * 
 * @param heroId
 * @returns 
 */
  export async function getMatchesWithHero(heroId: number): Promise<any> {
    DotaLogger.log(`openDotaAPI.getMatchesWithHero(heroId: ${heroId}): Called`)
  
    let url = `https://api.opendota.com/api/heroes/${heroId}/matches`
  
    return new Promise((resolve, reject) => {
      DotaLogger.log(`openDotaAPI.getMatchesWithHero(): Fetching url ${url}`)
      WebAccess.getRequestJSON(url, 3).then((matches) => {
        var result = []
        for (const match of matches) {
          result.push(match.match_id)
        }
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

/**
 * 
 * Sample unparsed match: https://api.opendota.com/api/matches/6281922307
 * Sample parsed match: https://api.opendota.com/api/matches/6284478751
 * @param matchId 
 * @returns 
 */
export async function getMatch(matchId: string, authenticated: boolean): Promise<any> {
  //DotaLogger.log(`openDotaAPI.getMatch(matchId: ${matchId}): Called`)

  let url = `https://api.opendota.com/api/matches/${matchId}${authenticated ? `?${key}` : ``}`
  //let url = `https://api.opendota.com/api/matches/${matchId}?${key}`

  return  WebAccess.getRequestJSON(url, 3)
}


/**
 * 
 * @param steamId32 
 * @param heroId 
 * @param numberOfMatches Number of matches to be downloaded (has direct impact on the numbe of server requests)
 * @returns Array of matches. Each match includes purchase_log
 * Sample result: [{"match_id":6284402681,"start_time":1637436825,"account_id":361606936,"item_0":50,"item_1":208,"item_2":145,"item_3":600,"item_4":127,"item_5":135,"purchase_log":[{"time":-71,"key":"quelling_blade"},{"time":-70,"key":"magic_stick"}]},{"match_id":6284091347,"start_time":1637425123,"account_id":361606936,"item_0":48,"item_1":208,"item_2":249,"item_3":604,"item_4":127,"item_5":235,"purchase_log":[{"time":-84,"key":"orb_of_venom"},{"time":-83,"key":"tango"}]}]
 */
export async function getRecentItems(steamId32: string, heroId: number, numberOfMatches: number): Promise<any> {
  DotaLogger.log(`openDotaAPI.getRecentItems(steamId32: ${steamId32}, heroId: ${heroId}, numberOfMatches: ${numberOfMatches}): Called`)
  return new Promise(async (resolve, reject) => {
    getMatches(steamId32, heroId, numberOfMatches).then(async (matches) => {
      var items = []
      var counter = matches.length
      if (counter==0) resolve(items) // If there are not matches, return immediatly
      //DotaLogger.log(`openDotaAPI.getRecentItems(): Number of matches ${counter}`)
      for (var i=0; i<numberOfMatches && i<matches.length; i++) {
        const matchId = matches[i].match_id
        getMatch(matchId, false).then((matchFull) => {
          const players = matchFull.players as any[]
          const index = players.findIndex((value) => {
            return value.hero_id == heroId
          })
          if (index!=-1) {
            //DotaLogger.log(`getRecentItems: matches[i]=${JSON.stringify(matchFull)}`)
            // Add data available in unparsed matches
            var matchData = {
              match_id: matchFull.match_id,
              start_time: matchFull.start_time,
              account_id: players[index].account_id,
              item_0: players[index].item_0,
              item_1: players[index].item_1,
              item_2: players[index].item_2,
              item_3: players[index].item_3,
              item_4: players[index].item_4,
              item_5: players[index].item_5,
            }
            // Add data available in parsed matches
            if (players[index].hasOwnProperty('purchase_log') && players[index].purchase_log!=null) {
              matchData['purchase_log']  = players[index].purchase_log
              //for (const itemPurchase of matches[i].purchase_log) {
                // format itemPurchse: {"time": -89, "key": "tango", "charges": 6}

              //}
            }
            else {
              matchData['purchase_log'] = []
            }
            items.push(matchData)
          }
        }).catch((error) => {
          DotaLogger.warn(`openDotaAPI.getRecentItems(): Match ${matchId} could not be loaded`)
        }).finally(() => {
          counter--
          //DotaLogger.log(`openDotaAPI.getRecentItems(): Completed, number of matches remaining ${counter}`)
          if (counter==0) {
            resolve(items.sort((a, b) => { return b.start_time - a.start_time}))
          }  
        })
      }
    })
  })
}


export async function getAbilityUpgrades(heroId: number): Promise<any> {
  DotaLogger.log(`openDotaAPI.getAbilityUpgrades(heroId: ${heroId}): Called`)
  return new Promise(async (resolve, reject) => {
    var attempts = 5
    var successful = false

    while ((!successful) && (attempts>0)) {
      DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Attemp #${6-attempts}`)
      await getMatchesWithHero(heroId).then(async (matches) => {
        //DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Matches = ${JSON.stringify(matches)}`)
        DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Loading ${matches.length} matches for hero ${Dota2.hero.name.idToLocalizedName(heroId)}`)
        successful = true
        var abilityUpgradesMax = 0;
        var abilityUpgrades = []
        var matchCounts = matches.length
        var matchCounter = 1
        var matchSuccess = 0
        var matchError = 0

        process.stdout.write(`*** Downloading ${matches.length} matches: `);

        for (const m of matches) {
          //DotaLogger.log(`getting match ${++matchGets}`)
          const matchCounter_ = ++matchCounter
          process.stdout.write(`D${matchCounter_} `);

          await new Promise(resolve => setTimeout(resolve, 200)); // Wait 100 ms to ensure only 10 reqquests are made per second 

          getMatch(m, true).then((match) => {
            //DotaLogger.log(`match ${matchGets_} received`)
            const players = match.players
            // Find player with hero id
            var player = null
            for (const p of players) {
              if (p.hero_id==heroId) {
                player = p
                continue
              }
            }
            //DotaLogger.log(`Match = ${JSON.stringify(match)}`)
            // Register matches with highest ability upgrades
            if (player.hasOwnProperty('ability_upgrades_arr') && player.ability_upgrades_arr!=null) {
              // Only analyze ability upgrades if they are available and not null

              const abilities_upgrades = player.ability_upgrades_arr
              //DotaLogger.log(`xxxx: abilities_upgrades=${JSON.stringify(abilities_upgrades)}`)
              if (abilities_upgrades.length<abilityUpgradesMax) {
                // Do nothing, as we already have bigger ones
              }
              else if (abilities_upgrades.length==abilityUpgradesMax) {
                // Add ability upgrade to list
                abilityUpgrades.push(abilities_upgrades)
              }
              else {
                abilityUpgradesMax = abilities_upgrades.length
                abilityUpgrades = [abilities_upgrades]
              }
              //DotaLogger.log(`Match '${m}' has ${abilities_upgrades.length} ability upgrades`)

              //DotaLogger.log(`Player = ${JSON.stringify(player.ability_upgrades_arr)}
              /*DotaLogger.log(`abilityIds = ${JSON.stringify(t.abilityIds)}`)
              for (const ability of abilities_upgrades) {
                console.log(`ability upgrade: ${t.abilityIds[ability]} (ability: ${ability})`)
              }*/
            }
          }).then(() => {
            matchSuccess++
            process.stdout.write(`S${matchCounter_} `);
          }).catch((error) => {
            matchError++
            //process.stdout.write(`1) x${error}x\n`);
            //process.stdout.write(`2) x${JSON.stringify(error)}x\n`);
            process.stdout.write(`E${matchCounter_}[${error.status}][${error.statusText}][${error.url}] `);
            //process.stdout.write(`E${matchCounter_}[${error}] `);
            //process.stdout.write(`E${matchCounter_}[${JSON.stringify(error)}] `);
            //DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Error from getMatch (${JSON.stringify(error)})`)
          }).finally(() => {
            //process.stdout.write(`${matchSuccess + matchError} `);
  //          DotaLogger.log(`matchCounts: ${matchCounts} => ${matchCounts-1}`)
            matchCounts--
            if (matchCounts==0) {
              process.stdout.write(`\n`);
              DotaLogger.log(`openDotaAPI.getAbilityUpgrades(): Match loading for ${Dota2.hero.name.idToLocalizedName(heroId)} completed (successes: ${matchSuccess}/${matches.length}, errors: ${matchError}/${matches.length})`)
              resolve(abilityUpgrades)
            }
          })
        }
      }).catch((error) => {
        DotaLogger.error(`openDotaAPI.getAbilityUpgrades(): ${JSON.stringify(error)}`)
        attempts--
        if (attempts==0) {
          reject(error)
        }
      })
    }
  })
}

export interface HeroStats {
  id: number, // e.g. 1
  "name": string, // "npc_dota_hero_antimage"
  "localized_name": string , // "Anti-Mage"
  "primary_attr": string , // "agi"
  "attack_type": string, //"Melee"
  "roles": string[], // e.g. ["Carry","Escape","Nuker"]
  "img": string, // e.g. "/apps/dota2/images/dota_react/heroes/antimage.png?"
  "icon": string, // e.g. "/apps/dota2/images/dota_react/heroes/icons/antimage.png?"
  "base_health": number, // e.g. 200
  "base_health_regen": number, // e.g. 0.25
  "base_mana": number, // e.g. 75
  "base_mana_regen": number, // 0
  "base_armor": number, // 0
  "base_mr": number, // 25
  "base_attack_min": number, // 29
  "base_attack_max": number, // 33
  "base_str": number, // 23
  "base_agi": number, // 24
  "base_int": number, // 12
  "str_gain": number, // 1.6
  "agi_gain": number, // 2.8
  "int_gain": number, // 1.8
  "attack_range": number, // 150
  "projectile_speed": number, // 0
  "attack_rate": number, // 1.4
  "move_speed": number, // 310
  "turn_rate": number, // 0.9, can also be null
  "cm_enabled": boolean, // true
  "legs": number, // 2
  "hero_id": number, // 1
  "turbo_picks": number, // 432997
  "turbo_wins": number, // 222647
  "pro_ban": number, // 299
  "pro_win": number, // 42
  "pro_pick": number, // 85
  "1_pick": number, // 28916 // Public
  "1_win": number, // 14675
  "2_pick": number, // 47375
  "2_win": number, // 24311
  "3_pick": number, // 54512
  "3_win": number, // 28250
  "4_pick": number, // 44432
  "4_win": number, // 23053
  "5_pick": number, // 26363
  "5_win": number, // 13781
  "6_pick": number, // 11961
  "6_win": number, // 6074
  "7_pick": number, // 5816
  "7_win": number, // 2946
  "8_pick": number, // 1942
  "8_win": number, // 969
  "null_pick": number, //1973708
  "null_win": number, // 0
}



export interface SimplifiedHeroStats {
  "hero_id": number, // 1
  "name": string, // "npc_dota_hero_antimage"
  "localized_name": string , // "Anti-Mage"
  /*"turbo_pick_rate": number, // e.g.  55.5
  "turbo_win_rate": number, // e.g. 45.9
  "pro_pick_rate": number,
  "pro_win_rate": number,*/
  "1_win_rate": number, // Herald
  "1_pick_rate": number,
  "2_win_rate": number, // Guardian
  "2_pick_rate": number,
  "3_win_rate": number, // Crusader
  "3_pick_rate": number,
  "4_win_rate": number, // Archon
  "4_pick_rate": number,
  "5_win_rate": number, // Legend
  "5_pick_rate": number,
  "6_win_rate": number, // Acient
  "6_pick_rate": number,
  "7_win_rate": number, // Divine
  "7_pick_rate": number,
  "8_win_rate": number, // Immortal
  "8_pick_rate": number, 
  "overall_win_rate": number, // Sum across all medals
  "overall_pick_rate": number
}

/**
 * 
 * @returns Simplified hero stats sorted by overall win rate
 */
export async function getSimplifiedHeroStats(): Promise<SimplifiedHeroStats[]> {
  DotaLogger.log(`openDotaAPI.getSimplifiedHeroStats(): Called`)

  return new Promise((resolve, reject) => {
    getHeroStats().then((stats) => {
      //DotaLogger.log(`Stats = ${JSON.stringify(stats)}`)

      var publicGames = {
        "1_pick": 0,
        "2_pick": 0,
        "3_pick": 0,
        "4_pick": 0,
        "5_pick": 0,
        "6_pick": 0,
        "7_pick": 0,
        "8_pick": 0,
        "overall_pick": 0
      }
      for (const heroStats of stats) {
        publicGames['1_pick'] += heroStats['1_pick']
        publicGames['2_pick'] += heroStats['2_pick']
        publicGames['3_pick'] += heroStats['3_pick']
        publicGames['4_pick'] += heroStats['4_pick']
        publicGames['5_pick'] += heroStats['5_pick']
        publicGames['6_pick'] += heroStats['6_pick']
        publicGames['7_pick'] += heroStats['7_pick']
        publicGames['8_pick'] += heroStats['8_pick']
        publicGames['overall_pick'] += heroStats['1_pick'] + heroStats['2_pick'] + heroStats['3_pick'] + heroStats['4_pick'] + heroStats['5_pick'] + heroStats['6_pick'] + heroStats['7_pick'] + heroStats['8_pick']
      }

      var result = []
      for (const heroStats of stats) {
        var data: SimplifiedHeroStats
        const total_win = heroStats['1_win'] + heroStats['2_win'] + heroStats['3_win'] + heroStats['4_win'] + heroStats['5_win'] + heroStats['6_win'] + heroStats['7_win'] + heroStats['8_win']
        const total_pick = heroStats['1_pick'] + heroStats['2_pick'] + heroStats['3_pick'] + heroStats['4_pick'] + heroStats['5_pick'] + heroStats['6_pick'] + heroStats['7_pick'] + heroStats['8_pick']
        data = {
          "hero_id": heroStats.hero_id,
          "name": heroStats.name,
          "localized_name": heroStats.localized_name,
          "1_win_rate": heroStats['1_win'] / heroStats['1_pick'], // Herald
          "1_pick_rate": heroStats['1_pick'] / publicGames['1_pick'],
          "2_win_rate": heroStats['2_win'] / heroStats['2_pick'], // Guardian
          "2_pick_rate": heroStats['2_pick'] / publicGames['2_pick'],
          "3_win_rate": heroStats['3_win'] / heroStats['3_pick'], // Crusader
          "3_pick_rate": heroStats['3_pick'] / publicGames['3_pick'],
          "4_win_rate": heroStats['4_win'] / heroStats['4_pick'], // Archon
          "4_pick_rate": heroStats['4_pick'] / publicGames['4_pick'],
          "5_win_rate": heroStats['5_win'] / heroStats['5_pick'], // Legend
          "5_pick_rate": heroStats['5_pick'] / publicGames['5_pick'],
          "6_win_rate": heroStats['6_win'] / heroStats['6_pick'], // Legend
          "6_pick_rate": heroStats['6_pick'] / publicGames['6_pick'],
          "7_win_rate": heroStats['7_win'] / heroStats['7_pick'], // Acient
          "7_pick_rate": heroStats['7_pick'] / publicGames['7_pick'],
          "8_win_rate": heroStats['8_win'] / heroStats['8_pick'], // Immortal
          "8_pick_rate": heroStats['8_pick'] / publicGames['8_pick'],
          "overall_win_rate": total_win / total_pick, // Immortal
          "overall_pick_rate": total_pick / publicGames['overall_pick'],
        }
        result.push(data)
      }
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}



/**
 * Function returns hero stats
 *
 * API call: https://api.opendota.com/api/heroStats
 * 
 * @returns 
 */
export async function getHeroStats(): Promise<HeroStats[]> {
    DotaLogger.log(`openDotaAPI.getHeroStats(): Called`)
  
    let url = `https://api.opendota.com/api/heroStats`
  
    return new Promise((resolve, reject) => {
      WebAccess.getRequestJSON(url, 3).then((matches) => {
        resolve(matches)
      }).catch((error) => {
        reject(error)
      })
    })
  }

/*
 * Function returns the players the user played with the last months
 */
export function fetchPlayer(steamId32: string): Promise<Player> {
    DotaLogger.log(`openDotaAPI.fetchPlayer(${steamId32}): Called`)
    /*
      Format:
        {
          "tracked_until": "1606740072",
          "profile": {
            "account_id": 361606936,
            "personaname": "Mario",
            "name": null,
            "plus": true,
            "cheese": 0,
            "steamid": "76561198321872664",
            "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/72/720ce60b21640db1dbcf7366441952b885ce5bd7.jpg",
            "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/72/720ce60b21640db1dbcf7366441952b885ce5bd7_medium.jpg",
            "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/72/720ce60b21640db1dbcf7366441952b885ce5bd7_full.jpg",
            "profileurl": "https://steamcommunity.com/profiles/76561198321872664/",
            "last_login": "2020-08-08T16:34:34.787Z",
            "loccountrycode": null,
            "is_contributor": false
          },
          "rank_tier": 54,
          "leaderboard_rank": null,
          "solo_competitive_rank": 3239,
          "mmr_estimate": {
            "estimate": 3120
          },
          "competitive_rank": 2129
        }
     */

    // https://api.opendota.com/api/players/361606936

    return new Promise((resolve, reject) => {
      if (steamId32=='0') {
        // Can happen when steam ID is not known
        reject()
        return
      }
      //let url = `https://api.opendota.com/api/players/${steamId32}?${key}`
      let url = `https://api.opendota.com/api/players/${steamId32}`
      DotaLogger.log("openDotaAPI.fetchPlayer(): URL='" + url + "'")
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.setRequestHeader('Cache-Control', 'no-cache');
      request.responseType = 'text';

      request.onload = async function() {
          DotaLogger.log("dotaAPI.fetchPlayer(): Request status = " + request.status)
          
          if (request.status == 200) {
              let text = request.response
              DotaLogger.log("openDotaAPI.fetchPlayer(): Message received: " + text)
              let player = JSON.parse(text)

              let p = new Player()
              p.account_id  = player.profile.account_id
              p.personaname = player.profile.personaname
              p.avatarfull  = player.profile.avatarfull

              DotaLogger.log("openDotaAPI.fetchPlayer(): peers: " + JSON.stringify(p))
              resolve(p)
          }
          else {
              reportNetworkError("openDotaAPI.fetchPlayer(): ", request.status)
              reject()
          }
          //await new Promise(resolve => setTimeout(resolve, 1000/20)); // max 10 requests per second allowed
          //t.isLoading = false
      }
      /*while (this.isLoading) {
          await new Promise(resolve => setTimeout(resolve, 1000/20)); // max 10 requests per second allowed
      }
      t.isLoading = true*/
      request.send();
    })
  }


export function fetchPeers(steamId32: string): Promise<Friend[]> {
  DotaLogger.log(`openDotaAPI.fetchPeers(${steamId32}): Called`)
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

    // https://api.opendota.com/api/players/361606936/peers

    return new Promise((resolve, reject) => {
      let url = `https://api.opendota.com/api/players/${steamId32}/peers`
      //let url = `https://api.opendota.com/api/players/${steamId32}/peers?${key}`
      DotaLogger.log("openDotaAPI.fetchPeers(): URL='" + url + "'")
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.setRequestHeader('Cache-Control', 'no-cache');
      request.responseType = 'text';
      request.onload = async function() {
          DotaLogger.log("openDotaAPI.fetchPeers(): Request status = " + request.status)
          
          if (request.status == 200) {
              let text = request.response
              DotaLogger.log("openDotaAPI.fetchPeers(): Message received: " + text)
              let peers = JSON.parse(text)

              var result: Friend[] = []

              for (var i=0; i<peers.length; i++) {
                const now = new Date()

                const date = new Date(peers[i].last_played * 1000) // Need the x 1000 to get miliseconds
                date.setMonth(date.getMonth()+1) // Increase by one months
                //if (date > now) {
                  // Last common game is less than a month ago
                  var f = new Friend()
                  f.account_id  = peers[i].account_id
                  f.last_played = peers[i].last_played
                  f.with_win    = peers[i].with_win
                  f.with_games  = peers[i].with_games
                  f.personaname = peers[i].personaname
                  f.avatarfull  = peers[i].avatarfull
                  result.push(f)
                //}
              }

              DotaLogger.log("openDotaAPI.fetchPeers(): peers: " + JSON.stringify(result))
              resolve(result)
          }
          else {
              reportNetworkError("openDotaAPI.fetchPeers(): ", request.status)
              reject()
          }
          //await new Promise(resolve => setTimeout(resolve, 1000/20)); // max 10 requests per second allowed
          //t.isLoading = false
      }
      /*while (this.isLoading) {
          await new Promise(resolve => setTimeout(resolve, 1000/20)); // max 10 requests per second allowed
      }
      t.isLoading = true*/
      request.send();
    })
  }


  export interface ability_ids {
    [key: number]: string // ability name
  }

/**
 * Function returns ability ids
 *
 * Sample API call: https://api.opendota.com/api/constants/ability_ids
 * 
 * @param heroId
 * @returns 
 */
 export async function getAbilityIds(authenticated: boolean): Promise<ability_ids> {
  DotaLogger.log(`openDotaAPI.getAbilityIds(): Called`)
  //let url = `https://api.opendota.com/api/matches/${matchId}${authenticated ? `?${key}` : ``}`
  let url = `https://api.opendota.com/api/constants/ability_ids${authenticated ? `?${key}` : ``}`

  return new Promise((resolve, reject) => {
    WebAccess.getRequestJSON(url, 3).then((ability_ids) => {
      resolve(ability_ids)
    }).catch((error) => {
      DotaLogger.log(`openDotaAPI.getAbilityIds(): Error (${JSON.stringify(error)}`)
    })
  })
}


function reportNetworkError(prefix: string, errorCode: number) {
  var errorMessage = errorCode.toString()
  switch (errorCode) {
      case 430: {
          errorMessage = "430 Forbidden"
          break
      }
      case 429: {
          errorMessage = "429 Too Many Requests"
          break
      }
  }
  DotaLogger.log(prefix + "Network error (" + errorMessage + ")")
}