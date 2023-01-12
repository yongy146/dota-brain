/**
 * This class provides information on the screens in Dota 2 for the app to be able to properly position windows
 *
 * (C) Dota Coach, 2021
 */
import { IMonitorMeasurements, IMonitorReuse, measurements } from "./measurements";

export class MonitorMeasurements {
  public readonly width: number;
  public readonly height: number;
  public measurements: IMonitorMeasurements;
  public readonly customization: "piggy backed" | "customized" | "not configured";

  get isCustomized(): boolean {
    return this.customization !== "not configured";
  }

  get fontSize(): number {
    return this.measurements.fontSize / window.devicePixelRatio;
  }
  get fontSizeSmall(): number {
    return this.fontSize * 0.8;
  }

  /**
   * The function information on Dota 2 screens. This information can be used to position elements in the game.
   *
   * If there is not details availalbe for proivded screenSize, the it returns information for the default screen size, which is 1920x1080
   *
   * @param screenSize Screen size, e.g. 1920x1080
   * @returns
   */
  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    const screenSize = `${width}x${height}`;
    if (measurements[screenSize] === undefined) {
      this.measurements = <IMonitorMeasurements>measurements["1920x1080"];
      this.customization = "not configured";
      this.measurements.isCustomized = false;
    } else if ((<IMonitorReuse>measurements[screenSize]).reuse !== undefined) {
      this.measurements = <IMonitorMeasurements>(
        measurements[(<IMonitorReuse>measurements[screenSize]).reuse]
      );
      this.customization = "piggy backed";
      this.measurements.isCustomized = true;
    } else {
      this.measurements = <IMonitorMeasurements>measurements[screenSize];
      this.customization = "customized";
      this.measurements.isCustomized = true;
    }

    this.measurements = JSON.parse(JSON.stringify(this.measurements));

    this.measurements.width = width;
    this.measurements.height = height;
    this.measurements.fontSizeSmall = this.measurements.fontSize * 0.8;
  }
}
