import Header from "../components/header/Header";
import { Fragment } from "react";
import LoginForm from "../components/body/LoginForm";

const LoginPage = () => {
  return (
    <Fragment>
      <Header />
      <LoginForm />
    </Fragment>
  );
};

export default LoginPage;