import { Strapi } from "@strapi/strapi";
import { MapSpatialGridAdminControllers } from "@rrrcn/admin/src/core-impl/map/use-cases/spatial-grid-admin";
import { MapSpatialGridService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/spatial-grid-admin/services";
import { StrapiMapSpatialGridRepository } from "@rrrcn/admin/src/core-impl/map/repository/spatial-grid";
import { MapContentAdminControllers } from "@rrrcn/admin/src/core-impl/map/use-cases/map-content-admin";
import { MapHabitatAreaServices } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/habitat-area-creation/services";
import { StrapiMapHabitatAreasRepository } from "@rrrcn/admin/src/core-impl/map/repository/habitat-area";
import { RRRCNVulnerabilityCalculator } from "@rrrcn/admin/src/core-impl/map/entities/vulnerability-result";
import { MapHabitatAreaVulnerabilityCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/habiat-area";
import { StrapiMapVulnerabilityResultRepository } from "@rrrcn/admin/src/core-impl/map/repository/vulnerability-result";
import { StrapiMapMigrationsRepository } from "@rrrcn/admin/src/core-impl/map/repository/migrations";
import { MapMigrationVulnerabilityCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/migrations";
import { MapMigrationsAdminServices } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/migrations-admn/services";
import { MapVulnerabilityConfigsCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/configs";
import { StrapiMapImportConfigRepository } from "@rrrcn/admin/src/core-impl/map/repository/import-config";
import { MapImportConfigServices } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/import-config-creation/services";
import { MapImportVulnerabilityCalculationService } from "@rrrcn/admin/src/core/vulnerability-map/use-cases/admin/vulnerability-calculation/services/import";

export const createStrapiSpatialGridControllers = (strapi: Strapi) => {
  return new MapSpatialGridAdminControllers(
    new MapSpatialGridService(new StrapiMapSpatialGridRepository(strapi))
  );
};
export const createStrapiMapContentControllers = (strapi: Strapi) => {
  const spatialGridRepository = new StrapiMapSpatialGridRepository(strapi);

  const habitatAreaRepository = new StrapiMapHabitatAreasRepository(strapi);
  const importConfigRepository = new StrapiMapImportConfigRepository(strapi);
  const migrationsRepository = new StrapiMapMigrationsRepository(
    strapi,
    spatialGridRepository
  );
  const vulnerabilityRepository = new StrapiMapVulnerabilityResultRepository(
    strapi,
    habitatAreaRepository,
    migrationsRepository,
    importConfigRepository
  );

  return new MapContentAdminControllers(
    new MapHabitatAreaServices(spatialGridRepository, habitatAreaRepository),
    new MapHabitatAreaVulnerabilityCalculationService<number>(
      new RRRCNVulnerabilityCalculator(),
      vulnerabilityRepository,
      habitatAreaRepository,
      spatialGridRepository
    ),
    new MapMigrationVulnerabilityCalculationService<number>(
      new RRRCNVulnerabilityCalculator(),
      vulnerabilityRepository,
      migrationsRepository,
      spatialGridRepository
    ),
    new MapMigrationsAdminServices<number>(
      spatialGridRepository,
      migrationsRepository
    ),
    new MapVulnerabilityConfigsCalculationService<number>(
      migrationsRepository,
      vulnerabilityRepository
    ),
    new MapImportConfigServices(spatialGridRepository, importConfigRepository),
    new MapImportVulnerabilityCalculationService(
      vulnerabilityRepository,
      spatialGridRepository,
      importConfigRepository
    )
  );
};
