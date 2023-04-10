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
  const openHoursMon = props.location.loc_hours_mon;
  const openHoursTue = props.location.loc_hours_tue;
  const openHoursWed = props.location.loc_hours_wed;
  const openHoursThu = props.location.loc_hours_thu;
  const openHoursFri = props.location.loc_hours_fri;
  const openHoursSat = props.location.loc_hours_sat;
  const openHoursSun = props.location.loc_hours_sun;
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
