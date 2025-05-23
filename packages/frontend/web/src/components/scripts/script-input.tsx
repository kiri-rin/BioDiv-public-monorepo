import type {
  ScriptConfig,
  scriptKey,
} from "@rrrcn/common-types/services/api/common-body";
import React, { useState } from "react";
import { Button, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ScriptDatesInput } from "../date-inputs/script-dates";
import { ScriptInputConfig } from "@/features/analysis/classifications/random-forest/data-extraction";
import { useTranslations } from "@/utils/translations";
import { useQuery } from "react-query";
import { api } from "@/api/index";
import { FormikErrors, useField } from "formik";
import {
  ScriptInputAdvancedSettingsContainer,
  ScriptInputButtonsContainer,
  ScriptInputContainer,
  ScriptInputSelect,
} from "@/components/scripts/style";
export const ScriptSelectInput = ({
  onDelete,
  name,
}: {
  onDelete?: () => any;

  name: string;
}) => {
  const strings = useTranslations();
  const { data: scriptsList } = useQuery(
    "analysis-scripts",
    (opt) => api.analysis.getApiAnalysisScripts(),
    { enabled: false, refetchOnWindowFocus: false }
  );
  const [{ value: scriptConfig }, fieldMeta, { setValue: setConfig }] =
    useField<ScriptInputConfig>(name);
  const errors = fieldMeta.error as FormikErrors<ScriptInputConfig>;
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  return (
    <ScriptInputContainer>
      <ScriptInputSelect
        error={!!errors?.key}
        value={scriptConfig?.key}
        onChange={({ target: { value: _value } }) => {
          setConfig?.({ ...scriptConfig, key: _value as scriptKey });
        }}
        size={"small"}
      >
        {scriptsList?.data?.map((it: any) => (
          <MenuItem key={it} value={it}>
            {it}
          </MenuItem>
        ))}
      </ScriptInputSelect>

      {showAdvancedSettings && <ScriptAdvanceSettings name={name} />}
      <ScriptInputButtonsContainer>
        <Button size={"small"} onClick={() => onDelete?.()}>
          {strings["common.delete"]}
        </Button>
        <Button
          size={"small"}
          onClick={() => setShowAdvancedSettings((prev) => !prev)}
        >
          {strings["common.advanced-settings"]}
        </Button>
      </ScriptInputButtonsContainer>
    </ScriptInputContainer>
  );
};
const ScriptAdvanceSettings = ({ name }: { name: string }) => {
  const [{ value }, { error }, { setValue: onChange }] =
    useField<ScriptInputConfig>(name);
  const strings = useTranslations();
  return (
    <ScriptInputAdvancedSettingsContainer>
      <div>
        <TextField
          size={"small"}
          label={strings["script-input.buffer"]}
          type={"numeric"}
          onChange={({ target: { value: val } }) => {
            const res = Number(val.replaceAll(/[^0-9]/g, ""));
            if (String(res) !== "NaN") {
              onChange({
                ...value,
                buffer: (res || undefined) as ScriptConfig["buffer"],
              });
            }
          }}
          value={value.buffer || ""}
        />
        <Select
          size={"small"}
          value={value.mode || ""}
          onChange={({ target: { value: val } }) =>
            onChange({
              ...value,
              mode: (val || undefined) as ScriptConfig["mode"],
            })
          }
        >
          <MenuItem value={"SUM"}>SUM</MenuItem>
          <MenuItem value={"MEAN"}>MEAN</MenuItem>
        </Select>
      </div>
      <TextField
        size={"small"}
        label={strings["script-input.scale"]}
        type={"numeric"}
        value={value.scale || ""}
        onChange={({ target: { value: val } }) => {
          const res = Number(val.replaceAll(/[^0-9]/g, ""));
          console.log(res, val);
          if (String(res) !== "NaN") {
            onChange({
              ...value,
              scale: (res || undefined) as ScriptConfig["scale"],
            });
          }
        }}
      />
      <TextField
        size={"small"}
        label={strings["script-input.bands"]}
        type={"text"}
        value={value.bands?.join(",") || ""}
        onChange={({ target: { value: val } }) => {
          const res = val.split(",").map((it) => it.trim());
          onChange({
            ...value,
            bands: res.filter((it) => it).length ? res : undefined,
          });
        }}
      />
      <TextField
        size={"small"}
        label={strings["script-input.filename"]}
        value={value.filename || ""}
        onChange={({ target: { value: val } }) =>
          onChange({
            ...value,
            filename: val || (undefined as ScriptConfig["filename"]),
          })
        }
      />
      <ScriptDatesInput name={`${name}.dates`} />
    </ScriptInputAdvancedSettingsContainer>
  );
};
