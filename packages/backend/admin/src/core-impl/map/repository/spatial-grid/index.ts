import {
  IMapSpatialGrid,
  IMapSpatialGridCell,
} from "@rrrcn/admin/src/core/vulnerability-map/entities/spatial-grid";
import { CommonArea } from "@rrrcn/admin/src/core/common/entities/area";
import { VulnerabilityMapAdminApiTypes } from "@rrrcn/common-types/dist/admin/api/vulnerability-map/map-admin";
import { IMapSpatialGridRepository } from "@rrrcn/admin/src/core/vulnerability-map/repository/spatial-grid";
import { Strapi } from "@strapi/strapi";
import {
  StrapiMapSpatialGrid,
  StrapiMapSpatialGridCell,
  StrapiMapSpatialGridDistrict,
} from "@rrrcn/admin/src/core-impl/map/entities/spatial-grid";
import * as turf from "@turf/turf";

export class StrapiMapSpatialGridRepository
  implements IMapSpatialGridRepository<number>
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
  async getSpatialGridDistrict(districtId: number) {
    const strapiGridDistrict = await strapi.db
      .query("api::map.map-spatial-grid-district")
      .findOne({
        where: { id: districtId },
        populate: ["map_spatial_grid"],
      });
    return new StrapiMapSpatialGridDistrict(strapiGridDistrict);
  }
  async saveSpatialGrid(grid: IMapSpatialGrid<number>) {
    const [bbox_left, bbox_bottom, bbox_right, bbox_top] = grid.area.bbox;
    const strapiGrid = await strapi.db
      .query("api::map.map-spatial-grid-district")
      .create({
        data: {
          title: grid.title,
          cellSize: grid.cellSize,
          bbox_left,
          bbox_bottom,
          bbox_right,
          bbox_top,
          polygon: grid.area.polygon,
        },
      });
  }

  async createSpatialGridCell(gridId: number, area: CommonArea) {
    const [bbox_left, bbox_bottom, bbox_right, bbox_top] = area.bbox;
    const strapiGrid = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .create({
        data: {
          spatial_grid: gridId,
          bbox_left,
          bbox_bottom,
          bbox_right,
          bbox_top,
          polygon: area.polygon,
        },
      });
  }

  async createSpatialGrid(
    params: VulnerabilityMapAdminApiTypes.CreateSpatialGrid.Body
  ) {
    const area = new CommonArea(params.area);
    const [bbox_left, bbox_bottom, bbox_right, bbox_top] = area.bbox;
    const strapiGrid = await strapi.db
      .query("api::map.map-spatial-grid")
      .create({
        data: {
          title: params.title,
          cell_size: params.cellSize,
          bbox_left,
          bbox_bottom,
          bbox_right,
          bbox_top,
          slug: params.slug,
          polygon: area.polygon,
        },
      });
    return new StrapiMapSpatialGrid(strapiGrid);
  }
  async createSpatialGridDistrict(
    params: VulnerabilityMapAdminApiTypes.CreateSpatialGridDistrict.Body
  ) {
    const area = new CommonArea(params.area);
    const [bbox_left, bbox_bottom, bbox_right, bbox_top] = area.bbox;
    const strapiDistrict = await strapi.db
      .query("api::map.map-spatial-grid-district")
      .create({
        data: {
          name: params.title,
          slug: params.slug,
          map_spatial_grid: params.gridId,
          bbox_left,
          bbox_bottom,
          bbox_right,
          bbox_top,
          polygon: area.polygon,
        },
      });
    return new StrapiMapSpatialGridDistrict(strapiDistrict);
  }

  async getSpatialGridDistrictCells(params: { districtId: number }) {
    const cells = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .findMany({
        where: { map_spatial_grid_district: { id: params.districtId } },
      });
    return cells.map((it) => new StrapiMapSpatialGridCell(it));
  }

  async getSpatialGridPublishedDistricts(params: { gridId: number }) {
    const districts = await strapi.db
      .query("api::map.map-spatial-grid-district")
      .findMany({
        where: {
          map_spatial_grid: { id: params.gridId },
          published_at: { $notNull: true },
        },
      });
    return districts.map((it) => new StrapiMapSpatialGridDistrict(it));
  }

  async getPublishedSpatialGrids() {
    const grids = await strapi.db.query("api::map.map-spatial-grid").findMany({
      where: {
        published_at: { $notNull: true },
      },
    });
    return grids.map((it) => new StrapiMapSpatialGrid(it));
  }

  async getSpatialGridCellsWithVulnerabilities(id: string) {
    throw "not implemented";
    return [];
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
  async addHabitatAreaToCell(params: {
    habitatAreaId: number;
    cellId: number;
  }) {
    await strapi.db.query("api::map.map-spatial-grid-cell").update({
      where: { id: params.cellId },
      data: {
        ["habitat_areas"]: {
          connect: [{ id: params.habitatAreaId }],
        },
      },
    });
  }
  async addDistrictToCell(params: { districtId: number; cellId: number }) {
    await strapi.db.query("api::map.map-spatial-grid-cell").update({
      where: { id: params.cellId },
      data: {
        ["map_spatial_grid_district"]: {
          connect: [{ id: params.districtId }],
        },
      },
    });
  }
  async markSpatialGridAsFulfilled(params: { gridId: number }) {
    await this.strapi.db.query("api::api::map.map-spatial-grid").update({
      where: { id: params.gridId },
      data: { fulfilled: true },
    });
  }
  async markSpatialGridDistrictAsIndexed(params: { districtId: number }) {
    await this.strapi.db.query("api::map.map-spatial-grid-district").update({
      where: { id: params.districtId },
      data: { indexed: true },
    });
  }
  async getSpatialGridImportConfigCells(
    id: number,
    importConfigId: number
  ): Promise<IMapSpatialGridCell<number>[]> {
    const strapiCells = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .findMany({
        where: {
          import_configs: { id: importConfigId },
          spatial_grid: { id },
        },
      });
    return strapiCells.map((it) => new StrapiMapSpatialGridCell(it));
  }
  async getSpatialGridHabitatAreaCells(
    id: number,
    habitatAreaId: number
  ): Promise<IMapSpatialGridCell<number>[]> {
    const strapiCells = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .findMany({
        where: {
          habitat_areas: { id: habitatAreaId },
          spatial_grid: { id },
        },
      });
    return strapiCells.map((it) => new StrapiMapSpatialGridCell(it));
  }

  async getSpatialGridMigrationCells(
    id: number,
    migrationId: number
  ): Promise<IMapSpatialGridCell<number>[]> {
    const strapiCells = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .findMany({
        where: {
          map_species_migrations: { id: migrationId },
          spatial_grid: { id },
        },
      });
    return strapiCells.map((it) => new StrapiMapSpatialGridCell(it));
  }

  async addMigrationToCell(params: { migrationId: number; cellId: number }) {
    await strapi.db.query("api::map.map-spatial-grid-cell").update({
      where: { id: params.cellId },
      data: {
        ["map_species_migrations"]: {
          connect: [{ id: params.migrationId }],
        },
      },
    });
  }

  async addImportConfigToCell(params: {
    importConfigId: number;
    cellId: number;
  }): Promise<void> {
    await strapi.db.query("api::map.map-spatial-grid-cell").update({
      where: { id: params.cellId },
      data: {
        ["import_configs"]: {
          connect: [{ id: params.importConfigId }],
        },
      },
    });
  }

  async getSpatialGridCellsByIds(params: {
    ids: number[];
  }): Promise<IMapSpatialGridCell<number>[]> {
    const strapiCells = await strapi.db
      .query("api::map.map-spatial-grid-cell")
      .findMany({
        where: {
          id: { $in: params.ids },
        },
      });
    return strapiCells.map((it) => new StrapiMapSpatialGridCell(it));
  }
}
