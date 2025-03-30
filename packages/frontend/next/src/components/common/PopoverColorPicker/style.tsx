import styled from "@emotion/styled";
import { Popover } from "@mui/material";

export const PopoverColorPickerContainer = styled("div")``;
export const PopoverColorPickerButton = styled("button")<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  border-radius: 4px;
`;
export const PopoverColorPickerPopover = styled(Popover)``;
