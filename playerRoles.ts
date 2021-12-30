/**
 * Library to manage player roles
 */
import { storageItems } from '../../consts'


export const HARD_SUPPORT = 'Hard Support'
export const SOFT_SUPPORT = 'Soft Support'
export const SAFE_LANE = 'Safe lane'
export const OFFLANE = 'Offlane'
export const MID_LANE = 'Mid Lane'

export const ROLES = ['safeLane', 'midLane', 'offlane', 'softSupport', 'hardSupport'] // used for HTML IDs and to reference files

//export const IMG_PATH = '../img/roles/'

export function getRoleFullName(role: string) {
    switch (role) {
        case 'safeLane': {
            return SAFE_LANE
        }
        case 'midLane': {
            return MID_LANE
        }
        case 'offlane': {
            return OFFLANE
        }
        case 'softSupport': {
            return SOFT_SUPPORT
        }
        case 'hardSupport': {
            return HARD_SUPPORT
        }
        default: {
            return "Error"
        }
    }
}


export function getPlayerRole(): string {
    return localStorage.getItem(storageItems.playerRole)
}

export function setPlayerRole(role: string) {
    localStorage.setItem(storageItems.playerRole, role)
}

export function isPlayerSupport() {
    return isSupport(getPlayerRole())
}

export function isSupport(role: string) {
    return (role==HARD_SUPPORT || role==SOFT_SUPPORT)
}