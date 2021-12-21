/**
 * This file contains all the logic for the localization of the app (i18n)
 * 
 * Source for country codes: "https://www.localeplanet.com/icu/"
 * 
 */


export const localization = {
    // Configuration of localization
    "config" : {
        "languages": [
            { "code": "en", "name": "English" },
            { "code": "de", "name": "Deutsch" },
            { "code": "fr", "name": "Français" },
            { "code": "ru", "name": "Русский" },
            { "code": "zh", "name": "中文" },
            { "code": "id", "name": "Indonesia" }
        ]
    },
    // Text to be translated for Dota Coach
    "text" : {

        // InGame window
        "Show/hide": {},
        "Sign in": {},
        "Logged in": {},
        "Logged in as": {},
        "Create ballot": {},
        "Watch tutorial": {},
        "Get help": {},
        "Report issue": {},
        "Join Discord": {},
        "Join Reddit": {},
        "Manage subscription": {},
        "Change settings": {},
        "Click to sign in": {
            "en": "Click to sign in to your Overwolf account"
        },

        // Help window
        "HELP": {},
        "FEEDBACK": {},
        "Report an issue": {
            "en": "Report an issue/bug or request support"
        },
        "Share with us": {
            "en": "What do you want to share with us?"
        },
        "Issue description": {
            "en": "Enter description of issue/bug or request for support"
        },
        "SEND_REPORT": {
            "en": "SEND REPORT"
        },
        "Contact details": {
            "en": "Contact details (E-Mail/Discord)"
        },
        "Enter contact details": {
            "en": "Enter your contact details"
        },
        "Log files": {
            "en": "Attach Dota Coach log files"
        },

        // Settings window
        "SETTINGS": {},
        "version": {},
        "channel": {},
        "production": {},
        "beta": {},

        "Infoboxes": {},
        "InfoboxesTooltip": {
            "en": "Infoboxes are positioned on top of players in matches and provide insights on items and abilities."
        },

        "ItemsAndAbilities": {
            "en": "Items & abilities"
        },
        "Timers": {},
        "TimersTooltip": {
            "en": "The timer for Roshan, Glyph of Fortification, Buybacks and Ultimates can be turned off and on here."
        },

        "RoshanAndGlyph": {
            "en": "Roshan & glyph"
        },
        "TeamBuybacks":  {
            "en": "Team buybacks"
        },
        "TeamUltimates":  {
            "en": "Team ultimates"
        },
        "EnemyBuybacks":  {
            "en": "Enemy buybacks"
        },
        "EnemyUltimates":  {
            "en": "Enemy ultimates"
        },
        "subsOnly":  {
            "en": "subs only"
        },

        "Coaching": {},
        "CoachingTooltip": {
            "en": "Coaching for hero picks, item builds and enemy heroes can be set here."
        },
        "HeroPicksAndItemBuilds": {
            "en": "Hero picks & item builds"
        },
        "OwnHeroVoice": {
            "en": "Own hero (voice)"
        },
        "EnemyHeroesVoice": {
            "en": "Enemy heroes (voice)"
        },

        "Notifications": {},
        "NotificationsTooltip": {
            "en": "Notifications provided during the game to remind you of events such as the apprearance of bounty runes. You can enable or disable the different messages individually."
        },
        "BountyRunes": {
            "en": "Bounty runes"
        },
        "WaterAndPowerRunes": {
            "en": "Water & power runes"
        },
        "NeutralItems":  {
            "en": "Neutral items"
        },
        "ObserverWards":  {
            "en": "Observer wards"
        },
        "SmokeOfDeceit":  {
            "en": "Smoke of deceit"
        },
        "TomeOfKnowledge":  {
            "en": "Tome of knowledge"
        },
        "AghanimsShard":  {
            "en": "Aghanim's shard"
        },
        "SiegeCreeps":  {
            "en": "Siege creeps"
        },
        "Daytime": {},

        /*"MessageSharing":   {
            "en": "Message sharing"
        },*/
        "Subtitles": {},
        "SubtitlesTooltip": {
            "en": "Configure manual and automated message sharing through the Dota 2 team chat. Manual message sharing is triggered by left-clicking on timers or the loudspeaker."
        },
        "ShowSubtitles": {
            "en": "Show subtitles"
        },
        "ManualSharing":  {
            "en": "Manual sharing"
        },
        "AutomatedSharing": {
            "en": "Automated sharing"
        },
        "RoshanAndAegis": {
            "en": "Roshan & Aegis"
        },

        "PerformanceTracker": {
            "en": "Performance tracker"
        },
        "PerformanceTrackerTooltip": {
            "en": "Configure the performance tracker to your needs. Note that the layout depends on your Dota Plus subscription in Dota 2."
        },
        "ShowTracker": {
            "en": "Show tracker"
        },
        "DotaPlusSubscriber": {
            "en": "Dota Plus subscriber"
        },
        "GoalLeft": {
            "en": "Goal left:"
        },
        "GoalRight": {
            "en": "Goal right:"
        },
        "YourMedian": {
            "en": "Your median"
        },
        "YourBest": {
            "en": "Your best"
        },
        "PeerMedian": {
            "en": "Peer median"
        },
        "PeerBest": {
            "en": "Peer best"
        },
        "None": {},
        "YourNameLeaderboard": {
            "en": "Your name (for leaderboard)"
        },

        "HideMainWindow": {
            "en": "Hide main window"
        },
        "HideMainWindowTooltip": {
            "en": "This feature allows you to automatically show and hide app during game."
        },
        "DuringHeroSelection": {
            "en": "During hero selection"
        },
        "DuringGame": {
            "en": "During game"
        },

        "MisclickProtection": {
            "en": "Misclick protection"
        },
        "MisclickProtectionTooltip": {
            "en": "Time in seconds that input isn't registered when the mouse first enters the timers. Default is 0.2 seconds."
        },
        "Delay": {},

        "Audio": {},
        "Disabled": {},
        "AudioTooltip": {
            "en": "Select speaker device and set volume."
        },
        "Speaker": {},
        "Volume": {},
        "Test": {},

        "SecondScreen": {
            "en": "Second screen"
        },
        "SecondScreenTooltip": {
            "en": "Users playing in windowed mode or having two or more monitors can benefit from a second screen providing additional information."
        },
        "Monitor": {},

        "Reposition": {},
        "RepositionTooltip": {
            "en": "Reposition allows you to reposition infoboxes and timers on the screen. During repositioning the infoboxes and timers are deactivated."
        },
        "ResetPosition": {
            "en": "Reset position"
        },
        "RESET": {},

        "Language": {},

        "Hotkeys": {},
        "HotkeysTooltip": {
            "en": "Hotkey to show & hide app. We recommend setting the hotkey for the Performance Tracker to the same as you use to show Dota's Scoreboard."
        },
        "ShowHideMainApp": {
            "en": "Show/hide main app"
        },
        "ShowHideSecondScreen": {
            "en": "Show/hide second screen"
        },
        "ShowHideTimers": {
            "en": "Show/hide timers"
        },
        "ShowHidePerformanceTracker": {
            "en": "Show/hide performance tracker"
        },

        // Ultimate window
        "Ultimate": {},
        "TIMING MODIFIERS": {},
        "Ultimate Level": {},
        "Items": {},
        "Arcane Rune": {},
        "Talent": {},
        "level": {},
        "No delay": {},
        "sec": {},
        "Adjustment": {},
        "Apply to all": {},

        "Buyback": {},

        "ERROR": {}
    }
}