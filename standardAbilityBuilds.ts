
/* Consistency requiremetns for names of abilities needs to be given with the following:
        1) OpenDota data (see openDotaAPI.ts; it is used for mana and cooldown information)
        2) file /img/ability/<ability>_hp1.jpg needs to be avaible (rename files according to OpenDotaAPI)
*/

export const ALL               = 'All'
export const IN_LANE           = 'InLane'
export const ROLE_CORE         = 'Core' // For mid, carry and offlane
export const ROLE_MID          = 'Mid'
export const ROLE_CARRY        = 'Carry'
export const ROLE_OFFLANE      = 'Offlane'
export const ROLE_SUPPORT      = 'Support' // For soft and hard support
export const ROLE_SUPPORT_SOFT = 'SoftSupport'
export const ROLE_SUPPORT_HARD = 'HardSupport'

// skilling attributes: 'special_bonus_attributes'
// Add build for 26 first abilities (incl. attributes)

export const standardAbilityBuilds = {
	"Abaddon": {
		builds: [
			{
				roles: [ROLE_OFFLANE],
				build: [
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_frostmourne" /* equals to 'curse of avernus' */},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_death_coil"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "special_bonus_unique_antimage_3"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_aphotic_shield"},
					//20.. items
				]
			},
			{
				roles: [ROLE_SUPPORT_HARD],
				build: [
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_frostmourne" /* equals to 'curse of avernus' */},
					{ ability: "abaddon_aphotic_shield"},
					{ ability: "abaddon_death_coil"},
					{ ability: "abaddon_aphotic_shield"}
					//.items
				]
			}
		],
		info: [ // Optional
			{ ability: "abaddon_aphotic_shield", info: ""},
			{ ability: "special_bonus_unique_antimage_3", info: ""},
			// Question, should we have info for each build at each level, or the infos be generic to the skills / telents, and only showed with first build?
		]
	},

	/*
COMMENT: ROLES CURRENTLY IN APP: (Same as role selection in Dota 2)
export const ROLE_MID          = 'Mid'
export const ROLE_CARRY        = 'Carry'
export const ROLE_OFFLANE      = 'Offlane'
export const ROLE_SUPPORT_SOFT = 'SoftSupport'
export const ROLE_SUPPORT_HARD = 'HardSupport'
*/

	"Alchemist": ["alchemist_acid_spray", "alchemist_goblins_greed",  "alchemist_acid_spray", "alchemist_goblins_greed", "alchemist_acid_spray"],
	"Ancient Apparition": ["ancient_apparition_chilling_touch", "ancient_apparition_cold_feet", "ancient_apparition_chilling_touch", "ancient_apparition_cold_feet", "ancient_apparition_ice_vortex"],
	"Anti-Mage": ["antimage_mana_break", "antimage_blink", "antimage_mana_break", "antimage_counterspell", "antimage_blink"],
	"Arc Warden": ["arc_warden_spark_wraith", "arc_warden_flux", "arc_warden_flux", "arc_warden_spark_wraith", "arc_warden_flux"],
	"Axe": ["axe_battle_hunger", "axe_counter_helix", "axe_counter_helix", "axe_berserkers_call", "axe_counter_helix"],
	"Bane": ["bane_brain_sap", "bane_nightmare", "bane_brain_sap", "bane_nightmare", "bane_brain_sap"],
	"Batrider": ["batrider_sticky_napalm", "batrider_firefly", "batrider_sticky_napalm", "batrider_flamebreak", "batrider_sticky_napalm"],
	"Beastmaster": ["beastmaster_call_of_the_wild_hawk", "beastmaster_inner_beast", "beastmaster_call_of_the_wild_hawk", "beastmaster_inner_beast", "beastmaster_call_of_the_wild_hawk"],
	"Bloodseeker": ["bloodseeker_blood_bath" /* equals to 'blood rite' */ , "bloodseeker_thirst", "bloodseeker_thirst", "bloodseeker_bloodrage", "bloodseeker_thirst"],
	"Bounty Hunter": ["bounty_hunter_wind_walk", "bounty_hunter_jinada", "bounty_hunter_shuriken_toss", "bounty_hunter_shuriken_toss", "bounty_hunter_shuriken_toss"],
	"Brewmaster": ["brewmaster_thunder_clap", "brewmaster_cinder_brew", "brewmaster_drunken_brawler", "brewmaster_thunder_clap", "brewmaster_thunder_clap"],
	"Bristleback": ["bristleback_quill_spray", "bristleback_bristleback", "bristleback_quill_spray", "bristleback_viscous_nasal_goo", "bristleback_quill_spray"],
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
	"Juggernaut": ["juggernaut_blade_fury", "juggernaut_blade_dance", "juggernaut_blade_fury", "juggernaut_healing_ward", "juggernaut_blade_fury"],
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