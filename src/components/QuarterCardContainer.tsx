import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import UploadFile from "./UploadFile";

const QuarterCardContainer = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab width={"90px"}>All</Tab>
        <Tab width={"90px"}>Quarter</Tab>
        <Box display="flex" alignItems="center" ml="auto">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              size="sm"
            >
              Sort By
            </MenuButton>
            <MenuList>
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
            spacing={6}
            padding={"10px"}
          >
            <QuarterCard />
            <QuarterCard />
            <QuarterCard />
            <QuarterCard />
            <UploadFile />
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default QuarterCardContainer;
