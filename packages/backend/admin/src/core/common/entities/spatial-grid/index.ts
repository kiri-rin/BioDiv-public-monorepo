import {
  CommonArea,
  CommonEntityWithArea,
} from "@rrrcn/admin/src/core/common/entities/area";
import * as turf from "@turf/turf";
import squareGridStream from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/spatial-grid-admin/services/stream-grid";

export abstract class ICommonSpatialGrid implements CommonEntityWithArea {
  static async generateAreaCells(
    area: CommonArea,
    cell_size: number
  ): Promise<Generator<any, any, unknown>> {
    const _polygon = area.polygon.geometry;
    const bbox = turf.bbox(_polygon);
    return await squareGridStream(bbox, cell_size, { offset: 10 });
  }
  abstract get area(): CommonArea;
  abstract get cellSize(): number;
}

export abstract class ICommonSpatialGridCell implements CommonEntityWithArea {
  abstract get area(): CommonArea;
}
