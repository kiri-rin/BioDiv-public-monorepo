import { useField, useFormikContext } from "formik";
import { TextField } from "@mui/material";

export const FormTextField = <T,>({
  name,
  mapValue,
  label,
  getValue,
}: {
  name: string;
  label: string;
  mapValue: (value: string) => T;
  getValue?: (value: any) => string;
}) => {
  const { setFieldValue, touched, submitCount } = useFormikContext<any>();
  const [{ value: config }, fieldMeta, { setValue: setConfig }] =
    useField<T>(name);
  const errors = fieldMeta.error as any;
  const value = getValue ? getValue(config) : config;

  return (
    <TextField
      margin={"dense"}
      size={"small"}
      error={!!((touched[`${name}`] || submitCount) && errors)}
      value={value !== undefined ? value : ""}
      onChange={({ target: { value } }) => setConfig(mapValue(value))}
      label={label}
    />
  );
};
