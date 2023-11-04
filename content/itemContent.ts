/**
 * Additional data on items.
 *
 * Localized content is provided throug the i18n file (...) and contains the following
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
  youTube?: IYouTubeVideo | IYouTubeVideo[];
  sound?: []; // Add text, description?!
}

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

export const itemContent: Record<string, IItem> = {
  desolator: {
    youTube: [
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
  },
};
