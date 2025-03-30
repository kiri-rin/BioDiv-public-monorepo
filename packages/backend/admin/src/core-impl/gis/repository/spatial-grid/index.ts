import { CommonArea } from "@rrrcn/admin/src/core/common/entities/area";
import { Strapi } from "@strapi/strapi";
import {
  StrapiMapSpatialGrid,
  StrapiMapSpatialGridCell,
} from "@rrrcn/admin/src/core-impl/map/entities/spatial-grid";
import * as turf from "@turf/turf";
import { IGisSpatialGridRepository } from "@rrrcn/admin/src/core/gis/repository/spatial-grid";

export class StrapiGisSpatialGridRepository
  implements IGisSpatialGridRepository<number>
{
  private strapi: Strapi;
  constructor(strapi: Strapi) {
    this.strapi = strapi;
  }
  async getSpatialGrid(gridId: number) {
    const strapiGrid = await strapi.db
      .query("api::map.map-spatial-grid")
      .findOne({
        where: { id: gridId },
      });
    return new StrapiMapSpatialGrid(strapiGrid);
  }

  async getSpatialGridAreaCells(id: number, area: CommonArea) {
    const [bbox_left, bbox_bottom, bbox_right, bbox_top] = area.bbox;
    const possibleCells = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .findMany({
        where: {
          $and: [
            {
              spatial_grid: id,
            },
            {
              $not: {
                $or: [
                  {
                    bbox_left: {
                      $gte: bbox_right,
                    },
                  },
                  {
                    bbox_right: {
                      $lte: bbox_left,
                    },
                  },
                  {
                    bbox_bottom: {
                      $gte: bbox_top,
                    },
                  },
                  {
                    bbox_top: {
                      $lte: bbox_bottom,
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    return possibleCells
      .filter((it) =>
        turf.intersect(it.polygon.geometry, area.polygon.geometry)
      )
      .map((it) => new StrapiMapSpatialGridCell(it));
  }
}
