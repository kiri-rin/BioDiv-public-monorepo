import { MapSpeciesMigration } from "../models/MapSpeciesMigration";
import { MapSpatialGrid } from "./MapSpatialGrid";
import {
  GeneratedTrack,
  IndexedArea,
} from "@rrrcn/common-types/services/api/migrations/generate-tracks/response";
import { GeoJSON } from "geojson";

export type MyMapSpeciesMigration = Omit<
  MapSpeciesMigration,
  "map_spatial_grid"
> & {
  tracks_count: number;
  map_spatial_grid: MapSpatialGrid;
  indexed_areas: IndexedArea[];
  generated_tracks: GeneratedTrack[];
  clipped_tracks: GeoJSON.FeatureCollection<GeoJSON.Point>[];
  meta: {
    id_mapping: {
      [cell_id: number]: number;
    };
  };
};
