import React, { useEffect, useState } from "react";
import { Flex, Box, Heading, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ItineraryDisplay from "./ItineraryDisplay";

const Account = (props) => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  // let userInfo = props.userInfo;
  let userId = Cookies.get("user_id");
  let firstName = Cookies.get("first_name");
  let lastName = Cookies.get("last_name");
  let residenceCity = Cookies.get("residence_city");
  let residenceState = Cookies.get("residence_state");

  const logged_in = Cookies.get("logged_in");

  useEffect(() => {
    if (logged_in === "false") {
      navigate("/");
    }
  }, [logged_in, navigate]);

  const navigateNewItinerary = () => {
    navigate("/create-itinerary");
  };

  // Fetch user itineraries
  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(
        `http://localhost:5000/itineraries/${userId}`
      );
      const data = await response.json();
      return data;
    };
    fetchItineraries().then((data) => {
      setItineraries(data);
    });
  }, [userId]);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box m={10} textAlign="center">
          <Heading size="3xl">Welcome, {firstName}!</Heading>
        </Box>
        <Box m={10} textAlign="center">
          <Heading size="2xl">Your Itineraries</Heading>
          <Button colorScheme="blue" mt={10} onClick={navigateNewItinerary}>
            Add New Itinerary
          </Button>
          <VStack mt={6}>
            {itineraries.map((itinerary) => (
              <ItineraryDisplay key={itinerary.itin_id} itinerary={itinerary} />
            ))}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Account;
