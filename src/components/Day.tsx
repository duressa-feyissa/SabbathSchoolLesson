import {
  VStack,
  Text,
  Box,
  Heading,
  Button,
  Badge,
  HStack,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";

const quarter = {
  title: "የእግዚአብሔርን ተልዕኮ በማካፈል የሚገኝ ደስታ",
  start_date: "27/06/2020",
};

const paragraphs = [
  "ለዚህ ሳምንት ጥናት የሚከተሉትን ጥቅሶች ያንብቡ ዘዳግም 32: 45-47; ዘፍጥረት 49:8-12; ኢሳያስ 53:3-7; 1ኛ ቆሮ 15: 51-55 እና ሮሜ 12:2",
  "የሣምንቱ ጥናት መሪ ጥቅስ‹‹ ሕግህ ለእግሬ መብራት፥ ለመንገዴ ብርሃን ነው። ›› (መዝሙር 119:105)",
  "መ  ጽሐፍ ቅዱስ 66 መጽሐፎችን መያዙ; በ40 ጸሐፊዎች በሶስት አህጉራት ውስጥ (ኢስያ; አፍሪካ እና አውሮፓ) በ 1500 አመታት ውስጥ መጻፉ የተለየ ያደርገዋል። ቅዱስ እና ሐይማኖታዊ የሆነ እሱን የሚመስል ሌላ መጽሐፍ የለም። አያስደንቅም! ከሁሉም በላይ የእግዚአብሔር ቃል ነው። ከ24600 በላይ የሆኑ የአዲስ ኪዳን ጽሑፎች ከ ክርስቶስ በኋላ ባሉት አራት ክፍለ ዘመናት ሊገኙ ችለዋል። ከ ፕላቶ ትክክለኛ ጽሑፎች ሰባት አሉ; ከሔሮዱቱስ ስምንት ; እና ከ256 የሚበልጡ ተርፈው የተገኙ ቅጅዎች ደግሞ ከሖሜር አሉ። ስለዚህ ስለ አዲስ ኪዳን ጠንካራ ; የተሳሰረ እና የተረጋገጠ ሐይለኛ መረጃ አለን። መጽሐፍ ቅዱስ የታወቀ የመጀመሪያው የተተረጎመ መጽሐፍ ነው። በምዕራብ ማተሚያ ቤቶች የታተመ የመጀመሪው መጽሐፍ ነው። ዛሬ በምድራችን 95 በመቶ በሚሆነው ሕዝብ ዘንድ የተነበበ እና በብዙ ቋንቋዎች ተተርጉሞ በሰፊው የተሰራጨ መጽሐፍ ነው።",

  "መጽሐፍ ቅዱስ በይዘቱ እና በመልዕክቱም የተለየ ነው; ትኩረቱም በታሪክ ውስጥ እግዚአብሔር ባለው የማዳን እንቅስቃሴ ላይ ነው። ያም ታሪክ የእግዚአብሔርን ዕቅድ እና ዘለአለማዊውን መንግስት አስቀድሞ እንደመናገሩ ከትንቢት ጋራ የተሳሰረ ነው። የእግዚአብሔር ሕያው ቃል ነው; ምክንያቱም መጽሐፍቱ የተጻፉበት ያው መን,ፈስ (2ኛ ጢሞ 3:16) አሁን ላሉ አማኞች ቃሉን ሲያጠኑ ሳለ ወደ እውነት ሁሉ  			  እንዲመራቸው የተሰፋን ቃል ተሰጥቷል (ዮሐ 14: 16; 17 ; ዮሐ 15:26; ዮሐ 16: 13)። የዚህን ሳምንት ትምህርት ለ መጋቢት 26 ሰንበት በማጥናት ይዘጋጁ።",
];

const lessons = [
  { id: "01", title: "Sunday" },
  { id: "02", title: "Monday" },
  { id: "03", title: "Tuesday" },
  { id: "04", title: "Wensday" },
  { id: "05", title: "Thursday" },
  { id: "06", title: "Friday" },
  { id: "07", title: "Saturday" },
];

const Day = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
    xl: false,
  });
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.700";
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", lg: "row", xl: "row" }}
      justifyContent={{
        base: "center",
        lg: "space-between",
        xl: "space-between",
      }}
      alignItems={{ base: "center", lg: "flex-start", xl: "flex-start" }}
      gap={{ base: "0", lg: "20px", xl: "20px" }}
      h="100%"
    >
      <Box
        flex="1"
        position="relative"
        overflowY="auto"
        width={{ base: "95%", md: "85%", lg: "75%", xl: "65%" }}
        padding={"5px"}
      >
        <Text mt={"5px"}>{quarter.start_date}</Text>
        <Heading
          size={"lg"}
          textAlign={"center"}
          color={isDarkMode ? "green.100" : "green.900"}
        >
          {quarter.title}
        </Heading>
        <VStack spacing={3} marginTop="20px">
          {paragraphs?.map((paragraph, index) => (
            <Text
              key={index}
              fontSize={{
                base: "1.2rem",
                md: "1.3rem",
                lg: "1.4rem",
                xl: "1.5rem",
              }}
              p={"5px"}
              color={color}
              lineHeight={"1.5rem"}
              textAlign={"justify"}
            >
              {paragraph}
            </Text>
          ))}
        </VStack>
      </Box>
      {!isSmallScreen && (
        <Box
          w={{ lg: "200px", xl: "300px" }}
          position="sticky"
          top={58}
          right={0}
          overflowY="auto"
          paddingX={"5px"}
          pt={"20px"}
          maxHeight="100vh"
          shadow={"md"}
        >
          <Heading size={"md"} textAlign={"center"} mt={"5px"} color={color}>
            {quarter.title}
          </Heading>
          <Text size={"sm"} textAlign={"center"} color={color}>
            {quarter.title}
          </Text>
          {lessons.map((lesson) => (
            <VStack key={lesson.id} align={"flex-start"} marginY={"2"}>
              <Button variant="ghost">
                <HStack>
                  <Badge colorScheme="green" fontSize="23px" borderRadius="4px">
                    {lesson.id}
                  </Badge>
                  <Text fontSize={"20px"} color={color}>
                    {lesson.title}
                  </Text>
                </HStack>
              </Button>
            </VStack>
          ))}
        </Box>
      )}
      {isSmallScreen && (
        <Box width={"100%"} display="flex" justifyContent={"center"}>
          <HStack mb={10} width={"300px"}>
            {lessons.map((lesson) => (
              <Button key={lesson.id} variant="ghost">
                <Badge colorScheme="green" fontSize="24px" borderRadius="4px">
                  {lesson.id}
                </Badge>
              </Button>
            ))}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Day;
