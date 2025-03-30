/**
 * map-migration-track controller
 */

import { factories } from "@strapi/strapi";
import { overwriteCoreControllers } from "@rrrcn/admin/src/utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::map-migration-track.map-migration-track",

  ({ strapi }) =>
    overwriteCoreControllers(
      "api::map-migration-track.map-migration-track",
      strapi
    )
);
