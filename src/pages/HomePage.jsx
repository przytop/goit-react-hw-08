import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={css.container}>
        <div className={css.welcome}>
          <h1 className={css.title}>Welcome to Your Contact Manager!</h1>
          <p>
            The perfect tool to keep all your contacts organized and easily
            accessible. Whether you're managing personal relationships, business
            connections, or anything in between, this app is designed to
            simplify your life.
          </p>
        </div>
        <div className={css.description}>
          <div>
            <h2 className={css.title}>Features:</h2>
            <ul>
              <li>Add New Contacts</li>
              <li>Search and Filter</li>
              <li>Edit and Delete</li>
              <li>User-Friendly Interface</li>
            </ul>
          </div>
          <div>
            <h2 className={css.title}>Getting Started:</h2>
            <ol>
              <li>Create an Account</li>
              <li>Add Contacts</li>
              <li>Search for Contacts</li>
              <li>Manage Your Contacts</li>
            </ol>
          </div>
        </div>
        <div>
          <h2 className={css.title}>Ready to get started?</h2>
          <Link to="/register" className={css.getStartedButton}>
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
