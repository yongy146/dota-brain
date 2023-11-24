/**
 * Component reports all core items of a build that have not i18n string.
 *
 */

import { i18nLoader } from "@utilities/i18n/i18nLoader";
import { IntlShape } from "react-intl";

let intl: IntlShape;
beforeAll(async () => {
  await i18nLoader();
});
