import { useTranslations } from "@/utils/translations";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CommonPaper } from "@/components/common/common";
import React from "react";

export type DataSelectionDataInputType =
  | {
      type: "all";
      data: any;
      presence_key: string;
    }
  | {
      type: "split";
      absence: any;
      presence: any;
    };
export const DataSelectionDataInput = ({
  name,
  title,
}: {
  name: string;
  title?: string;
}) => {
  const { setFieldValue, touched, submitCount } = useFormikContext<any>();
  const [{ value: config }, fieldMeta, { setValue: setConfig }] =
    useField<DataSelectionDataInputType>(name);
  const errors = fieldMeta.error as any;
  const strings = useTranslations();

  return (
    <Accordion defaultExpanded={true} sx={{ boxShadow: "none" }}>
      <AccordionSummary
        sx={{
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
        className={`common__card common__card_blue`}
        expandIcon={<ExpandMoreIcon />}
      >
        <div>
          <Typography sx={{ marginY: "10px" }}>
            {title || strings["data-selection.add-data"]}
          </Typography>
          <Select
            onClick={(e) => e.stopPropagation()}
            size={"small"}
            value={config?.type}
            onChange={({ target: { value } }) =>
              setConfig({
                ...config,
                type: value as "all" | "split",
              } as DataSelectionDataInputType)
            }
          >
            <MenuItem value={"all"}>
              {strings["data-selection.all-data"]}
            </MenuItem>
            <MenuItem value={"split"}>
              {strings["data-selection.separate-data"]}
            </MenuItem>
          </Select>
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        {(() => {
          switch (config?.type) {
            case "all":
              return (
                <CommonPaper
                  $error={
                    (touched[`${name}.data`] || submitCount) && errors?.data
                  }
                >
                  <Typography sx={{ marginY: "10px" }}>
                    {strings["data-selection.choose-all-data"]}
                  </Typography>
                  <Input
                    inputProps={{
                      accept: "text/csv",
                    }}
                    size={"small"}
                    type={"file"}
                    onChange={({
                      target: { files, form },
                    }: React.ChangeEvent<HTMLInputElement>) => {
                      setConfig({
                        ...config,
                        type: "all",
                        data: files?.[0],
                      });
                    }}
                  />
                  <TextField
                    margin={"dense"}
                    size={"small"}
                    error={
                      !!(
                        (touched[`${name}.presence_key`] || submitCount) &&
                        errors?.presence_key
                      )
                    }
                    value={config?.presence_key}
                    onChange={({ target: { value } }) =>
                      setFieldValue(`${name}.presence_key`, value)
                    }
                    label={strings["data-selection.presence_key"]}
                  />
                </CommonPaper>
              );
            case "split":
              return (
                <>
                  <CommonPaper
                    $error={
                      (touched[`${name}.presence`] || submitCount) &&
                      errors?.presence
                    }
                  >
                    <Typography sx={{ marginY: "10px" }}>
                      {strings["data-selection.choose-presence"]}
                    </Typography>
                    <Input
                      error={
                        !!(
                          (touched[`${name}.presence`] || submitCount) &&
                          errors?.presence
                        )
                      }
                      inputProps={{
                        accept: "text/csv",
                      }}
                      size={"small"}
                      type={"file"}
                      onChange={({
                        target: { files, form },
                      }: React.ChangeEvent<HTMLInputElement>) => {
                        setConfig({
                          ...config,
                          type: "split",
                          presence: files?.[0],
                        });
                      }}
                    />
                  </CommonPaper>
                  <CommonPaper
                    $error={
                      (touched[`${name}.absence`] || submitCount) &&
                      errors?.absence
                    }
                  >
                    <Typography sx={{ marginY: "10px" }}>
                      {strings["data-selection.choose-absence"]}
                    </Typography>
                    <Input
                      error={
                        !!(
                          (touched[`${name}.absence`] || submitCount) &&
                          errors?.absence
                        )
                      }
                      inputProps={{
                        accept: "text/csv",
                      }}
                      size={"small"}
                      type={"file"}
                      onChange={({
                        target: { files, form },
                      }: React.ChangeEvent<HTMLInputElement>) => {
                        setConfig({
                          ...config,
                          type: "split",
                          absence: files?.[0],
                        });
                      }}
                    />
                  </CommonPaper>
                </>
              );
            default:
              return <></>;
          }
        })()}
      </AccordionDetails>
    </Accordion>
  );
};
