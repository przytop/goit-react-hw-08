import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/operations";
import css from "./Contact.module.css";
import { FaPhone, FaUser } from "react-icons/fa6";

export default function Contact({ id, name, phone }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <>
      <div className={css.info}>
        <p className={css.p}>
          <FaUser size="16" />
          {name}
        </p>
        <p className={css.p}>
          <FaPhone size="16" />
          {phone}
        </p>
      </div>

      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
