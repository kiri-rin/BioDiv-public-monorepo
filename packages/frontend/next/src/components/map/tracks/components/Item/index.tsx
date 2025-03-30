import { BirdTrack } from "@rrrcn/common-types/strapi/models/BirdTrack";
import { WithLocalesMap } from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { useMapContext } from "@/components/map/context";
import { useTranslations } from "@/utils/translations";
import { useMemo, useState } from "react";
import { useSpeciesHabitatAreas } from "@/components/map/habitat-areas/components/Item/swr";
import {
  parseGeojson,
  useShowMapObjects,
} from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { Feature, GeoJSON, MultiPolygon, Polygon } from "geojson";
import { useBirdTrackWithGeojson } from "@/components/map/tracks/components/Item/swr";
import { Button, CircularProgress } from "@mui/material";
import { CommonSpeciesItem } from "@/components/common/SpeciesItem";
import { useLang } from "@/utils/translations/context";
import {
  MapTrackItemButtonContainer,
  MapTrackItemContainer,
  MapTrackItemInfoContainer,
  MapTrackItemSpecies,
  MapTrackItemTitle,
} from "@/components/map/tracks/components/Item/style";
import { PopoverColorPicker } from "@/components/common/PopoverColorPicker";
import { MapHabitatAreaBottomRow } from "@/components/map/habitat-areas/components/Item/style";

export const MapBirdTrackItem = ({
  track,
}: {
  track: WithLocalesMap<BirdTrack>;
}) => {
  const { map } = useMapContext();
  const t = useTranslations();
  const lang = useLang();
  const [color, setColor] = useState("black");
  const { data, trigger, isMutating } = useBirdTrackWithGeojson(track);

  const mapTrack = useMemo(() => {
    return data?.track ? parseGeojson(data?.track as GeoJSON) : [];
  }, [data]);
  const {
    show: trackShown,
    showObjects,
    hideObjects,
  } = useShowMapObjects(mapTrack, map, false, {
    strokeColor: color,
    fillColor: color,
  });
  return (
    <MapTrackItemContainer>
      <MapTrackItemInfoContainer>
        <MapTrackItemTitle>
          {track.localesMap[lang.lang].name}
        </MapTrackItemTitle>
        <MapTrackItemSpecies>
          {track.localesMap[lang.lang].species?.name}
        </MapTrackItemSpecies>
      </MapTrackItemInfoContainer>
      <MapTrackItemButtonContainer>
        {isMutating ? (
          <CircularProgress />
        ) : !trackShown ? (
          <Button
            onClick={() => {
              showObjects();
              !data?.track && trigger();
            }}
          >
            {t["common.show"]}
          </Button>
        ) : (
          <Button
            onClick={() => {
              hideObjects();
            }}
          >
            {t["common.hide"]}
          </Button>
        )}
        <PopoverColorPicker color={color} onChange={setColor} />
      </MapTrackItemButtonContainer>
    </MapTrackItemContainer>
  );
};
