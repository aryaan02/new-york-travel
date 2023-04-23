import React from "react";
import { Button } from "@chakra-ui/react";

const ButtonStyler = (props) => {
  return (
    <Button
      size={props.size}
      bg="#245A90"
      color="#FCFCDD"
      border="solid 1px #FCFCDD"
      mt={props.mt}
      mr={props.mr}
      width={props.width}
      onClick={props.onClick}
      type={props.type}
      _hover={{ bg: "#FCFCDD", color: "#245A90" }
      }
    >
      {props.children}
    </Button>
  );
};

export default ButtonStyler;
