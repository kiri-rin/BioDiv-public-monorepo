import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { CommonPaper } from "@/components/common/common";
import { Link } from "react-router-dom";
export const LoginContainer = styled("div")`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const LoginCard = styled(CommonPaper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 600px;
  padding: 24px;
  margin-bottom: 80px;
`;
export const LoginTitle = styled(Typography)`
  margin-bottom: 12px;
`;
export const LoginEmailInput = styled(TextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const LoginPasswordInput = styled(TextField)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const LoginSubmitButton = styled(Button)`
  align-self: center;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 12px;
`;
export const LoginRegistrationLink = styled(Link)`
  align-self: center;
`;
