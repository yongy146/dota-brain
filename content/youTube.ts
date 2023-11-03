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
   * It is prefixed-with the keys, e.g. 'item_desolator_' for desolator.
   * The key i18n file can be found in the dota-coach-i18n repository
   * under /generic/en/items.json
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
  item_desolator: [
    {
      // Date: 1.3.2023
      // Searched: 26.10.2023

      // When to buy desolator
      title: "when_to_buy",
      code: "_HBcbAxlcdY",
    },
    {
      // Date: 1.3.2023
      // Searched: 26.10.2023
      // Visual effect
      title: "visual_effect",
      code: "8H57_0l5H5I",
    },
  ],
};
