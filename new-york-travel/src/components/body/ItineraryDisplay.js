import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import ButtonStyler from "../UI/ButtonStyler";

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
      height="fit-content"
      m={0}
      bg="#244070DD"
      border="solid 3px #4460D099"
      color="#FDFDF0"
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
          <ButtonStyler
            size="sm"
            mt="1rem"
            onClick={navigateItineraryDetails}
          >
            View Details
          </ButtonStyler>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default ItineraryDisplay;
