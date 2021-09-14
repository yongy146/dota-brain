// Function downloads data form stratz API

/*
  fetchPlayerRank() uses https://api.stratz.com/api/v1/Player/361606936
  fetchPlayerPicks() uses https://api.stratz.com/api/v1/Player/361606936/behaviorChart
  fetchPlayerStreakAndSmurf() uses https://api.stratz.com/api/v1/Player/361606936/matches?take=21

  fetchHeroStats() uses https://api.stratz.com/api/v1/Hero/22
  fetchPlayerMatches() uses https://api.stratz.com/api/v1/Player/361606936/matches?take=5
     => NEW https://api.stratz.com/api/v1/Player/361606936/matches?take=1&playerlist=all

  For comparison Dota Buff profile: https://www.dotabuff.com/players/361606936

  Main account: 361606936
  Second account: 392398375
*/

import * as DotaLogger from '../../src/utility/log'
//import { HeroPick } from "../inGame/inGame"
//import { Big } from "big.js"
//import { DotaHeroes } from "./dotaHeroes"
import * as Steam from "../../src/utility/steam"
import { windowNames } from '../../consts'

export class PlayerMatch {
    heroId: number
    isVictory: boolean
    numKills: number
    numDeaths: number
    numAssists: number
    endDateTime: number // Unix epoch time
    numLastHits: number
    numDenies: number
    item0Id: number = -1
    item1Id: number = -1
    item2Id: number = -1
    item3Id: number = -1
    item4Id: number = -1
    item5Id: number = -1
    //neutral0Id: number = -1
    players: number[] = []
}

/* Input frfom Stratz:
   Lane: Roaming = 0, SafeLane = 1, Midlane = 2, Offlane = 3, Jungle = 4
   Role: Core = 0, Support = 1
*/

// In order to remain in the quota the library ensures that only one request is done at the time and no more than 20 per second


// TASK seperate StratzAPI from updateing screens!!!!


export const lanes = ["Roaming", "Safelane", "Midlane", "Offlane", "Jungle"]

export async function reportPlayerRank(steamId32: string): Promise<string> {
    var seasonRank
    try {
    seasonRank = await fetchPlayerRank(steamId32)
    }
    catch (e) {
        DotaLogger.error("reportPlayerRank when calling this.fetchPlayerRank (" + JSON.stringify(e) + ")")
        return
    }
        
    DotaLogger.log("startzAPI.reportPlayerRank: seasonRank='" + seasonRank + "'")

    var rank = "unknown rank (" + seasonRank + ")"
    /* Rank example 11 - Herald with one star or Immortal would be 80 */
    switch (Math.floor(parseInt(seasonRank)/10)) {
        case 1: {
            rank = 'Herald'
            break
        }
        case 2: {
            rank = 'Guardian'
            break
        }
        case 3: {
            rank = 'Crusader'
            break
        }
        case 4: {
            rank = 'Archon'
            break
        }
        case 5: {
            rank = 'Legend'
            break
        }
        case 6: {
            rank = 'Ancient'
            break
        }
        case 7: {
            rank = 'Divine'
            break
        }
        case 8: {
            rank = 'Immortal'
            break
        }
    }
    
    return rank
}    

export async function fetchPlayerRank(steamId32: string): Promise<string> {
    DotaLogger.log(`stratzAPI.fetchPlayerRank(${steamId32}): Called`)
    //https://api.stratz.com/api/v1/Player/361606936
    return new Promise((resolve, reject) => {
        let url = 'https://api.stratz.com/api/v1/Player/' + Steam.steamId64ToSteamId32(steamId32)
        DotaLogger.log("stratzAPI.fetchPlayerRank(): URL='" + url + "'")
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.responseType = 'text';
        request.onload = async function() {
            DotaLogger.log("stratzAPI.fetchPlayerRank(): Request status = " + request.status)
            
            if (request.status == 200) {
                let text = request.response
                DotaLogger.log("stratzAPI.fetchPlayerRank(): Message received: " + text)
                let playerStats = JSON.parse(text)
                let seasonRank = playerStats.steamAccount.seasonRank

                DotaLogger.log("stratzAPI.fetchPlayerRank(): seasonRank: " + seasonRank)
                resolve(seasonRank)
            }
            else {
                reportNetworkError("stratzAPI.fetchPlayerRank(): ", request.status)
                reject()
            }
        }
        request.send();
    })
}


// Time: Unix time since 1.1.1970
/* Data format:
    {
        "heroId": 104,
        "matchCount": 17,
        "winCount": 10,
        "avgImp": 131,
        "mvpCount": 7,
        "topCoreCount": 3,
        "topSupportCount": 0,
        "roles": [
        {
            "role": 0,
            "matchCount": 16,
            "winCount": 10
        }, ...
        ],
        "lanes": [
        {
            "lane": 3,
            "matchCount": 13,
            "winCount": 7
        }, ...
        ]
    }
*/
//   * @Return: Resolve: data from Stratz API, Reject: String error message



export async function fetchPlayerHeroStatsLastMonth(steamId32: string): Promise<any> {
    DotaLogger.log(`stratzAPI.fetchPlayerHeroStatsLastMonth(${steamId32}): Called`)
    var date = new Date()
    date.setMonth(date.getMonth()-1)
    let time = Math.round(date.getTime() / 1000)
    return fetchPlayerHeroStats(steamId32, time.toString())
}

/**
 * 
 * @param steamId32  player Steam ID
 * @param time Gemes played since (UNIX epoch time in seconds)
 * @returns Object <any> in case of success and string in case of error
 */
 export async function fetchPlayerHeroStats(steamId32: string, time: string): Promise<any> {
    DotaLogger.log(`stratzAPI.fetchPlayerHeroStats(${steamId32}, ${time}): Called`)
    return new Promise((resolve, reject) => {
        // Sample file: https://api.stratz.com/api/v1/Player/361606936/behaviorChart
        let url = 'https://api.stratz.com/api/v1/Player/' + steamId32 + '/heroPerformance?startDateTime=' + time
        DotaLogger.log(`stratzAPI.fetchPlayerHeroStats(): URL=${url}`)
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.responseType = 'text';
        request.onload = async function() {
            if (request.status == 200) {
                let text = request.response
                //DotaLogger.log("stratzAPI.fetchPlayerGameStats(): Message received: " + text)
                let playerStats = JSON.parse(text)
                DotaLogger.log(`stratzAPI.fetchPlayerHeroStats(${steamId32}, ${time}): Successful`)
                resolve(playerStats)
                }
            else {
                DotaLogger.warn(`stratzAPI.fetchPlayerHeroStats(): Error (URL=${url})`)
                reportNetworkError("stratzAPI.fetchPlayerHeroStats(): ", request.status)
                if (request.status==429) {
                    reject("Data limit reached")
                }
                else {
                    reject("No data available")
                }
            }
        }
        request.send();
    })
}

/**
 * Returns the last 5 games a player played with a given hero
 * @param steamId32  player Steam ID
 * @param time Gemes played since (UNIX epoch time in seconds)
 * @returns Object <any> in case of success and string in case of error
 */
export async function fetchPlayerHeroGames(steamId32: string, heroId: number): Promise<any> {
    DotaLogger.log(`stratzAPI.fetchPlayerHeroGames(steamId32: ${steamId32}, heroId: ${heroId}): Called`)
    return new Promise((resolve, reject) => {
        // Sample file:     https://api.stratz.com/api/v1/Player/361606936/matches?heroId=104
        // https://api.stratz.com/api/v1/Player/361606936/matches?heroId=42&take=2&include=Stats
        let url = 'https://api.stratz.com/api/v1/Player/' + steamId32 + '/matches?heroId=' + heroId + '&take=5&include=Stats'
        DotaLogger.log(`stratzAPI.fetchPlayerHeroGames(): URL=${url}`)
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.responseType = 'text';
        request.onload = async function() {
            if (request.status == 200) {
                let text = request.response
                //DotaLogger.log("stratzAPI.fetchPlayerGameStats(): Message received: " + text)
                let playerStats = JSON.parse(text)
                DotaLogger.log(`stratzAPI.fetchPlayerHeroGames(${steamId32}, ${heroId}): Successful`)
                resolve(playerStats)
                }
            else {
                DotaLogger.warn(`stratzAPI.fetchPlayerHeroStats(): Error (URL=${url})`)
                reportNetworkError("stratzAPI.fetchPlayerHeroGames(): ", request.status)
                if (request.status==429) {
                    reject("Data limit reached")
                }
                else {
                    reject("No data available")
                }
            }
        }
        request.send();
    })
}


// behaviorChart was deprectated on 3.7.2021
/**
 * 
 * @param steamId32  player Steam ID
 * @param time Gemes played since (UNIX epoch time in milliseconds)
 * @returns Object <any> in case of success and string in case of error
 */
/*     public fetchPlayerGameStats(steamId32: string, time: string): Promise<any> {
    DotaLogger.log(`stratzAPI.fetchPlayerGameStats(${steamId32}, ${time}): Called`)
    return new Promise((resolve, reject) => {
        // Sample file: https://api.stratz.com/api/v1/Player/361606936/behaviorChart
        let url = 'https://api.stratz.com/api/v1/Player/' + steamId32 + '/behaviorChart?heroId=&startDateTime=' + time
        DotaLogger.log(`stratzAPI.fetchPlayerGameStats(): URL=${url}`)
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.responseType = 'text';
        const t = this
        request.onload = async function() {
            if (request.status == 200) {
                let text = request.response
                //DotaLogger.log("stratzAPI.fetchPlayerGameStats(): Message received: " + text)
                let playerStats = JSON.parse(text)
                DotaLogger.log(`stratzAPI.fetchPlayerGameStats(${steamId32}, ${time}): Successful`)
                resolve(playerStats)
                }
            else {
                DotaLogger.warn(`stratzAPI.fetchPlayerGameStats(): Error (URL=${url})`)
                t.reportNetworkError("stratzAPI.fetchPlayerGameStats(): ", request.status)
                if (request.status==429) {
                    reject("Data limit reached")
                }
                else {
                    reject("No data available")
                }
            }
        }
        request.send();
    })
}*/



/**
 * It can take several minutes for a completed game to be available on StratzAPI
 * @param steamId32 
 * @param numberOfMatches 
 */
export async function fetchPlayerMatches(steamId32: string, numberOfMatches: number): Promise<PlayerMatch[]> {
    DotaLogger.log(`stratzAPI.fetchPlayerMatches(${steamId32}, ${numberOfMatches}): Called`)

    return new Promise((resolve, reject) => {
        let url = 'https://api.stratz.com/api/v1/Player/' + steamId32 + '/matches?take=' + numberOfMatches + '&playerlist=all' //21'
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.responseType = 'text';
        request.onload = async function() {
            DotaLogger.log("stratzAPI.fetchPlayerMatches(): Request status = " + request.status)
            DotaLogger.log("stratzAPI.fetchPlayerMatches(): URL='" + url + "'")
            
            /*
                {
                    "id": 5566531755,
                    "didRadiantWin": true,
                    "durationSeconds": 2059,
                    "startDateTime": 1597346552,
                    "clusterId": 191,
                    "firstBloodTime": 2,
                    "lobbyType": 7,
                    "numHumanPlayers": 10,
                    "gameMode": 22,
                    "replaySalt": 2015373408,
                    "isStats": false,
                    "avgImp": 104,
                    "parsedDateTime": 1597352168,
                    "statsDateTime": 1597352175,
                    "gameVersionId": 135,
                    "regionId": 9,
                    "sequenceNum": 4671994425,
                    "rank": 54,
                    "bracket": 5,
                    "endDateTime": 1597348611,
                    "players": [
                    {
                        "matchId": 5566531755,
                        "playerSlot": 0,
                        "heroId": 104,
                        "steamAccountId": 361606936,
                        "isRadiant": true,
                        "numKills": 9,
                        "numDeaths": 7,
                        "numAssists": 14,
                        "leaverStatus": 0,
                        "numLastHits": 193,
                        "numDenies": 10,
                        "goldPerMinute": 553,
                        "experiencePerMinute": 638,
                        "level": 22,
                        "gold": 687,
                        "goldSpent": 17595,
                        "heroDamage": 30364,
                        "towerDamage": 8780,
                        "isRandom": false,
                        "lane": 3,
                        "intentionalFeeding": false,
                        "role": 0,
                        "imp": 133,
                        "award": 1,
                        "item0Id": 50,
                        "item1Id": 208,
                        "item2Id": 36,
                        "item3Id": 1,
                        "item4Id": 127,
                        "item5Id": 168,
                        "behavior": 0,
                        "heroHealing": 1000,
                        "roamLane": 0,
                        "isVictory": true,
                        "networth": 17152,
                        "neutral0Id": 381,
                        "imp2": 7
                    }
                    ],
                    "analysisOutcome": 0,
                    "predictedOutcomeWeight": 70
                },
            */

            if (request.status == 200) {
                let text = request.response
                DotaLogger.log("stratzAPI.fetchPlayerMatches(): Message received")
                //DotaLogger.log("stratzAPI.fetchPlayerMatches(): Message received: " + text)
                let matches = JSON.parse(text)

                var result: PlayerMatch[] = []

                for (var i=0; i<matches.length; i++) {
                //if (date > now) {
                    // Last common game is less than a month ago
                    var m = new PlayerMatch()
                    for (var j=0; j<matches[i].players.length; j++) {
                        if (matches[i].players[j].steamAccountId==steamId32) {
                            m.heroId      = matches[i].players[j].heroId
                            m.isVictory   = matches[i].players[j].isVictory
                            m.numKills    = matches[i].players[j].numKills
                            m.numDeaths   = matches[i].players[j].numDeaths
                            m.numAssists  = matches[i].players[j].numAssists
                            m.numLastHits = matches[i].players[j].numLastHits
                            m.numDenies   = matches[i].players[j].numDenies

                            if (matches[i].players[j].hasOwnProperty('item0Id')) {
                                m.item0Id = matches[i].players[j].item0Id
                            }
                            if (matches[i].players[j].hasOwnProperty('item1Id')) {
                                m.item1Id = matches[i].players[j].item1Id
                            }
                            if (matches[i].players[j].hasOwnProperty('item2Id')) {
                                m.item2Id = matches[i].players[j].item2Id
                            }
                            if (matches[i].players[j].hasOwnProperty('item2Id')) {
                                m.item2Id = matches[i].players[j].item2Id
                            }
                            if (matches[i].players[j].hasOwnProperty('item3Id')) {
                                m.item3Id = matches[i].players[j].item3Id
                            }
                            if (matches[i].players[j].hasOwnProperty('item4Id')) {
                                m.item4Id = matches[i].players[j].item4Id
                            }
                            if (matches[i].players[j].hasOwnProperty('item5Id')) {
                                m.item5Id = matches[i].players[j].item5Id
                            }
                        }
                        m.players.push(matches[i].players[j].steamAccountId)
                    }
                        //console.warn("matches[i].players[0].endDateTime = " + matches[i].players[0].endDateTime)
                    m.endDateTime = matches[i].endDateTime
                    result.push(m)
                //}
                }

//                    console.warn("stratAPI Result = " + JSON.stringify(result))
                resolve(result)
            }
            else {
                reportNetworkError("openDotaAPI.fetchPeers(): ", request.status)
                reject(request.status)
            }
        }
        request.send()
    })
}

/**
 * Stratz discontinued this function
 * @param heroId 
 * @returns heroStats object in case of success (any object), otherwise error code (number)
 */
/*export async function fetchHeroStats(heroId: number): Promise<any> {
    DotaLogger.log(`stratzAPI.fetchHeroStats(heroId: ${heroId}): Called`)
    return new Promise((resolve, reject) => {

        // This API provides the hero statistics for this week
        let url = 'https://api.stratz.com/api/v1/Hero/' + heroId
        DotaLogger.log(`stratzAPI.fetchHeroStats(heroId: ${heroId}): URL=${url}`)
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.responseType = 'text';
        request.onload = async function() {
            DotaLogger.log(`stratzAPI.fetchHeroStats(heroId: ${heroId}): Request status = ${request.status}`)
            
            /*
                {"matchPickCount":20972040,"matchBanCount":8628983,"matchLastWeekPickCount":21513210,"matchLastWeekBanCount":8860978,"heroes":[{"heroId":18,"heroLaneDetail":[{"laneId":2,"matchCount":25240,"wins":0.5526941362916006},{"laneId":4,"matchCount":2002,"wins":0.43906093906093907},{"laneId":1,"matchCount":227069,"wins":0.5111574014946999},{"laneId":3,"matchCount":73275,"wins":0.5036642784032753},{"laneId":255,"matchCount":41,"wins":0.2926829268292683},{"laneId":0,"matchCount":369,"wins":0.43360433604336046}],"heroRoleDetail":[{"roleId":0,"matchCount":319217,"wins":0.5139450593170163},{"roleId":1,"matchCount":8779,"wins":0.4459505638455405}],"pickBan":{"day":1597276800,"pick":{"day":18487,"rank":-1,"lane":-1,"role":-1,"matchCount":327996,"wins":0.512125147867657},"ban":{"day":18487,"rank":-1,"matchCount":126147,"wins":0.512322924841653},"pickLastWeek":{"day":18487,"rank":-1,"lane":-1,"role":-1,"matchCount":313070,"wins":0.5151691315041365},"banLastWeek":{"day":18487,"rank":-1,"matchCount":120891,"wins":0.513503900207625}}}]}
            */

  /*          if (request.status == 200) {
                let text = request.response
                DotaLogger.log(`stratzAPI.fetchHeroStats(heroId: ${heroId}): Message received: ${text}`)
                let heroStats = JSON.parse(text)
                resolve(heroStats)
            }
            else {
                reportNetworkError(`stratzAPI.fetchHeroStats(heroId: ${heroId}): `, request.status)
                reject(request.status)
            }
        }
        request.send();
    })
}*/


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
        case 504: {
            errorMessage = "504 Gateway Timeout"
            break
        }
    }
    DotaLogger.log(prefix + "Network error (" + errorMessage + ")")
}