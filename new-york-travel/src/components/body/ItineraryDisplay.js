import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";

const ItineraryDisplay = (props) => {
  const navigateItineraryDetails = () => {
    props.setShowDetails(true);
    props.setItinId(props.itinerary.itin_id);
  };

  const [descriptionText, setDescriptionText] = useState("");

  useEffect(() => {
    if (props.itinerary.itin_description) {
      if (props.itinerary.itin_description.length > 20) {
        setDescriptionText(
          props.itinerary.itin_description.slice(0, 20) + "..."
        );
      } else {
        setDescriptionText(props.itinerary.itin_description);
      }
    }
  }, [props]);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width={[ "18rem", "15rem" ]}
      height="15rem"
    >
      <Stack width="full">
        <CardBody>
          <Heading size="md">{props.itinerary.itin_name}</Heading>
          <Box height="2.5rem">
            <Text py={2}>{descriptionText}</Text>
          </Box>
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
            mt="1rem"
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
