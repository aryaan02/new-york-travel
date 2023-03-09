import Header from "../components/header/Header";
import { Fragment } from "react";
import LoginForm from "../components/body/LoginForm";

const LoginPage = (props) => {

  return (
    <Fragment>
      <Header />
      <LoginForm loggedIn={props.loggedIn} setUser={props.setUser} setLoggedIn={props.setLoggedIn} />
    </Fragment>
  );
};

export default LoginPage;