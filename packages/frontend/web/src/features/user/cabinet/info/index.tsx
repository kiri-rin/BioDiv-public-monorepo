import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CabinetInfoContainer } from "@/features/user/cabinet/info/style";

export const CabinetInfo = () => {
  const user = useSelector((state: RootState) => state.user);
  return <CabinetInfoContainer>{user?.username}</CabinetInfoContainer>;
};
