import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { format, parse } from "date-fns";
import { Link, useParams } from "react-router-dom";
import useQuarter from "../hooks/useQuarter";
import { useLangQueryStore } from "../store";

const Quarter = () => {
  const { quarterId } = useParams<{ quarterId: string }>();
  const validQuarterId = quarterId || "";
  const language = useLangQueryStore((state) => state.language);
  const { data: quarter, isLoading } = useQuarter(language, validQuarterId);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";

  if (isLoading) <Spinner alignSelf={"center"} />;

  const formatDate = (dateString: string) => {
    const date = parse(dateString, "dd/MM/yyyy", new Date());
    return format(date, "MMMM dd, yyyy"); // Format date to 'Month day, year'
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      width={"100%"}
      padding={5}
    >
      <Box
        position="relative"
        width="100%"
        height={{ base: "300px", md: "400px" }}
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          src={quarter?.quarterly.splash}
          alt="Splash"
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)" // Dark overlay
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="100%"
            textAlign="center"
            color="white"
            p={4}
          >
            <Heading size={{ base: "2xl", md: "4xl" }} mb={2}>
              {quarter?.quarterly.title}
            </Heading>
            <Text fontSize={{ base: "14px", md: "18px" }} mb={2}>
              {quarter?.quarterly.human_date}
            </Text>
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              mx="auto"
              maxW={{ base: "90%", md: "60%" }}
              lineHeight="1.5"
            >
              {quarter?.quarterly.description}
            </Text>
          </Box>
        </Box>
      </Box>

      <VStack mt={10}>
        <Heading size="lg" mb={4} textAlign="center">
          Lessons
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={6}
          width="100%"
        >
          {quarter?.lessons?.map((lesson) => (
            <Card
              key={lesson.id}
              p={4}
              boxShadow="lg"
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={lesson.cover}
                alt={lesson.title}
                borderRadius="md"
                mb={4}
                objectFit="cover"
                height="150px"
                width="100%"
              />
              <VStack align="flex-start">
                <HStack>
                  <Badge colorScheme="green" fontSize="md">
                    {lesson.id}
                  </Badge>
                  <Heading size="md" color={color} noOfLines={2}>
                    {lesson.title}
                  </Heading>
                </HStack>

                <Text fontSize="sm" color="gray.500">
                  {formatDate(lesson.start_date)} -{" "}
                  {formatDate(lesson.end_date)}
                </Text>
                <Link to={`lessons/${lesson.id}`}>
                  <Button mt={2} colorScheme="teal" size="sm">
                    View Lesson
                  </Button>
                </Link>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Quarter;
