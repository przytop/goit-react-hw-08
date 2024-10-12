import { useState } from "react";
import css from "./Contact.module.css";
import { FaPhone, FaUser } from "react-icons/fa6";
import EditContactModal from "./EditContactModal";
import DeleteContactModal from "./DeleteContactModal";

export default function Contact({ contact }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className={css.info}>
        <p className={css.p}>
          <FaUser size="16" />
          {contact.name}
        </p>
        <p className={css.p}>
          <FaPhone size="16" />
          {contact.number}
        </p>
      </div>

      <div className={css.buttons}>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contact={contact}
      />

      <DeleteContactModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        contact={contact}
      />
    </>
  );
}
