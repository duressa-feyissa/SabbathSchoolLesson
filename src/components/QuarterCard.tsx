import {
  Box,
  Card,
  Heading,
  Image,
  Text,
  Badge,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import cover from "../images/cover.png";

const quarter = {
  title: "የእግዚአብሔርን ተልዕኮ በማካፈል የሚገኝ ደስታ",
  description:
    "አንድ ሀሳብን መረዳታችን በሕይወታችን ውስጥ ትልቅ ለውጥ የሚያመጣባቸው ጊዜያት አሉ። ከተወሰኑ ዓመታት በፊት ከአንዳንድ የሥራ ባልደረቦቼ ጋር በሚኒስትሮች ስብሰባ ላይ ተቀመጥኩ ፡፡ ውይይታችን እምነታችንን ፣ መስክራችንን እና ወንጌላዊነታችንን ማካፈልን ተቀየረ ፡፡ ከጓደኞቼ አንዱ ይህንን ሀሳብ ሲገልጽ “ተልዕኮ በዋነኝነት የእግዚአብሔር ስራ ነው። ፕላኔታችንን ለማዳን ሁሉንም የሰማይ ሀብቶችን እየተጠቀመ ነው። የጠፋን ሰዎችን ለማዳን ሥራችን የእኛ ሥራ ከእርሱ ጋር በደስታ አብረን መሥራት ነው። ” ከባድ ሸክም ከትከሻዬ ላይ የወረደ መሰለኝ ፡፡ የጠፋ ዓለምን ማዳን የእኔ ሥራ አይደለም ፡፡ የእግዚአብሔር ነበር ፡፡ ኃላፊነቴ ቀድሞውኑ እየሠራው በነበረው ሥራ ከእሱ ጋር መተባበር ነበር ፡፡",
  human_date: "3ኛ ሩብ ዓመት 2020",
  start_date: "27/06/2020",
  end_date: "25/09/2020",
  color_primary: "#A28670",
  color_primary_dark: "#6F4B2D",
};

const QuarterCard = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const score = "04";
  return (
    <Card>
      <Box p={3}>
        <Text fontSize="14px" textAlign="justify">
          <Image
            src={cover}
            w="130px"
            h="175px"
            float="left"
            borderRadius="lg"
            pr={3}
          />
          <Heading fontSize="22px" textAlign="center" mb={3}>
            {quarter.title}
          </Heading>
          <Text lineHeight="1.5" color={isDarkMode ? "gray.100" : ""}>
            {quarter.description}
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
          <Badge colorScheme="green" fontSize="23px" borderRadius="4px">
            {score}
          </Badge>
        </HStack>
      </Box>
    </Card>
  );
};

export default QuarterCard;
