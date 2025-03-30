import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GoogleMapObject } from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { MapDrawingContext } from "@/components/map/map-edit";
import { useQuery } from "react-query";
import { getFeaturesPolyline } from "../../../utils/map-objects";
import { GenerateTracksResponse } from "@rrrcn/common-types/services/api/migrations/generate-tracks/response";

export const useGeneratedTracks = () => {
  const mapObjectsRef = useRef<GoogleMapObject[]>([]);
  const { showMapObjects, hideMapObjects } = useContext(MapDrawingContext);
  const [shown, setShown] = useState(false);
  const { data: generatedMigrations } = useQuery<GenerateTracksResponse>(
    "migration-generated-tracks"
  );
  const showTracks = useCallback(() => {
    showMapObjects(mapObjectsRef.current);
    setShown(true);
  }, [mapObjectsRef, showMapObjects]);
  const hideTracks = useCallback(() => {
    hideMapObjects(mapObjectsRef.current);
    setShown(false);
  }, [mapObjectsRef, hideMapObjects]);

  useEffect(() => {
    if (generatedMigrations?.generatedTracks) {
      mapObjectsRef.current = generatedMigrations.generatedTracks.map((it) =>
        getFeaturesPolyline(
          it.points.features
            .filter((_it) => _it.geometry)
            .map((_it) => ({
              type: "Feature",
              geometry: _it.geometry!,
              properties: {},
            }))
        )
      );

      showTracks();
    }

    return () => {
      hideTracks();
      mapObjectsRef.current = [];
    };
  }, [generatedMigrations]);
  return {
    showTracks,
    hideTracks,
    shown,
    tracks: generatedMigrations?.generatedTracks,
  };
};
