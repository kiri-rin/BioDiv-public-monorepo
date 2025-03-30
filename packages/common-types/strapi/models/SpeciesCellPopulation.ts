import { Species } from "./Species";
import { SpatialGrid } from "./SpatialGrid";
import { SpatialGridCell } from "./SpatialGridCell";
import { HabitatAreaPopulation } from "./HabitatAreaPopulation";
import { HabitatArea } from "./HabitatArea";
export type SpeciesCellPopulation = {
  id: number;
  species: Species | null;
  spatial_grid: SpatialGrid | null;
  spatial_grid_cell: SpatialGridCell | null;
  population: number | null;
  habitat_area_population: HabitatAreaPopulation | null;
  habitat_area: HabitatArea | null;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  createdBy: any | null;
  updatedBy: any | null;
};
