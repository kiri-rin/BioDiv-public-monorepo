import { api } from "@/api";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
import useSWRMutation from "swr/mutation";
import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";
import { useMainRightPanelContext } from "@/components/map/right-panel/context";
import useSWR from "swr";
import { MapSpatialGridCell } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGridCell";

export const spatialGridCellFetcher = ([key, id]: [
  string,
  string | null
]): Promise<MapSpatialGridCell | null> => {
  return id
    ? api.map
        .getApiMapSpatialGridCellsId(String(id), {
          params: {
            populate: [
              "map_habitat_areas",
              "map_vulnerability_results.map_vulnereability_calculation",
              "map_vulnerability_results.map_vulnereability_calculation.map_species_migration",
              "map_vulnerability_results.map_vulnereability_calculation.map_species_migration.species",
              "map_vulnerability_results.map_vulnereability_calculation.map_habitat_area",
              "map_vulnerability_results.map_vulnereability_calculation.map_habitat_area.species",
              "sensitive_areas",
              "map_vulnerability_results.map_vulnereability_calculation",
            ],
          },
        })
        .then((it) => it.data)
    : Promise.resolve(null);
};
export const useSpatialGridCell = (cell: MapSpatialGridCell | null) => {
  return useSWR(
    [`spatial_grid_cell`, cell && String(cell?.id)],
    spatialGridCellFetcher
  );
};
export const useSelectedSpatialGridCell = () => {
  const { selectedCell } = useMainRightPanelContext();
  return useSpatialGridCell(selectedCell);
};
