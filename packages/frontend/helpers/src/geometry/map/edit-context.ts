import { GoogleMapObject } from "./useDrawGeojson";
import { Dispatch, SetStateAction } from "react";
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

export type MapEditContextType = {
  onShapeReady: (shape: MapDrawingShape) => any;
  setOnShapeReady: Dispatch<SetStateAction<(shape: MapDrawingShape) => any>>;
  drawing: boolean | google.maps.drawing.OverlayType;
  setDrawing: Dispatch<
    SetStateAction<boolean | google.maps.drawing.OverlayType>
  >;
  map?: google.maps.Map;
  setMap: Dispatch<SetStateAction<google.maps.Map | undefined>>;
  drawingManager?: google.maps.drawing.DrawingManager;

  setDrawingManager: Dispatch<
    SetStateAction<google.maps.drawing.DrawingManager | undefined>
  >;
  showMapObjects: (shapes: GoogleMapObject[]) => any;
  hideMapObjects: (shapes: GoogleMapObject[]) => any;
};
