import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

const Error = ({ message }) => {
  return (
    <Box display={"flex"}>
      <Alert
        status="error"
        position={"fixed"}
        bottom={"4"}
        left={"50%"}
        transform={"translateX(-50%)"}
        w={"container.lg"}
        display={"flex"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        <AlertIcon />
        {message}
      </Alert>
    </Box>
  );
};

export default Error;
