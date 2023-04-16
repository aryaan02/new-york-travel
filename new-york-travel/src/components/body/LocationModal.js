import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import LocationCard from "./LocationCard";

const LocationModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addNewDestination = (destination) => {
    props.addDestination(destination);
  };

  return (
    <>
      <Button width="full" colorScheme="teal" onClick={onOpen}>
        Add Destination
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="4xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.locations.map((location) => (
              <LocationCard
                key={location.loc_id}
                location={location}
                addDestination={addNewDestination}
                onClose={onClose}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LocationModal;
