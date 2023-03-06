import { Flex } from "@chakra-ui/react";
import React from "react";

const NavBarContainer = (props) => {
    return (
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={6} bg="blue.500" color="white">
            {props.children}
        </Flex>
    );
};

export default NavBarContainer;