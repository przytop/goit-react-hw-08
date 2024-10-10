import { useDispatch } from "react-redux";
import { setFilters } from "../redux/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setFilters(event.target.value));
  };

  return (
    <div className={css.div}>
      <label>Find contacts by name </label>
      <input type="text" onChange={handleSearch} />
    </div>
  );
}
