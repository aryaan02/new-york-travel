import NewItineraryForm from "../components/body/NewItineraryForm";
import Styler from "../components/UI/Styler";

const LoginPage = (props) => {
  return (
    <Styler innerHeight={"fit-content"} includeNavBar={true}>
      <NewItineraryForm />
    </Styler>
  );
};

export default LoginPage;
