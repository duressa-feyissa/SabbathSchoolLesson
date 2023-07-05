import {
  Heading,
  HStack,
  VStack,
  Text,
  Box,
  Button,
  Badge,
  SimpleGrid,
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

const lessons = [
  { id: "01", title: "የእግዚአብሔርን ተልዕኮ በማካፈል የሚገኝ ደስታ" },
  { id: "02", title: "ከማንበብ ወደ መረዳት" },
  { id: "03", title: "ከእየሩሳሌም ወደ ባቢሎን" },
  { id: "04", title: "ከምድጃ ወደ ቤተ-መንግስት" },
  { id: "05", title: "ከኩራት ወደ ትህትና" },
  { id: "06", title: "ከትዕቢት ወደ ጥፋት" },
  { id: "07", title: "የእግዚአብሔርን ተልዕኮ በማካፈል የሚገኝ ደስታ" },
  { id: "08", title: "ከማንበብ ወደ መረዳት" },
  { id: "09", title: "ከእየሩሳሌም ወደ ባቢሎን" },
  { id: "10", title: "ከምድጃ ወደ ቤተ-መንግስት" },
  { id: "11", title: "ከኩራት ወደ ትህትና" },
  { id: "13", title: "ከትዕቢት ወደ ጥፋት" },
];

const Lesson = () => {
  return (
    <VStack width={"100%"} paddingX={"12px"}>
      <Heading
        fontSize={{ base: "24px", lg: "34px" }}
        textAlign="center"
        mb={3}
      >
        {quarter.title}
      </Heading>
      <Text mb={"2"} textAlign={"center"}>
        ‹‹ፊልጶስም ሮጦ የነቢዩን የኢሳይያስን መጽሐፍ ሲያነብ ሰማና። በውኑ የምታነበውን ታስተውለዋለህን? አለው። ››
        (ሐዋ 8:30)
      </Text>
      <Box>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          {lessons.map((lesson) => (
            <VStack key={lesson.id} align={"flex-start"}>
              <Button variant="ghost">
                <HStack>
                  <Badge colorScheme="green" fontSize="23px" borderRadius="4px">
                    {lesson.id}
                  </Badge>
                  <Text>{lesson.title}</Text>
                </HStack>
              </Button>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Lesson;
