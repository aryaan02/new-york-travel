import React, { useEffect, useState, Fragment } from "react";
import {
  Flex,
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ItineraryDisplay from "./ItineraryDisplay";
import ItineraryDetails from "./ItineraryDetails";
import ButtonStyler from "../UI/ButtonStyler";

const Account = (props) => {
  const [itineraries, setItineraries] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [itinId, setItinId] = useState("");
  const navigate = useNavigate();

  // let userInfo = props.userInfo;
  let userId = Cookies.get("user_id");
  let firstName = Cookies.get("first_name");

  const logged_in = Cookies.get("logged_in");

  const showDetailsHandler = () => {
    setShowDetails(true);
  };

  const itinIdHandler = (id) => {
    setItinId(id);
  };

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
    <Fragment>
      {!showDetails && (
        <Flex width="full" align="center" justifyContent="center">
          <VStack p={2}>
            <Box
              m={10}
              p={3}
              textAlign="center"
            >
              <Heading size="3xl">Welcome, {firstName}!</Heading>
            </Box>
            <Box m={10} textAlign="center">
              <Text fontSize={45}>Your Itineraries</Text>
              <ButtonStyler mt={10} onClick={navigateNewItinerary}>
                Add New Itinerary
              </ButtonStyler>
              {itineraries.length > 0 && (
                <SimpleGrid
                  columns={[1,1,1,2]}
                  spacing={[10]}
                  mt={6}
                  p={3}
                  borderRadius="1rem"
                  justifyItems="center"
                >
                  {itineraries.map((itinerary, index) => (
                    <ItineraryDisplay
                      key={index}
                      itinerary={itinerary}
                      setShowDetails={showDetailsHandler}
                      setItinId={itinIdHandler}
                    />
                  ))}
                  
                </SimpleGrid>
              )}
            </Box>
          </VStack>
        </Flex>
      )}
      {showDetails && (
        <ItineraryDetails itinId={itinId} setShowDetails={setShowDetails} />
      )}
    </Fragment>
  );
};

export default Account;
