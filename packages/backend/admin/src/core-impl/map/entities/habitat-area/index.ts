import GeoJSON from "geojson";
import { CommonArea } from "@rrrcn/admin/src/core/common/entities/area";
import { IMapHabitatArea } from "@rrrcn/admin/src/core/vulnerability-map/entities/habitat-area";
import { featureCollection } from "@turf/helpers";
import { IMapSpecies } from "@rrrcn/admin/src/core/vulnerability-map/entities/species";
import * as turf from "@turf/turf";
import { MapHabitatArea } from "@rrrcn/common-types/strapi/custom-models/MapHabitatArea";

export class StrapiMapHabitatArea implements IMapHabitatArea<number> {
  private strapiHabitatArea: MapHabitatArea;
  private points: GeoJSON.FeatureCollection<GeoJSON.Point>;
  private _area: CommonArea;
  get presence_points() {
    return this.points;
  }
  constructor(strapiHabitatArea: MapHabitatArea) {
    this.strapiHabitatArea = strapiHabitatArea;
    const points = this.strapiHabitatArea.points as
      | GeoJSON.FeatureCollection<GeoJSON.Point>
      | undefined;
    this.points = featureCollection(points.features);
    this._area = new CommonArea(
      strapiHabitatArea.polygon as GeoJSON.Feature<
        GeoJSON.Polygon | GeoJSON.MultiPolygon
      >
    );
  }

  get birds_count() {
    return this.strapiHabitatArea.points_count || this.points.features.length; //TODO correct birds count
  }

  getAreaBirdDensitiesPerMonth(area: GeoJSON.Polygon | GeoJSON.MultiPolygon) {
    const fraction =
      turf.area(turf.intersect(this._area.polygon, area)) / turf.area(area);
    return this.strapiHabitatArea.months_densities.map(
      (it) => (fraction * it) / (turf.area(this._area.polygon) / (1000 * 1000))
    );
  }

  get speciesId() {
    return this.strapiHabitatArea.species.id;
  }
  get area() {
    return this._area;
  }
  get id() {
    return this.strapiHabitatArea.id;
  }
  get spatialGridId() {
    return this.strapiHabitatArea.map_spatial_grid.id;
  }
  get isIndexed() {
    return false;
  }

  get species(): IMapSpecies<number> {
    return {
      id: this.strapiHabitatArea.species.id,
      length: this.strapiHabitatArea.species.length,
      name: this.strapiHabitatArea.species.name,
      nocturnalActivity: this.strapiHabitatArea.species.nocturnalActivity,
      wingspan: this.strapiHabitatArea.species.wingspan,
    };
  }
}
