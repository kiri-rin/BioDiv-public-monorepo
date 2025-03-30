import { Libraries, LoadScript } from "@react-google-maps/api";
import * as turf from "@turf/turf";
import React, { useEffect, useState } from "react";
import { SpatialGrid } from "@rrrcn/common-types/strapi/models/SpatialGrid";
import { Select, Typography } from "@mui/material";
import { Species } from "@rrrcn/common-types/strapi/models/Species";
import { SpatialGridCell } from "@rrrcn/common-types/strapi/models/SpatialGridCell";
import { PaginatedResult } from "@rrrcn/common-types/strapi/models/Pagination";
import { HabitatArea } from "@rrrcn/common-types/strapi/models/HabitatArea";
import { MainLeftDrawer, MainMap, MainTopRow } from "@/components/map/style";
import { SpatialGridDistrict } from "@rrrcn/common-types/strapi/models/SpatialGridDistrict";
import { WithPolygon } from "@rrrcn/common-types/strapi/custom-models/with-polygon";
import { SensitiveArea } from "@rrrcn/common-types/strapi/models/SensitiveArea";
import {
  MapContext,
  MapPagePropsContext,
  useMapContext,
  useMapPageProps,
  useMapSlugs,
} from "@/components/map/context";
import { MapPageAreaSelect } from "@/components/map/vulnerability/components/AreaSelect";
import { MapBreadcrumbs } from "@/components/map/vulnerability/components/breadcrumbs";
import { LangProvider, LangType, useLang } from "@/utils/translations/context";
import MenuItem from "@mui/material/MenuItem";
import { useTranslations } from "@/utils/translations";
import { WithLocalesMap } from "@rrrcn/common-types/strapi/custom-models/with-localizations";
import { BirdTrack } from "@rrrcn/common-types/strapi/models/BirdTrack";
import Image from "next/image";
import { MapMainLeftPanel } from "@/components/map/left-panel";
import { MainRightPanelContextProvider } from "@/components/map/right-panel/context";
import { MainRightPanel } from "@/components/map/right-panel";
import { MapSpatialGridCell } from "@rrrcn/common-types/strapi/custom-models/MapSpatialGridCell";
import { MapVulnereabilityCalculation } from "@rrrcn/common-types/strapi/custom-models/MapVulnereabilityCalculation";
import { SensitiveAreaSource } from "@rrrcn/common-types/strapi/models/SensitiveAreaSource";

export type MainPageProps = {
  cells: PaginatedResult<WithPolygon<MapSpatialGridCell>> | null;
  calculations: PaginatedResult<
    WithPolygon<MapVulnereabilityCalculation>
  > | null;
  districts: PaginatedResult<
    WithLocalesMap<WithPolygon<SpatialGridDistrict>>
  > | null;
  grids: PaginatedResult<WithLocalesMap<WithPolygon<SpatialGrid>>> | null;
  species: PaginatedResult<WithLocalesMap<Species>> | null;
  habitat_areas: PaginatedResult<
    WithLocalesMap<WithPolygon<HabitatArea>>
  > | null;
  birds_tracks: PaginatedResult<WithLocalesMap<BirdTrack>> | null;
  sensitive_areas: PaginatedResult<
    WithLocalesMap<WithPolygon<SensitiveAreaSource>>
  > | null;
};

const center = { lat: 0, lng: 0 };
const libraries: Libraries = ["drawing", "geometry"];

export function MainPage(props: MainPageProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <LangProvider>
      <MapPagePropsContext.Provider value={props}>
        <MapContext.Provider value={{ map, setMap }}>
          <MainRightPanelContextProvider>
            <WrappedMainPage />
          </MainRightPanelContextProvider>
        </MapContext.Provider>
      </MapPagePropsContext.Provider>
    </LangProvider>
  );
}
export const WrappedMainPage = () => {
  const { map, setMap } = useMapContext();
  const { currentPage, selectedGridSlug } = useMapSlugs();
  const { lang, setLang } = useLang();
  const { selectedGrid } = useMapPageProps();
  const translations = useTranslations();
  useEffect(() => {
    if (selectedGrid && map) {
      const center = turf.centroid(selectedGrid.polygon);
      map.setCenter({
        lng: center.geometry.coordinates[0],
        lat: center.geometry.coordinates[1],
      });
    }
  }, [selectedGrid, map]);

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY || ""}
    >
      <MainLeftDrawer variant="permanent" anchor={"left"}>
        <MainTopRow>
          <Image
            src={"/logo.png"}
            style={{ objectFit: "contain" }}
            alt={"logo"}
            width={90}
            height={90}
          />
          <div
            style={{
              alignSelf: "center",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant={"h5"} style={{ lineHeight: "100%" }}>
              BioDiv
            </Typography>
            <Typography variant={"p"}>Vulnerability</Typography>
          </div>
          {/*<Select*/}
          {/*  size={"small"}*/}
          {/*  label={translations["common.lang"]}*/}
          {/*  value={lang}*/}
          {/*  onChange={({ target: { value } }) => {*/}
          {/*    setLang(value as LangType);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <MenuItem value={LangType.EN}>{LangType.EN}</MenuItem>*/}
          {/*  <MenuItem value={LangType.RU}>{LangType.RU}</MenuItem>*/}
          {/*</Select>*/}
        </MainTopRow>

        <MapBreadcrumbs />
        {selectedGridSlug ? <MapMainLeftPanel /> : <MapPageAreaSelect />}
      </MainLeftDrawer>
      <MainMap
        onLoad={(map: google.maps.Map) => {
          setMap(map);
        }}
        center={center}
        zoom={5}
      />
      <MainRightPanel />
    </LoadScript>
  );
};
