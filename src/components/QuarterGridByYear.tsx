import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import QuarterCard from "./QuarterCard";

const QuarterGridByYear = () => {
  return (
    <Box>
      <Box padding={{ base: "1", lg: "5" }}>
        <Heading fontSize={"33"} mb={"3"}>
          2022
        </Heading>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
          spacing={{ lg: 10 }}
          paddingX={{ base: "1", lg: "8" }}
        >
          <QuarterCard />
          <QuarterCard />
          <QuarterCard />
          <QuarterCard />
        </SimpleGrid>
      </Box>
      <Box padding={{ base: "1", lg: "5" }}>
        <Heading fontSize={"33"} mb={"3"}>
          2022
        </Heading>
      </Box>
    </Box>
  );
};

export default QuarterGridByYear;
