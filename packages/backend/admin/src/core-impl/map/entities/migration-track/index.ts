import { IMapSpecies } from "@rrrcn/admin/src/core/vulnerability-map/entities/species";
import GeoJSON from "geojson";
import { IMapMigrationTrack } from "@rrrcn/admin/src/core/vulnerability-map/entities/migration-track";
import { MyMapMigrationTrack } from "@rrrcn/common-types/strapi/custom-models/MapMigrationTrack";
import { featureCollection } from "@turf/helpers";
import { parse } from "date-fns";

type IdType = number;
export class StrapiMapMigrationTrack implements IMapMigrationTrack<IdType> {
  private strapiTrack: MyMapMigrationTrack;
  private parsedTrack: GeoJSON.FeatureCollection<
    GeoJSON.Point,
    { altitude?: number; speed?: number; date: Date; index: number }
  >;
  constructor(strapiTrack: MyMapMigrationTrack) {
    this.strapiTrack = strapiTrack;
    const { altitude_key, date_key, date_format, speed_key } = strapiTrack;
    const features = strapiTrack.track.features.map((it, index) => {
      it.properties.altitude = parseFloat(it.properties[altitude_key]);
      it.properties.speed = parseFloat(it.properties[speed_key]);
      it.properties.index = index;
      console.log(date_format);
      const date = !date_format
        ? new Date(it.properties[date_key])
        : parse(
            it.properties[date_key] + this.strapiTrack.add_z !== false
              ? " Z"
              : "",
            date_format,
            new Date()
          );
      if (!isNaN(date.valueOf())) {
        it.properties.date = date;
      }
      return it as GeoJSON.Feature<
        GeoJSON.Point,
        { altitude?: number; speed?: number; date: Date; index: number }
      >;
    });
    this.parsedTrack = featureCollection(
      strapiTrack.reverse ? features.reverse() : features
    );
  }
  get species(): IMapSpecies<IdType> {
    return {
      id: this.strapiTrack.species.id,
      length: this.strapiTrack.species.length,
      name: this.strapiTrack.species.name,
      nocturnalActivity: this.strapiTrack.species.nocturnalActivity,
      wingspan: this.strapiTrack.species.wingspan,
    };
  }
  get id(): IdType {
    return this.strapiTrack.id;
  }
  get title(): string {
    return this.strapiTrack.name;
  }
  get track(): GeoJSON.FeatureCollection<
    GeoJSON.Point,
    { altitude?: number; speed?: number; date: Date; index: number } //TODO add more fields
  > {
    return this.parsedTrack;
  }
}
