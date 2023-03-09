import { Fragment } from "react";
import Account from "../components/body/Account";
import NavBar from "../components/header/NavBar";

const AccountPage = (props) => {
  return (
    <Fragment>
      <NavBar setLoggedIn={props.setLoggedIn} />
      <Account loggedIn={props.loggedIn} userInfo={props.userInfo} />
    </Fragment>
  );
};

export default AccountPage;
