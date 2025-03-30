import { useMapPageProps } from "@/components/map/context";
import { MapHabitatAreasSpeciesItem } from "./components/Item";
import React from "react";

export const MapHabitatAreaLeftPanel = () => {
  const { species } = useMapPageProps();
  return (
    <>
      {species?.map((it) => (
        <MapHabitatAreasSpeciesItem species={it} />
      ))}
    </>
  );
};
