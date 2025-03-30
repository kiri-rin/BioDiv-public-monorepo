import { Link, ListItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { removeDollarProps } from "@/components/utils";

export const CabinetUsersResultItemContainer = styled(ListItem)`
  border: 1px solid black;
`;
export const CabinetUsersResultItemInnerContainer = styled("div")`
  width: 100%;
`;
export const CabinetUsersResultItemTopRow = styled("div")`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;
export const CabinetUsersResultItemId = styled(Typography)`
  color: gray;
  margin-left: auto;
`;
export const CabinetUsersResultItemType = styled(Typography)``;
export const CabinetUsersResultItemStatusRow = styled("div")`
  display: flex;
`;
export const CabinetUsersResultItemStatus = styled(
  //@ts-ignore TODO fix
  Typography,
  removeDollarProps
)<{
  $status?: string;
}>`
  color: ${(props) => {
    switch (props.$status) {
      case "completed":
        return "green";
      case "error":
        return "red";
      case "processing":
      default:
        return "blue";
    }
  }};
`;
export const CabinetUsersResultItemLinksContainer = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;
export const CabinetUsersResultItemLink = styled(Link)``;

export const CabinetUsersResultItemBottomRow = styled("div")`
  display: flex;
  width: 100%;
`;
export const CabinetUsersResultItemDate = styled(Typography)`
  margin-left: auto;
`;
export const CabinetUsersResultExpiresDate = styled(Typography)`
  margin-left: auto;
  color: gray;
`;
