/**
 * sensitive-area-source controller
 */

import { factories } from "@strapi/strapi";
import { overwriteCoreControllers } from "@rrrcn/admin/src/utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::sensitive-area-source.sensitive-area-source",
  ({ strapi }) =>
    overwriteCoreControllers(
      "api::sensitive-area-source.sensitive-area-source",
      strapi
    )
);
