/**
 * Additional data on items.
 *
 * Localized content is provided through the i18n file (...) and contains the following
 *    - Summary:
 *    - Ability notes: item_<item key>_<item ability>_notes, e.g. item_desolator_corruption_notes
 *    - Itemization stragey: ...
 *    - Core & counter items: /dota-brain/content/heroBuilds.ts (not yet localized - has to be localized....)
 *    - Background: ....
 */

export interface IItem {
  abilities?: Record<
    string /* e.g. corruption or soul_stealer */,
    {
      pierece_spell_immunity?: boolean;
      pierece_debugg_immunity?: boolean;
      dispellable?: boolean;
      used_by_illusions?: boolean;
      blocked_by_linkens?: boolean; // true if blocked by Linken's Sphere
      sound?: string | string[];
    }
  >;
  youTube?: string[];
  sound?: []; // Add text, description?!
}

/*export interface IYouTubeVideo {
  code: string;
  /**
   * A react-intl tag.
   *
   * The tag is prefixed with the item key to get the reac-intl id,
   * e.g. 'item_desolator_' for desolator.
   *
   * The react-inlt id is then used in the dota-coach-i18n repository
   * in the file /generic/en/items.json
   *
   */
/*title?: string;
  // aspectRatio?: string; always 16:9?! To be checked
}*/

export const itemContent: Record<string, IItem> = {
  desolator: {
    youTube: [
      // Date: 1.3.2023
      // Searched: 26.10.2023
      // When to buy desolator
      "_HBcbAxlcdY",
      // Date: 1.3.2023
      // Searched: 26.10.2023
      // Visual effect
      "8H57_0l5H5I",
    ],
  },
  soul_ring: {
    youTube: ["1NYevLUyg8E"],
  },
};
