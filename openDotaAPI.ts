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
      let url = 'https://api.opendota.com/api/players/' + steamId32
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
      let url = 'https://api.opendota.com/api/players/' + steamId32 + '/peers'
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