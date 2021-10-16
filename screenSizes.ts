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

    // Add calculated fields by the performance tracker
    frame.inGame.tracker.performance.width = frame.inGame.tracker.performance.xPos / 159 * 230
    frame.inGame.tracker.performance.heightTwoKPIs = frame.inGame.tracker.performance.nonDotaPlus.height
    frame.inGame.tracker.performance.spacer = frame.inGame.tracker.performance.nonDotaPlus.height / 44 * 5
    frame.inGame.tracker.performance.statusWidth = frame.inGame.tracker.performance.xPos / 159 * 12

    frame.inGame.tracker.performance.xPosStatus = frame.inGame.tracker.performance.xPos / 159 * 38
    frame.inGame.tracker.performance.xPosCurrent = frame.inGame.tracker.performance.xPos / 159 * 57
    frame.inGame.tracker.performance.xPosGoal0 = frame.inGame.tracker.performance.xPos / 159 * 131
    frame.inGame.tracker.performance.xPosSeparator = frame.inGame.tracker.performance.xPos / 159 * 141
    frame.inGame.tracker.performance.xPosGoal1 = frame.inGame.tracker.performance.xPos / 159 * 151

    frame.inGame.tracker.items.xPosGoal0 = frame.inGame.tracker.items.width / 219 * 155
    frame.inGame.tracker.items.xPosSeparator = frame.inGame.tracker.items.width / 219 * 163
    frame.inGame.tracker.items.xPosGoal1 = frame.inGame.tracker.items.width / 219 * 175

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
      heroesRadiantBottomLeftXPos: 221, //292,//221,
      heroesDireBottomLeftXPos: 594, //540, //584,
      heroesHeight: 29,
      heroesWidth: 220, //192, //220,
      tracker: {
        fontSize: 9,
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
          width: 117+20,
        }
      }
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
      tracker: {
        fontSize: 9,
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
        }
      }
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
      tracker: {
        fontSize: 12,
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
        }
      }
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
      tracker: {
        fontSize: 10,
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
        }
      }
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
      tracker: {
        fontSize: 11,
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
        }
      }
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
      tracker: {
        fontSize: 12,
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
        }
      }
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
      tracker: {
        fontSize: 13,
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
        }
      }
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
      tracker: {
        fontSize: 13,
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
        }
      }
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
        items: { // Based on KOTL with 6 skills (incl. aghanim's shard and level 6)
          yPos: 1080, // yPos of where the next element below can be placed
          xPos: 1439, // xPos of HUD element where TP ends
          width: 219, // width to HUD element where gold starts
        }
      }


      /*tracker: {   // REVIEW AND OPTIMIZE LOGIC, OK???
        fontSize: 13.5,
        widthSeparator: 2, // Width of seperator between both goals
        performance: {
          // Overall window
          xPos: 159, // xPos of end of 'current values' with Dota Plus
          width: 230,
          heightTwoKPIs: 44, // hight of two KPIs  - CAN BE REMOVED?
          spacer: 5, // Spacer between GPM/XPM and KDA/LH&DN
          statusWidth: 12, // used for green and red triangle
          xPosStatus: 38, // KPI name would be at 24
          xPosCurrent: 57, // KPI name would be at 24
          xPosGoal0: 131, // Position right edge of textfield
          xPosSeparator: 141,
          xPosGoal1: 151,
          nonDotaPlus: {
            yPos: 104, // yPos of lower end of tracker (one line below Dota tracker)
            height: 44,
            yPosKDA: -1,
          },
          dotaPlus: {
            yPos: 147, // yPos of lower end of tracker (one line below Dota tracker)
            height: 87,
            yPosKDA: 19,
          },
        },
        items: { // Based on KOTL with 6 skills
          xPos: 1439,
          width: 219,
          xPosGoal0: 119, // MOVE TO xPosSpearator - 10... / text-align right
          xPosSeparator: 163,
          xPosGoal1: 175, // Should be 10 xp space... not 12
        }
      }*/
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
      tracker: {
        fontSize: 15,
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
        }
      }
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
      tracker: {
        fontSize: 16,
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
        }
      }
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
      tracker: {
        fontSize: 14,
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
          xPos: 2279-219,
          yPos: 1080,
          width: 219,
        }
      }
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
      tracker: {
        fontSize: 17,
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
        }
      }
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
      tracker: {
        fontSize: 13,
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
          xPos: 3577-264,
          yPos: 1080,
          width: 264,
        }
      }
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
      tracker: {
        fontSize: 26,/// CHECK ON 4K MONITOR!!!!!
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
        }
      }
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
      tracker: {
        fontSize: 17,
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
          xPos: 4760-264,
          yPos: 1440,
          width: 264,
        }
      }
    }
  }
}