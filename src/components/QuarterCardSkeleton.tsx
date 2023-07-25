import { Box, Heading, Text, Skeleton, SkeletonText } from "@chakra-ui/react";

const QuarterCardSkeleton = () => {
  return (
    <Box borderRadius="lg" overflow="hidden" p={4}>
      <Skeleton height="200px" />
      <Heading as="h2" size="lg" mt={4} mb={2}>
        <SkeletonText />
      </Heading>
      <Text>
        <SkeletonText noOfLines={4} />
      </Text>
    </Box>
  );
};

export default QuarterCardSkeleton;
