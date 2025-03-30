import * as yup from "yup";
import { PopulationInputConfig } from "./population";
import { GeometryInputSchema } from "../common/geometry-validations";
import {
  PopulationDensityType,
  PopulationDistanceConfigType,
  PopulationRandomGenerationConfigType,
} from "@rrrcn/common-types/services/api/population-estimation/configs";

export const PopulationSchema = yup.lazy((values: PopulationInputConfig) => {
  switch (values.type) {
    case "random-points": {
      return yup.object({
        type: yup.string().required(),
        config: yup.object({
          presenceArea: GeometryInputSchema(),
          areas: GeometryInputSchema(),
          points: GeometryInputSchema(),
          crossValidation: yup.number(),
        }) as yup.Schema<
          Omit<
            PopulationRandomGenerationConfigType<File>,
            "outputs" | "regionOfInterest"
          >
        >,
      });
    }
    case "distance": {
      return yup.object({
        type: yup.string().required(),
        config: yup.object({
          densityFunction: yup.string(),
          distanceFile: yup.mixed().required(),
        }) as yup.Schema<PopulationDistanceConfigType<any>>,
      });
    }
    case "density": {
      return yup.object({
        type: yup.string().required(),
        config: yup.object({
          totalArea: yup.number().required(),
          densityFile: yup.mixed().required(),
        }) as yup.Schema<PopulationDensityType<any>>,
      });
    }
    default:
      return yup.string();
  }
});
