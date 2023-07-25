import {
  Box,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import QuarterCard from "./QuarterCard";
import useAuth from "../hooks/useAuth";
import { AddIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import useQuarters from "../hooks/useQuarters";
import Quarter from "../entities/Quarter";

const QuarterGridByYear = () => {
  const currUser = useAuth();
  const { data: quarters, refetch } = useQuarters();
  const { lang } = useParams();

  const refetchHandeler = () => refetch();

  const groupedQuarters: { [year: string]: Quarter[] } = {};
  quarters?.forEach((quarter: Quarter) => {
    const year = new Date(quarter.year).getFullYear().toString();
    if (!groupedQuarters[year]) {
      groupedQuarters[year] = [];
    }
    groupedQuarters[year].push(quarter);
  });

  const sortedYears = Object.keys(groupedQuarters).sort((a, b) => {
    const aYear = parseInt(a);
    const bYear = parseInt(b);
    return bYear - aYear;
  });

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";

  return (
    <Box width={"100%"}>
      {lang && (
        <HStack justify={"flex-start"} paddingX={{ base: "1", lg: "4" }}>
          {currUser?.role === "admin" && (
            <Link to={`/admin/languages/${lang}/quarters/add`}>
              <IconButton
                colorScheme="teal"
                aria-label="Add Language"
                icon={<AddIcon />}
                size="sm"
                variant={"outline"}
              />
            </Link>
          )}
        </HStack>
      )}
      {sortedYears.map((year) => (
        <Box key={year} padding={{ base: "1", lg: "5" }}>
          <Heading fontSize={"33"} mb={"3"} color={color}>
            {year}
          </Heading>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
            spacing={{ lg: 10, xl: 10, base: 5 }}
            paddingX={{ base: "1", lg: "8" }}
          >
            {groupedQuarters[year].map((quarter) => (
              <QuarterCard
                key={quarter.id}
                quarter={quarter}
                refetch={refetchHandeler}
              />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </Box>
  );
};

export default QuarterGridByYear;
