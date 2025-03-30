import { VulnerabilityMapAdminApiTypes } from "@rrrcn/common-types/admin/api/vulnerability-map/map-admin";
import { IMapImportConfigRepository } from "@rrrcn/admin/src/core/vulnerability-map/repository/import-config";
import { Strapi } from "@strapi/strapi";
import { StrapiMapImportConfig } from "@rrrcn/admin/src/core-impl/map/entities/import-config";
import { IMapImportConfig } from "@rrrcn/admin/src/core/vulnerability-map/entities/import";
type IdType = number;
export class StrapiMapImportConfigRepository
  implements IMapImportConfigRepository<IdType>
{
  private strapi: Strapi;
  constructor(strapi: Strapi) {
    this.strapi = strapi;
  }
  async getImportConfig(id: IdType): Promise<IMapImportConfig<IdType>> {
    const strapiImportConfig = await this.strapi.db
      .query("api::map.map-import-config")
      .findOne({ where: { id }, populate: ["map_spatial_grid", "species"] });
    return new StrapiMapImportConfig(strapiImportConfig);
  }

  async createImportConfig(
    params: VulnerabilityMapAdminApiTypes.CreateImportConfig.Body
  ): Promise<IMapImportConfig<IdType>> {
    const strapiImportConfig = await this.strapi.db
      .query("api::map.map-import-config")
      .create({
        data: {
          map_spatial_grid: params.gridId,
          species: params.speciesId,
          data: params.data,
        },
        populate: ["map_spatial_grid", "species"],
      });
    return new StrapiMapImportConfig(strapiImportConfig);
  }

  async markImportConfigIndexed(id: IdType): Promise<IMapImportConfig<IdType>> {
    const strapiImportConfig = await this.strapi.db
      .query("api::map.map-import-config")
      .update({
        where: { id },
        data: { indexed: true },
        populate: ["map_spatial_grid", "species"],
      });
    return new StrapiMapImportConfig(strapiImportConfig);
  }
}
