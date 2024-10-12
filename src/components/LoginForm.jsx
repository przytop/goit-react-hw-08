import { useDispatch } from "react-redux";
import { useId } from "react";
import { logIn } from "../redux/auth/operations";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("login success");
      })
      .catch(() => {
        toast.error("login error");
      });

    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "must be a valid email!"
      )
      .required("is required!"),
    password: Yup.string().required("is required!"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form} autoComplete="on">
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

          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </>
  );
};
