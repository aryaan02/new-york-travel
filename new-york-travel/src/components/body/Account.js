import React, { useEffect } from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Account = (props) => {
  let userInfo = props.userInfo;
  let firstName = userInfo.first_name;
  let lastName = userInfo.last_name;
  let residenceCity = userInfo.residence_city;
  let residenceState = userInfo.residence_state;

  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn === false) {
      navigate("/");
    }
  }, [props.loggedIn, navigate]);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box m={10} textAlign="center">
          <Heading>Welcome {firstName}</Heading>
          <Text mt={6}>Welcome to your account page!</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Account;