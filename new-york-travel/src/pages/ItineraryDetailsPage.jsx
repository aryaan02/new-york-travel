import { Fragment } from "react";
import ItineraryDetails from "../components/body/ItineraryDetails";
import NavBar from "../components/header/NavBar";

const ItineraryDetailsPage = (props) => {

    console.log("hello from itin details page");

  return (
    <Fragment>
      <NavBar/>
      <ItineraryDetails />
    </Fragment>
  );
};

export default ItineraryDetailsPage;