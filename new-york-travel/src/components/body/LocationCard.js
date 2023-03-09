import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

const LocationCard = (props) => {
  const selectDestination = () => {
    props.addDestination(props.location);
    props.onClose();
  };

  console.log(props.location);

  const name = props.location.loc_name;
  const openTime = props.location.loc_open_time;
  const closeTime = props.location.loc_close_time;
  const type = props.location.loc_type;
  const address = props.location.loc_addr;

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mt={5}
    >
      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>
          <Text py="2">
            <strong>Open Time:</strong> {openTime}
          </Text>
          <Text py="2">
            <strong>Close Time:</strong> {closeTime}
          </Text>
          <Text py="2">
            <strong>Type:</strong> {type}
          </Text>
          <Text py="2">
            <strong>Address:</strong> {address}
          </Text>
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={selectDestination}
          >
            Add to Itinerary
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default LocationCard;
