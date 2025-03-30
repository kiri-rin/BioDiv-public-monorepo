import { SEASONS } from "@rrrcn/common-types/services/api/migrations/generate-tracks/config";
import { IMapSpecies } from "@rrrcn/admin/src/core/vulnerability-map/entities/species";
import { GeneratedTrack } from "@rrrcn/common-types/services/api/migrations/generate-tracks/response";
import { IMapMigration } from "@rrrcn/admin/src/core/vulnerability-map/entities/migrations";
import { IMapSpatialGridCell } from "@rrrcn/admin/src/core/vulnerability-map/entities/spatial-grid";
import { MyMapSpeciesMigration } from "@rrrcn/common-types/strapi/custom-models/MapSpeciesMigration";
import * as turf from "@turf/turf";
type IdType = number;
export class StrapiMapMigration implements IMapMigration<IdType> {
  private strapiMigraion: MyMapSpeciesMigration;
  constructor(strapiMigraion: MyMapSpeciesMigration) {
    this.strapiMigraion = strapiMigraion;
  }
  get id(): IdType {
    return this.strapiMigraion.id;
  }
  get season(): SEASONS {
    return this.strapiMigraion.season as SEASONS;
  }
  get speciesId(): IdType {
    return this.strapiMigraion.species.id;
  }
  get species(): IMapSpecies<IdType> {
    return {
      id: this.strapiMigraion.species.id,
      length: this.strapiMigraion.species.length,
      name: this.strapiMigraion.species.name,
      nocturnalActivity: this.strapiMigraion.species.nocturnalActivity,
      wingspan: this.strapiMigraion.species.wingspan,
    };
  }
  get tracksCount(): number {
    return this.strapiMigraion.tracks_count;
  }
  getCellBirdDensitiesPerMonth(cell: IMapSpatialGridCell<IdType>): number[] {
    throw "not implemented";
    return [];
  }
  getCellTrackDensitiesPerMonth(cell: IMapSpatialGridCell<IdType>): number[] {
    const indexedArea =
      this.strapiMigraion.indexed_areas[
        this.strapiMigraion.meta.id_mapping[cell.id]
      ];
    const monthsTotal = indexedArea.probabilities.months.reduce(
      (a, b) => a + b,
      0
    );
    return indexedArea.probabilities.months.map((it) =>
      !monthsTotal
        ? 0
        : ((it / monthsTotal) * indexedArea.tracksCount) /
          Math.sqrt(turf.area(cell.area.polygon) / 1000000)
    );
  }
  // abstract getAreaBirdDensitiesPerMonth(area: CommonArea): number[];
  getCellFlightHeightsDistribution(
    cell: IMapSpatialGridCell<IdType>
  ): [number, number][] {
    throw "not implemented";

    return [];
  }
  getCellPercentAtRotorHeight(
    cell: IMapSpatialGridCell<IdType>,
    rotor: { start: number; end: number }
  ): number {
    const indexedArea =
      this.strapiMigraion.indexed_areas[
        this.strapiMigraion.meta.id_mapping[cell.id]
      ];
    let altitudesStatistics = indexedArea.altitudeStatistics;
    if (Object.keys(indexedArea.altitudeStatistics).length === 0) {
      altitudesStatistics =
        Object.values(indexedArea.neighboursAreasIds)
          .map((it) => this.strapiMigraion.indexed_areas[it])
          .filter((it) => it)
          .find((it) => Object.keys(it.altitudeStatistics))
          ?.altitudeStatistics || {};
    }
    return (
      Object.keys(altitudesStatistics).filter(
        (it) => Number(it) <= rotor.end && Number(it) >= rotor.start
      ).length /
      Object.values(altitudesStatistics).reduce((acc, it) => acc + it, 0)
    );
  }
  get generatedTracks(): GeneratedTrack[] {
    throw "not implemented";

    return [];
  }

  get spatialGridId(): IdType {
    return this.strapiMigraion.map_spatial_grid.id!;
  }
}
