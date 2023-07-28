import { Box, Heading } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Box
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box>
        <Heading>Something Wrong!</Heading>
      </Box>
    </Box>
  );
};

export default ErrorPage;
