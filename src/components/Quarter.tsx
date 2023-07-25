import {
  Heading,
  HStack,
  VStack,
  Card,
  Text,
  Box,
  useColorMode,
  Button,
  Badge,
  Image,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useLessons from "../hooks/useLessons";
import useQuarter from "../hooks/useQuarter";
import { useLangQueryStore } from "../store";
import { EditIcon } from "@chakra-ui/icons";
import DeleteLesson from "./DeleteLesson";
import useAuth from "../hooks/useAuth";

const Quarter = () => {
  const { quarterId } = useParams<{ quarterId: string }>();
  const validQuarterId = quarterId || "";
  const language = useLangQueryStore((state) => state.language);
  const { data: quarter } = useQuarter(language, validQuarterId);
  const { data: lessons, isLoading, refetch } = useLessons();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const currUser = useAuth();
  const color = isDarkMode ? "green.100" : "green.900";

  const handleFetch = () => refetch();

  if (isLoading) <Spinner />;
  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      <Box width={"90%"}>
        <VStack mt="4">
          <Text fontSize="14px" textAlign="justify">
            <Heading
              size={"xl"}
              margin={"auto"}
              textAlign={"center"}
              color={color}
            >
              {quarter?.title}
            </Heading>
            <Text marginY={"10px"}>{quarter?.human_date}</Text>
            <Text
              fontSize="18px"
              lineHeight="1.5"
              color={color}
              fontWeight={"medium"}
            >
              {quarter?.description}
            </Text>
          </Text>
          <HStack justify="space-between" mt={3}></HStack>
        </VStack>
        <Box mt={5} display={"flex"} justifyContent={"space-between"}>
          <SimpleGrid columns={{ md: 2 }} spacing={3}>
            {lessons?.map((lesson) => (
              <HStack key={lesson.id} spacing={4} justify={"flex-start"}>
                <Link to={`lessons/${lesson.id}`}>
                  <VStack align={"flex-start"}>
                    <Button variant="ghost">
                      <HStack>
                        <Badge
                          colorScheme="green"
                          fontSize="23px"
                          borderRadius="4px"
                        >
                          {lesson.id}
                        </Badge>
                        <Text color={color}>{lesson.title}</Text>
                      </HStack>
                    </Button>
                  </VStack>
                </Link>
                {currUser?.role === "admin" && (
                  <>
                    <Link
                      to={`/admin/languages/${language}/quarters/${quarterId}/lessons/${lesson.id}/edit`}
                    >
                      <EditIcon color="blue.500" cursor="pointer" />
                    </Link>
                    <DeleteLesson lessonId={lesson.id} refetch={handleFetch} />
                  </>
                )}
              </HStack>
            ))}
          </SimpleGrid>
          <Card width={"250px"} display={{ xl: "block", base: "none" }}>
            <Image src={quarter?.cover} alt="cover" />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Quarter;
