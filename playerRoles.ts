/**
 * Library to manage player roles
 */
import { storageItems } from '../../consts'

// Roles stored in localSotrage / isPlayerSupport
export const HARD_SUPPORT = 'Hard Support'
export const SOFT_SUPPORT = 'Soft Support'
export const SAFE_LANE = 'Safe lane'
export const OFFLANE = 'Offlane'
export const MID_LANE = 'Mid Lane'

export const ROLES = ['safeLane', 'midLane', 'offlane', 'softSupport', 'hardSupport'] // used for HTML IDs and to reference files
export const ROLE_NAMES = {
    'safeLane': "Safe Lane",
    'midLane': "Mid Lane",
    'offlane': "Offlane",
    'softSupport': "Soft Support",
    'hardSupport': "Hard Support"
}

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
    return isHardSupport(role) || isSoftSupport(role)
}

export function isSoftSupport(role: string) {
    return (role==SOFT_SUPPORT || role=='softSupport')
}

export function isHardSupport(role: string) {
    return (role==HARD_SUPPORT || role=='hardSupport')
}

export function isCore(role: string) {
    return isCarry(role) || isMid(role) || isOfflane(role)
}

export function isCarry(role: string) {
    return (role==SAFE_LANE || role=='safeLane')
}

export function isMid(role: string) {
    return (role==MID_LANE || role=='midLane')
}

export function isOfflane(role: string) {
    return (role==OFFLANE || role=='offlane')
}