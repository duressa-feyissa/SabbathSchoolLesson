import useQuarters from "../hooks/useQuarters";
import QuarterCard from "./QuarterCard";
import { SimpleGrid } from "@chakra-ui/react";
import QuarterCardSkeleton from "./QuarterCardSkeleton";

const QuarterGrid = () => {
  const { data: quarters, isLoading } = useQuarters();
  const Skeleton = [1, 2, 3, 4, 5, 6];

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
      spacing={3}
      padding={"10px"}
    >
      {" "}
      {isLoading && Skeleton.map((id) => <QuarterCardSkeleton key={id} />)}
      {quarters?.map((quarter) => (
        <QuarterCard key={quarter.id} quarter={quarter} />
      ))}
    </SimpleGrid>
  );
};

export default QuarterGrid;
