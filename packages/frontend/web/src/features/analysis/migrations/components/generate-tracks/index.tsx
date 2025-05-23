import React, { useMemo, useState } from "react";
import { Button, LinearProgress, TextField } from "@mui/material";

import { GeoJSON } from "geojson";
import { Migration, SEASONS } from "../../types";
import { useMutation, useQueryClient } from "react-query";
import { api } from "@/api/index";
import { SelectedTracksSeasonsType } from "../../index";
import { FormikContext, useFormik } from "formik";
import { useGeneratedTracks } from "./hooks/use-generated-tracks";
import { useGeneratedAreas } from "./hooks/use-generated-areas";
import {
  MigrationGeneratedTracksContainer,
  MigrationGeneratedTracksRow,
  MigrationGeneratedTracksShowButton,
  MigrationGeneratedTracksTitle,
} from "./style";
import { exportGeneratedMigrationsTracks } from "./utils/export";
import { useMigrationsContext } from "../../context/migrations";
import { MigrationsVulnerability } from "../vulnerability";
import { useTranslations } from "@/utils/translations";
import { CommonPaper } from "@/components/common/common";

export const MigrationsChooseAreas = () => {
  const t = useTranslations();
  const { migrations, selectedSeasons, setSelectedSeasons } =
    useMigrationsContext();
  const [initCount, setInitCount] = useState<number>(10);
  const {
    hideTracks,
    showTracks,
    shown: tracksShown,
    tracks,
  } = useGeneratedTracks();
  const {
    shown: areasShown,
    areas,
    indexedAreas,
    showIndexedAreas,
    hideIndexedAreas,
    hideAreas,
    indexedAreasShown,
    showAreas,
    mapObjectsRef,
  } = useGeneratedAreas();

  const queryClient = useQueryClient();
  const {
    data: generatedMigrations,
    mutateAsync: generateTracks,
    isLoading: isGenerateLoading,
  } = useMutation(
    "migration-generated-tracks",
    api.migration.postApiMigrationGenerateTracks,
    {
      onSuccess({ data }) {
        queryClient.setQueriesData("migration-generated-tracks", data);
      },
    }
  );

  const paramsForm = useFormik({
    onSubmit: () => {},
    initialValues: { params: { type: "scripts", scripts: [] } },
  });
  const selectedSeasonsCount = useMemo(
    () =>
      Object.values(selectedSeasons)
        .flatMap((trackSelected) =>
          Object.values(trackSelected).map(
            (trackSelectedSeasons) =>
              Object.values(trackSelectedSeasons).filter((it) => it).length
          )
        )
        .reduce((a, b) => a + b, 0),
    [selectedSeasons]
  );

  return (
    <FormikContext.Provider value={paramsForm}>
      <CommonPaper>
        {t["migrations.selected-migrations"]}: {selectedSeasonsCount}
        <div>
          <TextField
            sx={{ marginTop: "8px" }}
            label={t["migrations.generate-count-label"]}
            size={"small"}
            type={"number"}
            value={initCount}
            onChange={({ target: { value } }) => setInitCount(Number(value))}
          />
          <div>
            <Button
              disabled={isGenerateLoading || !selectedSeasonsCount}
              onClick={() => {
                generateTracks(
                  prepareGenerateRequest(
                    migrations || [],
                    selectedSeasons,
                    initCount
                  )
                );
              }}
            >
              {t["migrations.generate"]}
            </Button>
          </div>
        </div>
      </CommonPaper>
      {isGenerateLoading ? (
        <LinearProgress />
      ) : (
        generatedMigrations && (
          <MigrationGeneratedTracksContainer>
            {t["migrations.generated-tracks"]}
            <MigrationGeneratedTracksRow>
              <MigrationGeneratedTracksTitle>
                {t["migrations.generated-tracks-total"]}: {tracks?.length}
              </MigrationGeneratedTracksTitle>
              <MigrationGeneratedTracksShowButton
                onClick={() => {
                  tracksShown ? hideTracks() : showTracks();
                }}
                show={tracksShown}
              />
            </MigrationGeneratedTracksRow>
            <MigrationGeneratedTracksRow>
              <MigrationGeneratedTracksTitle>
                {t["migrations.generated-areas"]}:{areas?.features.length}
              </MigrationGeneratedTracksTitle>
              <MigrationGeneratedTracksShowButton
                onClick={() => {
                  areasShown ? hideAreas() : showAreas();
                }}
                show={areasShown}
              />
            </MigrationGeneratedTracksRow>
            <MigrationGeneratedTracksRow>
              <MigrationGeneratedTracksTitle>
                {t["migrations.indexed-areas"]}:
                {Object.values(indexedAreas || {}).length}
              </MigrationGeneratedTracksTitle>
              <MigrationGeneratedTracksShowButton
                onClick={() => {
                  indexedAreasShown ? hideIndexedAreas() : showIndexedAreas();
                }}
                show={indexedAreasShown}
              />
            </MigrationGeneratedTracksRow>
            <Button
              onClick={() => {
                exportGeneratedMigrationsTracks(generatedMigrations?.data);
              }}
            >
              Export
            </Button>
          </MigrationGeneratedTracksContainer>
        )
      )}
      {/*{migrationSplitAreaState && <ParamsImageInput name={"params"} />}*/}
      <MigrationsVulnerability mapObjects={mapObjectsRef.current} />
    </FormikContext.Provider>
  );
};
const reduceMigrations = (migrations: Migration[]) => {
  return migrations.reduce((acc, migr) => {
    Object.entries(migr.years).forEach(([year, yearInfo]) => {
      if (!acc[year]) {
        acc[year] = {};
      }
      Object.values(SEASONS).forEach((season) => {
        if (yearInfo[season]) {
          acc[year][season] = acc[year][season] ? acc[year][season]++ : 1;
        }
      });
    });
    return acc;
  }, {} as any);
};
const prepareSeasonsRequest = (
  migrations: Migration[],
  seasons: SelectedTracksSeasonsType
) => {
  const res: { migrations: { geojson: GeoJSON.FeatureCollection }[] } = {
    migrations: [],
  };

  migrations.forEach(({ geojson, years, id: trackId }, index) => {
    Object.entries(years).forEach(([year, yearSeasons]) => {
      Object.entries(yearSeasons).forEach(([season, seasonIndices]) => {
        const currentMigrationSeason =
          seasons[trackId]?.[year]?.[season as SEASONS];
        if (currentMigrationSeason) {
          res.migrations.push({
            geojson: {
              type: "FeatureCollection",
              features: geojson.features.slice(...seasonIndices).map((it) => ({
                ...it,
                properties: { ...it.properties, description: undefined },
              })),
            },
          });
        }
      });
    });
  });

  res.migrations = res.migrations.filter((it) => it?.geojson?.features?.length);
  return res;
};
export const prepareGenerateRequest = (
  migrations: Migration[],
  selectedSeasons: any,
  initCount: number
) => {
  const res = prepareSeasonsRequest(migrations, selectedSeasons);
  //@ts-ignore
  res.migrations = res.migrations.map((it) => it.geojson);
  //@ts-ignore
  res.initCount = initCount;
  return res;
};
