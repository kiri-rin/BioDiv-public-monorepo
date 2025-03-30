import { VulnerabilityMapAdminApiTypes } from "@rrrcn/common-types/admin/api/vulnerability-map/map-admin";
import { MapHabitatAreaServices } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/habitat-area-creation/services";
import { MapHabitatAreaVulnerabilityCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/habiat-area";
import { MapMigrationVulnerabilityCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/migrations";
import { MapMigrationsAdminServices } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/migrations-admn/services";
import { MapVulnerabilityConfigsCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/configs";
import { MapImportConfigServices } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/import-config-creation/services";
import { MapImportVulnerabilityCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/import";

export class MapContentAdminControllers {
  constructor(
    private habitatAreaService: MapHabitatAreaServices<number>,
    private habitatAreaVulnerabilityService: MapHabitatAreaVulnerabilityCalculationService<number>,
    private migrationsVulnerabilityService: MapMigrationVulnerabilityCalculationService<number>,
    private migrationsService: MapMigrationsAdminServices<number>,
    private vulnerabilityConfigsService: MapVulnerabilityConfigsCalculationService<number>,

    private importConfigServices: MapImportConfigServices<number>,
    private importVulnerabilityServices: MapImportVulnerabilityCalculationService<number>
  ) {}
  async createHabitatArea(
    body: VulnerabilityMapAdminApiTypes.CreateHabitatArea.Body
  ) {
    return await this.habitatAreaService.createHabitatArea(body);
  }
  async createImportConfig(
    body: VulnerabilityMapAdminApiTypes.CreateImportConfig.Body
  ) {
    return await this.importConfigServices.createImportConfig(body);
  }
  async createMigration(
    body: VulnerabilityMapAdminApiTypes.CreateMigration.Body
  ) {
    if (
      !body.migrationTracks ||
      !body.speciesId ||
      !body.gridId ||
      !body.tracks_count
    ) {
      throw "required fields";
    }
    return await this.migrationsService.createMigration(body);
  }
  async calculateHabitatAreaVulnerability(
    body: VulnerabilityMapAdminApiTypes.CalculateHabitatAreaVulnerability.Body
  ) {
    return await this.habitatAreaVulnerabilityService.calculateSpatialGridHabitatAreaVulnerability(
      {
        habitatAreaId: body.habitatAreaId,
        vulnerabilityConfig: body.config,
        spatialGridId: body.gridId,
      }
    );
  }
  async calculateMigrationVulnerability(
    body: VulnerabilityMapAdminApiTypes.CalculateMigrationVulnerability.Body
  ) {
    return await this.migrationsVulnerabilityService.calculateSpatialGridMigrationVulnerability(
      {
        migrationId: body.migrationId,
        vulnerabilityConfig: body.config,
        spatialGridId: body.gridId,
      }
    );
  }
  async calculateImportVulnerability(
    body: VulnerabilityMapAdminApiTypes.CalculateImportVulnerability.Body
  ) {
    return await this.importVulnerabilityServices.calculateSpatialGridImportVulnerability(
      {
        importConfigId: body.importConfigId,
        spatialGridId: body.gridId,
      }
    );
  }
  async calculateTracksVulnerabilityConfig(
    body: VulnerabilityMapAdminApiTypes.CalculateTracksVulnerabilityConfig.Body
  ) {
    return await this.vulnerabilityConfigsService.calculateTracksConfig({
      migrationTracksIds: body.migrationTracksId,
      rotor: body.rotor,
    });
  }
}
