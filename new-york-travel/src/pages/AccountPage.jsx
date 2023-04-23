import { Fragment } from "react";
import Account from "../components/body/Account";
import Styler from "../components/UI/Styler";

const AccountPage = (props) => {
  return (
    <Fragment>
      <Styler innerHeight={"fit-content"} includeNavBar={true}>
        <Account loggedIn={props.loggedIn} userInfo={props.userInfo} />
      </Styler>
    </Fragment>
  );
};

export default AccountPage;
