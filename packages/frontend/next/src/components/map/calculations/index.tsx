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
import { MapCalculationItem } from "@/components/map/calculations/components/Item";

export const MapVulnerabilityCalculations = () => {
  const { calculations } = useMapPageProps();
  const t = useTranslations();
  const [cnt, setCnt] = useState(1);

  const pages = [];
  const { selectedGridSlug } = useMapSlugs();
  return (
    <>
      {calculations?.results.map((it) => (
        <MapCalculationItem calculation={it} key={it.id} />
      ))}{" "}
    </>
  );
};
export const MapBirdTracksWrapped = () => {};
