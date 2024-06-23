import { SimpleGrid } from "@chakra-ui/react";
import useQuarters from "../hooks/useQuarters";
import QuarterCard from "./QuarterCard";
import QuarterCardSkeleton from "./QuarterCardSkeleton";

const QuarterGrid = () => {
  const { data: quarters, isLoading } = useQuarters();
  const Skeleton = [1, 2, 3, 4, 5, 6];

  const sortedQuarters = quarters?.slice().sort((a, b) => {
    const dateA = new Date(a.start_date).getTime();
    const dateB = new Date(b.start_date).getTime();
    return dateB - dateA;
  });

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={5}>
      {isLoading && Skeleton.map((id) => <QuarterCardSkeleton key={id} />)}
      {sortedQuarters?.map((quarter) => (
        <QuarterCard key={quarter.id} quarter={quarter} />
      ))}
    </SimpleGrid>
  );
};

export default QuarterGrid;
