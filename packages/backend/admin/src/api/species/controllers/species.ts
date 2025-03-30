/**
 * species controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::species.species",
  ({ strapi }) => ({
    async find(ctx) {
      const data = await strapi.service("api::species.species").find(ctx.query);
      return data;
    },
    async findOne(ctx) {
      const data = await strapi
        .service("api::species.species")
        .findOne(ctx.params.id, ctx.query);
      return data;
    },
  })
);
