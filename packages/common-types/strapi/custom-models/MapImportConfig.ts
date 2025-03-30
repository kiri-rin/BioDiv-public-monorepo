import { MapSpatialGrid } from "./MapSpatialGrid";
import { MapSpatialGridCell } from "./MapSpatialGridCell";
import { MapImportConfig } from "@rrrcn/common-types/strapi/models/MapImportConfig";
import { CommonVulnerabilityConfig } from "@rrrcn/common-types/common/vulnerability-config";
import { AreaVulnerabilityControllerResponse } from "@rrrcn/common-types/services/api/vulnerability/overall/configs";
export type CustomMapImportConfig = Omit<
  MapImportConfig,
  "data" | "localizations" | "map_spatial_grid" | "map_spatial_grid_cells"
> & {
  map_spatial_grid: MapSpatialGrid | null;
  data:
    | {
        cellId: number;
        config: CommonVulnerabilityConfig;
        vulnerability: AreaVulnerabilityControllerResponse;
      }[]
    | null;
  map_spatial_grid_cells: MapSpatialGridCell[] | null;
  localizations: CustomMapImportConfig[] | null;
};
