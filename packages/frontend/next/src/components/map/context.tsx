import { createContext, Dispatch, useContext, useMemo } from "react";
import { SetStateAction } from "preact/compat";
import { useParams } from "next/navigation";
import { MainPageProps } from "@/components/map/index";
import { PaginatedResult } from "@rrrcn/common-types/strapi/models/Pagination";
import { WithPolygon } from "@rrrcn/common-types/strapi/custom-models/with-polygon";
import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";
import { SpatialGridDistrict } from "@rrrcn/common-types/strapi/models/SpatialGridDistrict";
import { SpatialGrid } from "@rrrcn/common-types/strapi/models/SpatialGrid";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
import { HabitatArea } from "@rrrcn/common-types/strapi/models/HabitatArea";
import { SensitiveArea } from "@rrrcn/common-types/strapi/models/SensitiveArea";
import { GoogleMapObject } from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { useLang } from "@/utils/translations/context";

export const MapContext = createContext<{
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
}>({
  map: null,
  setMap: () => {},
});
export const useMapContext = () => useContext(MapContext);

export const HABITAT_AREAS_SLUG = "habitat-areas";
export enum MapPages {
  MAIN,
  GRID,
  DISTRICT,
  SPECIES,
}
export type MapSlugsContextType = {
  selectedGridSlug?: string;
  selectedDistrictSlug?: string;
  selectedSpeciesSlug?: string;
  isHabitatAreas?: boolean;
  currentPage: MapPages;
};
export const MapSlugsContext = createContext<MapSlugsContextType>({
  currentPage: MapPages.MAIN,
});
export const useMapSlugs = (): MapSlugsContextType => {
  const params = useParams();

  return useMemo(() => {
    let [selectedGridSlug, selectedDistrictSlug, selectedSpeciesSlug]: (
      | string
      | undefined
    )[] = Array.isArray(params?.slug) ? params?.slug : [params?.slug];
    let isHabitatAreas = false;
    if (selectedDistrictSlug === HABITAT_AREAS_SLUG) {
      selectedDistrictSlug = undefined;
      isHabitatAreas = true;
    }
    let currentPage = MapPages.MAIN;
    if (selectedGridSlug) {
      if (selectedDistrictSlug) {
        if (selectedSpeciesSlug) {
          currentPage = MapPages.DISTRICT;
        } else {
          currentPage = MapPages.DISTRICT;
        }
      } else {
        if (isHabitatAreas) {
          currentPage = MapPages.HABITAT_AREAS_SPECIES;
        } else {
          currentPage = MapPages.GRID;
        }
      }
    }
    return {
      isHabitatAreas,
      selectedGridSlug,
      selectedDistrictSlug,
      selectedSpeciesSlug,
      currentPage,
    };
  }, [params?.slug]);
};

export const MapPagePropsContext = createContext<MainPageProps>({
  cells: null,
  districts: null,
  birds_tracks: null,
  grids: null,
  species: null,
  habitat_areas: null,
  calculations: null,
  sensitive_areas: null,
});
export const useMapPageProps = () => {
  const {
    species: species_raw,
    sensitive_areas: sensitive_areas_raw,
    cells,
    birds_tracks,
    districts: districts_raw,
    grids: grids_raw,
    habitat_areas: habitat_areas_raw,
    calculations,
  } = useContext(MapPagePropsContext);
  const { lang } = useLang();
  const {
    isHabitatAreas,
    currentPage,
    selectedGridSlug,
    selectedDistrictSlug,
    selectedSpeciesSlug,
  } = useMapSlugs();
  const sensitive_areas = useMemo(() => {
    return sensitive_areas_raw?.results;
  }, [sensitive_areas_raw]);
  const districts = useMemo(() => {
    return districts_raw?.results;
  }, [districts_raw]);
  const grids = useMemo(() => {
    console.log({ grids_raw });
    return grids_raw?.results;
  }, [grids_raw]);
  const habitat_areas = useMemo(() => {
    return habitat_areas_raw?.results;
  }, [habitat_areas_raw]);
  const species = useMemo(() => {
    return species_raw?.results;
  }, [species_raw]);

  const selectedGrid = useMemo(
    () => grids?.find((it) => it.slug === selectedGridSlug),
    [selectedGridSlug, grids]
  );
  const selectedDistrict = useMemo(
    () => districts?.find((it) => it.slug === selectedDistrictSlug),
    [selectedDistrictSlug, districts]
  );
  const selectedSpecies = useMemo(
    () => species?.find((it) => it.slug === selectedSpeciesSlug),
    [selectedSpeciesSlug, species]
  );
  return {
    species,
    sensitive_areas,
    cells,
    districts,
    grids,
    habitat_areas,
    isHabitatAreas,
    currentPage,
    selectedGridSlug,
    selectedDistrictSlug,
    selectedSpeciesSlug,
    selectedGrid,
    selectedDistrict,
    selectedSpecies,
    birds_tracks,
    calculations,
  };
};
