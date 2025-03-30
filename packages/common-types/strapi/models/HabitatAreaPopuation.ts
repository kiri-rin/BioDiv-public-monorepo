import { HabitatArea } from "./HabitatArea";
import { SpatialGrid } from "./SpatialGrid";
import { AnalysisResult } from "./AnalysisResult";
import { SpeciesCellPopulation } from "./SpeciesCellPopulation";
export type HabitatAreaPopuation = {
  id: number;
  population_min: number;
  population_max: number;
  points: object | null;
  population: number;
  habitat_area: HabitatArea | null;
  spatial_grid: SpatialGrid | null;
  analysis_result: AnalysisResult | null;
  species_cell_populations: SpeciesCellPopulation[] | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
