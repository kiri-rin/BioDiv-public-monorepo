import { CommonConfig } from "../../common-body";
import { GeoJSON, Point } from "geojson";

export type MigrationPath = GeoJSON.FeatureCollection<
  Point,
  MigrationPointProperties
>;
export type IndexedMigration = {
  id: string;
  meta?: {};
  title: string;
  geojson: MigrationPath;
  years: { [year: string]: MigrationYear };
};

export enum SEASONS {
  SPRING = "spring",
  SUMMER = "summer",
  AUTUMN = "autumn",
  WINTER = "winter",
}

export type MigrationYear = {
  meta?: any;
  title?: string;

  [SEASONS.SUMMER]?: [number, number];
  [SEASONS.AUTUMN]?: [number, number];
  [SEASONS.WINTER]?: [number, number];
  [SEASONS.SPRING]?: [number, number];
};

export interface MigrationGenerationConfigType extends CommonConfig {
  migrations: MigrationPath[];
  initCount: number;
  grid?: GeoJSON.FeatureCollection<GeoJSON.Polygon>;
}

export type MigrationPointProperties = {
  date: Date;
  altitude?: number;
  index?: number;
  description?: { value?: string };
};
