import { MyMapSpeciesMigration } from "./MapSpeciesMigration";
import { MapMigrationTrack } from "@rrrcn/common-types/strapi/models/MapMigrationTrack";
import { GeoJSON } from "geojson";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
export type MyMapMigrationTrack = Omit<
  MapMigrationTrack,
  "map_species_migrations"
> & {
  species: Species;
  reverse?: boolean;
  track: GeoJSON.FeatureCollection<GeoJSON.Point>;
  map_species_migrations: MyMapSpeciesMigration[] | null;
  altitude_key: string;
  speed_key: string;
  date_key: string;
  date_format: string;
  add_z: boolean;
};
