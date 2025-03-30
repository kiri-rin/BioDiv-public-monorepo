import { Feature, MultiPolygon, Polygon } from "@turf/turf";
import { MigrationPath } from "@rrrcn/common-types/services/api/migrations/generate-tracks/config";

export type AreaMigrationDensityConfig = {
  area: Feature<Polygon | MultiPolygon>;
  migrations: MigrationPath[];
  birds_count: number;
};
export type AreaMigrationDensityResult = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
