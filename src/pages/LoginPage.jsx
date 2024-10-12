import { Helmet } from "react-helmet-async";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm />
    </>
  );
}
