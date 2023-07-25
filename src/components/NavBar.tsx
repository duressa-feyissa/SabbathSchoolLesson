import {
  Flex,
  Text,
  Avatar,
  HStack,
  Image,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import Setting from "./Setting";
import logo from "../images/logo.jpg";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ColorModeSwitch from "./ColorModeSwitch";
import defaultUserImage from "../images/user.png";
import { AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currUser = useAuth();

  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  const logoDisplay = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
  });
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const bgColor = isDarkMode ? "#121212" : "white";

  return (
    <Flex
      width="100%"
      padding={2}
      style={{ position: "sticky", top: 0, zIndex: 100 }}
      bg={bgColor}
    >
      <HStack
        justify={isSmallScreen ? "space-between" : "flex-start"}
        flex={1}
        spacing={isSmallScreen ? 0 : 3}
      >
        {logoDisplay && (
          <Link to="/">
            <Image
              src={logo}
              alt="logo"
              objectFit="cover"
              w={"40px"}
              h="35px"
              minW="40px"
              minH="35px"
              borderRadius={3}
            />
          </Link>
        )}

        <SearchInput />
        <HStack spacing={3} borderRadius="full" ml="2">
          {currUser?.role === "admin" ? (
            <>
              <Text>{currUser.name}</Text>
              {!isOpen && (
                <Avatar
                  src={defaultUserImage}
                  boxSize="40px"
                  name={currUser?.name}
                  ml={-1}
                  mr={2}
                  onClick={onOpen}
                />
              )}
              <Setting isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </>
          ) : !logoDisplay ? (
            <ColorModeSwitch />
          ) : (
            !isOpen && (
              <Box onClick={onOpen}>
                <AiOutlineMenu size={30} />
              </Box>
            )
          )}
          <Setting isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
