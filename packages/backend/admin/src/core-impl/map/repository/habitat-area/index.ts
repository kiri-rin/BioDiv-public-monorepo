import { VulnerabilityMapAdminApiTypes } from "@rrrcn/common-types/admin/api/vulnerability-map/map-admin";
import { IMapHabitatAreasRepository } from "@rrrcn/admin/src/core/vulnerability-map/repository/habitat-areas";
import { Strapi } from "@strapi/strapi";
import { StrapiMapHabitatArea } from "@rrrcn/admin/src/core-impl/map/entities/habitat-area";
import { CommonArea } from "@rrrcn/admin/src/core/common/entities/area";

export class StrapiMapHabitatAreasRepository
  implements IMapHabitatAreasRepository<number>
{
  private strapi: Strapi;
  constructor(strapi: Strapi) {
    this.strapi = strapi;
  }
  async getHabitatArea(id: number) {
    const strapiArea = await this.strapi.db
      .query("api::map.map-habitat-area")
      .findOne({ where: { id }, populate: ["map_spatial_grid", "species"] });
    return new StrapiMapHabitatArea(strapiArea);
  }

  async createHabitatArea(
    params: VulnerabilityMapAdminApiTypes.CreateHabitatArea.Body
  ) {
    const [bbox_left, bbox_bottom, bbox_right, bbox_top] = new CommonArea(
      params.area
    ).bbox;
    const strapiArea = await this.strapi.db
      .query("api::map.map-habitat-area")
      .create({
        data: {
          map_spatial_grid: params.gridId,
          polygon: params.area,
          species: params.speciesId,
          points: params.points,
          points_count: params.points_count,
          bbox_left,
          bbox_bottom,
          bbox_right,
          bbox_top,
        },
        populate: ["map_spatial_grid", "species"],
      });
    return new StrapiMapHabitatArea(strapiArea);
  }
  async getHabitatAreasBySpatialGridCell(params: { cellId: number }) {
    const strapiAreas = await this.strapi.db
      .query("api::map.map-habitat-area")
      .findMany({
        where: { map_spatial_grid_cells: params.cellId },
        populate: ["map_spatial_grid", "species"],
      });
    return strapiAreas.map((it) => new StrapiMapHabitatArea(it));
  }
  async getHabitatAreasBySpatialGrid(params: { gridId: number }) {
    const strapiAreas = await this.strapi.db
      .query("api::map.map-habitat-area")
      .findMany({
        where: { map_spatial_grid: params.gridId },
        populate: ["map_spatial_grid", "species"],
      });
    return strapiAreas.map((it) => new StrapiMapHabitatArea(it));
  }
  async markHabitatAreaIndexed(id: number) {
    const strapiArea = await this.strapi.db
      .query("api::map.map-habitat-area")
      .update({
        where: { id },
        data: { indexed: true },
        populate: ["map_spatial_grid", "species"],
      });
    return new StrapiMapHabitatArea(strapiArea);
  }
}
