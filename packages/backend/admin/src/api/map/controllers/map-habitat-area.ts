/**
 * habitat-area controller
 */

import { factories } from "@strapi/strapi";
import { overwriteCoreControllers } from "@rrrcn/admin/src/utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::map.map-habitat-area",
  ({ strapi }) => overwriteCoreControllers("api::map.map-habitat-area", strapi)
);
