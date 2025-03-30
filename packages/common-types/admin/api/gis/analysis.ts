import { ServicesVulnerabilityApiTypes } from "@rrrcn/common-types/services/api/vulnerability";
import { DataExtractionConfig } from "@rrrcn/common-types/services/api/common-body";
import { ClassificationApi } from "@rrrcn/common-types/services/api/classifications";
import { PopulationEstimationApi } from "@rrrcn/common-types/services/api/population-estimation";
import { ServicesSurvivalApi } from "@rrrcn/common-types/services/api/survival";
import { ServicesDataSelectionApi } from "@rrrcn/common-types/services/api/data-selection";
import { GisHabitatAreaVulnerabilityCalculationConfig } from "@rrrcn/common-types/admin/api/gis/grid-vulnerability";

export type GetDataBodyType = { type: "data"; config: DataExtractionConfig };
export type RandomForestBodyType = {
  type: "random-forest";
  config: ClassificationApi.PostRandomForest.Body;
};
export type PopulationEstimateBodyType = {
  type: "population";
  config: PopulationEstimationApi.PostEstimate.Body;
};
export type SurvivalBodyType = {
  type: "survival";
  config: ServicesSurvivalApi.PostNestSurvival.Body;
};
export type MaxentBodyType = {
  type: "maxent";
  config: ClassificationApi.PostMaxent.Body;
};
export type VulnerabilityBodyType = {
  type: "vulnerability";
  config: ServicesVulnerabilityApiTypes.OverallMultipleAreaVulnerability.Body;
};
export type HabitatAreaVulnerabilityBodyType = {
  type: "habitat-area-vulnerability";
  config: ServicesVulnerabilityApiTypes.OverallHabitatAreaVulnerability.Body;
};
export type GridVulnerabilityBodyType = {
  type: "grid-vulnerability";
  config: GisHabitatAreaVulnerabilityCalculationConfig;
};
export type DataSelectionCorrelationBodyType = {
  type: "data-selection-correlation";
  config: ServicesDataSelectionApi.CorrelationApi.Body;
};
export type DataSelectionTTestBodyType = {
  type: "data-selection-t-test";
  config: ServicesDataSelectionApi.TTestApi.Body;
};
export type DataSelectionNormalTestBodyType = {
  type: "data-selection-normal";
  config: ServicesDataSelectionApi.NormalApi.Body;
};
export type DataSelectionMoranTestBodyType = {
  type: "data-selection-moran";
  config: ServicesDataSelectionApi.MoranApi.Body;
};
export type AnalysisBodyType =
  | HabitatAreaVulnerabilityBodyType
  | VulnerabilityBodyType
  | GridVulnerabilityBodyType
  | GetDataBodyType
  | RandomForestBodyType
  | PopulationEstimateBodyType
  | SurvivalBodyType
  | MaxentBodyType
  | DataSelectionCorrelationBodyType
  | DataSelectionTTestBodyType
  | DataSelectionMoranTestBodyType
  | DataSelectionNormalTestBodyType;
