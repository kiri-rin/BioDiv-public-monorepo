import {
  LoginCard,
  LoginContainer,
  LoginEmailInput,
  LoginPasswordInput,
  LoginRegistrationLink,
  LoginSubmitButton,
  LoginTitle,
} from "@/features/user/authorization/login/style";
import { useAuthMutation } from "@/store/user";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "@/utils/translations";

import { lazy, object, string } from "yup";
import * as yup from "yup";
export const LoginSchema = lazy(
  //TODO error messages and set MUI language and theme
  (values: LoginForm) =>
    object({
      email: string()
        .required()
        .matches(/(.+)@(.+)\.(.+)/),
      password: string().required().min(8),
    }) as yup.Schema<LoginForm>
);
export type LoginForm = {
  email: string;
  password: string;
};
export const LoginScreen = () => {
  const [auth, authState] = useAuthMutation();
  const navigate = useNavigate();
  const strings = useTranslations();
  const { values, submitForm, setFieldValue, errors, submitCount } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit(values) {
      auth({
        providerArgs: { identifier: values.email, password: values.password },
      });
    },
  });
  useEffect(() => {
    if (authState.data) {
      navigate("/cabinet");
    }
  }, [authState.data]);
  return (
    <LoginContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <LoginCard>
          <LoginTitle variant={"h6"}>{strings["login.title"]}</LoginTitle>
          <LoginEmailInput
            error={!!submitCount && !!errors.email}
            required={true}
            placeholder={"example@email.com"}
            InputLabelProps={{
              shrink: true,
            }}
            label={strings["registration.email-label"]}
            value={values.email}
            onChange={({ target: { value } }) => setFieldValue("email", value)}
          />
          <LoginPasswordInput
            InputLabelProps={{
              shrink: true,
            }}
            required={true}
            error={!!submitCount && !!errors.password}
            placeholder={strings["login.password-placeholder"]}
            type={"password"}
            label={strings["registration.password-label"]}
            value={values.password}
            onChange={({ target: { value } }) =>
              setFieldValue("password", value)
            }
          />
          <LoginSubmitButton
            type={"submit"}
            size={"large"}
            variant={"contained"}
            disabled={authState.isLoading}
          >
            {strings["login.login-button"]}
          </LoginSubmitButton>
          <LoginRegistrationLink to={"/registration"}>
            {strings["login.registration-link"]}
          </LoginRegistrationLink>
        </LoginCard>
      </form>
    </LoginContainer>
  );
};
