import React, { useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Text,
  Link,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  // Set up variable states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [residenceCity, setResidenceCity] = useState("");
  const [residenceState, setResidenceState] = useState("");

  // Navigate to register page
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/");
  };

  // Live updates text as user types
  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const cityChangeHandler = (e) => {
    setResidenceCity(e.target.value);
  };
  const stateChangeHandler = (e) => {
    setResidenceState(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let state = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      residence_city: residenceCity,
      residence_state: residenceState,
    };
    console.log(JSON.stringify(state));
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(state),
    }).then((result) => {
      if (result.status === 200) {
        console.log("Registration successful");
        navigateLogin();
      } else {
        console.log("Registration failed");
      }
    });
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box m={5} textAlign="left">
          <form>
            <HStack mt={6}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="First Name"
                  onChange={firstNameChangeHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Last Name"
                  onChange={lastNameChangeHandler}
                />
              </FormControl>
            </HStack>
            <HStack mt={6}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Username"
                  onChange={usernameChangeHandler}
                />
              </FormControl>
            </HStack>
            <HStack mt={6}>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={passwordChangeHandler}
                />
              </FormControl>
            </HStack>
            <HStack mt={6}>
              <FormControl isRequired>
                <FormLabel>Residence City</FormLabel>
                <Input
                  type="text"
                  placeholder="Residence City"
                  onChange={cityChangeHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Residence State</FormLabel>
                <Input
                  type="text"
                  placeholder="Residence State"
                  onChange={stateChangeHandler}
                />
              </FormControl>
            </HStack>
            <Button colorScheme="blue" width="full" mt={4} onClick={handleRegister}>
              Register
            </Button>
            <Text mt={4} textAlign="center">
              Already have an account?{" "}
              <Link color="blue.500" onClick={navigateLogin}>
                Login
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
