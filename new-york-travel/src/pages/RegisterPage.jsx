import Header from "../components/header/Header";
import { Fragment } from "react";
import RegisterForm from "../components/body/RegisterForm";

const RegisterPage = () => {
  return (
    <Fragment>
      <Header />
      <RegisterForm />
    </Fragment>
  );
};

export default RegisterPage;
