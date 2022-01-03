
/* Consistency requiremetns for names of abilities needs to be given with the following:
        1) OpenDota data (see openDotaAPI.ts; it is used for mana and cooldown information)
        2) file /img/ability/<ability>_hp1.jpg needs to be avaible (rename files according to OpenDotaAPI)
*/

// Attention: "'" doens't work due to dota issues. We have to use "`"

// Attention: first level talent level 1, 2, 3 and then 4. Dota 2 can't handle other orders.

// Task: rename file to "abilityBuilds.ts"

export const ALL               = 'All'
export const IN_LANE           = 'InLane'
export const ROLE_CORE         = 'Core' // For mid, carry and offlane
export const ROLE_MID          = 'Mid'
export const ROLE_CARRY        = 'Carry'
export const ROLE_OFFLANE      = 'Offlane'
export const ROLE_SUPPORT      = 'Support' // For soft and hard support
export const ROLE_SUPPORT_SOFT = 'SoftSupport'
export const ROLE_SUPPORT_HARD = 'HardSupport'

// skilling attributes: "special_bonus_attributes"
// Add build for 26 first abilities (incl. attributes)

export interface HeroBuilds {
	builds: HeroBuild[],
	ability_tooltips: Tooltips,
	item_tooltips: Tooltips
}

export interface HeroBuild {
	roles: string[],
	guide: number,     // Steam guide id provided by Dota 2
	abilities: string[]
	items: {
		starting: string[],
		early_game: string[],
		mid_game: string[],
		late_game: string[],
		situational: string[],
		core: string[],   // selected items from starting, early_game, mid_game, late_game and situational
		neutral: string[]
	}
}

export interface Tooltips {
	[key: string]: string
}



export const heroBuilds: { [key: string]: HeroBuilds } = {

	"Abaddon": {
		builds: [
			{
				roles: [ROLE_SUPPORT],
				guide: 1640698444,
				abilities: [
					"abaddon_aphotic_shield",
					"abaddon_frostmourne" /* equals to 'curse of avernus' */,
					"abaddon_aphotic_shield",
					"abaddon_death_coil",
					"abaddon_aphotic_shield",
					"abaddon_borrowed_time",
					"abaddon_aphotic_shield",
					"abaddon_death_coil",
					"abaddon_death_coil",
					"abaddon_death_coil",
					"special_bonus_movement_speed_15",
					"abaddon_borrowed_time",
					"abaddon_frostmourne",
					"abaddon_frostmourne",
					"special_bonus_unique_abaddon_2",
					"abaddon_frostmourne",
					"special_bonus_attributes",
					"abaddon_borrowed_time",
					"special_bonus_attributes",
					"special_bonus_unique_abaddon",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_abaddon_4"
					//25 levels, no need for more than that as they are automatic afterwards
				],
				items: {
					starting: ["tango", "flask" /* salve */, "enchanted_mango", "faerie_fire", "branches", "ward_observer", "ward_sentry", "magic_stick", "orb_of_venom", "wind_lace"],
					early_game: ["boots", "magic_wand", "headdress", "ring_of_basilius", "tranquil_boots", "arcane_boots"],
					mid_game: ["holy_locket", "solar_crest", "force_staff", "aether_lens", "mekansm"],
					late_game: ["vladmir", "ultimate_scepter"],
					situational: ["lotus_orb", "aghanims_shard"],
					core: ["holy_locket"],
					neutral: []
				},
			}
		],
		ability_tooltips: { // Optional, used for Dota 2 Guides
			"special_bonus_unique_abaddon": "If you have Aghanim`s Scepter or about to have it, take the other talent."
			// Question, should we have info for each build at each level, or the infos be generic to the skills / telents, and only showed with first build?
		},
		item_tooltips: {
			"ward_sentry": "To block or unblock the pull camp.",
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"orb_of_venom": "If you see yourself being able to hit the opponents on the lane often.",
			"wind_lace": "For extra mobility and if you are planning to go for Tranquil Boots.",
			"lotus_orb": "For reflect, dispel and armor.",
			"aghanims_shard": "To silence spell heavy lineups with few ways to remove the silence."
		}
	},
	"Alchemist": {
		builds: [
			{
				roles: [ROLE_CARRY, ROLE_MID],
				guide: 1640719685,
				abilities: [
					"alchemist_goblins_greed",
					"alchemist_acid_spray",
					"alchemist_goblins_greed",
					"alchemist_acid_spray",
					"alchemist_goblins_greed",
					"alchemist_chemical_rage",
					"alchemist_goblins_greed",
					"alchemist_acid_spray",
					"alchemist_acid_spray",
					"special_bonus_attack_speed_15",
					"alchemist_unstable_concoction",
					"alchemist_chemical_rage",
					"alchemist_unstable_concoction",
					"alchemist_unstable_concoction",
					"special_bonus_hp_350",
					"alchemist_unstable_concoction",
					"special_bonus_attributes",
					"alchemist_chemical_rage",
					"special_bonus_attributes",
					"special_bonus_cleave_25",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_alchemist_6"
				],
				items: {
					starting: ["tango", "quelling_blade", "circlet", "gauntlets", "branches", "magic_stick", "ward_observer",],
					early_game: ["bracer", "soul_ring",  "ring_of_health", "magic_wand", "phase_boots", "power_treads"],
					mid_game: ["bfury", "sange_and_yasha", "blink", "basher"],
					late_game: ["abyssal_blade", "swift_blink", "heart", "ultimate_scepter"],
					situational: ["bottle", "black_king_bar", "aghanims_shard", "mjollnir", "overwhelming_blink",  "monkey_king_bar", "silver_edge"],
					core: ["bfury", "sange_and_yasha", "assault"],
					neutral: []
				}
			}
		],
		ability_tooltips: {
			// For first level spell choice
			"alchemist_acid_spray": "Consider skilling Acid Spray at level one if you are playing mid Alchemist against a tough match-up."
		},
		item_tooltips: {
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"ward_observer": "If you are playing midlane.",
			"ring_of_health": "To solve hp sustain issues.",
			"ultimate_scepter": "To gift it to your teammates",
			"bottle": "If you are playing mid Alchemist.",
			"black_king_bar": "Against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard": "For extra dispel and buff.",
			"mjollnir": "Against illusion based heroes.",
			"overwhelming_blink": "Against illusion based heroes.",
			"monkey_king_bar": "Against evasion.",
			"silver_edge": "To break passives."
		}
	},
	"Ancient Apparition": {
		builds: [
			{
				roles: [ROLE_SUPPORT],
				guide: 1640719709,
				abilities: [
					"ancient_apparition_chilling_touch",
					"ancient_apparition_cold_feet",
					"ancient_apparition_chilling_touch",
					"ancient_apparition_cold_feet",
					"ancient_apparition_ice_vortex",
					"ancient_apparition_ice_blast",
					"ancient_apparition_cold_feet",
					"ancient_apparition_cold_feet",
					"ancient_apparition_ice_vortex",
					"ancient_apparition_ice_vortex",
					"ancient_apparition_ice_vortex",
					"ancient_apparition_ice_blast",
					"special_bonus_spell_amplify_8",
					"ancient_apparition_chilling_touch",
					"special_bonus_unique_ancient_apparition_3",
					"ancient_apparition_chilling_touch",
					"special_bonus_attributes",
					"ancient_apparition_ice_blast",
					"special_bonus_attributes",
					"special_bonus_unique_ancient_apparition_4",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_ancient_apparition_5"
				],
				items: {
					starting: ["tango", "flask" /* salve */, "faerie_fire", "branches", "ward_observer", "ward_sentry", "magic_stick", "headdress", "blight_stone","wind_lace"],
					early_game: ["boots", "magic_wand", "tranquil_boots", "arcane_boots", "wind_lace"],
					mid_game: ["glimmer_cape", "aghanims_shard", "force_staff", "ghost", "cyclone"],
					late_game: ["solar_crest", "vladmir", "aeon_disk"],
					situational: ["infused_raindrop", "lotus_orb"],
					core: ["aghanims_shard"],
					neutral: [],
				}
			}
		],
		ability_tooltips: {},
		item_tooltips: {
			"ward_sentry": "To block or unblock the pull camp.",
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"headdress": "On a tough lane.",
			"blight_stone": "If expect double melee against you.",
			"wind_lace": "For extra mobility and if you are planning to go for Tranquil Boots.",
			"infused_raindrop": "Against magical burst.",
			"lotus_orb": "For reflect, dispel and armor."
		}
	},
	"Anti-Mage": {
		builds: [
			{
				roles: [ROLE_CARRY],
				guide: 1640719725,
				abilities: [
					"antimage_mana_break",
					"antimage_blink",
					"antimage_mana_break",
					"antimage_counterspell",
					"antimage_blink",
					"antimage_mana_void",
					"antimage_blink",
					"antimage_blink",
					"antimage_mana_break",
					"special_bonus_unique_antimage",
					"antimage_mana_break",
					"antimage_mana_void",
					"antimage_counterspell",
					"antimage_counterspell",
					"antimage_counterspell",
					"special_bonus_unique_antimage_8",
					"special_bonus_attributes",
					"antimage_mana_void",
					"special_bonus_attributes",
					"special_bonus_unique_antimage_3",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_antimage_2"
				],
				items: {
					starting: ["tango", "quelling_blade", "circlet", "slippers", "branches", "faerie_fire", "magic_stick", "orb_of_venom"],
					early_game: ["ring_of_health", "wraith_band", "magic_wand", "power_treads", "orb_of_corrosion"],
					mid_game: ["bfury", "manta", "basher", "skadi"],
					late_game: ["abyssal_blade", "satanic", "butterfly", "ultimate_scepter"],
					situational: ["black_king_bar", "monkey_king_bar", "sphere", "aghanims_shard", "assault"],
					core: ["power_treads", "bfury", "manta", "basher", "abyssal_blade"],
					neutral: [],
				}
			}
		],
		ability_tooltips: {
			// For first level spell choice
			"antimage_counterspell": "Skill Counterspell at level one if you exptect to be harrassed by single-target magical-damage spells like Arcane Bolt.",
			"special_bonus_unique_antimage_2": "If there`s a lot of magical damage against you or you have mana issues, skill the other talent."
		},
		item_tooltips: {
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"ring_of_health": "To solve hp sustain issues.",
			"orb_of_venom": "If you see yourself being able to hit the opponents on the lane often.",
			"orb_of_corrosion": "If you can pressure on the lane.",
			"monkey_king_bar": "Against evasion.",
			"black_king_bar": "Against a lot of disables and as a dispel.",
			"sphere": "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
			"aghanims_shard": "Against heavy magical damage lineups.",
			"assault": "Against heavy armor reduction lineups.",
			"ultimate_scepter": "Great for causing chaos in the fights."
		}
	},
	"Arc Warden": {
		builds: [
			{
				roles: [ROLE_CARRY, ROLE_MID],
				guide: 1640719743,
				abilities: [
					"arc_warden_spark_wraith",
					"arc_warden_flux",
					"arc_warden_spark_wraith",
					"arc_warden_flux",
					"arc_warden_spark_wraith",
					"arc_warden_tempest_double",
					"arc_warden_spark_wraith",
					"arc_warden_flux",
					"arc_warden_flux",
					"arc_warden_magnetic_field",
					"special_bonus_unique_arc_warden_5",
					"arc_warden_tempest_double",
					"arc_warden_magnetic_field",
					"arc_warden_magnetic_field",
					"arc_warden_magnetic_field",
					"special_bonus_unique_arc_warden_3",
					"special_bonus_attributes",
					"arc_warden_tempest_double",
					"special_bonus_attributes",
					"special_bonus_unique_arc_warden",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_arc_warden_6"
				],
				items: {
					starting: ["tango", "circlet", "slippers", "branches", "faerie_fire", "magic_stick", "ward_observer"],
					early_game: ["wraith_band", "hand_of_midas", "boots"],
					mid_game: ["maelstrom", "travel_boots", "mjollnir", "dragon_lance", "hurricane_pike"],
					late_game: ["skadi", "greater_crit", "satanic", "bloodthorn", "travel_boots_2"],
					situational: ["infused_raindrop", "black_king_bar", "monkey_king_bar", "silver_edge", "gungir", , "nullifier"],
					core: ["hand_of_midas","maelstrom", "travel_boots", "mjollnir", "dragon_lance"],
					neutral: [],
				}
			}
		],
		ability_tooltips: {
			"special_bonus_unique_arc_warden": "Both level twenty talents are mediocre. I'd give slight edge to Spark Wraith one as in some rare cases you might purchase or obtain Aghanim`s Scepter from the Roshan."
		},
		item_tooltips: {
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"ward_observer": "If you are playing midlane.",
			"infused_raindrop": "Against magical burst.",
			"black_king_bar": "Against a lot of disables, magical damage and as a dispel.",
			"monkey_king_bar": "Against evasion.",
			"silver_edge": "For break and greater splitpush/pick off potential.",
			"gungir": "For crowd control instead of Mjollnir.",
			"nullifier": "To dispel defensive spells and items."
		}
	},
	"Axe": {
		builds: [
			{
				roles: [ROLE_OFFLANE],
				guide: 1640802946,
				abilities: [
					"axe_battle_hunger",
					"axe_counter_helix",
					"axe_counter_helix",
					"axe_berserkers_call",
					"axe_counter_helix",
					"axe_culling_blade",
					"axe_counter_helix",
					"axe_berserkers_call",
					"axe_berserkers_call",
					"axe_berserkers_call",
					"special_bonus_magic_resistance_12",
					"axe_culling_blade",
					"axe_battle_hunger",
					"axe_battle_hunger",
					"special_bonus_unique_axe_4",
					"axe_battle_hunger",
					"special_bonus_attributes",
					"axe_culling_blade",
					"special_bonus_attributes",
					"special_bonus_unique_axe_5",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_axe_2"
				],
				items: {
					starting: ["tango", "flask", "quelling_blade", "ring_of_protection", "branches", "faerie_fire", "bracer", "magic_stick"],
					early_game: ["vanguard", "boots", "phase_boots", "magic_wand", "cloak"],
					mid_game: ["blink", "hood_of_defiance", "blade_mail"],
					late_game: ["heart", "assault", "abyssal_blade", "overwhelming_blink"],
					situational: ["black_king_bar", "pipe", "crimson_guard", "lotus_orb", "invis_sword", "manta"],
					core: ["vanguard", "blink"],
					neutral: [],
				}
			}
		],
		ability_tooltips: {
			"axe_battle_hunger": "If the opponent`s have an easy way of removing or dispelling Battle Hunger, you can skip skilling this spell during laning stage."
		},
		item_tooltips: {
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"vanguard": "It can be disassembled.",
			"overwhelming_blink": "Against illusion, clones and summons.",
			"black_king_bar": "Against a lot of disables, magical damage and as a dispel.",
			"lotus_orb": "For reflect, dispel and armor.",
			"invis_sword": "For pick-offs and to guarantee a good initiation.",
			"manta": "As a farm accelerator."
		}
	},
	"Bane": {
		builds: [
			{
				roles: [ROLE_SUPPORT],
				guide: 1640803052,
				abilities: [
					"bane_brain_sap",
					"bane_nightmare",
					"bane_brain_sap",
					"bane_nightmare",
					"bane_nightmare",
					"bane_fiends_grip",
					"bane_nightmare",
					"bane_enfeeble",
					"bane_enfeeble",
					"bane_enfeeble",
					"bane_enfeeble",
					"bane_fiends_grip",
					"bane_brain_sap",
					"bane_brain_sap",
					"special_bonus_armor_5",
					"special_bonus_unique_bane_8",
					"special_bonus_attributes",
					"bane_fiends_grip",
					"special_bonus_attributes",
					"special_bonus_unique_bane_5",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_bane_2"
				],
				items: {
					starting: ["tango", "flask", "enchanted_mango", "faerie_fire", "branches", "ward_observer", "ward_sentry", "magic_stick"],
					early_game: ["magic_wand", "tranquil_boots", "arcane_boots", "wind_lace"],
					mid_game: ["aether_lens", "glimmer_cape", "force_staff", "ghost"],
					late_game: ["solar_crest", "aeon_disk"],
					situational: ["infused_raindrop", "lotus_orb", "black_king_bar", "aghanims_shard"],
					core: ["aether_lens"],
					neutral: [],
				}
			}
		],
		ability_tooltips: {
			"special_bonus_armor_5": "This talent should be better than the other level ten talent in most cases as you often times have some magical resistance coming from Glimmer Cape.",
			"special_bonus_unique_bane_2": "This talent goes well with Aghanim`s Shard and is particularly good against illusion and summon-based heroes and mega creeps. You can skill the other talent though if you have an easy time channeling your ulty or you have Aghanim`s Scepter, and you are in need of control."
		},
		item_tooltips: {
			"ward_sentry": "To block or unblock the pull camp.",
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"wind_lace": "For extra mobility as Bane is great at setting up kills.",
			"infused_raindrop": "Against magical burst.",
			"lotus_orb": "For reflect, dispel and armor.",
			"black_king_bar": "To get a full duration Fiend's Grip off.",
			"aghanims_shard": "Against summons, illusions and to depush."
		}
	},
	"Batrider": {
		builds: [
			{
				roles: [ROLE_MID, ROLE_OFFLANE],
				guide: 1640803569,
				abilities: [
					"batrider_sticky_napalm",
					"batrider_firefly",
					"batrider_sticky_napalm",
					"batrider_flamebreak",
					"batrider_sticky_napalm",
					"batrider_flaming_lasso",
					"batrider_sticky_napalm",
					"batrider_firefly",
					"batrider_firefly",
					"batrider_firefly",
					"special_bonus_spell_amplify_5",
					"batrider_flaming_lasso",
					"batrider_flamebreak",
					"batrider_flamebreak",
					"special_bonus_unique_batrider_4",
					"batrider_flamebreak",
					"special_bonus_attributes",
					"batrider_flaming_lasso",
					"special_bonus_attributes",
					"special_bonus_movement_speed_30",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_batrider_6"
				],
				items: {
					starting:	["tango","faerie_fire","enchanted_mango","branches","circlet","mantle","magic_stick"],
					early_game:	["boots","magic_wand","wind_lace"],
					mid_game:	["travel_boots","blink","aghanims_shard","aether_lens","force_staff","ghost","cyclone","kaya_and_sange"],
					late_game:	["octarine_core","shivas_guard","ethereal_blade","wind_waker"],
					situational:	["ward_observer","bottle","infused_raindrop","black_king_bar","aeon_disk","sphere"],
					core:	["travel_boots","blink"],
					neutral:	[]
				}
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"wind_lace":	"For extra mobility to be able to close the gap.",
			"ward_observer":	"If you are playing midlane.",
			"bottle":	"Mainly for mid Batrider but can be consider on offlane too.",
			"infused_raindrop":	"Against magical burst.",
			"black_king_bar":	"To be able to get Flaming Lasso off and against a lot of disables, magical damage and as a dispel.",
			"sphere":	"Against single target disables."
		}
	},
	"Beastmaster": {
		builds: [
			{
				roles: [ROLE_OFFLANE],
				guide: 1640803579,
				abilities: [
					"beastmaster_call_of_the_wild_boar",
					"beastmaster_inner_beast",
					"beastmaster_call_of_the_wild_boar",
					"beastmaster_inner_beast",
					"beastmaster_call_of_the_wild_boar",
					"beastmaster_primal_roar",
					"beastmaster_call_of_the_wild_boar",
					"beastmaster_inner_beast",
					"beastmaster_inner_beast",
					"special_bonus_attack_damage_30",
					"beastmaster_wild_axes",
					"beastmaster_primal_roar",
					"beastmaster_wild_axes",
					"beastmaster_wild_axes",
					"beastmaster_wild_axes",
					"special_bonus_unique_beastmaster_9",
					"special_bonus_attributes",
					"beastmaster_primal_roar",
					"special_bonus_attributes",
					"special_bonus_unique_beastmaster_6",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_beastmaster_4"
				],
				items: {
					starting:	["tango","flask","quelling_blade","ring_of_protection","faerie_fire","enchanted_mango","circlet","gauntlets","branches","bracer","magic_stick","orb_of_venom"],
					early_game:	["boots","phase_boots","medallion_of_courage","ring_of_basilius","magic_wand","orb_of_corrosion"],
					mid_game:	["solar_crest","hood_of_defiance","helm_of_the_dominator","ultimate_scepter","kaya","vladmir"],
					late_game:	["assault","kaya_and_sange","octarine_core"],
					situational:	["soul_ring","pipe","blink","black_king_bar","aghanims_shard"],
					core:	["solar_crest"],
					neutral:	[]
				}
			}
		],
		ability_tooltips: {
			"beastmaster_wild_axes": "If you are laning against Chen or Enchantress, you might want to skill Wild Axes over Call of the Wild."
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"orb_of_venom":	"If you see yourself being able to hit the opponents on the lane often.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"ultimate_scepter":	"Particularly good against illusion based heroes.",
			"kaya":	"Goes well with Aghanim's Scepter build.",
			"kaya_and_sange":	"Goes well with Aghanim's Scepter build.",
			"octarine_core":	"Goes well with Aghanim's Scepter build.",
			"soul_ring":	"If you are going for Wild Axes build.",
			"blink":	"To reach backliners.",
			"black_king_bar":	"Against a lot of disables, magical damage and as a dispel.",
			"aghanims_shard":	"To improve vision game and gain another disable."
		}
	},
	"Bloodseeker": {
		builds: [
			{
				roles: [ROLE_CARRY],
				guide: 1640803590,
				abilities: [
					"bloodseeker_blood_bath",
					"bloodseeker_thirst",
					"bloodseeker_thirst",
					"bloodseeker_bloodrage",
					"bloodseeker_thirst",
					"bloodseeker_rupture",
					"bloodseeker_bloodrage",
					"bloodseeker_bloodrage",
					"bloodseeker_bloodrage",
					"special_bonus_unique_bloodseeker_5",
					"bloodseeker_thirst",
					"bloodseeker_rupture",
					"bloodseeker_blood_bath",
					"bloodseeker_blood_bath",
					"special_bonus_unique_bloodseeker_7",
					"bloodseeker_blood_bath",
					"special_bonus_attributes",
					"bloodseeker_rupture",
					"special_bonus_attributes",
					"special_bonus_hp_400",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_bloodseeker_4"
				],
				items: {
					starting: ["tango", "quelling_blade", "circlet", "slippers", "branches", "faerie_fire", "magic_stick", "orb_of_venom"],
            		early_game: ["wraith_band", "power_treads", "magic_wand", "orb_of_corrosion"],
            		mid_game: ["maelstrom", "sange_and_yasha", , "aghanims_shard", "basher", "skadi"],
            		late_game: ["mjollnir", "satanic", "abyssal_blade", "butterfly"],
            		situational: ["black_king_bar", "manta", "gungir", "monkey_king_bar", "sphere"],
					core: ["power_treads", "maelstrom", "sange_and_yasha", "aghanims_shard"],
					neutral: []
				},
			}, {
				roles: [ROLE_OFFLANE],
				guide: 1641224485,
				abilities: [
					"bloodseeker_blood_bath",
					"bloodseeker_thirst",
					"bloodseeker_thirst",
					"bloodseeker_blood_bath",
					"bloodseeker_thirst",
					"bloodseeker_rupture",
					"bloodseeker_thirst",
					"bloodseeker_blood_bath",
					"bloodseeker_blood_bath",
					"bloodseeker_bloodrage",
					"bloodseeker_bloodrage",
					"bloodseeker_rupture",
					"bloodseeker_bloodrage",
					"bloodseeker_bloodrage",
					"special_bonus_unique_bloodseeker_6",
					"special_bonus_unique_bloodseeker_7",
					"special_bonus_attributes",
					"bloodseeker_rupture",
					"special_bonus_attributes",
					"special_bonus_unique_bloodseeker_3",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_bloodseeker"
				],
				items: {
					starting: ["tango", "quelling_blade", "circlet", "slippers", "branches", "faerie_fire", "magic_stick", "orb_of_venom"],
					early_game: ["wraith_band", "phase_boots", "magic_wand", "urn_of_shadows", "orb_of_corrosion"],
					mid_game: ["rod_of_atos", "ultimate_scepter", "maelstrom", "gungir", "veil_of_discord", "dagon"],
					late_game: ["sheepstick", "octarine_core", "vladmir"],
					situational: ["spirit_vessel", "cyclone", "black_king_bar", "lotus_orb", "aghanims_shard"],
					core: ["phase_boots", "rod_of_atos", "ultimate_scepter"],
					neutral: []
				}
			}
		],
		ability_tooltips: {
		},
		item_tooltips: {
			"magic_stick": "If you expect high frequency of spells being used on the lane.",
			"orb_of_venom": "If you see yourself being able to hit the opponents on the lane often.",
			"orb_of_corrosion": "If you can pressure on the lane.",
			"dagon": "Benefits from Bloodrage spell amp and acts as Linken's popper.",
			"spirit_vessel": "Against heavy healing lineup.",
			"cyclone": "For dispel, setup and teleport cancel.",
			"black_king_bar": "Against a lot of disables, magical damage and as a dispel.",
			"lotus_orb": "For reflect, dispel and armor.",
			"aghanims_shard": "Great against high HP targets, improves your dps and sustain.",
			"manta": "Alternative to Sange and Yasha if you need to dispel something big.",
			"gungir": "Alternative to Mjollnir if you need AoE control.",
			"monkey_king_bar": "Against evasion although Maelstrom/Mjollnir pierces evasion on proc already.",
			"sphere": "Against powerful single target spells like Duel, Lasso, Hex or Doom."
		}
	},
	"Bounty Hunter": {
		builds: [
			{
				roles: [ROLE_SUPPORT],
				guide: 1640803622,
				abilities: [
					"bounty_hunter_jinada",
					"bounty_hunter_wind_walk",
					"bounty_hunter_jinada",
					"bounty_hunter_shuriken_toss",
					"bounty_hunter_jinada",
					"bounty_hunter_track",
					"bounty_hunter_shuriken_toss",
					"bounty_hunter_shuriken_toss",
					"bounty_hunter_shuriken_toss",
					"bounty_hunter_jinada",
					"special_bonus_unique_bounty_hunter_4",
					"bounty_hunter_track",
					"bounty_hunter_wind_walk",
					"bounty_hunter_wind_walk",
					"special_bonus_unique_bounty_hunter_6",
					"bounty_hunter_wind_walk",
					"special_bonus_attributes",
					"bounty_hunter_track",
					"special_bonus_attributes",
					"special_bonus_unique_bounty_hunter_8",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_bounty_hunter_7"
				],
				items: {
					starting:	["tango","boots","orb_of_venom","ward_observer","ward_sentry","flask","faerie_fire"],
					early_game:	["tranquil_boots","wind_lace","magic_wand","urn_of_shadows","arcane_boots","orb_of_corrosion"],
					mid_game:	["medallion_of_courage","solar_crest","ultimate_scepter","aghanims_shard","force_staff","cyclone","ghost"],
					late_game:	["sheepstick","octarine_core","vladmir"],
					situational:	["infused_raindrop","spirit_vessel","ancient_janggo","pipe","lotus_orb"],
					core:	["ultimate_scepter","aghanims_shard"],
					neutral:	[]
				}
			}
		],
		ability_tooltips: {
			"special_bonus_unique_bounty_hunter_8": "If you are not going for Aghanim`s Scepter or you are still farm from assembling it, take this talent. Otherwise, take the other one.",
			"special_bonus_unique_bounty_hunter_7": "If you have Aghanim`s Scepter and you see yourself being able to do a lot of damage with Shuriken Tosses in the fight(short BKBs, no Linken Spheres), take this talent. Otherwise, take the other one."
		},
		item_tooltips: {
			"orb_of_venom":	"If you see yourself being able to hit the opponents on the lane often.",
			"ward_sentry":	"To block or unblock the pull camp.",
			"wind_lace":	"For extra movement speed to roam around.",
			"orb_of_corrosion":	"If you can pressure on the lane.",
			"infused_raindrop":	"Against magical burst.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"ancient_janggo":	"If you are grouping up a lot as a team in midgame and if you have summons.",
			"lotus_orb":	"For reflect, dispel(e.g. Dust of Appearance) and armor."
		}
	},
	"Brewmaster": {
		builds: [
			{
				roles: [ROLE_OFFLANE],
				guide: 1640803632,
				abilities: [
					"brewmaster_thunder_clap",
					"brewmaster_cinder_brew",
					"brewmaster_cinder_brew",
					"brewmaster_drunken_brawler",
					"brewmaster_cinder_brew",
					"brewmaster_primal_split",
					"brewmaster_cinder_brew",
					"brewmaster_thunder_clap",
					"brewmaster_thunder_clap",
					"brewmaster_thunder_clap",
					"special_bonus_unique_brewmaster_7",
					"brewmaster_primal_split",
					"brewmaster_drunken_brawler",
					"brewmaster_drunken_brawler",
					"special_bonus_hp_350",
					"brewmaster_drunken_brawler",
					"special_bonus_attributes",
					"brewmaster_primal_split",
					"special_bonus_attributes",
					"special_bonus_unique_brewmaster",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_brewmaster_6"
				],
				items: {
					starting:	["tango","flask","quelling_blade","ring_of_protection","branches","faerie_fire","gauntlets","circlet","enchanted_mango","bracer","magic_stick"],
					early_game:	["boots","urn_of_shadows","magic_wand","soul_ring"],
					mid_game:	["ultimate_scepter","blink","aghanims_shard"],
					late_game:	["refresher","assault","vladimir"],
					situational:	["hand_of_midas","spirit_vessel","pipe","black_king_bar","aeon_disk"],
					core:	["urn_of_shadows","ultimate_scepter","blink"],
					neutral:	[]
				}
			}
		],
		ability_tooltips: {
			"special_bonus_hp_350": "It is important that you get ulty off and extra HP can help with that. The other level fifteen does not see much play as you spend most of the fight in Primal Split."
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"urn_of_shadows":	"The active of Urn activates Cinder Brew.",
			"aghanims_shard":	"For an extra brewling and after you get Aghanim's Scepter.",
			"hand_of_midas":	"If you can get it early.",
			"spirit_vessel":	"Against heavy healing lineup.",
			"black_king_bar":	"To be able to get Primal Split off and against a lot of disables, magical damage and as a dispel.",
			"aeon_disk":	"To be able to get Primal Split off."
		}
	},
	"Bristleback": {
		builds: [
			{
				roles: [ROLE_OFFLANE],
				guide: 1640803643,
				abilities: [
					"bristleback_quill_spray",
					"bristleback_bristleback",
					"bristleback_quill_spray",
					"bristleback_viscous_nasal_goo",
					"bristleback_quill_spray",
					"bristleback_warpath",
					"bristleback_quill_spray",
					"bristleback_bristleback",
					"bristleback_bristleback",
					"special_bonus_mp_regen_2",
					"bristleback_bristleback",
					"bristleback_warpath",
					"bristleback_viscous_nasal_goo",
					"bristleback_viscous_nasal_goo",
					"special_bonus_hp_200",
					"bristleback_viscous_nasal_goo",
					"special_bonus_attributes",
					"bristleback_warpath",
					"special_bonus_attributes",
					"special_bonus_hp_regen_20",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_bristleback_3"
				],
				items: {
					starting:	["tango","flask","quelling_blade","enchanted_mango","gauntlets","branches","ring_of_protection","magic_stick"],
					early_game:	["vanguard","boots","soul_ring","magic_wand","phase_boots","arcane_boots"],
					mid_game:	["hood_of_defiance","ultimate_scepter","sange","eternal_shroud","aghanims_shard","sange_and_yasha"],
					late_game:	["assault","abyssal_blade","shivas_guard"],
					situational:	["pipe","crimson_guard","heavens_halberd","lotus_orb","black_king_bar"],
					core:	["vanguard","soul_ring","ultimate_scepter"],
					neutral:	[]
				},
			}
		],
		ability_tooltips: {
			"bristleback_viscous_nasal_goo": "You can skill Viscious Nasal Goo on level one if you are fighting on the rune, or on level two if you see an opportunity to run down the opponent`s hero on the lane.",
			"special_bonus_unique_bristleback_3": "You should generally be looking to transition to right-clicker in late game and this talent helps with that."
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"sange":	"Can be used for Halberd or combined with Yasha",
			"aghanims_shard":	"For more Quill stacks and AoE slow.",
			"pipe":	"Against heavy magical damage lineups.",
			"crimson_guard":	"Against high attack speed heroes and multiple units.",
			"heavens_halberd":	"Especially good against ranged right-clickers.",
			"lotus_orb":	"For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
			"black_king_bar":	"Against a lot of disables, magical damage, mana burn, breaks and as a dispel."
		}
	},

	"Juggernaut": {
		builds: [
			{
				roles: [ROLE_CARRY],
				guide: 1640804017,
				abilities: [
					"juggernaut_blade_fury",
					"juggernaut_blade_dance",
					"juggernaut_blade_fury",
					"juggernaut_healing_ward",
					"juggernaut_blade_fury",
					"juggernaut_omni_slash",
					"juggernaut_blade_fury",
					"juggernaut_blade_dance",
					"juggernaut_blade_dance",
					"juggernaut_blade_dance",
					"special_bonus_unique_juggernaut",
					"juggernaut_omni_slash",
					"juggernaut_healing_ward",
					"juggernaut_healing_ward",
					"special_bonus_attack_speed_20",
					"juggernaut_healing_ward",
					"special_bonus_attributes",
					"juggernaut_omni_slash",
					"special_bonus_attributes",
					"special_bonus_unique_juggernaut_3",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_attributes",
					"special_bonus_unique_juggernaut_2"
				],
				items: {
					starting:	["tango","quelling_blade","slippers","branches","circlet","faerie_fire","magic_stick"],
					early_game:	["boots","phase_boots","power_treads","wraith_band","magic_wand"],
					mid_game:	["maelstrom","manta","sange_and_yasha","ultimate_scepter","basher","bfury","diffusal_blade"],
					late_game:	["skadi","butterfly","mjollnir","satanic","abyssal_blade"],
					situational:	["infused_raindrop","blink","aghanims_shard","monkey_king_bar"],
					core:	[],
					neutral:	[]
				}
			}
		],
		ability_tooltips: {
			"juggernaut_healing_ward": "You can skill Healing Ward at level two if you are being pressured.",
			"juggernaut_blade_dance": "Some players prefer taking stats over leveling Blade Dance past level one. It slows your farm a bit but makes you tankier.",
			"special_bonus_unique_juggernaut": "This talent, along with level twenty Blade Fury talent and Aghanim`s Shard, allows you to dish out tons of damage while Blade Furying.",
			"special_bonus_attack_speed_20": "This is definitely a talent to increase the DPS output. If you are playing against Tinker, Zeus and such heroes that damage you heavily from afar but can't destroy your Healing Ward as easily, taking healing ward cooldown talent might be better."
		},
		item_tooltips: {
			"magic_stick":	"If you expect high frequency of spells being used on the lane.",
			"diffusal_blade":	"Goes well with Manta Style.",
			"infused_raindrop":	"Against magical burst.",
			"blink":	"To close the gap.",
			"aghanims_shard":	"Against lineups heavy on magic damage and disables.",
			"monkey_king_bar":	"Against evasion."
		}
	},

	/*
COMMENT: ROLES CURRENTLY IN APP: (Same as role selection in Dota 2)
export const ROLE_MID          = 'Mid'
export const ROLE_CARRY        = 'Carry'
export const ROLE_OFFLANE      = 'Offlane'
export const ROLE_SUPPORT_SOFT = 'SoftSupport'
export const ROLE_SUPPORT_HARD = 'HardSupport'
*/
}

export const standardAbilityBuildsOLD = {
	"Broodmother": ["broodmother_spin_web", "broodmother_insatiable_hunger", "broodmother_insatiable_hunger", "broodmother_spin_web", "broodmother_insatiable_hunger"],
	"Centaur Warrunner": ["centaur_hoof_stomp", "centaur_double_edge", "centaur_double_edge", "centaur_return", "centaur_double_edge"],
	"Chaos Knight": ["chaos_knight_chaos_bolt", "chaos_knight_reality_rift", "chaos_knight_chaos_strike", "chaos_knight_chaos_strike", "chaos_knight_chaos_strike"],
	"Chen": ["chen_holy_persuasion","chen_divine_favor", "chen_holy_persuasion", "chen_penitence", "chen_holy_persuasion"],
	"Clinkz": ["clinkz_searing_arrows", "clinkz_strafe", "clinkz_searing_arrows", "clinkz_wind_walk", "clinkz_searing_arrows"],		/* "clinkz_searing_arrows", "clinkz_burning_barrage", "clinkz_searing_arrows",  "clinkz_burning_barrage", "clinkz_burning_barrage",*/
	"Clockwerk": ["rattletrap_battery_assault", "rattletrap_power_cogs", "rattletrap_battery_assault", "rattletrap_rocket_flare", "rattletrap_battery_assault"],
	"Crystal Maiden": ["crystal_maiden_crystal_nova", "crystal_maiden_frostbite", "crystal_maiden_brilliance_aura", "crystal_maiden_frostbite", "crystal_maiden_frostbite"],
	"Dark Seer": ["dark_seer_ion_shell", "dark_seer_surge", "dark_seer_ion_shell", "dark_seer_vacuum", "dark_seer_ion_shell"],
	"Dark Willow": ["dark_willow_bramble_maze", "dark_willow_shadow_realm", "dark_willow_shadow_realm", "dark_willow_cursed_crown", "dark_willow_shadow_realm"],
	"Dawnbreaker": ["dawnbreaker_celestial_hammer", "dawnbreaker_fire_wreath" /* equals to 'starbreaker' */, "dawnbreaker_celestial_hammer", "dawnbreaker_fire_wreath" /* equals to 'starbreaker' */, /* "dawnbreaker_luminosity", ,*/ "dawnbreaker_celestial_hammer"],
	"Dazzle": ["dazzle_poison_touch", "dazzle_shadow_wave", "dazzle_poison_touch", "dazzle_shallow_grave", "dazzle_shadow_wave"],
	"Death Prophet": ["death_prophet_carrion_swarm", "death_prophet_spirit_siphon", "death_prophet_spirit_siphon", "death_prophet_carrion_swarm", "death_prophet_spirit_siphon"],
	"Disruptor": ["disruptor_thunder_strike", "disruptor_kinetic_field", "disruptor_thunder_strike", "disruptor_glimpse", "disruptor_glimpse"],
	"Doom": ["doom_bringer_devour", "doom_bringer_scorched_earth", "doom_bringer_devour", "doom_bringer_scorched_earth", "doom_bringer_devour"],
	"Dragon Knight": ["dragon_knight_dragon_tail", "dragon_knight_dragon_blood", "dragon_knight_dragon_blood", "dragon_knight_breathe_fire", "dragon_knight_dragon_blood"],
	"Drow Ranger": ["drow_ranger_frost_arrows", "drow_ranger_multishot", "drow_ranger_frost_arrows", "drow_ranger_multishot", "drow_ranger_frost_arrows"],
	"Earth Spirit": ["earth_spirit_rolling_boulder", "earth_spirit_boulder_smash", "earth_spirit_boulder_smash", "earth_spirit_geomagnetic_grip", "earth_spirit_rolling_boulder"],
	"Earthshaker": ["earthshaker_fissure", "earthshaker_enchant_totem", "earthshaker_aftershock", "earthshaker_aftershock", "earthshaker_aftershock"],
	"Elder Titan": ["elder_titan_ancestral_spirit", "elder_titan_echo_stomp", "elder_titan_ancestral_spirit", "elder_titan_echo_stomp", "elder_titan_echo_stomp"],
	"Ember Spirit": ["ember_spirit_flame_guard", "ember_spirit_sleight_of_fist", "ember_spirit_flame_guard", "ember_spirit_searing_chains", "ember_spirit_flame_guard"],
	"Enchantress": ["enchantress_enchant", "enchantress_impetus", "enchantress_enchant", "enchantress_impetus", "enchantress_impetus"],
	"Enigma": ["enigma_demonic_conversion", "enigma_malefice", "enigma_demonic_conversion", "enigma_malefice", "enigma_demonic_conversion"],
	"Faceless Void": ["faceless_void_time_walk", "faceless_void_time_lock", "faceless_void_time_lock", "faceless_void_time_dilation", "faceless_void_time_lock"],
	"Grimstroke": ["grimstroke_dark_artistry" /* equals to 'stroke of faith' */, "grimstroke_spirit_walk" /* equals to 'ink swell' */,  "grimstroke_spirit_walk" /* equals to 'ink swell' */, "grimstroke_ink_creature" /* equals to 'phantom's embrace' */,  "grimstroke_spirit_walk" /* equals to 'ink swell' */],
	"Gyrocopter": ["gyrocopter_homing_missile", "gyrocopter_rocket_barrage", "gyrocopter_rocket_barrage", "gyrocopter_flak_cannon", "gyrocopter_flak_cannon"],
	"Hoodwink": ["hoodwink_bushwhack", "hoodwink_acorn_shot", "hoodwink_bushwhack", "hoodwink_scurry", "hoodwink_bushwhack"],
	"Huskar": ["huskar_burning_spear", "huskar_berserkers_blood", "huskar_burning_spear", "huskar_berserkers_blood", "huskar_burning_spear"],
	"Invoker": ["invoker_exort", "invoker_quas", "invoker_exort", "invoker_quas", "invoker_exort"],
	"Io": ["wisp_tether", "wisp_overcharge", "wisp_overcharge", "wisp_tether", "wisp_overcharge"],
	"Jakiro": ["jakiro_dual_breath", "jakiro_liquid_fire", "jakiro_dual_breath", "jakiro_ice_path", "jakiro_dual_breath"],
	"Keeper of the Light": ["keeper_of_the_light_illuminate"/*,  "keeper_of_the_light_radiant_bind" equals to 'solar bind' */, "keeper_of_the_light_chakra_magic", "keeper_of_the_light_illuminate", "keeper_of_the_light_chakra_magic", "keeper_of_the_light_illuminate"],
	"Kunkka": ["kunkka_tidebringer", "kunkka_torrent", "kunkka_tidebringer", "kunkka_x_marks_the_spot", "kunkka_tidebringer"],
	"Legion Commander": ["legion_commander_overwhelming_odds", "legion_commander_moment_of_courage", "legion_commander_overwhelming_odds", "legion_commander_press_the_attack", "legion_commander_overwhelming_odds"],
	"Leshrac": ["leshrac_split_earth", "leshrac_lightning_storm", "leshrac_split_earth", "leshrac_lightning_storm", "leshrac_diabolic_edict"],
	"Lich": ["lich_frost_nova", "lich_frost_shield", "lich_frost_nova", "lich_sinister_gaze", "lich_frost_shield"],
	"Lifestealer": ["life_stealer_feast", "life_stealer_ghoul_frenzy", "life_stealer_feast", "life_stealer_rage", "life_stealer_feast"],
	"Lina": ["lina_light_strike_array", "lina_fiery_soul", "lina_dragon_slave", "lina_dragon_slave", "lina_dragon_slave"],
	"Lion": ["lion_impale", "lion_mana_drain", "lion_impale", "lion_voodoo", "lion_impale"],
	"Lone Druid": ["lone_druid_spirit_bear", "lone_druid_spirit_link", "lone_druid_spirit_link", "lone_druid_spirit_bear", "lone_druid_spirit_link"],
	"Luna": ["luna_lunar_blessing", "luna_lucent_beam", "luna_lunar_blessing", "luna_lucent_beam", "luna_lunar_blessing" /* "luna_moon_glaive" equals to 'moon glaives' */],
	"Lycan": ["lycan_summon_wolves", "lycan_feral_impulse", "lycan_summon_wolves", "lycan_feral_impulse", "lycan_summon_wolves"],
	"Magnus": ["magnataur_shockwave", "magnataur_skewer", "magnataur_empower", "magnataur_empower", "magnataur_empower"],
	"Marci": ["marci_companion_run" /* rebound */, "marci_grapple" /* dispose */, "marci_companion_run" /* rebound */, "marci_grapple" /* dispose */, "marci_companion_run" /* rebound */],
	"Mars": ["mars_gods_rebuke", "mars_spear", "mars_spear", "mars_gods_rebuke", "mars_spear"],
	"Medusa": ["medusa_mystic_snake", "medusa_mana_shield", "medusa_mystic_snake", "medusa_split_shot", "medusa_mystic_snake"],
	"Meepo": ["meepo_poof", "meepo_ransack", "meepo_poof", "meepo_divided_we_stand", "meepo_poof"],
	"Mirana": ["mirana_arrow", "mirana_leap", "mirana_starfall", "mirana_starfall", "mirana_starfall"],
	"Monkey King": ["monkey_king_boundless_strike", "monkey_king_jingu_mastery", "monkey_king_jingu_mastery", "monkey_king_boundless_strike", "monkey_king_jingu_mastery"],
	"Morphling": ["morphling_morph_agi", "morphling_waveform", "morphling_morph_agi", "morphling_waveform", "morphling_morph_agi"],
	"Naga Siren": ["naga_siren_mirror_image", "naga_siren_rip_tide", "naga_siren_mirror_image", "naga_siren_rip_tide", "naga_siren_mirror_image"],
	"Nature's Prophet": ["furion_force_of_nature", "furion_teleportation", "furion_force_of_nature", "furion_sprout", "furion_force_of_nature"],
	"Necrophos": ["necrolyte_death_pulse", "necrolyte_heartstopper_aura", "necrolyte_death_pulse", "necrolyte_sadist" /* equals to 'ghost shroud' */, "necrolyte_death_pulse"],
	"Night Stalker": ["night_stalker_void", "night_stalker_hunter_in_the_night", "night_stalker_void", "night_stalker_hunter_in_the_night", "night_stalker_void"],
	"Nyx Assassin": ["nyx_assassin_impale", "nyx_assassin_spiked_carapace", "nyx_assassin_impale", "nyx_assassin_spiked_carapace", "nyx_assassin_impale"],
	"Ogre Magi": ["ogre_magi_ignite", "ogre_magi_fireblast", "ogre_magi_ignite", "ogre_magi_fireblast", "ogre_magi_ignite"],
	"Omniknight": ["omniknight_purification", "omniknight_repel", "omniknight_purification", "omniknight_repel", "omniknight_purification"],
	"Oracle": ["oracle_fortunes_end", "oracle_purifying_flames", "oracle_purifying_flames", "oracle_fates_edict", "oracle_purifying_flames"],
    "Outworld Destroyer": /* not 'Outworld Devourer' */ ["obsidian_destroyer_arcane_orb", "obsidian_destroyer_equilibrium", "obsidian_destroyer_astral_imprisonment", "obsidian_destroyer_astral_imprisonment", "obsidian_destroyer_astral_imprisonment"],
	"Pangolier": ["pangolier_shield_crash", "pangolier_swashbuckle", "pangolier_shield_crash", "pangolier_lucky_shot", "pangolier_shield_crash"],
	"Phantom Assassin": ["phantom_assassin_stifling_dagger", "phantom_assassin_phantom_strike", "phantom_assassin_stifling_dagger", "phantom_assassin_blur", "phantom_assassin_stifling_dagger"],
	"Phantom Lancer": ["phantom_lancer_spirit_lance", "phantom_lancer_phantom_edge", "phantom_lancer_doppelwalk", "phantom_lancer_phantom_edge", "phantom_lancer_phantom_edge"],
	"Phoenix": ["phoenix_fire_spirits", "phoenix_icarus_dive", "phoenix_fire_spirits", "phoenix_sun_ray", "phoenix_fire_spirits"],
	"Puck": ["puck_illusory_orb", "puck_phase_shift", "puck_illusory_orb", "puck_waning_rift", "puck_illusory_orb"],
	"Pudge": ["pudge_meat_hook", "pudge_rot", "pudge_meat_hook", "pudge_rot", "pudge_meat_hook"],
	"Pugna": ["pugna_nether_blast", "pugna_decrepify", "pugna_nether_blast", "pugna_decrepify", "pugna_nether_blast"],
	"Queen of Pain": ["queenofpain_scream_of_pain", "queenofpain_shadow_strike", "queenofpain_shadow_strike", "queenofpain_blink", "queenofpain_scream_of_pain"],
	"Razor": ["razor_static_link", "razor_plasma_field", "razor_static_link", "razor_plasma_field", "razor_static_link"],
	"Riki": ["riki_blink_strike", "riki_tricks_of_the_trade", "riki_blink_strike", "riki_tricks_of_the_trade", "riki_blink_strike"],
	"Rubick": ["rubick_fade_bolt", "rubick_telekinesis", "rubick_fade_bolt", "rubick_arcane_supremacy", "rubick_fade_bolt"],
	"Sand King": ["sandking_caustic_finale", "sandking_burrowstrike", "sandking_sand_storm", "sandking_sand_storm", "sandking_sand_storm"],
	"Shadow Demon": ["shadow_demon_disruption", "shadow_demon_shadow_poison", "shadow_demon_shadow_poison", "shadow_demon_soul_catcher", "shadow_demon_shadow_poison"],
	"Shadow Fiend": ["nevermore_shadowraze1", "nevermore_necromastery", "nevermore_shadowraze1", "nevermore_necromastery", "nevermore_shadowraze1"],
	"Shadow Shaman": ["shadow_shaman_ether_shock", "shadow_shaman_shackles", "shadow_shaman_ether_shock", "shadow_shaman_voodoo", "shadow_shaman_ether_shock"],
	"Silencer": ["silencer_glaives_of_wisdom", "silencer_curse_of_the_silent", "silencer_curse_of_the_silent", "silencer_last_word", "silencer_curse_of_the_silent"],
	"Skywrath Mage": ["skywrath_mage_concussive_shot", "skywrath_mage_arcane_bolt", "skywrath_mage_concussive_shot", "skywrath_mage_ancient_seal", "skywrath_mage_concussive_shot"],
	"Slardar": ["slardar_slithereen_crush", "slardar_bash", "slardar_bash", "slardar_sprint", "slardar_bash"],
	"Slark": ["slark_essence_shift", "slark_pounce", "slark_dark_pact", "slark_dark_pact", "slark_dark_pact"],
	"Snapfire": ["snapfire_scatterblast", "snapfire_firesnap_cookie", "snapfire_scatterblast", "snapfire_firesnap_cookie", "snapfire_scatterblast"],
	"Sniper": ["sniper_shrapnel", "sniper_headshot", "sniper_shrapnel", "sniper_take_aim", "sniper_shrapnel"],
	"Spectre": ["spectre_spectral_dagger", "spectre_dispersion", "spectre_spectral_dagger", "spectre_dispersion", "spectre_spectral_dagger"],
	"Spirit Breaker": ["spirit_breaker_charge_of_darkness", "spirit_breaker_greater_bash", "spirit_breaker_bulldoze", "spirit_breaker_greater_bash", "spirit_breaker_greater_bash"],
	"Storm Spirit": ["storm_spirit_static_remnant", "storm_spirit_overload", "storm_spirit_electric_vortex", "storm_spirit_static_remnant", "storm_spirit_static_remnant"],
	"Sven": ["sven_storm_bolt", "sven_warcry", "sven_great_cleave", "sven_great_cleave", "sven_great_cleave"],
	"Techies": ["techies_suicide", "techies_land_mines", "techies_land_mines", "techies_stasis_trap", "techies_land_mines"],
	"Templar Assassin": ["templar_assassin_psi_blades", "templar_assassin_refraction", "templar_assassin_refraction", "templar_assassin_psi_blades", "templar_assassin_refraction"],
	"Terrorblade": ["terrorblade_reflection", "terrorblade_metamorphosis", "terrorblade_metamorphosis", "terrorblade_conjure_image", "terrorblade_conjure_image"],
	"Tidehunter": ["tidehunter_anchor_smash", "tidehunter_gush", "tidehunter_anchor_smash", "tidehunter_kraken_shell", "tidehunter_anchor_smash"],
	"Timbersaw": ["shredder_whirling_death", "shredder_reactive_armor", "shredder_reactive_armor", "shredder_timber_chain", "shredder_reactive_armor"],
	"Tinker": ["tinker_heat_seeking_missile", "tinker_laser", "tinker_heat_seeking_missile", "tinker_laser", "tinker_heat_seeking_missile"],
	"Tiny": ["tiny_tree_grab", "tiny_avalanche", "tiny_avalanche", "tiny_avalanche", "tiny_toss", "tiny_avalanche"],
	"Treant Protector": ["treant_natures_grasp", "treant_leech_seed", "treant_natures_grasp", "treant_living_armor", "treant_natures_grasp"],
	"Troll Warlord": ["troll_warlord_whirling_axes_ranged" /* needs to be either 'melee' or 'ranged' */, "troll_warlord_berserkers_rage", "troll_warlord_fervor", "troll_warlord_whirling_axes_ranged"/* needs to be either 'melee' or 'ranged' */, "troll_warlord_whirling_axes_ranged"],
	"Tusk": ["tusk_tag_team", "tusk_ice_shards", "tusk_tag_team", "tusk_snowball", "tusk_tag_team"],
	"Underlord": ["abyssal_underlord_firestorm", "abyssal_underlord_atrophy_aura", "abyssal_underlord_firestorm", "abyssal_underlord_pit_of_malice", "abyssal_underlord_firestorm"],
	"Undying": ["undying_decay", "undying_soul_rip", "undying_soul_rip", "undying_tombstone", "undying_soul_rip"],
	"Ursa": ["ursa_fury_swipes", "ursa_earthshock", "ursa_fury_swipes", "ursa_overpower", "ursa_fury_swipes"],
	"Vengeful Spirit": ["vengefulspirit_magic_missile", "vengefulspirit_wave_of_terror", "vengefulspirit_magic_missile", "vengefulspirit_wave_of_terror", "vengefulspirit_magic_missile"],
	"Venomancer": ["venomancer_poison_sting", "venomancer_venomous_gale", "venomancer_poison_sting", "venomancer_venomous_gale", "venomancer_plague_ward"],
	"Viper": ["viper_nethertoxin", "viper_poison_attack", "viper_poison_attack", "viper_corrosive_skin", "viper_poison_attack"],
	"Visage": ["visage_grave_chill", "visage_gravekeepers_cloak", "visage_grave_chill", "visage_soul_assumption", "visage_grave_chill"],
	"Void Spirit": ["void_spirit_resonant_pulse", "void_spirit_aether_remnant", "void_spirit_resonant_pulse", "void_spirit_dissimilate", "void_spirit_resonant_pulse"],
	"Warlock": ["warlock_shadow_word", "warlock_fatal_bonds", "warlock_shadow_word", "warlock_fatal_bonds", "warlock_fatal_bonds"],
	"Weaver": ["weaver_shukuchi", "weaver_geminate_attack", "weaver_shukuchi", "weaver_the_swarm", "weaver_shukuchi"],
	"Windranger": ["windrunner_windrun", "windrunner_shackleshot", "windrunner_powershot", "windrunner_powershot", "windrunner_powershot"],
	"Winter Wyvern": ["winter_wyvern_arctic_burn", "winter_wyvern_splinter_blast", "winter_wyvern_splinter_blast", "winter_wyvern_cold_embrace", "winter_wyvern_splinter_blast"],
	"Witch Doctor": ["witch_doctor_paralyzing_cask", "witch_doctor_maledict", "witch_doctor_maledict", "witch_doctor_paralyzing_cask", "witch_doctor_maledict"],
	"Wraith King": ["skeleton_king_hellfire_blast", "skeleton_king_mortal_strike", "skeleton_king_vampiric_aura", "skeleton_king_vampiric_aura", "skeleton_king_vampiric_aura"],
	"Zeus": ["zuus_arc_lightning", "zuus_static_field", "zuus_arc_lightning", "zuus_lightning_bolt", "zuus_arc_lightning"]
}