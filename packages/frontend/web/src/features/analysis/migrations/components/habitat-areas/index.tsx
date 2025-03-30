import { useCallback, useState } from "react";
import { GeometryInputConfig } from "@/components/geometry-inputs/geometry-input";
import { GoogleMapObject } from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { MigrationHabitatAreasAddButton } from "./style";
import { useTranslations } from "@/utils/translations";
import { MigrationsHabitatAreaItem } from "@/features/analysis/migrations/components/habitat-areas/item";
type MigrationHabitatAreaStateType = {
  geometryConfig: GeometryInputConfig;
  mapObject: GoogleMapObject;
};

export const MigrationsHabitatAreas = () => {
  const translations = useTranslations();

  const [areas, setAreas] = useState<GeometryInputConfig[]>([]);
  const onAreaChange = useCallback(
    (newArea: GeometryInputConfig, index: number) => {
      setAreas((prevAreas) => {
        prevAreas[index] = newArea;
        return [...prevAreas];
      });
    },
    []
  );
  const onAreaAdd = useCallback(() => {
    setAreas((prevAreas) => {
      return [...prevAreas, { type: "shp", path: undefined }];
    });
  }, []);
  return (
    <>
      {areas.map((it, index) => (
        <MigrationsHabitatAreaItem
          area={it}
          onChange={(geom) => onAreaChange(geom, index)}
        />
      ))}
      <MigrationHabitatAreasAddButton onClick={onAreaAdd}>
        {translations["migrations.add-habitat-areas"]}
      </MigrationHabitatAreasAddButton>
    </>
  );
};
