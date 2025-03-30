import {
  createStrapiMapContentControllers,
  createStrapiSpatialGridControllers,
} from "@rrrcn/admin/src/core-impl";

module.exports = (plugin) => {
  const spatialGridControllers = createStrapiSpatialGridControllers(strapi);
  const mapContentControllers = createStrapiMapContentControllers(strapi);
  const origCreate = plugin.controllers["collection-types"].create;
  plugin.controllers["collection-types"].create = async (ctx) => {
    const { model } = ctx.params;
    if (model === "api::map.map-spatial-grid") {
      const created = await spatialGridControllers.createSpatialGrid({
        area: ctx.request.body.polygon,
        cellSize: ctx.request.body.cell_size,
        title: ctx.request.body.title,
        slug: ctx.request.body.slug,
      });
      ctx.params.id = created.id;
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    if (model === "api::map.map-spatial-grid-district") {
      const created = await spatialGridControllers.createSpatialGridDistrict({
        area: ctx.request.body.polygon,
        gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
        title: ctx.request.body.name,
        slug: ctx.request.body.slug,
      });
      ctx.params.id = created.id;
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    if (
      model ===
      "api::map-vulnerability-tracks-config-calculation.map-vulnerability-tracks-config-calculation"
    ) {
      const created =
        await mapContentControllers.calculateTracksVulnerabilityConfig({
          migrationTracksId: ctx.request.body.map_migration_tracks.connect.map(
            (it) => it.id
          ),
          rotor: ctx.request.body.calculated?.rotor,
        });
      ctx.params.id = created.id;
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    if (model === "api::map.map-habitat-area") {
      const created = await mapContentControllers.createHabitatArea({
        area: ctx.request.body.polygon,
        gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
        points: ctx.request.body.points,
        speciesId: ctx.request.body.species.connect?.[0]?.id,
        points_count: ctx.request.body.points_count,
      });
      ctx.params.id = created.id;
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    if (model === "api::map.map-import-config") {
      const created = await mapContentControllers.createImportConfig({
        data: ctx.request.body.data,
        gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
        speciesId: ctx.request.body.species.connect?.[0]?.id,
      });
      ctx.params.id = created.id;
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    if (model === "api::map.map-species-migration") {
      const created = await mapContentControllers.createMigration({
        season: ctx.request.body.season,
        migrationTracks: ctx.request.body.map_migration_tracks.connect?.map(
          (it) => it.id
        ),
        tracks_count: ctx.request.body.tracks_count,
        gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
        speciesId: ctx.request.body.species.connect?.[0]?.id,
      });
      ctx.params.id = created.id;
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    if (model === "api::map.map-vulnereability-calculation") {
      switch (ctx.request.body.type) {
        case "habitat_area": {
          console.log("calc");
          const created =
            await mapContentControllers.calculateHabitatAreaVulnerability({
              gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
              habitatAreaId: ctx.request.body.map_habitat_area.connect?.[0]?.id,
              config: ctx.request.body.vulnerability_configs,
            });
          ctx.params.id = created.id;
          break;
        }
        case "migration": {
          const created =
            await mapContentControllers.calculateMigrationVulnerability({
              gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
              migrationId:
                ctx.request.body.map_species_migration.connect?.[0]?.id,
              config: ctx.request.body.vulnerability_configs,
            });
          ctx.params.id = created.id;
          break;
        }
        case "import": {
          const created =
            await mapContentControllers.calculateImportVulnerability({
              gridId: ctx.request.body.map_spatial_grid.connect?.[0]?.id,
              importConfigId:
                ctx.request.body.map_import_config.connect?.[0]?.id,
            });
          ctx.params.id = created.id;
          break;
        }
        default: {
          throw "not implemented";
        }
      }
      return plugin.controllers["collection-types"].findOne(ctx);
    }
    return origCreate(ctx);
  };
  return plugin;
};
