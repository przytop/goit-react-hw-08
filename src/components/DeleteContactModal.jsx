import { useDispatch } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contacts/operations";
import css from "./DeleteContactModal.module.css";

export default function DeleteContactModal({ isOpen, onClose, contact }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteContact(contact.id));
    dispatch(fetchContacts());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2>{contact.name}</h2>
        <form onSubmit={handleSubmit}>
          <p className={css.text}>
            Are you sure you want to delete this contact?
          </p>
          <div className={css.buttons}>
            <button type="submit">Delete</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
