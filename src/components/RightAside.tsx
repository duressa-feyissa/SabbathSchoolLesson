import { VStack, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import useCurrentLesson from "../hooks/useCurrentLesson";
import useCurrentQuarter from "../hooks/useCurrentQuarter";
import { useLangQueryStore } from "../store";
import sabbathSchool from "../images/sabbathSchool.jpg";
import { Link } from "react-router-dom";

const RightAside = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const language = useLangQueryStore((state) => state.language);
  const { data: currentQuarter } = useCurrentQuarter();
  const { data: currentLesson } = useCurrentLesson();

  return (
    <VStack width={"100%"} height={"100%"} borderRadius="md" boxShadow="lg">
      <Box>
        <Box
          fontSize="2xl"
          fontWeight="semibold"
          letterSpacing="tight"
          lineHeight="tight"
          ml="10px"
          mr="30px"
          mt="5px"
          color={color}
          textAlign={"center"}
        >
          {currentLesson ? currentLesson.title : "God's Love"}
        </Box>
        <Box ml="10px">
          <Box>
            <Text size={"sm"} color={color}>
              {currentLesson
                ? currentLesson.memorial_script
                : "For God so loved the world that he gave* his only Son, so that everyone who believes in him might not perish but might have eternal life. For God did not send his Son into the world to condemn* the world, but that the world might be saved through him.(John 3:16-17)"}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={"column"}
        w={"160px"}
        justifyItems={"center"}
        _hover={{
          boxShadow: "xl",
          margin: "1px",
          cursor: "pointer",
        }}
      >
        <Link to={`/${language}/quarters/${currentQuarter?.id}`}>
          <Image
            src={currentQuarter ? currentQuarter.cover : sabbathSchool}
            alt="Banner Image"
            objectFit="cover"
            w="100%"
            h="200px"
            borderRadius={"10px"}
          />
          <Text
            colorScheme="blue"
            textAlign={"center"}
            size={{ base: "sm", md: "md" }}
            mt={"10px"}
          >
            {currentQuarter ? currentQuarter.title : "God's Love"}
          </Text>
        </Link>
      </Box>
    </VStack>
  );
};

export default RightAside;
