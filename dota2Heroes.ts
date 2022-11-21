export interface Dota2Heroes {
  [key: string]: Dota2Hero; // key is the hero's full NPC name
}

export interface Dota2Hero {
  name: string; // "npc_dota_hero_antimage"
  id: number; // 1
  localized_name: string; // e.g., "Anti-Mage"
  aliases: string[]; // e.g. ["am"]
  similar_heroes: number[]; // e.g. [109,12,94]
  projectile_speed: number; // e.g. 0
  roles: string[]; // e.g. ["Carry", "Escape", "Nuker"]
  complexity: number; // 1
  attack_range: number; // 150
  attack_type: string; // e.g., "Melee"
  primary_attr: string; // e.g., "Agility"
  movement_speed: number; // 310
  armor: number; // 0
  attack_speed: number; // 100
  attack_rate: number; // 1
  attack_damage_min: number; // 29
  attack_damage_max: number; // 33
  attack_animation_point: number; // 0
  attack_acquisition_range: number; // 600
  strength_base: number; // 21
  strength_gain: number; // 1
  intelligence_base: number; // 12
  intelligence_gain: number; // 1
  agility_base: number; // 24
  agility_gain: number; // 2
  health_status_regen: number; // 0
  img: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.png"
  img_face: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png"
  img_body: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/antimage.png"
  video: string; // e.g., "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/antimage.webm"
  steam_guide: string[]; // e.g., ["https://steamcommunity.com/sharedfiles/filedetails/?id=2698377261"]
  abilities: string[]; // e.g., ["antimage_mana_break", "antimage_blink", ...]
  talents: string[]; // e.g., ["special_bonus_strength_9", "special_bonus_unique_antimage", ...]
}
