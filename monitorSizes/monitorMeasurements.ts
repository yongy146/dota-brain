/**
 * This module provides information on the screens in Dota 2 for the app to be able to properly position windows
 *
 * (C) Dota Coach, 2023
 */
import {
  IMonitorMeasurements,
  IMonitorMeasurementsOverwolf,
  IMonitorReuse,
  measurements,
} from "./measurements";
import * as Logger from "@utilities/log/log";

/**
 * The function information on Dota 2 screens. This information can be used to position elements in the game.
 *
 * If there is not details availalbe for proivded screenSize, the it returns information for the default screen size, which is 1920x1080
 *
 * @param screenSize Screen size, e.g. 1920x1080
 * @returns
 */
export function getMonitorMeasurements(
  width: number,
  height: number
): IMonitorMeasurements {
  let result: Partial<IMonitorMeasurements> = {
    width,
    height,
  };

  const screenSize = `${width}x${height}`;
  if (measurements[screenSize] === undefined) {
    result.overwolf = <IMonitorMeasurementsOverwolf>measurements["1920x1080"];
    result.isCustomized = false;
    result.customization = "not configured";
  } else if ((<IMonitorReuse>measurements[screenSize]).reuse !== undefined) {
    result.overwolf = <IMonitorMeasurementsOverwolf>(
      measurements[(<IMonitorReuse>measurements[screenSize]).reuse]
    );
    result.isCustomized = true;
    result.customization = "piggy backed";
  } else {
    result.overwolf = <IMonitorMeasurementsOverwolf>measurements[screenSize];
    result.isCustomized = true;
    result.customization = "customized";
  }

  // Addjust html sizing for device-pixel-ratio
  const fontSize = result.overwolf.fontSize / window.devicePixelRatio;
  result.html = {
    fontSize,
    fontSizeSmall: fontSize * 0.8,
    inGame: {
      heroesWidth: result.overwolf.inGame.heroesWidth / window.devicePixelRatio,
      heroesHeight:
        result.overwolf.inGame.heroesHeight / window.devicePixelRatio,
    },
  };

  return result as IMonitorMeasurements;
}
