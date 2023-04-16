import React from "react";

import { Flex, Box, Heading, HStack } from "@chakra-ui/react";
import { MdLocationCity, MdDirectionsSubway } from "react-icons/md";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      direction="column"
      mt={20}
    >
      <Box>
        <Heading as="h1" size={["3xl", "4xl"]}>
          New York Travel
        </Heading>
      </Box>
      <HStack>
        <MdLocationCity size="80" />
        <MdDirectionsSubway size="80" />
      </HStack>
    </Flex>
  );
};

export default Header;
