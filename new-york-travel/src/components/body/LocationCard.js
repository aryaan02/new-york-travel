import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  HStack,
  Box,
  CardHeader,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import ButtonStyler from "../UI/ButtonStyler";

const LocationCard = (props) => {
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
  const rating = props.location.loc_rating;
  const rating_count = props.location.loc_rating_count;

  // Add location to itinerary
  const selectDestination = () => {
    props.addDestination(props.location);
    props.onClose();
  };

  return (
    <Card
      direction={{ base: "column", sm: "column" }}
      overflow="hidden"
      variant="outline"
      mb={5}
      bg="#FDFDF0DD"
      border="solid 3px #4460D099"
      color="#244070"
    >
      <CardHeader>
        <Heading size="md">{name}</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid minChildWidth={"200px"}>
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
              <strong>Rating:</strong> {rating}/5 ({rating_count} reviews)
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
              border="5px solid #243A60"
              borderRadius="10px"
              onError={(e) => {
                e.target.src = "../photos/no-image.jpg";
              }}
              margin="auto"
            ></Image>
          </Box>
        </SimpleGrid>
      </CardBody>
      <CardFooter>
        <ButtonStyler onClick={selectDestination}>
          Add to Itinerary
        </ButtonStyler>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
