import React, { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LocationModal from "./LocationModal";
import DestinationDisplay from "./DestinationDisplay";
import Cookies from "js-cookie";

const NewItineraryForm = (props) => {
  const [locations, setLocations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [itineraryName, setItineraryName] = useState(null);
  const [itineraryDescription, setItineraryDescription] = useState(null);
  const [itineraryStartDate, setItineraryStartDate] = useState(null);
  const [itineraryEndDate, setItineraryEndDate] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const logged_in = Cookies.get("logged_in");
    if (logged_in === "false") {
      navigate("/");
    }
  }, [navigate]);

  const userId = Cookies.get("user_id");

  const submitItinerary = () => {
    let startDate = new Date(itineraryStartDate).getTime();
    let endDate = new Date(itineraryEndDate).getTime();
    if (startDate > endDate) {
      setError("Start date cannot be after the end date.");
      return;
    }

    let destinationArray = selectedDestinations.map((destination) => {
      return {
        locationId: destination.location.loc_id,
        visitDate: destination.visitDate,
        visitStartTime: destination.visitStartTime,
        visitEndTime: destination.visitEndTime,
        visitNote: destination.visitNote,
      };
    });
    let itinerary = {
      userId: userId,
      itinName: itineraryName,
      itinStartDate: itineraryStartDate,
      itinEndDate: itineraryEndDate,
      itinDescription: itineraryDescription,
      destList: destinationArray,
    };
    fetch("http://localhost:5000/new-itinerary", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(itinerary),
    }).then((result) => {
      if (result.status === 200) {
        // Itinerary creation successful
        console.log("Itinerary creation successful");
        navigate("/account");
      } else {
        // Itinerary creation failed
        console.log("Itinerary creation failed");
      }
    });
  };

  const addDestination = (destination) => {
    let extendedDestination = {
      location: destination,
      visitDate: null,
      visitStartTime: null,
      visitEndTime: null,
      visitNote: null,
    };
    setSelectedDestinations([...selectedDestinations, extendedDestination]);
  };

  // Set destination object at index to destination
  const updateDestination = useCallback(
    (destination, index) => {
      setSelectedDestinations([
        ...selectedDestinations.slice(0, index),
        destination,
        ...selectedDestinations.slice(index + 1),
      ]);
    },
    [selectedDestinations]
  );

  const removeDestination = (index) => {
    setSelectedDestinations([
      ...selectedDestinations.slice(0, index),
      ...selectedDestinations.slice(index + 1),
    ]);
  };

  // Form Handlers
  const itineraryNameHandler = (e) => {
    setItineraryName(e.target.value);
  };

  const itineraryDescriptionHandler = (e) => {
    setItineraryDescription(e.target.value);
  };

  const itineraryStartDateHandler = (e) => {
    setItineraryStartDate(e.target.value);
  };

  const itineraryEndDateHandler = (e) => {
    setItineraryEndDate(e.target.value);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch("http://localhost:5000/locations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        return data;
      } else {
        // Failed to fetch location
        console.log("Location query failed");
      }
    };
    fetchLocations().then((data) => {
      setLocations(data);
    });
  }, []);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box mb={10} width={["95%", "30rem"]}>
        <Box m={10} textAlign="center">
          <Heading size={["2xl", "3xl"]}>Create a New Itinerary</Heading>
        </Box>
        <Box textAlign="left">
          <form>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Itinerary Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Itinerary Name"
                  onChange={itineraryNameHandler}
                />
              </FormControl>
            </HStack>
            <HStack mt={6}>
              <FormControl>
                <FormLabel>Itinerary Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Itinerary Description (Optional)"
                  onChange={itineraryDescriptionHandler}
                />
              </FormControl>
            </HStack>
            <HStack mt={6}>
              <FormControl isRequired>
                <FormLabel>Itinerary Start Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Itinerary Start Date"
                  onChange={itineraryStartDateHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Itinerary End Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Itinerary End Date"
                  onChange={itineraryEndDateHandler}
                />
              </FormControl>
            </HStack>
            <VStack mt={6}>
              {selectedDestinations.map((destination, index) => (
                <DestinationDisplay
                  key={index}
                  destination={destination}
                  updateDestination={updateDestination}
                  removeDestination={removeDestination}
                  index={index}
                  itinStartDate={itineraryStartDate}
                  itinEndDate={itineraryEndDate}
                />
              ))}
              {error && <Text color="red.500">{error}</Text>}
            </VStack>
            <HStack mt={6}>
              <FormControl isRequired>
                <LocationModal
                  addDestination={addDestination}
                  locations={locations}
                />
              </FormControl>
            </HStack>
            <Button
              colorScheme="blue"
              width="full"
              mt={6}
              onClick={submitItinerary}
              type="submit"
            >
              Create Itinerary
            </Button>
            <Button
              colorScheme="red"
              width="full"
              mt={6}
              onClick={() => navigate("/account")}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default NewItineraryForm;
