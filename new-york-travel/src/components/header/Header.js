import React from "react";

import { Flex, Box, Heading, HStack } from "@chakra-ui/react";
import { MdLocationCity, MdDirectionsSubway } from "react-icons/md";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <Flex as="header" align="center" justify="center" direction="column">
      <Box textAlign="center">
        <Heading fontFamily='DM Sans' as="h1" size={['2xl', '3xl']}>
          New York Travel
        </Heading>
      </Box>
      <HStack className={classes.icons}>
        <MdLocationCity />
        <MdDirectionsSubway />
      </HStack>
    </Flex>
  );
};

export default Header;
