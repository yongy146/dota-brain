/**
 * Library to manage player roles
 */
import { HeroBuild } from "./heroBuilds.js";

// Steam Guide Roles
export enum STEAM_GUIDE_ROLE { // <None> is treated by not providing any role
  CORE = "#DOTA_HeroGuide_Role_Core",
  OFFLANE = "#DOTA_HeroGuide_Role_OffLane",
  SUPPORT = "#DOTA_HeroGuide_Role_Support",
  JUNGLE = "#DOTA_HeroGuide_Role_Jungle",
  INITIATOR = "#DOTA_HeroGuide_Role_Initiator",
  ROAMER = "#DOTA_HeroGuide_Role_Roamer",
}

// Roles used for the Dota Coach guides
export enum DOTA_COACH_GUIDE_ROLE {
  CARRY = "carry",
  MID = "mid",
  OFFLANE = "offlane",
  SUPPORT = "support",
}

// Roles as used by the Dota Coach app
export enum DOTA_COACH_ROLE {
  CARRY = "carry",
  MID = "mid",
  OFFLANE = "offlane",
  SOFT_SUPPORT = "soft_support",
  HARD_SUPPORT = "hard_support",
}

// Roles stored in localSotrage / isPlayerSupport
/*export const HARD_SUPPORT = 'Hard Support'
export const SOFT_SUPPORT = 'Soft Support'
export const SAFE_LANE = 'Safe lane'
export const OFFLANE = 'Offlane'
export const MID_LANE = 'Mid Lane'*/

/*export const ROLES = [
    'safeLane', 'midLane', 'offlane', 'softSupport', 'hardSupport'] // used for HTML IDs and to reference files*/
/*export const ROLE_NAMES = {
    'safeLane': "Safe Lane",
    'midLane': "Mid Lane",
    'offlane': "Offlane",
    'softSupport': "Soft Support",
    'hardSupport': "Hard Support"
}*/

//export const IMG_PATH = '../img/roles/'

/*export function getRoleFullName(role: string) {
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
}*/

export function getRolesString(heroBuild: HeroBuild) {
  let roles = "";
  for (let i = 0; i < heroBuild.roles.length; i++) {
    roles += getDotaCoachGuideRoleString(heroBuild.roles[i]);
    if (i < heroBuild.roles.length - 1) {
      roles += " & ";
    }
  }
  return roles;
}

/**
 * Function used to display role in title of steam guide
 * @param role
 * @returns
 */
export function getDotaCoachGuideRoleString(
  role: DOTA_COACH_GUIDE_ROLE
): string {
  switch (role) {
    case DOTA_COACH_GUIDE_ROLE.CARRY: {
      return "Carry";
    }
    case DOTA_COACH_GUIDE_ROLE.MID: {
      return "Mid";
    }
    case DOTA_COACH_GUIDE_ROLE.OFFLANE: {
      return "Offlane";
    }
    case DOTA_COACH_GUIDE_ROLE.SUPPORT: {
      return "Support";
    }
  }
}

export function rolesToString(roles: DOTA_COACH_GUIDE_ROLE[]): string {
  let result = "";
  for (let i = 0; i < roles.length; i++) {
    result += getDotaCoachGuideRoleString(roles[i]);
    if (i < roles.length - 1) {
      result += " & ";
    }
  }
  return result;
}

export function getRoleString(role: DOTA_COACH_ROLE): string {
  switch (role) {
    case DOTA_COACH_ROLE.CARRY: {
      return "Carry";
    }
    case DOTA_COACH_ROLE.MID: {
      return "Mid";
    }
    case DOTA_COACH_ROLE.OFFLANE: {
      return "Offlane";
    }
    case DOTA_COACH_ROLE.SOFT_SUPPORT: {
      return "Soft Support";
    }
    case DOTA_COACH_ROLE.HARD_SUPPORT: {
      return "Hard Support";
    }
  }
}

export function getGuideRoleImage(role: DOTA_COACH_GUIDE_ROLE): string {
  switch (role) {
    case DOTA_COACH_GUIDE_ROLE.CARRY: {
      return "../img/roles/safeLane.png";
    }
    case DOTA_COACH_GUIDE_ROLE.MID: {
      return "../img/roles/midLane.png";
    }
    case DOTA_COACH_GUIDE_ROLE.OFFLANE: {
      return "../img/roles/offlane.png";
    }
    case DOTA_COACH_GUIDE_ROLE.SUPPORT: {
      return "../img/roles/support.png";
    }
  }
}

export function getRoleImage(role: DOTA_COACH_ROLE): string {
  switch (role) {
    case DOTA_COACH_ROLE.CARRY: {
      return "../img/roles/safeLane.png";
    }
    case DOTA_COACH_ROLE.MID: {
      return "../img/roles/midLane.png";
    }
    case DOTA_COACH_ROLE.OFFLANE: {
      return "../img/roles/offlane.png";
    }
    case DOTA_COACH_ROLE.SOFT_SUPPORT: {
      return "../img/roles/softSupport.png";
    }
    case DOTA_COACH_ROLE.HARD_SUPPORT: {
      return "../img/roles/hardSupport.png";
    }
  }
}

export function isSupport(role: DOTA_COACH_ROLE) {
  return isHardSupport(role) || isSoftSupport(role);
}

export function isSoftSupport(role: DOTA_COACH_ROLE) {
  return role == DOTA_COACH_ROLE.SOFT_SUPPORT;
}

export function isHardSupport(role: DOTA_COACH_ROLE) {
  return role == DOTA_COACH_ROLE.HARD_SUPPORT;
}

export function isCore(role: DOTA_COACH_ROLE) {
  return isCarry(role) || isMid(role) || isOfflane(role);
}

export function isCarry(role: DOTA_COACH_ROLE) {
  return role == DOTA_COACH_ROLE.CARRY;
}

export function isMid(role: DOTA_COACH_ROLE) {
  return role == DOTA_COACH_ROLE.MID;
}

export function isOfflane(role: DOTA_COACH_ROLE) {
  return role == DOTA_COACH_ROLE.OFFLANE;
}
