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
  const moment = require("moment");

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

  let dayArray = [
    openHoursMon,
    openHoursTue,
    openHoursWed,
    openHoursThu,
    openHoursFri,
    openHoursSat,
    openHoursSun,
  ];

  const visitDateHandler = (e) => {
    let visitDate = new Date(e.target.value).getTime();
    let tripStartDay = new Date(props.itinStartDate).getTime();
    let tripEndDay = new Date(props.itinEndDate).getTime();
    if (visitDate < tripStartDay || visitDate > tripEndDay) {
      setError("Visit date must be between itinerary start and end date.");
    } else {
      setVisitDate(e.target.value);
      setError("")
    }
  };

  const visitStartTimeHandler = (e) => {
    let visitDateObject = new Date(visitDate);
    let visitDay = visitDateObject.getDay();
    let startTime = Date.parse("2011-10-10T" + e.target.value);
    if (dayArray[visitDay] === "Closed") {
      setError("Location closed on selected day.");
      return;
    } else if (dayArray[visitDay].includes(",")) {
      // Check multiple opening time ranges
      let validFlag = false;
      let openRanges = dayArray[visitDay].split(",");
      openRanges.map((x) => {
        console.log("Range: ", x);
        let range = x.split(" – ");
        let start = Date.parse(
          "2011-10-10:" + moment(range[0], ["h:mm A"]).format("HH:mm")
        );
        let end = Date.parse(
          "2011-10-10:" + moment(range[1], ["h:mm A"]).format("HH:mm")
        );
        let midnight = Date.parse(
          "2011-10-10:" + moment('12:00 AM', ["h:mm A"]).format("HH:mm")
        );
        if (end < start) {
          end = Date.parse(
            "2011-10-11:" + moment(range[1], ["h:mm A"]).format("HH:mm")
          );
          if (startTime > midnight) {
            startTime = Date.parse("2011-10-11T" + e.target.value);
          }
        }
        if (startTime >= start && startTime <= end) {
          validFlag = true;
        }
        return true;
      });
      if (validFlag) {
        setVisitStartTime(e.target.value);
        setError("")
      } else {
        setError("Invalid start time - not in opening hours");
      }
    } else if (dayArray[visitDay].includes(" – ")) {
      // Check single time range
      let range = dayArray[visitDay].split(" – ");
      let start = Date.parse(
        "2011-10-10:" + moment(range[0], ["h:mm A"]).format("HH:mm")
      );
      let end = Date.parse(
        "2011-10-10:" + moment(range[1], ["h:mm A"]).format("HH:mm")
      );
      let midnight = Date.parse(
        "2011-10-10:" + moment('12:00 AM', ["h:mm A"]).format("HH:mm")
      );
      if (end < start) {
        end = Date.parse(
          "2011-10-11:" + moment(range[1], ["h:mm A"]).format("HH:mm")
        );
        if (startTime > midnight) {
          startTime = Date.parse("2011-10-11T" + e.target.value);
        }
      }
      console.log(start);
      console.log(end);
      if (startTime >= start && startTime <= end) {
        setVisitStartTime(e.target.value);
        setError("")
      } else {
        setError("Invalid start time - not in opening hours");
      }
    } else {
      setVisitStartTime(e.target.value);
      setError("");
    }
  };

  const visitEndTimeHandler = (e) => {
    let visitDateObject = new Date(visitDate);
    let visitDay = visitDateObject.getDay();
    let endTime = Date.parse("2011-10-10T" + e.target.value);
    if (dayArray[visitDay] === "Closed") {
      setError("Location closed on selected day.");
      return;
    } else if (dayArray[visitDay].includes(",")) {
      // Check multiple opening time ranges
      let validFlag = false;
      let openRanges = dayArray[visitDay].split(",");
      openRanges.map((x) => {
        console.log("Range: ", x);
        let range = x.split(" – ");
        let start = Date.parse(
          "2011-10-10:" + moment(range[0], ["h:mm A"]).format("HH:mm")
        );
        let end = Date.parse(
          "2011-10-10:" + moment(range[1], ["h:mm A"]).format("HH:mm")
        );
        let midnight = Date.parse(
          "2011-10-10:" + moment('12:00 AM', ["h:mm A"]).format("HH:mm")
        );
        if (end < start) {
          end = Date.parse(
            "2011-10-11:" + moment(range[1], ["h:mm A"]).format("HH:mm")
          );
          if (endTime > midnight) {
            endTime = Date.parse("2011-10-11T" + e.target.value);
          }
        }
        if (endTime >= start && endTime <= end) {
          validFlag = true;
        }
        return true;
      });
      if (validFlag) {
        setVisitStartTime(e.target.value);
        setError("")
      } else {
        setError("Invalid end time - not in opening hours");
      }
    } else if (dayArray[visitDay].includes(" – ")) {
      // Check single time range
      let range = dayArray[visitDay].split(" – ");
      let start = Date.parse(
        "2011-10-10:" + moment(range[0], ["h:mm A"]).format("HH:mm")
      );
      let end = Date.parse(
        "2011-10-10:" + moment(range[1], ["h:mm A"]).format("HH:mm")
      );
      let midnight = Date.parse(
        "2011-10-10:" + moment('12:00 AM', ["h:mm A"]).format("HH:mm")
      );
      if (end < start) {
        end = Date.parse(
          "2011-10-11:" + moment(range[1], ["h:mm A"]).format("HH:mm")
        );
        if (endTime > midnight) {
          endTime = Date.parse("2011-10-11T" + e.target.value);
        }
      }
      console.log(start);
      console.log(end);
      if (endTime >= start && endTime <= end) {
        setVisitStartTime(e.target.value);
        setError("")
      } else {
        setError("Invalid end time - not in opening hours");
      }
    } else {
      setVisitStartTime(e.target.value);
      setError("");
    }
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
  }, [visitDate, visitStartTime, visitEndTime, visitNote]);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width="full"
    >
      <VStack width="full">
        <CardBody>
          <Heading size="md">{props.destination.location.loc_name}</Heading>

          {openHoursMon && (
            <Text py="2">
              <strong>Business Hours:</strong>
              <HStack>
                <VStack>
                  <Text textAlign={"left"}>Monday:</Text>
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
          {error && (
            <Text mt={2} color="red">
              {error}
            </Text>
          )}
          <Center mt={6}>
            <Button
              colorScheme="red"
              onClick={removeDestinationHandler}
            >
              Remove Destination
            </Button>
          </Center>
        </CardBody>
      </VStack>
    </Card>
  );
};

export default DestinationDisplay;
