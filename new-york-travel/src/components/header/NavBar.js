import React from "react";
import ButtonStyler from "../UI/ButtonStyler";
import { useNavigate } from "react-router-dom";
import NavBarContainer from "./NavBarContainer";
import Logo from "./Logo";
import Cookies from "js-cookie";

const NavBar = (props) => {
  const navigate = useNavigate();

  // Navigate to login page
  const navigateLogin = () => {
    Cookies.set("logged_in", false);
    navigate("/");
  };

  return (
    <NavBarContainer>
      <Logo />
      <ButtonStyler onClick={navigateLogin}>
        Log Out
      </ButtonStyler>
    </NavBarContainer>
  );
};

export default NavBar;
