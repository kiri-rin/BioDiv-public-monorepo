import { readFile } from "fs/promises";
import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { errors } from "@strapi/utils";
import path from "path";
import { FeatureCollection } from "geojson";
const { ApplicationError } = errors;

const DOMParserInstance = new DOMParser();
export default {
  async beforeCreate({ params }) {
    if (params.data.type === "shp") {
      throw new ApplicationError("shp is not supported");
    }
  },
  async afterCreate({ params, result }) {
    const entity = await strapi.db
      .query("api::sensitive-area-source.sensitive-area-source")
      .findOne({
        where: { id: result.id },
        populate: ["source_file", "spatial_grid"],
      });
    if (!entity.spatial_grid) {
      throw new ApplicationError("spatial_grid is required");
    }
    const fileData = await readFile(
      path.join(process.cwd(), "public", entity.source_file.url),
      "utf8"
    );
    const geojson: FeatureCollection = kml(
      DOMParserInstance.parseFromString(fileData)
    );
    for (const feature of geojson.features) {
      await strapi.service("api::sensitive-area.sensitive-area").create({
        data: {
          name: feature.properties.name,
          polygon: feature,
          sensitive_area_source: entity.id,
          spatial_grid: entity.spatial_grid.id,
        },
      });
    }
  },
  async beforeUpdate({ params }) {
    params.data = { name: params.data.name };
  },
  async beforeDelete({ params }) {},
};
