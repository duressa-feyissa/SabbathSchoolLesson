import QuarterCard from "./QuarterCard";
import { SimpleGrid } from "@chakra-ui/react";

const QuarterGrid = () => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
      spacing={3}
      padding={"10px"}
    >
      <QuarterCard />
      <QuarterCard />
      <QuarterCard />
      <QuarterCard />
    </SimpleGrid>
  );
};

export default QuarterGrid;
