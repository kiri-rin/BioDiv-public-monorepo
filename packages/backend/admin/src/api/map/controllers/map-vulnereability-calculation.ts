/**
 * map-vulnereability-calculation controller
 */

import { factories } from "@strapi/strapi";
import { overwriteCoreControllers } from "@rrrcn/admin/src/utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::map.map-vulnereability-calculation",
  ({ strapi }) =>
    overwriteCoreControllers("api::map.map-vulnereability-calculation", strapi)
);
