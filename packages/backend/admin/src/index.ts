import moduleAlias from "module-alias";
import "./modules";
import { WritableStreamDefaultWriter } from "node:stream/web";

moduleAlias.addAlias(
  "@rrrcn/common-helpers/src",
  "@rrrcn/common-helpers/dist/src"
);
moduleAlias.addAlias("@rrrcn/services/src", "@rrrcn/services/dist");
moduleAlias.addAlias("@rrrcn/common-types", "@rrrcn/common-types/dist");
moduleAlias.addAlias("@rrrcn/admin/src", `${__dirname}`);
declare global {
  let strapiLogger: (...log: any) => any | undefined;
}
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  async register({ strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    // const sevice = new MapSpatialGridService(
    //   new StrapiMapSpatialGridRepository(strapi)
    // );
    //
    // strapi.db.query("api::map.map-vulnerability-result").updateMany({
    //   where: { publishedAt: { $null: true } },
    //   data: { publishedAt: new Date().toISOString() },
    // });
    // const districts = await strapi.db
    //   .query("api::map.map-spatial-grid-district")
    //   .findMany({
    //     populate: [" map_spatial_grid_cells"],
    //   });
    // for (let dist of districts) {
    //   if (!dist.map_spatial_grid_cells?.length) {
    //     sevice.indexSpatialGridDistrict({ districtId: dist.id });
    //   }
    // }
    const globalLog = console.log;
    //@ts-ignore
    globalThis.strapiLogger = (...args: any[]) => {
      try {
        //@ts-ignore
        const ctx = strapi.requestContext.get();

        const logger = ctx?.state?.logger;
        logger?.(...args);
      } catch (e) {
        console.log(e);
      }
    };

    //@ts-ignore
    // console.globalLog = globalLog;
    // console.log =
  },
};
declare global {
  //@ts-ignore
  let ee: any;
  let resultStreams: { [resultId: string]: WritableStreamDefaultWriter }; //TODO check types
}
const ee = require("@google/earthengine");
//@ts-ignore
globalThis.ee = ee;
//@ts-ignore
globalThis.resultStreams = {};
