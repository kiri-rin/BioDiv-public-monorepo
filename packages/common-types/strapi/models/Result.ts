import { UsersPermissions_User } from "./UsersPermissions_User";
import { MapSpatialGridCell } from "./MapSpatialGridCell";
import { AnalysisResult } from "./AnalysisResult";
export type Result = {
  id: number;
  status: ("processing" | "completed" | "error") | null;
  uid: string | null;
  user: UsersPermissions_User | null;
  type:
    | (
        | "data"
        | "population"
        | "survival"
        | "maxent"
        | "random-forest"
        | "migration"
        | "vulnerability"
        | "habitat-area-vulnerability"
        | "grid-vulnerability"
        | "data-selection-correlation"
        | "data-selection-t-test"
        | "data-selection-normal"
        | "data-selection-moran"
      )
    | null;
  finished_at: string | null;
  logs: string | null;
  spatial_grid_cell: MapSpatialGridCell | null;
  analysis_results: AnalysisResult[] | null;
  expires_at: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
