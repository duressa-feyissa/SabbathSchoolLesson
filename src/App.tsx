import { Grid, Show, GridItem, Box } from "@chakra-ui/react";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import DayForm from "./components/DayForm";
import LessonForm from "./components/LessonForm";
import QuarterForm from "./components/QuarterForm";

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
          <Box padding="2px">
            <NavBar />
            <DayForm />
            <LessonForm />
            <QuarterForm />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
