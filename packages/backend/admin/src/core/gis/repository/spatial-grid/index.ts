import {
  IMapSpatialGrid,
  IMapSpatialGridCell,
} from "@rrrcn/admin/src/core/vulnerability-map/entities/spatial-grid";
import { CommonArea } from "@rrrcn/admin/src/core/common/entities/area";

export interface IGisSpatialGridRepository<IdType> {
  getSpatialGrid(gridId: IdType): Promise<IMapSpatialGrid<IdType>>;
  getSpatialGridAreaCells(
    id: IdType,
    area: CommonArea
  ): Promise<IMapSpatialGridCell<IdType>[]>;
}
