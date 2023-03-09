import { Fragment } from "react";
import NewItineraryForm from "../components/body/NewItineraryForm";
import NavBar from "../components/header/NavBar";

const LoginPage = (props) => {

  return (
    <Fragment>
      <NavBar/>
      <NewItineraryForm />
    </Fragment>
  );
};

export default LoginPage;