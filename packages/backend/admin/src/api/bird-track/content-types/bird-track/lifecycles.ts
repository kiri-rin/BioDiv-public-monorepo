import { readFile } from "fs/promises";
import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { errors } from "@strapi/utils";
import path from "path";
import { FeatureCollection } from "geojson";
const DOMParserInstance = new DOMParser();

export default {
  async beforeCreate({ params }) {
    if (params.data.source_file) {
      const uploadFile = await strapi
        .plugin("upload")
        .service("upload")
        .findOne(params.data.source_file);
      const fileData = await readFile(
        path.join(process.cwd(), "public", uploadFile.url),
        "utf8"
      );
      const geojson: FeatureCollection = kml(
        DOMParserInstance.parseFromString(fileData)
      );
      params.data.track = geojson;
    }
  },
};
