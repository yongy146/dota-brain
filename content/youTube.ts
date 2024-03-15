/**
 * Module contains all relevant YouTube videos used by Dota Coach.
 *
 * URL to test if video can be embedded:
 *   - https://www.youtube.com/watch?v=YOUR_VIDEO_ID&allowEmbed=1
 *
 */

// https://www.youtube.com/watch?v=_HBcbAxlcdY

export type TYouTubeVideo =
  /**
   * Video ID
   */
  | string
  | {
      /**
       * Video ID
       */
      videoId: string;
      /**
       * Starting time in seconds
       */
      startingTime: number;
      /**
       * End time in seconds
       */
      endTime: number;
    };

export const youTubeVideos: Record<string, TYouTubeVideo[]> = {
  items: [
    // Date: 14.8.2020
    // Searched: 25.10.2023
    "PZr8AxyQ8E0",
  ],
  attributes: [
    {
      // Date: 14.8.2020
      // Searched: 28.1.2024
      videoId: "Wtr4gqa86Yo",
      startingTime: 121, // 2:01
      endTime: 253, // 4:13
    },
  ],
  strength: [
    {
      // Date: 14.8.2020
      // Searched: 28.1.2024
      videoId: "Wtr4gqa86Yo",
      startingTime: 157, // 2:37
      endTime: 174, // 2:54
    },
  ],
  agility: [
    {
      // Date: 14.8.2020
      // Searched: 28.1.2024
      videoId: "Wtr4gqa86Yo",
      startingTime: 174, // 2:55
      endTime: 218, // 4:13
    },
  ],
  intelligence: [
    {
      // Date: 14.8.2020
      // Searched: 28.1.2024
      videoId: "Wtr4gqa86Yo",
      startingTime: 218, // 3:38
      endTime: 253, // 4:13
    },
  ],
};
