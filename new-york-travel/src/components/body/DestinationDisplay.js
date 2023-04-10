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
    /*
    localDestination = { ...localDestination, visitDate: visitDate };
    console.log(localDestination);
    props.updateDestination(localDestination, props.index);
    */
  };

  const visitStartTimeHandler = (e) => {
    setVisitStartTime(e.target.value);
    /*
    localDestination = { ...localDestination, visitStartTime: visitStartTime };
    console.log(localDestination);
    props.updateDestination(localDestination, props.index);
    */
  };

  const visitEndTimeHandler = (e) => {
    setVisitEndTime(e.target.value);
    /*
    localDestination = { ...localDestination, visitEndTime: visitEndTime };
    console.log(localDestination);
    props.updateDestination(localDestination, props.index);
    */
  };

  const visitNoteHandler = (e) => {
    setVisitNote(e.target.value);
    /*
    localDestination = { ...localDestination, visitNote: visitNote };
    console.log(localDestination);
    props.updateDestination(localDestination, props.index);
    */
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
  }, [visitDate, visitStartTime, visitEndTime, visitNote]);

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

          {openHoursMon &&
          <Text py="2">
            <strong>Business Hours:</strong>
            <ul>
              <li>{openHoursMon}</li>
              <li>{openHoursTue}</li>
              <li>{openHoursWed}</li>
              <li>{openHoursThu}</li>
              <li>{openHoursFri}</li>
              <li>{openHoursSat}</li>
              <li>{openHoursSun}</li>
            </ul>
          </Text>
          }
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
        </CardBody>
      </Stack>
    </Card>
  );
};

export default DestinationDisplay;
