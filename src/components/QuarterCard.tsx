import {
  Box,
  Card,
  Heading,
  HStack,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Quarter from "../entities/Quarter";
import { useLangQueryStore } from "../store";
import QuarterNumber from "./QuarterNumber";

interface Props {
  quarter: Quarter;
  refetch?: () => void;
}

const QuarterCard = ({ quarter }: Props) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const language = useLangQueryStore((state) => state.language);

  return (
    <Card>
      <Box p={5}>
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
            {quarter.description.length > 200
              ? `${quarter.description.substring(0, 200)}...`
              : quarter.description}
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

          <QuarterNumber quarter={quarter.id.slice(5)} />
        </HStack>
      </Box>
    </Card>
  );
};

export default QuarterCard;
