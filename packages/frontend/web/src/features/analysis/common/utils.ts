import { mapScriptsConfigToRequest } from "../classifications/random-forest/utils";
import { DataExtractionInput } from "../classifications/random-forest/data-extraction";
import {
  mapRFConfigToRequest,
  RandomForestInputConfig,
} from "../classifications/random-forest/random-forest";
import { serializeRequestToForm } from "@/utils/request";
import { useCallback } from "react";
import { StrapiApi } from "@rrrcn/common-types/admin/api/gis";
import { usePostAnalysisMutation } from "@/store/results";
import {
  GetDataBodyType,
  MaxentBodyType,
  PopulationEstimateBodyType,
  RandomForestBodyType,
  SurvivalBodyType,
  VulnerabilityBodyType,
} from "@rrrcn/common-types/admin/api/gis/analysis";
import { SurvivalNestConfig } from "@rrrcn/common-types/services/api/survival/configs";
import {
  HabitatAreaOverallVulnerabilityControllerRequest,
  MultipleAreaVulnerabilityRequest,
} from "@rrrcn/common-types/services/api/vulnerability/overall/configs";
import { PopulationInputConfig } from "@/features/analysis/population/population";
import { GisHabitatAreaVulnerabilityCalculationConfig } from "@rrrcn/common-types/admin/api/gis/grid-vulnerability";
import { ValidDataExtractionInput } from "@/features/analysis/classifications/random-forest/data-schemas";

export const _useSendAnalysis = (
  analysisType: StrapiApi.PostAnalysis.Body["type"]
) => {
  const [postAnalysis, { data: analysisState, isLoading, error }] =
    usePostAnalysisMutation();
  const onSend = useCallback(
    //TODO refactor
    (
      data:
        | Partial<DataExtractionInput>
        | Partial<RandomForestInputConfig>
        | Partial<PopulationInputConfig>
        | Partial<SurvivalNestConfig>
        | MultipleAreaVulnerabilityRequest
        | HabitatAreaOverallVulnerabilityControllerRequest
        | GisHabitatAreaVulnerabilityCalculationConfig
    ) => {
      let config: StrapiApi.PostAnalysis.Body | undefined;
      switch (analysisType) {
        case "data": {
          config = {
            type: analysisType,
            config: mapScriptsConfigToRequest(data as ValidDataExtractionInput),
          } as GetDataBodyType;
          break;
        }
        case "population": {
          config = {
            type: "population",
            config: data,
          } as PopulationEstimateBodyType;
          break;
        }
        case "random-forest": {
          config = {
            type: "random-forest",
            config: mapRFConfigToRequest(data as RandomForestInputConfig),
          } as RandomForestBodyType;
          break;
        }
        case "maxent": {
          config = {
            type: "maxent",
            config: mapRFConfigToRequest(data as RandomForestInputConfig),
          } as MaxentBodyType;
          break;
        }
        case "survival": {
          config = {
            type: "survival",
            config: data,
          } as SurvivalBodyType;
          break;
        }
        default: {
          config = {
            type: analysisType,
            config: data,
          } as VulnerabilityBodyType;
        }
      }
      if (config) {
        const form = new FormData();
        serializeRequestToForm(config, form);
        postAnalysis(form);
      }
    },
    [analysisType, postAnalysis]
  );
  return { analysisState, postAnalysis, onSend, isLoading, error };
};
export const useSendAnalysis = <
  AnalysisType extends StrapiApi.PostAnalysis.Body["type"],
  T
>(
  analysisType: AnalysisType,
  mapData: (props: T) => any
) => {
  const [postAnalysis, { data: analysisState, isLoading, error }] =
    usePostAnalysisMutation();
  const onSend = useCallback(
    //TODO refactor
    (data: T) => {
      const config: StrapiApi.PostAnalysis.Body = {
        type: analysisType,
        config: mapData(data),
      };

      if (config) {
        const form = new FormData();
        serializeRequestToForm(config, form);
        postAnalysis(form);
      }
    },
    [analysisType, postAnalysis]
  );
  return { analysisState, postAnalysis, onSend, isLoading, error };
};
