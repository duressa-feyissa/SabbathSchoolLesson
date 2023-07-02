import {
  Flex,
  Text,
  Avatar,
  HStack,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import Setting from "./Setting";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
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
        <SearchInput />
        <HStack spacing={3} borderRadius="full" ml="2">
          <Text>Segun</Text>
          {!isOpen && (
            <Avatar
              src="https://bit.ly/sage-adebayo"
              boxSize="40px"
              name="Segun Adebayo"
              ml={-1}
              mr={2}
              onClick={onOpen}
            />
          )}
          <Setting isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
