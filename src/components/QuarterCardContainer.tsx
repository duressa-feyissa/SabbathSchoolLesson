import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import QuarterCard from "./QuarterCard";

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
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              size="sm"
            >
              Sort By
            </MenuButton>
            <MenuList fontSize={{ base: "12px", lg: "18px" }}>
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
              <MenuItem>Option 3</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
            spacing={3}
            padding={"10px"}
          >
            <QuarterCard />
            <QuarterCard />
            <QuarterCard />
            <QuarterCard />
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <Box>
            <Box padding={{ base: "1", lg: "5" }}>
              <Heading fontSize={"33"} mb={"3"}>
                2022
              </Heading>
              <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
                spacing={{ lg: 10 }}
                paddingX={{ base: "1", lg: "8" }}
              >
                <QuarterCard />
                <QuarterCard />
                <QuarterCard />
                <QuarterCard />
              </SimpleGrid>
            </Box>
            <Box padding={{ base: "1", lg: "5" }}>
              <Heading fontSize={"33"} mb={"3"}>
                2022
              </Heading>
              <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
                spacing={{ lg: 10 }}
                paddingX={{ base: "1", lg: "8" }}
              >
                <QuarterCard />
                <QuarterCard />
                <QuarterCard />
                <QuarterCard />
              </SimpleGrid>
            </Box>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default QuarterCardContainer;
