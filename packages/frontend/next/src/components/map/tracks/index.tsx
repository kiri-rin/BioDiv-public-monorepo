import { useMapPageProps, useMapSlugs } from "@/components/map/context";
import { MapBirdTrackItem } from "@/components/map/tracks/components/Item";
import { SWRConfig, unstable_serialize } from "swr";
import { getBirdsTracksPageKey } from "@/components/map/tracks/components/Page/swr";
import { BirdsTracksPage } from "@/components/map/tracks/components/Page";
import { useState } from "react";
import { Button } from "@mui/material";
import { DEFAULT_PAGE_SIZE } from "@/api";
import { MapTracksContentContainer } from "@/components/map/tracks/style";
import { useTranslations } from "@/utils/translations";

export const MapBirdTracks = () => {
  const { birds_tracks } = useMapPageProps();
  const t = useTranslations();
  const [cnt, setCnt] = useState(1);
  const showLoadMore =
    cnt * DEFAULT_PAGE_SIZE < (birds_tracks?.pagination?.total || 0);
  const pages = [];
  const { selectedGridSlug } = useMapSlugs();
  for (let i = 0; i < cnt; i++) {
    pages.push(<BirdsTracksPage index={i} key={i} />);
  }
  console.log({ birds_tracks });

  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize(
            getBirdsTracksPageKey(0, selectedGridSlug || "")
          )]: birds_tracks,
        },
      }}
    >
      <MapTracksContentContainer>
        {pages}
        {showLoadMore && (
          <Button onClick={() => setCnt((prev) => prev + 1)}>
            {t["map.tracks.load-more"]}
          </Button>
        )}
      </MapTracksContentContainer>
    </SWRConfig>
  );
};
export const MapBirdTracksWrapped = () => {};
