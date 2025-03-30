import "../modules";
import { ClassificationApi } from "@rrrcn/common-types/services/api/classifications";
import { randomForest } from "@rrrcn/services/src/controllers/classifications/random-forest/random-forest";
import { maxent } from "@rrrcn/services/src/controllers/classifications/maxent/maxent";
import { estimatePopulationRandomGeneration } from "@rrrcn/services/src/controllers/population-estimation/estimate-population-random-points";
import { PopulationEstimationApi } from "@rrrcn/common-types/services/api/population-estimation";
import { estimatePopulationDistance } from "@rrrcn/services/src/controllers/population-estimation/estimate-population-distance";
import { estimatePopulationDensity } from "@rrrcn/services/src/controllers/population-estimation/estimate-population-density";
import { estimateNestSurvival } from "@rrrcn/services/src/controllers/survival/survival-nest-mark";
import { ServicesSurvivalApi } from "@rrrcn/common-types/services/api/survival";
import { ServicesVulnerabilityApiTypes } from "@rrrcn/common-types/services/api/vulnerability";
import { multipleAreaVulnerabilityController } from "@rrrcn/services/src/controllers/vulnerability/overall-vulnerability/multiple-area/multiple-area-vulnerability";
import { areaVulnerabilityController } from "@rrrcn/services/src/controllers/vulnerability/overall-vulnerability";
import { habitatAreaOverallVulnerabilityController } from "@rrrcn/services/src/controllers/vulnerability/overall-vulnerability/habitat-area";
import { singleTransitCollisionRiskController } from "@rrrcn/services/src/controllers/vulnerability/single-transit-risk";
import { flightHeightTransitRisk } from "@rrrcn/services/src/controllers/vulnerability/flight-height-transit-risk";
import { MigrationsApi } from "@rrrcn/common-types/services/api/migrations";
import { generateMigrationTracks } from "@rrrcn/services/src/controllers/migrations/generate-tracks";
import scripts from "@rrrcn/services/src/services/ee-data";
import { populationEstimation } from "@rrrcn/services/src/controllers/population-estimation";
import { ServicesSpatialServicesApiTypes } from "@rrrcn/common-types/services/api/spatial-services";
import { buffersCentroidsDistancesController } from "@rrrcn/services/src/controllers/spatial-services/buffers-centroids-distances";
import { generalizeAreaPointsController } from "@rrrcn/services/src/controllers/spatial-services/generalize-area-points";
import { extractData } from "@rrrcn/services/src/controllers/extract-data/extract-data";
import { ServicesExtractDataApiTypes } from "@rrrcn/common-types/services/api/extract-data";
import { setImmediate } from "timers";
import { setTimeout } from "timers/promises";
import eekey from "../../ee-key.json";
import { Feature, Point } from "geojson";
import { getFeatures } from "@rrrcn/services/src/utils/ee-image";
import { reduceRegionsFromImageOrCollection } from "@rrrcn/services/src/utils/io";
import { elevationScript } from "@rrrcn/services/src/services/ee-data/scripts/elevation";
import { CorrelationsController } from "@rrrcn/services/src/controllers/statistical-services/correlation";
import { normalTestController } from "@rrrcn/services/src/controllers/statistical-services/normal";
import { tTestController } from "@rrrcn/services/src/controllers/statistical-services/ttest";
import { moranTestController } from "@rrrcn/services/src/controllers/statistical-services/moran";
// import { CorrelationsController } from "@rrrcn/services/src/controllers/statistical-services/correlation";
import { ServicesDataSelectionApi } from "@rrrcn/common-types/services/api/data-selection";
import { GisVulnerabilityCalculationService } from "@rrrcn/admin/src/core/gis/use-cases/vulnerability-calculation/services";
import { StrapiGisSpatialGridRepository } from "@rrrcn/admin/src/core-impl/gis/repository/spatial-grid";
import { RRRCNVulnerabilityCalculator } from "@rrrcn/admin/src/core-impl/map/entities/vulnerability-result";
import { GisVulnerabilityCalculationControllers } from "@rrrcn/admin/src/core-impl/gis/controllers/vulnerability-calculation";
import { GisHabitatAreaVulnerabilityCalculationConfig } from "@rrrcn/common-types/admin/api/gis/grid-vulnerability";
const gisVulnerabilityControllers = new GisVulnerabilityCalculationControllers(
  new GisVulnerabilityCalculationService(
    new StrapiGisSpatialGridRepository(strapi),
    new RRRCNVulnerabilityCalculator()
  )
);
export class RrrcnServicesClient {
  private registered = false;
  constructor(eekey: any) {
    this.registerEEKey(eekey);
  }
  private registerEEKey(eekey: any) {
    try {
      ee.data.authenticateViaPrivateKey(
        eekey,
        () => {
          ee.initialize(null, null, async () => {
            this.registered = true;
          });
        },
        (r: string) => {
          console.log("REJECT IN AUTH GEE", r);
        }
      );
    } catch (e) {
      console.log(e);
      console.log(eekey);
    }
  }
  private async awaitForRegister() {
    while (!this.registered) {
      setImmediate(() => {
        setTimeout(1);
      });
    }
    return;
  }

  async extractData(args: ServicesExtractDataApiTypes.ExtractData.Body) {
    console.log(this);
    await this.awaitForRegister();
    return extractData(args);
  }
  async getPointsElevations(points: Feature<Point>[]) {
    await this.awaitForRegister();
    const validPoints = points.map((it) => {
      it.geometry.coordinates = [
        it.geometry.coordinates[0],
        it.geometry.coordinates[1],
      ];
      return it;
    });
    return await getFeatures(
      await reduceRegionsFromImageOrCollection(
        ee.FeatureCollection(validPoints),
        elevationScript({
          regions: ee.FeatureCollection(validPoints),
        }).elevation,
        undefined,
        ["elevation"]
      )
    );
  }
  async randomForest(
    args: ClassificationApi.PostRandomForest.Body
  ): Promise<ClassificationApi.PostRandomForest.Response> {
    await this.awaitForRegister();
    return randomForest(args);
  }
  async maxent(
    args: ClassificationApi.PostMaxent.Body
  ): Promise<ClassificationApi.PostMaxent.Response> {
    await this.awaitForRegister();
    return maxent(args);
  }

  async populationEstimationPoints(
    args: PopulationEstimationApi.PostGeneratePointsEstimate.Body
  ) {
    await this.awaitForRegister();
    return estimatePopulationRandomGeneration(args);
  }
  async populationEstimationDistance(
    args: PopulationEstimationApi.PostDistanceEstimate.Body
  ) {
    await this.awaitForRegister();
    return estimatePopulationDistance(args);
  }
  async populationEstimationDensity(
    args: PopulationEstimationApi.PostDensityEstimate.Body
  ) {
    await this.awaitForRegister();
    return estimatePopulationDensity(args);
  }
  async populationEstimation(args: PopulationEstimationApi.PostEstimate.Body) {
    await this.awaitForRegister();
    return populationEstimation(args);
  }
  async estimateNestSurvival(args: ServicesSurvivalApi.PostNestSurvival.Body) {
    await this.awaitForRegister();
    return estimateNestSurvival(args);
  }
  async multipleAreaVulnerabilityController(
    args: ServicesVulnerabilityApiTypes.OverallMultipleAreaVulnerability.Body
  ) {
    await this.awaitForRegister();
    return multipleAreaVulnerabilityController(args);
  }
  async areaVulnerabilityController(
    args: ServicesVulnerabilityApiTypes.OverallSingleAreaVulnerability.Body
  ) {
    return areaVulnerabilityController(args);
  }
  async habitatAreaOverallVulnerabilityController(
    args: ServicesVulnerabilityApiTypes.OverallHabitatAreaVulnerability.Body
  ) {
    await this.awaitForRegister();
    return habitatAreaOverallVulnerabilityController(args);
  }
  async singleTransitCollisionRiskController(
    args: ServicesVulnerabilityApiTypes.SingleTransit.Body
  ) {
    await this.awaitForRegister();
    return singleTransitCollisionRiskController(args);
  }
  async flightHeightTransitRisk(
    args: ServicesVulnerabilityApiTypes.FlightHeightDistributionRisk.Body
  ) {
    await this.awaitForRegister();
    return flightHeightTransitRisk(args);
  }
  async generateMigrationTracks(args: MigrationsApi.PostGenerateTracks.Body) {
    await this.awaitForRegister();
    return generateMigrationTracks(args);
  }
  async getAvailableScripts(): Promise<string[]> {
    await this.awaitForRegister();
    return Promise.resolve(Object.keys(scripts));
  }
  async generalizeAreaPointsController(
    args: ServicesSpatialServicesApiTypes.GeneralizeAreaPoints.Body
  ) {
    await this.awaitForRegister();
    return generalizeAreaPointsController(args);
  }
  async buffersCentroidsDistancesController(
    args: ServicesSpatialServicesApiTypes.BuffersCentroidsDistances.Body
  ) {
    await this.awaitForRegister();
    return buffersCentroidsDistancesController(args);
  }
  async dataSelectionCorrelation(
    args: ServicesDataSelectionApi.CorrelationApi.Body
  ) {
    return CorrelationsController(args);
  }
  async dataSelectionTTest(args: ServicesDataSelectionApi.TTestApi.Body) {
    return tTestController(args);
  }
  async dataSelectionNormalTest(args: ServicesDataSelectionApi.NormalApi.Body) {
    return normalTestController(args);
  }
  async dataSelectionMoranTest(args: ServicesDataSelectionApi.MoranApi.Body) {
    return moranTestController(args);
  }
  async vulnerabilityCalculation(
    config: GisHabitatAreaVulnerabilityCalculationConfig
  ) {
    return gisVulnerabilityControllers.calculateHabitatAreaVulnerability(
      config
    );
  }
}
export const rrrcnServicesClient = new RrrcnServicesClient(eekey);
