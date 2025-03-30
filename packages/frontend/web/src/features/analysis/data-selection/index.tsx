import React, { useState } from "react";
import { DataSelectionCorrelationFormConfig } from "@/features/analysis/data-selection/components/correlation";
import { CommonPaper } from "@/components/common/common";
import { MenuItem, Select } from "@mui/material";
import { useTranslations } from "@/utils/translations";
import { DataSelectionNormalTestFormConfig } from "@/features/analysis/data-selection/components/normal";
import { DataSelectionMoranTestFormConfig } from "@/features/analysis/data-selection/components/moran";
import { DataSelectionTTestFormConfig } from "@/features/analysis/data-selection/components/t-test";

type DataSelectionTypes = "correlation" | "normal" | "ttest" | "moran";
export const DataSelectionTab = () => {
  const strings = useTranslations();
  const [selected, setSelected] = useState<DataSelectionTypes>("correlation"); //TODO default ttest? or normal
  return (
    <>
      <CommonPaper>
        <Select
          onClick={(e) => e.stopPropagation()}
          size={"small"}
          value={selected}
          onChange={({ target: { value } }) =>
            setSelected(value as DataSelectionTypes)
          }
        >
          <MenuItem value={"normal"}>
            {strings["data-selection.select.normal-test"]}
          </MenuItem>
          <MenuItem value={"ttest"}>
            {strings["data-selection.select.t-test"]}
          </MenuItem>
          <MenuItem value={"correlation"}>
            {strings["data-selection.select.correlation"]}
          </MenuItem>
          <MenuItem value={"moran"}>
            {strings["data-selection.select.moran-test"]}
          </MenuItem>
        </Select>
      </CommonPaper>
      <div style={selected === "normal" ? {} : { display: "none" }}>
        <DataSelectionNormalTestFormConfig />
      </div>

      <div style={selected === "ttest" ? {} : { display: "none" }}>
        <DataSelectionTTestFormConfig />
      </div>
      <div style={selected === "correlation" ? {} : { display: "none" }}>
        <DataSelectionCorrelationFormConfig />
      </div>
      <div style={selected === "moran" ? {} : { display: "none" }}>
        <DataSelectionMoranTestFormConfig />
      </div>
    </>
  );
};
