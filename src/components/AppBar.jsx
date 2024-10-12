import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { AuthNav } from "./AuthNav";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import css from "./AppBar.module.css";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div>
          <NavLink className={css.link} to="/">
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink className={css.link} to="/contacts">
              Contacts
            </NavLink>
          )}
        </div>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </nav>
    </header>
  );
}
