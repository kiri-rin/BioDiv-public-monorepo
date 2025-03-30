import { GeoJSON, GeoJsonProperties, Geometry } from "geojson";
import { useCallback, useEffect, useMemo, useState } from "react";

export type GoogleMapObject =
  | google.maps.Polygon
  | google.maps.Rectangle
  | google.maps.Marker
  | google.maps.Circle
  | google.maps.Polyline;

export const drawGeojson = (
  //TODO move to common components
  map: google.maps.Map,
  geojson: GeoJSON
): GoogleMapObject[] => {
  const mapObjects = parseGeojson(geojson);
  mapObjects.forEach((shape) => {
    shape.setMap(map);
  });
  return mapObjects;
};
export const parseGeojson = (geojson: GeoJSON): GoogleMapObject[] => {
  switch (geojson.type) {
    case "Feature": {
      return parseGeojsonGeometry(geojson.geometry, geojson.properties);
    }
    case "FeatureCollection": {
      return geojson.features.flatMap((feature) =>
        parseGeojsonGeometry(feature.geometry, feature.properties)
      );
    }
    default: {
      return parseGeojsonGeometry(geojson);
    }
  }
};
const parseGeojsonGeometry = (
  geometry: Geometry,
  properties?: GeoJsonProperties
): GoogleMapObject[] => {
  switch (geometry.type) {
    case "GeometryCollection": {
      return geometry.geometries.flatMap((g) =>
        parseGeojsonGeometry(g, properties)
      );
    }

    case "MultiPolygon": {
      return geometry.coordinates?.map(
        (coordinates) =>
          new google.maps.Polygon({
            paths: coordinates[0].map((coord) => ({
              lat: Number(coord[1]),
              lng: Number(coord[0]),
            })),
          })
      );
      break;
    }
    case "Polygon": {
      return [
        new google.maps.Polygon({
          paths: geometry.coordinates[0]?.map((coord) => ({
            lat: Number(coord[1]),
            lng: Number(coord[0]),
          })),
        }),
      ];
      break;
    }
    case "Point": {
      return [
        new google.maps.Marker({
          icon: {
            url: "https://cdn.iconscout.com/icon/free/png-256/free-dot-22-433567.png?f=webp",
            size: new google.maps.Size(12, 12),
            anchor: new google.maps.Point(6, 6),
            origin: new google.maps.Point(120, 120),
          },
          position: {
            lat: Number(geometry.coordinates[1]),
            lng: Number(geometry.coordinates[0]),
          },
        }),
      ];
    }
    case "LineString": {
      return [
        new google.maps.Polyline({
          path: geometry.coordinates.map((coord) => ({
            lat: coord[1],
            lng: coord[0],
          })),
        }),
      ];
      break;
    }
    default: {
      return [
        new google.maps.Marker({
          position: {
            lat: 0,
            lng: 0,
          },
        }),
      ];
    }

    // case "MultiLineString": {
    //   break;
    // }
    // case "MultiPoint": {
    //   break;
    // }
    // case "MultiPolygon": {
    //   break;
    // }
  }
};
export const useShowMapObjects = (
  mapObjects: GoogleMapObject[],
  map: google.maps.Map | null,
  showDefault?: boolean,
  options?: google.maps.PolygonOptions &
    google.maps.RectangleOptions &
    google.maps.MarkerOptions &
    google.maps.CircleOptions &
    google.maps.PolylineOptions
) => {
  const [show, setShow] = useState(showDefault);
  useEffect(() => {
    if (show && map) {
      mapObjects.forEach((it) => {
        it.setMap(map);
        options && it.setOptions(options!);
      });
    }
    return () => {
      mapObjects.forEach((it) => it.setMap(null));
    };
  }, [mapObjects, map, options]);
  const showObjects = useCallback(() => {
    if (map) {
      setShow(true);
      mapObjects.forEach((it) => {
        it.setMap(map);
        options && it.setOptions(options);
      });
    }
  }, [map, mapObjects, options]);
  const hideObjects = useCallback(() => {
    setShow(false);
    mapObjects.forEach((it) => it.setMap(null));
  }, [map, mapObjects]);
  return { show, hideObjects, showObjects };
};
export const useDrawGeojson = (
  geojson: GeoJSON,
  map: google.maps.Map | null,
  showDefault?: boolean,
  options?: google.maps.PolygonOptions &
    google.maps.RectangleOptions &
    google.maps.MarkerOptions &
    google.maps.CircleOptions &
    google.maps.PolylineOptions
) => {
  const mapObjects = useMemo(() => parseGeojson(geojson), [geojson]);
  return useShowMapObjects(mapObjects, map, showDefault, options);
};
