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
    // Heroes: Excluding the grey shaded box
    heroesRadiantTopLeftXPos: number;
    heroesDireTopLeftXPos: number;
    heroesWidth: number;

    subtitles: {
      // Position where to put the subtitles
      xPos: number; // Middle hero radiant
      yPos: number; // One line above 'STRATEGY/LOADOUT / GUIDES'
      width: number; // From middle hero radiant to middle hero dire
      height: number; // High such that longest 'hero selection' text can be shown
    };

    // Ingame app button
    appButton: {
      xPos: number;
      yPos: number;
      size: number; // Probably there is only one size needed... should be the same in-game and during hero-selection, I think
    };
  };
  inGame: {
    heroesRadiantBottomLeftXPos: number; // Infoboxes need to be migrated to TopLeft... and not bottom left.
    heroesDireBottomLeftXPos: number;
    heroesWidth: number; // width of 5 heroes
    heroesHeight: number; // height of heroes display by Dota 2

    tracker: {
      performance: {
        xPos: number; // xPos of end of 'Current' of last zero (white area) with Dota Plus | w/o Dota Plus a little more right than last 0 (such that the spacing would be similar to the Dota icons; including last line)
        yPos: number; // yPos of upper end of Dota 2 tracker (same for Dota Plus subscribers and non-subscribers)
      };
      items: {
        // Based on KOTL with 6 skills (incl. Aghanim's shard and level 6)
        yPos: number; // Currently we take the bottom of the window (i.e. the height of the window)
        xPos: number; // xPos of HUD element where TP ends
        width: number; // width to HUD element where gold starts
        minimapRight?: {
          xPos: number;
        };
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

    appButton: {
      xPos: number;
      yPos: number;
      size: number; // Hight between Dota 2's size of settings cogs or hambuger menu
      extraLargeMinimap?: {
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
        xPos: 212,
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
      tracker: {
        performance: {
          xPos: 111,
          yPos: 43,
        },
        items: {
          xPos: 0,
          yPos: 594,
          width: 117 + 20,
        },
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
      heroesRadiantTopLeftXPos: 140,
      heroesDireTopLeftXPos: 739,
      heroesWidth: 403,

      subtitles: {
        xPos: 290,
        yPos: 66,
        width: 700,
        height: 60,
      },
      appButton: {
        xPos: 75,
        yPos: 11,
        size: 15,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 366,
      heroesDireBottomLeftXPos: 709,
      heroesHeight: 27,
      heroesWidth: 204,
      tracker: {
        performance: {
          xPos: 116,
          yPos: 40,
        },
        items: {
          xPos: 959,
          yPos: 720,
          width: 147,
        },
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
      },
      appButton: {
        xPos: 5,
        yPos: 538,
        size: 20,
      },
    },
  },
  "1280x768": { reuse: "1280x720" },
  "1280x800": { reuse: "1280x720" },

  "1280x960": {
    fontSize: 11,
    preGame: {
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 767,
      heroesWidth: 440,

      subtitles: {
        xPos: 240,
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
      tracker: {
        performance: {
          xPos: 122,
          yPos: 53,
        },
        items: {
          xPos: 1133 /* 1280 - 147 */,
          yPos: 871,
          width: 147,
        },
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
        xPos: 290,
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
      tracker: {
        performance: {
          xPos: 157,
          yPos: 57,
        },
        items: {
          xPos: 0,
          yPos: 793,
          width: 190,
        },
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
      heroesRadiantTopLeftXPos: 144,
      heroesDireTopLeftXPos: 787,
      heroesWidth: 436,
      subtitles: {
        xPos: 274,
        yPos: 69,
        width: 818,
        height: 60,
      },
      appButton: {
        xPos: 80,
        yPos: 11,
        size: 20,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 392,
      heroesDireBottomLeftXPos: 755,
      heroesHeight: 29,
      heroesWidth: 219,
      tracker: {
        performance: {
          xPos: 122,
          yPos: 43,
        },
        items: {
          xPos: 1024,
          yPos: 768,
          width: 156,
        },
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
      appButton: {
        xPos: 5,
        yPos: 575,
        size: 20,
      },
    },
  },
  "1360x768": { reuse: "1366x768" },

  "1440x900": {
    fontSize: 11,
    preGame: {
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 862,
      heroesWidth: 506,
      subtitles: {
        xPos: 268,
        yPos: 81,
        width: 904,
        height: 60,
      },
      appButton: {
        xPos: 8,
        yPos: 42,
        size: 20,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 379,
      heroesDireBottomLeftXPos: 804,
      heroesHeight: 33,
      heroesWidth: 258,
      tracker: {
        performance: {
          xPos: 137,
          yPos: 50,
        },
        items: {
          xPos: 0,
          yPos: 697,
          width: 183,
        },
      },
      subtitles: {
        xPos: 1070,
        yPos: 3,
        width: 224,
        height: 140,
      },
      roshanGlyph: {
        xPos: 210,
        yPos: 697,
        size: 86,
      },
      appButton: {
        xPos: 5,
        yPos: 673,
        size: 23,
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
        xPos: 351,
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
      heroesRadiantBottomLeftXPos: 459,
      heroesDireBottomLeftXPos: 884,
      heroesHeight: 33,
      heroesWidth: 258,
      tracker: {
        performance: {
          xPos: 137,
          yPos: 50,
        },
        items: {
          xPos: 1199,
          yPos: 900,
          width: 182,
        },
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
      },
      appButton: {
        xPos: 5,
        yPos: 674,
        size: 23,
      },
    },
  },
  "1600x1024": { reuse: "1600x900" },
  "1600x1200": { reuse: "1600x900" },

  "1680x1050": {
    fontSize: 13,
    preGame: {
      heroesRadiantTopLeftXPos: 87,
      heroesDireTopLeftXPos: 1005,
      heroesWidth: 588,
      subtitles: {
        xPos: 399,
        yPos: 95,
        width: 882,
        height: 60,
      },
      appButton: {
        xPos: 7,
        yPos: 45,
        size: 24,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 443,
      heroesDireBottomLeftXPos: 939,
      heroesHeight: 39,
      heroesWidth: 298,
      tracker: {
        performance: {
          xPos: 159,
          yPos: 58,
        },
        items: {
          xPos: 0,
          yPos: 813,
          width: 213,
        },
      },
      subtitles: {
        xPos: 1245,
        yPos: 3,
        width: 264,
        height: 140,
      },
      roshanGlyph: {
        xPos: 244,
        yPos: 813,
        size: 106,
      },
      appButton: {
        xPos: 5,
        yPos: 788 - 80,
        size: 25,
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
        xPos: 461,
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
      tracker: {
        performance: {
          xPos: 150,
          yPos: 55,
        },
        items: {
          xPos: 1325,
          yPos: 992,
          width: 203,
        },
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
        xPos: 560,
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

      tracker: {
        performance: {
          xPos: 159,
          yPos: 60,
        },
        items: {
          yPos: 1080,
          xPos: 1439 - 20,
          width: 219,
          minimapRight: {
            xPos: 1920 - 1439 - 219 + 40,
          },
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
      heroesRadiantTopLeftXPos: 97,
      heroesDireTopLeftXPos: 1151,
      heroesWidth: 673,
      subtitles: {
        xPos: 450,
        yPos: 109,
        width: 1020,
        height: 60,
      },
      appButton: {
        xPos: 11,
        yPos: 55,
        size: 28,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 505,
      heroesDireBottomLeftXPos: 1072,
      heroesHeight: 44,
      heroesWidth: 344,
      tracker: {
        performance: {
          xPos: 178,
          yPos: 67,
        },
        items: {
          xPos: 0,
          yPos: 929,
          width: 243,
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
      },
      appButton: {
        xPos: 5,
        yPos: 902,
        size: 25,
      },
    },
  },
  "2048x1152": { reuse: "1920x1200" },

  "1920x1440": {
    fontSize: 16,
    preGame: {
      heroesRadiantTopLeftXPos: 97,
      heroesDireTopLeftXPos: 1151,
      heroesWidth: 673,
      subtitles: {
        xPos: 446,
        yPos: 124,
        width: 1028,
        height: 60,
      },
      appButton: {
        xPos: 12,
        yPos: 50,
        size: 26,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 412,
      heroesDireBottomLeftXPos: 1094,
      heroesHeight: 53,
      heroesWidth: 413,
      tracker: {
        performance: {
          xPos: 224,
          yPos: 80,
        },
        items: {
          xPos: 0,
          yPos: 1115,
          width: 250,
        },
      },
      subtitles: {
        xPos: 1386,
        yPos: 3,
        width: 294,
        height: 140,
      },
      roshanGlyph: {
        xPos: 334,
        yPos: 1123,
        size: 106,
      },
      appButton: {
        xPos: 5,
        yPos: 1084,
        size: 31,
      },
    },
  },

  "2560x1080": {
    fontSize: 14,
    preGame: {
      heroesRadiantTopLeftXPos: 528,
      heroesDireTopLeftXPos: 1425,
      heroesWidth: 607,
      subtitles: {
        xPos: 840,
        yPos: 99,
        width: 880,
        height: 60,
      },
      appButton: {
        xPos: 113,
        yPos: 16,
        size: 25,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 869,
      heroesDireBottomLeftXPos: 1382,
      heroesHeight: 40,
      heroesWidth: 308,
      tracker: {
        performance: {
          xPos: 159,
          yPos: 60,
        },
        items: {
          xPos: 2279 - 219,
          yPos: 1080,
          width: 219,
        },
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
      },
      appButton: {
        xPos: 5,
        yPos: 810,
        size: 26,
      },
    },
  },

  "2560x1440": {
    fontSize: 17,
    preGame: {
      heroesRadiantTopLeftXPos: 278,
      heroesDireTopLeftXPos: 1473,
      heroesWidth: 808,
      subtitles: {
        xPos: 666,
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
      heroesRadiantBottomLeftXPos: 734,
      heroesDireBottomLeftXPos: 1415,
      heroesHeight: 53,
      heroesWidth: 411,
      tracker: {
        performance: {
          xPos: 209,
          yPos: 80,
        },
        items: {
          xPos: 1949,
          yPos: 1440,
          width: 264,
        },
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
      },
      appButton: {
        xPos: 5,
        yPos: 1084,
        size: 31,
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
        xPos: 592,
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
      tracker: {
        performance: {
          xPos: 250,
          yPos: 89,
        },
        items: {
          yPos: 1600,
          xPos: 1887,
          width: 285,
        },
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
        xPos: 1106,
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
      tracker: {
        performance: {
          xPos: 220,
          yPos: 80,
        },
        items: {
          xPos: 2777,
          yPos: 1440,
          width: 288,
        },
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
      heroesRadiantTopLeftXPos: 1168,
      heroesDireTopLeftXPos: 2065,
      heroesWidth: 607,
      subtitles: {
        xPos: 1473,
        yPos: 98,
        width: 894,
        height: 60,
      },
      appButton: {
        xPos: 113,
        yPos: 16,
        size: 26,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 1508,
      heroesDireBottomLeftXPos: 2021,
      heroesHeight: 39,
      heroesWidth: 312,
      tracker: {
        performance: {
          xPos: 159,
          yPos: 60,
        },
        items: {
          xPos: 3577 - 264,
          yPos: 1080,
          width: 264,
        },
      },
      subtitles: {
        xPos: 2341,
        yPos: 3,
        width: 1321,
        height: 40,
      },
      roshanGlyph: {
        xPos: 254,
        yPos: 836,
        size: 106,
      },
      appButton: {
        xPos: 5,
        yPos: 810,
        size: 26,
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
        xPos: 1740,
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
      tracker: {
        performance: {
          xPos: 312,
          yPos: 120,
        },
        items: {
          xPos: 2876,
          yPos: 2160,
          width: 441,
        },
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
      heroesRadiantTopLeftXPos: 1557,
      heroesDireTopLeftXPos: 2753,
      heroesWidth: 808,
      subtitles: {
        xPos: 1968,
        yPos: 132,
        width: 1184,
        height: 60,
      },
      appButton: {
        xPos: 151,
        yPos: 21,
        size: 34,
      },
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 2014,
      heroesDireBottomLeftXPos: 2694,
      heroesHeight: 53,
      heroesWidth: 414,
      tracker: {
        performance: {
          xPos: 209,
          yPos: 80,
        },
        items: {
          xPos: 4760 - 264,
          yPos: 1440,
          width: 264,
        },
      },
      subtitles: {
        xPos: 3120,
        yPos: 6,
        width: 1755,
        height: 40,
      },
      roshanGlyph: {
        xPos: 336,
        yPos: 1115,
        size: 140,
      },
      appButton: {
        xPos: 5,
        yPos: 1084,
        size: 31,
      },
    },
  },
};
