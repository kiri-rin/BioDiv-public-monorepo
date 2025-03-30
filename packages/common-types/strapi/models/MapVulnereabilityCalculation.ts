import { MapHabitatArea } from "./MapHabitatArea";
import { MapSpeciesMigration } from "./MapSpeciesMigration";
import { MapVulnerabilityResult } from "./MapVulnerabilityResult";
import { MapSpatialGrid } from "./MapSpatialGrid";
export type MapVulnereabilityCalculation = {
  id: number;
  vulnerability_configs: object | null;
  processed: boolean | null;
  type: ("habitat_area" | "migration") | null;
  map_habitat_area: MapHabitatArea | null;
  map_species_migration: MapSpeciesMigration | null;
  map_vulnerability_results: MapVulnerabilityResult[] | null;
  map_spatial_grid: MapSpatialGrid | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
