import * as yup from "yup";
import { lazy } from "yup";
import { CorrelationConfig } from "@rrrcn/common-types/services/api/data-selection/configs";
export type CorrelationInputConfig = CorrelationConfig<File>;

export const CorrelationDataSchema: yup.Schema<CorrelationInputConfig["data"]> =
  lazy((value: any) => {
    switch (value.type) {
      case "split": {
        return yup.object({
          type: yup.string().required(),
          presence: yup.mixed().required(),
          absence: yup.mixed().required(),
        });
      }
      default:
      case "all-points": {
        return yup.object({
          type: yup.string().required(),
          data: yup.mixed().required(),
          presence_key: yup.string().required(),
        });
      }
    }
  }) as unknown as yup.Schema<CorrelationInputConfig["data"]>;
export const CorrelationSchema: yup.Schema<CorrelationInputConfig> = yup.object(
  {
    correlationThreshold: yup.number().required(),
    data: CorrelationDataSchema,
    ttest: yup.mixed().required() as yup.Schema<File>,
  }
);
