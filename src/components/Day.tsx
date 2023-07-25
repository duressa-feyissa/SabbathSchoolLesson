import {
  VStack,
  Text,
  Box,
  Heading,
  Button,
  Badge,
  HStack,
  useColorMode,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useDay from "../hooks/useDay";
import useRead from "../hooks/useRead";
import useLesson from "../hooks/useLesson";
import useDays from "../hooks/useDays";

const Day = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
  });
  const { colorMode } = useColorMode();
  const {
    lang = "",
    quarterId = "",
    lessonId = "",
    dayId = "",
  } = useParams<{
    lang: string;
    quarterId: string;
    lessonId: string;
    dayId: string;
  }>();

  const { data: lesson } = useLesson(lang, quarterId, lessonId);
  const { data: days } = useDays(quarterId, lessonId);
  const { data: day } = useDay(quarterId, lessonId, dayId);
  const { data: read, isLoading } = useRead(lang, quarterId, lessonId, dayId);
  const paragraphs = read?.paragraphs;
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.700";

  if (isLoading) return <Spinner />;

  return (
    <Box
      display={"flex"}
      mt={"10px"}
      flexDirection={{ base: "column", lg: "row", xl: "row" }}
      justifyContent={{
        base: "center",
        lg: "space-between",
        xl: "space-between",
      }}
      alignItems={{ base: "center", lg: "flex-start", xl: "flex-start" }}
      gap={{ base: "0", lg: "20px", xl: "20px" }}
      h="100%"
    >
      {!paragraphs ? (
        <Heading size={"lg"} margin={"auto"} textAlign={"center"}>
          Coming Soon...
        </Heading>
      ) : (
        <Box
          flex="1"
          position="relative"
          overflowY="auto"
          width={{ base: "95%", md: "85%", lg: "75%", xl: "65%" }}
          padding={"5px"}
        >
          <Heading
            fontFamily={"35px"}
            textAlign={"center"}
            color={isDarkMode ? "green.100" : "green.900"}
          >
            {day?.day}: {day?.title}
          </Heading>
          <VStack
            spacing={3}
            marginTop="20px"
            paddingX={{ lg: "15px", xl: "20px" }}
          >
            {paragraphs?.map((paragraph, index) => (
              <Text
                key={index}
                fontSize={{
                  base: "1.2rem",
                  md: "1.3rem",
                  lg: "1.4rem",
                  xl: "1.5rem",
                }}
                p={"8px"}
                color={color}
                lineHeight={"1.5rem"}
                textAlign={"justify"}
              >
                {paragraph}
              </Text>
            ))}
          </VStack>
          <Text
            textAlign={"right"}
            pr={{ base: "15px", xl: "25px" }}
            color={color}
            textStyle="beautifulText"
          >
            {day?.date}
          </Text>
        </Box>
      )}

      {!isSmallScreen && (
        <Box
          w={{ lg: "200px", xl: "300px" }}
          position="sticky"
          top={58}
          right={0}
          overflowY="auto"
          paddingX={"5px"}
          pt={"20px"}
          maxHeight="100vh"
          shadow={"md"}
        >
          <Heading size={"lg"} textAlign={"center"} mt={"5px"} color={color}>
            {lesson?.title}
          </Heading>
          <Text size={"sm"} textAlign={"center"} color={color}>
            {lesson?.memorial_script}
          </Text>
          {days?.map((day) => (
            <VStack key={day.id} align={"flex-start"} marginY={"2"}>
              <Link
                to={`/${lang}/quarters/${quarterId}/lessons/${lessonId}/days/${day.id}`}
              >
                <Button variant="ghost">
                  <HStack>
                    <Badge
                      colorScheme="green"
                      fontSize="23px"
                      borderRadius="4px"
                    >
                      {day.id}
                    </Badge>
                    <Text fontSize={"20px"} color={color}>
                      {day.day}
                    </Text>
                  </HStack>
                </Button>
              </Link>
            </VStack>
          ))}
        </Box>
      )}
      {isSmallScreen && (
        <Box width={"100%"} display="flex" justifyContent={"center"}>
          <HStack mb={10} width={"300px"}>
            {days?.map((day) => (
              <Button key={day.id} variant="ghost">
                <Link
                  to={`/${lang}/quarters/${quarterId}/lessons/${lessonId}/days/${day.id}`}
                >
                  <Badge colorScheme="green" fontSize="24px" borderRadius="4px">
                    {day.id}
                  </Badge>{" "}
                </Link>{" "}
              </Button>
            ))}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Day;
