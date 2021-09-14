/**
 * This class provides information on the screens in Dota 2 for the app to be able to properly position windows
 * 
 * (C) Dota Coach, 2021
 */
 import { windowNames } from '../../consts';

/**
 * The function information on Dota 2 screens. This information can be used to position elements in the game.
 * 
 * If there is not details availalbe for proivded screenSitze, the it returns information for the default screen size, which is 1920x1080
 * 
 * @param screenSize Screen size, e.g. 1920x1080
 * @returns 
 */
export function getScreenDetails(screenSize: string): any {
    var frame = ScreenSizes.hasOwnProperty(screenSize) ? ScreenSizes[screenSize] : ScreenSizes['1920x1080']
    if (frame.hasOwnProperty('reuse')) frame = ScreenSizes[frame.reuse]

    // Report in order to be able to see the number of users
    if (!ScreenSizes.hasOwnProperty(screenSize)) {
      overwolf.windows.sendMessage(windowNames.background, "ga", {eventCategory: "error", eventAction: "screenSizes.getScreenDetails", eventLabel: `Monitor size ${screenSize} not yet customized` }, () => { })
    }

    return frame
}


export const ScreenSizes = {
  '1024x768': {
    preGame: {
      heroesRadiantTopLeftXPos: 58,
      heroesDireTopLeftXPos: 614,
      heroesWidth: 352,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 221,
      heroesDireBottomLeftXPos: 584,
      heroesHeight: 29,
      heroesWidth: 220,
    }
  },
  '1024x600': { reuse: '1024x768' },

  '1280x720': {
    preGame: {
      heroesRadiantTopLeftXPos: 140,
      heroesDireTopLeftXPos: 739,
      heroesWidth: 403,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 366,
      heroesDireBottomLeftXPos: 709,
      heroesHeight: 27,
      heroesWidth: 204,
    }
  },
  '1280x768': { reuse: '1280x720' },
  '1280x800': { reuse: '1280x720' },
  '1280x960': { reuse: '1280x720' },

  '1280x1024': {
    preGame: {
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 767,
      heroesWidth: 440,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 274,
      heroesDireBottomLeftXPos: 731,
      heroesHeight: 37,
      heroesWidth: 276,
    }
  },

  '1366x768': {
    preGame: {
      heroesRadiantTopLeftXPos: 144,
      heroesDireTopLeftXPos: 787,
      heroesWidth: 436,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 392,
      heroesDireBottomLeftXPos: 755,
      heroesHeight: 29,
      heroesWidth: 219,
    }
  },
  '1360x768': { reuse: '1366x768' },

  '1440x900': {
    preGame: {
      heroesRadiantTopLeftXPos: 73,
      heroesDireTopLeftXPos: 862,
      heroesWidth: 506,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 379,
      heroesDireBottomLeftXPos: 804,
      heroesHeight: 33,
      heroesWidth: 258,
    }
  },
  '1440x1050': { reuse: '1440x900' },

  '1600x900': {
    preGame: {
      heroesRadiantTopLeftXPos: 153,
      heroesDireTopLeftXPos: 941,
      heroesWidth: 505,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 459,
      heroesDireBottomLeftXPos: 884,
      heroesHeight: 33,
      heroesWidth: 258,
    }
  },
  '1600x1024': { reuse: '1600x900' },
  '1600x1200': { reuse: '1600x900' },

  '1680x1050': {
    preGame: {
      heroesRadiantTopLeftXPos: 87,
      heroesDireTopLeftXPos: 1005,
      heroesWidth: 588,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 443,
      heroesDireBottomLeftXPos: 939,
      heroesHeight: 39,
      heroesWidth: 298,
    }
  },
  '1728x1080': { reuse: '1600x900' },

  '1768x992': {
    preGame: {
      heroesRadiantTopLeftXPos: 193,
      heroesDireTopLeftXPos: 1017,
      heroesWidth: 559,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 505,
      heroesDireBottomLeftXPos: 978,
      heroesHeight: 37,
      heroesWidth: 284,
    }
  },

  '1920x1080': {
    preGame: {
        // Heroes: Excluding the grey shaded box
        heroesRadiantTopLeftXPos: 210,
        heroesDireTopLeftXPos: 1107,
        heroesWidth: 603,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 549,
      heroesDireBottomLeftXPos: 1062,
      heroesHeight: 39,
      heroesWidth: 308,
      tracker: {
        fontSize: 13.5,
        //letterSpacing: -0.5,
        //letterSpacingValues: 1.7,
        widthSeparator: 2,

        performance: {
          // Overall window
          yPos: 60,
          xPosStats: 10,

          // Status
          statusWidth: 12,
          // Area spacer
          areaSpacer: 20,
          // Area 2
          heightArea2: 45,
          yPosGPM: 3,
          yPosXPM: 25,

          nonDotaPlus: {
            heightArea1: 80,
            yPosKDA: 24, // Ma
            yPosCS: 45,
            xPosCurrent: 70,
            xPosStatus: 95,
          },
          dotaPlus: {
            heightArea1: 87,
            yPosKDA: 22, // KPI name would be at 24
            yPosCS: 44, // KPI name would be at 45
            xPosStatus: 68,
            xPosCurrent: 95,
          },
          xPosGoal0: 177,
          xPosSeparator: 266,
          xPosGoal1: 281,
        },
        items: { // Based on KOTL with 6 skills
          xPos: 1439, //1461,
          width: 219, //181,
          xPosGoal0: 119,
          xPosSeparator: 163,
          xPosGoal1: 175,
          //heightItems: 72,
          //itemHeight: 23,
          //yPosItems0: 7,
          //yPosItems1: 41,
        }
      }
      /*belowKPIs: 104+100,*/
    }
  },
  '1920x1079': { reuse: '1920x1080' },
  
  '1920x1200': {
    preGame: {
      heroesRadiantTopLeftXPos: 97,
      heroesDireTopLeftXPos: 1151,
      heroesWidth: 673,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 505,
      heroesDireBottomLeftXPos: 1072,
      heroesHeight: 44,
      heroesWidth: 344,
    }
  },
  '2048x1152': { reuse: '1920x1200' },

  '1920x1440': {
    preGame: {
      heroesRadiantTopLeftXPos: 97,
      heroesDireTopLeftXPos: 1151,
      heroesWidth: 673,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 412,
      heroesDireBottomLeftXPos: 1094,
      heroesHeight: 53,
      heroesWidth: 413,
    }
  },

  '2560x1080': {
    preGame: {
      heroesRadiantTopLeftXPos: 528,
      heroesDireTopLeftXPos: 1425,
      heroesWidth: 607,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 869,
      heroesDireBottomLeftXPos: 1382,
      heroesHeight: 40,
      heroesWidth: 308,
    }
  },

  '2560x1440': {
    preGame: {
      heroesRadiantTopLeftXPos: 278,
      heroesDireTopLeftXPos: 1473,
      heroesWidth: 808,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 734,
      heroesDireBottomLeftXPos: 1415,
      heroesHeight: 53,
      heroesWidth: 411,
    }
  },
  '2560x1600': { reuse: '2560x1440' },
  '2715x1527': { reuse: '2560x1440' },
  '3440x1440': { reuse: '2560x1440' },

  '3840x1080': {
    preGame: {
      heroesRadiantTopLeftXPos: 1168,
      heroesDireTopLeftXPos: 2065,
      heroesWidth: 607,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 1508,
      heroesDireBottomLeftXPos: 2021,
      heroesHeight: 39,
      heroesWidth: 312,
    }
  },

  '3840x2160': {
    preGame: {
      heroesRadiantTopLeftXPos: 416,
      heroesDireTopLeftXPos: 2210,
      heroesWidth: 1214,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 1101,
      heroesDireBottomLeftXPos: 2122,
      heroesHeight: 80,
      heroesWidth: 624,
    }
  },
  '4096x2160': { reuse: '3840x2160' },

  '5120x1440': {
    preGame: {
      heroesRadiantTopLeftXPos: 1557,
      heroesDireTopLeftXPos: 2753,
      heroesWidth: 808,
    },
    inGame: {
      heroesRadiantBottomLeftXPos: 2014,
      heroesDireBottomLeftXPos: 2694,
      heroesHeight: 53,
      heroesWidth: 414,
    }
  }
}