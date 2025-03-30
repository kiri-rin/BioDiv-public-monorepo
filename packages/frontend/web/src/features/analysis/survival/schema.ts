import * as yup from "yup";
import type { SurvivalNestConfig } from "@rrrcn/common-types/services/api/survival/configs";

export const SurvivalValidationSchema: yup.Schema<SurvivalNestConfig<any>> =
  yup.object({
    survivalFile: yup.mixed().required(),
    nocc: yup.number().required(),
  });
