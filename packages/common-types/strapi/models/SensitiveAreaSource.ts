import { Upload_File } from "./Upload_File";
import { SensitiveArea } from "./SensitiveArea";
import { MapSpatialGrid } from "./MapSpatialGrid";
export type SensitiveAreaSource = {
  id: number;
  type: ("shp" | "kml") | null;
  source_file: Upload_File | null;
  name: string | null;
  sensitive_areas: SensitiveArea[] | null;
  spatial_grid: MapSpatialGrid | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
