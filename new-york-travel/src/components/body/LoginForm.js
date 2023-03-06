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

const LoginForm = (props) => {
  // Set up variable states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to register page
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register");
  };
  const navigateAccount = (e) => {
    e.preventDefault();
    let state = {
      username: username,
      password: password,
    };
    console.log(JSON.stringify(state));
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(state),
    }).then((result) => {
      return;
    });
  };

  // Live updates text as user types
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box m={10} textAlign="left">
          <form>
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
            <Button onClick={navigateAccount} colorScheme="blue" width="full" mt={4} type="submit">
              Login
            </Button>
            <Text mt={4} textAlign="center">
              Don't have an account?{" "}
              <Link color="blue.500" onClick={navigateRegister}>
                Register
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginForm;
