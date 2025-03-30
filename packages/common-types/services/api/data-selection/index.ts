import {
  CorrelationConfig,
  MoranConfig,
  NormalConfig,
  NormalTestVariables,
  TTestConfig,
} from "@rrrcn/common-types/services/api/data-selection/configs";

export namespace ServicesDataSelectionApi {
  export namespace CorrelationApi {
    export type Body = CorrelationConfig<string>;
  }
  export namespace TTestApi {
    export type Body = TTestConfig<string>;
    export type Response = {
      label: string;
      ttest: {
        tStatistic: number;
        pValue: number;
        mean1: number;
        mean2: number;
        var1: number;
        var2: number;
      };
    }[];
  }
  export namespace NormalApi {
    export type Body = NormalConfig<string>;
    export type Response = {
      normal: NormalTestVariables;
      notNormal: NormalTestVariables;
    };
  }
  export namespace MoranApi {
    export type Body = MoranConfig<string>;
  }
}
