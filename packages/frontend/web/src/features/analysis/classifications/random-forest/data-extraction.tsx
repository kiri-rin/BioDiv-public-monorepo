import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import type {
  CommonScriptParams,
  DataExtractionConfig,
  ScriptConfig,
} from "@rrrcn/common-types/services/api/common-body";
import { GeometryInput } from "@/components/geometry-inputs/geometry-input";
import { ScriptSelectInput } from "@/components/scripts/script-input";
import { DatesInputConfig } from "@/components/date-inputs/script-dates";
import { useTranslations } from "@/utils/translations";
import { useQuery } from "react-query";
import { api } from "@/api/index";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { FieldArray, useFormik, FormikContext } from "formik";
import { CommonPaper } from "@/components/common/common";
import Typography from "@mui/material/Typography";
import { _useSendAnalysis } from "../../common/utils";
import { DataExtractionValidationSchema } from "./data-schemas";
import { PasteScriptsConfigModal } from "./components/paste-scripts-config";

export interface ScriptInputConfig extends Omit<ScriptConfig, "dates"> {
  dates?: DatesInputConfig;
}
export interface DataExtractionInput
  extends Omit<
    DataExtractionConfig<File | undefined>,
    "scripts" | "defaultScriptParams" | "background_points"
  > {
  background_points: Partial<
    DataExtractionConfig<File | undefined>["background_points"]
  >;
  defaultScriptParams: Omit<CommonScriptParams, "dates"> & {
    dates?: DatesInputConfig;
  };
  scripts: ScriptInputConfig[];
}
export const DataExtractionConfigForm = () => {
  const strings = useTranslations();
  const { onSend } = _useSendAnalysis("data");
  const formik = useFormik<Partial<DataExtractionInput>>({
    initialValues: {},
    validationSchema: DataExtractionValidationSchema,
    onSubmit: (data) => {
      onSend({
        ...data,
        background_points: data.background_points?.count
          ? data.background_points
          : undefined,
      });
    },
  });
  const {
    submitCount,
    touched,
    values: config,
    errors,
    submitForm,
    setValues: setConfig,
  } = formik;
  const { data: scriptsList } = useQuery(
    "analysis-scripts",
    (opt) => api.analysis.getApiAnalysisScripts(),
    { enabled: false, refetchOnWindowFocus: false }
  );
  const [openImportConfig, setOpenImport] = useState(false);
  console.log(config, errors);
  //TODO VALIDATE
  return (
    <FormikContext.Provider value={formik}>
      <div>
        <CommonPaper
          $error={(touched?.[`points`] || submitCount) && errors?.points}
        >
          {" "}
          <Box sx={{ marginY: "10px" }}>
            {strings["data-extraction.choose-points"]}
          </Box>
          <GeometryInput
            value={config.points}
            onChange={(value) => setConfig({ ...config, points: value })}
          />
        </CommonPaper>

        <Divider sx={{ marginY: "10px", backgroundColor: "black" }} />
        <CommonPaper
          $error={
            (touched?.[`random_points`] || submitCount) && errors?.random_points
          }
        >
          {" "}
          <Box sx={{ marginY: "10px" }}>
            {strings["data-extraction.choose-random-points"]}
          </Box>
          <TextField
            value={config.random_points?.count || ""}
            onChange={({ target: { value } }) =>
              setConfig({
                ...config,
                random_points: value ? { count: Number(value) } : null,
              })
            }
          />
        </CommonPaper>
        <CommonPaper
          $error={
            (touched?.[`background_points`] || submitCount) &&
            errors?.background_points
          }
        >
          {" "}
          <Box sx={{ marginY: "10px" }}>
            {strings["data-extraction.choose-background-points"]}
          </Box>
          <TextField
            value={config.background_points?.count || ""}
            onChange={({ target: { value } }) =>
              setConfig({
                ...config,
                background_points: {
                  ...config.background_points,
                  count: Number(value),
                },
              })
            }
          />
          <Box sx={{ marginY: "10px" }}>
            {
              strings[
                "data-extraction.choose-background-points-percent-inside-buffers"
              ]
            }
          </Box>
          <TextField
            value={config.background_points?.percent_inside_buffers || ""}
            onChange={({ target: { value } }) =>
              setConfig({
                ...config,
                background_points: {
                  ...config.background_points,
                  //@ts-ignore
                  percent_inside_buffers: value,
                },
              })
            }
          />
          <Box sx={{ marginY: "10px" }}>
            {strings["data-extraction.choose-background-points-region"]}
          </Box>
          <GeometryInput
            type={"polygon" as google.maps.drawing.OverlayType.POLYGON}
            value={config.background_points?.region_of_interest}
            onChange={(value) =>
              setConfig({
                ...config,
                background_points: {
                  ...config.background_points,
                  region_of_interest: value,
                },
              })
            }
          />
        </CommonPaper>
        <Divider sx={{ marginY: "10px", backgroundColor: "black" }} />
        <CommonPaper
          $error={(touched?.[`scripts`] || submitCount) && errors?.scripts}
        >
          <Typography sx={{ marginY: "10px" }}>
            {strings["data-extraction.choose-params"]}
          </Typography>
          <FieldArray name={`scripts`}>
            {({ push, remove, name: _name }) => (
              <>
                {config?.scripts?.map((it: any, index: number) => (
                  <ScriptSelectInput
                    key={it.id}
                    name={`${_name}.${index}`}
                    onDelete={() => {
                      remove(index);
                    }}
                  />
                ))}
                <Button
                  onClick={() => {
                    push({ id: Math.random(), key: scriptsList?.data?.[0] }); //TODO create new id getter
                  }}
                >
                  {strings["data-extraction.add-data"]}
                </Button>
              </>
            )}
          </FieldArray>
          {/*//TODO MOVE ALL THIS MODULE TO ONE FILE*/}
          <Button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(config.scripts));
            }}
          >
            {strings["data-extraction.copy-config"]}
          </Button>
          <Button
            onClick={() => {
              setOpenImport(true);
            }}
          >
            {strings["data-extraction.import-config"]}
          </Button>
          {openImportConfig && (
            <PasteScriptsConfigModal
              onClose={() => setOpenImport(false)}
              open={openImportConfig}
              onSubmit={(data) => {
                formik.setFieldValue("scripts", data.scripts);
                setOpenImport(false);
              }}
            />
          )}
        </CommonPaper>
        <Button
          onClick={() => {
            submitForm();
          }}
        >
          {strings["data-extraction.get-result"]}
        </Button>
      </div>
    </FormikContext.Provider>
  );
};
