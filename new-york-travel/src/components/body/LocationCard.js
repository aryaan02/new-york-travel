import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  HStack,
  Box,
  CardHeader,
  SimpleGrid,
} from "@chakra-ui/react";
import ButtonStyler from "../UI/ButtonStyler";

const LocationCard = (props) => {
  const selectDestination = () => {
    props.addDestination(props.location);
    props.onClose();
  };

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
      direction={{ base: "column", sm: "column" }}
      overflow="hidden"
      variant="outline"
      mt={5}
    >
        <CardHeader>
          <Heading size="md">{name}</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid minChildWidth={"150px"}>
            <Box>
              {openHoursMon && (
                <Box py="2">
                  <Text>
                    <strong>Business Hours:</strong>
                  </Text>
                  <HStack>
                    <Box width={"7rem"}>
                      <Text>Monday:</Text>
                      <Text>Tuesday:</Text>
                      <Text>Wednesday:</Text>
                      <Text>Thursday:</Text>
                      <Text>Friday:</Text>
                      <Text>Saturday:</Text>
                      <Text>Sunday:</Text>
                    </Box>
                    <Box>
                      <Text>{openHoursMon}</Text>
                      <Text>{openHoursTue}</Text>
                      <Text>{openHoursWed}</Text>
                      <Text>{openHoursThu}</Text>
                      <Text>{openHoursFri}</Text>
                      <Text>{openHoursSat}</Text>
                      <Text>{openHoursSun}</Text>
                    </Box>
                  </HStack>
                </Box>
              )}
              <Text py="2">
                <strong>Type:</strong> {type}
              </Text>
              <Text py="2">
                <strong>Address:</strong> {address}
              </Text>
            </Box>
            <Box>
              <Image
                src={`../photos/${name}.jpg`}
                alt={name}
                boxSize="300px"
                objectFit="cover"
                border="20px"
                onError={(e) => {
                  e.target.src="../photos/no-image.jpg"
                }}
                margin="auto"
              ></Image>
            </Box>
          </SimpleGrid>
        </CardBody>
        <CardFooter>
          <ButtonStyler
            onClick={selectDestination}
          >
            Add to Itinerary
          </ButtonStyler>
        </CardFooter>
    </Card>
  );
};

export default LocationCard;
