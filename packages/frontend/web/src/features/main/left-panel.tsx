import Drawer from "@mui/material/Drawer";
import { Offset } from "../../App";
import { Tab, Tabs } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { DataExtractionConfigForm } from "@/features/analysis/classifications/random-forest/data-extraction";
import { RandomForestConfigForm } from "@/features/analysis/classifications/random-forest/random-forest";
import { Strings, useTranslations } from "@/utils/translations";
import { useQuery } from "react-query";
import { api } from "@/api/index";
import { PopulationForm } from "@/features/analysis/population/population";
import { SurvivalForm } from "@/features/analysis/survival/survival";
import { MaxentConfigForm } from "@/features/analysis/classifications/maxent/maxent";
import { DataSelectionTab } from "@/features/analysis/data-selection";
import { GridVulnerabilityForm } from "@/features/analysis/vulnerability";

const TABS: {
  label: keyof Strings;
  Component: FunctionComponent;
}[] = [
  {
    label: "data-extraction.title",
    Component: DataExtractionConfigForm,
  },
  {
    label: "data-selection.title",
    Component: DataSelectionTab,
  },
  {
    label: "random-forest.title",
    Component: RandomForestConfigForm,
  },

  {
    label: "maxent.title",
    Component: MaxentConfigForm,
  },
  {
    label: "population.title",
    Component: PopulationForm,
  },
  {
    label: "survival.title",
    Component: SurvivalForm,
  },
  {
    label: "grid-vulnerability.title",
    Component: GridVulnerabilityForm,
  },
];
export const MainPageLeftPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const strings = useTranslations();
  const { data: scriptsList } = useQuery(
    "analysis-scripts",
    (opt) => api.analysis.getApiAnalysisScripts(),
    { refetchOnWindowFocus: false }
  );

  return (
    <Drawer style={{ resize: "horizontal" }} variant="permanent" anchor="left">
      <div className="data-extraction-left__container">
        <Offset />
        <Tabs
          variant={"scrollable"}
          scrollButtons={true}
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
          }}
        >
          {TABS.map(({ label }, index) => (
            <Tab key={index} label={strings[label] as string} />
          ))}
        </Tabs>
        {TABS.map(({ label, Component }, index) => (
          <div
            key={index}
            style={activeTab !== index ? { display: "none" } : undefined}
          >
            <Component />
          </div>
        ))}
      </div>
    </Drawer>
  );
};
