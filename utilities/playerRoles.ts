/**
 * Module to manage player roles.
 *
 */
import { IHeroBuild } from "../content/heroBuilds";

/**
 * Official roles used in Steam Guides
 */
export enum STEAM_GUIDE_ROLE { // <None> is treated by not providing any role
  CORE = "#DOTA_HeroGuide_Role_Core",
  OFFLANE = "#DOTA_HeroGuide_Role_OffLane",
  SUPPORT = "#DOTA_HeroGuide_Role_Support",
  JUNGLE = "#DOTA_HeroGuide_Role_Jungle",
  INITIATOR = "#DOTA_HeroGuide_Role_Initiator",
  ROAMER = "#DOTA_HeroGuide_Role_Roamer",
}

/**
 * Roles used for the Dota Coach guides built by Content Creators.
 * Dota Coach App does not differentiate between hard and soft support in its guides.
 */
export enum DOTA_COACH_GUIDE_ROLE {
  CARRY = "carry",
  MID = "mid",
  OFFLANE = "offlane",
  SUPPORT = "support",
}

/**
 * Roles used in the Dota Coach app for the user.
 *
 * Possible values: CARRY, MID, OFFLANE, SOFT_SUPPORT and HARD_SUPPORT
 */
export enum DOTA_COACH_ROLE {
  CARRY = "carry",
  MID = "mid",
  OFFLANE = "offlane",
  SOFT_SUPPORT = "soft_support",
  HARD_SUPPORT = "hard_support",
}

export function getDotaCoachRole(role: DOTA_COACH_GUIDE_ROLE): DOTA_COACH_ROLE {
  switch (role) {
    case DOTA_COACH_GUIDE_ROLE.CARRY:
      return DOTA_COACH_ROLE.CARRY;
    case DOTA_COACH_GUIDE_ROLE.MID:
      return DOTA_COACH_ROLE.MID;
    case DOTA_COACH_GUIDE_ROLE.OFFLANE:
      return DOTA_COACH_ROLE.OFFLANE;
  }
  return DOTA_COACH_ROLE.HARD_SUPPORT;
}

// Transform to react-intl?!
export function getRolesString(heroBuild: IHeroBuild) {
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
 *
 * @param role
 * @returns
 */
export function getDotaCoachGuideRoleString(role: DOTA_COACH_GUIDE_ROLE): string {
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

/**
 * Converts role to react-intl message id
 *
 * @param role
 * @returns react-intl message id
 */
export function roleToMessageId(role: DOTA_COACH_ROLE): string {
  switch (role) {
    case DOTA_COACH_ROLE.CARRY: {
      return "dota.roles.Carry";
    }
    case DOTA_COACH_ROLE.MID: {
      return "dota.roles.Mid";
    }
    case DOTA_COACH_ROLE.OFFLANE: {
      return "dota.roles.Offlane";
    }
    case DOTA_COACH_ROLE.SOFT_SUPPORT: {
      // Dota 2 localization has no translation of Soft Support
      return "SoftSupport";
    }
    case DOTA_COACH_ROLE.HARD_SUPPORT: {
      return "dota.roles.HardSupport";
    }
  }
}

export function getGuideRoleImage(role: DOTA_COACH_GUIDE_ROLE): string {
  switch (role) {
    case DOTA_COACH_GUIDE_ROLE.CARRY: {
      return "/img/roles/safeLane.png";
    }
    case DOTA_COACH_GUIDE_ROLE.MID: {
      return "/img/roles/midLane.png";
    }
    case DOTA_COACH_GUIDE_ROLE.OFFLANE: {
      return "/img/roles/offlane.png";
    }
    case DOTA_COACH_GUIDE_ROLE.SUPPORT: {
      return "/img/roles/support.png";
    }
  }
}

export function getRoleImage(role: DOTA_COACH_ROLE): string {
  switch (role) {
    case DOTA_COACH_ROLE.CARRY: {
      return "https://download.dotacoach.gg/images/roles/safeLane.png";
    }
    case DOTA_COACH_ROLE.MID: {
      return "https://download.dotacoach.gg/images/roles/midLane.png";
    }
    case DOTA_COACH_ROLE.OFFLANE: {
      return "https://download.dotacoach.gg/images/roles/offlane.png";
    }
    case DOTA_COACH_ROLE.SOFT_SUPPORT: {
      return "https://download.dotacoach.gg/images/roles/softSupport.png";
    }
    case DOTA_COACH_ROLE.HARD_SUPPORT: {
      return "https://download.dotacoach.gg/images/roles/hardSupport.png";
    }
  }
}

//
// Utility functions for the player's role in the game
//

export function isSupport(role: DOTA_COACH_ROLE) {
  return isHardSupport(role) || isSoftSupport(role);
}

export function isSoftSupport(role: DOTA_COACH_ROLE) {
  return role === DOTA_COACH_ROLE.SOFT_SUPPORT;
}

export function isHardSupport(role: DOTA_COACH_ROLE) {
  return role === DOTA_COACH_ROLE.HARD_SUPPORT;
}

export function isCore(role: DOTA_COACH_ROLE) {
  return isCarry(role) || isMid(role) || isOfflane(role);
}

export function isCarry(role: DOTA_COACH_ROLE) {
  return role === DOTA_COACH_ROLE.CARRY;
}

export function isMid(role: DOTA_COACH_ROLE) {
  return role === DOTA_COACH_ROLE.MID;
}

export function isOfflane(role: DOTA_COACH_ROLE) {
  return role === DOTA_COACH_ROLE.OFFLANE;
}

export function convertDotaCoachRoleToDotaCoachGuidRole(
  playerRole: DOTA_COACH_ROLE
): DOTA_COACH_GUIDE_ROLE {
  switch (playerRole) {
    case DOTA_COACH_ROLE.CARRY: {
      return DOTA_COACH_GUIDE_ROLE.CARRY;
    }
    case DOTA_COACH_ROLE.MID: {
      return DOTA_COACH_GUIDE_ROLE.MID;
    }
    case DOTA_COACH_ROLE.OFFLANE: {
      return DOTA_COACH_GUIDE_ROLE.OFFLANE;
    }
    case DOTA_COACH_ROLE.SOFT_SUPPORT:
    case DOTA_COACH_ROLE.HARD_SUPPORT: {
      return DOTA_COACH_GUIDE_ROLE.SUPPORT;
    }
  }
}
