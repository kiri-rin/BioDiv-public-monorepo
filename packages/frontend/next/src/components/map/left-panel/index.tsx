import { useTranslations } from "@/utils/translations";
import React, { useState } from "react";
import { SensitiveAreasComponent } from "@/components/map/vulnerability/components/SensitiveAreas";
import { Tab, Tabs } from "@mui/material";
import { MapVulnerabilityLeftPanel } from "@/components/map/vulnerability";
import { MapHabitatAreaLeftPanel } from "@/components/map/habitat-areas";
import { MapBirdTracks } from "@/components/map/tracks";
import { CommonTabContainer } from "@/components/common/Tabs/style";
import { MapCalculationItem } from "@/components/map/calculations/components/Item";
import { MapVulnerabilityCalculations } from "@/components/map/calculations";

export enum MainMapTabs {
  VULNERABILITY,
  HABITAT_AREAS,
  CALCULATIONS,
}

export const MapMainLeftPanel = () => {
  const t = useTranslations();
  const [selectedTab, setSelectedTab] = useState<MainMapTabs>(
    MainMapTabs.VULNERABILITY
  );
  return (
    <>
      <SensitiveAreasComponent />

      <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)}>
        <Tab
          id={String(MainMapTabs.VULNERABILITY)}
          label={t["map.vulnerability-title"]}
        />
        <Tab
          id={String(MainMapTabs.HABITAT_AREAS)}
          label={t["map.habitat-areas-title"]}
        />
        <Tab
          id={String(MainMapTabs.CALCULATIONS)}
          label={t["map.calculations-title"]}
        />
      </Tabs>
      <CommonTabContainer hidden={selectedTab !== MainMapTabs.VULNERABILITY}>
        <MapVulnerabilityLeftPanel />
      </CommonTabContainer>
      <CommonTabContainer hidden={selectedTab !== MainMapTabs.HABITAT_AREAS}>
        <MapHabitatAreaLeftPanel />
      </CommonTabContainer>
      <CommonTabContainer hidden={selectedTab !== MainMapTabs.CALCULATIONS}>
        <MapVulnerabilityCalculations />
      </CommonTabContainer>
    </>
  );
};
