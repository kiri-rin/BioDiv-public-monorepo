import { useSendAnalysis } from "@/features/analysis/common/utils";
import { FormikContext, useFormik } from "formik";
import { useTranslations } from "@/utils/translations";

import { DeepPartial } from "@/utils/types";
import React from "react";
import { Button, Input, Typography } from "@mui/material";
import {
  NormalInputConfig,
  NormalTestSchema,
} from "@/features/analysis/data-selection/components/normal/schema";
import { CommonPaper } from "@/components/common/common";

const useSendNormalTestAnalysis = () =>
  useSendAnalysis("data-selection-normal", (data) => data);
export const DataSelectionNormalTestFormConfig = () => {
  const { onSend } = useSendNormalTestAnalysis();
  const formik = useFormik<DeepPartial<NormalInputConfig>>({
    initialValues: {},
    validationSchema: NormalTestSchema,
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
      <CommonPaper $error={(touched[`data`] || submitCount) && errors?.data}>
        <Typography sx={{ marginY: "10px" }}>
          {strings["data-selection.choose-all-data"]}
        </Typography>
        <Input
          error={!!((touched[`data`] || submitCount) && errors?.data)}
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
              data: files?.[0],
            });
          }}
        />
      </CommonPaper>{" "}
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
