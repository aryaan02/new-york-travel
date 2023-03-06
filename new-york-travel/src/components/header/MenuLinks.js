import { MenuItem, Stack } from "@chakra-ui/react";
import React from "react";

const MenuLinks = () => {
  return (
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem link="/">Log Out</MenuItem>
    </Stack>
  );
};

export default MenuLinks;
