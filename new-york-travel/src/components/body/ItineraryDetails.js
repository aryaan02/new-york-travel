import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ButtonStyler from "../UI/ButtonStyler";

const ItineraryDetails = (props) => {
  const [itinDetails, setItinDetails] = useState({});
  const [flightLink, setFlightLink] = useState("");
  const [residenceLocation, setResidenceLocation] = useState("");
  const [startDate, setStartDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const [endDate, setEndDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const id = props.itinId;
  let userId = Cookies.get("user_id");

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`http://localhost:5000/itinerary-entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itin_id: id, user_id: userId }),
      });
      const data = await response.json();
      return await data;
    };

    fetchDetails().then((data) => {
      setItinDetails(data);
      let startDateList = data.start_date.split("-");
      let endDateList = data.end_date.split("-");
      setStartDate({
        day: startDateList[2],
        month: startDateList[1],
        year: startDateList[0],
      });
      setEndDate({
        day: endDateList[2],
        month: endDateList[1],
        year: endDateList[0],
      });
    });

    // Fetch user info
    const fetchUserInfo = async () => {
      const response = await fetch(`http://localhost:5000/user-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await response.json();
      return await data;
    };
    fetchUserInfo().then((data) => {
      setResidenceLocation(
        `${data[0]["residence_city"]},${data[0]["residence_state"]}`
      );
    });
  }, [userId, id]);

  useEffect(() => {
    setFlightLink(
      `https://www.expedia.com/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from%3A${residenceLocation}%2Cto%3ANew+York+(NYC+-+All+Airports)%2Cdeparture%3A${startDate.month}%2F${startDate.day}%2F${startDate.year}TANYT&options=cabinclass%3Aeconomy&leg2=from%3ANew+York+(NYC+-+All+Airports)%2Cto%3A${residenceLocation}%2Cdeparture%3A${endDate.month}%2F${endDate.day}%2F${endDate.year}TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY&fromDate=${`${startDate.month}%2F${startDate.day}%2F${startDate.year}`}&toDate=${`${endDate.month}%2F${endDate.day}%2F${endDate.year}`}&d1=${`${startDate.year}-${startDate.month}-${startDate.day}`}&d2=${`${endDate.year}-${endDate.month}-${endDate.day}`}`
    );
  }, [residenceLocation, startDate, endDate]);

  const flightButtonHandler = () => {
    window.open(flightLink, "_blank");
  };

  return (
    <VStack>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        width="full"
        textAlign="center"
        bg="#244070DD"
        border="solid 3px #4460D099"
        color="#FDFDF0"
      >
        <Stack width="full">
          <CardBody>
            <Heading size="md">{itinDetails.itin_name}</Heading>
            <Text py={2}>{itinDetails.itin_description}</Text>
            <Text py={2}>
              <strong>Start Date: </strong>
              {itinDetails.start_date}
            </Text>
            <Text py={2}>
              <strong>End Date: </strong>
              {itinDetails.end_date}
            </Text>
          </CardBody>
        </Stack>
      </Card>
      <ButtonStyler colorScheme="yellow" onClick={flightButtonHandler}>
        Order Flight
      </ButtonStyler>
      {itinDetails.hasOwnProperty("dest_list") && (
        <VerticalTimeline
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#244070", color: "#244070" }}
          contentArrowStyle={{ borderRight: "7px solid #244070" }}
          iconStyle={{ background: "#244070", color: "#244070" }}
          lineColor="#FDFDF0"
        >
          {itinDetails.dest_list.map((dest, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: "#244070", color: "#FDFDF0", outline: "solid 3px #FDFDF0" }}
              contentArrowStyle={{
                borderRight: "7px solid #FDFDF0",
              }}
              date={dest.visit_date}
              iconStyle={{ background: "#244070", color: "#244070" }}
            >
              <h3 className="vertical-timeline-element-title">
                {dest.loc_name}
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                {dest.loc_addr}
              </h4>
              <p>
                {dest.visit_start_time} - {dest.visit_end_time}
              </p>
              <p>{dest.visit_note}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      )}
      {/* <Button colorScheme="red" onClick={showDetailsHandler}>
        Back
      </Button> */}
    </VStack>
  );
};

export default ItineraryDetails;
