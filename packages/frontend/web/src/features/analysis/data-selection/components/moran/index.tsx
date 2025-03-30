import { useSendAnalysis } from "@/features/analysis/common/utils";
import { FormikContext, useFormik } from "formik";
import { useTranslations } from "@/utils/translations";

import React from "react";
import { Button, Typography } from "@mui/material";
import { CommonPaper } from "@/components/common/common";
import {
  MoranInputConfig,
  MoranTestSchema,
} from "@/features/analysis/data-selection/components/moran/schema";
import { GeometryInput } from "@/components/geometry-inputs/geometry-input";

const useSendNormalTestAnalysis = () =>
  useSendAnalysis("data-selection-moran", (data) => data);

export const DataSelectionMoranTestFormConfig = () => {
  const { onSend } = useSendNormalTestAnalysis();
  const formik = useFormik<MoranInputConfig>({
    initialValues: {
      areas: { type: "shp", path: undefined },
      points: { type: "shp", path: undefined },
    },
    validationSchema: MoranTestSchema,
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
  console.log({ errors });
  const strings = useTranslations();
  return (
    <FormikContext.Provider value={formik}>
      <CommonPaper
        $error={!!((touched[`points`] || submitCount) && errors?.points)}
      >
        <Typography sx={{ marginY: "10px" }}>
          {strings["data-selection.moran.points"]}
        </Typography>
        <GeometryInput
          error={!!((touched[`points`] || submitCount) && errors?.points)}
          available={["geojson", "geojson_file", "shp"]}
          value={config.points}
          type={"marker" as google.maps.drawing.OverlayType.MARKER}
          onChange={(value) => setConfig({ ...config, points: value })}
        />
      </CommonPaper>
      <CommonPaper
        $error={!!((touched[`areas`] || submitCount) && errors?.areas)}
      >
        <Typography sx={{ marginY: "10px" }}>
          {strings["data-selection.moran.areas"]}
        </Typography>
        <GeometryInput
          error={!!((touched[`areas`] || submitCount) && errors?.areas)}
          available={["geojson", "geojson_file", "shp"]}
          type={"polygon" as google.maps.drawing.OverlayType.POLYGON}
          value={config.areas}
          onChange={(value) => setConfig({ ...config, areas: value })}
        />
      </CommonPaper>
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
