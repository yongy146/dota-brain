/**
 * This class provides information on the screens in Dota 2 for the app to be able to properly position windows
 *
 * (C) Dota Coach, 2021
 */

/**
 * The function information on Dota 2 screens. This information can be used to position elements in the game.
 *
 * If there is not details availalbe for proivded screenSitze, the it returns information for the default screen size, which is 1920x1080
 *
 * @param screenSize Screen size, e.g. 1920x1080
 * @returns
 */
export function getScreenDetails(screenSize: string): ScreenDefinition {
  let frame = Object.prototype.hasOwnProperty.call(ScreenSizes, screenSize)
    ? ScreenSizes[screenSize]
    : ScreenSizes["1920x1080"];
  if (Object.prototype.hasOwnProperty.call(frame, "reuse"))
    frame = ScreenSizes[(<ScreenReuse>frame).reuse];

  frame = <ScreenDefinition>frame;

  // Add calculated fields by the performance tracker
  frame.inGame.tracker.performance.width =
    (frame.inGame.tracker.performance.xPos / 159) * 230;
  frame.inGame.tracker.performance.heightTwoKPIs =
    frame.inGame.tracker.performance.nonDotaPlus.height;
  frame.inGame.tracker.performance.spacer =
    (frame.inGame.tracker.performance.nonDotaPlus.height / 44) * 5;
  frame.inGame.tracker.performance.statusWidth =
    (frame.inGame.tracker.performance.xPos / 159) * 12;

  frame.inGame.tracker.performance.xPosStatus =
    (frame.inGame.tracker.performance.xPos / 159) * 38;
  frame.inGame.tracker.performance.xPosCurrent =
    (frame.inGame.tracker.performance.xPos / 159) * 57;
  frame.inGame.tracker.performance.xPosGoal0 =
    (frame.inGame.tracker.performance.xPos / 159) * 131;
  frame.inGame.tracker.performance.xPosSeparator =
    (frame.inGame.tracker.performance.xPos / 159) * 141;
  frame.inGame.tracker.performance.xPosGoal1 =
    (frame.inGame.tracker.performance.xPos / 159) * 151;

  frame.inGame.tracker.items.xPosGoal0 =
    (frame.inGame.tracker.items.width / 219) * 155;
  frame.inGame.tracker.items.xPosSeparator =
    (frame.inGame.tracker.items.width / 219) * 163;
  frame.inGame.tracker.items.xPosGoal1 =
    (frame.inGame.tracker.items.width / 219) * 175;

  return frame;
}

export function isScreenCustomized(screenSize: string): boolean {
  return Object.prototype.hasOwnProperty.call(ScreenSizes, screenSize);
}

/**
 *
 * @param screenSize String containing <width x height>, e.g. '1920x1080'
 * @returns "piggy backed", "customized" or "not configured"
 */
export function getScreenCustomization(screenSize: string): string {
  if (Object.prototype.hasOwnProperty.call(ScreenSizes, screenSize)) {
    const frame = Object.prototype.hasOwnProperty.call(ScreenSizes, screenSize);
    if (Object.prototype.hasOwnProperty.call(frame, "reuse")) {
      return "piggy backed";
    } else {
      return "customized";
    }
  } else {
    return "not configured";
  }
}

export interface ScreenDefinition {
  fontSize: number; // used for tracker and subtitle (take KDA font size and add 20%)
  // How to use the font size: document.documentElement.style.setProperty("--font_size", `${this.screen.fontSize/window.devicePixelRatio}px`)
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
      size: number;
    };
  };
  inGame: {
    heroesRadiantTopLeftXPos?: number;
    heroesDireTopLeftXPos?: number;
    heroesRadiantBottomLeftXPos: number; // Infoboxes need to be migrated to TopLeft... and not bottom left.
    heroesDireBottomLeftXPos: number;

    heroesWidth: number; // width of 5 heroes
    heroesHeight: number; // height of heroes display by Dota 2

    tracker: {
      performance: {
        xPos: number; // xPos of end of 'Current' of last zero (white area) with Dota Plus
        yPos: number; // yPos of upper end of Dota 2 tracker
        nonDotaPlus: {
          height: number; // height of KDA & LH/DN provided by app
          yPosKDA: number;
        };
        dotaPlus: {
          height: number;
          yPosKDA: number;
        };
        width?: number; // calcuated value
        heightTwoKPIs?: number; // calcuated value
        spacer?: number; // calcuated value
        statusWidth?: number; // calcuated value

        xPosStatus?: number; // calcuated value
        xPosCurrent?: number; // calcuated value
        xPosGoal0?: number; // calcuated value
        xPosSeparator?: number; // calcuated value
        xPosGoal1?: number; // calcuated value
      };
      items: {
        // Based on KOTL with 6 skills (incl. Aghanim's shard and level 6)
        yPos: number; // yPos of where the next element on the window starts
        xPos: number; // xPos of HUD element where TP ends
        width: number; // width to HUD element where gold starts

        xPosGoal0?: number; // calcuated value
        xPosSeparator?: number; // calcuated value
        xPosGoal1?: number; // calcuated value
      };
    };

    subtitles: {
      // Position and sizing of the subtitles
      xPos: number; // 4 pixels right of hero icons
      yPos: number; // 4 pixels form top of screen
      width: number; // 4 pixels from loss in / out
      height: number; // high such that longes text is visble
    };
  };
  roshanGlyph: {
    xPos: number;
    yPos: number;
    size: number; // Roshan glyph window has same widht and height
  };
  appButton: {
    xPos: number;
    yPos: number;
    size: number;
  };
}

export interface ScreenReuse {
  reuse: string /* e.g. '1920x1080' */;
}

export interface ScreenDefinitions {
  [key: string /* e.g. '1920x1080' */]: ScreenDefinition | ScreenReuse;
}

export const ScreenSizes: ScreenDefinitions = {
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
          nonDotaPlus: {
            height: 28,
            yPosKDA: -1,
          },
          dotaPlus: {
            height: 60,
            yPosKDA: 13,
          },
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
          nonDotaPlus: {
            height: 30,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 59,
            yPosKDA: 13,
          },
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
          nonDotaPlus: {
            height: 36, // Not yet verfiied with Dota Plus...
            yPosKDA: -3, //-2, // Not yet verfiied with Dota Plus...
          },
          dotaPlus: {
            height: 53,
            yPosKDA: 13,
          },
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
          nonDotaPlus: {
            height: 40,
            yPosKDA: -1,
          },
          dotaPlus: {
            height: 80,
            yPosKDA: 18,
          },
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
          nonDotaPlus: {
            height: 32,
            yPosKDA: 0,
          },
          dotaPlus: {
            height: 62,
            yPosKDA: 14,
          },
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
          nonDotaPlus: {
            height: 36,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 72,
            yPosKDA: 16,
          },
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
          nonDotaPlus: {
            height: 36,
            yPosKDA: -1,
          },
          dotaPlus: {
            height: 72,
            yPosKDA: 16,
          },
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
          nonDotaPlus: {
            height: 42,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 83,
            yPosKDA: 18,
          },
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
          nonDotaPlus: {
            height: 40,
            yPosKDA: -2, // WRONG
          },
          dotaPlus: {
            height: 79,
            yPosKDA: 16,
          },
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

  "1920x1080": {
    fontSize: 13.5, // used for tracker and subtitle
    // How to use the font size: document.documentElement.style.setProperty("--font_size", `${this.screen.fontSize/window.devicePixelRatio}px`)
    preGame: {
      // Heroes: Excluding the grey shaded box
      heroesRadiantTopLeftXPos: 210,
      heroesDireTopLeftXPos: 1107,
      heroesWidth: 603,

      subtitles: {
        // Position where to put the subtitles
        xPos: 560, // Middle hero radiant
        yPos: 115, // One line above 'STRATEGY / LOADOUT / GUIDES'
        width: 800, // From middle hero radiant to middle hero dire
        height: 60, // High such that longest 'hero selection' text can be shown
      },
      appButton: {
        xPos: 113,
        yPos: 16,
        size: 25,
      },
    },
    inGame: {
      heroesRadiantTopLeftXPos: 545,
      heroesRadiantBottomLeftXPos: 549,
      heroesDireTopLeftXPos: 1066,
      heroesDireBottomLeftXPos: 1062,
      heroesHeight: 39,
      heroesWidth: 308,

      tracker: {
        performance: {
          xPos: 159, // xPos of end of 'Current' of last zero (white area) with Dota Plus
          yPos: 60, // yPos of upper end of Dota 2 tracker
          nonDotaPlus: {
            height: 44,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 87,
            yPosKDA: 19,
          },
        },
        items: {
          // Based on KOTL with 6 skills (incl. aghanim's shard and level 6)
          yPos: 1080, // yPos of where the next element below can be placed
          xPos: 1439, // xPos of HUD element where TP ends
          width: 219, // width to HUD element where gold starts
        },
      },

      subtitles: {
        // Position and sizing of the subtitles
        xPos: 1381, // 4 pixels right of hero icons
        yPos: 4, // 4 pixels form top of screen
        width: 362, // 4 pixels from loss in / out
        height: 140, // high such that longes text is visble
      },
    },
    roshanGlyph: {
      xPos: 250,
      yPos: 841,
      size: 106,
    },
    appButton: {
      xPos: 5,
      yPos: 805,
      size: 30,
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
          nonDotaPlus: {
            height: 50,
            yPosKDA: -1,
          },
          dotaPlus: {
            height: 98,
            yPosKDA: 20,
          },
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
          nonDotaPlus: {
            height: 56,
            yPosKDA: -3,
          },
          dotaPlus: {
            height: 112,
            yPosKDA: 23,
          },
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
          nonDotaPlus: {
            height: 44, // WRONG
            yPosKDA: -2, // WRONG
          },
          dotaPlus: {
            height: 87,
            yPosKDA: 19,
          },
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
          nonDotaPlus: {
            height: 58, // WRONG
            yPosKDA: -2, // WRONG
          },
          dotaPlus: {
            height: 115,
            yPosKDA: 25,
          },
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
  "2560x1600": { reuse: "2560x1440" },
  "2715x1527": { reuse: "2560x1440" },

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
          nonDotaPlus: {
            height: 58,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 115,
            yPosKDA: 25,
          },
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
          nonDotaPlus: {
            height: 44,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 87,
            yPosKDA: 19,
          },
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
          nonDotaPlus: {
            height: 88, // WRONG
            yPosKDA: -2, // WRONG
          },
          dotaPlus: {
            height: 174,
            yPosKDA: 37,
          },
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
          nonDotaPlus: {
            height: 58,
            yPosKDA: -2,
          },
          dotaPlus: {
            height: 115,
            yPosKDA: 28,
          },
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
};
