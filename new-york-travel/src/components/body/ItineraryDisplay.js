import React from "react";
import { Card, CardBody, Stack, Text, Heading, Button } from "@chakra-ui/react";

const ItineraryDisplay = (props) => {
  const navigateItineraryDetails = () => {
    props.setShowDetails(true);
    console.log(props.itinerary.itin_id);
    props.setItinId(props.itinerary.itin_id);
    // navigate(`/itinerary/${props.itinerary.itin_id}`);
  };
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width="full"
    >
      <Stack width="full">
        <CardBody>
          <Heading size="md">{props.itinerary.itin_name}</Heading>
          <Text py={2}>{props.itinerary.itin_description}</Text>
          <Text py={2}>
            <strong>Start Date: </strong>
            {props.itinerary.start_date}
          </Text>
          <Text py={2}>
            <strong>End Date: </strong>
            {props.itinerary.end_date}
          </Text>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={navigateItineraryDetails}
          >
            View Details
          </Button>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default ItineraryDisplay;
