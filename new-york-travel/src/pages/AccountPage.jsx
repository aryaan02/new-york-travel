import { Fragment } from "react";
import Account from "../components/body/Account";
import NavBar from "../components/header/NavBar";

const AccountPage = (props) => {
  return (
    <Fragment>
      <NavBar />
      <Account />
    </Fragment>
  );
};

export default AccountPage;
