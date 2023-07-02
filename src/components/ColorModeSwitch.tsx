import {
  HStack,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegMoon, FaSun } from "react-icons/fa";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const iconColor = useColorModeValue("#718096", "#FBD38D");

  return (
    <HStack>
      <FaRegMoon size={23} color={iconColor} />
      <Switch
        size="lg"
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <FaSun size={23} color={iconColor} />
    </HStack>
  );
};

export default ColorModeSwitch;
