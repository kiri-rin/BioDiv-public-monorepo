import { IMapImportConfig } from "@rrrcn/admin/src/core/vulnerability-map/entities/import";
import { CommonVulnerabilityConfig } from "@rrrcn/common-types/common/vulnerability-config";
import { AreaVulnerabilityControllerResponse } from "@rrrcn/common-types/services/api/vulnerability/overall/configs";
import { IMapSpatialGridCell } from "@rrrcn/admin/src/core/vulnerability-map/entities/spatial-grid";
import { CustomMapImportConfig } from "@rrrcn/common-types/strapi/custom-models/MapImportConfig";

export class StrapiMapImportConfig implements IMapImportConfig<number> {
  private strapiImportConfig: CustomMapImportConfig;
  private cellsMap: Map<
    number,
    {
      config: CommonVulnerabilityConfig;
      vulnerability: AreaVulnerabilityControllerResponse;
    }
  >;

  constructor(strapiImportConfig: CustomMapImportConfig) {
    this.cellsMap = new Map();
    this.strapiImportConfig = strapiImportConfig;
    strapiImportConfig.data.forEach(({ config, vulnerability, cellId }) => {
      this.cellsMap.set(cellId, { config, vulnerability });
    });
  }
  getCellIds() {
    return Array.from(this.cellsMap.keys());
  }
  getCellConfig(cell: IMapSpatialGridCell<number>): CommonVulnerabilityConfig {
    const config = this.cellsMap.get(cell.id);
    if (!config) {
      throw new Error("Cell not found");
    }
    return config.config;
  }
  getCellVulnerability(
    cell: IMapSpatialGridCell<number>
  ): AreaVulnerabilityControllerResponse {
    const config = this.cellsMap.get(cell.id);
    if (!config) {
      throw new Error("Cell not found");
    }
    return config.vulnerability;
  }
  //
  // get speciesId() {
  //   // return this.strapiImportConfig.species.id;
  //   throw "not implemented";
  // }

  get id() {
    return this.strapiImportConfig.id;
  }
  get spatialGridId() {
    return this.strapiImportConfig.map_spatial_grid.id;
  }
  get isIndexed() {
    return false;
  }
  //
  // get species(): IMapSpecies<number> {
  //   return {
  //     id: this.strapiImportConfig.species.id,
  //     length: this.strapiImportConfig.species.length,
  //     name: this.strapiImportConfig.species.name,
  //     nocturnalActivity: this.strapiImportConfig.species.nocturnalActivity,
  //     wingspan: this.strapiImportConfig.species.wingspan,
  //   };
  // }
}
