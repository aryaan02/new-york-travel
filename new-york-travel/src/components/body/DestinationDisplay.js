import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Text,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

const DestinationDisplay = (props) => {
  const updateDestination = props.updateDestination;
  const index = props.index;
  const destination = props.destination;

  const [visitDate, setVisitDate] = useState(null);
  const [visitStartTime, setVisitStartTime] = useState(null);
  const [visitEndTime, setVisitEndTime] = useState(null);
  const [visitNote, setVisitNote] = useState(null);
  const [error, setError] = useState("");

  const openHoursMon = props.destination.location.loc_hours_mon;
  const openHoursTue = props.destination.location.loc_hours_tue;
  const openHoursWed = props.destination.location.loc_hours_wed;
  const openHoursThu = props.destination.location.loc_hours_thu;
  const openHoursFri = props.destination.location.loc_hours_fri;
  const openHoursSat = props.destination.location.loc_hours_sat;
  const openHoursSun = props.destination.location.loc_hours_sun;

  const visitDateHandler = (e) => {
    let visitDate = new Date(e.target.value).getTime();
    let tripStartDay = new Date(props.itinStartDate).getTime();
    let tripEndDay = new Date(props.itinEndDate).getTime();
    if (visitDate < tripStartDay || visitDate > tripEndDay) {
      setError("Visit date must be between itinerary start and end date.");
    } else {
      setVisitDate(e.target.value);
      setError("");
    }
  };

  const visitStartTimeHandler = (e) => {
    setVisitStartTime(e.target.value);
  };

  const visitEndTimeHandler = (e) => {
    setVisitEndTime(e.target.value);
  };

  const visitNoteHandler = (e) => {
    setVisitNote(e.target.value);
  };

  const removeDestinationHandler = () => {
    props.removeDestination(index);
  };

  useEffect(() => {
    let localDestination = destination;
    localDestination = {
      ...localDestination,
      visitDate: visitDate,
      visitStartTime: visitStartTime,
      visitEndTime: visitEndTime,
      visitNote: visitNote,
    };
    updateDestination(localDestination, index);
    // eslint-disable-next-line
  }, [visitDate, visitStartTime, visitEndTime, visitNote, index]);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width="full"
      bg={"#243A60DD"}
      color={"#FCFCDD"}
      outline={"solid 5px #243A60"}
      alignContent={"center"}
    >
      <CardBody alignItems="left" padding={"30px"}>
        <Heading size="md">{props.destination.location.loc_name}</Heading>
        {openHoursMon && (
          <Box>
            <strong>Business Hours:</strong>
            <SimpleGrid columns={2}>
              <Text>Monday:</Text>
              <Text>{openHoursMon}</Text>
              <Text>Tuesday:</Text>
              <Text>{openHoursTue}</Text>
              <Text>Wednesday:</Text>
              <Text>{openHoursWed}</Text>
              <Text>Thursday:</Text>
              <Text>{openHoursThu}</Text>
              <Text>Friday:</Text>
              <Text>{openHoursFri}</Text>
              <Text>Saturday:</Text>
              <Text>{openHoursSat}</Text>
              <Text>Sunday:</Text>
              <Text>{openHoursSun}</Text>
            </SimpleGrid>
          </Box>
        )}
        <Text py="2">
          <strong>Address:</strong> {props.destination.location.loc_addr}
        </Text>
        <HStack mt={3}>
          <FormControl isRequired>
            <FormLabel>Visit Date: </FormLabel>
            <Input
              type="date"
              placeholder="Destination Visit Date"
              onChange={visitDateHandler}
            />
          </FormControl>
        </HStack>
        <SimpleGrid mt={3} minChildWidth={"30px"} spacing={5}>
          <FormControl isRequired>
            <FormLabel>Visit Start Time: </FormLabel>
            <Input
              type="time"
              placeholder="Destination Visit Start Time"
              onChange={visitStartTimeHandler}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Visit End Time: </FormLabel>
            <Input
              type="time"
              placeholder="Destination Visit End Time"
              onChange={visitEndTimeHandler}
            />
          </FormControl>
        </SimpleGrid>
        <HStack mt={3}>
          <FormControl>
            <FormLabel>Visit Note: </FormLabel>
            <Input
              type="Text"
              placeholder="Destination Visit Notes"
              onChange={visitNoteHandler}
            />
          </FormControl>
        </HStack>
        {error && (
          <Text mt={2} color="red">
            {error}
          </Text>
        )}
        <Center mt={6}>
          <Button
            colorScheme="red"
            onClick={removeDestinationHandler}
            width="full"
          >
            Remove Destination
          </Button>
        </Center>
      </CardBody>
    </Card>
  );
};

export default DestinationDisplay;
