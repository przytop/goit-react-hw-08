import { useDispatch } from "react-redux";
import { useId } from "react";
import { register } from "../redux/auth/operations";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("register success");
      })
      .catch(() => {
        toast.error("register error");
      });

    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "is too short!").required("is required!"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "must be a valid email!"
      )
      .required("is required!"),
    password: Yup.string()
      .min(7, "is too short! Minimum 7 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/,
        "Password must contain at least one number and one symbol"
      )
      .required("is required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor={nameFieldId}>
          Username
          <ErrorMessage name="name">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </label>
        <Field type="text" name="name" id={nameFieldId} />

        <label className={css.label} htmlFor={emailFieldId}>
          Email
          <ErrorMessage name="email">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </label>
        <Field type="email" name="email" id={emailFieldId} />

        <label className={css.label} htmlFor={passwordFieldId}>
          Password
          <ErrorMessage name="password">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </label>
        <Field type="password" name="password" id={passwordFieldId} />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};
