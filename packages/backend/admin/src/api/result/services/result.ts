/**
 * result service
 */

import { factories } from "@strapi/strapi";
import fs from "fs/promises";

export default factories.createCoreService(
  "api::result.result",
  ({ strapi }) => ({
    getResultFolder(resultId) {
      return `./public/tmp/${resultId}`;
    },
    getUsersResults(userId, params = {}) {
      return strapi.entityService.findPage("api::result.result", {
        ...params,
        filters: {
          ...(params.filters || {}),
          user: { id: userId },
        },
      });
    },
    async deleteExpiresResults() {
      const currentDate = new Date();
      const expiredResults = await strapi.db
        .query("api::result.result")
        .findMany({
          where: {
            expires_at: { $lt: currentDate.toISOString() },
          },
        });

      for (let res of expiredResults) {
        const folder = strapi
          .service("api::result.result")
          .getResultFolder(res.id);
        try {
          fs.rm(folder, { recursive: true });
        } catch (e) {
          console.error(e);
        }
        try {
          fs.rm(folder + ".zip", { recursive: true });
        } catch (e) {
          console.error(e);
        }
        await strapi.db.query("api::result.result").delete({
          where: {
            id: res.id,
          },
        });
      }
      await strapi.db.query("api::analysis-result.analysis-result").deleteMany({
        where: {
          expires_at: { $lt: currentDate.toISOString() },
        },
      });
    },
  })
);
