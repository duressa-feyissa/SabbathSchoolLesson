import { Box, Skeleton } from "@chakra-ui/react";

const BannerSkeleton = () => {
  return (
    <Box borderRadius="lg" overflow="hidden" p={4} width="100%">
      <Skeleton height="200px" />
    </Box>
  );
};

export default BannerSkeleton;
