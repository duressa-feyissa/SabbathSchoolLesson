import { Box, Heading, Image, Text } from "@chakra-ui/react";
import useQuarter from "../hooks/useQuarter";
import useQuarters from "../hooks/useQuarters";
import { useLangQueryStore } from "../store";
import BannerSkeleton from "./BannerSkeleton";

const Banner = () => {
  const { data: quarters } = useQuarters();

  const sortedQuarters = quarters?.slice().sort((a, b) => {
    const dateA = new Date(a.start_date).getTime();
    const dateB = new Date(b.start_date).getTime();
    return dateB - dateA;
  });

  const currentQuarter = sortedQuarters?.[0];

  const language = useLangQueryStore((state) => state.language);
  const { data: quarter, isLoading } = useQuarter(
    language,
    currentQuarter?.id ?? ""
  );

  if (isLoading) return <BannerSkeleton />;

  return (
    <Box
      position="relative"
      height={{ base: "300px", md: "350px" }}
      borderRadius="lg"
      marginBottom={{ base: "15px", md: "30px" }}
      overflow="hidden"
    >
      <Image
        src={quarter?.quarterly.splash}
        alt="Splash"
        objectFit="cover"
        width="100%"
        height="100%"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.5)" // Dark overlay
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="100%"
          textAlign="center"
          color="white"
          p={4}
        >
          <Heading size={{ base: "2xl", md: "4xl" }} mb={2}>
            {quarter?.quarterly.title}
          </Heading>
          <Text fontSize={{ base: "14px", md: "18px" }} mb={2}>
            {quarter?.quarterly.human_date}
          </Text>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            mx="auto"
            maxW={{ base: "90%", md: "60%" }}
            lineHeight="1.5"
          >
            {quarter?.quarterly.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
