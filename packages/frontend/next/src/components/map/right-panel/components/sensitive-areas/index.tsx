import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";

export const MapRightPanelSensitiveAreas = ({
  cell,
}: {
  cell: SpatialGridCell;
}) => {
  return <>{cell.sensitive_areas?.map((it) => it.name)}</>;
};
