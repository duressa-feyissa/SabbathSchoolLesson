import { Grid, Show, GridItem } from "@chakra-ui/react";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import Lesson from "./components/Lesson";
import Day from "./components/Day";

function App() {
  return (
    <>
      <Grid
        width={"100%"}
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
          <NavBar />
          <Day />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
