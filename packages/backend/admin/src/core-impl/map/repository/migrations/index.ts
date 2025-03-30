import { IMapMigration } from "@rrrcn/admin/src/core/vulnerability-map/entities/migrations";
import { IMapMigrationTrack } from "@rrrcn/admin/src/core/vulnerability-map/entities/migration-track";
import { VulnerabilityMapAdminApiTypes } from "@rrrcn/common-types/admin/api/vulnerability-map/map-admin";
import { IMapMigrationsRepository } from "@rrrcn/admin/src/core/vulnerability-map/repository/migrations";
import { Strapi } from "@strapi/strapi";
import { StrapiMapMigration } from "@rrrcn/admin/src/core-impl/map/entities/migrations";
import GeoJSON from "geojson";
import { combine, inside } from "@turf/turf";
import { featureCollection } from "@turf/helpers";
import { IMapSpatialGridRepository } from "@rrrcn/admin/src/core/vulnerability-map/repository/spatial-grid";
import { rrrcnServicesClient } from "@rrrcn/admin/src/rrrcn-services-client";
import { StrapiMapMigrationTrack } from "@rrrcn/admin/src/core-impl/map/entities/migration-track";
import { IMapSpatialGridCell } from "@rrrcn/admin/src/core/vulnerability-map/entities/spatial-grid";
import { nonBlockingCycle } from "@rrrcn/admin/src/api/map/services/map-spatial-grid-cell";
type IdType = number;
export class StrapiMapMigrationsRepository
  implements IMapMigrationsRepository<IdType>
{
  private spatialGridRepository: IMapSpatialGridRepository<IdType>;
  private strapi: Strapi;
  constructor(
    strapi: Strapi,
    spatialGridRepository: IMapSpatialGridRepository<IdType>
  ) {
    this.spatialGridRepository = spatialGridRepository;
    this.strapi = strapi;
  }

  public async getMigrationsTracks(params: {
    trackIds: number[];
  }): Promise<IMapMigrationTrack<number>[]> {
    const strapiMigrationTracks = await this.strapi.db
      .query("api::map-migration-track.map-migration-track")
      .findMany({
        where: { id: { $in: params.trackIds } },
      });
    return strapiMigrationTracks.map((it) => {
      return new StrapiMapMigrationTrack(it);
    });
  }
  public async getMigration(id: IdType): Promise<IMapMigration<IdType>> {
    const strapiMigration = await this.strapi.db
      .query("api::map.map-species-migration")
      .findOne({
        where: { id },
        populate: ["map_spatial_grid", "map_migration_tracks", "species"],
      });
    return new StrapiMapMigration(strapiMigration);
  }
  public async createMigration(
    params: VulnerabilityMapAdminApiTypes.CreateMigration.Body
  ): Promise<IMapMigration<IdType>> {
    const strapiMigration = await this.strapi.db
      .query("api::map.map-species-migration")
      .create({
        data: {
          map_migration_tracks: params.migrationTracks,
          season: params.season,
          tracks_count: params.tracks_count,
          map_spatial_grid: params.gridId,
          species: params.speciesId,
        },
        populate: ["map_spatial_grid", "map_migration_tracks"],
      });
    return new StrapiMapMigration(strapiMigration);
  }
  public async getMigrationsBySpatialGridCell(params: {
    cellId: IdType;
  }): Promise<IMapMigration<IdType>[]> {
    return Promise.resolve([]);
  }
  public async getMigrationsBySpatialGrid(params: {
    gridId: IdType;
  }): Promise<IMapMigration<IdType>[]> {
    return Promise.resolve([]);
  }
  public async getMigrationsTracksByMigration(params: {
    migrationId: IdType;
  }): Promise<IMapMigrationTrack<IdType>[]> {
    const strapiMigration = await this.strapi.db
      .query("api::map.map-species-migration")
      .findOne({
        where: { id: params.migrationId },
        populate: ["species"],
      });
    const strapiMigrationTracks = await this.strapi.db
      .query("api::map-migration-track.map-migration-track")
      .findMany({
        where: { map_species_migrations: params.migrationId },
      });
    return strapiMigrationTracks.map((it) => {
      it.species = strapiMigration.species;
      return new StrapiMapMigrationTrack(it);
    });
  }
  public async markMigrationIndexed(params: {
    migrationId: IdType;
    cells: IMapSpatialGridCell<number>[];
  }): Promise<void> {
    const migration = await this.getMigration(params.migrationId);
    const cells = params.cells;
    const migrationTracks = await this.getMigrationsTracksByMigration({
      migrationId: params.migrationId,
    });
    const allCells: GeoJSON.Feature<GeoJSON.MultiPolygon> = combine(
      featureCollection(cells.map((it) => it.area.polygon))
    ).features.find(
      (it) => it.geometry.type === "MultiPolygon"
    ) as GeoJSON.Feature<GeoJSON.MultiPolygon>;
    const filteredTracks = migrationTracks
      .map((track) => {
        const filteredTrack = track.track.features.filter((it) =>
          inside(it, allCells)
        );
        return featureCollection(filteredTrack);
      })
      .filter((it) => it.features.length);
    const { grid, indexedAreas, generatedTracks } =
      await rrrcnServicesClient.generateMigrationTracks({
        initCount: migration.tracksCount,
        migrations: filteredTracks,
        grid: featureCollection(
          cells
            .filter((it) => it.area.polygon)
            .map((it) => it.area.polygon as GeoJSON.Feature<GeoJSON.Polygon>)
        ),
      });
    const id_mapping = cells.reduce((acc, it, index) => {
      acc[it.id] = index;
      return acc;
    }, {});
    const finalCells = cells.filter((it) => indexedAreas[id_mapping[it.id]]);
    nonBlockingCycle(finalCells, async (cell, i) => {
      await this.spatialGridRepository.addMigrationToCell({
        cellId: cell.id,
        migrationId: params.migrationId,
      });
      if (i === finalCells.length - 1) {
        const strapiMigration = await this.strapi.entityService.update(
          "api::map.map-species-migration",
          params.migrationId,
          {
            data: {
              indexed_areas: indexedAreas,
              generated_tracks: generatedTracks,
              clipped_tracks: filteredTracks,
              meta: {
                id_mapping,
              },
            },
          }
        );
        return new StrapiMapMigration(strapiMigration);
      }
    });
  }
  public async getMigrationsTracksBySpatialGrid(params: {
    gridId: IdType;
  }): Promise<IMapMigrationTrack<IdType>[]> {
    throw "not implemented";

    return Promise.resolve([]);
  }
  public async getMigrationsTrack(params: {
    trackId: IdType;
  }): Promise<IMapMigrationTrack<IdType>> {
    throw "not implemented";
    return {} as IMapMigrationTrack<IdType>;
  }
}
