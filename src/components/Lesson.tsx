import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { format, parse } from "date-fns";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useDay from "../hooks/useDay";
import useLesson from "../hooks/useLesson";

const Lesson = () => {
  const { quarterId, lessonId } = useParams<{
    quarterId: string;
    lessonId: string;
  }>();

  const validQuarterId = quarterId || "";
  const validLessonId = lessonId || "";

  const { data, isLoading } = useLesson(validQuarterId, validLessonId);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";

  const [selectedDay, setSelectedDay] = useState(0);

  const { data: day } = useDay(
    validQuarterId,
    validLessonId,
    data?.days[selectedDay]?.id || ""
  );

  const dayButtonVariant = useBreakpointValue({ base: "ghost", md: "outline" });
  const weekDays: { [key: string]: string } = {
    "01": "Saturday",
    "02": "Sunday",
    "03": "Monday",
    "04": "Tuesday",
    "05": "Wednesday",
    "06": "Thursday",
    "07": "Friday",
  };

  const formatDate = (dateString: string) => {
    const date = parse(dateString, "dd/MM/yyyy", new Date());
    return format(date, "MMMM dd, yyyy");
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!data) {
    return <Text>Error: Lesson data not found.</Text>;
  }

  const lesson = data.lesson;
  const days = data.days || [];

  return (
    <VStack mt="4" width={"100%"} paddingX={"12px"} spacing={6}>
      <Flex width="100%" direction={{ base: "column", md: "row" }} gap={6}>
        <Box
          flex={{ base: "none", md: "1" }}
          width={{ base: "100%", md: "30%" }}
          paddingX={{ base: 0, md: 4 }}
        >
          <Image
            src={lesson.cover}
            alt={lesson.title}
            borderRadius="lg"
            width="100%"
            maxHeight="400px"
            objectFit="cover"
            mb={4}
          />
          <Heading size={"xl"} textAlign={"center"} color={color} mb={4}>
            {lesson.title}
          </Heading>
          <Text fontSize="md" color="gray.500" textAlign={"center"}>
            {formatDate(lesson.start_date)} - {formatDate(lesson.end_date)}
          </Text>
          <Flex flexDirection={{ base: "row", lg: "column" }} mt={4}>
            {days.map((day, index) => (
              <Button
                key={day.id}
                onClick={() => setSelectedDay(index)}
                variant={index === selectedDay ? "solid" : dayButtonVariant}
                width="100%"
                marginBottom={{ base: 2, md: 4 }}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                bg={index === selectedDay ? "teal.400" : undefined}
                color={index === selectedDay ? "white" : color}
              >
                <Badge colorScheme="green" fontSize="md" borderRadius="4px">
                  {day.id}
                </Badge>
                <Text ml={2} display={{ base: "none", lg: "block" }}>
                  {day.title}
                </Text>
              </Button>
            ))}
          </Flex>
        </Box>

        <Box
          flex={{ base: "none", md: "2" }}
          paddingX={{ base: 0, md: 4 }}
          width={{ base: "100%", md: "70%" }}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          pl={{ md: 4 }}
        >
          <VStack align="flex-start" spacing={2}>
            <Heading size="lg" color={color}>
              {days[selectedDay]?.title}
            </Heading>
            <Text fontSize="md" color="gray.500">
              {weekDays[days[selectedDay]?.id]} |{" "}
              {formatDate(days[selectedDay]?.date)}
            </Text>
            <Box
              as="div"
              display={"flex"}
              flexDirection={"column"}
              gap={{ base: 4, md: 6 }}
              dangerouslySetInnerHTML={{
                __html: day?.content || "<p>Content not found</p>",
              }}
              width="100%"
            />
          </VStack>
        </Box>
      </Flex>
    </VStack>
  );
};

export default Lesson;
