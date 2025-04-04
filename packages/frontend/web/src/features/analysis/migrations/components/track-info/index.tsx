import { IndexedMigration } from "../../index";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useContext } from "react";
import { Migration, SEASONS } from "../../types";
import { BirdMigrationYear } from "./components/migrations-season/migration-year";

import { useMutation } from "react-query";
import { indexTracksWithWorker } from "../../utils/parser-utils";
import { IndexTracksWorkerContext } from "../../workers/context";
import { useMapTrack } from "./use-map-track";
import {
  MigrationTrackInfoShowButton,
  MigrationTrackInfoShowMarkersButton,
} from "./style";
import { useTranslations } from "@/utils/translations";
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const TrackInfo = ({
  migration,
  onEditEnd,
  isEdit,
  filteredMigration,
  onChangeEditState,
}: {
  filteredMigration: IndexedMigration;
  migration: IndexedMigration;
  onEditEnd: (migration: IndexedMigration) => any;
  isEdit?: boolean;
  onChangeEditState: (arg: boolean) => any;
}) => {
  const {
    hideAllMarkers,
    showAllMarkers,
    hideTrack,
    isTrackMarkersShown,
    isTrackShown,
    shownSeasonsMigrations,
    shownSeasonsMigrationsPoints,
    showTrack,
    showSeasonMigration,
    hideSeasonMigration,
  } = useMapTrack(migration);
  //
  // const cancelEdit = useCallback(() => {
  //   setNewSeasonMigration(undefined);
  //   setShowSeasonModal(false);
  //   onChangeEditState(false);
  // }, []);
  // const finishEdit = useCallback(
  //   (year: number, season: SEASONS) => {
  //     const newMigration = { ...migration };
  //     if (!newMigration.years[year]) {
  //       newMigration.years[year] = {} as MigrationYear;
  //     }
  //     newMigration.years[year][season] = [
  //       ...(newSeasonMigration as [number, number]),
  //     ];
  //     onEditEnd(newMigration);
  //     setShowSeasonModal(false);
  //     setNewSeasonMigration(undefined);
  //     onChangeEditState(false);
  //   },
  //   [migration, onEditEnd, onChangeEditState, newSeasonMigration]
  // );
  const onDeleteMigration = (year: string, season: SEASONS) => {
    const newMigration = { ...migration };
    newMigration.years = { ...newMigration.years };
    newMigration.years[year] = { ...newMigration.years[year] };
    delete newMigration.years[year][season];

    onEditEnd(newMigration);
  };
  const t = useTranslations();

  const { worker } = useContext(IndexTracksWorkerContext);
  const indexTracks = () =>
    indexTracksWithWorker(worker, migration as Migration);
  const { mutate: indexTracksMutation } = useMutation<
    Migration | undefined,
    any,
    void
  >("parseFiles", indexTracks, {
    onError: (error, variables) => {},
    onSuccess: (res, variables) => {
      if (res) {
        onEditEnd(res);
      }
    },
  });

  return (
    <>
      <Accordion
        className={`common__card common__card_blue`}
        defaultExpanded={false}
      >
        <AccordionSummary
          style={{ width: "100%" }}
          className={"common__accordion-row-summary"}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={"common__row"}>
            <Typography
              className={"common__ellipsis-text"}
              title={migration.title}
            >
              {migration.title}
            </Typography>
            {!isEdit && (
              <>
                <MigrationTrackInfoShowButton
                  show={isTrackShown}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isTrackShown) {
                      hideTrack();
                    } else {
                      showTrack();
                    }
                  }}
                />
                <MigrationTrackInfoShowMarkersButton
                  fill={isTrackMarkersShown ? "blue" : "gray"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isTrackMarkersShown) {
                      hideAllMarkers();
                    } else {
                      showAllMarkers();
                    }
                  }}
                />
              </>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {Object.entries(migration.years).map(([year, yearInfo]) => (
            <BirdMigrationYear
              onChangeMigration={(migration) => {
                onEditEnd(migration);
              }}
              shownSeasons={shownSeasonsMigrations}
              shownSeasonsPoints={shownSeasonsMigrationsPoints}
              onShowSeason={(season) => showSeasonMigration({ season, year })}
              onHideSeason={(season) => hideSeasonMigration({ season, year })}
              migration={migration}
              year={year}
              onDeleteMigration={onDeleteMigration}
            />
          ))}
          {}
          {!isEdit ? (
            <>
              <Button
                onClick={() => {
                  indexTracksMutation();
                }}
              >
                {t["migrations.auto-migration"]}
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(migration.geojson, null, 4)
                  );
                }}
              >
                Copy geojson
              </Button>
            </>
          ) : (
            <Button onClick={() => {}}>{t["common.cancel"]}</Button>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
