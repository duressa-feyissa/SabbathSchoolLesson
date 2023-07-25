import {
  Text,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  VStack,
  Avatar,
  Divider,
  useColorMode,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logout from "./Logout";
import useAuth from "../hooks/useAuth";
import defaultUserImage from "../images/user.png";
import MenuBar from "./MenuBar";
import logo from "../images/logo.jpg";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Setting = ({ isOpen, onClose }: Props): JSX.Element => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const user = useAuth();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const bgColor = isDarkMode ? "#121212" : "white";
  const color = isDarkMode ? "#fbad5c" : "green.900";

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent
        mt={"10px"}
        style={{ width: "400px", height: "98vh" }}
        bg={bgColor}
      >
        <DrawerHeader mt="3">
          {user ? (
            <VStack spacing={1}>
              <Box ml={"10px"}>
                <Avatar
                  src={defaultUserImage}
                  boxSize="60px"
                  objectFit={"cover"}
                  name="Segun Adebayo"
                  ml={-1}
                  mr={2}
                />
              </Box>
              {user && (
                <Text textAlign={"center"} fontSize={"13px"}>
                  {user?.name}
                </Text>
              )}
            </VStack>
          ) : (
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
                color={color}
              >
                Sabbath School
              </Text>
            </HStack>
          )}
          <Divider mt="5" />
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={3}>
            <MenuBar />
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <HStack spacing={7} justify={"center"}>
            <ColorModeSwitch />
            {user && <Logout />}
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Setting;
