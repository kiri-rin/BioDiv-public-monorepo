import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";

export const MapTrackItemContainer = styled(Paper)`
  margin-bottom: 16px;
  display: flex;
  padding: 16px;
  justify-content: space-between;
`;

export const MapTrackItemInfoContainer = styled("div")``;
export const MapTrackItemTitle = styled(Typography)`
  font-size: 16px;
`;
export const MapTrackItemSpecies = styled(Typography)`
  font-size: 14px;
`;
export const MapTrackItemButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
`;
