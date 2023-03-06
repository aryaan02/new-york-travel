import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBarContainer from "./NavBarContainer";
import Logo from "./Logo";

const NavBar = (props) => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/");
  };

  return (
    <NavBarContainer>
      <Logo />
      <Button colorScheme="#2A4365" onClick={navigateLogin}>
        Log Out
      </Button>
    </NavBarContainer>
  );
};

export default NavBar;
