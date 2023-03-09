import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";

const ItineraryDetails = (props) => {
  const [itinDetails, setItinDetails] = useState({});
  const id = props.itinId;
  let userId = Cookies.get("user_id");

  const showDetailsHandler = () => {
    props.setShowDetails(false);
  };

  useEffect(() => {
    console.log(id);
    console.log(userId);
    const fetchDetails = async () => {
      const response = await fetch(`http://localhost:5000/itinerary-entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itin_id: id, user_id: userId }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      return await data;
    };

    fetchDetails().then((data) => {
      console.log(data);
      setItinDetails(data);
    });
  }, [userId, id]);

  return (
    <VStack>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        width="full"
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
      {itinDetails.hasOwnProperty("dest_list") &&
        itinDetails.dest_list.map((dest, index) => (
          <Card key={index}>
            <CardBody>
              <Heading size="md">
                <strong>Location Name:</strong>
                {dest.loc_name}
              </Heading>
              <Text py={2}>Addrss: {dest.loc_addr}</Text>
              <Text py={2}>Visit Date: {dest.visit_date}</Text>
              <Text py={2}>Visit Start Time: {dest.visit_start_time}</Text>
              <Text py={2}>Visit End Time: {dest.visit_end_time}</Text>
              <Text py={2}>Visit Note: {dest.visit_note}</Text>
            </CardBody>
          </Card>
        ))}
      <Button colorScheme="red" size="sm" onClick={showDetailsHandler}>
        Back
      </Button>
    </VStack>
  );
};

export default ItineraryDetails;
