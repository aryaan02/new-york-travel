import React from "react";
import { Text, Link } from "@chakra-ui/react";

const MenuItem = (props) => {
  return (
    <Link href={props.link}>
      <Text display="block" fontSize="lg" fontWeight="bold" color="white">
        {props.children}
      </Text>
    </Link>
  ); 
};

export default MenuItem;
