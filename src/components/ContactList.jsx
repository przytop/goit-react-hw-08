import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../redux/contacts/selectors";
import Contact from "./Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contacts}>
      {filteredContacts.map((contact) => {
        return (
          <li className={css.contact} key={contact.id}>
            <Contact contact={contact} />
          </li>
        );
      })}
    </ul>
  );
}
