import { MaxentConfig } from "packages/common-types/services/analytics_config_types";

export type MaxentBodyType = {
  type: "maxent";
  config: MaxentConfig;
};
