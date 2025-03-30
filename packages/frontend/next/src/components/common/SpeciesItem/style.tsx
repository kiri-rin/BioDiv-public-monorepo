import styled from "@emotion/styled";
import { Card, Paper, PaperProps, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
export const SpeciesItemContainer = styled(Paper)`
  margin-bottom: 16px;
`;
export const SpeciesItemTitleRowContainer = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const SpeciesItemImage = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  object-fit: cover;

  margin-right: 16px;
`;
export const SpeciesItemTitle = styled(Typography)``;
