import Header from "../components/header/Header";
import LoginForm from "../components/body/LoginForm";
import Styler from "../components/UI/Styler";

const LoginPage = (props) => {
  return (
    <Styler innerHeight={"fit-content"} includeNavBar={false}>
      <Header />
      <LoginForm
        loggedIn={props.loggedIn}
        setUser={props.setUser}
        setLoggedIn={props.setLoggedIn}
      />
    </Styler>
  );
};

export default LoginPage;
