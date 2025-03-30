import { DrawingManager, GoogleMap, LoadScript } from "@react-google-maps/api";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url";
import { GoogleMapObject } from "@rrrcn/frontend-helpers/src/geometry/map/useDrawGeojson";
import { MapEditContextType } from "@rrrcn/frontend-helpers/src/geometry/map/edit-context";

const center = {
  lat: 44.745,
  lng: 68.523,
};
const styles = { width: "100%", height: 700 };
const libraries: Libraries = ["drawing", "geometry"];
const polygons: any[] = [];
export const MapDrawingContext = createContext<MapEditContextType>({
  onShapeReady: (shape: MapDrawingShape) => {},
  setOnShapeReady: () => {},
  drawing: false,
  setDrawing: () => {},
  setMap: () => {},
  setDrawingManager: () => {},
  showMapObjects: () => {},
  hideMapObjects: () => {},
});
type ShapeKeys = "overlay" | "circle" | "marker" | "polygon" | "rectangle";

export type MapDrawingShape =
  // | { type: "overlay"; shape: google.maps.drawing.OverlayCompleteEvent["overlay"] }
  | { type: google.maps.drawing.OverlayType.CIRCLE; shape: google.maps.Circle }
  | { type: google.maps.drawing.OverlayType.MARKER; shape: google.maps.Marker }
  | {
      type: google.maps.drawing.OverlayType.POLYGON;
      shape: google.maps.Polygon;
    }
  | {
      type: google.maps.drawing.OverlayType.RECTANGLE;
      shape: google.maps.Rectangle;
    };

export const MapEdit = ({ className }: { className?: string }) => {
  const {
    onShapeReady,
    setOnShapeReady,
    setDrawingManager,
    drawing,
    setDrawing,
    setMap,
  } = useContext(MapDrawingContext);

  const _onShapeReady = useCallback(
    (shapeKey: MapDrawingShape["type"]) =>
      (shape: MapDrawingShape["shape"]) => {
        console.log(onShapeReady);
        onShapeReady({ type: shapeKey, shape } as MapDrawingShape);
      },
    [onShapeReady]
  );
  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY || ""}
    >
      <GoogleMap
        onLoad={(map) => {
          setMap(map);
        }}
        center={center}
        zoom={5}
        mapContainerClassName={className}
        mapContainerStyle={styles}
      >
        {drawing && (
          <DrawingManager
            onLoad={(dw) => setDrawingManager(dw)}
            drawingMode={drawing === true ? undefined : drawing}
            // onOverlayComplete={_onShapeReady("overlay")}
            onCircleComplete={_onShapeReady(
              google.maps.drawing.OverlayType.CIRCLE
            )}
            onMarkerComplete={_onShapeReady(
              google.maps.drawing.OverlayType.MARKER
            )}
            onPolygonComplete={_onShapeReady(
              google.maps.drawing.OverlayType.POLYGON
            )}
            onRectangleComplete={_onShapeReady(
              google.maps.drawing.OverlayType.RECTANGLE
            )}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export const MapDrawingWrapper = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const [drawing, setDrawing] = useState<
    boolean | google.maps.drawing.OverlayType
  >(false);
  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager>();
  const [map, setMap] = useState<google.maps.Map>();
  const [onShapeReady, setOnShapeReady] = useState(
    useCallback(() => (shape: MapDrawingShape) => {}, [])
  );
  const showMapObjects = useCallback(
    (shapes: GoogleMapObject[]) => {
      shapes.forEach((shape) => shape.setMap(map || null));
    },
    [map]
  );
  const hideMapObjects = useCallback(
    (shapes: GoogleMapObject[]) => {
      shapes.forEach((shape) => shape.setMap(null));
    },
    [map]
  );
  return (
    <MapDrawingContext.Provider
      value={{
        drawing,
        setDrawing,
        onShapeReady,
        setOnShapeReady,
        drawingManager,
        setDrawingManager,
        map,
        setMap,
        showMapObjects,
        hideMapObjects,
      }}
    >
      <div>
        {children}
        <MapEdit className={className} />
      </div>
    </MapDrawingContext.Provider>
  );
};
