import { useSendAnalysis } from "@/features/analysis/common/utils";
import { FormikContext, useFormik } from "formik";
import { useTranslations } from "@/utils/translations";

import { DeepPartial } from "@/utils/types";
import React from "react";
import { DataSelectionDataInput } from "@/features/analysis/data-selection/components/common/data-input";
import { Button } from "@mui/material";
import {
  TTestInputConfig,
  TTestSchema,
} from "@/features/analysis/data-selection/components/t-test/schema";

const useSendTTestAnalysis = () =>
  useSendAnalysis("data-selection-t-test", (data) => data);

export const DataSelectionTTestFormConfig = () => {
  const { onSend } = useSendTTestAnalysis();
  const formik = useFormik<DeepPartial<TTestInputConfig>>({
    initialValues: {
      data: { type: "all" },
    },
    validationSchema: TTestSchema,
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
