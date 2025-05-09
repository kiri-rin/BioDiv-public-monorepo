import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type {
  AssetImportConfig,
  CommonScriptParams,
  ComputedObjectImportConfig,
} from "@rrrcn/common-types/services/api/common-body";
import type { RandomForestConfig } from "@rrrcn/common-types/services/api/classifications/random-forest";
import { GeometryInput } from "@/components/geometry-inputs/geometry-input";
import { DatesInputConfig } from "@/components/date-inputs/script-dates";
import { useTranslations } from "@/utils/translations";
import { mapScriptsConfigToRequest } from "./utils";

import Divider from "@mui/material/Divider";
import { ScriptInputConfig } from "./data-extraction";
import { ParamsImageInput } from "@/components/scripts/params-image-input";
import { FormikContext, useField, useFormik, useFormikContext } from "formik";
import Typography from "@mui/material/Typography";
import { CommonPaper } from "@/components/common/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { _useSendAnalysis } from "../../common/utils";
import { RandomForestInputSchema } from "./rf-schemas";

export interface RandomForestInputConfig
  extends Omit<
    RandomForestConfig<File | undefined>,
    "params" | "trainingPoints"
  > {
  trainingPoints: Partial<
    RandomForestConfig<File | undefined>["trainingPoints"]
  >;
  params:
    | AssetImportConfig
    | ComputedObjectImportConfig
    | {
        type: "scripts";
        defaultScriptParams?: Omit<CommonScriptParams, "dates"> & {
          dates: DatesInputConfig;
        };
        scripts: ScriptInputConfig[];
      };
}
export const mapRFConfigToRequest = (config: RandomForestInputConfig) => {
  if (config.params.type === "scripts") {
    return { ...config, params: mapScriptsConfigToRequest(config.params) };
  } else {
    return config;
  }
};
export const defaultRFConfig: Partial<RandomForestInputConfig> = {
  params: { type: "scripts", scripts: [] },
  trainingPoints: {
    type: "all-points",
    allPoints: {
      points: { type: "csv", path: undefined },
    },
  },
  validation: { type: "split", split: 0.2 },
  regionOfInterest: { type: "csv", path: undefined },
  outputMode: "PROBABILITY",
};
export const RandomForestConfigForm = () => {
  const { onSend } = _useSendAnalysis("random-forest");
  const formik = useFormik<Partial<RandomForestInputConfig>>({
    initialValues: defaultRFConfig,
    validationSchema: RandomForestInputSchema,
    onSubmit: (data) => {
      onSend(data);
    },
  });
  const {
    submitCount,
    touched,
    values: config,
    errors,
    submitForm,
    setFieldValue,
    setValues: setConfig,
  } = formik;
  const strings = useTranslations();
  //TODO VALIDATE
  return (
    <FormikContext.Provider value={formik}>
      <div style={{ paddingBottom: 20 }}>
        <CommonPaper
          $error={(touched[`outputMode`] || submitCount) && errors?.outputMode}
        >
          <div className={"common__row"}>
            <Typography sx={{ marginY: "10px" }}>
              {strings["random-forest.choose-output-mode"]}
            </Typography>
            <Select
              size={"small"}
              onChange={({ target: { value } }) => {
                setFieldValue(`outputMode`, value);
              }}
              value={config.outputMode || "PROBABILITY"}
            >
              <MenuItem value={"PROBABILITY"}>PROBABILITY</MenuItem>
              <MenuItem value={"REGRESSION"}>REGRESSION</MenuItem>
              <MenuItem value={"CLASSIFICATION"}> CLASSIFICATION</MenuItem>
              <MenuItem value={"MEAN"}>MEAN</MenuItem>
            </Select>
          </div>
        </CommonPaper>
        <CommonPaper
          $error={
            (touched[`regionOfInterest`] || submitCount) &&
            errors?.regionOfInterest
          }
        >
          <Typography sx={{ marginY: "10px" }}>
            {strings["random-forest.choose-region"]}
          </Typography>
          <GeometryInput
            type={"polygon" as google.maps.drawing.OverlayType.POLYGON}
            value={config.regionOfInterest}
            onChange={(value) =>
              setConfig({ ...config, regionOfInterest: value })
            }
          />
        </CommonPaper>
        <Divider sx={{ marginY: "10px", backgroundColor: "black" }} />

        <TrainingPointsInput name={`trainingPoints`} />
        <Accordion defaultExpanded={false} sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
            className={`common__card common__card_${
              (touched[`validation`] || submitCount) && errors?.validation
                ? "error"
                : "blue"
            }`}
          >
            <div className={"common__row"}>
              <Typography>{strings["random-forest.validation"]}</Typography>
              <Select
                value={config?.validation?.type}
                onChange={({ target: { value: _value } }) => {
                  setFieldValue(`validation`, {
                    type: _value,
                    ...(_value === "external" && {
                      points: defaultRFConfig["trainingPoints"],
                    }),
                  });
                }}
                size={"small"}
              >
                <MenuItem value={"split"}>
                  {strings["random-forest.validation.split-points"]}
                </MenuItem>
                <MenuItem value={"external"}>
                  {strings["random-forest.validation.external"]}
                </MenuItem>
              </Select>
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{}}>
            {(() => {
              switch (config.validation?.type) {
                case "external": {
                  return (
                    <>
                      <TrainingPointsInput
                        title={
                          strings["random-forest.choose-validation-points"]
                        }
                        name={`validation.points`}
                      />
                    </>
                  );
                }
                case "split":
                  return (
                    <CommonPaper
                      $error={
                        !!(
                          (touched as any)[`validation.split`] ||
                          (touched as any)[`validation.seed`] ||
                          submitCount
                        ) &&
                        ((errors?.validation as any)?.split ||
                          (errors?.validation as any)?.seed)
                      }
                    >
                      <TextField
                        margin={"dense"}
                        size={"small"}
                        label={strings["random-forest.validation.split"]}
                        value={config.validation?.split}
                        onChange={({ target: { value } }) =>
                          setFieldValue(`validation.split`, value)
                        }
                      />
                      <TextField
                        margin={"dense"}
                        size={"small"}
                        label={strings["random-forest.validation.seed"]}
                        value={config.validation?.seed}
                        onChange={({ target: { value } }) =>
                          setFieldValue(`validation.seed`, value)
                        }
                      />
                      <TextField
                        margin={"dense"}
                        size={"small"}
                        label={
                          strings["random-forest.validation.cross_validation"]
                        }
                        value={config.validation?.cross_validation}
                        onChange={({ target: { value } }) =>
                          setFieldValue(`validation.cross_validation`, value)
                        }
                      />
                      {config.validation?.cross_validation && (
                        <div>
                          <div
                            onClick={() => {
                              if (config.validation?.type === "split") {
                                setFieldValue(
                                  `validation.render_mean`,
                                  !(config.validation.render_mean !== undefined
                                    ? config.validation.render_mean
                                    : true)
                                );
                              }
                            }}
                            className={"common__row"}
                            style={{ width: "fit-content", cursor: "pointer" }}
                          >
                            <Checkbox
                              checked={
                                config.validation.render_mean !== undefined
                                  ? config.validation.render_mean
                                  : true
                              }
                            />
                            <Typography>
                              {strings["random-forest.validation.render_mean"]}
                            </Typography>
                          </div>
                          <div
                            onClick={() => {
                              if (config.validation?.type === "split") {
                                setFieldValue(
                                  `validation.render_best`,
                                  config.validation.render_best !== undefined
                                    ? !config.validation.render_best
                                    : false
                                );
                              }
                            }}
                            className={"common__row"}
                            style={{ width: "fit-content", cursor: "pointer" }}
                          >
                            <Checkbox
                              checked={
                                config.validation.render_best !== undefined
                                  ? config.validation.render_best
                                  : true
                              }
                            />
                            <Typography>
                              {strings["random-forest.validation.render_best"]}
                            </Typography>
                          </div>
                          <div className={"common__row"}>
                            <Typography>
                              {
                                strings[
                                  "random-forest.validation.use-by-default"
                                ]
                              }
                            </Typography>
                            <Select
                              onChange={({ target: { value } }) =>
                                setFieldValue(
                                  `validation.return_default`,
                                  value
                                )
                              }
                              size={"small"}
                              value={config.validation.return_default || "best"}
                            >
                              <MenuItem value={"best"}>
                                {strings["random-forest.validation.best"]}
                              </MenuItem>

                              <MenuItem value={"mean"}>
                                {strings["random-forest.validation.mean"]}
                              </MenuItem>
                            </Select>
                          </div>
                        </div>
                      )}
                    </CommonPaper>
                  );
                default:
                  return <></>;
              }
            })()}
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ marginY: "10px", backgroundColor: "black" }} />
        <ParamsImageInput name={`params`} />
        <Accordion defaultExpanded={true} sx={{ boxShadow: "none" }}>
          <AccordionSummary
            sx={{
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
            className={`common__card common__card_blue`}
            expandIcon={<ExpandMoreIcon />}
          >
            <div className={"common__row"}>
              <Typography sx={{ marginY: "10px" }}>
                {strings["random-forest.post-process"]}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <CommonPaper>
              <TextField
                margin={"dense"}
                disabled={config.outputMode === "CLASSIFICATION"}
                size={"small"}
                label={strings["random-forest.classificationSplits"]}
                value={config.classificationSplits?.join(",") || ""}
                onChange={({ target: { value } }) =>
                  setFieldValue(
                    `classificationSplits`,
                    value ? value.split(",") : undefined
                  )
                }
              />

              {
                <TextField
                  margin={"dense"}
                  disabled={
                    config.outputMode !== "CLASSIFICATION" &&
                    !config.classificationSplits?.length
                  }
                  size={"small"}
                  label={strings["random-forest.buffersPerAreaPoint"]}
                  value={config.buffersPerAreaPoint?.join(",") || ""}
                  onChange={({ target: { value } }) =>
                    setFieldValue(
                      `buffersPerAreaPoint`,
                      value ? value.split(",") : undefined
                    )
                  }
                />
              }
            </CommonPaper>
          </AccordionDetails>
        </Accordion>
      </div>
      <Button
        onClick={() => {
          submitForm();
        }}
      >
        {strings["data-extraction.get-result"]}
      </Button>
    </FormikContext.Provider>
  );
};
const TrainingPointsInput = ({
  name,
  title,
}: {
  name: string;
  title?: string;
}) => {
  const { setFieldValue, touched, submitCount } = useFormikContext<any>();
  const [{ value: config }, fieldMeta, { setValue: setConfig }] =
    useField<Partial<RandomForestInputConfig["trainingPoints"]>>(name);
  const errors = fieldMeta.error as any;
  const strings = useTranslations();

  return (
    <Accordion defaultExpanded={true} sx={{ boxShadow: "none" }}>
      <AccordionSummary
        sx={{
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
        className={`common__card common__card_${
          (touched[name] || submitCount) && errors ? "error" : "blue"
        }`}
        expandIcon={<ExpandMoreIcon />}
      >
        <div className={"common__row"}>
          <Typography sx={{ marginY: "10px" }}>
            {title || strings["random-forest.choose-training-points"]}
          </Typography>
          <Select
            onClick={(e) => e.stopPropagation()}
            size={"small"}
            value={config?.type}
            onChange={({ target: { value } }) =>
              setConfig({
                ...config,

                type: value as "all-points" | "separate-points",
              })
            }
          >
            <MenuItem value={"all-points"}>
              {strings["random-forest.all-training-points"]}
            </MenuItem>
            <MenuItem value={"separate-points"}>
              {strings["random-forest.separate-training-points"]}
            </MenuItem>
          </Select>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        {(() => {
          switch (config.type) {
            case "all-points":
              return (
                <CommonPaper
                  $error={
                    (touched[`allPoints.points`] || submitCount) &&
                    errors?.allPoints?.points
                  }
                >
                  <Typography sx={{ marginY: "10px" }}>
                    {strings["random-forest.choose-all-training-points"]}
                  </Typography>
                  <GeometryInput
                    available={["csv", "shp"]}
                    type={"marker" as google.maps.drawing.OverlayType.MARKER}
                    value={config?.allPoints?.points}
                    onChange={(value) =>
                      setConfig({
                        ...config,
                        type: "all-points",
                        allPoints: { points: value },
                      })
                    }
                  />
                  <TextField
                    margin={"dense"}
                    size={"small"}
                    value={config?.allPoints?.presenceProperty}
                    onChange={({ target: { value } }) =>
                      setFieldValue(`${name}.allPoints.presenceProperty`, value)
                    }
                    label={"presence key"}
                  />
                </CommonPaper>
              );
            case "separate-points":
              return (
                <>
                  <CommonPaper
                    $error={
                      (touched[`${name}.presencePoints`] || submitCount) &&
                      errors?.presencePoints
                    }
                  >
                    <Typography sx={{ marginY: "10px" }}>
                      {strings["random-forest.choose-presence"]}
                    </Typography>
                    <GeometryInput
                      type={"marker" as google.maps.drawing.OverlayType.MARKER}
                      value={config?.presencePoints}
                      onChange={(geometryConfig) =>
                        setConfig({
                          ...config,

                          presencePoints: geometryConfig,
                        })
                      }
                    />
                  </CommonPaper>
                  <CommonPaper
                    $error={
                      (touched[`${name}.absencePoints`] || submitCount) &&
                      errors?.absencePoints
                    }
                  >
                    <Typography sx={{ marginY: "10px" }}>
                      {strings["random-forest.choose-absence"]}
                    </Typography>
                    <GeometryInput
                      type={"marker" as google.maps.drawing.OverlayType.MARKER}
                      value={config?.absencePoints}
                      onChange={(geometryConfig) =>
                        setConfig({
                          ...config,

                          absencePoints: geometryConfig,
                        })
                      }
                    />
                  </CommonPaper>
                </>
              );
            default:
              return <></>;
          }
        })()}
      </AccordionDetails>
    </Accordion>
  );
};
