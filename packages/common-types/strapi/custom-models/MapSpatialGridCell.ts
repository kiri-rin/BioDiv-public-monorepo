import { MapSpatialGrid } from "./MapSpatialGrid";
import { Result } from "../models/Result";
import { Species_SpeciesAreaInfo__component } from "../models/Species_SpeciesAreaInfo__component";
import { MapHabitatArea } from "../models/MapHabitatArea";
import { SpeciesCellPopulation } from "../models/SpeciesCellPopulation";
import { SensitiveArea } from "../models/SensitiveArea";
import { MapSpatialGridDistrict } from "../models/MapSpatialGridDistrict";
import { VulnerabilityResult } from "../models/VulnerabilityResult";
import { MapVulnerabilityResult } from "../models/MapVulnerabilityResult";
import { MyMapVulnerabilityResult } from "@rrrcn/common-types/strapi/custom-models/MyMapVulnerabilityResult";
export type MapSpatialGridCell = {
  id: number;
  spatial_grid: MapSpatialGrid | null;
  bbox_left: number | null;
  bbox_top: number | null;
  bbox_right: number | null;
  bbox_bottom: number | null;
  polygon: object | null;
  results: Result[] | null;
  total_vulnerability: number | null;
  species_infos: Species_SpeciesAreaInfo__component[] | null;
  habitat_areas: MapHabitatArea[] | null;
  species_cell_populations: SpeciesCellPopulation[] | null;
  sensitive_areas: SensitiveArea[] | null;
  map_spatial_grid_district: MapSpatialGridDistrict | null;
  vulnerability_results: VulnerabilityResult[] | null;
  map_vulnerability_results: MyMapVulnerabilityResult[] | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
