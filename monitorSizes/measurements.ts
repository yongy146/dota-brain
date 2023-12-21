/**
 * Module provides all information about Dota 2 monitor
 * sizes for the app to properly position in-game windows.
 *
 * (C) Dota Coach, 2023
 */

export interface IMonitorMeasurements {
  width: number; // Added by script
  height: number; // Added by script
  isCustomized: boolean; // Added by script
  customization: "piggy backed" | "customized" | "not configured"; // Added by script
  overwolf: IMonitorMeasurementsOverwolf; // This could be shortened by defining specific interface...
  html: IMonitorMeasurementsHTML;
}

/**
 * All fields needed to position and size overwolf windows.
 *
 */
export interface IMonitorMeasurementsOverwolf {
  fontSize: number; // Used for tracker and subtitle (take KDA font size and add ~20%)
  preGame: {
    // Ingame app button
    appButton: {
      xPos: number;
      yPos: number;
      size: number; // Probably there is only one size needed... should be the same in-game and during hero-selection, I think
    };

    // Heroes: Excluding the grey shaded box
    heroesRadiantTopLeftXPos: number;
    heroesDireTopLeftXPos: number;
    heroesWidth: number;

    subtitles: {
      // Position where to put the subtitles (always centered in the screen)
      //xPos: number; // Middle hero radiant
      yPos: number; // One line above 'STRATEGY/LOADOUT / GUIDES'
      width: number; // From middle hero radiant to middle hero dire
      height: number; // High such that longest 'hero selection' text can be shown
    };
  };
  inGame: {
    appButton: {
      xPos: number;
      yPos: number;
      size: number; // Hight between Dota 2's size of settings cogs or hambuger menu
      extraLargeMinimap?: {
        yPos: number;
      };
    };

    heroesRadiantBottomLeftXPos: number; // Infoboxes need to be migrated to TopLeft... and not bottom left.
    heroesDireBottomLeftXPos: number;
    heroesWidth: number; // Width of 5 heroes
    heroesHeight: number; // Height of heroes display by Dota 2 (incl. color banner)

    perfTracker: {
      xPos: number; // xPos of end of 'Current' of last zero (white area) with Dota Plus | w/o Dota Plus a little more right than last 0 (such that the spacing would be similar to the Dota icons; including last line)
      yPos: number; // yPos of upper end of Dota 2 tracker (same for Dota Plus subscribers and non-subscribers)
    };
    itemTracker: {
      // Based on KOTL with 6 skills (incl. Aghanim's shard and level 6)
      yPos: number; // Currently we take the bottom of the window (i.e. the height of the window)
      xPos: number; // xPos of HUD element where TP ends
      extraLargeMinimap?: {
        // Optional value, sometimes needed
        yPos: number;
      };
      minimapRight?: {
        xPos: number;
      };
    };

    subtitles: {
      // Position and sizing of the subtitles
      xPos: number; // 4 pixels right of hero icons
      yPos: number; // 4 pixels form top of screen
      width: number; // 4 pixels from loss in / out
      height: number; // high such that longes text is visble
    };

    roshanGlyph: {
      xPos: number;
      yPos: number;
      size: number; // Roshan glyph window has same width and height; about 2.585x size of Scan and Glyph sign
      extraLargeMinimap?: {
        xPos: number;
        yPos: number;
      };
    };
  };
}

/**
 * All fields needed to render HTML content.
 *
 */
export interface IMonitorMeasurementsHTML {
  fontSize: number; // used for tracker and subtitle (take KDA font size and add 20%)
  fontSizeSmall: number; // Added by script

  inGame: {
    heroesWidth: number;
    heroesHeight: number;
  };
}

export interface IMonitorReuse {
  reuse: string /* e.g. '1920x1080' */;
}

/**
 * 'measurements' constant contains all values used to position
 * windows properly and render the HTML content.
 *
 */
export const measurements: Record<string, Partial<IMonitorMeasurementsOverwolf> | IMonitorReuse> = {
  "1024x768": {
    fontSize: 9,
    preGame: {
      heroesRadiantTopLeftXPos: 58,
      heroesDireTopLeftXPos: 614,
      heroesWidth: 352,
      subtitles: {
        //xPos: 212,
        yPos: 67,
        width: 600,
        height: 60,
      },
      appButton: {
        xPos: 6,
        yPos: 28,
        size: 17,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 221, //292,//221,
      heroesDireBottomLeftXPos: 594, //540, //584,
      heroesHeight: 29,
      heroesWidth: 220, //192, //220,
      perfTracker: {
        xPos: 111,
        yPos: 43,
      },
      itemTracker: {
        xPos: 0,
        yPos: 594,
        //width: 117 + 20,
      },
      subtitles: {
        xPos: 739,
        yPos: 3,
        width: 168,
        height: 140,
      },
      roshanGlyph: {
        xPos: 179,
        yPos: 594,
        size: 80,
      },
      appButton: {
        xPos: 5,
        yPos: 575,
        size: 20,
      },
    },
  },
  "1024x600": { reuse: "1024x768" },

  "1280x720": {
    fontSize: 9,
    preGame: {
      appButton: {
        xPos: 75,
        yPos: 11,
        size: 15,
      },
      heroesRadiantTopLeftXPos: 140,
      heroesDireTopLeftXPos: 739,
      heroesWidth: 403,
      subtitles: {
        yPos: 69,
        width: 700,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 531,
        size: 20,
        extraLargeMinimap: {
          yPos: 507,
        },
      },
      heroesRadiantBottomLeftXPos: 366,
      heroesDireBottomLeftXPos: 710,
      heroesHeight: 27,
      heroesWidth: 204,
      perfTracker: {
        xPos: 116,
        yPos: 40,
      },
      itemTracker: {
        xPos: 934,
        yPos: 720,
      },
      subtitles: {
        xPos: 920,
        yPos: 3,
        width: 248,
        height: 140,
      },
      roshanGlyph: {
        xPos: 168,
        yPos: 556,
        size: 74,
        extraLargeMinimap: {
          xPos: 193,
          yPos: 536,
        },
      },
    },
  },
  "1280x768": {
    fontSize: 9,
    preGame: {
      appButton: {
        xPos: 54,
        yPos: 8,
        size: 17,
      },
      heroesRadiantTopLeftXPos: 84,
      heroesDireTopLeftXPos: 761,
      heroesWidth: 434,
      subtitles: {
        yPos: 72,
        width: 700,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 524,
        size: 17,
        extraLargeMinimap: {
          yPos: 499,
        },
      },
      heroesRadiantBottomLeftXPos: 347,
      heroesDireBottomLeftXPos: 712,
      heroesHeight: 28,
      heroesWidth: 222,
      perfTracker: {
        xPos: 116,
        yPos: 43,
      },
      itemTracker: {
        xPos: 5,
        yPos: 593,
        extraLargeMinimap: {
          yPos: 568,
        },
      },
      subtitles: {
        xPos: 939,
        yPos: 3,
        width: 248,
        height: 140,
      },
      roshanGlyph: {
        xPos: 179,
        yPos: 597,
        size: 74,
        extraLargeMinimap: {
          xPos: 205,
          yPos: 574,
        },
      },
    },
  },

  "1280x800": {
    fontSize: 9,
    preGame: {
      appButton: {
        xPos: 54 - 47,
        yPos: 8 + 23 + 1,
        size: 17,
      },
      heroesRadiantTopLeftXPos: 61,
      heroesDireTopLeftXPos: 767,
      heroesWidth: 451,
      subtitles: {
        yPos: 76,
        width: 700,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 549,
        size: 17,
        extraLargeMinimap: {
          yPos: 523,
        },
      },
      heroesRadiantBottomLeftXPos: 334,
      heroesDireBottomLeftXPos: 716,
      heroesHeight: 29,
      heroesWidth: 229,
      perfTracker: {
        xPos: 7,
        yPos: 116,
      },
      itemTracker: {
        xPos: 5,
        yPos: 618,
        extraLargeMinimap: {
          yPos: 592,
        },
      },
      subtitles: {
        xPos: 953,
        yPos: 3,
        width: 248,
        height: 140,
      },
      roshanGlyph: {
        xPos: 186,
        yPos: 623,
        size: 74,
        extraLargeMinimap: {
          xPos: 213,
          yPos: 597,
        },
      },
    },
  },

  "1280x960": {
    fontSize: 11,
    preGame: {
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 767,
      heroesWidth: 440,

      subtitles: {
        //xPos: 240,
        yPos: 84,
        width: 800,
        height: 60,
      },
      appButton: {
        xPos: 8,
        yPos: 42,
        size: 20,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 274,
      heroesDireBottomLeftXPos: 732,
      heroesHeight: 35,
      heroesWidth: 274,
      perfTracker: {
        xPos: 122,
        yPos: 53,
      },
      itemTracker: {
        xPos: 1133 /* 1280 - 147 */,
        yPos: 871,
        //width: 147,
      },
      subtitles: {
        xPos: 1013,
        yPos: 2,
        width: 112,
        height: 280,
      },
      roshanGlyph: {
        xPos: 225,
        yPos: 743,
        size: 86,
      },
      appButton: {
        xPos: 5,
        yPos: 768,
        size: 25,
      },
    },
  },

  "1280x1024": {
    fontSize: 12,
    preGame: {
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 767,
      heroesWidth: 440,
      subtitles: {
        //xPos: 290,
        yPos: 86,
        width: 700,
        height: 60,
      },
      appButton: {
        xPos: 8,
        yPos: 42,
        size: 20,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 274,
      heroesDireBottomLeftXPos: 731,
      heroesHeight: 37,
      heroesWidth: 276,
      perfTracker: {
        xPos: 157,
        yPos: 57,
      },
      itemTracker: {
        xPos: 0,
        yPos: 793,
        //width: 190,
      },
      subtitles: {
        xPos: 925,
        yPos: 3,
        width: 192,
        height: 140,
      },
      roshanGlyph: {
        xPos: 223,
        yPos: 792,
        size: 93,
      },
      appButton: {
        xPos: 5,
        yPos: 768,
        size: 25,
      },
    },
  },

  "1366x768": {
    fontSize: 10,
    preGame: {
      appButton: {
        xPos: 80,
        yPos: 10,
        size: 20,
      },
      heroesRadiantTopLeftXPos: 144,
      heroesDireTopLeftXPos: 787,
      heroesWidth: 436,
      subtitles: {
        yPos: 74,
        width: 818,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 569,
        size: 20,
      },
      heroesRadiantBottomLeftXPos: 392,
      heroesDireBottomLeftXPos: 756,
      heroesHeight: 29,
      heroesWidth: 219,
      perfTracker: {
        xPos: 122,
        yPos: 43,
      },
      itemTracker: {
        xPos: 989,
        yPos: 768,
      },
      subtitles: {
        xPos: 982,
        yPos: 3,
        width: 266,
        height: 140,
      },
      roshanGlyph: {
        xPos: 180,
        yPos: 594,
        size: 76,
      },
    },
  },
  "1360x768": { reuse: "1366x768" },

  "1440x900": {
    fontSize: 11,
    preGame: {
      appButton: {
        xPos: 8,
        yPos: 42,
        size: 20,
      },
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 862,
      heroesWidth: 506,
      subtitles: {
        yPos: 86,
        width: 904,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 610,
        size: 23,
        extraLargeMinimap: {
          yPos: 580,
        },
      },
      heroesRadiantBottomLeftXPos: 376,
      heroesDireBottomLeftXPos: 806,
      heroesHeight: 33,
      heroesWidth: 258,
      perfTracker: {
        xPos: 8,
        yPos: 135,
      },
      itemTracker: {
        xPos: 5,
        yPos: 696,
        extraLargeMinimap: {
          yPos: 666,
        },
      },
      subtitles: {
        xPos: 1070,
        yPos: 3,
        width: 335,
        height: 140,
      },
      roshanGlyph: {
        xPos: 209,
        yPos: 697,
        size: 86,
        extraLargeMinimap: {
          xPos: 241,
          yPos: 672,
        },
      },
    },
  },
  "1440x1050": { reuse: "1440x900" },

  "1600x900": {
    fontSize: 12,
    preGame: {
      heroesRadiantTopLeftXPos: 153,
      heroesDireTopLeftXPos: 941,
      heroesWidth: 505,
      subtitles: {
        //xPos: 351,
        yPos: 80,
        width: 898,
        height: 60,
      },
      appButton: {
        xPos: 90,
        yPos: 16,
        size: 20,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 459 - 4,
      heroesDireBottomLeftXPos: 884 + 2,
      heroesHeight: 33,
      heroesWidth: 258,
      perfTracker: {
        xPos: 137,
        yPos: 50 + 1,
      },
      itemTracker: {
        xPos: 1199 - 24,
        yPos: 900,
        //width: 182,
      },
      subtitles: {
        xPos: 1150,
        yPos: 3,
        width: 305,
        height: 140,
      },
      roshanGlyph: {
        xPos: 210,
        yPos: 697,
        size: 93,
        extraLargeMinimap: {
          xPos: 238,
          yPos: 675,
        },
      },
      appButton: {
        xPos: 5,
        yPos: 668,
        size: 23,
        extraLargeMinimap: {
          yPos: 638,
        },
      },
    },
  },
  "1600x1024": { reuse: "1600x900" },

  "1600x1200": {
    fontSize: 14,
    preGame: {
      heroesRadiantTopLeftXPos: 83,
      heroesDireTopLeftXPos: 961,
      heroesWidth: 557,
      subtitles: {
        yPos: 100,
        width: 898,
        height: 60,
      },
      appButton: {
        xPos: 10,
        yPos: 45,
        size: 22,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 345,
      heroesDireBottomLeftXPos: 913,
      heroesHeight: 43,
      heroesWidth: 342,
      perfTracker: {
        xPos: 12,
        yPos: 176,
      },
      itemTracker: {
        xPos: 1317,
        yPos: 1088,
      },
      subtitles: {
        xPos: 1266,
        yPos: 3,
        width: 305,
        height: 140,
      },
      roshanGlyph: {
        xPos: 279,
        yPos: 937,
        size: 110,
        extraLargeMinimap: {
          xPos: 279 + 39 + 1,
          yPos: 937 - 38,
        },
      },
      appButton: {
        xPos: 5,
        yPos: 899,
        size: 22,
        extraLargeMinimap: {
          yPos: 860,
        },
      },
    },
  },

  "1680x1050": {
    fontSize: 13,
    preGame: {
      appButton: {
        xPos: 7,
        yPos: 45,
        size: 24,
      },
      heroesRadiantTopLeftXPos: 87,
      heroesDireTopLeftXPos: 1005,
      heroesWidth: 588,
      subtitles: {
        yPos: 95 + 5,
        width: 882,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 788 - 80 + 7,
        size: 25,
        extraLargeMinimap: {
          yPos: 788 - 80 + 7 - 35,
        },
      },
      heroesRadiantBottomLeftXPos: 442,
      heroesDireBottomLeftXPos: 940,
      heroesHeight: 39,
      heroesWidth: 298,
      perfTracker: {
        xPos: 159 - 149,
        yPos: 58 + 100,
      },
      itemTracker: {
        xPos: 5,
        yPos: 813 - 1,
        extraLargeMinimap: {
          yPos: 813 - 1 - 35,
        },
      },
      subtitles: {
        xPos: 1245,
        yPos: 3,
        width: 264 + 80,
        height: 140,
      },
      roshanGlyph: {
        xPos: 244,
        yPos: 813,
        size: 106 - 6,
        extraLargeMinimap: {
          xPos: 244 + 36,
          yPos: 813 - 29,
        },
      },
    },
  },
  "1728x1080": { reuse: "1600x900" },

  "1768x992": {
    fontSize: 13,
    preGame: {
      heroesRadiantTopLeftXPos: 193,
      heroesDireTopLeftXPos: 1017,
      heroesWidth: 559,
      subtitles: {
        //xPos: 461,
        yPos: 89,
        width: 846,
        height: 60,
      },
      appButton: {
        xPos: 105,
        yPos: 14,
        size: 24,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 505,
      heroesDireBottomLeftXPos: 978,
      heroesHeight: 37,
      heroesWidth: 284,
      perfTracker: {
        xPos: 150,
        yPos: 55,
      },
      itemTracker: {
        xPos: 1325,
        yPos: 992,
        //width: 203,
      },
      subtitles: {
        xPos: 1270,
        yPos: 3,
        width: 338,
        height: 140,
      },
      roshanGlyph: {
        xPos: 230,
        yPos: 768,
        size: 93,
      },
      appButton: {
        xPos: 5,
        yPos: 745,
        size: 24,
      },
    },
  },

  "1920x1080": {
    fontSize: 13.5,
    preGame: {
      heroesRadiantTopLeftXPos: 210,
      heroesDireTopLeftXPos: 1107,
      heroesWidth: 603,
      subtitles: {
        //xPos: 560,
        yPos: 115,
        width: 800,
        height: 60,
      },
      appButton: {
        xPos: 113,
        yPos: 16,
        size: 25,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 549,
      heroesDireBottomLeftXPos: 1062,
      heroesHeight: 39,
      heroesWidth: 308,

      perfTracker: {
        xPos: 159,
        yPos: 60,
      },
      itemTracker: {
        yPos: 1080,
        xPos: 1419,
        //width: 219,
        minimapRight: {
          xPos: 302,
        },
      },

      subtitles: {
        xPos: 1381,
        yPos: 4,
        width: 362,
        height: 140,
      },
      roshanGlyph: {
        xPos: 250,
        yPos: 841,
        size: 106,
        extraLargeMinimap: {
          xPos: 286,
          yPos: 810,
        },
      },
      appButton: {
        xPos: 9,
        yPos: 800, // 805 adjacent
        size: 25,
        extraLargeMinimap: {
          yPos: 765,
        },
      },
    },
  },
  "1920x1079": { reuse: "1920x1080" },

  "1920x1200": {
    fontSize: 15,
    preGame: {
      appButton: {
        xPos: 11,
        yPos: 55,
        size: 28,
      },
      heroesRadiantTopLeftXPos: 97,
      heroesDireTopLeftXPos: 1151,
      heroesWidth: 673,
      subtitles: {
        yPos: 114,
        width: 1020,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 898,
        size: 26,
        extraLargeMinimap: {
          yPos: 858,
        },
      },
      heroesRadiantBottomLeftXPos: 505,
      heroesDireBottomLeftXPos: 1072,
      heroesHeight: 44,
      heroesWidth: 344,
      perfTracker: {
        xPos: 11,
        yPos: 180,
      },
      itemTracker: {
        xPos: 39,
        yPos: 927,
        extraLargeMinimap: {
          yPos: 887,
        },
      },
      subtitles: {
        xPos: 1425,
        yPos: 3,
        width: 302,
        height: 160,
      },
      roshanGlyph: {
        xPos: 279,
        yPos: 937,
        size: 106,
        extraLargeMinimap: {
          yPos: 900,
          xPos: 319,
        },
      },
    },
  },
  "2048x1152": { reuse: "1920x1200" },

  "1920x1440": {
    fontSize: 16,
    preGame: {
      appButton: {
        xPos: 12,
        yPos: 50,
        size: 26,
      },
      heroesRadiantTopLeftXPos: 97,
      heroesDireTopLeftXPos: 1151,
      heroesWidth: 673,
      subtitles: {
        yPos: 124,
        width: 1028,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 1078,
        size: 31,
        extraLargeMinimap: {
          yPos: 1029,
        },
      },
      heroesRadiantBottomLeftXPos: 412,
      heroesDireBottomLeftXPos: 1094,
      heroesHeight: 53,
      heroesWidth: 413,
      perfTracker: {
        xPos: 14,
        yPos: 208,
      },
      itemTracker: {
        xPos: 44,
        yPos: 1112,
        extraLargeMinimap: {
          yPos: 1063,
        },
      },
      subtitles: {
        xPos: 1519,
        yPos: 3,
        width: 294 + 50,
        height: 140,
      },
      roshanGlyph: {
        xPos: 334,
        yPos: 1123,
        size: 116,
        extraLargeMinimap: {
          xPos: 384,
          yPos: 1077,
        },
      },
    },
  },

  "2560x1080": {
    fontSize: 14,
    preGame: {
      appButton: {
        xPos: 113,
        yPos: 16,
        size: 25,
      },
      heroesRadiantTopLeftXPos: 528,
      heroesDireTopLeftXPos: 1425,
      heroesWidth: 607,
      subtitles: {
        yPos: 99,
        width: 880,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 804,
        size: 26,
        extraLargeMinimap: {
          yPos: 804 - 31 - 5,
        },
      },
      heroesRadiantBottomLeftXPos: 869,
      heroesDireBottomLeftXPos: 1382,
      heroesHeight: 40,
      heroesWidth: 308,
      perfTracker: {
        xPos: 159,
        yPos: 60,
      },
      itemTracker: {
        xPos: 2279 - 219 - 75 - 20,
        yPos: 1080,
      },
      subtitles: {
        xPos: 1699,
        yPos: 3,
        width: 688,
        height: 80,
      },
      roshanGlyph: {
        xPos: 253,
        yPos: 836,
        size: 104,
        extraLargeMinimap: {
          xPos: 253 + 34 + 1,
          yPos: 836 - 27,
        },
      },
    },
  },

  "2560x1440": {
    fontSize: 17,
    preGame: {
      appButton: {
        xPos: 150,
        yPos: 21,
        size: 34,
      },
      heroesRadiantTopLeftXPos: 278,
      heroesDireTopLeftXPos: 1473,
      heroesWidth: 808,
      subtitles: {
        yPos: 133,
        width: 1228,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 5,
        yPos: 1078,
        size: 31,
        extraLargeMinimap: {
          yPos: 1078 - 41 - 7,
        },
      },
      heroesRadiantBottomLeftXPos: 734,
      heroesDireBottomLeftXPos: 1415,
      heroesHeight: 53,
      heroesWidth: 411,
      perfTracker: {
        xPos: 209,
        yPos: 80,
      },
      itemTracker: {
        xPos: 1949 - 61,
        yPos: 1440,
      },
      subtitles: {
        xPos: 1839,
        yPos: 3,
        width: 480,
        height: 140,
      },
      roshanGlyph: {
        xPos: 335,
        yPos: 1115,
        size: 134,
        extraLargeMinimap: {
          xPos: 335 + 48,
          yPos: 1115 - 38,
        },
      },
    },
  },

  "2715x1527": { reuse: "2560x1440" },

  "2560x1600": {
    // Added 19.1.2023
    fontSize: 19,
    preGame: {
      heroesRadiantTopLeftXPos: 131,
      heroesDireTopLeftXPos: 1535,
      heroesWidth: 893,
      subtitles: {
        //xPos: 592,
        yPos: 180,
        width: 1370,
        height: 80,
      },
      appButton: {
        xPos: 14,
        yPos: 66,
        size: 33,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 671,
      heroesDireBottomLeftXPos: 1431,
      heroesHeight: 59,
      heroesWidth: 459,
      perfTracker: {
        xPos: 250,
        yPos: 89,
      },
      itemTracker: {
        yPos: 1600,
        xPos: 1887,
        // width: 285,
      },
      subtitles: {
        xPos: 1902,
        yPos: 5,
        width: 396,
        height: 170,
      },
      roshanGlyph: {
        xPos: 372,
        yPos: 1239,
        size: 160,
      },
      appButton: {
        xPos: 11,
        yPos: 1229,
        size: 33,
      },
    },
  },

  "3440x1440": {
    fontSize: 17,
    preGame: {
      heroesRadiantTopLeftXPos: 721,
      heroesDireTopLeftXPos: 1915,
      heroesWidth: 801,
      subtitles: {
        // xPos: 1106,
        yPos: 133,
        width: 1228,
        height: 60,
      },
      appButton: {
        xPos: 150,
        yPos: 21,
        size: 34,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 1172,
      heroesDireBottomLeftXPos: 1856,
      heroesHeight: 68,
      heroesWidth: 411,
      perfTracker: {
        xPos: 220,
        yPos: 80,
      },
      itemTracker: {
        xPos: 2777,
        yPos: 1440,
        //width: 288,
      },
      subtitles: {
        xPos: 2281,
        yPos: 3,
        width: 793,
        height: 100,
      },
      roshanGlyph: {
        xPos: 382,
        yPos: 1067,
        size: 134,
      },
      appButton: {
        xPos: 5,
        yPos: 1034,
        size: 31,
      },
    },
  },

  "3840x1080": {
    fontSize: 13,
    preGame: {
      appButton: {
        xPos: 113,
        yPos: 16,
        size: 26,
      },
      heroesRadiantTopLeftXPos: 1168,
      heroesDireTopLeftXPos: 2065,
      heroesWidth: 607,
      subtitles: {
        yPos: 98 + 6,
        width: 894,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 666,
        yPos: 803,
        size: 26,
        extraLargeMinimap: {
          yPos: 803 - 30 - 5,
        },
      },
      heroesRadiantBottomLeftXPos: 1508,
      heroesDireBottomLeftXPos: 2021,
      heroesHeight: 39,
      heroesWidth: 312,
      perfTracker: {
        xPos: 159,
        yPos: 60,
      },
      itemTracker: {
        xPos: 3181,
        yPos: 1080,
      },
      subtitles: {
        xPos: 2341,
        yPos: 3,
        width: 1321,
        height: 40,
      },
      roshanGlyph: {
        xPos: 910,
        yPos: 836,
        size: 106,
        extraLargeMinimap: {
          xPos: 910 + 38,
          yPos: 836 - 29,
        },
      },
    },
  },

  "3840x2160": {
    fontSize: 26, /// CHECK ON 4K MONITOR!!!!!
    preGame: {
      heroesRadiantTopLeftXPos: 416,
      heroesDireTopLeftXPos: 2210,
      heroesWidth: 1214,
      subtitles: {
        //xPos: 1740,
        yPos: 208,
        width: 894,
        height: 60,
      },
      appButton: {
        xPos: 225,
        yPos: 32,
        size: 50,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 1101,
      heroesDireBottomLeftXPos: 2122,
      heroesHeight: 80,
      heroesWidth: 624,
      perfTracker: {
        xPos: 312,
        yPos: 120,
      },
      itemTracker: {
        xPos: 2876,
        yPos: 2160,
        //width: 441,
      },
      subtitles: {
        xPos: 2762,
        yPos: 3,
        width: 880,
        height: 80,
      },
      roshanGlyph: {
        xPos: 501,
        yPos: 1672,
        size: 212,
      },
      appButton: {
        xPos: 5,
        yPos: 1623,
        size: 45,
      },
    },
  },
  "4096x2160": { reuse: "3840x2160" },

  "5120x1440": {
    fontSize: 17,
    preGame: {
      appButton: {
        xPos: 151,
        yPos: 21,
        size: 34,
      },
      heroesRadiantTopLeftXPos: 1557,
      heroesDireTopLeftXPos: 2753,
      heroesWidth: 808,
      subtitles: {
        yPos: 140,
        width: 1184,
        height: 60,
      },
    },
    inGame: {
      appButton: {
        xPos: 885,
        yPos: 1076,
        size: 31,
        extraLargeMinimap: {
          yPos: 1028,
        },
      },
      heroesRadiantBottomLeftXPos: 2010,
      heroesDireBottomLeftXPos: 2695,
      heroesHeight: 53,
      heroesWidth: 413,
      perfTracker: {
        xPos: 209,
        yPos: 81,
      },
      itemTracker: {
        xPos: 3487,
        yPos: 1440,
      },
      subtitles: {
        xPos: 3120,
        yPos: 6,
        width: 1755,
        height: 40,
      },
      roshanGlyph: {
        xPos: 336 + 880,
        yPos: 1115,
        size: 140,
        extraLargeMinimap: {
          xPos: 1261,
          yPos: 1072,
        },
      },
    },
  },
};
