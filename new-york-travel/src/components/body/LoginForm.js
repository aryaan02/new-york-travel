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
            <Button colorScheme="blue" width="full" mt={4} type="submit">
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
