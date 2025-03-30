import { useSelectedSpatialGridCell } from "@/components/map/right-panel/swr";
import {
  MainRightPanelComponent,
  MainRightPanelTabContainer,
  MainRightPanelTabItem,
  MainRightPanelTabs,
} from "@/components/map/right-panel/style";
import { useState } from "react";
import { useMainRightPanelContext } from "@/components/map/right-panel/context";
import { MainRightPanelVulnerabilityResult } from "@/components/map/right-panel/components/vulerability-result";
import { CircularProgress, Typography } from "@mui/material";
export enum MainRightPanelTabsTypes {
  SENSITIVE_AREAS = "SENSITIVE_AREAS",
  HABITAT_AREAS = "HABITAT_AREAS",
  SENSITIVE_SPECIES = "SENSITIVE_SPECIES",
}
export const MainRightPanel = () => {
  const { data: cell, isLoading } = useSelectedSpatialGridCell();
  const { selectedCell } = useMainRightPanelContext();

  return (
    selectedCell && (
      <MainRightPanelComponent anchor={"right"} variant={"permanent"}>
        <Typography variant={"h5"}>Vulnerabilities:</Typography>
        {isLoading && <CircularProgress />}
        {cell?.map_vulnerability_results
          ?.filter((it) => it.map_vulnereability_calculation?.publishedAt)
          .map((it, index) => (
            <MainRightPanelVulnerabilityResult
              result={it}
              index={index + 1}
              key={it.id}
            />
          ))}
      </MainRightPanelComponent>
    )
  );
};
