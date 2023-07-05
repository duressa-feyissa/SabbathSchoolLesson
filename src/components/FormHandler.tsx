import { Flex, VStack, Box, useBreakpointValue } from "@chakra-ui/react";
import RightAside from "./RightAside";
import { Outlet } from "react-router-dom";

const FormHandler = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });
  return (
    <Flex align="flex-start" h="100%" paddingY={"20px"}>
      <Box flex="1" position="relative" overflowY="auto">
        <VStack spacing={"5"}>
          <Outlet />
        </VStack>
      </Box>
      <Box
        w={"320px"}
        display={isSmallScreen ? "none" : "block"}
        position="sticky"
        top={58}
        right={0}
        overflowY="auto"
        maxHeight="100vh"
      >
        <RightAside />
      </Box>
    </Flex>
  );
};

export default FormHandler;
