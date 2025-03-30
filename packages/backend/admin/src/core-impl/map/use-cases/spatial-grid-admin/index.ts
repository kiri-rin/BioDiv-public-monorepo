import { VulnerabilityMapAdminApiTypes } from "@rrrcn/common-types/admin/api/vulnerability-map/map-admin";
import { MapSpatialGridService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/spatial-grid-admin/services";

export class MapSpatialGridAdminControllers {
  private spatialGridService: MapSpatialGridService<number>;
  constructor(spatialGridService: MapSpatialGridService<number>) {
    this.spatialGridService = spatialGridService;
  }
  async createSpatialGrid(
    body: VulnerabilityMapAdminApiTypes.CreateSpatialGrid.Body
  ) {
    return await this.spatialGridService.createSpatialGrid(body);
  }
  async createSpatialGridDistrict(
    body: VulnerabilityMapAdminApiTypes.CreateSpatialGridDistrict.Body
  ) {
    if (!body.area || !body.gridId) {
      throw "Requred fields";
    }
    return await this.spatialGridService.createSpatialGridDistrict(body);
  }
}
