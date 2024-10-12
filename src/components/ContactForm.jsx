import { useDispatch, useSelector } from "react-redux";
import { useId } from "react";
import { selectContacts } from "../redux/contacts/selectors";
import { addContact } from "../redux/contacts/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    const duplicateName = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    const duplicateNumber = contacts.some(
      (contact) => contact.number === number
    );

    if (duplicateName) {
      alert(`The name ${name} is already in your contacts.`);
    } else if (duplicateNumber) {
      alert(`The phone number ${number} is already in your contacts.`);
    } else {
      dispatch(addContact({ name, number }));
      actions.resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "is too short!")
      .max(50, "is too long!")
      .matches(/^[A-Za-z\s-]+$/, "must be a valid name!")
      .required("is required!"),
    number: Yup.string()
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

        <label className={css.label} htmlFor={numberFieldId}>
          Number
          <ErrorMessage name="number">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </label>
        <Field type="text" name="number" id={numberFieldId} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
