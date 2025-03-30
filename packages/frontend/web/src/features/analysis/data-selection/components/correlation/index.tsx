import { useSendAnalysis } from "@/features/analysis/common/utils";
import { FormikContext, useFormik } from "formik";
import { useTranslations } from "@/utils/translations";
import {
  CorrelationInputConfig,
  CorrelationSchema,
} from "@/features/analysis/data-selection/components/correlation/schema";
import { DeepPartial } from "@/utils/types";
import React from "react";
import { DataSelectionDataInput } from "@/features/analysis/data-selection/components/common/data-input";
import { Button, Input, TextField, Typography } from "@mui/material";
import { CommonPaper } from "@/components/common/common";

const useSendCorrelationAnalysis = () =>
  useSendAnalysis("data-selection-correlation", (data) => data);
export const DataSelectionCorrelationFormConfig = () => {
  const { onSend } = useSendCorrelationAnalysis();
  const formik = useFormik<DeepPartial<CorrelationInputConfig>>({
    initialValues: { correlationThreshold: 0.75, data: { type: "all" } },
    validationSchema: CorrelationSchema,
    onSubmit: (data) => {
      console.log({ data });
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
  return (
    <FormikContext.Provider value={formik}>
      <CommonPaper
        $error={
          !!(
            (touched[`correlationThreshold`] || submitCount) &&
            errors?.correlationThreshold
          )
        }
      >
        <TextField
          margin={"dense"}
          size={"small"}
          error={
            !!(
              (touched[`correlationThreshold`] || submitCount) &&
              errors?.correlationThreshold
            )
          }
          value={config?.correlationThreshold || null}
          onChange={({ target: { value } }) =>
            setConfig({ ...config, correlationThreshold: Number(value) })
          }
          label={strings["data-selection.correlation.threshold-label"]}
        />
      </CommonPaper>
      <CommonPaper
        $error={!!((touched[`ttest`] || submitCount) && errors?.ttest)}
      >
        <Typography>{strings["data-selection.normal.add-t-test"]}</Typography>
        <Input
          error={!!((touched[`ttest`] || submitCount) && errors?.ttest)}
          inputProps={{
            accept: "text/csv",
          }}
          size={"small"}
          type={"file"}
          onChange={({
            target: { files, form },
          }: React.ChangeEvent<HTMLInputElement>) => {
            setConfig({
              ...config,
              ttest: files?.[0],
            });
          }}
        />
      </CommonPaper>
      <DataSelectionDataInput name={"data"} />

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
