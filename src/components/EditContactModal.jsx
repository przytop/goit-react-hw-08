import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts, updateContact } from "../redux/contacts/operations";
import css from "./EditContactModal.module.css";

export default function EditContactModal({ isOpen, onClose, contact }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateContact({ contactId: contact.id, contact: { name, number } })
    );
    dispatch(fetchContacts());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2 className={css.title}>Edit Contact</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <label className={css.label}>
            Name:
            <input
              className={css.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className={css.label}>
            Phone:
            <input
              className={css.input}
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </label>
          <div className={css.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
