import { _useSendAnalysis } from "@/features/analysis/common/utils";
import {
  useMigrationVulnerabilityContext,
  VulnerabilityFormType,
} from "@/features/analysis/migrations/context/vulnerability-areas";
import { useMigrationsContext } from "@/features/analysis/migrations/context/migrations";
import { useFormik } from "formik";
import { habitatAreaVulnerabilityFormToRequest } from "@/features/analysis/migrations/components/habitat-areas/utils/form-to-request";
import {
  GeometryInput,
  GeometryInputConfig,
} from "@/components/geometry-inputs/geometry-input";
import { FeatureCollection, GeoJSON } from "geojson";
import { useState } from "react";
import * as yup from "yup";
import { combine } from "@turf/turf";
import { Feature, MultiPolygon, Polygon } from "@turf/helpers";
import {
  MigrationsHabitatAreaItemBirdCountInput,
  MigrationsHabitatAreaItemButtonsContainer,
  MigrationsHabitatAreaItemCalculateButton,
  MigrationsHabitatAreaItemContainer,
} from "@/features/analysis/migrations/components/habitat-areas/item/style";
import { useTranslations } from "@/utils/translations";
export type MigrationsHabitatAreaItemProps = {
  area: GeometryInputConfig;
  onChange: (value: GeometryInputConfig) => void;
  onDelete?: () => void;
};
const BirdsCountSchema = yup.object({
  birds_count: yup.number().required(),
});
export const MigrationsHabitatAreaItem = ({
  area,
  onChange,
}: MigrationsHabitatAreaItemProps) => {
  const t = useTranslations();
  const { onSend } = _useSendAnalysis("habitat-area-vulnerability");
  const { form } = useMigrationVulnerabilityContext();
  const { migrations } = useMigrationsContext();
  const [geojson, setGeojson] = useState<GeoJSON | null>(null);

  const {
    values: { birds_count },
    setFieldValue: setBirdsCountFieldValues,
    errors,
    submitForm,
  } = useFormik({
    validationSchema: BirdsCountSchema,
    initialValues: { birds_count: 0 },

    onSubmit: (data) => {
      form?.validateForm().then((errors) => {
        if (!Object.values(errors).length) {
          if (form?.values && migrations && geojson) {
            const habitatAreaVulnerabilityRequest =
              habitatAreaVulnerabilityFormToRequest(
                form.values as Required<VulnerabilityFormType>,
                migrations!.map((it) => it.geojson),
                combine(geojson as FeatureCollection<Polygon>)
                  .features[0] as Feature<Polygon | MultiPolygon>,
                data.birds_count
              );
            onSend(habitatAreaVulnerabilityRequest);
          }
        }
      });
    },
  });
  return (
    <MigrationsHabitatAreaItemContainer>
      <GeometryInput
        type={"polygon" as google.maps.drawing.OverlayType.POLYGON}
        value={area}
        onChange={onChange}
        onGeojsonReady={setGeojson}
      />
      <MigrationsHabitatAreaItemBirdCountInput
        size={"small"}
        value={birds_count}
        error={!!errors["birds_count"]}
        helperText={errors["birds_count"]}
        onChange={({ target: { value } }) => {
          setBirdsCountFieldValues("birds_count", value);
        }}
      />
      <MigrationsHabitatAreaItemButtonsContainer>
        <MigrationsHabitatAreaItemCalculateButton onClick={submitForm}>
          {t["migrations.vulnerability-run"]}
        </MigrationsHabitatAreaItemCalculateButton>
      </MigrationsHabitatAreaItemButtonsContainer>
    </MigrationsHabitatAreaItemContainer>
  );
};
