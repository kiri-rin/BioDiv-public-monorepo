import {
  useMapContext,
  useMapPageProps,
  useMapSlugs,
} from "@/components/map/context";
import { useLang } from "@/utils/translations/context";
import { useTranslations } from "@/utils/translations";
import { useMemo, useState } from "react";
import {
  parseGeojson,
  useShowMapObjects,
} from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { Feature, MultiPolygon, Polygon } from "geojson";
import { CommonSpeciesItem } from "@/components/common/SpeciesItem";
import { Button, CircularProgress } from "@mui/material";
import { useSpeciesHabitatAreas } from "@/components/map/habitat-areas/components/Item/swr";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
import { WithLocalesMap } from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { HexColorPicker } from "react-colorful";
import { PopoverColorPicker } from "@/components/common/PopoverColorPicker";
import { MapHabitatAreaBottomRow } from "./style";

export const MapHabitatAreasSpeciesItem = ({
  species,
}: {
  species: WithLocalesMap<Species>;
}) => {
  const { map } = useMapContext();
  const t = useTranslations();
  const [color, setColor] = useState("yellow");
  const { data, trigger, isMutating } = useSpeciesHabitatAreas(species);

  const mapHabitatAreas = useMemo(() => {
    return data?.habitat_areas
      ? parseGeojson({
          type: "FeatureCollection",
          features: data?.habitat_areas.map(
            (it) => it.polygon as Feature<Polygon | MultiPolygon>
          ),
        })
      : [];
  }, [data]);
  const {
    show: habitatAreasShown,
    showObjects,
    hideObjects,
  } = useShowMapObjects(mapHabitatAreas, map, false, {
    fillColor: color,
    zIndex: 10,
  });
  return (
    <CommonSpeciesItem species={species}>
      <MapHabitatAreaBottomRow>
        <PopoverColorPicker color={color} onChange={setColor} />
        {isMutating ? (
          <CircularProgress />
        ) : !habitatAreasShown ? (
          <Button
            onClick={() => {
              showObjects();
              !data?.habitat_areas && trigger();
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
      </MapHabitatAreaBottomRow>
    </CommonSpeciesItem>
  );
};
