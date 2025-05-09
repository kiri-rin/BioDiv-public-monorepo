import { Button, Card, CircularProgress, Input } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { TrackInfo } from "../track-info";
import { useParseKMLWorker } from "../../workers/context";
import { MigrationFilesModal } from "./modal";
import { WorkerMessage } from "../../workers/parse_kml/types";
import { useParseMigrationsKml } from "../../utils/parser-utils";
import { useMigrationsContext } from "../../context/migrations";
import { useTranslations } from "@/utils/translations";

export const MigrationsFilesInput = () => {
  const { migrations, setMigrations: onMigrationsChange } =
    useMigrationsContext();
  const t = useTranslations();
  const worker = useParseKMLWorker();
  const [filesToParse, setFilesToParse] = useState<FileList | null>(null);
  const [currentEdit, setCurrentEdit] = useState<number | null>(null);
  const [loadingFiles, setLoadingFiles] = useState<Set<string>>(new Set());
  const removeIdFromLoading = (id: string) => {
    setLoadingFiles((prev) => {
      const newState = new Set<string>(prev);
      newState.delete(id);
      return newState;
    });
  };
  const parseMigrationsKml = useParseMigrationsKml(worker);
  const parseInputFile = useCallback(
    (args: WorkerMessage) => {
      setLoadingFiles((prev) => new Set(prev).add(args.id));
      return parseMigrationsKml(args)
        .then((res: any) => {
          setLoadingFiles((prev) => {
            const newState = new Set<string>(prev);
            newState.delete(args.id);
            return newState;
          });
          res && onMigrationsChange((prevState) => [...(prevState || []), res]);
          return res;
        })
        .catch((e: Error) => {
          setLoadingFiles((prev) => {
            const newState = new Set<string>(prev);
            newState.delete(args.id);
            return newState;
          });
        })
        .finally(() => {
          setLoadingFiles((prev) => {
            const newState = new Set<string>(prev);
            newState.delete(args.id);
            return newState;
          });
        });
    },
    [worker]
  );

  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Button
        onClick={() => {
          ref.current?.click();
        }}
      >
        {t["migrations.add-files"]}
      </Button>
      <Input
        inputRef={ref}
        style={{ visibility: "hidden" }}
        inputProps={{ multiple: true }}
        size={"small"}
        type={"file"}
        onChange={({
          target: { files },
        }: React.ChangeEvent<HTMLInputElement>) => {
          files && setFilesToParse(files);
        }}
      />
      {migrations?.map((migr, index) => (
        <TrackInfo
          key={index}
          filteredMigration={migr}
          onChangeEditState={(edit) => {
            setCurrentEdit((curEdit) => {
              if (curEdit === index && !edit) {
                return null;
              } else {
                return index;
              }
            });
          }}
          migration={migr}
          isEdit={currentEdit === index}
          onEditEnd={(result) => {
            onMigrationsChange((prev) => {
              if (!prev) {
                prev = [];
              }
              prev[index] = result;
              return [...prev];
            });
          }}
        />
      ))}
      {Array(loadingFiles.size)
        .fill(0)
        .map((it, index) => (
          <Card key={index} className={`common__card common__card_blue`}>
            <CircularProgress />
          </Card>
        ))}
      {!!filesToParse?.length && (
        <MigrationFilesModal
          files={filesToParse}
          onParseClick={(filesWithTypes) => {
            filesWithTypes.forEach(({ file, type }, index) =>
              parseInputFile({
                file,
                id: String(Math.random()),
                type,
              })
            );
            setFilesToParse(null);
          }}
          open={true}
          onClose={() => setFilesToParse(null)}
        />
      )}
    </>
  );
};
