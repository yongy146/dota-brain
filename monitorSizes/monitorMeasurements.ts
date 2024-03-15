/**
 * This module provides information on the screens in Dota 2 for
 * the app to be able to properly position windows
 *
 * (C) Dota Coach, 2024. All rights reserved.
 */
import {
  IMonitorMeasurements,
  IMonitorMeasurementsOverwolf,
  IMonitorReuse,
  measurements,
} from "./measurements";
//import * as Logger from "@utilities/log/log";

/**
 * The function returns monitor measurements for a given Dota 2 display size.
 *
 * These measurements are used to position in-game windows and render their HTML content.
 *
 * If there is not details available for provided display size, then the
 * function returns information for the default screen size, which is 1920x1080.
 *
 * @param width Width of Dota 2 display size
 * @param height Height of Dota 2 display size
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
