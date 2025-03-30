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
import { MapVulnereabilityCalculation } from "@rrrcn/common-types/strapi/custom-models/MapVulnereabilityCalculation";
import {
  useCalculationHabitatArea,
  useCalculationMigration,
  useCalculationMigrationTrackFetcher,
} from "@/components/map/calculations/components/Item/swr";
import { featureCollection, lineString } from "@turf/helpers";

export const MapCalculationItem = ({
  calculation,
}: {
  calculation: MapVulnereabilityCalculation;
}) => {
  const { map } = useMapContext();
  const t = useTranslations();
  const lang = useLang();
  const [color, setColor] = useState("black");
  const { data, trigger, isMutating } = useCalculationMigration(
    calculation.map_species_migration?.id
  );
  console.log({ data });

  const mapTrack = useMemo(() => {
    if (data?.generated_tracks) {
      const fc = featureCollection(
        data?.generated_tracks.map((it) => {
          const _lineString = lineString(
            it.points.features.map(
              (it: GeoJSON.Feature<GeoJSON.Point>) => it.geometry.coordinates
            )
          );
          return _lineString;
        })
      );
      return parseGeojson(fc);
    }
    return [];
  }, [data]);
  const {
    show: trackShown,
    showObjects,
    hideObjects,
  } = useShowMapObjects(mapTrack, map, false, {
    strokeColor: color,
    fillColor: color,
  });
  const species =
    calculation.map_habitat_area?.species ||
    calculation.map_species_migration?.species;
  if (calculation.type === "migration") {
    return <MapCalculationMigrationItem calculation={calculation} />;
  }
  if (calculation.type === "habitat_area") {
    return <MapCalculationHabitatAreaItem calculation={calculation} />;
  }
  return <></>;
};
export const MapCalculationMigrationItem = ({
  calculation,
}: {
  calculation: MapVulnereabilityCalculation;
}) => {
  const { map } = useMapContext();
  const t = useTranslations();
  const lang = useLang();
  const [color, setColor] = useState("black");
  const { data, trigger, isMutating } = useCalculationMigration(
    calculation.map_species_migration?.id
  );

  const mapTrack = useMemo(() => {
    if (data?.generated_tracks) {
      const fc = featureCollection(
        data?.generated_tracks
          .filter((it) => it.points.features.length > 1)
          .map((it) => {
            const _lineString = lineString(
              it.points.features.map(
                (it: GeoJSON.Feature<GeoJSON.Point>) => it.geometry.coordinates
              )
            );
            return _lineString;
          })
      );
      return parseGeojson(fc);
    }
    return [];
  }, [data]);
  const {
    show: trackShown,
    showObjects,
    hideObjects,
  } = useShowMapObjects(mapTrack, map, false, {
    strokeColor: color,
    fillColor: color,
    zIndex: -1,
  });
  const species =
    calculation.map_habitat_area?.species ||
    calculation.map_species_migration?.species;
  return (
    <MapTrackItemContainer>
      <MapTrackItemInfoContainer>
        <MapTrackItemTitle>{calculation.type}</MapTrackItemTitle>
        <MapTrackItemSpecies>{species?.name}</MapTrackItemSpecies>
      </MapTrackItemInfoContainer>
      <MapTrackItemButtonContainer>
        {isMutating ? (
          <CircularProgress />
        ) : !trackShown ? (
          <Button
            onClick={() => {
              showObjects();
              !data?.generated_tracks && trigger();
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
export const MapCalculationHabitatAreaItem = ({
  calculation,
}: {
  calculation: MapVulnereabilityCalculation;
}) => {
  const species =
    calculation.map_habitat_area?.species ||
    calculation.map_species_migration?.species;
  const { data, trigger, isMutating } = useCalculationHabitatArea(
    calculation.map_habitat_area?.id
  );
  const t = useTranslations();

  const [color, setColor] = useState("red");
  const { map } = useMapContext();
  console.log({ data }, "HABITAT");
  const mapTrack = useMemo(() => {
    if (data?.polygon) {
      return parseGeojson(data?.polygon);
    }
    return [];
  }, [data]);
  console.log(mapTrack);
  const {
    show: trackShown,
    showObjects,
    hideObjects,
  } = useShowMapObjects(mapTrack, map, false, {
    fillColor: color,
    zIndex: 10,
  });
  return (
    <MapTrackItemContainer>
      <MapTrackItemInfoContainer>
        <MapTrackItemTitle>{calculation.type}</MapTrackItemTitle>
        <MapTrackItemSpecies>{species?.name}</MapTrackItemSpecies>
      </MapTrackItemInfoContainer>
      <MapTrackItemButtonContainer>
        {isMutating ? (
          <CircularProgress />
        ) : !trackShown ? (
          <Button
            onClick={() => {
              showObjects();
              !data?.polygon && trigger();
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
