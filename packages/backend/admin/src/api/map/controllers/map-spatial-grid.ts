/**
 * spatial-grid controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::map.map-spatial-grid",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi
        .service("api::map.map-spatial-grid")
        .find(ctx.query);
      return data;
    },
  })
);
