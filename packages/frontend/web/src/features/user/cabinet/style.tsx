import styled from "@emotion/styled";
import { List, ListItemButton, ListItemButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

export const CabinetLayoutContainer = styled("div")`
  display: flex;
  padding: 50px;
  gap: 50px;
  justify-content: center;
`;
export const CabinetLayoutContainerSpace = styled("div")`
  max-width: 220px;
  flex: 1;
`;

export const CabinetLayoutInnerInnerContainer = styled("div")`
  display: flex;
  max-width: 900px;
  justify-content: flex-start;

  flex: 1;
  gap: 50px;
`;
export const CabinetLayoutInnerContainer = styled("div")`
  display: flex;
  max-width: 1120px;
  justify-content: flex-start;
  flex: 1;
`;
export const CabinetLayoutMenu = styled(List)`
  width: 220px;
  align-items: flex-end;
`;
export const CabinetLayoutMenuItemComponent = (
  props: ListItemButtonProps & { to: string }
) => (
  //@ts-ignore
  <ListItemButton {...props} component={Link} />
);
export const CabinetLayoutMenuItem = styled(CabinetLayoutMenuItemComponent)``;
export const CabinetLayoutMenuLogoutButton = styled(ListItemButton)`
  color: red;
`;
