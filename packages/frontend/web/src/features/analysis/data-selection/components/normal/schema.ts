import * as yup from "yup";
import { NormalConfig } from "@rrrcn/common-types/services/api/data-selection/configs";
export type NormalInputConfig = NormalConfig<File>;

export const NormalTestSchema: yup.Schema<NormalInputConfig> = yup.object({
  data: yup.mixed().required() as yup.Schema<File>,
});
