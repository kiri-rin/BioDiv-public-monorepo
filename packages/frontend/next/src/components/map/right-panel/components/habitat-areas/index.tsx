import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";

export const MapRightPanelHabitatAreas = ({
  cell,
}: {
  cell: SpatialGridCell;
}) => {
  return (
    <>
      {cell.species_infos?.map(
        (it) => it.species?.name + "/" + it.vulnerability
      )}
    </>
  );
};
