import styled from "@emotion/styled";
import { AppBar, Drawer } from "@mui/material";
import { GoogleMap, GoogleMapProps } from "@react-google-maps/api";

export const MapComponent = (
  props: Omit<GoogleMapProps, "mapContainerClassName"> & { className?: string }
) => <GoogleMap {...props} mapContainerClassName={props.className} />;

export const MapTopBar = styled(AppBar)`
  background-color: white;
  height: 100px;
`;
export const MainMap = styled(MapComponent)`
  height: 100%;
  margin-left: 390px;
`;
export const MainLeftDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 400px;
    box-sizing: border-box;
    padding: 24px;
    height: 100%;
  }
`;
export const MainTopRow = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: flex-start;
`;
