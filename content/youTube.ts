/**
 * Module contains all relevant YouTube videos used by Dota Coach.
 *
 */

// https://www.youtube.com/watch?v=_HBcbAxlcdY

export interface IYouTubeVideo {
  code: string;
  /**
   * React-intl tag
   *
   */
  title?: string;
  // aspectRatio?: string; always 16:9?! To be checked
}

export const youTubeVideos: Record<string, IYouTubeVideo | IYouTubeVideo[]> = {
  items: {
    // Date: 14.8.2020
    // Searched: 25.10.2023
    code: "PZr8AxyQ8E0",
  },
  item_desolator: {
    // Date: 1.3.2023
    // Searched: 26.10.2023
    title: "BeginnersGuide",
    code: "_HBcbAxlcdY",
  },
};
