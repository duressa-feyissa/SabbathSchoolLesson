import { Grid, Show, GridItem, SimpleGrid } from "@chakra-ui/react";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import QuarterCard from "./components/QuarterCard";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{ base: "1fr", lg: "225px 1fr" }}
      >
        <Show above="lg">
          <GridItem gridArea="aside">
            <Aside />
          </GridItem>
        </Show>
        <GridItem gridArea="main">
          <>
            <NavBar />
            <Banner />
            <SimpleGrid
              columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
              spacing={6}
              padding={"10px"}
            >
              <QuarterCard />
              <QuarterCard />
              <QuarterCard />
              <QuarterCard />
            </SimpleGrid>
          </>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
