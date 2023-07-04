import cover from "../images/cover.png";
import {
  Box,
  Button,
  useColorModeValue,
  Image,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";

const Banner = () => {
  const bgColor = useColorModeValue("gray.100", "#202123");
  const textColor = useColorModeValue("gray.900", "gray.100");

  return (
    <Flex
      bg={bgColor}
      color={textColor}
      align="center"
      justify="center"
      mx="auto"
      borderRadius="md"
      overflow="hidden"
      position="relative"
      marginY={"20px"}
      width={{ base: "95%", md: "98%" }}
    >
      <Box flex={2}>
        <Box paddingY={"3"} paddingX={"3"}>
          <Box>
            <Box
              fontSize="3xl"
              fontWeight="semibold"
              letterSpacing="tight"
              lineHeight="tight"
              ml="10px"
              mr="30px"
              mt="5px"
              color={useColorModeValue("gray.900", "gray.100")}
            >
              ከማንበብ ወደ መረዳት
            </Box>
            <Box ml="10px">
              <Box>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color={useColorModeValue("gray.500", "gray.200")}
                >
                  የሣምንቱ ጥናት መሪ ጥቅስ
                </Text>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={useColorModeValue("gray.700", "blue.100")}
                >
                  ‹‹ፊልጶስም ሮጦ የነቢዩን የኢሳይያስን መጽሐፍ ሲያነብ ሰማና። በውኑ የምታነበውን ታስተውለዋለህን?
                  አለው። ›› (ሐዋ 8:30)
                </Text>
              </Box>
            </Box>
          </Box>

          <HStack
            justify={{ base: "center", md: "space-around" }}
            width={{ base: "100%", md: "400px" }}
            spacing="2"
            mt="4"
          >
            <Button
              variant="outline"
              colorScheme="blue"
              size={{ base: "sm", md: "md" }}
            >
              This Week's Lessons
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              size={{ base: "sm", md: "md" }}
            >
              Today's Lesson
            </Button>
          </HStack>
        </Box>
      </Box>

      <Box
        display={{ base: "none", md: "block" }}
        margin={"10px"}
        borderRadius={"10px"}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          w={"160px"}
          justifyItems={"center"}
          _hover={{
            boxShadow: "xl",
            margin: "1px",
            cursor: "pointer",
          }}
        >
          <Image
            src={cover}
            alt="Banner Image"
            objectFit="cover"
            w="100%"
            h="200px"
            borderRadius={"10px"}
          />
          <Text
            colorScheme="blue"
            textAlign={"center"}
            size={{ base: "sm", md: "md" }}
            mt={"10px"}
          >
            የቅዱስ ቁርባን መረጃ
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Banner;
