import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import { selectContacts } from "../redux/selectors";
import { addContact } from "../redux/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const initialValues = {
    name: "",
    phone: "",
  };

  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const { name, phone } = values;
    const duplicateName = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    const duplicatePhone = contacts.some((contact) => contact.phone === phone);

    if (duplicateName) {
      alert(`The name ${name} is already in your contacts.`);
    } else if (duplicatePhone) {
      alert(`The phone number ${phone} is already in your contacts.`);
    } else {
      dispatch(addContact({ name, phone }));
      actions.resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "is too short!")
      .max(50, "is too long!")
      .matches(/^[A-Za-z\s-]+$/, "must be a valid name!")
      .required("is required!"),
    phone: Yup.string()
      .min(7, "is too short!")
      .matches(/^[0-9-]+$/, "must be a valid phone number!")
      .required("is required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>
          Name
          <ErrorMessage name="name">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </label>
        <Field type="text" name="name" id={nameFieldId} />

        <label className={css.label} htmlFor={phoneFieldId}>
          Number
          <ErrorMessage name="phone">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </label>
        <Field type="text" name="phone" id={phoneFieldId} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
