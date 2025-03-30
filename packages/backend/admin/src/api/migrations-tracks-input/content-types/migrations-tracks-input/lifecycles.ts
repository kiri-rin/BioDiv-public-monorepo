import { inspect } from "util";
import { readFile } from "fs/promises";
import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { errors } from "@strapi/utils";
import path from "path";
import { FeatureCollection } from "geojson";
import { file } from "@babel/types";
const { ApplicationError } = errors;

const DOMParserInstance = new DOMParser();
export default {
  async beforeCreate({ params }) {},
  async afterCreate({ params, result }) {
    const entity = await strapi.db
      .query("api::migrations-tracks-input.migrations-tracks-input")
      .findOne({
        where: { id: result.id },
        populate: ["tracks"],
      });

    for (let { url, name } of entity.tracks) {
      const fileData = await readFile(
        path.join(process.cwd(), "public", url),
        "utf8"
      );
      const geojson: FeatureCollection = JSON.parse(fileData);
      await strapi.db
        .query("api::map-migration-track.map-migration-track")
        .create({
          data: {
            track: geojson,
            name: entity.name_prefix + name,
            altitude_key: entity.altitude_key,
            date_key: entity.date_key,
            date_format: entity.date_format,
            speed_key: entity.speed_key,
            reverse: entity.reverse,
            add_z: entity.add_z,
          },
        });
    }
  },
  async beforeUpdate({ params }) {
    throw new ApplicationError("Update is not supported");
  },
  async beforeDelete({ params }) {},
};
