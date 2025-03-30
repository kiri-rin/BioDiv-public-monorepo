/**
 * bird-track controller
 */

import { factories, Strapi } from "@strapi/strapi";
import { overwriteCoreControllers } from "../../../utils/overwrite-core-controllers";

export default factories.createCoreController(
  "api::bird-track.bird-track",
  ({ strapi }: { strapi: Strapi }) =>
    overwriteCoreControllers("api::bird-track.bird-track", strapi)
);
