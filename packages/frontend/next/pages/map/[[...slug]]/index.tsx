import { api } from "@/api";
import React from "react";
import { GetServerSideProps } from "next";
import { SpatialGrid } from "@rrrcn/common-types/strapi/models/SpatialGrid";
import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";
import { PaginatedResult } from "@rrrcn/common-types/strapi/models/Pagination";
import { MainPage, MainPageProps } from "@/components/map";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
import { SpatialGridDistrict } from "@rrrcn/common-types/strapi/models/SpatialGridDistrict";
import { WithPolygon } from "@rrrcn/common-types/strapi/custom-models/with-polygon";
import { WithLocalizations } from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { BirdTrack } from "@rrrcn/common-types/strapi/models/BirdTrack";
import { createPaginatedResultLocalesMap } from "@/utils/translations/localized-field-map";
import { inspect } from "util";
import { MapSpatialGridCell } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGridCell";
import { MapVulnereabilityCalculation } from "@rrrcn/common-types/strapi/custom-models/MapVulnereabilityCalculation";

export default MainPage;
export const getStaticProps: GetServerSideProps<MainPageProps> = async (
  params
) => {
  try {
    const { slug } = params.params || {};
    const [selectedGrid, selectedDistrict, selectedSpecies] = Array.isArray(
      slug
    )
      ? slug
      : [slug];
    const {
      data: grids,
    }: {
      data: PaginatedResult<WithLocalizations<WithPolygon<SpatialGrid>>> | null;
    } = await api.map.getApiMapSpatialGrids({
      params: {
        pagination: { limit: 10000 },
        populate: {
          localizations: { fields: ["title", "locale"] },
        },
      },
    });
    console.log({ grids });
    const {
      data: districts,
    }: {
      data: PaginatedResult<
        WithLocalizations<WithPolygon<SpatialGridDistrict>>
      > | null;
    } = selectedGrid
      ? await api.map.getApiMapSpatialGridDistricts({
          params: {
            pagination: { limit: 10000 },
            populate: {
              localizations: { fields: ["name", "locale"] },
            },
            filters: { map_spatial_grid: { slug: selectedGrid } },
          },
        })
      : { data: null };
    const {
      data: birds_tracks,
    }: {
      data: PaginatedResult<WithLocalizations<BirdTrack>> | null;
    } = selectedGrid
      ? await api.birdTrack.getApiBirdTracks({
          params: {
            fields: ["name", "locale"],
            populate: {
              localizations: {
                fields: ["name", "locale"],
              },
              species: {
                fields: ["name", "locale"],
                populate: { localizations: { fields: ["name", "locale"] } },
              },
            },
            filters: { spatial_grids: { slug: selectedGrid } },
          },
        })
      : { data: null };
    const {
      data: calculations,
    }: {
      data: PaginatedResult<
        WithLocalizations<MapVulnereabilityCalculation>
      > | null;
    } = selectedGrid
      ? await api.map.getApiMapVulnereabilityCalculations({
          params: {
            pagination: { limit: 10000 },
            fields: ["id", "type"],
            populate: {
              map_habitat_area: {
                fields: ["id", "name"],
                populate: {
                  species: { fields: ["id", "name"] },
                },
              },
              map_species_migration: {
                fields: ["id"],
                populate: {
                  species: { fields: ["id"] },
                },
              },
            },
            filters: { map_spatial_grid: { slug: selectedGrid } },
          },
        })
      : { data: null };
    const {
      data: species,
    }: {
      data: PaginatedResult<WithLocalizations<WithPolygon<Species>>> | null;
    } = await api.species.getApiSpeciesMany({
      params: {
        pagination: { limit: 10000 },
        populate: {
          image: true,
          localizations: { fields: ["name", "locale"] },
        },
      },
    });
    const {
      data: cells,
    }: { data: PaginatedResult<WithPolygon<MapSpatialGridCell>> | null } =
      selectedDistrict
        ? await api.map.getApiMapSpatialGridCells({
            params: {
              pagination: { limit: 2000000 },
              filters: {
                map_spatial_grid_district: { slug: selectedDistrict },
              },
              populate: {
                sensitive_areas: { count: true },
                map_vulnerability_results: {
                  filters: {
                    map_vulnereability_calculation: {
                      publishedAt: { $notNull: true },
                    },
                  },
                  fields: ["max_vulnerability"],
                  populate: {
                    map_vulnereability_calculation: {
                      fields: ["id"],
                      populate: {
                        map_habitat_area: {
                          fields: ["id"],
                          populate: {
                            species: { fields: ["id"] },
                          },
                        },
                        map_species_migration: {
                          fields: ["id"],
                          populate: {
                            species: { fields: ["id"] },
                          },
                        },
                      },
                    },
                  },
                },

                habitat_areas: { count: true },
              },
            },
          })
        : { data: null };
    console.log({ calculations });

    const { data: sensitiveAreaSources } = selectedGrid
      ? await api.sensitiveAreaSource.getApiSensitiveAreaSources({
          params: {
            pagination: { limit: 10000 },
            filters: { spatial_grid: { slug: selectedGrid } },
          },
        })
      : { data: null };
    console.log({ sensitiveAreaSources });

    return {
      revalidate: 60,
      props: {
        cells,
        calculations,
        birds_tracks: createPaginatedResultLocalesMap(birds_tracks),
        grids: createPaginatedResultLocalesMap(grids),
        species: createPaginatedResultLocalesMap(species),
        districts: createPaginatedResultLocalesMap(districts),
        habitat_areas: null,
        sensitive_areas: sensitiveAreaSources,
        mapCells: [],
      },
    };
  } catch (e) {
    console.log(e);
  }
  return {
    revalidate: 60,
    props: {
      cells: null,
      grids: null,
      calculations: null,
      birds_tracks: null,
      species: null,
      districts: null,
      habitat_areas: null,
      sensitive_areas: null,
      mapCells: [],
    },
  };
};
export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
