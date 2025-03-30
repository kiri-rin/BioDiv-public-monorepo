import {
  GeometryInput,
  GeometryInputConfig,
} from "@/components/geometry-inputs/geometry-input";
import { serializeRequestToForm } from "@/utils/request";
import { useState } from "react";
import { useGeneralizeAreaPointsMutation } from "@/store/spatial-services";
import { useMigrationsContext } from "@/features/analysis/migrations/context/migrations";
import {
  PointsGeneralizationGeneralizeButton,
  PointsGeneralizationDistanceInput,
  PointsGeneralizationContainer,
} from "@/features/services/points-generalization/style";

export const PointsGeneralizationScreen = () => {
  const [distance, setDistance] = useState<string | null>(null);
  const [trigger, { isLoading, data }] = useGeneralizeAreaPointsMutation();
  const { migrations } = useMigrationsContext();
  const [points, setPoints] = useState<GeometryInputConfig>({
    type: "csv",
    path: undefined,
  });
  return (
    <PointsGeneralizationContainer>
      <GeometryInput
        type={google.maps.drawing.OverlayType.MARKER}
        value={points}
        onChange={(val) => setPoints(val)}
      />
      <PointsGeneralizationDistanceInput
        size={"small"}
        value={distance}
        onChange={({ target: { value } }) => setDistance(value)}
        label={"Минимальная дистанция для генерализации"}
      />
      <PointsGeneralizationGeneralizeButton
        onClick={() => {
          const formData = new FormData();
          serializeRequestToForm(
            {
              // area: (props.value as GeojsonImportConfig)?.json.features[0],
              points,
              cellSide: distance,
            },
            formData
          ); //TODO validate
          trigger(formData);
        }}
      >
        Генерализовать точки треков
      </PointsGeneralizationGeneralizeButton>
    </PointsGeneralizationContainer>
  );
};
