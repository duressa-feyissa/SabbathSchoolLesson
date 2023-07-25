import { useParams, Link } from "react-router-dom";
import {
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Button,
  Badge,
  SimpleGrid,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useLangQueryStore } from "../store";
import useAuth from "../hooks/useAuth";
import Icon from "./Icon";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import useDays from "../hooks/useDays";
import useLesson from "../hooks/useLesson";
import DeleteDay from "./DeleteDayButton";

const Lesson = () => {
  const currUser = useAuth();
  const { quarterId = "", lessonId = "" } = useParams<{
    quarterId: string;
    lessonId: string;
  }>();

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const validQuarterId = quarterId || "";
  const language = useLangQueryStore((state) => state.language);
  const { data: lesson } = useLesson(language, validQuarterId, lessonId);
  const { data: days, isLoading, refetch } = useDays(validQuarterId, lessonId);

  days?.sort((a, b) => {
    return parseInt(a.id) - parseInt(b.id);
  });

  const handleFetch = () => refetch();

  if (isLoading) return <Spinner alignSelf={"center"} />;

  return !days ? (
    <Heading size={"lg"} margin={"auto"} textAlign={"center"}>
      Coming Soon...
    </Heading>
  ) : (
    <VStack mt="4" width={"100%"} paddingX={"12px"}>
      <Heading size={"xl"} margin={"auto"} textAlign={"center"} color={color}>
        {lesson?.title}
      </Heading>
      <Text
        mb={"2"}
        textAlign={"center"}
        color={color}
        width={{ base: "95%", lg: "70%" }}
      >
        {lesson?.memorial_script}
      </Text>
      <Box justifySelf={"flex-start"} w={{ base: "90%", lg: "50%", xl: "50%" }}>
        <Link
          to={`/admin/languages/${language}/quarters/${quarterId}/lessons/${lessonId}/days/add`}
        >
          {currUser?.role === "admin" && (
            <Icon colorScheme="teal" icon={AddIcon} />
          )}{" "}
        </Link>
      </Box>
      <Box>
        <SimpleGrid columns={{ base: 1 }} spacing={5}>
          {days?.map((day, index) => (
            <HStack key={day.id} spacing={4} justify={"flex-start"}>
              <Link to={`days/0${index + 1}`} key={index}>
                <VStack key={day.id} align={"flex-start"}>
                  <Button variant="ghost">
                    <HStack>
                      <Badge
                        colorScheme="green"
                        fontSize="23px"
                        borderRadius="4px"
                      >
                        {day.day}
                      </Badge>
                      <Text color={color}>{day.title}</Text>
                    </HStack>
                  </Button>
                </VStack>
              </Link>
              {currUser?.role === "admin" && (
                <>
                  <Link
                    to={`/admin/languages/${language}/quarters/${quarterId}/lessons/${lessonId}/days/${day.id}/edit`}
                  >
                    <EditIcon color="blue.500" cursor="pointer" />
                  </Link>
                  <DeleteDay refetch={handleFetch} dayId={day.id} />
                </>
              )}
            </HStack>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Lesson;
