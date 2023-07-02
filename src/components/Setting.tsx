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
} from "@chakra-ui/react";
import { useRef } from "react";
import ColorModeSwitch from "./ColorModeSwitch";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Setting = ({ isOpen, onClose }: Props): JSX.Element => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent mt={"10px"} style={{ width: "400px", height: "98vh" }}>
        <DrawerHeader mt="3">
          <VStack spacing={1}>
            <Box ml={"10px"}>
              <Avatar
                src="https://bit.ly/sage-adebayo"
                boxSize="60px"
                objectFit={"cover"}
                name="Segun Adebayo"
                ml={-1}
                mr={2}
              />
            </Box>
            <Text textAlign={"center"} fontSize={"13px"}>
              John Doe
            </Text>
          </VStack>
          <Divider mt="5" />
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={3}></VStack>
        </DrawerBody>
        <DrawerFooter>
          <ColorModeSwitch />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Setting;
