import { Flex } from "@chakra-ui/react";
import React from "react";

const NavBarContainer = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={6}
      bg="#181D31"
      color="#FCFCDD"
      position="fixed"
      top="0"
      zIndex="5"
    >
      {props.children}
    </Flex>
  );
};

export default NavBarContainer;
