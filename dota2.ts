/**
 * This library is used to access all manual dota 2 data of Dota Coach (on items and abilities)
 * 
 * The only separated information sources in this folder are openDotaAPI.ts and startzAPI.ts 
 * 
 * Copyright Dota Coach, 2021. All rights reserved
 */
import { standardAbilityBuilds } from './standardAbilityBuilds'
import { itemBuilds } from './itemBuilds'
import { dispellableBuffs } from './dispellableBuffs'
import { breakablePassives } from './breakablePassives'
import { counterItemsLaning } from './counterItemsLaning'
import { counterItemsMidGame } from './counterItemsMidGame'
import { counterItemsLateGame } from './counterItemsLateGame'
import { damageType } from './damageType'
import { Items, Heroes, HeroAbilities, Abilities } from './openDotaData'
import * as DotaLogger from '../../src/utility/log'
import { channeling_interrupts, silence, root, disables } from './disables'

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
 * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * @returns 
 */
export function getStandardItemBuild(hero: string): any[] {
    if (itemBuilds[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    const mid_game = itemBuilds[hero].mid_game
    const late_game = itemBuilds[hero].late_game

    return mid_game.concat(late_game)
}

/**
 * 
 * @param hero The name of the hero, e.g. 'Abaddon' or 'Anti-Mage'
 * @returns object with the following attributes: starting, early_game, mid_game, later_game, situational
 */
export function getItemBuild(hero: string): any {
    if (itemBuilds[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return {}
    }

    var itemBuild = itemBuilds[hero]

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  itemBuild
}

export function getStandardAbilityBuild(hero: string): string[] {
    if (standardAbilityBuilds[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    var abilityBuild = standardAbilityBuilds[hero]

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...abilityBuild] 
}

export function getBreakablePassives(hero: string): string[] {
    if (breakablePassives[hero] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return []
    }

    var result = breakablePassives[hero]

    /* return copy of array, otherwise recipient can change content of this.laningItemTips */
    return  [...result] 
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

/*public getTPInterrupts(hero: string): any[] {
    return this.getAbilitiesWithDisables(hero, Disables.teleport_interrupt)
}*/

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

export function getItemCooldown(item: string): number {
    if (Items[item] == null) {
        /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
        return -1
    }

    return Items[item].cd
}

/**
 * 
 * @param item Item number
 * @returns Null if item is not found 
 */
export function getItemName(item: number): string {
    for (var key of Object.keys(Items)) {
        if (Items[key].id == item) {
            return key
        }
    }
    return null
}

/**
 * Get the file name of an item.
 *
 * @param item Item number
 * @returns String with path and file name. Null if item is not found
 */
export function getItemImage(item: number): string {
    const name = getItemName(item)
    if (name) {
    /*for (var key of Object.keys(Items)) {
        if (Items[key].id == item) {*/
            return '../img/items/' + name + '.png'
        }
    else {
       return null
    }
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
    legs: number
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
   * @param heroName Standard hero name (e.g. 'Zeus')
   * @returns Talent object or null if there is not cooldown reduction talent
   */
  export function getCooldownReductionTalent(heroName: string): Talent {
      //DotaLogger.log("dota2.getCooldownReductionTalent(heroName='" + heroName + "'): Called" )
      const heroNameNPC = localizedNameToNPCName(heroName)
      const talents = HeroAbilities[heroNameNPC].talents
  
      var result: Talent  = null
  
      for (var talent of talents) {
          if (talent.name.startsWith('special_bonus_cooldown_reduction_')) {
              let cooldownReduction = parseInt(talent.name.replace('special_bonus_cooldown_reduction_',''));
              let talentLevel = talent.level
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
        const heroNameNPC = localizedNameToNPCName(heroName)
        return HeroAbilities[heroNameNPC].abilities
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
  
        if (!Abilities[heroAbility].hasOwnProperty("mc")) {
            return null
        }
  
        const mc = Abilities[heroAbility].mc
        //DotaLogger.log("dota2.getManaConsumption: mc='" + JSON.stringify(mc) + "'")
        // Format of data: "mc":["80","90","100","110"]
  
        return Array.isArray(mc) ? mc.join(" / ") : mc
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
  
        var result = []
  
        if (Abilities[heroAbility].hasOwnProperty("cd")) {
            // if there is no 'cd' property, the function returns an empty array
            const cd = Abilities[heroAbility].cd
            
            if (Array.isArray(cd)) {
                for (var n of cd) {
                    result.push(parseFloat(n))
                }
            }
            else {
                // It is a single number
                result.push(parseFloat(cd))
            }
        }
  
        //DotaLogger.log(`dota2.getCooldown(): Result = '${JSON.stringify(result)}'`)
        return result
    }
  
    /**
     * 
     * @param heroAbility 
     * @returns null if there is no cooldown on ability
     */
     export function getCooldownAsString(heroAbility: string): string {
        //DotaLogger.log("dota2.getCooldown(heroAbility='" + heroAbility + "'): Called")
  
        if (!Abilities[heroAbility].hasOwnProperty("cd")) {
            return null
        }
  
        const cd = Abilities[heroAbility].cd
  
        // cooldown can not exist as a field, can be a number or an array
  
        //DotaLogger.log("dota2.getCooldown(): cd='" + cd + "')")
  
        return Array.isArray(cd) ? cd.join(" / ") : cd
    }
  
    // Returns the ability type
    // Possible value: 'Unit target', '...
    function getSkillAbilityType(heroAbility: string): string {
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
    }
  
    
    function getOpenDotaAPIHero(heroName: string): OpenDotaAPIHero {
  /*        let found = jsonOpenDotaAPI.find(hero => hero.localized_name == heroName)
        return found*/
  
  
  //        for (var index in jsonOpenDotaAPI) {
        for (var i=0; i<Heroes.length; i++) {
            if (Heroes[i].localized_name == heroName) {
                return Heroes[i]
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

    /**
     * 
     * @param name e.g. antimage (i.e. w/o 'npc_dota_hero_')
     * @returns localited name, e.g. Anti-Mage
     */
    export function overwolfNameToLocalizedName(name: string): string {
        //npc_dota_hero_bane
        for (var i=0; i<Heroes.length; i++) {
  
        //for (var index in jsonOpenDotaAPI) {
            /*console.log("****** ------: OpenDotaAPIHero = " + OpenDotaAPIHero)
            console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(OpenDotaAPIHero))
            console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(jsonOpenDotaAPI[OpenDotaAPIHero]))*/
            if (Heroes[i].name == "npc_dota_hero_" + name) {
                return Heroes[i].localized_name
            }
        }
        return "#not found#"
    }
  
    export function idToLocalizedName(heroId: number): string {
        for (var i=0; i<Heroes.length; i++) {
  //            for (var index in jsonOpenDotaAPI) {
            /*console.log("****** ------: OpenDotaAPIHero = " + OpenDotaAPIHero)
            console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(OpenDotaAPIHero))
            console.log("****** ------: OpenDotaAPIHero = " + JSON.stringify(jsonOpenDotaAPI[OpenDotaAPIHero]))*/
            if (Heroes[i].id == heroId) {
                return Heroes[i].localized_name
            }
        }
        return "#not found#"
    }
  
  
    export function idToName(heroId: number): string {
        for (var i=0; i<Heroes.length; i++) {
            
            //for (var index in jsonHeroes) {
            if (Heroes[i].id == heroId) {
                return Heroes[i].localized_name
            }
        }
        return "#not found#"
    }
  
    
    function idToNPCName(heroId: number): string {
        for (var i=0; i<Heroes.length; i++) {
            
            //for (var index in jsonHeroes) {
            if (Heroes[i].id == heroId) {
                return Heroes[i].name
            }
        }
        return "#not found#"
    }
  
    
    export function idToImgName(heroId: number): string {
        var localizedName = idToLocalizedName(heroId)
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
  
    
    export function localizedNameToId(localized_name: string): number {
        //DotaLogger.log("dota2.localizedNameToId(" + localized_name + "): Called")
            for (var i=0; i<Heroes.length; i++) {
                
            if (Heroes[i].localized_name == localized_name) {
                //DotaLogger.log("dota2.localizedNameToId(): Returned id = '" + Heroes[i].id + "'")
                return Heroes[i].id
            }
        }
        return -1 // equals to not found
    }
  
    export function localizedNameToHeropediaName(localized_name: string): string {
        return localized_name.replace(/[ \']/g, '')
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
  
  
    /* Returns -1 if hero not found
    */
    export function overwolfNameToId(name: string): number {
        //npc_dota_hero_bane
        for (var i=0; i<Heroes.length; i++) {
        //for (var index in jsonHeroes) {
            if (Heroes[i].name == "npc_dota_hero_" + name) {
                return Heroes[i].id
            }
        }
        return -1
    }
  
function isHeroMelee(hero: string): boolean {
    //console.log("isHeroMelee(" + hero + ") called")

    for (var i=0; i<Heroes.length; i++) {

//        for (var index in jsonOpenDotaAPI) {
        if (Heroes[i].localized_name == hero) {
            return Heroes[i].attack_type == "Melee"
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