import React from "react";

import "../analysis/classifications/random-forest/data-extraction.scss";
import { MainPageLeftPanel } from "./left-panel";
import { MapDrawingWrapper } from "@/components/map/map-edit";

export const MainScreen = () => {
  return (
    <MapDrawingWrapper>
      <MainPageLeftPanel />
    </MapDrawingWrapper>
  );
};
