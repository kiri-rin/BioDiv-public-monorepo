import { Fetcher } from "swr";
import { PaginatedResult } from "@rrrcn/common-types/strapi/models/Pagination";
import { BirdTrack } from "@rrrcn/common-types/strapi/models/BirdTrack";
import { api } from "@/api";
import useSWR from "swr";
import { WithLocalesMap } from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { createPaginatedResultLocalesMap } from "@/utils/translations/localized-field-map";
import { useMapSlugs } from "@/components/map/context";

export type BirdsTracksPageKey = [
  "birds_tracks",
  string /*grid slug*/,
  number /*page*/
];
export const getBirdsTracksPageKey = (page: number, selectedGrid: string) => [
  "birds_tracks",
  selectedGrid,
  page,
];
export const birdTracksFetcher: Fetcher<
  PaginatedResult<WithLocalesMap<BirdTrack>> | null,
  BirdsTracksPageKey
> = ([_, selectedGrid, page]) => {
  return api.birdTrack
    .getApiBirdTracks({
      params: {
        pagination: { page },
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
    .then((res) => {
      return createPaginatedResultLocalesMap(res.data);
    });
};
export const useBirdsTracks = (page: number) => {
  const { selectedGridSlug } = useMapSlugs();
  return useSWR(
    getBirdsTracksPageKey(page, selectedGridSlug || ""),
    birdTracksFetcher,
    {
      revalidateOnMount: true,
    }
  );
};
