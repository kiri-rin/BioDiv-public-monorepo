import { createContext } from "react";

export type MapAreaContextType = {
  map: google.maps.Map | null;
};
export const MapAreaContext = createContext({ map: null, mapCells: [] });
