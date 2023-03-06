import React from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const Account = (props) => {

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box m={10} textAlign="center">
          <Heading>Welcome {props.name}</Heading>
          <Text mt={6}>Welcome to your account page!</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Account;