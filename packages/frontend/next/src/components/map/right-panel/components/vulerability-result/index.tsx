import { MyMapVulnerabilityResult } from "@rrrcn/common-types/strapi/custom-models/MyMapVulnerabilityResult";
import { MapCalculationItem } from "@/components/map/calculations/components/Item";
import { Typography } from "@mui/material";

export const MainRightPanelVulnerabilityResult = ({
  result,
  index,
}: {
  result: MyMapVulnerabilityResult;
  index: number;
}) => {
  const collisions = Math.max(
    result.vulnerability_data?.allExtended?.potentialCollisionsTotal || 0,
    result.vulnerability_data?.allSingle?.potentialCollisionsTotal || 0
  );
  const transits = Math.max(
    result.vulnerability_data?.allExtended?.potentialTransitsTotal || 0,
    result.vulnerability_data?.allSingle?.potentialTransitsTotal || 0
  );
  return (
    <>
      <Typography variant={"h6"}>{index}</Typography>
      <div>
        Vulnerability assuming avoidance:
        {result.max_vulnerability?.toFixed(3)}
      </div>
      <div>Potential transits per year: {transits?.toFixed(3)}</div>
      <div>Potential collisions per year: {collisions?.toFixed(3)}</div>
      {result.map_vulnereability_calculation && (
        <MapCalculationItem
          calculation={result.map_vulnereability_calculation!}
        />
      )}{" "}
    </>
  );
};
