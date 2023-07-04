import cover from "../images/cover.png";
import {
  Card,
  Stack,
  Heading,
  Image,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";

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
  return (
    <Card direction={{ base: "column", sm: "row" }} padding={3}>
      <VStack>
        <Flex gap={3}>
          <Image
            maxH={"290"}
            maxW={"160"}
            boxSize={"100%"}
            src={cover}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack>
            <Heading fontSize={"18px"} textAlign={"center"}>
              {quarter.title}
            </Heading>
            <Text fontSize={"11"} textAlign={"justify"}>
              {quarter.description}
            </Text>
          </Stack>
        </Flex>
        <Text color={quarter.color_primary}>{quarter.human_date}</Text>
      </VStack>
    </Card>
  );
};

export default QuarterCard;
