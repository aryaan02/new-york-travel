import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ButtonStyler from "../UI/ButtonStyler";

const LoginForm = (props) => {
  // Set up variable states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

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
    // Send POST request to login
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(state),
    }).then((result) => {
      if (result.status === 200) {
        // Login successful - go to accounts page
        console.log("Login successful");
        setError(false);
        // Parse result JSON
        let resultPromise = result.json();
        resultPromise.then((result) => {
          // Set user object state
          let resultJSON = result;
          // props.setUser(resultJSON);
          // props.setLoggedIn(true);
          Cookies.set("user_id", resultJSON.user_id);
          Cookies.set("username", resultJSON.username);
          Cookies.set("first_name", resultJSON.first_name);
          Cookies.set("last_name", resultJSON.last_name);
          Cookies.set("residence_city", resultJSON.residence_city);
          Cookies.set("residence_state", resultJSON.residence_state);
          Cookies.set("logged_in", true);
          navigate("/account");
        })
      } else if (result.status === 401) {
        // Display login error message
        console.log("Login failed");
        setError(true);
      }
    });
  };

  useEffect(() => {
    if (props.loggedIn) {
      navigate("/account");
    }
  }, [props.loggedIn, navigate]);

  // Live updates text as user types
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <VStack>
        <Box p={3} textAlign="center">
          {error && (
            <Alert bg="red.400" status="error">
              <AlertIcon color="red.600" />
              <AlertTitle mr={2}>Login failed!</AlertTitle>
              <AlertDescription>
                Please check your username and password.
              </AlertDescription>
            </Alert>
          )}
        </Box>
        <Box>
          <Box textAlign="left">
            <form>
              <HStack>
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
              <ButtonStyler
                onClick={navigateAccount}
                width="full"
                mt={8}
                type="submit"
              >
                Login
              </ButtonStyler>
              <Text mt={4} textAlign="center">
                Don't have an account?{" "}
                <Link color="blue.200" onClick={navigateRegister}>
                  Register
                </Link>
              </Text>
            </form>
          </Box>
        </Box>
      </VStack>
    </Flex>
  );
};

export default LoginForm;
