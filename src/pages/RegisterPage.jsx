import { Helmet } from "react-helmet-async";
import { RegisterForm } from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegisterForm />
    </>
  );
}
