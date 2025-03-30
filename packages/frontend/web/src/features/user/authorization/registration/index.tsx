import { useAuthMutation } from "@/store/user";
import { useFormik } from "formik";
import React from "react";
import {
  RegistrationRegisterButton,
  RegistrationContainer,
  RegistrationEmailInput,
  RegistrationLoginLink,
  RegistrationPasswordInput,
  RegistrationTextInput,
  RegistrationTitle,
  RegistrationCard,
} from "@/features/user/authorization/registration/style";
import { useTranslations } from "@/utils/translations";
import { lazy, object, string } from "yup";
import * as yup from "yup";
export const RegistrationSchema = lazy(
  (values: RegistrationForm) =>
    object({
      name: string().required(),
      email: string()
        .required()
        .matches(/(.+)@(.+)\.(.+)/),
      password: string().required().min(8),
      passwordRepeat: string()
        .required()
        .test({
          name: "equal-password",
          test: (value) => value === values.password,
        }),
      comment: string(),
    }) as yup.Schema<RegistrationForm>
);
export type RegistrationForm = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  comment: string;
};
export const RegistrationScreen = () => {
  const [auth, { data, isLoading }] = useAuthMutation();
  const strings = useTranslations();
  const form = useFormik<RegistrationForm>({
    onSubmit(values) {
      auth({
        providerArgs: {
          identifier: values.email,
          password: values.password,
        },
        profileToRegister: {
          email: values.email,
          username: values.name,
          password: values.password,
          name: values.name,
          comment: values.comment,
        },
      });
    },
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      comment: "",
    },
    validationSchema: RegistrationSchema,
  });
  return (
    <RegistrationContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.submitForm();
        }}
      >
        <RegistrationCard>
          <RegistrationTitle variant={"h6"}>
            {strings["registration.title"]}
          </RegistrationTitle>
          <RegistrationTextInput
            required={true}
            error={!!form.submitCount && !!form.errors.name}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={strings["registration.name-placeholder"]}
            label={strings["registration.name-label"]}
            value={form.values.name}
            onChange={({ target: { value } }) => {
              form.setFieldValue("name", value);
            }}
          />
          <RegistrationEmailInput
            required={true}
            placeholder={"example@email.com"}
            error={!!form.submitCount && !!form.errors.email}
            InputLabelProps={{
              shrink: true,
            }}
            label={strings["registration.email-label"]}
            value={form.values.email}
            onChange={({ target: { value } }) => {
              form.setFieldValue("email", value);
            }}
          />
          <RegistrationPasswordInput
            type={"password"}
            required={true}
            error={!!form.submitCount && !!form.errors.password}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={strings["registration.password-placeholder"]}
            label={strings["registration.password-label"]}
            value={form.values.password}
            onChange={({ target: { value } }) => {
              form.setFieldValue("password", value);
            }}
          />
          <RegistrationPasswordInput
            type={"password"}
            required={true}
            error={!!form.submitCount && !!form.errors.passwordRepeat}
            InputLabelProps={{
              shrink: true,
            }}
            label={strings["registration.password-repeat-label"]}
            placeholder={strings["registration.password-repeat-placeholder"]}
            value={form.values.passwordRepeat}
            onChange={({ target: { value } }) => {
              form.setFieldValue("passwordRepeat", value);
            }}
          />
          <RegistrationTextInput
            InputLabelProps={{
              shrink: true,
            }}
            multiline={true}
            rows={3}
            label={strings["registration.comment-label"]}
            placeholder={strings["registration.comment-placeholder"]}
            value={form.values.comment}
            onChange={({ target: { value } }) => {
              form.setFieldValue("comment", value);
            }}
          />
          <RegistrationRegisterButton
            size={"large"}
            type={"submit"}
            variant={"contained"}
          >
            {strings["registration.register-button"]}
          </RegistrationRegisterButton>
          <RegistrationLoginLink to={"/login"}>
            {strings["registration.login-link"]}
          </RegistrationLoginLink>
        </RegistrationCard>
      </form>
    </RegistrationContainer>
  );
};
