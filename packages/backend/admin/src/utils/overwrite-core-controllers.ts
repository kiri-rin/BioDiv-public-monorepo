import { Strapi } from "@strapi/strapi";

export const overwriteCoreControllers = (apiName: string, strapi: Strapi) => ({
  async find(ctx) {
    const data = await strapi.service(apiName).find(ctx.query);
    return data;
  },
  async findOne(ctx) {
    const data = await strapi
      .service(apiName)
      .findOne(ctx.params.id, ctx.query);
    return data;
  },
});
