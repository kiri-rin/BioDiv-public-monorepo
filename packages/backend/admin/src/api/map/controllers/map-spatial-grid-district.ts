/**
 * spatial-grid-district controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::map.map-spatial-grid-district",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi
        .service("api::map.map-spatial-grid-district")
        .find(ctx.query);
      console.log("DISTRICTS", data);
      return data;
    },
  })
);
