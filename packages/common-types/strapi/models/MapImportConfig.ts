import { MapSpatialGrid } from "./MapSpatialGrid";
import { MapSpatialGridCell } from "./MapSpatialGridCell";
export type MapImportConfig = {
  id: number;
  name: string | null;
  map_spatial_grid: MapSpatialGrid | null;
  indexed: boolean | null;
  data: object | null;
  map_spatial_grid_cells: MapSpatialGridCell[] | null;
  comments: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
  localizations: MapImportConfig[] | null;
  locale: string | null;
};
