import { api } from "@/api";
import useSWRMutation from "swr/mutation";
import { BirdTrack } from "@rrrcn/common-types/strapi/models/BirdTrack";

export const calculationMigrationFetcher = ([key, id]: [
  string,
  string
]): Promise<BirdTrack> => {
  return api.map
    .getApiMapSpeciesMigrationsId(String(id), {})
    .then((it) => it.data);
};
export const useCalculationMigration = (id: number) => {
  return useSWRMutation(
    [`calculation_magration`, String(id)],
    calculationMigrationFetcher
  );
};

export const calculationHabitatAreaFetcher = ([key, id]: [
  string,
  string
]): Promise<BirdTrack> => {
  return api.map.getApiMapHabitatAreasId(String(id), {}).then((it) => it.data);
};
export const useCalculationHabitatArea = (id: number) => {
  return useSWRMutation(
    [`calculation_habitat_area`, String(id)],
    calculationHabitatAreaFetcher
  );
};
