import {
  PopoverColorPickerButton,
  PopoverColorPickerContainer,
  PopoverColorPickerPopover,
} from "@/components/common/PopoverColorPicker/style";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { CommonSpeciesItem } from "@/components/common/SpeciesItem";
import { useRef } from "react";
import React from "react";

export const PopoverColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <PopoverColorPickerContainer>
      <PopoverColorPickerButton $color={color} onClick={handleClick} />
      <PopoverColorPickerPopover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <HexColorPicker
          color={color}
          defaultValue={color}
          onChange={onChange}
        />
        ;
      </PopoverColorPickerPopover>
    </PopoverColorPickerContainer>
  );
};
