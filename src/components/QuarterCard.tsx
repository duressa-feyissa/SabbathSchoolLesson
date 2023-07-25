import {
  Box,
  Card,
  Heading,
  Image,
  Text,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import useAuth from "../hooks/useAuth";
import Quarter from "../entities/Quarter";
import { useLangQueryStore } from "../store";
import QuarterNumber from "./QuarterNumber";
import Icon from "./Icon";
import DeleteQuarter from "./DeleteQuarter";

interface Props {
  quarter: Quarter;
  refetch?: () => void;
}

const QuarterCard = ({ quarter, refetch }: Props) => {
  const { colorMode } = useColorMode();
  const { lang } = useParams<{ lang: string }>();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const language = useLangQueryStore((state) => state.language);
  const currUser = useAuth();

  return (
    <Card>
      <Box p={3}>
        <Text fontSize="14px" textAlign="justify">
          <Image
            src={quarter.cover}
            w="130px"
            h="175px"
            float="left"
            borderRadius="lg"
            pr={3}
          />
          <Link to={`/${language}/quarters/${quarter.id}`}>
            <Heading fontSize="22px" textAlign="center" mb={3} color={color}>
              {quarter.title}
            </Heading>
          </Link>
          <Text lineHeight="1.5" color={color}>
            {quarter.description}
          </Text>
        </Text>
        <HStack justify="space-between" mt={3}>
          <Text
            color={isDarkMode ? "green.200" : "green.700"}
            fontSize="16px"
            mb={2}
          >
            {quarter.human_date}
          </Text>

          {currUser && currUser.role === "admin" && (
            <HStack spacing={3}>
              <QuarterNumber quarter={quarter.id.slice(5)} />
              {lang && (
                <>
                  <Link
                    to={`/admin/languages/${lang}/quarters/${quarter.id}/lessons/add`}
                  >
                    <Icon colorScheme="teal" icon={AddIcon} />
                  </Link>
                  <Link
                    to={`/admin/languages/${lang}/quarters/${quarter.id}/edit`}
                  >
                    <Icon colorScheme="blue" icon={EditIcon} />
                  </Link>
                  <DeleteQuarter quarterId={quarter.id} refetch={refetch} />
                </>
              )}
            </HStack>
          )}
          {currUser?.role !== "admin" && (
            <QuarterNumber quarter={quarter.id.slice(5)} />
          )}
        </HStack>
      </Box>
    </Card>
  );
};

export default QuarterCard;
