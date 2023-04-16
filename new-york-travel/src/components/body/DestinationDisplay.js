import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  VStack,
} from "@chakra-ui/react";

const DestinationDisplay = (props) => {
  const [visitDate, setVisitDate] = useState(null);
  const [visitStartTime, setVisitStartTime] = useState(null);
  const [visitEndTime, setVisitEndTime] = useState(null);
  const [visitNote, setVisitNote] = useState(null);
  console.log(props);
  const openHoursMon = props.destination.location.loc_hours_mon;
  const openHoursTue = props.destination.location.loc_hours_tue;
  const openHoursWed = props.destination.location.loc_hours_wed;
  const openHoursThu = props.destination.location.loc_hours_thu;
  const openHoursFri = props.destination.location.loc_hours_fri;
  const openHoursSat = props.destination.location.loc_hours_sat;
  const openHoursSun = props.destination.location.loc_hours_sun;

  const visitDateHandler = (e) => {
    setVisitDate(e.target.value);
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

  useEffect(() => {
    let localDestination = props.destination;
    localDestination = {
      ...localDestination,
      visitDate: visitDate,
      visitStartTime: visitStartTime,
      visitEndTime: visitEndTime,
      visitNote: visitNote,
    };
    props.updateDestination(localDestination, props.index);
  }, [props, visitDate, visitStartTime, visitEndTime, visitNote]);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width="full"
    >
      <Stack width="full">
        <CardBody>
          <Heading size="md">{props.destination.location.loc_name}</Heading>

          {openHoursMon && (
            <Text py="2">
              <strong>Business Hours:</strong>
              <HStack>
                <VStack>
                  <Text textAlign={'left'}>Monday:</Text>
                  <Text>Tuesday:</Text>
                  <Text>Wednesday:</Text>
                  <Text>Thursday:</Text>
                  <Text>Friday:</Text>
                  <Text>Saturday:</Text>
                  <Text>Sunday:</Text>
                </VStack>
                <VStack>
                  <Text>{openHoursMon}</Text>
                  <Text>{openHoursTue}</Text>
                  <Text>{openHoursWed}</Text>
                  <Text>{openHoursThu}</Text>
                  <Text>{openHoursFri}</Text>
                  <Text>{openHoursSat}</Text>
                  <Text>{openHoursSun}</Text>
                </VStack>
              </HStack>
            </Text>
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
          <HStack mt={3}>
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
          </HStack>
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
          <HStack mt={3} align="center">
            <Center>
              <Button
                colorScheme="red"
                onClick={() => props.removeDestination(props.index)}
              >
                Remove Destination
              </Button>
            </Center>
          </HStack>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default DestinationDisplay;
