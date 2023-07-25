import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";

import {
  Box,
  Text,
  HStack,
  Image,
  VStack,
  useColorMode,
  Divider,
} from "@chakra-ui/react";
import MenuBar from "./MenuBar";

const Aside = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const bgColor = isDarkMode ? "#202123" : "";
  return (
    <Box
      padding={"10px"}
      bg={bgColor}
      height={"100vh"}
      style={{ position: "fixed", top: 0, left: 0 }}
    >
      <Link to="/">
        <HStack width={"200px"}>
          <Image
            src={logo}
            alt="logo"
            objectFit="cover"
            width="70px"
            height="60px"
            borderRadius={3}
          />
          <Text
            align="center"
            fontWeight="bold"
            fontSize="22px"
            width="90px"
            fontFamily="sans-serif"
            color="#fbad5c"
          >
            Sabbath School
          </Text>
        </HStack>
      </Link>
      <Box minH={"60px"}></Box>
      <Divider />
      <MenuBar />
      <Box mt="10px">
        <VStack spacing="16px" align="stretch"></VStack>
      </Box>
    </Box>
  );
};

export default Aside;
