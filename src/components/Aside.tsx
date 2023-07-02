import {
  Box,
  Text,
  Heading,
  HStack,
  Image,
  VStack,
  Button,
  Divider,
  useColorMode,
} from "@chakra-ui/react";

const manage = ["Languages", "Quarters", "Lessons", "Days"];

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
      <HStack width={"200px"}>
        <Image
          src="src/assets/logo.jpg"
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
      <Box mt={"30px"}>
        <Box margin={"10px"}>
          <Heading fontSize="2xl" mt="20px" textAlign="center">
            Manage
          </Heading>
          <Divider mb={"20px"} mt={"10px"} />
          <VStack spacing="16px" align="stretch">
            {manage.map((task) => (
              <Button
                key={task}
                variant="ghost"
                justifyContent="flex-start"
                borderRadius={8}
              >
                <HStack paddingY="5px">
                  <Image
                    src="src/assets/logo.jpg"
                    boxSize="32px"
                    objectFit="cover"
                    borderRadius={8}
                  />
                  <Text whiteSpace="normal" ml="7px" fontSize="lg">
                    {task}
                  </Text>
                </HStack>
              </Button>
            ))}
          </VStack>
        </Box>
      </Box>
      <Box mt="10px">
        <VStack spacing="16px" align="stretch"></VStack>
      </Box>
    </Box>
  );
};

export default Aside;
