import { Link } from "react-router-dom";
import useCurrentQuarter from "../hooks/useCurrentQuarter";
import {
  Box,
  Button,
  useColorModeValue,
  Image,
  Flex,
  Text,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { useLangQueryStore } from "../store";
import BannerSkeleton from "./BannerSkeleton";
import useCurrentLesson from "../hooks/useCurrentLesson";
import sabbathSchool from "../images/sabbathSchool.jpg";

const Banner = () => {
  const bgColor = useColorModeValue("gray.100", "#202123");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const language = useLangQueryStore((state) => state.language);
  const { data: currentQuarter, isLoading } = useCurrentQuarter();
  const { data: currentLesson } = useCurrentLesson();

  const getDayId = () => `0${new Date().getDay() + 1}`;
  const lessonlink = `/${language}/quarters/${
    currentQuarter ? currentQuarter.id : "quarterId"
  }/lessons/${currentLesson?.id}`;
  const daylink = lessonlink + `/days/${getDayId()}`;

  if (isLoading) return <BannerSkeleton />;

  return (
    <Flex
      bg={bgColor}
      color={textColor}
      align="center"
      justify="center"
      mx="auto"
      borderRadius="md"
      overflow="hidden"
      position="relative"
      marginY={"20px"}
      width={{ base: "95%", md: "98%" }}
    >
      <Box flex={2}>
        <Box paddingY={"3"} paddingX={"3"}>
          <Box>
            <Box
              fontSize="4xl"
              fontWeight="semibold"
              letterSpacing="tight"
              lineHeight="tight"
              ml="10px"
              mr="30px"
              mt="5px"
              color={color}
            >
              {currentLesson ? currentLesson.title : "God's Love"}
            </Box>
            <Box ml="10px">
              <Box>
                <Text size={"md"} color={color}>
                  {currentLesson
                    ? currentLesson.memorial_script
                    : "For God so loved the world that he gave* his only Son, so that everyone who believes in him might not perish but might have eternal life. For God did not send his Son into the world to condemn* the world, but that the world might be saved through him.(John 3:16-17)"}
                </Text>
              </Box>
            </Box>
          </Box>

          <HStack
            justify={{ base: "center", md: "space-around" }}
            width={{ base: "100%", md: "400px" }}
            spacing="2"
            mt="4"
          >
            <Link to={lessonlink}>
              <Button
                variant="outline"
                colorScheme="blue"
                size={{ base: "sm", md: "md" }}
              >
                This Week's Lessons
              </Button>
            </Link>
            <Link to={daylink}>
              <Button
                variant="outline"
                colorScheme="green"
                size={{ base: "sm", md: "md" }}
              >
                Today's Lesson
              </Button>
            </Link>
          </HStack>
        </Box>
      </Box>

      <Box
        display={{ base: "none", md: "block" }}
        margin={"10px"}
        borderRadius={"10px"}
      >
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
      </Box>
    </Flex>
  );
};

export default Banner;
