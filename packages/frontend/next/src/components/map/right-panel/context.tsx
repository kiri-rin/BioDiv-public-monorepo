import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";
import { SetStateAction } from "preact/compat";
import { MapSpatialGridCell } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGridCell";
export type MainRightPanelContextType = {
  selectedCell: MapSpatialGridCell | null;
  setSelectedCell: Dispatch<SetStateAction<SpatialGridCell | null>>;
};
export const MainRightPanelContext = createContext<MainRightPanelContextType>({
  selectedCell: null,
  setSelectedCell: () => {},
});
export const useMainRightPanelContext = () => useContext(MainRightPanelContext);
export const MainRightPanelContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [selectedCell, setSelectedCell] = useState<SpatialGridCell | null>(
    null
  );
  return (
    <MainRightPanelContext.Provider value={{ selectedCell, setSelectedCell }}>
      {children}
    </MainRightPanelContext.Provider>
  );
};
