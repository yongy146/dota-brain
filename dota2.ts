/**
 * This library is used to access all manual dota 2 data of Dota Coach (on items and abilities)
 * 
 * The only separated information sources in this folder are openDotaAPI.ts and startzAPI.ts 
 * 
 * Copyright Dota Coach, 2022. All rights reserved
 */
import { HeroBuild, ItemBuild, heroBuilds } from './heroBuilds'
//import { itemBuilds } from './itemBuilds'
import { dispellableBuffs } from './dispellableBuffs'
import dota2Abilities from './dota2Abilities.json'
import { counterItemsLaning } from './counterItemsLaning'
import { counterItemsMidGame } from './counterItemsMidGame'
import { counterItemsLateGame } from './counterItemsLateGame'
import { damageType } from './damageType'
//import { HeroAbilities, Abilities } from './openDotaData'
import dota2Items from './dota2Items.json'
import dota2Heroes from '../../submodules/dota2/dota2Heroes.json'
import * as DotaLogger from '../../src/utility/log'
import { channeling_interrupts, silence, root, disables } from './disables'
import { Transform } from 'stream'
//import { DOTA_COACH_GUIDE_ROLE, DOTA_COACH_ROLE } from '../../submodules/dota2/playerRoles'
import * as PlayerRoles from '../../submodules/dota2/playerRoles'


// Colors for radiant & dire
export const colorRadiant = '#67dd98' //'#47661f'
export const colorDire = '#ea3009' //'#58251c'

// Colors for strength, intelligence and agility
export const colorStrength = '#900000'
export const colorStrengthTransparent = 'rgba(255, 0, 0, 0.35)'
export const colorIntelligence = '#000090'
export const colorIntelligenceTransparent = 'rgba(0, 0, 255, 0.35)'
export const colorAgility = '#009000'
export const colorAgilityTransparent = 'rgba(0, 255, 0, 0.35)'


/**
 * Converts time in seconds to string in dota time
 * @param t time in seconds
 * @returns 
 */
export function convertToDotaTime(t: number): string {
    var min = Math.floor(Math.abs(t) / 60);
    var sec = Math.abs(t) % 60;
    return (t<0 ? '-' : '') + min + ":" + (sec<10 ? "0" : "") + sec;
}

/**
 * Convert time in seconds to string in dota time, rounded to 10 seconds
 * @param t time in seconds
 * @returns 
 */
 export function convertToCeiledDotaTime(t: number): string {
    var min = Math.floor(Math.abs(t) / 60);
    var sec = Math.abs(t) % 60;
    sec = 10 * Math.ceil(sec/10)
    if (sec == 60) {
        sec = 0;
        min++
    }
    return (t<0 ? '-' : '') + min + ":" + (sec<10 ? "0" : "") + sec;
}

/**
 * Convert time in seconds to string in dota time, rounded to 10 seconds
 * @param t time in seconds
 * @returns 
 */
 export function convertToFlooredDotaTime(t: number): string {
    var min = Math.floor(Math.abs(t) / 60);
    var sec = Math.abs(t) % 60;
    sec = 10 * Math.floor(sec/10)
    return (t<0 ? '-' : '') + min + ":" + (sec<10 ? "0" : "") + sec;
}


export function lobbyTypeToString(s: string): string {
    var result = s.replace('DOTA_lobby_type_name_', '')
    if (result.length>0) {
        // Convert first character to capital letter
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    return result
    /*switch (s) {
        case 'DOTA_lobby_type_name_ranked':
            return 'Ranked'

    }*/
}

/**
 * Returns an array of counter items for a given hero.
 * 
 * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * @param isSupport The role of the player
 * @returns Array of item objects, i.e. { item: "...", info: "..."}
 */
export function getCounterItemsLaning(hero: string, isSupport: boolean): any[] {
    let allItems : [any]
    let roleItems : [any]
    if (counterItemsLaning[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    allItems = counterItemsLaning[hero].all
    if (isSupport) {
        roleItems = counterItemsLaning[hero].support
    } else {
        roleItems = counterItemsLaning[hero].core
    }

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...allItems].concat([...roleItems]) 
}

export function getCounterItemsMidGame(hero: string, isSupport: boolean): any[] {
    let allItems : [any]
    let roleItems : [any]
    if (counterItemsMidGame[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    allItems = counterItemsMidGame[hero].all
    if (isSupport) {
        roleItems = counterItemsMidGame[hero].support
    } else {
        roleItems = counterItemsMidGame[hero].core
    }

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...allItems].concat([...roleItems]) 
}

export function getCounterItemsLateGame(hero: string, isSupport: boolean): any[] {
    let allItems : [any]
    let roleItems : [any]
    if (counterItemsLateGame[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    allItems = counterItemsLateGame[hero].all
    if (isSupport) {
        roleItems = counterItemsLateGame[hero].support
    } else {
        roleItems = counterItemsLateGame[hero].core
    }

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...allItems].concat([...roleItems]) 
}

/**
 * 
 * @param hero Localized hero name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * @returns 
 */
export function getStandardItemBuild(h: string): any[] { // MICHEL : ADD ROLE LOGIC!!!
    const h_ = hero.name.localizedNameToNPCName(h)

    if (!heroBuilds.hasOwnProperty(h_)) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }


    const mid_game = heroBuilds[h_].builds[0].items.mid_game
    const late_game = heroBuilds[h_].builds[0].items.late_game

    return mid_game.concat(late_game)
}

/**
 * 
 * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * @param playerRole if null, then the fucntion takes the fist build
 * @returns object with the following attributes: starting, early_game, mid_game, later_game, situational, roles: string. Each has an array of the following element: { item, info?, isCore?, purchaseTime? }
 */
//export function getItemBuild(h: string): any {
export function getItemBuild(h: string, playerRole: PlayerRoles.DOTA_COACH_ROLE): any    {
    if (!heroBuilds.hasOwnProperty(h)) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return null
    }

    var heroBuild = null
    
    if (playerRole==null) {
        heroBuild = getDefaultHeroBuild(h)
    }
    else {
        heroBuild = getHeroBuild(h, playerRole)
        if (heroBuild==null) heroBuild = getDefaultHeroBuild(h)
    }

    var tooltips_build = {}
    var tooltips_hero = {}
    if (heroBuild.hasOwnProperty('item_tooltips')) {
        tooltips_build = heroBuilds[h].builds[0].item_tooltips
    }
    if (heroBuilds[h].hasOwnProperty('item_tooltips')) {
        tooltips_hero = heroBuilds[h].item_tooltips
    }
    const item_tooltips = {
        ...tooltips_hero,
        ...tooltips_build
    }

    const build = heroBuilds[h].builds[0]
    const core_items = build.items.core

    function transformItem(item: string) {
        var result = { item: item }
        if (item_tooltips.hasOwnProperty('item')) result['info'] = item_tooltips[item]
        if (core_items.indexOf(item)!=-1) result['isCore'] = true
        return result
    }

    return {
        starting:    build.items.starting.map(x => transformItem(x)),
        early_game:  build.items.early_game.map(x => transformItem(x)),
        mid_game:    build.items.mid_game.map(x => transformItem(x)),
        late_game:   build.items.late_game.map(x => transformItem(x)),
        situational: build.items.situational.map(x => transformItem(x)),
        neutral:     build.items.neutral.map(x => transformItem(x)),
        roles:        PlayerRoles.rolesToString(heroBuild.roles)
    }
}

/**
 * 
 * @param hero localized hero name
 * @returns 
 */
export function getStandardAbilityBuild(h: string): string[] {
    //const h_ = hero.name.localizedNameToNPCName(h)

    if (!heroBuilds.hasOwnProperty(h)) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    var abilityBuild = heroBuilds[h].builds[0].abilities

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...abilityBuild] 
}

/**
 * 
 * @param heroName Localized hero name
 * @param playerRole
 * @return null if there is no such build
 */
export function getHeroBuild(heroName: string, playerRole: PlayerRoles.DOTA_COACH_ROLE): HeroBuild {
    if (!heroBuilds.hasOwnProperty(heroName)) return null

    var role: PlayerRoles.DOTA_COACH_GUIDE_ROLE = convertDotaCoachGuideRoleToDotaCoachRole(playerRole)

    // Find hero build with right role
    for (const heroBuild of heroBuilds[heroName].builds) {
        if (heroBuild.roles.indexOf(role)!=-1) {
            return heroBuild
        }
    }

    // No relevant guide found
    return null
}


export function convertDotaCoachGuideRoleToDotaCoachRole(playerRole: PlayerRoles.DOTA_COACH_ROLE) {
    switch (playerRole) {
        case PlayerRoles.DOTA_COACH_ROLE.CARRY: {
            return PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY
        }
        case PlayerRoles.DOTA_COACH_ROLE.MID: {
            return PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID
        }
        case PlayerRoles.DOTA_COACH_ROLE.OFFLANE: {
            return PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE
        }
        case PlayerRoles.DOTA_COACH_ROLE.SOFT_SUPPORT:
        case PlayerRoles.DOTA_COACH_ROLE.HARD_SUPPORT: {
            return PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT
        }
    }
}


export function getClosestHeroBuild(heroName: string, playerRole: PlayerRoles.DOTA_COACH_ROLE): HeroBuild {
    if (!heroBuilds.hasOwnProperty(heroName)) return null

    var role: PlayerRoles.DOTA_COACH_GUIDE_ROLE = convertDotaCoachGuideRoleToDotaCoachRole(playerRole)

    // Get all roles of guides
    var guides = {}
    for (const heroBuild of heroBuilds[heroName].builds) {
        for (const role of heroBuild.roles) {
            guides[role] = heroBuild
        }
    }

    const guide_rules = {}
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY] = [
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT
    ]
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID] = [
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT
    ]
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE] = [
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT
    ]
    guide_rules[PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT] = [
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
        PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY
    ]

    for (const rule of guide_rules[role]) {
        for (const roleOfRules of rule) {
            if (guides.hasOwnProperty(roleOfRules)) {
                DotaLogger.log(`dota2.getClosestHeroBuild(): ${playerRole} => ${roleOfRules}`)
                return guides[rule]
            }
        }
    }

    return null
}

/**
 * REturn the defualt hero build, which is the first build in heroBuild.ts
 * @param heroName Localized hero name
 * @param playerRole
 * @return null if there is no such build
 */
export function getDefaultHeroBuild(heroName: string): HeroBuild {
    if (!heroBuilds.hasOwnProperty(heroName)) return null

    // Find hero build with right role
    return heroBuilds[heroName].builds[0]
}
    

/**
 * 
 * @param hero localized hero name
 * @returns arrray of breakable passives
 */
export function getBreakablePassives(heroName: string): string[] {
    const abilities = dota2Abilities[hero.name.localizedNameToNPCName(heroName)]
    var result = []
    for (const ability of Object.keys(abilities)) {
        switch (abilities[ability].is_passive) {
            case 'yes':
            case 'partial': {
                result.push(ability)
                break
            }
            default: {
                break
            }
        }
    }
    return result


    /*if (breakablePassives[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet //
        return []
    }

    var result = breakablePassives[hero]

    /* return copy of array, otherwise recipient can change content of this.laningItemTips //
    return  [...result] */
}


export function getDispellableBuffs(hero: string): string[] {
    if (dispellableBuffs[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    var result = dispellableBuffs[hero]

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...result] 
}

/**
 * 
 * @param hero 
 * @param disables 
 * @returns All abilities of a given hero for given disables. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getAbilitiesWithDisables(hero: string, disablesToScreen: string[]): any[] {
    //DotaLogger.log("dota2.getAbilitiesWithDisables(hero: '" + hero + "', disables: '" + JSON.stringify(disablesToScreen) + "'): Called")

    const heroDisables = disables[hero]
    if (heroDisables == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    var result: any[] = []

    // Iterate through all skills
    for (var i=0; i<heroDisables.length; i++) {
        // Check if skill is a teleport interrupt
        var isDisabling = false

        const skillDisables = heroDisables[i].disables
        //DotaLogger.log("dota2.getAbilitiesWithDisables(): skillDisables = '" + JSON.stringify(skillDisables) + "'")

        // Iterate through all disables of a given skil to see if it is a disable that interrupts TPs
        for (var j=0; j<skillDisables.length; j++) {
            //DotaLogger.log("dota2.getAbilitiesWithDisables(): disables = '" + JSON.stringify(disablesToScreen) + "', skillDisables[j] = '" + skillDisables[j] + "'")

            if (disablesToScreen.includes(skillDisables[j])) {
                isDisabling = true
                break
            }
        }

        if (isDisabling) {
            result.push(heroDisables[i])
        }
    }

    //DotaLogger.log("getAbilitiesWithDisables(): Result = '" + JSON.stringify(result) + "'")

    return result
}


export namespace ability {

    /**
     * 
     * @param ability name, e.g. "bane_brain_sap" (Bane)
     * @returns Object describing the ability (e.g. id, sequence, is_talent, etc. For further details see 'dota2Abilities.json')
     */
     export function getAbility(ability: string): any {
        DotaLogger.log(`dota2.getAbility(itemCode: ${ability}): Called`)
        for (const hero of Object.keys(dota2Abilities)) {
            for (const a of Object.keys(dota2Abilities[hero])) {
                if (a==ability) {
                    return dota2Abilities[hero][a]
                }
            }
        }
        return null
    }

    /**
     * 
     * @param ability name, e.g. "brain_sap" (Bane)
     * @returns English name of ability or null if name is not found
     */
    export function getAbilityName(ability: string): string {
        DotaLogger.log(`dota2.getAbilityName(itemCode: ${ability}): Called`)

        const a = getAbility(ability)

        DotaLogger.log(`dota2.getAbility(): a=${JSON.stringify(a)}`)

        if (a!=null) {
            if (a.hasOwnProperty('name')) {
                DotaLogger.log(`dota2.getAbilityName(): ${a.name}`)
                return a.name
            }
            else {
                DotaLogger.log(`dota2.getAbilityName(): null`)
                return null
            }
        }

        DotaLogger.log(`dota2.getAbilityName(): null`)
        return null
    }
}


/**
 * 
 * @param hero 
 * @returns All abilities that interrupt channeling. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getChannelingInterrupts(hero: string): any[] {
    return getAbilitiesWithDisables(hero, channeling_interrupts)
}
/**
 * 
 * @param hero 
 * @returns All abilities that slience. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getSilences(hero: string): any[] {
    return getAbilitiesWithDisables(hero, silence)
}
/**
 * 
 * @param hero 
 * @returns All abilities that root.  Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getRoots(hero: string): any[] {
    return getAbilitiesWithDisables(hero, root)
}

/**
 * 
 * @param item name of item e.g. 'blink' or overwhelming_blink'
 * @returns Cooldown of item or -1 if item is not known
 */
export function getItemCooldown(item: string): number {
    DotaLogger.log(`dota2.getItemCooldown(${item}): Called`)
    if (dota2Items.hasOwnProperty(`item_${item}`)) {
        if (dota2Items[`item_${item}`].hasOwnProperty('cooldown')) {
            return dota2Items[`item_${item}`].cooldown
        }
    }

    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return -1
}

/**
 * 
 * @param item Item number
 * @returns Item name, e.g. 'blink' for blink., or null if item is not found 
 */
export function getItemName(itemId: number): string {
    for (var key of Object.keys(dota2Items)) {
        if (dota2Items[key].id == itemId) {
            return key.replace('item_', '')
        }
    }
    return null
}


/**
 * 
 * @param item e.g. item_blink or armor (Dota Coach item)
 * @returns Item name, e.g. 'blink' for blink., or null if item is not found 
 */
 export function getItemNameFromItemCode(itemCode: string): string {
     //DotaLogger.log(`dota2.getItemNameFromItemCode(itemCode: ${itemCode}): Called`)

     switch (itemCode) {
        case "armor":
        case "DamageItems":
        case "SentryDustGem":
        case "SentryGem":
        case "SentryDust":
        case "AttackSpeed": {
            // Don't change
            break
        }
        default: {
            itemCode = `item_${itemCode}`
        }
    }

    if (dota2Items.hasOwnProperty(itemCode)) {
        if (dota2Items[itemCode].hasOwnProperty('name')) {
            //DotaLogger.log(`dota2.getItemNameFromItemCode(itemCode: ${itemCode}): ${dota2Items[itemCode].name}`)
            return dota2Items[itemCode].name
        }
    }
    //DotaLogger.log(`dota2.getItemNameFromItemCode(itemCode: ${itemCode}): null`)
    return null
}


/**
 * Get the file name of an item.
 *
 * @param item Item number
 * @returns String with path and file name. Null if item is not found
 */
export function getItemImage(itemId: number): string {
    const name = getItemName(itemId)
    if (name) return '../img/items/' + name + '.png'
    return null
}

//
// DAMAGAGE TYPES
//

/*
* @Return: 'Magical damage', 'P...
*/
export function getDamageType(localized_name: string): string {
    //const i = this.localizedNameToId(localized_name)

    //DotaLogger.log("dota2.getDamageType: localized_name='"+ localized_name + "', i='" + i + "', this.heroDamageType[i]='" + this.heroDamageType[i] + "'")

    //DotaLogger.log("dota2.getDamageType: localized_name='"+ localized_name + "', damageType[localized_name]='" + damageType[localized_name] + "'")

    switch (damageType[localized_name]) {
        //this.heroDamageType[i]) {
        case 'magical': {
            return 'Magical damage'
        }
        case 'physical': {
            return 'Physical damage'
        }
        case 'pure': {
            return 'Pure damage'
        }
        case 'neutral': {
            return 'Neutral damage'
        }
    }

    return 'Unknown damage type'
}

/*public getDamageTypeImg(localized_name: string): string {
    DotaLogger.log("dota2.getDamageTypeImg: localized_name='"+ localized_name + "', damageType[localized_name]='" + damageType[localized_name] + "'")

    switch (damageType[localized_name]) {
        case 'magical': {
            return '../img/damage/Damage_type_magical.png'
        }
        case 'physical': {
            return '../img/damage/Damage_type_physical.png'
        }
        case 'physical': {
            return '../img/damage/Damage_type_pure.png'
        }
        case 'neutral': {
            return '../img/damage/Damage_type_neutral.png'
        }
    }

    return 'Unknown damage type'
}*/

export function getDamageTypeImgSecondScreen(localized_name: string): string {
    //DotaLogger.log(`dota2.getDamageTypeImgSecondScreen(${localized_name}): Called`)

    switch (damageType[localized_name]) {
        case 'magical': {
            return '../img/damage/magical.png'
        }
        case 'physical': {
            return '../img/damage/physical.png'
        }
        case 'pure': {
            return '../img/damage/pure.png'
        }
        case 'neutral': {
            return '../img/damage/neutral.png'
        }
    }

    //DotaLogger.log(`dota2.getDamageTypeImgSecondScreen: Didn't find damage type.`)
    return 'Unknown damage type'
}


export function getDamageColor(localized_name: string): string {
//      const i = this.localizedNameToId(localized_name)

    //DotaLogger.log("dota2.getDamageColor: localized_name='"+ localized_name + "', damageType[localized_name]='" + damageType[localized_name] + "'")

    switch (damageType[localized_name]) {
//        switch (this.heroDamageType[i]) {
        case 'magical': {
            return '#578cc7'
        }
        case 'physical': {
            return '#af3029'
        }
        case 'pure': {
            return '#d8af54'
        }
        case 'neutral': {
            return '#7f8284'
        }
    }
    return '#7f8284'
}



export class OpenDotaAPIHero {
    id: number
    name: string
    localized_name: string
    primary_attr: string
    attack_type: string
    roles: string[]
  }
  
  export class Talent {
    talentLevel: number
    skillLevel: number
    cooldownReduction: number /* -30 equals to -30% */
  
    constructor(talentLevel: number, cooldownReduction: number) {
      this.talentLevel = talentLevel
      this.skillLevel = 5 + talentLevel * 5
      this.cooldownReduction = cooldownReduction
    }
  }
  
  /**
   * 
   * @param heroName Localized hero name (e.g. 'Anti-Mage' or 'Legion Commander')
   * @returns Talent object or null if there is not cooldown reduction talent
   */
  export function getCooldownReductionTalent(heroName: string): Talent {
      //DotaLogger.log("dota2.getCooldownReductionTalent(heroName='" + heroName + "'): Called" )
      const heroNameNPC = hero.name.localizedNameToNPCName(heroName)
      const abilities = dota2Abilities[heroNameNPC]
  
      var result: Talent  = null
  
      for (const ability of Object.keys(abilities)) {
          if (ability.startsWith('special_bonus_cooldown_reduction_')) {
              let cooldownReduction = parseInt(ability.replace('special_bonus_cooldown_reduction_',''));
              let talentLevel = abilities[ability].talent_level
              result = new Talent(talentLevel, cooldownReduction)
              break
          }
      }
      //DotaLogger.log(`dota2.getCooldownReductionTalent(): Returns '${JSON.stringify(result)}'`)
      return result
  }
  
  
    // Returns the 5 abilities as provded by OpenDotaAPI (it is "Q / W / E / TBD / TBD / R"
    // Input: takes Hero name as defined in?
    export function getSkills(heroName: string): string[] {
        //DotaLogger.log("dota2.getSkills(heroName='" + heroName + "'): Called" )
        const heroNameNPC = hero.name.localizedNameToNPCName(heroName)
        return dota2Abilities[heroNameNPC]
        // RETURN ALL RIGH NOW, MIGHT NEED TO BE CORRECTED.....
        // CHECK WHAT PEOPLE EXPECT
    }
  
  
    /**
     * 
     * @param heroName 
     * @returns Hero ultimate as a string 
     */
     export function getUltimate(heroName: string): string {
        //DotaLogger.log("dota2.getUltimate(heroName='" + heroName + "'): Called" )
        if (heroName==null) {
            return null
        }
        else {
            if (heroName=='Outworld Devourer') heroName = 'Outworld Destroyer'
            return getSkills(heroName)[5]
        }
    }
  
    export function getUltimateCooldown(heroName: string): number[] {
        let ultimate = getUltimate(heroName)
        return getCooldown(ultimate)
      
    }

    export function hasUltimateTimer(heroName: string): boolean {
        const cd = getUltimateCooldown(heroName)
        return !(
            (cd.length==0) ||
            ((cd.length==1) && (cd[0]==0)) ||
            (heroName=='Broodmother') ||
            (heroName=='Timbersaw') ||
            (heroName=='Leshrac') ||
            (heroName=='Pugna') ||
            (heroName=='Slardar') ||
            (heroName=='Techies') ||
            (heroName=='Axe') ||
            (heroName=='Bounty Hunter') ||
            (heroName=='Ember Spirit') ||
            (heroName=='Phantom Lancer') ||
            (heroName=='Templar Assassin') ||
            (heroName=='Void Spirit') ||
            (heroName=='Invoker')
            )
    }
    

    // Form
    /*
    @Return: null, if there is no need for mana
    */
    export function getManaConsumption(heroAbility: string): string {
        //DotaLogger.log("dota2.getManaConsumption(heroAbility='" + heroAbility + "'): Called" )
  
        const a = ability.getAbility(heroAbility)
/*        if (!Abilities[heroAbility].hasOwnProperty("mc")) {
            return null
        }*/
        if (a.hasOwnProperty("mana_cost")) {
            return null
        }
  
        const manaCost = a.mana_cost
        //DotaLogger.log("dota2.getManaConsumption: mc='" + JSON.stringify(mc) + "'")
        // Format of data: "mc":["80","90","100","110"]
  
        //return Array.isArray(mc) ? mc.join(" / ") : mc
        return manaCost.join(" / ") 
        /*var result = ""
        for (var i=0; i<mc.length; i++) {
            result += mc[i]
            if (i<(mc.lenght-1)) {
                // Add separator
                result += " / "
            }
        }
        return result*/
    }
  
    /**
     * 
     * @param heroAbility 
     * @returns returns empty array if ability has no cooldown
     */
     export function getCooldown(heroAbility: string): number[] {
        //DotaLogger.log("dota2.getCooldown(heroAbility='" + heroAbility + "'): Called")
   
        const a = ability.getAbility[heroAbility]

        if (a.hasOwnProperty("cooldown")) {
            // if there is no 'cd' property, the function returns an empty array
            return a.cooldown
        }
  
        //DotaLogger.log(`dota2.getCooldown(): Result = '${JSON.stringify(result)}'`)
        return []
    }
  
    /**
     * 
     * @param heroAbility 
     * @returns null if there is no cooldown on ability
     */
     export function getCooldownAsString(heroAbility: string): string {
        //DotaLogger.log("dota2.getCooldown(heroAbility='" + heroAbility + "'): Called")
  
        const a = ability.getAbility[heroAbility]


        if (!a.hasOwnProperty("cooldown")) {
            return null
        }
  
        const cd = a.cooldown
  
        // cooldown can not exist as a field, can be a number or an array
  
        //DotaLogger.log("dota2.getCooldown(): cd='" + cd + "')")
  
        return Array.isArray(cd) ? cd.join(" / ") : cd
    }
  
    // Returns the ability type
    // Possible value: 'Unit target', '...
    /*function getSkillAbilityType(heroAbility: string): string {
        if (!Abilities[heroAbility].hasOwnProperty("behavior")) {
            return null
        }
  
        const values = ['Unit Target', 'Point Target', 'Unit or Point Target', 'No Target', 'Aura', 'Passive', 'Channeled', 'Toggle', 'Auto-Cast']
        
        const behavior = Abilities[heroAbility].behavior
  
        for (var i=0; i<values.length; i++) {
            if (behavior.includes(values[i])) {
                return values[i]
            }
        }
  
        return null
    }*/
  
    
    function getOpenDotaAPIHero(heroName: string): OpenDotaAPIHero {
  /*        let found = jsonOpenDotaAPI.find(hero => hero.localized_name == heroName)
        return found*/
  
  
  //        for (var index in jsonOpenDotaAPI) {
        for (var i=0; i<dota2Heroes.length; i++) {
            if (dota2Heroes[i].localized_name == heroName) {
                return dota2Heroes[i]
            }
        }
        
        
        /* Hero not found */
        return null
        /*let found = jsonOpenDotaAPI.find(hero => hero.localized_name == heroName)
        return found*/
    }
  
    // Takes localized hero name
    function getAttributeColor(heroName: string, isTransparent: boolean): string {
        let hero = getOpenDotaAPIHero(heroName)
        if (hero == null) {
            console.error("dota2.getAttributeColor(heroName: " + heroName + ", isTransparent: " + isTransparent + "): Hero not found.")
        } else {
            switch (hero.primary_attr) {
                case 'agi' : {
                    return isTransparent ? colorAgilityTransparent : colorAgility
                }
                case 'int': {
                    return isTransparent ? colorIntelligenceTransparent : colorIntelligence
                }
                case 'str': {
                    return isTransparent ? colorStrengthTransparent : colorStrength
                }
                default: {
                    console.error("dota2.getAttributeColor(heroName: " + heroName + ", isTransparent: " + isTransparent + "): Unknown primary attribute (" + hero.primary_attr + ")")
                    break
                }
            }
        }
        return "#505050" // problem occured, so we return white
    }
  
    // Takes localized hero name
    export function getAttribute(heroName: string): string {
        let hero = getOpenDotaAPIHero(heroName)
        return hero.primary_attr
    }

    // Takes localized hero name
    export function getAttributeImg(heroName: string): string {
        return `${process.env.IMGPATH}/attributes/${getAttribute(heroName)}.png`
    }
    
    // Takes localized hero name
    export function getAttributeName(heroName: string): string {
        switch (getAttribute(heroName)) {
            case 'agi' : {
                return 'Agility'
            }
            case 'int': {
                return 'Intelligence'
            }
            case 'str': {
                return 'Strength'
            }
        }
        return "Error"
    }





  

export namespace hero {

    
    export namespace name {
        //
        // The following names exist:
        //    - NPC name:       npc_dota_hero_antimage
        //    - NPC sort name:  antimage (NPCName w/o 'npc_dota_hero'; also used by Overwolf)
        //    - localized name: Anti-Mage or Legion Commander
        // 

            
        /**
         * 
         * @param name e.g. antimage (i.e. w/o 'npc_dota_hero_')
         * @returns localited name, e.g. Anti-Mage
         */
        export function overwolfNameToLocalizedName(name: string): string {
            //npc_dota_hero_bane
            for (var i=0; i<dota2Heroes.length; i++) {
    
            //for (var index in jsonOpenDotaAPI) {
                /*console.log("****** ------: OpenDotaAPIHero = " + OpenDotaAPIHero)
                console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(OpenDotaAPIHero))
                console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(jsonOpenDotaAPI[OpenDotaAPIHero]))*/
                if (dota2Heroes[i].name == "npc_dota_hero_" + name) {
                    return dota2Heroes[i].localized_name
                }
            }
            return "#not found#"
        }

        /**
         * 
         * @param name e.g. npc_dota_hero_antimage
         * @returns localized name, e.g. Anti-Mage
         */
        export function NPCNameToLocalizedName(heroNPCName: string): string {
            for (var i=0; i<dota2Heroes.length; i++) {
                if (dota2Heroes[i].name == heroNPCName) {
                    return dota2Heroes[i].localized_name
                }
            }
            return "#not found#"
        }

        export function idToLocalizedName(heroId: number): string {
            for (var i=0; i<dota2Heroes.length; i++) {
                if (dota2Heroes[i].id == heroId) {
                    return dota2Heroes[i].localized_name
                }
            }
            return "#not found#"
        }
    
        export function idToName(heroId: number): string {
            for (var i=0; i<dota2Heroes.length; i++) {
                
                //for (var index in jsonHeroes) {
                if (dota2Heroes[i].id == heroId) {
                    return dota2Heroes[i].localized_name
                }
            }
            return "#not found#"
        }
    
        
        function idToNPCName(heroId: number): string {
            for (var i=0; i<dota2Heroes.length; i++) {
                
                //for (var index in jsonHeroes) {
                if (dota2Heroes[i].id == heroId) {
                    return dota2Heroes[i].name
                }
            }
            return "#not found#"
        }

        /**
         * 
         * @param heroId 
         * @returns e.g. antimage or dark_willow
         */
    
        export function idToNPCShortName(heroId: number): string {
            return idToNPCName(heroId).replace('npc_dota_hero_', '')
        }

        export function localizedNameToId(localized_name: string): number {
            //DotaLogger.log("dota2.localizedNameToId(" + localized_name + "): Called")
                for (var i=0; i<dota2Heroes.length; i++) {
                    
                if (dota2Heroes[i].localized_name == localized_name) {
                    //DotaLogger.log("dota2.localizedNameToId(): Returned id = '" + Heroes[i].id + "'")
                    return dota2Heroes[i].id
                }
            }
            return -1 // equals to not found
        }
      
        export function localizedNameToHeropediaName(localized_name: string): string {
            return localized_name.replace(/[ \']/g, '')
        }
    
            /**
     * 
     * @param heroName localized name, e.g. Anti-Mage
     * @returns NPC name, e.g. npc_dota_hero_antimage
     */
  
  export function localizedNameToNPCName(heroName: string): string {
    //DotaLogger.log("dota2.localizedNameToNPCName(" + heroName + "): Called")

    const id = localizedNameToId(heroName)
    return idToNPCName(id)
}


export function localizedNameToNPCShortName(heroName: string): string {
    return localizedNameToNPCName(heroName).replace('npc_dota_hero_', '')
}


/* Returns -1 if hero not found
*/
export function overwolfNameToId(name: string): number {
    //npc_dota_hero_bane
    for (var i=0; i<dota2Heroes.length; i++) {
    //for (var index in jsonHeroes) {
        if (dota2Heroes[i].name == "npc_dota_hero_" + name) {
            return dota2Heroes[i].id
        }
    }
    return -1
}
    
    }
     
    export namespace image {
        export function idToImgName(heroId: number): string {
            var localizedName = hero.name.idToLocalizedName(heroId)
            if (localizedName == "#not found#") {
                return localizedName
            }
            switch (localizedName) {
                case "Nature's Prophet": {
                    localizedName = "furion"
                    break
                }
            }
            let result = '../img/heroes/' + localizedName.replace(/ /gi, "_") + '_minimap_icon.png'
            return result
        }
        export function localizedNameToImgName(heroName: string): string {
            //DotaLogger.log(`dota2.localizedNameToImgName(${heroName}): Called`)
            switch (heroName) {
                case "Nature's Prophet": {
                    DotaLogger.log(`dota2.localizedNameToImgName(): Found 'Nature's Prophet'`)
                    heroName = "Furion"
                    break
                }
            }
            return '../img/heroes/' + heroName.replace(/ /gi, "_") + '.png'
        }
      
       export function localizedNameToMinimapImgName(heroName: string): string {
            //DotaLogger.log(`dota2.localizedNameToMinimapImgName(${heroName}): Called`)
            return localizedNameToImgName(heroName).replace('.png', '_minimap_icon.png')
            
      /*        switch (heroName) {
                case "Nature's Prophet": {
                    DotaLogger.log(`dota2.localizedNameToMinimapImgName(): Found 'Nature's Prophet'`)
                    heroName = "Furion"
                    break
                }
            }
            //return '../img/heroes/' + heroName.replace(/ /gi, "_") + '.png'
            return '../img/heroes/' + heroName.replace(/ /gi, "_") + '_minimap_icon.png';*/
        }
      
    
    }
    function isHeroMelee(hero: string): boolean {
        //console.log("isHeroMelee(" + hero + ") called")
    
        for (var i=0; i<dota2Heroes.length; i++) {
    
    //        for (var index in jsonOpenDotaAPI) {
            if (dota2Heroes[i].localized_name == hero) {
                return dota2Heroes[i].attack_type == "Melee"
            }
        }
        
        /*for (var OpenDotaAPIHero of jsonOpenDotaAPI) {
            if (OpenDotaAPIHero.localized_name == hero) {
                return OpenDotaAPIHero.attack_type == "Melee"
            }
        }*/
        console.log("Internal error: isHeroMelee(hero: " + hero + ")")
        return false // should never get here though
    }
    
}


  


/**
 * Function returns items tracked by the performance tracker
 * 
 * The list of items has been reviewed with ZoGraF in Q4 2021
 * 
 * @returns { tracked: { item_code : all_data }, notTracked: { item_code : all_data }}
 */
export function getTrackedItems() {
    var result = {
        tracked: {},
        notTracked: {}
    }

    for (const [key, value] of Object.entries(dota2Items)) {
        var isTracked = false
        //if (!value.is_neutral) {
        switch (key) {
            case 'item_soul_booster':
            case 'item_ultimate_orb': 
            case 'item_demon_edge': 
            case 'item_eagle': 
            case 'item_reaver': 
            case 'item_relic': 
            case 'item_mystic_staff': 
            case 'item_grandmasters_glaive': 
            case 'item_ultimate_scepter_2': 
            case 'item_ultimate_scepter_roshan': 
            case 'item_fallen_sky': 
                {

                isTracked = false
                break
            }
            case 'item_ultimate_scepter_2':
            case 'item_mekansm':
            case 'item_hood_of_defiance':
            case 'item_lesser_crit':
            case 'item_dragon_lance':
            case 'item_mask_of_madness':
            case 'item_ancient_janggo':
            case 'item_veil_of_discord':
            case 'item_glimmer_cape':
            case 'item_vanguard':
            case 'item_ghost':
            case 'item_aghanims_shard':
            {
                isTracked = true
                break
            }
            default: {
                // Neutrals don't have a cost, so they are not being tracked by default
                isTracked = (value as any).cost > 2000
                break
            }
        }
        
        if (isTracked) {
            result.tracked[key] = value
        } 
        else {
            result.notTracked[key] = value
        }
    }

    return result
  }