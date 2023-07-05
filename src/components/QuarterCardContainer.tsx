import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import DropDown from "./DropDown";
import QuarterGrid from "./QuarterGrid";
import QuarterGridByYear from "./QuarterGridByYear";

const QuarterCardContainer = () => {
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="green"
      padding={{ base: "0", lg: "1" }}
    >
      <TabList marginLeft={5}>
        <Tab
          width={{ base: "60px", lg: "90px" }}
          fontSize={{ base: "12px", lg: "18px" }}
        >
          All
        </Tab>
        <Tab
          width={{ base: "60px", lg: "90px" }}
          fontSize={{ base: "12px", lg: "18px" }}
        >
          Quarter
        </Tab>
        <Box display="flex" ml={"auto"} mr={"5"}>
          <DropDown orders={["Newest", "Oldest"]} label={"Sort by"} />
        </Box>
      </TabList>
      <TabPanels>
        <TabPanel>
          <QuarterGrid />
        </TabPanel>
        <TabPanel>
          <QuarterGridByYear />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default QuarterCardContainer;
