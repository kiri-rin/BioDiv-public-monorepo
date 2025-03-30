import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import {
  LoginCard,
  LoginContainer,
  LoginSubmitButton,
  LoginTitle,
} from "@/features/user/authorization/login/style";

export const RegistrationContainer = styled(LoginContainer)``;
export const RegistrationCard = styled(LoginCard)``;
export const RegistrationTitle = styled(LoginTitle)``;
export const RegistrationTextInput = styled(TextField)`
  margin-top: 8px;
  margin-bottom: 8px;
`;
export const RegistrationEmailInput = styled(RegistrationTextInput)``;
export const RegistrationPasswordInput = styled(RegistrationTextInput)``;
export const RegistrationRegisterButton = styled(LoginSubmitButton)``;
export const RegistrationLoginLink = styled(Link)`
  align-self: center;
`;
