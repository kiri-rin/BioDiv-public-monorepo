import { api } from "@/api";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
import useSWRMutation from "swr/mutation";

export const speciesHabitatAreaFetcher = ([key, id]: [
  string,
  string
]): Promise<Species> => {
  return api.species
    .getApiSpeciesManyId(String(id), {
      params: { populate: ["habitat_areas"] },
    })
    .then((it) => it.data);
};
export const useSpeciesHabitatAreas = (species: Species) => {
  return useSWRMutation(
    [`specties`, String(species.id)],
    speciesHabitatAreaFetcher
  );
};
