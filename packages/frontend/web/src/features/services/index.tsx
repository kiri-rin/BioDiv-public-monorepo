import { MapDrawingWrapper } from "@/components/map/map-edit";
import Drawer from "@mui/material/Drawer";
import React from "react";

export const ServicesScreen = () => {
  return (
    <MapDrawingWrapper>
      <Drawer
        style={{ resize: "horizontal" }}
        variant="permanent"
        anchor="left"
      ></Drawer>
    </MapDrawingWrapper>
  );
};
