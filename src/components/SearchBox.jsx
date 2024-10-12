import { useDispatch } from "react-redux";
import { setFilters } from "../redux/contacts/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setFilters(event.target.value));
  };

  return (
    <div className={css.search}>
      <label>Search by name or phone number</label>
      <input type="text" onChange={handleSearch} />
    </div>
  );
}
