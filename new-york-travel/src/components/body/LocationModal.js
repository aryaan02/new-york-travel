import React from "react";

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
} from "@chakra-ui/react";
import LocationCard from "./LocationCard";
import ButtonStyler from "../UI/ButtonStyler";

const LocationModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addNewDestination = (destination) => {
    props.addDestination(destination);
  };

  return (
    <>
      <ButtonStyler width="full" onClick={onOpen}>
        Add Destination
      </ButtonStyler>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
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
            <ButtonStyler mr={3} onClick={onClose}>
              Close
            </ButtonStyler>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LocationModal;
