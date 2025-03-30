import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import type { GeometriesImportConfig } from "@rrrcn/common-types/services/api/common-body";
import { Button, Input, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { MapDrawingContext, MapDrawingShape } from "../map/map-edit";
import {
  pointsToGeojson,
  polygonsToGeojson,
} from "@rrrcn/frontend-helpers/src/geometry/map/map-geojson-utils";
import { useTranslations } from "@/utils/translations";
import Typography from "@mui/material/Typography";
import { CommonContainerWithError } from "@/components/common/common";
import { useGeometryInputGeojson } from "@/components/geometry-inputs/swr";
import {
  GeometryInputShowButton,
  GeometryInputShowButtonsContainer,
} from "@/components/geometry-inputs/style";
import {
  parseGeojson,
  useShowMapObjects,
} from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { GeoJSON } from "geojson";

type InputModesType = "csv" | "geojson" | "geojson_file" | "shp";

const inputModes: InputModesType[] = ["csv", "geojson", "geojson_file", "shp"];
const typeTitles: any = {
  geojson: "map",
};

const mimeTypes: { [p in InputModesType | string]: string } = {
  geojson: "",
  csv: "text/csv",
  geojson_file: "",
  shp: "application/zip",
};
export type GeometryInputConfig = GeometriesImportConfig<File | undefined>;
export type GeometryInputProps = {
  value?: GeometryInputConfig;
  available?: InputModesType[];
  onChange?: (config: GeometryInputConfig) => any;
  onGeojsonReady?: (geojson: GeoJSON | null) => any;
  type?: google.maps.drawing.OverlayType;
  error?: boolean;
};
export const GeometryInput = ({
  value: geometryConfig = {
    type: "csv",
    path: undefined,
  },
  error,
  onChange: setGeometryConfig = () => {},
  available = inputModes,
  onGeojsonReady,
  type = "marker" as google.maps.drawing.OverlayType.MARKER,
}: GeometryInputProps) => {
  const { map } = useContext(MapDrawingContext);
  const { data, isLoading } = useGeometryInputGeojson(
    geometryConfig,
    type === "marker" ? "points" : "polygon"
  );
  useEffect(() => {
    if (data && !isLoading) {
      onGeojsonReady?.(data as GeoJSON);
    }
    if (isLoading) {
      onGeojsonReady?.(null);
    }
  }, [data]);

  const mapObjects = useMemo(() => (data ? parseGeojson(data) : []), [data]);

  const { show, showObjects, hideObjects } = useShowMapObjects(
    mapObjects,
    map || null,
    true
  );
  return (
    <>
      <CommonContainerWithError $error={error}>
        {geometryConfig?.type !== "geojson" ? (
          <Input
            inputProps={{
              accept: mimeTypes[geometryConfig?.type!],
            }}
            size={"small"}
            type={"file"}
            onChange={({
              target: { files, form },
            }: React.ChangeEvent<HTMLInputElement>) => {
              const prev = geometryConfig;
              setGeometryConfig?.(
                prev.type !== "computedObject" &&
                  prev.type !== "asset" &&
                  files?.[0]
                  ? { ...prev, path: files?.[0] }
                  : prev
              );
            }} // TODO add show/hide button
          />
        ) : (
          <MapGeometryInput
            type={type}
            onSave={(json) => {
              setGeometryConfig({
                type: "geojson",
                json,
              } as GeometryInputConfig);
            }}
          />
        )}
        <Select
          size={"small"}
          onChange={(it) =>
            setGeometryConfig({
              type: it.target.value as GeometryInputConfig["type"],
              path: it.target.value === "asset" ? "" : undefined,
            } as GeometryInputConfig)
          }
          value={geometryConfig.type}
        >
          {available.map((it) => (
            <MenuItem key={it} value={it}>
              {typeTitles[it] || it}
            </MenuItem>
          ))}
        </Select>
      </CommonContainerWithError>
      {geometryConfig.type === "csv" && (
        <>
          <TextField
            margin={"dense"}
            size={"small"}
            label={"latitude_key"}
            onChange={({ target: { value } }) => {
              setGeometryConfig({
                ...geometryConfig,
                latitude_key: value || undefined,
              });
            }}
            value={geometryConfig.latitude_key}
          />
          <TextField
            margin={"dense"}
            size={"small"}
            label={"longitude_key"}
            onChange={({ target: { value } }) => {
              setGeometryConfig({
                ...geometryConfig,
                longitude_key: value || undefined,
              });
            }}
            value={geometryConfig.longitude_key}
          />
          <TextField
            margin={"dense"}
            size={"small"}
            label={"id_key"}
            onChange={({ target: { value } }) => {
              setGeometryConfig({
                ...geometryConfig,
                id_key: value || undefined,
              });
            }}
            value={geometryConfig.id_key}
          />
        </>
      )}
      <GeometryInputShowButtonsContainer>
        <GeometryInputShowButton
          onClick={() => {
            show ? hideObjects() : showObjects();
          }}
        >
          {show ? "Hide" : "Show"}
        </GeometryInputShowButton>
        <GeometryInputShowButton
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(data, null, 4));
          }}
        >
          {"Copy geojson"}
        </GeometryInputShowButton>
      </GeometryInputShowButtonsContainer>
    </>
  );
};
export const MapGeometryInput = ({
  type = google.maps.drawing.OverlayType.MARKER,
  onSave,
}: {
  type?: google.maps.drawing.OverlayType;
  onSave: (json?: GeoJSON.FeatureCollection) => any;
}) => {
  const { onShapeReady, drawing, setDrawing, setOnShapeReady, map } =
    useContext(MapDrawingContext);
  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState(true);
  const mapShapesRef = useRef<MapDrawingShape["shape"][]>([]);
  const strings = useTranslations();

  useEffect(() => {
    if (edit) {
      const _onShapeReady = (shape: MapDrawingShape) => {
        if (shape.type === type) {
          mapShapesRef.current.push(shape.shape);
        }
      };
      setOnShapeReady(() => _onShapeReady);
    }
    setDrawing(edit ? type : false);
  }, [edit]);
  useEffect(() => {
    if (show) {
      mapShapesRef.current.forEach((shape) => shape.setMap(map || null));
    } else {
      mapShapesRef.current.forEach((shape) => shape.setMap(null));
    }
  }, [show]);
  useEffect(() => {
    return () => {
      mapShapesRef.current.forEach((shape) => shape.setMap(null));
      setDrawing(false);
    };
  }, []);
  return (
    <>
      <>
        <Typography>
          {mapShapesRef.current.length}{" "}
          {strings["common.objects-plural"](mapShapesRef.current.length)}
        </Typography>
        {edit ? (
          <>
            <Typography>{strings["geometry.input-at-map"]}</Typography>
            <Button
              onClick={() => {
                mapShapesRef.current.forEach((shape) => shape.setMap(null));
                mapShapesRef.current = [];
              }}
            >
              {strings["common.clear"]}
            </Button>
            <Button
              onClick={() => {
                setEdit(false);
                switch (type) {
                  case google.maps.drawing.OverlayType.MARKER: {
                    onSave(
                      mapShapesRef.current.length
                        ? pointsToGeojson(
                            mapShapesRef.current as google.maps.Marker[]
                          )
                        : undefined
                    );
                    break;
                  }
                  case google.maps.drawing.OverlayType.POLYGON: {
                    onSave(
                      mapShapesRef.current.length
                        ? polygonsToGeojson(
                            mapShapesRef.current as google.maps.Polygon[]
                          )
                        : undefined
                    );
                  }
                }
              }}
            >
              {strings["common.save"]}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                //@ts-ignore

                setEdit(true);
              }}
            >
              {strings["common.edit"]}
            </Button>
            <Button
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? strings["common.hide"] : strings["common.show"]}
            </Button>
          </>
        )}
      </>
    </>
  );
};
