import React, { useEffect, useState, Fragment } from "react";
import {
  Flex,
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ItineraryDisplay from "./ItineraryDisplay";
import ItineraryDetails from "./ItineraryDetails";
import ButtonStyler from "../UI/ButtonStyler";

const Account = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itineraries, setItineraries] = useState([]);
  const [itinId, setItinId] = useState("");
  const navigate = useNavigate();

  // Get user id and first name from cookies
  let userId = Cookies.get("user_id");
  let firstName = Cookies.get("first_name");

  // Check if user is logged in
  const logged_in = Cookies.get("logged_in");

  // Set itinerary id handler
  const itinIdHandler = (id) => {
    setItinId(id);
  };

  // Navigate to home page if user is not logged in
  useEffect(() => {
    if (logged_in === "false") {
      navigate("/");
    }
  }, [logged_in, navigate]);

  // Navigate to new itinerary page
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
      <Flex width="full" align="center" justifyContent="center">
        <VStack p={2}>
          <Box m={10} p={3} textAlign="center">
            <Heading size="3xl">Welcome, {firstName}!</Heading>
          </Box>
          <Box m={10} textAlign="center">
            <Heading size="xl">Your Itineraries</Heading>
            <ButtonStyler mt={10} onClick={navigateNewItinerary}>
              Add New Itinerary
            </ButtonStyler>
            {itineraries.length > 0 && (
              <SimpleGrid
                columns={[1, 1, 1, 2]}
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
                    setItinId={itinIdHandler}
                    onOpen={onOpen}
                  />
                ))}
              </SimpleGrid>
            )}
          </Box>
        </VStack>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="6xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="#244070" border="solid 3px #4460D099" color="#FDFDF0" height="80vh">
          <ModalHeader pt={6} textAlign="center">
            <Heading>Itinerary Details</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <ItineraryDetails itinId={itinId} />
            </Box>
          </ModalBody>
          <ModalFooter margin={"auto"} >
            <ButtonStyler onClick={onClose}>Close</ButtonStyler>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Account;
