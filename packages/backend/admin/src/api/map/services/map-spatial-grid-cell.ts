/**
 * map-spatial-grid-cell service
 */
import * as turf from "@turf/turf";
import squareGridStream from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/spatial-grid-admin/services/stream-grid";

import { factories } from "@strapi/strapi";
import { EntityWithPolygon } from "../../../utils/validations/polygon-with-bbox";
import { setImmediate } from "timers";

export default factories.createCoreService(
  "api::map.map-spatial-grid-cell",
  ({ strapi }) => ({
    async createGridCells({ polygon, gridId, cell_size }) {
      const _polygon = polygon;
      const bbox = turf.bbox(_polygon);
      squareGridStream(bbox, cell_size, { mask: _polygon })
        .then(async (stream) => {
          let next;
          // @ts-ignore
          while (!(next = stream.next()).done) {
            const cell = next.value;
            if (cell) {
              const cellBbox = turf.bbox(cell);
              await strapi.service("api::map.map-spatial-grid-cell").create({
                data: {
                  bbox_left: cellBbox[0],
                  bbox_bottom: cellBbox[1],
                  bbox_right: cellBbox[2],
                  bbox_top: cellBbox[3],
                  polygon: cell,
                  spatial_grid: gridId,
                },
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getCellsInsidePolygon(
      entity: EntityWithPolygon,
      spatialGridId: string
    ) {
      const possibleCells = await strapi.db
        .query("api::map.map-spatial-grid-cell")
        .findMany({
          where: {
            $and: [
              {
                spatial_grid: spatialGridId,
              },
              {
                $not: {
                  $or: [
                    {
                      bbox_left: {
                        $gte: entity.bbox_right,
                      },
                    },
                    {
                      bbox_right: {
                        $lte: entity.bbox_left,
                      },
                    },
                    {
                      bbox_bottom: {
                        $gte: entity.bbox_top,
                      },
                    },
                    {
                      bbox_top: {
                        $lte: entity.bbox_bottom,
                      },
                    },
                  ],
                },
              },
            ],
          },
        });
      return possibleCells.filter((it) =>
        turf.intersect(it.polygon, entity.polygon)
      );
    },
    async updateAreaCells({
      spatialGridId,
      entityWithPolygon,
      fieldKey,
      recalc,
      onSuccess,
    }: {
      spatialGridId: string;
      entityWithPolygon: EntityWithPolygon & { id: number };
      fieldKey: string;
      recalc?: boolean;
      onSuccess: () => {};
    }) {
      //TODO refactor
      return strapi
        .service("api::map.map-spatial-grid-cell")
        .getCellsInsidePolygon(entityWithPolygon, spatialGridId)
        .then(async (cells) => {
          nonBlockingCycle<any>(cells, async (cell, index) => {
            !cell
              ? Promise.resolve()
              : strapi.db.query("api::map.map-spatial-grid-cell").update({
                  where: { id: cell.id },
                  data: {
                    [fieldKey]: { connect: [{ id: entityWithPolygon.id }] },
                  },
                });
            if (index === cells.length - 1) {
              onSuccess();
            }
          });
        });
    },
  })
);
export const nonBlockingCycle = <ItemType>(
  //TODO generalize logic for generators
  items: ItemType[],
  callback: (item: ItemType, index: number) => Promise<any>,
  i = 0
) => {
  setImmediate(() =>
    callback(items[i], i).then(() => {
      if (i < items.length - 1) {
        nonBlockingCycle(items, callback, i + 1);
      }
    })
  );
};

export const nonBlockingGenerator = <ItemType>(
  //TODO generalize logic for generators
  generator: AsyncGenerator<ItemType, ItemType>,
  callback: (item: ItemType) => Promise<any>,
  i = 0
) => {
  setImmediate(async () => {
    const value = await generator.next();
    callback(value.value).then(() => {
      if (!value.done) {
        nonBlockingGenerator(generator, callback, i + 1);
      }
    });
  });
};
