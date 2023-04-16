import { Fragment } from "react";
import ItineraryDetails from "../components/body/ItineraryDetails";
import NavBar from "../components/header/NavBar";

const ItineraryDetailsPage = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <ItineraryDetails />
    </Fragment>
  );
};

export default ItineraryDetailsPage;