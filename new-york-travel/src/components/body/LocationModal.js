import React, { useState, useEffect, Fragment } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Box,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import LocationCard from "./LocationCard";
import ButtonStyler from "../UI/ButtonStyler";
import InfiniteScroll from "react-infinite-scroll-component";

const LocationModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [locationList, setLocationList] = useState(props.locations);
  const [locationType, setLocationType] = useState("");
  const [locationName, setLocationName] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [dataLength, setDataLength] = useState(10);
  const [currIdx, setCurrIdx] = useState(11);
  const [items, setItems] = useState([]);

  // Reset location list and close modal
  const resetAndClose = () => {
    setLocationList(props.locations);
    setLocationType("");
    setLocationName("");
    onClose();
  };

  // Add new destination to itinerary
  const addNewDestination = (destination) => {
    props.addDestination(destination);
  };

  const filterLoc = (
    locationName,
    locationType,
    locationList,
    setLocationList
  ) => {
    console.log(locationName);
    console.log(locationType);
    setLocationList(
      locationList.filter((location) => {
        return (
          location.loc_name
            .toLowerCase()
            .includes(locationName.toLowerCase()) &&
          location.loc_type.includes(locationType)
        );
      })
    );
  };

  useEffect(() => {
    const delayFunc = setTimeout(() => {
      console.log("func called");
      filterLoc(locationName, locationType, props.locations, setLocationList);
      return;
    }, 300);
    return () => clearTimeout(delayFunc);
    // eslint-disable-next-line
  }, [locationName, locationType, setLocationList, props.locations]);

  useEffect(() => {
    setHasMore(true);
    setItems(locationList.slice(0, 10));
    setDataLength(items.length);
    setCurrIdx(items.length);
    // eslint-disable-next-line
  }, [locationList]);

  const filterName = (e) => {
    const delayFunc = setTimeout(() => {
      console.log("name filter called");
      setLocationName(e.target.value);
      return;
    }, 300);
    return () => clearTimeout(delayFunc);
  };

  const filterAttraction = (e) => {
    console.log("Filtering by attraction");
    setLocationType("Attraction");
  };

  const filterRestaurant = (e) => {
    console.log("Filtering by restaurant");
    setLocationType("Restaurant");
  };

  const filterCafe = (e) => {
    console.log("Filtering by cafe");
    setLocationType("Cafe");
  };

  const filterHotel = (e) => {
    console.log("Filtering by hotel");
    setLocationType("Hotel");
  };

  const filterBar = (e) => {
    console.log("Filtering by bar");
    setLocationType("Bar");
  };

  const filterAll = (e) => {
    console.log("Filtering by all");
    setLocationType("");
  };

  const fetchLocations = () => {
    console.log("fetching locations");
    let newItems = [];
    for (let i = currIdx; i < currIdx + 10; i++) {
      if (i < locationList.length) {
        newItems.push(locationList[i]);
      }
    }

    setItems([...items, ...newItems]);
    setCurrIdx(currIdx + newItems.length);
    setDataLength(items.length + newItems.length);

    if (currIdx >= locationList.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setLocationList(props.locations);
  }, [props.locations]);

  return (
    <Fragment>
      <ButtonStyler width="full" onClick={onOpen}>
        Add Destination
      </ButtonStyler>
      <Modal
        isOpen={isOpen}
        onClose={resetAndClose}
        scrollBehavior="inside"
        size="4xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="#244070DD"
          border="solid 3px #4460D099"
          color="#FDFDF0"
        >
          <ModalHeader pt={6} textAlign="center">
            <Heading>Select a Location</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <SimpleGrid columns={2} spacingX={10}>
                <FormLabel optionalIndicator>Search for a location:</FormLabel>
                <FormLabel optionalIndicator>Filter by category:</FormLabel>
                <Input onChange={filterName} />
                <Menu>
                  <MenuButton borderRadius="3px" border="1px solid #FFFFFF">
                    {locationType === "" && <p>All</p>}
                    {locationType !== "" && <p>{locationType}</p>}
                  </MenuButton>
                  <MenuList bg={"#243a60dd"} color={"#FCFCDD"}>
                    <MenuItem
                      bg={"#243a60dd"}
                      color={"#FCFCDD"}
                      _hover={{ bg: "#FCFCDD", color: "#245A90" }}
                      onClick={filterAll}
                      value="All"
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      bg={"#243a60dd"}
                      color={"#FCFCDD"}
                      _hover={{ bg: "#FCFCDD", color: "#245A90" }}
                      onClick={filterAttraction}
                    >
                      Attraction
                    </MenuItem>
                    <MenuItem
                      bg={"#243a60dd"}
                      color={"#FCFCDD"}
                      _hover={{ bg: "#FCFCDD", color: "#245A90" }}
                      onClick={filterRestaurant}
                    >
                      Restaurant
                    </MenuItem>
                    <MenuItem
                      bg={"#243a60dd"}
                      color={"#FCFCDD"}
                      _hover={{ bg: "#FCFCDD", color: "#245A90" }}
                      onClick={filterCafe}
                    >
                      Cafe
                    </MenuItem>
                    <MenuItem
                      bg={"#243a60dd"}
                      color={"#FCFCDD"}
                      _hover={{ bg: "#FCFCDD", color: "#245A90" }}
                      onClick={filterHotel}
                    >
                      Hotel
                    </MenuItem>
                    <MenuItem
                      bg={"#243a60dd"}
                      color={"#FCFCDD"}
                      _hover={{ bg: "#FCFCDD", color: "#245A90" }}
                      onClick={filterBar}
                    >
                      Bar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </SimpleGrid>
            </FormControl>
            <Box mt={"20px"} height={"50vh"}>
              {locationList.length > 0 && (
                <InfiniteScroll
                  dataLength={dataLength}
                  next={fetchLocations}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  height={"50vh"}
                >
                  {items.map((location) => (
                    <LocationCard
                      key={location.loc_id}
                      location={location}
                      addDestination={addNewDestination}
                      onClose={resetAndClose}
                    />
                  ))}
                </InfiniteScroll>
              )}
              {locationList.length === 0 && (
                <Box textAlign="center" paddingTop="9vh" height="18vh">
                  <Heading size="lg">No results found.</Heading>
                </Box>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonStyler mr={3} onClick={resetAndClose}>
              Close
            </ButtonStyler>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default LocationModal;
