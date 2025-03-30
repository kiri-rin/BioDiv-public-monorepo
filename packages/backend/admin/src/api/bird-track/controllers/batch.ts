import { Context, Request } from "koa";
import { readFile } from "fs/promises";
import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import path from "path";
import { FeatureCollection } from "geojson";
import { Strapi } from "@strapi/strapi";
const DOMParserInstance = new DOMParser();
export default ({ strapi }: { strapi: Strapi }) => ({
  async uploadMany(
    ctx: Context & {
      request: Request & { files: any };
    }
  ) {
    //@ts-ignore
    console.log(ctx.request.files!);
    for (const file of ctx.request.files.files) {
      const fileData = await readFile(path.join(file.path), "utf8");
      const geojson: FeatureCollection = kml(
        DOMParserInstance.parseFromString(fileData, "text/xml")
      );
      await strapi.service("api::bird-track.bird-track").create({
        data: {
          track: geojson,
          name: file.name.split(".kml")[0],
        },
      });
    }
  },
});
