/**
 * sensitive-area controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::sensitive-area.sensitive-area",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi
        .service("api::sensitive-area.sensitive-area")
        .find(ctx.query);
      return data;
    },
  })
);
