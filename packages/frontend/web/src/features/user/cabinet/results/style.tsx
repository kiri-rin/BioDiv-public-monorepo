import styled from "@emotion/styled";
import { Card, CircularProgress, List, Pagination } from "@mui/material";

export const CabinetUsersResultsContainer = styled(Card)`
  padding: 35px;
  max-width: 600px;
  flex: 1;
  position: relative;
`;
export const CabinetUsersResultsContainerLoadingBackdrop = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: center;
`;
export const CabinetUsersResultsContainerLoadingIndicator = styled(
  CircularProgress
)``;
export const CabinetUsersResultsPagination = styled(Pagination)`
  margin-left: auto;
`;
export const CabinetUsersResultsList = styled(List)`
  margin-top: 25px;
`;
