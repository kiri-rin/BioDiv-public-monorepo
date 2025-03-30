/**
 * map-spatial-grid-cell controller
 */

import { factories } from "@strapi/strapi";
import { overwriteCoreControllers } from "../../../utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::map.map-spatial-grid-cell",
  ({ strapi }) =>
    overwriteCoreControllers("api::map.map-spatial-grid-cell", strapi)
);
