/**
 * map-species-migration controller
 */

import { factories } from "@strapi/strapi";
import { overwriteCoreControllers } from "@rrrcn/admin/src/utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::map.map-species-migration",

  ({ strapi }) =>
    overwriteCoreControllers("api::map.map-species-migration", strapi)
);
