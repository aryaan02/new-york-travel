import React from "react";

import { Flex, Box, Heading } from "@chakra-ui/react";

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
        <Heading as="h1" size="4xl">
          New York Travel
        </Heading>
      </Box>
    </Flex>
  );
};

export default Header;
