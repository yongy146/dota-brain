/*

	Comments on data:		
		- The app only displays the first 6 items per category
		- 'isCore' can be 'true' or 'false' ; core items are highlighted in the app and should not be omitted
		- The fields 'info' and 'isCore' are optional (so they can be ommitted in the variable "standardItemBuilds")

	Note: Names of items needs to be consisten with OpenDota data (see openDotaAPI.ts; see const "Items" is used for mana and cooldown information)

	COMMENTS:
	Need code for this items:
	tango, salve, mango, faerie_fire, branch, ward, sentry, stick, orb_of_venom, windlace, boots, wand, headress, basi, tranquil, arcane, quelling_blade, circle, gauntlets, ring_of_health, silver_edge, swift_blink, overwhelming_blink, bottle, 

    The OpenDota names of all items:
    blink	overwhelming_blink	swift_blink	arcane_blink	recipe_arcane_blink	recipe_swift_blink	recipe_overwhelming_blink	blades_of_attack	broadsword	chainmail	claymore	helm_of_iron_will	javelin	mithril_hammer	platemail	quarterstaff	quelling_blade	faerie_fire	infused_raindrop	wind_lace	ring_of_protection	stout_shield	moon_shard	gauntlets	slippers	mantle	branches	belt_of_strength	boots_of_elves	robe	circlet	crown	ogre_axe	blade_of_alacrity	staff_of_wizardry	ultimate_orb	gloves	blitz_knuckles	lifesteal	voodoo_mask	ring_of_regen	ring_of_tarrasque	sobi_mask	boots	gem	cloak	talisman_of_evasion	cheese	magic_stick	recipe_magic_wand	magic_wand	ghost	clarity	enchanted_mango	flask	dust	bottle	ward_observer	ward_sentry	ward_dispenser	tango	tango_single	courier	flying_courier	tpscroll	recipe_travel_boots	travel_boots	travel_boots_2	phase_boots	demon_edge	eagle	reaver	relic	hyperstone	ring_of_health	void_stone	mystic_staff	energy_booster	point_booster	vitality_booster	fluffy_hat	power_treads	grandmasters_glaive	recipe_hand_of_midas	hand_of_midas	oblivion_staff	recipe_witch_blade	witch_blade	pers	poor_mans_shield	satchel	recipe_bracer	bracer	recipe_wraith_band	wraith_band	recipe_null_talisman	null_talisman	recipe_mekansm	mekansm	recipe_vladmir	vladmir	recipe_buckler	buckler	recipe_ring_of_basilius	ring_of_basilius	recipe_holy_locket	holy_locket	recipe_pipe	pipe	recipe_urn_of_shadows	urn_of_shadows	recipe_headdress	headdress	sheepstick	recipe_orchid	orchid	recipe_bloodthorn	bloodthorn	echo_sabre	recipe_cyclone	cyclone	recipe_wind_waker	wind_waker	recipe_aether_lens	aether_lens	recipe_force_staff	force_staff	recipe_hurricane_pike	hurricane_pike	recipe_dagon	dagon	dagon_2	dagon_3	dagon_4	dagon_5	recipe_necronomicon	necronomicon	necronomicon_2	necronomicon_3	ultimate_scepter	recipe_ultimate_scepter_2	ultimate_scepter_2	ultimate_scepter_roshan	aghanims_shard	aghanims_shard_roshan	recipe_refresher	refresher	recipe_assault	assault	recipe_heart	heart	recipe_black_king_bar	black_king_bar	aegis	recipe_shivas_guard	shivas_guard	bloodstone	recipe_sphere	sphere	lotus_orb	recipe_meteor_hammer	meteor_hammer	nullifier	recipe_aeon_disk	aeon_disk	recipe_kaya	kaya	trident	combo_breaker	refresher_shard	recipe_spirit_vessel	spirit_vessel	vanguard	recipe_crimson_guard	crimson_guard	recipe_blade_mail	blade_mail	soul_booster	recipe_hood_of_defiance	hood_of_defiance	recipe_eternal_shroud	eternal_shroud	rapier	recipe_monkey_king_bar	monkey_king_bar	recipe_radiance	radiance	butterfly	recipe_greater_crit	greater_crit	recipe_basher	basher	bfury	recipe_manta	manta	recipe_lesser_crit	lesser_crit	dragon_lance	recipe_armlet	armlet	invis_sword	recipe_silver_edge	silver_edge	sange_and_yasha	kaya_and_sange	yasha_and_kaya	satanic	recipe_mjollnir	mjollnir	skadi	recipe_sange	sange	recipe_helm_of_the_dominator	helm_of_the_dominator	recipe_helm_of_the_overlord	helm_of_the_overlord	maelstrom	recipe_gungir	gungir	desolator	recipe_yasha	yasha	mask_of_madness	recipe_diffusal_blade	diffusal_blade	ethereal_blade	recipe_soul_ring	soul_ring	arcane_boots	octarine_core	orb_of_venom	blight_stone	recipe_orb_of_corrosion	orb_of_corrosion	recipe_falcon_blade	falcon_blade	recipe_mage_slayer	mage_slayer	recipe_ancient_janggo	ancient_janggo	medallion_of_courage	recipe_solar_crest	solar_crest	smoke_of_deceit	tome_of_knowledge	recipe_veil_of_discord	veil_of_discord	recipe_guardian_greaves	guardian_greaves	recipe_rod_of_atos	rod_of_atos	recipe_iron_talon	iron_talon	recipe_abyssal_blade	abyssal_blade	recipe_heavens_halberd	heavens_halberd	ring_of_aquila	tranquil_boots	shadow_amulet	recipe_glimmer_cape	glimmer_cape	river_painter	river_painter2	river_painter3	river_painter4	river_painter5	river_painter6	river_painter7	mutation_tombstone	super_blink	pocket_tower	pocket_roshan	keen_optic	grove_bow	quickening_charm	philosophers_stone	force_boots	desolator_2	phoenix_ash	seer_stone	greater_mango	elixer	vampire_fangs	craggy_coat	greater_faerie_fire	timeless_relic	mirror_shield	recipe_ironwood_tree	ironwood_tree	mango_tree	royal_jelly	pupils_gift	tome_of_aghanim	repair_kit	mind_breaker	third_eye	spell_prism	princes_knife	witless_shako	imp_claw	flicker	spy_gadget	spider_legs	helm_of_the_undying	vambrace	horizon	fusion_rune	ocean_heart	broom_handle	trusty_shovel	nether_shawl	dragon_scale	essence_ring	clumsy_net	enchanted_quiver	ninja_gear	illusionsts_cape	havoc_hammer	panic_button	apex	ballista	woodland_striders	recipe_trident	demonicon	recipe_fallen_sky	fallen_sky	pirate_hat	dimensional_doorway	ex_machina	faded_broach	paladin_sword	minotaur_horn	orb_of_destruction	the_leveller	arcane_ring	titan_sliver	chipped_vest	wizard_glass	gloves_of_travel	elven_tunic	cloak_of_flames	venom_gland	trickster_cloak	gladiator_helm	possessed_mask	ancient_perseverance	star_mace	penta_edged_sword	oakheart	warhammer	bullwhip	psychic_headband	ceremonial_robe	quicksilver_amulet	book_of_shadows	giants_ring	vengeances_shadow	stormcrafter	overflowing_elixir	mysterious_hat	diffusal_blade_2'

	I've considered build for main role for that hero.
 */

    export const itemBuilds = {
        // 1. Pos 5
        "Abaddon": {
            starting: [{item: "tango"}, {item: "flask" /* salve */}, {item: "enchanted_mango"}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}, {item: "wind_lace", info: "For extra mobility and if you are planning to go for Tranquil Boots."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "headdress"}, {item: "ring_of_basilius"}, {item: "tranquil_boots"}, {item: "arcane_boots"}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "solar_crest"}, {item: "force_staff"}, {item: "aether_lens"}, {item: "mekansm"}],
            late_game: [{item: "vladmir"}, {item: "ultimate_scepter"}],
            situational: [{item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "To silence spell heavy lineups with few ways to remove the silence."}],
        },
        // 2. Pos 1, 2
        "Alchemist": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "circlet"}, {item: "gauntlets"}, {item: "branches"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "ward_observer", info: "If you are playing midlane."}],
            early_game: [{item: "bracer"}, {item: "soul_ring"},  {item: "ring_of_health", info: "To solve hp sustain issues."}, {item: "magic_wand"}, {item: "phase_boots"}, {item: "power_treads"}],
            mid_game: [{item: "bfury", isCore: true}, {item: "sange_and_yasha", isCore: true},  {item: "assault", isCore: true}, {item: "blink"}, {item: "basher"}],
            late_game: [{item: "abyssal_blade"}, {item: "swift_blink"}, {item: "heart"}, {item: "ultimate_scepter", info: "To gift it to your teammates"}],
            situational: [{item: "bottle", info: "If you are playing mid Alchemist."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "For extra dispel and buff."}, {item: "mjollnir", info: "Against illusion based heroes."}, {item: "overwhelming_blink", info: "Against illusion based heroes."},  {item: "monkey_king_bar", info: "Against evasion."}, {item: "silver_edge", info: "To break passives."}],
        },
        // 3. Pos 5
        "Ancient Apparition": {
            starting: [{item: "tango"}, {item: "flask" /* salve */}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "headdress", info: "On a tough lane."}, {item: "blight_stone", info: "If expect double melee against you."}, {item: "wind_lace", info: "For extra mobility and if you are planning to go for Tranquil Boots."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "wind_lace"}],
            mid_game: [{item: "glimmer_cape"}, {item: "aghanims_shard", isCore: true}, {item: "force_staff"}, {item: "ghost"}, {item: "cyclone"}],
            late_game: [{item: "solar_crest"}, {item: "vladmir"}, {item: "aeon_disk"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}],
        },
        // 4. Pos 1
        "Anti-Mage": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "circlet"}, {item: "slippers"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}],
            early_game: [{item: "ring_of_health", info: "To solve hp sustain issues."}, {item: "wraith_band"}, {item: "magic_wand"}, {item: "power_treads", isCore: true}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "bfury", isCore: true}, {item: "manta", isCore: true}, {item: "basher", isCore: true}, {item: "skadi"}],
            late_game: [{item: "abyssal_blade", isCore: true}, {item: "satanic"}, {item: "butterfly"}, {item: "ultimate_scepter", info: "Great for causing chaos in the fights."}],
            situational: [{item: "black_king_bar", info: "Against a lot of disables and as a dispel."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "sphere", info: "Against powerful single target spells like Duel, Lasso, Hex or Doom."}, {item: "aghanims_shard", info: "Against heavy magical damage lineups."}, {item: "assault", info: "Against heavy armor reduction lineups."}]
        },
        // 5. Pos 1, 2
        "Arc Warden": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "slippers"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "ward_observer", info: "If you are playing midlane."}],
            early_game: [{item: "wraith_band"}, {item: "hand_of_midas", isCore: true}, {item: "boots"}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "travel_boots", isCore: true}, {item: "mjollnir", isCore: true}, {item: "dragon_lance", isCore: true}, {item: "hurricane_pike"}],
            late_game: [{item: "skadi"}, {item: "greater_crit"}, {item: "satanic"}, {item: "bloodthorn"}, {item: "travel_boots_2"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "silver_edge", info: "For break and greater splitpush/pick off potential."}, {item: "gungir", info: "For crowd control instead of Mjollnir."}, {item: "nullifier", info: "To dispel defensive spells and items."}]
        },
        // 6. Pos 3, 1
        "Axe": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "quelling_blade"}, {item: "ring_of_protection"}, {item: "branches"}, {item: "faerie_fire"}, {item: "bracer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "vanguard", isCore: true, info: "It can be disassembled."}, {item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "cloak"}],
            mid_game: [{item: "blink", isCore: true}, {item: "hood_of_defiance"}, {item: "blade_mail"}],
            late_game: [{item: "heart"}, {item: "assault"}, {item: "abyssal_blade"}, {item: "overwhelming_blink", info: "Against illusion, clones and summons."}],
            situational: [{item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "pipe"}, {item: "crimson_guard"}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "invis_sword", info: "For pick-offs and to guarantee a good initiation."}, {item: "manta", info: "As a farm accelerator."}]
        },
        // 7. Pos 5
        "Bane": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "wind_lace", info: "For extra mobility as Bane is great at setting up kills."}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "glimmer_cape"}, {item: "force_staff"}, {item: "ghost"}],
            late_game: [{item: "solar_crest"}, {item: "aeon_disk"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "black_king_bar", info: "To get a full duration Fiend's Grip off."}, {item: "aghanims_shard", info: "Against summons, illusions and to depush."}]
        },
        // 8. Pos 2, 3
        "Batrider": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "circlet"}, {item: "mantle"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "wind_lace", info: "For extra mobility to be able to close the gap."}],
            mid_game: [{item: "travel_boots", isCore: true}, {item: "blink", isCore: true}, {item: "aghanims_shard"}, {item: "aether_lens"},   {item: "force_staff"}, {item: "ghost"}, {item: "cyclone"}, {item: "kaya_and_sange"}],
            late_game: [{item: "octarine_core"}, {item: "shivas_guard"}, {item: "ethereal_blade"}, {item: "wind_waker"}],
            situational: [{item: "ward_observer", info: "If you are playing midlane."}, {item: "bottle", info: "Mainly for mid Batrider but can be consider on offlane too."}, {item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "To be able to get Flaming Lasso off and against a lot of disables, magical damage and as a dispel."}, {item: "aeon_disk"}, {item: "sphere", info: "Against single target disables."}]
        },
        // 9. Pos 3
        "Beastmaster": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "ring_of_protection"}, {item: "branches"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "helm_of_iron_will", info: "Solves your HP sustain issues and builds into Helm of the Dominator. Get it as early as possible."}, {item: "helm_of_the_dominator", isCore: true}, {item: "boots"}, {item: "ring_of_basilius"}, {item: "ancient_janggo", info: "It works well with summons and if you are grouping early as a team."}, {item: "magic_wand"}],
            mid_game: [{item: "vladmir", info: "Incorporates in Helm of the Overlord"}, {item: "helm_of_the_overlord", isCore: true}, {item: "aghanims_shard", isCore: true, info: "To improve vision game and gain another disable."}, {item: "solar_crest"}],
            late_game: [{item: "assault"}, {item: "ultimate_scepter", info: "Particularly good against illusion based heroes."}, {item: "refresher"}, {item: "octarine_core", info: "Goes well with Aghanim's Scepter build."}],
            situational: [{item: "blink", info: "To cast Primal Roar easier."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 10. Pos 1, 3
        "Bloodseeker": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "circlet"}, {item: "slippers"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}],
            early_game: [{item: "wraith_band"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "power_treads"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "rod_of_atos", info: "For offlane Bloodseeker mainly."}, {item: "maelstrom", isCore: true}, {item: "sange_and_yasha", isCore: true}, {item: "basher"}, {item: "skadi"}],
            late_game: [{item: "mjollnir"}, {item: "abyssal_blade"}, {item: "satanic"}, {item: "butterfly"}],
            situational: [{item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "manta", info: "Alternative to Sange and Yasha if you need to dispel something big."}, {item: "gungir", info: "Alternative to Mjollnir if you need AoE control."}, {item: "aghanims_shard", info: "Good against high HP targets and improves your dps."}]

        },
        /* "Bloodseeker Carry": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "circlet"}, {item: "slippers"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}],
            early_game: [{item: "wraith_band"}, {item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "sange_and_yasha", isCore: true}, {item: "aghanims_shard", isCore: true, info: "Great against high HP targets, improves your dps and sustain."}, {item: "basher"}, {item: "skadi"}],
            late_game: [{item: "mjollnir"}, {item: "satanic"}, {item: "abyssal_blade"}, {item: "butterfly"}],
            situational: [{item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "manta", info: "Alternative to Sange and Yasha if you need to dispel something big."}, {item: "gungir", info: "Alternative to Mjollnir if you need AoE control."}, {item: "monkey_king_bar", info: "Against evasion although Maelstrom/Mjollnir pierces evasion on proc already."}, {item: "sphere", info: "Against powerful single target spells like Duel, Lasso, Hex or Doom."}]
            
        },
        "Bloodseeker Offlane": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "circlet"}, {item: "slippers"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}],
            early_game: [{item: "wraith_band"}, {item: "phase_boots", isCore: true}, {item: "magic_wand"}, {item: "urn_of_shadows"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "rod_of_atos", isCore: true}, {item: "ultimate_scepter", isCore: true}, {item: "maelstrom"}, {item: "gungir"}, {item: "veil_of_discord"}, {item: "dagon", info: "Benefits from Bloodrage spell amp and acts as Linken's popper."}],
            late_game: [{item: "sheepstick"}, {item: "octarine_core"}, {item: "vladmir"}],
            situational: [{item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "cyclone", info: "For dispel, setup and teleport cancel."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "Good against high HP targets, improves your dps and sustain."}]
        }, */

        // 11. Pos 4, 5
        "Bounty Hunter": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "flask"}, {item: "faerie_fire"}],
            early_game: [{item: "tranquil_boots"}, {item: "wind_lace", info: "For extra movement speed to roam around."}, {item: "magic_wand"}, {item: "urn_of_shadows"}, {item: "arcane_boots"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "medallion_of_courage"}, {item: "solar_crest"}, {item: "ultimate_scepter", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "force_staff"}, {item: "cyclone"}, {item: "ghost"}],
            late_game: [{item: "sheepstick"}, {item: "octarine_core"}, {item: "vladmir"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "ancient_janggo", info: "If you are grouping up a lot as a team in midgame and if you have summons."}, {item: "pipe"}, {item: "lotus_orb", info: "For reflect, dispel(e.g. Dust of Appearance) and armor."}]
        },
        // 12. Pos 3
        "Brewmaster": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "quelling_blade"}, {item: "ring_of_protection"}, {item: "branches"}, {item: "faerie_fire"}, {item: "gauntlets"}, {item: "circlet"}, {item: "enchanted_mango"}, {item: "bracer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "urn_of_shadows", isCore: true, info: "The active of Urn activates Cinder Brew."}, {item: "magic_wand"}, {item: "soul_ring"}],
            mid_game: [{item: "ultimate_scepter", isCore: true}, {item: "blink", isCore: true}, {item: "aghanims_shard", info: "For an extra brewling and after you get Aghanim's Scepter."}],
            late_game: [{item: "refresher"}, {item: "assault"}, {item: "vladimir"}],
            situational: [ {item: "hand_of_midas", info: "If you can get it early."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "pipe"}, {item: "black_king_bar", info: "To be able to get Primal Split off and against a lot of disables, magical damage and as a dispel."}, {item: "aeon_disk", info: "To be able to get Primal Split off."}]
        },
        // 13. Pos 3, 1, 2
        "Bristleback": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "quelling_blade"}, {item: "enchanted_mango"}, {item: "gauntlets"}, {item: "branches"}, {item: "ring_of_protection"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "vanguard", isCore: true}, {item: "boots"}, {item: "soul_ring", isCore: true}, {item: "magic_wand"}, {item: "phase_boots"}, {item: "arcane_boots"}],
            mid_game: [{item: "hood_of_defiance"}, {item: "ultimate_scepter", isCore: true}, {item: "sange", info: "Can be used for Halberd or combined with Yasha"}, {item: "eternal_shroud"}, {item: "aghanims_shard", info: "For more Quill stacks and AoE slow."}, {item: "sange_and_yasha"}],
            late_game: [{item: "assault"}, {item: "abyssal_blade"}, {item: "shivas_guard"}],
            situational: [{item: "pipe", info: "Against heavy magical damage lineups."}, {item: "crimson_guard", info: "Against high attack speed heroes and multiple units."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "lotus_orb", info: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage, mana burn, breaks and as a dispel."}]
        },
        // 14. Pos 3, 2
        "Broodmother": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "quelling_blade"}, {item: "faerie_fire"}, {item: "ring_of_protection"}, {item: "branches"}, {item: "circlet"}, {item: "slippers"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "ward_observer", info: "If you are playing midlane."}],
            early_game: [{item: "soul_ring", isCore: true}, {item: "orb_of_corrosion"}, {item: "boots"}, {item: "arcane_boots", info: "For utility/aura build."}, {item: "power_treads", info: "For right-click build."},  {item: "magic_wand"}, {item: "wraith_band"}],
            mid_game: [{item: "hood_of_defiance", info: "For utility/aura build."}, {item: "pipe", info: "For utility/aura build."}, {item: "mekansm", info: "For utility/aura build."}, {item: "guardian_greaves", info: "For utility/aura build."}, {item: "ultimate_scepter"}, {item: "orchid"}, {item: "sange_and_yasha"}, {item: "basher"}, {item: "solar_crest", info: "For utility/aura build."}],
            late_game: [{item: "assault"}, {item: "sheepstick"}, {item: "aether_lens"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "Against illusion based heroes, summons and clones."}, {item: "aeon_disk"}]
        },
        // 15. Pos 3
        "Centaur Warrunner": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "quelling_blade"}, {item: "ring_of_protection"}, {item: "bracer"}, {item: "branches"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "vanguard", isCore: true}, {item: "boots"}, {item: "hood_of_defiance", isCore: true}, {item: "magic_wand"}, {item: "phase_boots"}],
            mid_game: [{item: "blink", isCore: true}, {item: "pipe"}, {item: "crimson_guard", info: "Against high attack speed heroes and multiple units."}, {item: "sange"}, {item: "aghanims_shard"}],
            late_game: [{item: "heart"}, {item: "overwhelming_blink"}],
            situational: [{item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "lotus_orb", info: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor."}, {item: "ultimate_scepter", info: "Against bursty lineups."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}]
        },
        // 16. Pos 1, 3
        "Chaos Knight": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "gauntlets"}, {item: "branches"}, {item: "enchanted_mango"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "power_treads", isCore: true}, {item: "bracer"}, {item: "soul_ring"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "armlet", isCore: true}, {item: "echo_sabre"}, {item: "blink", isCore: true}, {item: "sange_and_yasha"}, {item: "aghanims_shard"}, {item: "ultimate_scepter", info: "Mainly for offlane Chaos Knight"}],
            late_game: [{item: "overwhelming_blink"}, {item: "heart"}, {item: "assault"}, {item: "satanic"}, {item: "skadi"}],
            situational: [{item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "silver_edge", info: "For pick off potential and easier initiation."}]
        },
        // 17. Pos 5
        "Chen": {
            starting: [{item: "tango"}, {item: "headdress"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "faerie_fire"}, {item: "branches"}],
            early_game: [{item: "magic_wand"}, {item: "ring_of_basilius"}, {item: "boots"}, {item: "medallion_of_courage"}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "mekansm", isCore: true}, {item: "solar_crest", isCore: true}, {item: "guardian_greaves"}, {item: "glimmer_cape"}, {item: "force_staff"}, {item: "ancient_janggo", info: "If you are grouping up a lot as a team in midgame."}, {item: "vladmir"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "pipe"}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 18. Pos 1, 2
        "Clinkz": {
            starting: [{item: "tango"}, {item: "branches"}, {item: "slippers"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "blight_stone", info: "For carry Clinkz if you expect double melee against you."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "wraith_band"}, {item: "boots"}, {item: "power_treads"}, {item: "falcon_blade"}, {item: "medallion_of_courage"}, {item: "soul_ring"}],
            mid_game: [{item: "maelstrom"}, {item: "rod_of_atos"}, {item: "aghanims_shard"}, {item: "gungir"}, {item: "desolator"}, {item: "orchid"}, {item: "lesser_crit"}],
            late_game: [{item: "sheepstick"}, {item: "mjollnir"}, {item: "greater_crit"}, {item: "bloodthorn"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "sphere", info: "Against powerful single target spells like Duel, Lasso, Hex or Doom."}]
        },
        // 19. Pos 4, 5
        "Clockwerk": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "flask"}, {item: "wind_lace"}, {item: "faerie_fire"}, {item: "enchanted_mango"}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "urn_of_shadows"}],
            mid_game: [{item: "force_staff"}, {item: "hood_of_defiance"}, {item: "medallion_of_courage"}, {item: "solar_crest"}, {item: "blade_mail"}, {item: "ghost"}, {item: "ancient_janggo", info: "If you are grouping up a lot as a team in midgame and if you have summons."}],
            late_game: [{item: "ultimate_scepter", isCore: true}],
            situational: [{item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "pipe"}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 20. Pos 5
        "Crystal Maiden": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "faerie_fire"}, {item: "branches"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}],
            early_game: [{item: "tranquil_boots", isCore: true},  {item: "magic_wand"}, {item: "wind_lace"}],
            mid_game: [{item: "glimmer_cape", isCore: true}, {item: "force_staff"}, {item: "ghost"}, {item: "blink"}, {item: "aether_lens"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "To be able to channel Freezing Field fully."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "If you have Black King Bar already so that you can cast while channeling ulty."}]
        },
        // 21: Pos 3
        "Dark Seer": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "enchanted_mango"}, {item: "clarity"}, {item: "flask"}, {item: "mantle"}, {item: "branches"}, {item: "circlet"}],
            early_game: [{item: "soul_ring"}, {item: "boots"}, {item: "arcane_boots", isCore: true}, {item: "magic_wand"}, {item: "null_talisman"}],
            mid_game: [{item: "hood_of_defiance"}, {item: "pipe"}, {item: "mekansm"}, {item: "guardian_greaves"}, {item: "ultimate_scepter"}, {item: "blink"}, {item: "force_staff"}],
            late_game: [{item: "sheepstick"}, {item: "shivas_guard"}],
            situational: [{item: "bottle", info: "Another way to solve your sustain issues."}, {item: "infused_raindrop", info: "Against magical burst."}, {item: "aghanims_shard", info: "For extra disable."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "black_king_bar", info: "To be able to get your combo off."}, {item: "aeon_disk", info: "To be able to get your combo off."}]
        },
        // 22: Pos 4, 5
        "Dark Willow": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "flask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "branches"}, {item: "mantle"}, {item: "enchanted_mango"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "null_talisman"}, {item: "urn_of_shadows"}],
            mid_game: [{item: "cyclone", isCore: true}, {item: "blink"}, {item: "aether_lens"}, {item: "ghost"}, {item: "glimmer_cape"}, {item: "force_staff"}],
            late_game: [{item: "octarine_core"}, {item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "moon_shard", info: "If you have Aghanim's Scepter aready."}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "aghanims_shard", info: "For extra control."}]
        },
        // 23. Pos 3
        "Dawnbreaker": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "gauntlets"}, {item: "enchanted_mango"}, {item: "ring_of_protection"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "soul_ring"}, {item: "bracer"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "arcane_boots"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "echo_sabre"}, {item: "hood_of_defiance"}, {item: "basher"}, {item: "solar_crest"}, {item: "mekansm"}, {item: "guardian_greaves"}],
            late_game: [{item: "assault"}, {item: "overwhelming_blink", info: "To close the gap instantly and for some AoE damage."}],
            situational: [{item: "pipe"}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 24. Pos 5
        "Dazzle": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "blight_stone", info: "If you expect double melee against you."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}],
            mid_game: [{item: "medallion_of_courage"}, {item: "glimmer_cape"}, {item: "solar_crest"}, {item: "ghost"}, {item: "aghanims_shard", isCore: true}, {item: "aether_lens"}, {item: "force_staff"}, {item: "holy_locket"}, {item: "cyclone"}],
            late_game: [{item: "aeon_disk"}, {item: "vladmir"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "hand_of_midas", info: "If you can get it early on. Not advisable in most games."}]
        },
        // 25. Pos 2, 3
        "Death Prophet": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "mantle"}, {item: "ward_observer", info: "If you are playing mid Death Prophet."}, {item: "magic_stick", info: "For offlane Death Prophet if you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "If you are playing mid Death Prophet."}, {item: "null_talisman"}, {item: "boots"}, {item: "magic_wand"}, {item: "travel_boots"}, {item: "phase_boots"}],
            mid_game: [{item: "cyclone", isCore: true}, {item: "hood_of_defiance"}, {item: "kaya_and_sange"}, {item: "aether_lens"}, {item: "ghost"}],
            late_game: [{item: "shivas_guard"}, {item: "octarine_core"}, {item: "ultimate_scepter"}, {item: "refresher"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "So you can't be kited during Exorcism."}, {item: "lotus_orb", info: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor."}, {item: "aghanims_shard", info: "For more control and sustain."}]
        },
        // 26. Pos 5
        "Disruptor": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "faerie_fire"}, {item: "branches"}, {item: "sobi_mask"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "arcane_boots"}],
            mid_game: [{item: "glimmer_cape"}, {item: "solar_crest", info: "Goes well with Aghanim's Shard to buff your right-clicking core."}, {item: "aghanims_shard", info: "Goes well with Solar Crest to buff your right-clicking core."}, {item: "force_staff"}, {item: "ghost"}, {item: "aether_lens"}, {item: "veil_of_discord"}],
            late_game: [{item: "ultimate_scepter"}, {item: "aeon_disk"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "blink", info: "Allows you to land a multi-hero Static Storm especially once you have Aghanim's Scepter."}]
        },
        // 27. Pos 3, 2
        "Doom": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "faerie_fire"}, {item: "gauntlets"}, {item: "flask"}, {item: "ring_of_protection"}, {item: "bracer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "phase_boots", isCore: true},],
            mid_game: [{item: "blink", isCore: true}, {item: "hood_of_defiance"}, {item: "vanguard"}, {item: "ancient_janggo"}, {item: "kaya_and_sange"}],
            late_game: [{item: "shivas_guard"}, {item: "refresher"}, {item: "arcane_blink"}, {item: "octarine_core"}, {item: "assault"}],
            situational: [{item: "ward_observer", info: "If you are playing mid Doom."}, {item: "bottle", info: "If you are playing mid Doom."}, {item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "To be able to initiate and get Doom off."}, {item: "aghanims_shard", info: "For extra damage and control."}, {item: "ultimate_scepter", info: "For break effect."}]
        },
        // 28. Pos 3, 2
        "Dragon Knight": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "soul_ring"}, {item: "bracer"}, {item: "power_treads", isCore: true}],
            mid_game: [{item: "blink", isCore: true}, {item: "hood_of_defiance"}, {item: "sange_and_yasha"}, {item: "lesser_crit"}, {item: "armlet"}],
            late_game: [{item: "ultimate_scepter"}, {item: "assault"}, {item: "satanic"}, {item: "greater_crit"}],
            situational: [{item: "ward_observer", info: "If you are playing mid Dragon Knight."}, {item: "bottle", info: "If you are playing mid Dragon Knight."}, {item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "aghanims_shard", info: "For more AoE damage."}]
        },
        // 29. Pos 1
        "Drow Ranger": {
            starting: [{item: "tango"}, {item: "slippers"}, {item: "circlet"}, {item: "branches"}, {item: "quelling_blade"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "wraith_band"}, {item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "ring_of_basilius"}],
            mid_game: [{item: "dragon_lance", isCore: true}, {item: "yasha", isCore: true}, {item: "manta"}, {item: "blink"}, {item: "hurricane_pike"}, {item: "sange_and_yasha"}, {item: "lesser_crit"}],
            late_game: [{item: "skadi"}, {item: "butterfly"}, {item: "greater_crit"}, {item: "satanic"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "To offset healing."}, {item: "silver_edge", info: "For break effect and to be able to position nicely."}, {item: "aeon_disk"}]
        },
        // 30. Pos 4
        "Earth Spirit": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}, {item: "circlet"}, {item: "ring_of_protection"}, {item: "enchanted_mango"}, {item: "faerie_fire"}, {item: "boots", info: "If you are looking to hijack the second wave, roam a lot and camps."}, {item: "sobi_mask"}, {item: "branches"}],
            early_game: [{item: "urn_of_shadows"}, {item: "tranquil_boots", isCore: true}, {item: "magic_wand"}],
            mid_game: [{item: "cyclone"}, {item: "ghost"}, {item: "aghanims_shard"}, {item: "veil_of_discord"}, {item: "blade_mail"}],
            late_game: [{item: "ethereal_blade"}, {item: "ultimate_scepter"}, {item: "blink", info: "Goes well with Aghanim's Scepter."}, {item: "aeon_disk"}],
            situational: [{item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "black_king_bar", info: "To be able to initiate and get long Magnetize off."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 31. Pos 4
        "Earthshaker": {
            starting: [{item: "boots"}, {item: "clarity"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "ring_of_basilius"}],
            early_game: [{item: "tranquil_boots"}, {item: "magic_wand"}, {item: "wind_lace"}, {item: "soul_ring"}],
            mid_game: [{item: "blink", isCore: true}, {item: "cyclone"}, {item: "invis_sword"}, {item: "aghanims_shard"}, {item: "force_staff"}, {item: "ghost"}, {item: "aether_lens"}],
            late_game: [{item: "ultimate_scepter"}, {item: "octarine_core"}, {item: "aeon_disk"}],
            situational: [{item: "black_king_bar", info: "To be able to initiate and do your stun combo."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 32. Pos 5, 4
        "Elder Titan": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "flask"}, {item: "wind_lace"}, {item: "faerie_fire"},  {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "ring_of_basilius"}, {item: "urn_of_shadows"}],
            mid_game: [ {item: "medallion_of_courage"}, {item: "solar_crest"}, {item: "ghost"}, {item: "glimmer_cape"}, {item: "force_staff"}, {item: "veil_of_discord"}, {item: "cyclone"}],
            late_game: [{item: "ultimate_scepter"}, {item: "aeon_disk"}],
            situational: [{item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 33. Pos 2
        "Ember Spirit": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}],
            early_game: [{item: "bottle"}, {item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "orb_of_corrosion"}, {item: "urn_of_shadows"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "ultimate_scepter"}, {item: "travel_boots"}, {item: "kaya_and_sange"}, {item: "cyclone"}, {item: "desolator"}],
            late_game: [{item: "refresher"}, {item: "aeon_disk"}, {item: "shivas_guard"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "Adds to damage output and allows you to snowball in the fights."}]
        },
        // 34. Pos 5, 4
        "Enchantress": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "ward_observer"}, {item: "blight_stone"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "branches"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "power_treads"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "cloak"}],
            mid_game: [{item: "dragon_lance"}, {item: "medallion_of_courage"}, {item: "solar_crest"}, {item: "force_staff"}, {item: "hurricane_pike"}, {item: "holy_locket"}, {item: "glimmer_cape"}, {item: "hood_of_defiance"}, {item: "ghost"}],
            late_game: [{item: "moon_shard"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "pipe"}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "witch_blade", info: "Cost-effective dps item if you can get it early."}, {item: "aghanims_shard", info: "For additional healing. Fits well with Holy Locket."}]
        },
        // 35. Pos 3, 4
        "Enigma": {
            starting: [{item: "tango"}, {item: "null_talisman"}, {item: "enchanted_mango"}, {item: "clarity"}, {item: "circlet"}, {item: "mantle"}, {item: "sobi_mask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block the pull camps."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "arcane_boots", isCore: true}, {item: "soul_ring"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}],
            mid_game: [{item: "blink", isCore: true}, {item: "black_king_bar", info: "To be able to channel Black Hole.", isCore: true}, {item: "aether_lens"}, {item: "hood_of_defiance"}, {item: "mekansm"}, {item: "guardian_greaves"}, {item: "solar_crest"}],
            late_game: [{item: "refresher"}, {item: "aeon_disk"}, {item: "arcane_blink"}, {item: "octarine_core"}, {item: "travel_boots"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "hand_of_midas", info: "If you can get it early."}, {item: "pipe"}, {item: "sphere", info: "Against spell immunity piercing disables that prevent you from channeling Black Hole."}, {item: "aghanims_shard", info: "For extra control."}]
        },
        // 36. Pos 1
        "Faceless Void": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "slippers"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "sange_and_yasha"}, {item: "mjollnir"}, {item: "manta"}, {item: "diffusal_blade", info: "Goes well with Manta Style."}],
            late_game: [{item: "skadi"}, {item: "satanic"}, {item: "butterfly"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "For extra mobility."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 37. Pos 5, 4
        "Grimstroke": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "branches"}, {item: "circlet"}, {item: "sobi_mask"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "magic_wand"}, {item: "tranquil_boots"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "null_talisman"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "blink"}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "force_staff"}, ],
            late_game: [{item: "ultimate_scepter"}, {item: "aeon_disk"}, {item: "ethereal_blade"}, {item: "octarine_core"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "dagon", info: "For extra burst."}]
        },
        // 38. Pos 1
        "Gyrocopter": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "slippers"}, {item: "circlet"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "ring_of_basilius"}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "dragon_lance", info: "Can be disasembled for Ogre Axe that can be used for next item."}, {item: "ultimate_scepter", isCore: true}, {item: "sange_and_yasha"}, {item: "lesser_crit"}],
            late_game: [{item: "satanic", isCore: true}, {item: "butterfly"}, {item: "greater_crit"}, {item: "skadi"}, {item: "mjollnir"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 39. Pos 4, 5
        "Hoodwink": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "blight_stone"}, {item: "branches"}, {item: "circlet"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "urn_of_shadows"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "force_staff"}, {item: "solar_crest"}, {item: "glimmer_cape"}, {item: "veil_of_discord"}, {item: "ghost"}, {item: "cyclone"}, {item: "maelstrom"}, {item: "rod_of_atos"}, {item: "gungir"}],
            late_game: [{item: "ultimate_scepter"}, {item: "octarine_core"}, {item: "aeon_disk"}, {item: "kaya"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "blink", info: "To close the gap and land your combo."}]
        },
        // 40. Pos 2
        "Huskar": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "gauntlets"}, {item: "branches"}, {item: "bracer"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bracer"}, {item: "boots"}, {item: "armlet", isCore: true}, {item: "phase_boots"}, {item: "magic_wand"}],
            mid_game: [{item: "sange", isCore: true}, {item: "ultimate_scepter"}, {item: "hood_of_defiance"}, {item: "dragon_lance"}, {item: "sange_and_yasha"}, {item: "ghost"}],
            late_game: [{item: "assault"}, {item: "satanic", isCore: true}],
            situational: [ {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "To offset healing and disarm the opponents."}, {item: "hurricane_pike", info: "To disengage from heroes like Slark and Troll."}]
        },
        // 41. Pos 2
        "Invoker": {
            starting: [{item: "tango"}, {item: "mantle"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "null_talisman"}, {item: "urn_of_shadows", info: "For QW build to proc Cold Snap.", isCore: true}, {item: "boots"}, {item: "hand_of_midas", info: "Especially for QE build.", isCore: true}, {item: "magic_wand"}],
            mid_game: [{item: "travel_boots", info: "Especially for QE build.", isCore: true}, {item: "ultimate_scepter", isCore: true}, {item: "witch_blade", info: "For QW build to proc Cold Snap."}, {item: "orchid", info: "For QW build."}, {item: "force_staff"}],
            late_game: [{item: "sheepstick"}, {item: "refresher"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "For QW build against heavy healing lineup."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap and land your spell combo."}, {item: "aeon_disk"}, {item: "aghanims_shard", info: "For extra AoE damage."}]
        },
        // 42. Pos 5, 4
        "Io": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "headdress"}, {item: "branches"}, {item: "ring_of_regen"}, {item: "bracer"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "soul_ring"}, {item: "bottle"}, {item: "urn_of_shadows"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}],
            mid_game: [{item: "mekansm", isCore: true}, {item: "holy_locket"}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "hood_of_defiance"}, {item: "solar_crest"}],
            late_game: [{item: "aeon_disk"}, {item: "heart"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "pipe"}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "For extra control."}]
        },
        // 43. Pos 5
        "Jakiro": {
            starting: [{item: "tango"}, {item: "enchanted_mango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "clarity"}, {item: "sobi_mask"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "arcane_boots"}, {item: "wind_lace"}],
            mid_game: [{item: "cyclone"}, {item: "force_staff"}, {item: "ghost"}, {item: "aghanims_shard", isCore: true}, {item: "veil_of_discord"}, {item: "glimmer_cape"}, {item: "aether_lens"}, {item: "mekansm"}],
            late_game: [{item: "aeon_disk"}, {item: "blink"}, {item: "ultimate_scepter"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 44. Pos 1
        "Juggernaut": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "slippers"}, {item: "branches"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "phase_boots"}, {item: "power_treads"}, {item: "wraith_band"}, {item: "magic_wand"}],
            mid_game: [{item: "maelstrom"}, {item: "manta"}, {item: "sange_and_yasha"}, {item: "ultimate_scepter"}, {item: "basher"}, {item: "bfury"}, {item: "diffusal_blade", info: "Goes well with Manta Style."}],
            late_game: [{item: "skadi"}, {item: "butterfly"}, {item: "mjollnir"}, {item: "satanic"}, {item: "abyssal_blade"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "blink", info: "To close the gap."}, {item: "aghanims_shard", info: "Against lineups heavy on magic damage and disables."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 45. Pos 5, 4
        "Keeper of the Light": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "wind_lace"}, {item: "faerie_fire"}, {item: "boots"}, {item: "branches"}, {item: "clarity"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "urn_of_shadows"}],
            mid_game: [{item: "glimmer_cape"}, {item: "force_staff"}, {item: "ghost"}, {item: "solar_crest"}, {item: "holy_locket", info: "Goes well with Mekansm."}, {item: "mekansm", info: "Goes well with Holy Locket."}, {item: "veil_of_discord"}],
            late_game: [{item: "ultimate_scepter", isCore: true}, {item: "aeon_disk"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "For extra mobility of your heroes."}, {item: "blink", info: "Helps with splitpush and lining up your spells."}]
        },
        // 46. Pos 2, 3
        "Kunkka": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "gauntlets"}, {item: "branches"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "bracer"}, {item: "ring_of_protection"}, {item: "ward_observer", info: "If you are playing midlane Kunkka."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "If you are playing midlane Kunkka."}, {item: "phase_boots", isCore: true}, {item: "bracer"}, {item: "magic_wand"}, {item: "urn_of_shadows", info: "If you are planning for Spirit Vessel."}],
            mid_game: [{item: "armlet", info: "For right-click build."}, {item: "hood_of_defiance", info: "For utility build."}, {item: "solar_crest", info: "For utility build."}, {item: "sange"}, {item: "sange_and_yasha", info: "For right-click build."}, {item: "lesser_crit", info: "For right-click build."}, {item: "ultimate_scepter", info: "For utility build."}, {item: "echo_sabre", info: "Can be disassembled. For right-click build."}, {item: "orchid", info: "For right-click build."}],
            late_game: [{item: "assault", info: "For right-click build."}, {item: "greater_crit", info: "For right-click build."}, {item: "sheepstick", info: "For utility build."}],
            situational: [{item: "spirit_vessel", info: "Against heavy healing lineup. For utility build."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers. For utility build."}, {item: "pipe", info: "For utility build."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "Combines well with X Marking yourself to do Tidebringer hits. For right-click build."}, {item: "aghanims_shard", info: "To reposition enemies. For utility build."}]
        },
        // 47. Pos 3
        "Legion Commander": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "quelling_blade"}, {item: "gauntlets"}, {item: "branches"}, {item: "ring_of_protection"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "circlet"}, {item: "bracer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "phase_boots", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "soul_ring"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "blink", isCore: true}, {item: "armlet", info: "Usually better than Blade Mail."}, {item: "blade_mail", info: "Good against high dps right-clickers."}, {item: "hood_of_defiance"}, {item: "sange"}, {item: "solar_crest"}],
            late_game: [{item: "assault"}, {item: "invis_sword"}, {item: "overwhelming_blink", info: "To tank up and for AoE damage."}, {item: "swift_blink", info: "For single target burst."}, {item: "ultimate_scepter"}, {item: "moon_shard"}],
            situational: [{item: "pipe"}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers and to pop Linken's Sphere."}, {item: "aghanims_shard", info: "For hard dispel."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 48. Pos 2, 3, 4
        "Leshrac": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "mantle"}, {item: "flask"}, {item: "boots", info: "If you are playing support Leshrac."}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp if you are playing support Leshrac."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "If you are playing midlane Leshrac."}, {item: "null_talisman"}, {item: "boots"}, {item: "magic_wand"}, {item: "travel_boots", info: "If you are playing mid Leshrac.", isCore: true}, {item: "arcane_boots", info: "For offlane or support. Can be disassembled.", isCore: true}, {item: "bracer"}, {item: "urn_of_shadows"}],
            mid_game: [{item: "cyclone", isCore: true}, {item: "kaya", isCore: true}, {item: "kaya_and_sange"}, {item: "bloodstone"}, {item: "black_king_bar", info: "To be able to stay in the middle of the fight."}, {item: "ghost"}, {item: "hood_of_defiance"}, {item: "eternal_shroud"}, {item: "mekansm", info: "If you are playing offlane or support Leshrac."}, {item: "guardian_greaves", info: "If you are playing offlane or support Leshrac."}, {item: "aether_lens", info: "If you are playing support Leshrac."}, {item: "glimmer_cape", info: "If you are playing support Leshrac."}, {item: "force_staff", info: "If you are playing support Leshrac."}],
            late_game: [{item: "shivas_guard"}, {item: "aeon_disk"}, {item: "sheepstick"}, {item: "wind_waker"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "aghanims_shard", info: "For extra control."}, {item: "lotus_orb", info: "For reflect, dispel and armor. If you are playing offlane or support Leshrac."}, {item: "blink", info: "To jump in the middle of the fight."}]
        },
        // 49. Pos 5
        "Lich": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "clarity"}, {item: "branches"}, {item: "faerie_fire"}, {item: "sobi_mask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner also uses a lot of mana early."}, {item: "arcane_boots"}, {item: "urn_of_shadows"}],
            mid_game: [{item: "glimmer_cape"}, {item: "force_staff"}, {item: "ghost"}, {item: "aether_lens"}, {item: "solar_crest"}],
            late_game: [{item: "aeon_disk"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "For extra control and potential to burst a secluded enemy hero with Chain Frost."}, {item: "blink", info: "Goes well with Aghanim's Shard to burst a single hero. Good at canceling channeling spells."}]
        },
        // 50. Pos 1
        "Lifestealer": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "circlet"}, {item: "gauntlets"}, {item: "branches"}, {item: "faerie_fire"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "phase_boots", isCore: true}, {item: "armlet", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "sange"}, {item: "sange_and_yasha"}, {item: "basher"}, {item: "maelstrom"}, {item: "desolator"}],
            late_game: [{item: "assault"}, {item: "satanic"}, {item: "abyssal_blade"}, {item: "greater_crit"}, {item: "mjollnir"}],
            situational: [{item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive spells and items."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap."}]
        },
        // 51. Pos 2, 4
        "Lina": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "mantle"}, {item: "branches"}, {item: "enchanted_mango"}, {item: "flask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "If you are playing support Lina to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "blight_stone", info: "If you are playing support Lina."}],
            early_game: [{item: "bottle", info: "If you are playing midlane Lina."}, {item: "null_talisman"}, {item: "boots"}, {item: "travel_boots", info: "If you are playing midlane Lina.", isCore: true}, {item: "arcane_boots", info: "If you are playing support Lina.", isCore: true}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If you are playing support Lina and your laning partner uses a lot of mana early."}],
            mid_game: [{item: "cyclone", isCore: true}, {item: "aether_lens", info: "If you are playing support Lina.", isCore: true}, {item: "lesser_crit", info: "If you are playing midlane Lina."}, {item: "force_staff"}, {item: "hurricane_pike", info: "If you are playing midlane Lina."}, {item: "invis_sword", info: "If you are playing midlane Lina."}],
            late_game: [{item: "ultimate_scepter", info: "If you are playing support Lina."}, {item: "greater_crit", info: "If you are playing midlane Lina."}, {item: "satanic", info: "If you are playing midlane Lina."}, {item: "sheepstick"}, {item: "skadi", info: "If you are playing midlane Lina."}, {item: "aeon_disk"}, {item: "assault", info: "If you are playing midlane Lina."}, {item: "octarine_core", info: "If you are playing support Lina."}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "monkey_king_bar", info: "If you are playing midlane Lina against evasion."}, {item: "blink", info: "To be able to reposition quickly."}, {item: "sphere", info: "If you are playing midlane Lina against powerful single target disables or nukes."}, {item: "aghanims_shard", info: "If you are playing support Lina for extra AoE damage. Goes well with Aghanim's Scepter."}]
        },
        // 52. Pos 4, 5
        "Lion": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "boots"}, {item: "faerie_fire"}, {item: "branches"}, {item: "wind_lace"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "wind_lace"}],
            mid_game: [{item: "blink", isCore: true}, {item: "aether_lens"}, {item: "force_staff"}, {item: "ghost"}, {item: "glimmer_cape"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "aghanims_shard", info: "Especially good against low mana pool heroes and illusions."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 53. Pos 2
        "Lone Druid": {
            starting: [{item: "tango"}, {item: "branches"}, {item: "ward_observer"}, {item: "quelling_blade", info: "On pet."}, {item: "orb_of_venom", info: "On pet."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "phase_boots", info: "On pet.", isCore: true}, {item: "orb_of_corrosion", info: "On pet."}, {item: "tranquil_boots", info: "On hero."}],
            mid_game: [{item: "mask_of_madness", info: "On pet.", isCore: true}, {item: "maelstrom", info: "On pet."}, {item: "desolator", info: "On pet."}, {item: "basher", info: "On pet.", isCore: true}, {item: "solar_crest", info: "On hero to buff pet."}],
            late_game: [{item: "mjollnir", info: "On pet."}, {item: "assault", info: "On pet."}, {item: "moon_shard", info: "On pet."}, {item: "abyssal_blade", info: "On pet."}, {item: "aeon_disk", info: "On hero."}, {item: "refresher", info: "On hero."}, {item: "vladmir", info: "On hero to buff pet."}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "ultimate_scepter", info: "Amazing for splitpushing and ratting."}, {item: "black_king_bar", info: "On bear against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "To buff allies and dispel."}]
        },
        // 54. Pos 1
        "Luna": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "slippers"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "mask_of_madness", isCore: true}],
            mid_game: [{item: "dragon_lance", info: "Can be disassembled.", isCore: true}, {item: "yasha", isCore: true}, {item: "manta"}, {item: "sange_and_yasha"}, {item: "aghanims_shard", isCore: true}, {item: "lesser_crit"}],
            late_game: [{item: "satanic"}, {item: "butterfly"}, {item: "skadi"}, {item: "greater_crit"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "hurricane_pike", info: "To disengage from heroes like Slark and Troll."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "ultimate_scepter", info: "Great at bursting backliners."}]
        },
        // 55. Pos 1, 3
        "Lycan": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "ring_of_protection"}, {item: "flask"}, {item: "crown", info: "For offlane Lycan to rush Helm of Dominator."}, {item: "sobi_mask"}, {item: "enchanted_mango"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "armlet", info: "If you are playing carry Lycan.", isCore: true}, {item: "boots", info: "If you are playing offlane Lycan you can stay on brown boots."}, {item: "power_treads", isCore: true}, {item: "helm_of_the_dominator", info: "If you are playing offlane Lycan.", isCore: true}, {item: "ring_of_basilius", info: "If you are playing offlane Lycan."}, {item: "soul_ring", info: "If you are playing offlane Lycan."}, {item: "bracer"}],
            mid_game: [{item: "echo_sabre", info: "If you are playing carry Lycan. Can be disassembled.", isCore: true}, {item: "desolator", info: "If you are playing carry Lycan."}, {item: "basher", info: "If you are playing carry Lycan."}, {item: "ultimate_scepter", info: "If you are playing offlane Lycan."}, {item: "vladmir", info: "If you are playing offlane Lycan."}],
            late_game: [{item: "satanic", info: "If you are playing carry Lycan."}, {item: "assault"}, {item: "abyssal_blade", info: "If you are playing carry Lycan."}, {item: "moon_shard", info: "If you are playing carry Lycan."}, {item: "sheepstick", info: "If you are playing offlane Lycan."}],
            situational: [{item: "hand_of_midas", info: "If you are playing carry Lycan and you can get it early."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "abyssal_blade"}, {item: "monkey_king_bar", info: "If you are playing carry Lycan against evasion."}, {item: "nullifier", info: "If you are playing carry Lycan to dispel defensive spells and items."}, {item: "blink", info: "If you are playing carry Lycan to gap close."}]
        },
        // 56. Pos 3, 2, 1
        "Magnus": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "gauntlets"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "ring_of_protection"}, {item: "circlet"}, {item: "bracer"}, {item: "ward_observer", info: "If you are playing midlane Magnus."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "power_treads", info: "If you are playing right-clicking Magnus.", isCore: true}, {item: "arcane_boots", info: "If you are playing utility Magnus.", isCore: true}, {item: "bottle", info: "If you are playing midlane Magnus."}, {item: "magic_wand"}, {item: "bracer"}, {item: "soul_ring"}, {item: "mask_of_madness", info: "If you are playing right-clicking Magnus."}],
            mid_game: [{item: "blink", isCore: true}, {item: "echo_sabre", info: "If you are playing right-clicking Magnus.", isCore: true}, {item: "lesser_crit", info: "If you are playing right-clicking Magnus."}, {item: "orchid", info: "If you are playing right-clicking Magnus."}, {item: "basher", info: "If you are playing right-clicking Magnus."}, {item: "force_staff", info: "If you are playing utility Magnus."}, {item: "aether_lens", info: "If you are playing utility Magnus."}, {item: "ghost", info: "If you are playing utility Magnus."}, {item: "mekansm", info: "If you are playing utility Magnus."}, {item: "guardian_greaves", info: "If you are playing utility Magnus."}],
            late_game: [{item: "assault", info: "If you are playing right-clicking Magnus."}, {item: "satanic", info: "If you are playing right-clicking Magnus."}, {item: "refresher", info: "If you are playing utility Magnus."}, {item: "greater_crit", info: "If you are playing right-clicking Magnus."}, {item: "bloodthorn", info: "If you are playing right-clicking Magnus."}, {item: "abyssal_blade", info: "If you are playing right-clicking Magnus."}, {item: "swift_blink", info: "If you are playing right-clicking Magnus for single target burst."}, {item: "overwhelming_blink", info: "If you are playing right-clicking Magnus for extra AoE damage and to tank up."}, {item: "octarine_core", info: "If you are playing utility Magnus."}],
            situational: [{item: "blink"}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "If you are playing utility Magnus for extra control and to set up Skewer."}, {item: "invis_sword", info: "If you are playing utility Magnus to get Reverse Polarity off easier."}, {item: "lotus_orb", info: "If you are playing utility Magnus for reflect, dispel and armor."}, {item: "monkey_king_bar", info: "If you are playing right-clicking Magnus against evasion."}]
        },
        // XXX. Pos 3, 4, 2, 1, 5
        "Marci": {
            starting: [{item: "tango"}, {item: "quelling_blade", info: "For core Marci."}, {item: "branches"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "flask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "If you are playing support Marci to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}, {item: "orb_of_venom", info: "If you can pressure on the lane."}],
            early_game: [{item: "boots"}, {item: "phase_boots", isCore: true}, {item: "arcane_boots", info: "If you are playing support utility Marci."}, {item: "bottle", info: "If you are playing midlane Marci."}, {item: "magic_wand"}, {item: "soul_ring"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "medallion_of_courage", info: "For support utility Marci."}, {item: "power_treads", info: "For carry Marci usually paired with Battle Fury."}, {item: "bracer"}],
            mid_game: [{item: "armlet", isCore: true, info: "For core Marci."}, {item: "basher", isCore: true, info: "For core Marci."}, {item: "blink", isCore: true, info: "For instant gap close to deliver damage with Unleash or disable with Dispose."}, {item: "lesser_crit", info: "For core Marci."}, {item: "solar_crest", isCore: true, info: "For support utility Marci."}, {item: "bfury", info: "For carry Marci."}, {item: "sange_and_yasha", info: "For carry Marci."}],
            late_game: [{item: "greater_crit", info: "For core Marci."}, {item: "satanic", info: "For core Marci."}, {item: "skadi"}, {item: "overwhelming_blink", info: "For core Marci."}],
            situational: [{item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "monkey_king_bar", info: "Against evasion for core Marci."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "nullifier", info: "To dispel defensive spells and items for core Marci."}, {item: "silver_edge", info: "For core Marci for break effect and to close the gap."}]
        },
        // 57. Pos 3
        "Mars": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "ring_of_protection"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "circlet"}, {item: "bracer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "soul_ring"}, {item: "phase_boots", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "bottle", info: "To sustain yourself if your midlaner isn't buying it."}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "blink", isCore: true}, {item: "desolator"}, {item: "cyclone"}, {item: "hood_of_defiance"}, {item: "solar_crest"}, {item: "vladmir"}],
            late_game: [{item: "assault"}, {item: "satanic"}, {item: "overwhelming_blink"}, {item: "shivas_guard"}],
            situational: [{item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "Against illusion or clone based heroes."}, {item: "lotus_orb", info: "If you are playing utility Magnus for reflect, dispel and armor."}]
        },
        // 58. Pos 1
        "Medusa": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "slippers"}, {item: "branches"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "mask_of_madness"}],
            mid_game: [{item: "yasha", isCore: true}, {item: "dragon_lance", info: "Can be disassembled.", isCore: true}, {item: "manta"}, {item: "sange_and_yasha"}, {item: "ultimate_scepter", info: "Goes well with Aghanim's Shard."}, {item: "lesser_crit"}],
            late_game: [{item: "skadi", isCore: true}, {item: "greater_crit"}, {item: "butterfly"}, {item: "satanic"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "Goes well with Aghanim's Scepter and Mysic Snake talents."}, {item: "hurricane_pike", info: "To disengage from heroes like Slark and Troll."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "swift_blink", info: "To jump in the middle of the fight with Split Shot and Stone Gaze on."}]
        },
        // 59. Pos 2
        "Meepo": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "ward_observer"}, {item: "circlet"}, {item: "branches"}, {item: "faerie_fire"}],
            early_game: [{item: "boots"}, {item: "power_treads"}, {item: "dragon_lance", isCore: true}, {item: "travel_boots"}, {item: "wraith_band"}],
            mid_game: [{item: "dragon_lance", isCore: true}, {item: "blink", isCore: true}, {item: "sheepstick", isCore: true}, {item: "ethereal_blade", isCore: true}, {item: "manta"}],
            late_game: [{item: "ethereal_blade", isCore: true}, {item: "skadi"}, {item: "heart"}],
            situational: [{item: "aghanims_shard", info: "For extra mobility."}, {item: "ultimate_scepter", info: "As a save and dispel."}]
        },
        // 60. Pos 4
        "Mirana": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "branches"}, {item: "flask"}, {item: "ring_of_protection", info: "For Urn of Shadows."}, {item: "sobi_mask", info: "For Urn of Shadows."}, {item: "clarity"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "arcane_boots"}, {item: "urn_of_shadows"}, {item: "tranquil_boots"}, {item: "wraith_band"}],
            mid_game: [{item: "cyclone"}, {item: "mekansm"}, {item: "guardian_greaves"}, {item: "force_staff"}, {item: "ghost"}, {item: "solar_crest"}, {item: "rod_of_atos"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "ethereal_blade"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "blink", info: "For extra mobility and to get double Starstorm off."}]
        },
        // 61. Pos 1, 2
        "Monkey King": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "faerie_fire"}, {item: "circlet"}, {item: "slippers"}, {item: "ward_observer", info: "If you are playing midlane Monkey King."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "power_treads"}, {item: "phase_boots"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "ring_of_basilius"}],
            mid_game: [{item: "maelstrom"}, {item: "echo_sabre", info: "Can be disassembled."}, {item: "sange_and_yasha"}, {item: "desolator"}, {item: "diffusal_blade"}, {item: "basher"}, {item: "lesser_crit"}],
            late_game: [{item: "skadi"}, {item: "mjollnir"}, {item: "satanic"}, {item: "abyssal_blade"}, {item: "ultimate_scepter"}, {item: "greater_crit"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "silver_edge", info: "For break effect and to close the gap."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive spells and items."}]
        },
        // 62. Pos 1, 2
        "Morphling": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "branches"}, {item: "slippers"}, {item: "faerie_fire"}, {item: "quelling_blade"}, {item: "ward_observer", info: "If you are playing midlane Morphling."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "If you are playing midlane Morphling."}, {item: "magic_wand"}, {item: "power_treads", isCore: true}, {item: "wraith_band"}, {item: "ring_of_basilius"}],
            mid_game: [{item: "yasha", isCore: true}, {item: "manta"}, {item: "ethereal_blade", isCore: true}, {item: "sange_and_yasha"}, {item: "dragon_lance", info: "Can be disassembled."}, {item: "lesser_crit"}],
            late_game: [{item: "skadi", isCore: true}, {item: "satanic"}, {item: "butterfly"}, {item: "greater_crit"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "sphere", info: "Against powerful single target disables and damaging spells."}, {item: "ultimate_scepter", info: "If you have heroes like Dark Willow, Earthshaker, Gyrocopter with or against you."}, {item: "blink", info: "To close the gap quickly."}]
        },
        // 63. Pos 1
        "Naga Siren": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "slippers"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "wraith_band"}, {item: "magic_wand"}],
            mid_game: [{item: "yasha", isCore: true}, {item: "manta"}, {item: "diffusal_blade"}, {item: "sange_and_yasha"}],
            late_game: [{item: "skadi"}, {item: "heart"}, {item: "butterfly"}, {item: "satanic"}, {item: "sheepstick"}, {item: "orchid"}, {item: "bloodthorn"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap quickly."}, {item: "aghanims_shard", info: "To reduce armor and slow."}, {item: "ultimate_scepter", info: "To control spell immune heroes."}, {item: "nullifier", info: "To dispel defensive spells and items."}]
        },
        // 64. Pos 3, 1, 5
        "Nature's Prophet": {
            starting: [{item: "tango"}, {item: "blight_stone"}, {item: "branches"}, {item: "faerie_fire"}, {item: "ward_observer", info: "If you are playing support Nature's Prophet."}, {item: "ward_sentry", info: "If you are playing support Nature's Prophet to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "urn_of_shadows", info: "If you are playing support Nature's Prophet."}],
            mid_game: [{item: "orchid", info: "For right-clicking build.", isCore: true}, {item: "maelstrom", info: "For right-clicking build."}, {item: "witch_blade", info: "For right-clicking build."}, {item: "solar_crest", info: "For utility build."}, {item: "lesser_crit", info: "For right-clicking build."}, {item: "mekansm", info: "For utility build."}, {item: "desolator", info: "For right-clicking build."}, {item: "ancient_janggo", info: "For utility build."}],
            late_game: [{item: "assault", info: "For right-clicking build."}, {item: "satanic", info: "For right-clicking build."}, {item: "greater_crit", info: "For right-clicking build."}, {item: "skadi", info: "For right-clicking build."}, {item: "sheepstick"}, {item: "aeon_disk"}, {item: "bloodthorn", info: "For right-clicking build."}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "spirit_vessel", info: "For utility build against heavy healing lineup."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "For utility build. Especially good against ranged right-clickers."}, {item: "aghanims_shard", info: "Great at pushing waves and towers."}, {item: "lotus_orb", info: "For utility build to reflect, dispel and for armor."}, {item: "monkey_king_bar", info: "For right-clicking build against evasion."}, {item: "ultimate_scepter", info: "For extra control and to have lanes pushed out."}, {item: "hurricane_pike", info: "For right-clicking build to disengage from heroes like Slark and Troll."}, {item: "nullifier", info: "For right-clicking build to dispel defensive spells and items."}]
        },
        // 65. Pos 3, 2
        "Necrophos": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "branches"}, {item: "circlet"}, {item: "flask"}, {item: "mantle"}, {item: "enchanted_mango"}, {item: "ward_observer", info: "If you are playing midlane Necrophos."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "null_talisman"}, {item: "power_treads"}, {item: "arcane_boots"}, {item: "travel_boots", info: "For midlane Necrophos."}],
            mid_game: [{item: "hood_of_defiance"}, {item: "force_staff"}, {item: "sange"}, {item: "kaya_and_sange"}, {item: "cyclone"}, {item: "eternal_shroud"}, {item: "mekansm", info: "Goes well with Holy Locket and Aghanim's Shard."}, {item: "guardian_greaves"}, {item: "holy_locket", info: "Goes well with Mekansm and Aghanim's Shard."}, {item: "witch_blade"}, ],
            late_game: [{item: "shivas_guard"}, {item: "aeon_disk"}, {item: "sheepstick"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "pipe"}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "radiance", info: "Against illusions based heroes and summons."}, {item: "aghanims_shard", info: "To save an ally, heal and amplify the magical damage on target."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "blink", info: "For extra mobility and to get Reaper's Scythe off easier."}, {item: "ultimate_scepter", info: "Against heavy physical damage lineups."}]
        },
        // 66. Pos 3
        "Night Stalker": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "gauntlets"}, {item: "branches"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "bracer"}, {item: "ring_of_protection"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "phase_boots", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "urn_of_shadows"}, {item: "medallion_of_courage"}],
            mid_game: [{item: "echo_sabre", info: "Can be disassembled."}, {item: "basher"}, {item: "ultimate_scepter"}, {item: "solar_crest"}, ],
            late_game: [{item: "assault"}, {item: "abyssal_blade"}, {item: "overwhelming_blink"}, {item: "satanic"}],
            situational: [{item: "hand_of_midas", info: "If you can get it early."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "blink", info: "To jump the backlines."}, {item: "nullifier", info: "To dispel defensive spells and items."}, {item: "aghanims_shard", info: "Against summon-based heroes."}]
        },
        // 67. Pos 4, 5
        "Nyx Assassin": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "wind_lace"}, {item: "branches"}, {item: "faerie_fire"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "arcane_boots"}, {item: "urn_of_shadows"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}],
            mid_game: [{item: "ultimate_scepter", isCore: true}, {item: "aether_lens"}, {item: "cyclone"}, {item: "force_staff"}, {item: "ghost"}, {item: "meteor_hammer"}, {item: "solar_crest"}],
            late_game: [{item: "octarine_core"}, {item: "aeon_disk"}, {item: "ethereal_blade"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "blink", info: "To close the gap and land Impale easier."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}]
        },
        // 68. Pos 5
        "Ogre Magi": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "faerie_fire"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "tranquil_boots"}, {item: "soul_ring"}],
            mid_game: [{item: "aether_lens"}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "cyclone"}, {item: "force_staff"}, {item: "solar_crest"}, {item: "veil_of_discord"}],
            late_game: [{item: "ultimate_scepter"}, {item: "aeon_disk"}, {item: "octarine_core"}, {item: "sheepstick"}, {item: "kaya"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "hand_of_midas", info: "If you can get it early. Not recommended for majority of the games."}, {item: "aghanims_shard", info: "Against right-clickers with high damage per hit."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "blink", info: "To close the gap."}]
        },
        // 69. 5, 3
        "Omniknight": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "quelling_blade", info: "For offlane Omniknight."}, {item: "gauntlets"}, {item: "branches"}, {item: "ward_observer", info: "For support Omniknight."}, {item: "ward_sentry", info: "For support Omniknight to block or unblock the pull camp."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "magic_wand"}, {item: "phase_boots", info: "For offlane Omniknight."}, {item: "tranquil_boots", info: "For support Omniknight."}, {item: "soul_ring"}, {item: "ring_of_basilius", info: "For support Omniknight if your laning partner uses a lot of mana early."}],
            mid_game: [{item: "holy_locket"}, {item: "aether_lens"}, {item: "hood_of_defiance"}, {item: "glimmer_cape", info: "For support Omniknight."}, {item: "solar_crest"}, {item: "force_staff"}, {item: "mekansm"}, {item: "ghost", info: "For support Omniknight."}, {item: "echo_sabre", info: "For offlane right-clicking Omniknight. Goes well with the Aghanim's Shard."}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "octarine_core"}],
            situational: [{item: "hand_of_midas", info: "For offlane Omniknight if you can get it early."}, {item: "ancient_janggo", info: "If you are grouping up a lot as a team in midgame and if you have summons."}, {item: "pipe"}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "blink", info: "To be able get your spells off easier."}, {item: "heavens_halberd", info: "For offlane Omniknight. Especially good against ranged right-clickers."}, {item: "aghanims_shard", info: "For offlane right-clicking Omniknight."}]
        },
        // 70. 5
        "Oracle": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "urn_of_shadows"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "force_staff"}, {item: "holy_locket"}, {item: "mekansm"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "blink", info: "To get your spells off or blink out while under False Promise."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "aghanims_shard", info: "If you don't have more than one invisibility spell or item in the team."}]
        },
        // 71. Pos 2, 3
        "Outworld Destroyer": /* Not 'Outworld Devourer' */ {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "mantle"}, {item: "crown", info: "For Meteor Hammer rush."}, {item: "branches"}, {item: "faerie_fire"}, {item: "ward_observer", info: "If you are playing midlane Outworld Destroyer."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "meteor_hammer", isCore: true}, {item: "power_treads", isCore: true}, {item: "arcane_boots", info: "Disassemble it for Aether Lens and get Power Treads."}, {item: "magic_wand"}, {item: "null_talisman"}],
            mid_game: [{item: "blink", isCore: true}, {item: "hurricane_pike", isCore: true}, {item: "ultimate_scepter"}, {item: "aether_lens"}, {item: "witch_blade"}],
            late_game: [{item: "sheepstick", isCore: true}, {item: "skadi"}, {item: "aeon_disk"}, {item: "refresher"}, {item: "octarine_core"}, {item: "kaya"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "hand_of_midas", info: "For midlane Outworld Destroyer if you can get it early."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}]
        },
        // 72. Pos 3, 2
        "Pangolier": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "faerie_fire"}, {item: "flask"}, {item: "circlet"}, {item: "enchanted_mango"}, {item: "ward_observer", info: "If you are playing midlane Pangolier."}, {item: "orb_of_venom", info: "If you see yourself being able to hit the opponents on the lane often."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "For midlane Pangolier but can be considered for offlane too."}, {item: "magic_wand"}, {item: "boots"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "arcane_boots", info: "To be considered for offlane Pangolier."}, {item: "power_treads"}],
            mid_game: [{item: "blink", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "basher"}, {item: "travel_boots", info: "For midlane Pangolier."}, {item: "guardian_greaves", info: "For offlane Pangolier."}, {item: "ghost"}, {item: "cyclone"}, {item: "maelstrom"}, {item: "hood_of_defiance"}, {item: "echo_sabre", info: "Can be disassembled."}, {item: "diffusal_blade"}, {item: "sange_and_yasha", info: "For midlane Pangolier for right-clicking build."}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "abyssal_blade"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}]
        },
        // 73. Pos 1
        "Phantom Assassin": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "faerie_fire"}, {item: "slippers"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "wraith_band"}],
            mid_game: [{item: "bfury", isCore: true}, {item: "desolator", isCore: true}, {item: "basher", isCore: true}, {item: "sange_and_yasha"}, {item: "echo_sabre", info: "Can be disassembled."}],
            late_game: [{item: "satanic", isCore: true}, {item: "abyssal_blade"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "For break effect and against tanky heroes."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive spells and items."}]
        },
        // 74. Pos 1
        "Phantom Lancer": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "slippers"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}],
            mid_game: [{item: "diffusal_blade", isCore: true}, {item: "yasha", isCore: true}, {item: "manta"}, {item: "sange_and_yasha"}, {item: "aghanims_shard", isCore: true}, {item: "aether_lens", info: "Goes well with Aghanim's_shard"}, {item: "basher"}],
            late_game: [{item: "octarine_core", info: "Goes well with Aghanim's_shard"}, {item: "skadi"}, {item: "heart"}, {item: "butterfly"}, {item: "satanic"}, {item: "abyssal_blade"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "hood_of_defiance", info: "Against a lot magical damage in early to midgame."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 75. Pos 5, 4
        "Phoenix": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "branches"}, {item: "enchanted_mango"}, {item: "ring_of_regen"}, {item: "ring_of_protection"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "urn_of_shadows"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "arcane_boots", info: "Disassemble for Holy_Locket and get Tranquil Boots."}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "ghost"}, {item: "glimmer_cape"}, {item: "force_staff"}, {item: "cyclone"}, {item: "veil_of_discord"}],
            late_game: [{item: "aeon_disk"}, {item: "refresher"}, {item: "shivas_guard"}, {item: "ethereal_blade"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}]
        },
        // 76. Pos 2
        "Puck": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "mantle"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "null_talisman"}, {item: "boots"}, {item: "witch_blade", isCore: true}, {item: "power_treads"}, {item: "magic_wand"}],
            mid_game: [{item: "blink", isCore: true}, {item: "travel_boots"}, {item: "cyclone"}, {item: "kaya_and_sange"}, {item: "dagon"}],
            late_game: [{item: "aeon_disk"}, {item: "octarine_core"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "ultimate_scepter", info: "If opponents have spell immunity spells or items."}, {item: "aghanims_shard", info: "Against invisible heroes and to break Dream Coil."}, {item: "sphere", info: "Aghainst powerful single target disables or burst damage."}]
        },
        // 77. Pos 4, 5
        "Pudge": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "flask"}, {item: "clarity"}, {item: "enchanted_mango"}, {item: "ring_of_protection"}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "tranquil_boots", isCore: true}, {item: "magic_wand"}, {item: "wind_lace"}, {item: "soul_ring"}, {item: "urn_of_shadows"}, {item: "bottle"}],
            mid_game: [{item: "blink", isCore: true}, {item: "aether_lens"}, {item: "aghanims_shard", isCore: true}, {item: "ghost"}, {item: "glimmer_cape"}, {item: "force_staff"}, {item: "hood_of_defiance"}, {item: "eternal_shroud"}],
            late_game: [{item: "octarine_core"}, {item: "ultimate_scepter"}, {item: "overwhelming_blink"}],
            situational: [ {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "lotus_orb", info: "For reflect, dispel and armor."}, {item: "black_king_bar", info: "To channel Dismember fully."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}]
        },
        // 78. Pos 2, 3
        "Pugna": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "mantle"}, {item: "enchanted_mango"}, {item: "flask"}, {item: "ward_observer", info: "For midlane Pugna."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "For midlane Pugna but can be considered for offlane too."}, {item: "null_talisman"}, {item: "boots"}, {item: "arcane_boots"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "travel_boots"}, {item: "dagon"}, {item: "glimmer_cape"}, {item: "cyclone"}, {item: "kaya_and_sange"}, {item: "force_staff"}],
            late_game: [ {item: "octarine_core"}, {item: "aeon_disk"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "blink", info: "To close the gap."}, {item: "sphere", info: "Aghainst powerful single target disables or burst damage."}, {item: "lotus_orb", info: "For offlane Pugna to reflect, dispel and armor."}, {item: "aghanims_shard", info: "For an additional Life Drain if the fights are long."}]
        },
        // 79. Pos 2
        "Queen of Pain": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "branches"}, {item: "mantle"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "null_talisman"}, {item: "boots"}, {item: "power_treads"}],
            mid_game: [{item: "orchid", isCore: true}, {item: "witch_blade"}, {item: "aghanims_shard", isCore: true}, {item: "kaya_and_sange"}, {item: "aether_lens"}, {item: "cyclone"}, {item: "travel_boots"}],
            late_game: [{item: "shivas_guard"}, {item: "ultimate_scepter"}, {item: "octarine_core"}, {item: "aeon_disk"}, {item: "sheepstick"}, {item: "bloodthorn"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "sphere", info: "Aghainst powerful single target disables or burst damage."}]
        },
        // 80. Pos 2, 1, 3
        "Razor": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "slippers"}, {item: "quelling_blade", info: "For carry Razor"}, {item: "ward_observer", info: "For midlane Razor."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "For midlane Razor."}, {item: "boots"}, {item: "power_treads"}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "phase_boots"}, {item: "wind_lace"}],
            mid_game: [{item: "cyclone"}, {item: "sange_and_yasha", info: "For midlane and carry Razor."}, {item: "hood_of_defiance", info: "For offlane Razor."},  {item: "travel_boots", info: "For midlane Razor."}],
            late_game: [{item: "refresher", isCore: true}, {item: "ultimate_scepter"}, {item: "assault"}, {item: "shivas_guard"}, {item: "satanic"}, {item: "butterfly"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "To get a good Static Link off."}, {item: "blink", info: "To jump to a hero you want to Static Link."}, {item: "heavens_halberd", info: "For offlane Razor. Especially good against ranged right-clickers."}, {item: "lotus_orb", info: "For offlane Razor to reflect, dispel and armor."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "aeon_disk", info: "To survive long lasting disables and burst."}]
        },
        // 81. Pos 1
        "Riki": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "circlet"}, {item: "slippers"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "wraith_band"}],
            mid_game: [{item: "diffusal_blade", isCore: true}, {item: "yasha", isCore: true}, {item: "manta", info: "Upon activation dispels Dust of Appearance from you."}, {item: "basher", isCore: true}, {item: "sange_and_yasha"}, {item: "lesser_crit"}],
            late_game: [{item: "abyssal_blade"}, {item: "skadi"}, {item: "butterfly"}, {item: "greater_crit"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap and jump out from Tricks of Trade."}, {item: "aghanims_shard", info: "For extra control."}, {item: "nullifier", info: "To dispel defensive spells and items."}]
        },
        // 82. Pos 4
        "Rubick": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "faerie_fire"}, {item: "flask"}, {item: "branches"}, {item: "circlet"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "null_talisman"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "urn_of_shadows"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "blink", isCore: true}, {item: "ghost"}, {item: "force_staff"}, {item: "glimmer_cape"}, {item: "cyclone"}],
            late_game: [{item: "aeon_disk"}, {item: "octarine_core"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "aghanims_shard", info: "To reposition an ally in a bad position and to get Aghanim's Shard upgrades on stolen spells."}]
        },
        // 83. Pos 3
        "Sand King": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "flask"}, {item: "branches"}, {item: "gauntlets"}, {item: "ring_of_protection"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "soul_ring"}, {item: "bracer"}, {item: "tranquil_boots"}, {item: "vanguard"}, {item: "arcane_boots"}],
            mid_game: [{item: "blink", isCore: true}, {item: "cyclone", isCore: true}, {item: "travel_boots"}, {item: "force_staff"}, {item: "ghost"}, {item: "hood_of_defiance"}, {item: "veil_of_discord"}],
            late_game: [{item: "ultimate_scepter"}, {item: "ethereal_blade"}, {item: "sheepstick"}],
            situational: [{item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "aghanims_shard", info: "For extra AoE damage against illusions and waveclear."}, {item: "aeon_disk"}]
        },
        // 84. Pos 5, 4
        "Shadow Demon": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "clarity"}, {item: "faerie_fire"}, {item: "branches"}, {item: "sobi_mask"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "force_staff"}, {item: "blink"}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "solar_crest"}, {item: "ancient_janggo"}],
            late_game: [{item: "ultimate_scepter", info: "Applies break effect."}, {item: "aeon_disk"}, {item: "sheepstick"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "aghanims_shard", info: "If there are a lot of dispellable debuffs cast on your teammates."}]
        },
        // 85. Pos 2
        "Shadow Fiend": {
            starting: [{item: "enchanted_mango"}, {item: "tango"}, {item: "branches"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "boots"}, {item: "magic_wand"}, {item: "travel_boots", info: "For magical build."}, {item: "power_treads", info: "For right-click build."}],
            mid_game: [{item: "cyclone", info: "For magical build."}, {item: "ghost", info: "For magical build."}, {item: "yasha", info: "For right-click build."}, {item: "dragon_lance", info: "For right-click build."}, {item: "lesser_crit", info: "For right-click build."}, {item: "sange_and_yasha", info: "For right-click build."}, {item: "invis_sword", info: "For right-click build."}],
            late_game: [{item: "arcane_blink", info: "For magical build."}, {item: "ethereal_blade", info: "For magical build."}, {item: "sheepstick", info: "For magical build."}, {item: "refresher", info: "For magical build."}, {item: "satanic", info: "For right-click build."}, {item: "greater_crit", info: "For right-click build."}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "To channel Requiem of Souls fully or to be able to right-click freely."}, {item: "sphere", info: "Against powerful single target disabels and burst damage."}, {item: "aghanims_shard", info: "For magical build to deal extra magical damage."}, {item: "monkey_king_bar", info: "For right-click build against evasion."}]
        },
        // 86. Pos 4, 5
        "Shadow Shaman": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "wind_lace"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "blink", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "ghost"}, {item: "force_staff"}, {item: "glimmer_cape"}, {item: "ancient_janggo"}],
            late_game: [{item: "aeon_disk"}, {item: "refresher"}, {item: "octarine_core"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "To channel Shackles fully."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 87. Pos 5
        "Silencer": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "branches"}, {item: "enchanted_mango"}, {item: "mantle"}, {item: "circlet"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "power_treads"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "null_talisman"}, {item: "urn_of_shadows"}],
            mid_game: [{item: "glimmer_cape"}, {item: "force_staff"}, {item: "ghost"}, {item: "ancient_janggo"}, {item: "dragon_lance"}, {item: "hurricane_pike"}, {item: "witch_blade"}, {item: "falcon_blade"}],
            late_game: [{item: "aeon_disk"}, {item: "sheepstick"}, {item: "moon_shard"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "aghanims_shard", info: "In late game when you are dealing signifcant amounts of damage."}]
        },
        // 88. Pos 4, 5
        "Skywrath Mage": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "mantle"}, {item: "enchanted_mango"}, {item: "flask"}, {item: "branches"}, {item: "clarity"}, {item: "faerie_fire"}, {item: "null_talisman"}, {item: "sobi_mask"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "null_talisman"}, {item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "rod_of_atos", isCore: true}, {item: "force_staff"}, {item: "ghost"}, {item: "travel_boots"}, {item: "veil_of_discord"}, {item: "glimmer_cape"}],
            late_game: [{item: "ultimate_scepter"}, {item: "aeon_disk"}, {item: "octarine_core"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "blink", info: "To close the gap."}, {item: "invis_sword", info: "To hunt for kills."}, {item: "aghanims_shard", info: "If you expect long fights and against physical damage lineups."}]
        },
        // 89. Pos 3
        "Slardar": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "gauntlets"}, {item: "branches"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "flask"}, {item: "bracer"}, {item: "ring_of_protection"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "blink", isCore: true}, {item: "echo_sabre", info: "Can be disassembled."}, {item: "ultimate_scepter"}, {item: "hood_of_defiance"}],
            late_game: [{item: "assault"}, {item: "moon_shard"}, {item: "satanic"}],
            situational: [{item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}]
        },
        // 90. Pos 1
        "Slark": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "slippers"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}],
            mid_game: [{item: "echo_sabre", info: "Can be disassembled.", isCore: true}, {item: "sange_and_yasha", isCore: true}, {item: "basher"}, {item: "diffusal_blade"}],
            late_game: [{item: "ultimate_scepter"}, {item: "skadi"}, {item: "abyssal_blade"}, {item: "satanic"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "Against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap."}, {item: "silver_edge", info: "For break effect and to close the gap."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive spells and items."}]
        },
        // 91. Pos 5, 4
        "Snapfire": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "blight_stone"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}],
            mid_game: [{item: "solar_crest", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "blink", info: "Goes well with Aghanim's Shard and Aghanim's Scepter.", isCore: true}, {item: "force_staff"}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "mekansm"}, {item: "guardian_greaves"}, {item: "aether_lens"}, {item: "veil_of_discord"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "ethereal_blade"}, {item: "octarine_core"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 92. Pos 2, 4
        "Sniper": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "slippers"}, {item: "flask"}, {item: "boots", info: "For support Sniper."}, {item: "wind_lace", info: "For support Sniper."}, {item: "ward_observer"}, {item: "ward_sentry", info: "For support Sniper to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "wraith_band", info: "For midlane Sniper."}, {item: "boots"}, {item: "power_treads", info: "For midlane Sniper.", isCore: true}, {item: "magic_wand"}, {item: "tranquil_boots", info: "For support Sniper", isCore: true}, {item: "ring_of_basilius", info: "For support Sniper if your laning partner uses a lot of mana early."}, {item: "urn_of_shadows", info: "For support Sniper."}],
            mid_game: [{item: "dragon_lance", info: "For midlane Sniper. Can be disassembled.", isCore: true}, {item: "maelstrom", info: "For midlane Sniper", isCore: true}, {item: "hurricane_pike", info: "For midlane Sniper."}, {item: "ultimate_scepter", info: "For support Sniper.", isCore: true}, {item: "aghanims_shard", info: "For support Sniper.", isCore: true}, {item: "aether_lens", info: "For support Sniper."}, {item: "lesser_crit", info: "For midlane Sniper."}, {item: "yasha", info: "For midlane Sniper."}, {item: "sange_and_yasha", info: "For midlane Sniper."}, {item: "ghost", info: "For support Sniper."}, {item: "falcon_blade", info: "For support Sniper."}, {item: "glimmer_cape", info: "For support Sniper."}, {item: "force_staff"}],
            late_game: [{item: "greater_crit", info: "For midlane Sniper."}, {item: "mjollnir", info: "For midlane Sniper."}, {item: "skadi", info: "For midlane Sniper."}, {item: "octarine_core", info: "For support Sniper."}, {item: "satanic", info: "For midlane Sniper."}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "hand_of_midas", info: "For midlane Sniper if you can get it early."}, {item: "black_king_bar", info: "For midlane Sniper against a lot of disables, magical damage and as a dispel."}, {item: "blink", info: "For extra mobility."}, {item: "monkey_king_bar", info: "For midlane Sniper against evasion."}]
        },
        // 93. Pos 2
        "Spectre": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "faerie_fire"}, {item: "slippers"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "power_treads", isCore: true}, {item: "wraith_band"}],
            mid_game: [{item: "echo_sabre", info: "Can be disassembled."}, {item: "blade_mail"}, {item: "manta", isCore: true}, {item: "basher"}, {item: "diffusal_blade", info: "Goes well with Manta."}, {item: "radiance", info: "Against illusion, clone and summon based heroes."}],
            late_game: [{item: "skadi"}, {item: "abyssal_blade"}, {item: "butterfly"}, {item: "ultimate_scepter"}, {item: "moon_shard"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "hand_of_midas", info: "If you can get it early."}, {item: "black_king_bar", info: "Against breaks, disables, magical damage and as a dispel."}, {item: "nullifier", info: "To dispel defensive spells and items."}, {item: "orchid", info: "Against heroes with escaping spells."}, {item: "aghanims_shard", info: "To close the gap once you get damage by backline hero."}]
        },
        // 94. Pos 4, 5
        "Spirit Breaker": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "circlet"}, {item: "ring_of_protection"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "urn_of_shadows"}, {item: "tranquil_boots"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "power_treads"}, {item: "bracer"}],
            mid_game: [{item: "ultimate_scepter"}, {item: "blade_mail"}, {item: "hood_of_defiance"}, {item: "ancient_janggo", info: "If you are grouping up a lot as a team in midgame and if you have summons."}, {item: "glimmer_cape"}, {item: "ghost"}],
            late_game: [{item: "assault"}, {item: "vladmir"}, {item: "moon_shard"}],
            situational: [{item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "pipe"}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "aghanims_shard", info: "For break effect."}]
        },
        // 95. Pos 2
        "Storm Spirit": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "branches"}, {item: "mantle"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "null_talisman"}, {item: "power_treads", isCore: true}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            mid_game: [{item: "orchid", isCore: true}, {item: "kaya", isCore: true}, {item: "kaya_and_sange"}, {item: "bloodstone"}, {item: "cyclone"}],
            late_game: [{item: "ultimate_scepter"}, {item: "shivas_guard"}, {item: "bloodthorn"}, {item: "sheepstick"}, {item: "aeon_disk"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "sphere", info: "Against powerful single target disables and burst of damage."}, {item: "aghanims_shard", info: "If you are lacking damage as team."}]
        },
        // 96. Pos 1
        "Sven": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "enchanted_mango"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "mask_of_madness", isCore: true}],
            mid_game: [{item: "echo_sabre", info: "Can be disassembled.", isCore: true}, {item: "blink", info: "To close the gap.", isCore: true}, {item: "lesser_crit"}, {item: "sange_and_yasha"}],
            late_game: [{item: "greater_crit"}, {item: "swift_blink"}, {item: "assault"}, {item: "satanic"}, {item: "bloodthorn"}],
            situational: [{item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "To dispel defensive items and spells with Storm Hammer."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "ultimate_scepter", info: "For extra mobility."}]
        },
        // 97. Pos 4, 5
        "Techies": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "boots"}, {item: "faerie_fire"}, {item: "ring_of_regen"}, {item: "gauntlets"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "soul_ring", isCore: true}, {item: "arcane_boots"}, {item: "null_talisman"}, {item: "magic_wand"}],
            mid_game: [{item: "ultimate_scepter", isCore: true}, {item: "force_staff"}, {item: "aether_lens"}, {item: "kaya"}, {item: "glimmer_cape"}, {item: "ghost"}],
            late_game: [{item: "octarine_core"}, {item: "aeon_disk"}, {item: "travel_boots", info: "For extra mobility around the map."}, {item: "sheepstick"}, {item: "bloodstone"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "aghanims_shard", info: "For extra control."}, {item: "blink", info: "For extra mobility around the map."}]
        },
        // 98. Pos 2, 1
        "Templar Assassin": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "quelling_blade"}, {item: "branches"}, {item: "circlet"}, {item: "slippers"}, {item: "ward_observer", info: "For midlane Templar Assasin."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "power_treads", isCore: true}, {item: "dragon_lance", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}],
            mid_game: [{item: "desolator", isCore: true}, {item: "blink", isCore: true}, {item: "lesser_crit"}, {item: "hurricane_pike"}, {item: "orchid"}],
            late_game: [{item: "greater_crit"}, {item: "swift_blink"}, {item: "butterfly"}, {item: "moon_shard"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "For silence and extra vision."}, {item: "ultimate_scepter", info: "To splitpush and against it."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive items and spells."}, {item: "sphere", info: "Against powerful single target disables and burst damage."}]
        },
        // 99. Pos 1
        "Terrorblade": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "slippers"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "power_treads", isCore: true}, {item: "magic_wand"}, {item: "wraith_band"}, {item: "ring_of_basilius"}],
            mid_game: [{item: "dragon_lance", info: "Can be disassembled.", isCore: true}, {item: "yasha", isCore: true}, {item: "manta"}, {item: "sange_and_yasha"}, {item: "lesser_crit"}],
            late_game: [{item: "skadi", isCore: true}, {item: "greater_crit"}, {item: "satanic"}, {item: "butterfly"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap."}, {item: "hurricane_pike", info: "To disengage from heroes like Slark and Troll."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "ultimate_scepter", info: "For extra control."}]
        },
        // 100. Pos 3
        "Tidehunter": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "ring_of_protection"}, {item: "enchanted_mango"}, {item: "flask"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "soul_ring"}, {item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "arcane_boots"}],
            mid_game: [{item: "hood_of_defiance"}, {item: "blink", isCore: true}, {item: "ultimate_scepter"}, {item: "ghost"}, {item: "solar_crest"}, {item: "helm_of_the_dominator"}],
            late_game: [{item: "refresher"}, {item: "arcane_blink"}, {item: "shivas_guard"}, {item: "vladmir"}],
            situational: [{item: "pipe"}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "aghanims_shard", info: "For right-click build and to take buildings faster."}]
        },
        // 101. Pos 3
        "Timbersaw": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "ring_of_protection"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "gauntlets"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "soul_ring", isCore: true}, {item: "arcane_boots", isCore: true}, {item: "magic_wand"}, {item: "bracer"}, {item: "vanguard"}],
            mid_game: [{item: "hood_of_defiance", isCore: true}, {item: "cyclone", isCore: true}, {item: "sange", isCore: true}, {item: "kaya_and_sange"}, {item: "aghanims_shard", isCore: true}, {item: "kaya"}, {item: "eternal_shroud"}],
            late_game: [{item: "bloodstone"}, {item: "sheepstick"}, {item: "shivas_guard"}],
            situational: [{item: "pipe"}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap quickly."}]
        },
        // 102. Pos 2
        "Tinker": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "branches"}, {item: "circlet"}, {item: "ward_observer"}],
            early_game: [{item: "bottle"}, {item: "soul_ring", isCore: true}, {item: "null_talisman"}, {item: "blink", isCore: true}],
            mid_game: [{item: "ultimate_scepter", isCore: true}, {item: "shivas_guard"}, {item: "overwhelming_blink", info: "Along with Shiva's Guard for waveclear and AoE damage."}, {item: "aether_lens"}, {item: "kaya"}, {item: "bloodstone"}, {item: "ghost"}, {item: "dagon"}],
            late_game: [{item: "sheepstick"}, {item: "aeon_disk"}, {item: "ethereal_blade"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "For extra AoE damage although Shiva's Guard and Overwhelming Blink are usually better."}]
        },   
        // 103. Pos 2, 4
        "Tiny": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "faerie_fire"}, {item: "branches"}, {item: "boots", info: "For support Tiny."}, {item: "ward_observer"}, {item: "ward_sentry", info: "For support Tiny to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "For midlane Tiny."}, {item: "boots"}, {item: "phase_boots", info: "For midlane Tiny."}, {item: "magic_wand"}, {item: "power_treads", info: "For midlane Tiny."}, {item: "tranquil_boots", info: "For support Tiny."}, {item: "soul_ring"}],
            mid_game: [{item: "blink", isCore: true}, {item: "echo_sabre", info: "For midlane Tiny. Can be disassembled.", isCore: true}, {item: "lesser_crit", info: "For midlane Tiny.", isCore: true}, {item: "aghanims_shard", info: "For midlane Tiny."}, {item: "ghost"}, {item: "cyclone", info: "For support Tiny.", isCore: true}, {item: "veil_of_discord", info: "For support Tiny."}, {item: "invis_sword", info: "For midlane Tiny."}, {item: "force_staff"}],
            late_game: [{item: "greater_crit"}, {item: "assault", info: "For midlane Tiny."}, {item: "ethereal_blade"}, {item: "overwhelming_blink", info: "For support Tiny."}, {item: "moon_shard", info: "For midlane Tiny."}, {item: "aeon_disk", info: "For support Tiny."}],
            situational: [{item: "hand_of_midas", info: "For midlane Tiny if you can get it early."}, {item: "black_king_bar", info: "For midlane Tiny against disables, magical damage and as a dispel."}, {item: "lotus_orb", info: "For support Tiny to reflect, dispel and armor."}, {item: "ultimate_scepter", info: "For midlane Tiny for additional AoE damage."}]
        },
        // 104. Pos 5
        "Treant Protector": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "faerie_fire"}, {item: "boots"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "blink", isCore: true}, {item: "aghanims_shard"}, {item: "force_staff"}, {item: "solar_crest"}, {item: "meteor_hammer"}, {item: "glimmer_cape"}, {item: "veil_of_discord"}, {item: "mekansm"}],
            late_game: [{item: "ultimate_scepter"}, {item: "aeon_disk"}, {item: "refresher"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 105. Pos 1
        "Troll Warlord": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "slippers"}, {item: "circlet"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "power_treads"}, {item: "wraith_band"}],
            mid_game: [{item: "bfury"}, {item: "maelstrom"}, {item: "sange_and_yasha", isCore: true}, {item: "basher", isCore: true}, {item: "diffusal_blade"}],
            late_game: [{item: "satanic"}, {item: "skadi"}, {item: "abyssal_blade"}, {item: "butterfly"}, {item: "moon_shard"}],
            situational: [{item: "infused_raindrop", info: "On hero against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "blink", info: "To close the gap."}, {item: "ultimate_scepter", info: "If there is a need for a dispel."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "sphere", info: "Against powerful single target disables and damage burst."}]
        },
        // 106. Pos 4, 5
        "Tusk": {
            starting: [{item: "tango"}, {item: "boots"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "tranquil_boots"}, {item: "magic_wand"}, {item: "power_treads"}, {item: "urn_of_shadows"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "phase_boots"}],
            mid_game: [{item: "blink", isCore: true}, {item: "force_staff"}, {item: "solar_crest"}, {item: "ghost"}, {item: "hood_of_defiance"}, {item: "falcon_blade"}, {item: "cyclone"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "ancient_janggo", info: "If you are grouping up a lot as a team in midgame and if you have summons."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "pipe"}, {item: "aghanims_shard", info: "For extra control and vision."}]
        },
        // 107. Pos 3
        "Underlord": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "gauntlets"}, {item: "branches"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "ring_of_protection"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "soul_ring"}, {item: "boots"}, {item: "magic_wand"}, {item: "phase_boots"}, {item: "arcane_boots"}, {item: "vanguard"}],
            mid_game: [{item: "rod_of_atos"}, {item: "hood_of_defiance"}, {item: "force_staff"}, {item: "mekansm"}, {item: "guardian_greaves"}, {item: "aghanims_shard"}],
            late_game: [{item: "shivas_guard"}, {item: "assault"}, {item: "octarine_core"}],
            situational: [{item: "pipe"}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "crimson_guard", info: "Against fast attacking right-clickers, illusions and summons."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}]
        },
        // 108. Pos 5
        "Undying": {
            starting: [{item: "tango"}, {item: "enchanted_mango"}, {item: "flask"}, {item: "boots"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "wind_lace"}, {item: "branches"}, {item: "faerie_fire"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "glimmer_cape"}, {item: "mekansm"}, {item: "force_staff"}, {item: "solar_crest"}, {item: "aghanims_shard"}, {item: "ghost"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter", info: "Works well with Aghanim's Shard."}, {item: "vladmir"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 109. Pos 1
        "Ursa": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "faerie_fire"}, {item: "slippers"}, {item: "orb_of_venom", info: "If you can pressure on the lane."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "power_treads"}, {item: "orb_of_corrosion", info: "If you can pressure on the lane."}, {item: "wraith_band"}],
            mid_game: [{item: "diffusal_blade"}, {item: "blink", isCore: true}, {item: "basher", isCore: true}, {item: "sange_and_yasha"}, {item: "aghanims_shard", isCore: true}, {item: "bfury"}],
            late_game: [{item: "abyssal_blade"}, {item: "swift_blink"}, {item: "satanic"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive items and spells."}, {item: "ultimate_scepter", info: "Against long lasting disables."}]
        },
        // 110. Pos 5, 4
        "Vengeful Spirit": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "faerie_fire"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "urn_of_shadows"}, {item: "power_treads"}, {item: "arcane_boots"}],
            mid_game: [{item: "solar_crest"}, {item: "force_staff"}, {item: "ghost"}, {item: "glimmer_cape"}, {item: "vladmir"}, {item: "aether_lens"}],
            late_game: [{item: "aeon_disk", info: "Doesn't go well with Aghanim's Scepter."}, {item: "ultimate_scepter"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "blink", info: "To get in position to save an ally or swap in an enemy."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 111. Pos 3, 5
        "Venomancer": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "branches"}, {item: "flask"}, {item: "quelling_blade"}, {item: "enchanted_mango"}, {item: "boots", info: "For support Venomancer."}, {item: "ward_observer", info: "For support Venomancer."}, {item: "ward_sentry", info: "For support Venomancer to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "tranquil_boots", info: "Mainly for support Venomancer."}, {item: "urn_of_shadows"}, {item: "arcane_boots"}, {item: "ring_of_basilius", info: "For support Venomancer if your laning partner uses a lot of mana early."}],
            mid_game: [{item: "hood_of_defiance"}, {item: "aghanims_shard"}, {item: "ultimate_scepter"}, {item: "blink"}, {item: "aether_lens"}, {item: "force_staff"}, {item: "mekansm"}, {item: "solar_crest"}, {item: "guardian_greaves"}, {item: "glimmer_cape", info: "For support Venomancer."}, {item: "ghost"}],
            late_game: [{item: "aeon_disk"}, {item: "octarine_core", info: "For offlane Venomancer."}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "pipe"}, {item: "heavens_halberd", info: "For offlane Venomancer especially good against ranged right-clickers."}, {item: "black_king_bar", info: "For offlane Venomancer against disables, magical damage and as a dispel."}]
        },
        // 112. Pos 3, 2
        "Viper": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "enchanted_mango"}, {item: "branches"}, {item: "faerie_fire"}, {item: "flask"}, {item: "ring_of_protection"}, {item: "slippers"}, {item: "ward_observer", info: "For midlane Viper."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle", info: "For midlane Viper."}, {item: "boots"}, {item: "magic_wand"}, {item: "travel_boots"}, {item: "urn_of_shadows", info: "For offlane Viper."}, {item: "power_treads"}, {item: "wraith_band"}],
            mid_game: [{item: "rod_of_atos"}, {item: "dragon_lance"}, {item: "hurricane_pike"}, {item: "hood_of_defiance"}, {item: "force_staff"}, {item: "ultimate_scepter"}, {item: "ghost"}],
            late_game: [{item: "assault"}, {item: "skadi"}, {item: "aeon_disk"}, {item: "butterfly"}, {item: "ethereal_blade"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "blink", info: "For extra mobility."}, {item: "heavens_halberd", info: "For offlane Viper especially good against ranged right-clickers."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 113. Pos 2, 5
        "Visage": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "blight_stone"}, {item: "mantle"}, {item: "circlet"}, {item: "faerie_fire"}, {item: "enchanted_mango", info: "For support Visage."}, {item: "flask", info: "For support Visage."}, {item: "ward_observer"}, {item: "ward_sentry", info: "For support Visage to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "tranquil_boots"}, {item: "arcane_boots"}, {item: "magic_wand"}, {item: "null_talisman"}, {item: "medallion_of_courage"}, {item: "phase_boots"}, {item: "bracer"}, {item: "bottle", info: "For midlane Visage."}, {item: "ring_of_basilius", info: "For support Visage if your laning partner uses a lot of mana early."}],
            mid_game: [{item: "orchid", info: "For midlane Visage.", isCore: true}, {item: "ultimate_scepter", info: "For midlane Visage.", isCore: true}, {item: "aether_lens", info: "For midlane Visage."}, {item: "solar_crest", info: "For support Visage it is core.", isCore: true}, {item: "vladmir", info: "For support Visage."}, {item: "glimmer_cape", info: "For support Visage."}, {item: "hood_of_defiance"}, {item: "travel_boots"}],
            late_game: [{item: "sheepstick"}, {item: "assault"}, {item: "octarine_core", info: "For midlane Visage."}, {item: "heart", info: "For midlane Visage."}, {item: "shivas_guard", info: "For midlane Visage."}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "hand_of_midas", info: "For midlane Visage if you can get it early."}, {item: "aghanims_shard", info: "For extra survivability."}, {item: "black_king_bar", info: "For midlane Visage against disables, magical damage and as a dispel."}, {item: "pipe", info: "For support Visage."}]
        },
        // 114. Pos 2
        "Void Spirit": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "faerie_fire"}, {item: "branches"}, {item: "circlet"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "null_talisman"}, {item: "boots"}, {item: "phase_boots"}, {item: "magic_wand"}, {item: "power_treads"}],
            mid_game: [{item: "cyclone", isCore: true}, {item: "ultimate_scepter", isCore: true}, {item: "kaya_and_sange"}, {item: "aether_lens"}, {item: "travel_boots"}, {item: "desolator"}, {item: "echo_sabre", info: "Can be disassembled."}, {item: "witch_blade"}, {item: "orchid"}],
            late_game: [{item: "aeon_disk"}, {item: "shivas_guard"}, {item: "sheepstick"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "aghanims_shard", info: "For extra mobility."}, {item: "ultimate_scepter"}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "sphere", info: "Against powerful single target disables and damage burst."}]
        },
        // 115. Pos 5
        "Warlock": {
            starting: [{item: "tango"}, {item: "enchanted_mango"}, {item: "sobi_mask"}, {item: "flask"}, {item: "clarity"}, {item: "faerie_fire"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "magic_wand"}, {item: "tranquil_boots"}, {item: "urn_of_shadows"}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "force_staff"}, {item: "glimmer_cape"}, {item: "ghost"}, {item: "veil_of_discord"}, {item: "solar_crest"}],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "refresher"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 116. Pos 1
        "Weaver": {
            starting: [{item: "tango"}, {item: "slippers"}, {item: "circlet"}, {item: "branches"}, {item: "faerie_fire"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "magic_wand"}, {item: "power_treads", isCore: true}, {item: "wraith_band"}, {item: "falcon_blade"}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "sange_and_yasha"}, {item: "lesser_crit"}, {item: "dragon_lance", info: "Can be disassembled."}, {item: "diffusal_blade"}, {item: "rod_of_atos"}],
            late_game: [{item: "greater_crit"}, {item: "satanic"}, {item: "skadi"}, {item: "butterfly"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "Against disables, magical damage and as a dispel."}, {item: "aghanims_shard", info: "Against invisible heroes."}, {item: "monkey_king_bar", info: "Against evasion."}, {item: "nullifier", info: "To dispel defensive items and spells."}, {item: "sphere", info: "Against powerful single target disables and damage burst."}]
        },
        // 117. Pos 4, 2
        "Windranger": {
            starting: [{item: "tango"}, {item: "faerie_fire"}, {item: "circlet"}, {item: "flask"}, {item: "branches"}, {item: "blight_stone"}, {item: "mantle"}, {item: "enchanted_mango"}, {item: "ward_observer"}, {item: "ward_sentry", info: "For support Windranger to block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots", info: "For midlane Windranger."}, {item: "boots"}, {item: "magic_wand"}, {item: "tranquil_boots", info: "For support Windranger."}, {item: "null_talisman"}, {item: "urn_of_shadows"}, {item: "ring_of_basilius", info: "For support Windranger if your laning partner uses a lot of mana early."}, {item: "arcane_boots"}, {item: "power_treads", info: "For midlane Windranger."}],
            mid_game: [{item: "maelstrom", isCore: true}, {item: "blink", isCore: true}, {item: "aghanims_shard", info: "For support Windranger."}, {item: "travel_boots", info: "For midlane Windranger."}, {item: "monkey_king_bar"}, {item: "lesser_crit", info: "For midlane Windranger."}, {item: "force_staff", info: "For support Windranger."}, {item: "aether_lens", info: "For support Windranger."}, {item: "cyclone", info: "For support Windranger."}, {item: "meteor_hammer", info: "For support Windranger."}, {item: "orchid", info: "For midlane Windranger."}],
            late_game: [{item: "greater_crit", info: "For midlane Windranger."}, {item: "aeon_disk"}, {item: "ultimate_scepter", info: "For midlane Windranger."}, {item: "octarine_core"}, {item: "arcane_blink"}, {item: "satanic", info: "For midlane Windranger."}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "black_king_bar", info: "To be able to channel Focus Fire fully."}, {item: "lotus_orb", info: "For support Windranger to reflect, dispel and armor."}, {item: "nullifier", info: "For midlane Windranger to dispel defensive items and spells."}, {item: "sphere", info: "For midlane Windranger against powerful single target disables and damage burst."}]
        },
        // 118. Pos 5, 4
        "Winter Wyvern": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "faerie_fire"}, {item: "clarity"}, {item: "branches"}, {item: "sobi_mask"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."},{item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "magic_wand"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "null_talisman"}],
            mid_game: [{item: "holy_locket", isCore: true}, {item: "blink", isCore: true}, {item: "aghanims_shard", isCore: true}, {item: "glimmer_cape"}, {item: "aether_lens"}, {item: "force_staff"}, {item: "orchid", info: "Goes well with Witch Blade and Aghanim's Scepter."}, {item: "witch_blade", info: "Goes well with Orchid Malevolence and Aghanim's Scepter."}, {item: "ghost"}],
            late_game: [{item: "aeon_disk"}, {item: "octarine_core"}, {item: "ultimate_scepter", info: "Goes well with Witch Blade and Orchid Malevolence."}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}]
        },
        // 119. Pos 5
        "Witch Doctor": {
            starting: [{item: "tango"}, {item: "flask"}, {item: "enchanted_mango"}, {item: "faerie_fire"}, {item: "branches"}, {item: "ward_observer"}, {item: "ward_sentry", info: "To block or unblock the pull camp."}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "boots"}, {item: "magic_wand"}, {item: "arcane_boots"}, {item: "tranquil_boots"}, {item: "ring_of_basilius", info: "If your laning partner uses a lot of mana early."}, {item: "null_talisman"}],
            mid_game: [{item: "holy_locket"}, {item: "glimmer_cape"}, {item: "aghanims_shard"}, {item: "solar_crest"}, {item: "force_staff"}, {item: "ghost"}, {item: "aether_lens"}, ],
            late_game: [{item: "aeon_disk"}, {item: "ultimate_scepter"}, {item: "octarine_core"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "spirit_vessel", info: "Against heavy healing lineup and to increase the damage of Maledict."}, {item: "blink", info: "For extra mobility to get your spells off."}, {item: "lotus_orb", info: "To reflect, dispel and armor."}, {item: "black_king_bar", info: "To be able to channel Death Ward fully. Goes well with Aghanim's Scepter."}]
        },
        // 120. Pos 1
        "Wraith King": {
            starting: [{item: "tango"}, {item: "quelling_blade"}, {item: "branches"}, {item: "faerie_fire"}, {item: "gauntlets"}, {item: "circlet"}, {item: "ring_of_protection"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "phase_boots", isCore: true}, {item: "magic_wand"}, {item: "bracer"}],
            mid_game: [{item: "armlet", isCore: true}, {item: "radiance"}, {item: "sange", isCore: true}, {item: "sange_and_yasha"}, {item: "blink", isCore: true}, {item: "desolator"}, {item: "basher"}],
            late_game: [{item: "assault", isCore: true}, {item: "swift_blink", info: "For single target burst."}, {item: "overwhelming_blink", info: "For AoE damage and tankiness."}, {item: "abyssal_blade"}, {item: "moon_shard"}],
            situational: [{item: "hand_of_midas", info: "If you can get it early."}, {item: "heavens_halberd", info: "Especially good against ranged right-clickers."}, {item: "aghanims_shard", info: "If opponents have mana burn."}, {item: "monkey_king_bar", info: "Against evasion."}]
        },
        // 121. Pos 2
        "Zeus": {
            starting: [{item: "tango"}, {item: "circlet"}, {item: "branches"}, {item: "faerie_fire"}, {item: "mantle"}, {item: "ward_observer"}, {item: "magic_stick", info: "If you expect high frequency of spells being used on the lane."}],
            early_game: [{item: "bottle"}, {item: "null_talisman"}, {item: "boots"}, {item: "arcane_boots", isCore: true}, {item: "magic_wand"}],
            mid_game: [{item: "aether_lens", isCore: true}, {item: "ultimate_scepter", isCore: true}, {item: "kaya", isCore: true}, {item: "travel_boots"}, {item: "ghost"}, {item: "cyclone"}],
            late_game: [{item: "octarine_core"}, {item: "refresher"}, {item: "bloodstone"}, {item: "aeon_disk"}],
            situational: [{item: "infused_raindrop", info: "Against magical burst."}, {item: "blink", info: "For extra mobility."}, {item: "aghanims_shard", info: "For extra mobility."}]
        }
    }