import Header from "../components/header/Header";
import RegisterForm from "../components/body/RegisterForm";
import Styler from "../components/UI/Styler";

const RegisterPage = () => {
  return (
    <Styler innerHeight={"fit-content"} includeNavBar={false}>
      <Header />
      <RegisterForm />
    </Styler>
  );
};

export default RegisterPage;
