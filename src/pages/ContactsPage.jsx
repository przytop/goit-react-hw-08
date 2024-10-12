import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "../redux/contacts/selectors";
import { fetchContacts } from "../redux/contacts/operations";
import { MdContacts } from "react-icons/md";
import ContactForm from "../components/ContactForm";
import SearchBox from "../components/SearchBox";
import ContactList from "../components/ContactList";
import css from "./ContactsPage.module.css";

export default function TasksPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>

      <div className={css.container}>
        <MdContacts size="100" />
        <h1 className={css.title}>Contact Manager</h1>
        <ContactForm />
        <SearchBox />
        {loading && !error && (
          <div className="loader">
            <b>Request in progress...</b>
          </div>
        )}
        {error ? (
          <div className="error">
            <b>{error}</b>
          </div>
        ) : contacts.length > 0 ? (
          <ContactList />
        ) : (
          !loading && (
            <div className="empty">
              <b>No contacts available</b>
            </div>
          )
        )}
      </div>
    </>
  );
}
