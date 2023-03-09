import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBarContainer from "./NavBarContainer";
import Logo from "./Logo";
import Cookies from "js-cookie";

const NavBar = (props) => {
  
  const navigate = useNavigate();

  const navigateLogin = () => {
    //props.setLoggedIn(false);
    Cookies.set("logged_in", false);
    navigate("/");
  };

  return (
    <NavBarContainer>
      <Logo />
      <Button colorScheme="twitter" onClick={navigateLogin}>
        Log Out
      </Button>
    </NavBarContainer>
  );
};

export default NavBar;
