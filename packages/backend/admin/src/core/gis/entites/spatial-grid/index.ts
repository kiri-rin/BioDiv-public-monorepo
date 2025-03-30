import {
  CommonArea,
  CommonEntityWithArea,
} from "@rrrcn/admin/src/core/common/entities/area";
import * as turf from "@turf/turf";
import squareGridStream from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/spatial-grid-admin/services/stream-grid";
import { CommonWithId } from "@rrrcn/admin/src/core/common/entities/withId";
import {
  ICommonSpatialGrid,
  ICommonSpatialGridCell,
} from "@rrrcn/admin/src/core/common/entities/spatial-grid";

export abstract class IGisSpatialGrid<IdType>
  extends ICommonSpatialGrid
  implements CommonEntityWithArea, CommonWithId<IdType>
{
  static async generateAreaCells(
    area: CommonArea,
    cell_size: number
  ): Promise<Generator<any, any, unknown>> {
    const _polygon = area.polygon.geometry;
    const bbox = turf.bbox(_polygon);
    return await squareGridStream(bbox, cell_size, { offset: 10 });
  }
  abstract get area(): CommonArea;
  abstract get id(): IdType;
  abstract get title(): string;
  abstract get cellSize(): number;
  abstract get isFulfilled(): boolean;
}

export abstract class IGisSpatialGridCell<IdType>
  extends ICommonSpatialGridCell
  implements CommonEntityWithArea, CommonWithId<IdType>
{
  abstract get area(): CommonArea;
  abstract get id(): IdType;
}
