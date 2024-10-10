import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectLoading, selectError } from "../redux/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../redux/operations";
import "./App.css";
import { FaAddressBook } from "react-icons/fa";
import ContactForm from "./ContactForm";
import SearchBox from "./SearchBox";
import ContactList from "./ContactList";

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <FaAddressBook size="50" />
      <h1>Phonebook</h1>
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
    </>
  );
}
